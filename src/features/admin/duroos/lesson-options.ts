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
      label: `${l.shaykh}: ${l.bookEn}, ${l.masjid}, after ${l.prayer}${l.days.length ? `, ${l.days.map((d) => DAY[d]).join(" ")}` : ""}`,
    }));
}
