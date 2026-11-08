import { NextResponse } from "next/server";
import { getDb } from "@/server/db/client";
import { cronAuthorized } from "@/server/watcher/cron";
import { liveDeps, runWatcher } from "@/server/watcher/run";
import { refreshStreams } from "@/server/watcher/live";
import { DUROOS_PATHS, refreshPublic } from "@/server/admin/refresh";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/** Called every few minutes by the scheduler (see docs/OPERATIONS.md). */
export async function GET(req: Request) {
  if (!cronAuthorized(req.headers.get("authorization"), process.env.CRON_SECRET)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const apiKey = process.env.GEMINI_API_KEY;
  const db = await getDb();
  // Without an AI key the parts that need no AI still run: live broadcast notices, the YouTube
  // live check, the heartbeat and the page refresh. Posts that need reading wait as errors, with the reason.
  const deps = liveDeps(apiKey ?? "");
  if (!apiKey) deps.readPost = async () => { throw new Error("GEMINI_API_KEY is not set"); };
  const result = await runWatcher(db, deps);
  // A slow YouTube page must never eat the function's 60 seconds.
  const streamsChanged = await refreshStreams(db, async (url) => {
    const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0", "accept-language": "en" }, cache: "no-store", signal: AbortSignal.timeout(8_000) });
    return res.text();
  });
  // Pages show "checked N min ago", so refresh them every run.
  refreshPublic(DUROOS_PATHS);
  return NextResponse.json({ ok: true, ...result, streamsChanged, ...(apiKey ? {} : { warning: "GEMINI_API_KEY is not set" }) });
}
