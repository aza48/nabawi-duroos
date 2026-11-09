"use client";

import { useEffect, useState, type CSSProperties } from "react";
import type { Prayer } from "@/lib/time/prayers";
import { useWeather } from "./useWeather";
import { moonPath, moonPhase, skyColours, sunIsUp } from "./sky";
import { AlbaseerahSchoolDrawing } from "@/components/shell/Albaseerah";

/** The current time, refreshed every `ms`. Null until mounted, so the server and browser render the same. */
export function useNow(ms: number): number | null {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), ms);
    return () => clearInterval(id);
  }, [ms]);
  return now;
}

/** A moon drawn at its real phase for the date. */
export function MoonDisc({ phase, size = 24, className = "" }: { phase: number; size?: number; className?: string }) {
  const lit = moonPath(phase);
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="rgb(190 205 235 / 0.3)" stroke="rgb(245 240 220 / 0.55)" strokeWidth="0.8" />
      <path d={lit} fill="#f5f0dc" />
    </svg>
  );
}

// Clouds drift above the headline and low through the arc, never across the text.
const CLOUDS = [
  { top: "-7%", w: "26rem", delay: "-20s", o: 0.95 },
  { top: "56%", w: "18rem", delay: "-75s", o: 0.75 },
  { top: "-4%", w: "22rem", delay: "-120s", o: 0.85 },
  { top: "62%", w: "28rem", delay: "-150s", o: 0.7 },
  { top: "-10%", w: "34rem", delay: "-45s", o: 0.9 },
];

/**
 * The sky behind the hero: colours that follow the prayer times through the day, stars and the
 * moon at night, then Madinah's live weather on top (clouds, rain, lightning, haze), above Uhud and
 * the minarets in MESH green.
 */
export function HeroSky({ prayers }: { prayers: Record<Prayer, string> }) {
  const now = useNow(60_000);
  const w = useWeather();
  const kind = w?.kind ?? "clear";
  const sky = now === null ? null : skyColours(now, prayers, kind);
  const up = now !== null && sunIsUp(now, prayers);
  const clouds = !w ? 0 : w.kind === "cloudy" ? (w.code === 2 ? 3 : 5) : w.kind === "rain" || w.kind === "storm" ? 5 : w.code === 1 ? 2 : 0;
  const style = {
    ...(sky && { "--sky-top": sky.top, "--sky-mid": sky.mid, "--sky-low": sky.low, "--stars": sky.stars }),
    "--cloud": kind === "rain" || kind === "storm" ? "rgb(150 160 175 / 0.7)" : up ? "rgb(255 255 255 / 0.78)" : "rgb(150 165 195 / 0.3)",
    "--drift": `${Math.max(70, 220 - (w?.windKmh ?? 10) * 5)}s`,
  } as CSSProperties;

  return (
    <div className="hero-sky" data-ready={sky ? "" : undefined} data-weather={kind} data-sun={up ? "up" : "down"} style={style} aria-hidden="true">
      <div className="sky-stars" />
      <div className="sky-stars sky-stars-2" />
      {CLOUDS.slice(0, clouds).map((c, i) => (
        <div key={i} className="sky-cloud" style={{ top: c.top, width: c.w, animationDelay: c.delay, opacity: c.o }} />
      ))}
      {(kind === "rain" || kind === "storm") && (
        <>
          <div className="sky-rain" />
          <div className="sky-rain sky-rain-near" />
        </>
      )}
      {kind === "storm" && <div className="sky-flash" />}
      {kind === "fog" && <div className="sky-haze" />}
      <Skyline />
      {now !== null && (
        <span className="sky-body sm:hidden">
          {up ? <span className="sky-sun" /> : <MoonDisc phase={moonPhase(now)} size={20} className="moon-glow" />}
        </span>
      )}
    </div>
  );
}

/** Minaret silhouette: shaft, two balconies and a crowned top, centred on x. */
function minaret(x: number, top: number) {
  return (
    <g key={x}>
      <rect x={x - 3} y={top + 14} width="6" height={90 - top - 14} />
      <rect x={x - 5} y={top + 30} width="10" height="3" />
      <rect x={x - 4.5} y={top + 52} width="9" height="3" />
      <rect x={x - 2.2} y={top + 6} width="4.4" height="9" />
      <path d={`M${x - 3} ${top + 7}Q${x} ${top - 3} ${x + 3} ${top + 7}Z`} />
      <rect x={x - 0.5} y={top - 7} width="1" height="5" />
    </g>
  );
}

const GATE_TOP = "M4 28Q4 6 27 4Q44 6 50 22Q56 6 73 4Q96 6 96 28";

/** Far off on the plain, a gate of two arches side by side: its roofline is the M of MESH, edged in gold. */
function Gate() {
  return (
    <svg className="sky-gate" viewBox="0 0 100 62">
      <path
        d={`${GATE_TOP}V62H4ZM14 62V33Q14 17 27 16Q40 17 40 33V62ZM60 62V33Q60 17 73 16Q86 17 86 33V62Z`}
        fillRule="evenodd"
        className="gate-body"
      />
      <path d="M14 62V33Q14 17 27 16Q40 17 40 33V62M60 62V33Q60 17 73 16Q86 17 86 33V62" className="gate-inner" />
      <path d={GATE_TOP} className="gate-edge" />
      <path d={GATE_TOP} className="gate-glint" pathLength="100" />
    </svg>
  );
}

/** Jabal Uhud on the horizon and the minarets and domes of the Prophet's Masjid, in brand green. */
function Skyline() {
  return (
    <>
      <svg className="sky-ridge" viewBox="0 0 1000 80" preserveAspectRatio="none">
        <path
          d="M0 80V50C70 44 120 28 190 31C260 34 290 18 360 22C430 26 460 44 530 41C600 38 640 16 720 14C790 12 830 32 890 36C940 39 970 30 1000 32V80Z"
          className="ridge-far"
        />
      </svg>
      <AlbaseerahSchoolDrawing />
      <Gate />
      <svg className="sky-ridge" viewBox="0 0 1000 80" preserveAspectRatio="none">
        <path d="M0 80V64C90 58 170 52 260 56C360 60 420 50 520 54C640 58 720 48 820 54C900 58 960 54 1000 56V80Z" className="ridge-near" />
      </svg>
      <svg className="sky-masjid" viewBox="0 0 260 90" preserveAspectRatio="xMidYMax meet">
        <g className="masjid-body">
          <rect x="22" y="70" width="230" height="20" />
          <path d="M60 70Q72 56 84 70ZM180 70Q192 56 204 70ZM100 70Q108 61 116 70ZM218 70Q226 61 234 70Z" />
          {[30, 92, 172, 244].map((x, i) => minaret(x, i % 3 === 0 ? 8 : 16))}
          <rect x="137" y="60" width="24" height="10" />
          <rect x="148.5" y="30" width="1" height="6" />
        </g>
        <path d="M135 60Q149 34 163 60Z" className="green-dome" />
      </svg>
    </>
  );
}
