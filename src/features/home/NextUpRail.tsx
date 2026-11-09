"use client";

import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import type { Locale } from "@/lib/locale";
import { formatClock } from "@/lib/time/riyadh";
import { formatUntil, useNow } from "@/features/duroos/Countdown";
import type { NowNextLesson } from "@/features/duroos/now-next";
import { StatusTag } from "@/features/duroos/StatusTag";
import { duroosPath } from "@/features/duroos/paths";
import { t } from "@/features/duroos/strings";
import { toArabicDigits } from "@/lib/locale";
import { railRows, type DayChange } from "./rail";

const MAX = 3;

/**
 * The right column of the wide home page: what is on now, the duroos after the next prayer, and today's changes.
 * It uses the same nowNext() as the "Now and next" card on /duroos, so the two never disagree. It renders at the
 * server's time and then follows the real clock, so a cached page never shows a stale state.
 */
export function NextUpRail({ lessons, changes, serverNow, locale = "en" }: { lessons: NowNextLesson[]; changes: DayChange[]; serverNow: number; locale?: Locale }) {
  const ar = locale === "ar";
  const now = useNow() ?? serverNow;
  const { live, groups, more } = railRows(lessons, now, MAX);
  const last = groups[groups.length - 1];
  const book = (l: { bookEn: string; bookAr: string }) => (ar ? l.bookAr || l.bookEn : l.bookEn);
  const schedule = duroosPath(locale, "/schedule");

  return (
    <section className="rounded-3xl border border-line bg-card p-5" aria-labelledby="next-up-title">
      <div className="flex items-baseline justify-between">
        <h2 id="next-up-title" className="font-heading text-lg font-bold">{t(locale, "upNext")}</h2>
        <Link href={schedule} className="text-sm font-semibold text-primary hover:underline">
          {ar ? "جدول الأسبوع" : "This week"}
        </Link>
      </div>

      {live.length === 0 && groups.length === 0 ? (
        <p className="mt-3 flex items-start gap-2 text-sm text-muted">
          <CalendarDays size={16} className="mt-0.5 shrink-0" />
          <span>
            {ar ? "لا دروس أخرى اليوم. " : "No more duroos today. "}
            <Link href={schedule} className="font-semibold text-primary hover:underline">
              {ar ? "اطّلع على جدول الأسبوع" : "See the weekly schedule"}
            </Link>
          </span>
        </p>
      ) : (
        <ol className="mt-3 divide-y divide-line">
          {live.map(({ lesson: l, minutesIn }) => (
            <Row key={l.slug} l={l} locale={locale} book={book(l)}
              when={<span className="font-semibold text-live">{ar ? `مباشر، منذ ${toArabicDigits(minutesIn)} د` : `Live, ${minutesIn} min in`}</span>} />
          ))}
          {groups.flatMap((g) => g.items.map((l) => (
            <Row key={l.slug} l={l} locale={locale} book={book(l)}
              when={l.status === "cancelled" || l.status === "postponed"
                ? <StatusTag status={l.status} locale={locale} />
                : <span>{t(locale, g.prayer)} <span dir="ltr">{formatClock(new Date(g.adhanAt), locale)}</span>, {formatUntil(new Date(g.adhanAt).getTime() - now, locale)}</span>} />
          )))}
        </ol>
      )}
      {more > 0 && last && (
        <Link href={duroosPath(locale)} className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
          {ar ? `كل دروس ما بعد ${t(locale, last.prayer)}` : `And ${more} more after ${t(locale, last.prayer)}`}
        </Link>
      )}

      {changes.length > 0 && (
        <div className="mt-5 border-t border-line pt-4">
          <h3 className="text-sm font-bold">{ar ? "تغييرات اليوم" : "Today's changes"}</h3>
          <ul className="mt-2 space-y-2.5">
            {changes.map((c) => (
              <li key={c.slug}>
                <Link href={duroosPath(locale, `/lesson/${c.slug}`)} className="group flex items-start gap-2">
                  <StatusTag status={c.status} locale={locale} />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold group-hover:text-primary" dir="auto">{book(c)}</span>
                    {(ar ? c.noteAr : c.noteEn) && <span className="line-clamp-2 block text-xs text-muted" dir="auto">{ar ? c.noteAr : c.noteEn}</span>}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function Row({ l, locale, book, when }: { l: NowNextLesson; locale: Locale; book: string; when: React.ReactNode }) {
  const ar = locale === "ar";
  return (
    <li className="py-3 first:pt-1 last:pb-0">
      <Link href={duroosPath(locale, `/lesson/${l.slug}`)} className="group block min-w-0">
        <span className="block truncate text-sm font-semibold leading-snug group-hover:text-primary" dir="auto">{book}</span>
        <span className="block truncate text-sm text-muted" dir="auto">{ar ? l.shaykhAr || l.shaykhEn : l.shaykhEn}</span>
        <span className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-muted">
          <MapPin size={12} className="shrink-0" />
          <span className="truncate">{ar ? l.placeAr : l.placeEn}</span>
          <span aria-hidden="true">·</span>
          {when}
        </span>
      </Link>
    </li>
  );
}
