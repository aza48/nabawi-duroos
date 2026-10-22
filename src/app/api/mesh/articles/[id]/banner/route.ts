import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, queryOne } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";

/** Serves an article's stored banner at a public URL so link embeds
 *  (Open Graph / Twitter cards on X, WhatsApp, Telegram…) can display it.
 *  Banners uploaded in the editor are stored as data URIs, which scrapers
 *  cannot fetch — this endpoint decodes them back to image bytes.
 *  Published articles only: a draft's banner stays private, same as its text. */

const DATA_RE = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=\s]+)$/;

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!dbConfigured()) return new NextResponse(null, { status: 404 });
  try { await ensureMesh(); } catch { return new NextResponse(null, { status: 404 }); }
  const id = parseInt(params.id, 10);
  if (!id) return new NextResponse(null, { status: 404 });

  const row = await queryOne<{ banner: string | null }>(
    `SELECT banner FROM mesh_articles WHERE id = $1 AND status = 'published'`,
    [id]
  );
  if (!row?.banner) return new NextResponse(null, { status: 404 });

  if (row.banner.startsWith("https://")) {
    return NextResponse.redirect(row.banner, 302);
  }

  const m = DATA_RE.exec(row.banner);
  if (!m) return new NextResponse(null, { status: 404 });
  const bytes = Buffer.from(m[2].replace(/\s/g, ""), "base64");
  if (!bytes.length) return new NextResponse(null, { status: 404 });

  return new NextResponse(bytes, {
    status: 200,
    headers: {
      "Content-Type": m[1],
      "Content-Length": String(bytes.length),
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
