"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock3, MapPin, Megaphone, MoonStar, Radio, SearchX, User } from "lucide-react";
import { Announcement, Lesson, Localized, MASJIDS, PRAYERS, TOPICS } from "../lib/types";
import { useLang } from "../lib/i18n";
import { BellToggle } from "./subscribe";

/* ---------- Reveal on scroll (subtle; content never fully hidden) ---------- */
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0.85, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- PillButton ---------- */
export function PillButton({
  children,
  onClick,
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
}) {
  const base =
    "inline-flex h-[50px] items-center justify-center gap-2 rounded-pill px-6 text-[15px] font-semibold transition-transform duration-150 active:scale-95";
  const styles =
    variant === "primary"
      ? "bg-[var(--brand-accent)] text-white shadow-soft hover:opacity-95"
      : variant === "outline"
        ? "border border-[var(--brand)] text-[var(--brand)] bg-transparent hover:bg-[var(--ceramic)]"
        : "text-[var(--ink-soft)] hover:bg-[var(--ceramic)]";
  return (
    <button onClick={onClick} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}

/* ---------- StatusBadge ---------- */
export function StatusBadge({ status }: { status: Lesson["status"] }) {
  const { statusLabel } = useLang();
  const map: Record<Lesson["status"], string> = {
    active: "bg-[var(--status-active-bg)] text-[var(--status-active-tx)]",
    cancelled: "bg-[var(--status-cancel-bg)] text-[var(--status-cancel-tx)]",
    paused: "bg-[var(--status-pause-bg)] text-[var(--status-pause-tx)]",
    guest: "bg-[var(--status-guest-bg)] text-[var(--status-guest-tx)]",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-xs font-semibold ${map[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {statusLabel(status)}
    </span>
  );
}

/* ---------- PrayerTimeLabel ---------- */
export function PrayerTimeLabel({ lesson }: { lesson: Lesson }) {
  const { t, ui, lang } = useLang();
  const prayer = PRAYERS[lesson.prayer];
  // Lessons whose sources state no prayer time carry an explicit timeLabel;
  // never present the grouping-bucket prayer as if it were stated.
  if (lesson.timeLabel) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ink)]">
        <Clock3 className="h-4 w-4 text-[var(--brand-accent)]" />
        {t(lesson.timeLabel)}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ink)]">
      <Clock3 className="h-4 w-4 text-[var(--brand-accent)]" />
      {ui("afterPrayer")} {t(prayer)}
      {lesson.prayerNote ? <span className="text-[var(--ink-soft)]">({t(lesson.prayerNote)})</span> : null}
    </span>
  );
}

/* ---------- FilterChips ---------- */
export function FilterChips({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`h-10 rounded-pill px-4 text-sm font-medium transition-all duration-150 active:scale-95 ${
            value === o.value
              ? "bg-[var(--brand-deep)] text-white shadow-soft"
              : "bg-[var(--card)] text-[var(--ink-soft)] shadow-soft hover:text-[var(--ink)]"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* ---------- LessonCard ---------- */
export function LessonCard({
  lesson,
  onShaykh,
}: {
  lesson: Lesson;
  onShaykh?: (name: string) => void;
}) {
  const { t, ui, lang } = useLang();
  const topic = TOPICS[lesson.topic];
  return (
    <article className="rounded-card bg-[var(--card)] p-5 shadow-soft sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <button
          onClick={() => onShaykh?.(lesson.shaykh.ar)}
          className="text-start text-[17px] font-semibold leading-snug text-[var(--ink)] hover:text-[var(--brand)]"
        >
          {t(lesson.shaykh)}
        </button>
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
          <BellToggle scopeType="book" scopeId={lesson.id} label={ui("alertsForBook")} />
          <StatusBadge status={lesson.status} />
        </div>
      </div>

      <h3 className="mt-2 text-[15px] font-medium leading-relaxed text-[var(--ink)]">
        {t(lesson.book)}
        {lesson.bookAuthor ? (
          <span className="text-[var(--ink-soft)]"> — {t(lesson.bookAuthor)}</span>
        ) : null}
      </h3>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <PrayerTimeLabel lesson={lesson} />
          <span className="inline-flex items-center gap-1.5 text-[var(--ink-soft)]">
            <CalendarDays className="h-4 w-4" />
            {lesson.daysLabel
              ? t(lesson.daysLabel)
              : lesson.days.length
                ? lesson.days
                    .map((d) => (lang === "ar" ? ["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"][d] : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][d]))
                    .join(lang === "ar" ? "، " : ", ")
                : lesson.frequency
                  ? t(lesson.frequency)
                  : ""}
          </span>
        </div>
        <p className="flex items-start gap-1.5 text-[var(--ink-soft)]">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            {t(MASJIDS[lesson.masjid])} — {t(lesson.location)}
          </span>
        </p>
        {topic ? (
          <span className="inline-block rounded-pill bg-[var(--ceramic)] px-3 py-1 text-xs font-medium text-[var(--ink-soft)]">
            {t(topic)}
          </span>
        ) : null}
        {lesson.sequence ? (
          <p className="text-xs leading-relaxed text-[var(--ink-soft)]">{t(lesson.sequence)}</p>
        ) : null}
        {lesson.note ? (
          <p className="rounded-card bg-[var(--ceramic)] px-3 py-2 text-xs leading-relaxed text-[var(--ink-soft)]">
            {t(lesson.note)}
          </p>
        ) : null}
      </div>
    </article>
  );
}

/* ---------- AnnouncementCard ---------- */
export function AnnouncementCard({ a }: { a: Announcement }) {
  const { t, ui, typeLabel } = useLang();
  return (
    <article
      className={`rounded-card bg-[var(--card)] p-5 shadow-soft sm:p-6 ${a.expired ? "opacity-80" : ""}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-pill bg-[var(--brand-deep)] px-3 py-1 text-xs font-semibold text-white">
          <Megaphone className="h-3.5 w-3.5" />
          {typeLabel(a.type)}
        </span>
        {a.expired ? (
          <span className="rounded-pill bg-[var(--status-pause-bg)] px-3 py-1 text-xs font-semibold text-[var(--status-pause-tx)]">
            {ui("expired")}
          </span>
        ) : null}
      </div>

      <p className="mt-3 flex items-center gap-2 text-[15px] font-semibold text-[var(--ink)]">
        <User className="h-4 w-4 text-[var(--brand-accent)]" />
        {t(a.shaykh)}
      </p>
      <p className="mt-2 text-[15px] leading-loose text-[var(--ink)]">{t(a.text)}</p>

      {a.channelNote ? (
        <p className="mt-3 rounded-card bg-[var(--ceramic)] px-3 py-2 text-xs leading-relaxed text-[var(--ink-soft)]">
          {t(a.channelNote)}
        </p>
      ) : null}

      <footer className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-[var(--ceramic)] pt-3 text-xs text-[var(--ink-soft)]">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5" />
          {ui("postedOn")}: {t(a.postedHijri)} — {t(a.postedGregorian)}
        </span>
        {a.source === "@admin" ? (
          <span className="font-medium text-[var(--ink-soft)]">{t(a.sourceName)}</span>
        ) : (
          <a
            href={`https://t.me/s/${a.source.replace("@", "")}`}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-[var(--brand)] hover:underline"
            dir="ltr"
          >
            {a.source}
          </a>
        )}
      </footer>
    </article>
  );
}

/* ---------- EmptyState ---------- */
export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="rounded-card bg-[var(--card)] px-6 py-12 text-center shadow-soft">
      <SearchX className="mx-auto h-8 w-8 text-[var(--ink-faint)]" />
      <p className="mt-3 text-[15px] font-semibold text-[var(--ink)]">{title}</p>
      {hint ? <p className="mt-1 text-sm text-[var(--ink-soft)]">{hint}</p> : null}
    </div>
  );
}

/* ---------- LoadingSkeleton ---------- */
export function LoadingSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-4" aria-busy="true">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-card bg-[var(--card)] p-6 shadow-soft">
          <div className="h-4 w-2/5 rounded bg-[var(--ceramic)]" />
          <div className="mt-3 h-4 w-4/5 rounded bg-[var(--ceramic)]" />
          <div className="mt-3 h-4 w-3/5 rounded bg-[var(--ceramic)]" />
        </div>
      ))}
    </div>
  );
}

/* ---------- SeasonalBanner ---------- */
export function SeasonalBanner({ title, note }: { title: string; note: Localized }) {
  const { t } = useLang();
  return (
    <section className="rounded-card bg-[var(--brand-deep)] p-6 text-white shadow-soft sm:p-8">
      <div className="flex items-center gap-3">
        <MoonStar className="h-6 w-6 text-[var(--gold)]" />
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-loose text-white/70">{t(note)}</p>
      <span className="mt-4 inline-block h-1 w-14 rounded-full bg-[var(--gold)]" />
    </section>
  );
}

/* ---------- FloatingLiveButton ---------- */
export function FloatingLiveButton({ onClick }: { onClick: () => void }) {
  const { ui } = useLang();
  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className="fixed bottom-24 end-4 z-40 inline-flex h-[50px] items-center gap-2 rounded-pill bg-[var(--brand-accent)] px-5 text-sm font-semibold text-white shadow-lift transition-transform active:scale-95 lg:bottom-8 lg:end-8"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
      </span>
      <Radio className="h-4 w-4" />
      {ui("liveUpdates")}
    </motion.button>
  );
}

/* ---------- MobileBottomNav ---------- */
export type ViewKey = "home" | "schedule" | "daily" | "search" | "feed" | "seasonal" | "streams" | "admin";

export function MobileBottomNav({
  view,
  setView,
  items,
}: {
  view: ViewKey;
  setView: (v: ViewKey) => void;
  items: { key: ViewKey; label: string; icon: ReactNode }[];
}) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--ceramic)] bg-[var(--card)] pb-[env(safe-area-inset-bottom)] lg:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-5">
        {items.map((it) => (
          <button
            key={it.key}
            onClick={() => setView(it.key)}
            className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${
              view === it.key ? "text-[var(--brand-accent)]" : "text-[var(--ink-soft)]"
            }`}
          >
            {it.icon}
            {it.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

/* ---------- ShaykhHeader ---------- */
export function ShaykhHeader({ name, sub }: { name: string; sub?: string }) {
  return (
    <div className="rounded-card bg-[var(--brand-deep)] p-6 text-white shadow-soft sm:p-8">
      <p className="text-xs font-medium uppercase tracking-wider text-white/60">{sub}</p>
      <h1 className="mt-2 text-2xl font-semibold leading-snug sm:text-3xl">{name}</h1>
    </div>
  );
}

/* ---------- ScheduleTable ---------- */
export function ScheduleTable({ lessons, onShaykh }: { lessons: Lesson[]; onShaykh: (n: string) => void }) {
  const { t, lang } = useLang();
  const daysAr = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
  const daysEn = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return (
    <div className="overflow-x-auto rounded-card bg-[var(--card)] shadow-soft">
      <table className="w-full min-w-[560px] text-start text-sm">
        <thead>
          <tr className="border-b border-[var(--ceramic)] text-[var(--ink-soft)]">
            <th className="px-5 py-3 text-start font-medium">{lang === "ar" ? "الشيخ" : "Shaykh"}</th>
            <th className="px-5 py-3 text-start font-medium">{lang === "ar" ? "الكتاب" : "Book"}</th>
            <th className="px-5 py-3 text-start font-medium">{lang === "ar" ? "اليوم" : "Day"}</th>
            <th className="px-5 py-3 text-start font-medium">{lang === "ar" ? "الوقت" : "Time"}</th>
          </tr>
        </thead>
        <tbody>
          {[...lessons]
            .sort((a, b) => PRAYERS[a.prayer].order - PRAYERS[b.prayer].order)
            .map((l) => (
              <tr key={l.id} className="border-b border-[var(--ceramic)] last:border-0">
                <td className="px-5 py-3">
                  <button onClick={() => onShaykh(l.shaykh.ar)} className="font-medium text-[var(--brand)] hover:underline">
                    {t(l.shaykh)}
                  </button>
                </td>
                <td className="px-5 py-3 text-[var(--ink)]">{t(l.book)}</td>
                <td className="px-5 py-3 text-[var(--ink-soft)]">
                  {l.daysLabel ? t(l.daysLabel) : l.days.map((d) => (lang === "ar" ? daysAr[d] : daysEn[d])).join("، ") || (l.frequency ? t(l.frequency) : "—")}
                </td>
                <td className="px-5 py-3 text-[var(--ink-soft)]">
                  {l.timeLabel
                    ? t(l.timeLabel)
                    : `${lang === "ar" ? "بعد" : "After"} ${t(PRAYERS[l.prayer])}`}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
