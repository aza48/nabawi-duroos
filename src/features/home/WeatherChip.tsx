"use client";

import { Cloud, CloudFog, CloudLightning, CloudRain, Moon, Sun } from "lucide-react";
import type { Locale } from "@/lib/locale";
import { toArabicDigits } from "@/lib/locale";
import { useWeather } from "./useWeather";

/** "24°C, sunny in Madinah", with feels-like when it differs a lot (summer heat). */
export function WeatherChip({ locale }: { locale: Locale }) {
  const w = useWeather();
  if (!w) return null;
  const ar = locale === "ar";
  const Icon = w.kind === "rain" ? CloudRain : w.kind === "storm" ? CloudLightning : w.kind === "fog" ? CloudFog : w.kind === "cloudy" ? Cloud : w.isDay ? Sun : Moon;
  const n = (x: number) => (ar ? toArabicDigits(x) : String(x));
  const feels = Math.abs(w.feelsC - w.tempC) >= 3;
  return (
    <span className="inline-flex items-center gap-1.5" title={ar ? `الرطوبة ${n(w.humidity)}٪، الرياح ${n(w.windKmh)} كم/س` : `Humidity ${w.humidity}%, wind ${w.windKmh} km/h`}>
      <Icon size={16} className="text-gold-bright" aria-hidden="true" />
      <span>
        <span className="font-semibold text-white tabular">{n(w.tempC)}°C</span>
        {ar ? ` ${w.labelAr} في المدينة` : `, ${w.label.toLowerCase()} in Madinah`}
        {feels && <span className="text-white/65">{ar ? ` (الإحساس ${n(w.feelsC)}°)` : ` (feels ${w.feelsC}°)`}</span>}
      </span>
    </span>
  );
}
