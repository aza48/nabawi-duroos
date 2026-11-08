import { beforeAll, describe, expect, it } from "vitest";
import { eq } from "drizzle-orm";
import { resetTestDb, type Db } from "@/server/db/client";
import { importLegacy } from "@/server/seed/import-legacy";
import { lessonOverrides, lessons } from "@/server/db/schema";
import { buildIcs, datesFeed, lessonFeed } from "@/server/calendar";

let db: Db;
beforeAll(async () => {
  db = await resetTestDb();
  await importLegacy(db);
  const [l] = await db.select().from(lessons).where(eq(lessons.slug, "ruh-dalil"));
  await db.insert(lessonOverrides).values({ lessonId: l.id, kind: "cancelled", startsOn: "2026-11-12", endsOn: "2026-11-12", origin: "admin", noteEn: "The shaykh excused himself" });
});

describe("buildIcs", () => {
  const ics = buildIcs("MESH; test", [{
    uid: "x@medinahub.org", start: new Date("2026-11-12T12:15:00Z"), end: new Date("2026-11-12T13:15:00Z"),
    summary: "Book, part 1; notes", description: "Line one\nLine two", location: "Nabawi", url: "https://medinahub.org/x", cancelled: false,
  }]);
  it("is a valid calendar with CRLF line endings", () => {
    expect(ics.startsWith("BEGIN:VCALENDAR\r\n")).toBe(true);
    expect(ics.trimEnd().endsWith("END:VCALENDAR")).toBe(true);
    expect(ics.split("\r\n").every((line) => line.length <= 75)).toBe(true);
  });
  it("escapes commas, semicolons and new lines", () => {
    expect(ics).toContain("SUMMARY:Book\\, part 1\\; notes");
    expect(ics).toContain("DESCRIPTION:Line one\\nLine two");
    expect(ics).toContain("DTSTART:20261112T121500Z");
  });
});

describe("datesFeed", () => {
  it("turns the University calendar into whole-day events with an exclusive end", () => {
    const ics = buildIcs(datesFeed().title, datesFeed().events);
    const finals = ics.slice(ics.indexOf("UID:date-finals-1@"));
    expect(finals).toContain("DTSTART;VALUE=DATE:20261129");
    expect(finals).toContain("DTEND;VALUE=DATE:20261215");
    expect(ics).toContain("UID:date-eid-fitr@medinahub.org");
    expect(ics.split("\r\n").every((line) => line.length <= 75)).toBe(true);
  });
});

describe("lessonFeed", () => {
  it("lists a week of Dalil al-Talib lessons and marks the cancelled one", async () => {
    const feed = await lessonFeed(db, { lessonSlug: "ruh-dalil" }, "2026-11-08", 7);
    expect(feed.events).toHaveLength(3);
    const cancelled = feed.events.filter((e) => e.cancelled);
    expect(cancelled).toHaveLength(1);
    expect(cancelled[0].uid).toBe("ruh-dalil-2026-11-12@medinahub.org");
    expect(buildIcs(feed.title, feed.events)).toContain("STATUS:CANCELLED");
  });
  it("gives a dars with an unconfirmed time no timed event", async () => {
    const feed = await lessonFeed(db, { lessonSlug: "balawi-saidi-tahrir" }, "2026-11-08", 14);
    expect(feed.events).toHaveLength(0);
    const masjid = await lessonFeed(db, { masjidId: "dar-hijrah" }, "2026-11-08", 14);
    expect(masjid.events.some((e) => e.uid.startsWith("hijrah-tariq-fath-"))).toBe(false);
  });
  it("builds a feed for one shaykh across masjids", async () => {
    const feed = await lessonFeed(db, { shaykhSlug: "sulayman-ibn-saleemullah-al-ruhayli" }, "2026-11-08", 7);
    expect(new Set(feed.events.map((e) => e.uid.split("-2026")[0]))).toEqual(new Set(["ruh-targhib", "ruh-dalil", "ruh-tawhid", "quba-ruh-kabair"]));
  });
});
