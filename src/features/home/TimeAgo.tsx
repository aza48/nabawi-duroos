"use client";

import { useNow } from "@/features/duroos/Countdown";
import type { Locale } from "@/lib/locale";
import { arCount } from "@/lib/arabic-count";

export function timeAgoText(iso: string, now: number, locale: Locale = "en"): string {
  const mins = Math.max(1, Math.round((now - new Date(iso).getTime()) / 60_000));
  const h = Math.round(mins / 60);
  if (locale === "ar") {
    if (mins < 60) return `منذ ${arCount(mins, "minute", { case: "gen" })}`;
    return h < 24 ? `منذ ${arCount(h, "hour", { case: "gen" })}` : `منذ ${arCount(Math.round(h / 24), "day", { case: "gen" })}`;
  }
  if (mins < 60) return `${mins} min ago`;
  return h < 24 ? `${h} h ago` : `${Math.round(h / 24)} d ago`;
}

/**
 * "3 min ago", computed on the client so a cached page does not freeze it. A cached page was
 * rendered minutes ago, so the first browser render can read a different minute than the server
 * did: that one text node may differ (suppressHydrationWarning), and the mount effect in useNow
 * replaces it with the right value straight away.
 */
export function TimeAgo({ iso, locale = "en" }: { iso: string; locale?: Locale }) {
  const now = useNow(60_000);
  return <span className="contents" suppressHydrationWarning>{timeAgoText(iso, now ?? Date.now(), locale)}</span>;
}
