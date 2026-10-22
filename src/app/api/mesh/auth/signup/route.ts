
import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, query, queryOne } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { hashPassword } from "@/lib/mesh-auth";
import { brevoConfigured, sendMeshEmail, meshCodeEmail } from "@/lib/mesh-email";
import { issueCode } from "@/lib/mesh-codes";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
import { noDb, bad, clean } from "@/lib/mesh-api";

export async function POST(req: NextRequest) {
  if (!dbConfigured()) return noDb(); try { await ensureMesh(); } catch { return noDb(); }
  const body = await req.json().catch(() => ({})) as Record<string, unknown>;
  const displayName = clean(body.displayName, 60);
  const email = clean(body.email, 200).toLowerCase();
  const password = typeof body.password === "string" ? body.password : "";
  if (!displayName) return bad("Display name is required");
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  if (password.length < 8) return bad("Password must be at least 8 characters");
  // Verification is impossible without a working sender — fail before creating anything so the address is not bricked.
  if (!brevoConfigured()) return NextResponse.json({ error: "email_not_configured" }, { status: 503 });

  const existing = await queryOne<{ id: number; email_verified: boolean }>(`SELECT id, email_verified FROM mesh_users WHERE email=$1`, [email]);
  if (existing && existing.email_verified) return NextResponse.json({ error: "Email already registered" }, { status: 409 });

  let userId: number;
  if (existing) {
    // Re-signup of an unverified account: refresh name/password and issue a fresh code.
    await query(`UPDATE mesh_users SET display_name=$1, password_hash=$2 WHERE id=$3`, [displayName, hashPassword(password), existing.id]);
    userId = existing.id;
  } else {
    const user = await queryOne<{ id: number }>(
      `INSERT INTO mesh_users (email,display_name,password_hash,email_verified,role,is_seed) VALUES ($1,$2,$3,false,'member',false) RETURNING id`,
      [email, displayName, hashPassword(password)]
    );
    if (!user) return bad("Could not create account", 500);
    userId = user.id;
  }

  const code = await issueCode(userId, "signup");
  const mail = meshCodeEmail(code, "signup");
  const sent = await sendMeshEmail(email, mail.subject, mail.html);
  if (!sent) {
    // Keep the unverified account: it stays visible in the admin console, and the member can
    // request a fresh code (resend / signing up again) once sending recovers — never delete it.
    return NextResponse.json({ error: "email_send_failed" }, { status: 503 });
  }
  return NextResponse.json({ needsVerification: true, email, emailSent: true }, { status: 201 });
}
