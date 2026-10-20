import { Localized, WEEKDAYS_AR, WEEKDAYS_EN } from "./types";

/**
 * Date helpers. Hijri dates come from the Intl islamic (Umalqura) calendar,
 * which is available in Node (full-ICU) and all modern browsers.
 *
 * Display rule for lesson dates in emails/notifications: relative words are
 * never used — the date is always rendered as a bracketed absolute Hijri date,
 * e.g. [الأحد ٧/٥/١٤٤٨هـ] / [Sunday 7/5/1448 AH].
 */

const AR_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

export function toArabicDigits(s: string | number): string {
  return String(s).replace(/\d/g, (d) => AR_DIGITS[Number(d)]);
}

/** Parse a plain "YYYY-MM-DD" date at UTC noon (avoids timezone day-shift). */
export function parsePlainDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, (m || 1) - 1, d || 1, 12, 0, 0));
}

interface HijriParts {
  day: number;
  month: number;
  year: number;
  weekday: number; // 0 = Sunday … 6 = Saturday
}

export function hijriParts(date: Date): HijriParts {
  const fmt = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", {
    timeZone: "UTC",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  let day = 0,
    month = 0,
    year = 0;
  for (const p of fmt.formatToParts(date)) {
    if (p.type === "day") day = Number(p.value);
    if (p.type === "month") month = Number(p.value);
    if (p.type === "year") year = Number(p.value);
  }
  return { day, month, year, weekday: date.getUTCDay() };
}

/** "[الأحد ٧/٥/١٤٤٨هـ]" — the bracketed absolute-date format used app-wide. */
export function hijriBracketAr(date: Date): string {
  const h = hijriParts(date);
  return `[${WEEKDAYS_AR[h.weekday]} ${toArabicDigits(h.day)}/${toArabicDigits(h.month)}/${toArabicDigits(h.year)}هـ]`;
}

/** "[Sunday 7/5/1448 AH]" */
export function hijriBracketEn(date: Date): string {
  const h = hijriParts(date);
  return `[${WEEKDAYS_EN[h.weekday]} ${h.day}/${h.month}/${h.year} AH]`;
}

/** Bracketed absolute lesson date for a stored "YYYY-MM-DD" (or ISO) value. */
export function lessonDateBracket(iso: string): Localized {
  const d = parsePlainDate(iso.slice(0, 10));
  return { ar: hijriBracketAr(d), en: hijriBracketEn(d) };
}

/** "٩/٥/١٤٤٨هـ" style plain Hijri (no brackets) */
export function hijriPlain(date: Date): Localized {
  const h = hijriParts(date);
  return {
    ar: `${toArabicDigits(h.day)}/${toArabicDigits(h.month)}/${toArabicDigits(h.year)}هـ`,
    en: `${h.day}/${h.month}/${h.year} AH`,
  };
}

/** Long Gregorian label, e.g. ar "٢٠ أكتوبر ٢٠٢٦" / en "20 October 2026". */
export function gregorianLong(date: Date): Localized {
  const ar = new Intl.DateTimeFormat("ar-EG", {
    timeZone: "UTC",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
  const en = new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
  return { ar, en };
}

export interface RiyadhToday {
  /** 0 = Sunday … 6 = Saturday */
  weekday: number;
  dayOfMonth: number;
  daysInMonth: number;
  month: number; // 1-12 (Gregorian)
  year: number;
  /** "YYYY-MM-DD" in Asia/Riyadh */
  iso: string;
}

/** Today's civil date in Asia/Riyadh (the app's reference timezone). */
export function riyadhToday(now: Date = new Date()): RiyadhToday {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Riyadh",
    weekday: "long",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  const parts: Record<string, string> = {};
  for (const p of fmt.formatToParts(now)) parts[p.type] = p.value;
  const weekday = WEEKDAYS_EN.indexOf(parts.weekday);
  const day = Number(parts.day);
  const month = Number(parts.month);
  const year = Number(parts.year);
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const iso = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  return { weekday, dayOfMonth: day, daysInMonth, month, year, iso };
}

/** Full bilingual "today" label for reminder emails. */
export function todayLabel(now: Date = new Date()): Localized {
  const rt = riyadhToday(now);
  const d = parsePlainDate(rt.iso);
  const h = hijriParts(d);
  const g = gregorianLong(d);
  return {
    ar: `${WEEKDAYS_AR[rt.weekday]} ${toArabicDigits(h.day)}/${toArabicDigits(h.month)}/${toArabicDigits(h.year)}هـ — ${g.ar}`,
    en: `${WEEKDAYS_EN[rt.weekday]} ${h.day}/${h.month}/${h.year} AH — ${g.en}`,
  };
}
