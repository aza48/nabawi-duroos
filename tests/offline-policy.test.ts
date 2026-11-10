import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import * as ts from "@/lib/offline-policy";

const SW = readFileSync(path.join(process.cwd(), "public", "sw.js"), "utf8");

/** The rules block of public/sw.js, evaluated on its own. */
function swPolicy(): typeof ts {
  const m = /\/\/ <policy>[^\n]*\n([\s\S]*?)\/\/ <\/policy>/.exec(SW);
  if (!m) throw new Error("public/sw.js has no <policy> block");
  return new Function(`${m[1]}\nreturn POLICY;`)() as typeof ts;
}

const sw = swPolicy();
const both = [
  ["src/lib/offline-policy.ts", ts],
  ["public/sw.js", sw],
] as const;
const O = "https://medinahub.org";

describe("the two copies of the offline rules agree", () => {
  it("share every constant", () => {
    for (const k of ["PAGES_CACHE", "STATIC_CACHE", "CACHE_PREFIX", "KEEP_CACHES", "GUIDE_CAP", "STATIC_CAP", "REFRESH_AFTER_MS", "OFFLINE_REFRESH_MS", "SAVED_HEADER", "TITLE_HEADER", "OFFLINE_PATHS"] as const)
      expect(sw[k], k).toEqual(ts[k]);
  });

  it("export the same functions", () => {
    const fns = (o: object) => Object.entries(o).filter(([, v]) => typeof v === "function").map(([k]) => k).sort();
    expect(fns(sw)).toEqual(fns(ts).filter((k) => k !== "formatSaved"));
  });
});

describe.each(both)("%s", (_, p) => {
  it("keeps only the home page, duroos, the schedule, guides and their Arabic twins", () => {
    for (const ok of ["/", "/duroos", "/duroos/schedule", "/guides/cost-of-living", "/guides/start-a-company-in-saudi", "/ar", "/ar/duroos", "/ar/duroos/schedule", "/ar/guides/cost-of-living"])
      expect(p.pageKey(ok), ok).toBe(ok);
    for (const no of ["/guides", "/ar/guides", "/duroos/live", "/duroos/lesson/x", "/guides/x/opengraph-image", "/ask", "/admin", "/api/v1/track", "/library", "/arx", "//evil.com", "relative", "/guides/../admin"])
      expect(p.pageKey(no), no).toBeNull();
  });

  it("normalises keys: no query, hash or trailing slash", () => {
    expect(p.pageKey("/duroos/schedule/?utm_source=whatsapp#today")).toBe("/duroos/schedule");
    expect(p.pageKey("/ar/")).toBe("/ar");
    expect(p.pageKey("/?ref=x")).toBe("/");
    expect(p.pageKey("/guides/cost-of-living/")).toBe("/guides/cost-of-living");
    expect(p.normalisePath("/a//")).toBe("/a");
  });

  it("classifies requests", () => {
    const c = (url: string, mode = "navigate", method = "GET", rsc = false) => p.classify(method, url, O, mode, rsc);
    expect(c(`${O}/`)).toBe("page");
    expect(c(`${O}/ar/guides/cost-of-living?utm=1`)).toBe("page");
    expect(c(`${O}/ask`)).toBe("navigate");
    expect(c(`${O}/offline`)).toBe("navigate");
    expect(c(`${O}/_next/static/chunks/app.js`, "no-cors")).toBe("static");
    expect(c(`${O}/_next/static/media/font.woff2`, "cors")).toBe("static");
    // Never touched: admin, api, POST, other sites, soft-navigation data, images and anything else.
    expect(c(`${O}/admin`)).toBe("ignore");
    expect(c(`${O}/admin/login`)).toBe("ignore");
    expect(c(`${O}/api/v1/track`, "cors")).toBe("ignore");
    expect(c(`${O}/api`)).toBe("ignore");
    expect(c(`${O}/duroos`, "navigate", "POST")).toBe("ignore");
    expect(c(`${O}/_next/static/chunks/app.js`, "no-cors", "HEAD")).toBe("ignore");
    expect(c(`https://cdn.example.com/_next/static/x.js`, "no-cors")).toBe("ignore");
    expect(c(`${O}/duroos?_rsc=abc`, "cors")).toBe("ignore");
    expect(c(`${O}/duroos`, "cors", "GET", true)).toBe("ignore");
    expect(c(`${O}/duroos`, "cors")).toBe("ignore");
    expect(c(`${O}/_next/image?url=x`, "no-cors")).toBe("ignore");
    expect(c("not a url")).toBe("ignore");
  });

  it("keeps only complete same-origin 200s that were not redirected", () => {
    const r = { status: 200, type: "basic", redirected: false, contentType: "text/html; charset=utf-8" };
    expect(p.canStore(r, true)).toBe(true);
    expect(p.canStore({ ...r, status: 404 }, true)).toBe(false);
    expect(p.canStore({ ...r, status: 206 }, false)).toBe(false);
    expect(p.canStore({ ...r, type: "opaque" }, false)).toBe(false);
    expect(p.canStore({ ...r, type: "cors" }, false)).toBe(false);
    expect(p.canStore({ ...r, type: "opaqueredirect", status: 0 }, true)).toBe(false);
    expect(p.canStore({ ...r, redirected: true }, true)).toBe(false);
    expect(p.canStore({ ...r, contentType: "text/x-component" }, true)).toBe(false);
    expect(p.canStore({ ...r, contentType: "application/javascript" }, false)).toBe(true);
  });

  it("keeps only the 30 most recently saved guides", () => {
    const guides = Array.from({ length: 35 }, (_, i) => ({ path: `/guides/g${i}`, savedAt: 1000 + i }));
    const entries = [{ path: "/", savedAt: 1 }, { path: "/ar/duroos", savedAt: 2 }, ...guides];
    const evict = p.guidesToEvict(entries);
    expect(p.GUIDE_CAP).toBe(30);
    expect(evict.sort()).toEqual(["/guides/g0", "/guides/g1", "/guides/g2", "/guides/g3", "/guides/g4"]);
    expect(p.guidesToEvict(entries.slice(0, 20))).toEqual([]);
    expect(p.guidesToEvict([{ path: "/ar/guides/a", savedAt: 5 }, { path: "/guides/b", savedAt: 9 }], 1)).toEqual(["/ar/guides/a"]);
  });

  it("drops the oldest build files past the cap", () => {
    expect(p.staticToEvict(["a", "b", "c", "d"], 2)).toEqual(["a", "b"]);
    expect(p.staticToEvict(["a"], 2)).toEqual([]);
  });

  it("dates a saved copy by its Date header, never in the future", () => {
    const now = Date.UTC(2026, 10, 10, 12);
    expect(p.savedTimeFrom("Tue, 10 Nov 2026 11:00:00 GMT", now)).toBe(Date.UTC(2026, 10, 10, 11));
    expect(p.savedTimeFrom("Tue, 10 Nov 2026 13:00:00 GMT", now)).toBe(now);
    expect(p.savedTimeFrom(null, now)).toBe(now);
    expect(p.savedTimeFrom("nonsense", now)).toBe(now);
  });

  it("knows when a saved copy is fresh", () => {
    expect(p.isFresh(1000, 1000 + 60_000)).toBe(true);
    expect(p.isFresh(1000, 1000 + 6 * 60_000)).toBe(false);
    expect(p.isFresh(null, 5)).toBe(false);
    expect(p.isFresh(5000, 1000)).toBe(false);
  });

  it("picks the offline page in the right language", () => {
    expect(p.offlinePath("/guides/x")).toBe("/offline");
    expect(p.offlinePath("/ar")).toBe("/ar/offline");
    expect(p.offlinePath("/ar/guides/x")).toBe("/ar/offline");
    expect(p.offlinePath("/arabic")).toBe("/offline");
    expect(p.isOfflinePath("/ar/offline/")).toBe(true);
  });

  it("finds the build files a page and its styles need", () => {
    const html = `<link rel="stylesheet" href="/_next/static/chunks/a.css?dpl=1&amp;v=2"/><link rel="preload" as="font" href="/_next/static/media/f.woff2" crossorigin=""/><script src="/_next/static/chunks/b.js" async=""></script><script src="/_next/static/chunks/b.js"></script><img src="/images/x.jpg"><script src="https://other.example/_next/static/c.js"></script>`;
    expect(p.extractAssets(html)).toEqual(["/_next/static/chunks/a.css?dpl=1&v=2", "/_next/static/media/f.woff2", "/_next/static/chunks/b.js"]);
    const css = `@font-face{src:url(../media/k.woff2) format("woff2")}@font-face{src:url("/_next/static/media/j.woff2")}.a{background:url(data:image/png;base64,xx)}.b{background:url(https://x.org/y.png)}`;
    expect(p.extractCssAssets(css, "/_next/static/chunks/a.css")).toEqual(["/_next/static/media/k.woff2", "/_next/static/media/j.woff2"]);
  });

  it("reads the page title without the site name", () => {
    expect(p.extractTitle("<head><title>Cost of living in Madinah | MESH Madinah</title></head>")).toBe("Cost of living in Madinah");
    expect(p.extractTitle("<title>تكاليف المعيشة · MESH</title>")).toBe("تكاليف المعيشة");
    expect(p.extractTitle("<title>Rent &amp; bills</title>")).toBe("Rent & bills");
    expect(p.extractTitle("<p>none</p>")).toBe("");
  });
});

describe("public/sw.js", () => {
  it("still shows push notifications and opens the page when one is tapped", () => {
    expect(SW).toContain('self.addEventListener("push"');
    expect(SW).toContain("self.registration.showNotification(");
    expect(SW).toContain('self.addEventListener("notificationclick"');
    expect(SW).toContain("self.clients.openWindow(url)");
  });

  it("ships with the kill switch off, and the switch clears the caches and unregisters", () => {
    expect(SW).toMatch(/^const KILL = false;$/m);
    const kill = SW.slice(SW.indexOf("if (KILL) {"), SW.indexOf("} else {"));
    expect(kill).toContain("caches.delete");
    expect(kill).toContain("self.registration.unregister()");
    expect(kill).not.toContain('"fetch"');
  });

  it("marks a saved copy per document, so a later fresh visit to the same path never shows the offline banner", () => {
    expect(SW).toContain("rememberServed(event.resultingClientId");
    expect(SW).toContain("event.source && event.source.id");
  });

  it("keeps only real build files, and none an admin page asks for", () => {
    expect(SW).toMatch(/new URL\(p, ORIGIN\)/);
    expect(SW).toContain("self.clients.get(event.clientId)");
  });

  it("has no em or en dashes in what it shows", () => {
    expect(SW).not.toMatch(/[–—]/);
  });
});

describe("formatSaved", () => {
  it("writes the save time plainly in both languages", () => {
    const t = Date.UTC(2026, 10, 9, 11, 5);
    expect(ts.formatSaved(t, "en", "Asia/Riyadh")).toBe("Mon 9 Nov, 14:05");
    expect(ts.formatSaved(t, "ar", "Asia/Riyadh")).toMatch(/[٠-٩]/);
    expect(ts.formatSaved(t, "ar", "Asia/Riyadh")).not.toMatch(/14|1448/);
  });
});
