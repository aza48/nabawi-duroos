"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import type { Manuscript } from "@/content/library";

/** Search 300+ manuscript-library channels by name or country. Shows 24 at a time. */
export function ManuscriptDirectory({ items }: { items: Manuscript[] }) {
  const [q, setQ] = useState("");
  const [country, setCountry] = useState<string | null>(null);
  const [limit, setLimit] = useState(24);
  const countries = useMemo(() => {
    const c = new Map<string, number>();
    items.forEach((m) => m.country && c.set(m.country, (c.get(m.country) ?? 0) + 1));
    return [...c.entries()].sort((a, b) => b[1] - a[1]);
  }, [items]);
  const shown = items.filter((m) => (!country || m.country === country) && (!q || m.name.includes(q) || m.name.toLowerCase().includes(q.toLowerCase())));

  return (
    <div>
      <label className="flex items-center gap-3 rounded-2xl border border-line bg-card px-4 py-3 focus-within:border-primary">
        <Search size={19} className="shrink-0 text-muted" />
        <span className="sr-only">Search manuscript libraries</span>
        <input value={q} onChange={(e) => { setQ(e.target.value); setLimit(24); }} placeholder="Library name, e.g. السليمانية or Topkapı" className="w-full bg-transparent text-base text-ink outline-none placeholder:text-muted" />
      </label>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <button type="button" onClick={() => setCountry(null)} aria-pressed={!country} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${!country ? "bg-primary text-primary-ink" : "border border-line bg-card text-muted"}`}>
          All ({items.length})
        </button>
        {countries.map(([c, n]) => (
          <button key={c} type="button" onClick={() => { setCountry(c); setLimit(24); }} aria-pressed={country === c} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${country === c ? "bg-primary text-primary-ink" : "border border-line bg-card text-muted"}`}>
            <span className="ar-text">{c}</span> ({n})
          </button>
        ))}
      </div>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {shown.slice(0, limit).map((m) => (
          <li key={m.url}>
            <a href={m.url} target="_blank" rel="noopener noreferrer" className="flex h-full items-center justify-between gap-3 rounded-xl border border-line bg-card px-4 py-3 transition-colors hover:border-primary/50">
              <span className="ar-text text-[15px] leading-snug">{m.name}</span>
              <ArrowUpRight size={15} className="shrink-0 text-muted" />
            </a>
          </li>
        ))}
      </ul>
      {shown.length > limit && (
        <button type="button" onClick={() => setLimit((l) => l + 48)} className="mt-4 rounded-full border border-line bg-card px-5 py-2.5 text-sm font-semibold hover:border-primary">
          Show more ({shown.length - limit} left)
        </button>
      )}
      {shown.length === 0 && <p className="mt-4 text-sm text-muted">No library matches that name.</p>}
    </div>
  );
}
