import { addDays, weekdayOf } from "@/lib/time/riyadh";
import { hijriIsoBounds, hijriOf } from "@/lib/time/hijri";
import type { AiParse } from "./ai";
import { normalizeArabic } from "./live-notice";
import { isOwnChannel } from "./sources";

export const AUTO_CONFIDENCE = 0.85;
export const AUTO_KINDS = ["cancelled", "postponed", "resumed"] as const;
export const AUTO_HORIZON_DAYS = 30;

export type DecideContext = {
  today: string;
  trusted: boolean;
  autoPublish: boolean;
  /** Weekdays of every known lesson, by slug. */
  lessonDays: Record<string, number[]>;
  /**
   * The post itself, for the deterministic checks: when given, the AI's date must agree
   * with any Hijri date and weekday written in the post, and the shaykh must be named
   * (unless the channel is his own). Without it, only the AI's answer is checked.
   */
  text?: string;
  /** A flyer with no text: a person must read it. */
  imageOnly?: boolean;
  /** Each lesson's shaykh (Arabic and English names), by slug. */
  lessonShaykhs?: Record<string, { ar: string; en: string }>;
  /** The channel the post came from. */
  sourceHandle?: string;
};

export type Decision = { action: "auto" | "suggest" | "ignore"; wouldAuto: boolean; reason: string };

/** The hybrid publishing rule. Anything not clearly safe goes to a human. */
export function decide(p: AiParse, ctx: DecideContext): Decision {
  const relevant = p.about_lesson || p.kind === "lecture" || !!p.lesson_slug;
  if (!relevant) return { action: "ignore", wouldAuto: false, reason: "Not about a lesson" };

  const problems: string[] = [];
  if (!ctx.trusted) problems.push("channel not trusted");
  if (!(AUTO_KINDS as readonly string[]).includes(p.kind)) problems.push(`"${p.kind}" always needs a person`);
  const days = p.lesson_slug ? ctx.lessonDays[p.lesson_slug] : undefined;
  if (!days) problems.push("no matching lesson");
  if (p.dates.length !== 1) problems.push("needs exactly one date");
  const date = p.dates[0];
  if (date && date < ctx.today) problems.push("date has passed");
  if (date && date > addDays(ctx.today, AUTO_HORIZON_DAYS)) problems.push("date is more than 30 days away");
  if (date && days && days.length > 0 && !days.includes(weekdayOf(date))) problems.push("lesson isn't held on that day");
  if (p.confidence < AUTO_CONFIDENCE) problems.push(`confidence ${Math.round(p.confidence * 100)}%`);

  if (ctx.imageOnly) problems.push("image only; a person must read the flyer");
  if (ctx.text !== undefined && date) problems.push(...checkPostAgainst(ctx.text, date, p.lesson_slug, ctx));

  if (problems.length) return { action: "suggest", wouldAuto: false, reason: problems.join("; ") };
  if (!ctx.autoPublish) return { action: "suggest", wouldAuto: true, reason: "Shadow mode: would have published automatically" };
  return { action: "auto", wouldAuto: true, reason: "Trusted channel, clear change" };
}

/* ---------------- Deterministic checks of the post text ---------------- */

/** The problems with publishing `date` for the lesson the AI chose, read straight from the post. */
export function checkPostAgainst(
  text: string,
  date: string,
  lessonSlug: string | null,
  ctx: Pick<DecideContext, "today" | "lessonShaykhs" | "sourceHandle">
): string[] {
  const problems: string[] = [];
  const hijri = hijriDatesIn(text, ctx.today);
  if (hijri.length && !hijri.includes(date)) problems.push("the Hijri date in the post gives a different day");
  const named = weekdaysIn(text, ctx.today);
  if (named.length && !named.includes(weekdayOf(date))) problems.push("the weekday in the post does not match the date");
  const shaykh = lessonSlug ? ctx.lessonShaykhs?.[lessonSlug] : undefined;
  if (shaykh && !(ctx.sourceHandle && isOwnChannel(ctx.sourceHandle, shaykh.en)) && !namesShaykh(text, shaykh.ar)) {
    problems.push("the post does not name the shaykh clearly");
  }
  return problems;
}

const EASTERN = "٠١٢٣٤٥٦٧٨٩";
const PERSIAN = "۰۱۲۳۴۵۶۷۸۹";
/** Arabic-Indic and Persian digits as ASCII digits. */
export const latinDigits = (s: string) =>
  s.replace(/[٠-٩۰-۹]/g, (d) => String(EASTERN.includes(d) ? EASTERN.indexOf(d) : PERSIAN.indexOf(d)));

const HIJRI_MONTHS: [RegExp, number][] = [
  [/محرم/, 1], [/صفر/, 2], [/ربيع الاول/, 3], [/ربيع (الثاني|الاخر)/, 4], [/جمادي الاولي/, 5], [/جمادي (الاخره|الثانيه)/, 6],
  [/رجب/, 7], [/شعبان/, 8], [/رمضان/, 9], [/شوال/, 10], [/ذ[يو] القعده/, 11], [/ذ[يو] الحجه/, 12],
];

/** The Hijri year that puts day/month closest to today, when the post gives none. */
function nearestHijriYear(month: number, day: number, today: string): number {
  const y = hijriOf(today).year;
  let best = y;
  let bestGap = Infinity;
  for (const cand of [y - 1, y, y + 1]) {
    try {
      const iso = hijriIsoBounds(cand, month, day);
      const gap = Math.abs(new Date(iso).getTime() - new Date(today).getTime());
      if (gap < bestGap) [best, bestGap] = [cand, gap];
    } catch {
      /* outside the calendar's range: skip */
    }
  }
  return best;
}

/** Every explicit Hijri date in the post (d/m/yyyy, d/m, or "d <month name>") as a Gregorian ISO date. */
export function hijriDatesIn(text: string, today: string): string[] {
  const out = new Set<string>();
  // Digits first: normalizeArabic() drops Arabic-Indic digits and slashes, so the slash form is read from the raw text.
  const raw = latinDigits(text);
  const n = normalizeArabic(raw);
  const add = (d: number, m: number, y?: number) => {
    if (d < 1 || d > 30 || m < 1 || m > 12) return;
    try {
      out.add(hijriIsoBounds(y ?? nearestHijriYear(m, d, today), m, d));
    } catch {
      /* unresolvable: ignore */
    }
  };
  for (const m of raw.matchAll(/(?<!\d)(\d{1,2})\s*[/-]\s*(\d{1,2})(?:\s*[/-]\s*(\d{4}))?(?!\d)/g)) {
    const y = m[3] ? Number(m[3]) : undefined;
    // A four-digit year outside 14xx is Gregorian, which this check leaves alone.
    if (y !== undefined && (y < 1400 || y > 1499)) continue;
    add(Number(m[1]), Number(m[2]), y);
  }
  for (const m of n.matchAll(/(?<!\d)(\d{1,2})\s+(?:من\s+)?(?:شهر\s+)?([ء-ي]+(?: [ء-ي]+)?)(?:\s+(14\d{2}))?/g)) {
    const month = HIJRI_MONTHS.find(([re]) => re.test(m[2]))?.[1];
    if (month) add(Number(m[1]), month, m[3] ? Number(m[3]) : undefined);
  }
  return [...out];
}

const WEEKDAYS: [RegExp, number][] = [
  [/الاحد/, 0], [/الاثنين/, 1], [/الثلاثاء/, 2], [/الاربعاء/, 3], [/الخميس/, 4], [/الجمعه/, 5], [/السبت/, 6],
];

/**
 * Weekdays the post names, plus "today" and "tomorrow". "ليلة الأحد" counts as Sunday,
 * the owner's reading of a night as belonging to the named day.
 */
export function weekdaysIn(text: string, today: string): number[] {
  const n = normalizeArabic(text);
  const out = new Set<number>();
  for (const [re, d] of WEEKDAYS) if (re.test(n)) out.add(d);
  if (/(^| )اليوم( |$)/.test(n) || /الليله/.test(n)) out.add(weekdayOf(today));
  if (/(^| )غدا( |$)/.test(n)) out.add(weekdayOf(addDays(today, 1)));
  return [...out];
}

const NAME_STOP = new Set(["بن", "ابن", "الشيخ", "الله", "اد", "د", "ا", "فضيله", "سماحه", "معالي", "الدكتور", "الاستاذ", "ابو", "ام", "الامام"]);

/**
 * True when the post names the shaykh clearly: his family name and one more part of his
 * name, since several shuyukh share a family name. Parts are matched as substrings of the
 * normalized text, so prefixes and joined words ("للشيخ", "عبدالرزاق") still count.
 */
export function namesShaykh(text: string, shaykhAr: string): boolean {
  const parts = normalizeArabic(shaykhAr).split(" ").filter((t) => t.length >= 3 && !NAME_STOP.has(t));
  if (!parts.length) return false;
  const n = normalizeArabic(text);
  const family = parts[parts.length - 1];
  const others = parts.slice(0, -1);
  if (!n.includes(family)) return false;
  return others.length === 0 || others.some((t) => n.includes(t));
}
