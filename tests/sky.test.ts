import { describe, expect, it } from "vitest";
import { moonLit, moonName, moonPath, moonPhase, skyColours, sunIsUp } from "@/features/home/sky";

const prayers = {
  fajr: "2026-11-08T02:12:00.000Z",
  dhuhr: "2026-11-08T09:05:00.000Z",
  asr: "2026-11-08T12:15:00.000Z",
  maghrib: "2026-11-08T14:38:00.000Z",
  isha: "2026-11-08T16:08:00.000Z",
};
const at = (iso: string) => new Date(iso).getTime();
const blue = (c: string) => {
  const [r, , b] = c.match(/\d+/g)!.map(Number);
  return b - r;
};

describe("hero sky", () => {
  it("is deep night before Fajr and after Isha", () => {
    expect(skyColours(at("2026-11-07T22:00:00Z"), prayers)).toMatchObject({ top: "rgb(5 13 36)", stars: 1 });
    expect(skyColours(at("2026-11-08T19:00:00Z"), prayers).stars).toBe(1);
  });
  it("is a clear blue at midday with no stars", () => {
    const s = skyColours(at(prayers.dhuhr), prayers);
    expect(s.stars).toBe(0);
    expect(blue(s.top)).toBeGreaterThan(100);
  });
  it("glows warm on the horizon at Maghrib", () => {
    const [r, g, b] = skyColours(at(prayers.maghrib), prayers).low.match(/\d+/g)!.map(Number);
    expect(r).toBeGreaterThan(g);
    expect(r).toBeGreaterThan(b);
  });
  it("blends between keyframes rather than jumping", () => {
    const a = skyColours(at("2026-11-08T10:00:00Z"), prayers).top;
    const b = skyColours(at("2026-11-08T10:01:00Z"), prayers).top;
    expect(a === b || Math.abs(blue(a) - blue(b)) <= 2).toBe(true);
  });
  it("greys the sky for rain and hides the stars behind cloud", () => {
    const night = at("2026-11-07T22:00:00Z");
    expect(skyColours(night, prayers, "rain").top).not.toBe(skyColours(night, prayers).top);
    expect(skyColours(night, prayers, "cloudy").stars).toBeLessThan(0.5);
  });
  it("knows when the sun is up", () => {
    expect(sunIsUp(at(prayers.dhuhr), prayers)).toBe(true);
    expect(sunIsUp(at(prayers.fajr), prayers)).toBe(false);
    expect(sunIsUp(at(prayers.isha), prayers)).toBe(false);
  });
});

describe("moon", () => {
  it("is full on a known full moon and new on a known new moon", () => {
    expect(moonLit(moonPhase(at("2026-10-26T04:12:00Z")))).toBeGreaterThan(0.97);
    expect(moonLit(moonPhase(at("2026-11-09T07:02:00Z")))).toBeLessThan(0.03);
  });
  it("is a waning crescent at the end of the Hijri month", () => {
    expect(moonName(moonPhase(at("2026-11-07T20:00:00Z")))).toBe("Waning crescent");
  });
  it("draws a closed path for the lit part", () => {
    expect(moonPath(0.25)).toMatch(/^M12 2A10 10 0 0 1 12 22A0\.00 10 0 0 0 12 2Z$/);
  });
});
