import { describe, expect, it } from "vitest";
import { describeWeather, parseOpenMeteo } from "@/lib/weather";
import { travelledPath } from "@/features/home/DayArc";

describe("weather", () => {
  it("reads Open-Meteo's current block", () => {
    const w = parseOpenMeteo({ current: { time: "2026-11-07T22:00", temperature_2m: 23.6, apparent_temperature: 22.1, weather_code: 0, is_day: 0, relative_humidity_2m: 31, wind_speed_10m: 9.4 } });
    expect(w).toMatchObject({ tempC: 24, feelsC: 22, kind: "clear", label: "Clear", isDay: false });
  });
  it("names the sky in plain words", () => {
    expect(describeWeather(0, true).label).toBe("Sunny");
    expect(describeWeather(3, true).kind).toBe("cloudy");
    expect(describeWeather(63, true).kind).toBe("rain");
    expect(describeWeather(95, false).kind).toBe("storm");
    expect(describeWeather(45, true).kind).toBe("fog");
  });
  it("returns null for a reply without current weather", () => {
    expect(parseOpenMeteo({})).toBeNull();
  });
});

describe("day arc", () => {
  it("draws the whole arc once the day is over, not part of it", () => {
    expect(travelledPath(1)).toBe("M30 190 Q500.00 -40.00 970.00 190.00");
  });
  it("ends the travelled curve exactly where the sun is", () => {
    expect(travelledPath(0.5).endsWith("500.00 75.00")).toBe(true);
  });
});

import { placeText } from "@/features/duroos/DetailPages";
describe("placeText", () => {
  it("doesn't repeat the masjid's name", () => {
    expect(placeText("Masjid Quba", "Masjid Quba")).toBe("Masjid Quba");
    expect(placeText("Masjid Quba", "Quba, Masjid Quba")).toBe("Quba, Masjid Quba");
    expect(placeText("المسجد النبوي", "الحصوة الثانية", true)).toBe("المسجد النبوي، الحصوة الثانية");
    expect(placeText("Masjid an-Nabawi", "Second Haswa, in front of Bab Uthman")).toBe("Masjid an-Nabawi, Second Haswa, in front of Bab Uthman");
  });
});
