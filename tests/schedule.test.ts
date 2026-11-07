import { describe, expect, it } from "vitest";
import { lessonPhase, lessonsForDate, weekSchedule, type LessonLike, type OverrideLike } from "@/server/duroos/schedule";
import { prayerTimes } from "@/lib/time/prayer";
import { addDays } from "@/lib/time/riyadh";

const lesson = (o: Partial<LessonLike> & Pick<LessonLike, "id" | "slug">): LessonLike => ({
  days: [], prayer: "asr", status: "active", validFrom: null, validTo: null, sort: 0, ...o,
});
const override = (o: Partial<OverrideLike> & Pick<OverrideLike, "lessonId" | "kind">): OverrideLike => ({
  startsOn: "2026-11-07", endsOn: "2026-11-07", createdAt: new Date("2026-11-07T07:00:00Z"),
  revokedAt: null, noteEn: null, noteAr: null, ...o,
});

const dalil = lesson({ id: 1, slug: "ruh-dalil", days: [4, 5, 6], prayer: "asr" });
const tawhid = lesson({ id: 2, slug: "ruh-tawhid", days: [6], prayer: "fajr" });
const maghrib = lesson({ id: 3, slug: "khalaf", days: [3, 6], prayer: "maghrib" });
const unstated = lesson({ id: 4, slug: "badr-tafsir", days: [], prayer: "fajr" });
const quba = lesson({ id: 5, slug: "quba-x", days: [6], validFrom: "2026-09-23", validTo: "2026-12-20" });

describe("lessonsForDate", () => {
  it("lists Saturday's lessons in prayer order with status on", () => {
    const r = lessonsForDate("2026-11-07", [maghrib, dalil, tawhid, unstated], []);
    expect(r.map((x) => x.lesson.slug)).toEqual(["ruh-tawhid", "ruh-dalil", "khalaf"]);
    expect(r.every((x) => x.status === "on")).toBe(true);
  });

  it("never shows lessons whose days are not stated, on any day", () => {
    for (let i = 0; i < 7; i++) {
      expect(lessonsForDate(addDays("2026-11-07", i), [unstated], [])).toEqual([]);
    }
  });

  it("applies a cancellation on its date only", () => {
    const o = override({ lessonId: 1, kind: "cancelled" });
    expect(lessonsForDate("2026-11-07", [dalil], [o])[0].status).toBe("cancelled");
    expect(lessonsForDate("2026-11-12", [dalil], [o])[0].status).toBe("on");
  });

  it("lets the most recent override win when two cover the same date", () => {
    const cancel = override({ lessonId: 1, kind: "cancelled", createdAt: new Date("2026-11-07T07:00:00Z") });
    const resume = override({ lessonId: 1, kind: "resumed", createdAt: new Date("2026-11-07T08:00:00Z") });
    expect(lessonsForDate("2026-11-07", [dalil], [resume, cancel])[0].status).toBe("resumed");
  });

  it("ignores revoked overrides", () => {
    const o = override({ lessonId: 1, kind: "cancelled", revokedAt: new Date() });
    expect(lessonsForDate("2026-11-07", [dalil], [o])[0].status).toBe("on");
  });

  it("keeps book notes from changing the day's status", () => {
    const o = override({ lessonId: 1, kind: "new_book" });
    const r = lessonsForDate("2026-11-07", [dalil], [o])[0];
    expect(r.status).toBe("on");
    expect(r.override?.kind).toBe("new_book");
  });

  it("drops lessons outside their validity period", () => {
    expect(lessonsForDate("2026-12-19", [quba], [])).toHaveLength(1);
    expect(lessonsForDate("2026-12-26", [quba], [])).toHaveLength(0);
    expect(lessonsForDate("2026-09-19", [quba], [])).toHaveLength(0);
  });

  it("skips paused and finished lessons", () => {
    expect(lessonsForDate("2026-11-07", [{ ...dalil, status: "paused" }], [])).toHaveLength(0);
  });
});

describe("weekSchedule", () => {
  it("groups lessons by weekday and keeps unstated-day lessons separately", () => {
    const w = weekSchedule([dalil, tawhid, unstated]);
    expect(w.byDay[6].map((l) => l.slug)).toEqual(["ruh-tawhid", "ruh-dalil"]);
    expect(w.byDay[4].map((l) => l.slug)).toEqual(["ruh-dalil"]);
    expect(w.byDay[0]).toEqual([]);
    expect(w.daysNotStated.map((l) => l.slug)).toEqual(["badr-tafsir"]);
  });
});

describe("lessonPhase", () => {
  const asr = prayerTimes("2026-11-07").asr;
  it("is upcoming before the adhan, live during the 90 minutes after, done later", () => {
    expect(lessonPhase(new Date(asr.getTime() - 60_000), "2026-11-07", "asr")).toBe("upcoming");
    expect(lessonPhase(new Date(asr.getTime() + 30 * 60_000), "2026-11-07", "asr")).toBe("live");
    expect(lessonPhase(new Date(asr.getTime() + 120 * 60_000), "2026-11-07", "asr")).toBe("done");
  });
});
