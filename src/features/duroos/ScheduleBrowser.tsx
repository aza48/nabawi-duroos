"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import type { ScheduleRow } from "@/server/duroos/queries";
import type { MasjidRow } from "@/server/duroos/queries";
import type { Locale } from "@/lib/locale";
import { PRAYERS } from "@/lib/time/prayer";
import { DAY_KEYS, t } from "./strings";

type Week = { byDay: Record<number, ScheduleRow[]>; daysNotStated: ScheduleRow[] };

function riyadhWeekday(): number {
  const name = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Riyadh", weekday: "short" }).format(new Date());
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(name);
}

export function ScheduleBrowser({ week, masjids, locale }: { week: Week; masjids: MasjidRow[]; locale: Locale }) {
  const ar = locale === "ar";
  const [day, setDay] = useState<number>(6);
  const [masjid, setMasjid] = useState<string>("all");
  const [today, setToday] = useState<number>(-1);
  useEffect(() => {
    const d = riyadhWeekday();
    setDay(d);
    setToday(d);
  }, []);

  const used = useMemo(() => {
    const ids = new Set<string>();
    Object.values(week.byDay).forEach((rows) => rows.forEach((r) => ids.add(r.masjidId)));
    week.daysNotStated.forEach((r) => ids.add(r.masjidId));
    return masjids.filter((m) => ids.has(m.id));
  }, [week, masjids]);

  const rows = (week.byDay[day] ?? []).filter((r) => masjid === "all" || r.masjidId === masjid);
  const unstated = week.daysNotStated.filter((r) => masjid === "all" || r.masjidId === masjid);
  const base = ar ? "/ar/duroos" : "/duroos";

  return (
    <div>
      <div className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-2 [scrollbar-width:none]">
        {DAY_KEYS.map((k, i) => (
          <button
            key={k}
            type="button"
            onClick={() => setDay(i)}
            aria-pressed={day === i}
            className={`flex min-w-14 shrink-0 flex-col items-center rounded-xl px-2.5 py-2 text-sm font-semibold transition ${
              day === i ? "bg-primary text-primary-ink" : "border border-line bg-card text-muted"
            }`}
          >
            {t(locale, k)}
            {i === today && <span className="text-[10px] font-medium opacity-80">{t(locale, "today")}</span>}
          </button>
        ))}
      </div>
      <div className="-mx-4 mt-1 flex gap-1.5 overflow-x-auto px-4 pb-3 [scrollbar-width:none]">
        {[{ id: "all", shortEn: t("en", "allMasjids"), shortAr: t("ar", "allMasjids") }, ...used].map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMasjid(m.id)}
            aria-pressed={masjid === m.id}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              masjid === m.id ? "bg-ink text-bg" : "border border-line bg-card text-muted"
            }`}
          >
            {ar ? m.shortAr : m.shortEn}
          </button>
        ))}
      </div>

      {PRAYERS.map((p) => {
        const group = rows.filter((r) => r.prayer === p);
        if (!group.length) return null;
        return (
          <section key={p} className="mb-5">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">
              {t(locale, "after")} {t(locale, p)}
            </h2>
            <div className="grid gap-2">
              {group.map((r) => (
                <Row key={r.slug} r={r} locale={locale} base={base} />
              ))}
            </div>
          </section>
        );
      })}
      {rows.length === 0 && <p className="card p-4 text-center text-sm text-muted">{t(locale, "noLessonsToday")}</p>}

      {unstated.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-muted">{t(locale, "daysNotStated")}</h2>
          <div className="grid gap-2">
            {unstated.map((r) => (
              <Row key={r.slug} r={r} locale={locale} base={base} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Row({ r, locale, base }: { r: ScheduleRow; locale: Locale; base: string }) {
  const ar = locale === "ar";
  return (
    <Link href={`${base}/lesson/${r.slug}`} className="card block p-3 transition hover:border-primary">
      <p className="text-sm font-semibold">{ar ? r.shaykh.nameAr : r.shaykh.nameEn}</p>
      <p className="ar-text text-[15px] leading-snug">{r.bookAr}</p>
      {!ar && <p className="text-sm text-muted">{r.bookEn}</p>}
      <p className="mt-1 flex items-start gap-1 text-xs text-muted">
        <MapPin size={12} className="mt-0.5 shrink-0" />
        {ar ? r.masjid.shortAr : r.masjid.shortEn} · {ar ? r.locationAr : r.locationEn}
      </p>
    </Link>
  );
}
