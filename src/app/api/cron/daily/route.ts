import { NextResponse } from "next/server";
import { getDb } from "@/server/db/client";
import { cronAuthorized } from "@/server/watcher/cron";
import { getToday } from "@/server/duroos/queries";
import { getPushSender, sendDailyBrief } from "@/server/push";
import { purgeAnalytics } from "@/server/analytics/store";

export const dynamic = "force-dynamic";

/**
 * Once a day around Fajr (see docs/OPERATIONS.md): housekeeping first (the analytics tables
 * and their six-month purge), then the morning brief to phones that asked for it.
 */
export async function GET(req: Request) {
  if (!cronAuthorized(req.headers.get("authorization"), process.env.CRON_SECRET)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const db = await getDb();
  let purged = true;
  try {
    await purgeAnalytics(db);
  } catch (e) {
    purged = false;
    console.error("analytics purge failed", e);
  }
  const send = await getPushSender();
  if (!send) return NextResponse.json({ ok: true, purged, delivered: 0, note: "push is not configured" });
  const delivered = await sendDailyBrief(db, await getToday(db), send);
  return NextResponse.json({ ok: true, purged, delivered });
}
