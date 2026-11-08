import Link from "next/link";
import { ArrowUpRight, BookOpen, GraduationCap, KeyRound, Luggage, Plane, RefreshCw, Users } from "lucide-react";
import type { getToday, AnnouncementRow } from "@/server/duroos/queries";
import type { GuideRow } from "@/server/content/queries";
import type { GuideStage } from "@/server/db/schema";
import { WhatsAppIcon } from "@/components/shell/WhatsApp";
import { TodayHero } from "./TodayHero";
import { DuroosByPrayer } from "./DuroosByPrayer";
import { KeyDates } from "./KeyDates";

type Today = Awaited<ReturnType<typeof getToday>>;

export const STAGE_ICON: Record<GuideStage, typeof Plane> = {
  "getting-started": Plane,
  "getting-settled": KeyRound,
  study: GraduationCap,
  family: Users,
  leaving: Luggage,
};

function timeAgo(iso: string): string {
  const mins = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60_000));
  if (mins < 60) return `${mins} min ago`;
  const h = Math.round(mins / 60);
  return h < 24 ? `${h} h ago` : `${Math.round(h / 24)} d ago`;
}

export function HomePage({ today, guides, updates, whatsappUrl }: { today: Today; guides: GuideRow[]; updates: AnnouncementRow[]; whatsappUrl: string }) {
  return (
    <>
      <TodayHero today={today} locale="en" />
      <KeyDates />

      <div className="shell mt-10 grid gap-10 md:mt-14 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
        <div id="live">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">Today&apos;s duroos</h2>
            <Link href="/duroos/schedule" className="shrink-0 text-sm font-semibold text-primary hover:underline">
              Weekly schedule
            </Link>
          </div>
          <DuroosByPrayer today={today} locale="en" />
          {today.lastCheckedAt && (
            <p className="mt-6 flex items-center gap-1.5 text-xs text-muted">
              <RefreshCw size={12} /> Last checked {timeAgo(today.lastCheckedAt)}
            </p>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
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
            <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold-bright px-4 py-2 text-sm font-bold text-brand-deep">
              Join on WhatsApp <ArrowUpRight size={16} />
            </span>
          </a>

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
                    <p className="text-sm font-semibold leading-snug">{a.titleEn}</p>
                    <p className="mt-0.5 line-clamp-2 text-sm text-muted">{a.bodyEn}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </aside>
      </div>

      <section className="shell mt-16 md:mt-24">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">Settling in Madinah</h2>
            <p className="mt-2 max-w-xl text-muted">Step-by-step help, from the day your visa arrives to the day you leave.</p>
          </div>
          <Link href="/guides" className="shrink-0 text-sm font-semibold text-primary hover:underline">
            All guides
          </Link>
        </div>
        {guides.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-line bg-card p-6 text-center text-muted">Guides are being written. In the meantime, ask in the WhatsApp group.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {guides.slice(0, 8).map((g) => {
              const Icon = STAGE_ICON[g.stage] ?? BookOpen;
              return (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className="group flex min-h-36 flex-col rounded-2xl border border-line bg-card p-4 transition-colors hover:border-primary/50 md:min-h-40 md:p-5"
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
