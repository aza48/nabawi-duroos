import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, query, queryOne } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { noDb, bad } from "@/lib/mesh-api";
import { requireAdmin, audit } from "@/lib/mesh-admin";
import { logQuestionEvent, withinRestoreWindow } from "@/lib/mesh-lifecycle";

function restoreUntil(deletedAt: string): string {
  return new Date(new Date(deletedAt).getTime() + 30 * 24 * 3600 * 1000).toISOString();
}

export async function GET() {
  if (!dbConfigured()) return noDb(); try { await ensureMesh(); } catch { return noDb(); }
  const admin = await requireAdmin(); if (!admin) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const questions = await query(
    `SELECT q.id, q.title, q.deleted_at, q.deleted_by, u.display_name AS author_name, db.display_name AS deleted_by_name
     FROM mesh_questions q JOIN mesh_users u ON u.id=q.author_id LEFT JOIN mesh_users db ON db.id=q.deleted_by
     WHERE q.deleted_at IS NOT NULL ORDER BY q.deleted_at DESC LIMIT 200`);
  const answers = await query(
    `SELECT a.id, left(a.body, 160) AS excerpt, a.question_id, q.title AS question_title, a.deleted_at, a.deleted_by, u.display_name AS author_name, db.display_name AS deleted_by_name
     FROM mesh_answers a JOIN mesh_users u ON u.id=a.author_id LEFT JOIN mesh_questions q ON q.id=a.question_id LEFT JOIN mesh_users db ON db.id=a.deleted_by
     WHERE a.deleted_at IS NOT NULL ORDER BY a.deleted_at DESC LIMIT 200`);
  const tag = (rows: unknown, type: string): Record<string, unknown>[] =>
    (rows as Record<string, unknown>[]).map((r) => {
      const deletedAt = r.deleted_at as string;
      const out: Record<string, unknown> = { ...r, type, restorable: withinRestoreWindow(deletedAt), restore_until: restoreUntil(deletedAt) };
      return out;
    });
  const items = [...tag(questions, "question"), ...tag(answers, "answer")]
    .sort((a, b) => new Date(b.deleted_at as string).getTime() - new Date(a.deleted_at as string).getTime());
  return NextResponse.json({ items });
}

type TrashBody = { type?: unknown; id?: unknown; action?: unknown };
function parseBody(body: TrashBody): { type: "question" | "answer"; id: number } | null {
  const type = body.type === "question" || body.type === "answer" ? body.type : null;
  const id = typeof body.id === "number" ? body.id : parseInt(String(body.id ?? ""), 10);
  if (!type || !id) return null;
  return { type, id };
}

/** Restore from trash. Admin restore is not bound by the 30-day member window — the window is surfaced
 *  via the `restorable` flag; an admin may still rescue older items before purging them. */
export async function POST(req: NextRequest) {
  if (!dbConfigured()) return noDb(); try { await ensureMesh(); } catch { return noDb(); }
  const admin = await requireAdmin(); if (!admin) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const body = await req.json().catch(() => ({})) as TrashBody;
  if (body.action !== "restore") return bad("Invalid action");
  const parsed = parseBody(body); if (!parsed) return bad("Invalid body");
  const { type, id } = parsed;
  if (type === "question") {
    const q = await queryOne<{ id: number }>(`SELECT id FROM mesh_questions WHERE id=$1 AND deleted_at IS NOT NULL`, [id]);
    if (!q) return NextResponse.json({ error: "not_found" }, { status: 404 });
    await query(`UPDATE mesh_questions SET deleted_at=NULL, deleted_by=NULL, updated_at=now() WHERE id=$1`, [id]);
    await logQuestionEvent(id, admin.id, "restored");
  } else {
    const a = await queryOne<{ id: number; question_id: number }>(`SELECT id, question_id FROM mesh_answers WHERE id=$1 AND deleted_at IS NOT NULL`, [id]);
    if (!a) return NextResponse.json({ error: "not_found" }, { status: 404 });
    await query(`UPDATE mesh_answers SET deleted_at=NULL, deleted_by=NULL, updated_at=now() WHERE id=$1`, [id]);
    await logQuestionEvent(a.question_id, admin.id, "restored", `answer:${id}`);
  }
  await audit(admin.id, "trash_restore", type, id, null);
  return NextResponse.json({ ok: true });
}

/** Permanent delete. Questions cascade to their answers/tags/events; an answer that was the accepted
 *  solution nulls the question's accepted_answer_id via the FK's ON DELETE SET NULL. Dangling votes are swept. */
export async function DELETE(req: NextRequest) {
  if (!dbConfigured()) return noDb(); try { await ensureMesh(); } catch { return noDb(); }
  const admin = await requireAdmin(); if (!admin) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const body = await req.json().catch(() => ({})) as TrashBody;
  const parsed = parseBody(body); if (!parsed) return bad("Invalid body");
  const { type, id } = parsed;
  if (type === "question") {
    const q = await queryOne<{ id: number }>(`SELECT id FROM mesh_questions WHERE id=$1 AND deleted_at IS NOT NULL`, [id]);
    if (!q) return NextResponse.json({ error: "not_found" }, { status: 404 });
    await query(`DELETE FROM mesh_votes WHERE (target_type='question' AND target_id=$1) OR (target_type='answer' AND target_id IN (SELECT id FROM mesh_answers WHERE question_id=$1))`, [id]);
    await query(`DELETE FROM mesh_questions WHERE id=$1`, [id]);
  } else {
    const a = await queryOne<{ id: number }>(`SELECT id FROM mesh_answers WHERE id=$1 AND deleted_at IS NOT NULL`, [id]);
    if (!a) return NextResponse.json({ error: "not_found" }, { status: 404 });
    await query(`DELETE FROM mesh_votes WHERE target_type='answer' AND target_id=$1`, [id]);
    await query(`DELETE FROM mesh_answers WHERE id=$1`, [id]);
  }
  await audit(admin.id, "purge", type, id, null);
  return NextResponse.json({ ok: true });
}
