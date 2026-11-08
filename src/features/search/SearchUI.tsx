"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BadgePercent, BookOpen, CornerDownLeft, FileText, GraduationCap, Landmark, Library, MessageCircleQuestion, Search, User, X } from "lucide-react";
import { createSearch, type SearchDoc, type SearchHit, type SearchType } from "@/lib/search/engine";
import { localizeUrl } from "@/lib/locale";

const TYPE: Record<SearchType, { label: string; ar: string; icon: typeof Search }> = {
  page: { label: "Pages", ar: "الصفحات", icon: FileText },
  guide: { label: "Guides", ar: "الأدلة", icon: BookOpen },
  faq: { label: "Answers", ar: "أجوبة", icon: MessageCircleQuestion },
  program: { label: "Study programmes", ar: "برامج الدراسة", icon: GraduationCap },
  shaykh: { label: "Mashayikh", ar: "المشايخ", icon: User },
  dars: { label: "Duroos", ar: "الدروس", icon: Landmark },
  library: { label: "Library", ar: "المكتبة", icon: Library },
  discount: { label: "Discounts", ar: "الخصومات", icon: BadgePercent },
};
const T = {
  en: { search: "Search", searchMesh: "Search MESH", close: "Close search", popular: "Popular searches", failed: "Search couldn't load. Check your connection and try again.", loading: "Loading search...", none: (q: string) => `Nothing found for “${q}”. Try another word, or ask in the WhatsApp group.`, all: (q: string) => `See all results for “${q}”`, placeholder: "Search duroos, guides, institutes, books... بالعربي أيضًا" },
  ar: { search: "بحث", searchMesh: "البحث في MESH", close: "إغلاق البحث", popular: "عمليات بحث شائعة", failed: "تعذّر تحميل البحث. تحقّق من الاتصال وحاول مرة أخرى.", loading: "جارٍ تحميل البحث...", none: (q: string) => `لا نتائج لـ «${q}». جرّب كلمة أخرى، أو اسأل في مجموعة واتساب.`, all: (q: string) => `كل النتائج لـ «${q}»`, placeholder: "ابحث عن الدروس والأدلة والمعاهد والكتب... in English too" },
};
const POPULAR_AR = ["الإقامة", "الرحيلي", "التأجيل", "تكلفة المعيشة", "البطاقة البنكية", "رخصة القيادة"];
const ORDER: SearchType[] = ["page", "guide", "faq", "program", "shaykh", "dars", "library", "discount"];
const POPULAR = ["Iqama", "MAP Arabic", "Ta'jeel", "Cost of living", "Bank card", "Sisters Arabic", "Graduation", "Driving licence"];

let cache: Promise<ReturnType<typeof createSearch>> | null = null;
function loadSearch() {
  cache ??= fetch("/api/v1/search")
    .then((r) => r.json())
    .then((j: { data: SearchDoc[] }) => createSearch(j.data))
    .catch((e) => {
      cache = null;
      throw e;
    });
  return cache;
}

function useSearch(q: string, active: boolean) {
  const [engine, setEngine] = useState<ReturnType<typeof createSearch> | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!active || engine) return;
    // Wrap it: setState treats a bare function as an updater and would call it.
    loadSearch().then((fn) => setEngine(() => fn), () => setFailed(true));
  }, [active, engine]);
  const hits = useMemo(() => (engine ? engine(q, 40) : []), [engine, q]);
  return { hits, ready: !!engine, failed };
}

/** The id of a result's option element, for aria-activedescendant. */
export const optionId = (h: SearchHit) => `mesh-search-opt-${h.id.replace(/[^A-Za-z0-9_-]/g, "_")}`;

/** "12 results" for the live region. */
export function resultsSummary(n: number, locale: "en" | "ar"): string {
  if (locale === "ar") return n === 0 ? "لا نتائج" : n === 1 ? "نتيجة واحدة" : n === 2 ? "نتيجتان" : `${n} نتائج`;
  return n === 1 ? "1 result" : `${n} results`;
}

function Results({ hits, q, cursor, onPick, compact, locale = "en", listId, wide }: { hits: SearchHit[]; q: string; cursor: number; onPick: (h: SearchHit) => void; compact?: boolean; locale?: "en" | "ar"; listId?: string; wide?: boolean }) {
  const groups = ORDER.map((t) => ({ t, items: hits.filter((h) => h.type === t).slice(0, compact ? 5 : 12) })).filter((g) => g.items.length);
  const flat = groups.flatMap((g) => g.items);
  if (!q.trim()) return null;
  if (!flat.length) return <p className="px-2 py-8 text-center text-muted" role="status">{T[locale].none(q)}</p>;
  return (
    <div id={listId} role="listbox" aria-label={T[locale].search} className={wide ? "lg:columns-2 lg:gap-8" : "space-y-5"}>
      <p className="sr-only" aria-live="polite">{resultsSummary(flat.length, locale)}</p>
      {groups.map(({ t, items }) => {
        const { label: en, ar, icon: Icon } = TYPE[t];
        const label = locale === "ar" ? ar : en;
        return (
          <section key={t} role="group" aria-label={label} className={wide ? "mb-6 break-inside-avoid" : undefined}>
            <p className="mb-1.5 px-2 text-xs font-semibold text-muted" aria-hidden="true">{label}</p>
            <ul role="presentation">
              {items.map((h) => {
                const i = flat.indexOf(h);
                const ext = /^https?:/.test(h.url);
                return (
                  <li key={h.id} role="option" id={optionId(h)} aria-selected={i === cursor}>
                    <a
                      href={localizeUrl(h.url, locale)}
                      target={ext ? "_blank" : undefined}
                      rel={ext ? "noopener noreferrer" : undefined}
                      tabIndex={-1}
                      onClick={(e) => {
                        if (!ext) {
                          e.preventDefault();
                          onPick(h);
                        }
                      }}
                      data-active={i === cursor}
                      className="flex items-start gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-bg-2 data-[active=true]:bg-primary-soft"
                    >
                      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-bg-2 text-primary">
                        <Icon size={16} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-semibold leading-snug">{h.title}</span>
                        {h.subtitle && <span className="block truncate text-sm text-muted">{h.subtitle}</span>}
                      </span>
                      {i === cursor && <CornerDownLeft size={15} className="mt-2 shrink-0 text-muted" />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

function flatten(hits: SearchHit[], compact: boolean) {
  return ORDER.flatMap((t) => hits.filter((h) => h.type === t).slice(0, compact ? 5 : 12));
}

/** Header button + ⌘K / Ctrl+K palette, available on every page. */
export function SearchPalette({ locale = "en" }: { locale?: "en" | "ar" }) {
  const t = T[locale];
  const popular = locale === "ar" ? POPULAR_AR : POPULAR;
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  /** Whatever had focus when the palette opened; it gets focus back on close. */
  const opener = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const { hits, ready, failed } = useSearch(q, open);
  const flat = flatten(hits, true);
  const LIST_ID = "mesh-search-results";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "/" && !/input|textarea/i.test((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  // A native modal dialog gives the focus trap, Escape and inertness of the page behind it.
  useEffect(() => {
    const d = dialog.current;
    if (!open || !d) return;
    opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (!d.open) d.showModal();
    setTimeout(() => input.current?.focus(), 10);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      if (d.open) d.close();
      opener.current?.focus();
    };
  }, [open]);
  useEffect(() => setCursor(0), [q]);

  // Leaving the search (tap outside, X or Escape) cancels it, so it opens empty next time.
  const close = useCallback(() => {
    setOpen(false);
    setQ("");
  }, []);

  const pick = useCallback(
    (h: SearchHit) => {
      close();
      if (/^https?:/.test(h.url)) window.open(h.url, "_blank", "noopener");
      else router.push(localizeUrl(h.url, locale));
    },
    [router, close, locale]
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t.searchMesh}
        className="flex h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-line bg-card px-3 text-sm text-muted transition hover:text-ink md:min-w-44 lg:min-w-11 xl:min-w-44"
      >
        <Search size={17} />
        <span className="hidden md:inline lg:hidden xl:inline">{t.search}</span>
        <kbd className="ms-auto hidden rounded-md border border-line px-1.5 text-[11px] md:inline lg:hidden xl:inline" dir="ltr">Ctrl K</kbd>
      </button>
      {open &&
        createPortal(
        <dialog
          ref={dialog}
          aria-label={t.search}
          onClose={close}
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
          className="fixed inset-0 m-0 flex h-full max-h-none w-full max-w-none cursor-pointer items-start justify-center bg-ink/40 p-3 pt-[8vh] backdrop-blur-sm backdrop:bg-transparent md:pt-[12vh]"
        >
          <div onClick={(e) => e.stopPropagation()} className="flex max-h-[80vh] w-full max-w-2xl cursor-auto flex-col overflow-hidden rounded-3xl border border-line bg-card text-ink shadow-[var(--shadow-lg)]">
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search size={20} className="shrink-0 text-primary" />
              <input
                ref={input}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") { e.preventDefault(); setCursor((c) => Math.min(c + 1, flat.length - 1)); }
                  else if (e.key === "ArrowUp") { e.preventDefault(); setCursor((c) => Math.max(c - 1, 0)); }
                  else if (e.key === "Enter" && flat[cursor]) { e.preventDefault(); pick(flat[cursor]); }
                }}
                placeholder={t.placeholder}
                className="h-14 w-full bg-transparent text-base text-ink outline-none placeholder:text-muted focus-visible:outline-none"
                aria-label={t.searchMesh}
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={ready && !!q.trim() && flat.length > 0}
                aria-controls={LIST_ID}
                aria-activedescendant={flat[cursor] ? optionId(flat[cursor]) : undefined}
                autoComplete="off"
              />
              <button type="button" onClick={close} aria-label={t.close} className="grid size-10 shrink-0 place-items-center rounded-full text-muted hover:bg-bg-2">
                <X size={18} />
              </button>
            </div>
            <div className="overflow-y-auto p-3">
              {!q.trim() ? (
                <div className="p-2">
                  <p className="text-xs font-semibold text-muted">{t.popular}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {popular.map((p) => (
                      <button key={p} type="button" onClick={() => setQ(p)} className="min-h-10 rounded-full bg-bg-2 px-3 py-1.5 text-sm font-medium hover:bg-primary-soft hover:text-primary">
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              ) : failed ? (
                <p className="p-6 text-center text-muted" role="alert">{t.failed}</p>
              ) : !ready ? (
                <p className="p-6 text-center text-muted" role="status" aria-live="polite">{t.loading}</p>
              ) : (
                <Results hits={hits} q={q} cursor={cursor} onPick={pick} compact locale={locale} listId={LIST_ID} />
              )}
            </div>
            {q.trim() && ready && (
              <Link href={`${locale === "ar" ? "/ar" : ""}/search?q=${encodeURIComponent(q)}`} onClick={() => setOpen(false)} className="border-t border-line px-5 py-3 text-sm font-semibold text-primary hover:bg-bg-2">
                {t.all(q)}
              </Link>
            )}
          </div>
        </dialog>,
          document.body
        )}
    </>
  );
}

/** The full results page at /search?q=... */
export function SearchPage({ initial, locale = "en" }: { initial: string; locale?: "en" | "ar" }) {
  const [q, setQ] = useState(initial);
  const router = useRouter();
  const t = T[locale];
  const base = locale === "ar" ? "/ar/search" : "/search";
  const { hits, ready, failed } = useSearch(q, true);
  useEffect(() => {
    const id = setTimeout(() => router.replace(q ? `${base}?q=${encodeURIComponent(q)}` : base, { scroll: false }), 300);
    return () => clearTimeout(id);
  }, [q, router, base]);
  return (
    <div className="mx-auto max-w-5xl">
      <label className="mx-auto flex max-w-3xl items-center gap-3 rounded-2xl border border-line bg-card px-4 shadow-[var(--shadow)] focus-within:border-primary">
        <Search size={20} className="shrink-0 text-primary" />
        <span className="sr-only">{t.searchMesh}</span>
        <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder={locale === "ar" ? "الإقامة، المعهد، التأجيل، الرحيلي..." : "Iqama, MAP, ta'jeel, الرحيلي..."} className="h-14 w-full bg-transparent text-lg text-ink outline-none placeholder:text-muted" autoComplete="off" />
      </label>
      <div className="mt-6">
        {failed ? <p className="text-muted" role="alert">{t.failed}</p> : !ready ? <p className="text-muted" role="status">{t.loading}</p> : <Results hits={hits} q={q} cursor={-1} onPick={(h) => router.push(localizeUrl(h.url, locale))} locale={locale} wide />}
        {!q.trim() && ready && (
          <div className="flex flex-wrap gap-2">
            {(locale === "ar" ? POPULAR_AR : POPULAR).map((p) => (
              <button key={p} type="button" onClick={() => setQ(p)} className="rounded-full bg-card px-3.5 py-2 text-sm font-medium ring-1 ring-line hover:text-primary">
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
