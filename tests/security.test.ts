import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { adminCsp, BASE_HEADERS, publicCsp } from "@/server/security";
import { proxy } from "@/proxy";

describe("content security policies", () => {
  it("locks admin scripts to a per-request nonce", () => {
    const csp = adminCsp("abc123", false);
    expect(csp).toContain("script-src 'self' 'nonce-abc123' 'strict-dynamic'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).not.toContain("unsafe-eval");
  });
  it("lets public pages embed the YouTube live player and Turnstile, nothing else framed", () => {
    const csp = publicCsp(false);
    expect(csp).toContain("frame-src https://www.youtube-nocookie.com https://challenges.cloudflare.com");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("upgrade-insecure-requests");
  });
  it("sends HSTS, nosniff and a strict referrer policy everywhere", () => {
    const keys = Object.fromEntries(BASE_HEADERS.map((h) => [h.key, h.value]));
    expect(keys["Strict-Transport-Security"]).toBe("max-age=63072000; includeSubDomains; preload");
    expect(keys["X-Content-Type-Options"]).toBe("nosniff");
    expect(keys["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
    expect(keys["X-Frame-Options"]).toBe("DENY");
  });
});

describe("admin proxy", () => {
  it("sends visitors without a session to sign in", () => {
    const res = proxy(new NextRequest("http://localhost:3000/admin/content"));
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("http://localhost:3000/admin/login");
  });
  it("lets the sign-in, invite and 2FA pages through without a session", () => {
    for (const p of ["/admin/login", "/admin/invite?token=x", "/admin/setup-2fa"]) {
      expect(proxy(new NextRequest(`http://localhost:3000${p}`)).headers.get("location")).toBeNull();
    }
  });
  it("adds a fresh nonce CSP, no-store and noindex to admin pages", () => {
    const req = () => new NextRequest("http://localhost:3000/admin", { headers: { cookie: "better-auth.session_token=abc" } });
    const a = proxy(req());
    const b = proxy(req());
    const csp = a.headers.get("content-security-policy")!;
    expect(csp).toMatch(/'nonce-[A-Za-z0-9+/=]+'/);
    expect(csp).not.toBe(b.headers.get("content-security-policy"));
    expect(a.headers.get("cache-control")).toBe("no-store");
    expect(a.headers.get("x-robots-tag")).toBe("noindex, nofollow");
  });
  it("accepts the secure cookie name used on https", () => {
    const res = proxy(new NextRequest("https://medinahub.org/admin", { headers: { cookie: "__Secure-better-auth.session_token=abc" } }));
    expect(res.headers.get("location")).toBeNull();
  });
});
