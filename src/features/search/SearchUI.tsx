"use client";

import { markAskPending } from "@/features/assistant/ask-pending";
import Link from "next/link";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { BadgePercent, BookA, BookOpen, CalendarDays, Clock, CornerDownLeft, FileText, GraduationCap, Landmark, Library, MessageCircleQuestion, Search, Sparkles, TextSearch, User, X } from "lucide-react";
import type { Search as SearchFn, SearchDoc, SearchHit, SearchType } from "@/lib/search/engine";
import { localizeUrl } from "@/lib/locale";
import { AdminHelp } from "@/components/shell/AdminHelp";
import { arCount } from "@/lib/arabic-count";

const TYPE: Record<SearchType, { label: string; ar: string; icon: typeof Search }> = {
  page: { label: "Pages", ar: "الصفحات", icon: FileText },
  guide: { label: "Guides", ar: "الأدلة", icon: BookOpen },
  faq: { label: "Answers", ar: "أجوبة", icon: MessageCircleQuestion },
  program: { label: "Study programmes", ar: "برامج الدراسة", icon: GraduationCap },
  shaykh: { label: "Mashayikh", ar: "المشايخ", icon: User },
  dars: { label: "Duroos", ar: "الدروس", icon: Landmark },
  library: { label: "Library", ar: "المكتبة", icon: Library },
  discount: { label: "Discounts", ar: "الخصومات", icon: BadgePercent },
  date: { label: "Key dates", ar: "مواعيد مهمة", icon: CalendarDays },
  term: { label: "Local words", ar: "مصطلحات", icon: BookA },
};
const T = {
  en: {
    search: "Search",
    searchMesh: "Search MESH",
    close: "Close search",
    popular: "Popular searches",
    recent: "Recent searches",
    clear: "Clear",
    failed: "Search couldn't load. Check your connection and try again.",
    loading: "Loading search...",
    none: (q: string) => `Nothing found for “${q}”. Ask the MESHaykh, or ask Admin.`,
    all: (q: string) => `See all results for “${q}”`,
    placeholder: "Search duroos, guides, institutes, books... بالعربي أيضًا",
    ask: "Ask the MESHaykh",
    askLine: (q: string) => `“${q}”`,
    askHint: "A written answer from MESH's guides, with links",
    inside: "Inside guides and answers",
    showing: "Showing results for",
    now: "Right now",
    short: "Short answer",
    more: "Read more",
  },
  ar: {
    search: "بحث",
    searchMesh: "البحث في MESH",
    close: "إغلاق البحث",
    popular: "عمليات بحث شائعة",
    recent: "عمليات بحثك الأخيرة",
    clear: "مسح",
    failed: "تعذّر تحميل البحث. تحقّق من الاتصال وحاول مرة أخرى.",
    loading: "جارٍ تحميل البحث...",
    none: (q: string) => `لا نتائج لـ «${q}». اسأل مساعد MESH، أو اسأل المشرف.`,
    all: (q: string) => `كل النتائج لـ «${q}»`,
    placeholder: "ابحث في الدروس والأدلة والمعاهد والكتب، بالعربية أو الإنجليزية",
    ask: "اسأل مساعد MESH",
    askLine: (q: string) => `«${q}»`,
    askHint: "جواب مكتوب من أدلة MESH مع الروابط",
    inside: "داخل الأدلة والأجوبة",
    showing: "نتائج البحث عن",
    now: "الآن",
    short: "الجواب المختصر",
    more: "اقرأ المزيد",
  },
};
const POPULAR_AR = ["الإقامة", "الرحيلي", "التأجيل", "تكلفة المعيشة", "البطاقة البنكية", "رخصة القيادة"];
const ORDER: SearchType[] = ["term", "date", "page", "guide", "faq", "program", "shaykh", "dars", "library", "discount"];
const POPULAR = ["Iqama", "MAP Arabic", "Ta'jeel", "Cost of living", "Bank card", "Sisters Arabic", "Graduation", "Driving licence"];

type Engine = { search: SearchFn; mod: typeof import("@/lib/search/engine") };
let cache: Promise<Engine> | null = null;
function loadSearch() {
  // The engine (minisearch) is loaded only when the search is first opened, never in the shared bundle.
  cache ??= Promise.all([fetch("/api/v1/search").then((r) => r.json()), import("@/lib/search/engine")])
    .then(([j, mod]: [{ data: SearchDoc[] }, typeof import("@/lib/search/engine")]) => ({ search: mod.createSearch(j.data), mod }))
    .catch((e) => {
      cache = null;
      throw e;
    });
  return cache;
}

function useSearch(q: string, active: boolean) {
  const [engine, setEngine] = useState<Engine | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!active || engine) return;
    loadSearch().then(setEngine, () => setFailed(true));
  }, [active, engine]);
  // Typing stays smooth on a slow phone: the results catch up with the input, not the other way round.
  const typed = useDeferredValue(q);
  const hits = useMemo(() => (engine ? engine.search(typed, 40) : []), [engine, typed]);
  const corrected = useMemo(() => (engine && typed.trim() ? engine.search.correct(typed) : null), [engine, typed]);
  const words = useMemo(() => (engine ? engine.mod.queryWords(corrected ?? typed) : []), [engine, typed, corrected]);
  const mark = useCallback((text: string) => (engine ? engine.mod.highlight(text, words) : [{ t: text, hit: false }]), [engine, words]);
  const covers = useCallback((heading: string) => !!engine && engine.mod.coversAll(heading, corrected ?? typed), [engine, corrected, typed]);
  return { hits, corrected, mark, covers, ready: !!engine, failed };
}

/** What the server's full-text pass returns (src/server/search/deep.ts). */
type DeepHit = { title: string; titleAr?: string; section?: string; snippet: string; url: string; kind: string };
type Instant = { title: string; text: string; url: string; kind: "live" | "answer" };
type Deep = { instant: Instant | null; hits: DeepHit[] };

const deepCache = new Map<string, Deep>();

/** The full-text pass, asked once the person pauses on three letters or more. */
function useDeep(q: string, active: boolean, locale: "en" | "ar"): Deep | null {
  const k = q.trim().replace(/\s+/g, " ");
  const key = `${locale}|${k.toLowerCase()}`;
  const [got, setGot] = useState<{ key: string; data: Deep } | null>(null);
  useEffect(() => {
    if (!active || k.length < 3 || deepCache.has(key)) return;
    const ctrl = new AbortController();
    const timer = setTimeout(() => {
      fetch(`/api/v1/search/deep?q=${encodeURIComponent(k)}&locale=${locale}`, { signal: ctrl.signal })
        .then((r) => (r.ok ? r.json() : null))
        .then((j: { data?: Deep } | null) => {
          if (!j?.data) return;
          if (deepCache.size > 200) deepCache.delete(deepCache.keys().next().value as string);
          deepCache.set(key, j.data);
          setGot({ key, data: j.data });
        })
        .catch(() => {});
    }, 280);
    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [k, key, active, locale]);
  if (k.length < 3) return null;
  return deepCache.get(key) ?? (got?.key === key ? got.data : null);
}

const RECENT_KEY = "mesh_recent_searches";
/** The last searches on this device, newest first. */
function readRecent(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string").slice(0, 6) : [];
  } catch {
    return [];
  }
}
function saveRecent(q: string) {
  const t = q.trim().replace(/\s+/g, " ");
  if (t.length < 2) return;
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify([t, ...readRecent().filter((x) => x.toLowerCase() !== t.toLowerCase())].slice(0, 6)));
  } catch {}
}
function useRecent(active: boolean) {
  const [list, setList] = useState<string[]>([]);
  useEffect(() => {
    if (active) setList(readRecent());
  }, [active]);
  const clear = () => {
    try {
      localStorage.removeItem(RECENT_KEY);
    } catch {}
    setList([]);
  };
  return { list, clear };
}

/** A search that reads as a question ("how do I renew my iqama", "كيف أجدد الإقامة") is offered to the assistant first. */
export function looksLikeQuestion(q: string): boolean {
  const t = q.trim().toLowerCase();
  return /[?؟]$/.test(t) || /^(how|what|whats|what's|where|when|which|who|why|can|could|do|does|did|is|are|should|will|would|i need|i want|i lost|my)\b/.test(t) || /^(كيف|ما|ماذا|متى|اين|أين|هل|لماذا|من|كم|ابغى|أريد|اريد)(\s|$)/.test(t);
}

/**
 * Opens Ask the MESHaykh with the question: the assistant on this page answers it in place (the launcher listens
 * for "mesh:ask"); with no launcher on the page, the assistant's own page opens with it.
 */
export function askMeshaykh(q: string, locale: "en" | "ar", go: (url: string) => void) {
  const ev = new CustomEvent("mesh:ask", { detail: { q: q.trim() }, cancelable: true });
  if (window.dispatchEvent(ev)) {
    // Mark the hand-off as the site's own, so /assistant asks at once only when this box sent it.
    markAskPending(q);
    go(`${locale === "ar" ? "/ar" : ""}/assistant?q=${encodeURIComponent(q.trim())}`);
  }
}

/** The id of a result's option element, for aria-activedescendant. */
export const optionId = (h: { id: string }) => `mesh-search-opt-${h.id.replace(/[^A-Za-z0-9_-]/g, "_")}`;

/** "12 results" for the live region. */
export function resultsSummary(n: number, locale: "en" | "ar"): string {
  if (locale === "ar") return arCount(n, "result", { zero: "لا نتائج" });
  return n === 1 ? "1 result" : `${n} results`;
}

/** Hits grouped by type, the group holding the best hit first; equal best scores keep ORDER. */
export function groupHits(hits: SearchHit[], compact: boolean): { t: SearchType; items: SearchHit[] }[] {
  const best = (items: SearchHit[]) => Math.max(...items.map((h) => h.score));
  return ORDER.map((t) => ({ t, items: hits.filter((h) => h.type === t).slice(0, compact ? 5 : 12) }))
    .filter((g) => g.items.length)
    .sort((a, b) => best(b.items) - best(a.items) || ORDER.indexOf(a.t) - ORDER.indexOf(b.t));
}

/**
 * The full-text hits worth showing beside the box's own: a section (or answer) the box did not already list,
 * at most `max`.
 */
export function freshDeep(deep: DeepHit[], hits: SearchHit[], max: number): DeepHit[] {
  const shown = new Set(hits.map((h) => h.url));
  return deep.filter((d) => !shown.has(d.url)).slice(0, max);
}

/**
 * Whether the sections found inside the pages lead: when the best one is headed with exactly what was searched
 * ("Uhud") and no result title of the box's own is, the section is the answer and goes first.
 */
export function deepLeads(inside: DeepHit[], flat: SearchHit[], covers: (heading: string) => boolean): boolean {
  const top = inside[0];
  if (!top?.section || !covers(top.section)) return false;
  return !flat.slice(0, 3).some((h) => covers(h.title));
}

/** One choosable row: a result, a section found inside a page, or "ask the assistant". */
type Opt = { id: string; url?: string; ask?: true };

function Marked({ parts }: { parts: { t: string; hit: boolean }[] }) {
  return (
    <>
      {parts.map((p, i) => (p.hit ? <mark key={i} className="rounded-sm bg-gold-bg px-0.5 text-inherit">{p.t}</mark> : <span key={i}>{p.t}</span>))}
    </>
  );
}

type ResultsProps = {
  q: string;
  hits: SearchHit[];
  deep: Deep | null;
  corrected: string | null;
  mark: (t: string) => { t: string; hit: boolean }[];
  covers: (heading: string) => boolean;
  cursor: number;
  /** Called when a link that is not a row is followed (the instant answer's "Read more"). */
  onLeave?: () => void;
  opts: Opt[];
  onPick: (o: Opt) => void;
  compact?: boolean;
  locale?: "en" | "ar";
  listId?: string;
  wide?: boolean;
};

function Results({ q, hits, deep, corrected, mark, covers, cursor, opts, onPick, onLeave, compact, locale = "en", listId, wide }: ResultsProps) {
  const t = T[locale];
  const groups = groupHits(hits, !!compact);
  const flat = groups.flatMap((g) => g.items);
  const inside = freshDeep(deep?.hits ?? [], flat, compact ? 4 : 8);
  if (!q.trim()) return null;
  const at = (id: string) => opts.findIndex((o) => o.id === id);
  const askFirst = looksLikeQuestion(q);
  const insideFirst = deepLeads(inside, flat, covers);

  const row = (id: string, url: string, body: ReactNode, Icon: typeof Search) => {
    const i = at(id);
    const ext = /^https?:/.test(url);
    return (
      <li key={id} role="option" id={optionId({ id })} aria-selected={i === cursor}>
        <a
          href={localizeUrl(url, locale)}
          target={ext ? "_blank" : undefined}
          rel={ext ? "noopener noreferrer" : undefined}
          tabIndex={compact ? -1 : undefined}
          onClick={(e) => {
            if (!ext) {
              e.preventDefault();
              onPick(opts[i]);
            }
          }}
          data-active={i === cursor}
          className="flex items-start gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-bg-2 data-[active=true]:bg-primary-soft"
        >
          <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-bg-2 text-primary">
            <Icon size={16} />
          </span>
          <span className="min-w-0 flex-1">{body}</span>
          {i === cursor && <CornerDownLeft size={15} className="mt-2 shrink-0 text-muted" />}
        </a>
      </li>
    );
  };

  const askRow = (
    <ul role="presentation" className={askFirst ? "mb-4" : "mt-4"}>
      <li role="option" id={optionId({ id: "ask" })} aria-selected={at("ask") === cursor}>
        <button
          type="button"
          tabIndex={compact ? -1 : undefined}
          onClick={() => onPick({ id: "ask", ask: true })}
          data-active={at("ask") === cursor}
          className="flex w-full items-center gap-3 rounded-xl border border-primary/25 bg-primary-soft/50 px-2 py-2.5 text-start transition-colors hover:bg-primary-soft data-[active=true]:bg-primary-soft"
        >
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand text-gold-bright">
            <Sparkles size={16} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate font-semibold leading-snug text-primary">
              {t.ask}: <span className="text-ink" dir="auto">{t.askLine(q.trim())}</span>
            </span>
            <span className="block truncate text-sm text-muted">{t.askHint}</span>
          </span>
          {at("ask") === cursor && <CornerDownLeft size={15} className="shrink-0 text-muted" />}
        </button>
      </li>
    </ul>
  );

  const insideSection = !!inside.length && (
            <section role="group" aria-label={t.inside} className={wide ? "mb-6 break-inside-avoid" : undefined}>
              <p className="mb-1.5 px-2 text-xs font-semibold text-muted" aria-hidden="true">{t.inside}</p>
              <ul role="presentation">
                {inside.map((d) =>
                  row(
                    `deep-${d.url}`,
                    d.url,
                    <>
                      <span className="block truncate font-semibold leading-snug" dir="auto">
                        <Marked parts={mark(d.section ?? ((locale === "ar" && d.titleAr) || d.title))} />
                      </span>
                      {d.section && <span className="block truncate text-xs text-muted" dir="auto">{(locale === "ar" && d.titleAr) || d.title}</span>}
                      <span className="mt-0.5 line-clamp-2 block text-sm text-muted" dir="auto"><Marked parts={mark(d.snippet)} /></span>
                    </>,
                    TextSearch
                  )
                )}
              </ul>
            </section>
          );

  const instant = deep?.instant;
  return (
    <div id={listId} role="listbox" aria-label={t.search}>
      <p className="sr-only" aria-live="polite">{resultsSummary(flat.length + inside.length, locale)}</p>
      {corrected && (
        <p className="mb-3 px-2 text-sm text-muted">
          {t.showing} <strong className="text-ink" dir="auto">{corrected}</strong>
        </p>
      )}
      {instant && (
        <div className="mb-4 rounded-2xl border border-gold/40 bg-gold-bg/60 p-4" role="note">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-muted">
            {instant.kind === "live" ? <Clock size={13} /> : <MessageCircleQuestion size={13} />} {instant.kind === "live" ? t.now : t.short}
          </p>
          <p className="mt-1 whitespace-pre-line text-[15px] leading-relaxed" dir="auto">{instant.text.length > 600 ? `${instant.text.slice(0, 600).replace(/\s+\S*$/, "")}...` : instant.text}</p>
          <Link href={localizeUrl(instant.url, locale)} onClick={() => { saveRecent(q); onLeave?.(); }} className="mt-2 inline-block text-sm font-semibold text-primary hover:underline">
            {t.more}
          </Link>
        </div>
      )}
      {askFirst && askRow}
      {!flat.length && !inside.length && !instant ? (
        <div className="px-2 py-6 text-center">
          <p className="text-muted" role="status">{t.none(q)}</p>
          <AdminHelp variant="line" locale={locale} path={`${locale === "ar" ? "/ar" : ""}/search?q=${encodeURIComponent(q.trim())}`} className="mt-3 text-sm" />
        </div>
      ) : (
        <div className={wide ? "lg:columns-2 lg:gap-8" : "space-y-5"}>
          {insideFirst && insideSection}
          {groups.map(({ t: type, items }) => {
            const { label: en, ar, icon } = TYPE[type];
            const label = locale === "ar" ? ar : en;
            return (
              <section key={type} role="group" aria-label={label} className={wide ? "mb-6 break-inside-avoid" : undefined}>
                <p className="mb-1.5 px-2 text-xs font-semibold text-muted" aria-hidden="true">{label}</p>
                <ul role="presentation">
                  {items.map((h) => {
                    const title = (locale === "ar" && h.titleAr) || h.title;
                    const sub = locale === "ar" && h.titleAr ? h.subtitleAr : h.subtitle;
                    return row(
                      h.id,
                      h.url,
                      <>
                        <span className="block truncate font-semibold leading-snug" dir="auto"><Marked parts={mark(title)} /></span>
                        {sub && <span className={`block text-sm text-muted ${h.type === "term" || h.type === "date" ? "line-clamp-2" : "truncate"}`} dir="auto">{sub}</span>}
                      </>,
                      icon
                    );
                  })}
                </ul>
              </section>
            );
          })}
          {!insideFirst && insideSection}
        </div>
      )}
      {!askFirst && askRow}
    </div>
  );
}

/** The rows in the order they show, for the arrow keys. */
function optionsOf(q: string, hits: SearchHit[], deep: Deep | null, compact: boolean, covers: (heading: string) => boolean): Opt[] {
  if (!q.trim()) return [];
  const flat = groupHits(hits, compact).flatMap((g) => g.items);
  const inside = freshDeep(deep?.hits ?? [], flat, compact ? 4 : 8);
  const box = flat.map((h) => ({ id: h.id, url: h.url }));
  const sections = inside.map((d) => ({ id: `deep-${d.url}`, url: d.url }));
  const rows: Opt[] = deepLeads(inside, flat, covers) ? [...sections, ...box] : [...box, ...sections];
  const ask: Opt = { id: "ask", ask: true };
  return looksLikeQuestion(q) ? [ask, ...rows] : [...rows, ask];
}

function Starters({ locale, onPick, chip }: { locale: "en" | "ar"; onPick: (q: string) => void; chip: string }) {
  const t = T[locale];
  const { list, clear } = useRecent(true);
  const popular = locale === "ar" ? POPULAR_AR : POPULAR;
  return (
    <div className="space-y-4">
      {!!list.length && (
        <div>
          <p className="flex items-center justify-between text-xs font-semibold text-muted">
            {t.recent}
            <button type="button" onClick={clear} className="min-h-8 rounded-full px-2 font-medium text-primary hover:bg-bg-2">{t.clear}</button>
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {list.map((p) => (
              <button key={p} type="button" onClick={() => onPick(p)} className={`${chip} inline-flex items-center gap-1.5`} dir="auto">
                <Clock size={13} className="text-muted" /> {p}
              </button>
            ))}
          </div>
        </div>
      )}
      <div>
        <p className="text-xs font-semibold text-muted">{t.popular}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {popular.map((p) => (
            <button key={p} type="button" onClick={() => onPick(p)} className={chip}>
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Header button + ⌘K / Ctrl+K palette, available on every page. */
export function SearchPalette({ locale = "en" }: { locale?: "en" | "ar" }) {
  const t = T[locale];
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  // The chosen row by its id, so it stays chosen when the sections from the server arrive and move it.
  const [chosen, setChosen] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  /** Whatever had focus when the palette opened; it gets focus back on close. */
  const opener = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const { hits, corrected, mark, covers, ready, failed } = useSearch(q, open);
  const deep = useDeep(q, open, locale);
  // Rows exist only once results show: Enter before then does nothing rather than ask the assistant.
  const opts = ready && !failed ? optionsOf(q, hits, deep, true, covers) : [];
  const cursor = Math.max(0, opts.findIndex((o) => o.id === chosen));
  const path = usePathname();
  const LIST_ID = "mesh-search-results";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "/" && !/input|textarea|select/i.test((e.target as HTMLElement).tagName) && !(e.target as HTMLElement).isContentEditable) {
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
  useEffect(() => setChosen(null), [q]);

  // Leaving the search (tap outside, X or Escape) cancels it, so it opens empty next time.
  const close = useCallback(() => {
    setOpen(false);
    setQ("");
  }, []);
  // A link followed from the palette opens its page, and the palette gets out of the way.
  const lastPath = useRef(path);
  useEffect(() => {
    if (lastPath.current === path) return;
    lastPath.current = path;
    close();
  }, [path, close]);

  const pick = useCallback(
    (o: Opt | undefined) => {
      if (!o) return;
      saveRecent(q);
      close();
      // After the palette has closed, so the assistant's dialog opens on the page itself.
      if (o.ask) setTimeout(() => askMeshaykh(q, locale, (u) => router.push(u)), 0);
      else if (o.url && /^https?:/.test(o.url)) window.open(o.url, "_blank", "noopener");
      else if (o.url) router.push(localizeUrl(o.url, locale));
    },
    [router, close, locale, q]
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t.searchMesh}
        className="flex h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-line bg-card px-3 text-sm text-muted transition hover:text-ink md:min-w-44 lg:min-w-11 xl:min-w-44 [:root[data-text]_&]:min-w-11"
      >
        <Search size={17} />
        <span className="hidden md:inline lg:hidden xl:inline" data-hdr-label>{t.search}</span>
        <kbd className="ms-auto hidden rounded-md border border-line px-1.5 text-[11px] md:inline lg:hidden xl:inline" dir="ltr" data-hdr-label>Ctrl K</kbd>
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
                  if (e.key === "ArrowDown") { e.preventDefault(); if (opts.length) setChosen(opts[Math.min(cursor + 1, opts.length - 1)].id); }
                  else if (e.key === "ArrowUp") { e.preventDefault(); if (opts.length) setChosen(opts[Math.max(cursor - 1, 0)].id); }
                  else if (e.key === "Enter" && opts[cursor]) { e.preventDefault(); pick(opts[cursor]); }
                }}
                placeholder={t.placeholder}
                className="h-14 w-full bg-transparent text-base text-ink outline-none placeholder:text-muted focus-visible:outline-none"
                aria-label={t.searchMesh}
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={ready && !!q.trim() && opts.length > 0}
                aria-controls={LIST_ID}
                aria-activedescendant={opts[cursor] ? optionId(opts[cursor]) : undefined}
                autoComplete="off"
                enterKeyHint="search"
              />
              <button type="button" onClick={close} aria-label={t.close} className="grid size-10 shrink-0 place-items-center rounded-full text-muted hover:bg-bg-2">
                <X size={18} />
              </button>
            </div>
            <div className="overflow-y-auto p-3">
              {!q.trim() ? (
                <div className="p-2">
                  <Starters locale={locale} onPick={setQ} chip="min-h-10 rounded-full bg-bg-2 px-3 py-1.5 text-sm font-medium hover:bg-primary-soft hover:text-primary" />
                </div>
              ) : failed ? (
                <p className="p-6 text-center text-muted" role="alert">{t.failed}</p>
              ) : !ready ? (
                <p className="p-6 text-center text-muted" role="status" aria-live="polite">{t.loading}</p>
              ) : (
                <Results q={q} hits={hits} deep={deep} corrected={corrected} mark={mark} covers={covers} cursor={cursor} opts={opts} onPick={pick} onLeave={close} compact locale={locale} listId={LIST_ID} />
              )}
            </div>
            {q.trim() && ready && (
              <Link href={`${locale === "ar" ? "/ar" : ""}/search?q=${encodeURIComponent(q)}`} onClick={() => { saveRecent(q); setOpen(false); }} className="border-t border-line px-5 py-3 text-sm font-semibold text-primary hover:bg-bg-2">
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
  const { hits, corrected, mark, covers, ready, failed } = useSearch(q, true);
  const deep = useDeep(q, true, locale);
  const opts = optionsOf(q, hits, deep, false, covers);
  useEffect(() => {
    const id = setTimeout(() => router.replace(q ? `${base}?q=${encodeURIComponent(q)}` : base, { scroll: false }), 300);
    return () => clearTimeout(id);
  }, [q, router, base]);
  const pick = (o: Opt) => {
    saveRecent(q);
    if (o.ask) askMeshaykh(q, locale, (u) => router.push(u));
    else if (o.url) router.push(localizeUrl(o.url, locale));
  };
  return (
    <div className="mx-auto max-w-5xl">
      <label className="mx-auto flex max-w-3xl items-center gap-3 rounded-2xl border border-line bg-card px-4 shadow-[var(--shadow)] focus-within:border-primary">
        <Search size={20} className="shrink-0 text-primary" />
        <span className="sr-only">{t.searchMesh}</span>
        <input
          autoFocus
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") saveRecent(q); }}
          placeholder={locale === "ar" ? "الإقامة، المعهد، التأجيل، الرحيلي..." : "Iqama, MAP, ta'jeel, الرحيلي..."}
          className="h-14 w-full bg-transparent text-lg text-ink outline-none placeholder:text-muted"
          autoComplete="off"
          enterKeyHint="search"
        />
      </label>
      <div className="mx-auto mt-6 max-w-3xl lg:max-w-none">
        {failed ? (
          <p className="text-muted" role="alert">{t.failed}</p>
        ) : !ready ? (
          <p className="text-muted" role="status">{t.loading}</p>
        ) : q.trim() ? (
          <Results q={q} hits={hits} deep={deep} corrected={corrected} mark={mark} covers={covers} cursor={-1} opts={opts} onPick={pick} locale={locale} wide />
        ) : (
          <Starters locale={locale} onPick={setQ} chip="rounded-full bg-card px-3.5 py-2 text-sm font-medium ring-1 ring-line hover:text-primary" />
        )}
      </div>
    </div>
  );
}
