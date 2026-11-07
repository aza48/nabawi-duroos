import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_OPEN_PATHS, adminCsp, hasSessionCookie } from "@/server/security";

/**
 * Admin gate. This is a fast first check only (is there a session cookie?);
 * every admin page and action still verifies the session, two-step sign-in,
 * ban status and role on the server through requireAdmin().
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const open = ADMIN_OPEN_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  if (!open && !hasSessionCookie(request.cookies.getAll().map((c) => c.name))) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = adminCsp(nonce, process.env.NODE_ENV === "development");
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const res = NextResponse.next({ request: { headers: requestHeaders } });
  res.headers.set("Content-Security-Policy", csp);
  res.headers.set("Cache-Control", "no-store");
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
