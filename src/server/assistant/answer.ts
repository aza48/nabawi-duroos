import type { Db } from "@/server/db/client";
import { getSetting, setSetting, HELP_CONTACT_DEFAULT } from "@/server/settings";
import { normalize } from "@/lib/search/normalize";
import { riyadhDateIso } from "@/lib/time/riyadh";
import { getKnowledge, type Chunk } from "./knowledge";
import { createRetriever, coverage, keyTerms, type Passage } from "./retrieve";
import { detectLive, duroosPassage, prayerTimesPassage, todayPassage } from "./live";
import { composeExtractive, notFound } from "./compose";
import { systemPrompt, userTurn } from "./prompt";
import { write, type ChatMessage } from "./llm";

export type Turn = { role: "user" | "assistant"; content: string };
export type Source = { title: string; section?: string; url: string };
export type AssistantReply = {
  answer: string;
  sources: Source[];
  /** Other questions MESH has answered on the same topic. */
  related: { title: string; url: string }[];
  /** ai: written by a model from MESH's passages; search: the passages themselves; live: computed; guard: a fixed reply. */
  mode: "ai" | "search" | "live" | "guard";
  lang: "en" | "ar";
};

const ARABIC = /[؀-ۿ]/g;
export function langOf(text: string): "en" | "ar" {
  const letters = text.replace(/[^\p{L}]/gu, "").length || 1;
  return (text.match(ARABIC)?.length ?? 0) / letters > 0.3 ? "ar" : "en";
}

/** Questions that ask for a religious ruling. "Haram" alone is the masjid, so only "is it haram" style counts. */
const RULING = /\b(is it|is this|are they|it is|is)\s+(halal|haram|permissible|permitted|allowed in islam|makruh|makrooh|sunnah|bidah|bida|shirk|kufr|obligatory|fard|wajib)\b|\b(ruling|fatwa|fatwah|hukm|islamic verdict)\b|حكم|يجوز|فتوى|حلال ام حرام|هل يحرم/;

export function isRulingQuestion(q: string): boolean {
  return RULING.test(normalize(q).replace(/'/g, ""));
}

function rulingReply(lang: "en" | "ar"): string {
  return lang === "ar"
    ? "لا يصدر MESH فتاوى ولا أحكامًا شرعية. اسأل عالمًا موثوقًا، وتجد المشايخ الذين يدرّسون في المسجد النبوي وأوقات دروسهم في صفحة الدروس."
    : "MESH doesn't give religious rulings. Please ask a qualified scholar. The mashayikh who teach in Masjid an-Nabawi, and when and where their duroos are, are on the duroos page.";
}

/** Long dashes are never used on MESH; models sometimes write them anyway. */
export function cleanDashes(s: string): string {
  return s.replace(/\s*[\u2014\u2013]\s*/g, (m, off: number, all: string) => (/\d$/.test(all.slice(0, off)) && /^\d/.test(all.slice(off + m.length)) ? " to " : ", "));
}

/**
 * Numbers in the answer that appear nowhere in the passages or the question: a sign the writer
 * filled a gap from memory. Counts only numbers of two or more digits (fees, years, phone parts).
 */
export function unsupportedNumbers(answer: string, passages: Chunk[], question: string): string[] {
  const hay = `${passages.map((p) => p.text + " " + p.title).join(" ")} ${question} ${HELP_CONTACT_DEFAULT}`.replace(/,(?=\d{3})/g, "");
  const nums = answer.replace(/\[\d+\]/g, "").replace(/,(?=\d{3})/g, "").match(/\d{2,}(?:\.\d+)?/g) ?? [];
  return [...new Set(nums)].filter((n) => !hay.includes(n));
}

/** Pulls [n] citations out of the text: the cited passages become the sources, the markers become links. */
export function citations(text: string, passages: Chunk[]): { text: string; cited: number[] } {
  const cited: number[] = [];
  const out = text.replace(/\s?\[(\d+(?:\s*,\s*\d+)*)\]/g, (_m, nums: string) => {
    const ns = nums.split(",").map((n) => Number(n.trim()) - 1).filter((n) => n >= 0 && n < passages.length);
    ns.forEach((n) => !cited.includes(n) && cited.push(n));
    return ns.length ? ns.map((n) => ` [${cited.indexOf(n) + 1}]`).join("") : "";
  });
  return { text: out.trim(), cited };
}

const sourceOf = (c: Chunk): Source => ({ title: c.title, section: c.section, url: c.url });

function relatedOf(passages: Passage[], used: Set<string>): AssistantReply["related"] {
  const seen = new Set(used);
  const out: AssistantReply["related"] = [];
  for (const p of passages) {
    const page = p.url.split("#")[0];
    if (seen.has(page) || !(p.kind === "faq" || p.kind === "guide")) continue;
    seen.add(page);
    out.push({ title: p.title, url: page });
    if (out.length >= 3) break;
  }
  return out;
}

const cache = new Map<string, { at: number; reply: AssistantReply }>();
const CACHE_MS = 6 * 3_600_000;

/** Remembers questions MESH could not answer, so the team can write the missing page (no names, no addresses). */
async function noteUnanswered(db: Db, q: string) {
  try {
    const list = (await getSetting<{ q: string; at: string }[]>(db, "assistant_unanswered")) ?? [];
    list.unshift({ q: q.slice(0, 300), at: new Date().toISOString() });
    await setSetting(db, "assistant_unanswered", list.slice(0, 200));
  } catch {
    // Never let bookkeeping break an answer.
  }
}

export type AnswerOptions = {
  now?: Date;
  /** Override the writer (tests). Return null to simulate no provider. */
  writer?: (messages: ChatMessage[]) => Promise<{ text: string } | null>;
  knowledge?: Chunk[];
};

export async function answer(db: Db, question: string, history: Turn[] = [], opts: AnswerOptions = {}): Promise<AssistantReply> {
  const now = opts.now ?? new Date();
  const q = question.trim().slice(0, 600);
  const lang = langOf(q);
  const today = riyadhDateIso(now);

  if (isRulingQuestion(q)) return { answer: rulingReply(lang), sources: [{ title: lang === "ar" ? "الدروس" : "Duroos", url: lang === "ar" ? "/ar/duroos" : "/duroos" }], related: [], mode: "guard", lang };

  // A short follow-up ("how much does it cost?") is searched together with the previous question.
  const lastUser = [...history].reverse().find((t) => t.role === "user")?.content ?? "";
  const searchText = keyTerms(q).length < 3 && lastUser ? `${lastUser} ${q}` : q;

  const live = detectLive(searchText, today);
  const key = `${lang}|${normalize(searchText)}`;
  const cacheable = !live.duroos && !live.prayerTimes && history.length === 0;
  const hit = cacheable ? cache.get(key) : undefined;
  if (hit && now.getTime() - hit.at < CACHE_MS) return hit.reply;

  const chunks = opts.knowledge ?? (await getKnowledge(db));
  const retrieve = createRetriever(chunks);
  const found = retrieve(searchText, 6);

  const livePassages: Chunk[] = [];
  if (live.duroos) livePassages.push(await duroosPassage(db, live.duroos, now, lang === "ar"));
  if (live.prayerTimes) livePassages.push(prayerTimesPassage(now, lang === "ar"));

  const passages: Chunk[] = [...livePassages, ...found];
  const strong = livePassages.length > 0 || (found[0] && coverage(searchText, found[0]) >= 0.5);
  const context = [...passages, todayPassage(now, lang === "ar")];

  // 1. A model writes the answer from the passages, when one is available.
  const writer = opts.writer ?? ((m: ChatMessage[]) => write(m));
  const messages: ChatMessage[] = [
    { role: "system", content: systemPrompt(lang) },
    ...history.slice(-6).map((t) => ({ role: t.role, content: t.content.slice(0, 800) }) as ChatMessage),
    { role: "user", content: userTurn(q, context) },
  ];
  const written = passages.length || live.duroos ? await writer(messages).catch(() => null) : null;
  if (written) {
    const { text, cited } = citations(cleanDashes(written.text), context);
    const bad = unsupportedNumbers(text, context, q);
    if (text && bad.length < 2) {
      const used = cited.map((i) => context[i]).filter((c) => c.id !== "live-today");
      const sources = (used.length ? used : passages.slice(0, 2)).map(sourceOf);
      const reply: AssistantReply = { answer: text, sources, related: relatedOf(found, new Set(sources.map((s) => s.url.split("#")[0]))), mode: "ai", lang };
      const declined = /don't have (a reliable answer|that yet)|ليس عندي/i.test(text);
      if (declined) void noteUnanswered(db, q);
      if (cacheable && !declined) cache.set(key, { at: now.getTime(), reply });
      return reply;
    }
  }

  // 2. Live data answers on its own.
  if (livePassages.length) {
    return { answer: livePassages.map((p) => p.text).join("\n\n"), sources: livePassages.map(sourceOf), related: relatedOf(found, new Set()), mode: "live", lang };
  }

  // 3. Otherwise the best sentences of the best passages.
  if (!strong) {
    void noteUnanswered(db, q);
    return { answer: notFound(lang), sources: [], related: relatedOf(found, new Set()), mode: "search", lang };
  }
  const top = found.slice(0, 2);
  const reply: AssistantReply = {
    answer: composeExtractive(searchText, top, lang),
    sources: top.map(sourceOf),
    related: relatedOf(found, new Set(top.map((t) => t.url.split("#")[0]))),
    mode: "search",
    lang,
  };
  return reply;
}

/** Test hook. */
export function resetAnswerCache() {
  cache.clear();
}
