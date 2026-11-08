import type { LessonStatus, OverrideKind } from "@/server/db/schema";
import { PRAYERS, prayerTimes, type Prayer } from "@/lib/time/prayer";
import { weekdayOf, type Weekday } from "@/lib/time/riyadh";

export type LessonLike = {
  id: number;
  slug: string;
  days: number[];
  prayer: Prayer;
  status: LessonStatus;
  validFrom: string | null;
  validTo: string | null;
  sort: number;
};

export type OverrideLike = {
  lessonId: number;
  kind: OverrideKind;
  startsOn: string;
  endsOn: string;
  createdAt: Date;
  revokedAt: Date | null;
  noteEn: string | null;
  noteAr: string | null;
};

export type DayStatus = "on" | "cancelled" | "postponed" | "moved" | "guest" | "resumed";

export type ScheduledLesson<L> = { lesson: L; status: DayStatus; override: OverrideLike | null };

/** The longest a dars counts as "live now" after its adhan. */
export const LIVE_WINDOW_MIN = 90;

/**
 * Minutes between the adhan and the iqamah at the Prophet's Masjid. A dars
 * starts after the prayer, so nothing is "live" before this.
 */
export const IQAMAH_OFFSET_MIN: Record<Prayer, number> = { fajr: 25, dhuhr: 20, asr: 20, maghrib: 10, isha: 20 };

/** Override kinds that change whether the dars is held; the rest only carry information. */
const STATUS_KINDS: Partial<Record<OverrideKind, DayStatus>> = {
  cancelled: "cancelled",
  postponed: "postponed",
  moved: "moved",
  guest: "guest",
  resumed: "resumed",
};

export const isStatusKind = (kind: OverrideKind): boolean => kind in STATUS_KINDS;

const prayerOrder = (p: Prayer) => PRAYERS.indexOf(p);
const byPrayerThenSort = (a: LessonLike, b: LessonLike) =>
  prayerOrder(a.prayer) - prayerOrder(b.prayer) || a.sort - b.sort;

export function inPeriod(l: Pick<LessonLike, "validFrom" | "validTo">, iso: string): boolean {
  return (!l.validFrom || l.validFrom <= iso) && (!l.validTo || iso <= l.validTo);
}

/** Active and inside its validity period on that date. */
export function isCurrent(l: Pick<LessonLike, "status" | "validFrom" | "validTo">, iso: string): boolean {
  return l.status === "active" && inPeriod(l, iso);
}

/**
 * The lessons held on a date (Riyadh civil date), with that day's status.
 * The status comes from the newest status override only (cancelled, postponed,
 * moved, guest, resumed); a note, a new book or a finished book never flips a
 * cancelled dars back on. The note shown is the newest override that has one,
 * preferring the status override's own note.
 */
export function lessonsForDate<L extends LessonLike>(
  iso: string,
  lessons: L[],
  overrides: OverrideLike[]
): ScheduledLesson<L>[] {
  const wd = weekdayOf(iso);
  return lessons
    .filter((l) => isCurrent(l, iso) && l.days.includes(wd))
    .sort(byPrayerThenSort)
    .map((lesson) => {
      const applicable = overrides
        .filter((o) => o.lessonId === lesson.id && !o.revokedAt && o.startsOn <= iso && iso <= o.endsOn)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      const statusOverride = applicable.find((o) => isStatusKind(o.kind)) ?? null;
      const status = (statusOverride && STATUS_KINDS[statusOverride.kind]) || "on";
      const hasNote = (o: OverrideLike) => Boolean(o.noteEn || o.noteAr);
      const override =
        (statusOverride && hasNote(statusOverride) ? statusOverride : null) ??
        applicable.find(hasNote) ??
        statusOverride ??
        applicable[0] ??
        null;
      return { lesson, status, override };
    });
}

export function weekSchedule<L extends LessonLike>(
  lessons: L[]
): { byDay: Record<Weekday, L[]>; daysNotStated: L[] } {
  const byDay = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] } as Record<Weekday, L[]>;
  const daysNotStated: L[] = [];
  for (const l of [...lessons].sort(byPrayerThenSort)) {
    if (l.status !== "active") continue;
    if (l.days.length === 0) daysNotStated.push(l);
    for (const d of l.days) byDay[d as Weekday].push(l);
  }
  return { byDay, daysNotStated };
}

/**
 * When a dars after this prayer counts as live: from the iqamah until the
 * next adhan of the day, and never longer than LIVE_WINDOW_MIN after the adhan.
 */
export function liveWindow(iso: string, prayer: Prayer): { from: Date; until: Date } {
  const times = prayerTimes(iso);
  const adhan = times[prayer].getTime();
  const next = PRAYERS[PRAYERS.indexOf(prayer) + 1];
  const cap = adhan + LIVE_WINDOW_MIN * 60_000;
  const until = next ? Math.min(cap, times[next].getTime()) : cap;
  return { from: new Date(adhan + IQAMAH_OFFSET_MIN[prayer] * 60_000), until: new Date(until) };
}

/** Pure form of the phase, shared by the server and the client badge. */
export function phaseAt(now: number, from: number, until: number): "done" | "live" | "upcoming" {
  if (now < from) return "upcoming";
  if (now < until) return "live";
  return "done";
}

export function lessonPhase(now: Date, iso: string, prayer: Prayer): "done" | "live" | "upcoming" {
  const w = liveWindow(iso, prayer);
  return phaseAt(now.getTime(), w.from.getTime(), w.until.getTime());
}
