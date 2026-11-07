"use client";

import { useEffect, useState } from "react";
import { Moon } from "lucide-react";
import type { Locale } from "@/lib/locale";
import { toArabicDigits } from "@/lib/locale";
import { formatClock } from "@/lib/time/riyadh";
import { PRAYERS, type Prayer } from "@/lib/time/prayer";
import { t } from "@/features/duroos/strings";

export type ArcCounts = Record<Prayer, { total: number; live: number; cancelled: number }>;
export type SkyPhase = "night" | "dawn" | "day" | "afternoon" | "dusk";

/** Where in the day we are, from the prayer times alone. */
export function skyPhase(now: number, p: Record<Prayer, string>): SkyPhase {
  const at = (k: Prayer) => new Date(p[k]).getTime();
  if (now < at("fajr") || now >= at("isha")) return "night";
  if (now < at("fajr") + 90 * 60_000) return "dawn";
  if (now < at("asr")) return "day";
  if (now < at("maghrib")) return "afternoon";
  return "dusk";
}

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
/** Arabic reads right to left, so the day runs from the right. */
const pct = (pt: { x: number; y: number }, rtl = false) => ({ left: `${(rtl ? 1000 - pt.x : pt.x) / 10}%`, top: `${(pt.y / 220) * 100}%` });

export function DayArc({ prayers, counts, locale }: { prayers: Record<Prayer, string>; counts: ArcCounts; locale: Locale }) {
  const ar = locale === "ar";
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);

  const phase = now === null ? "day" : skyPhase(now, prayers);
  const progress = now === null ? 0 : arcFraction(now, prayers);
  const sun = pointAt(progress);
  const num = (n: number) => (ar ? toArabicDigits(n) : String(n));

  return (
    <div>
      <div className="sky pointer-events-none absolute inset-0 -z-10" data-phase={phase} aria-hidden="true" />
      <div className="relative h-44 md:h-56">
        <svg viewBox="0 0 1000 220" preserveAspectRatio="none" className="absolute inset-0 size-full" style={ar ? { transform: "scaleX(-1)" } : undefined} aria-hidden="true">
          <path d={`M${P0.x} ${P0.y} Q${P1.x} ${P1.y} ${P2.x} ${P2.y}`} fill="none" stroke="rgb(255 255 255 / 0.22)" strokeWidth="2" strokeDasharray="2 7" vectorEffect="non-scaling-stroke" />
          <path
            d={`M${P0.x} ${P0.y} Q${P1.x} ${P1.y} ${P2.x} ${P2.y}`}
            fill="none"
            stroke="var(--gold-bright)"
            strokeWidth="3"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={`${progress} 1`}
            vectorEffect="non-scaling-stroke"
            style={{ transition: "stroke-dasharray 1.2s cubic-bezier(.2,.8,.2,1)" }}
          />
          <line x1="0" y1="200" x2="1000" y2="200" stroke="rgb(255 255 255 / 0.18)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>

        {PRAYERS.map((p) => {
          const at = new Date(prayers[p]).getTime();
          const pos = pointAt(arcFraction(at, prayers));
          const passed = now !== null && now > at + 90 * 60_000;
          const c = counts[p];
          // Maghrib and Isha are close together, so Isha's label sits above its dot.
          const above = p === "isha";
          return (
            <a
              key={p}
              href={`#after-${p}`}
              className={`group absolute flex items-center ${above ? "flex-col-reverse" : "flex-col"}`}
              style={{ ...pct(pos, ar), transform: above ? "translate(-50%, calc(-100% + 7px))" : "translate(-50%, -7px)" }}
            >
              <span
                className={`block size-3.5 rounded-full border-2 transition group-hover:scale-125 ${
                  passed ? "border-white/50 bg-white/30" : "border-gold-bright bg-brand-deep"
                } ${c.live ? "live-ring border-live bg-live" : ""}`}
              />
              <span className={`${above ? "mb-1.5" : "mt-1.5"} whitespace-nowrap rounded-lg bg-brand/70 px-2 py-1 text-center leading-tight backdrop-blur-[2px] ${passed ? "text-white/55" : "text-white"}`}>
                <span className="block font-heading text-[13px] font-semibold md:text-base">{t(locale, p)}</span>
                <span className="hidden text-[11px] text-white/70 tabular sm:block md:text-xs" dir="ltr">
                  {formatClock(new Date(prayers[p]), locale)}
                </span>
                {c.total > 0 && (
                  <span
                    className={`mt-1 hidden rounded-full px-2 py-0.5 sm:inline-block text-[10.5px] font-semibold md:text-[11px] ${
                      c.live ? "bg-live text-white" : "bg-white/12 text-white/90 group-hover:bg-white/20"
                    }`}
                  >
                    {c.live
                      ? ar ? "مباشر الآن" : "Live now"
                      : ar ? `${num(c.total)} دروس` : `${c.total} ${c.total === 1 ? "dars" : "duroos"}`}
                  </span>
                )}
              </span>
            </a>
          );
        })}

        {now !== null && (
          <span
            className="sun absolute z-10 grid size-7 place-items-center rounded-full bg-gold-bright text-brand-deep md:size-8"
            style={{ ...pct(sun, ar), transform: "translate(-50%, -50%)" }}
            role="img"
            aria-label={ar ? "الوقت الآن" : "Now"}
          >
            {phase === "night" && <Moon size={15} strokeWidth={2.5} />}
          </span>
        )}
      </div>
    </div>
  );
}
