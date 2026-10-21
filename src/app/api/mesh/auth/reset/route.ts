
import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, query, queryOne } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { hashPassword } from "@/lib/mesh-auth";
import { verifyCode } from "@/lib/mesh-codes";
import { noDb, bad, clean } from "@/lib/mesh-api";

export async function POST(req: NextRequest) {
  if (!dbConfigured()) return noDb(); try { await ensureMesh(); } catch { return noDb(); }
  const body = await req.json().catch(() => ({})) as Record<string, unknown>;
  const email = clean(body.email, 200).toLowerCase();
  const code = clean(body.code, 10);
  const newPassword = typeof body.newPassword === "string" ? body.newPassword : "";
  if (newPassword.length < 8) return bad("Password must be at least 8 characters");
  const user = await queryOne<{ id: number }>(`SELECT id FROM mesh_users WHERE email=$1`, [email]);
  if (!user || !code) return NextResponse.json({ error: "invalid_code" }, { status: 400 });
  const result = await verifyCode(user.id, "reset", code);
  if (result === "too_many") return NextResponse.json({ error: "too_many_attempts" }, { status: 429 });
  if (result !== "ok") return NextResponse.json({ error: "invalid_code" }, { status: 400 });
  await query(`UPDATE mesh_users SET password_hash=$1 WHERE id=$2`, [hashPassword(newPassword), user.id]);
  // Force re-login everywhere after a reset.
  await query(`DELETE FROM mesh_sessions WHERE user_id=$1`, [user.id]);
  return NextResponse.json({ ok: true });
}
