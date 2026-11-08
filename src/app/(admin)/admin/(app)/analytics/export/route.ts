import { sql } from "drizzle-orm";
import { requireAdmin } from "@/server/auth/session";
import { Forbidden } from "@/server/auth/permissions";
import { getDb } from "@/server/db/client";
import { ensureAnalytics, rowsOf } from "@/server/analytics/store";

export const dynamic = "force-dynamic";

const cell = (v: unknown) => {
  if (v == null) return "";
  const s = v instanceof Date ? v.toISOString() : String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

/** Owner only: the raw visits or events of a period as CSV, for a spreadsheet. */
export async function GET(req: Request) {
  try {
    await requireAdmin("analytics.view");
  } catch (e) {
    if (e instanceof Forbidden) return new Response("Forbidden", { status: 403 });
    throw e;
  }
  const url = new URL(req.url);
  const days = Math.min(Math.max(Number(url.searchParams.get("d")) || 7, 1), 365);
  const what = url.searchParams.get("what") === "events" ? "events" : "visits";
  const db = await getDb();
  await ensureAnalytics(db);
  const since = sql`now() - make_interval(days => ${days})`;
  const rows = rowsOf<Record<string, unknown>>(
    await db.execute(
      what === "events"
        ? sql`select ts, type, path, query, title, label, target, value, duration_ms, scroll_pct, session_id, visitor_id from analytics_events where ts >= ${since} order by ts desc limit 100000`
        : sql`select * from analytics_sessions where started_at >= ${since} order by started_at desc limit 50000`
    )
  );
  const cols = rows.length ? Object.keys(rows[0]) : [];
  const csv = [cols.join(","), ...rows.map((r) => cols.map((c) => cell(r[c])).join(","))].join("\n");
  const stamp = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="mesh-${what}-${days}d-${stamp}.csv"`,
      "cache-control": "no-store",
    },
  });
}
