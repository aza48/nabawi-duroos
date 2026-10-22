import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, initDb, query, SubscriberRow, SubscriptionRow } from "../../../../lib/db";
import { reminderEmail, sendEmail } from "../../../../lib/email";
import { siteUrl } from "../../../../lib/site";
import { lessonsHappeningOn } from "../../../../lib/reminders";
import { riyadhToday, todayLabel } from "../../../../lib/dates";
import { lessonShaykhScopeId } from "../../../../lib/scopes";
import { Lesson } from "../../../../lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Daily reminder digest (Vercel Cron, 03:00 UTC = 06:00 Asia/Riyadh).
 *
 * Auth: Authorization: Bearer <CRON_SECRET> — anything else is a 401.
 * Logic: lessons happening today in Asia/Riyadh (weekly + monthly only;
 * daily lessons are excluded by lib/reminders), matched per confirmed
 * subscriber against their shaykh/book subscriptions. Each subscriber with
 * at least one matching lesson gets ONE bilingual digest email.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization");
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!dbConfigured()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
  try {
    await initDb();
    const today = riyadhToday();
    const todaysLessons = lessonsHappeningOn(today);
    if (todaysLessons.length === 0) {
      return NextResponse.json({ ok: true, date: today.iso, lessonsToday: 0, sent: 0 });
    }

    const subscribers = await query<SubscriberRow>(
      `SELECT * FROM subscribers WHERE status = 'confirmed'`
    );
    const siteBase = siteUrl();
    const label = todayLabel();

    let sent = 0;
    let emailSkipped = false;
    for (const sub of subscribers) {
      if (!sub.manage_token) continue;
      const subs = await query<SubscriptionRow>(
        `SELECT * FROM subscriptions WHERE subscriber_id = $1`,
        [sub.id]
      );
      if (subs.length === 0) continue;
      const shaykhScopes = new Set(
        subs.filter((s) => s.scope_type === "shaykh").map((s) => s.scope_id)
      );
      const bookScopes = new Set(
        subs.filter((s) => s.scope_type === "book").map((s) => s.scope_id)
      );
      const mine: Lesson[] = todaysLessons.filter(
        (l) => shaykhScopes.has(lessonShaykhScopeId(l)) || bookScopes.has(l.id)
      );
      if (mine.length === 0) continue;

      const manageUrl = `${siteBase}/manage?token=${sub.manage_token}`;
      const unsubscribeUrl = `${siteBase}/api/unsubscribe?token=${sub.manage_token}`;
      const mail = reminderEmail({
        lessons: mine,
        todayAr: label.ar,
        todayEn: label.en,
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
          `INSERT INTO email_log (subscriber_id, kind) VALUES ($1, 'reminder')`,
          [sub.id]
        );
      }
    }

    return NextResponse.json({
      ok: true,
      date: today.iso,
      lessonsToday: todaysLessons.length,
      sent,
      emailSkipped,
    });
  } catch (e) {
    console.error("[api/cron/reminders]", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
