import { and, eq, isNull, like } from "drizzle-orm";
import { z } from "zod";
import type { Db } from "@/server/db/client";
import { announcements, lessonOverrides, lessons, masjids, shaykhs } from "@/server/db/schema";
import { assertCan, type Actor } from "@/server/auth/permissions";
import { cleanText } from "@/lib/text";
import { record } from "./audit";
import { DUROOS_PATHS, refreshPublic } from "./refresh";

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD");
const optText = z.string().trim().max(2000).optional().nullable();
/** A link: https:// anywhere, or a /path on MESH. Empty clears it. */
const optUrl = z
  .string()
  .trim()
  .max(500)
  .regex(/^(https:\/\/\S+|\/\S*)?$/, "Use an https:// link or a /path on MESH")
  .transform((v) => v || null)
  .optional()
  .nullable();
const en = (s: string | null | undefined) => (s ? cleanText(s.trim(), "en") : null);
const ar = (s: string | null | undefined) => (s ? cleanText(s.trim(), "ar") : null);

export function slugify(s: string): string {
  return s.toLowerCase().replace(/['’`]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 60) || "item";
}

async function uniqueSlug(db: Db, base: string, table: typeof announcements): Promise<string> {
  const taken = new Set((await db.select({ s: table.slug }).from(table).where(like(table.slug, `${base}%`))).map((r) => r.s));
  if (!taken.has(base)) return base;
  for (let i = 2; ; i++) if (!taken.has(`${base}-${i}`)) return `${base}-${i}`;
}

/* ---------------- Overrides ---------------- */

const overrideInput = z
  .object({
    lessonSlug: z.string().min(1),
    kind: z.enum(["cancelled", "postponed", "moved", "resumed", "guest", "new_book", "book_finished", "note"]),
    startsOn: isoDate,
    endsOn: isoDate.optional(),
    noteEn: optText,
    noteAr: optText,
    sourceUrl: z.url().optional().nullable(),
  })
  .refine((v) => !v.endsOn || v.endsOn >= v.startsOn, { message: "End date is before start date", path: ["endsOn"] });

export async function addOverride(db: Db, actor: Actor | "system", input: z.input<typeof overrideInput>, origin: "admin" | "watcher_approved" | "watcher_auto" = "admin") {
  assertCan(actor, "duroos.write");
  const v = overrideInput.parse(input);
  const [lesson] = await db.select({ id: lessons.id }).from(lessons).where(eq(lessons.slug, v.lessonSlug));
  if (!lesson) throw new Error("lesson_not_found");
  const endsOn = v.endsOn ?? v.startsOn;
  const [dup] = await db
    .select()
    .from(lessonOverrides)
    .where(and(eq(lessonOverrides.lessonId, lesson.id), eq(lessonOverrides.kind, v.kind), eq(lessonOverrides.startsOn, v.startsOn), eq(lessonOverrides.endsOn, endsOn), isNull(lessonOverrides.revokedAt)))
    .limit(1);
  if (dup) return dup;
  const [row] = await db
    .insert(lessonOverrides)
    .values({
      lessonId: lesson.id,
      kind: v.kind,
      startsOn: v.startsOn,
      endsOn: v.endsOn ?? v.startsOn,
      noteEn: en(v.noteEn),
      noteAr: ar(v.noteAr),
      sourceUrl: v.sourceUrl ?? null,
      origin,
    })
    .returning();
  await record(db, actor, { action: "create", entity: "override", entityId: String(row.id), before: null, after: { ...row, lessonSlug: v.lessonSlug } });
  refreshPublic([...DUROOS_PATHS, `/duroos/lesson/${v.lessonSlug}`, `/ar/duroos/lesson/${v.lessonSlug}`]);
  // Phone alerts are best-effort: a push failure never blocks the change itself.
  try {
    const { getPushSender, notifyOverride } = await import("@/server/push");
    const send = await getPushSender();
    if (send) await notifyOverride(db, { lessonSlug: v.lessonSlug, kind: v.kind, startsOn: v.startsOn, noteEn: row.noteEn }, send);
  } catch {
    /* ignore */
  }
  return row;
}

export async function revokeOverride(db: Db, actor: Actor, input: { id: number }) {
  assertCan(actor, "duroos.write");
  const [before] = await db.select().from(lessonOverrides).where(eq(lessonOverrides.id, input.id));
  if (!before) throw new Error("override_not_found");
  const [after] = await db.update(lessonOverrides).set({ revokedAt: new Date() }).where(eq(lessonOverrides.id, input.id)).returning();
  await record(db, actor, { action: "update", entity: "override", entityId: String(input.id), before, after });
  refreshPublic(DUROOS_PATHS);
  return after;
}

/* ---------------- Lessons ---------------- */

const lessonFields = {
  bookEn: z.string().trim().min(1).max(300),
  bookAr: z.string().trim().min(1).max(300),
  bookAuthorEn: optText,
  bookAuthorAr: optText,
  bookUrl: optUrl,
  topic: z.string().trim().min(1).max(40),
  prayer: z.enum(["fajr", "dhuhr", "asr", "maghrib", "isha"]),
  days: z.array(z.number().int().min(0).max(6)).max(7),
  daysLabelEn: optText,
  daysLabelAr: optText,
  locationEn: z.string().trim().min(1).max(300),
  locationAr: z.string().trim().min(1).max(300),
  noteEn: optText,
  noteAr: optText,
  sequenceEn: optText,
  sequenceAr: optText,
  status: z.enum(["active", "paused", "finished"]),
  validFrom: isoDate.nullable(),
  validTo: isoDate.nullable(),
  masjidId: z.string().min(1),
};

const lessonUpdate = z.object({ slug: z.string().min(1) }).extend(z.object(lessonFields).partial().shape);

function cleanLessonFields<T extends Record<string, unknown>>(v: T): T {
  const out: Record<string, unknown> = { ...v };
  for (const [k, val] of Object.entries(v)) {
    if (typeof val === "string" && /(En|Ar)$/.test(k)) out[k] = /Ar$/.test(k) ? ar(val) : en(val);
  }
  return out as T;
}

export async function updateLesson(db: Db, actor: Actor, input: z.input<typeof lessonUpdate>) {
  assertCan(actor, "duroos.write");
  const { slug, ...patch } = lessonUpdate.parse(input);
  const [before] = await db.select().from(lessons).where(eq(lessons.slug, slug));
  if (!before) throw new Error("lesson_not_found");
  const [after] = await db.update(lessons).set(cleanLessonFields(patch)).where(eq(lessons.slug, slug)).returning();
  await record(db, actor, { action: "update", entity: "lesson", entityId: slug, before, after });
  refreshPublic([...DUROOS_PATHS, `/duroos/lesson/${slug}`, `/ar/duroos/lesson/${slug}`]);
  return after;
}

const lessonCreate = z.object(lessonFields).extend({ shaykhSlug: z.string().min(1) }).partial({
  bookAuthorEn: true, bookAuthorAr: true, daysLabelEn: true, daysLabelAr: true, noteEn: true, noteAr: true,
  sequenceEn: true, sequenceAr: true, validFrom: true, validTo: true, status: true,
});

export async function createLesson(db: Db, actor: Actor, input: z.input<typeof lessonCreate>) {
  assertCan(actor, "duroos.write");
  const v = lessonCreate.parse(input);
  const [s] = await db.select({ id: shaykhs.id }).from(shaykhs).where(eq(shaykhs.slug, v.shaykhSlug));
  if (!s) throw new Error("shaykh_not_found");
  const [m] = await db.select({ id: masjids.id }).from(masjids).where(eq(masjids.id, v.masjidId));
  if (!m) throw new Error("masjid_not_found");
  const { shaykhSlug: _ignored, ...fields } = v;
  const slugBase = slugify(`${v.shaykhSlug.split("-").slice(-1)[0]}-${v.bookEn}`);
  const taken = new Set((await db.select({ s: lessons.slug }).from(lessons).where(like(lessons.slug, `${slugBase}%`))).map((r) => r.s));
  let slug = slugBase;
  for (let i = 2; taken.has(slug); i++) slug = `${slugBase}-${i}`;
  const [row] = await db
    .insert(lessons)
    .values({ ...cleanLessonFields(fields), slug, shaykhId: s.id, status: v.status ?? "active", sort: 1000 })
    .returning();
  await record(db, actor, { action: "create", entity: "lesson", entityId: slug, before: null, after: row });
  refreshPublic(DUROOS_PATHS);
  return row;
}

/* ---------------- Shaykhs ---------------- */

const shaykhUpdate = z.object({
  slug: z.string().min(1),
  nameEn: z.string().trim().min(2).max(200).optional(),
  nameAr: z.string().trim().min(2).max(200).optional(),
  roleEn: optText,
  roleAr: optText,
  photo: optUrl,
  facts: z.array(z.object({ en: z.string().trim().max(600), ar: z.string().trim().max(600) })).max(20).optional(),
});

export async function updateShaykh(db: Db, actor: Actor, input: z.input<typeof shaykhUpdate>) {
  assertCan(actor, "duroos.write");
  const { slug, facts, ...rest } = shaykhUpdate.parse(input);
  const [before] = await db.select().from(shaykhs).where(eq(shaykhs.slug, slug));
  if (!before) throw new Error("shaykh_not_found");
  const patch: Record<string, unknown> = cleanLessonFields(rest);
  if (facts) patch.facts = facts.filter((f) => f.en || f.ar).map((f) => ({ en: cleanText(f.en, "en"), ar: cleanText(f.ar, "ar") }));
  const [after] = await db.update(shaykhs).set(patch).where(eq(shaykhs.slug, slug)).returning();
  await record(db, actor, { action: "update", entity: "shaykh", entityId: slug, before, after });
  refreshPublic([`/duroos/shaykh/${slug}`, `/ar/duroos/shaykh/${slug}`, ...DUROOS_PATHS]);
  return after;
}

/* ---------------- Announcements ---------------- */

const announcementInput = z.object({
  slug: z.string().optional(),
  titleEn: z.string().trim().min(2).max(200),
  titleAr: z.string().trim().min(2).max(200),
  bodyEn: z.string().trim().min(1).max(5000),
  bodyAr: z.string().trim().min(1).max(5000),
  type: z.enum(["cancellation", "postponement", "resumption", "new-book", "book-finished", "reminder", "info", "guest", "lecture"]),
  eventDate: isoDate.optional().nullable(),
  shaykhSlug: z.string().optional().nullable(),
  masjidId: z.string().optional().nullable(),
  sourceUrl: z.url().optional().nullable(),
  imageUrl: z.string().max(500).optional().nullable(),
  status: z.enum(["draft", "published", "archived"]),
});

export async function saveAnnouncement(db: Db, actor: Actor, input: z.input<typeof announcementInput>) {
  assertCan(actor, "announcements.write");
  const v = announcementInput.parse(input);
  let shaykhId: number | null = null;
  if (v.shaykhSlug) {
    const [s] = await db.select({ id: shaykhs.id }).from(shaykhs).where(eq(shaykhs.slug, v.shaykhSlug));
    if (!s) throw new Error("shaykh_not_found");
    shaykhId = s.id;
  }
  const fields = {
    titleEn: en(v.titleEn)!, titleAr: ar(v.titleAr)!, bodyEn: en(v.bodyEn)!, bodyAr: ar(v.bodyAr)!,
    type: v.type, eventDate: v.eventDate ?? null, shaykhId, masjidId: v.masjidId ?? null,
    sourceUrl: v.sourceUrl ?? null, imageUrl: v.imageUrl ?? null, status: v.status,
  };
  if (v.slug) {
    const [before] = await db.select().from(announcements).where(eq(announcements.slug, v.slug));
    if (!before) throw new Error("announcement_not_found");
    const publishedAt = v.status === "published" ? before.publishedAt ?? new Date() : before.publishedAt;
    const [after] = await db.update(announcements).set({ ...fields, publishedAt }).where(eq(announcements.slug, v.slug)).returning();
    await record(db, actor, { action: "update", entity: "announcement", entityId: v.slug, before, after });
    refreshPublic(DUROOS_PATHS);
    return after;
  }
  const slug = await uniqueSlug(db, slugify(v.titleEn), announcements);
  const now = new Date();
  const [row] = await db
    .insert(announcements)
    .values({ ...fields, slug, postedAt: now, publishedAt: v.status === "published" ? now : null })
    .returning();
  await record(db, actor, { action: "create", entity: "announcement", entityId: slug, before: null, after: row });
  refreshPublic(DUROOS_PATHS);
  return row;
}
