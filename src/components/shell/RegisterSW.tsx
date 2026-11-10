"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { WifiOff } from "lucide-react";
import type { Locale } from "@/lib/locale";
import { PAGES_CACHE, SAVED_HEADER, formatSaved, offlinePath, pageKey } from "@/lib/offline-policy";

/** Set to false (with KILL = true in public/sw.js) to stop registering the worker for every visitor. */
const REGISTER = true;

const supported = () => typeof navigator !== "undefined" && "serviceWorker" in navigator;
const sentAssets = new Set<string>();

/** Build files this page has loaded so far, so the worker can keep them even from the first, uncontrolled visit. */
function newAssets(): string[] {
  const out: string[] = [];
  try {
    for (const e of performance.getEntriesByType("resource")) {
      const u = new URL(e.name);
      const p = u.pathname + u.search;
      if (u.origin === location.origin && u.pathname.startsWith("/_next/static/") && !sentAssets.has(p)) {
        sentAssets.add(p);
        out.push(p);
      }
    }
  } catch {}
  return out;
}

/** Asks the worker whether it answered this page from a saved copy, and when that copy was saved. */
function askWorker(path: string): Promise<{ fromCache: boolean; savedAt: number | null }> {
  return new Promise((resolve) => {
    const sw = navigator.serviceWorker.controller;
    if (!sw) return resolve({ fromCache: false, savedAt: null });
    const ch = new MessageChannel();
    const timer = setTimeout(() => resolve({ fromCache: false, savedAt: null }), 1500);
    ch.port1.onmessage = (e) => {
      clearTimeout(timer);
      resolve({ fromCache: !!e.data?.fromCache, savedAt: typeof e.data?.savedAt === "number" ? e.data.savedAt : null });
    };
    sw.postMessage({ type: "mesh-status", path }, [ch.port2]);
  });
}

async function savedTime(path: string): Promise<number | null> {
  const key = pageKey(path);
  if (!key || typeof caches === "undefined") return null;
  try {
    const res = await (await caches.open(PAGES_CACHE)).match(location.origin + key, { ignoreVary: true });
    const v = Number(res?.headers.get(SAVED_HEADER));
    return v && Number.isFinite(v) ? v : null;
  } catch {
    return null;
  }
}

/**
 * Registers /sw.js for every visitor once the page has loaded (never in development, never on /admin), tells it
 * which page is showing so it can be kept for reading offline, and shows a small banner when the reader is offline.
 */
export function RegisterSW({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "/";
  const ar = locale === "ar";
  const [offline, setOffline] = useState(false);
  const [fromCache, setFromCache] = useState(false);
  const [saved, setSaved] = useState<number | null>(null);
  const [isOfflineView, setIsOfflineView] = useState(false);
  const [cameBack, setCameBack] = useState(false);
  const wasOffline = useRef(false);
  /** Only the document as first loaded can be a saved copy; later soft navigations fetch fresh data. */
  const firstShow = useRef(true);
  /** This page was opened without a signal (so what shows is a saved copy, or the offline page). */
  const [openedOffline, setOpenedOffline] = useState(false);

  useEffect(() => {
    if (!REGISTER || process.env.NODE_ENV !== "production" || !supported() || location.pathname.startsWith("/admin")) return;
    const go = () => void navigator.serviceWorker.register("/sw.js").catch(() => {});
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => window.removeEventListener("load", go);
  }, []);

  useEffect(() => {
    const update = () => {
      const now = !navigator.onLine;
      if (wasOffline.current && !now) setCameBack(true);
      wasOffline.current = now;
      setOffline(now);
    };
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  // After each page is shown: let the worker keep it, and learn whether this copy came from the cache.
  useEffect(() => {
    setIsOfflineView(!!document.querySelector("[data-offline-view]"));
    setFromCache(false);
    setSaved(null);
    setCameBack(false);
    setOpenedOffline(!navigator.onLine);
    const first = firstShow.current;
    firstShow.current = false;
    if (!REGISTER || process.env.NODE_ENV !== "production" || !supported() || pathname.startsWith("/admin")) return;
    let live = true;
    if (first) {
      void askWorker(pathname).then((s) => {
        if (live && s.fromCache) {
          setFromCache(true);
          setSaved(s.savedAt);
        }
      });
    }
    const timer = setTimeout(() => {
      void navigator.serviceWorker.ready.then((reg) => reg.active?.postMessage({ type: "mesh-save", path: pathname, assets: newAssets() }));
    }, 1500);
    return () => {
      live = false;
      clearTimeout(timer);
    };
  }, [pathname]);

  useEffect(() => {
    if (!offline || fromCache) return;
    let live = true;
    void savedTime(pathname).then((t) => live && setSaved(t));
    return () => {
      live = false;
    };
  }, [offline, fromCache, pathname]);

  // Offline, or answered from a saved copy because the network failed. Once the signal returns, offer a refresh.
  const back = !offline && cameBack && (fromCache || openedOffline);
  if (isOfflineView || (!offline && !fromCache && !back)) return null;

  return (
    <div role="status" data-noprint data-offline-banner className="border-b border-line bg-gold-bg text-sm text-ink">
      <div className="shell flex min-h-10 flex-wrap items-center justify-between gap-x-3 gap-y-1 py-2">
        <p className="flex items-center gap-2">
          <WifiOff size={16} className="shrink-0 text-gold" aria-hidden />
          <span>
            {back
              ? ar ? "عاد الاتصال. حدّث الصفحة لترى آخر نسخة." : "You are back online. Refresh for the latest copy."
              : saved
                ? ar ? `حُفظت ${formatSaved(saved, "ar")}، وأنت غير متصل بالإنترنت.` : `Saved ${formatSaved(saved, "en")}, you are offline.`
                : ar ? "أنت غير متصل بالإنترنت." : "You are offline."}
          </span>
        </p>
        {back ? (
          <button type="button" onClick={() => location.reload()} className="min-h-9 rounded-full bg-primary px-4 text-sm font-semibold text-primary-ink">
            {ar ? "تحديث" : "Refresh"}
          </button>
        ) : (
          <a href={offlinePath(pathname)} className="font-semibold text-primary underline-offset-2 hover:underline">
            {ar ? "الصفحات المحفوظة" : "Saved pages"}
          </a>
        )}
      </div>
    </div>
  );
}
