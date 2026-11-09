"use client";

import Link from "next/link";
import type { Locale } from "@/lib/locale";
import { toArabicDigits } from "@/lib/locale";
import { formatUntil, useNow } from "./Countdown";
import { duroosPath } from "./paths";
import { StatusTag } from "./StatusTag";
import { t } from "./strings";
import { nowNext, type NowNextLesson } from "./now-next";

/**
 * "Now and next": the dars running now (how far in, with a progress bar) and the duroos after the
 * next prayer, with a countdown. The server renders it at its own time; the browser takes over with
 * the real time, so a cached page never shows a stale state.
 */
export function NowNext({ lessons, serverNow, locale }: { lessons: NowNextLesson[]; serverNow: number; locale: Locale }) {
  const ar = locale === "ar";
  const now = useNow() ?? serverNow;
  const { live, next } = nowNext(lessons, now);
  const book = (l: NowNextLesson) => (ar ? l.bookAr || l.bookEn : l.bookEn);
  const who = (l: NowNextLesson) => `${ar ? l.shaykhAr || l.shaykhEn : l.shaykhEn} · ${ar ? l.placeAr : l.placeEn}`;
  const num = (n: number) => (ar ? toArabicDigits(n) : String(n));

  return (
    <section aria-label={ar ? "الآن وبعده" : "Now and next"} className="card mb-5 grid gap-4 p-4 md:grid-cols-2 md:p-5">
      <div>
        <h2 className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted">
          {live.length > 0 && <span className="live-dot size-2 rounded-full bg-live" aria-hidden="true" />}
          {ar ? "الآن" : "Now"}
        </h2>
        {live.length === 0 ? (
          <p className="text-sm text-muted">{ar ? "لا يوجد درس الآن." : "No dars is running right now."}</p>
        ) : (
          <ul className="grid gap-3">
            {live.map(({ lesson: l, minutesIn, progress }) => (
              <li key={l.slug}>
                <Link href={duroosPath(locale, `/lesson/${l.slug}`)} className="block font-semibold leading-snug hover:text-primary">{book(l)}</Link>
                <p className="text-sm text-muted">{who(l)}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-bg-2" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)} aria-label={ar ? "تقدم الدرس" : "Dars progress"}>
                    <div className="h-full rounded-full bg-live" style={{ width: `${Math.round(progress * 100)}%` }} />
                  </div>
                  <span className="shrink-0 text-xs font-semibold text-live">{ar ? `منذ ${num(minutesIn)} د` : `${minutesIn} min in`}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-muted">
          {next ? (
            <>
              {ar ? `التالي: بعد ${t(locale, next.prayer)}` : `Next: after ${t(locale, next.prayer)}`}
              <span className="ms-2 font-semibold normal-case tracking-normal text-primary">{new Date(next.adhanAt).getTime() > now ? formatUntil(new Date(next.adhanAt).getTime() - now, locale) : ar ? "يبدأ قريبًا" : "starting soon"}</span>
            </>
          ) : ar ? "التالي" : "Next"}
        </h2>
        {!next ? (
          <p className="text-sm text-muted">{ar ? "انتهت دروس اليوم. تبدأ دروس الغد بعد الفجر." : "Today's duroos are done. Tomorrow's start after Fajr."}</p>
        ) : (
          <ul className="grid gap-2.5">
            {next.lessons.slice(0, 4).map((l) => (
              <li key={l.slug} className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Link href={duroosPath(locale, `/lesson/${l.slug}`)} className={`block font-semibold leading-snug hover:text-primary ${l.status === "cancelled" || l.status === "postponed" ? "text-muted line-through" : ""}`}>{book(l)}</Link>
                  <p className="text-sm text-muted">{who(l)}</p>
                </div>
                {l.status !== "on" && <StatusTag status={l.status} locale={locale} />}
              </li>
            ))}
            {next.lessons.length > 4 && (
              <li className="text-sm text-muted">{ar ? `و${num(next.lessons.length - 4)} غيرها أدناه` : `and ${next.lessons.length - 4} more below`}</li>
            )}
          </ul>
        )}
      </div>
    </section>
  );
}
