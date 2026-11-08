import { and, desc, eq, isNull } from "drizzle-orm";
import type { PgTable } from "drizzle-orm/pg-core";
import type { Db } from "@/server/db/client";
import { announcements, auditLog, faqs, guides, lessonOverrides, lessons, settings, shaykhs, sources } from "@/server/db/schema";
import { assertCan, type Actor } from "@/server/auth/permissions";

export type AuditRow = typeof auditLog.$inferSelect;
export type Entity = "lesson" | "shaykh" | "override" | "announcement" | "faq" | "guide" | "setting" | "source" | "admin";

type Target = { table: PgTable; key: string; column: string; numericId?: boolean };

const TARGETS: Partial<Record<Entity, Target>> = {
  lesson: { table: lessons, key: "slug", column: "slug" },
  shaykh: { table: shaykhs, key: "slug", column: "slug" },
  override: { table: lessonOverrides, key: "id", column: "id", numericId: true },
  announcement: { table: announcements, key: "slug", column: "slug" },
  faq: { table: faqs, key: "slug", column: "slug" },
  guide: { table: guides, key: "slug", column: "slug" },
  setting: { table: settings, key: "key", column: "key" },
  source: { table: sources, key: "handle", column: "handle" },
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
  if (!t) return { ok: false, error: "not_undoable" };
  const target: Target = t;
  const col = (target.table as unknown as Record<string, Parameters<typeof eq>[0]>)[target.key];
  const id = target.numericId ? Number(entry.entityId) : entry.entityId;
  const [current] = await db.select().from(target.table).where(eq(col, id));

  // Claim the undo first, so two clicks (or two admins) cannot apply it twice.
  const claimed = await db.update(auditLog).set({ undoneAt: new Date() }).where(and(eq(auditLog.id, entry.id), isNull(auditLog.undoneAt))).returning({ id: auditLog.id });
  if (!claimed.length) return { ok: false, error: "already_undone" };
  const release = () => db.update(auditLog).set({ undoneAt: null }).where(eq(auditLog.id, entry.id));

  try {
    const applied = await apply();
    if (!applied.ok) {
      await release();
      return applied;
    }
  } catch (e) {
    await release();
    throw e;
  }
  await record(db, actor, { action: "undo", entity: entry.entity as Entity, entityId: entry.entityId, before: entry.after, after: entry.before, undoOf: entry.id });
  return { ok: true };

  async function apply(): Promise<UndoResult> {
  if (entry.action === "create") {
    if (!current) return { ok: false, error: "missing_row" };
    if (entry.entity === "override") {
      await db.update(lessonOverrides).set({ revokedAt: new Date() }).where(eq(lessonOverrides.id, Number(id)));
    } else {
      await db.delete(target.table).where(eq(col, id));
    }
  } else if (entry.action === "update") {
    if (!current) return { ok: false, error: "missing_row" };
    await db.update(target.table).set(revive(entry.before as Record<string, unknown>)).where(eq(col, id));
  } else if (entry.action === "delete") {
    if (current) return { ok: false, error: "not_undoable" };
    await db.insert(target.table).values(revive(entry.before as Record<string, unknown>));
  } else {
    return { ok: false, error: "not_undoable" };
  }
  return { ok: true };
  }
}
