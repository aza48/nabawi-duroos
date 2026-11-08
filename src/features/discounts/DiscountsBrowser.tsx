"use client";

import { useState } from "react";
import { BadgePercent, GraduationCap, Search } from "lucide-react";
import type { OfferGroup } from "@/content/discounts";

/** Browse the University's partner offers by category, by name, or students-only. */
export function DiscountsBrowser({ groups, locale = "en" }: { groups: OfferGroup[]; locale?: "en" | "ar" }) {
  const ar = locale === "ar";
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const [studentsOnly, setStudentsOnly] = useState(false);
  const needle = q.trim().toLowerCase();
  const visible = groups
    .filter((g) => cat === "all" || g.id === cat)
    .map((g) => ({
      ...g,
      offers: g.offers.filter(
        (o) => (!studentsOnly || o.students) && (!needle || o.name.includes(q.trim()) || (o.nameEn ?? "").toLowerCase().includes(needle) || o.deal.toLowerCase().includes(needle))
      ),
    }))
    .filter((g) => g.offers.length);

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <label className="flex flex-1 items-center gap-3 rounded-2xl border border-line bg-card px-4 py-3 focus-within:border-primary">
          <Search size={19} className="shrink-0 text-muted" />
          <span className="sr-only">{ar ? "ابحث في العروض" : "Search offers"}</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={ar ? "أسنان، نظارات، تأجير سيارات، مغسلة..." : "Dentist, glasses, car rental, laundry..."} className="w-full bg-transparent outline-none placeholder:text-muted" />
        </label>
        <button
          type="button"
          onClick={() => setStudentsOnly((v) => !v)}
          aria-pressed={studentsOnly}
          className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition ${studentsOnly ? "bg-primary text-primary-ink" : "border border-line bg-card"}`}
        >
          <GraduationCap size={17} /> {ar ? "تذكر الطلاب" : "Named for students"}
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {[{ id: "all", label: "Everything", labelAr: "الكل" }, ...groups].map((g) => (
          <button key={g.id} type="button" onClick={() => setCat(g.id)} aria-pressed={cat === g.id} className={`rounded-full px-3.5 py-1.5 text-sm font-semibold ${cat === g.id ? "bg-ink text-bg" : "border border-line bg-card text-muted hover:text-ink"}`}>
            {ar ? g.labelAr : g.label}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-12">
        {visible.map((g) => (
          <section key={g.id}>
            <h2 className="font-heading text-2xl font-bold">{ar ? g.labelAr : g.label}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {g.offers.map((o) => (
                <article key={o.name} className="flex gap-3 rounded-2xl border border-line bg-card p-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gold-bg text-gold">
                    <BadgePercent size={19} />
                  </span>
                  <div className="min-w-0">
                    {ar ? (
                      <>
                        <p className="ar-text font-semibold leading-snug">{o.name}</p>
                        {o.nameEn && <p className="text-sm text-muted" dir="auto" lang="en">{o.nameEn}</p>}
                      </>
                    ) : (
                      <>
                        <p className="font-semibold leading-snug">{o.nameEn ?? o.name}</p>
                        {o.nameEn && <p className="ar-text text-sm text-muted">{o.name}</p>}
                      </>
                    )}
                    <p className="mt-1.5 text-sm leading-relaxed" dir="auto">{o.deal}</p>
                    {o.students && <span className="mt-2 inline-block rounded-full bg-on-bg px-2 py-0.5 text-[11px] font-bold text-on">{ar ? "تذكر الطلاب" : "Students named"}</span>}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
        {visible.length === 0 && <p className="text-muted">{ar ? "لا يوجد عرض مطابق. جرّب كلمة أخرى." : "No offer matches. Try another word."}</p>}
      </div>
    </div>
  );
}
