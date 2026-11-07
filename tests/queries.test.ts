import { beforeAll, describe, expect, it } from "vitest";
import { eq } from "drizzle-orm";
import { resetTestDb, type Db } from "@/server/db/client";
import { importLegacy } from "@/server/seed/import-legacy";
import { lessonOverrides, lessons } from "@/server/db/schema";
import { getLesson, getShaykh, getToday, getWeek, listAnnouncements } from "@/server/duroos/queries";
import { listFaqs, listGuides } from "@/server/content/queries";
import { prayerTimes } from "@/lib/time/prayer";

let db: Db;
beforeAll(async () => {
  db = await resetTestDb();
  await importLegacy(db);
});

describe("getToday", () => {
  it("lists Saturday's Dalil al-Talib lesson as upcoming at 12:30 with the Asr adhan time", async () => {
    const t = await getToday(db, new Date("2026-11-07T09:30:00Z"));
    expect(t.date).toBe("2026-11-07");
    const dalil = t.lessons.find((l) => l.slug === "ruh-dalil");
    expect(dalil).toBeDefined();
    expect(dalil!.phase).toBe("upcoming");
    expect(dalil!.status).toBe("on");
    expect(dalil!.adhanAt).toBe(prayerTimes("2026-11-07").asr.toISOString());
    expect(dalil!.shaykh.slug).toBe("sulayman-ibn-saleemullah-al-ruhayli");
    expect(dalil!.masjid.id).toBe("nabawi");
    expect(dalil!.stream?.url).toBe("https://www.youtube.com/@wmngovksa/live");
  });

  it("uses the Riyadh date just after Riyadh midnight", async () => {
    const t = await getToday(db, new Date("2026-11-07T21:30:00Z"));
    expect(t.date).toBe("2026-11-08");
  });

  it("reflects a cancellation override on that date", async () => {
    const [l] = await db.select().from(lessons).where(eq(lessons.slug, "ruh-dalil"));
    await db.insert(lessonOverrides).values({
      lessonId: l.id, kind: "cancelled", startsOn: "2026-11-12", endsOn: "2026-11-12",
      noteEn: "The shaykh excused himself", noteAr: "يعتذر الشيخ", origin: "admin",
    });
    const t = await getToday(db, new Date("2026-11-12T09:30:00Z"));
    const dalil = t.lessons.find((x) => x.slug === "ruh-dalil")!;
    expect(dalil.status).toBe("cancelled");
    expect(dalil.overrideNoteEn).toBe("The shaykh excused himself");
  });
});

describe("lookups", () => {
  it("returns a shaykh with all four of his lessons", async () => {
    const s = await getShaykh(db, "sulayman-ibn-saleemullah-al-ruhayli");
    expect(s?.lessons).toHaveLength(4);
  });
  it("returns null for an unknown lesson", async () => {
    expect(await getLesson(db, "nope")).toBeNull();
  });
  it("returns a lesson with its shaykh and masjid", async () => {
    const l = await getLesson(db, "ruh-dalil");
    expect(l?.shaykh.nameEn).toContain("al-Ruhayli");
    expect(l?.masjid.id).toBe("nabawi");
  });
  it("groups the week and keeps unstated-day lessons", async () => {
    const w = await getWeek(db);
    expect(w.byDay[6].some((r) => r.slug === "ruh-dalil")).toBe(true);
    expect(Array.isArray(w.daysNotStated)).toBe(true);
  });
  it("lists only published announcements unless archived ones are requested", async () => {
    const pub = await listAnnouncements(db, { limit: 100 });
    const all = await listAnnouncements(db, { limit: 100, includeArchived: true });
    expect(pub.every((a) => a.status === "published")).toBe(true);
    expect(all.length).toBeGreaterThanOrEqual(pub.length);
  });
  it("keeps announcements whose event date has passed out of the current feed", async () => {
    const now = new Date("2026-11-07T09:30:00Z");
    const current = await listAnnouncements(db, { limit: 100, now });
    expect(current.every((a) => !a.eventDate || a.eventDate >= "2026-11-07")).toBe(true);
    const all = await listAnnouncements(db, { limit: 100, includeArchived: true, now });
    expect(all.some((a) => a.eventDate && a.eventDate < "2026-11-07")).toBe(true);
  });
  it("starts with the 17 guides from the previous MESH site plus the 2026 guides and answers", async () => {
    const { GUIDES_2026, FAQS_2026 } = await import("@/server/seed/content/guides-2026");
    const rewritten = GUIDES_2026.filter((g) => ["drivers-license", "finding-an-apartment"].includes(g.slug)).length;
    expect(await listFaqs(db)).toHaveLength(FAQS_2026.length);
    expect(await listGuides(db)).toHaveLength(17 + GUIDES_2026.length - rewritten);
  });
});
