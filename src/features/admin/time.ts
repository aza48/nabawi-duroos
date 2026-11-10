import { riyadhDateIso } from "@/lib/time/riyadh";

export function timeAgo(d: Date, now: Date = new Date()): string {
  const mins = Math.round((now.getTime() - d.getTime()) / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const h = Math.round(mins / 60);
  if (h < 24) return `${h} h ago`;
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "Asia/Riyadh" }).format(d);
}

/** "Today", "Yesterday" or a date, in Madinah time, for grouping lists by day. */
export function dayLabel(d: Date, now: Date = new Date()): string {
  const key = riyadhDateIso;
  const today = key(now);
  const yesterday = key(new Date(now.getTime() - 86_400_000));
  const k = key(d);
  if (k === today) return "Today";
  if (k === yesterday) return "Yesterday";
  return new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "Asia/Riyadh" }).format(d);
}
