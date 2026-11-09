import type { StartAudience, StartStep } from "@/content/start";
import { toArabicDigits, type Locale } from "@/lib/locale";
import { formatGregorian, formatHijri } from "@/lib/time/hijri";
import { addDays } from "@/lib/time/riyadh";

/**
 * Pure helpers for the first 100 days page: what is saved on the phone, which steps show,
 * how far along the reader is, and the date each step is due once an arrival date is known.
 * No browser APIs here, so all of it runs on the server and in tests.
 */

/** Which steps to show: everyone's, plus the student or the family ones. */
export type StartWho = "all" | StartAudience;

export type StartSaved = {
  /** Ids of the steps ticked off. */
  done: string[];
  /** Arrival day as a plain ISO date, or null when none is entered. */
  arrival: string | null;
  who: StartWho;
};

export const START_STORAGE_KEY = "mesh-start-v1";

export const EMPTY_SAVED: StartSaved = Object.freeze({ done: [], arrival: null, who: "all" }) as StartSaved;

/** True for a real calendar date written "YYYY-MM-DD" in a sensible range. */
export function isIsoDate(s: unknown): s is string {
  if (typeof s !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const [y, m, d] = s.split("-").map(Number);
  if (y < 2000 || y > 2100) return false;
  const t = new Date(Date.UTC(y, m - 1, d));
  return t.getUTCFullYear() === y && t.getUTCMonth() === m - 1 && t.getUTCDate() === d;
}

/**
 * Reads what was saved on the phone. Anything unreadable or out of date falls back to the
 * empty plan, and ticks for steps that no longer exist are dropped.
 */
export function parseSaved(raw: string | null | undefined, validIds?: ReadonlySet<string>): StartSaved {
  if (!raw) return EMPTY_SAVED;
  let v: unknown;
  try {
    v = JSON.parse(raw);
  } catch {
    return EMPTY_SAVED;
  }
  if (!v || typeof v !== "object" || Array.isArray(v)) return EMPTY_SAVED;
  const o = v as Record<string, unknown>;
  const done = Array.isArray(o.done)
    ? [...new Set(o.done.filter((x): x is string => typeof x === "string" && (!validIds || validIds.has(x))))]
    : [];
  const arrival = isIsoDate(o.arrival) ? o.arrival : null;
  const who: StartWho = o.who === "student" || o.who === "family" ? o.who : "all";
  return { done, arrival, who };
}

/** Whether a step shows for the chosen group. Steps for everyone always show. */
export function isShown(step: Pick<StartStep, "for">, who: StartWho): boolean {
  return who === "all" || !step.for || step.for === who;
}

/** Ticked and total counts over the steps that show. */
export function progressOf(steps: readonly Pick<StartStep, "id" | "for">[], done: readonly string[], who: StartWho = "all"): { done: number; total: number } {
  const ticked = new Set(done);
  const shown = steps.filter((s) => isShown(s, who));
  return { done: shown.filter((s) => ticked.has(s.id)).length, total: shown.length };
}

/** Flips one step's tick, keeping the rest as they were. */
export function toggleDone(done: readonly string[], id: string): string[] {
  return done.includes(id) ? done.filter((x) => x !== id) : [...done, id];
}

/** The ISO date a step is due, counted from the arrival date; null when there is no arrival date. */
export function dueIso(arrival: string | null | undefined, by: number): string | null {
  return isIsoDate(arrival) ? addDays(arrival, by) : null;
}

const num = (n: number, locale: Locale) => (locale === "ar" ? toArabicDigits(n) : String(n));

/** Arabic "before you fly by n days or weeks", with the dual and plural forms. */
function beforeAr(n: number): string {
  if (n % 7 === 0) {
    const w = n / 7;
    if (w === 1) return "قبل السفر بأسبوع";
    if (w === 2) return "قبل السفر بأسبوعين";
    return `قبل السفر بـ${toArabicDigits(w)} ${w <= 10 ? "أسابيع" : "أسبوعًا"}`;
  }
  if (n === 1) return "قبل السفر بيوم";
  if (n === 2) return "قبل السفر بيومين";
  return `قبل السفر بـ${toArabicDigits(n)} ${n <= 10 ? "أيام" : "يومًا"}`;
}

/**
 * When a step is due with no arrival date entered: "2 weeks before you fly", "Arrival day", "By day 7".
 * This is what the server renders, so the page reads well before anything loads.
 */
export function dayLabel(by: number, locale: Locale): string {
  const ar = locale === "ar";
  if (by < 0) {
    const n = -by;
    if (ar) return beforeAr(n);
    if (n % 7 === 0) return n === 7 ? "1 week before you fly" : `${n / 7} weeks before you fly`;
    return n === 1 ? "1 day before you fly" : `${n} days before you fly`;
  }
  if (by === 0) return ar ? "يوم الوصول" : "Arrival day";
  return ar ? `بحلول اليوم ${num(by, locale)}` : `By day ${by}`;
}

/** The due date in both calendars, for a step once an arrival date is known. */
export function dueLabel(arrival: string | null | undefined, by: number, locale: Locale): { iso: string; text: string } | null {
  const iso = dueIso(arrival, by);
  if (!iso) return null;
  const text = locale === "ar"
    ? `أنجزها بحلول ${formatGregorian(iso, "ar")} · ${formatHijri(iso, "ar")}`
    : `Do by ${formatGregorian(iso, "en")} · ${formatHijri(iso, "en")}`;
  return { iso, text };
}
