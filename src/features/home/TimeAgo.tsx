"use client";

import { useNow } from "@/features/duroos/Countdown";

export function timeAgoText(iso: string, now: number): string {
  const mins = Math.max(1, Math.round((now - new Date(iso).getTime()) / 60_000));
  if (mins < 60) return `${mins} min ago`;
  const h = Math.round(mins / 60);
  return h < 24 ? `${h} h ago` : `${Math.round(h / 24)} d ago`;
}

/**
 * "3 min ago", computed on the client so a cached page does not freeze it. A cached page was
 * rendered minutes ago, so the first browser render can read a different minute than the server
 * did: that one text node may differ (suppressHydrationWarning), and the mount effect in useNow
 * replaces it with the right value straight away.
 */
export function TimeAgo({ iso }: { iso: string }) {
  const now = useNow(60_000);
  return <span className="contents" suppressHydrationWarning>{timeAgoText(iso, now ?? Date.now())}</span>;
}
