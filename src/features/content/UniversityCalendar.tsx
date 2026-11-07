"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarPlus, Moon, PencilLine, Sun, GraduationCap, ClipboardList } from "lucide-react";
import { KEY_DATES, endOf, startOf, type KeyDate } from "@/content/key-dates";
import { SITE_URL } from "@/lib/site";

const FEED = `${SITE_URL}/api/v1/calendar/dates.ics`;
const WEBCAL = FEED.replace(/^https?:/, "webcal:");
const GOOGLE = `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(WEBCAL)}`;

type Filter = "all" | "main" | "deadline" | "islamic";
const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "main", label: "Exams, holidays and classes" },
  { id: "deadline", label: "Request windows" },
  { id: "islamic", label: "Islamic dates" },
];
const KIND = {
  exams: { label: "Exams", icon: PencilLine, tone: "bg-cancel-bg text-cancel" },
  holiday: { label: "Holiday", icon: Sun, tone: "bg-amber-bg text-amber" },
  study: { label: "Classes", icon: GraduationCap, tone: "bg-primary-soft text-primary" },
  deadline: { label: "Request window", icon: ClipboardList, tone: "bg-bg-2 text-ink" },
  islamic: { label: "Islamic, expected", icon: Moon, tone: "bg-gold-bg text-gold" },
} as const;
const TERM = { first: "First semester", second: "Second semester", summer: "Summer semester" } as const;

const tz = { timeZone: "Asia/Riyadh" } as const;
const f = (iso: string, o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-GB", { ...o, ...tz }).format(startOf(iso));
const DAY = 86_400_000;

function when(d: KeyDate, now: number): { text: string; state: "past" | "now" | "soon" | "later" } {
  const s = startOf(d.start).getTime();
  const e = endOf(d.end ?? d.start).getTime();
  if (now > e) return { text: "Ended", state: "past" };
  if (now >= s) return { text: d.end ? `On now, ${Math.ceil((e - now) / DAY)} days left` : "Today", state: "now" };
  const n = Math.ceil((s - now) / DAY);
  return { text: n === 1 ? "Tomorrow" : `In ${n} days`, state: n <= 14 ? "soon" : "later" };
}

/** The whole 1448 University calendar with the expected Islamic dates, filterable, with live countdowns. */
export function UniversityCalendar() {
  const [now, setNow] = useState<number | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [showPast, setShowPast] = useState(false);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);

  const t = now ?? startOf("2026-11-01").getTime();
  const dates = useMemo(() => [...KEY_DATES].sort((a, b) => a.start.localeCompare(b.start)), []);
  const shown = dates.filter((d) => {
    if (filter === "main" && (d.kind === "deadline" || d.kind === "islamic")) return false;
    if (filter === "deadline" && d.kind !== "deadline") return false;
    if (filter === "islamic" && d.kind !== "islamic") return false;
    return showPast || when(d, t).state !== "past";
  });
  const pastCount = dates.filter((d) => when(d, t).state === "past").length;
  const nextId = shown.find((d) => when(d, t).state !== "past")?.id;
  const months = new Map<string, KeyDate[]>();
  for (const d of shown) {
    const key = d.start.slice(0, 7);
    months.set(key, [...(months.get(key) ?? []), d]);
  }

  return (
    <div>
      <div className="grid max-w-3xl gap-3 sm:grid-cols-2">
        <a href={WEBCAL} className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 font-semibold text-primary-ink transition hover:brightness-110">
          <CalendarPlus size={18} /> Add to my phone calendar
        </a>
        <a href={GOOGLE} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-2xl border border-line bg-card px-4 py-3 font-semibold transition hover:border-primary">
          <CalendarPlus size={18} /> Add to Google Calendar
        </a>
      </div>
      <p className="mt-2 text-sm text-muted">Every date below goes in, request windows included, and your calendar updates itself if a date changes.</p>

      <div className="mt-6 flex flex-wrap items-center gap-2" role="group" aria-label="Show">
        {FILTERS.map((x) => (
          <button key={x.id} type="button" onClick={() => setFilter(x.id)} aria-pressed={filter === x.id}
            className={`min-h-10 rounded-full px-4 text-sm font-semibold transition ${filter === x.id ? "bg-primary text-primary-ink" : "border border-line bg-card text-muted hover:text-ink"}`}>
            {x.label}
          </button>
        ))}
        {pastCount > 0 && (
          <button type="button" onClick={() => setShowPast((v) => !v)} className="min-h-10 px-2 text-sm font-semibold text-primary hover:underline">
            {showPast ? "Hide past dates" : `Show ${pastCount} past dates`}
          </button>
        )}
      </div>

      <div className="mt-8 xl:columns-2 xl:gap-8">
      {[...months].map(([key, list]) => (
        <section key={key} className="mb-8 break-inside-avoid">
          <h2 className="font-heading text-xl font-bold">{f(`${key}-01`, { month: "long", year: "numeric" })}</h2>
          <ul className="mt-3 grid gap-2">
            {list.map((d) => {
              const k = KIND[d.kind];
              const w = when(d, t);
              const next = d.id === nextId;
              return (
                <li key={d.id} className={`flex gap-4 rounded-2xl border p-4 ${next ? "border-primary bg-primary-soft/40" : "border-line bg-card"} ${w.state === "past" ? "opacity-60" : ""}`}>
                  <span className="flex w-12 shrink-0 flex-col items-center rounded-xl border border-line bg-card py-1.5 leading-tight">
                    <span className="text-[11px] font-bold uppercase text-muted">{f(d.start, { weekday: "short" })}</span>
                    <span className="font-heading text-xl font-bold">{f(d.start, { day: "numeric" })}</span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold leading-snug">{d.title}</span>
                    <span className="mt-0.5 block text-sm text-muted">
                      {d.end ? `${f(d.start, { weekday: "short", day: "numeric", month: "short" })} to ${f(d.end, { weekday: "short", day: "numeric", month: "short", year: d.end.slice(0, 4) !== d.start.slice(0, 4) ? "numeric" : undefined })}` : f(d.start, { weekday: "long", day: "numeric", month: "long" })}
                      {". "}{d.hijri}
                    </span>
                    {(d.note || d.after) && <span className="mt-1 block text-sm">{d.note ?? d.after}</span>}
                    <span className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold ${k.tone}`}><k.icon size={12} /> {k.label}</span>
                      {d.term && <span className="text-muted">{TERM[d.term]}</span>}
                    </span>
                  </span>
                  <span className={`shrink-0 text-end text-sm font-semibold ${w.state === "now" ? "text-on" : w.state === "soon" ? "text-primary" : "text-muted"}`}>{now === null ? "" : w.text}</span>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
      </div>
      {shown.length === 0 && <p className="mt-8 text-muted">Nothing left in this list for the year. Tap "Show past dates" to see what has passed.</p>}
      <p className="mt-8 text-sm text-muted">From the University's academic calendar for 1448. Islamic dates follow Umm al-Qura and are confirmed by moon sighting.</p>
    </div>
  );
}
