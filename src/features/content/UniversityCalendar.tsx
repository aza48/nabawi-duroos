"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarPlus, Moon, PencilLine, Sun, GraduationCap, ClipboardList } from "lucide-react";
import { KEY_DATES, endOf, startOf, type KeyDate } from "@/content/key-dates";
import { SITE_URL } from "@/lib/site";
import { toArabicDigits, type Locale } from "@/lib/locale";
import { hijriTextAr } from "@/lib/time/hijri";

const FEED = `${SITE_URL}/api/v1/calendar/dates.ics`;
const WEBCAL = FEED.replace(/^https?:/, "webcal:");
const GOOGLE = `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(WEBCAL)}`;

type Filter = "all" | "main" | "deadline" | "islamic";
const FILTER_IDS: Filter[] = ["all", "main", "deadline", "islamic"];
const KIND = {
  exams: { icon: PencilLine, tone: "bg-cancel-bg text-cancel" },
  holiday: { icon: Sun, tone: "bg-amber-bg text-amber" },
  study: { icon: GraduationCap, tone: "bg-primary-soft text-primary" },
  deadline: { icon: ClipboardList, tone: "bg-bg-2 text-ink" },
  islamic: { icon: Moon, tone: "bg-gold-bg text-gold" },
} as const;

/** "3 days" in Arabic, with the noun agreeing with the number. */
const arDays = (n: number) => (n === 1 ? "يوم واحد" : n === 2 ? "يومان" : n <= 10 ? `${toArabicDigits(n)} أيام` : `${toArabicDigits(n)} يومًا`);

type Strings = {
  phone: string;
  google: string;
  feedNote: string;
  show: string;
  filters: Record<Filter, string>;
  kinds: Record<KeyDate["kind"], string>;
  terms: Record<NonNullable<KeyDate["term"]>, string>;
  hidePast: string;
  showPast: (n: number) => string;
  ended: string;
  onNow: (n: number) => string;
  today: string;
  tomorrow: string;
  inDays: (n: number) => string;
  to: string;
  sep: string;
  hijri: (s: string) => string;
  empty: string;
  ummAlQura: string;
  intl: string;
};

const T: Record<Locale, Strings> = {
  en: {
    phone: "Add to my phone calendar",
    google: "Add to Google Calendar",
    feedNote: "Every date below goes in, request windows included, and your calendar updates itself if a date changes.",
    show: "Show",
    filters: { all: "Everything", main: "Exams, holidays and classes", deadline: "Request windows", islamic: "Islamic dates" },
    kinds: { exams: "Exams", holiday: "Holiday", study: "Classes", deadline: "Request window", islamic: "Islamic dates" },
    terms: { first: "First semester", second: "Second semester", summer: "Summer semester" },
    hidePast: "Hide past dates",
    showPast: (n) => `Show ${n} past dates`,
    ended: "Ended",
    onNow: (n) => `On now, ${n} days left`,
    today: "Today",
    tomorrow: "Tomorrow",
    inDays: (n) => `In ${n} days`,
    to: "to",
    sep: ". ",
    hijri: (s) => s,
    empty: 'Nothing left in this list for the year. Tap "Show past dates" to see what has passed.',
    ummAlQura: "Islamic dates follow the Umm al-Qura calendar.",
    intl: "en-GB",
  },
  ar: {
    phone: "أضفها إلى تقويم جوالي",
    google: "أضفها إلى تقويم Google",
    feedNote: "تُضاف كل المواعيد أدناه، ومنها فترات الطلبات، ويتحدّث تقويمك تلقائيًا إذا تغيّر موعد.",
    show: "عرض",
    filters: { all: "الكل", main: "الاختبارات والإجازات والدراسة", deadline: "فترات الطلبات", islamic: "المناسبات الإسلامية" },
    kinds: { exams: "اختبارات", holiday: "إجازة", study: "دراسة", deadline: "فترة طلبات", islamic: "مناسبة إسلامية" },
    terms: { first: "الفصل الأول", second: "الفصل الثاني", summer: "الفصل الصيفي" },
    hidePast: "إخفاء المواعيد الماضية",
    showPast: (n) => `عرض المواعيد الماضية (${toArabicDigits(n)})`,
    ended: "انتهى",
    onNow: (n) => `جارٍ الآن، بقي ${arDays(n)}`,
    today: "اليوم",
    tomorrow: "غدًا",
    inDays: (n) => `بعد ${arDays(n)}`,
    to: "إلى",
    sep: "، ",
    hijri: hijriTextAr,
    empty: "لم يبقَ شيء في هذه القائمة لهذا العام. اضغط «عرض المواعيد الماضية» لرؤية ما مضى.",
    ummAlQura: "التواريخ الهجرية وفق تقويم أم القرى.",
    intl: "ar-SA-u-ca-gregory-nu-arab",
  },
};

const tz = { timeZone: "Asia/Riyadh" } as const;
const fmt = (intl: string) => (iso: string, o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(intl, { ...o, ...tz }).format(startOf(iso));
const DAY = 86_400_000;

function when(d: KeyDate, now: number, s: Strings): { text: string; state: "past" | "now" | "soon" | "later" } {
  const start = startOf(d.start).getTime();
  const e = endOf(d.end ?? d.start).getTime();
  if (now > e) return { text: s.ended, state: "past" };
  if (now >= start) return { text: d.end ? s.onNow(Math.ceil((e - now) / DAY)) : s.today, state: "now" };
  const n = Math.ceil((start - now) / DAY);
  return { text: n === 1 ? s.tomorrow : s.inDays(n), state: n <= 14 ? "soon" : "later" };
}

/** The whole 1448 University calendar with the Islamic dates, filterable, with live countdowns. */
export function UniversityCalendar({ locale = "en" }: { locale?: Locale }) {
  const ar = locale === "ar";
  const s = T[locale];
  const f = fmt(s.intl);
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
    return showPast || when(d, t, s).state !== "past";
  });
  const pastCount = dates.filter((d) => when(d, t, s).state === "past").length;
  const nextId = shown.find((d) => when(d, t, s).state !== "past")?.id;
  const months = new Map<string, KeyDate[]>();
  for (const d of shown) {
    const key = d.start.slice(0, 7);
    months.set(key, [...(months.get(key) ?? []), d]);
  }

  return (
    <div>
      <div className="grid max-w-3xl gap-3 sm:grid-cols-2">
        <a href={WEBCAL} className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 font-semibold text-primary-ink transition hover:brightness-110">
          <CalendarPlus size={18} /> {s.phone}
        </a>
        <a href={GOOGLE} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-2xl border border-line bg-card px-4 py-3 font-semibold transition hover:border-primary">
          <CalendarPlus size={18} /> {s.google}
        </a>
      </div>
      <p className="mt-2 text-sm text-muted">{s.feedNote}</p>

      <div className="mt-6 flex flex-wrap items-center gap-2" role="group" aria-label={s.show}>
        {FILTER_IDS.map((id) => (
          <button key={id} type="button" onClick={() => setFilter(id)} aria-pressed={filter === id}
            className={`min-h-10 rounded-full px-4 text-sm font-semibold transition ${filter === id ? "bg-primary text-primary-ink" : "border border-line bg-card text-muted hover:text-ink"}`}>
            {s.filters[id]}
          </button>
        ))}
        {pastCount > 0 && (
          <button type="button" onClick={() => setShowPast((v) => !v)} className="min-h-10 px-2 text-sm font-semibold text-primary hover:underline">
            {showPast ? s.hidePast : s.showPast(pastCount)}
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
              const w = when(d, t, s);
              const next = d.id === nextId;
              return (
                <li key={d.id} className={`flex gap-4 rounded-2xl border p-4 ${next ? "border-primary bg-primary-soft/40" : "border-line bg-card"} ${w.state === "past" ? "opacity-60" : ""}`}>
                  <span className={`flex ${ar ? "w-16" : "w-12"} shrink-0 flex-col items-center rounded-xl border border-line bg-card py-1.5 leading-tight`}>
                    <span className="text-[11px] font-bold uppercase text-muted">{f(d.start, { weekday: "short" })}</span>
                    <span className="font-heading text-xl font-bold">{f(d.start, { day: "numeric" })}</span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold leading-snug">{ar ? d.titleAr : d.title}</span>
                    <span className="mt-0.5 block text-sm text-muted">
                      {d.end ? `${f(d.start, { weekday: "short", day: "numeric", month: "short" })} ${s.to} ${f(d.end, { weekday: "short", day: "numeric", month: "short", year: d.end.slice(0, 4) !== d.start.slice(0, 4) ? "numeric" : undefined })}` : f(d.start, { weekday: "long", day: "numeric", month: "long" })}
                      {s.sep}{s.hijri(d.hijri)}
                    </span>
                    {ar ? d.afterAr && <span className="mt-1 block text-sm">{d.afterAr}</span> : (d.note || d.after) && <span className="mt-1 block text-sm">{d.note ?? d.after}</span>}
                    <span className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold ${k.tone}`}><k.icon size={12} /> {s.kinds[d.kind]}</span>
                      {d.term && <span className="text-muted">{s.terms[d.term]}</span>}
                    </span>
                  </span>
                  <span className={`shrink-0 text-end text-sm font-semibold ${ar ? "max-w-24" : ""} ${w.state === "now" ? "text-on" : w.state === "soon" ? "text-primary" : "text-muted"}`}>{now === null ? "" : w.text}</span>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
      </div>
      {shown.length === 0 && <p className="mt-8 text-muted">{s.empty}</p>}
      <p className="mt-8 text-sm text-muted">{s.ummAlQura}</p>
    </div>
  );
}
