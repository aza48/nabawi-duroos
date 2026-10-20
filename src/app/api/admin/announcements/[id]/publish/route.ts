import { NextRequest, NextResponse } from "next/server";
import {
  AnnouncementRow,
  dbConfigured,
  initDb,
  query,
  queryOne,
  SubscriberRow,
} from "../../../../../../lib/db";
import { alertEmail, sendEmail } from "../../../../../../lib/email";
import { findBookScope, findShaykhScope } from "../../../../../../lib/scopes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Publish an announcement and fan out bilingual alert emails to confirmed
 * subscribers whose subscriptions match the announcement's shaykh scope OR
 * its book scope. Each successful send is logged in email_log; the row is
 * stamped published_at / sent_at. Email being unconfigured never blocks
 * publishing — the publish succeeds with sent = 0 and emailSkipped = true.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!dbConfigured()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "invalid_id" }, { status: 400 });
  }
  try {
    await initDb();
    const ann = await queryOne<AnnouncementRow>(
      `SELECT * FROM announcements WHERE id = $1`,
      [id]
    );
    if (!ann) return NextResponse.json({ error: "not_found" }, { status: 404 });

    const recipients = await query<SubscriberRow>(
      `SELECT DISTINCT s.* FROM subscribers s
       JOIN subscriptions sub ON sub.subscriber_id = s.id
       WHERE s.status = 'confirmed'
         AND (
           (sub.scope_type = 'shaykh' AND sub.scope_id = $1)
           OR ($2::text IS NOT NULL AND sub.scope_type = 'book' AND sub.scope_id = $2)
         )`,
      [ann.shaykh_id, ann.book_id]
    );

    const origin = new URL(req.url).origin;
    const siteBase = process.env.NEXT_PUBLIC_SITE_URL || origin;
    const shaykhScope = findShaykhScope(ann.shaykh_id);
    const bookScope = ann.book_id ? findBookScope(ann.book_id) : undefined;

    let sent = 0;
    let emailSkipped = false;
    for (const sub of recipients) {
      if (!sub.manage_token) continue;
      const manageUrl = `${siteBase}/manage?token=${sub.manage_token}`;
      const unsubscribeUrl = `${siteBase}/api/unsubscribe?token=${sub.manage_token}`;
      const mail = alertEmail({
        announcement: ann,
        shaykhName: shaykhScope?.name ?? { ar: ann.shaykh_id, en: ann.shaykh_id },
        bookName: bookScope?.book ?? null,
        manageUrl,
        unsubscribeUrl,
      });
      const res = await sendEmail({
        to: sub.email,
        subject: mail.subject,
        html: mail.html,
        unsubscribeUrl,
      });
      if (res.skipped) emailSkipped = true;
      if (res.ok) {
        sent++;
        await query(
          `INSERT INTO email_log (announcement_id, subscriber_id, kind)
           VALUES ($1, $2, 'alert')`,
          [ann.id, sub.id]
        );
      }
    }

    const updated = await queryOne<AnnouncementRow>(
      `UPDATE announcements
       SET status = 'published',
           published_at = COALESCE(published_at, now()),
           sent_at = now()
       WHERE id = $1 RETURNING *`,
      [ann.id]
    );
    return NextResponse.json({
      ok: true,
      announcement: updated,
      recipients: recipients.length,
      sent,
      emailSkipped,
    });
  } catch (e) {
    console.error("[api/admin/announcements publish]", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
