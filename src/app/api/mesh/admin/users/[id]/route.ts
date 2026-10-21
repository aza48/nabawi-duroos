import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, query, queryOne } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { noDb, bad, clean } from "@/lib/mesh-api";
import { requireAdmin, audit, ensureTombstoneUser } from "@/lib/mesh-admin";

const ROLES = ["member", "mandoob", "admin"];
type TargetRow = { id: number; email: string; display_name: string; role: string; country: string | null; is_seed: boolean; suspended_at: string | null };

async function adminCount(): Promise<number> {
  const row = await queryOne<{ c: string }>(`SELECT count(*)::text AS c FROM mesh_users WHERE role='admin'`);
  return parseInt(row?.c || "0", 10);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!dbConfigured()) return noDb(); try { await ensureMesh(); } catch { return noDb(); }
  const admin = await requireAdmin(); if (!admin) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const id = parseInt(params.id, 10); if (!id) return bad("Invalid id", 404);
  const target = await queryOne<TargetRow>(`SELECT id, email, display_name, role, country, is_seed, suspended_at FROM mesh_users WHERE id=$1`, [id]);
  if (!target) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const body = await req.json().catch(() => ({})) as Record<string, unknown>;

  const hasRole = typeof body.role === "string";
  const newRole = hasRole ? (body.role as string) : target.role;
  if (hasRole && !ROLES.includes(newRole)) return bad("Invalid role");
  const hasCountry = typeof body.country === "string" || body.country === null;
  const newCountry = hasCountry ? (typeof body.country === "string" ? (clean(body.country, 60) || null) : null) : target.country;
  const hasSuspended = typeof body.suspended === "boolean";
  const suspend = hasSuspended ? (body.suspended as boolean) : !!target.suspended_at;

  const demoting = hasRole && target.role === "admin" && newRole !== "admin";
  const suspending = suspend && !target.suspended_at;
  if ((demoting || suspending) && target.id === admin.id) return NextResponse.json({ error: "cannot_modify_self" }, { status: 400 });
  if ((demoting || suspending) && target.role === "admin" && (await adminCount()) <= 1) return NextResponse.json({ error: "last_admin" }, { status: 400 });

  const changes: string[] = [];
  if (hasRole && newRole !== target.role) changes.push(`role: ${target.role} -> ${newRole}`);
  if (hasCountry && newCountry !== target.country) changes.push(`country: ${target.country ?? "—"} -> ${newCountry ?? "—"}`);
  if (hasSuspended && suspend !== !!target.suspended_at) changes.push(suspend ? "suspended" : "unsuspended");
  if (!changes.length) return NextResponse.json({ ok: true, unchanged: true });

  await query(
    `UPDATE mesh_users SET role=$1, country=$2, suspended_at = CASE WHEN $3::boolean THEN now() ELSE NULL END WHERE id=$4`,
    [newRole, newCountry, suspend, id]);
  // Suspending kills live access immediately: drop their sessions (getCurrentUser also refuses suspended users).
  if (suspending) await query(`DELETE FROM mesh_sessions WHERE user_id=$1`, [id]);
  await audit(admin.id, "user_update", "user", id, changes.join("; "));
  const updated = await queryOne<TargetRow>(`SELECT id, email, display_name, role, country, is_seed, suspended_at FROM mesh_users WHERE id=$1`, [id]);
  return NextResponse.json({ ok: true, user: updated });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!dbConfigured()) return noDb(); try { await ensureMesh(); } catch { return noDb(); }
  const admin = await requireAdmin(); if (!admin) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const id = parseInt(params.id, 10); if (!id) return bad("Invalid id", 404);
  const target = await queryOne<TargetRow>(`SELECT id, email, display_name, role, country, is_seed, suspended_at FROM mesh_users WHERE id=$1`, [id]);
  if (!target) return NextResponse.json({ error: "not_found" }, { status: 404 });
  if (target.id === admin.id) return NextResponse.json({ error: "cannot_modify_self" }, { status: 400 });
  if (target.is_seed) return NextResponse.json({ error: "seed_user" }, { status: 400 });
  if (target.role === "admin" && (await adminCount()) <= 1) return NextResponse.json({ error: "last_admin" }, { status: 400 });

  // Anonymize, don't orphan: their questions and answers move to the "Deleted User" tombstone so threads stay readable.
  const tombstoneId = await ensureTombstoneUser();
  await query(`UPDATE mesh_questions SET author_id=$1 WHERE author_id=$2`, [tombstoneId, id]);
  await query(`UPDATE mesh_answers SET author_id=$1 WHERE author_id=$2`, [tombstoneId, id]);
  await query(`DELETE FROM mesh_votes WHERE user_id=$1`, [id]);
  await query(`UPDATE mesh_reports SET reporter_id=NULL WHERE reporter_id=$1`, [id]);
  await query(`UPDATE mesh_notifications SET actor_id=NULL WHERE actor_id=$1`, [id]);
  // Sessions, email codes and the user's own notifications cascade on the user delete (FK ON DELETE CASCADE);
  // question events keep history via ON DELETE SET NULL.
  await query(`DELETE FROM mesh_users WHERE id=$1`, [id]);
  await audit(admin.id, "user_delete", "user", id, target.email);
  return NextResponse.json({ ok: true });
}
