import { describe, expect, it } from "vitest";
import type { TodayLesson } from "@/server/duroos/queries";
import { todaysChanges } from "@/features/home/rail";

const lesson = (slug: string, status: TodayLesson["status"]): TodayLesson =>
  ({ slug, bookEn: `Book ${slug}`, bookAr: "", status, overrideNoteEn: status === "on" ? null : "note", overrideNoteAr: null }) as TodayLesson;

describe("today's changes on the home rail (D6)", () => {
  it("lists cancelled, postponed, moved and guest duroos, with public fields only", () => {
    const got = todaysChanges(["on", "resumed", "cancelled", "postponed", "moved", "guest"].map((s) => lesson(s, s as TodayLesson["status"])));
    expect(got.map((c) => c.slug)).toEqual(["cancelled", "postponed", "moved", "guest"]);
    expect(Object.keys(got[0]).sort()).toEqual(["bookAr", "bookEn", "noteAr", "noteEn", "slug", "status"]);
  });
});

import { railRows } from "@/features/home/rail";
import type { NowNextLesson } from "@/features/duroos/now-next";

const at = (hhmm: string) => `2026-11-09T${hhmm}:00.000Z`;
const slim = (slug: string, prayer: NowNextLesson["prayer"], adhan: string, from: string, until: string, over: Partial<NowNextLesson> = {}): NowNextLesson => ({
  slug, prayer, bookEn: slug, bookAr: "", timeKnown: true, adhanAt: at(adhan), liveFrom: at(from), liveUntil: at(until), status: "on",
  shaykhEn: "", shaykhAr: "", placeEn: "", placeAr: "", ...over,
});
const DAY = [
  slim("asr-1", "asr", "12:14", "12:24", "13:44"),
  slim("maghrib-1", "maghrib", "14:37", "14:47", "16:07"),
  slim("maghrib-2", "maghrib", "14:37", "14:47", "16:07"),
  slim("isha-1", "isha", "16:07", "16:27", "17:37"),
  slim("isha-2", "isha", "16:07", "16:27", "17:37"),
];
const ms = (iso: string) => new Date(iso).getTime();

describe("home rail rows (D6)", () => {
  it("fills three rows from the next prayers in order", () => {
    const r = railRows(DAY, ms(at("10:00")));
    expect(r.live).toEqual([]);
    expect(r.groups.map((g) => [g.prayer, g.items.map((l) => l.slug)])).toEqual([["asr", ["asr-1"]], ["maghrib", ["maghrib-1", "maghrib-2"]]]);
    expect(r.more).toBe(0);
  });

  it("puts a live dars first and says how many did not fit", () => {
    const r = railRows(DAY, ms(at("12:30")));
    expect(r.live.map((x) => x.lesson.slug)).toEqual(["asr-1"]);
    expect(r.groups.map((g) => g.items.map((l) => l.slug))).toEqual([["maghrib-1", "maghrib-2"]]);
    const r2 = railRows(DAY, ms(at("14:50")));
    expect(r2.live.map((x) => x.lesson.slug)).toEqual(["maghrib-1", "maghrib-2"]);
    expect(r2.groups.map((g) => g.items.map((l) => l.slug))).toEqual([["isha-1"]]);
    expect(r2.more).toBe(1);
  });

  it("is empty after the last dars, and never lists an unconfirmed time", () => {
    expect(railRows(DAY, ms(at("18:00")))).toEqual({ live: [], groups: [], more: 0 });
    const r = railRows([slim("evening", "isha", "16:07", "16:27", "17:37", { timeKnown: false })], ms(at("10:00")));
    expect(r.groups).toEqual([]);
  });
});
