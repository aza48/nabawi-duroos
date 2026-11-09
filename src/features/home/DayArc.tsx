"use client";

import { useEffect, useRef, useState, type PointerEvent as RPointerEvent } from "react";
import { ArrowDown } from "lucide-react";
import type { Locale } from "@/lib/locale";
import { toArabicDigits } from "@/lib/locale";
import { formatClock } from "@/lib/time/riyadh";
import { PRAYERS, type Prayer } from "@/lib/time/prayers";
import { t } from "@/features/duroos/strings";
import { useWeather } from "./useWeather";
import { MoonDisc, useNow } from "./HeroSky";
import { WeatherDetails } from "./WeatherChip";
import { moonLit, moonName, moonPhase, sunIsUp } from "./sky";
import { arCount, enCount } from "@/lib/arabic-count";

export type ArcCounts = Record<Prayer, { total: number; live: number; cancelled: number }>;
/** One of today's duroos, as the arc's popover lists it. */
export type ArcLesson = {
  slug: string;
  prayer: Prayer;
  book: string;
  shaykh: string;
  shaykhSlug: string;
  masjid: string;
  /** Google Maps link for the masjid. */
  map: string;
  live: boolean;
  off: boolean;
};

/** 0..1 along the arc: an hour before Fajr to two hours after Isha. */
export function arcFraction(time: number, p: Record<Prayer, string>): number {
  const start = new Date(p.fajr).getTime() - 60 * 60_000;
  const end = new Date(p.isha).getTime() + 120 * 60_000;
  return Math.min(1, Math.max(0, (time - start) / (end - start)));
}

// The arc is a quadratic curve in a 1000 x 220 box.
const P0 = { x: 30, y: 190 };
const P1 = { x: 500, y: -40 };
const P2 = { x: 970, y: 190 };
function pointAt(f: number) {
  const a = (1 - f) * (1 - f), b = 2 * (1 - f) * f, c = f * f;
  return { x: a * P0.x + b * P1.x + c * P2.x, y: a * P0.y + b * P1.y + c * P2.y };
}
/**
 * The part of the arc already travelled, as its own quadratic curve (de Casteljau split at f).
 * Drawing it this way stays exact however the SVG is stretched, unlike a dash along the path.
 */
export function travelledPath(f: number): string {
  const q1 = { x: P0.x + f * (P1.x - P0.x), y: P0.y + f * (P1.y - P0.y) };
  const end = pointAt(f);
  return `M${P0.x} ${P0.y} Q${q1.x.toFixed(2)} ${q1.y.toFixed(2)} ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}
/** Arabic reads right to left, so the day runs from the right. */
const xPct = (x: number, rtl: boolean) => (rtl ? 1000 - x : x) / 10;
const pct = (pt: { x: number; y: number }, rtl = false) => ({ left: `${xPct(pt.x, rtl)}%`, top: `${(pt.y / 220) * 100}%` });
/** Keep a popover inside the hero: pin it to the near edge at either end of the arc. */
const popSide = (left: number) => (left < 22 ? "start-pin" : left > 78 ? "end-pin" : "centre");

type Key = Prayer | "now";

/**
 * A popover opens above its marker. This caps its height to the room left between the marker and the
 * top of the hero, so a long list scrolls inside instead of being cut off on any screen size.
 */
function fitAbove(gap: number) {
  return (el: HTMLDivElement | null) => {
    const hero = el?.closest("section");
    const anchor = el?.parentElement;
    if (!el || !hero || !anchor) return;
    const room = anchor.getBoundingClientRect().top - hero.getBoundingClientRect().top - gap - 8;
    el.style.maxHeight = `${Math.max(120, room)}px`;
  };
}

export function DayArc({ prayers, counts, lessons, locale }: { prayers: Record<Prayer, string>; counts: ArcCounts; lessons: ArcLesson[]; locale: Locale }) {
  const ar = locale === "ar";
  const now = useNow(15_000);
  const weather = useWeather();
  const [open, setOpen] = useState<Key | null>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const closer = useRef<number | undefined>(undefined);
  const pointer = useRef("mouse");

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => !wrap.current?.contains(e.target as Node) && setOpen(null);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", away);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  const hover = (k: Key) => ({
    onPointerEnter: (e: RPointerEvent) => {
      if (e.pointerType !== "mouse") return;
      window.clearTimeout(closer.current);
      setOpen(k);
    },
    onPointerLeave: (e: RPointerEvent) => {
      if (e.pointerType !== "mouse") return;
      closer.current = window.setTimeout(() => setOpen((o) => (o === k ? null : o)), 220);
    },
  });

  const progress = now === null ? 0 : arcFraction(now, prayers);
  const sun = pointAt(progress);
  const up = now !== null && sunIsUp(now, prayers);
  const phase = now === null ? 0 : moonPhase(now);
  const clear = !weather || weather.kind === "clear";

  return (
    <div ref={wrap} className="relative h-44 md:h-56">
      <svg viewBox="0 0 1000 220" preserveAspectRatio="none" className="absolute inset-0 size-full" style={ar ? { transform: "scaleX(-1)" } : undefined} aria-hidden="true">
        <path d={`M${P0.x} ${P0.y} Q${P1.x} ${P1.y} ${P2.x} ${P2.y}`} fill="none" stroke="rgb(255 255 255 / 0.4)" strokeWidth="1.5" strokeDasharray="2 7" vectorEffect="non-scaling-stroke" />
        {progress > 0 && (
          <path d={travelledPath(progress)} fill="none" stroke="var(--gold-bright)" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" className="arc-trail" />
        )}
      </svg>

      {PRAYERS.map((p) => {
        const atIso = prayers[p];
        const at = new Date(atIso).getTime();
        const pos = pointAt(arcFraction(at, prayers));
        const left = xPct(pos.x, ar);
        const passed = now !== null && now > at + 90 * 60_000;
        const c = counts[p];
        const list = lessons.filter((l) => l.prayer === p);
        const isOpen = open === p;
        // Maghrib and Isha are close together, so Isha's label sits above its dot.
        const above = p === "isha";
        return (
          <div
            key={p}
            className={`absolute flex items-center ${above ? "flex-col-reverse" : "flex-col"} ${isOpen ? "z-30" : "z-10"}`}
            style={{ ...pct(pos, ar), transform: above ? "translate(-50%, calc(-100% + 7px))" : "translate(-50%, -7px)" }}
            {...hover(p)}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-label={`${t(locale, p)}, ${formatClock(new Date(atIso), locale)}`}
              onPointerDown={(e) => (pointer.current = e.pointerType)}
              onClick={(e) => {
                // A mouse already sees the list on hover, so its click jumps to the duroos; a tap or a keyboard
                // Enter (detail 0, no pointer) opens the list.
                if (pointer.current === "mouse" && e.detail > 0 && c.total > 0) {
                  document.getElementById(`after-${p}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                } else setOpen((o) => (o === p ? null : p));
              }}
              className={`group flex cursor-pointer items-center ${above ? "flex-col-reverse" : "flex-col"}`}
            >
              <span
                className={`block size-3.5 rounded-full border-2 transition group-hover:scale-125 ${isOpen ? "scale-125" : ""} ${
                  passed ? "border-white/60 bg-white/35" : "border-gold-bright bg-brand-deep"
                } ${c.live ? "live-ring border-live bg-live" : ""}`}
              />
              <span
                className={`arc-label ${above ? "mb-1.5" : "mt-1.5"} whitespace-nowrap rounded-xl px-2.5 py-1 text-center leading-tight transition group-hover:-translate-y-0.5 ${
                  passed ? "text-white/70" : "text-white"
                } ${isOpen ? "ring-1 ring-gold-bright/70" : ""}`}
              >
                <span className="block font-heading text-[13px] font-semibold md:text-base">{t(locale, p)}</span>
                <span className="hidden text-[11px] text-white/80 tabular sm:block md:text-xs" dir="ltr">
                  {formatClock(new Date(atIso), locale)}
                </span>
                {c.total > 0 && (
                  <span className={`mt-1 hidden rounded-full px-2 py-0.5 sm:inline-block text-[10.5px] font-semibold md:text-[11px] ${c.live ? "bg-live text-white" : "bg-white/15 text-white"}`}>
                    {c.live ? (ar ? "مباشر الآن" : "Live now") : ar ? arCount(c.total, "dars") : enCount(c.total, "dars", "duroos")}
                  </span>
                )}
              </span>
            </button>

            {isOpen && (
              <div ref={fitAbove(8)} className={`pop arc-pop ${popSide(left)} bottom-full mb-2 overflow-y-auto overscroll-contain`} role="dialog" aria-label={`${t(locale, "after")} ${t(locale, p)}`}>
                <p className="flex items-baseline gap-2 border-b border-line pb-2">
                  <span className="font-heading text-base font-bold">
                    {t(locale, "after")} {t(locale, p)}
                  </span>
                  <span className="text-xs text-muted tabular" dir="ltr">
                    {formatClock(new Date(atIso), locale)}
                  </span>
                </p>
                {list.length === 0 ? (
                  <p className="pt-2 text-sm text-muted">{ar ? "لا دروس بعد هذه الصلاة اليوم." : `No duroos after ${t(locale, p)} today.`}</p>
                ) : (
                  <ul className="divide-y divide-line">
                    {list.slice(0, 4).map((l) => (
                      <li key={l.slug} className={`py-2 ${l.off ? "opacity-60" : ""}`}>
                        <a href={`${ar ? "/ar" : ""}/duroos/lesson/${l.slug}`} className="block text-sm font-semibold leading-snug hover:text-primary" dir="auto">
                          {l.live && <span className="me-1.5 inline-block size-2 rounded-full bg-live align-middle live-dot" />}
                          {l.book}
                        </a>
                        <p className="mt-0.5 text-xs text-muted">
                          <a href={`${ar ? "/ar" : ""}/duroos/shaykh/${l.shaykhSlug}`} className="hover:text-primary hover:underline" dir="auto">
                            {l.shaykh}
                          </a>
                          {", "}
                          <a href={l.map} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline" dir="auto">
                            {l.masjid}
                          </a>
                          {l.off && <span className="font-semibold text-cancel">{ar ? "، ملغى" : ", cancelled"}</span>}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
                {list.length > 0 && (
                  <a
                    href={`#after-${p}`}
                    onClick={() => setOpen(null)}
                    className="mt-1 flex items-center gap-1.5 rounded-lg bg-primary-soft px-3 py-2 text-sm font-semibold text-primary hover:brightness-95"
                  >
                    <ArrowDown size={15} aria-hidden="true" />
                    {ar ? `كل الدروس بعد ${t(locale, p)}` : list.length > 4 ? `All ${list.length} after ${t(locale, p)}` : `See them below`}
                  </a>
                )}
              </div>
            )}
          </div>
        );
      })}

      {now !== null && (
        <div className={`absolute ${open === "now" ? "z-30" : "z-20"} arc-now`} style={pct(sun, ar)} {...hover("now")}>
          <button
            type="button"
            onClick={() => setOpen((o) => (o === "now" ? null : "now"))}
            aria-expanded={open === "now"}
            aria-label={ar ? "الآن" : "Now"}
            className="arc-body grid -translate-x-1/2 -translate-y-1/2 place-items-center"
            data-sun={up ? "up" : "down"}
            data-clear={clear ? "" : undefined}
          >
            {up ? <span className="sun-disc" /> : <MoonDisc phase={phase} size={34} className="moon-glow" />}
          </button>
          {open === "now" && (
            <div ref={fitAbove(24)} className={`pop arc-pop ${popSide(xPct(sun.x, ar))} bottom-full mb-6 w-60 overflow-y-auto overscroll-contain`} role="dialog" aria-label={ar ? "الآن" : "Now"}>
              <p className="flex items-baseline justify-between border-b border-line pb-2">
                <span className="font-heading text-base font-bold">{ar ? "الآن في المدينة" : "Now in Madinah"}</span>
                <span className="text-sm text-muted tabular" dir="ltr">
                  {formatClock(new Date(now), locale)}
                </span>
              </p>
              {weather && (
                <div className="pt-2">
                  <p className="mb-2 flex items-baseline gap-2">
                    <span className="font-heading text-2xl font-bold tabular">{ar ? toArabicDigits(weather.tempC) : weather.tempC}°C</span>
                    <span className="text-sm text-muted">{ar ? weather.labelAr : weather.label}</span>
                  </p>
                  <WeatherDetails w={weather} locale={locale} />
                </div>
              )}
              {!up && (
                <p className="mt-2 border-t border-line pt-2 text-sm text-muted">
                  {moonName(phase, ar)}, {ar ? `${toArabicDigits(Math.round(moonLit(phase) * 100))}٪ مضاء` : `${Math.round(moonLit(phase) * 100)}% lit`}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
