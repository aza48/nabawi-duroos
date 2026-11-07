"use client";

import { useEffect, useState } from "react";
import { BookOpenCheck, CalendarDays, GraduationCap, Moon, PartyPopper, PencilLine, Sun } from "lucide-react";
import { KEY_DATES, endOf, keyDatesState, startOf, type KeyDate } from "@/content/key-dates";

const ICON: Record<KeyDate["kind"], typeof Moon> = { exams: PencilLine, holiday: Sun, study: GraduationCap, islamic: Moon, deadline: BookOpenCheck };
const fmt = (iso: string) => new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Riyadh" }).format(startOf(iso));
const daysUntil = (iso: string, now: number) => Math.max(0, Math.ceil((startOf(iso).getTime() - now) / 86_400_000));
const pad = (n: number) => String(n).padStart(2, "0");

function Countdown({ to, now }: { to: Date; now: number }) {
  const left = Math.max(0, to.getTime() - now);
  const d = Math.floor(left / 86_400_000);
  const h = Math.floor((left % 86_400_000) / 3_600_000);
  const m = Math.floor((left % 3_600_000) / 60_000);
  const s = Math.floor((left % 60_000) / 1000);
  const cell = (v: string, label: string) => (
    <span className="flex flex-col items-center">
      <span className="font-heading text-4xl font-bold tabular md:text-5xl">{v}</span>
      <span className="text-xs text-white/70">{label}</span>
    </span>
  );
  return (
    <div className="mt-5 flex items-start gap-4 md:gap-6" dir="ltr">
      {cell(String(d), d === 1 ? "day" : "days")}
      <span className="font-heading text-4xl text-white/40 md:text-5xl">:</span>
      {cell(pad(h), "hours")}
      <span className="font-heading text-4xl text-white/40 md:text-5xl">:</span>
      {cell(pad(m), "min")}
      <span className="font-heading text-4xl text-white/40 md:text-5xl">:</span>
      {cell(pad(s), "sec")}
    </div>
  );
}

/** "Coming up": what's on now, a live countdown to the next big Islamic date, and the next University dates. */
export function KeyDates() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (now === null) return <div className="h-72" aria-hidden="true" />;
  const { current, featured, upcoming } = keyDatesState(new Date(now), KEY_DATES);

  return (
    <section aria-labelledby="coming-up" className="shell mt-10 md:mt-14">
      <h2 id="coming-up" className="font-heading text-3xl font-bold md:text-4xl">Coming up</h2>
      <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_1fr]">
        {featured && (
          <div className="lattice relative overflow-hidden rounded-3xl bg-brand-deep p-6 text-white shadow-[var(--shadow-lg)] md:p-8">
            <Moon className="absolute -end-6 -top-6 size-40 text-gold-bright/15" strokeWidth={1} />
            <p className="flex items-center gap-2 text-sm text-white/75">
              <CalendarDays size={16} className="text-gold-bright" /> {fmt(featured.start)}, {featured.hijri}
            </p>
            <p className="mt-2 font-heading text-4xl font-bold md:text-5xl">{featured.title}</p>
            <p className="ar-text mt-1 text-xl text-white/75">{featured.titleAr}</p>
            <Countdown to={startOf(featured.start)} now={now} />
            {featured.note && <p className="mt-4 text-xs text-white/60">{featured.note}</p>}
          </div>
        )}

        <div className="grid gap-3">
          {current && current.end && (
            <div className="rounded-3xl border-2 border-primary bg-primary-soft p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-primary">
                <span className="live-dot size-2 rounded-full bg-primary" /> Happening now
              </p>
              <p className="mt-1 font-heading text-2xl font-bold">{current.title}</p>
              <p className="mt-1 text-sm">
                Ends {fmt(current.end)}, in {Math.max(0, Math.ceil((endOf(current.end).getTime() - now) / 86_400_000))} days.
              </p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-card">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${Math.min(100, Math.round(((now - startOf(current.start).getTime()) / (endOf(current.end).getTime() - startOf(current.start).getTime())) * 100))}%` }}
                />
              </div>
              {current.after && <p className="mt-3 text-sm text-muted">{current.after}</p>}
            </div>
          )}
          {upcoming.slice(0, current ? 3 : 4).map((d) => {
            const Icon = d.kind === "holiday" && /eid/i.test(d.title) ? PartyPopper : ICON[d.kind];
            const n = daysUntil(d.start, now);
            return (
              <div key={d.id} className="flex items-center gap-4 rounded-2xl border border-line bg-card p-4">
                <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${d.kind === "exams" ? "bg-cancel-bg text-cancel" : d.kind === "islamic" ? "bg-gold-bg text-gold" : "bg-primary-soft text-primary"}`}>
                  <Icon size={20} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold leading-snug">{d.title}</span>
                  <span className="block text-sm text-muted">
                    {fmt(d.start)}
                    {d.end ? ` to ${fmt(d.end)}` : ""}
                  </span>
                </span>
                <span className="shrink-0 text-end">
                  <span className="block font-heading text-2xl font-bold tabular text-primary">{n}</span>
                  <span className="block text-xs text-muted">{n === 1 ? "day" : "days"}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <p className="mt-3 text-xs text-muted">From the Islamic University calendar for 1448. Islamic dates are expected and confirmed by moon sighting.</p>
    </section>
  );
}
