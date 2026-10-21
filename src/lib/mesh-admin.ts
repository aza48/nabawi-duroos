import { query, queryOne } from "./db";
import { getCurrentUser, type MeshUser } from "./mesh-auth";

/** Admin gate for the /api/mesh/admin/* routes. getCurrentUser already returns null for suspended users,
 *  so a suspended admin loses console access along with everything else. */
export async function requireAdmin(): Promise<MeshUser | null> {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") return null;
  return user;
}

/** Append to the admin audit log. Best-effort by design: auditing must never fail the action it records. */
export async function audit(actorId: number | null, action: string, targetType: string | null, targetId: number | null, detail?: string | null): Promise<void> {
  try {
    await query(`INSERT INTO mesh_audit_log (actor_id, action, target_type, target_id, detail) VALUES ($1,$2,$3,$4,$5)`, [actorId, action, targetType, targetId, detail ?? null]);
  } catch { /* ignore */ }
}

export const TOMBSTONE_EMAIL = "deleted-user@mesh.local";

/** The "Deleted User" account that inherits a deleted member's questions and answers (Stack Overflow model).
 *  It is a seed-style account: it can never log in ('seed-no-login' password hash). */
export async function ensureTombstoneUser(): Promise<number> {
  const existing = await queryOne<{ id: number }>(`SELECT id FROM mesh_users WHERE email=$1`, [TOMBSTONE_EMAIL]);
  if (existing) return existing.id;
  const created = await queryOne<{ id: number }>(
    `INSERT INTO mesh_users (email, display_name, password_hash, is_seed, email_verified) VALUES ($1,'Deleted User','seed-no-login',true,true)
     ON CONFLICT (email) DO UPDATE SET display_name=EXCLUDED.display_name RETURNING id`, [TOMBSTONE_EMAIL]);
  if (!created) throw new Error("tombstone_user_failed");
  return created.id;
}
