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

export default async function Inbox() {
  const actor = await requireAdmin();
  const db = await getDb();
  const [today, drafts, activity] = await Promise.all([getToday(db), listDrafts(db), listActivity(db, { limit: 8 })]);
  const duroos = can(actor.role, "duroos.write");
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

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {actions.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className="card flex items-center gap-2.5 p-3.5 font-semibold transition hover:border-primary">
            <span className="grid size-9 place-items-center rounded-xl bg-bg-2 text-primary"><Icon size={18} /></span>
            <span className="text-sm leading-tight">{label}</span>
          </Link>
        ))}
      </div>

      {duroos && (
        <section className="mt-7">
          <h2 className="mb-2 text-lg font-semibold">Today&apos;s duroos <span className="text-sm font-normal text-muted">({today.lessons.length})</span></h2>
          <ul className="card divide-y divide-line">
            {today.lessons.map((l) => (
              <li key={l.slug} className={`flex items-center gap-3 p-3 ${l.phase === "done" ? "opacity-55" : ""}`}>
                <div className="w-16 shrink-0 text-xs text-muted">
                  <b className="block text-sm capitalize text-ink">{l.prayer}</b>{formatClock(new Date(l.adhanAt))}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{l.shaykh.nameEn}</p>
                  <p className="truncate text-xs text-muted">{l.bookEn} · {l.masjid.shortEn}</p>
                </div>
                {l.status !== "on" ? <StatusTag status={l.status} locale="en" /> : null}
                <ChangeDarsButton lessonSlug={l.slug} title={`${l.shaykh.nameEn}: ${l.bookEn}`} compact />
              </li>
            ))}
            {!today.lessons.length && <li className="p-3 text-sm text-muted">No duroos today.</li>}
          </ul>
        </section>
      )}

      {drafts.length > 0 && (
        <section className="mt-7">
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
