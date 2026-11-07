"use client";

import { useEffect, useId, useState } from "react";

export type Tab = { id: string; label: string; content: React.ReactNode };

/** Accessible tabs that remember the open tab in the URL hash, so links and the back button work. */
export function Tabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const uid = useId();
  useEffect(() => {
    const h = window.location.hash.slice(1);
    if (tabs.some((t) => t.id === h)) setActive(h);
  }, [tabs]);
  const pick = (id: string) => {
    setActive(id);
    history.replaceState(null, "", `#${id}`);
  };
  return (
    <div>
      <div role="tablist" className="-mx-4 flex gap-1 overflow-x-auto border-b border-line px-4 [scrollbar-width:none] md:mx-0 md:px-0">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            id={`${uid}-${t.id}`}
            aria-selected={active === t.id}
            aria-controls={`${uid}-${t.id}-panel`}
            onClick={() => pick(t.id)}
            onKeyDown={(e) => {
              const i = tabs.findIndex((x) => x.id === t.id);
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                const next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
                pick(next.id);
                document.getElementById(`${uid}-${next.id}`)?.focus();
              }
            }}
            className={`relative shrink-0 px-4 py-3 text-sm font-semibold transition-colors ${
              active === t.id ? "text-primary after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:rounded-full after:bg-primary" : "text-muted hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t) => (
        <div key={t.id} role="tabpanel" id={`${uid}-${t.id}-panel`} aria-labelledby={`${uid}-${t.id}`} hidden={active !== t.id} className="pt-6">
          {t.content}
        </div>
      ))}
    </div>
  );
}
