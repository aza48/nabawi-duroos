"use client";

import Link from "next/link";
import { Clock3, MapPin } from "lucide-react";
import type { TodayLesson } from "@/server/duroos/queries";
import type { Locale } from "@/lib/locale";
import { Countdown, useLivePhase } from "@/features/duroos/Countdown";
import { ShaykhBadge } from "@/features/duroos/ShaykhBadge";
import { LiveBadge, SistersTag, StatusTag } from "@/features/duroos/StatusTag";
import { duroosPath } from "@/features/duroos/paths";
import { t, publicLabel } from "@/features/duroos/strings";
import { mapUrl } from "@/lib/maps";

/**
 * One dars on the home page: status, book title and place on the start side, the shaykh's
 * photo (or calligraphic name badge) and name on the end side. Shows only one language's
 * title, following the page locale.
 */
export function DarsMiniCard({ lesson: l, locale, isNext, single = false }: { lesson: TodayLesson; locale: Locale; isNext: boolean; single?: boolean }) {
  const ar = locale === "ar";
  const cancelled = l.status === "cancelled" || l.status === "postponed";
  // The phase is recomputed on the client so a cached page never shows a stale badge.
  const computed = useLivePhase(l.phase, l);
  const phase = l.timeKnown ? computed : l.phase;
  const live = phase === "live" && !cancelled;
  const done = phase === "done" && !live && !cancelled;
  const upcoming = phase === "upcoming" && !cancelled;
  const next = isNext && upcoming && l.timeKnown;
  const liveHref = l.stream?.isLive ? l.stream.liveUrl ?? l.stream.url : null;
  const title = ar ? l.bookAr : l.bookEn;
  const note = publicLabel(ar ? l.overrideNoteAr ?? l.overrideNoteEn : l.overrideNoteEn ?? l.overrideNoteAr);

  return (
    <article className={`lift flex h-full flex-col rounded-2xl border border-line bg-card p-4 shadow-[var(--shadow)] ${done ? "opacity-60" : ""}`}>
      <div className={`flex items-center gap-3 sm:gap-4 ${single ? "md:items-stretch md:gap-8" : ""}`}>
        <div className={`min-w-0 flex-1 ${single ? "md:min-w-[14rem]" : ""}`}>
          <div className="flex min-h-[1.625rem] flex-wrap items-center gap-2">
            {live ? (
              <LiveBadge locale={locale} href={liveHref} />
            ) : cancelled ? (
              <StatusTag status={l.status} locale={locale} />
            ) : next ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-bold text-primary">
                <Clock3 size={12} /> {t(locale, "upNext")}
              </span>
            ) : done ? (
              <span className="rounded-full bg-bg-2 px-2.5 py-1 text-[11px] font-semibold text-muted">{t(locale, "done")}</span>
            ) : upcoming && l.timeKnown ? (
              <span className="tabular rounded-full bg-bg-2 px-2.5 py-1 text-[11px] font-semibold text-ink">
                <Countdown adhanAt={l.adhanAt} liveFrom={l.liveFrom} liveUntil={l.liveUntil} locale={locale} />
              </span>
            ) : !cancelled && !l.timeKnown ? (
              <span className="rounded-full bg-bg-2 px-2.5 py-1 text-[11px] font-semibold text-ink">{t(locale, "timeNotConfirmed")}</span>
            ) : null}
            {l.audience === "women" && <SistersTag locale={locale} />}
          </div>

          <Link
            href={duroosPath(locale, `/lesson/${l.slug}`)}
            className={`mt-2.5 line-clamp-3 font-bold leading-snug hover:text-primary ${ar ? "ar-text text-[19px]" : "font-heading text-[17px]"} ${cancelled ? "line-through decoration-cancel/60" : ""}`}
          >
            {title}
          </Link>

          <p className="mt-2 flex items-center gap-1.5 text-[13px] text-muted">
            <MapPin size={14} className="shrink-0" />
            <span className="min-w-0 truncate">
              <a
                href={mapUrl(l.masjid.nameEn)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-ink/80 underline decoration-line underline-offset-2 hover:text-primary hover:decoration-primary"
                aria-label={ar ? `${l.masjid.shortAr} على الخريطة` : `${l.masjid.shortEn} on the map`}
              >
                {ar ? l.masjid.shortAr : l.masjid.shortEn}
              </a>
              , {ar ? l.locationAr : l.locationEn}
            </span>
          </p>
        </div>

        <Link href={duroosPath(locale, `/shaykh/${l.shaykh.slug}`)} className={`group flex shrink-0 items-center gap-3 ${single ? "md:min-w-0 md:shrink md:items-stretch md:border-s md:border-line md:ps-8" : ""}`}>
          {single ? (
            <>
              <span className="md:hidden">
                <ShaykhBadge nameAr={l.shaykh.nameAr} photo={l.shaykh.photo} size="sm" />
              </span>
              <span className="hidden aspect-square shrink-0 md:block md:max-h-28">
                <ShaykhBadge nameAr={l.shaykh.nameAr} photo={l.shaykh.photo} fill />
              </span>
            </>
          ) : (
            <ShaykhBadge nameAr={l.shaykh.nameAr} photo={l.shaykh.photo} size="sm" />
          )}
          <span className={`block ${single ? "md:self-center " : ""}${single ? "max-w-[6rem] sm:max-w-[9rem] md:max-w-[13rem] md:min-w-0" : "max-w-[6rem] sm:max-w-[9rem]"}`}>
            <span className="block text-[11px] text-muted">{t(locale, "shaykh")}</span>
            <span className={`text-sm font-bold leading-snug group-hover:text-primary ${single ? "md:text-base" : "line-clamp-2"}`}>{ar ? l.shaykh.nameAr : l.shaykh.nameEn}</span>
          </span>
        </Link>
      </div>

      {note && <p className="mt-3 rounded-lg bg-bg-2 px-2.5 py-1.5 text-xs">{note}</p>}
    </article>
  );
}
