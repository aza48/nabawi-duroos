import MiniSearch from "minisearch";
import { expandQuery, normalize } from "./normalize";

export type SearchType = "guide" | "faq" | "program" | "dars" | "shaykh" | "library" | "discount" | "page";

export type SearchDoc = {
  id: string;
  type: SearchType;
  title: string;
  subtitle?: string;
  text?: string;
  url: string;
};

export type SearchHit = SearchDoc & { score: number };

/** Builds an in-memory search over the docs: prefix, typo-tolerant, synonym-aware, title-weighted. */
export function createSearch(docs: SearchDoc[]) {
  const ms = new MiniSearch<SearchDoc>({
    fields: ["title", "subtitle", "text"],
    storeFields: ["id", "type", "title", "subtitle", "url"],
    processTerm: (t) => normalize(t) || null,
    tokenize: (s) => normalize(s).split(/[\s-]+/),
    searchOptions: {
      boost: { title: 3, subtitle: 1.6, text: 1 },
      prefix: (term) => term.length >= 3,
      fuzzy: (term) => (term.length >= 5 ? 0.25 : term.length >= 4 ? 1 : false),
      combineWith: "OR",
    },
  });
  ms.addAll(docs);
  const boostType: Record<SearchType, number> = { guide: 1.15, faq: 1.1, program: 1.1, shaykh: 1.05, dars: 1, library: 0.95, discount: 0.9, page: 1 };

  return function search(q: string, limit = 30): SearchHit[] {
    if (!q.trim()) return [];
    const raw = normalize(q);
    return ms
      .search(expandQuery(q), {
        // Every word the person typed should count; the synonyms only help.
        boostDocument: (_id, _term, stored) => {
          const t = normalize(`${stored?.title ?? ""} ${stored?.subtitle ?? ""}`);
          const exact = raw.split(" ").every((w) => t.includes(w)) ? 1.6 : 1;
          return exact * (boostType[(stored?.type as SearchType) ?? "page"] ?? 1);
        },
      })
      .slice(0, limit)
      .map((r) => ({ id: r.id, type: r.type, title: r.title, subtitle: r.subtitle, url: r.url, score: r.score }) as SearchHit);
  };
}
