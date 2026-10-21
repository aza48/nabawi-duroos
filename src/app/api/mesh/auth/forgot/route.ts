
import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, queryOne } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { brevoConfigured, sendMeshEmail, meshCodeEmail } from "@/lib/mesh-email";
import { issueCode, resendStatus } from "@/lib/mesh-codes";
import { noDb, clean } from "@/lib/mesh-api";

/** Always responds {ok:true} — never reveals whether an account exists. Rate limits apply silently. */
export async function POST(req: NextRequest) {
  if (!dbConfigured()) return noDb(); try { await ensureMesh(); } catch { return noDb(); }
  const body = await req.json().catch(() => ({})) as Record<string, unknown>;
  const email = clean(body.email, 200).toLowerCase();
  try {
    const user = await queryOne<{ id: number; email_verified: boolean; personal_email: string | null }>(`SELECT id,email_verified,personal_email FROM mesh_users WHERE email=$1`, [email]);
    if (user && user.email_verified && brevoConfigured()) {
      const status = await resendStatus(user.id, "reset");
      if (status.allowed) {
        const code = await issueCode(user.id, "reset");
        const mail = meshCodeEmail(code, "reset");
        await sendMeshEmail(email, mail.subject, mail.html);
        if (user.personal_email) await sendMeshEmail(user.personal_email, mail.subject, mail.html);
      }
    }
  } catch { /* stay generic */ }
  return NextResponse.json({ ok: true });
}
