"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { inputCls } from "../ui";

type Row = { slug: string; bookEn: string; bookAr: string; prayer: string; days: number[]; status: string; masjid: string; shaykh: string };
const DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function LessonList({ rows }: { rows: Row[] }) {
  const [q, setQ] = useState("");
  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter((r) => `${r.shaykh} ${r.bookEn} ${r.bookAr} ${r.masjid}`.toLowerCase().includes(s));
  }, [q, rows]);
  return (
    <>
      <div className="relative mb-3">
        <Search size={17} className="absolute start-3.5 top-1/2 -translate-y-1/2 text-muted" />
        <input className={`${inputCls} ps-10`} placeholder="Search shaykh, book or masjid" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <ul className="card divide-y divide-line">
        {shown.map((r) => (
          <li key={r.slug}>
            <Link href={`/admin/duroos/lesson/${r.slug}`} className="block p-3">
              <p className="text-sm font-semibold">{r.shaykh}</p>
              <p className="truncate text-sm text-muted">{r.bookEn}</p>
              <p className="mt-0.5 text-xs text-muted">
                {r.masjid} · <span className="capitalize">{r.prayer}</span> · {r.days.length ? r.days.map((d) => DAY[d]).join(", ") : "days not stated"}
                {r.status !== "active" && <span className="ms-1 font-semibold text-amber">({r.status})</span>}
              </p>
            </Link>
          </li>
        ))}
        {!shown.length && <li className="p-3 text-sm text-muted">Nothing matches.</li>}
      </ul>
    </>
  );
}
