import MiniSearch from "minisearch";
import { expandQuery, normalize } from "@/lib/search/normalize";
import type { Chunk } from "./knowledge";
import { expandTerm, ownForms, rewrite, stemAr, stemEn } from "./words";

/** Words that carry no topic in a question. Removing them lets the real terms decide the ranking. */
const STOP = new Set(
  (
    "a an and are as at be been but by can could did do does doing for from get got had has have how i if in into is it its me my of on or our should so than that the their them then there these they this to too up us was we were what when where which who whom why will with would you your " +
    "please ok okay alright tell know need want any some much many about anyone also just like there's whats what's hi hello salam assalamu alaikum asalamualaikum jazakallah thanks thank madinah medina " +
    // Verbs and words that fit any topic: they must not decide which page answers.
    "happen happens happening best good get getting got find finding see seeing use using available possible way ways go going come coming able allowed tip tips " +
    "near nearby around am pm before after every each better top recommend recommended suggest brother brothers akhi ukhti site website today tonight tomorrow now currently khair khayr she he her his him give gives having take taking make making put " +
    "ما ماذا كيف هل من في على الى إلى عن مع هو هي انا أنا او أو ثم لو كان يكون اريد أريد ممكن عندي لي كم اين متى المدينه المنوره مدينه " +
    "لا اجد ابحث اذهب اروح نروح اصل اوصل احصل يمكن يمكنني استطيع اعرف افضل احسن مره يسمح بعد قبل كل اي لماذا شي شيء هذا هذه ذلك تلك الذي التي عند ان اذا حتي هناك يوجد توجد علي به بها له لها نحن انت طريقه كيفيه ماهو ماهي اليوم الليله غدا الان ارجو سمحت فضلك ابغي ابي ودي احتاج نريد يا بين اخرج دراسي الدراسي دراسيه الدراسيه " +
    // Verbs that fit any topic ("متى تبدأ", "كيف أدخل", "كيف أطلب") and the honorific "الشريفة".
    "تبدا يبدا ادخل يدخل ندخل اطلب يطلب نطلب اشتري الشريفه الشريف شريفه " +
    // "What does mukafa'ah mean", "ما معنى التأجيل": the word asked about is the topic, not "mean".
    "mean means meaning define definition معنى معني يعني"
  )
    .split(" ")
    .map((w) => normalize(w))
);

/** A passage found for a question: `cover` is the share of the question's topic words it holds, rare words counting more. */
export type Passage = Chunk & { score: number; cover?: number; rare?: boolean; rareTerm?: string };

/** The Arabic article in transliteration ("al-Tawhid", "at-Tawhid", "an-Nawawi"), "ibn" and titles in names: never a topic on their own. */
const ARTICLES = new Set(["al", "el", "at", "an", "ad", "ar", "as", "ash", "az", "ath", "adh", "ibn", "bin", "bint", "prof", "dr"]);

/**
 * Words that say a question is about duroos or the Haram, not what it is about: the rarest topic word
 * is looked for among the others ("fasting" in "who teaches the book of fasting in the Haram").
 */
const GENERIC = new Set(["kitab", "book", "books", "teach", "teaches", "teaching", "taught", "dars", "duroos", "lesson", "lessons", "class", "classes", "shaykh", "sheikh", "explanation", "sharh", "haram", "masjid", "nabawi", "mosque", "درس", "دروس", "كتاب", "شرح", "يدرس", "يشرح", "الحرم", "المسجد", "النبوي", "حرم", "مسجد", "نبوي"]);

const LATIN = /[a-z]/;
/**
 * For an Arabic question and an English passage, the topic words that have an English form: an Arabic
 * word with none ("تبدأ") can never be in English text, so it does not count for or against it.
 */
function forPassage(terms: string[], lang: Chunk["lang"] | undefined, arabicQ: boolean): boolean[] {
  const all = terms.map(() => true);
  if (!arabicQ || lang === "ar") return all;
  const latin = terms.map((t) => expandTerm(t).some((x) => LATIN.test(x)));
  return latin.some(Boolean) ? latin : all;
}

/** The topic words of a question: no filler, phrases joined ("final_exit"), Arabic clitics stripped. */
const keyTerms = (q: string) =>
  rewrite(normalize(q))
    .split(/[\s-]+/)
    .filter((w) => w && !STOP.has(w) && !ARTICLES.has(w))
    .map(stemAr)
    .filter((w) => w && !STOP.has(w));

/** The question reduced to its topic words, with the site's synonyms added. */
export function searchQuery(q: string): string {
  const terms = keyTerms(q);
  if (!terms.length) return expandQuery(q);
  const words = new Set<string>();
  // Phrases among the synonyms ("preparatory year") would add their loose words ("year"), so only single words go in.
  for (const t of terms) for (const x of expandTerm(t)) if (!x.includes(" ")) words.add(x);
  for (const t of terms) for (const w of t.split("_")) words.add(w);
  // "عبدالرزاق" is indexed as "عبد الرزاق": the second word finds it.
  for (const t of terms) if (/^عبد[^\s]{3,}/.test(t)) words.add(t.slice(3));
  // An Arabic phrase joined into one term ("الخروج والعودة" is exit_reentry) searches by its English forms
  // only, so an Arabic page that uses the same words would never be found: the question's own words go in too.
  if (ARABIC.test(q) && terms.some((t) => t.includes("_"))) {
    for (const w of normalize(q).split(/[\s-]+/)) if (ARABIC.test(w) && !STOP.has(w) && !ARTICLES.has(w)) words.add(w);
  }
  return [...words].join(" ");
}

const ARABIC = /[؀-ۿ]/;

/** Text prepared for matching: normalised, hyphens as spaces ("re-entry", "al-Badr"), with a space at each end. */
const prep = (text: string) => ` ${normalize(text).replace(/-/g, " ")} `;

/** A test for one word in a prepared text: whole word when short, inside a word otherwise. */
function tester(w: string): (hay: string) => boolean {
  if (w.length <= 3) {
    if (!ARABIC.test(w)) return (hay) => hay.includes(` ${w} `);
    // A short Arabic word can carry "و", "ب", "ل" and "ال" in front ("الحجز" holds "حجز").
    const re = new RegExp(`\\s(?:[وفبلك])?(?:ال)?${w}(?:\\s|ه|ي|ها)`);
    return (hay) => re.test(hay);
  }
  const cut = w.length > 4 ? w.slice(0, -1) : w;
  const st = stemEn(w);
  return (hay) => hay.includes(cut) || (st !== w && hay.includes(st));
}

/** A function counting how many of the terms a prepared text holds (a term or one of its synonyms). */
function matcher(terms: string[], typos = true): (hay: string) => number {
  const tests = terms.map((t) => expandTerm(t).filter((x, i) => i === 0 || x.length > 2).map(tester));
  return (hay: string) => {
    let words: string[] | null = null;
    // A typo ("stipnd") counts when a word in the text is one letter away; only for longer words.
    const near = (w: string) => typos && w.length >= 5 && (words ??= [...new Set(hay.trim().split(/[\s-]+/))]).some((x) => Math.abs(x.length - w.length) <= 1 && oneEdit(w, x));
    let n = 0;
    for (let i = 0; i < terms.length; i++) if (tests[i].some((f) => f(hay)) || near(terms[i])) n++;
    return n;
  };
}

/**
 * How many topic words are in the text. A word counts when it, or one of its synonyms, is there,
 * so an Arabic question can match English text.
 */
export function termHits(terms: string[], text: string): number {
  return terms.length ? matcher(terms)(prep(text)) : 0;
}

/** True when a and b differ by at most one inserted, deleted or changed letter. */
export function oneEdit(a: string, b: string): boolean {
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  if (a.length === b.length) return a.slice(i + 1) === b.slice(i + 1);
  return a.length > b.length ? a.slice(i + 1) === b.slice(i) : a.slice(i) === b.slice(i + 1);
}

const full = (c: Pick<Chunk, "title" | "section" | "text" | "keywords">) => `${c.title} ${c.section ?? ""} ${c.text} ${c.keywords ?? ""}`;

/** "When is Ramadan", "when does the second semester start", "متى الاختبارات": the calendar answers these. */
const WHEN = /^(when|what date|which date|what day)\b|\bwhen (is|does|do|are|will|did)\b|\b(start|starts|begin|begins|end|ends|starting) (date|on)\b|متي|موعد|تاريخ/;

/** A question asking what a word means. */
const DEFINE = /^(what is|what s|whats|what are|what does|define|meaning of|what is the meaning of)\b|\b(mean|means|meaning)\b|(^|\s)(ما معني|معني|ما هو|ما هي|ماهو|ماهي|ايش|وش)(\s|$)/;

export type RetrieveOptions = { limit?: number; perPage?: number };

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
  const hays = new Map(chunks.map((c) => [c.id, prep(full(c))]));
  const titleHays = new Map(chunks.map((c) => [c.id, prep(c.title)]));
  const sectionHays = new Map(chunks.map((c) => [c.id, prep(c.section ?? "")]));
  const titleTerms = new Map<string, string[][]>();
  /** The share of the title's (or the section's) topic words that the question holds; the title before a colon is what the page is about. */
  const focusOf = (c: Chunk, qHay: string) => {
    let tt = titleTerms.get(c.id);
    if (!tt) titleTerms.set(c.id, (tt = [keyTerms(c.title.split(":")[0]), c.section ? keyTerms(c.section) : []].filter((x) => x.length)));
    return Math.max(0, ...tt.map((t) => matcher(t)(qHay) / t.length));
  };
  // Site-wide blurbs (page) only win when nothing specific does.
  const kindBoost: Record<Chunk["kind"], number> = { faq: 1.2, guide: 1.1, program: 1.05, date: 1.05, page: 0.8, shaykh: 1, dars: 0.95, library: 0.9, discount: 0.85, term: 0.7 };

  /**
   * The best passages for a question: at most `perPage` from one page so one long guide cannot
   * crowd out everything else, and nothing far below the best match.
   */
  return function retrieve(q: string, limit = 6, perPage = 2): Passage[] {
    const query = searchQuery(q);
    if (!query.trim()) return [];
    const terms = keyTerms(q);
    const one = terms.map((t) => matcher([t]));
    // Rare words decide more than common ones: "legalise" outweighs "degree" and "certificate".
    const dfs = terms.map((t) => {
      const m = matcher([t], false);
      let df = 0;
      for (const h of hays.values()) if (m(h)) df++;
      return df;
    });
    const weight = dfs.map((df) => Math.log(1 + chunks.length / (1 + df)));
    // The rarest topic word the site knows decides what the question is about: "fridge" in "where can I
    // buy a fridge", "restaurant" in "best restaurant near the Haram". A passage without it does not answer.
    // A phrase no page holds ("white days", "book of fasting") is a topic MESH does not cover.
    const gap = terms.some((t, i) => t.includes("_") && dfs[i] === 0);
    // With three topic words or more, either of the two rarest will do: one of them can be a stray word ("landlords").
    const arabicQ = ARABIC.test(q);
    const rareAmong = (mask: boolean[]) => {
      const pool = dfs.map((df, i) => ({ df, i })).filter((x) => x.df > 0 && mask[x.i]);
      // Words that only say "a dars" or "at the Haram" do not decide the topic while another word can.
      const topical = pool.filter((x) => !GENERIC.has(terms[x.i]));
      const cand = topical.length ? topical : pool;
      return cand
        .sort((x, y) => x.df - y.df || x.i - y.i)
        .slice(0, cand.length >= 3 ? 2 : 1)
        .map((x) => x.i);
    };
    const masks = new Map<string, boolean[]>();
    const maskOf = (c: Chunk) => {
      const key = String(c.lang ?? "en");
      let m = masks.get(key);
      if (!m) masks.set(key, (m = forPassage(terms, c.lang, arabicQ)));
      return m;
    };
    const rarests = new Map<boolean[], number[]>();
    const rarestOf = (mask: boolean[]) => {
      let rs = rarests.get(mask);
      if (!rs) rarests.set(mask, (rs = rareAmong(mask)));
      return rs;
    };
    const rareOf = (c: Chunk, hay: string) => {
      if (gap) return false;
      const rs = rarestOf(maskOf(c));
      return !rs.length || rs.some((i) => one[i](hay) > 0);
    };
    const rareTermOf = (c: Chunk) => {
      const rs = rarestOf(maskOf(c));
      return rs.length ? terms[rs[0]] : undefined;
    };
    const share = (hay: string, mask?: boolean[]) => {
      const total = weight.reduce((a, b, i) => a + (!mask || mask[i] ? b : 0), 0) || 1;
      return one.reduce((s, m, i) => s + ((!mask || mask[i]) && m(hay) ? weight[i] : 0), 0) / total;
    };
    const qHay = prep(`${normalize(q)} ${rewrite(normalize(q)).replace(/_/g, " ")}`);
    const when = WHEN.test(normalize(q));
    // "What is an iqama", "what does mukafa'ah mean", "ما معنى التأجيل": the glossary's meaning answers first.
    const define = DEFINE.test(normalize(q)) && terms.length <= 2;
    const results = ms.search(query, {
      boostDocument: (id) => {
        const c = byId.get(String(id));
        if (!c) return 1;
        // Passages that contain every topic word of the question rank above partial matches.
        const mask = maskOf(c);
        const covered = terms.length ? share(hays.get(c.id)!, mask) : 0;
        // A page whose title is about the question beats one that mentions the words in passing.
        const titled = terms.length ? share(titleHays.get(c.id)!, mask) : 0;
        // A page or section headed with the question's rarest topic word ("Uhud", "The women's gates and
        // prayer areas") beats a list that names it in passing (a hospital called Uhud).
        const rarest = rarestOf(mask)[0];
        const headed = rarest !== undefined && headingHolds(terms[rarest], `${c.title.split(":")[0]} ${c.section ?? ""}`) ? 1.8 : 1;
        // ...and a title or section that is all about the question ("What to bring", "A SIM card") beats a longer one that also uses the word.
        const focus = titled > 0 || c.section ? focusOf(c, qHay) : 0;
        const dated = when && c.kind === "date" && covered >= 0.5 ? 2 : 1;
        // A word's meaning answers only a question about what the word means; anything else is answered by the guides.
        const meaning = c.kind === "term" ? (define && titled === 1 ? 3 : 0.02) : 1;
        // Only Arabic questions see Arabic passages; of two equal answers, the one in Arabic reads better.
        const inArabic = c.lang === "ar" ? 1.25 : 1;
        return kindBoost[c.kind] * dated * meaning * inArabic * headed * (1 + 2 * covered + 1.5 * titled + 0.8 * focus);
      },
    });
    if (!results.length) return [];
    // "When is Ramadan": the calendar passage that holds every topic word answers first.
    // Of several such passages, the one with the most lines holding every word ("first-semester" and "second-semester" finals).
    if (when && terms.length) {
      const all = matcher(terms, false);
      const lines = (c: Chunk) => c.text.split("\n").filter((l) => all(prep(l)) === terms.length).length;
      const dated = results
        .map((h, i) => ({ i, c: byId.get(String(h.id))! }))
        .filter(({ c }) => c?.kind === "date" && share(hays.get(c.id)!, maskOf(c)) === 1)
        .sort((x, y) => lines(y.c) - lines(x.c) || x.i - y.i)[0];
      if (dated && dated.i > 0) results.unshift({ ...results.splice(dated.i, 1)[0], score: results[0].score });
    }
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
      const hay = hays.get(c.id)!;
      out.push({ ...c, score: h.score, cover: terms.length ? share(hay, maskOf(c)) : 0, rare: rareOf(c, hay), rareTerm: rareTermOf(c) });
      if (out.length >= limit) break;
    }
    return out;
  };
}

export type Retriever = ReturnType<typeof createRetriever>;

/**
 * An English passage as the English search sees it: the Arabic title or question kept in its keywords
 * (so an Arabic question finds an untranslated page) is dropped. No English question holds an Arabic
 * word, and the longer field would only lower every keyword match, so English answers would change
 * with each translation added.
 */
const englishOnly = (c: Chunk): Chunk => {
  if (!c.keywords || !ARABIC.test(c.keywords)) return c;
  const keywords = c.keywords.split(/\s+/).filter((w) => w && !ARABIC.test(w)).join(" ");
  // An empty field still counts in the search's average field length, so none at all, as before the translation.
  const { keywords: _arabic, ...rest } = c;
  return keywords ? { ...c, keywords } : rest;
};

/**
 * One retriever per knowledge list and language, built once: English questions search the English
 * passages; Arabic questions search everything, so a page in Arabic and one only in English both answer.
 */
const built = new WeakMap<Chunk[], { en?: Retriever; ar?: Retriever }>();
export function retrieverFor(chunks: Chunk[], lang: "en" | "ar"): Retriever {
  const slot = built.get(chunks) ?? {};
  built.set(chunks, slot);
  return (slot[lang] ??= createRetriever(lang === "ar" ? chunks : chunks.filter((c) => c.lang !== "ar").map(englishOnly)));
}

/**
 * Whether a heading holds the word itself or its own forms ("Uhud", "The women's gates and prayer
 * areas"), not a loose synonym ("Health" for "hospital").
 */
export function headingHolds(term: string, heading: string): boolean {
  const hay = prep(heading);
  return ownForms(term).some((w) => tester(w)(hay));
}

/** How much of the question the passage covers, from 0 to 1 (used to judge whether we found an answer at all). */
export function coverage(q: string, c: Pick<Chunk, "title" | "section" | "text"> & { lang?: Chunk["lang"] }): number {
  const terms = ownTerms(q, c);
  if (!terms.length) return 0;
  return termHits(terms, full(c)) / terms.length;
}

/** The question's topic words that can be in this passage (see forPassage). */
function ownTerms(q: string, c: { lang?: Chunk["lang"] }): string[] {
  const terms = keyTerms(q);
  const mask = forPassage(terms, c.lang, ARABIC.test(q));
  return terms.filter((_, i) => mask[i]);
}

/**
 * Whether the passage really answers the question: it holds at least half of the topic words,
 * and at least two of them (or the only one). "Capital of Mongolia" matching a passage on
 * company capital is not an answer.
 */
export function answers(q: string, c: Pick<Chunk, "title" | "section" | "text"> & { lang?: Chunk["lang"] }): boolean {
  const terms = ownTerms(q, c);
  if (!terms.length) return false;
  const n = termHits(terms, full(c));
  return n / terms.length >= 0.5 && n >= Math.min(2, terms.length);
}

/** Words that only say "a dars", "a book" or "at the Haram": never what a question about duroos is about. */
export const isGeneric = (term: string) => GENERIC.has(term);

export { keyTerms };
