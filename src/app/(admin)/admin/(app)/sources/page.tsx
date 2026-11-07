import type { Metadata } from "next";
import Link from "next/link";
import { asc } from "drizzle-orm";
import { requireAdmin } from "@/server/auth/session";
import { getDb } from "@/server/db/client";
import { sources } from "@/server/db/schema";
import { SourceToggles } from "@/features/admin/watcher/SourceToggles";
import { timeAgo } from "@/features/admin/time";

export const metadata: Metadata = { title: "Channels" };

export default async function Page() {
  await requireAdmin("settings.write");
  const rows = await (await getDb()).select().from(sources).orderBy(asc(sources.handle));
  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/more" className="text-sm text-muted">← More</Link>
      <h1 className="mt-1 text-2xl font-semibold">Channels</h1>
      <p className="mb-4 mt-1 text-sm text-muted">
        MESH reads these public Telegram channels every few minutes. While automatic publishing is off (shadow mode),
        every change waits for a person and is marked when it would have been published on its own. Turn it on for a
        channel once its suggestions have been right for a couple of weeks.
      </p>
      <SourceToggles items={rows.map((s) => ({ handle: s.handle, name: s.name, trusted: s.trusted, autoPublish: s.autoPublish, lastChecked: s.lastCheckedAt ? timeAgo(s.lastCheckedAt) : "never", lastError: s.lastError }))} />
    </div>
  );
}
