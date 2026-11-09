import { hijriOf } from "@/lib/time/hijri";
import { addDays } from "@/lib/time/riyadh";
import { prayerTimes } from "@/lib/time/prayer";

/**
 * Ramadan mode (work plan D4). Everything here comes from the Umm al-Qura date and the adhan times, which already
 * apply the Ramadan Isha rule (Maghrib plus 120 minutes). What MESH cannot state with authority waits here as null
 * until the owner confirms it; a null value is simply not shown.
 */
export type RamadanSettings = {
  /** Tahajjud (qiyam) at Masjid an-Nabawi in the last ten nights, as written for readers, e.g. "1:00 AM" / "١:٠٠ ص". */
  tahajjud: { en: string; ar: string } | null;
  /** The Eid al-Fitr prayer at Masjid an-Nabawi, as an ISO instant, once it is announced. */
  eidPrayerAt: string | null;
  /** A short line about the duroos this Ramadan (paused, online, new times), once it is known. */
  duroosNote: { en: string; ar: string } | null;
};

export const RAMADAN_SETTINGS: RamadanSettings = {
  tahajjud: null,
  eidPrayerAt: null,
  duroosNote: null,
};

export type RamadanMode =
  | {
      kind: "ramadan";
      day: number;
      lastTen: boolean;
      /** Today's Fajr adhan: suhoor has ended. */
      suhoorEndedAt: string;
      /** Today's Maghrib adhan. */
      iftarAt: string;
      /** Today's Isha adhan; Taraweeh is prayed after Isha. */
      ishaAt: string;
      /** Tomorrow's Fajr adhan: the end of tonight's suhoor. */
      nextSuhoorEndsAt: string;
      /** Tomorrow is Eid when the month has reached day 29 and tomorrow is 1 Shawwal. */
      eidTomorrow: boolean;
      settings: RamadanSettings;
    }
  | { kind: "eid"; eidPrayerAt: string | null }
  | null;

/** What the home page shows today, for a plain ISO date in Madinah. */
export function ramadanMode(iso: string, settings: RamadanSettings = RAMADAN_SETTINGS): RamadanMode {
  const h = hijriOf(iso);
  if (h.month === 10 && h.day === 1) return { kind: "eid", eidPrayerAt: settings.eidPrayerAt };
  if (h.month !== 9) return null;
  const today = prayerTimes(iso);
  const tomorrow = addDays(iso, 1);
  const t = hijriOf(tomorrow);
  return {
    kind: "ramadan",
    day: h.day,
    lastTen: h.day >= 21,
    suhoorEndedAt: today.fajr.toISOString(),
    iftarAt: today.maghrib.toISOString(),
    ishaAt: today.isha.toISOString(),
    nextSuhoorEndsAt: prayerTimes(tomorrow).fajr.toISOString(),
    eidTomorrow: t.month === 10 && t.day === 1,
    settings,
  };
}

/** Which countdown the strip shows at instant `now`: iftar until Maghrib, then the end of suhoor until tomorrow's Fajr. */
export function ramadanCountdown(m: Extract<RamadanMode, { kind: "ramadan" }>, now: number): { to: "iftar" | "suhoor"; at: string } {
  return now < new Date(m.iftarAt).getTime() ? { to: "iftar", at: m.iftarAt } : { to: "suhoor", at: m.nextSuhoorEndsAt };
}
