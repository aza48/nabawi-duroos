"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Share2 } from "lucide-react";
import { shareOrCopy, type ShareResult } from "./share";

const TEXT = {
  en: { share: "Share", copied: "Link copied", failed: "Could not copy the link. Copy this page's address yourself." },
  ar: { share: "مشاركة", copied: "تم نسخ الرابط", failed: "تعذّر نسخ الرابط، فانسخ عنوان الصفحة بنفسك." },
};

/**
 * Share this page: the phone's share sheet where there is one, otherwise the link is copied.
 * "Link copied" shows only when the copy really worked. Hidden when printing.
 */
export function ShareButton({ title, text, locale = "en", tone = "plain", className = "" }: { title: string; text?: string; locale?: "en" | "ar"; tone?: "plain" | "band"; className?: string }) {
  const t = TEXT[locale];
  const [result, setResult] = useState<ShareResult | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const alive = useRef(true);
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function onClick() {
    const url = window.location.href.split("#")[0];
    // Clear first, so a second copy changes the live region and is announced again.
    setResult(null);
    const r = await shareOrCopy({ title, text, url }, navigator, document as never);
    if (!alive.current) return;
    requestAnimationFrame(() => alive.current && setResult(r));
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setResult(null), 2500);
  }

  const look =
    tone === "band"
      ? "bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20"
      : "border border-line bg-card text-ink hover:border-primary/50";
  const message = result === "copied" ? t.copied : result === "failed" ? t.failed : "";
  return (
    <span className={`inline-flex items-center gap-2 ${className}`} data-noprint>
      <button type="button" onClick={onClick} className={`inline-flex min-h-10 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition ${look}`}>
        {result === "copied" ? <Check size={15} aria-hidden="true" /> : <Share2 size={15} aria-hidden="true" />} {t.share}
      </button>
      <span role="status" aria-live="polite" className="text-sm">{message}</span>
    </span>
  );
}
