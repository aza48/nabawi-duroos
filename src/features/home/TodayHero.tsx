import type { getToday } from "@/server/duroos/queries";
import type { Locale } from "@/lib/locale";
import { toArabicDigits } from "@/lib/locale";
import { formatHijriLong } from "@/lib/time/hijri";
import { addDays } from "@/lib/time/riyadh";
import { PRAYERS, prayerTimes } from "@/lib/time/prayer";
import { DayArc, type ArcCounts, type ArcLesson } from "./DayArc";
import { HeroSky } from "./HeroSky";
import { mapUrl } from "@/lib/maps";
import { NextPrayer } from "./NextPrayer";
import { WeatherChip } from "./WeatherChip";
import { LiveNowChip } from "@/features/duroos/Countdown";
import { DayRollover } from "./DayRollover";

type Today = Awaited<ReturnType<typeof getToday>>;

export function arcCounts(today: Today): ArcCounts {
  return Object.fromEntries(
    PRAYERS.map((p) => {
      const ls = today.lessons.filter((l) => l.prayer === p);
      return [
        p,
        {
          total: ls.length,
          live: ls.filter((l) => l.phase === "live" && l.status !== "cancelled" && l.status !== "postponed").length,
          cancelled: ls.filter((l) => l.status === "cancelled" || l.status === "postponed").length,
        },
      ];
    })
  ) as ArcCounts;
}

export function arcLessons(today: Today, locale: Locale): ArcLesson[] {
  const ar = locale === "ar";
  return today.lessons.map((l) => ({
    slug: l.slug,
    prayer: l.prayer,
    book: ar ? l.bookAr || l.bookEn : l.bookEn || l.bookAr,
    shaykh: ar ? l.shaykh.nameAr : l.shaykh.nameEn,
    shaykhSlug: l.shaykh.slug,
    masjid: ar ? l.masjid.shortAr : l.masjid.shortEn,
    map: mapUrl(l.masjid.nameEn),
    live: l.phase === "live" && l.status !== "cancelled" && l.status !== "postponed",
    off: l.status === "cancelled" || l.status === "postponed",
  }));
}

/** The green band from the MESH logo: today's date, the next adhan, and the live day arc. */
export function TodayHero({ today, locale, title }: { today: Today; locale: Locale; title?: string }) {
  const ar = locale === "ar";
  const weekday = today.hijri.en.split(" ")[0];
  const total = today.lessons.length;
  const cancelled = today.lessons.filter((l) => l.status === "cancelled" || l.status === "postponed").length;
  const masjids = new Set(today.lessons.map((l) => l.masjid.id)).size;
  const live = today.lessons.filter((l) => l.phase === "live" && l.status !== "cancelled" && l.status !== "postponed").length;
  const n = (x: number) => (ar ? toArabicDigits(x) : String(x));
  const tomorrowFajr = prayerTimes(addDays(today.date, 1)).fajr.toISOString();

  const summary = ar
    ? `${n(total)} دروس اليوم في ${n(masjids)} مساجد${cancelled ? `، ${n(cancelled)} ملغى` : ""}.`
    : total === 0
      ? "No duroos scheduled today."
      : `${total} duroos today across ${masjids} ${masjids === 1 ? "masjid" : "masjids"}${cancelled ? `, ${cancelled} cancelled` : ""}.`;

  return (
    <section className="hero lattice overflow-hidden bg-brand text-white">
      <DayRollover date={today.date} />
      <HeroSky prayers={today.prayers} />
      <div className="hero-text shell pt-6 pb-6 md:pt-12 md:pb-8">
        <div className="grid items-end gap-4 md:gap-6 lg:grid-cols-[1fr_340px] lg:gap-10">
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/85 md:text-base">
              <span>
                {ar ? today.hijri.ar.split(" ")[0] : weekday}
                {ar ? "، " : ", "}
                {ar ? today.gregorian.ar : today.gregorian.en}
              </span>
              <WeatherChip locale={locale} />
            </div>
            <h1 className="mt-2 font-heading text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl xl:text-7xl">
              {title ?? (ar ? today.hijri.ar.replace(/^\S+\s/, "") : formatHijriLong(today.date))}
            </h1>
            <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-base text-white/90 md:text-lg">
              <span>{summary}</span>
              <LiveNowChip
                initial={live}
                locale={locale}
                items={today.lessons.map((l) => ({ liveFrom: l.liveFrom, liveUntil: l.liveUntil, off: l.status === "cancelled" || l.status === "postponed" }))}
              />
            </p>
          </div>
          <NextPrayer prayers={today.prayers} tomorrowFajr={tomorrowFajr} locale={locale} />
        </div>
        <div className="mt-6 hidden sm:block md:mt-8">
          <DayArc prayers={today.prayers} counts={arcCounts(today)} lessons={arcLessons(today, locale)} locale={locale} />
        </div>
      </div>
    </section>
  );
}
