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
      <div className="mx-auto max-w-2xl">
        <DuroosNav locale={locale} />
        <h1 className="mb-3 text-3xl font-semibold">{t(locale, "weeklySchedule")}</h1>
        <ScheduleBrowser week={week} masjids={masjids} locale={locale} />
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
      title: name,
      description: locale === "ar" ? `دروس ${s.nameAr} ومواعيدها وأماكنها.` : `The duroos of ${s.nameEn}: books, days, times and places.`,
      alternates: canonicalFor(locale, `/shaykh/${slug}`),
      openGraph: s.photo ? { images: [s.photo] } : undefined,
    };
  }
  async function generateStaticParams() {
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
      title: locale === "ar" ? l.bookAr : l.bookEn,
      description:
        locale === "ar"
          ? `${l.bookAr}، ${l.shaykh.nameAr}، ${l.masjid.nameAr}.`
          : `${l.bookEn} with ${l.shaykh.nameEn} at ${l.masjid.nameEn}: days, time, place and latest changes.`,
      alternates: canonicalFor(locale, `/lesson/${slug}`),
    };
  }
  async function generateStaticParams() {
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
