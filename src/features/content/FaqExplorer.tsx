"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronRight, Search } from "lucide-react";

type Item = { slug: string; question: string; category: string };
type Cat = { id: string; label: string; labelAr?: string };

/** Filter the verified answers by typing or by topic. Matches every word, in any order. */
export function FaqExplorer({ items, categories, locale = "en" }: { items: Item[]; categories: readonly Cat[]; locale?: "en" | "ar" }) {
  const ar = locale === "ar";
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const shown = useMemo(
    () => items.filter((f) => (cat === "all" || f.category === cat) && words.every((w) => f.question.toLowerCase().includes(w))),
    [items, cat, words.join(" ")] // eslint-disable-line react-hooks/exhaustive-deps
  );
  const used = categories.filter((c) => items.some((f) => f.category === c.id));

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
      <nav aria-label={ar ? "المواضيع" : "Topics"} className="min-w-0 lg:sticky lg:top-24 lg:self-start">
        <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-1 lg:px-0">
          {[{ id: "all", label: "All topics", labelAr: "كل المواضيع" } as Cat, ...used].map((c) => {
            const n = c.id === "all" ? items.length : items.filter((f) => f.category === c.id).length;
            return (
              <li key={c.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setCat(c.id)}
                  aria-pressed={cat === c.id}
                  className={`flex w-full items-center justify-between gap-3 rounded-full px-4 py-2 text-sm font-semibold transition lg:rounded-xl ${
                    cat === c.id ? "bg-primary text-primary-ink" : "border border-line bg-card text-muted hover:text-ink lg:border-transparent lg:bg-transparent"
                  }`}
                >
                  {ar ? (c.labelAr ?? c.label) : c.label}
                  <span className="text-xs opacity-70 tabular">{n}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div>
        <label className="flex items-center gap-3 rounded-2xl border border-line bg-card px-4 py-3 shadow-[var(--shadow)] focus-within:border-primary">
          <Search size={19} className="shrink-0 text-muted" />
          <span className="sr-only">{ar ? "ابحث في الأجوبة" : "Search the answers"}</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={ar ? "Iqama, bus, Absher, rent... (الأسئلة بالإنجليزية)" : "Iqama, bus, Absher, rent, wife's visa..."}
            className="w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"
          />
        </label>
        {shown.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-dashed border-line bg-card p-6 text-center text-muted">
            {ar ? "لا توجد نتيجة بعد. اسأل في مجموعة واتساب، وقد يصبح سؤالك الجواب التالي هنا." : "Nothing matches yet. Ask it in the WhatsApp group and it may become the next answer here."}
          </p>
        ) : (
          <ul className="mt-5 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card">
            {shown.map((f) => (
              <li key={f.slug}>
                <Link href={`${ar ? "/ar" : ""}/ask/${f.slug}`} className="group flex items-center gap-3 px-5 py-4 transition-colors hover:bg-bg-2">
                  <span className="flex-1 font-medium leading-snug group-hover:text-primary" dir="auto">{f.question}</span>
                  <ChevronRight size={18} className="shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-primary rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
