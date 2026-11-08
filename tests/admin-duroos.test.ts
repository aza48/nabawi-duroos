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

  it("sets and clears a shaykh photo and a dars book link, and rejects unsafe links", async () => {
    const slug = "sulayman-ibn-saleemullah-al-ruhayli";
    await updateShaykh(db, duroosEditor, { slug, photo: "/shaykhs/ruhayli.jpg" });
    expect((await db.select().from(shaykhs).where(eq(shaykhs.slug, slug)))[0].photo).toBe("/shaykhs/ruhayli.jpg");
    await updateShaykh(db, duroosEditor, { slug, photo: "" });
    expect((await db.select().from(shaykhs).where(eq(shaykhs.slug, slug)))[0].photo).toBeNull();
    await expect(updateShaykh(db, duroosEditor, { slug, photo: "javascript:alert(1)" })).rejects.toThrow();
    await expect(updateShaykh(db, duroosEditor, { slug, photo: "/\\evil.com" })).rejects.toThrow();
    const l = await updateLesson(db, duroosEditor, { slug: "ruh-dalil", bookUrl: "https://example.org/book.pdf" });
    expect(l.bookUrl).toBe("https://example.org/book.pdf");
    await expect(updateLesson(db, duroosEditor, { slug: "ruh-dalil", bookUrl: "http://insecure.example" })).rejects.toThrow();
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

describe("a published schedule update also changes the schedule (audit M9)", () => {
  it("creates the matching override for the named dars, so the dars card agrees with the Updates page", async () => {
    const a = await saveAnnouncement(db, duroosEditor, {
      titleEn: "Dalil al-Talib cancelled this Friday", titleAr: "إلغاء درس دليل الطالب يوم الجمعة", bodyEn: "The shaykh excused himself.", bodyAr: "يعتذر الشيخ.",
      type: "cancellation", eventDate: "2026-11-20", lessonSlug: "ruh-dalil", status: "published",
    });
    expect(a.scheduleUpdated).toBe(true);
    expect(a.lessonId).not.toBeNull();
    const t = await getToday(db, new Date("2026-11-20T09:30:00Z"));
    const dalil = t.lessons.find((l) => l.slug === "ruh-dalil")!;
    expect(dalil.status).toBe("cancelled");
    expect(dalil.overrideNoteEn).toBe("Dalil al-Talib cancelled this Friday");
  });
  it("picks the shaykh's only dars on that weekday when none is named, and nothing when it is not clear", async () => {
    // Thursday: al-Ruhayli gives only Dalil al-Talib. Saturday: two duroos, so no guess is made.
    const thu = await saveAnnouncement(db, duroosEditor, {
      titleEn: "No dars this Thursday", titleAr: "لا درس يوم الخميس", bodyEn: "x", bodyAr: "x",
      type: "cancellation", eventDate: "2026-11-26", shaykhSlug: "sulayman-ibn-saleemullah-al-ruhayli", status: "published",
    });
    expect(thu.scheduleUpdated).toBe(true);
    expect((await getToday(db, new Date("2026-11-26T09:30:00Z"))).lessons.find((l) => l.slug === "ruh-dalil")?.status).toBe("cancelled");
    const sat = await saveAnnouncement(db, duroosEditor, {
      titleEn: "No dars this Saturday", titleAr: "لا درس يوم السبت", bodyEn: "x", bodyAr: "x",
      type: "cancellation", eventDate: "2026-11-28", shaykhSlug: "sulayman-ibn-saleemullah-al-ruhayli", status: "published",
    });
    expect(sat.scheduleUpdated).toBe(false);
    expect((await getToday(db, new Date("2026-11-28T09:30:00Z"))).lessons.filter((l) => l.status !== "on")).toHaveLength(0);
  });
  it("an edit that moves the date or takes the update down undoes the old schedule change", async () => {
    const statusOn = async (iso: string) => (await getToday(db, new Date(`${iso}T09:30:00Z`))).lessons.find((l) => l.slug === "ruh-dalil")?.status;
    const base = { titleEn: "Dalil al-Talib cancelled", titleAr: "إلغاء درس دليل الطالب", bodyEn: "x", bodyAr: "x", type: "cancellation", lessonSlug: "ruh-dalil" } as const;
    const a = await saveAnnouncement(db, duroosEditor, { ...base, eventDate: "2026-12-04", status: "published" });
    expect(await statusOn("2026-12-04")).toBe("cancelled");
    const moved = await saveAnnouncement(db, duroosEditor, { ...base, slug: a.slug, eventDate: "2026-12-11", status: "published" });
    expect(moved.scheduleUpdated).toBe(true);
    expect(await statusOn("2026-12-04")).toBe("on");
    expect(await statusOn("2026-12-11")).toBe("cancelled");
    await saveAnnouncement(db, duroosEditor, { ...base, slug: a.slug, eventDate: "2026-12-11", status: "draft" });
    expect(await statusOn("2026-12-11")).toBe("on");
  });
  it("leaves the schedule alone for drafts and for plain notices", async () => {
    const d = await saveAnnouncement(db, duroosEditor, {
      titleEn: "Maybe cancelled", titleAr: "ربما", bodyEn: "x", bodyAr: "x", type: "cancellation", eventDate: "2026-12-03", lessonSlug: "ruh-dalil", status: "draft",
    });
    expect(d.scheduleUpdated).toBe(false);
    const n = await saveAnnouncement(db, duroosEditor, {
      titleEn: "Bring your book", titleAr: "أحضر كتابك", bodyEn: "x", bodyAr: "x", type: "reminder", eventDate: "2026-12-03", lessonSlug: "ruh-dalil", status: "published",
    });
    expect(n.scheduleUpdated).toBe(false);
    expect((await getToday(db, new Date("2026-12-03T09:30:00Z"))).lessons.find((l) => l.slug === "ruh-dalil")?.status).toBe("on");
  });
});
