import { CalendarPlus, Download } from "lucide-react";
import type { Locale } from "@/lib/locale";
import { SITE_URL } from "@/lib/site";

/**
 * webcal:// subscribes in Apple Calendar and on Macs and the feed keeps itself up to date.
 * Most Android phones have nothing that opens webcal, so the same feed is offered as a plain
 * https file too: Google Calendar and Samsung Calendar import it.
 */
export function CalendarButton({ feed, locale }: { feed: string; locale: Locale }) {
  const https = `${SITE_URL}/api/v1/calendar/${feed}.ics`;
  const webcal = https.replace(/^https?:/, "webcal:");
  const ar = locale === "ar";
  return (
    <div className="mt-3">
      <a href={webcal} className="flex items-center justify-center gap-2 rounded-full border border-line bg-card px-5 py-3 font-semibold">
        <CalendarPlus size={17} /> {ar ? "أضف إلى التقويم" : "Add to my calendar"}
      </a>
      <a href={https} download className="mt-2 flex min-h-10 items-center justify-center gap-1.5 text-sm font-semibold text-primary hover:underline">
        <Download size={14} /> {ar ? "على أندرويد: نزّل ملف التقويم" : "On Android: download the calendar file"}
      </a>
    </div>
  );
}
