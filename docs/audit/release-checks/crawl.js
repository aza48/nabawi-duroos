const { chromium } = require(process.env.PLAYWRIGHT_CORE || "playwright-core");
const fs = require("fs");
const path = require("path");
const DIR = __dirname;
const ORIGIN = process.env.ORIGIN || "http://localhost:3200";
const log = (m) => fs.appendFileSync(path.join(DIR, "crawl.log"), new Date().toISOString() + " " + m + "\n");

const all = fs.readFileSync(path.join(DIR, "sitemap.txt"), "utf8").split(/\r?\n/).filter(Boolean);
const nonRead = all.filter((u) => !u.includes("/library/read/"));
const reads = all.filter((u) => u.includes("/library/read/"));
const step = Math.floor(reads.length / 15);
const readSample = Array.from({ length: 15 }, (_, i) => reads[i * step]);
const extras = ["/ar", "/ar/mahad", "/ar/search?q=bank", "/ar/this-page-does-not-exist", "/lite", "/ar/lite", "/library/search?q=nahw", "/search?q=bank", "/this-page-does-not-exist-audit", "/admin/login"].map((p) => ORIGIN + p);
let urls = [...new Set([...nonRead, ...readSample, ...extras])];
if (process.env.LIMIT) urls = urls.slice(0, +process.env.LIMIT);
fs.writeFileSync(path.join(DIR, "urls.txt"), urls.join("\n"));

const VPS = {
  mobile: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2, reducedMotion: "reduce" },
  desktop: { viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" },
};

function inPage(isMobile) {
  const vis = (el) => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return false;
    const s = getComputedStyle(el);
    return s.visibility !== "hidden" && s.display !== "none";
  };
  const snip = (t, n = 60) => (t || "").replace(/\s+/g, " ").trim().slice(0, n);
  const out = {};
  out.title = document.title;
  out.h1 = document.querySelectorAll("h1").length;
  out.h1Text = [...document.querySelectorAll("h1")].map((h) => snip(h.innerText, 80));
  out.lang = document.documentElement.lang;
  out.dir = document.documentElement.dir;
  out.scrollWidth = document.documentElement.scrollWidth;
  out.innerWidth = window.innerWidth;
  out.scrollHeight = document.documentElement.scrollHeight;
  out.overflow = out.scrollWidth > out.innerWidth;
  if (out.overflow) {
    const cands = [];
    for (const el of document.body.querySelectorAll("*")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0) continue;
      const over = Math.max(r.right - window.innerWidth, -r.left);
      if (over > 0.5) cands.push({ el, over, w: r.width });
    }
    // keep the deepest offenders: those without an offending descendant
    const set = new Set(cands.map((c) => c.el));
    const leafs = cands.filter((c) => ![...c.el.querySelectorAll("*")].some((d) => set.has(d)));
    leafs.sort((a, b) => b.over - a.over);
    out.overflowEls = leafs.slice(0, 5).map((c) => ({
      tag: c.el.tagName.toLowerCase(), cls: (c.el.getAttribute("class") || "").slice(0, 120), over: Math.round(c.over), width: Math.round(c.w), text: snip(c.el.innerText || c.el.getAttribute("aria-label") || c.el.getAttribute("src") || "", 60),
    }));
    out.overflowCount = cands.length;
  }
  out.imgNoAlt = [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).map((i) => (i.getAttribute("src") || "").slice(0, 100));
  const accName = (a) => {
    if ((a.getAttribute("aria-label") || "").trim()) return true;
    const lb = a.getAttribute("aria-labelledby");
    if (lb && lb.split(/\s+/).some((id) => (document.getElementById(id)?.textContent || "").trim())) return true;
    if ((a.getAttribute("title") || "").trim()) return true;
    if ((a.textContent || "").trim()) return true;
    if ([...a.querySelectorAll("img[alt]")].some((i) => i.alt.trim())) return true;
    if ([...a.querySelectorAll("svg title, [aria-label]")].some((x) => (x.textContent || x.getAttribute("aria-label") || "").trim())) return true;
    return false;
  };
  out.linksNoName = [...document.querySelectorAll("a[href]")].filter((a) => !accName(a)).map((a) => ({ href: a.getAttribute("href"), cls: (a.getAttribute("class") || "").slice(0, 80), visible: vis(a) }));
  out.buttonsNoName = [...document.querySelectorAll("button,[role=button]")].filter((a) => !accName(a)).map((a) => ({ cls: (a.getAttribute("class") || "").slice(0, 80), visible: vis(a) }));
  if (isMobile) {
    const small = [];
    for (const el of document.querySelectorAll("a[href],button,[role=button],input[type=checkbox],input[type=radio],select,summary")) {
      if (!vis(el)) continue;
      const r = el.getBoundingClientRect();
      if (r.width < 40 || r.height < 40) {
        const disp = getComputedStyle(el).display;
        const inline = disp === "inline" && !!el.closest("p,li,td,dd,blockquote");
        small.push({ tag: el.tagName.toLowerCase(), w: Math.round(r.width), h: Math.round(r.height), text: snip(el.innerText || el.getAttribute("aria-label") || el.getAttribute("href") || "", 40), inline });
      }
    }
    out.smallTargets = small.length;
    out.smallTargetsNonInline = small.filter((s) => !s.inline).length;
    out.smallTargetsFirst = small.filter((s) => !s.inline).slice(0, 5);
  }
  const text = document.body.innerText || "";
  const ctx = (i, len) => snip(text.slice(Math.max(0, i - 45), i + len + 45), 140);
  out.dashes = [];
  for (const m of text.matchAll(/[\u2013\u2014]/g)) { if (out.dashes.length < 5) out.dashes.push({ ch: m[0] === "\u2014" ? "em" : "en", ctx: ctx(m.index, 1) }); }
  out.dashCount = (text.match(/[\u2013\u2014]/g) || []).length;
  const words = { reportedly: /\breportedly\b/gi, "not stated": /\bnot stated\b/gi, unconfirmed: /\bunconfirmed\b/gi, "not confirmed": /\bnot confirmed\b/gi, "according to": /\baccording to\b/gi, source: /\bsources?\b/gi };
  out.words = {};
  for (const [k, re] of Object.entries(words)) {
    const hits = [...text.matchAll(re)];
    if (hits.length) out.words[k] = { count: hits.length, first: hits.slice(0, 3).map((m) => ctx(m.index, m[0].length)) };
  }
  // Telegram: text nodes, report whether inside a link
  const tg = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n; let tgCount = 0;
  while ((n = walker.nextNode())) {
    if (/telegram/i.test(n.nodeValue)) {
      const p = n.parentElement;
      if (!p || !vis(p) || p.closest("script,style,noscript")) continue;
      tgCount++;
      const a = p.closest("a");
      if (tg.length < 3) tg.push({ inLink: !!a, href: a ? a.getAttribute("href") : null, ctx: snip((p.closest("p,li,a,div,span") || p).innerText, 120) });
    }
  }
  const tgLinks = [...document.querySelectorAll('a[href*="t.me"],a[href*="telegram"]')].map((a) => ({ href: a.getAttribute("href"), text: snip(a.innerText || a.getAttribute("aria-label"), 50) }));
  out.telegram = { count: tgCount, first: tg, links: tgLinks.slice(0, 5), linkCount: tgLinks.length };
  const md = document.querySelector('meta[name="description"]');
  out.metaDesc = md ? md.content : null;
  out.metaDescLen = md ? md.content.length : 0;
  out.canonical = document.querySelector('link[rel="canonical"]')?.href || null;
  out.hreflang = [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((l) => l.hreflang + "=" + l.href);
  out.ogImage = document.querySelector('meta[property="og:image"]')?.content || null;
  out.robots = document.querySelector('meta[name="robots"]')?.content || null;
  const types = new Set(); let ldErr = 0;
  const walk = (o) => { if (!o || typeof o !== "object") return; if (Array.isArray(o)) return o.forEach(walk); if (o["@type"]) [].concat(o["@type"]).forEach((t) => types.add(t)); Object.values(o).forEach(walk); };
  const lds = document.querySelectorAll('script[type="application/ld+json"]');
  for (const s of lds) { try { walk(JSON.parse(s.textContent)); } catch { ldErr++; } }
  out.jsonld = { count: lds.length, types: [...types], parseErrors: ldErr };
  if (!isMobile) {
    out.hrefs = [...new Set([...document.querySelectorAll("a[href]")].map((a) => a.href).filter((h) => h.startsWith(location.origin)))];
    out.ids = [...document.querySelectorAll("[id]")].map((e) => e.id);
  }
  return out;
}

async function run() {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const ctxs = {};
  for (const [k, v] of Object.entries(VPS)) ctxs[k] = await browser.newContext(v);
  const jobs = [];
  for (const u of urls) for (const vp of Object.keys(VPS)) jobs.push({ u, vp });
  log(`jobs ${jobs.length} urls ${urls.length}`);
  const results = [];
  let idx = 0;
  async function worker(wid) {
    while (idx < jobs.length) {
      const j = jobs[idx++];
      const page = await ctxs[j.vp].newPage();
      const consoleMsgs = []; const failed = [];
      page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") consoleMsgs.push(m.type() + ": " + m.text().slice(0, 300)); });
      page.on("pageerror", (e) => consoleMsgs.push("pageerror: " + String(e.message).slice(0, 300)));
      page.on("requestfailed", (r) => failed.push({ url: r.url().slice(0, 200), err: r.failure()?.errorText }));
      page.on("response", (r) => { if (r.status() >= 400) failed.push({ url: r.url().slice(0, 200), status: r.status() }); });
      const rec = { url: j.u, vp: j.vp };
      const t0 = Date.now();
      try {
        const resp = await page.goto(j.u, { waitUntil: "load", timeout: 60000 });
        rec.loadMs = Date.now() - t0;
        rec.status = resp ? resp.status() : null;
        rec.finalUrl = page.url();
        rec.redirected = rec.finalUrl !== j.u;
        await page.waitForTimeout(1200);
        Object.assign(rec, await page.evaluate(inPage, j.vp === "mobile"));
      } catch (e) { rec.error = String(e.message).slice(0, 300); rec.loadMs = Date.now() - t0; }
      rec.console = [...new Set(consoleMsgs)];
      const seen = new Set();
      rec.failed = failed.filter((f) => { const k = f.url + (f.status || f.err); if (seen.has(k)) return false; seen.add(k); return true; });
      results.push(rec);
      await page.close();
      if (results.length % 20 === 0) { log(`${results.length}/${jobs.length}`); fs.writeFileSync(path.join(DIR, "crawl-raw.json"), JSON.stringify(results)); }
      await new Promise((r) => setTimeout(r, 50));
    }
  }
  await Promise.all([0, 1, 2, 3].map(worker));
  fs.writeFileSync(path.join(DIR, "crawl-raw.json"), JSON.stringify(results));
  // CSV
  const cols = ["url", "vp", "status", "loadMs", "title", "h1", "overflow", "overflowTop", "consoleCount", "failedCount", "imgNoAlt", "linksNoName", "smallTargetsNonInline", "dashCount", "bannedWords", "telegramCount", "metaDescLen", "canonical", "hreflang", "jsonldTypes", "ogImage", "error"];
  const esc = (v) => '"' + String(v ?? "").replace(/"/g, '""') + '"';
  const rows = results.map((r) => [r.url, r.vp, r.status, r.loadMs, r.title, r.h1, r.overflow, r.overflowEls ? r.overflowEls[0]?.tag + "." + r.overflowEls[0]?.cls : "", r.console.length, r.failed.length, (r.imgNoAlt || []).length, (r.linksNoName || []).length, r.smallTargetsNonInline ?? "", r.dashCount, Object.entries(r.words || {}).map(([k, v]) => k + ":" + v.count).join(" "), r.telegram?.count, r.metaDescLen, r.canonical, (r.hreflang || []).join(" "), (r.jsonld?.types || []).join(" "), !!r.ogImage, r.error].map(esc).join(","));
  fs.writeFileSync(path.join(DIR, "crawl.csv"), cols.join(",") + "\n" + rows.join("\n"));
  log("DONE");
  await browser.close();
}
run().catch((e) => { log("FATAL " + e.stack); process.exit(1); });
