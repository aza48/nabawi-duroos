import { LESSONS } from "../data/lessons";
import { RiyadhToday } from "./dates";
import { Lesson, WEEKDAYS_EN, Weekday } from "./types";

/**
 * Which lessons "happen" on a given civil date (Asia/Riyadh), for reminders.
 *
 * Rules (per product decision):
 * - DAILY lessons are EXCLUDED from reminders (they only get announcement
 *   alerts). A lesson is treated as daily when it meets on 5+ weekdays —
 *   e.g. Al-Badr's Tawhid (Sun–Thu, "daily except Fri/Sat") and Al-Qasim's
 *   sequence (Sun–Thu). This is an approximation: the data model has no
 *   explicit "daily" flag, so frequency is inferred from the day count.
 * - WEEKLY lessons match when today's weekday is in lesson.days.
 * - MONTHLY lessons (Quba) carry their pattern only in the localized
 *   `frequency` label ("First Sunday of each month" / "أول أحد من كل شهر").
 *   We parse the English label deterministically (ordinal + weekday) and
 *   match when today is the nth occurrence of that weekday in the month.
 *   If a future monthly lesson's label does not parse, it is skipped here
 *   (documented approximation) rather than guessed.
 * - Lessons with unknown weekdays (days: [] and no frequency, e.g. Al-Badr's
 *   Fajr tafsir whose days no source states) never produce reminders.
 * - Only status "active" lessons are included.
 */

const ORDINALS: Record<string, number> = {
  First: 1,
  Second: 2,
  Third: 3,
  Fourth: 4,
};

export interface MonthlyPattern {
  ordinal: number; // 1..4, or -1 for "Last"
  weekday: number; // 0 = Sunday … 6 = Saturday
}

export function parseMonthlyPattern(lesson: Lesson): MonthlyPattern | null {
  const label = lesson.frequency?.en ?? lesson.daysLabel?.en ?? "";
  const m = label.match(
    /^(First|Second|Third|Fourth|Last)\s+(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)\b/
  );
  if (!m) return null;
  return {
    ordinal: m[1] === "Last" ? -1 : ORDINALS[m[1]],
    weekday: WEEKDAYS_EN.indexOf(m[2]),
  };
}

export function monthlyMatches(pattern: MonthlyPattern, today: RiyadhToday): boolean {
  if (today.weekday !== pattern.weekday) return false;
  if (pattern.ordinal === -1) return today.dayOfMonth + 7 > today.daysInMonth;
  return Math.ceil(today.dayOfMonth / 7) === pattern.ordinal;
}

export function lessonHappensOn(lesson: Lesson, today: RiyadhToday): boolean {
  if (lesson.status !== "active") return false;
  const monthly = parseMonthlyPattern(lesson);
  if (monthly) return monthlyMatches(monthly, today);
  // Daily lessons (>= 5 weekdays) are excluded from reminders.
  if (lesson.days.length >= 5) return false;
  return lesson.days.includes(today.weekday as Weekday);
}

export function lessonsHappeningOn(today: RiyadhToday): Lesson[] {
  return LESSONS.filter((l) => lessonHappensOn(l, today));
}
