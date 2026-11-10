"use client";

import { useEffect, useState } from "react";
import { BookOpen, CalendarDays, Home, RefreshCw, WifiOff } from "lucide-react";
import type { Locale } from "@/lib/locale";
import { ADMIN_WHATSAPP, adminWhatsAppHref } from "./admin-help";
import { AdminEmailLink } from "./AdminHelp";
import { PAGES_CACHE, SAVED_HEADER, TITLE_HEADER, formatSaved, isGuide, isOfflinePath, offlinePath } from "@/lib/offline-policy";

type Saved = { path: string; title: string; savedAt: number | null };

const FIXED: Record<string, { en: string; ar: string; order: number }> = {
  "/": { en: "Home", ar: "الرئيسية", order: 0 },
  "/duroos": { en: "Today's duroos", ar: "دروس اليوم", order: 1 },
  "/duroos/schedule": { en: "Weekly schedule", ar: "جدول الأسبوع", order: 2 },
};

const COPY = {
  en: {
    offline: "You are offline",
    online: "You are online",
    missing: "This page is not saved on your phone yet. Open it again when you have a signal.",
    missingBack: "Tap Try again to open this page.",
    onlineLead: "Open any page as usual. The pages below stay on your phone for when the signal drops.",
    listTitle: "Saved on this phone",
    listLead: "These pages open without a signal.",
    empty: "No pages are saved yet. While you have a signal, open the home page, today's duroos, the weekly schedule and any guide, and they will open here without one.",
    saved: "Saved",
    retry: "Try again",
    help: "Need help? Message Admin on WhatsApp at",
    email: "or email",
  },
  ar: {
    offline: "أنت غير متصل بالإنترنت",
    online: "أنت متصل بالإنترنت",
    missing: "هذه الصفحة غير محفوظة على جهازك بعد. افتحها مرة أخرى حين يعود الاتصال.",
    missingBack: "اضغط «حاول مرة أخرى» لفتح هذه الصفحة.",
    onlineLead: "افتح أي صفحة كالمعتاد. الصفحات أدناه تبقى على جهازك لوقت ضعف الشبكة.",
    listTitle: "محفوظة على هذا الجهاز",
    listLead: "تفتح هذه الصفحات دون اتصال.",
    empty: "لا توجد صفحات محفوظة بعد. افتح الرئيسية ودروس اليوم وجدول الأسبوع وأي دليل وأنت متصل، وستفتح هنا دون اتصال.",
    saved: "حُفظت",
    retry: "حاول مرة أخرى",
    help: "تحتاج مساعدة؟ راسل المشرف على واتساب على الرقم",
    email: "أو بالبريد",
  },
} as const;

const strip = (p: string) => (p === "/ar" ? "/" : p.startsWith("/ar/") ? p.slice(3) : p);
const isAr = (p: string) => p === "/ar" || p.startsWith("/ar/");

function label(s: Saved, locale: Locale): string {
  const fixed = FIXED[strip(s.path)];
  if (fixed) return fixed[locale];
  if (s.title) return s.title;
  const slug = s.path.split("/").pop() ?? "";
  return slug.replace(/-/g, " ").replace(/^./, (c) => c.toUpperCase());
}

async function readSaved(): Promise<Saved[]> {
  if (typeof caches === "undefined") return [];
  const cache = await caches.open(PAGES_CACHE);
  const out: Saved[] = [];
  for (const req of await cache.keys()) {
    const path = new URL(req.url).pathname;
    if (isOfflinePath(path)) continue;
    const res = await cache.match(req, { ignoreVary: true });
    const t = Number(res?.headers.get(SAVED_HEADER));
    let title = "";
    try {
      title = decodeURIComponent(res?.headers.get(TITLE_HEADER) ?? "");
    } catch {}
    out.push({ path, title, savedAt: t && Number.isFinite(t) ? t : null });
  }
  return out;
}

/** Sorted for the reader: their language first, then home, duroos and schedule, then guides, newest first. */
function sortSaved(list: Saved[], locale: Locale): Saved[] {
  const rank = (s: Saved) => (isAr(s.path) === (locale === "ar") ? 0 : 10) + (FIXED[strip(s.path)]?.order ?? 5);
  return [...list].sort((a, b) => rank(a) - rank(b) || (b.savedAt ?? 0) - (a.savedAt ?? 0));
}

/** The offline page: says the reader is offline, lists the pages kept on this phone with when each was saved. */
export function OfflineView({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const [pages, setPages] = useState<Saved[] | null>(null);
  const [online, setOnline] = useState(false);
  const [missing, setMissing] = useState(false);
  /** The signal came back while this page was showing. */
  const [cameBack, setCameBack] = useState(false);

  useEffect(() => {
    setMissing(location.pathname !== offlinePath(location.pathname));
    const update = () => setOnline(navigator.onLine);
    const back = () => {
      update();
      setCameBack(true);
    };
    const gone = () => {
      update();
      setCameBack(false);
    };
    update();
    window.addEventListener("online", back);
    window.addEventListener("offline", gone);
    readSaved()
      .then((list) => setPages(sortSaved(list, locale)))
      .catch(() => setPages([]));
    return () => {
      window.removeEventListener("online", back);
      window.removeEventListener("offline", gone);
    };
  }, [locale]);

  // Standing in for a page that just failed to load, "online" alone is not trusted (a weak signal still
  // reports online); only a return of the signal while this page shows counts.
  const showOnline = online && (!missing || cameBack);

  return (
    <div data-offline-view className="shell grid gap-8 py-10 md:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-12">
      <section className="lattice lattice-soft card overflow-hidden p-6 md:p-8">
        <span className="grid size-12 place-items-center rounded-full bg-gold-bg text-gold">
          <WifiOff size={24} aria-hidden />
        </span>
        <h1 className="mt-4 font-heading text-3xl font-bold md:text-4xl">{showOnline ? t.online : t.offline}</h1>
        <p className="mt-3 max-w-prose text-muted">{missing ? (showOnline ? t.missingBack : t.missing) : showOnline ? t.onlineLead : t.listLead}</p>
        <button
          type="button"
          onClick={() => location.reload()}
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 font-semibold text-primary-ink"
        >
          <RefreshCw size={17} aria-hidden /> {t.retry}
        </button>
        <p className="mt-8 text-sm text-muted">
          {t.help}{" "}
          <a href={adminWhatsAppHref(undefined, locale)} target="_blank" rel="noopener noreferrer" dir="ltr" className="whitespace-nowrap font-semibold text-primary [unicode-bidi:isolate] hover:underline">
            {ADMIN_WHATSAPP}
          </a>{" "}
          {t.email} <AdminEmailLink className="font-semibold text-primary hover:underline" />
        </p>
      </section>

      <section aria-labelledby="saved-pages">
        <h2 id="saved-pages" className="font-heading text-2xl font-bold">{t.listTitle}</h2>
        <p className="mt-1 text-muted">{t.listLead}</p>
        {pages === null ? (
          <ul className="mt-4 grid gap-3" aria-hidden>
            {[0, 1, 2].map((i) => (
              <li key={i} className="card h-[72px] animate-pulse" />
            ))}
          </ul>
        ) : pages.length === 0 ? (
          <p className="card mt-4 p-5 text-muted">{t.empty}</p>
        ) : (
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {pages.map((p) => {
              const Icon = strip(p.path) === "/" ? Home : isGuide(p.path) ? BookOpen : CalendarDays;
              return (
                <li key={p.path}>
                  {/* A full page load, so the worker answers it from the saved copy. */}
                  <a href={p.path} lang={isAr(p.path) ? "ar" : "en"} className="card flex min-h-[72px] items-center gap-3 p-4 transition hover:border-primary">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                      <Icon size={19} aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold leading-snug">{label(p, isAr(p.path) ? "ar" : "en")}</span>
                      {p.savedAt ? (
                        <span className="block text-sm text-muted">
                          {isAr(p.path) ? COPY.ar.saved : COPY.en.saved} {formatSaved(p.savedAt, isAr(p.path) ? "ar" : "en")}
                        </span>
                      ) : null}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
