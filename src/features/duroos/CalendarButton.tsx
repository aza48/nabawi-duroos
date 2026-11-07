import { CalendarPlus } from "lucide-react";
import type { Locale } from "@/lib/locale";
import { SITE_URL } from "@/lib/site";

/** webcal:// subscribes in Apple Calendar and Google Calendar on phones; the feed updates itself. */
export function CalendarButton({ feed, locale }: { feed: string; locale: Locale }) {
  const href = `${SITE_URL.replace(/^https?:/, "webcal:")}/api/v1/calendar/${feed}.ics`;
  return (
    <a href={href} className="mt-3 flex items-center justify-center gap-2 rounded-full border border-line bg-card px-5 py-3 font-semibold">
      <CalendarPlus size={17} /> {locale === "ar" ? "أضف إلى التقويم" : "Add to my calendar"}
    </a>
  );
}
