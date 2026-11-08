"use client";

import { useEffect, useRef, useState } from "react";
import { Cloud, CloudFog, CloudLightning, CloudRain, Droplets, Moon, Sun, Thermometer, Wind } from "lucide-react";
import type { Locale } from "@/lib/locale";
import { toArabicDigits } from "@/lib/locale";
import type { Weather } from "@/lib/weather";
import { useWeather } from "./useWeather";

/** Feels like, humidity and wind, as rows for a popover. */
export function WeatherDetails({ w, locale }: { w: Weather; locale: Locale }) {
  const ar = locale === "ar";
  const n = (x: number) => (ar ? toArabicDigits(x) : String(x));
  const rows = [
    { Icon: Thermometer, label: ar ? "الإحساس" : "Feels like", value: `${n(w.feelsC)}°C` },
    { Icon: Droplets, label: ar ? "الرطوبة" : "Humidity", value: ar ? `${n(w.humidity)}٪` : `${w.humidity}%` },
    { Icon: Wind, label: ar ? "الرياح" : "Wind", value: ar ? `${n(w.windKmh)} كم/س` : `${w.windKmh} km/h` },
  ];
  return (
    <dl className="grid gap-1.5 text-sm">
      {rows.map(({ Icon, label, value }) => (
        <div key={label} className="flex items-center gap-2">
          <Icon size={15} className="shrink-0 text-accent" aria-hidden="true" />
          <dt className="text-muted">{label}</dt>
          <dd className="ms-auto font-semibold tabular">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** "24°C, sunny in Madinah". Hover or tap for feels like, humidity and wind. */
export function WeatherChip({ locale }: { locale: Locale }) {
  const w = useWeather();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => !box.current?.contains(e.target as Node) && setOpen(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", away);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);
  if (!w) return null;
  const ar = locale === "ar";
  const Icon = w.kind === "rain" ? CloudRain : w.kind === "storm" ? CloudLightning : w.kind === "fog" ? CloudFog : w.kind === "cloudy" ? Cloud : w.isDay ? Sun : Moon;
  const n = (x: number) => (ar ? toArabicDigits(x) : String(x));
  const feels = Math.abs(w.feelsC - w.tempC) >= 3;
  return (
    <span
      ref={box}
      className="relative inline-flex"
      onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="weather-chip inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 -mx-2 text-start transition hover:bg-white/12"
      >
        <Icon size={16} className="text-gold-bright" aria-hidden="true" />
        <span>
          <span className="font-semibold text-white tabular">{n(w.tempC)}°C</span>
          {ar ? ` ${w.labelAr} في المدينة` : `, ${w.label.toLowerCase()} in Madinah`}
          {feels && <span className="text-white/70">{ar ? ` (الإحساس ${n(w.feelsC)}°)` : ` (feels ${w.feelsC}°)`}</span>}
        </span>
      </button>
      {open && (
        <span className="pop absolute start-0 top-full z-30 mt-2 block w-60 rounded-2xl bg-card p-4 text-ink shadow-lg ring-1 ring-line [text-shadow:none]">
          <span className="mb-2 flex items-baseline gap-2">
            <span className="font-heading text-3xl font-bold tabular">{n(w.tempC)}°</span>
            <span className="text-sm text-muted">{ar ? w.labelAr : w.label}</span>
          </span>
          <WeatherDetails w={w} locale={locale} />
        </span>
      )}
    </span>
  );
}
