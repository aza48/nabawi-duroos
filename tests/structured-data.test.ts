import { beforeAll, describe, expect, it } from "vitest";
import { eq } from "drizzle-orm";
import { resetTestDb, type Db } from "@/server/db/client";
import { importLegacy } from "@/server/seed/import-legacy";
import { lessonOverrides, lessons } from "@/server/db/schema";
import { getLesson, getShaykh } from "@/server/duroos/queries";
import { lessonFeed } from "@/server/calendar";
import { lessonEventLd, shaykhLd } from "@/features/duroos/structured-data";

let db: Db;
beforeAll(async () => {
  db = await resetTestDb();
  await importLegacy(db);
  const [l] = await db.select().from(lessons).where(eq(lessons.slug, "ruh-dalil"));
  await db.insert(lessonOverrides).values({ lessonId: l.id, kind: "cancelled", startsOn: "2026-11-12", endsOn: "2026-11-12", origin: "admin" });
});

const nextFrom = async (slug: string, from: string) => (await lessonFeed(db, { lessonSlug: slug }, from, 14)).events[0] ?? null;

describe("Event markup on lesson pages (A1)", () => {
  it("describes the next sitting, scheduled, at its masjid in Madinah", async () => {
    const l = (await getLesson(db, "ruh-dalil"))!;
    const ld = lessonEventLd(l, await nextFrom("ruh-dalil", "2026-11-13"), "en")!;
    expect(ld["@type"]).toBe("Event");
    expect(ld.eventStatus).toBe("https://schema.org/EventScheduled");
    expect(ld.startDate).toMatch(/^2026-11-\d\dT\d\d:\d\d:00\.000Z$/);
    expect(ld.location.address.addressLocality).toBe("Madinah");
    expect(ld.performer.name).toBe(l.shaykh.nameEn);
    expect(ld.url).toBe("https://medinahub.org/duroos/lesson/ruh-dalil");
  });

  it("marks a cancelled sitting EventCancelled", async () => {
    const l = (await getLesson(db, "ruh-dalil"))!;
    const ld = lessonEventLd(l, await nextFrom("ruh-dalil", "2026-11-12"), "en")!;
    expect(ld.eventStatus).toBe("https://schema.org/EventCancelled");
  });

  it("gives no Event without a next sitting", async () => {
    const l = (await getLesson(db, "ruh-dalil"))!;
    expect(lessonEventLd(l, null, "en")).toBeNull();
  });

  it("writes the Arabic page in Arabic", async () => {
    const l = (await getLesson(db, "ruh-dalil"))!;
    const ld = lessonEventLd(l, await nextFrom("ruh-dalil", "2026-11-13"), "ar")!;
    expect(ld.name).toContain(l.bookAr);
    expect(ld.url).toBe("https://medinahub.org/ar/duroos/lesson/ruh-dalil");
  });
});

describe("Person markup on shaykh pages (A1)", () => {
  it("names the shaykh in both languages, with his role and page", async () => {
    const [row] = await db.select({ slug: lessons.slug }).from(lessons).where(eq(lessons.slug, "ruh-dalil"));
    const l = (await getLesson(db, row.slug))!;
    const s = (await getShaykh(db, l.shaykh.slug))!;
    const ld = shaykhLd(s, "en");
    expect(ld["@type"]).toBe("Person");
    expect(ld.name).toBe(s.nameEn);
    expect(ld.alternateName).toBe(s.nameAr);
    if (s.roleEn) expect(ld.jobTitle).toBe(s.roleEn);
    expect(ld.url).toBe(`https://medinahub.org/duroos/shaykh/${s.slug}`);
    expect(JSON.stringify(ld)).not.toMatch(/[–—]/);
  });
});
