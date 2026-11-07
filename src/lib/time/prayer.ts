import { CalculationMethod, Coordinates, PrayerTimes } from "adhan";
import { addDays, riyadhDateIso } from "./riyadh";

export type Prayer = "fajr" | "dhuhr" | "asr" | "maghrib" | "isha";
export const PRAYERS: Prayer[] = ["fajr", "dhuhr", "asr", "maghrib", "isha"];

/** Al-Masjid an-Nabawi */
const MADINAH = new Coordinates(24.4672, 39.6111);

const cache = new Map<string, Record<Prayer, Date>>();

/** Adhan times (Umm al-Qura method) in Madinah for a plain ISO date. */
export function prayerTimes(iso: string): Record<Prayer, Date> {
  const hit = cache.get(iso);
  if (hit) return hit;
  const [y, m, d] = iso.split("-").map(Number);
  // adhan reads the calendar fields of the Date in local time.
  const pt = new PrayerTimes(MADINAH, new Date(y, m - 1, d), CalculationMethod.UmmAlQura());
  const out = { fajr: pt.fajr, dhuhr: pt.dhuhr, asr: pt.asr, maghrib: pt.maghrib, isha: pt.isha };
  cache.set(iso, out);
  return out;
}

export function nextPrayer(now: Date = new Date()): { prayer: Prayer; at: Date } {
  const today = riyadhDateIso(now);
  for (const iso of [today, addDays(today, 1)]) {
    const t = prayerTimes(iso);
    for (const p of PRAYERS) if (t[p] > now) return { prayer: p, at: t[p] };
  }
  const t = prayerTimes(addDays(today, 1));
  return { prayer: "fajr", at: t.fajr };
}
