import Link from "next/link";
import { ArrowRight, ArrowUpRight, BellRing, BookOpen, BookOpenText, Compass, GraduationCap, KeyRound, Luggage, Megaphone, Plane, RefreshCw, Users } from "lucide-react";
import type { getToday, AnnouncementRow } from "@/server/duroos/queries";
import type { GuideRow } from "@/server/content/queries";
import type { GuideStage } from "@/server/db/schema";
import { WhatsAppIcon } from "@/components/shell/WhatsApp";
import { SectionHeader } from "@/components/ui";
import { TodayHero } from "./TodayHero";
import { DuroosCards } from "./DuroosCards";
import { KeyDates } from "./KeyDates";
import { TimeAgo } from "./TimeAgo";
import { NextUpRail } from "./NextUpRail";
import { todaysChanges } from "./rail";
import { slimLesson } from "@/features/duroos/now-next";
import { AdminHelp } from "@/components/shell/AdminHelp";
import { guideText } from "@/lib/arabic-content";
import { arCount } from "@/lib/arabic-count";
import type { Locale } from "@/lib/locale";

/** The home page's own words; the hero, the duroos cards and the rail carry their own Arabic. */
const T = {
  en: {
    duroos: "Today's duroos", schedule: "Weekly schedule", scheduleHref: "/duroos/schedule", lastChecked: "Last checked",
    group: "The MESH group", groupText: "Announcements, events and tips from other students. Verified information only, no debates.",
    groupOnly: "Only for English-speaking Western students.", join: "Join on WhatsApp",
    guides: "Settling in Madinah", guidesSub: "Step-by-step help, from the day your visa arrives to the day you leave.", allGuides: "All guides", guidesHref: "/guides",
    noGuides: "Guides are being written. Until then, ask Admin.",
    read: (n: number) => `${n} min read`,
    updates: "Latest updates", all: "All", updatesHref: "/duroos/updates", noAnnouncements: "No announcements.", allOn: "No changes announced. Every dars is on as usual.",
    alert: "Get a phone alert when a dars changes", alertHref: "/more#alerts",
  },
  ar: {
    duroos: "دروس اليوم", schedule: "الجدول الأسبوعي", scheduleHref: "/ar/duroos/schedule", lastChecked: "آخر تحديث",
    group: "مجموعة MESH", groupText: "الإعلانات والفعاليات ونصائح من طلاب آخرين. معلومات موثّقة فقط، بلا جدال.",
    groupOnly: "المجموعة خاصة بالطلاب الغربيين الناطقين بالإنجليزية فقط.", join: "انضم عبر واتساب",
    guides: "الاستقرار في المدينة", guidesSub: "خطوة بخطوة، من يوم وصول تأشيرتك إلى يوم مغادرتك.", allGuides: "كل الأدلة", guidesHref: "/ar/guides",
    noGuides: "الأدلة قيد الكتابة. إلى ذلك الحين راسل الإدارة.",
    read: (n: number) => `${arCount(n, "minute", { one: "bare" })} للقراءة`,
    updates: "آخر التحديثات", all: "الكل", updatesHref: "/ar/duroos/updates", noAnnouncements: "لا إعلانات.", allOn: "لا تغييرات معلنة، وكل الدروس قائمة كالمعتاد.",
    alert: "نبّهني على جوالي إذا تغيّر درس", alertHref: "/ar/more#alerts",
  },
};

type Today = Awaited<ReturnType<typeof getToday>>;

export const STAGE_ICON: Record<GuideStage, typeof Plane> = {
  "getting-started": Plane,
  "getting-settled": KeyRound,
  study: GraduationCap,
  family: Users,
  leaving: Luggage,
};

export function HomePage({ today, guides, updates, whatsappUrl, locale = "en" }: { today: Today; guides: GuideRow[]; updates: AnnouncementRow[]; whatsappUrl: string; locale?: Locale }) {
  const ar = locale === "ar";
  const t = T[ar ? "ar" : "en"];
  const changes = todaysChanges(today.lessons);
  return (
    <>
      <TodayHero today={today} locale={locale} />
      <KeyDates initialNow={Date.now()} locale={locale} side={<LatestUpdates updates={updates} quiet={changes.length > 0} locale={locale} />} />

      <div className="shell mt-10 grid grid-cols-1 gap-10 md:mt-14 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
        <div id="live" className="min-w-0">
          <SectionHeader title={t.duroos} icon={BookOpenText} action={{ href: t.scheduleHref, label: t.schedule }} />
          <DuroosCards today={today} locale={locale} />
          {today.lastCheckedAt && (
            <p className="mt-6 flex items-center gap-1.5 text-xs text-muted">
              <RefreshCw size={12} /> {t.lastChecked} <TimeAgo iso={today.lastCheckedAt} locale={locale} />
            </p>
          )}
        </div>

        <aside className="space-y-6">
          <div className="hidden lg:block">
            <NextUpRail lessons={today.lessons.map(slimLesson)} changes={changes} serverNow={Date.now()} locale={locale} />
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="lattice block overflow-hidden rounded-3xl bg-brand-deep p-6 text-white shadow-[var(--shadow-lg)] transition hover:brightness-110 lg:sticky! lg:top-24"
          >
            <span className="grid size-12 place-items-center rounded-2xl bg-wa text-wa-ink">
              <WhatsAppIcon size={26} />
            </span>
            <p className="mt-4 font-heading text-2xl font-bold leading-tight">{t.group}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/80">{t.groupText}</p>
            <p className="mt-2 text-sm font-semibold text-white">{t.groupOnly}</p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold-bright px-4 py-2 text-sm font-bold text-brand-deep">
              {t.join} <ArrowUpRight size={16} className="rtl:-scale-x-100" />
            </span>
          </a>

        </aside>
      </div>

      <section className="shell mt-16 md:mt-24">
        <SectionHeader
          title={t.guides}
          subtitle={t.guidesSub}
          icon={Compass}
          action={{ href: t.guidesHref, label: t.allGuides }}
        />
        {guides.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line bg-card p-6 text-center text-muted">
            <p>{t.noGuides}</p>
            <AdminHelp variant="line" locale={locale} className="mt-2 text-sm" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {guides.slice(0, 8).map((g) => {
              const Icon = STAGE_ICON[g.stage] ?? BookOpen;
              const gt = guideText(g, locale);
              return (
                <Link
                  key={g.slug}
                  href={`${ar ? "/ar" : ""}/guides/${g.slug}`}
                  className="lift group flex min-h-36 flex-col rounded-2xl border border-line bg-card p-4 hover:border-primary/50 md:min-h-40 md:p-5"
                >
                  <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary transition group-hover:bg-primary group-hover:text-primary-ink">
                    <Icon size={20} />
                  </span>
                  <span className="mt-3 font-heading text-[15px] font-semibold leading-snug md:mt-4 md:text-lg" dir={ar && !gt.titleInArabic ? "ltr" : undefined}>{gt.title}</span>
                  <span className="mt-auto pt-3 text-xs text-muted">{t.read(gt.readingMinutes)}</span>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}

/**
 * The latest duroos announcements, in the third column of "Coming up", set like a notice board in the same light card as
 * the dates beside it: the three newest, each with when it was posted, and at the foot a way to get a phone alert when a
 * dars changes, so the card is useful (and full) even on a quiet day.
 */
function LatestUpdates({ updates, quiet, locale = "en" }: { updates: AnnouncementRow[]; quiet: boolean; locale?: Locale }) {
  const ar = locale === "ar";
  const t = T[ar ? "ar" : "en"];
  return (
    <section aria-labelledby="latest-updates" className="flex flex-col rounded-3xl border border-line bg-card p-5 sm:p-6 md:col-span-2 xl:col-span-1">
      <div className="flex items-center justify-between gap-3">
        <h2 id="latest-updates" className="flex items-center gap-2 text-sm font-semibold text-muted">
          <Megaphone size={15} className="text-gold" /> {t.updates}
        </h2>
        <Link href={t.updatesHref} className="-me-2 inline-flex min-h-10 items-center rounded-full px-2 text-sm font-semibold text-primary hover:underline">
          {t.all}
        </Link>
      </div>
      {updates.length === 0 ? (
        <p className="mt-3 mb-5 text-sm text-muted">{quiet ? t.noAnnouncements : t.allOn}</p>
      ) : (
        <ul className="mt-1 mb-4 divide-y divide-line">
          {updates.slice(0, 3).map((a) => (
            <li key={a.slug}>
              <Link href={`${t.updatesHref}#${a.slug}`} className="group block py-3.5">
                <span className={`block text-[11px] font-semibold text-gold ${ar ? "" : "uppercase tracking-wide"}`}>
                  <TimeAgo iso={new Date(a.postedAt).toISOString()} locale={locale} />
                </span>
                <span className="mt-1 block font-semibold leading-snug group-hover:text-primary">{ar ? a.titleAr : a.titleEn}</span>
                <span className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">{ar ? a.bodyAr : a.bodyEn}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Link href={t.alertHref} className="group mt-auto flex items-center gap-3 rounded-2xl bg-bg-2 p-3 transition hover:bg-primary-soft">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-ink">
          <BellRing size={17} />
        </span>
        <span className="min-w-0 flex-1 text-sm font-semibold leading-snug">{t.alert}</span>
        <ArrowRight size={16} className="shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-primary rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
      </Link>
    </section>
  );
}
