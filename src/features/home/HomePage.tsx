import Link from "next/link";
import { ArrowUpRight, BookOpen, BookOpenText, Compass, GraduationCap, KeyRound, Luggage, Plane, RefreshCw, Users } from "lucide-react";
import type { getToday, AnnouncementRow } from "@/server/duroos/queries";
import type { GuideRow } from "@/server/content/queries";
import type { GuideStage } from "@/server/db/schema";
import { WhatsAppIcon } from "@/components/shell/WhatsApp";
import { SectionHeader } from "@/components/ui";
import { TodayHero } from "./TodayHero";
import { DuroosCards } from "./DuroosCards";
import { KeyDates } from "./KeyDates";
import { TimeAgo } from "./TimeAgo";
import { AdminHelp } from "@/components/shell/AdminHelp";

type Today = Awaited<ReturnType<typeof getToday>>;

export const STAGE_ICON: Record<GuideStage, typeof Plane> = {
  "getting-started": Plane,
  "getting-settled": KeyRound,
  study: GraduationCap,
  family: Users,
  leaving: Luggage,
};

export function HomePage({ today, guides, updates, whatsappUrl }: { today: Today; guides: GuideRow[]; updates: AnnouncementRow[]; whatsappUrl: string }) {
  return (
    <>
      <TodayHero today={today} locale="en" />
      <KeyDates initialNow={Date.now()} />

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

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <section className="rounded-3xl border border-line bg-card p-5">
            <div className="flex items-baseline justify-between">
              <h2 className="font-heading text-lg font-bold">Latest updates</h2>
              <Link href="/duroos/updates" className="text-sm font-semibold text-primary hover:underline">
                All
              </Link>
            </div>
            {updates.length === 0 ? (
              <p className="mt-3 text-sm text-muted">No changes announced. Every dars is on as usual.</p>
            ) : (
              <ul className="mt-3 divide-y divide-line">
                {updates.slice(0, 4).map((a) => (
                  <li key={a.slug} className="py-3 first:pt-1 last:pb-0">
                    <Link href={`/duroos/updates#${a.slug}`} className="group block">
                      <span className="block text-sm font-semibold leading-snug group-hover:text-primary">{a.titleEn}</span>
                      <span className="mt-0.5 line-clamp-2 block text-sm text-muted">{a.bodyEn}</span>
                      {a.bodyEn.length > 110 && <span className="mt-1 inline-block text-xs font-semibold text-primary">Read in full</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="lattice block overflow-hidden rounded-3xl bg-brand-deep p-6 text-white shadow-[var(--shadow-lg)] transition hover:brightness-110"
          >
            <span className="grid size-12 place-items-center rounded-2xl bg-wa text-wa-ink">
              <WhatsAppIcon size={26} />
            </span>
            <p className="mt-4 font-heading text-2xl font-bold leading-tight">The MESH group</p>
            <p className="mt-2 text-sm leading-relaxed text-white/80">
              Announcements, events and help from students who have been here longer. Verified information only, no debates.
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
          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {guides.slice(0, 8).map((g) => {
              const Icon = STAGE_ICON[g.stage] ?? BookOpen;
              return (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className="lift group flex min-h-36 flex-col rounded-2xl border border-line bg-card p-4 hover:border-primary/50 md:min-h-40 md:p-5"
                >
                  <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary transition group-hover:bg-primary group-hover:text-primary-ink">
                    <Icon size={20} />
                  </span>
                  <span className="mt-3 font-heading text-[15px] font-semibold leading-snug md:mt-4 md:text-lg">{g.title}</span>
                  <span className="mt-auto pt-3 text-xs text-muted">{g.readingMinutes} min read</span>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
