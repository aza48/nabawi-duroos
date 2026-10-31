import { NextResponse } from "next/server";
import { AnnouncementRow, dbConfigured, initDb, query } from "../../../lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

/** Public feed of published DB announcements (merged client-side with the static feed). */
export async function GET() {
  if (!dbConfigured()) {
    // Graceful: no backend configured — the static feed still serves the site.
    return NextResponse.json({ announcements: [] });
  }
  try {
    await initDb();
    const rows = await query<AnnouncementRow>(
      `SELECT * FROM announcements WHERE status = 'published'
       ORDER BY published_at DESC NULLS LAST, id DESC LIMIT 100`
    );
    return NextResponse.json(
      { announcements: rows },
      { headers: { "cache-control": "no-store, max-age=0" } }
    );
  } catch (e) {
    console.error("[api/announcements]", e);
    return NextResponse.json({ announcements: [] });
  }
}
