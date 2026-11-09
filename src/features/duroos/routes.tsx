import { usesLiveDb } from "@/server/db/url";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDb } from "@/server/db/client";
import { getLesson, getShaykh, getToday, getWeek, listAnnouncements, listMasjids, listShaykhs, listStreams } from "@/server/duroos/queries";
import { lessons } from "@/server/db/schema";
import type { Locale } from "@/lib/locale";
import { DuroosToday } from "./DuroosToday";
import { ScheduleBrowser } from "./ScheduleBrowser";
import { DuroosNav } from "./DuroosNav";
import { LessonPage, LivePage, ShaykhPage, UpdatesPage } from "./DetailPages";
import { t } from "./strings";
import { riyadhDateIso, weekdayOf } from "@/lib/time/riyadh";
import { clip, metaDescription, metaTitle } from "@/lib/text";

type SlugProps = { params: Promise<{ slug: string }> };

function alternates(rest: string): Metadata["alternates"] {
  return { canonical: `/duroos${rest}`, languages: { en: `/duroos${rest}`, ar: `/ar/duroos${rest}` } };
}
function canonicalFor(locale: Locale, rest: string): Metadata["alternates"] {
  return { ...alternates(rest), canonical: `${locale === "ar" ? "/ar" : ""}/duroos${rest}` };
}

export function todayRoute(locale: Locale) {
  async function Page() {
    return <DuroosToday today={await getToday(await getDb())} locale={locale} />;
  }
  const metadata: Metadata = {
    title: t(locale, "todaysDuroos"),
    description:
      locale === "ar"
        ? "دروس اليوم في المسجد النبوي ومساجد المدينة، مع حالة كل درس ووقت الأذان."
        : "Today's duroos at al-Masjid an-Nabawi, Quba and other masjids in Madinah, with live status, adhan times and changes.",
    alternates: canonicalFor(locale, ""),
  };
  return { Page, metadata };
}

export function scheduleRoute(locale: Locale) {
  async function Page() {
    const db = await getDb();
    const [week, masjids] = await Promise.all([getWeek(db), listMasjids(db)]);
    return (
      <div className="shell pt-6 md:pt-10">
        <DuroosNav locale={locale} />
        <h1 className="mt-6 mb-2 font-heading text-4xl font-bold md:text-5xl">{t(locale, "weeklySchedule")}</h1>
        <p className="mb-6 max-w-2xl text-muted">
          {locale === "ar" ? "كل الدروس الثابتة في الأسبوع. اضغط على أي درس لتفاصيله." : "Every regular dars in the week. Tap any one for its place, books and recent changes."}
        </p>
        <ScheduleBrowser week={week} masjids={masjids} locale={locale} initialDay={weekdayOf(riyadhDateIso())} />
      </div>
    );
  }
  const metadata: Metadata = {
    title: t(locale, "weeklySchedule"),
    description:
      locale === "ar"
        ? "الجدول الأسبوعي لدروس المسجد النبوي ومسجد قباء والجامعة الإسلامية."
        : "The weekly schedule of duroos at al-Masjid an-Nabawi, Quba and the Islamic University masjid.",
    alternates: canonicalFor(locale, "/schedule"),
  };
  return { Page, metadata };
}

export function shaykhRoute(locale: Locale) {
  async function Page({ params }: SlugProps) {
    const s = await getShaykh(await getDb(), (await params).slug);
    if (!s) notFound();
    return <ShaykhPage shaykh={s} locale={locale} />;
  }
  async function generateMetadata({ params }: SlugProps): Promise<Metadata> {
    const slug = (await params).slug;
    const s = await getShaykh(await getDb(), slug);
    if (!s) return {};
    const name = locale === "ar" ? s.nameAr : s.nameEn;
    return {
      title: metaTitle(name),
      description: metaDescription(locale === "ar" ? `دروس ${s.nameAr} ومواعيدها وأماكنها.` : `The duroos of ${s.nameEn}: books, days, times and places.`),
      alternates: canonicalFor(locale, `/shaykh/${slug}`),
      openGraph: s.photo ? { images: [s.photo] } : undefined,
    };
  }
  async function generateStaticParams() {
    if (usesLiveDb()) return []; // built on first visit, then cached
    return (await listShaykhs(await getDb())).map((s) => ({ slug: s.slug }));
  }
  return { Page, generateMetadata, generateStaticParams };
}

export function lessonRoute(locale: Locale) {
  async function Page({ params }: SlugProps) {
    const l = await getLesson(await getDb(), (await params).slug);
    if (!l) notFound();
    return <LessonPage lesson={l} locale={locale} />;
  }
  async function generateMetadata({ params }: SlugProps): Promise<Metadata> {
    const slug = (await params).slug;
    const l = await getLesson(await getDb(), slug);
    if (!l) return {};
    return {
      title: lessonTitle(locale === "ar" ? l.bookAr : l.bookEn, locale === "ar" ? l.shaykh.nameAr : l.shaykh.nameEn, locale, t(locale, l.prayer)),
      description: metaDescription(
        locale === "ar"
          ? `${l.bookAr}، ${l.shaykh.nameAr}، ${l.masjid.nameAr}، بعد ${t(locale, l.prayer)}.`
          : `${l.bookEn} with ${l.shaykh.nameEn} at ${l.masjid.nameEn}, after ${t(locale, l.prayer)}: days, time, place and latest changes.`,
      ),
      alternates: canonicalFor(locale, `/lesson/${slug}`),
    };
  }
  async function generateStaticParams() {
    if (usesLiveDb()) return []; // built on first visit, then cached
    const db = await getDb();
    return (await db.select({ slug: lessons.slug }).from(lessons)).map((r) => ({ slug: r.slug }));
  }
  return { Page, generateMetadata, generateStaticParams };
}

export function updatesRoute(locale: Locale) {
  async function Page() {
    const db = await getDb();
    const [current, history] = await Promise.all([
      listAnnouncements(db, { limit: 50 }),
      listAnnouncements(db, { limit: 50, includeArchived: true }),
    ]);
    return <UpdatesPage current={current} history={history} locale={locale} />;
  }
  const metadata: Metadata = { title: t(locale, "updates"), alternates: canonicalFor(locale, "/updates") };
  return { Page, metadata };
}

export function liveRoute(locale: Locale) {
  async function Page() {
    return <LivePage streams={await listStreams(await getDb())} locale={locale} />;
  }
  const metadata: Metadata = { title: t(locale, "livestreams"), alternates: canonicalFor(locale, "/live") };
  return { Page, metadata };
}

/** Short, unique page titles: the book without "Explanation of", trimmed, plus the shaykh's family name. */
export function lessonTitle(book: string, shaykh: string, locale: "en" | "ar", prayer?: string): string {
  const family = shaykh.trim().split(/\s+/).pop() ?? "";
  const base = locale === "ar" ? book.replace(/^شرح\s+/, "") : book.replace(/^(An )?Explanation of (the )?/i, "");
  const suffix = locale === "ar" ? `، ${family}${prayer ? `، ${prayer}` : ""}` : ` with ${family}${prayer ? `, ${prayer}` : ""}`;
  return `${clip(base, Math.max(16, 45 - suffix.length))}${suffix}`;
}
