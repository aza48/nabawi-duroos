import { describe, expect, it } from "vitest";
import { sql } from "drizzle-orm";
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import * as schema from "@/server/db/schema";
import type { Db } from "@/server/db/client";
import { goLive } from "@/server/seed/go-live";

/** A database shaped like today's medinahub.org: old announcements + subscribers tables. */
async function oldSiteDb(): Promise<Db> {
  const db = drizzle(new PGlite(), { schema }) as unknown as Db;
  await db.execute(sql`CREATE TABLE announcements (id serial PRIMARY KEY, shaykh_id text NOT NULL, book_id text, type text NOT NULL,
    title_ar text NOT NULL, title_en text NOT NULL, body_ar text NOT NULL, body_en text NOT NULL, lesson_date date,
    status text NOT NULL DEFAULT 'draft', created_at timestamptz NOT NULL DEFAULT now(), published_at timestamptz, sent_at timestamptz,
    image text, shaykh_name_ar text, shaykh_name_en text)`);
  await db.execute(sql`INSERT INTO announcements (shaykh_id, type, title_ar, title_en, body_ar, body_en, lesson_date, status, published_at)
    VALUES ('ruhayli', 'cancelled', 'اعتذار', 'Lesson cancelled', 'يعتذر الشيخ', 'The shaykh excused himself', '2026-10-30', 'published', now()),
           ('badr', 'lecture', 'مسودة', 'Draft only', 'x', 'x', null, 'draft', null)`);
  await db.execute(sql`CREATE TABLE subscribers (id serial PRIMARY KEY, email text UNIQUE NOT NULL, status text NOT NULL DEFAULT 'pending')`);
  await db.execute(sql`INSERT INTO subscribers (email, status) VALUES ('a@example.com', 'confirmed')`);
  return db;
}
const runMigrations = (db: Db) => migrate(db as never, { migrationsFolder: "drizzle" });

describe("goLive", () => {
  it("plans the switch without changing anything in a dry run", async () => {
    const db = await oldSiteDb();
    const report = await goLive(db, { apply: false, migrate: runMigrations });
    expect(report.steps.join("\n")).toMatch(/rename the old announcements table/i);
    const t: any = await db.execute(sql`SELECT to_regclass('public.lessons') AS t`);
    expect((t.rows[0] as { t: string | null }).t).toBeNull();
  });

  it("keeps the old data, creates the new tables, seeds the schedule and carries over published announcements", async () => {
    const db = await oldSiteDb();
    const report = await goLive(db, { apply: true, migrate: runMigrations });
    const legacy: any = await db.execute(sql`SELECT count(*)::int AS n FROM legacy_announcements`);
    expect((legacy.rows[0] as { n: number }).n).toBe(2);
    const subs: any = await db.execute(sql`SELECT count(*)::int AS n FROM subscribers`);
    expect((subs.rows[0] as { n: number }).n).toBe(1);
    expect(report.counts?.lessons).toBe(45);
    const carried = await db.select().from(schema.announcements);
    expect(carried.some((a) => a.slug === "old-1" && a.status === "archived" && a.type === "cancellation")).toBe(true);
    expect(carried.some((a) => a.slug === "old-2")).toBe(false);
  });

  it("is safe to run twice", async () => {
    const db = await oldSiteDb();
    await goLive(db, { apply: true, migrate: runMigrations });
    const again = await goLive(db, { apply: true, migrate: runMigrations });
    expect(again.counts?.lessons).toBe(45);
  });
});
