import Link from "next/link";
import { BookOpen, CalendarX2, FilePlus2, Megaphone } from "lucide-react";
import { requireAdmin } from "@/server/auth/session";
import { can } from "@/server/auth/permissions";
import { getDb } from "@/server/db/client";
import { getToday } from "@/server/duroos/queries";
import { listDrafts } from "@/server/content/queries";
import { listActivity } from "@/server/admin/audit";
import { describeActivity, isUndoable } from "@/server/admin/describe";
import { formatClock } from "@/lib/time/riyadh";
import { ChangeDarsButton } from "@/features/admin/ChangeDarsSheet";
import { ActivityList } from "@/features/admin/ActivityList";
import { StatusTag } from "@/features/duroos/StatusTag";
import { timeAgo } from "@/features/admin/time";
import { desc, inArray } from "drizzle-orm";
import { channelPosts, lessons } from "@/server/db/schema";
import { needsAttention } from "@/server/admin/attention";
import { NeedsYou } from "@/features/admin/NeedsYou";
import { plainReading } from "@/features/admin/watcher/reading";
import type { AiParse } from "@/server/watcher/ai";
import { Suggestions, type SuggestionCard } from "@/features/admin/watcher/Suggestions";

export default async function Inbox() {
  const actor = await requireAdmin();
  const db = await getDb();
  const [today, drafts, activity, pendingPosts, attention, lessonNames] = await Promise.all([
    getToday(db), listDrafts(db), listActivity(db, { limit: 8 }),
    db.select().from(channelPosts).where(inArray(channelPosts.status, ["suggested", "error"])).orderBy(desc(channelPosts.postedAt)).limit(20),
    needsAttention(db),
    db.select({ slug: lessons.slug, bookEn: lessons.bookEn }).from(lessons),
  ]);
  const bookOf = new Map(lessonNames.map((l) => [l.slug, l.bookEn]));
  const duroos = can(actor.role, "duroos.write");
  const lastChecked = today.lastCheckedAt ? new Date(today.lastCheckedAt) : null;
  const watcherStale = !lastChecked || Date.now() - lastChecked.getTime() > 30 * 60_000;
  const cards: SuggestionCard[] = pendingPosts.map((p) => {
    const r = p.parse as AiParse | null;
    return {
      id: p.id, channel: p.sourceHandle, when: timeAgo(p.postedAt), url: p.url, text: p.text, imageUrl: p.imageUrl,
      reading: r ? plainReading(r, r.lesson_slug ? bookOf.get(r.lesson_slug) : undefined) : null,
      reason: p.reason, wouldAuto: p.wouldAuto, failed: p.status === "error",
    };
  });
  const actions = [
    duroos && { href: "/admin/duroos", label: "Change a dars", icon: CalendarX2 },
    can(actor.role, "announcements.write") && { href: "/admin/duroos/announcements/new", label: "Post an update", icon: Megaphone },
    can(actor.role, "content.write") && { href: "/admin/content/faq/new", label: "New answer", icon: FilePlus2 },
    can(actor.role, "content.write") && { href: "/admin/content/guide/new", label: "New guide", icon: BookOpen },
  ].filter(Boolean) as { href: string; label: string; icon: typeof BookOpen }[];

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-xs font-medium uppercase tracking-wide text-muted">{today.hijri.en} · {today.gregorian.en}</p>
      <h1 className="mt-1 text-2xl font-semibold">Inbox</h1>
      <NeedsYou items={duroos ? attention : attention.filter((a) => ["drafts", "content", "programmes"].includes(a.key))} />

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {actions.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className="card flex items-center gap-2.5 p-3.5 font-semibold transition hover:border-primary">
            <span className="grid size-9 place-items-center rounded-xl bg-bg-2 text-primary"><Icon size={18} /></span>
            <span className="text-sm leading-tight">{label}</span>
          </Link>
        ))}
      </div>

      {duroos && (
        <section id="channels" className="mt-7 scroll-mt-20">
          <div className="mb-2 flex items-baseline justify-between">
            <h2 className="text-lg font-semibold">From the channels {cards.length > 0 && <span className="text-sm font-normal text-muted">({cards.length})</span>}</h2>
            <Link href="/admin/sources" className="text-sm text-muted">Channels</Link>
          </div>
          {watcherStale && (
            <p className="mb-2 rounded-xl bg-amber-bg px-3 py-2 text-sm text-amber">
              {lastChecked ? `The channel watcher last ran ${timeAgo(lastChecked)}.` : "The channel watcher hasn't run yet."} New posts aren&apos;t being picked up.
            </p>
          )}
          {cards.length ? <Suggestions items={cards} /> : <p className="card p-3.5 text-sm text-muted">Nothing waiting. New posts that need a person appear here.</p>}
        </section>
      )}

      {duroos && (
        <section className="mt-7">
          <h2 className="mb-2 text-lg font-semibold">Today&apos;s duroos <span className="text-sm font-normal text-muted">({today.lessons.length})</span></h2>
          <ul className="card divide-y divide-line">
            {today.lessons.map((l) => (
              <li key={l.slug} className={`flex items-center gap-3 p-3 ${l.phase === "done" ? "opacity-55" : ""}`}>
                <div className="w-16 shrink-0 text-xs text-muted">
                  <b className="block text-sm capitalize text-ink">{l.prayer}</b>{formatClock(new Date(l.adhanAt))}
                </div>
                {/* The row opens the dars page (where a change can be withdrawn); the tag sits under the name so it never squeezes it. */}
                <Link href={`/admin/duroos/lesson/${l.slug}`} className="block min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-semibold">{l.shaykh.nameEn}</p>
                  <p className="truncate text-xs text-muted">{l.bookEn} · {l.masjid.shortEn}</p>
                  {l.status !== "on" ? <span className="mt-1 inline-block"><StatusTag status={l.status} locale="en" /></span> : null}
                </Link>
                <ChangeDarsButton lessonSlug={l.slug} title={`${l.shaykh.nameEn}: ${l.bookEn}`} compact />
              </li>
            ))}
            {!today.lessons.length && <li className="p-3 text-sm text-muted">No duroos today.</li>}
          </ul>
        </section>
      )}

      {drafts.length > 0 && (
        <section id="drafts" className="mt-7 scroll-mt-20">
          <h2 className="mb-2 text-lg font-semibold">Waiting to publish</h2>
          <ul className="card divide-y divide-line">
            {drafts.slice(0, 6).map((d) => (
              <li key={d.href}><Link href={d.href} className="flex items-center justify-between gap-3 p-3 text-sm">
                <span className="truncate font-medium">{d.title}</span><span className="shrink-0 text-xs text-muted">{d.kind}</span>
              </Link></li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-7">
        <div className="mb-2 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold">Recent changes</h2>
          <Link href="/admin/activity" className="text-sm text-muted">All activity</Link>
        </div>
        <ActivityList
          canUndo={can(actor.role, "activity.undo")}
          items={activity.map((r) => ({ id: r.id, text: describeActivity(r), when: timeAgo(r.createdAt), undoable: isUndoable(r), undone: !!r.undoneAt }))}
        />
      </section>
    </div>
  );
}
