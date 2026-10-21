
import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, queryOne } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { brevoConfigured, sendMeshEmail, meshCodeEmail } from "@/lib/mesh-email";
import { issueCode, resendStatus, type CodePurpose } from "@/lib/mesh-codes";
import { noDb, clean } from "@/lib/mesh-api";

export async function POST(req: NextRequest) {
  if (!dbConfigured()) return noDb(); try { await ensureMesh(); } catch { return noDb(); }
  const body = await req.json().catch(() => ({})) as Record<string, unknown>;
  const email = clean(body.email, 200).toLowerCase();
  const purpose: CodePurpose = body.purpose === "reset" ? "reset" : "signup";
  const user = await queryOne<{ id: number; email_verified: boolean; personal_email: string | null }>(`SELECT id,email_verified,personal_email FROM mesh_users WHERE email=$1`, [email]);
  // Generic response for unknown accounts (and for reset, never reveal existence).
  if (!user) return NextResponse.json({ ok: true });
  if (purpose === "signup" && user.email_verified) return NextResponse.json({ ok: true });
  if (purpose === "reset" && !user.email_verified) return NextResponse.json({ ok: true });
  const status = await resendStatus(user.id, purpose);
  if (!status.allowed) {
    return status.reason === "too_soon"
      ? NextResponse.json({ error: "resend_too_soon" }, { status: 429 })
      : NextResponse.json({ error: "too_many_attempts" }, { status: 429 });
  }
  if (!brevoConfigured()) return NextResponse.json({ error: "email_not_configured" }, { status: 503 });
  const code = await issueCode(user.id, purpose);
  const mail = meshCodeEmail(code, purpose);
  await sendMeshEmail(email, mail.subject, mail.html);
  if (purpose === "reset" && user.personal_email) await sendMeshEmail(user.personal_email, mail.subject, mail.html);
  return NextResponse.json({ ok: true });
}
