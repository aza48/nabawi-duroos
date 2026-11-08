import MiniSearch from "minisearch";
import { expandQuery, normalize } from "./normalize";

export type SearchType = "guide" | "faq" | "program" | "dars" | "shaykh" | "library" | "discount" | "page";

export type SearchDoc = {
  id: string;
  type: SearchType;
  title: string;
  subtitle?: string;
  /** Arabic title and subtitle, shown to Arabic readers when the item has them. */
  titleAr?: string;
  subtitleAr?: string;
  text?: string;
  url: string;
};

export type SearchHit = SearchDoc & { score: number };

/** Builds an in-memory search over the docs: prefix, typo-tolerant, synonym-aware, title-weighted. */
export function createSearch(docs: SearchDoc[]) {
  const ms = new MiniSearch<SearchDoc>({
    fields: ["title", "titleAr", "subtitle", "text"],
    storeFields: ["id", "type", "title", "subtitle", "titleAr", "subtitleAr", "url"],
    processTerm: (t) => normalize(t) || null,
    tokenize: (s) => normalize(s).split(/[\s-]+/),
    searchOptions: {
      boost: { title: 3, titleAr: 3, subtitle: 1.6, text: 1 },
      prefix: (term) => term.length >= 3,
      fuzzy: (term) => (term.length >= 5 ? 0.25 : term.length >= 4 ? 1 : false),
      combineWith: "OR",
    },
  });
  ms.addAll(docs);
  const boostType: Record<SearchType, number> = { guide: 1.15, faq: 1.1, program: 1.1, shaykh: 1.05, dars: 1, library: 0.95, discount: 0.9, page: 1 };

  return function search(q: string, limit = 30): SearchHit[] {
    if (!q.trim()) return [];
    const { query, typed, weight } = weighQuery(q);
    return ms
      .search(query, {
        // The words the person typed (and their spellings) count in full; related words only help.
        boostTerm: (term) => weight(term),
        boostDocument: (_id, _term, stored) => {
          const t = normalize(`${stored?.title ?? ""} ${stored?.titleAr ?? ""} ${stored?.subtitle ?? ""}`).split(/[\s-]+/);
          const exact = typed.length > 0 && typed.every((w) => w.some((v) => t.some((x) => x.startsWith(v)))) ? 1.6 : 1;
          return exact * (boostType[(stored?.type as SearchType) ?? "page"] ?? 1);
        },
      })
      .slice(0, limit)
      .map((r) => ({ id: r.id, type: r.type, title: r.title, subtitle: r.subtitle, titleAr: r.titleAr, subtitleAr: r.subtitleAr, url: r.url, score: r.score }) as SearchHit);
  };
}

/** Particles in transliterated titles ("Kitab at-Tawhid", "Zad al-Ma'ad") and English filler: never a reason to match. */
const PARTICLES = new Set(["al", "el", "at", "ath", "ad", "adh", "ar", "as", "ash", "az", "an", "wa", "wal", "li", "bi", "fi", "of", "the", "a", "and", "in", "on", "for", "to"]);

/** Edit distance, for telling a spelling of the same word ("tawheed", "tawhid") from a related word ("aqidah"). */
function distance(a: string, b: string): number {
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[b.length];
}

const isSpelling = (w: string, x: string) => w === x || (w.length >= 4 && x.length >= 4 && distance(w, x) <= 2);

/**
 * Splits a query into what was typed and what the synonym list adds. Particles are dropped unless
 * they are all there is. `typed` holds, per typed word, that word and its other spellings.
 */
export function weighQuery(q: string): { query: string; typed: string[][]; weight: (term: string) => number } {
  const words = normalize(q).split(/[\s-]+/).filter(Boolean);
  const kept = words.filter((w) => !PARTICLES.has(w));
  const own = kept.length ? kept : words;
  const added = expandQuery(own.join(" ")).split(" ").filter((x) => x && !own.includes(x));
  const typed = own.map((w) => [w, ...added.filter((x) => isSpelling(w, x))]);
  const full = new Set(typed.flat());
  return { query: [...own, ...added].join(" "), typed, weight: (term) => (full.has(term) ? 1 : 0.3) };
}
