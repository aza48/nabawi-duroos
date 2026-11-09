import type { TodayLesson } from "@/server/duroos/queries";
import { nowNext, type NowNextLesson } from "@/features/duroos/now-next";

/** Plain module, so server components and tests can both use it. */

export type DayChange = { slug: string; bookEn: string; bookAr: string; status: TodayLesson["status"]; noteEn: string | null; noteAr: string | null };

/** Today's duroos that are not running as usual: cancelled, postponed, moved or with a guest. Only public fields. */
export function todaysChanges(lessons: TodayLesson[]): DayChange[] {
  return lessons
    .filter((l) => l.status === "cancelled" || l.status === "postponed" || l.status === "moved" || l.status === "guest")
    .map((l) => ({ slug: l.slug, bookEn: l.bookEn, bookAr: l.bookAr, status: l.status, noteEn: l.overrideNoteEn, noteAr: l.overrideNoteAr }));
}

export type RailGroup = { prayer: TodayLesson["prayer"]; adhanAt: string; items: NowNextLesson[] };

/**
 * The rows of the home rail at instant `now`: duroos live now first, then the groups after the next prayers,
 * up to `max` rows. Every group comes from nowNext(), asked again from the start of the group before it,
 * so the rail always agrees with the "Now and next" card on /duroos. `more` counts the duroos of the last
 * group that did not fit.
 */
export function railRows(lessons: NowNextLesson[], now: number, max = 3): { live: ReturnType<typeof nowNext>["live"]; groups: RailGroup[]; more: number } {
  // Cancelled and postponed duroos are listed under "Today's changes", so they do not take a row here.
  lessons = lessons.filter((l) => l.status !== "cancelled" && l.status !== "postponed");
  const { live, next } = nowNext(lessons, now);
  const groups: RailGroup[] = [];
  let left = max - live.length;
  let more = 0;
  for (let g = next; g && left > 0; ) {
    const items = g.lessons.slice(0, left);
    groups.push({ prayer: g.prayer, adhanAt: g.adhanAt, items });
    left -= items.length;
    more = g.lessons.length - items.length;
    g = nowNext(lessons, Math.max(...g.lessons.map((l) => new Date(l.liveFrom).getTime()))).next;
  }
  return { live, groups, more };
}
