import { describe, expect, it } from "vitest";
import { nowNext, type NowNextLesson } from "@/features/duroos/now-next";

const base = { bookAr: "", shaykhAr: "", placeEn: "Nabawi", placeAr: "النبوي", timeKnown: true, status: "on" } as const;
const L = (slug: string, prayer: NowNextLesson["prayer"], adhan: string, from: string, until: string, extra: Partial<NowNextLesson> = {}): NowNextLesson =>
  ({ ...base, slug, bookEn: slug, shaykhEn: "Shaykh " + slug, prayer, adhanAt: `2026-11-09T${adhan}:00Z`, liveFrom: `2026-11-09T${from}:00Z`, liveUntil: `2026-11-09T${until}:00Z`, ...extra });

const day = [
  L("fajr-1", "fajr", "02:13", "02:40", "03:40"),
  L("asr-1", "asr", "12:14", "12:35", "13:35"),
  L("maghrib-1", "maghrib", "14:37", "14:50", "15:50"),
  L("maghrib-2", "maghrib", "14:37", "14:50", "15:50", { status: "cancelled" }),
  L("isha-x", "isha", "16:07", "16:25", "17:25", { timeKnown: false }),
];
const t = (hhmm: string) => Date.parse(`2026-11-09T${hhmm}:00Z`);

describe("now and next", () => {
  it("before Fajr: nothing live, next is after Fajr", () => {
    const r = nowNext(day, t("01:00"));
    expect(r.live).toEqual([]);
    expect(r.next?.prayer).toBe("fajr");
    expect(r.next?.lessons.map((l) => l.slug)).toEqual(["fajr-1"]);
  });
  it("during a dars: it is live with minutes in and progress, and the next group follows", () => {
    const r = nowNext(day, t("12:50"));
    expect(r.live.map((x) => x.lesson.slug)).toEqual(["asr-1"]);
    expect(r.live[0].minutesIn).toBe(15);
    expect(r.live[0].progress).toBeCloseTo(0.25);
    expect(r.next?.prayer).toBe("maghrib");
  });
  it("shows a cancelled dars in the next group, never as live", () => {
    expect(nowNext(day, t("14:00")).next?.lessons.map((l) => `${l.slug}:${l.status}`)).toEqual(["maghrib-1:on", "maghrib-2:cancelled"]);
    expect(nowNext(day, t("15:00")).live.map((x) => x.lesson.slug)).toEqual(["maghrib-1"]);
  });
  it("after the last timed dars: nothing next; an unconfirmed time never counts", () => {
    const r = nowNext(day, t("16:30"));
    expect(r.live).toEqual([]);
    expect(r.next).toBeNull();
  });
});
