import { NextResponse } from "next/server";
import { dbConfigured, initDb, query } from "../../../../../lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* Middleware has already enforced the admin cookie for /api/admin/*. */

export async function DELETE(
  _req: Request,
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
    await query(`DELETE FROM announcements WHERE id = $1`, [id]);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api/admin/announcements DELETE]", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
