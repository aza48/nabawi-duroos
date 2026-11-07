"use client";

import { useEffect, useState } from "react";
import { Moon, PencilLine, Sun, GraduationCap, BookOpenCheck } from "lucide-react";
import { KEY_DATES, endOf, keyDatesState, startOf, type KeyDate } from "@/content/key-dates";

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

/** "Coming up": the next University date leads, the next three follow, Islamic dates count down at the side. */
export function KeyDates() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (now === null) return <div className="shell mt-10 h-64 md:mt-14" aria-hidden="true" />;

  const { current, next, following, islamic } = keyDatesState(new Date(now), KEY_DATES);
  const lead = current ?? next;
  const rest = current ? [next, ...following].filter((x): x is KeyDate => !!x).slice(0, 3) : following;
  if (!lead) return null;
  const k = KIND[lead.kind];
  const target = current ? endOf(current.end!) : startOf(lead.start);
  const left = Math.max(0, target.getTime() - now);
  const progress = current ? Math.min(100, Math.round(((now - startOf(current.start).getTime()) / (endOf(current.end!).getTime() - startOf(current.start).getTime())) * 100)) : null;

  return (
    <section aria-labelledby="coming-up" className="shell mt-10 md:mt-14">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="coming-up" className="font-heading text-3xl font-bold md:text-4xl">Coming up</h2>
        <a href="/guides/university-calendar-1448" className="shrink-0 text-sm font-semibold text-primary hover:underline">Full calendar</a>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-[1.25fr_1fr_0.85fr]">
        {/* Lead: what's on now, or the next University date */}
        <article className={`flex flex-col rounded-3xl border bg-card p-6 shadow-[var(--shadow)] ${current ? "border-primary" : "border-line"}`}>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${k.tone}`}>
              <k.icon size={13} /> {current ? "Happening now" : k.label}
            </span>
            <span className="text-xs text-muted">{lead.hijri}</span>
          </div>
          <div className="mt-4 flex items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="font-heading text-2xl font-bold leading-tight md:text-3xl">{lead.title}</p>
              <p className="mt-1 text-sm text-muted">
                {fmt(lead.start)}
                {lead.end ? ` to ${fmt(lead.end)}` : ""}
              </p>
            </div>
            <p className="shrink-0 text-end">
              <span className="block font-heading text-5xl font-bold leading-none tabular text-primary">{days(left)}</span>
              <span className="text-sm text-muted">{current ? "days left" : "days to go"}</span>
            </p>
          </div>
          {progress !== null ? (
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-bg-2">
              <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
            </div>
          ) : (
            <p className="mt-5 font-mono text-sm tabular text-muted" dir="ltr" aria-label="Time remaining">
              {Math.floor(left / 86_400_000)}d {pad(Math.floor((left % 86_400_000) / 3_600_000))}h {pad(Math.floor((left % 3_600_000) / 60_000))}m {pad(Math.floor((left % 60_000) / 1000))}s
            </p>
          )}
          {(current?.after || (!current && rest[0])) && (
            <p className="mt-auto border-t border-line pt-4 text-sm">
              <span className="font-semibold">Then: </span>
              {current?.after ?? `${rest[0].title}, ${fmt(rest[0].start)}.`}
            </p>
          )}
        </article>

        {/* The next three University dates as a timeline */}
        <article className="rounded-3xl border border-line bg-card p-6">
          <p className="text-sm font-semibold text-muted">After that</p>
          <ol className="relative mt-4 space-y-5 before:absolute before:inset-y-2 before:start-[22px] before:w-px before:bg-line">
            {rest.map((d) => {
              const kk = KIND[d.kind];
              return (
                <li key={d.id} className="relative flex items-center gap-4">
                  <span className="relative z-10 flex w-11 shrink-0 flex-col items-center rounded-xl border border-line bg-card py-1 leading-tight">
                    <span className="text-[10px] font-bold uppercase text-muted">{fmt(d.start, { month: "short" })}</span>
                    <span className="font-heading text-lg font-bold">{fmt(d.start, { day: "numeric" })}</span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold leading-snug">{d.title}</span>
                    <span className="flex items-center gap-1.5 text-xs text-muted">
                      <kk.icon size={12} /> {kk.label}
                      {d.end ? `, until ${fmt(d.end, { day: "numeric", month: "short" })}` : ""}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm font-semibold tabular text-primary">{days(startOf(d.start).getTime() - now)}d</span>
                </li>
              );
            })}
          </ol>
        </article>

        {/* Islamic dates: small counters */}
        <article className="lattice overflow-hidden rounded-3xl bg-brand-deep p-6 text-white md:col-span-2 xl:col-span-1">
          <p className="flex items-center gap-2 text-sm font-semibold text-white/75">
            <Moon size={15} className="text-gold-bright" /> Islamic dates
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            {islamic.map((d) => (
              <li key={d.id} className="flex items-center justify-between gap-3 rounded-2xl bg-white/8 px-4 py-3 ring-1 ring-white/10">
                <span className="min-w-0">
                  <span className="block font-semibold leading-snug">{d.title}</span>
                  <span className="block text-xs text-white/65">{d.hijri}</span>
                </span>
                <span className="shrink-0 text-end">
                  <span className="block font-heading text-2xl font-bold leading-none tabular text-gold-bright">{days(startOf(d.start).getTime() - now)}</span>
                  <span className="text-[11px] text-white/65">days</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] text-white/55">Expected dates, confirmed by moon sighting.</p>
        </article>
      </div>
    </section>
  );
}
