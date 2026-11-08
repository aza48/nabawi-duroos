import type { Prayer } from "@/lib/time/prayers";
import type { WeatherKind } from "@/lib/weather";

/** The hero sky's colours at a moment: zenith, middle and horizon, plus how bright the stars are. */
export type SkyColours = { top: string; mid: string; low: string; stars: number };
type Stop = { top: number[]; mid: number[]; low: number[]; stars: number };

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const stop = (top: string, mid: string, low: string, stars = 0): Stop => ({ top: hex(top), mid: hex(mid), low: hex(low), stars });

const NIGHT = stop("#050d24", "#0b1d3d", "#143546", 1);
const PREDAWN = stop("#0a1638", "#26305e", "#4b4a7a", 0.8);
const FAJR = stop("#161f4f", "#4b4f8f", "#e39578", 0.45);
const SUNRISE = stop("#2a5a9a", "#7d9fcf", "#ffc58f");
const MORNING = stop("#14599f", "#3a88c9", "#a3d2e6");
const MIDDAY = stop("#11589f", "#348bd0", "#b1dcec");
const AFTERNOON = stop("#1a5694", "#5a93bf", "#efd295");
const GOLDEN = stop("#2c4f84", "#b98762", "#f2a54c");
const SUNSET = stop("#272a62", "#a94b74", "#ee7246", 0.15);
const DUSK = stop("#121842", "#40306a", "#8e4866", 0.55);

const MIN = 60_000;

/** The sky's keyframes for one day, anchored to that day's prayer times. */
function keyframes(p: Record<Prayer, string>): [number, Stop][] {
  const at = (k: Prayer) => new Date(p[k]).getTime();
  return [
    [at("fajr") - 100 * MIN, NIGHT],
    [at("fajr") - 30 * MIN, PREDAWN],
    [at("fajr"), FAJR],
    [at("fajr") + 70 * MIN, SUNRISE],
    [at("fajr") + 150 * MIN, MORNING],
    [at("dhuhr"), MIDDAY],
    [at("asr"), AFTERNOON],
    [at("maghrib") - 35 * MIN, GOLDEN],
    [at("maghrib"), SUNSET],
    [at("maghrib") + 40 * MIN, DUSK],
    [at("isha") + 60 * MIN, NIGHT],
  ];
}

const lerp = (a: number[], b: number[], f: number) => a.map((x, i) => Math.round(x + (b[i] - x) * f));
const rgb = (c: number[]) => `rgb(${c[0]} ${c[1]} ${c[2]})`;

/** How much each kind of weather greys the sky, and towards which colour. */
const OVERCAST: Record<WeatherKind, { amount: number; to: number[] }> = {
  clear: { amount: 0, to: [0, 0, 0] },
  cloudy: { amount: 0.32, to: [120, 132, 145] },
  fog: { amount: 0.38, to: [196, 176, 140] },
  rain: { amount: 0.5, to: [70, 84, 100] },
  storm: { amount: 0.62, to: [44, 50, 66] },
};

/** The sky at `now`, blended smoothly between keyframes and dulled by the weather. */
export function skyColours(now: number, p: Record<Prayer, string>, weather: WeatherKind = "clear"): SkyColours {
  const frames = keyframes(p);
  let s: Stop = NIGHT;
  for (let i = 0; i < frames.length - 1; i++) {
    const [t0, a] = frames[i];
    const [t1, b] = frames[i + 1];
    if (now >= t0 && now < t1) {
      const f = (now - t0) / (t1 - t0);
      s = { top: lerp(a.top, b.top, f), mid: lerp(a.mid, b.mid, f), low: lerp(a.low, b.low, f), stars: a.stars + (b.stars - a.stars) * f };
      break;
    }
  }
  const o = OVERCAST[weather];
  const dull = (c: number[]) => rgb(lerp(c, o.to, o.amount));
  return { top: dull(s.top), mid: dull(s.mid), low: dull(s.low), stars: weather === "clear" ? s.stars : s.stars * 0.25 };
}

/** Whether the sun is up, from the prayer times: about 70 minutes after Fajr until Maghrib. */
export function sunIsUp(now: number, p: Record<Prayer, string>): boolean {
  return now >= new Date(p.fajr).getTime() + 70 * MIN && now < new Date(p.maghrib).getTime();
}

const SYNODIC = 29.530588853;
const NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);

/** The moon's age as a fraction of its cycle: 0 new, 0.5 full, back to 1. */
export function moonPhase(t: number): number {
  const f = ((t - NEW_MOON) / 86_400_000 / SYNODIC) % 1;
  return f < 0 ? f + 1 : f;
}

/** The share of the moon's face that is lit, 0 to 1. */
export const moonLit = (phase: number) => (1 - Math.cos(2 * Math.PI * phase)) / 2;

/** The lit part of the moon as an SVG path in a circle of radius r at (c, c). Waxing is lit on the right. */
export function moonPath(phase: number, r = 10, c = 12): string {
  const k = Math.cos(2 * Math.PI * phase);
  const waxing = phase < 0.5;
  const outer = waxing ? 1 : 0;
  const inner = k > 0 ? 1 - outer : outer;
  const rx = (Math.abs(k) * r).toFixed(2);
  return `M${c} ${c - r}A${r} ${r} 0 0 ${outer} ${c} ${c + r}A${rx} ${r} 0 0 ${inner} ${c} ${c - r}Z`;
}

export function moonName(phase: number, ar = false): string {
  const names = ar
    ? ["هلال جديد", "هلال متزايد", "تربيع أول", "أحدب متزايد", "بدر", "أحدب متناقص", "تربيع أخير", "هلال متناقص"]
    : ["New moon", "Waxing crescent", "First quarter", "Waxing gibbous", "Full moon", "Waning gibbous", "Last quarter", "Waning crescent"];
  return names[Math.round(phase * 8) % 8];
}
