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

describe("richer visitor analytics (9 November 2026)", () => {
  const ANDROID = "Mozilla/5.0 (Linux; Android 14; SM-S918B Build/UP1A.231005.007) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36";

  it("classifies where a visit came from", async () => {
    const { classifySource } = await import("@/server/analytics/store");
    expect(classifySource({ ref: null })).toBe("Direct");
    expect(classifySource({ ref: "Google" })).toBe("Search engines");
    expect(classifySource({ ref: "WhatsApp" })).toBe("Messaging");
    expect(classifySource({ ref: "Instagram" })).toBe("Social");
    expect(classifySource({ ref: "ChatGPT" })).toBe("AI assistants");
    expect(classifySource({ ref: "example.org" })).toBe("Other sites");
    expect(classifySource({ ref: null, utmSource: "whatsapp_group" })).toBe("Messaging");
    expect(classifySource({ ref: null, utmSource: "poster" })).toBe("Campaign link");
    expect(classifySource({ ref: "Google", clickId: "gclid" })).toBe("Paid ads");
    expect(refHost("https://mail.google.com/mail/u/0", "medinahub.org")).toBe("Gmail");
    expect(refHost("https://gemini.google.com/app", "medinahub.org")).toBe("Gemini");
  });

  it("reads browser, system and phone model versions", async () => {
    const { uaDetails } = await import("@/server/analytics/store");
    expect(uaDetails(ANDROID)).toEqual({ browserVersion: "131", osVersion: "14", model: "SM-S918B" });
    expect(uaDetails(PHONE)).toEqual({ browserVersion: "18.0", osVersion: "18.0", model: "iPhone" });
  });

  it("stores arrival details, location from the host, searches, speed and errors, and never the IP address", async () => {
    const { POST } = await import("@/app/api/v1/track/route");
    const post = (body: Record<string, unknown>) =>
      POST(new Request("https://medinahub.org/api/v1/track", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "user-agent": ANDROID, host: "medinahub.org", "x-forwarded-for": "198.51.100.7",
          "x-vercel-ip-country": "SA", "x-vercel-ip-country-region": "03", "x-vercel-ip-city": "Medina",
          "x-vercel-ip-latitude": "24.47", "x-vercel-ip-longitude": "39.61", "x-vercel-ip-timezone": "Asia/Riyadh", "x-vercel-ip-continent": "AS",
        },
      }));
    const v = "visitor_rich_aaa", s = "session_rich_aaa";
    expect((await post({
      t: "pv", v, s, e: "rich_pv_aaaaa", path: "/guides", q: "utm_source=poster&utm_medium=print", ref: "https://l.instagram.com/?u=x",
      utm: "poster", medium: "print", campaign: "masjid", w: 412, vw: 412, vh: 860, sh: 915, dpr: 2.6, touch: true,
      lang: "en-GB", langs: "en-GB,ar", tz: "Asia/Riyadh", net: "4g", sd: false, scheme: "light", pwa: false, mem: 8, cpu: 8, vn: 3, fs: Date.now() - 3 * 86400_000, nv: false,
    })).status).toBe(204);
    await post({ t: "search", v, s, e: "rich_search_a", path: "/guides", label: "Visitor ID bank", target: "typed", value: 4 });
    await post({ t: "search", v, s, e: "rich_search_b", path: "/guides", label: "stroller haram", target: "enter", value: 0 });
    await post({ t: "vital", v, s, e: "rich_vital_aa", path: "/guides", label: "LCP", value: 1800 });
    await post({ t: "err", v, s, e: "rich_error_aa", path: "/guides", label: "x is undefined", target: "app.js:1:2" });

    const r = await analyticsReport(db, 7);
    expect(r.sources.map((x) => x.key)).toContain("Campaign link");
    expect(r.campaignsFull.map((x) => x.key)).toContain("poster / print / masjid");
    expect(r.searches.map((x) => x.query)).toEqual(expect.arrayContaining(["visitor id bank", "stroller haram"]));
    expect(r.searchesNoResults.map((x) => x.key)).toContain("stroller haram");
    expect(r.deviceModels.map((x) => x.key)).toContain("SM-S918B");
    expect(r.osVersions.map((x) => x.key)).toContain("Android 14");
    expect(r.places.find((p) => p.key === "Medina")).toMatchObject({ lat: 24.47, lon: 39.61 });
    expect(r.visitNumbers.map((x) => x.key)).toContain("2nd or 3rd");
    expect(r.vitals.find((x) => x.metric === "LCP")?.p75).toBe(1800);
    expect(r.errors[0]).toMatchObject({ message: "x is undefined", n: 1 });
    const j = r.journeys.find((x) => x.id === s)!;
    expect(j.steps.map((x) => x.type)).toEqual(["pageview", "search", "search", "error"]);

    const { rowsOf } = await import("@/server/analytics/store");
    const { sql } = await import("drizzle-orm");
    const row = rowsOf<Record<string, unknown>>(await db.execute(sql`select * from analytics_sessions where id = ${s}`))[0];
    expect(Object.values(row).map(String)).not.toContain("198.51.100.7");
    expect(Object.keys(row).some((k) => /ip_hash|^ip$/.test(k))).toBe(false);
  });

  it("rolls finished days up into a history kept for ever, before purging", async () => {
    const { rollupAnalytics, rowsOf } = await import("@/server/analytics/store");
    const { sql } = await import("drizzle-orm");
    await db.execute(sql`update analytics_sessions set started_at = now() - interval '3 days' where id = 'session_rich_aaa'`);
    await db.execute(sql`update analytics_events set ts = now() - interval '3 days' where session_id = 'session_rich_aaa'`);
    expect(await rollupAnalytics(db)).toBeGreaterThanOrEqual(1);
    const rows = rowsOf<{ dim: string; key: string; visitors: number }>(await db.execute(sql`select dim, key, visitors from analytics_daily`));
    expect(rows.some((x) => x.dim === "total")).toBe(true);
    expect(rows.some((x) => x.dim === "source" && x.key === "Campaign link")).toBe(true);
    expect(rows.some((x) => x.dim === "page" && x.key === "/guides")).toBe(true);
    const r = await analyticsReport(db, 7);
    expect(r.monthly.length).toBeGreaterThanOrEqual(1);
  });

  it("is for the owner only", async () => {
    const { can } = await import("@/server/auth/permissions");
    expect(can("owner", "analytics.view")).toBe(true);
    expect(can("editor", "analytics.view")).toBe(false);
    expect(can("duroos_editor", "analytics.view")).toBe(false);
    expect(can("content_editor", "analytics.view")).toBe(false);
  });
});
