import { Flag } from "lucide-react";
import type { Locale } from "@/lib/locale";
import { abs } from "@/lib/site";
import { HELP_CONTACT_DEFAULT } from "@/server/settings";

export type ReportDars = { bookEn: string; bookAr: string; shaykhEn: string; shaykhAr: string; path: string };

/** The WhatsApp message to Admin when a dars did not take place: which dars, which shaykh, which day, and the page. */
export function reportMessage(d: ReportDars, dateText: string, locale: Locale): string {
  return locale === "ar"
    ? `السلام عليكم. درس «${d.bookAr}» مع ${d.shaykhAr} لم يُقَم اليوم، ${dateText}. ${abs(d.path)}`
    : `Assalamu alaykum. The ${d.bookEn} dars with ${d.shaykhEn} did not happen today, ${dateText}. ${abs(d.path)}`;
}

export function reportHref(d: ReportDars, dateText: string, locale: Locale): string {
  return `https://wa.me/${HELP_CONTACT_DEFAULT.replace(/\D/g, "")}?text=${encodeURIComponent(reportMessage(d, dateText, locale))}`;
}

/** "Did this dars not happen today?" Opens WhatsApp to Admin with the message filled in. */
export function ReportLink({ dars, dateText, locale, className = "" }: { dars: ReportDars; dateText: string; locale: Locale; className?: string }) {
  const ar = locale === "ar";
  return (
    <a
      href={reportHref(dars, dateText, locale)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-10 items-center gap-2 text-sm text-muted transition-colors hover:text-ink ${className}`}
    >
      <Flag size={14} className="shrink-0" aria-hidden />
      {ar ? "لم يُقَم هذا الدرس اليوم؟ أخبر المشرف على واتساب" : "Did this dars not happen today? Tell Admin on WhatsApp"}
    </a>
  );
}
