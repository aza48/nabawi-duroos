/* MESH service worker: shows push notifications and opens the right page when tapped. */
/*
 * It also keeps a few pages readable offline, because the signal inside Masjid an-Nabawi is weak.
 *
 * Pages: "/", "/duroos", "/duroos/schedule", each "/guides/<slug>" the reader opens (the 30 most recent),
 * and the same under "/ar". Every page request goes to the network first; a saved copy is used only when
 * the network fails, so a reader with a signal always gets the live page. Build files (/_next/static:
 * scripts, styles, fonts) are kept as they are used; their names change with every build, so a kept copy
 * is never out of date. /admin, /api, POST requests, other sites and anything but a 200 are never kept.
 * When a page cannot be opened and has no saved copy, the reader gets /offline (or /ar/offline) as a 503.
 *
 * The rules live between the <policy> markers below, mirrored in src/lib/offline-policy.ts; a test runs
 * both copies on the same cases, so change both together. To drop everything saved by older workers,
 * bump the version in PAGES_CACHE and STATIC_CACHE (both files).
 *
 * KILL SWITCH. If offline caching ever misbehaves:
 *   1. set KILL = true below and deploy. Every browser that has this worker fetches the new file on its
 *      next visit (the worker script skips the HTTP cache), deletes every "mesh-" cache, stops handling
 *      requests and unregisters itself. Pages then load straight from the network as before this worker.
 *      Unregistering also ends phone alerts for that browser until the reader turns them on again.
 *   2. to stop it being registered again on each visit, also set REGISTER = false in
 *      src/components/shell/RegisterSW.tsx (the alerts button still registers it for alerts).
 *   To undo, set KILL = false (and REGISTER = true) and deploy.
 */
const KILL = false;

// <policy> Mirrored in src/lib/offline-policy.ts. Keep the two in step.
const POLICY = (() => {
  const PAGES_CACHE = "mesh-pages-v1";
  const STATIC_CACHE = "mesh-static-v1";
  const CACHE_PREFIX = "mesh-";
  const KEEP_CACHES = [PAGES_CACHE, STATIC_CACHE];
  const GUIDE_CAP = 30;
  const STATIC_CAP = 600;
  const REFRESH_AFTER_MS = 5 * 60 * 1000;
  const OFFLINE_REFRESH_MS = 24 * 60 * 60 * 1000;
  const SAVED_HEADER = "x-mesh-saved";
  const TITLE_HEADER = "x-mesh-title";
  const OFFLINE_PATHS = ["/offline", "/ar/offline"];

  const PAGE_RE = /^(?:\/ar)?(?:\/|\/duroos|\/duroos\/schedule|\/guides\/[A-Za-z0-9][A-Za-z0-9_-]{0,119}|\/offline)$/;
  const GUIDE_RE = /^(?:\/ar)?\/guides\/[^/]+$/;

  function normalisePath(path) {
    if (typeof path !== "string" || !path.startsWith("/") || path.startsWith("//")) return null;
    let p = path.split(/[?#]/)[0];
    while (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
    if (p === "/ar") return "/ar";
    return p || "/";
  }

  function pageKey(path) {
    const p = normalisePath(path);
    if (!p) return null;
    const forMatch = p === "/ar" ? "/ar/" : p;
    return PAGE_RE.test(forMatch) ? p : null;
  }

  function isGuide(path) {
    const p = normalisePath(path);
    return !!p && GUIDE_RE.test(p);
  }

  function isOfflinePath(path) {
    return OFFLINE_PATHS.includes(normalisePath(path) || "");
  }

  function offlinePath(path) {
    const p = normalisePath(path) || "/";
    return p === "/ar" || p.startsWith("/ar/") ? "/ar/offline" : "/offline";
  }

  function isPrivate(p) {
    return p === "/admin" || p.startsWith("/admin/") || p === "/api" || p.startsWith("/api/");
  }

  function classify(method, url, origin, mode, isRsc) {
    if (method !== "GET") return "ignore";
    let u;
    try {
      u = new URL(url);
    } catch (e) {
      return "ignore";
    }
    if (u.origin !== origin) return "ignore";
    if (isPrivate(u.pathname)) return "ignore";
    if (isRsc || u.searchParams.has("_rsc")) return "ignore";
    if (u.pathname.startsWith("/_next/static/")) return "static";
    if (mode === "navigate") return pageKey(u.pathname) && !isOfflinePath(u.pathname) ? "page" : "navigate";
    return "ignore";
  }

  function canStore(res, html) {
    if (res.status !== 200 || res.type !== "basic" || res.redirected) return false;
    return !html || /^text\/html/i.test(res.contentType || "");
  }

  function guidesToEvict(entries, cap) {
    if (cap === undefined) cap = GUIDE_CAP;
    return entries
      .filter((e) => isGuide(e.path))
      .sort((a, b) => b.savedAt - a.savedAt || (a.path < b.path ? -1 : 1))
      .slice(Math.max(0, cap))
      .map((e) => e.path);
  }

  function staticToEvict(keysInOrder, cap) {
    if (cap === undefined) cap = STATIC_CAP;
    return keysInOrder.length > cap ? keysInOrder.slice(0, keysInOrder.length - cap) : [];
  }

  function savedTimeFrom(dateHeader, now) {
    const d = dateHeader ? Date.parse(dateHeader) : NaN;
    return Number.isFinite(d) ? Math.min(d, now) : now;
  }

  function isFresh(savedAt, now, maxAge) {
    if (maxAge === undefined) maxAge = REFRESH_AFTER_MS;
    return typeof savedAt === "number" && Number.isFinite(savedAt) && now - savedAt >= 0 && now - savedAt < maxAge;
  }

  const decodeEntities = (s) =>
    s
      .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
      .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&");

  function extractAssets(html) {
    const out = new Set();
    const re = /(?:src|href)=["'](\/_next\/static\/[^"'\s>]+)["']/g;
    for (let m = re.exec(html); m; m = re.exec(html)) out.add(decodeEntities(m[1]));
    return [...out];
  }

  function extractCssAssets(css, cssPath) {
    const out = new Set();
    const re = /url\(\s*["']?([^"')]+)["']?\s*\)/g;
    for (let m = re.exec(css); m; m = re.exec(css)) {
      const ref = m[1].trim();
      if (/^(data|blob|https?):/i.test(ref) || ref.startsWith("//")) continue;
      try {
        const u = new URL(ref, "http://x" + cssPath);
        if (u.pathname.startsWith("/_next/static/")) out.add(u.pathname + u.search);
      } catch (e) {}
    }
    return [...out];
  }

  function extractTitle(html) {
    const m = /<title[^>]*>([^<]*)<\/title>/i.exec(html);
    if (!m) return "";
    return decodeEntities(m[1])
      .replace(/\s*(?:\||·)\s*MESH(?: Madinah)?\s*$/u, "")
      .trim()
      .slice(0, 160);
  }

  return {
    PAGES_CACHE, STATIC_CACHE, CACHE_PREFIX, KEEP_CACHES, GUIDE_CAP, STATIC_CAP, REFRESH_AFTER_MS, OFFLINE_REFRESH_MS,
    SAVED_HEADER, TITLE_HEADER, OFFLINE_PATHS,
    normalisePath, pageKey, isGuide, isOfflinePath, offlinePath, classify, canStore, guidesToEvict, staticToEvict,
    savedTimeFrom, isFresh, extractAssets, extractCssAssets, extractTitle,
  };
})();
// </policy>

self.addEventListener("push", (event) => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch (e) { data = { title: "MESH", body: event.data ? event.data.text() : "" }; }
  event.waitUntil(
    self.registration.showNotification(data.title || "MESH", {
      body: data.body || "",
      tag: data.tag,
      icon: "/icon",
      badge: "/icon",
      data: { url: data.url || "/" },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = new URL((event.notification.data && event.notification.data.url) || "/", self.location.origin).href;
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((wins) => {
      for (const w of wins) if (w.url === url && "focus" in w) return w.focus();
      return self.clients.openWindow(url);
    })
  );
});

const ownCaches = () => caches.keys().then((names) => names.filter((n) => n.startsWith(POLICY.CACHE_PREFIX)));

if (KILL) {
  // Kill switch: clear everything this site saved, handle no requests, and unregister.
  self.addEventListener("install", () => self.skipWaiting());
  self.addEventListener("activate", (event) => {
    event.waitUntil(
      ownCaches()
        .then((names) => Promise.all(names.map((n) => caches.delete(n))))
        .catch(() => {})
        .then(() => self.registration.unregister())
    );
  });
} else {
  const ORIGIN = self.location.origin;
  const abs = (path) => ORIGIN + path;
  /**
   * Documents this worker answered from a saved copy (the new window's client id, else "path:" + key, to the save
   * time), so that page can say so. Keyed by document, not path: a later online visit to the same path is fresh.
   */
  const servedFromCache = new Map();
  const rememberServed = (id, at) => {
    servedFromCache.delete(id);
    servedFromCache.set(id, at);
    while (servedFromCache.size > 50) servedFromCache.delete(servedFromCache.keys().next().value);
  };
  /** Pages being saved right now, so the same page is not fetched twice at once. */
  const saving = new Set();

  const savedAt = (res) => {
    const v = res && Number(res.headers.get(POLICY.SAVED_HEADER));
    return v && Number.isFinite(v) ? v : null;
  };

  async function trimGuides(cache) {
    const keys = await cache.keys();
    const entries = [];
    for (const req of keys) {
      const path = new URL(req.url).pathname;
      if (!POLICY.isGuide(path)) continue;
      const res = await cache.match(req, { ignoreVary: true });
      entries.push({ path, savedAt: savedAt(res) || 0 });
    }
    await Promise.all(POLICY.guidesToEvict(entries).map((p) => cache.delete(abs(p))));
  }

  async function trimStatic() {
    const cache = await caches.open(POLICY.STATIC_CACHE);
    const keys = await cache.keys();
    await Promise.all(POLICY.staticToEvict(keys.map((r) => r.url)).map((u) => cache.delete(u)));
  }

  /** Keeps the build files a page needs, fetching only those not kept yet (usually from the HTTP cache). */
  async function saveAssets(paths) {
    const cache = await caches.open(POLICY.STATIC_CACHE);
    const queue = [];
    for (const p of paths) {
      // Resolve "..", "%2e" and the like first, so only real build files are ever fetched and kept.
      let u = null;
      try {
        u = typeof p === "string" && p.startsWith("/") && !p.startsWith("//") ? new URL(p, ORIGIN) : null;
      } catch (e) {}
      if (u && u.origin === ORIGIN && u.pathname.startsWith("/_next/static/")) queue.push(u.pathname + u.search);
    }
    const seen = new Set(queue);
    queue.splice(0, queue.length, ...seen);
    let added = 0;
    while (queue.length) {
      const batch = queue.splice(0, 6);
      await Promise.all(
        batch.map(async (path) => {
          if (await cache.match(abs(path), { ignoreVary: true })) return;
          try {
            const res = await fetch(abs(path), { credentials: "same-origin" });
            if (!POLICY.canStore({ status: res.status, type: res.type, redirected: res.redirected }, false)) return;
            if (/\.css(\?|$)/.test(path)) {
              for (const ref of POLICY.extractCssAssets(await res.clone().text(), path)) if (!seen.has(ref)) { seen.add(ref); queue.push(ref); }
            }
            await cache.put(abs(path), res);
            added++;
          } catch (e) {}
        })
      );
    }
    if (added) await trimStatic();
  }

  /** Saves a page's HTML with the time it was saved and its title, then the build files it names. */
  async function storePage(key, res) {
    const html = await res.text();
    const headers = new Headers(res.headers);
    for (const h of ["content-length", "content-encoding", "vary", "set-cookie"]) headers.delete(h);
    headers.set(POLICY.SAVED_HEADER, String(POLICY.savedTimeFrom(res.headers.get("date"), Date.now())));
    headers.set(POLICY.TITLE_HEADER, encodeURIComponent(POLICY.extractTitle(html)));
    const cache = await caches.open(POLICY.PAGES_CACHE);
    await cache.put(abs(key), new Response(html, { status: 200, statusText: "OK", headers }));
    if (POLICY.isGuide(key)) await trimGuides(cache);
    await saveAssets(POLICY.extractAssets(html));
  }

  /** Fetches a page and saves it, unless a copy younger than maxAge is already kept. */
  async function refreshPage(key, maxAge) {
    if (saving.has(key)) return;
    saving.add(key);
    try {
      const cache = await caches.open(POLICY.PAGES_CACHE);
      if (POLICY.isFresh(savedAt(await cache.match(abs(key), { ignoreVary: true })), Date.now(), maxAge)) return;
      const res = await fetch(abs(key), { credentials: "same-origin", headers: { accept: "text/html" } });
      if (POLICY.canStore({ status: res.status, type: res.type, redirected: res.redirected, contentType: res.headers.get("content-type") }, true)) {
        await storePage(key, res);
      }
    } catch (e) {
    } finally {
      saving.delete(key);
    }
  }

  async function cachedPage(key) {
    const cache = await caches.open(POLICY.PAGES_CACHE);
    return cache.match(abs(key), { ignoreVary: true });
  }

  const FALLBACK = (ar) =>
    `<!doctype html><html lang="${ar ? "ar" : "en"}" dir="${ar ? "rtl" : "ltr"}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>MESH</title>` +
    `<style>body{margin:0;font:17px/1.6 system-ui,sans-serif;background:#f8f6f1;color:#13221c}main{max-width:34rem;margin:0 auto;padding:3rem 16px}h1{color:#145c3e}button{font:inherit;font-weight:600;border:0;border-radius:999px;padding:.6rem 1.4rem;background:#145c3e;color:#fff}</style></head>` +
    `<body><main><h1>${ar ? "أنت غير متصل بالإنترنت" : "You are offline"}</h1><p>${
      ar ? "هذه الصفحة غير محفوظة على جهازك. افتحها مرة أخرى حين يعود الاتصال." : "This page is not saved on your phone. Open it again when you have a signal."
    }</p><p><button onclick="location.reload()">${ar ? "حاول مرة أخرى" : "Try again"}</button></p><p>${
      ar ? "راسل المشرف على واتساب على الرقم <span dir=ltr>+1 234 567 9076</span> أو بالبريد mesh@albaseerah.org" : "Message Admin on WhatsApp at +1 234 567 9076 or email mesh@albaseerah.org"
    }</p></main></body></html>`;

  /**
   * The saved offline page in the reader's language, else a plain page built here. Always a 503. (The other
   * language's saved page is not used: its shell would not match the address and would fail to hydrate.)
   */
  async function offlineResponse(path) {
    const page = POLICY.offlinePath(path);
    const hit = await cachedPage(page).catch(() => null);
    if (hit) return new Response(hit.body, { status: 503, statusText: "Offline", headers: hit.headers });
    return new Response(FALLBACK(page.startsWith("/ar")), { status: 503, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
  }

  /** Network first. A saved copy is used only when the network fails; offline with no copy, the offline page. */
  async function networkFirst(event, keep) {
    const req = event.request;
    const path = new URL(req.url).pathname;
    const key = keep ? POLICY.pageKey(path) : null;
    try {
      const res = await fetch(req);
      if (key) {
        servedFromCache.delete(event.resultingClientId || "path:" + key);
        if (POLICY.canStore({ status: res.status, type: res.type, redirected: res.redirected, contentType: res.headers.get("content-type") }, true)) {
          saving.add(key);
          event.waitUntil(storePage(key, res.clone()).catch(() => {}).then(() => saving.delete(key)));
        }
      }
      return res;
    } catch (err) {
      if (key) {
        const hit = await cachedPage(key).catch(() => null);
        if (hit) {
          rememberServed(event.resultingClientId || "path:" + key, savedAt(hit));
          return hit;
        }
      }
      return offlineResponse(path);
    }
  }

  /** Build files have the build in their name, so a kept copy is always the right one. */
  async function staticFirst(event) {
    const req = event.request;
    const cache = await caches.open(POLICY.STATIC_CACHE);
    const hit = await cache.match(req, { ignoreVary: true });
    if (hit) return hit;
    const asker = event.clientId ? self.clients.get(event.clientId).catch(() => null) : null;
    const res = await fetch(req);
    // Build files an admin page asks for are passed through, never kept.
    const client = await asker;
    if (client && POLICY.classify("GET", client.url, ORIGIN, "navigate", false) === "ignore") return res;
    if (POLICY.canStore({ status: res.status, type: res.type, redirected: res.redirected }, false)) {
      event.waitUntil(cache.put(req, res.clone()).catch(() => {}));
    }
    return res;
  }

  self.addEventListener("install", () => {
    // Safe to take over at once: pages always come from the network while online, and build files are keyed by build.
    self.skipWaiting();
  });

  self.addEventListener("activate", (event) => {
    event.waitUntil(
      ownCaches()
        .then((names) => Promise.all(names.filter((n) => !POLICY.KEEP_CACHES.includes(n)).map((n) => caches.delete(n))))
        .catch(() => {})
        .then(() => self.clients.claim())
    );
  });

  self.addEventListener("fetch", (event) => {
    const req = event.request;
    const kind = POLICY.classify(req.method, req.url, ORIGIN, req.mode, req.headers.get("RSC") === "1");
    if (kind === "static") event.respondWith(staticFirst(event));
    else if (kind === "page" || kind === "navigate") event.respondWith(networkFirst(event, kind === "page"));
  });

  self.addEventListener("message", (event) => {
    const data = event.data || {};
    if (data.type === "mesh-save" && typeof data.path === "string") {
      // Sent by RegisterSW after each page is shown, including soft navigations that never load the HTML.
      const key = POLICY.pageKey(data.path);
      const offline = POLICY.offlinePath(data.path);
      const assets = Array.isArray(data.assets) ? data.assets.slice(0, 300) : [];
      event.waitUntil(
        Promise.all([
          saveAssets(assets),
          key && !POLICY.isOfflinePath(key) ? refreshPage(key) : null,
          refreshPage(offline, POLICY.OFFLINE_REFRESH_MS),
        ]).catch(() => {})
      );
    } else if (data.type === "mesh-status" && typeof data.path === "string" && event.ports && event.ports[0]) {
      // Asked once by each page as it first loads: was this document answered from a saved copy?
      const key = POLICY.pageKey(data.path);
      const id = event.source && event.source.id;
      const hit = id && servedFromCache.has(id) ? id : key && servedFromCache.has("path:" + key) ? "path:" + key : null;
      event.ports[0].postMessage({ fromCache: !!hit, savedAt: hit ? servedFromCache.get(hit) : null });
    }
  });
}
