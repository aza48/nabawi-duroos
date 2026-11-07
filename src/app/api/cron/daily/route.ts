import { NextResponse } from "next/server";
import { getDb } from "@/server/db/client";
import { cronAuthorized } from "@/server/watcher/cron";
import { getToday } from "@/server/duroos/queries";
import { getPushSender, sendDailyBrief } from "@/server/push";

export const dynamic = "force-dynamic";

/** Morning brief to phones that asked for it. Schedule once a day around Fajr (see docs/OPERATIONS.md). */
export async function GET(req: Request) {
  if (!cronAuthorized(req.headers.get("authorization"), process.env.CRON_SECRET)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const send = await getPushSender();
  if (!send) return NextResponse.json({ error: "push is not configured" }, { status: 500 });
  const db = await getDb();
  const delivered = await sendDailyBrief(db, await getToday(db), send);
  return NextResponse.json({ ok: true, delivered });
}
