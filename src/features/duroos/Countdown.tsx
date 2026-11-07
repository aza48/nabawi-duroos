"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/locale";
import { toArabicDigits } from "@/lib/locale";

const LIVE_WINDOW_MS = 90 * 60_000;

export function formatUntil(ms: number, locale: Locale): string {
  const mins = Math.max(1, Math.round(ms / 60_000));
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (locale === "ar") {
    const s = h ? `${h} س ${m} د` : `${m} د`;
    return `بعد ${toArabicDigits(s)}`;
  }
  return h ? `in ${h}h ${m}m` : `in ${m}m`;
}

/** Counts down to the adhan; switches to "live" for 90 minutes, then "done". */
export function Countdown({ adhanAt, locale }: { adhanAt: string; locale: Locale }) {
  const target = new Date(adhanAt).getTime();
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);
  if (now === null) return <span className="invisible">·</span>;
  if (now < target) return <span>{formatUntil(target - now, locale)}</span>;
  if (now < target + LIVE_WINDOW_MS)
    return <span className="font-semibold text-live">{locale === "ar" ? "الآن" : "now"}</span>;
  return <span>{locale === "ar" ? "انتهى" : "done"}</span>;
}
