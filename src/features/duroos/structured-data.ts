import type { getLesson, getShaykh } from "@/server/duroos/queries";
import type { CalEvent } from "@/server/calendar";
import type { Locale } from "@/lib/locale";
import { abs } from "@/lib/site";
import { duroosPath } from "./paths";

type Lesson = NonNullable<Awaited<ReturnType<typeof getLesson>>>;
type Shaykh = NonNullable<Awaited<ReturnType<typeof getShaykh>>>;

const S = "https://schema.org/";

/** The shaykh as a schema.org Person, linked from his lessons and his own page. */
export function personLd(s: Pick<Shaykh, "slug" | "nameEn" | "nameAr" | "photo"> & Partial<Pick<Shaykh, "roleEn" | "roleAr">>, locale: Locale, sameAs: string[] = []) {
  const ar = locale === "ar";
  return {
    "@type": "Person",
    "@id": abs(`/duroos/shaykh/${s.slug}#person`),
    name: ar ? s.nameAr : s.nameEn,
    alternateName: ar ? s.nameEn : s.nameAr,
    ...((ar ? s.roleAr : s.roleEn) ? { jobTitle: ar ? s.roleAr : s.roleEn } : {}),
    ...(s.photo ? { image: abs(s.photo) } : {}),
    url: abs(duroosPath(locale, `/shaykh/${s.slug}`)),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/** Person markup for a shaykh's page, with his own channels as sameAs. */
export function shaykhLd(s: Shaykh, locale: Locale) {
  const sameAs = [...new Set(s.channels.map((c) => c.url).filter((u): u is string => typeof u === "string" && /^https:\/\//.test(u)))];
  return { "@context": "https://schema.org", ...personLd(s, locale, sameAs) };
}

/**
 * Event markup for a dars's next sitting. `next` is the next occurrence from the calendar feed (start at the adhan,
 * one hour long, cancelled when the day's change says so). No sitting ahead, or no confirmed time: no Event.
 */
export function lessonEventLd(l: Lesson, next: CalEvent | null, locale: Locale) {
  if (!next || !l.current) return null;
  const ar = locale === "ar";
  const url = abs(duroosPath(locale, `/lesson/${l.slug}`));
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: ar ? `${l.bookAr}، ${l.shaykh.nameAr}` : `${l.bookEn} with ${l.shaykh.nameEn}`,
    description: ar
      ? `درس «${l.bookAr}» في ${l.masjid.nameAr}، بعد الصلاة مباشرة.`
      : `A dars on ${l.bookEn} (${l.bookAr}) at ${l.masjid.nameEn}, right after the prayer.`,
    startDate: next.start.toISOString(),
    endDate: next.end.toISOString(),
    eventStatus: `${S}${next.cancelled ? "EventCancelled" : "EventScheduled"}`,
    eventAttendanceMode: `${S}OfflineEventAttendanceMode`,
    inLanguage: "ar",
    isAccessibleForFree: true,
    location: {
      "@type": "Place",
      name: ar ? l.masjid.nameAr : l.masjid.nameEn,
      address: { "@type": "PostalAddress", addressLocality: ar ? "المدينة المنورة" : "Madinah", addressCountry: "SA" },
    },
    performer: personLd(l.shaykh, locale),
    organizer: personLd(l.shaykh, locale),
    offers: { "@type": "Offer", price: 0, priceCurrency: "SAR", availability: `${S}InStock`, url },
    ...(l.shaykh.photo ? { image: [abs(l.shaykh.photo)] } : {}),
    url,
  };
}
