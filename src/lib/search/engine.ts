import MiniSearch from "minisearch";
import { arabicBare, expandQuery, knownWords, normalize } from "./normalize";

export type SearchType = "guide" | "faq" | "program" | "dars" | "shaykh" | "library" | "discount" | "page" | "date" | "term";

export type SearchDoc = {
  id: string;
  type: SearchType;
  title: string;
  subtitle?: string;
  /** Arabic title and subtitle, shown to Arabic readers when the item has them. */
  titleAr?: string;
  subtitleAr?: string;
  text?: string;
  /** Arabic body text, in its own field so it does not lengthen (and so weaken) the English text for English searches. */
  textAr?: string;
  url: string;
};

export type SearchHit = SearchDoc & { score: number };

/** The search function, and the spelling it corrected the query to ("apartmnt" is "apartment"), if any. */
export type Search = ((q: string, limit?: number) => SearchHit[]) & { correct: (q: string) => string | null };

const split = (s: string) => normalize(s).split(/[\s-]+/).filter(Boolean);

/** A word and, for Arabic, the same word without its article ("الرحيلي", "رحيلي"). */
const forms = (w: string) => {
  const b = arabicBare(w);
  return b === w ? [w] : [w, b];
};

const ARABIC_LETTER = /[؀-ۿ]/;

/** Builds an in-memory search over the docs: prefix, typo-tolerant, synonym-aware, title-weighted. */
export function createSearch(docs: SearchDoc[]): Search {
  // Guides and answers carry translated Arabic (title and body). It is indexed in fields of its own that only an
  // Arabic search reads, so an English search ranks them exactly as before the translation: otherwise an Arabic
  // synonym of a typed word ("exams", اختبار) lifts every translated page. Every other kind keeps its Arabic title
  // (names, dates, terms) in titleArX, which English searches read as they always have.
  const translated = (d: SearchDoc) => d.type === "guide" || d.type === "faq";
  const ms = new MiniSearch<SearchDoc>({
    fields: ["title", "titleArX", "subtitle", "text", "titleArT", "textAr"],
    storeFields: ["id", "type", "title", "subtitle", "titleAr", "subtitleAr", "url"],
    extractField: (d, field) =>
      field === "titleArX" ? (translated(d) ? undefined : d.titleAr)
      : field === "titleArT" ? (translated(d) ? d.titleAr : undefined)
      : ((d as unknown as Record<string, string | undefined>)[field]),
    processTerm: (t) => {
      const n = normalize(t);
      if (!n) return null;
      const f = forms(n);
      return f.length > 1 ? f : n;
    },
    tokenize: (s) => normalize(s).split(/[\s-]+/),
    searchOptions: {
      boost: { title: 3, titleArX: 3, titleArT: 3, subtitle: 1.6, text: 1, textAr: 1 },
      prefix: (term) => term.length >= 3,
      fuzzy: (term) => (term.length >= 5 ? 0.25 : term.length >= 4 ? 1 : false),
      combineWith: "OR",
    },
  });
  ms.addAll(docs);
  const boostType: Record<SearchType, number> = { guide: 1.15, faq: 1.1, program: 1.1, shaykh: 1.05, dars: 1, library: 0.95, discount: 0.9, page: 0.9, date: 1.1, term: 1.05 };
  // The words of each title, split once: a search compares the query with them for every hit. For an English search
  // a translated guide or answer is compared on its English title only, as above.
  const headsAr = new Map(docs.map((d) => [d.id, split(`${d.title} ${d.titleAr ?? ""} ${d.subtitle ?? ""}`).flatMap(forms)]));
  const headsEn = new Map(docs.map((d) => [d.id, split(`${d.title} ${translated(d) ? "" : d.titleAr ?? ""} ${d.subtitle ?? ""}`).flatMap(forms)]));
  const vocab = vocabulary(docs);

  const correct = (q: string): string | null => {
    const words = split(q);
    let changed = false;
    const out = words.map((w) => {
      const fix = vocab.fix(w);
      if (fix && fix !== w) changed = true;
      return fix ?? w;
    });
    return changed ? out.join(" ") : null;
  };

  const search = (q: string, limit = 30): SearchHit[] => {
    if (!q.trim()) return [];
    // A misspelt word ("apartmnt", "hospitl") is searched as the word it was meant to be, so its synonyms come too.
    const fixed = correct(q);
    const { query, typed, weight } = weighQuery(fixed ?? q, fixed ? split(q) : []);
    // Words that only say "a dars" or "a book" do not decide the title match while a topic word is typed.
    const decisive = typed.filter((w) => !GENERIC.has(w[0]));
    const need = decisive.length ? decisive : typed;
    // Arabic letters in the query search everything; an English query scores the English fields only.
    const arabicQuery = ARABIC_LETTER.test(q);
    const heads = arabicQuery ? headsAr : headsEn;
    return ms
      .search(query, {
        ...(arabicQuery ? {} : { fields: ["title", "titleArX", "subtitle", "text"] }),
        // The words the person typed (and their spellings) count in full; related words only help.
        boostTerm: (term) => weight(term),
        boostDocument: (id, _term, stored) => {
          const t = heads.get(String(id)) ?? [];
          const all = need.length > 0 && need.every((w) => w.some((v) => t.some((x) => x.startsWith(v))));
          const type = (stored?.type as SearchType) ?? "page";
          // A word's meaning answers "iqama" or "mukafaah", not "lost iqama" or "stipend amount": with a word it
          // does not hold, the glossary card steps back for the page about it.
          if (type === "term" && !all) return 0.12 * boostType.term;
          return (all ? 1.6 : 1) * (boostType[type] ?? 1);
        },
      })
      .slice(0, limit)
      .map((r) => ({ id: r.id, type: r.type, title: r.title, subtitle: r.subtitle, titleAr: r.titleAr, subtitleAr: r.subtitleAr, url: r.url, score: r.score }) as SearchHit);
  };
  return Object.assign(search, { correct });
}

/** Particles in transliterated titles ("Kitab at-Tawhid", "Zad al-Ma'ad") and English filler: never a reason to match. */
const PARTICLES = new Set(["al", "el", "at", "ath", "ad", "adh", "ar", "as", "ash", "az", "an", "wa", "wal", "li", "bi", "fi", "of", "the", "a", "and", "in", "on", "for", "to"]);

/** English filler that synonym phrases bring in ("things to do with kids"). A person may type these; a synonym never adds them. */
const FILLER = new Set(["with", "from", "by", "or", "do", "does", "is", "are", "my", "how", "what", "can"]);

/**
 * Words that say a search is about duroos, not which one: "tafsir dars" is about tafsir,
 * "دروس الرحيلي" about al-Ruhayli. Next to another word they weigh little; on their own they count in full.
 */
const GENERIC = new Set(
  ["dars", "darss", "duroos", "durus", "doroos", "lesson", "lessons", "class", "classes", "lecture", "lectures", "halaqa", "halaqah", "shaykh", "sheikh", "shaikh", "درس", "دروس", "الدرس", "الدروس", "شيخ", "الشيخ"].map(normalize)
);

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
 * The words of the site and of the synonym lists, with how often each is used, for correcting a misspelt word.
 * A word that is a known word, or the start of one (the person is still typing), is left alone.
 */
function vocabulary(docs: SearchDoc[]) {
  const count = new Map<string, number>();
  const add = (w: string, n = 1) => {
    if (w.length >= 3 && !/\d/.test(w)) count.set(w, (count.get(w) ?? 0) + n);
  };
  // Arabic words count without their article too: "داخلي" is a known word when the site says "الداخلي".
  for (const d of docs) for (const w of split(`${d.title} ${d.titleAr ?? ""} ${d.subtitle ?? ""} ${d.text ?? ""} ${d.textAr ?? ""}`)) for (const f of forms(w)) add(f);
  // A synonym word is worth many uses: "apartmnt" is "apartment", a word students type, before a rarer word one letter off.
  for (const w of knownWords()) add(w, 5);
  const sorted = [...count.keys()].sort();
  const known = (w: string) => {
    if (count.has(w) || count.has(arabicBare(w))) return true;
    // Binary search for the first word at or after w: a word that starts with it means w is a prefix.
    let lo = 0;
    let hi = sorted.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (sorted[mid] < w) lo = mid + 1;
      else hi = mid;
    }
    return lo < sorted.length && sorted[lo].startsWith(w);
  };
  const fixes = new Map<string, string | null>();
  return {
    fix(w: string): string | null {
      if (w.length < 4 || PARTICLES.has(w) || known(w)) return null;
      const hit = fixes.get(w);
      if (hit !== undefined) return hit;
      const max = w.length >= 8 ? 2 : 1;
      let best: string | null = null;
      let bestD = max + 1;
      let bestN = 0;
      // A dropped letter is the usual slip ("renw", "iqma", "stipnd"), so a longer word wins a tie: "renew", not "rent".
      for (const [x, n] of count) {
        // A typo is rarely in the first letter, and the first letter keeps "fridge" from becoming "bridge".
        if (x[0] !== w[0] || Math.abs(x.length - w.length) > max) continue;
        const d = distance(w, x) - (x.length > w.length ? 0.3 : 0);
        if (d < bestD || (d === bestD && n > bestN)) {
          best = x;
          bestD = d;
          bestN = n;
        }
      }
      const out = bestD <= max ? best : null;
      if (fixes.size > 500) fixes.clear();
      fixes.set(w, out);
      return out;
    },
  };
}

/**
 * Splits a query into what was typed and what the synonym list adds. Particles are dropped unless
 * they are all there is. `typed` holds, per typed word, that word and its other spellings (and, for a
 * corrected query, the words as first typed). Generic words weigh little next to a topic word.
 */
export function weighQuery(q: string, alsoTyped: string[] = []): { query: string; typed: string[][]; weight: (term: string) => number } {
  const words = split(q);
  // Positions, not words, are kept, so the word first typed at each place ("iqma" for "iqama") stays with it.
  const kept = words.map((_, i) => i).filter((i) => !PARTICLES.has(words[i]));
  const at = kept.length ? kept : words.map((_, i) => i);
  const own = at.map((i) => words[i]);
  const first = at.map((i) => alsoTyped[i]);
  const added = expandQuery(own.join(" ")).split(" ").filter((x) => x.length > 1 && !PARTICLES.has(x) && !FILLER.has(x) && !own.includes(x));
  const typed = own.map((w, i) => [...new Set([w, ...forms(w).slice(1), ...(first[i] && first[i] !== w ? [first[i]] : []), ...added.filter((x) => isSpelling(w, x))])]);
  const topical = own.some((w) => !GENERIC.has(w));
  const light = new Set(topical ? typed.filter((t) => GENERIC.has(t[0])).flat() : []);
  const full = new Set(typed.flat());
  return { query: [...own, ...added].join(" "), typed, weight: (term) => (light.has(term) ? 0.3 : full.has(term) ? 1 : 0.5) };
}

/** Question words not worth marking in a title ("how", "my", "كيف"). */
const UNMARKED = new Set(["how", "what", "where", "when", "which", "who", "why", "can", "could", "do", "does", "did", "is", "are", "my", "me", "you", "your", "need", "want", "get", "كيف", "ما", "ماذا", "متي", "اين", "هل", "من", "في", "على", "عن"].map(normalize));

/** The words of a query as typed, with their spellings, for marking them in a result. */
export function queryWords(q: string): string[] {
  return [...new Set(weighQuery(q).typed.filter((t) => !UNMARKED.has(t[0]) && !FILLER.has(t[0])).flat().filter((w) => w.length >= 2))];
}

/** Whether a heading holds every word the query is about ("Uhud" for "uhud", any spelling of each word). */
export function coversAll(heading: string, q: string): boolean {
  const groups = weighQuery(q).typed.filter((t) => !UNMARKED.has(t[0]) && !FILLER.has(t[0]) && !GENERIC.has(t[0]));
  if (!groups.length) return false;
  const parts = split(heading).flatMap(forms);
  return groups.every((g) => g.some((w) => parts.some((x) => x.startsWith(w))));
}

/**
 * A title cut into the parts that match the query and the parts that do not, for <mark>. A word matches
 * when it starts with a typed word or its spelling ("Iqama" for "iqa", "الرحيلي" for "رحيلي").
 */
export function highlight(text: string, words: string[]): { t: string; hit: boolean }[] {
  if (!words.length) return [{ t: text, hit: false }];
  const out: { t: string; hit: boolean }[] = [];
  for (const part of text.split(/(\s+|[-,:;()/]+)/)) {
    if (!part) continue;
    const n = normalize(part);
    const hit = !!n && words.some((w) => n.startsWith(w) || arabicBare(n).startsWith(w) || (n.length >= 4 && w.length > n.length && w.startsWith(n)));
    const last = out[out.length - 1];
    if (last && last.hit === hit) last.t += part;
    else out.push({ t: part, hit });
  }
  return out;
}
