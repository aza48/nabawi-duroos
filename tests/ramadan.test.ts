import { describe, expect, it } from "vitest";
import { ramadanCountdown, ramadanMode, type RamadanSettings } from "@/features/home/ramadan";
import { pluralVerb } from "@/features/home/TodayHero";
import { prayerTimes } from "@/lib/time/prayer";

const ms = (iso: string) => new Date(iso).getTime();

describe("Ramadan mode (D4), fixed dates of Ramadan 1448", () => {
  it("is off outside Ramadan and Eid", () => {
    expect(ramadanMode("2027-02-07")).toBeNull(); // 30 Shaban
    expect(ramadanMode("2027-03-10")).toBeNull(); // 2 Shawwal
    expect(ramadanMode("2026-11-09")).toBeNull();
  });

  it("knows the day, the last ten nights and the eve of Eid", () => {
    const first = ramadanMode("2027-02-08");
    expect(first).toMatchObject({ kind: "ramadan", day: 1, lastTen: false, eidTomorrow: false });
    expect(ramadanMode("2027-02-27")).toMatchObject({ day: 20, lastTen: false });
    expect(ramadanMode("2027-02-28")).toMatchObject({ day: 21, lastTen: true });
    expect(ramadanMode("2027-03-08")).toMatchObject({ day: 29, lastTen: true, eidTomorrow: true });
    expect(ramadanMode("2027-03-09")).toEqual({ kind: "eid", eidPrayerAt: null });
  });

  it("uses the adhan times, with Isha at Maghrib plus 120 minutes", () => {
    const m = ramadanMode("2027-02-15");
    if (m?.kind !== "ramadan") throw new Error("expected Ramadan");
    const t = prayerTimes("2027-02-15");
    expect(m.iftarAt).toBe(t.maghrib.toISOString());
    expect(m.suhoorEndedAt).toBe(t.fajr.toISOString());
    expect(m.nextSuhoorEndsAt).toBe(prayerTimes("2027-02-16").fajr.toISOString());
    expect((ms(m.ishaAt) - ms(m.iftarAt)) / 60_000).toBe(120);
  });

  it("counts to iftar until Maghrib, then to the end of suhoor", () => {
    const m = ramadanMode("2027-02-15");
    if (m?.kind !== "ramadan") throw new Error("expected Ramadan");
    expect(ramadanCountdown(m, ms(m.iftarAt) - 60_000)).toEqual({ to: "iftar", at: m.iftarAt });
    expect(ramadanCountdown(m, ms(m.iftarAt) + 60_000)).toEqual({ to: "suhoor", at: m.nextSuhoorEndsAt });
  });

  it("shows only what the owner has confirmed", () => {
    const set: RamadanSettings = { tahajjud: { en: "1:00 AM", ar: "١:٠٠ ص" }, eidPrayerAt: "2027-03-09T03:30:00.000Z", duroosNote: null };
    expect(ramadanMode("2027-03-08", set)).toMatchObject({ settings: set });
    expect(ramadanMode("2027-03-09", set)).toEqual({ kind: "eid", eidPrayerAt: set.eidPrayerAt });
  });
});

describe("Arabic verb before a counted subject", () => {
  it("is feminine with a plural of 3 to 10, masculine otherwise", () => {
    expect(pluralVerb(1, "أُلغي", "أُلغيت")).toBe("أُلغي");
    expect(pluralVerb(2, "أُلغي", "أُلغيت")).toBe("أُلغي");
    expect(pluralVerb(3, "أُلغي", "أُلغيت")).toBe("أُلغيت");
    expect(pluralVerb(10, "أُلغي", "أُلغيت")).toBe("أُلغيت");
    expect(pluralVerb(11, "أُلغي", "أُلغيت")).toBe("أُلغي");
  });
});
