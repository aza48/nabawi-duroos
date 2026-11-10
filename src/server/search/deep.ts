import type { Db } from "@/server/db/client";
import { riyadhDateIso } from "@/lib/time/riyadh";
import { normalize } from "@/lib/search/normalize";
import { getKnowledge, type Chunk } from "@/server/assistant/knowledge";
import { answers, keyTerms, retrieverFor, termHits } from "@/server/assistant/retrieve";
import { datePassage, detectLive, duroosPassage, prayerTimesPassage } from "@/server/assistant/live";
import { sentences } from "@/server/assistant/compose";
import { langOf, sameQuestion } from "@/server/assistant/answer";

/**
 * The search box's second pass, on the server: every sentence of every guide and answer, where the box itself
 * only holds titles, summaries and the start of each page. It finds the section of a long guide that holds the
 * words ("Uhud", "Aramex", "library hours") and links straight to it, and it answers some searches outright:
 * today's adhan times, the Hijri date, the duroos tonight, and an answer MESH has already written.
 */

export type DeepHit = {
  title: string;
  titleAr?: string;
  section?: string;
  /** The sentence of the section that holds the most of the search's words. */
  snippet: string;
  url: string;
  kind: "guide" | "faq" | "date" | "program";
};

/** A reply to the search itself, shown above the results. */
export type Instant = { title: string; text: string; url: string; kind: "live" | "answer" };

export type DeepResult = { instant: Instant | null; hits: DeepHit[] };

const TODAYS_DATE = /^(the )?(hijri|islamic|todays|today s) ?(date|day|month)?$|^(today|date today|hijri date today)$|^(التاريخ الهجري|التاريخ|تاريخ اليوم|التاريخ اليوم|الهجري)$/;

const KINDS = new Set<Chunk["kind"]>(["guide", "faq", "date", "program"]);
const MAX_SNIPPET = 220;

/** The sentence that holds the most of the words, cut to a readable length around them. */
export function snippetOf(text: string, terms: string[]): string {
  const list = sentences(text).map((s) => s.replace(/^•\s*/, ""));
  if (!list.length) return "";
  let best = list[0];
  let n = terms.length ? termHits(terms, best) : 0;
  for (const s of list.slice(1)) {
    const k = termHits(terms, s);
    if (k > n) {
      best = s;
      n = k;
    }
  }
  return best.length <= MAX_SNIPPET ? best : `${best.slice(0, MAX_SNIPPET).replace(/\s+\S*$/, "")}...`;
}

/** The first sentence of an answer: the short answer every MESH answer starts with. */
const lead = (text: string) => sentences(text)[0] ?? text;

export async function deepSearch(db: Db, query: string, locale: "en" | "ar", now = new Date(), knowledge?: Chunk[]): Promise<DeepResult> {
  const q = query.trim().slice(0, 200);
  if (q.length < 2) return { instant: null, hits: [] };
  const lang = /\p{L}/u.test(q) ? langOf(q) : locale;
  const ar = lang === "ar";
  const today = riyadhDateIso(now);

  // Searches that live data answers: "fajr time", "hijri date", "duroos tonight".
  const live = detectLive(q, today);
  // A search is shorter than a question: "hijri date" or "التاريخ الهجري" asks for today's date too.
  if (!live.date && !live.duroos && !live.prayerTimes && TODAYS_DATE.test(normalize(q))) live.date = true;
  let instant: Instant | null = null;
  const fromLive = (c: Chunk): Instant => ({ title: c.title, text: c.text, url: c.url, kind: "live" });
  if (live.prayerTimes) instant = fromLive(prayerTimesPassage(now, ar, live.prayerTimes));
  else if (live.date) instant = fromLive(datePassage(now, ar));
  else if (live.duroos) instant = fromLive(await duroosPassage(db, live.duroos, now, ar, q));

  const chunks = knowledge ?? (await getKnowledge(db));
  const terms = keyTerms(q);
  const found = retrieverFor(chunks, lang)(q, 12, 2).filter((p) => KINDS.has(p.kind) && (answers(q, p) || (p.cover ?? 0) >= 0.5));
  // A search that is one of MESH's questions ("how much is the stipend") shows its short answer.
  const faq = !instant ? found.slice(0, 3).find((p) => p.kind === "faq" && sameQuestion(q, p.title)) : undefined;
  if (faq) instant = { title: faq.title, text: lead(faq.text), url: faq.url, kind: "answer" };

  const seen = new Set<string>();
  const hits: DeepHit[] = [];
  for (const p of found) {
    if (seen.has(p.url)) continue;
    seen.add(p.url);
    hits.push({ title: p.title, ...(p.titleAr ? { titleAr: p.titleAr } : {}), ...(p.section ? { section: p.section } : {}), snippet: snippetOf(p.text, terms), url: p.url, kind: p.kind as DeepHit["kind"] });
    if (hits.length >= 8) break;
  }
  return { instant, hits };
}
