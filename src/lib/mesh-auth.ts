import { createHash, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { query, queryOne } from "./db";

export const MESH_COOKIE = "mesh_session";

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}
export function verifyPassword(password: string, stored: string): boolean {
  try {
    const [salt, hash] = stored.split(":");
    if (!salt || !hash) return false;
    const derived = scryptSync(password, salt, 64);
    const buf = Buffer.from(hash, "hex");
    return buf.length === derived.length && timingSafeEqual(buf, derived);
  } catch { return false; }
}
export function hashToken(token: string): string { return createHash("sha256").update(token).digest("hex"); }

export type MeshUser = { id: number; email: string; display_name: string; bio: string | null; role: string; is_seed: boolean; created_at: string; email_verified: boolean; entry_year_hijri: number | null; personal_email: string | null; country: string | null; suspended_at: string | null };

export async function createSession(userId: number): Promise<string> {
  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 30 * 24 * 3600 * 1000);
  await query(`INSERT INTO mesh_sessions (user_id, token_hash, expires_at) VALUES ($1,$2,$3)`, [userId, hashToken(token), expires.toISOString()]);
  return token;
}
export function setSessionCookie(token: string) {
  cookies().set(MESH_COOKIE, token, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 30 * 24 * 3600 });
}
export function clearSessionCookie() { cookies().set(MESH_COOKIE, "", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 0 }); }

function bootstrapAdminEmails(): Set<string> {
  return new Set((process.env.MESH_ADMIN_EMAILS || "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean));
}

export async function getCurrentUser(): Promise<MeshUser | null> {
  try {
    const token = cookies().get(MESH_COOKIE)?.value;
    if (!token) return null;
    const row = await queryOne<MeshUser & { sid: number }>(
      `SELECT u.id,u.email,u.display_name,u.bio,u.role,u.is_seed,u.created_at,u.email_verified,u.entry_year_hijri,u.personal_email,u.country, s.id as sid FROM mesh_sessions s JOIN mesh_users u ON u.id=s.user_id WHERE s.token_hash=$1 AND s.expires_at>now()`, [hashToken(token)]);
    if (!row) return null;
    const user: MeshUser = { id: row.id, email: row.email, display_name: row.display_name, bio: row.bio, role: row.role, is_seed: row.is_seed, created_at: row.created_at, email_verified: row.email_verified, entry_year_hijri: row.entry_year_hijri, personal_email: row.personal_email, country: row.country, suspended_at: null };
    // Phase 5 columns are read separately so a pre-init database can never break session lookup.
    try {
      const extra = await queryOne<{ suspended_at: string | null }>(`SELECT suspended_at FROM mesh_users WHERE id=$1`, [user.id]);
      user.suspended_at = extra?.suspended_at ?? null;
    } catch { /* column not migrated yet — treat as not suspended */ }
    // A suspended account's live sessions die here: every route resolves the viewer through getCurrentUser.
    if (user.suspended_at) return null;
    // Bootstrap: emails listed in MESH_ADMIN_EMAILS are promoted to admin on first authenticated touch.
    if (user.role !== "admin" && bootstrapAdminEmails().has(user.email.toLowerCase())) {
      try {
        await query(`UPDATE mesh_users SET role='admin' WHERE id=$1`, [user.id]);
        user.role = "admin";
        try { await query(`INSERT INTO mesh_audit_log (actor_id, action, target_type, target_id, detail) VALUES ($1,'admin_bootstrap','user',$1,'Promoted via MESH_ADMIN_EMAILS')`, [user.id]); } catch { /* audit table may not exist pre-init */ }
      } catch { /* promotion is best-effort; the env list is re-checked on every request */ }
    }
    return user;
  } catch { return null; }
}
export async function requireUser(): Promise<MeshUser | null> { return getCurrentUser(); }
export async function destroySession(): Promise<void> {
  try {
    const token = cookies().get(MESH_COOKIE)?.value;
    if (token) await query(`DELETE FROM mesh_sessions WHERE token_hash=$1`, [hashToken(token)]);
  } catch { /* ignore */ }
  clearSessionCookie();
}
