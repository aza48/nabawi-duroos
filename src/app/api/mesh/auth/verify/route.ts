
import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, query, queryOne } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { createSession, setSessionCookie } from "@/lib/mesh-auth";
import { verifyCode } from "@/lib/mesh-codes";
import { noDb, clean } from "@/lib/mesh-api";

export async function POST(req: NextRequest) {
  if (!dbConfigured()) return noDb(); try { await ensureMesh(); } catch { return noDb(); }
  const body = await req.json().catch(() => ({})) as Record<string, unknown>;
  const email = clean(body.email, 200).toLowerCase();
  const code = clean(body.code, 10);
  const user = await queryOne<{ id: number; display_name: string; role: string; email_verified: boolean }>(`SELECT id,display_name,role,email_verified FROM mesh_users WHERE email=$1`, [email]);
  if (!user || !code) return NextResponse.json({ error: "invalid_code" }, { status: 400 });
  if (user.email_verified) return NextResponse.json({ error: "invalid_code" }, { status: 400 });
  const result = await verifyCode(user.id, "signup", code);
  if (result === "too_many") return NextResponse.json({ error: "too_many_attempts" }, { status: 429 });
  if (result !== "ok") return NextResponse.json({ error: "invalid_code" }, { status: 400 });
  await query(`UPDATE mesh_users SET email_verified=true WHERE id=$1`, [user.id]);
  const token = await createSession(user.id); setSessionCookie(token);
  return NextResponse.json({ user: { id: user.id, display_name: user.display_name, role: user.role } });
}
