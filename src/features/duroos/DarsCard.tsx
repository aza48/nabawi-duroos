import Link from "next/link";
import { MapPin } from "lucide-react";
import type { TodayLesson } from "@/server/duroos/queries";
import type { Locale } from "@/lib/locale";
import { formatClock } from "@/lib/time/riyadh";
import { Countdown } from "./Countdown";
import { LiveBadge, StatusTag } from "./StatusTag";
import { t } from "./strings";

export function duroosPath(locale: Locale, rest = ""): string {
  return `${locale === "ar" ? "/ar" : ""}/duroos${rest}`;
}

export function DarsCard({ lesson: l, locale }: { lesson: TodayLesson; locale: Locale }) {
  const ar = locale === "ar";
  const cancelled = l.status === "cancelled" || l.status === "postponed";
  const live = l.phase === "live" && !cancelled;
  const done = l.phase === "done" && !live;
  const liveHref = l.stream?.isLive ? l.stream.liveUrl ?? l.stream.url : null;
  return (
    <article className={`card flex gap-3 p-3.5 ${done ? "opacity-55" : ""} ${live ? "ring-2 ring-live/50" : ""}`}>
      <div className="flex w-[68px] shrink-0 flex-col items-center justify-center rounded-xl bg-bg-2 px-1 py-2 text-center">
        <span className="text-[11px] font-semibold text-muted">{t(locale, "after")}</span>
        <span className="text-sm font-bold leading-tight text-primary">{t(locale, l.prayer)}</span>
        <span className="mt-0.5 text-[11px] text-muted" dir="ltr">{formatClock(new Date(l.adhanAt), locale)}</span>
        <span className="mt-0.5 text-[10.5px] text-muted">
          <Countdown adhanAt={l.adhanAt} locale={locale} />
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <Link href={duroosPath(locale, `/shaykh/${l.shaykh.slug}`)} className="font-semibold leading-snug hover:underline">
            {ar ? l.shaykh.nameAr : l.shaykh.nameEn}
          </Link>
          {live ? <LiveBadge locale={locale} href={liveHref} /> : l.status !== "on" ? <StatusTag status={l.status} locale={locale} /> : null}
        </div>
        <Link href={duroosPath(locale, `/lesson/${l.slug}`)} className="block">
          <p className={`ar-text mt-0.5 text-[15px] leading-snug ${cancelled ? "line-through decoration-cancel/60" : ""}`}>{l.bookAr}</p>
          {!ar && <p className="text-sm leading-snug text-muted">{l.bookEn}</p>}
        </Link>
        <p className="mt-1.5 flex items-start gap-1 text-xs text-muted">
          <MapPin size={13} className="mt-px shrink-0" />
          <span>
            {ar ? l.masjid.shortAr : l.masjid.shortEn} · {ar ? l.locationAr : l.locationEn}
          </span>
        </p>
        {(l.overrideNoteEn || l.overrideNoteAr) && (
          <p className="mt-1.5 rounded-lg bg-bg-2 px-2 py-1 text-xs">{ar ? l.overrideNoteAr ?? l.overrideNoteEn : l.overrideNoteEn ?? l.overrideNoteAr}</p>
        )}
      </div>
    </article>
  );
}
