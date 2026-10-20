import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, adminConfigured, safeEqual, tokenForPassword, adminToken } from "../../../../lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Lets the login page know whether a password is configured at all. */
export async function GET() {
  return NextResponse.json({ configured: adminConfigured() });
}

export async function POST(req: NextRequest) {
  if (!adminConfigured()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
  let body: { password?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  const password = typeof body.password === "string" ? body.password : "";
  const expected = await adminToken();
  const given = await tokenForPassword(password);
  if (!expected || !safeEqual(given, expected)) {
    return NextResponse.json({ error: "wrong_password" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, expected, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
