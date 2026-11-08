"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Search } from "lucide-react";
import { inputCls } from "./ui";

/**
 * A search box over any server-rendered list: list items whose text does not contain every typed
 * word are hidden. Works for English and Arabic; no data has to be passed down.
 */
export function Filterable({ placeholder, children }: { placeholder: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [q, setQ] = useState("");
  const [empty, setEmpty] = useState(false);
  useEffect(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    let shown = 0;
    let total = 0;
    ref.current?.querySelectorAll<HTMLLIElement>("li[data-item]").forEach((li) => {
      total++;
      const match = words.every((w) => (li.textContent ?? "").toLowerCase().includes(w));
      li.hidden = !match;
      if (match) shown++;
    });
    setEmpty(total > 0 && shown === 0);
  }, [q]);
  return (
    <div ref={ref}>
      <div className="relative mb-3">
        <Search size={17} className="absolute start-3.5 top-1/2 -translate-y-1/2 text-muted" />
        <input type="search" className={`${inputCls} ps-10`} placeholder={placeholder} value={q} onChange={(e) => setQ(e.target.value)} aria-label={placeholder} />
      </div>
      {children}
      {empty && <p className="card mt-2 p-3 text-sm text-muted">Nothing matches &quot;{q}&quot;.</p>}
    </div>
  );
}
