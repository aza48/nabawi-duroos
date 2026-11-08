import MiniSearch from "minisearch";
import { expandQuery, normalize } from "@/lib/search/normalize";
import type { Chunk } from "./knowledge";

/** Words that carry no topic in a question. Removing them lets the real terms decide the ranking. */
const STOP = new Set(
  (
    "a an and are as at be been but by can could did do does doing for from get got had has have how i if in into is it its me my of on or our should so than that the their them then there these they this to too up us was we were what when where which who whom why will with would you your " +
    "please tell know need want any some much many about anyone also just like there's whats what's hi hello salam assalamu alaikum asalamualaikum jazakallah thanks thank madinah medina " +
    "ما ماذا كيف هل من في على الى إلى عن مع هو هي انا أنا او أو ثم لو كان يكون اريد أريد ممكن عندي لي كم اين متى المدينه المنوره مدينه"
  )
    .split(" ")
    .map((w) => normalize(w))
);

export type Passage = Chunk & { score: number };

/** The Arabic article in transliteration ("al-Tawhid", "at-Tawhid", "an-Nawawi"): never a topic on its own. */
const ARTICLES = new Set(["al", "el", "at", "an", "ad", "ar", "as", "ash", "az", "ath", "adh"]);

const keyTerms = (q: string) =>
  normalize(q)
    .split(/[\s-]+/)
    .filter((w) => w && !STOP.has(w) && !ARTICLES.has(w));

/** The question reduced to its topic words, with the site's synonyms added. */
export function searchQuery(q: string): string {
  const core = keyTerms(q).join(" ");
  return expandQuery(core || q);
}

export function createRetriever(chunks: Chunk[]) {
  const ms = new MiniSearch<Chunk>({
    fields: ["title", "section", "text", "keywords"],
    storeFields: ["id"],
    processTerm: (t) => {
      const n = normalize(t);
      return n && !STOP.has(n) ? n : null;
    },
    tokenize: (s) => normalize(s).split(/[\s-]+/),
    searchOptions: {
      boost: { title: 2.4, section: 1.8, text: 1, keywords: 1.5 },
      prefix: (term) => term.length >= 4,
      fuzzy: (term) => (term.length >= 6 ? 0.2 : false),
      combineWith: "OR",
    },
  });
  ms.addAll(chunks);
  const byId = new Map(chunks.map((c) => [c.id, c]));
  // Site-wide blurbs (page) only win when nothing specific does.
  const kindBoost: Record<Chunk["kind"], number> = { faq: 1.2, guide: 1.1, program: 1.05, date: 1.05, page: 0.8, shaykh: 1, dars: 0.95, library: 0.9, discount: 0.85 };

  /**
   * The best passages for a question: at most `perPage` from one page so one long guide cannot
   * crowd out everything else, and nothing far below the best match.
   */
  return function retrieve(q: string, limit = 6, perPage = 2): Passage[] {
    const query = searchQuery(q);
    if (!query.trim()) return [];
    const terms = keyTerms(q);
    const results = ms.search(query, {
      boostDocument: (id) => {
        const c = byId.get(String(id));
        if (!c) return 1;
        // Passages that contain every topic word of the question rank above partial matches.
        const covered = terms.length ? hits(terms, c) / terms.length : 0;
        return kindBoost[c.kind] * (1 + 2 * covered);
      },
    });
    if (!results.length) return [];
    const top = results[0].score;
    const out: Passage[] = [];
    const seen = new Map<string, number>();
    for (const h of results) {
      if (h.score < top * 0.22) break;
      const c = byId.get(String(h.id));
      if (!c) continue;
      const page = c.url.split("#")[0];
      const n = seen.get(page) ?? 0;
      if (n >= perPage) continue;
      seen.set(page, n + 1);
      out.push({ ...c, score: h.score });
      if (out.length >= limit) break;
    }
    return out;
  };
}

/** How much of the question the passage covers, from 0 to 1 (used to judge whether we found an answer at all). */
export function coverage(q: string, c: Pick<Chunk, "title" | "section" | "text">): number {
  const terms = keyTerms(q);
  if (!terms.length) return 0;
  return hits(terms, c) / terms.length;
}

/**
 * How many topic words are in the text. A word counts when it, or one of its synonyms, is there,
 * so an Arabic question can match English text.
 */
export function termHits(terms: string[], text: string): number {
  const hay = ` ${normalize(text)} `;
  const has = (w: string) => hay.includes(w.length <= 3 ? ` ${w} ` : w) || (w.length > 4 && hay.includes(w.slice(0, -1)));
  return terms.filter((t) => has(t) || expandQuery(t).split(" ").slice(1).some((x) => x.length > 2 && has(x))).length;
}

function hits(terms: string[], c: Pick<Chunk, "title" | "section" | "text" | "keywords">): number {
  return termHits(terms, `${c.title} ${c.section ?? ""} ${c.text} ${c.keywords ?? ""}`);
}

/**
 * Whether the passage really answers the question: it holds at least half of the topic words,
 * and at least two of them (or the only one). "Capital of Mongolia" matching a passage on
 * company capital is not an answer.
 */
export function answers(q: string, c: Pick<Chunk, "title" | "section" | "text">): boolean {
  const terms = keyTerms(q);
  if (!terms.length) return false;
  const n = hits(terms, c);
  return n / terms.length >= 0.5 && n >= Math.min(2, terms.length);
}

export { keyTerms };
