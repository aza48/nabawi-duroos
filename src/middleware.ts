import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, adminToken } from "./lib/adminAuth";

/**
 * Protects /admin pages and /api/admin/* (except the login page/route)
 * behind the ADMIN_PASSWORD cookie. When ADMIN_PASSWORD is unset, nothing
 * is authorized — the login page itself renders a "not configured" notice.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }
  const expected = await adminToken();
  const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
  const authed = !!expected && !!cookie && cookie === expected;
  if (authed) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
