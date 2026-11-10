"use client";

import { useEffect, useState } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { readVotes, USEFUL_STORAGE_KEY, votePath, withVote, type UsefulKind } from "./useful";

const TEXT = {
  en: { ask: "Was this useful?", yes: "Yes", no: "No", thanks: "Thank you. Your answer helps us improve this page." },
  ar: { ask: "هل كانت هذه الصفحة مفيدة؟", yes: "نعم", no: "لا", thanks: "شكرًا لك، فإجابتك تساعدنا على تحسين هذه الصفحة." },
};

function ids(): { v: string; s: string } | null {
  try {
    const v = localStorage.getItem("mesh_vid");
    const s = JSON.parse(localStorage.getItem("mesh_sid") ?? "null")?.id;
    return v && s ? { v, s } : null;
  } catch {
    return null;
  }
}

/** "Was this useful?" yes or no under a guide or an answer. One vote per page per device; hidden when printing. */
export function WasThisUseful({ kind, locale = "en", className = "" }: { kind: UsefulKind; locale?: "en" | "ar"; className?: string }) {
  const t = TEXT[locale];
  const [voted, setVoted] = useState<0 | 1 | null>(null);

  useEffect(() => {
    try {
      const v = readVotes(localStorage.getItem(USEFUL_STORAGE_KEY))[votePath(window.location.pathname)];
      if (v === 0 || v === 1) setVoted(v);
    } catch {}
  }, []);

  function vote(yes: boolean) {
    const path = votePath(window.location.pathname);
    setVoted(yes ? 1 : 0);
    try {
      localStorage.setItem(USEFUL_STORAGE_KEY, JSON.stringify(withVote(readVotes(localStorage.getItem(USEFUL_STORAGE_KEY)), path, yes)));
    } catch {}
    const who = ids();
    if (!who) return;
    const e = (crypto.randomUUID?.() ?? `${Date.now()}${Math.random()}`).replace(/[^A-Za-z0-9_-]/g, "");
    try {
      void fetch("/api/v1/track", {
        method: "POST",
        headers: { "content-type": "application/json" },
        keepalive: true,
        credentials: "omit",
        body: JSON.stringify({ t: "rate", v: who.v, s: who.s, e, path, label: kind, value: yes ? 1 : 0 }),
      }).catch(() => {});
    } catch {}
  }

  const btn = "inline-flex min-h-10 items-center gap-1.5 rounded-full border border-line bg-card px-4 py-2 text-sm font-semibold transition hover:border-primary/50";
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`} aria-live="polite" data-noprint>
      {voted === null ? (
        <>
          <p className="text-sm font-semibold">{t.ask}</p>
          <div className="flex gap-2" role="group" aria-label={t.ask}>
            <button type="button" className={btn} onClick={() => vote(true)}><ThumbsUp size={15} aria-hidden="true" /> {t.yes}</button>
            <button type="button" className={btn} onClick={() => vote(false)}><ThumbsDown size={15} aria-hidden="true" /> {t.no}</button>
          </div>
        </>
      ) : (
        <p className="text-sm text-muted">{t.thanks}</p>
      )}
    </div>
  );
}
