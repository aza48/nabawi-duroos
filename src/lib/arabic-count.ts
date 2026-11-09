import { toArabicDigits } from "@/lib/locale";

/**
 * Arabic count words. Arabic picks the noun's form from the number:
 * 1 "درس واحد", 2 "درسان", 3 to 10 "٣ دروس", 11 to 99 "١١ درسًا", 100 "١٠٠ درس".
 * Numbers are written in digits, so only the noun changes; gender polarity of spelled numbers never applies.
 */

/** Case of the counted phrase. Only the dual (and the 1 form) change spelling: "درسان" (nom) vs "درسين" (acc, gen). */
export type ArCase = "nom" | "acc" | "gen";

export type ArNoun = {
  /** Singular, nominative and genitive: "درس". Used for 1, and for 100, 101, 102, 200... */
  one: string;
  /** Singular accusative when it differs in writing: "درسًا" (defaults to `one`). */
  oneAcc?: string;
  /** Dual: nominative "درسان", oblique (accusative and genitive) "درسين". */
  two: { nom: string; obl: string };
  /** 3 to 10: plural: "دروس". */
  few: string;
  /** 11 to 99: singular accusative (tamyiz): "درسًا", "نتيجة". */
  many: string;
  gender: "m" | "f";
};

const n = (one: string, two: [string, string], few: string, many: string, gender: "m" | "f", oneAcc?: string): ArNoun => ({
  one,
  oneAcc: oneAcc ?? (gender === "m" && many !== one ? many : undefined),
  two: { nom: two[0], obl: two[1] },
  few,
  many,
  gender,
});

export const AR_NOUNS = {
  dars: n("درس", ["درسان", "درسين"], "دروس", "درسًا", "m"),
  masjid: n("مسجد", ["مسجدان", "مسجدين"], "مساجد", "مسجدًا", "m"),
  shaykh: n("شيخ", ["شيخان", "شيخين"], "مشايخ", "شيخًا", "m"),
  guide: n("دليل", ["دليلان", "دليلين"], "أدلة", "دليلًا", "m"),
  question: n("سؤال", ["سؤالان", "سؤالين"], "أسئلة", "سؤالًا", "m"),
  book: n("كتاب", ["كتابان", "كتابين"], "كتب", "كتابًا", "m"),
  file: n("ملف", ["ملفان", "ملفين"], "ملفات", "ملفًا", "m"),
  level: n("مستوى", ["مستويان", "مستويين"], "مستويات", "مستوى", "m"),
  subject: n("مادة", ["مادتان", "مادتين"], "مواد", "مادة", "f"),
  offer: n("عرض", ["عرضان", "عرضين"], "عروض", "عرضًا", "m"),
  result: n("نتيجة", ["نتيجتان", "نتيجتين"], "نتائج", "نتيجة", "f"),
  step: n("خطوة", ["خطوتان", "خطوتين"], "خطوات", "خطوة", "f"),
  programme: n("برنامج", ["برنامجان", "برنامجين"], "برامج", "برنامجًا", "m"),
  minute: n("دقيقة", ["دقيقتان", "دقيقتين"], "دقائق", "دقيقة", "f"),
  hour: n("ساعة", ["ساعتان", "ساعتين"], "ساعات", "ساعة", "f"),
  day: n("يوم", ["يومان", "يومين"], "أيام", "يومًا", "m"),
  night: n("ليلة", ["ليلتان", "ليلتين"], "ليالٍ", "ليلة", "f"),
  week: n("أسبوع", ["أسبوعان", "أسبوعين"], "أسابيع", "أسبوعًا", "m"),
  month: n("شهر", ["شهران", "شهرين"], "أشهر", "شهرًا", "m"),
  year: n("سنة", ["سنتان", "سنتين"], "سنوات", "سنة", "f"),
} satisfies Record<string, ArNoun>;

/** A noun with its adjective already agreed, for "show 3 more duroos" and "3 live duroos". */
export const AR_PHRASES = {
  darsOther: { one: "درس آخر", oneAcc: "درسًا آخر", two: { nom: "درسان آخران", obl: "درسين آخرين" }, few: "دروس أخرى", many: "درسًا آخر", gender: "m" },
  darsLive: { one: "درس مباشر", oneAcc: "درسًا مباشرًا", two: { nom: "درسان مباشران", obl: "درسين مباشرين" }, few: "دروس مباشرة", many: "درسًا مباشرًا", gender: "m" },
} satisfies Record<string, ArNoun>;

export type ArNounKey = keyof typeof AR_NOUNS;

export type ArCountOptions = {
  /** Grammatical case of the whole phrase (default "nom"). Use "gen" after a preposition such as في or بعد. */
  case?: ArCase;
  /** For 1: "wahid" adds واحد or واحدة ("درس واحد", the default); "bare" gives the noun alone ("دقيقة للقراءة"). */
  one?: "wahid" | "bare";
  /** What to say for 0. Defaults to "لا" with the plural: "لا دروس". */
  zero?: string;
  /** Add "+" after the digits ("٦٠+ ملفًا"), for counts that were capped. */
  plus?: boolean;
};

export const arDigits = toArabicDigits;

/** The noun form for a count, without the number. */
export function arNounFor(count: number, noun: ArNounKey | ArNoun, c: ArCase = "nom"): string {
  const w = typeof noun === "string" ? AR_NOUNS[noun] : noun;
  if (!Number.isInteger(count) || count < 0) return w.one;
  const r = count >= 100 ? count % 100 : count;
  if (count === 1) return c === "acc" ? (w.oneAcc ?? w.one) : w.one;
  if (count === 2) return c === "nom" ? w.two.nom : w.two.obl;
  if (count >= 100 && r <= 2) return w.one;
  if (r >= 3 && r <= 10) return w.few;
  if (r >= 11) return w.many;
  return w.few; // 0
}

/** A count with its noun in correct Arabic: arCount(11, "dars") is "١١ درسًا". */
export function arCount(count: number, noun: ArNounKey | ArNoun, opts: ArCountOptions = {}): string {
  const w = typeof noun === "string" ? AR_NOUNS[noun] : noun;
  const c = opts.case ?? "nom";
  if (count === 0) return opts.zero ?? `لا ${w.few}`;
  if (count === 1 && !opts.plus) {
    const word = arNounFor(1, w, c);
    if (opts.one === "bare") return word;
    const wahid = w.gender === "m" ? (c === "acc" ? "واحدًا" : "واحد") : "واحدة";
    return `${word} ${wahid}`;
  }
  if (count === 2 && !opts.plus) return arNounFor(2, w, c);
  return `${arDigits(count)}${opts.plus ? "+" : ""} ${arNounFor(count, w, c)}`;
}

/** English counts: "1 dars", "3 duroos". */
export function enCount(count: number, one: string, other: string): string {
  return `${count} ${count === 1 ? one : other}`;
}
