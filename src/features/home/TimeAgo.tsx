"use client";

import { useNow } from "@/features/duroos/Countdown";

export function timeAgoText(iso: string, now: number): string {
  const mins = Math.max(1, Math.round((now - new Date(iso).getTime()) / 60_000));
  if (mins < 60) return `${mins} min ago`;
  const h = Math.round(mins / 60);
  return h < 24 ? `${h} h ago` : `${Math.round(h / 24)} d ago`;
}

/** "3 min ago", computed on the client so a cached page does not freeze it. */
export function TimeAgo({ iso }: { iso: string }) {
  const now = useNow(60_000);
  return <>{timeAgoText(iso, now ?? Date.now())}</>;
}
