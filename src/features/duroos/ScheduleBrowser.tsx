"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import type { ScheduleRow } from "@/server/duroos/queries";
import type { MasjidRow } from "@/server/duroos/queries";
import type { Locale } from "@/lib/locale";
import { PRAYERS } from "@/lib/time/prayers";
import { DAY_KEYS, t } from "./strings";
import { SistersTag } from "./StatusTag";

type Week = { byDay: Record<number, ScheduleRow[]>; daysNotStated: ScheduleRow[] };

function riyadhWeekday(): number {
  const name = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Riyadh", weekday: "short" }).format(new Date());
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(name);
}

export function ScheduleBrowser({ week, masjids, locale }: { week: Week; masjids: MasjidRow[]; locale: Locale }) {
  const ar = locale === "ar";
  const [day, setDay] = useState<number>(6);
  const [masjid, setMasjid] = useState<string>("all");
  const [prayer, setPrayer] = useState<string>("all");
  const shown = PRAYERS.filter((p) => prayer === "all" || p === prayer);
  const [today, setToday] = useState<number>(-1);
  useEffect(() => {
    const d = riyadhWeekday();
    setDay(d);
    setToday(d);
    // Links from lesson pages and the day arc can open the schedule filtered: ?prayer=maghrib&masjid=nabawi
    const q = new URLSearchParams(window.location.search);
    const p = q.get("prayer");
    if (p && (PRAYERS as readonly string[]).includes(p)) setPrayer(p);
    const m = q.get("masjid");
    if (m && masjids.some((x) => x.id === m)) setMasjid(m);
  }, [masjids]);

  const used = useMemo(() => {
    const ids = new Set<string>();
    Object.values(week.byDay).forEach((rows) => rows.forEach((r) => ids.add(r.masjidId)));
    week.daysNotStated.forEach((r) => ids.add(r.masjidId));
    return masjids.filter((m) => ids.has(m.id));
  }, [week, masjids]);

  const rows = (week.byDay[day] ?? []).filter((r) => masjid === "all" || r.masjidId === masjid);
  const unstated = week.daysNotStated.filter((r) => (masjid === "all" || r.masjidId === masjid) && (prayer === "all" || r.prayer === prayer));
  const base = ar ? "/ar/duroos" : "/duroos";

  return (
    <div>
      <div className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:hidden">
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

      <div className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-3 [scrollbar-width:none]" role="group" aria-label={ar ? "الصلاة" : "Prayer"}>
        {["all", ...PRAYERS].map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPrayer(p)}
            aria-pressed={prayer === p}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              prayer === p ? "bg-ink text-bg" : "border border-line bg-card text-muted"
            }`}
          >
            {p === "all" ? (ar ? "كل الأوقات" : "All times") : `${t(locale, "after")} ${t(locale, p as (typeof PRAYERS)[number])}`}
          </button>
        ))}
      </div>

      <WeekGrid week={week} masjid={masjid} prayers={shown} today={today} locale={locale} base={base} />

      <div className="lg:hidden">
      {shown.map((p) => {
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
      {rows.filter((r) => shown.includes(r.prayer)).length === 0 && <p className="card p-4 text-center text-sm text-muted">{t(locale, "noLessonsToday")}</p>}
      </div>

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
    <Link href={`${base}/lesson/${r.slug}`} className="card lift block p-3 hover:border-primary">
      <p className="flex items-start justify-between gap-2 text-sm font-semibold">
        {ar ? r.shaykh.nameAr : r.shaykh.nameEn}
        {r.audience === "women" && <SistersTag locale={locale} />}
      </p>
      <p className="ar-text text-[15px] leading-snug">{r.bookAr}</p>
      {!ar && <p className="text-sm text-muted">{r.bookEn}</p>}
      <p className="mt-1 flex items-start gap-1 text-xs text-muted">
        <MapPin size={12} className="mt-0.5 shrink-0" />
        {ar ? r.masjid.shortAr : r.masjid.shortEn} · {ar ? r.locationAr : r.locationEn}
      </p>
    </Link>
  );
}

/** Madinah's week starts on Saturday. */
const WEEK_ORDER = [6, 0, 1, 2, 3, 4, 5];

function WeekGrid({ week, masjid, prayers, today, locale, base }: { week: Week; masjid: string; prayers: readonly (typeof PRAYERS)[number][]; today: number; locale: Locale; base: string }) {
  const ar = locale === "ar";
  return (
    <div className="hidden overflow-hidden rounded-3xl border border-line bg-card shadow-[var(--shadow)] lg:block">
      <div className="grid grid-cols-[110px_repeat(7,minmax(0,1fr))]">
        <div className="border-b border-line bg-bg-2" />
        {WEEK_ORDER.map((d) => (
          <div
            key={d}
            className={`border-b border-s border-line px-3 py-3 text-center font-heading text-sm font-semibold ${d === today ? "bg-primary text-primary-ink" : "bg-bg-2"}`}
          >
            {t(locale, DAY_KEYS[d])}
            {d === today && <span className="block text-[11px] font-medium opacity-80">{t(locale, "today")}</span>}
          </div>
        ))}
        {prayers.map((p) => (
          <div key={p} className="contents">
            <div className="flex flex-col justify-center border-b border-line bg-bg-2 px-3 py-4">
              <span className="text-xs text-muted">{t(locale, "after")}</span>
              <span className="font-heading text-base font-bold text-primary">{t(locale, p)}</span>
            </div>
            {WEEK_ORDER.map((d) => {
              const cell = (week.byDay[d] ?? []).filter((r) => r.prayer === p && (masjid === "all" || r.masjidId === masjid));
              return (
                <div key={d} className={`min-h-24 space-y-1.5 border-b border-s border-line p-1.5 ${d === today ? "bg-primary-soft/50" : ""}`}>
                  {cell.map((r) => (
                    <Link
                      key={r.slug}
                      href={`${base}/lesson/${r.slug}`}
                      title={`${ar ? r.shaykh.nameAr : r.shaykh.nameEn}: ${ar ? r.bookAr : r.bookEn}`}
                      className="block rounded-lg border border-line bg-bg px-2 py-1.5 transition-colors hover:border-primary hover:bg-card"
                    >
                      <span className="block truncate text-[11.5px] font-semibold leading-tight">{shortName(ar ? r.shaykh.nameAr : r.shaykh.nameEn)}</span>
                      <span className="ar-text block truncate text-[13px] leading-snug">{r.bookAr}</span>
                      <span className="block truncate text-[10.5px] text-muted">{ar ? r.masjid.shortAr : r.masjid.shortEn}</span>
                    </Link>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

/** "Prof. Dr. Sulayman ibn Saleemullah al-Ruhayli" becomes "Sulayman al-Ruhayli". */
export function shortName(name: string): string {
  // Titles are whole words, so "Shaykhah Barakah" loses "Shaykhah", not just "Shaykh".
  const words = name.replace(/^((Prof\.|Dr\.|Shaykhah|Shaykh|Ustadhah|Ustadh|الشيخة|الشيخ|الأستاذة|د\.|أ\.د\.)\s+)+/, "").split(/\s+/);
  return words.length > 2 ? `${words[0]} ${words[words.length - 1]}` : words.join(" ");
}
