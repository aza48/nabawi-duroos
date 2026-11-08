"use client";

import { useState, type ReactNode } from "react";

/** Chips that narrow the programme cards to one audience. Cards carry data-aud and sections data-auds; the rule below hides the rest. */
export function AudienceFilter({ options, children, locale = "en" }: { options: { id: string; label: string }[]; children: ReactNode; locale?: "en" | "ar" }) {
  const [aud, setAud] = useState("all");
  return (
    <div data-for={aud}>
      {aud !== "all" && (
        <style>{`[data-for="${aud}"] [data-aud]:not([data-aud~="${aud}"]),[data-for="${aud}"] [data-auds]:not([data-auds~="${aud}"]){display:none}`}</style>
      )}
      <div role="group" aria-label={locale === "ar" ? "لمن البرنامج" : "Who it is for"} className="mt-4 flex flex-wrap items-center gap-2">
        <span className="me-1 text-sm font-semibold text-muted">{locale === "ar" ? "لمن:" : "For:"}</span>
        {[{ id: "all", label: locale === "ar" ? "الجميع" : "Everyone" }, ...options].map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => setAud(o.id)}
            aria-pressed={aud === o.id}
            className={`min-h-10 rounded-full px-4 py-2 text-sm font-semibold transition ${
              aud === o.id ? "bg-ink text-bg" : "border border-line bg-card text-muted hover:text-ink"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
      {children}
    </div>
  );
}
