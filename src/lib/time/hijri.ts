import { Locale, toArabicDigits, WEEKDAYS_AR, WEEKDAYS_EN } from "@/lib/locale";
import { addDays, isoToNoonUtc, weekdayOf } from "./riyadh";

export interface HijriDate {
  day: number;
  month: number;
  year: number;
}

export const HIJRI_MONTHS_EN = [
  "Muharram", "Safar", "Rabi al-Awwal", "Rabi al-Thani", "Jumada al-Ula", "Jumada al-Akhirah",
  "Rajab", "Shaban", "Ramadan", "Shawwal", "Dhu al-Qadah", "Dhu al-Hijjah",
];

const hijriFmt = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", {
  timeZone: "UTC",
  day: "numeric",
  month: "numeric",
  year: "numeric",
});

/** Umm al-Qura Hijri date for a plain ISO date. */
export function hijriOf(iso: string): HijriDate {
  const out: HijriDate = { day: 0, month: 0, year: 0 };
  for (const p of hijriFmt.formatToParts(isoToNoonUtc(iso))) {
    if (p.type === "day") out.day = Number(p.value);
    if (p.type === "month") out.month = Number(p.value);
    if (p.type === "year") out.year = parseInt(p.value, 10);
  }
  return out;
}

export function formatHijri(
  iso: string,
  locale: Locale,
  opts: { bracket?: boolean; weekday?: boolean } = {}
): string {
  const h = hijriOf(iso);
  const wd = weekdayOf(iso);
  let s =
    locale === "ar"
      ? `${opts.weekday ? WEEKDAYS_AR[wd] + " " : ""}${toArabicDigits(h.day)}/${toArabicDigits(h.month)}/${toArabicDigits(h.year)}هـ`
      : `${opts.weekday ? WEEKDAYS_EN[wd] + " " : ""}${h.day}/${h.month}/${h.year} AH`;
  if (opts.bracket) s = `[${s}]`;
  return s;
}

/** "27 Jumada al-Ula 1448": long English Hijri label. */
export function formatHijriLong(iso: string): string {
  const h = hijriOf(iso);
  return `${h.day} ${HIJRI_MONTHS_EN[h.month - 1]} ${h.year}`;
}

export function formatGregorian(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-GB", {
    timeZone: "UTC",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(isoToNoonUtc(iso));
}

const ANCHOR_ISO = "2026-11-07";
const MEAN_YEAR = 354.367;
const MEAN_MONTH = 29.5306;

/**
 * Gregorian ISO date for a Umm al-Qura Hijri date. A day past the end of the
 * month (e.g. 30 in a 29-day month) resolves to the month's last day.
 */
export function hijriIsoBounds(year: number, month: number, day: number): string {
  const a = hijriOf(ANCHOR_ISO);
  const approx = Math.round(
    (year - a.year) * MEAN_YEAR + (month - a.month) * MEAN_MONTH + (day - a.day)
  );
  const guess = addDays(ANCHOR_ISO, approx);
  let lastInMonth: string | null = null;
  for (let off = -45; off <= 45; off++) {
    const iso = addDays(guess, off);
    const h = hijriOf(iso);
    if (h.year === year && h.month === month) {
      if (h.day === day) return iso;
      if (!lastInMonth || iso > lastInMonth) lastInMonth = iso;
    }
  }
  if (lastInMonth) return lastInMonth;
  throw new Error(`Cannot resolve Hijri date ${day}/${month}/${year}`);
}
