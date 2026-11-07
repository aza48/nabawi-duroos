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

/** How long after the adhan a lesson counts as "live now". */
export const LIVE_WINDOW_MIN = 90;

const STATUS_KINDS: Partial<Record<OverrideKind, DayStatus>> = {
  cancelled: "cancelled",
  postponed: "postponed",
  moved: "moved",
  guest: "guest",
  resumed: "resumed",
};

const prayerOrder = (p: Prayer) => PRAYERS.indexOf(p);
const byPrayerThenSort = (a: LessonLike, b: LessonLike) =>
  prayerOrder(a.prayer) - prayerOrder(b.prayer) || a.sort - b.sort;

function inPeriod(l: LessonLike, iso: string): boolean {
  return (!l.validFrom || l.validFrom <= iso) && (!l.validTo || iso <= l.validTo);
}

/** The lessons held on a date (Riyadh civil date), with that day's status. */
export function lessonsForDate<L extends LessonLike>(
  iso: string,
  lessons: L[],
  overrides: OverrideLike[]
): ScheduledLesson<L>[] {
  const wd = weekdayOf(iso);
  return lessons
    .filter((l) => l.status === "active" && l.days.includes(wd) && inPeriod(l, iso))
    .sort(byPrayerThenSort)
    .map((lesson) => {
      const applicable = overrides
        .filter((o) => o.lessonId === lesson.id && !o.revokedAt && o.startsOn <= iso && iso <= o.endsOn)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      const override = applicable[0] ?? null;
      const status = (override && STATUS_KINDS[override.kind]) || "on";
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

export function lessonPhase(now: Date, iso: string, prayer: Prayer): "done" | "live" | "upcoming" {
  const adhan = prayerTimes(iso)[prayer].getTime();
  const t = now.getTime();
  if (t < adhan) return "upcoming";
  if (t < adhan + LIVE_WINDOW_MIN * 60_000) return "live";
  return "done";
}
