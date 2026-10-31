import { NextRequest, NextResponse } from "next/server";
import {
  ANNOUNCEMENT_TYPES,
  AnnouncementRow,
  dbConfigured,
  initDb,
  query,
  queryOne,
} from "../../../../lib/db";
import { findBookScope, findShaykhScope, GUEST_SHAYKH_ID } from "../../../../lib/scopes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* Middleware has already enforced the admin cookie for /api/admin/*. */

export async function GET() {
  if (!dbConfigured()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
  try {
    await initDb();
    const rows = await query<AnnouncementRow>(
      `SELECT * FROM announcements ORDER BY created_at DESC, id DESC LIMIT 200`
    );
    return NextResponse.json({ announcements: rows });
  } catch (e) {
    console.error("[api/admin/announcements GET]", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: NextRequest) {
  if (!dbConfigured()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  const shaykhId = str(body.shaykh_id);
  const guestNameAr = str(body.shaykh_name_ar);
  const guestNameEn = str(body.shaykh_name_en);
  const isGuest = shaykhId === GUEST_SHAYKH_ID;
  const bookId = str(body.book_id) || null;
  const type = str(body.type);
  const titleAr = str(body.title_ar);
  const titleEn = str(body.title_en);
  const bodyAr = str(body.body_ar);
  const bodyEn = str(body.body_en);
  const lessonDate = str(body.lesson_date) || null;
  const image = typeof body.image === "string" ? body.image : "";

  if (!isGuest && !findShaykhScope(shaykhId)) {
    return NextResponse.json({ error: "invalid_shaykh" }, { status: 400 });
  }
  if (isGuest && (!guestNameAr || !guestNameEn)) {
    return NextResponse.json({ error: "missing_guest_name" }, { status: 400 });
  }
  if (isGuest && bookId) {
    return NextResponse.json({ error: "invalid_book" }, { status: 400 });
  }
  if (bookId && !findBookScope(bookId)) {
    return NextResponse.json({ error: "invalid_book" }, { status: 400 });
  }
  if (!(ANNOUNCEMENT_TYPES as readonly string[]).includes(type)) {
    return NextResponse.json({ error: "invalid_type" }, { status: 400 });
  }
  if (!titleAr || !titleEn || !bodyAr || !bodyEn) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  if (lessonDate && !/^\d{4}-\d{2}-\d{2}$/.test(lessonDate)) {
    return NextResponse.json({ error: "invalid_date" }, { status: 400 });
  }
  if (image && (!image.startsWith("data:image/") || image.length > 1000000)) {
    return NextResponse.json({ error: "invalid_image" }, { status: 400 });
  }

  try {
    await initDb();
    const row = await queryOne<AnnouncementRow>(
      `INSERT INTO announcements
         (shaykh_id, book_id, type, title_ar, title_en, body_ar, body_en, lesson_date, image, shaykh_name_ar, shaykh_name_en)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [shaykhId, bookId, type, titleAr, titleEn, bodyAr, bodyEn, lessonDate, image || null, isGuest ? guestNameAr : null, isGuest ? guestNameEn : null]
    );
    return NextResponse.json({ announcement: row }, { status: 201 });
  } catch (e) {
    console.error("[api/admin/announcements POST]", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
