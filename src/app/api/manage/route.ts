import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, initDb, query, queryOne, SubscriberRow, SubscriptionRow } from "../../../lib/db";
import { isValidScope, listBookScopes, listShaykhScopes } from "../../../lib/scopes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function subscriberByToken(token: string | null): Promise<SubscriberRow | null> {
  if (!token) return null;
  return queryOne<SubscriberRow>(`SELECT * FROM subscribers WHERE manage_token = $1`, [token]);
}

function catalogue() {
  return { shaykhs: listShaykhScopes(), books: listBookScopes() };
}

/** Current subscriptions + the full scope catalogue for the /manage page. */
export async function GET(req: NextRequest) {
  if (!dbConfigured()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
  const token = req.nextUrl.searchParams.get("token");
  try {
    await initDb();
    const sub = await subscriberByToken(token);
    if (!sub) return NextResponse.json({ error: "invalid_token" }, { status: 404 });
    const subs = await query<SubscriptionRow>(
      `SELECT * FROM subscriptions WHERE subscriber_id = $1 ORDER BY id`,
      [sub.id]
    );
    return NextResponse.json({
      email: sub.email,
      status: sub.status,
      subscriptions: subs.map((s) => ({ scopeType: s.scope_type, scopeId: s.scope_id })),
      catalogue: catalogue(),
    });
  } catch (e) {
    console.error("[api/manage GET]", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

/** Replace the subscriber's subscription set (confirmed subscribers only). */
export async function POST(req: NextRequest) {
  if (!dbConfigured()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
  let body: { manageToken?: unknown; subscriptions?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  const token = typeof body.manageToken === "string" ? body.manageToken : null;
  const list = Array.isArray(body.subscriptions) ? body.subscriptions : null;
  if (!token || !list) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const cleaned: { scopeType: string; scopeId: string }[] = [];
  for (const item of list) {
    if (
      item &&
      typeof item === "object" &&
      typeof (item as { scopeType?: unknown }).scopeType === "string" &&
      typeof (item as { scopeId?: unknown }).scopeId === "string"
    ) {
      const { scopeType, scopeId } = item as { scopeType: string; scopeId: string };
      if (!isValidScope(scopeType, scopeId)) {
        return NextResponse.json({ error: "invalid_scope" }, { status: 400 });
      }
      cleaned.push({ scopeType, scopeId });
    }
  }

  try {
    await initDb();
    const sub = await subscriberByToken(token);
    if (!sub) return NextResponse.json({ error: "invalid_token" }, { status: 404 });
    if (sub.status !== "confirmed") {
      return NextResponse.json({ error: "not_confirmed" }, { status: 403 });
    }
    await query(`DELETE FROM subscriptions WHERE subscriber_id = $1`, [sub.id]);
    for (const s of cleaned) {
      await query(
        `INSERT INTO subscriptions (subscriber_id, scope_type, scope_id)
         VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`,
        [sub.id, s.scopeType, s.scopeId]
      );
    }
    return NextResponse.json({ ok: true, count: cleaned.length });
  } catch (e) {
    console.error("[api/manage POST]", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
