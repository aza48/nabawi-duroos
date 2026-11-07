import { sql } from "drizzle-orm";
import type { Db } from "@/server/db/client";
import { announcements } from "@/server/db/schema";
import { riyadhDateIso } from "@/lib/time/riyadh";
import { importLegacy } from "./import-legacy";

/**
 * Switches the live database from the old site to MESH v2.
 *  1. The old site's `announcements` table is renamed to `legacy_announcements` (kept, not deleted).
 *  2. The v2 tables are created (Drizzle migrations).
 *  3. The verified schedule, guides and channel list are loaded.
 *  4. Published old announcements are copied into the new feed.
 * Old tables that don't clash (subscribers, subscriptions, email_log, mesh_*) are left untouched.
 * Dry run by default: { apply: false } only reports what would happen.
 */

const OLD_TYPE: Record<string, string> = {
  cancelled: "cancellation", delayed: "postponement", paused: "postponement", resumed: "resumption",
  book_started: "new-book", book_finished: "book-finished", guest: "guest", lecture: "lecture",
};

type Row = Record<string, unknown>;
const rows = (r: unknown): Row[] => ((r as { rows?: Row[] }).rows ?? (r as Row[])) as Row[];

export async function goLive(db: Db, opts: { apply: boolean; migrate: (db: Db) => Promise<void> }) {
  const steps: string[] = [];
  const oldShape = rows(await db.execute(sql`
    SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='announcements') AS has_table,
           EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='announcements' AND column_name='slug') AS has_slug,
           EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='legacy_announcements') AS has_legacy`))[0];
  const needsRename = !!oldShape.has_table && !oldShape.has_slug && !oldShape.has_legacy;

  if (needsRename) steps.push("Rename the old announcements table to legacy_announcements (data kept)");
  steps.push("Create or update the MESH v2 tables");
  steps.push("Load the verified schedule, shuyukh, guides and channel list");
  steps.push("Copy published old announcements into the new updates feed");
  if (!opts.apply) return { applied: false, steps, counts: null as null | Awaited<ReturnType<typeof importLegacy>> };

  if (needsRename) {
    await db.execute(sql`ALTER TABLE announcements RENAME TO legacy_announcements`);
    await db.execute(sql`ALTER SEQUENCE IF EXISTS announcements_id_seq RENAME TO legacy_announcements_id_seq`);
    await db.execute(sql`ALTER INDEX IF EXISTS announcements_pkey RENAME TO legacy_announcements_pkey`);
  }
  await opts.migrate(db);
  const counts = await importLegacy(db);

  const hasLegacy = rows(await db.execute(sql`SELECT to_regclass('public.legacy_announcements') IS NOT NULL AS ok`))[0].ok;
  if (hasLegacy) {
    const today = riyadhDateIso();
    const old = rows(await db.execute(sql`SELECT * FROM legacy_announcements WHERE status = 'published'`));
    for (const o of old) {
      const lessonDate = o.lesson_date ? new Date(o.lesson_date as string).toISOString().slice(0, 10) : null;
      const posted = (o.published_at ?? o.created_at ?? new Date()) as Date | string;
      await db
        .insert(announcements)
        .values({
          slug: `old-${o.id}`,
          guestNameEn: (o.shaykh_name_en as string) ?? null,
          guestNameAr: (o.shaykh_name_ar as string) ?? null,
          type: OLD_TYPE[String(o.type)] ?? "info",
          titleEn: String(o.title_en), titleAr: String(o.title_ar),
          bodyEn: String(o.body_en), bodyAr: String(o.body_ar),
          eventDate: lessonDate,
          postedAt: new Date(posted), publishedAt: new Date(posted),
          status: lessonDate && lessonDate < today ? "archived" : "published",
        })
        .onConflictDoNothing({ target: announcements.slug });
    }
  }
  return { applied: true, steps, counts };
}
