import { beforeAll, describe, expect, it } from "vitest";
import { eq } from "drizzle-orm";
import { resetTestDb, type Db } from "@/server/db/client";
import { importLegacy } from "@/server/seed/import-legacy";
import { lessonOverrides, lessons } from "@/server/db/schema";
import { getToday } from "@/server/duroos/queries";
import { LITE_MAX_BYTES, liteHtml } from "@/features/duroos/lite";

let db: Db;
// Thursday 12 November 2026, 2 pm in Madinah.
const NOW = new Date("2026-11-12T11:00:00Z");
beforeAll(async () => {
  db = await resetTestDb();
  await importLegacy(db);
  const [l] = await db.select().from(lessons).where(eq(lessons.slug, "ruh-dalil"));
  await db.insert(lessonOverrides).values({ lessonId: l.id, kind: "cancelled", startsOn: "2026-11-12", endsOn: "2026-11-12", origin: "admin", noteEn: "The shaykh is travelling <today>" });
});

describe("/lite, today's duroos for a weak signal (S4)", () => {
  it("stays under 15 KB with no scripts, fonts or images", async () => {
    const html = liteHtml(await getToday(db, NOW), "en", NOW);
    expect(Buffer.byteLength(html)).toBeLessThan(LITE_MAX_BYTES);
    expect(html).not.toMatch(/<script|<img|<link rel="(stylesheet|preload)"|@font-face/);
    expect(html.startsWith("<!doctype html><html lang=\"en\" dir=\"ltr\">")).toBe(true);
  });

  it("lists today's duroos by prayer and marks a cancellation, with its note escaped", async () => {
    const today = await getToday(db, NOW);
    const html = liteHtml(today, "en", NOW);
    expect(today.lessons.length).toBeGreaterThan(0);
    for (const l of today.lessons.slice(0, 5)) expect(html).toContain(l.bookAr.replace(/&/g, "&amp;"));
    expect(html).toContain("CANCELLED");
    expect(html).toContain("The shaykh is travelling &lt;today&gt;");
    expect(html).toContain("Message Admin on WhatsApp at");
  });

  it("is right to left and in Arabic at /ar/lite", async () => {
    const html = liteHtml(await getToday(db, NOW), "ar", NOW);
    expect(html.startsWith('<!doctype html><html lang="ar" dir="rtl">')).toBe(true);
    expect(html).toContain("دروس اليوم");
    expect(html).toContain("ملغى");
    expect(html).not.toMatch(/[–—]/);
  });
});
