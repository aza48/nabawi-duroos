import { z } from "zod";
import type { Db } from "@/server/db/client";
import { getSetting, setSetting, HELP_CONTACT_DEFAULT } from "@/server/settings";
import { cleanText } from "@/lib/text";
import { normalize } from "@/lib/search/normalize";
import { riyadhDateIso } from "@/lib/time/riyadh";
import { getKnowledge, type Chunk } from "./knowledge";
import { answers, coverage, createRetriever, headingHolds, isGeneric, keyTerms, retrieverFor, termHits, type Passage, type Retriever } from "./retrieve";
import { datePassage, detectLive, duroosPassage, prayerTimesPassage, shaykhsNamed, todayPassage } from "./live";
import { Citer, cite, composeExtractive, ENGLISH_PAGE_AR, extract, notFound, programLine, RANKING, sentences } from "./compose";
import { asksWhenWhere, greetingReply, isGreeting, isRulingQuestion, looksLikeFiqh, rulingReply } from "./guard";
import { systemPrompt, userTurn } from "./prompt";
import { write, type ChatMessage } from "./llm";
import { stemEn } from "./words";

export { HELP_LINE, isGreeting, isRulingQuestion } from "./guard";

/**
 * Ask the MESHaykh: answers one question from MESH's own content.
 *
 * 1. A question asking for a religious ruling gets a fixed, kind reply with the help line (no model is asked).
 * 2. Live data (duroos on a given day or after a prayer, adhan times, today's date and the next
 *    University dates) is computed, and the best passages of the site are found, in Arabic too
 *    when a page is translated.
 * 3. A free model writes the answer from those passages only. Its reply is checked: no long
 *    dashes, and no answer that brings in two or more numbers the passages do not contain.
 * 4. With no model available, the live data or the best sentences of the best passages answer.
 * Every answer with sources carries [n] markers that point to sources[n-1].
 * It never throws for a model failure, and questions it could not answer are kept for the owner.
 */

export type Turn = { role: "user" | "assistant"; text: string };
/** `page` is the path the person is reading ("/guides/drivers-license"), so "how much does it cost?" is about that page. */
export type AskInput = { question: string; history?: Turn[]; locale: "en" | "ar"; page?: string };
export type Source = { title: string; section?: string; url: string };
export type AskResult = {
  answer: string;
  sources: Source[];
  /** Other MESH pages on the same topic, for "you might also want". */
  related: { title: string; url: string }[];
  /** ai: written by a model; extract: the site's own sentences; live: computed; guard: a fixed reply; none: nothing found. */
  mode: "ai" | "extract" | "live" | "guard" | "none";
  found: boolean;
  lang: "en" | "ar";
};

const ARABIC = /[؀-ۿ]/g;
/** The language the question is written in. */
export function langOf(text: string): "en" | "ar" {
  const letters = text.replace(/[^\p{L}]/gu, "").length || 1;
  return (text.match(ARABIC)?.length ?? 0) / letters > 0.3 ? "ar" : "en";
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
export function parseReply(input: string): Reply | null {
  // Some models wrap JSON in a ```json fence.
  const raw = input.replace(/^\s*```(?:json)?\s*/i, "").replace(/\s*```\s*$/, "");
  const m = /\{[\s\S]*\}/.exec(raw);
  if (m) {
    try {
      const r = replySchema.safeParse(JSON.parse(m[0]));
      if (r.success) return r.data;
    } catch {
      // not JSON after all
    }
  }
  // Broken JSON: keep the answer string if it can be read, never show the raw braces.
  const ans = /"answer"\s*:\s*"((?:[^"\\]|\\.)*)"/.exec(raw);
  if (ans) {
    try {
      return { answer: JSON.parse(`"${ans[1]}"`) as string, sources: [], found: true };
    } catch {
      return null;
    }
  }
  const text = raw.trim();
  return text && !/^[{[]/.test(text) && !/"answer"\s*:/.test(text) ? { answer: text, sources: [], found: true } : null;
}

/**
 * Renumbers the [n] markers in the order they are first used, so [1] is always the first source
 * shown, and drops markers that point at nothing. Returns the passages cited, in that order.
 */
export function citations(text: string, passages: Chunk[]): { text: string; cited: number[] } {
  // Passages from the same section share a link, so they share one number: no duplicate sources.
  const cited: number[] = [];
  const urls: string[] = [];
  const out = text.replace(/\s?\[(\d+(?:\s*,\s*\d+)*)\]/g, (_m, nums: string) => {
    const ns = nums.split(",").map((n) => Number(n.trim()) - 1).filter((n) => n >= 0 && n < passages.length && passages[n].id !== "live-today");
    const marks = new Set<number>();
    for (const n of ns) {
      let k = urls.indexOf(passages[n].url);
      if (k < 0) {
        urls.push(passages[n].url);
        cited.push(n);
        k = urls.length - 1;
      }
      marks.add(k + 1);
    }
    return [...marks].map((k) => ` [${k}]`).join("");
  });
  return { text: out.trim(), cited };
}

/** Two words are the same word: equal, or one a plural or inflection of the other ("fees", "fee"). */
const sameWord = (x: string, y: string) => x === y || stemEn(x) === stemEn(y) || (x.length > 4 && y.startsWith(x.slice(0, -1))) || (y.length > 4 && x.startsWith(y.slice(0, -1)));

/**
 * Whether a question asks the same thing as an FAQ's question: every word of the question is in the
 * FAQ's, and at least half of the FAQ's words are in the question.
 * Words are compared as written, not through synonyms, so "find a flat to rent" is not "What is Ejar?"
 * and "is housing free" is not "Do married students get family housing?".
 */
export function sameQuestion(q: string, faqQuestion: string): boolean {
  const a = keyTerms(q);
  const b = keyTerms(faqQuestion);
  if (!a.length || !b.length) return false;
  const shared = (xs: string[], ys: string[]) => xs.filter((x) => ys.some((y) => sameWord(x, y))).length;
  return shared(a, b) === a.length && shared(b, a) / b.length >= 0.5;
}

/** The page a link belongs to, the same for its English and Arabic versions. */
const pageKey = (url: string) => url.replace(/^\/ar(?=\/)/, "").split("#")[0];
const page = (url: string) => url.split("#")[0];

/** "This", "it", "here", "هذا": a question about what the person is reading. */
const POINTS_AT_PAGE = /\b(this|it|that|here|these|those)\b|(^|\s)(هذا|هذه|ذلك|هنا|هذي)(\s|$)/;

/** The first passage of the guide, answer, programme, lesson or profile at `path`, if it is one. */
function pageChunk(chunks: Chunk[], path: string): Chunk | undefined {
  const key = pageKey(path);
  if (!/^\/(guides|ask|programs|duroos\/lesson|duroos\/shaykh)\//.test(key)) return undefined;
  return chunks.find((c) => c.lang !== "ar" && pageKey(c.url) === key);
}

/** A source as shown under the answer: an Arabic answer shows the page's Arabic title when it has one. */
const sourceOf = (c: Chunk, lang: "en" | "ar"): Source => ({ title: lang === "ar" && c.titleAr ? c.titleAr : c.title, ...(c.section ? { section: c.section } : {}), url: c.url });

function relatedOf(passages: Passage[], used: Set<string>, lang: "en" | "ar"): AskResult["related"] {
  const seen = new Set([...used].map(pageKey));
  const out: AskResult["related"] = [];
  for (const p of passages) {
    if (seen.has(pageKey(p.url)) || !(p.kind === "faq" || p.kind === "guide")) continue;
    seen.add(pageKey(p.url));
    out.push({ title: lang === "ar" && p.titleAr ? p.titleAr : p.title, url: page(p.url) });
    if (out.length >= 3) break;
  }
  return out;
}

function uniqueSources(list: Chunk[], lang: "en" | "ar", max = 4): Source[] {
  return [...new Map(list.map((c) => [c.url, sourceOf(c, lang)])).values()].slice(0, max);
}

/** A retriever over the duroos alone, built once per knowledge list. */
const darsRetrievers = new WeakMap<Chunk[], Retriever>();
function darsRetriever(chunks: Chunk[]): Retriever {
  let r = darsRetrievers.get(chunks);
  if (!r) darsRetrievers.set(chunks, (r = createRetriever(chunks.filter((c) => c.kind === "dars"))));
  return r;
}

/** Arabic passages by page, built once per knowledge list. */
const arabicPages = new WeakMap<Chunk[], Map<string, Chunk[]>>();

/** Each English page's sections in order (by anchor; "" is the summary and the text before the first heading). */
const englishSections = new WeakMap<Chunk[], Map<string, string[]>>();
const anchorOf = (url: string) => url.split("#")[1] ?? "";
const inOrder = (list: Chunk[]) => [...new Set(list.map((c) => anchorOf(c.url)))];

/**
 * The Arabic passages under the same heading as an English passage. A translation keeps the English
 * headings in the same order (tests/arabic-complete.test.ts), so the nth section matches the nth; when
 * the counts differ the pages do not line up and nothing is returned.
 */
function sameSection(p: Passage, twins: Chunk[], chunks: Chunk[]): Chunk[] {
  let byPage = englishSections.get(chunks);
  if (!byPage) {
    const lists = new Map<string, Chunk[]>();
    for (const c of chunks) if (c.lang !== "ar") lists.set(pageKey(c.url), [...(lists.get(pageKey(c.url)) ?? []), c]);
    byPage = new Map([...lists].map(([k, v]) => [k, inOrder(v)]));
    englishSections.set(chunks, byPage);
  }
  const en = byPage.get(pageKey(p.url)) ?? [];
  const ar = inOrder(twins);
  const k = en.indexOf(anchorOf(p.url));
  if (k < 0 || en.length !== ar.length) return [];
  return twins.filter((c) => anchorOf(c.url) === ar[k]);
}

/**
 * Each English passage of a translated page swapped for the Arabic passage of that page that answers the
 * question, if one does; Arabic passages that answer go first.
 */
function inArabicWherePossible(found: Passage[], chunks: Chunk[], question: string): Passage[] {
  let pages = arabicPages.get(chunks);
  if (!pages) {
    pages = new Map();
    for (const c of chunks) if (c.lang === "ar") pages.set(pageKey(c.url), [...(pages.get(pageKey(c.url)) ?? []), c]);
    arabicPages.set(chunks, pages);
  }
  if (!pages.size) return found;
  const terms = keyTerms(question);
  const pick = (cands: Chunk[]) => cands.map((c) => ({ c, n: termHits(terms, `${c.title} ${c.section ?? ""} ${c.text}`) })).sort((x, y) => y.n - x.n)[0];
  const seen = new Set<string>();
  const out: Passage[] = [];
  for (const p of found) {
    let q: Passage = p;
    const twins = p.lang === "ar" ? undefined : pages.get(pageKey(p.url));
    if (twins) {
      // The same section in Arabic first (an English "Exit and re-entry visa" passage becomes «تأشيرة الخروج والعودة»,
      // not the summary that names every topic), then the page's best Arabic passage.
      const same = sameSection(p, twins, chunks);
      const near = same.length ? pick(same) : undefined;
      const best = near && answers(question, near.c) ? near : pick(twins);
      if (best && answers(question, best.c)) q = { ...best.c, score: p.score, cover: p.cover };
    }
    if (seen.has(q.id)) continue;
    seen.add(q.id);
    out.push(q);
  }
  // An answer in the reader's language comes first, except the calendar line a "when" question was ranked
  // to (it has no Arabic passage, and "متى الاختبارات النهائية" wants the date, not the page about exams).
  const lead = out[0]?.kind === "date" ? out.slice(0, 1) : [];
  const rest = out.slice(lead.length);
  const answering = (p: Passage) => p.lang === "ar" && answers(question, p);
  return [...lead, ...rest.filter(answering), ...rest.filter((p) => !answering(p))];
}

/**
 * Whether a passage answers the question: it holds the topic words, the rare ones among them, and the
 * rarest the site knows. A site-wide blurb (kind "page") only counts when it holds every topic word.
 * "Work part time on a student visa" is not answered by a passage that only says "student" and "visa".
 */
function answersWell(q: string, p: Passage): boolean {
  if (p.rare === false) return false;
  return p.kind === "page" ? coverage(q, p) === 1 : (answers(q, p) || headed(p)) && (p.cover ?? 1) >= 0.5 && together(q, p);
}

/**
 * For a two-word question ("Tawakkalna account"), the two words are said together: the rarer one in the title or
 * heading, or with the other in the passage's own heading or in one sentence. A section that names the Tawakkalna
 * app in one step and a bank account in another does not answer it, even on a page whose title says "bank account".
 */
function together(q: string, p: Passage): boolean {
  const terms = keyTerms(q);
  const rare = p.rareTerm;
  if (terms.length !== 2 || !rare || !terms.includes(rare)) return true;
  const other = terms.filter((t) => t !== rare);
  if (termHits([rare], `${p.title} ${p.section ?? ""}`)) return true;
  // A section's own heading, or the question an answer answers; a guide's title covers the whole page.
  const own = p.section ?? (p.kind === "faq" ? p.title : "");
  if (termHits(other, own)) return true;
  return sentences(p.text).some((x) => termHits([rare], x) > 0 && termHits(other, x) > 0);
}

/** A section headed with the question's rarest topic word ("Uhud" for "how do I visit Uhud") is about it. */
function headed(p: Passage): boolean {
  return !!p.section && !!p.rareTerm && headingHolds(p.rareTerm, p.section);
}

/** A section headed with the rarest topic word as a name, capitalised ("Uhud", "Quba"), not a common word ("parents"). */
function namedInHeading(p: Passage): boolean {
  if (!headed(p) || !p.rareTerm) return false;
  const term = p.rareTerm;
  return (p.section ?? "").split(/[\s,:()]+/).some((w) => /^[A-Z]/.test(w) && normalize(w).replace(/-/g, " ").startsWith(term.replace(/_/g, " ")));
}

/** The same for a page title or a question ("How do I visit the Rawdah?"). */
function titled(p: Passage): boolean {
  return headed(p) || (!!p.rareTerm && headingHolds(p.rareTerm, p.title.split(":")[0]));
}

/** "Which is the best markaz", "recommend me a doctor", "ما أفضل معهد": MESH lists, it never ranks. */
const RECOMMEND = /\b(best|recommend|recommended|suggest|which (is|are) (better|good)|good (doctor|doctors|hospital|hospitals|markaz|institute|school|schools|dentist|clinic|gym|area|place))\b|افضل|احسن|انصح|تنصح|ترشح/;
const NOT_RECOMMEND = /recommendation letter|letter of recommendation|tazkiy/;
export const asksToRank = (q: string) => RECOMMEND.test(normalize(q)) && !NOT_RECOMMEND.test(normalize(q));

/** In a "which is best" answer, sentences that rank or point to one option first ("start with ...") are left out. */
const RANK_AVOID = new RegExp(`${RANKING.source}|\\bstart (with|at)\\b`, "i");

/** "Who is Shaykh X", "tell me about", "من هو". */
const WHO_Q = /^(who is|who was|tell me about)\b|(^|\s)(من هو|من هي)(\s|$)/;

/** "Who teaches Kitab at-Tawhid", "من يدرس كتاب التوحيد": a question only a dars answers. */
const WHO_TEACHES = /\bwho (teaches|teach|is teaching|gives)\b|(^|\s)(من يدرس|من يشرح)(\s|$)/;

/** "Where can I buy", "where can I get zamzam water", "اين اشتري": the answer must say where the thing is sold or handed out. */
const BUY_Q = /\b(buy|buying|purchase|shop for)\b|\bwhere (can|do|could|should) (i|we|you) get\b|(^|\s)(اشتري|نشتري|يشتري|شراء|ابتاع)(\s|$)/;
const BUY_WORD = /^(buy|buying|purchase|اشتري|شراء|شري)$/;
const SOLD_HERE = /\b(shops?|stores?|markets?|souq|souk|malls?|buy|bought|sold|sells?|haraj|new and used|second hand|second-hand|online|branch(es)?|supermarkets?|kiosks?|counters?)\b|متجر|محل|محلات|سوق|يباع|تباع|شراء|اشتر/i;

/** Words every question about duroos has; a list of duroos is chosen by the other words (the book, the shaykh). */
const DUROOS_WORDS = new Set(["dars", "darss", "duroos", "durus", "doroos", "lesson", "lessons", "class", "classes", "halaqa", "halaqah", "teach", "teaches", "teaching", "taught", "held", "shaykh", "sheikh", "shaikh", "دروس", "درس", "الدرس", "الدروس", "شيخ", "الشيخ", "يدرس", "يشرح"]);

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

  if (isGreeting(q)) {
    return { answer: greetingReply(lang, q), sources: [], related: [], mode: "guard", found: true, lang };
  }

  const ruling = (): AskResult => ({ answer: rulingReply(lang), sources: [{ title: ar ? "الدروس" : "Duroos", url: "/duroos" }], related: [], mode: "guard", found: true, lang });
  if (isRulingQuestion(q)) return ruling();

  // Short follow-ups ("do I need an iqama for that?") are searched with the two questions before them.
  const users = history.filter((t) => t.role === "user").map((t) => t.text);
  const earlier = users.slice(-2).join(" ");
  const short = keyTerms(q).length < 3;
  let searchText = short && earlier ? `${earlier} ${q}` : q;
  // A short follow-up to a ruling question ("and nasheeds?", "وفي السفر؟") is a ruling question too,
  // unless it asks when or where.
  const prev = users[users.length - 1];
  if (short && prev && !asksWhenWhere(q) && (isRulingQuestion(prev) || isRulingQuestion(`${prev} ${q}`))) return ruling();
  const today = riyadhDateIso(now);
  const live = detectLive(searchText, today);
  const cacheable = !live.duroos && !live.prayerTimes && !live.date && history.length === 0;
  // A short first question asked on a page may be about that page, so its answer is kept for that page only.
  const onPageKey = short && !earlier && input.page ? `|${pageKey(input.page)}` : "";
  const key = `${lang}|${normalize(q)}${onPageKey}`;
  const hit = cacheable ? cache.get(key) : undefined;
  if (hit && now.getTime() - hit.at < CACHE_MS) return hit.result;

  const chunks = opts.knowledge ?? (await getKnowledge(db));
  let found = retrieverFor(chunks, lang)(searchText, 6);
  // "How much does it cost?" on the driving licence guide: a short first question that points at the page ("this",
  // "it") or that nothing answers on its own is searched with the title of the page the person is reading.
  const reading = onPageKey ? pageChunk(chunks, input.page!) : undefined;
  if (reading && (POINTS_AT_PAGE.test(normalize(q)) || !found.slice(0, 3).some((p) => answersWell(searchText, p)))) {
    // A guide's title before the colon names it ("Driving in Madinah"); the list after it would steer the search
    // to one subtopic ("renting a car"). Passages of the page itself come first.
    searchText = `${reading.kind === "guide" ? reading.title.split(":")[0] : reading.title} ${q}`;
    const all = retrieverFor(chunks, lang)(searchText, 6);
    // The page's own sections, ranked by the question alone: "how much does it cost?" is its "What it costs".
    const own = createRetriever(chunks.filter((c) => c.lang !== "ar" && pageKey(c.url) === pageKey(reading.url)))(q, 3, 3);
    found = [...new Map([...own.slice(0, 3), ...all].map((p) => [p.id, p])).values()].slice(0, 6);
  }
  // The synonyms find the right page, often through its English text; when that page is translated,
  // its Arabic passage that answers the question takes the English one's place.
  if (ar) found = inArabicWherePossible(found, chunks, searchText);
  // A page found in Arabic is not shown again in English.
  if (ar) {
    const inArabic = new Set(found.filter((p) => p.lang === "ar").map((p) => pageKey(p.url)));
    found = found.filter((p) => p.lang === "ar" || !inArabic.has(pageKey(p.url)));
  }
  // "Where can I buy a fridge": a passage answers only where it says where the thing is sold, not where it mentions selling one.
  if (BUY_Q.test(normalize(q))) found = found.filter((p) => !p.rareTerm || BUY_WORD.test(p.rareTerm) || sentences(p.text).some((x) => termHits([p.rareTerm!], x) > 0 && SOLD_HERE.test(x) && (!/\bsell(s|ing)?\b/i.test(x) || /\b(buy|shops?)\b/i.test(x))));
  /** No answer on MESH: the help line. A question that reads like a ruling gets the ruling reply instead, never "the answer is added to the site". */
  const missing = (): AskResult => {
    if (looksLikeFiqh(q)) return ruling();
    void noteUnanswered(db, q);
    return { answer: notFound(lang), sources: [], related: relatedOf(found, new Set(), lang), mode: "none", found: false, lang };
  };
  // "Who is Shaykh X", "duroos of Shaykh X" for a shaykh MESH does not list: the help line, never another shaykh in his place.
  const profiles = chunks.filter((c) => c.kind === "shaykh");
  const shaykhList = profiles.map((c) => ({ slug: c.url.split("/").pop()!, nameEn: c.title.split(" (")[0], nameAr: c.titleAr ?? "" }));
  const asksWho = WHO_Q.test(normalize(q));
  if ((asksWho || live.duroos || keyTerms(q).some((t) => DUROOS_WORDS.has(t))) && shaykhsNamed(q, shaykhList).unknown) return missing();
  const livePassages: Chunk[] = [];
  if (live.duroos) livePassages.push(await duroosPassage(db, live.duroos, now, ar, searchText));
  if (live.prayerTimes) livePassages.push(prayerTimesPassage(now, ar, live.prayerTimes));
  if (live.date) livePassages.push(datePassage(now, ar));
  const passages: Chunk[] = [...livePassages, ...found];
  const answering = (p: Passage) => answersWell(searchText, p);
  const strong = livePassages.length > 0 || found.slice(0, 3).some(answering);
  const context = [...passages, todayPassage(now, ar)];
  const done = (r: AskResult) => {
    if (cacheable && r.found) {
      if (cache.size > 500) cache.delete(cache.keys().next().value as string);
      cache.set(key, { at: now.getTime(), result: r });
    }
    return r;
  };

  // A question that reads like a ruling and that no page answers ("is stock trading ok") goes to a scholar,
  // not to the model: nothing on MESH answers it, and the model must never be asked for a ruling.
  if (!strong && looksLikeFiqh(q)) return ruling();

  // 1. The question is one MESH has already answered: give that verified answer as it is.
  // No model call, so the free quota is kept for harder questions.
  const faq = !livePassages.length && history.length === 0 ? found.slice(0, 3).find((p) => p.kind === "faq" && sameQuestion(q, p.title)) : undefined;
  if (faq) {
    const intro = ar && faq.lang !== "ar" ? `${ENGLISH_PAGE_AR}\n\n` : "";
    return done({ answer: `${intro}${cite(faq.text, "[1]")}`, sources: uniqueSources([faq], lang), related: relatedOf(found, new Set([faq.url]), lang), mode: "extract", found: true, lang });
  }

  // 2. A free model writes the answer from the passages.
  if (passages.length) {
    const writer = opts.writer ?? ((m: ChatMessage[]) => write(m));
    const messages: ChatMessage[] = [
      { role: "system", content: systemPrompt(lang) },
      ...history.map((t) => ({ role: t.role, content: t.text }) as ChatMessage),
      { role: "user", content: userTurn(q, context, reading && searchText !== q ? reading.title : undefined) },
    ];
    const written = await writer(messages).catch(() => null);
    const reply = written ? parseReply(written.text) : null;
    if (reply) {
      const marked = citations(cleanText(cleanDashes(reply.answer), lang), context);
      if (unsupportedNumbers(marked.text, context, q).length < 2) {
        // Sources in the order of the [n] markers; with no markers, the ones the model listed.
        const listed = reply.sources.filter((n) => n >= 1 && n <= context.length).map((n) => n - 1).filter((i) => context[i].id !== "live-today");
        const order = marked.cited.length ? [...marked.cited, ...listed.filter((i) => !marked.cited.includes(i))] : listed;
        const used = order.map((i) => context[i]);
        // Markers number the sources one to one, so sources are not merged by page here.
        const sources = reply.found ? (marked.cited.length ? used.map((c) => sourceOf(c, lang)) : uniqueSources(used.length ? used : passages.slice(0, 2), lang)) : [];
        const text = reply.found ? marked.text : marked.text.replace(/\s?\[\d+\]/g, "");
        if (!reply.found && looksLikeFiqh(searchText)) return ruling();
        const result: AskResult = { answer: text, sources, related: relatedOf(found, new Set(sources.map((s) => s.url)), lang), mode: "ai", found: reply.found, lang };
        if (!reply.found) void noteUnanswered(db, q);
        return reply.found ? done(result) : result;
      }
    }
  }

  // 3. Live data answers on its own, each block with its source.
  if (livePassages.length) {
    const citer = new Citer();
    const answer = livePassages.map((p) => cite(p.text, citer.mark(p))).join("\n\n");
    return { answer, sources: uniqueSources(citer.used, lang), related: relatedOf(found, new Set(), lang), mode: "live", found: true, lang };
  }

  // 4. Nothing close enough: say so, with the help line.
  if (!strong) return missing();

  // "Who is Shaykh X" asks about the man, not his timetable (step 7 answers it from his profile).
  const who = asksWho && found.slice(0, 3).some((p) => p.kind === "shaykh");

  // 5. Several duroos of one book or one shaykh ("who teaches Kitab at-Tawhid", "دروس الشيخ عبدالرزاق البدر"): list them all.
  const allTerms = keyTerms(searchText);
  const topic = allTerms.filter((t) => !DUROOS_WORDS.has(t));
  const aboutDuroos = topic.length < allTerms.length;
  // A question about duroos searches the duroos on their own too: with many lessons and profiles that mention the
  // same subject, the dars entries can fall out of the overall top six even when the question is about a book.
  // A dars is listed only when it holds the subject: the book or the shaykh, not "book" or "the Haram" ("who teaches
  // the book of fasting in the Haram" is not answered by every book taught in the Haram).
  const subject = topic.filter((t) => !isGeneric(t));
  const words = subject.length ? subject : topic;
  const need = words.length <= 2 ? words.length : Math.ceil(words.length * 0.67);
  const holdsSubject = (c: Chunk) => termHits(words, `${c.title} ${c.titleAr ?? ""} ${c.text}`) >= need;
  const darsFound = aboutDuroos && topic.length && !who ? darsRetriever(chunks)(searchText, 8).filter((p) => answers(searchText, p) && holdsSubject(p)) : [];
  const matching = topic.length && !who ? chunks.filter((c) => c.kind === "dars" && holdsSubject(c)) : [];
  // "Who teaches the book of fasting": only a dars answers who teaches a book. With none on MESH, the help line,
  // never a guide that mentions fasting.
  if (!who && subject.length && WHO_TEACHES.test(normalize(q)) && !matching.length && !darsFound.length) return missing();
  if (!who && topic.length && (found.slice(0, 3).some((p) => p.kind === "dars") || darsFound.length > 1 || (aboutDuroos && found[0].kind === "shaykh"))) {
    const inFound = new Set([...found, ...darsFound].map((p) => p.id));
    const duroos = [...new Map([...matching, ...darsFound].map((c) => [c.url, c])).values()].sort((x, y) => Number(inFound.has(y.id)) - Number(inFound.has(x.id)));
    // Dars titles are "<book> with <shaykh>"; duroos from several mashayikh mean the question is about the book.
    const teachers = new Set(duroos.map((p) => p.title.split(" with ").pop()));
    if (duroos.length > 1 && (found[0].kind === "dars" || teachers.size > 1 || aboutDuroos)) {
      const citer = new Citer();
      const list = duroos.slice(0, 6).map((p) => `- ${p.text} ${citer.mark(p)}`).join("\n");
      const answer = ar ? `${ENGLISH_PAGE_AR}\n\n${list}` : list;
      return done({ answer, sources: uniqueSources(citer.used, lang, 6), related: relatedOf(found, new Set(), lang), mode: "extract", found: true, lang });
    }
  }

  // 6. "Which is the best...": the options side by side, never one of them on its own.
  const top = found.filter((p) => p.kind !== "page" || coverage(searchText, p) === 1);
  if (asksToRank(q)) {
    // A wider search, up to three passages a page, for the section that lists the options. It must answer
    // the question as fully as any other answer does: "best restaurant" is not answered by a library.
    const wide = retrieverFor(chunks, lang)(searchText, 14, 3).filter((p) => (p.kind === "guide" || p.kind === "faq") && answering(p));
    const qTerms = keyTerms(searchText);
    const fit = (p: Chunk) =>
      (/several options|listed alphabetically|in alphabetical order/i.test(p.text.slice(0, 240)) ? 1 : 0) +
      coverage(searchText, p) -
      0.1 * keyTerms(p.title.split(":")[0]).filter((t) => !termHits([t], searchText)).length;
    const lists = wide.filter((p) => /glance|overview|options|compar|which|choos|where to go/i.test(`${p.section ?? ""} ${p.title}`) || /several options|listed alphabetically|in alphabetical order|\boptions\b/i.test(p.text.slice(0, 240)));
    const overview = [...lists].sort((x, y) => fit(y) - fit(x))[0] ?? top.find((p) => (p.kind === "guide" || p.kind === "faq") && answering(p));
    // Every programme on the topic, best-matching tier only, named alphabetically on one line.
    const scored = chunks.filter((c) => c.kind === "program" && !c.section).map((c) => ({ c, n: termHits(qTerms, `${c.title} ${c.text}`) }));
    const best = Math.max(0, ...scored.map((x) => x.n));
    const programs = best >= Math.min(2, qTerms.length) ? scored.filter((x) => x.n === best).map((x) => x.c) : [];
    if (overview || programs.length > 1) {
      const citer = new Citer();
      const text = overview ? extract(searchText, overview, { avoid: RANK_AVOID, max: 700 }) : "";
      // "Side by side" only when there are sides: two or more options listed.
      const options = text.split("\n").filter((l) => /^(-|\d+\.)\s/.test(l)).length + (programs.length > 1 ? 2 : 0);
      const lead = options >= 2 ? (ar ? "يعرض MESH الخيارات جنبًا إلى جنب ولا يفضّل أحدها على غيره." : "MESH lists the options side by side and does not rank them.") : "";
      const blocks = [lead, ar && overview && overview.lang !== "ar" ? ENGLISH_PAGE_AR : ""];
      if (overview && text) blocks.push(cite(text, citer.mark(overview)));
      if (programs.length > 1) blocks.push(programLine(programs, ar, citer));
      return done({ answer: blocks.filter(Boolean).join("\n\n"), sources: uniqueSources(citer.used, lang, 8), related: relatedOf(found, new Set(citer.used.map((c) => c.url)), lang), mode: "extract", found: true, lang });
    }
  }

  // 7. The best sentences of the best passages. "Who is Shaykh X" is answered from his profile, not his timetable.
  // Passages that answer the question come first; one that only shares a word ("buy" a car, for "buy furniture") comes after.
  const fits = (p: Passage) => answers(searchText, p) || headed(p);
  let ordered = [...top.filter(fits), ...top.filter((p) => !fits(p))];
  // When the best passage is headed with a place or name ("Uhud"), a page that only names it in a list (a
  // hospital called Uhud) adds nothing: only passages headed with it, or from the same page, follow.
  if (ordered[0] && namedInHeading(ordered[0])) {
    // Of the sections headed with it, the one all about it ("Uhud") comes before one that names it among others
    // ("Quba, Uhud and the other places").
    const headWords = (p: Passage) => keyTerms(p.section ?? "").length;
    const own = ordered.filter(namedInHeading).sort((x, y) => headWords(x) - headWords(y))[0];
    if (own && headWords(own) < headWords(ordered[0])) ordered = [own, ...ordered.filter((p) => p !== own)];
    ordered = ordered.filter((p, i) => i === 0 || titled(p) || pageKey(p.url) === pageKey(ordered[0].url));
  }
  if (who) {
    // The shaykh the question names (best match of his name, in English or Arabic), and only him.
    const named = shaykhsNamed(q, shaykhList);
    const him = named.size === 1 ? profiles.find((c) => named.has(c.url.split("/").pop()!)) : undefined;
    if (him) ordered.splice(0, ordered.length, { ...him, score: 0 });
    else ordered.sort((x, y) => Number(y.kind === "shaykh") - Number(x.kind === "shaykh"));
  }
  const best = ordered.slice(0, 4).map((p, i) => (who && i === 0 && p.kind === "shaykh" && /\S/.test(p.text.split("\nDuroos:")[0]) ? { ...p, text: p.text.split("\nDuroos:")[0] } : p));
  // A profile is read from its start: the first lines say who he is.
  const profile = who && best.length === 1 && best[0].kind === "shaykh" && !best[0].text.startsWith("Duroos:") ? best[0] : undefined;
  // It opens with his name, so the answer says whom it describes; a line said twice in the profile is said once.
  const lines = profile ? [...new Set(sentences(profile.text))].reduce((acc, x) => (!acc || acc.length + x.length < 480 ? `${acc} ${x}`.trim() : acc), "") : "";
  const nameOf = (c: Chunk) => c.title.split(" (")[0];
  const composed = profile
    ? { text: [ar ? `${profile.titleAr ?? nameOf(profile)}.` : "", ar ? ENGLISH_PAGE_AR : "", cite(`${nameOf(profile)}: ${lines}`, "[1]")].filter(Boolean).join("\n\n"), used: [profile] }
    : composeExtractive(searchText, best, lang, asksToRank(q) ? { avoid: RANKING } : {});
  const sources = composed.used.map((c) => sourceOf(c, lang));
  return done({ answer: composed.text, sources, related: relatedOf(found, new Set(sources.map((s) => s.url)), lang), mode: "extract", found: true, lang });
}
