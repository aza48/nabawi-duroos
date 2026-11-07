import { and, eq, gte, isNull, lte } from "drizzle-orm";
import type { Db } from "@/server/db/client";
import { lessonOverrides, lessons, masjids, shaykhs } from "@/server/db/schema";
import { lessonsForDate, type OverrideLike } from "@/server/duroos/schedule";
import { prayerTimes } from "@/lib/time/prayer";
import { addDays } from "@/lib/time/riyadh";
import { SITE_URL } from "@/lib/site";
import { KEY_DATES, startOf, type KeyDate } from "@/content/key-dates";

export type CalEvent = {
  uid: string; start: Date; end: Date; summary: string; description: string; location: string; url: string; cancelled: boolean;
  /** Whole-day event: start and end are read as Madinah dates, end exclusive. */
  allDay?: { from: string; toExclusive: string };
};

const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

/** Folds a content line so no physical line exceeds 75 octets (RFC 5545). */
function fold(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  for (const ch of line) {
    const limit = out.length ? 73 : 74;
    if (Buffer.byteLength(cur + ch) > limit) {
      out.push(out.length ? ` ${cur}` : cur);
      cur = "";
    }
    cur += ch;
  }
  out.push(out.length ? ` ${cur}` : cur);
  return out;
}

export function buildIcs(title: string, events: CalEvent[], now: Date = new Date()): string {
  const lines = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//MESH//Duroos//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
    `X-WR-CALNAME:${esc(title)}`, "X-WR-TIMEZONE:Asia/Riyadh", "REFRESH-INTERVAL;VALUE=DURATION:PT3H", "X-PUBLISHED-TTL:PT3H",
  ];
  for (const e of events) {
    lines.push(
      "BEGIN:VEVENT", `UID:${e.uid}`, `DTSTAMP:${stamp(now)}`,
      ...(e.allDay
        ? [`DTSTART;VALUE=DATE:${e.allDay.from.replace(/-/g, "")}`, `DTEND;VALUE=DATE:${e.allDay.toExclusive.replace(/-/g, "")}`, "TRANSP:TRANSPARENT"]
        : [`DTSTART:${stamp(e.start)}`, `DTEND:${stamp(e.end)}`]),
      `SUMMARY:${esc(e.summary)}`, `DESCRIPTION:${esc(e.description)}`, `LOCATION:${esc(e.location)}`, `URL:${e.url}`,
      `STATUS:${e.cancelled ? "CANCELLED" : "CONFIRMED"}`, "END:VEVENT"
    );
  }
  lines.push("END:VCALENDAR");
  return lines.flatMap(fold).join("\r\n") + "\r\n";
}

export type FeedFilter = { lessonSlug?: string; shaykhSlug?: string; masjidId?: string };

/** Upcoming lesson occurrences (adhan time to one hour after), cancelled ones marked. */
export async function lessonFeed(db: Db, filter: FeedFilter, fromIso: string, days = 56): Promise<{ title: string; events: CalEvent[] }> {
  const rows = await db
    .select({ lesson: lessons, shaykh: shaykhs, masjid: masjids })
    .from(lessons)
    .innerJoin(shaykhs, eq(lessons.shaykhId, shaykhs.id))
    .innerJoin(masjids, eq(lessons.masjidId, masjids.id));
  const picked = rows.filter(
    (r) =>
      (!filter.lessonSlug || r.lesson.slug === filter.lessonSlug) &&
      (!filter.shaykhSlug || r.shaykh.slug === filter.shaykhSlug) &&
      (!filter.masjidId || r.masjid.id === filter.masjidId)
  );
  const toIso = addDays(fromIso, days - 1);
  const ovRows = await db
    .select()
    .from(lessonOverrides)
    .where(and(lte(lessonOverrides.startsOn, toIso), gte(lessonOverrides.endsOn, fromIso), isNull(lessonOverrides.revokedAt)));
  const overrides: OverrideLike[] = ovRows.map((o) => ({ ...o }));
  const flat = picked.map((r) => ({ ...r.lesson, r }));

  const events: CalEvent[] = [];
  for (let i = 0; i < days; i++) {
    const day = addDays(fromIso, i);
    const times = prayerTimes(day);
    for (const { lesson, status, override } of lessonsForDate(day, flat, overrides)) {
      const { shaykh, masjid } = lesson.r;
      const cancelled = status === "cancelled" || status === "postponed";
      const start = times[lesson.prayer];
      events.push({
        uid: `${lesson.slug}-${day}@medinahub.org`,
        start,
        end: new Date(start.getTime() + 60 * 60_000),
        summary: `${cancelled ? "Cancelled: " : ""}${lesson.bookEn} (${shaykh.nameEn})`,
        description: [
          `${lesson.bookAr}`,
          `${shaykh.nameEn} / ${shaykh.nameAr}`,
          `Starts right after the ${lesson.prayer} iqamah. The time shown is the adhan.`,
          override?.noteEn ?? "",
        ].filter(Boolean).join("\n"),
        location: `${masjid.nameEn}, ${lesson.locationEn}`,
        url: `${SITE_URL}/duroos/lesson/${lesson.slug}`,
        cancelled,
      });
    }
  }
  const title =
    filter.lessonSlug && picked[0] ? `MESH: ${picked[0].lesson.bookEn}`
    : filter.shaykhSlug && picked[0] ? `MESH: ${picked[0].shaykh.nameEn}`
    : filter.masjidId && picked[0] ? `MESH: duroos at ${picked[0].masjid.nameEn}`
    : "MESH: all duroos";
  return { title, events };
}

/** The University calendar and the expected Islamic dates as whole-day events. */
export function datesFeed(dates: KeyDate[] = KEY_DATES): { title: string; events: CalEvent[] } {
  const events = dates.map((d): CalEvent => {
    const toExclusive = addDays(d.end ?? d.start, 1);
    return {
      uid: `date-${d.id}@medinahub.org`,
      start: startOf(d.start),
      end: startOf(toExclusive),
      allDay: { from: d.start, toExclusive },
      summary: d.title,
      description: [d.titleAr, d.hijri, d.note ?? "", d.after ?? ""].filter(Boolean).join("\n"),
      location: "Madinah",
      url: `${SITE_URL}/guides/university-calendar-1448`,
      cancelled: false,
    };
  });
  return { title: "MESH: University and Islamic dates", events };
}
