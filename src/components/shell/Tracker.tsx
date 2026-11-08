"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * First-party visitor analytics for the owner's Analytics page.
 * Sends page views (with how the visitor arrived and what they are using), time on page, scroll depth,
 * clicks, page-speed measurements and script errors to /api/v1/track.
 * Uses a random id kept in this browser. Everything runs after the page has loaded and is sent with
 * sendBeacon or keepalive, so it never delays what the reader sees.
 */

const ENDPOINT = "/api/v1/track";
const SESSION_IDLE_MS = 30 * 60 * 1000;
const HEARTBEAT_MS = 15_000;
const MAX_ERRORS = 5;
const CLICK_IDS = ["gclid", "fbclid", "msclkid", "ttclid", "twclid", "li_fat_id", "igshid"] as const;

const rid = () =>
  (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`).replace(/[^A-Za-z0-9_-]/g, "");

function store(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

type Visitor = { id: string; isNew: boolean; firstSeen: number; visits: number };

function visitor(): Visitor {
  const ls = store();
  let id = ls?.getItem("mesh_vid") ?? null;
  const isNew = !id;
  if (!id) {
    id = rid();
    try { ls?.setItem("mesh_vid", id); } catch {}
  }
  let firstSeen = Number(ls?.getItem("mesh_fs"));
  if (!firstSeen) {
    firstSeen = Date.now();
    try { ls?.setItem("mesh_fs", String(firstSeen)); } catch {}
  }
  return { id, isNew, firstSeen, visits: Number(ls?.getItem("mesh_vn")) || 0 };
}

/** The current visit's id; a new visit starts after 30 idle minutes and bumps the visit counter. */
function session(v?: Visitor): string {
  const ls = store();
  const now = Date.now();
  try {
    const raw = ls?.getItem("mesh_sid");
    if (raw) {
      const { id, last } = JSON.parse(raw) as { id: string; last: number };
      if (id && now - last < SESSION_IDLE_MS) {
        ls?.setItem("mesh_sid", JSON.stringify({ id, last: now }));
        return id;
      }
    }
  } catch {}
  const id = rid();
  try {
    ls?.setItem("mesh_sid", JSON.stringify({ id, last: now }));
    const n = (Number(ls?.getItem("mesh_vn")) || 0) + 1;
    ls?.setItem("mesh_vn", String(n));
    if (v) v.visits = n;
  } catch {}
  return id;
}

function send(payload: Record<string, unknown>, beacon = false) {
  const body = JSON.stringify(payload);
  try {
    if (beacon && navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, new Blob([body], { type: "application/json" }));
      return;
    }
    void fetch(ENDPOINT, { method: "POST", body, headers: { "content-type": "application/json" }, keepalive: true, credentials: "omit" }).catch(() => {});
  } catch {}
}

type Nav = Navigator & { connection?: { effectiveType?: string; saveData?: boolean }; deviceMemory?: number; standalone?: boolean };

/** What the visitor is using, read once per page view. */
function environment() {
  const nav = navigator as Nav;
  const mm = (q: string) => { try { return window.matchMedia(q).matches; } catch { return false; } };
  const theme = document.documentElement.getAttribute("data-theme");
  let tz: string | null = null;
  try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? null; } catch {}
  return {
    w: window.innerWidth, vw: window.innerWidth, vh: window.innerHeight, sh: window.screen?.height ?? null,
    dpr: Math.round((window.devicePixelRatio || 1) * 100) / 100, touch: (nav.maxTouchPoints ?? 0) > 0,
    lang: nav.language, langs: (nav.languages ?? []).slice(0, 6).join(","), tz,
    net: nav.connection?.effectiveType ?? null, sd: nav.connection?.saveData ?? null,
    scheme: theme === "dark" || theme === "light" ? theme : mm("(prefers-color-scheme: dark)") ? "dark" : "light",
    pwa: mm("(display-mode: standalone)") || nav.standalone === true,
    mem: typeof nav.deviceMemory === "number" ? nav.deviceMemory : null,
    cpu: typeof nav.hardwareConcurrency === "number" ? nav.hardwareConcurrency : null,
  };
}

/** How the visitor arrived: campaign tags and ad click ids from the landing address. */
function arrival(params: URLSearchParams) {
  const cid = CLICK_IDS.find((k) => params.has(k)) ?? null;
  return {
    utm: params.get("utm_source") ?? params.get("ref"), medium: params.get("utm_medium"), campaign: params.get("utm_campaign"),
    term: params.get("utm_term"), content: params.get("utm_content"), cid,
  };
}

/** Core Web Vitals for this document load, sent once when the page is hidden. */
function watchVitals(report: (name: string, value: number) => void) {
  if (typeof PerformanceObserver === "undefined") return () => {};
  const vals: Record<string, number> = {};
  const obs: PerformanceObserver[] = [];
  const watch = (type: string, cb: (e: PerformanceEntry) => void, extra: Record<string, unknown> = {}) => {
    try {
      const o = new PerformanceObserver((l) => l.getEntries().forEach(cb));
      o.observe({ type, buffered: true, ...extra } as PerformanceObserverInit);
      obs.push(o);
    } catch {}
  };
  watch("largest-contentful-paint", (e) => { vals.LCP = e.startTime; });
  watch("paint", (e) => { if (e.name === "first-contentful-paint") vals.FCP = e.startTime; });
  watch("layout-shift", (e) => {
    const s = e as PerformanceEntry & { value: number; hadRecentInput: boolean };
    if (!s.hadRecentInput) vals.CLS = (vals.CLS ?? 0) + s.value;
  });
  watch("event", (e) => { vals.INP = Math.max(vals.INP ?? 0, e.duration); }, { durationThreshold: 40 });
  try {
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (nav && nav.responseStart > 0) vals.TTFB = nav.responseStart;
  } catch {}
  let sent = false;
  const flush = () => {
    if (sent || document.visibilityState !== "hidden") return;
    sent = true;
    for (const [k, v] of Object.entries(vals)) report(k, k === "CLS" ? Math.round(v * 1000) / 1000 : Math.round(v));
    obs.forEach((o) => o.disconnect());
  };
  document.addEventListener("visibilitychange", flush);
  return () => document.removeEventListener("visibilitychange", flush);
}

export function Tracker() {
  const pathname = usePathname();
  const vRef = useRef<Visitor | null>(null);
  const page = useRef({ id: "", path: "", activeMs: 0, since: 0, scroll: 0 });

  // One page view per route, with time on page counted only while the tab is visible.
  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;
    if (navigator.webdriver) return;
    vRef.current ??= visitor();
    const v = vRef.current;
    const s = session(v);
    const p = { id: rid(), path: pathname, activeMs: 0, since: document.visibilityState === "visible" ? Date.now() : 0, scroll: 0 };
    page.current = p;

    const params = new URLSearchParams(window.location.search);
    send({
      t: "pv", v: v.id, s, e: p.id, path: pathname, q: window.location.search.slice(1) || null, title: document.title,
      ref: document.referrer || null, ...arrival(params), ...environment(),
      vn: v.visits || 1, fs: v.firstSeen, nv: v.isNew,
    });
    v.isNew = false;

    const active = () => p.activeMs + (p.since ? Date.now() - p.since : 0);
    const beat = (beacon = false) => {
      if (page.current !== p) return;
      send({ t: "hb", v: v.id, s: session(), e: p.id, path: p.path, ms: Math.round(active()), scroll: p.scroll }, beacon);
    };
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 100;
      if (pct > p.scroll) p.scroll = pct;
    };
    const onVis = () => {
      if (document.visibilityState === "hidden") {
        if (p.since) { p.activeMs += Date.now() - p.since; p.since = 0; }
        beat(true);
      } else if (!p.since) p.since = Date.now();
    };
    const onHide = () => beat(true);
    const timer = window.setInterval(() => { if (document.visibilityState === "visible") beat(); }, HEARTBEAT_MS);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pagehide", onHide);
    return () => {
      beat(true);
      window.clearInterval(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pagehide", onHide);
    };
  }, [pathname]);

  // Every click on a link or button: what it said and where it went.
  useEffect(() => {
    const onClick = (ev: MouseEvent) => {
      const el = (ev.target as Element | null)?.closest?.("a, button, [role='button'], summary, input[type='submit']") as HTMLElement | null;
      if (!el || el.closest("[data-no-track]") || !vRef.current) return;
      const label = (el.getAttribute("aria-label") || el.textContent || el.getAttribute("title") || "").replace(/\s+/g, " ").trim().slice(0, 140) || el.tagName.toLowerCase();
      const href = el instanceof HTMLAnchorElement ? el.href : null;
      let target = href;
      if (href) {
        try {
          const u = new URL(href);
          target = u.origin === window.location.origin ? u.pathname + u.search + u.hash : href;
        } catch {}
      } else target = el.tagName.toLowerCase();
      send({ t: "click", v: vRef.current.id, s: session(), e: rid(), path: window.location.pathname, label, target }, !!href && !href.startsWith(window.location.origin));
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  // What people type into search (the palette and the /search page), once they pause, with how many results they saw.
  useEffect(() => {
    let timer = 0;
    let last = "";
    const isSearch = (el: EventTarget | null): el is HTMLInputElement =>
      el instanceof HTMLInputElement && (el.getAttribute("role") === "combobox" || el.type === "search" || /^\/(ar\/)?search$/.test(window.location.pathname));
    const report = (el: HTMLInputElement, how: string) => {
      const q = el.value.replace(/\s+/g, " ").trim().slice(0, 200);
      if (q.length < 2 || q === last || !vRef.current) return;
      last = q;
      const results = document.querySelectorAll("[role='option']").length;
      send({ t: "search", v: vRef.current.id, s: session(), e: rid(), path: window.location.pathname, label: q, target: how, value: results });
    };
    const onInput = (ev: Event) => {
      if (!isSearch(ev.target)) return;
      const el = ev.target;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => report(el, "typed"), 1500);
    };
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Enter" && isSearch(ev.target)) { window.clearTimeout(timer); report(ev.target, "enter"); }
    };
    document.addEventListener("input", onInput, true);
    document.addEventListener("keydown", onKey, true);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("input", onInput, true);
      document.removeEventListener("keydown", onKey, true);
    };
  }, []);

  // Page speed for this document load, and script errors (a few per load), for the owner's Speed panel.
  useEffect(() => {
    if (window.location.pathname.startsWith("/admin") || navigator.webdriver) return;
    const ctx = () => ({ v: vRef.current?.id ?? visitor().id, s: session(), path: window.location.pathname });
    const stopVitals = watchVitals((name, value) => send({ t: "vital", e: rid(), ...ctx(), label: name, value }, true));
    let errors = 0;
    const onError = (msg: string, where: string | null) => {
      if (errors++ >= MAX_ERRORS || !msg) return;
      send({ t: "err", e: rid(), ...ctx(), label: msg.slice(0, 200), target: where?.slice(0, 300) ?? null });
    };
    const onErr = (ev: ErrorEvent) => onError(ev.message, ev.filename ? `${ev.filename}:${ev.lineno}:${ev.colno}` : null);
    const onRej = (ev: PromiseRejectionEvent) => onError(ev.reason instanceof Error ? ev.reason.message : String(ev.reason ?? "Unhandled rejection"), "promise");
    window.addEventListener("error", onErr);
    window.addEventListener("unhandledrejection", onRej);
    return () => {
      stopVitals();
      window.removeEventListener("error", onErr);
      window.removeEventListener("unhandledrejection", onRej);
    };
  }, []);

  return null;
}
