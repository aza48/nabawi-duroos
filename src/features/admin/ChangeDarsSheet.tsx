"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { addOverrideAction } from "@/app/(admin)/admin/actions";
import { btnPrimary, ErrorNote, inputCls, labelCls } from "./ui";

const KINDS = [
  { id: "cancelled", label: "Cancelled" },
  { id: "postponed", label: "Postponed" },
  { id: "moved", label: "Moved" },
  { id: "guest", label: "Guest teacher" },
  { id: "resumed", label: "Back on" },
  { id: "note", label: "Note only" },
] as const;

function riyadhIso(offsetDays = 0): string {
  const d = new Date(Date.now() + offsetDays * 86_400_000);
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Riyadh", year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
}

export function ChangeDarsButton({ lessonSlug, label, title, compact = false }: { lessonSlug: string; label?: string; title: string; compact?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={compact ? "rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-cancel" : "rounded-full bg-cancel-bg px-3.5 py-2 text-sm font-semibold text-cancel"}
      >
        {label ?? "Change"}
      </button>
      {open && <ChangeDarsSheet lessonSlug={lessonSlug} title={title} onClose={() => setOpen(false)} />}
    </>
  );
}

export function ChangeDarsSheet({ lessonSlug, title, onClose }: { lessonSlug: string; title: string; onClose: () => void }) {
  const router = useRouter();
  const [kind, setKind] = useState<(typeof KINDS)[number]["id"]>("cancelled");
  const [when, setWhen] = useState<"today" | "tomorrow" | "custom">("today");
  const [startsOn, setStartsOn] = useState(riyadhIso());
  const [endsOn, setEndsOn] = useState("");
  const [noteEn, setNoteEn] = useState("");
  const [noteAr, setNoteAr] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  function pickWhen(w: typeof when) {
    setWhen(w);
    if (w === "today") setStartsOn(riyadhIso());
    if (w === "tomorrow") setStartsOn(riyadhIso(1));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    start(async () => {
      const res = await addOverrideAction({
        lessonSlug, kind, startsOn, endsOn: endsOn || undefined,
        noteEn: noteEn || null, noteAr: noteAr || null,
      });
      if (!res.ok) return setError(res.error);
      onClose();
      router.refresh();
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 md:items-center" onClick={onClose}>
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92dvh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-card p-5 shadow-2xl md:rounded-3xl"
        style={{ paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom))" }}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Change a dars</p>
            <h2 className="text-lg font-semibold leading-snug">{title}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="grid size-9 place-items-center rounded-full bg-bg-2"><X size={17} /></button>
        </div>

        <p className={labelCls}>What happened?</p>
        <div className="mb-4 grid grid-cols-3 gap-2">
          {KINDS.map((k) => (
            <button key={k.id} type="button" onClick={() => setKind(k.id)} aria-pressed={kind === k.id}
              className={`rounded-xl px-2 py-2.5 text-sm font-semibold ${kind === k.id ? "bg-primary text-primary-ink" : "border border-line"}`}>
              {k.label}
            </button>
          ))}
        </div>

        <p className={labelCls}>When?</p>
        <div className="mb-3 grid grid-cols-3 gap-2">
          {(["today", "tomorrow", "custom"] as const).map((w) => (
            <button key={w} type="button" onClick={() => pickWhen(w)} aria-pressed={when === w}
              className={`rounded-xl px-2 py-2.5 text-sm font-semibold capitalize ${when === w ? "bg-primary text-primary-ink" : "border border-line"}`}>
              {w === "custom" ? "Pick dates" : w}
            </button>
          ))}
        </div>
        {when === "custom" && (
          <div className="mb-3 grid grid-cols-2 gap-2">
            <label className="text-sm">From<input type="date" className={inputCls} value={startsOn} onChange={(e) => setStartsOn(e.target.value)} required /></label>
            <label className="text-sm">Until (optional)<input type="date" className={inputCls} value={endsOn} min={startsOn} onChange={(e) => setEndsOn(e.target.value)} /></label>
          </div>
        )}

        <label className={`${labelCls} mt-2`} htmlFor="noteEn">Note in English (optional)</label>
        <input id="noteEn" className={inputCls} placeholder="The shaykh excused himself" value={noteEn} onChange={(e) => setNoteEn(e.target.value)} />
        <label className={`${labelCls} mt-3`} htmlFor="noteAr">Note in Arabic (optional)</label>
        <input id="noteAr" dir="rtl" className={inputCls} placeholder="يعتذر الشيخ عن الدرس" value={noteAr} onChange={(e) => setNoteAr(e.target.value)} />

        <button className={`${btnPrimary} mt-5`} disabled={pending}>{pending ? "Saving…" : "Publish change"}</button>
        <p className="mt-2 text-center text-xs text-muted">Goes live on the site straight away. You can undo it from Activity.</p>
        {error && <ErrorNote>{error}</ErrorNote>}
      </form>
    </div>
  );
}
