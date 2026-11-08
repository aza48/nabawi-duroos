import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/server/auth/session";
import { getDb } from "@/server/db/client";
import { analyticsReport, type Count, type Report } from "@/server/analytics/report";
import { AutoRefresh } from "@/features/admin/analytics/AutoRefresh";

export const metadata: Metadata = { title: "Analytics" };
export const dynamic = "force-dynamic";

const RANGES = [1, 7, 30, 90, 365];

const dur = (sec: number) => {
  const s = Math.round(sec);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ${s % 60}s`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
};
const pct = (x: number) => `${Math.round(x * 100)}%`;
const fmt = (n: number) => n.toLocaleString("en-GB");
const riyadh = (iso: string, opts: Intl.DateTimeFormatOptions) => new Date(iso).toLocaleString("en-GB", { timeZone: "Asia/Riyadh", ...opts });
const flag = (cc: string | null) => (cc && /^[A-Z]{2}$/.test(cc) ? String.fromCodePoint(...[...cc].map((c) => 0x1f1a5 + c.charCodeAt(0))) : "");

/** Core Web Vitals thresholds (good, needs improvement) in ms, CLS unitless. */
const VITAL: Record<string, { name: string; good: number; poor: number; unit: "ms" | "" }> = {
  LCP: { name: "Main content shown (LCP)", good: 2500, poor: 4000, unit: "ms" },
  INP: { name: "Response to taps (INP)", good: 200, poor: 500, unit: "ms" },
  CLS: { name: "Layout jumping (CLS)", good: 0.1, poor: 0.25, unit: "" },
  FCP: { name: "First paint (FCP)", good: 1800, poor: 3000, unit: "ms" },
  TTFB: { name: "Server reply (TTFB)", good: 800, poor: 1800, unit: "ms" },
};

const SECTIONS = [
  ["overview", "Overview"],
  ["arrivals", "How they arrive"],
  ["searches", "Searches"],
  ["pages", "Pages and clicks"],
  ["audience", "Where and who"],
  ["devices", "Devices"],
  ["speed", "Speed and errors"],
  ["history", "History"],
  ["visits", "Visits"],
] as const;

export default async function Page({ searchParams }: { searchParams: Promise<{ d?: string }> }) {
  await requireAdmin("analytics.view");
  const d = Number((await searchParams).d);
  const days = RANGES.includes(d) ? d : 7;
  let r: Report | null = null;
  let error: string | null = null;
  try {
    r = await analyticsReport(await getDb(), days);
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  }

  return (
    <div className="space-y-6">
      <AutoRefresh seconds={60} />
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Visitors</h1>
          <p className="text-sm text-muted">Everyone who visits the public site. Owner only. Madinah time. Refreshes every minute.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex gap-1 rounded-full border border-line bg-card p-1 text-sm">
            {RANGES.map((n) => (
              <Link key={n} href={`/admin/analytics?d=${n}`} className={`rounded-full px-3 py-1 ${n === days ? "bg-primary font-semibold text-primary-ink" : "text-muted"}`}>
                {n === 1 ? "24 h" : n === 365 ? "1 year" : `${n} days`}
              </Link>
            ))}
          </div>
          <a href={`/admin/analytics/export?d=${days}&what=visits`} className="rounded-full border border-line bg-card px-3 py-1.5 text-sm font-semibold">Visits CSV</a>
          <a href={`/admin/analytics/export?d=${days}&what=events`} className="rounded-full border border-line bg-card px-3 py-1.5 text-sm font-semibold">Events CSV</a>
        </div>
      </div>

      <nav aria-label="Sections" className="sticky top-14 z-20 -mx-4 overflow-x-auto border-b border-line bg-bg/90 px-4 py-2 backdrop-blur">
        <ul className="flex gap-1 text-sm whitespace-nowrap">
          {SECTIONS.map(([id, label]) => (
            <li key={id}><a href={`#${id}`} className="rounded-full px-3 py-1.5 text-muted hover:bg-card hover:text-ink">{label}</a></li>
          ))}
        </ul>
      </nav>

      {error || !r ? (
        <p className="card p-4 text-sm">Analytics couldn&apos;t load: {error}</p>
      ) : (
        <Body r={r} />
      )}
    </div>
  );
}

function Body({ r }: { r: Report }) {
  const returning = Math.max(0, r.visitors - r.newVisitors);
  return (
    <>
      <Section id="overview" title="Overview">
        <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
          <section className="card p-4">
            <div className="flex items-center gap-2">
              <span className="relative flex size-3">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-60" />
                <span className="relative inline-flex size-3 rounded-full bg-green-500" />
              </span>
              <h3 className="text-lg font-semibold">{r.liveNow} on the site right now</h3>
            </div>
            {r.live.length > 0 && (
              <ul className="mt-3 divide-y divide-line text-sm">
                {r.live.map((v, i) => (
                  <li key={i} className="flex flex-wrap justify-between gap-2 py-1.5">
                    <span className="font-medium">{v.path}</span>
                    <span className="text-muted">{flag(v.country)} {v.city ?? v.country ?? "?"} · {v.device ?? "?"} · {v.pageviews} pages · {dur(v.seconds)}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Visitors" value={fmt(r.visitors)} note={`${fmt(r.newVisitors)} new, ${fmt(returning)} returning`} />
            <Stat label="Visits" value={fmt(r.sessions)} note={`${r.pagesPerSession.toFixed(1)} pages per visit`} />
            <Stat label="Page views" value={fmt(r.pageviews)} note={`${fmt(r.clicks)} clicks`} />
            <Stat label="Searches" value={fmt(r.searchCount)} note={`${fmt(r.searchesNoResults.reduce((a, b) => a + b.n, 0))} found nothing`} />
            <Stat label="Avg visit length" value={dur(r.avgSessionSec)} note={`${dur(r.avgPageSec)} per page`} />
            <Stat label="Left after one page" value={pct(r.bounceRate)} note="Bounce rate" />
            <Stat label="Busiest day" value={r.peakDay ? fmt(r.peakDay.visitors) : "0"} note={r.peakDay ? riyadh(`${r.peakDay.day}T12:00:00Z`, { weekday: "short", day: "numeric", month: "short" }) : "No data yet"} />
            <Stat label="Script errors" value={fmt(r.errors.reduce((a, b) => a + b.n, 0))} note={`${r.errors.length} different`} />
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Panel title="Visitors per day">
            <Bars rows={r.daily.map((x) => ({ key: riyadh(`${x.day}T12:00:00Z`, { day: "numeric", month: "short" }), n: x.visitors, extra: x.pageviews }))} extraLabel="views" vertical />
          </Panel>
          <Panel title="Busiest hours (Madinah time)">
            <Bars rows={r.hours.map((h) => ({ key: `${String(h.hour).padStart(2, "0")}`, n: h.n }))} vertical />
          </Panel>
        </div>
      </Section>

      <Section id="arrivals" title="How they arrive">
        <Grid>
          <Panel title="Kind of source"><Bars rows={r.sources} /></Panel>
          <Panel title="Sites and apps that sent them"><Bars rows={r.referrers} /></Panel>
          <Panel title="First page of a visit"><Bars rows={r.entries} /></Panel>
          <Panel title="Exact pages that linked here"><Bars rows={r.referrerUrls} /></Panel>
          <Panel title="Campaign links and ad clicks"><Bars rows={r.campaignsFull} /></Panel>
          <Panel title="Landing links with extra tags"><Bars rows={r.landingQueries} /></Panel>
        </Grid>
      </Section>

      <Section id="searches" title="What they search for">
        <Grid>
          <Panel title="Top searches" wide>
            {r.searches.length === 0 ? <Empty /> : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-left text-xs text-muted">
                    <tr><th className="py-1 pr-2">Search</th><th className="px-2 text-right">Times</th><th className="px-2 text-right">Avg results</th><th className="pl-2 text-right">Found nothing</th></tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {r.searches.map((s) => (
                      <tr key={s.query}>
                        <td className="max-w-72 truncate py-1.5 pr-2" dir="auto">{s.query}</td>
                        <td className="px-2 text-right tabular-nums">{fmt(s.n)}</td>
                        <td className="px-2 text-right tabular-nums">{s.avgResults.toFixed(1)}</td>
                        <td className={`pl-2 text-right tabular-nums ${s.zero > 0 ? "font-semibold text-red-600" : ""}`}>{fmt(s.zero)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Panel>
          <Panel title="Searches that found nothing (content to add)"><Bars rows={r.searchesNoResults} /></Panel>
          <Panel title="Latest searches">
            {r.recentSearches.length === 0 ? <Empty /> : (
              <ul className="divide-y divide-line text-sm">
                {r.recentSearches.map((s, i) => (
                  <li key={i} className="flex justify-between gap-3 py-1.5">
                    <span className="min-w-0 truncate" dir="auto"><b>{s.query}</b> <span className="text-xs text-muted">{s.path}</span></span>
                    <span className="shrink-0 tabular-nums text-xs text-muted">{s.results} results · {riyadh(s.ts, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</span>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </Grid>
      </Section>

      <Section id="pages" title="Pages and clicks">
        <Panel title="Pages">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-muted">
                <tr><th className="py-1 pr-2">Page</th><th className="px-2 text-right">Views</th><th className="px-2 text-right">Visitors</th><th className="px-2 text-right">Avg time</th><th className="pl-2 text-right">Scrolled</th></tr>
              </thead>
              <tbody className="divide-y divide-line">
                {r.pages.map((p) => (
                  <tr key={p.path}>
                    <td className="max-w-96 truncate py-1.5 pr-2"><a href={p.path} target="_blank" rel="noopener noreferrer" className="hover:underline">{p.path}</a></td>
                    <td className="px-2 text-right tabular-nums">{fmt(p.views)}</td>
                    <td className="px-2 text-right tabular-nums">{fmt(p.visitors)}</td>
                    <td className="px-2 text-right tabular-nums">{dur(p.avgSec)}</td>
                    <td className="pl-2 text-right tabular-nums">{Math.round(p.scroll)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {r.pages.length === 0 && <Empty />}
          </div>
        </Panel>
        <Grid>
          <Panel title="What people click" wide>
            <ul className="divide-y divide-line text-sm">
              {r.clicksTop.map((c, i) => (
                <li key={i} className="flex justify-between gap-3 py-1.5">
                  <span className="min-w-0"><b className="block truncate" dir="auto">{c.label}</b><span className="block truncate text-xs text-muted">{c.target}</span></span>
                  <span className="tabular-nums">{fmt(c.n)}</span>
                </li>
              ))}
            </ul>
            {r.clicksTop.length === 0 && <Empty />}
          </Panel>
          <Panel title="Links out of MESH"><Bars rows={r.outbound} /></Panel>
          <Panel title="Last page of a visit"><Bars rows={r.exits} /></Panel>
        </Grid>
      </Section>

      <Section id="audience" title="Where and who">
        <Grid>
          <Panel title="Countries"><Bars rows={r.countries.map((c) => ({ ...c, key: `${flag(c.key)} ${c.key}` }))} /></Panel>
          <Panel title="Regions"><Bars rows={r.regions} /></Panel>
          <Panel title="Cities"><Bars rows={r.cities} /></Panel>
          <Panel title="Places on the map">
            {r.places.length === 0 ? <Empty /> : (
              <ul className="space-y-1 text-sm">
                {r.places.map((p) => (
                  <li key={p.key} className="flex justify-between gap-2">
                    <a href={`https://www.google.com/maps?q=${p.lat},${p.lon}`} target="_blank" rel="noopener noreferrer" className="truncate hover:underline">{p.key}</a>
                    <span className="tabular-nums">{fmt(p.n)}</span>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
          <Panel title="Continents"><Bars rows={r.continents} /></Panel>
          <Panel title="Time zones"><Bars rows={r.timezones} /></Panel>
          <Panel title="Phone language"><Bars rows={r.languages} /></Panel>
          <Panel title="All languages set on the phone"><Bars rows={r.phoneLanguages} /></Panel>
          <Panel title="Site language"><Bars rows={r.locales.map((l) => ({ ...l, key: l.key === "ar" ? "Arabic" : l.key === "en" ? "English" : l.key }))} /></Panel>
          <Panel title="Which visit this is"><Bars rows={r.visitNumbers} /></Panel>
          <Panel title="How long since their first visit"><Bars rows={r.tenure} /></Panel>
        </Grid>
      </Section>

      <Section id="devices" title="Devices">
        <Grid>
          <Panel title="Devices"><Bars rows={r.devices} /></Panel>
          <Panel title="Phone models"><Bars rows={r.deviceModels} /></Panel>
          <Panel title="Systems and versions"><Bars rows={r.osVersions} /></Panel>
          <Panel title="Browsers and versions"><Bars rows={r.browserVersions} /></Panel>
          <Panel title="Screen sizes"><Bars rows={r.screens} /></Panel>
          <Panel title="Connection"><Bars rows={r.connections} /></Panel>
          <Panel title="Light or dark"><Bars rows={r.themes} /></Panel>
          <Panel title="Installed as an app"><Bars rows={r.installed} /></Panel>
        </Grid>
      </Section>

      <Section id="speed" title="Speed and errors">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {Object.entries(VITAL).map(([k, v]) => {
            const m = r.vitals.find((x) => x.metric === k);
            const val = m?.p75 ?? null;
            const tone = val == null ? "text-muted" : val <= v.good ? "text-green-700" : val <= v.poor ? "text-amber-600" : "text-red-600";
            return (
              <div key={k} className="card p-3.5">
                <p className="text-xs text-muted">{v.name}</p>
                <p className={`mt-1 text-2xl font-semibold tabular-nums ${tone}`}>{val == null ? "None yet" : v.unit === "ms" ? `${(val / 1000).toFixed(2)} s` : val.toFixed(3)}</p>
                <p className="mt-0.5 text-xs text-muted">75% of visits are this fast or faster · {fmt(m?.samples ?? 0)} samples</p>
              </div>
            );
          })}
        </div>
        <Grid>
          <Panel title="Slowest pages (main content, 75th percentile)">
            {r.slowPages.length === 0 ? <Empty /> : (
              <ul className="divide-y divide-line text-sm">
                {r.slowPages.map((p) => (
                  <li key={p.path} className="flex justify-between gap-3 py-1.5">
                    <span className="min-w-0 truncate">{p.path}</span>
                    <span className={`tabular-nums ${p.lcp > 4000 ? "text-red-600" : p.lcp > 2500 ? "text-amber-600" : ""}`}>{(p.lcp / 1000).toFixed(2)} s · {p.samples}</span>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
          <Panel title="Script errors visitors hit" wide>
            {r.errors.length === 0 ? <p className="text-sm text-muted">No errors reported. Good.</p> : (
              <ul className="divide-y divide-line text-sm">
                {r.errors.map((e, i) => (
                  <li key={i} className="py-1.5">
                    <div className="flex justify-between gap-3"><b className="min-w-0 break-words">{e.message}</b><span className="shrink-0 tabular-nums">{fmt(e.n)}</span></div>
                    <p className="truncate text-xs text-muted">{e.source ?? "unknown source"} · last {riyadh(e.last, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</p>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </Grid>
      </Section>

      <Section id="history" title="History">
        <Panel title="Visitors per month, since the start (kept for ever)">
          <Bars rows={r.monthly.map((m) => ({ key: m.month, n: m.visitors, extra: m.pageviews }))} extraLabel="views" vertical />
          <p className="mt-2 text-xs text-muted">Built every night from the raw visits, which are kept for a year. A full copy of the database is saved every night for 90 days, and on the first of each month for 400 days.</p>
        </Panel>
      </Section>

      <Section id="visits" title="Recent visits, step by step">
        <ul className="space-y-2">
          {r.journeys.map((j) => (
            <li key={j.id}>
              <details className="card p-3">
                <summary className="flex cursor-pointer flex-wrap justify-between gap-2 text-sm">
                  <span className="font-medium">{riyadh(j.started, { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })} · {flag(j.country)} {j.city ?? j.country ?? "?"}</span>
                  <span className="text-muted">{j.visit ? `Visit ${j.visit}` : j.isNew ? "New" : "Returning"} · {j.model ?? j.device} · {j.referrer ?? j.source ?? "Direct"} · {j.pageviews} pages · {j.clicks} clicks · {dur(j.seconds)}</span>
                </summary>
                <ol className="mt-2 space-y-1 border-l border-line pl-3 text-sm">
                  {j.steps.map((s, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="shrink-0 tabular-nums text-xs text-muted">{riyadh(s.ts, { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</span>
                      {s.type === "pageview" ? (
                        <span>Opened <b>{s.path}</b>{s.ms ? <span className="text-muted"> for {dur(s.ms / 1000)}</span> : null}</span>
                      ) : s.type === "search" ? (
                        <span>Searched <b dir="auto">{s.label}</b> <span className="text-muted">({s.value ?? 0} results)</span></span>
                      ) : s.type === "error" ? (
                        <span className="text-red-600">Script error: {s.label}</span>
                      ) : (
                        <span>Clicked <b dir="auto">{s.label}</b> <span className="text-muted">to {s.target}</span></span>
                      )}
                    </li>
                  ))}
                </ol>
              </details>
            </li>
          ))}
        </ul>
        {r.journeys.length === 0 && <Empty />}
      </Section>
    </>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{children}</div>;
}

function Stat({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="card p-3.5">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
      <p className="mt-0.5 text-xs text-muted">{note}</p>
    </div>
  );
}

function Panel({ title, wide = false, children }: { title: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <section className={`card p-4 ${wide ? "md:col-span-2" : ""}`}>
      <h3 className="mb-3 text-base font-semibold">{title}</h3>
      {children}
    </section>
  );
}

function Empty() {
  return <p className="text-sm text-muted">Nothing yet. Data appears as people visit.</p>;
}

function Bars({ rows, vertical = false, extraLabel }: { rows: Count[]; vertical?: boolean; extraLabel?: string }) {
  if (rows.length === 0 || rows.every((r) => r.n === 0)) return <Empty />;
  const max = Math.max(...rows.map((r) => r.n), 1);
  if (vertical)
    return (
      <div className="flex h-36 items-end gap-0.5">
        {rows.map((r) => (
          <div key={r.key} className="group flex h-full min-w-0 flex-1 flex-col items-center justify-end" title={`${r.key}: ${r.n}${extraLabel && r.extra != null ? `, ${r.extra} ${extraLabel}` : ""}`}>
            <span className="text-[10px] tabular-nums text-muted opacity-0 group-hover:opacity-100">{r.n}</span>
            <div className="w-full rounded-t bg-primary" style={{ height: `${Math.max(2, (r.n / max) * 100)}%` }} />
            <span className="mt-1 truncate text-[10px] text-muted">{r.key}</span>
          </div>
        ))}
      </div>
    );
  return (
    <ul className="space-y-1.5 text-sm">
      {rows.map((r) => (
        <li key={r.key} className="relative overflow-hidden rounded-md">
          <div className="absolute inset-y-0 left-0 bg-primary-soft" style={{ width: `${(r.n / max) * 100}%` }} />
          <div className="relative flex justify-between gap-2 px-2 py-1">
            <span className="truncate" dir="auto">{r.key}</span>
            <span className="tabular-nums">{fmt(r.n)}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
