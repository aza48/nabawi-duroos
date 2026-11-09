import { eq } from "drizzle-orm";
import type { Db } from "@/server/db/client";
import { shaykhs } from "@/server/db/schema";
import { record } from "@/server/admin/audit";

/**
 * Each shaykh's current positions: the role line and the verified facts on his profile.
 * Filled from docs/research/mashayikh-positions-2026-11.md (every line has a source there).
 * Keyed by the shaykh's slug. Published to the live site with: npm run shaykh:sync -- --apply
 */
export type ShaykhPosition = {
  roleEn: string;
  roleAr: string;
  facts: { en: string; ar: string }[];
  /** Only when the title in his name is wrong today (for example "Dr." who is now "Prof. Dr."). */
  nameEn?: string;
  nameAr?: string;
};

export const MASHAYIKH_POSITIONS: Record<string, ShaykhPosition> = {};

export type ShaykhChange = { slug: string; field: "role" | "facts" | "name"; before: string; after: string };

/** What a sync would change, without writing. Unknown slugs are reported, never created. */
export async function planShaykhSync(db: Db, positions = MASHAYIKH_POSITIONS, only?: string[]): Promise<{ changes: ShaykhChange[]; missing: string[] }> {
  const changes: ShaykhChange[] = [];
  const missing: string[] = [];
  for (const [slug, p] of Object.entries(positions)) {
    if (only?.length && !only.includes(slug)) continue;
    const [row] = await db.select().from(shaykhs).where(eq(shaykhs.slug, slug));
    if (!row) { missing.push(slug); continue; }
    const role = (en: string | null, ar: string | null) => `${en ?? ""} | ${ar ?? ""}`;
    if (role(row.roleEn, row.roleAr) !== role(p.roleEn, p.roleAr)) changes.push({ slug, field: "role", before: role(row.roleEn, row.roleAr), after: role(p.roleEn, p.roleAr) });
    // Compare facts as (en, ar) pairs: the database may return each fact's keys in another order.
    const pairs = (f: { en: string; ar: string }[]) => JSON.stringify(f.map((x) => [x.en, x.ar]));
    if (pairs(row.facts ?? []) !== pairs(p.facts)) changes.push({ slug, field: "facts", before: `${(row.facts ?? []).length} facts`, after: `${p.facts.length} facts` });
    if ((p.nameEn && p.nameEn !== row.nameEn) || (p.nameAr && p.nameAr !== row.nameAr)) changes.push({ slug, field: "name", before: `${row.nameEn} | ${row.nameAr}`, after: `${p.nameEn ?? row.nameEn} | ${p.nameAr ?? row.nameAr}` });
  }
  return { changes, missing };
}

/** Writes the positions to the live rows, one audit entry per shaykh, so every change can be undone in Activity. */
export async function syncShaykhPositions(db: Db, positions = MASHAYIKH_POSITIONS, only?: string[]): Promise<{ updated: string[]; missing: string[] }> {
  const updated: string[] = [];
  const { missing } = await planShaykhSync(db, positions, only);
  for (const [slug, p] of Object.entries(positions)) {
    if ((only?.length && !only.includes(slug)) || missing.includes(slug)) continue;
    const [before] = await db.select().from(shaykhs).where(eq(shaykhs.slug, slug));
    const set = { roleEn: p.roleEn, roleAr: p.roleAr, facts: p.facts, ...(p.nameEn ? { nameEn: p.nameEn } : {}), ...(p.nameAr ? { nameAr: p.nameAr } : {}) };
    const [after] = await db.update(shaykhs).set(set).where(eq(shaykhs.slug, slug)).returning();
    await record(db, "system", { action: "update", entity: "shaykh", entityId: slug, before, after });
    updated.push(slug);
  }
  return { updated, missing };
}
