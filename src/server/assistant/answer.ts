import { z } from "zod";
import type { Db } from "@/server/db/client";
import { getSetting, setSetting, HELP_CONTACT_DEFAULT } from "@/server/settings";
import { cleanText } from "@/lib/text";
import { normalize } from "@/lib/search/normalize";
import { riyadhDateIso } from "@/lib/time/riyadh";
import { getKnowledge, type Chunk } from "./knowledge";
import { answers, createRetriever, keyTerms, type Passage } from "./retrieve";
import { detectLive, duroosPassage, prayerTimesPassage, todayPassage } from "./live";
import { composeExtractive, notFound } from "./compose";
import { systemPrompt, userTurn } from "./prompt";
import { write, type ChatMessage } from "./llm";

/**
 * Ask the Meshaykh: answers one question from MESH's own content.
 *
 * 1. A question asking for a religious ruling gets a fixed, kind reply (no model is asked).
 * 2. Live data (duroos on a given day or after a prayer, adhan times, today's date and the next
 *    University dates) is computed, and the best passages of the site are found.
 * 3. A free model writes the answer from those passages only. Its reply is checked: no long
 *    dashes, and no answer that brings in two or more numbers the passages do not contain.
 * 4. With no model available, the live data or the best sentences of the best passages answer.
 * It never throws for a model failure, and questions it could not answer are kept for the owner.
 */

export type Turn = { role: "user" | "assistant"; text: string };
export type AskInput = { question: string; history?: Turn[]; locale: "en" | "ar" };
export type Source = { title: string; url: string };
export type AskResult = {
  answer: string;
  sources: Source[];
  /** Other MESH pages on the same topic, for "you might also want". */
  related: Source[];
  /** ai: written by a model; extract: the site's own sentences; live: computed; guard: a fixed reply; none: nothing found. */
  mode: "ai" | "extract" | "live" | "guard" | "none";
  found: boolean;
  lang: "en" | "ar";
};

export const HELP_LINE = {
  en: `Please message Admin on WhatsApp at ${HELP_CONTACT_DEFAULT}.`,
  ar: `راسل المشرف على واتساب: \u200E${HELP_CONTACT_DEFAULT}`,
};

const ARABIC = /[؀-ۿ]/g;
/** The language the question is written in. */
export function langOf(text: string): "en" | "ar" {
  const letters = text.replace(/[^\p{L}]/gu, "").length || 1;
  return (text.match(ARABIC)?.length ?? 0) / letters > 0.3 ? "ar" : "en";
}

/** Questions that ask for a religious ruling. "The Haram" alone is the masjid, so only "is it haram" and the like count. */
const RULING = /\b(is it|is this|are they|it is|is)\s+(halal|haram|permissible|permitted|allowed in islam|makruh|makrooh|sunnah|bidah|bida|shirk|kufr|obligatory|fard|wajib)\b|\b(ruling|fatwa|fatwah|hukm|islamic verdict)\b|حكم|يجوز|فتوي|حلال ام حرام|هل يحرم/;
export function isRulingQuestion(q: string): boolean {
  return RULING.test(normalize(q));
}

function rulingReply(lang: "en" | "ar"): string {
  return lang === "ar"
    ? "لا يصدر MESH فتاوى ولا أحكامًا شرعية. اسأل عالمًا موثوقًا، وتجد المشايخ الذين يدرّسون في المسجد النبوي وأوقات دروسهم في صفحة الدروس."
    : "MESH doesn't give religious rulings. Please ask a qualified scholar. The mashayikh who teach in Masjid an-Nabawi, and when and where their duroos are, are on the duroos page.";
}

/** Long dashes are never used on MESH; a dash between two numbers becomes "to", any other a comma. */
export function cleanDashes(s: string): string {
  return s.replace(/\s*[\u2014\u2013]\s*/g, (m, off: number, all: string) => (/\d$/.test(all.slice(0, off)) && /^\d/.test(all.slice(off + m.length)) ? " to " : ", "));
}

/** Numbers of two or more digits in the answer that appear nowhere in the passages or the question. */
export function unsupportedNumbers(answer: string, passages: Pick<Chunk, "title" | "text">[], question: string): string[] {
  const hay = `${passages.map((p) => `${p.text} ${p.title}`).join(" ")} ${question} ${HELP_CONTACT_DEFAULT}`.replace(/,(?=\d{3})/g, "");
  const nums = answer.replace(/\[\d+\]/g, "").replace(/,(?=\d{3})/g, "").match(/\d{2,}(?:\.\d+)?/g) ?? [];
  return [...new Set(nums)].filter((n) => !hay.includes(n));
}

const replySchema = z.object({ answer: z.string().min(1).max(4000), sources: z.array(z.number().int()).max(12).default([]), found: z.boolean().default(true) });
type Reply = z.infer<typeof replySchema>;

/** Reads the model's JSON reply; a model that ignored the format still counts, as plain text. */
export function parseReply(raw: string): Reply | null {
  const m = /\{[\s\S]*\}/.exec(raw);
  if (m) {
    try {
      const r = replySchema.safeParse(JSON.parse(m[0]));
      if (r.success) return r.data;
    } catch {
      // not JSON after all
    }
  }
  const text = raw.trim();
  return text && !text.startsWith("{") ? { answer: text, sources: [], found: true } : null;
}

const sourceOf = (c: Chunk): Source => ({ title: c.section ? `${c.title}: ${c.section}` : c.title, url: c.url });
const page = (url: string) => url.split("#")[0];

function relatedOf(passages: Passage[], used: Set<string>): Source[] {
  const seen = new Set(used);
  const out: Source[] = [];
  for (const p of passages) {
    if (seen.has(page(p.url)) || !(p.kind === "faq" || p.kind === "guide")) continue;
    seen.add(page(p.url));
    out.push({ title: p.title, url: page(p.url) });
    if (out.length >= 3) break;
  }
  return out;
}

function uniqueSources(list: Chunk[]): Source[] {
  return [...new Map(list.map((c) => [c.url, sourceOf(c)])).values()].slice(0, 4);
}

const cache = new Map<string, { at: number; result: AskResult }>();
const CACHE_MS = 6 * 3_600_000;

/** Test hook. */
export function resetAnswerCache() {
  cache.clear();
}

/** Keeps questions MESH could not answer (text only, no visitor details), newest first. */
async function noteUnanswered(db: Db, q: string) {
  try {
    const list = (await getSetting<{ q: string; at: string }[]>(db, "assistant_unanswered")) ?? [];
    list.unshift({ q: q.slice(0, 300), at: new Date().toISOString() });
    await setSetting(db, "assistant_unanswered", list.slice(0, 200));
  } catch {
    // Bookkeeping never breaks an answer.
  }
}

export type AskOptions = {
  now?: Date;
  /** Replaces the model chain (tests). Return null for "no model answered". */
  writer?: (messages: ChatMessage[]) => Promise<{ text: string } | null>;
  knowledge?: Chunk[];
};

export async function askMesh(db: Db, input: AskInput, opts: AskOptions = {}): Promise<AskResult> {
  const now = opts.now ?? new Date();
  const q = input.question.trim().slice(0, 600);
  const lang = /\p{L}/u.test(q) ? langOf(q) : input.locale;
  const ar = lang === "ar";
  const history = (input.history ?? []).slice(-6).map((t) => ({ role: t.role, text: t.text.slice(0, 1200) }));

  if (isRulingQuestion(q)) {
    return { answer: rulingReply(lang), sources: [{ title: ar ? "الدروس" : "Duroos", url: "/duroos" }], related: [], mode: "guard", found: true, lang };
  }

  // A short follow-up ("how much does it cost?") is searched together with the previous question.
  const lastUser = [...history].reverse().find((t) => t.role === "user")?.text ?? "";
  const searchText = keyTerms(q).length < 3 && lastUser ? `${lastUser} ${q}` : q;
  const today = riyadhDateIso(now);
  const live = detectLive(searchText, today);
  const cacheable = !live.duroos && !live.prayerTimes && history.length === 0;
  const key = `${lang}|${normalize(q)}`;
  const hit = cacheable ? cache.get(key) : undefined;
  if (hit && now.getTime() - hit.at < CACHE_MS) return hit.result;

  const chunks = opts.knowledge ?? (await getKnowledge(db));
  const found = createRetriever(chunks)(searchText, 6);
  const livePassages: Chunk[] = [];
  if (live.duroos) livePassages.push(await duroosPassage(db, live.duroos, now, ar));
  if (live.prayerTimes) livePassages.push(prayerTimesPassage(now, ar));
  const passages: Chunk[] = [...livePassages, ...found];
  const strong = livePassages.length > 0 || found.slice(0, 3).some((p) => answers(searchText, p));
  const context = [...passages, todayPassage(now, ar)];

  // 1. A free model writes the answer from the passages.
  if (passages.length) {
    const writer = opts.writer ?? ((m: ChatMessage[]) => write(m));
    const messages: ChatMessage[] = [
      { role: "system", content: systemPrompt(lang) },
      ...history.map((t) => ({ role: t.role, content: t.text }) as ChatMessage),
      { role: "user", content: userTurn(q, context) },
    ];
    const written = await writer(messages).catch(() => null);
    const reply = written ? parseReply(written.text) : null;
    if (reply) {
      const text = cleanText(cleanDashes(reply.answer.replace(/\s?\[\d+(?:\s*,\s*\d+)*\]/g, "")), lang);
      if (unsupportedNumbers(text, context, q).length < 2) {
        const used = reply.sources.filter((n) => n >= 1 && n <= context.length).map((n) => context[n - 1]).filter((c) => c.id !== "live-today");
        const sources = reply.found ? uniqueSources(used.length ? used : passages.slice(0, 2)) : [];
        const result: AskResult = { answer: text, sources, related: relatedOf(found, new Set(sources.map((s) => page(s.url)))), mode: "ai", found: reply.found, lang };
        if (!reply.found) void noteUnanswered(db, q);
        else if (cacheable) {
          if (cache.size > 500) cache.delete(cache.keys().next().value as string);
          cache.set(key, { at: now.getTime(), result });
        }
        return result;
      }
    }
  }

  // 2. Live data answers on its own.
  if (livePassages.length) {
    return { answer: livePassages.map((p) => p.text).join("\n\n"), sources: uniqueSources(livePassages), related: relatedOf(found, new Set()), mode: "live", found: true, lang };
  }

  // 3. Nothing close enough: say so, with the help line.
  if (!strong) {
    void noteUnanswered(db, q);
    return { answer: notFound(lang), sources: [], related: relatedOf(found, new Set()), mode: "none", found: false, lang };
  }

  // 4. The best sentences of the best passages.
  const top = found.slice(0, 2);
  const sources = uniqueSources(top);
  return { answer: composeExtractive(searchText, top, lang), sources, related: relatedOf(found, new Set(sources.map((s) => page(s.url)))), mode: "extract", found: true, lang };
}
