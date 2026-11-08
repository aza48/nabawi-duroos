import { and, asc, desc, eq, gte, isNull } from "drizzle-orm";
import type { Db } from "@/server/db/client";
import { announcements, lessonOverrides, lessons, masjids, shaykhs } from "@/server/db/schema";
import { riyadhDateIso } from "@/lib/time/riyadh";

export async function adminLessons(db: Db) {
  return db
    .select({
      slug: lessons.slug, bookEn: lessons.bookEn, bookAr: lessons.bookAr, prayer: lessons.prayer, days: lessons.days,
      status: lessons.status, masjid: masjids.shortEn, shaykh: shaykhs.nameEn, shaykhSlug: shaykhs.slug,
    })
    .from(lessons)
    .innerJoin(shaykhs, eq(lessons.shaykhId, shaykhs.id))
    .innerJoin(masjids, eq(lessons.masjidId, masjids.id))
    .orderBy(asc(shaykhs.nameEn), asc(lessons.sort));
}

export async function adminLesson(db: Db, slug: string) {
  const [row] = await db
    .select({ lesson: lessons, shaykh: shaykhs })
    .from(lessons)
    .innerJoin(shaykhs, eq(lessons.shaykhId, shaykhs.id))
    .where(eq(lessons.slug, slug));
  if (!row) return null;
  const upcoming = await db
    .select()
    .from(lessonOverrides)
    .where(and(eq(lessonOverrides.lessonId, row.lesson.id), isNull(lessonOverrides.revokedAt), gte(lessonOverrides.endsOn, riyadhDateIso())))
    .orderBy(asc(lessonOverrides.startsOn));
  return { ...row.lesson, shaykh: row.shaykh, upcoming };
}

export async function adminShaykhs(db: Db) {
  return db.select().from(shaykhs).orderBy(asc(shaykhs.nameEn));
}

export async function adminMasjids(db: Db) {
  return db.select({ id: masjids.id, name: masjids.shortEn }).from(masjids).orderBy(asc(masjids.sort));
}

export async function adminAnnouncements(db: Db) {
  return db.select().from(announcements).orderBy(desc(announcements.postedAt)).limit(200);
}

export async function adminAnnouncement(db: Db, slug: string) {
  const [a] = await db.select().from(announcements).where(eq(announcements.slug, slug));
  if (!a) return null;
  const s = a.shaykhId ? (await db.select({ slug: shaykhs.slug }).from(shaykhs).where(eq(shaykhs.id, a.shaykhId)))[0] : null;
  const l = a.lessonId ? (await db.select({ slug: lessons.slug }).from(lessons).where(eq(lessons.id, a.lessonId)))[0] : null;
  return { ...a, shaykhSlug: s?.slug ?? null, lessonSlug: l?.slug ?? null };
}

export async function adminFaqs(db: Db) {
  const { faqs } = await import("@/server/db/schema");
  return db.select().from(faqs).orderBy(desc(faqs.updatedAt));
}
export async function adminGuides(db: Db) {
  const { guides } = await import("@/server/db/schema");
  return db.select().from(guides).orderBy(desc(guides.updatedAt));
}
export async function adminFaq(db: Db, slug: string) {
  const { faqs } = await import("@/server/db/schema");
  return (await db.select().from(faqs).where(eq(faqs.slug, slug)))[0] ?? null;
}
export async function adminGuide(db: Db, slug: string) {
  const { guides } = await import("@/server/db/schema");
  return (await db.select().from(guides).where(eq(guides.slug, slug)))[0] ?? null;
}
