import { desc, eq } from "drizzle-orm";
import type { PgTable } from "drizzle-orm/pg-core";
import type { Db } from "@/server/db/client";
import { announcements, auditLog, faqs, guides, lessonOverrides, lessons, settings, shaykhs } from "@/server/db/schema";
import { assertCan, type Actor } from "@/server/auth/permissions";

export type AuditRow = typeof auditLog.$inferSelect;
export type Entity = "lesson" | "shaykh" | "override" | "announcement" | "faq" | "guide" | "setting";

type Target = { table: PgTable; key: string; column: string; numericId?: boolean };

const TARGETS: Record<Entity, Target> = {
  lesson: { table: lessons, key: "slug", column: "slug" },
  shaykh: { table: shaykhs, key: "slug", column: "slug" },
  override: { table: lessonOverrides, key: "id", column: "id", numericId: true },
  announcement: { table: announcements, key: "slug", column: "slug" },
  faq: { table: faqs, key: "slug", column: "slug" },
  guide: { table: guides, key: "slug", column: "slug" },
  setting: { table: settings, key: "key", column: "key" },
};

export async function record(
  db: Db,
  actor: Actor | "system",
  e: { action: "create" | "update" | "delete" | "undo"; entity: Entity; entityId: string; before: unknown; after: unknown; undoOf?: number }
): Promise<number> {
  const [row] = await db
    .insert(auditLog)
    .values({
      actorId: actor === "system" ? null : actor.id,
      actorName: actor === "system" ? "MESH" : actor.name,
      action: e.action,
      entity: e.entity,
      entityId: e.entityId,
      before: e.before ?? null,
      after: e.after ?? null,
      undoOf: e.undoOf ?? null,
    })
    .returning({ id: auditLog.id });
  return row.id;
}

export async function listActivity(db: Db, opts: { limit?: number } = {}): Promise<AuditRow[]> {
  return db.select().from(auditLog).orderBy(desc(auditLog.id)).limit(opts.limit ?? 50);
}

/** JSON snapshots turn Dates into strings; timestamp columns need Dates back. */
function revive(snapshot: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(snapshot)) {
    out[k] = typeof v === "string" && /At$/.test(k) && !Number.isNaN(Date.parse(v)) ? new Date(v) : v;
  }
  return out;
}

export type UndoResult = { ok: true } | { ok: false; error: "already_undone" | "missing_row" | "not_undoable" };

export async function undo(db: Db, actor: Actor, auditId: number): Promise<UndoResult> {
  assertCan(actor, "activity.undo");
  const [entry] = await db.select().from(auditLog).where(eq(auditLog.id, auditId));
  if (!entry || entry.action === "undo" || !(entry.entity in TARGETS)) return { ok: false, error: "not_undoable" };
  if (entry.undoneAt) return { ok: false, error: "already_undone" };

  const t = TARGETS[entry.entity as Entity];
  const col = (t.table as unknown as Record<string, Parameters<typeof eq>[0]>)[t.key];
  const id = t.numericId ? Number(entry.entityId) : entry.entityId;
  const [current] = await db.select().from(t.table).where(eq(col, id));

  if (entry.action === "create") {
    if (!current) return { ok: false, error: "missing_row" };
    if (entry.entity === "override") {
      await db.update(lessonOverrides).set({ revokedAt: new Date() }).where(eq(lessonOverrides.id, Number(id)));
    } else {
      await db.delete(t.table).where(eq(col, id));
    }
  } else if (entry.action === "update") {
    if (!current) return { ok: false, error: "missing_row" };
    await db.update(t.table).set(revive(entry.before as Record<string, unknown>)).where(eq(col, id));
  } else if (entry.action === "delete") {
    if (current) return { ok: false, error: "not_undoable" };
    await db.insert(t.table).values(revive(entry.before as Record<string, unknown>));
  } else {
    return { ok: false, error: "not_undoable" };
  }

  await db.update(auditLog).set({ undoneAt: new Date() }).where(eq(auditLog.id, entry.id));
  await record(db, actor, { action: "undo", entity: entry.entity as Entity, entityId: entry.entityId, before: entry.after, after: entry.before, undoOf: entry.id });
  return { ok: true };
}
