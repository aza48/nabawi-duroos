/** 0 = Sunday … 6 = Saturday */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const TIMEZONE = "Asia/Riyadh";

const isoFmt = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIMEZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Civil date "YYYY-MM-DD" in Asia/Riyadh for the given instant. */
export function riyadhDateIso(now: Date = new Date()): string {
  return isoFmt.format(now);
}

/** A plain ISO date as a Date at 12:00 UTC (safe from day shifts). */
export function isoToNoonUtc(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12));
}

export function weekdayOf(iso: string): Weekday {
  return isoToNoonUtc(iso).getUTCDay() as Weekday;
}

export function addDays(iso: string, n: number): string {
  const d = isoToNoonUtc(iso);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/** Clock time "h:mm am/pm" in Riyadh. */
export function formatClock(d: Date, locale: "en" | "ar" = "en"): string {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-SA-u-nu-arab" : "en-US", {
    timeZone: TIMEZONE,
    hour: "numeric",
    minute: "2-digit",
  }).format(d);
}
