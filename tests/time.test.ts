import { describe, expect, it } from "vitest";
import { addDays, riyadhDateIso, weekdayOf } from "@/lib/time/riyadh";
import { formatGregorian, formatHijri, hijriIsoBounds, hijriOf } from "@/lib/time/hijri";
import { nextPrayer, prayerTimes } from "@/lib/time/prayer";

const riyadhHour = (d: Date) =>
  Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Riyadh", hour: "2-digit", hourCycle: "h23" }).format(d));

describe("riyadh date", () => {
  it("rolls over to the next day at Riyadh midnight, not UTC midnight", () => {
    expect(riyadhDateIso(new Date("2026-11-07T21:30:00Z"))).toBe("2026-11-08");
    expect(riyadhDateIso(new Date("2026-11-07T20:59:00Z"))).toBe("2026-11-07");
  });
  it("knows 7 Nov 2026 is a Saturday", () => {
    expect(weekdayOf("2026-11-07")).toBe(6);
  });
  it("adds days across month ends", () => {
    expect(addDays("2026-11-30", 1)).toBe("2026-12-01");
  });
});

describe("hijri", () => {
  it("formats an English Hijri date with weekday", () => {
    expect(formatHijri("2026-11-07", "en", { weekday: true })).toMatch(/^Saturday \d{1,2}\/5\/1448 AH$/);
  });
  it("formats Arabic with Arabic digits and brackets", () => {
    expect(formatHijri("2026-11-07", "ar", { bracket: true, weekday: true })).toMatch(/^\[السبت [٠-٩]+\/٥\/١٤٤٨هـ\]$/);
  });
  it("formats Gregorian long dates", () => {
    expect(formatGregorian("2026-11-07", "en")).toBe("7 November 2026");
  });
  it("converts a Hijri date to its Gregorian ISO day and back", () => {
    const iso = hijriIsoBounds(1448, 6, 1);
    expect(hijriOf(iso)).toEqual({ day: 1, month: 6, year: 1448 });
    expect(hijriOf(addDays(iso, -1)).month).toBe(5);
  });
  it("clamps a day past the month end to the last day of that month", () => {
    const iso = hijriIsoBounds(1448, 6, 30);
    const h = hijriOf(iso);
    expect([h.month, h.year]).toEqual([6, 1448]);
    expect(hijriOf(addDays(iso, 1)).month).toBe(7);
  });
});

describe("prayer times (Madinah, Umm al-Qura)", () => {
  it("orders the five prayers and puts Fajr/Maghrib at plausible hours", () => {
    const t = prayerTimes("2026-11-07");
    expect(t.fajr < t.dhuhr && t.dhuhr < t.asr && t.asr < t.maghrib && t.maghrib < t.isha).toBe(true);
    expect(riyadhHour(t.fajr)).toBeGreaterThanOrEqual(4);
    expect(riyadhHour(t.fajr)).toBeLessThanOrEqual(5);
    expect(riyadhHour(t.maghrib)).toBe(17);
  });
  it("finds Asr as the next prayer at 12:30 Riyadh time (after Dhuhr)", () => {
    expect(nextPrayer(new Date("2026-11-07T09:30:00Z")).prayer).toBe("asr");
  });
  it("finds tomorrow's Fajr after Isha", () => {
    const n = nextPrayer(new Date("2026-11-07T20:00:00Z"));
    expect(n.prayer).toBe("fajr");
    expect(riyadhDateIso(n.at)).toBe("2026-11-08");
  });
});

describe("Ramadan Isha", () => {
  it("puts Isha 120 minutes after Maghrib in Ramadan 1448 and 90 minutes otherwise", () => {
    const ramadan = prayerTimes("2027-02-17");
    expect((ramadan.isha.getTime() - ramadan.maghrib.getTime()) / 60_000).toBe(120);
    const shaban = prayerTimes("2027-02-01");
    expect((shaban.isha.getTime() - shaban.maghrib.getTime()) / 60_000).toBe(90);
  });
});
