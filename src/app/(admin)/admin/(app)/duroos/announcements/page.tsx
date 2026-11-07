import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { requireAdmin } from "@/server/auth/session";
import { getDb } from "@/server/db/client";
import { adminAnnouncements } from "@/server/admin/queries";
import { DUROOS_NAV, SubNav, btnGhost } from "@/features/admin/ui";

export const metadata: Metadata = { title: "Updates" };

const BADGE: Record<string, string> = { draft: "bg-amber-bg text-amber", published: "bg-on-bg text-on", archived: "bg-bg-2 text-muted" };

export default async function Page() {
  await requireAdmin("announcements.write");
  const rows = await adminAnnouncements(await getDb());
  return (
    <div className="mx-auto max-w-2xl">
      <SubNav items={DUROOS_NAV} active="/admin/duroos/announcements" />
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Updates</h1>
        <Link href="/admin/duroos/announcements/new" className={btnGhost}><Plus size={15} /> New update</Link>
      </div>
      <ul className="card divide-y divide-line">
        {rows.map((a) => (
          <li key={a.slug}>
            <Link href={`/admin/duroos/announcements/${a.slug}`} className="flex items-center gap-3 p-3">
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">{a.titleEn}</span>
                <span className="block text-xs text-muted">{a.eventDate ?? a.postedAt.toISOString().slice(0, 10)}</span>
              </span>
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold capitalize ${BADGE[a.status]}`}>{a.status}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
