import { beforeAll, describe, expect, it, vi } from "vitest";
import { resetTestDb, type Db } from "@/server/db/client";
import { parseUa, refHost } from "@/server/analytics/store";
import { analyticsReport } from "@/server/analytics/report";

let db: Db;
vi.mock("@/server/db/client", async (orig) => {
  const real = await orig<typeof import("@/server/db/client")>();
  return { ...real, getDb: async () => db };
});

const PHONE = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";

async function track(body: Record<string, unknown>, ua = PHONE) {
  const { POST } = await import("@/app/api/v1/track/route");
  return POST(new Request("https://medinahub.org/api/v1/track", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "user-agent": ua, host: "medinahub.org", "x-vercel-ip-country": "SA", "x-vercel-ip-city": "Medina" },
  }));
}

describe("visitor analytics", () => {
  beforeAll(async () => {
    db = await resetTestDb();
  });

  it("records a visit, time on page, clicks, and reports them", async () => {
    const v = "visitor_aaaaaaaa", s = "session_aaaaaaaa";
    expect((await track({ t: "pv", v, s, e: "page_one_aaaa", path: "/", title: "Home", ref: "https://wa.me/123", w: 390, lang: "en-GB", nv: true })).status).toBe(204);
    await track({ t: "hb", v, s, e: "page_one_aaaa", path: "/", ms: 42_000, scroll: 80 });
    await track({ t: "click", v, s, e: "click_one_aaaa", path: "/", label: "Join on WhatsApp", target: "https://chat.whatsapp.com/x" });
    await track({ t: "pv", v, s, e: "page_two_aaaa", path: "/library", title: "Library" });
    // A second visitor, and a bot that must be ignored.
    await track({ t: "pv", v: "visitor_bbbbbbbb", s: "session_bbbbbbbb", e: "page_three_aa", path: "/library" });
    await track({ t: "pv", v: "visitor_cccccccc", s: "session_cccccccc", e: "page_four_aaa", path: "/" }, "Googlebot/2.1");
    // Admin pages are never tracked.
    await track({ t: "pv", v, s, e: "page_admin_aa", path: "/admin" });

    const r = await analyticsReport(db, 7);
    expect(r.visitors).toBe(2);
    expect(r.newVisitors).toBe(1);
    expect(r.pageviews).toBe(3);
    expect(r.clicks).toBe(1);
    expect(r.liveNow).toBe(2);
    expect(r.pages.find((p) => p.path === "/library")?.views).toBe(2);
    expect(r.pages.find((p) => p.path === "/")?.avgSec).toBe(42);
    expect(r.clicksTop[0]).toMatchObject({ label: "Join on WhatsApp", n: 1 });
    expect(r.outbound[0]?.key).toBe("chat.whatsapp.com");
    expect(r.referrers.map((x) => x.key)).toContain("WhatsApp");
    expect(r.countries[0]?.key).toBe("SA");
    expect(r.devices[0]?.key).toBe("Phone");
    const j = r.journeys.find((x) => x.id === s)!;
    expect(j.steps.map((x) => x.type)).toEqual(["pageview", "click", "pageview"]);
  });

  it("rejects malformed input", async () => {
    expect((await track({ t: "pv", v: "x", s: "y", e: "z", path: "/" })).status).toBe(400);
  });

  it("reads browsers and referrers", () => {
    expect(parseUa(PHONE)).toEqual({ device: "Phone", browser: "Safari", os: "iOS" });
    expect(refHost("https://www.google.com/search?q=mesh", "medinahub.org")).toBe("Google");
    expect(refHost("https://medinahub.org/library", "medinahub.org")).toBeNull();
  });
});

describe("track endpoint limits", () => {
  it("drops a flood from one address quietly after the per-minute limit", async () => {
    const { TRACK_LIMIT } = await import("@/app/api/v1/track/route");
    const { resetRateLimits } = await import("@/server/rate-limit");
    resetRateLimits();
    const before = (await analyticsReport(db, 7)).pageviews;
    const { POST } = await import("@/app/api/v1/track/route");
    for (let i = 0; i < TRACK_LIMIT.max + 5; i++) {
      const res = await POST(new Request("https://medinahub.org/api/v1/track", {
        method: "POST",
        body: JSON.stringify({ t: "pv", v: "visitor_flood_aa", s: "session_flood_aa", e: `flood_${String(i).padStart(10, "0")}`, path: "/" }),
        headers: { "user-agent": PHONE, host: "medinahub.org", "x-forwarded-for": "203.0.113.9" },
      }));
      expect(res.status).toBe(204);
    }
    expect((await analyticsReport(db, 7)).pageviews).toBe(before + TRACK_LIMIT.max);
  });
  it("refuses a path that is not on this site", async () => {
    expect((await track({ t: "pv", v: "visitor_aaaaaaaa", s: "session_aaaaaaaa", e: "page_bad_aaaa", path: "https://evil.example/" })).status).toBe(400);
    expect((await track({ t: "pv", v: "visitor_aaaaaaaa", s: "session_aaaaaaaa", e: "page_bad_bbbb", path: "//evil.example/" })).status).toBe(400);
  });
});
