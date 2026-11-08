"use client";

import Link from "next/link";
import { MapPin, Radio } from "lucide-react";
import type { TodayLesson } from "@/server/duroos/queries";
import type { Locale } from "@/lib/locale";
import { Countdown, useLivePhase } from "./Countdown";
import { LiveBadge, SistersTag, StatusTag } from "./StatusTag";
import { publicLabel } from "./strings";
import { mapUrl } from "@/lib/maps";
import { duroosPath } from "./paths";

export function DarsCard({ lesson: l, locale }: { lesson: TodayLesson; locale: Locale }) {
  const ar = locale === "ar";
  const cancelled = l.status === "cancelled" || l.status === "postponed";
  // The phase is recomputed on the client, so a cached page never shows LIVE after the dars ended.
  const phase = useLivePhase(l.phase, l);
  const live = phase === "live" && !cancelled;
  const done = phase === "done" && !live;
  const liveHref = l.stream?.isLive ? l.stream.liveUrl ?? l.stream.url : null;
  const note = publicLabel(ar ? l.overrideNoteAr ?? l.overrideNoteEn : l.overrideNoteEn ?? l.overrideNoteAr);
  const edge = live ? "before:bg-live" : cancelled ? "before:bg-cancel" : l.status !== "on" ? "before:bg-amber" : "before:bg-primary/70";
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-card p-4 ps-5 shadow-[var(--shadow)] lift hover:border-primary/40 before:absolute before:inset-y-0 before:start-0 before:w-1 ${edge} ${
        done ? "opacity-60" : ""
      } ${live ? "ring-2 ring-live/40" : ""}`}
    >
      <div className="flex items-start justify-between gap-3">
        <Link href={duroosPath(locale, `/shaykh/${l.shaykh.slug}`)} className="font-heading text-[15px] font-semibold leading-snug hover:text-primary">
          {ar ? l.shaykh.nameAr : l.shaykh.nameEn}
        </Link>
        <span className="flex shrink-0 items-center gap-1.5">
          {l.audience === "women" && <SistersTag locale={locale} />}
          {live ? <LiveBadge locale={locale} href={liveHref} /> : l.status !== "on" ? <StatusTag status={l.status} locale={locale} /> : null}
        </span>
      </div>
      <Link href={duroosPath(locale, `/lesson/${l.slug}`)} className="mt-1.5 block flex-1">
        <p className={`ar-text text-[19px] leading-snug ${cancelled ? "line-through decoration-cancel/60" : ""}`}>{l.bookAr}</p>
        {!ar && <p className="mt-0.5 text-sm leading-snug text-muted">{l.bookEn}</p>}
      </Link>
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted">
        <span className="flex min-w-0 items-center gap-1">
          <MapPin size={13} className="shrink-0" />
          <span className="truncate">
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
        </span>
        {!cancelled && !done && (
          <span className="ms-auto rounded-full bg-bg-2 px-2 py-0.5 font-semibold text-ink tabular">
            <Countdown adhanAt={l.adhanAt} liveFrom={l.liveFrom} liveUntil={l.liveUntil} locale={locale} />
          </span>
        )}
        {liveHref && !live && (
          <a href={liveHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-ink">
            <Radio size={13} /> {ar ? "بث" : "Stream"}
          </a>
        )}
      </div>
      {note && <p className="mt-2.5 rounded-lg bg-bg-2 px-2.5 py-1.5 text-xs">{note}</p>}
    </article>
  );
}
