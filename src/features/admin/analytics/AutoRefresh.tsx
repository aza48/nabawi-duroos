"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Re-runs the server page every few seconds while the tab is visible. */
export function AutoRefresh({ seconds }: { seconds: number }) {
  const router = useRouter();
  useEffect(() => {
    const t = window.setInterval(() => {
      if (document.visibilityState === "visible") router.refresh();
    }, seconds * 1000);
    return () => window.clearInterval(t);
  }, [router, seconds]);
  return null;
}
