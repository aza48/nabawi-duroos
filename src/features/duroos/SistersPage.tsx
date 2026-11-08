import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { getDb } from "@/server/db/client";
import { getWeek, type ScheduleRow } from "@/server/duroos/queries";
import type { Locale } from "@/lib/locale";
import type { Weekday } from "@/lib/time/riyadh";
import { EmptyState } from "@/components/ui";
import { DuroosNav } from "./DuroosNav";
import { duroosPath } from "./DarsCard";
import { SistersTag } from "./StatusTag";
import { DAY_LONG_KEYS, t } from "./strings";

const DAYS: Weekday[] = [6, 0, 1, 2, 3, 4, 5];

function SistersCard({ r, locale }: { r: ScheduleRow; locale: Locale }) {
  const ar = locale === "ar";
  return (
    <Link
      href={duroosPath(locale, `/lesson/${r.slug}`)}
      className="group relative flex flex-col rounded-2xl border border-line bg-card p-4 ps-5 shadow-[var(--shadow)] transition-colors hover:border-primary/50 before:absolute before:inset-y-0 before:start-0 before:w-1 before:rounded-s-2xl before:bg-primary/70"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="font-heading text-[15px] font-semibold leading-snug group-hover:text-primary">{ar ? r.shaykh.nameAr : r.shaykh.nameEn}</p>
        <SistersTag locale={locale} />
      </div>
      <p className="ar-text mt-1.5 text-[19px] leading-snug">{r.bookAr}</p>
      {!ar && <p className="mt-0.5 text-sm leading-snug text-muted">{r.bookEn}</p>}
      <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
        <span className="rounded-full bg-primary-soft px-2 py-0.5 font-semibold text-primary">
          {ar ? `بعد ${t(locale, r.prayer)}` : `After ${t(locale, r.prayer)}`}
        </span>
        <span className="flex min-w-0 items-center gap-1">
          <MapPin size={13} className="shrink-0" />
          <span>{ar ? r.locationAr : r.locationEn}</span>
        </span>
      </p>
    </Link>
  );
}

/** /duroos/sisters: women's duroos across Madinah, in the petal-pink MESH variant. */
export function sistersRoute(locale: Locale) {
  const ar = locale === "ar";
  async function Page() {
    const { byDay } = await getWeek(await getDb());
    const days = DAYS.map((d) => ({ d, rows: byDay[d].filter((r) => r.audience === "women") })).filter((x) => x.rows.length);
    return (
      <div data-variant="sisters" className="min-h-[60vh] pb-12">
        <div className="shell pt-6 md:pt-10">
          <DuroosNav locale={locale} />
          <section className="lattice mt-6 overflow-hidden rounded-3xl bg-brand px-6 py-8 text-white md:px-10 md:py-12">
            <p className="text-sm font-semibold tracking-wide text-gold-bright">{ar ? "للأخوات" : "For sisters"}</p>
            <h1 className="mt-2 font-heading text-4xl font-bold md:text-5xl">{ar ? "دروس الأخوات" : "Sisters' duroos"}</h1>
            <p className="mt-3 max-w-2xl text-white/85">
              {ar
                ? "دروس تقدّمها معلّمات للنساء، وحلقات في مصليات النساء في مساجد المدينة."
                : "Duroos taught by women for women, in the women's sections of masjids around Madinah."}
            </p>
          </section>
          {days.length === 0 ? (
            <div className="mt-8">
              <EmptyState title={ar ? "لا توجد دروس للأخوات هذا الأسبوع" : "No sisters' duroos this week"} />
            </div>
          ) : (
            <div className="mt-8 grid gap-8 lg:grid-cols-2 2xl:grid-cols-3">
              {days.map(({ d, rows }) => (
                <section key={d}>
                  <h2 className="mb-3 font-heading text-xl font-bold text-primary">{t(locale, DAY_LONG_KEYS[d])}</h2>
                  <div className="grid gap-3">
                    {rows.map((r) => (
                      <SistersCard key={r.slug} r={r} locale={locale} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
          <p className="mt-10 max-w-2xl text-sm text-muted">
            {ar
              ? "دروس المسجد النبوي وقباء الأخرى مفتوحة للجميع، وكثير منها يُبث مباشرة. "
              : "The other duroos at al-Masjid an-Nabawi and Quba are open to everyone, and many are broadcast live. "}
            <Link href={duroosPath(locale, "/live")} className="font-semibold text-primary underline-offset-2 hover:underline">
              {ar ? "البث المباشر" : "See what is live"}
            </Link>
          </p>
        </div>
      </div>
    );
  }
  const metadata: Metadata = {
    title: ar ? "دروس الأخوات" : "Sisters' duroos",
    description: ar
      ? "دروس النساء في المدينة المنورة: المعلّمات والكتب والأيام والأماكن."
      : "Women's duroos in Madinah: teachers, books, days and places, updated every week.",
    alternates: {
      canonical: `${ar ? "/ar" : ""}/duroos/sisters`,
      languages: { en: "/duroos/sisters", ar: "/ar/duroos/sisters" },
    },
  };
  return { Page, metadata };
}
