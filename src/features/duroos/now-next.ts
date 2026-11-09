import type { TodayLesson } from "@/server/duroos/queries";

/** The slice of a dars the "Now and next" strip needs. Plain data, so the client gets only this. */
export type NowNextLesson = Pick<TodayLesson, "slug" | "bookEn" | "bookAr" | "prayer" | "timeKnown" | "adhanAt" | "liveFrom" | "liveUntil" | "status"> & {
  shaykhEn: string;
  shaykhAr: string;
  placeEn: string;
  placeAr: string;
};

export type NowNext = {
  /** Duroos running now, with how far in they are. */
  live: { lesson: NowNextLesson; minutesIn: number; progress: number }[];
  /** The duroos after the next prayer that has any, cancelled ones included so people see them. */
  next: { prayer: TodayLesson["prayer"]; adhanAt: string; lessons: NowNextLesson[] } | null;
};

const OFF = new Set(["cancelled", "postponed"]);

export function slimLesson(l: TodayLesson): NowNextLesson {
  return {
    slug: l.slug, bookEn: l.bookEn, bookAr: l.bookAr, prayer: l.prayer, timeKnown: l.timeKnown,
    adhanAt: l.adhanAt, liveFrom: l.liveFrom, liveUntil: l.liveUntil, status: l.status,
    shaykhEn: l.shaykh.nameEn, shaykhAr: l.shaykh.nameAr, placeEn: l.masjid.shortEn, placeAr: l.masjid.shortAr,
  };
}

/** What is on now and what comes next, at instant `now` (ms). Duroos with an unconfirmed time never count. */
export function nowNext(lessons: NowNextLesson[], now: number): NowNext {
  const timed = lessons.filter((l) => l.timeKnown);
  const at = (iso: string) => new Date(iso).getTime();
  const live = timed
    .filter((l) => !OFF.has(l.status) && at(l.liveFrom) <= now && now < at(l.liveUntil))
    .sort((a, b) => at(a.liveFrom) - at(b.liveFrom))
    .map((l) => {
      const from = at(l.liveFrom), until = at(l.liveUntil);
      return { lesson: l, minutesIn: Math.max(0, Math.floor((now - from) / 60_000)), progress: Math.min(1, Math.max(0, (now - from) / (until - from))) };
    });
  const upcoming = timed.filter((l) => now < at(l.liveFrom)).sort((a, b) => at(a.adhanAt) - at(b.adhanAt));
  if (!upcoming.length) return { live, next: null };
  const first = upcoming[0];
  const lessonsNext = upcoming.filter((l) => l.prayer === first.prayer);
  return { live, next: { prayer: first.prayer, adhanAt: first.adhanAt, lessons: lessonsNext } };
}
