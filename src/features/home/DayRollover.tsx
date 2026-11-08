"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { riyadhDateIso } from "@/lib/time/riyadh";

/**
 * Cached pages carry the day they were rendered on. When the Riyadh date moves past it
 * (a tab left open overnight, or the first visitor after midnight getting the stale copy),
 * refresh so the date, prayer times and today's duroos are today's.
 */
export function DayRollover({ date }: { date: string }) {
  const router = useRouter();
  useEffect(() => {
    const check = () => {
      if (riyadhDateIso(new Date()) !== date) router.refresh();
    };
    check();
    const id = setInterval(check, 60_000);
    document.addEventListener("visibilitychange", check);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", check);
    };
  }, [date, router]);
  return null;
}
