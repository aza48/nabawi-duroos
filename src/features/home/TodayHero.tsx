import type { getToday } from "@/server/duroos/queries";
import type { Locale } from "@/lib/locale";
import { formatHijriLong } from "@/lib/time/hijri";
import { addDays } from "@/lib/time/riyadh";
import { PRAYERS, prayerTimes } from "@/lib/time/prayer";
import { DayArc, type ArcCounts, type ArcLesson } from "./DayArc";
import { HeroSky } from "./HeroSky";
import { AlbaseerahSchool } from "@/components/shell/Albaseerah";
import { mapUrl } from "@/lib/maps";
import { NextPrayer } from "./NextPrayer";
import { WeatherChip } from "./WeatherChip";
import { LiveNowChip } from "@/features/duroos/Countdown";
import { DayRollover } from "./DayRollover";
import { arCount, enCount } from "@/lib/arabic-count";
import { ramadanMode } from "./ramadan";
import { RamadanStrip } from "./RamadanStrip";

type Today = Awaited<ReturnType<typeof getToday>>;

/** A verb before a counted, non-human subject: feminine with a plural (3 to 10 duroos), masculine otherwise. */
export const pluralVerb = (n: number, masc: string, fem: string) => (n % 100 >= 3 && n % 100 <= 10 ? fem : masc);

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
  const cancelled = today.lessons.filter((l) => l.status === "cancelled").length;
  const postponed = today.lessons.filter((l) => l.status === "postponed").length;
  const masjids = new Set(today.lessons.map((l) => l.masjid.id)).size;
  const live = today.lessons.filter((l) => l.phase === "live" && l.status !== "cancelled" && l.status !== "postponed").length;
  const tomorrowFajr = prayerTimes(addDays(today.date, 1)).fajr.toISOString();
  const ramadan = ramadanMode(today.date);

  const summary = ar
    ? total === 0
      ? "لا دروس اليوم."
      : `${arCount(total, "dars")} اليوم في ${arCount(masjids, "masjid", { case: "gen" })}${cancelled ? `، و${pluralVerb(cancelled, "أُلغي", "أُلغيت")} ${arCount(cancelled, "dars")}` : ""}${postponed ? `، و${pluralVerb(postponed, "أُجّل", "أُجّلت")} ${arCount(postponed, "dars")}` : ""}.`
    : total === 0
      ? "No duroos scheduled today."
      : `${enCount(total, "dars", "duroos")} today across ${enCount(masjids, "masjid", "masjids")}${cancelled ? `, ${cancelled} cancelled` : ""}${postponed ? `, ${postponed} postponed` : ""}.`;

  return (
    <section className="hero lattice overflow-hidden bg-brand text-white">
      <DayRollover date={today.date} />
      <HeroSky prayers={today.prayers} />
      <AlbaseerahSchool locale={locale} />
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
                items={today.lessons.map((l) => ({ liveFrom: l.liveFrom, liveUntil: l.liveUntil, off: !l.timeKnown || l.status === "cancelled" || l.status === "postponed" }))}
              />
            </p>
            {ramadan && <RamadanStrip mode={ramadan} serverNow={Date.now()} locale={locale} />}
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
