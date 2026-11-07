import Link from "next/link";
import { BookOpen, Clock3, RefreshCw } from "lucide-react";
import type { getToday } from "@/server/duroos/queries";
import type { AnnouncementRow } from "@/server/duroos/queries";
import type { GuideRow } from "@/server/content/queries";
import { formatHijriLong } from "@/lib/time/hijri";
import { formatClock } from "@/lib/time/riyadh";
import { PRAYERS } from "@/lib/time/prayer";
import { EmptyState, Section } from "@/components/ui";
import { AskOnWhatsApp, WhatsAppBanner } from "@/components/shell/WhatsApp";
import { DarsCard } from "@/features/duroos/DarsCard";
import { t } from "@/features/duroos/strings";

type Today = Awaited<ReturnType<typeof getToday>>;

function timeAgo(iso: string): string {
  const mins = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60_000));
  if (mins < 60) return `${mins} min ago`;
  const h = Math.round(mins / 60);
  return h < 24 ? `${h} h ago` : `${Math.round(h / 24)} d ago`;
}

export function HomePage({
  today,
  guides,
  updates,
  whatsappUrl,
}: {
  today: Today;
  guides: GuideRow[];
  updates: AnnouncementRow[];
  whatsappUrl: string;
}) {
  const weekday = today.hijri.en.split(" ")[0];
  const upcoming = today.lessons.filter((l) => l.phase !== "done");
  const shown = (upcoming.length ? upcoming : today.lessons).slice(0, 4);
  const next = PRAYERS.find((p) => new Date(today.prayers[p]).getTime() > Date.now());

  const cancelledCount = today.lessons.filter((l) => l.status === "cancelled" || l.status === "postponed").length;
  const nextAdhan = next ? `${t("en", next)} ${formatClock(new Date(today.prayers[next]))}` : null;

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-xs font-medium uppercase tracking-wide text-muted">
        {weekday} · {formatHijriLong(today.date)} · {today.gregorian.en}
      </p>
      <h1 className="mt-1 text-2xl font-semibold">Today in Madinah</h1>
      <p className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm">
        <span>
          <b>{today.lessons.length}</b> duroos
        </span>
        {cancelledCount > 0 && (
          <span className="font-semibold text-cancel">{cancelledCount} cancelled</span>
        )}
        {nextAdhan && (
          <span className="text-muted">
            Next adhan: <b className="text-ink">{nextAdhan}</b>
          </span>
        )}
      </p>

      <div className="mt-4">
        <WhatsAppBanner url={whatsappUrl} />
      </div>

      <Section
        title={
          <span className="flex items-center gap-2">
            {t("en", "todaysDuroos")}
            {today.lessons.some((l) => l.phase === "live") && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wide text-live">
                <span className="live-dot size-2 rounded-full bg-live" /> LIVE
              </span>
            )}
          </span>
        }
        action={{ href: "/duroos", label: t("en", "fullSchedule") }}
      >
        <p className="-mt-1.5 mb-3 flex items-center gap-1.5 text-xs text-muted">
          <Clock3 size={13} /> Times shown are the adhan. {t("en", "afterIqamah")}.
        </p>
        {shown.length === 0 ? (
          <EmptyState title={t("en", "noLessonsToday")} body="Check the weekly schedule for the rest of the week." />
        ) : (
          <div className="grid gap-2.5">
            {!upcoming.length && <p className="text-sm text-muted">All of today&apos;s duroos have finished.</p>}
            {shown.map((l) => (
              <DarsCard key={l.slug} lesson={l} locale="en" />
            ))}
          </div>
        )}
        {today.lastCheckedAt && (
          <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
            <RefreshCw size={12} /> Checked {timeAgo(today.lastCheckedAt)} against the official channels
          </p>
        )}
      </Section>

      <Section title={t("en", "prayerTimes")}>
        <div className="card grid grid-cols-5 divide-x divide-line overflow-hidden">
          {PRAYERS.map((p) => (
            <div key={p} className={`px-1 py-2.5 text-center ${p === next ? "bg-primary text-primary-ink" : ""}`}>
              <p className="text-[11px] font-semibold opacity-80">{t("en", p)}</p>
              <p className="text-sm font-bold" dir="ltr">{formatClock(new Date(today.prayers[p])).replace(/\s?[AP]M/, "")}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Start here" action={{ href: "/guides", label: "All guides" }}>
        {guides.length === 0 ? (
          <EmptyState
            title="Guides are on their way"
            body="Step-by-step guides for arriving, settling in and family life are being written. Until then, ask in the WhatsApp group."
          />
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {guides.slice(0, 4).map((g, i) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className={`flex min-h-28 flex-col justify-between rounded-2xl p-3.5 ${i % 2 ? "bg-on-bg" : "bg-gold-bg"}`}
              >
                <span className="font-semibold leading-snug">{g.title}</span>
                <span className="flex items-center gap-1 text-xs text-muted">
                  <BookOpen size={12} /> {g.readingMinutes} min read
                </span>
              </Link>
            ))}
          </div>
        )}
      </Section>

      <Section title={t("en", "latestUpdates")} action={{ href: "/duroos/updates", label: "All updates" }}>
        {updates.length === 0 ? (
          <EmptyState title={t("en", "noUpdates")} />
        ) : (
          <ul className="card divide-y divide-line">
            {updates.slice(0, 3).map((a) => (
              <li key={a.slug} className="p-3.5">
                <p className="text-sm font-semibold">{a.titleEn}</p>
                <p className="mt-0.5 line-clamp-2 text-sm text-muted">{a.bodyEn}</p>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <div className="mt-7">
        <AskOnWhatsApp url={whatsappUrl} />
      </div>
    </div>
  );
}
