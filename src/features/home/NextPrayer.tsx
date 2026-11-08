"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/locale";
import { toArabicDigits } from "@/lib/locale";
import { formatClock } from "@/lib/time/riyadh";
import { PRAYERS, type Prayer } from "@/lib/time/prayer";
import { t } from "@/features/duroos/strings";

const pad = (n: number) => String(n).padStart(2, "0");

/** The next adhan, counting down to the second. After Isha it points to tomorrow's Fajr. */
export function NextPrayer({ prayers, tomorrowFajr, locale }: { prayers: Record<Prayer, string>; tomorrowFajr: string; locale: Locale }) {
  const ar = locale === "ar";
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const next = now === null ? null : PRAYERS.find((p) => new Date(prayers[p]).getTime() > now) ?? null;
  const target = next ? prayers[next] : tomorrowFajr;
  const name = next ?? "fajr";
  const left = now === null ? null : Math.max(0, new Date(target).getTime() - now);
  const h = left === null ? 0 : Math.floor(left / 3_600_000);
  const m = left === null ? 0 : Math.floor((left % 3_600_000) / 60_000);
  const s = left === null ? 0 : Math.floor((left % 60_000) / 1000);
  const clock = `${h}:${pad(m)}:${pad(s)}`;

  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-x-4 next-adhan rounded-3xl px-5 py-4 text-white ring-1 ring-white/20 backdrop-blur-md md:block md:p-6">
      <p className="text-sm text-white/75">
        {ar ? "الأذان القادم" : "Next adhan"}
        {!next && now !== null && (ar ? " (غدًا)" : " (tomorrow)")}
      </p>
      <p className="font-heading text-2xl font-bold md:mt-1 md:text-4xl">{t(locale, name)}</p>
      <p className="col-start-2 row-span-3 row-start-1 font-heading text-3xl font-bold tabular text-gold-bright md:mt-3 md:text-5xl" dir="ltr" aria-live="off">
        {left === null ? " " : ar ? toArabicDigits(clock) : clock}
      </p>
      <p className="text-sm text-white/70 md:mt-1" dir={ar ? "rtl" : "ltr"}>
        {ar ? "عند " : "at "}
        <span dir="ltr">{formatClock(new Date(target), locale)}</span>
      </p>
    </div>
  );
}
