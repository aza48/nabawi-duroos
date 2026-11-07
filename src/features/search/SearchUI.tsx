"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BadgePercent, BookOpen, CornerDownLeft, FileText, GraduationCap, Landmark, Library, MessageCircleQuestion, Search, User, X } from "lucide-react";
import { createSearch, type SearchDoc, type SearchHit, type SearchType } from "@/lib/search/engine";

const TYPE: Record<SearchType, { label: string; icon: typeof Search }> = {
  page: { label: "Pages", icon: FileText },
  guide: { label: "Guides", icon: BookOpen },
  faq: { label: "Answers", icon: MessageCircleQuestion },
  program: { label: "Study programmes", icon: GraduationCap },
  shaykh: { label: "Mashayikh", icon: User },
  dars: { label: "Duroos", icon: Landmark },
  library: { label: "Library", icon: Library },
  discount: { label: "Discounts", icon: BadgePercent },
};
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

function Results({ hits, q, cursor, onPick, compact }: { hits: SearchHit[]; q: string; cursor: number; onPick: (h: SearchHit) => void; compact?: boolean }) {
  const groups = ORDER.map((t) => ({ t, items: hits.filter((h) => h.type === t).slice(0, compact ? 5 : 12) })).filter((g) => g.items.length);
  const flat = groups.flatMap((g) => g.items);
  if (!q.trim()) return null;
  if (!flat.length) return <p className="px-2 py-8 text-center text-muted">Nothing found for &ldquo;{q}&rdquo;. Try another word, or ask in the WhatsApp group.</p>;
  return (
    <div className="space-y-5">
      {groups.map(({ t, items }) => {
        const { label, icon: Icon } = TYPE[t];
        return (
          <section key={t}>
            <p className="mb-1.5 px-2 text-xs font-semibold text-muted">{label}</p>
            <ul>
              {items.map((h) => {
                const i = flat.indexOf(h);
                const ext = /^https?:/.test(h.url);
                return (
                  <li key={h.id}>
                    <a
                      href={h.url}
                      target={ext ? "_blank" : undefined}
                      rel={ext ? "noopener noreferrer" : undefined}
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
export function SearchPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { hits, ready, failed } = useSearch(q, open);
  const flat = flatten(hits, true);

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
  useEffect(() => {
    if (open) setTimeout(() => input.current?.focus(), 10);
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);
  useEffect(() => setCursor(0), [q]);

  const pick = useCallback(
    (h: SearchHit) => {
      setOpen(false);
      if (/^https?:/.test(h.url)) window.open(h.url, "_blank", "noopener");
      else router.push(h.url);
    },
    [router]
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search MESH"
        className="flex h-10 items-center gap-2 rounded-full border border-line bg-card px-3 text-sm text-muted transition hover:text-ink md:min-w-44"
      >
        <Search size={17} />
        <span className="hidden md:inline">Search</span>
        <kbd className="ms-auto hidden rounded-md border border-line px-1.5 text-[11px] md:inline">Ctrl K</kbd>
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-ink/40 p-3 pt-[8vh] backdrop-blur-sm md:pt-[12vh]" onClick={() => setOpen(false)}>
          <div role="dialog" aria-modal="true" aria-label="Search" onClick={(e) => e.stopPropagation()} className="flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-line bg-card shadow-[var(--shadow-lg)]">
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
                  else if (e.key === "Escape") setOpen(false);
                }}
                placeholder="Search duroos, guides, institutes, books... بالعربي أيضًا"
                className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted focus-visible:outline-none"
                aria-label="Search MESH"
              />
              <button type="button" onClick={() => setOpen(false)} aria-label="Close search" className="grid size-8 place-items-center rounded-full text-muted hover:bg-bg-2">
                <X size={18} />
              </button>
            </div>
            <div className="overflow-y-auto p-3">
              {!q.trim() ? (
                <div className="p-2">
                  <p className="text-xs font-semibold text-muted">Popular searches</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {POPULAR.map((p) => (
                      <button key={p} type="button" onClick={() => setQ(p)} className="rounded-full bg-bg-2 px-3 py-1.5 text-sm font-medium hover:bg-primary-soft hover:text-primary">
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              ) : failed ? (
                <p className="p-6 text-center text-muted">Search couldn&apos;t load. Check your connection and try again.</p>
              ) : !ready ? (
                <p className="p-6 text-center text-muted">Loading search...</p>
              ) : (
                <Results hits={hits} q={q} cursor={cursor} onPick={pick} compact />
              )}
            </div>
            {q.trim() && ready && (
              <Link href={`/search?q=${encodeURIComponent(q)}`} onClick={() => setOpen(false)} className="border-t border-line px-5 py-3 text-sm font-semibold text-primary hover:bg-bg-2">
                See all results for &ldquo;{q}&rdquo;
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}

/** The full results page at /search?q=... */
export function SearchPage({ initial }: { initial: string }) {
  const [q, setQ] = useState(initial);
  const router = useRouter();
  const { hits, ready, failed } = useSearch(q, true);
  useEffect(() => {
    const t = setTimeout(() => router.replace(q ? `/search?q=${encodeURIComponent(q)}` : "/search", { scroll: false }), 300);
    return () => clearTimeout(t);
  }, [q, router]);
  return (
    <div className="mx-auto max-w-3xl">
      <label className="flex items-center gap-3 rounded-2xl border border-line bg-card px-4 shadow-[var(--shadow)] focus-within:border-primary">
        <Search size={20} className="shrink-0 text-primary" />
        <span className="sr-only">Search MESH</span>
        <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Iqama, MAP, ta'jeel, الرحيلي..." className="h-14 w-full bg-transparent text-lg outline-none placeholder:text-muted" />
      </label>
      <div className="mt-6">
        {failed ? <p className="text-muted">Search couldn&apos;t load. Check your connection and try again.</p> : !ready ? <p className="text-muted">Loading search...</p> : <Results hits={hits} q={q} cursor={-1} onPick={(h) => router.push(h.url)} />}
        {!q.trim() && ready && (
          <div className="flex flex-wrap gap-2">
            {POPULAR.map((p) => (
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
