"use client";

import { Moon, MoonStar, Sunrise, Sunset } from "lucide-react";
import type { Locale } from "@/lib/locale";
import { toArabicDigits } from "@/lib/locale";
import { formatClock } from "@/lib/time/riyadh";
import { formatUntil, useNow } from "@/features/duroos/Countdown";
import { ramadanNow, type RamadanMode } from "./ramadan";

/**
 * The Ramadan line in the home hero: the day of Ramadan, the next of iftar or the end of suhoor with a countdown,
 * Taraweeh after Isha, the last ten nights, and the Eid prayer once it is announced. Renders at the server's time,
 * then follows the real clock.
 */
export function RamadanStrip({ mode, serverNow, locale }: { mode: NonNullable<RamadanMode>; serverNow: number; locale: Locale }) {
  const ar = locale === "ar";
  const now = useNow() ?? serverNow;
  const clock = (iso: string) => <span dir="ltr" className="tabular">{formatClock(new Date(iso), locale)}</span>;
  const chip = "inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/15";

  if (mode.kind === "eid") {
    return (
      <p className="mt-4 flex flex-wrap items-center gap-2 text-sm md:text-base">
        <span className={`${chip} font-semibold text-gold-bright`}><MoonStar size={16} /> {ar ? "عيد مبارك" : "Eid Mubarak"}</span>
        {mode.eidPrayerAt && <span className={chip}>{ar ? "صلاة عيد الفطر" : "Eid al-Fitr prayer"} {clock(mode.eidPrayerAt)}</span>}
      </p>
    );
  }

  const r = ramadanNow(mode, now);
  // Before Maghrib on the last day of Shaban there is nothing to show yet.
  if (mode.kind === "eve" && !r.countdown) return null;
  const s = mode.settings;
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2 text-sm md:text-base" role="group" aria-label={ar ? "رمضان" : "Ramadan"}>
      <span className={`${chip} font-semibold text-gold-bright`}>
        <Moon size={16} />
        {mode.kind === "eve" ? (ar ? "رمضان يبدأ الليلة" : "Ramadan begins tonight") : ar ? `رمضان، اليوم ${toArabicDigits(mode.day)}` : `Ramadan, day ${mode.day}`}
      </span>
      {r.countdown && (
        <span className={`${chip} font-semibold`}>
          {r.countdown.to === "iftar" ? <Sunset size={16} /> : <Sunrise size={16} />}
          {r.countdown.to === "iftar" ? (ar ? "الإفطار" : "Iftar at Maghrib") : ar ? "آخر السحور" : "Suhoor ends at Fajr"} {clock(r.countdown.at)}
          <span className="font-normal text-white/80">{formatUntil(new Date(r.countdown.at).getTime() - now, locale)}</span>
        </span>
      )}
      {r.taraweeh && <span className={chip}>{ar ? "التراويح بعد العشاء" : "Taraweeh after Isha"} {clock(mode.ishaAt)}</span>}
      {r.lastTen && (
        <span className={chip}>
          <MoonStar size={16} className="text-gold-bright" />
          {ar ? `العشر الأواخر${s.tahajjud ? `، التهجد ${s.tahajjud.ar}` : ""}` : `The last ten nights${s.tahajjud ? `, Tahajjud ${s.tahajjud.en}` : ""}`}
        </span>
      )}
      {mode.kind === "ramadan" && mode.eidTomorrow && (r.eidTonight || s.eidPrayerAt) && (
        <span className={`${chip} font-semibold`}>
          <MoonStar size={16} className="text-gold-bright" />
          {ar ? "العيد غدًا" : "Eid tomorrow"}
          {s.eidPrayerAt && <>{ar ? "، الصلاة" : ", prayer"} {clock(s.eidPrayerAt)}</>}
        </span>
      )}
      {s.duroosNote && <span className="basis-full text-white/85">{ar ? s.duroosNote.ar : s.duroosNote.en}</span>}
    </div>
  );
}