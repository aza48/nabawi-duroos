"use client";

import { useId } from "react";

export type Lang = "en" | "ar";

/**
 * English | Arabic tabs for the guide and answer forms. Both panels stay mounted (only hidden), so the
 * editor keeps its text and undo history when switching, and one save sends both languages.
 */
export function LangTabs({ lang, onChange, hasArabic, en, ar }: {
  lang: Lang;
  onChange: (l: Lang) => void;
  /** Shows "Not translated" on the Arabic tab while it is empty. */
  hasArabic: boolean;
  en: React.ReactNode;
  ar: React.ReactNode;
}) {
  const uid = useId();
  const tabs: { id: Lang; label: React.ReactNode }[] = [
    { id: "en", label: "English" },
    {
      id: "ar",
      label: (
        <>
          <span lang="ar">العربية</span>
          {!hasArabic && <span className="ms-1.5 rounded-full bg-bg-2 px-2 py-0.5 text-xs font-medium text-muted">Not translated</span>}
        </>
      ),
    },
  ];
  return (
    <div className="min-w-0">
      <div role="tablist" aria-label="Language" className="flex gap-1 border-b border-line">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`${uid}-${t.id}`}
            aria-selected={lang === t.id}
            aria-controls={`${uid}-${t.id}-panel`}
            tabIndex={lang === t.id ? 0 : -1}
            onClick={() => onChange(t.id)}
            onKeyDown={(e) => {
              if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
              const next: Lang = t.id === "en" ? "ar" : "en";
              onChange(next);
              document.getElementById(`${uid}-${next}`)?.focus();
            }}
            className={`relative flex min-h-11 shrink-0 items-center px-4 text-sm font-semibold transition-colors ${
              lang === t.id ? "text-primary after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:rounded-full after:bg-primary" : "text-muted hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`${uid}-en-panel`} aria-labelledby={`${uid}-en`} data-lang="en" hidden={lang !== "en"} className="grid gap-4 pt-4">
        {en}
      </div>
      <div role="tabpanel" id={`${uid}-ar-panel`} aria-labelledby={`${uid}-ar`} data-lang="ar" hidden={lang !== "ar"} className="grid gap-4 pt-4">
        {ar}
      </div>
    </div>
  );
}

/** The panel holding a field the browser flagged as invalid, so the form can show it before the browser points at it. */
export function langOf(target: EventTarget): Lang | null {
  const l = (target as Element).closest?.("[data-lang]")?.getAttribute("data-lang");
  return l === "en" || l === "ar" ? l : null;
}

/** True when a field shows something: visible text or an image (an emptied editor still sends "<p></p>"). */
export const hasText = (s: string | null | undefined) =>
  !!s && (/<img\b/i.test(s) || s.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim().length > 0);

/**
 * The fields that differ from what was last loaded or saved. Untouched fields are left out, so the
 * server keeps what it holds: Arabic added meanwhile by the content sync or another editor survives a
 * save that only fixed the English. A field emptied on purpose is sent as "" and clears it.
 */
export function changedFields<T extends Record<string, string>>(now: T, saved: T): Partial<T> {
  const norm = (s: string) => (hasText(s) ? s : "");
  return Object.fromEntries(Object.entries(now).filter(([k, x]) => norm(x) !== norm(saved[k]))) as Partial<T>;
}
