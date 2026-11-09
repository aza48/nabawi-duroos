import type { adminLessons } from "@/server/admin/queries";
import type { LessonOption } from "./AnnouncementForm";

const DAY = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

/** Dars choices for the update form: "Shaykh: book, masjid, after prayer, days", active duroos only. */
export function lessonOptions(rows: Awaited<ReturnType<typeof adminLessons>>): LessonOption[] {
  return rows
    .filter((l) => l.status === "active")
    .map((l) => ({
      slug: l.slug,
      shaykhSlug: l.shaykhSlug,
      label: `${l.shaykh}: ${detail(l)}`,
      // Once the shaykh is picked his name is already on screen: lead with the book so a phone shows it.
      shortLabel: detail(l),
    }));
}

function detail(l: Awaited<ReturnType<typeof adminLessons>>[number]): string {
  const prayer = l.prayer.charAt(0).toUpperCase() + l.prayer.slice(1);
  return `${l.bookEn}, after ${prayer}, ${l.masjid}${l.days.length ? `, ${l.days.map((d) => DAY[d]).join(" ")}` : ""}`;
}
