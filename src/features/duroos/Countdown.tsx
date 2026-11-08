"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/locale";
import { toArabicDigits } from "@/lib/locale";
import { phaseAt } from "@/server/duroos/schedule";

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

/** The current time, ticking every 30 seconds; null until mounted so the server HTML never guesses. */
export function useNow(everyMs = 30_000): number | null {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), everyMs);
    return () => clearInterval(id);
  }, [everyMs]);
  return now;
}

export type LiveWindowProps = { liveFrom: string; liveUntil: string };

/**
 * The dars phase on the client: the server's value until the page has mounted,
 * then recomputed from the live window so a cached page never shows a stale badge.
 */
export function useLivePhase(initial: "done" | "live" | "upcoming", w: LiveWindowProps): "done" | "live" | "upcoming" {
  const now = useNow();
  if (now === null) return initial;
  return phaseAt(now, new Date(w.liveFrom).getTime(), new Date(w.liveUntil).getTime());
}

/** Counts down to the adhan, says "after the prayer" until the dars starts, "now" while it runs, then "done". */
export function Countdown({ adhanAt, liveFrom, liveUntil, locale }: { adhanAt: string; locale: Locale } & LiveWindowProps) {
  const target = new Date(adhanAt).getTime();
  const from = new Date(liveFrom).getTime();
  const until = new Date(liveUntil).getTime();
  const now = useNow();
  if (now === null) return <span className="invisible">·</span>;
  if (now < target) return <span>{formatUntil(target - now, locale)}</span>;
  if (now < from) return <span>{locale === "ar" ? "بعد الصلاة" : "after the prayer"}</span>;
  if (now < until) return <span className="font-semibold text-live">{locale === "ar" ? "الآن" : "now"}</span>;
  return <span>{locale === "ar" ? "انتهى" : "done"}</span>;
}

/** "N live now" on the home page, counted on the client so it is right even on a cached page. */
export function LiveNowChip({ items, initial, locale }: { items: (LiveWindowProps & { off: boolean })[]; initial: number; locale: Locale }) {
  const now = useNow();
  const live =
    now === null
      ? initial
      : items.filter((i) => !i.off && phaseAt(now, new Date(i.liveFrom).getTime(), new Date(i.liveUntil).getTime()) === "live").length;
  if (live === 0) return null;
  return (
    <a href="#live" className="inline-flex items-center gap-2 rounded-full bg-live px-3 py-1 text-sm font-semibold text-white">
      <span className="live-dot size-2 rounded-full bg-white" />
      {locale === "ar" ? `${toArabicDigits(live)} مباشر الآن` : `${live} live now`}
    </a>
  );
}
