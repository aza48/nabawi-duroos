import Link from "next/link";
import { ArrowRight, ArrowUpRight, BellRing, BookOpenText, Compass, Megaphone, RefreshCw } from "lucide-react";
import type { getToday, AnnouncementRow } from "@/server/duroos/queries";
import type { GuideRow } from "@/server/content/queries";
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
import { HomeGuides, type HomeGuide } from "./HomeGuides";
import { WhoChooser } from "./WhoChooser";

type Today = Awaited<ReturnType<typeof getToday>>;

/** Only what a card needs, so the page does not ship every guide's body to the phone. */
const homeGuide = (g: GuideRow): HomeGuide => ({ slug: g.slug, title: g.title, stage: g.stage, readingMinutes: g.readingMinutes });

export function HomePage({ today, guides, updates, whatsappUrl }: { today: Today; guides: GuideRow[]; updates: AnnouncementRow[]; whatsappUrl: string }) {
  const changes = todaysChanges(today.lessons);
  return (
    <>
      <TodayHero today={today} locale="en" />
      <KeyDates initialNow={Date.now()} side={<LatestUpdates updates={updates} quiet={changes.length > 0} />} />

      <div className="shell mt-10 grid grid-cols-1 gap-10 md:mt-14 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
        <div id="live" className="min-w-0">
          <SectionHeader title="Today's duroos" icon={BookOpenText} action={{ href: "/duroos/schedule", label: "Weekly schedule" }} />
          <DuroosCards today={today} locale="en" />
          {today.lastCheckedAt && (
            <p className="mt-6 flex items-center gap-1.5 text-xs text-muted">
              <RefreshCw size={12} /> Last checked <TimeAgo iso={today.lastCheckedAt} />
            </p>
          )}
        </div>

        <aside className="space-y-6">
          <div className="hidden lg:block">
            <NextUpRail lessons={today.lessons.map(slimLesson)} changes={changes} serverNow={Date.now()} />
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
            <p className="mt-4 font-heading text-2xl font-bold leading-tight">The MESH group</p>
            <p className="mt-2 text-sm leading-relaxed text-white/80">
              Announcements, events and tips from other students. Verified information only, no debates.
            </p>
            <p className="mt-2 text-sm font-semibold text-white">Only for English-speaking Western students.</p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold-bright px-4 py-2 text-sm font-bold text-brand-deep">
              Join on WhatsApp <ArrowUpRight size={16} />
            </span>
          </a>

        </aside>
      </div>

      <section className="shell mt-16 md:mt-24">
        <SectionHeader
          title="Settling in Madinah"
          subtitle="Step-by-step help, from the day your visa arrives to the day you leave."
          icon={Compass}
          action={{ href: "/guides", label: "All guides" }}
        />
        {guides.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line bg-card p-6 text-center text-muted">
            <p>Guides are being written. Until then, ask Admin.</p>
            <AdminHelp variant="line" className="mt-2 text-sm" />
          </div>
        ) : (
          <>
            <div className="mb-4 md:mb-5">
              <WhoChooser />
            </div>
            <HomeGuides guides={guides.map(homeGuide)} />
          </>
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
function LatestUpdates({ updates, quiet }: { updates: AnnouncementRow[]; quiet: boolean }) {
  return (
    <section aria-labelledby="latest-updates" className="flex flex-col rounded-3xl border border-line bg-card p-5 sm:p-6 md:col-span-2 xl:col-span-1">
      <div className="flex items-center justify-between gap-3">
        <h2 id="latest-updates" className="flex items-center gap-2 text-sm font-semibold text-muted">
          <Megaphone size={15} className="text-gold" /> Latest updates
        </h2>
        <Link href="/duroos/updates" className="-me-2 inline-flex min-h-10 items-center rounded-full px-2 text-sm font-semibold text-primary hover:underline">
          All
        </Link>
      </div>
      {updates.length === 0 ? (
        <p className="mt-3 mb-5 text-sm text-muted">{quiet ? "No announcements." : "No changes announced. Every dars is on as usual."}</p>
      ) : (
        <ul className="mt-1 mb-4 divide-y divide-line">
          {updates.slice(0, 3).map((a) => (
            <li key={a.slug}>
              <Link href={`/duroos/updates#${a.slug}`} className="group block py-3.5">
                <span className="block text-[11px] font-semibold uppercase tracking-wide text-gold">
                  <TimeAgo iso={new Date(a.postedAt).toISOString()} />
                </span>
                <span className="mt-1 block font-semibold leading-snug group-hover:text-primary">{a.titleEn}</span>
                <span className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">{a.bodyEn}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Link href="/more#alerts" className="group mt-auto flex items-center gap-3 rounded-2xl bg-bg-2 p-3 transition hover:bg-primary-soft">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-ink">
          <BellRing size={17} />
        </span>
        <span className="min-w-0 flex-1 text-sm font-semibold leading-snug">Get a phone alert when a dars changes</span>
        <ArrowRight size={16} className="shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-primary" />
      </Link>
    </section>
  );
}
