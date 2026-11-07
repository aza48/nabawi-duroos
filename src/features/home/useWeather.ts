"use client";

import { useEffect, useState } from "react";
import type { Weather } from "@/lib/weather";

// One request per page, shared by the sky and the temperature chip.
let pending: Promise<Weather | null> | null = null;
const load = () =>
  (pending ??= fetch("/api/v1/weather")
    .then((r) => (r.ok ? (r.json() as Promise<Weather>) : null))
    .catch(() => null));

export function useWeather(): Weather | null {
  const [w, setW] = useState<Weather | null>(null);
  useEffect(() => {
    let alive = true;
    load().then((x) => alive && setW(x));
    return () => {
      alive = false;
    };
  }, []);
  return w;
}
