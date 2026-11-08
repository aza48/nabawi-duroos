"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { OPT_OUT_KEY, trackingAllowed } from "@/lib/privacy";

/**
 * Anonymous visitor analytics for the admin Analytics page.
 * Sends page views, time on page, scroll depth and clicks to /api/v1/track.
 * Uses a random id kept in this browser; no name, email or IP address is stored.
 * Off when the reader opted out on /privacy, when the browser sends Global Privacy Control, and for automated browsers.
 */

const ENDPOINT = "/api/v1/track";
const SESSION_IDLE_MS = 30 * 60 * 1000;
const HEARTBEAT_MS = 15_000;

const rid = () =>
  (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`).replace(/[^A-Za-z0-9_-]/g, "");

function store(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function visitor(): { id: string; isNew: boolean } {
  const ls = store();
  let id = ls?.getItem("mesh_vid") ?? null;
  if (id) return { id, isNew: false };
  id = rid();
  try { ls?.setItem("mesh_vid", id); } catch {}
  return { id, isNew: true };
}

function session(): string {
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
  try { ls?.setItem("mesh_sid", JSON.stringify({ id, last: now })); } catch {}
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

export function Tracker() {
  const pathname = usePathname();
  const vRef = useRef<{ id: string; isNew: boolean } | null>(null);
  const page = useRef({ id: "", path: "", activeMs: 0, since: 0, scroll: 0 });

  // One page view per route, with time on page counted only while the tab is visible.
  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;
    const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
    if (!trackingAllowed({ gpc: nav.globalPrivacyControl, webdriver: nav.webdriver, optOut: store()?.getItem(OPT_OUT_KEY) })) return;
    vRef.current ??= visitor();
    const v = vRef.current;
    const s = session();
    const p = { id: rid(), path: pathname, activeMs: 0, since: document.visibilityState === "visible" ? Date.now() : 0, scroll: 0 };
    page.current = p;

    const params = new URLSearchParams(window.location.search);
    send({
      t: "pv", v: v.id, s, e: p.id, path: pathname, title: document.title,
      ref: document.referrer || null, w: window.innerWidth, lang: navigator.language,
      utm: params.get("utm_source") ?? params.get("ref"), campaign: params.get("utm_campaign"), nv: v.isNew,
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
          target = u.origin === window.location.origin ? u.pathname + u.hash : href;
        } catch {}
      } else target = el.tagName.toLowerCase();
      send({ t: "click", v: vRef.current.id, s: session(), e: rid(), path: window.location.pathname, label, target }, !!href && !href.startsWith(window.location.origin));
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
