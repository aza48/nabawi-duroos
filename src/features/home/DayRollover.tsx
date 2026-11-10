"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { riyadhDateIso } from "@/lib/time/riyadh";

/**
 * Whether a page rendered on `rendered` should refresh now. Only when the Riyadh day has moved on,
 * the browser is online, and this tab has not already tried for that page and day. Offline, a refresh
 * fails, Next falls back to a full reload, the offline worker serves the same saved copy, and the page
 * would reload itself forever; the once-per-day guard also stops that loop on a weak signal.
 */
export function shouldRefresh(rendered: string, today: string, online: boolean, alreadyTried: boolean): boolean {
  return today !== rendered && online && !alreadyTried;
}

/**
 * Cached pages carry the day they were rendered on. When the Riyadh date moves past it
 * (a tab left open overnight, or the first visitor after midnight getting the stale copy),
 * refresh so the date, prayer times and today's duroos are today's.
 */
export function DayRollover({ date }: { date: string }) {
  const router = useRouter();
  useEffect(() => {
    const key = `mesh-rollover:${location.pathname}:${date}`;
    const tried = () => {
      try {
        return sessionStorage.getItem(key) === "1";
      } catch {
        return false;
      }
    };
    const check = () => {
      if (!shouldRefresh(date, riyadhDateIso(new Date()), navigator.onLine, tried())) return;
      try {
        sessionStorage.setItem(key, "1");
      } catch {
        /* storage blocked: the online check still prevents the offline loop */
      }
      router.refresh();
    };
    // Back online: allow one more try for today.
    const back = () => {
      try {
        sessionStorage.removeItem(key);
      } catch {
        /* nothing stored */
      }
      check();
    };
    check();
    const id = setInterval(check, 60_000);
    document.addEventListener("visibilitychange", check);
    window.addEventListener("online", back);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", check);
      window.removeEventListener("online", back);
    };
  }, [date, router]);
  return null;
}
