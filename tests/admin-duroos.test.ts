import { beforeAll, describe, expect, it } from "vitest";
import { eq } from "drizzle-orm";
import { resetTestDb, type Db } from "@/server/db/client";
import { importLegacy } from "@/server/seed/import-legacy";
import { addOverride, revokeOverride, saveAnnouncement, updateLesson, updateShaykh } from "@/server/admin/duroos";
import { listActivity, undo } from "@/server/admin/audit";
import { getToday, listAnnouncements } from "@/server/duroos/queries";
import { auditLog, lessonOverrides, lessons, shaykhs, user } from "@/server/db/schema";
import type { Actor } from "@/server/auth/permissions";

let db: Db;
const duroosEditor: Actor = { id: "d1", name: "Bilal", role: "duroos_editor" };
const contentEditor: Actor = { id: "c1", name: "Hana", role: "content_editor" };
const owner: Actor = { id: "o1", name: "Owner", role: "owner" };
const THU = new Date("2026-11-12T09:30:00Z");

beforeAll(async () => {
  db = await resetTestDb();
  await importLegacy(db);
  const now = new Date();
  await db.insert(user).values([duroosEditor, contentEditor, owner].map((a) => ({
    id: a.id, name: a.name, email: `${a.id}@example.com`, emailVerified: true, role: a.role, createdAt: now, updatedAt: now,
  })));
});

describe("overrides", () => {
  it("keeps content editors from cancelling lessons", async () => {
    await expect(addOverride(db, contentEditor, { lessonSlug: "ruh-dalil", kind: "cancelled", startsOn: "2026-11-12" })).rejects.toThrow("forbidden");
  });

  it("cancels a lesson for a day, shows the note, and can be revoked", async () => {
    const o = await addOverride(db, duroosEditor, {
      lessonSlug: "ruh-dalil", kind: "cancelled", startsOn: "2026-11-12", noteEn: "The shaykh excused himself — travel", noteAr: "يعتذر الشيخ",
    });
    let t = await getToday(db, THU);
    const d = t.lessons.find((l) => l.slug === "ruh-dalil")!;
    expect(d.status).toBe("cancelled");
    expect(d.overrideNoteEn).toBe("The shaykh excused himself, travel");
    await revokeOverride(db, duroosEditor, { id: o.id });
    t = await getToday(db, THU);
    expect(t.lessons.find((l) => l.slug === "ruh-dalil")!.status).toBe("on");
  });

  it("rejects an end date before the start date and unknown lessons", async () => {
    await expect(addOverride(db, duroosEditor, { lessonSlug: "ruh-dalil", kind: "cancelled", startsOn: "2026-11-12", endsOn: "2026-11-10" })).rejects.toThrow();
    await expect(addOverride(db, duroosEditor, { lessonSlug: "nope", kind: "cancelled", startsOn: "2026-11-12" })).rejects.toThrow("lesson_not_found");
  });

  it("writes one audit row per change and undo removes the override", async () => {
    const before = (await listActivity(db, { limit: 500 })).length;
    const o = await addOverride(db, duroosEditor, { lessonSlug: "ruh-dalil", kind: "postponed", startsOn: "2026-11-13" });
    const rows = await listActivity(db, { limit: 500 });
    expect(rows.length).toBe(before + 1);
    expect(rows[0]).toMatchObject({ action: "create", entity: "override", entityId: String(o.id), actorName: "Bilal" });
    await undo(db, owner, rows[0].id);
    const [row] = await db.select().from(lessonOverrides).where(eq(lessonOverrides.id, o.id));
    expect(row.revokedAt).not.toBeNull();
  });
});

describe("lessons, shaykhs and announcements", () => {
  it("updates a lesson's location and logs before/after", async () => {
    await updateLesson(db, duroosEditor, { slug: "ruh-dalil", locationEn: "Circle 3" });
    const [l] = await db.select().from(lessons).where(eq(lessons.slug, "ruh-dalil"));
    expect(l.locationEn).toBe("Circle 3");
    const [a] = await db.select().from(auditLog).where(eq(auditLog.entityId, "ruh-dalil"));
    expect((a.before as { locationEn: string }).locationEn).not.toBe("Circle 3");
  });

  it("rejects invalid weekdays", async () => {
    await expect(updateLesson(db, duroosEditor, { slug: "ruh-dalil", days: [7] })).rejects.toThrow();
  });

  it("updates a shaykh's role line", async () => {
    await updateShaykh(db, duroosEditor, { slug: "sulayman-ibn-saleemullah-al-ruhayli", roleEn: "Professor at IUM" });
    const [s] = await db.select().from(shaykhs).where(eq(shaykhs.slug, "sulayman-ibn-saleemullah-al-ruhayli"));
    expect(s.roleEn).toBe("Professor at IUM");
  });

  it("publishes an announcement that then appears in the current feed", async () => {
    const a = await saveAnnouncement(db, duroosEditor, {
      titleEn: "Lecture tonight", titleAr: "محاضرة الليلة", bodyEn: "After Isha at Quba.", bodyAr: "بعد العشاء في قباء.",
      type: "lecture", eventDate: "2099-01-01", status: "published",
    });
    expect(a.slug).toMatch(/^lecture-tonight/);
    expect(a.publishedAt).not.toBeNull();
    const feed = await listAnnouncements(db, { limit: 50 });
    expect(feed.some((x) => x.slug === a.slug)).toBe(true);
  });

  it("keeps drafts out of the feed", async () => {
    const a = await saveAnnouncement(db, duroosEditor, {
      titleEn: "Draft note", titleAr: "مسودة", bodyEn: "x", bodyAr: "x", type: "info", status: "draft",
    });
    const feed = await listAnnouncements(db, { limit: 50 });
    expect(feed.some((x) => x.slug === a.slug)).toBe(false);
  });
});
