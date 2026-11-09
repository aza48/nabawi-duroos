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
      /** Today's Fajr adhan: the end of the suhoor eaten tonight before dawn (after midnight). */
      suhoorEndsAt: string;
      /** Today's Maghrib adhan. */
      iftarAt: string;
      /** Today's Isha adhan; Taraweeh is prayed after Isha. */
      ishaAt: string;
      /** Tomorrow's Fajr adhan: the end of the suhoor after tonight's Taraweeh. */
      nextSuhoorEndsAt: string;
      /** Tomorrow is 1 Shawwal: tonight has no Taraweeh and no suhoor. */
      eidTomorrow: boolean;
      settings: RamadanSettings;
    }
  /** The last day of Shaban: from Maghrib, the first night of Ramadan (Taraweeh, then the first suhoor). */
  | { kind: "eve"; iftarAt: string; ishaAt: string; nextSuhoorEndsAt: string; settings: RamadanSettings }
  | { kind: "eid"; eidPrayerAt: string | null }
  | null;

/** What the home page shows today, for a plain ISO date in Madinah. */
export function ramadanMode(iso: string, settings: RamadanSettings = RAMADAN_SETTINGS): RamadanMode {
  const h = hijriOf(iso);
  const tomorrow = addDays(iso, 1);
  const t = hijriOf(tomorrow);
  const today = prayerTimes(iso);
  const nextFajr = prayerTimes(tomorrow).fajr.toISOString();
  if (h.month === 10 && h.day === 1) return { kind: "eid", eidPrayerAt: settings.eidPrayerAt };
  if (h.month === 8 && t.month === 9) return { kind: "eve", iftarAt: today.maghrib.toISOString(), ishaAt: today.isha.toISOString(), nextSuhoorEndsAt: nextFajr, settings };
  if (h.month !== 9) return null;
  return {
    kind: "ramadan",
    day: h.day,
    suhoorEndsAt: today.fajr.toISOString(),
    iftarAt: today.maghrib.toISOString(),
    ishaAt: today.isha.toISOString(),
    nextSuhoorEndsAt: nextFajr,
    eidTomorrow: t.month === 10 && t.day === 1,
    settings,
  };
}

export type RamadanNow = {
  /** The countdown to show: the end of suhoor before Fajr and again after Maghrib, iftar in between; none on Eid eve. */
  countdown: { to: "iftar" | "suhoor"; at: string } | null;
  /** Taraweeh tonight (not on the eve of Eid). */
  taraweeh: boolean;
  /** Within the last ten nights: from Maghrib on the 20th (the night of the 21st) to the end of the month. */
  lastTen: boolean;
  /** After Maghrib on the last day of Ramadan. */
  eidTonight: boolean;
};

/**
 * What the strip shows at instant `now`. A Hijri night starts at Maghrib, so the evening belongs to the next day:
 * after Maghrib on the 20th the last ten nights have begun, and after Maghrib on the eve of Eid there is no suhoor.
 */
export function ramadanNow(m: Exclude<NonNullable<RamadanMode>, { kind: "eid" }>, now: number): RamadanNow {
  const evening = now >= new Date(m.iftarAt).getTime();
  if (m.kind === "eve") {
    return { countdown: evening ? { to: "suhoor", at: m.nextSuhoorEndsAt } : null, taraweeh: evening, lastTen: false, eidTonight: false };
  }
  if (now < new Date(m.suhoorEndsAt).getTime()) {
    return { countdown: { to: "suhoor", at: m.suhoorEndsAt }, taraweeh: false, lastTen: m.day >= 21, eidTonight: false };
  }
  if (!evening) return { countdown: { to: "iftar", at: m.iftarAt }, taraweeh: !m.eidTomorrow, lastTen: m.day >= 21, eidTonight: false };
  if (m.eidTomorrow) return { countdown: null, taraweeh: false, lastTen: false, eidTonight: true };
  return { countdown: { to: "suhoor", at: m.nextSuhoorEndsAt }, taraweeh: true, lastTen: m.day >= 20, eidTonight: false };
}
