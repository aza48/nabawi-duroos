/**
 * Finds Qur'an and hadith references in plain text and works out where each one points:
 * quran.com for an ayah or a run of ayat, sunnah.com for a numbered hadith in the six books
 * and Riyad as-Salihin. Pure functions over strings; src/lib/guide-html.ts turns the matches
 * into links inside guide HTML.
 *
 * Being wrong is worse than missing one, so a number only counts when its context makes it a
 * reference: a surah name that agrees with the surah number, the word Qur'an or Surah, brackets
 * straight after a quotation, or the name of a hadith collection. Times, ratios and gate numbers
 * have none of these, and every surah, ayah and hadith number is checked against the real counts.
 */

/** [names in English transliteration, name in Arabic, number of ayat] for surahs 1 to 114, in order. */
const SURAHS: readonly (readonly [readonly string[], string, number])[] = [
  [["al-Fatihah", "Fatiha", "Fateha"], "الفاتحة", 7],
  [["al-Baqarah", "Baqara"], "البقرة", 286],
  [["Al Imran", "Aal-e-Imran", "Ali Imran", "Imran"], "آل عمران", 200],
  [["an-Nisa", "Nisaa", "Nisa'"], "النساء", 176],
  [["al-Ma'idah", "Maida", "Maaidah"], "المائدة", 120],
  [["al-An'am", "Anaam"], "الأنعام", 165],
  [["al-A'raf", "Aaraf"], "الأعراف", 206],
  [["al-Anfal"], "الأنفال", 75],
  [["at-Tawbah", "Taubah", "Tauba", "Bara'ah"], "التوبة", 129],
  [["Yunus", "Yoonus"], "يونس", 109],
  [["Hud", "Hood"], "هود", 123],
  [["Yusuf", "Yousuf", "Yoosuf", "Yusof"], "يوسف", 111],
  [["ar-Ra'd", "Raad"], "الرعد", 43],
  [["Ibrahim", "Ebrahim"], "إبراهيم", 52],
  [["al-Hijr"], "الحجر", 99],
  [["an-Nahl"], "النحل", 128],
  [["al-Isra", "Israa", "Bani Isra'il", "Bani Israel"], "الإسراء", 111],
  [["al-Kahf"], "الكهف", 110],
  [["Maryam", "Mariam"], "مريم", 98],
  [["Ta-Ha", "Taahaa"], "طه", 135],
  [["al-Anbiya", "Anbiyaa"], "الأنبياء", 112],
  [["al-Hajj"], "الحج", 78],
  [["al-Mu'minun", "Muminoon", "Mu'minoon"], "المؤمنون", 118],
  [["an-Nur", "Noor"], "النور", 64],
  [["al-Furqan", "Furqaan"], "الفرقان", 77],
  [["ash-Shu'ara", "Shuaraa"], "الشعراء", 227],
  [["an-Naml"], "النمل", 93],
  [["al-Qasas"], "القصص", 88],
  [["al-Ankabut", "Ankaboot"], "العنكبوت", 69],
  [["ar-Rum", "Room"], "الروم", 60],
  [["Luqman", "Luqmaan", "Lokman"], "لقمان", 34],
  [["as-Sajdah", "Sajda"], "السجدة", 30],
  [["al-Ahzab", "Ahzaab"], "الأحزاب", 73],
  [["Saba", "Saba'"], "سبأ", 54],
  [["Fatir", "Faatir"], "فاطر", 45],
  [["Ya-Sin", "Yaseen", "Yasin"], "يس", 83],
  [["as-Saffat", "Saaffaat"], "الصافات", 182],
  [["Sad", "Saad"], "ص", 88],
  [["az-Zumar"], "الزمر", 75],
  [["Ghafir", "Ghaafir", "al-Mu'min"], "غافر", 85],
  [["Fussilat", "Ha-Mim as-Sajdah"], "فصلت", 54],
  [["ash-Shura", "Shooraa"], "الشورى", 53],
  [["az-Zukhruf"], "الزخرف", 89],
  [["ad-Dukhan", "Dukhaan"], "الدخان", 59],
  [["al-Jathiyah", "Jaathiya"], "الجاثية", 37],
  [["al-Ahqaf", "Ahqaaf"], "الأحقاف", 35],
  [["Muhammad"], "محمد", 38],
  [["al-Fath"], "الفتح", 29],
  [["al-Hujurat", "Hujuraat"], "الحجرات", 18],
  [["Qaf", "Qaaf"], "ق", 45],
  [["adh-Dhariyat", "Dhaariyaat", "Zariyat"], "الذاريات", 60],
  [["at-Tur", "Toor"], "الطور", 49],
  [["an-Najm"], "النجم", 62],
  [["al-Qamar"], "القمر", 55],
  [["ar-Rahman", "Rahmaan"], "الرحمن", 78],
  [["al-Waqi'ah", "Waaqiah"], "الواقعة", 96],
  [["al-Hadid", "Hadeed"], "الحديد", 29],
  [["al-Mujadilah", "Mujaadala", "Mujadalah"], "المجادلة", 22],
  [["al-Hashr"], "الحشر", 24],
  [["al-Mumtahanah", "Mumtahinah", "Mumtahina"], "الممتحنة", 13],
  [["as-Saff"], "الصف", 14],
  [["al-Jumu'ah", "Jumuah", "Jumma", "Juma"], "الجمعة", 11],
  [["al-Munafiqun", "Munaafiqoon"], "المنافقون", 11],
  [["at-Taghabun", "Taghaabun"], "التغابن", 18],
  [["at-Talaq", "Talaaq"], "الطلاق", 12],
  [["at-Tahrim", "Tahreem"], "التحريم", 12],
  [["al-Mulk"], "الملك", 30],
  [["al-Qalam", "Nun", "Noon"], "القلم", 52],
  [["al-Haqqah", "Haaqqa"], "الحاقة", 52],
  [["al-Ma'arij", "Maaarij"], "المعارج", 44],
  [["Nuh", "Nooh"], "نوح", 28],
  [["al-Jinn"], "الجن", 28],
  [["al-Muzzammil", "Muzammil"], "المزمل", 20],
  [["al-Muddaththir", "Muddathir", "Mudathir"], "المدثر", 56],
  [["al-Qiyamah", "Qiyaama"], "القيامة", 40],
  [["al-Insan", "Insaan", "ad-Dahr"], "الإنسان", 31],
  [["al-Mursalat", "Mursalaat"], "المرسلات", 50],
  [["an-Naba", "Naba'"], "النبأ", 40],
  [["an-Nazi'at", "Naziat", "Naaziaat"], "النازعات", 46],
  [["Abasa"], "عبس", 42],
  [["at-Takwir", "Takweer"], "التكوير", 29],
  [["al-Infitar", "Infitaar"], "الانفطار", 19],
  [["al-Mutaffifin", "Mutaffifeen", "Tatfif"], "المطففين", 36],
  [["al-Inshiqaq", "Inshiqaaq"], "الانشقاق", 25],
  [["al-Buruj", "Burooj"], "البروج", 22],
  [["at-Tariq", "Taariq"], "الطارق", 17],
  [["al-A'la", "Alaa"], "الأعلى", 19],
  [["al-Ghashiyah", "Ghaashiya"], "الغاشية", 26],
  [["al-Fajr"], "الفجر", 30],
  [["al-Balad"], "البلد", 20],
  [["ash-Shams"], "الشمس", 15],
  [["al-Layl", "Lail"], "الليل", 21],
  [["ad-Duha", "Dhuha"], "الضحى", 11],
  [["ash-Sharh", "al-Inshirah", "Inshiraah", "Alam Nashrah"], "الشرح", 8],
  [["at-Tin", "Teen"], "التين", 8],
  [["al-Alaq", "Alaq"], "العلق", 19],
  [["al-Qadr"], "القدر", 5],
  [["al-Bayyinah", "Bayyina"], "البينة", 8],
  [["az-Zalzalah", "Zilzal", "Zilzaal"], "الزلزلة", 8],
  [["al-Adiyat", "Aadiyaat"], "العاديات", 11],
  [["al-Qari'ah", "Qaariah"], "القارعة", 11],
  [["at-Takathur", "Takaathur"], "التكاثر", 8],
  [["al-Asr"], "العصر", 3],
  [["al-Humazah", "Humaza"], "الهمزة", 9],
  [["al-Fil", "Feel"], "الفيل", 5],
  [["Quraysh", "Quraish"], "قريش", 4],
  [["al-Ma'un", "Maaoon"], "الماعون", 7],
  [["al-Kawthar", "Kauthar", "Kausar"], "الكوثر", 3],
  [["al-Kafirun", "Kaafiroon"], "الكافرون", 6],
  [["an-Nasr"], "النصر", 3],
  [["al-Masad", "al-Lahab"], "المسد", 5],
  [["al-Ikhlas", "Ikhlaas"], "الإخلاص", 4],
  [["al-Falaq"], "الفلق", 5],
  [["an-Nas", "Naas"], "الناس", 6],
];

/** How many ayat each surah has, so AYAH_COUNTS[s - 1] is the last ayah of surah s. */
export const AYAH_COUNTS: readonly number[] = SURAHS.map((s) => s[2]);

/** The usual English name of each surah, so SURAH_NAMES[s - 1] names surah s. */
export const SURAH_NAMES: readonly string[] = SURAHS.map((s) => s[0][0]);

/** The Arabic name of each surah, so SURAH_NAMES_AR[s - 1] names surah s. */
export const SURAH_NAMES_AR: readonly string[] = SURAHS.map((s) => s[1]);

/** Arabic-Indic and Persian digits become ASCII digits. Every digit stays one UTF-16 unit, so indices do not move. */
export const toAsciiDigits = (s: string) =>
  s.replace(/[٠-٩۰-۹]/g, (d) => String((d.charCodeAt(0) & 0xf) % 10));

const APOSTROPHES = /['’ʼ‘`´]/g;
const SURAH_WORD = /^(?:surah|surat|sura|soorah|suratu|سوره|سورت)(?:[\s-]+|$)/;
const ARTICLE = /^(?:a(?:dh|sh|th|l|n|r|s|t|d|z)|el|aal|aali|ali)(?:-e)?[\s-]+/;
/** The same article in the text as written, keeping its case and what joins it to the name. */
const ARTICLE_RAW = /^(a(?:dh|sh|th|l|n|r|s|t|d|z)|el|aal|aali|ali)((?:-e)?[\s-]+)/i;
const SURAH_WORD_ANY_CASE = new RegExp(SURAH_WORD.source, "i");

/**
 * A spelling-insensitive key for a surah name, in either script. Marks, apostrophes, hyphens,
 * spaces and the article go; common English spelling variants (ee, oo, y, w, doubled letters,
 * a final h) fold together; Arabic alef, ya and ta marbuta forms fold together.
 * `surahWord` says whether the name started with "Surah" or "سورة".
 */
export function surahNameKey(raw: string): { key: string; surahWord: boolean } {
  let k = raw.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase().replace(/ـ/g, "").replace(/ى/g, "ي").replace(/ة/g, "ه").trim();
  const surahWord = SURAH_WORD.test(k);
  k = k.replace(SURAH_WORD, "");
  if (/[a-z]/.test(k)) {
    k = k
      .replace(APOSTROPHES, "")
      .replace(ARTICLE, "")
      .replace(/[\s-]+/g, "")
      .replace(/ee/g, "i")
      .replace(/oo|ou/g, "u")
      .replace(/y/g, "i")
      .replace(/w/g, "u")
      .replace(/(.)\1+/g, "$1")
      .replace(/([aiu])h$/, "$1");
  } else {
    k = k.replace(/[\s-]+/g, "");
  }
  return { key: k, surahWord };
}

/** Name key to surah number, for every spelling in the table. */
export const SURAH_BY_KEY: ReadonlyMap<string, number> = new Map(
  SURAHS.flatMap(([en, ar], i) => [...en, ar].map((n) => [surahNameKey(n).key, i + 1] as const)),
);

/**
 * Surah names that are also everyday words, prayers, people or abbreviations. Written as
 * "Name: 286" with no brackets, they only count after "Surah" or "سورة".
 */
const LOOSE_NAMES = new Set(
  [
    "الفجر", "العصر", "الضحى", "الليل", "الشمس", "القمر", "النجم", "النور", "الناس", "الجمعة", "الحج", "الفتح", "الملك",
    "النصر", "القدر", "البلد", "الطلاق", "الحديد", "الروم", "النحل", "النمل", "الإنسان", "القلم", "الكهف", "التين", "الفيل",
    "الطور", "الحجر", "الجن", "الصف", "العلق", "محمد", "يوسف", "يونس", "إبراهيم", "مريم", "نوح", "هود", "لقمان", "سبأ",
    "طه", "يس", "ص", "ق", "قريش", "فاطر", "غافر", "عبس",
  ].map((n) => surahNameKey(n).key),
);
/** One-letter names that also abbreviate "page" and the like: never without "Surah", even in brackets. */
const LETTER_NAMES = new Set(["ص", "ق", "ن"]);

/** quran.com address for an ayah or a run of ayat, or null when the surah or ayat do not exist. */
export function quranHref(surah: number, from: number, to?: number): string | null {
  const count = AYAH_COUNTS[surah - 1];
  if (!count || from < 1 || from > count) return null;
  if (to === undefined || to === from) return `https://quran.com/${surah}/${from}`;
  if (to < from || to > count) return null;
  return `https://quran.com/${surah}/${from}-${to}`;
}

/** sunnah.com collections: slug and the highest hadith number in its numbering. */
export const HADITH_BOOKS = {
  bukhari: 7563,
  muslim: 3033,
  abudawud: 5274,
  tirmidhi: 3956,
  nasai: 5761,
  ibnmajah: 4341,
  riyadussalihin: 1906,
} as const;
export type HadithBook = keyof typeof HADITH_BOOKS;

/** sunnah.com address for a hadith, or null when the number is outside the collection. */
export function hadithHref(book: HadithBook, n: number, suffix = ""): string | null {
  if (!Number.isInteger(n) || n < 1 || n > HADITH_BOOKS[book]) return null;
  return `https://sunnah.com/${book}:${n}${suffix}`;
}

export type ScriptureRef = {
  kind: "quran" | "hadith";
  /** Where the link text starts and ends in the text searched (end is exclusive). */
  start: number;
  end: number;
  href: string;
};

/* ---------- Text helpers ---------- */

const DASH = "[-\\u2010\\u2011\\u2013\\u2014]";
const RANGE = `(?:\\s?${DASH}\\s?([1-9]\\d{0,2}))?`;
/** Not followed by more digits, a decimal or another clock field. */
const NUM_END = "(?!\\d|[:.,\\u066b]\\d)";
const TIME_AFTER = new RegExp(`^\\s*(?:[ap]\\.?\\s?m\\b|(?:${DASH}|to\\b|until\\b|till\\b)\\s*\\d{1,2}[:.]\\d)`, "i");

const LETTERS = "[\\p{L}\\p{M}'\\u2019\\u02bc\\u2018-]+";
const TRAILING_WORDS = new RegExp(`(?:${LETTERS}[ \\t\\u00a0]+){0,3}${LETTERS}$`, "u");

/**
 * The surah named by the words just before `end`, trying the longest run of up to four words
 * first. Returns where the name starts, its surah number (null for a bare "Surah") and whether
 * it was written with "Surah", "سورة" or an article.
 */
function nameBefore(
  s: string,
  end: number,
): { start: number; surah: number | null; surahWord: boolean; key: string; formal: boolean; hyphen: boolean } | null {
  const m = s.slice(0, end).match(TRAILING_WORDS);
  if (!m || m.index === undefined) return null;
  const words: { at: number; text: string }[] = [];
  for (const w of m[0].matchAll(/\S+/g)) words.push({ at: m.index + w.index!, text: w[0] });
  for (let k = words.length; k >= 1; k--) {
    const first = words[words.length - k];
    const raw = s.slice(first.at, end);
    // A hyphen at either end belongs to something else, as in "x-" or "-al".
    if (/^[-‐‑]|[-‐‑]$/.test(raw)) continue;
    const { key, surahWord } = surahNameKey(raw);
    // The article counts only when written like one: "at-Tur", "At Tur", "Al Imran". A lower-case
    // "at", "an" or "as" on its own is English ("at noon"), so the name starts after it.
    const art = raw.replace(SURAH_WORD_ANY_CASE, "").match(ARTICLE_RAW);
    const hyphen = !!art && art[2].includes("-");
    if (art && !hyphen && !/^[A-Z]/.test(art[1]) && !surahWord) continue;
    const formal = surahWord || !!art;
    if (!key && surahWord) return { start: first.at, surah: null, surahWord, key, formal: true, hyphen };
    const surah = SURAH_BY_KEY.get(key);
    if (surah) return { start: first.at, surah, surahWord, key, formal, hyphen };
  }
  return null;
}

/** Spans [open, close) of text inside double quotes, guillemets or ornate Qur'an brackets. */
function quotedSpans(s: string): [number, number][] {
  const spans: [number, number][] = [];
  const open: Record<string, number> = {};
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    const toggle = c === '"' ? "straight" : c === "﴾" || c === "﴿" ? "ornate" : null;
    if (toggle) {
      if (open[toggle] === undefined) open[toggle] = i;
      else {
        spans.push([open[toggle], i]);
        delete open[toggle];
      }
    } else if (c === "“") open.curly ??= i;
    else if (c === "”" && open.curly !== undefined) {
      spans.push([open.curly, i]);
      delete open.curly;
    } else if (c === "«") open.guillemet ??= i;
    else if (c === "»" && open.guillemet !== undefined) {
      spans.push([open.guillemet, i]);
      delete open.guillemet;
    }
  }
  // An unclosed quote runs to the end of the text.
  for (const at of Object.values(open)) spans.push([at, s.length]);
  return spans;
}

const CLOSING_QUOTE = /["”»﴾﴿]\s*$/;

/** True when the closing quote at `close` ends a quotation of at least four words. */
function longQuoteEndsAt(s: string, close: number): boolean {
  const span = quotedSpans(s).find(([, b]) => b === close);
  return !!span && (s.slice(span[0] + 1, close).match(/\S+/g)?.length ?? 0) >= 4;
}

/* ---------- Clock times ---------- */

/** "4:30", "17:05": an hour of the day and exactly two minute digits. */
const isClock = (h: string, mm: string) => +h <= 23 && /^[0-5]\d$/.test(mm);
/** Every clock-shaped number in a run of text. */
const CLOCK = /(?<![\p{N}:.,/])([01]?\d|2[0-3])\s?:\s?([0-5]\d)(?!\d)/gu;
/** Words after a number that make it a time of day: "Quran 9:30 every day", "4:15 daily", "5:00 Saturdays". */
const SCHEDULE_AFTER =
  /^\s*(?:every|each|daily|nightly|weekly|weekdays?|weekends?|(?:on\s+)?(?:mon|tues?|wed(?:nes)?|thu(?:rs)?|fri|sat(?:ur)?|sun)(?:day)?s?)\b/i;

/* ---------- Qur'an ---------- */

/** "2:286", "2:255-257", "49 : 13". The context before decides whether it is an ayah. */
const COLON_REF = new RegExp(`(?<![\\p{N}:.,/])([1-9]\\d{0,2})\\s?:\\s?([1-9]\\d{0,2})${RANGE}${NUM_END}`, "gu");
/** The word Qur'an (any spelling) or Q, written just before the numbers. */
const QURAN_WORD = /(?<![\p{L}\p{N}])(?:(?:al-)?Qur['’ʼ]?[aā]n|Koran|Q\.?)(?:\s*,)?\s*$/iu;
/** The same word just after an opening bracket: "(Qur'an " before a number. */
const QURAN_WORD_IN_BRACKETS = new RegExp(`[(\\[]\\s*${QURAN_WORD.source}`, "iu");
/** "ayah 286", "verses 255-257", "الآية ٢٨٦", "الآيات ٢٥٥-٢٥٧". */
const AYAH_WORD_REF = new RegExp(
  `(?<![\\p{L}\\p{N}])(?:ayah|ayahs|ayat|aayah|ayaat|aya|verses?|vv?\\.|الآية|الاية|الآيات|الايات|آية|آيات|اية|الآيتان|الآيتين)\\s*([1-9]\\d{0,2})(?:\\s?(?:${DASH}|to|إلى|الى)\\s?([1-9]\\d{0,2}))?${NUM_END}`,
  "giu",
);
/** "al-Baqarah: 286", "البقرة: ٢٨٦", inside brackets or not. */
const NAME_COLON_REF = new RegExp(`\\s?:\\s?([1-9]\\d{0,2})${RANGE}${NUM_END}`, "gu");

function findQuran(n: string, add: (r: ScriptureRef) => void) {
  const clocks = [...n.matchAll(CLOCK)];
  // 1. Surah and ayah as numbers: "al-Baqarah 2:286", "Qur'an 49:13", "Surah 2:255", or "(2:286)" after a quotation.
  for (const m of n.matchAll(COLON_REF)) {
    const at = m.index!;
    const end = at + m[0].length;
    const after = n.slice(end);
    if (TIME_AFTER.test(after)) continue;
    const href = quranHref(+m[1], +m[2], m[3] ? +m[3] : undefined);
    if (!href) continue;
    const clock = !m[3] && isClock(m[1], m[2]);
    const closed = /^\s*[)\]]/.test(after);
    const before = n.slice(0, at);
    const word = before.match(QURAN_WORD);
    const quranWord = word?.[0].trim() ?? "";
    // A lone "Q" is a citation only in brackets, as in "(Q 4:15)"; a lower-case "q" never is.
    const lone = /^q\.?,?$/i.test(quranWord);
    const wordOpened = !!word && /[(\[]\s*$/.test(before.slice(0, word.index!));
    if (word && (!lone || (/^Q/.test(quranWord) && wordOpened && closed))) {
      // "Quran 4:30" in a timetable is a class time. A clock-shaped number counts only in
      // brackets, with no other time in the same text and no "every day" after it.
      if (clock) {
        const otherTime = clocks.some((c) => c.index !== at && !QURAN_WORD_IN_BRACKETS.test(n.slice(0, c.index)));
        if (!(wordOpened && closed) || otherTime || SCHEDULE_AFTER.test(after.replace(/^\s*[)\]]/, ""))) continue;
      }
      add({ kind: "quran", start: word.index!, end, href });
      continue;
    }
    const trimmed = before.replace(/[\s,]*$/, "");
    const bracket = /[(\[]\s*$/.test(before);
    const nameEnd = bracket ? before.replace(/[(\[]\s*$/, "").replace(/\s*$/, "").length : trimmed.length;
    const name = nameBefore(n, nameEnd);
    if (name && (name.surah === +m[1] || (name.surah === null && !bracket))) {
      if (bracket) {
        if (closed) add({ kind: "quran", start: at, end, href });
      } else add({ kind: "quran", start: name.start, end, href });
      continue;
    }
    // "(2:286)" straight after a quotation: the quotation must be an ayah in ornate brackets, or
    // a long quotation followed by a number that is not a time ("“Haram” (8:30)" is a bus).
    const quote = before.replace(/[(\[]\s*$/, "").match(CLOSING_QUOTE);
    if (bracket && quote && closed) {
      const close = quote.index!;
      if (/[﴾﴿]/.test(n[close]) || (!clock && longQuoteEndsAt(n, close))) add({ kind: "quran", start: at, end, href });
    }
  }

  // 2. Surah by name or number, then the ayah: "Surah al-Baqarah, ayah 286", "سورة البقرة، الآية ٢٨٦".
  for (const m of n.matchAll(AYAH_WORD_REF)) {
    const at = m.index!;
    const end = at + m[0].length;
    const nameEnd = n.slice(0, at).replace(/[\s,،:]*$/, "").length;
    let surah: number | null = null;
    let start = -1;
    const num = n.slice(0, nameEnd).match(/(?<![\p{L}\p{N}])(?:surah|surat|sura|soorah|سورة|سوره)\s*([1-9]\d{0,2})$/iu);
    if (num) {
      surah = +num[1];
      start = num.index!;
    } else {
      const name = nameBefore(n, nameEnd);
      if (name?.surah && nameCanCite(name, n)) {
        surah = name.surah;
        start = name.start;
      }
    }
    if (!surah) continue;
    const href = quranHref(surah, +m[1], m[2] ? +m[2] : undefined);
    if (href) add({ kind: "quran", start, end, href });
  }

  // 3. Name, colon, ayah: "(al-Baqarah: 286)", "[البقرة: ٢٨٦]", "البقرة: ٢٨٦", "سورة البقرة: ٢٨٦".
  for (const m of n.matchAll(NAME_COLON_REF)) {
    const at = m.index!;
    const end = at + m[0].length;
    if (TIME_AFTER.test(n.slice(end))) continue;
    const name = nameBefore(n, at);
    if (!name?.surah) continue;
    const opened = /[(\[]\s*$/.test(n.slice(0, name.start));
    const closed = /^\s*[)\]]/.test(n.slice(end));
    const bracketed = opened && closed;
    if (!name.surahWord) {
      if (LETTER_NAMES.has(name.key)) continue;
      if (bracketed) {
        // "(Fajr: 5)" is a prayer time; "(al-Fajr: 5)" is a citation.
        if (/[a-z]/.test(name.key) && (LOOSE_LATIN.has(name.key) || HOMOGRAPHS.has(name.key)) && !name.formal) continue;
      } else {
        const latin = /[a-z]/.test(name.key);
        // Bare "Name: 286" needs an article in English, and a name that is not an everyday word.
        if (LOOSE_NAMES.has(name.key) || (latin && !name.formal)) continue;
        if (latin && LOOSE_LATIN.has(name.key)) continue;
        // In English the number must end the phrase, not start a count of something.
        if (latin && /^\s*\p{L}/u.test(n.slice(end))) continue;
      }
    }
    const href = quranHref(name.surah, +m[1], m[2] ? +m[2] : undefined);
    if (href) add({ kind: "quran", start: name.start, end, href });
  }
}

/**
 * Whether a surah name with no "Surah" before it can start "<name>, verse N". Arabic names that
 * are common words need "سورة". English names need the article or a capital letter, and names
 * that are everyday English words or given names ("a sad verse", "the noon verse") need
 * "Surah" or a joined article, as in "an-Nur".
 */
function nameCanCite(name: { start: number; surahWord: boolean; key: string; formal: boolean; hyphen: boolean }, n: string): boolean {
  if (name.surahWord) return true;
  if (!/[a-z]/.test(name.key)) return !LOOSE_NAMES.has(name.key);
  if (HOMOGRAPHS.has(name.key)) return name.hyphen;
  if (LOOSE_LATIN.has(name.key)) return name.formal;
  return name.formal || /^\p{Lu}/u.test(n.slice(name.start));
}

/** English names that are also prayers, people or everyday words. */
const LOOSE_LATIN = new Set(
  ["al-Fajr", "al-Asr", "ad-Duha", "al-Layl", "ash-Shams", "al-Qamar", "an-Najm", "an-Nur", "an-Nas", "al-Jumu'ah", "al-Hajj", "al-Fath", "al-Mulk", "an-Nasr", "al-Qadr", "al-Balad", "at-Talaq", "at-Tin", "al-Fil", "al-Jinn", "al-Insan", "al-Kahf"].map(
    (n) => surahNameKey(n).key,
  ),
);

/** Surah names spelt like everyday English words or given names: "sad", "room", "teen", "noon", "Hood". */
const HOMOGRAPHS = new Set(
  ["Sad", "Room", "Rum", "Teen", "Tin", "Feel", "Fil", "Noon", "Nun", "Hood", "Hud", "Saba", "Nur", "Noor", "Juma", "Jumma", "Qaf", "Nas", "Yasin"].map(
    (n) => surahNameKey(n).key,
  ),
);

/* ---------- Hadith ---------- */

const HADITH_NAMES: readonly [HadithBook, string][] = [
  ["bukhari", "(?:sahih\\s+)?(?:(?:al|el)[-\\s])?bukh[a\\u0101]r[i\\u012b]|(?:صحيح\\s+)?البخاري"],
  ["muslim", "(?:sahih\\s+)?muslim|(?:صحيح\\s+)?مسلم"],
  ["abudawud", "(?:sunan\\s+)?ab[iu\\u016b]\\s*d[a\\u0101](?:w[uo\\u016b]{1,2}|['\\u2019]?u)d|(?:سنن\\s+)?(?:أبو|ابو|أبي|ابي)\\s+داود"],
  ["tirmidhi", "(?:(?:jami['\\u2019`]?|sunan)\\s+)?(?:(?:at|al)[-\\s])?tirmidh[i\\u012b]|(?:(?:جامع|سنن)\\s+)?الترمذي"],
  ["nasai", "(?:sunan\\s+)?(?:(?:an|al)[-\\s])?nas[a\\u0101]{1,2}['\\u2019\\u02bc]?(?:i|ee|\\u012b)|(?:سنن\\s+)?النسائي"],
  ["ibnmajah", "(?:sunan\\s+)?ibn[-\\s]+m[a\\u0101]{1,2}jah?|(?:سنن\\s+)?ابن\\s+ماج[هة]"],
  ["riyadussalihin", "riy[a\\u0101]dh?[-\\s]*(?:(?:as|us|al|a[sl]s?)[-\\s]*)?s[a\\u0101]l[i\\u012b]h[i\\u012be]{1,2}n|رياض\\s+الصالحين"],
];

/** Collection, then the number: "Sahih al-Bukhari 6018", "Muslim no. 2699", "البخاري (١)", "مسلم برقم ٢٦٩٩". */
const HADITH_REF = new RegExp(
  `(?<![\\p{L}\\p{M}-])(?:و(?=[\\u0627\\u0623\\u0645\\u0633\\u062c\\u0631\\u0635]))?(${HADITH_NAMES.map(([, re]) => `(${re})`).join("|")})` +
    `(\\s*[,:\\u060c]?\\s*(?:[(\\[]\\s*)?(?:(?:no\\.?|number|hadith|#|برقم|رقم|حديث\\s+رقم|ح)\\s*[:.]?\\s*)?)([1-9]\\d{0,3})([a-h])?(\\s*[)\\]])?(?![\\p{L}\\p{N}]|[:.,]\\d|\\s*${DASH}\\s*\\d)`,
  "giu",
);

/** Words that make "Muslim" an adjective or a person, not the collection: "every Muslim 18 and over", "طالب مسلم ١٢". */
const NOT_THE_BOOK =
  /(?:^|[^\p{L}])(?:a|an|the|every|each|any|one|no|per|all|some|non|fellow|his|her|my|your|our|their|i|am|is|are|was|be|كل|أي|لكل|على|غير|أنا|انا|هو|هي|نحن|أنت|انت|طالب|طالبة|طلاب|رجل|امرأة|شخص|أخ|أخت|مواطن|مقيم|زائر)\s+$/iu;
/** What follows a count of people or time, not a hadith number: "Muslim 18 and over", "Muslim 5 days a week". */
const COUNTED =
  /^\s*(?:%|\+|percent|and\s+(?:over|above|older|up)|or\s+(?:over|older|more|above)|years?|yrs?|students?|men|women|people|famil|countr|times|brothers?|sisters?|children|kids|days?|weeks?|months?|hours?|hrs?|nights?|minutes?|mins?|per\b|سنة|سنوات|عام|طالب|يوم|أيام|ايام|أسبوع|اسبوع|شهر|أشهر|ساعة|ساعات|ليلة|ليال|دقيقة)/iu;
/** Words just before a collection that make what follows a citation: "رواه مسلم", "narrated by Muslim", "in Muslim". */
const CITED_BY = /(?:^|[^\p{L}])(?:رواه|أخرجه|اخرجه|خرجه|narrated\s+by|reported\s+by|recorded\s+by|related\s+by|transmitted\s+by|collected\s+by|in)\s*$|[(\[]\s*$/iu;
/** "Bukhari 1 and Muslim 1907", "البخاري ١ ومسلم ١٩٠٧": a second collection named with the first. */
const JOINT = /(?:bukh[aā]r[iī]|البخاري)[^.;!?؟\u0001]{0,40}(?:\band|&|,|،|و)\s*$/iu;
/** "no. 2699", "#2699", "برقم ٢٦٩٩", or an opening bracket, between the collection and the number. */
const NUMBER_MARK = /[(\[#]|no\b|number|hadith|رقم|ح/i;

/**
 * Whether a plain "Muslim" or "مسلم" (no "Sahih") before a number is the collection. It needs a
 * citation around it: "رواه" or "narrated by" before it, Bukhari named with it, a "no." or a
 * bracket, or a closing bracket or the end of the sentence straight after the number when
 * nothing but punctuation comes before the name.
 */
function muslimIsCited(before: string, sep: string, close: string | undefined, after: string): boolean {
  if (NOT_THE_BOOK.test(before) || COUNTED.test(after)) return false;
  if (CITED_BY.test(before) || JOINT.test(before) || NUMBER_MARK.test(sep) || close) return true;
  return !/\p{L}\s*$/u.test(before) && /^\s*(?:[.;!?؟؛)\]\u0001]|$)/u.test(after);
}

function findHadith(n: string, add: (r: ScriptureRef) => void) {
  for (const m of n.matchAll(HADITH_REF)) {
    const groups = m.slice(2, 2 + HADITH_NAMES.length);
    const which = groups.findIndex((g) => g !== undefined);
    if (which < 0) continue;
    const [book] = HADITH_NAMES[which];
    const nameAt = m.index! + m[0].indexOf(m[1]);
    const rest = m.slice(2 + HADITH_NAMES.length);
    const [sep, digits, suffix, close] = rest;
    const end = m.index! + m[0].length;
    // Brackets must pair: "(1)" keeps both, "1)" drops the stray one.
    const opened = /[(\[]/.test(sep);
    const linkEnd = opened && close ? end : end - (close?.length ?? 0);
    if (opened && !close) continue;
    if (book === "muslim") {
      const name = m[1];
      const sahih = /^(?:sahih|صحيح)/i.test(name);
      // English "Muslim" is the book only when capitalised, and only when cited as one.
      if (!sahih && (/^m/.test(name) || !muslimIsCited(n.slice(0, nameAt), sep, close, n.slice(end)))) continue;
    }
    if (suffix && book !== "muslim") continue;
    const href = hadithHref(book, +digits, suffix?.toLowerCase() ?? "");
    if (href) add({ kind: "hadith", start: nameAt, end: linkEnd, href });
  }
}

/* ---------- Together ---------- */

/**
 * Every Qur'an and hadith reference in `text`, in order and never overlapping. `before` and
 * `after` are the text that comes just before and after it in the same paragraph: they are read
 * for context (a surah name in a previous element, an open quotation, digits that carry on in
 * the next element) but nothing in them is returned. A reference that starts in `before` is cut
 * to the part inside `text`, unless its number starts there too; one that runs on into `after`
 * is dropped, since its number is split by markup. Indices are relative to `text`.
 * References inside double quotes, guillemets or ornate Qur'an brackets are skipped.
 */
export function findScriptureRefs(text: string, before = "", after = ""): ScriptureRef[] {
  const s = before + text + after;
  const n = toAsciiDigits(s);
  const found: ScriptureRef[] = [];
  const add = (r: ScriptureRef) => found.push(r);
  findQuran(n, add);
  findHadith(n, add);

  const quoted = quotedSpans(s);
  const offset = before.length;
  const out: ScriptureRef[] = [];
  found.sort((a, b) => a.start - b.start || b.end - a.end);
  let last = -1;
  for (const r of found) {
    if (r.end <= offset || r.end > offset + text.length || r.start < last) continue;
    // "Bukhari 1<sup>2</sup>": a number that starts in an earlier element is not this one.
    if (r.start < offset && /\d/.test(n[offset - 1] ?? "") && /\d/.test(n[offset])) continue;
    if (quoted.some(([a, b]) => r.start > a && r.start < b)) continue;
    let start = Math.max(r.start, offset);
    while (start < r.end && /[\s,\u060c:(\[]/.test(s[start])) start++;
    // Cut at the paragraph's start, the link must still hold a number.
    if (!/\d/.test(n.slice(start, r.end))) continue;
    out.push({ ...r, start: start - offset, end: r.end - offset });
    last = r.end;
  }
  return out;
}
