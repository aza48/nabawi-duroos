"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, ExternalLink, Image as ImageIcon, X, Zap } from "lucide-react";
import { plainReason } from "./reason";
import { approveSuggestionAction, dismissSuggestionAction } from "@/app/(admin)/admin/actions";

export type SuggestionCard = {
  id: number; channel: string; when: string; url: string; text: string; imageUrl: string | null;
  reading: string | null; reason: string | null; wouldAuto: boolean; failed: boolean;
};

export function Suggestions({ items }: { items: SuggestionCard[] }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const act = (fn: () => Promise<{ ok: boolean; error?: string }>) =>
    start(async () => {
      setError(null);
      const r = await fn();
      if (!r.ok) setError(r.error ?? "Something went wrong.");
      router.refresh();
    });

  return (
    <div className="grid gap-2.5">
      {error && <p role="alert" className="rounded-xl bg-cancel-bg px-3 py-2 text-sm text-cancel">{error}</p>}
      {items.map((s) => (
        <article key={s.id} className="card p-3.5">
          <div className="mb-1.5 flex items-center justify-between gap-2 text-xs text-muted">
            <span>@{s.channel} · {s.when}</span>
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 underline">Post <ExternalLink size={12} /></a>
          </div>
          <p dir="rtl" className="ar-text line-clamp-4 whitespace-pre-line text-[15px]">{s.text || "(image only)"}</p>
          {s.imageUrl && (
            <a href={s.imageUrl} target="_blank" rel="noopener noreferrer" className="mt-1.5 inline-flex items-center gap-1 text-xs text-muted underline">
              <ImageIcon size={12} /> Flyer
            </a>
          )}
          {s.reading && <p className="mt-2 rounded-lg bg-bg-2 px-2.5 py-1.5 text-sm">{s.reading}</p>}
          {s.reason && (
            <p className={`mt-1.5 flex items-center gap-1 text-xs ${s.wouldAuto ? "text-on" : "text-muted"}`}>
              {s.wouldAuto && <Zap size={12} />} {plainReason(s.reason)}
            </p>
          )}
          <div className="mt-3 flex gap-2">
            {!s.failed && (
              <button type="button" disabled={pending} onClick={() => act(() => approveSuggestionAction(s.id))}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary py-2 text-sm font-semibold text-primary-ink">
                <Check size={15} /> Publish
              </button>
            )}
            <button type="button" disabled={pending} onClick={() => act(() => dismissSuggestionAction(s.id))}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-line py-2 text-sm font-semibold">
              <X size={15} /> Dismiss
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
