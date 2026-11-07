import { and, asc, desc, eq, gte, inArray, isNull, lte, or } from "drizzle-orm";
import type { Db } from "@/server/db/client";
import { announcements, lessonLive, lessonOverrides, lessons, masjids, shaykhs, streams } from "@/server/db/schema";
import { getSetting } from "@/server/settings";
import { formatGregorian, formatHijri } from "@/lib/time/hijri";
import { PRAYERS, prayerTimes, type Prayer } from "@/lib/time/prayer";
import { riyadhDateIso, type Weekday } from "@/lib/time/riyadh";
import { lessonPhase, lessonsForDate, weekSchedule, type DayStatus, type OverrideLike } from "./schedule";

export type LessonRow = typeof lessons.$inferSelect;
export type ShaykhRow = typeof shaykhs.$inferSelect;
export type MasjidRow = typeof masjids.$inferSelect;
export type StreamRow = typeof streams.$inferSelect;
export type AnnouncementRow = typeof announcements.$inferSelect;
export type OverrideRow = typeof lessonOverrides.$inferSelect;

export type StreamRef = { url: string; kind: StreamRow["kind"]; isLive: boolean; liveUrl: string | null };

export type ScheduleRow = LessonRow & {
  shaykh: Pick<ShaykhRow, "slug" | "nameEn" | "nameAr" | "photo">;
  masjid: Pick<MasjidRow, "id" | "nameEn" | "nameAr" | "shortEn" | "shortAr">;
};

export type TodayLesson = {
  slug: string;
  shaykh: Pick<ShaykhRow, "slug" | "nameEn" | "nameAr" | "photo">;
  bookEn: string;
  bookAr: string;
  masjid: Pick<MasjidRow, "id" | "nameEn" | "nameAr" | "shortEn" | "shortAr">;
  prayer: Prayer;
  adhanAt: string;
  phase: "done" | "live" | "upcoming";
  status: DayStatus;
  locationEn: string;
  locationAr: string;
  overrideNoteEn: string | null;
  overrideNoteAr: string | null;
  stream: StreamRef | null;
};

export async function scheduleRows(db: Db): Promise<ScheduleRow[]> {
  const rows = await db
    .select({ lesson: lessons, shaykh: shaykhs, masjid: masjids })
    .from(lessons)
    .innerJoin(shaykhs, eq(lessons.shaykhId, shaykhs.id))
    .innerJoin(masjids, eq(lessons.masjidId, masjids.id))
    .orderBy(asc(lessons.sort));
  return rows.map(({ lesson, shaykh, masjid }) => ({
    ...lesson,
    shaykh: { slug: shaykh.slug, nameEn: shaykh.nameEn, nameAr: shaykh.nameAr, photo: shaykh.photo },
    masjid: { id: masjid.id, nameEn: masjid.nameEn, nameAr: masjid.nameAr, shortEn: masjid.shortEn, shortAr: masjid.shortAr },
  }));
}

/** Best broadcast for a lesson: the masjid's own stream first, then the shaykh's channel. */
function pickStream(all: StreamRow[], l: { masjidId: string; shaykhId: number }): StreamRef | null {
  const s =
    all.find((x) => x.masjidId === l.masjidId && x.kind === "youtube") ??
    all.find((x) => x.masjidId === l.masjidId) ??
    all.find((x) => x.shaykhId === l.shaykhId);
  return s ? { url: s.url, kind: s.kind, isLive: s.isLive, liveUrl: s.liveUrl } : null;
}

function toOverrideLike(o: OverrideRow): OverrideLike {
  return {
    lessonId: o.lessonId, kind: o.kind, startsOn: o.startsOn, endsOn: o.endsOn,
    createdAt: o.createdAt, revokedAt: o.revokedAt, noteEn: o.noteEn, noteAr: o.noteAr,
  };
}

async function overridesOn(db: Db, iso: string): Promise<OverrideLike[]> {
  const rows = await db
    .select()
    .from(lessonOverrides)
    .where(and(lte(lessonOverrides.startsOn, iso), gte(lessonOverrides.endsOn, iso), isNull(lessonOverrides.revokedAt)));
  return rows.map(toOverrideLike);
}

export async function getToday(db: Db, now: Date = new Date()) {
  const date = riyadhDateIso(now);
  const [rows, overrides, allStreams, lastCheckedAt, liveRows] = await Promise.all([
    scheduleRows(db),
    overridesOn(db, date),
    db.select().from(streams),
    getSetting<string>(db, "watcher_last_checked_at"),
    db.select().from(lessonLive),
  ]);
  // A "live broadcast started" notice keeps a dars live for up to 3 hours, the same day.
  const liveNow = new Map(
    liveRows
      .filter((r) => now.getTime() - r.startedAt.getTime() < 3 * 3_600_000 && riyadhDateIso(r.startedAt) === date)
      .map((r) => [r.lessonSlug, r.url])
  );
  const times = prayerTimes(date);
  const lessonsToday: TodayLesson[] = lessonsForDate(date, rows, overrides).map(({ lesson: l, status, override }) => ({
    slug: l.slug,
    shaykh: l.shaykh,
    bookEn: l.bookEn,
    bookAr: l.bookAr,
    masjid: l.masjid,
    prayer: l.prayer,
    adhanAt: times[l.prayer].toISOString(),
    phase: liveNow.has(l.slug) && status !== "cancelled" ? "live" : lessonPhase(now, date, l.prayer),
    status,
    locationEn: l.locationEn,
    locationAr: l.locationAr,
    overrideNoteEn: override?.noteEn ?? null,
    overrideNoteAr: override?.noteAr ?? null,
    stream: liveNow.has(l.slug)
      ? { url: liveNow.get(l.slug)!, kind: "web" as const, isLive: true, liveUrl: liveNow.get(l.slug)! }
      : pickStream(allStreams, l),
  }));
  return {
    date,
    hijri: { en: formatHijri(date, "en", { weekday: true }), ar: formatHijri(date, "ar", { weekday: true }) },
    gregorian: { en: formatGregorian(date, "en"), ar: formatGregorian(date, "ar") },
    prayers: Object.fromEntries(PRAYERS.map((p) => [p, times[p].toISOString()])) as Record<Prayer, string>,
    lessons: lessonsToday,
    lastCheckedAt,
  };
}

export async function getWeek(db: Db): Promise<{ byDay: Record<Weekday, ScheduleRow[]>; daysNotStated: ScheduleRow[] }> {
  const today = riyadhDateIso();
  const rows = (await scheduleRows(db)).filter(
    (l) => (!l.validFrom || l.validFrom <= today) && (!l.validTo || today <= l.validTo)
  );
  return weekSchedule(rows);
}

export async function getLesson(db: Db, slug: string) {
  const rows = await scheduleRows(db);
  const l = rows.find((r) => r.slug === slug);
  if (!l) return null;
  const [history, allStreams] = await Promise.all([
    db.select().from(lessonOverrides).where(eq(lessonOverrides.lessonId, l.id)).orderBy(desc(lessonOverrides.createdAt)).limit(10),
    db.select().from(streams),
  ]);
  return { ...l, history, stream: pickStream(allStreams, l) };
}

export async function listShaykhs(db: Db) {
  return db.select().from(shaykhs).orderBy(asc(shaykhs.nameEn));
}

export async function getShaykh(db: Db, slug: string) {
  const [s] = await db.select().from(shaykhs).where(eq(shaykhs.slug, slug));
  if (!s) return null;
  const rows = (await scheduleRows(db)).filter((r) => r.shaykhId === s.id);
  const channels = await db.select().from(streams).where(eq(streams.shaykhId, s.id));
  return { ...s, lessons: rows, channels };
}

/** Undated announcements stay in the current feed this long. */
const UNDATED_FRESH_DAYS = 14;

/**
 * The current feed: published announcements whose event is today or later,
 * plus undated ones posted in the last two weeks. `includeArchived` returns the
 * full history (published + archived), newest first.
 */
export async function listAnnouncements(
  db: Db,
  opts: { limit?: number; includeArchived?: boolean; now?: Date } = {}
): Promise<AnnouncementRow[]> {
  const now = opts.now ?? new Date();
  const where = opts.includeArchived
    ? inArray(announcements.status, ["published", "archived"])
    : and(
        eq(announcements.status, "published"),
        or(
          gte(announcements.eventDate, riyadhDateIso(now)),
          and(
            isNull(announcements.eventDate),
            gte(announcements.postedAt, new Date(now.getTime() - UNDATED_FRESH_DAYS * 86_400_000))
          )
        )
      );
  return db.select().from(announcements).where(where).orderBy(desc(announcements.postedAt)).limit(opts.limit ?? 20);
}

export async function getAnnouncement(db: Db, slug: string): Promise<AnnouncementRow | null> {
  const [a] = await db.select().from(announcements).where(eq(announcements.slug, slug));
  return a && a.status !== "draft" ? a : null;
}

export async function listStreams(db: Db): Promise<StreamRow[]> {
  return db.select().from(streams).orderBy(asc(streams.id));
}

export async function listMasjids(db: Db): Promise<MasjidRow[]> {
  return db.select().from(masjids).orderBy(asc(masjids.sort));
}
