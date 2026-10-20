import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, initDb, queryOne, SubscriberRow } from "../../../lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Confirm a subscription from the email link, then land on the manage page. */
export async function GET(req: NextRequest) {
  const origin = new URL(req.url).origin;
  const token = req.nextUrl.searchParams.get("token");
  if (!dbConfigured() || !token) {
    return NextResponse.redirect(new URL("/?confirm=invalid", origin));
  }
  try {
    await initDb();
    const sub = await queryOne<SubscriberRow>(
      `UPDATE subscribers
       SET status = 'confirmed', confirmed_at = COALESCE(confirmed_at, now())
       WHERE confirm_token = $1 AND status <> 'unsubscribed'
       RETURNING *`,
      [token]
    );
    if (!sub || !sub.manage_token) {
      return NextResponse.redirect(new URL("/?confirm=invalid", origin));
    }
    return NextResponse.redirect(new URL(`/manage?token=${sub.manage_token}`, origin));
  } catch (e) {
    console.error("[api/confirm]", e);
    return NextResponse.redirect(new URL("/?confirm=invalid", origin));
  }
}
