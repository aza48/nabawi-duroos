import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, initDb, query, queryOne, SubscriberRow } from "../../../lib/db";
import { confirmationEmail, sendEmail } from "../../../lib/email";
import { isValidScope } from "../../../lib/scopes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* Very light in-memory per-IP rate limit (best-effort on serverless). */
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 5;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: NextRequest) {
  if (!dbConfigured()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: { email?: unknown; scopeType?: unknown; scopeId?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  const scopeType = typeof body.scopeType === "string" ? body.scopeType : null;
  const scopeId = typeof body.scopeId === "string" ? body.scopeId : null;
  if ((scopeType === null) !== (scopeId === null)) {
    return NextResponse.json({ error: "invalid_scope" }, { status: 400 });
  }
  if (scopeType && scopeId && !isValidScope(scopeType, scopeId)) {
    return NextResponse.json({ error: "invalid_scope" }, { status: 400 });
  }

  try {
    await initDb();
    let sub = await queryOne<SubscriberRow>(
      `SELECT * FROM subscribers WHERE email = $1`,
      [email]
    );
    if (!sub) {
      sub = await queryOne<SubscriberRow>(
        `INSERT INTO subscribers (email, confirm_token, manage_token)
         VALUES ($1, $2, $3) RETURNING *`,
        [email, crypto.randomUUID(), crypto.randomUUID()]
      );
    } else if (sub.status === "unsubscribed") {
      // Re-subscribing after unsubscribe: back to pending with a fresh confirm token.
      sub = await queryOne<SubscriberRow>(
        `UPDATE subscribers SET status = 'pending', confirm_token = $2, confirmed_at = NULL
         WHERE id = $1 RETURNING *`,
        [sub.id, crypto.randomUUID()]
      );
    }
    if (!sub) throw new Error("subscriber upsert failed");

    if (scopeType && scopeId) {
      await query(
        `INSERT INTO subscriptions (subscriber_id, scope_type, scope_id)
         VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`,
        [sub.id, scopeType, scopeId]
      );
    }

    let confirmationSent = false;
    if (sub.status !== "confirmed" && sub.confirm_token && sub.manage_token) {
      const origin = new URL(req.url).origin;
      const mail = confirmationEmail({
        confirmUrl: `${origin}/api/confirm?token=${sub.confirm_token}`,
        manageUrl: `${origin}/manage?token=${sub.manage_token}`,
        unsubscribeUrl: `${origin}/api/unsubscribe?token=${sub.manage_token}`,
      });
      const res = await sendEmail({
        to: sub.email,
        subject: mail.subject,
        html: mail.html,
        unsubscribeUrl: `${origin}/api/unsubscribe?token=${sub.manage_token}`,
      });
      if (res.ok) {
        confirmationSent = true;
        await query(
          `INSERT INTO email_log (subscriber_id, kind) VALUES ($1, 'confirm')`,
          [sub.id]
        );
      }
    }

    return NextResponse.json({
      ok: true,
      status: sub.status,
      confirmationSent,
    });
  } catch (e) {
    console.error("[api/subscribe]", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
