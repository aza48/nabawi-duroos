"use client";

import { useEffect, useState, type ReactNode } from "react";
import { BookOpenCheck, CalendarDays, CalendarPlus, GraduationCap, Moon, PencilLine, Sun } from "lucide-react";
import { SectionHeader } from "@/components/ui";
import { KEY_DATES, endOf, keyDatesState, startOf, type KeyDate } from "@/content/key-dates";
import { SITE_URL } from "@/lib/site";

const KIND: Record<KeyDate["kind"], { label: string; icon: typeof Moon; tone: string }> = {
  exams: { label: "Exams", icon: PencilLine, tone: "bg-cancel-bg text-cancel" },
  holiday: { label: "Holiday", icon: Sun, tone: "bg-amber-bg text-amber" },
  study: { label: "Classes", icon: GraduationCap, tone: "bg-primary-soft text-primary" },
  deadline: { label: "Deadline", icon: BookOpenCheck, tone: "bg-gold-bg text-gold" },
  islamic: { label: "Islamic", icon: Moon, tone: "bg-gold-bg text-gold" },
};
const tz = { timeZone: "Asia/Riyadh" } as const;
const fmt = (iso: string, o: Intl.DateTimeFormatOptions = { weekday: "short", day: "numeric", month: "short" }) => new Intl.DateTimeFormat("en-GB", { ...o, ...tz }).format(startOf(iso));
const days = (ms: number) => Math.max(0, Math.ceil(ms / 86_400_000));
const pad = (n: number) => String(n).padStart(2, "0");
/** webcal:// subscribes on phones, and the feed keeps itself up to date. */
const DATES_FEED = `${SITE_URL.replace(/^https?:/, "webcal:")}/api/v1/calendar/dates.ics`;

/**
 * "Coming up": the next University date leads with a countdown; after it, one list of the next four dates, University
 * and Islamic together in date order. `side` fills the third column (the home page puts the latest updates there).
 */
export function KeyDates({ initialNow, side }: { initialNow: number; side?: ReactNode }) {
  // Rendered on the server with the server's clock (so the HTML is complete and nothing jumps), then ticking on the client.
  const [now, setNow] = useState<number>(initialNow);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const { current, next, following, islamic } = keyDatesState(new Date(now), KEY_DATES);
  const lead = current ?? next;
  const rest = current ? [next, ...following].filter((x): x is KeyDate => !!x).slice(0, 3) : following;
  // University and Islamic dates in one list, soonest first, four at a time.
  const upcoming = [...rest, ...islamic].sort((a, b) => startOf(a.start).getTime() - startOf(b.start).getTime()).slice(0, 4);
  if (!lead) return null;
  const k = KIND[lead.kind];
  const target = current ? endOf(current.end!) : startOf(lead.start);
  const left = Math.max(0, target.getTime() - now);
  const progress = current ? Math.min(100, Math.round(((now - startOf(current.start).getTime()) / (endOf(current.end!).getTime() - startOf(current.start).getTime())) * 100)) : null;

  return (
    <section aria-labelledby="coming-up" className="shell mt-10 md:mt-14">
      <SectionHeader id="coming-up" title="Coming up" icon={CalendarDays} action={{ href: "/guides/university-calendar-1448", label: "Full calendar" }} />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.25fr_1fr_0.85fr]">
        {/* Lead: what's on now, or the next University date */}
        <article className={`flex flex-col rounded-3xl border bg-card p-6 shadow-[var(--shadow)] ${current ? "border-primary" : "border-line"}`}>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${k.tone}`}>
              <k.icon size={13} /> {current ? "Happening now" : k.label}
            </span>
            <span className="text-xs text-muted">{lead.hijri}</span>
          </div>
          <p className="mt-4 font-heading text-2xl font-bold leading-tight md:text-3xl">{lead.title}</p>
          <p className="mt-1 text-sm text-muted">
            {fmt(lead.start)}
            {lead.end ? ` to ${fmt(lead.end)}` : ""}
          </p>
          <div className="mt-5" role="timer" aria-label={`${days(left)} ${days(left) === 1 ? "day" : "days"} ${current ? "left" : "to go"}`}>
            <div className="grid grid-cols-4 gap-2" dir="ltr">
              {[
                [Math.floor(left / 86_400_000), "days"],
                [Math.floor((left % 86_400_000) / 3_600_000), "hours"],
                [Math.floor((left % 3_600_000) / 60_000), "min"],
                [Math.floor((left % 60_000) / 1000), "sec"],
              ].map(([n, unit], i) => (
                <span key={unit} className={`rounded-2xl px-2 py-3 text-center ${i === 0 ? "bg-primary text-primary-ink" : "bg-bg-2"}`}>
                  <span className="block font-heading text-3xl font-bold leading-none tabular md:text-4xl">{i === 0 ? n : pad(n as number)}</span>
                  <span className={`mt-1 block text-xs ${i === 0 ? "text-primary-ink/80" : "text-muted"}`}>{unit}</span>
                </span>
              ))}
            </div>
            {progress !== null && (
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-bg-2" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="How far through it we are">
                <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
              </div>
            )}
          </div>
          <a href={DATES_FEED} className="mt-4 flex items-center justify-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-semibold transition hover:border-primary hover:text-primary">
            <CalendarPlus size={16} /> Add University dates to my calendar
          </a>
          {(current?.after || (!current && rest[0])) && (
            <div className="mt-auto pt-5">
              <p className="border-t border-line pt-4 text-sm">
                <span className="font-semibold">Then: </span>
                {current?.after ?? `${rest[0].title}, ${fmt(rest[0].start)}.`}
              </p>
            </div>
          )}
        </article>

        {/* The next four dates, University and Islamic together, as a timeline */}
        <article className="flex flex-col rounded-3xl border border-line bg-card p-6">
          <p className="text-sm font-semibold text-muted">After that</p>
          <ol className="relative mt-4 flex flex-1 flex-col justify-between gap-5 before:absolute before:inset-y-2 before:start-[22px] before:w-px before:bg-line">
            {upcoming.map((d) => {
              const kk = KIND[d.kind];
              const isl = d.kind === "islamic";
              return (
                <li key={d.id} className="relative flex items-center gap-4">
                  <span className={`relative z-10 flex w-11 shrink-0 flex-col items-center rounded-xl border py-1 leading-tight ${isl ? "border-gold/30 bg-gold-bg" : "border-line bg-card"}`}>
                    <span className={`text-[10px] font-bold uppercase ${isl ? "text-gold" : "text-muted"}`}>{fmt(d.start, { month: "short" })}</span>
                    <span className="font-heading text-lg font-bold">{fmt(d.start, { day: "numeric" })}</span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold leading-snug">{d.title}</span>
                    <span className="flex items-center gap-1.5 text-xs text-muted">
                      <kk.icon size={12} className={isl ? "text-gold" : undefined} />
                      {isl ? d.hijri : kk.label}
                      {!isl && d.end ? `, until ${fmt(d.end, { day: "numeric", month: "short" })}` : ""}
                    </span>
                  </span>
                  <span className={`shrink-0 text-sm font-semibold tabular ${isl ? "text-gold" : "text-primary"}`}>{days(startOf(d.start).getTime() - now)}d</span>
                </li>
              );
            })}
          </ol>
        </article>

        {side}
      </div>
    </section>
  );
}
