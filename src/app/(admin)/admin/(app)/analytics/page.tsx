import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/server/auth/session";
import { getDb } from "@/server/db/client";
import { analyticsReport, type Count, type Report } from "@/server/analytics/report";
import { AutoRefresh } from "@/features/admin/analytics/AutoRefresh";

export const metadata: Metadata = { title: "Analytics" };
export const dynamic = "force-dynamic";

const RANGES = [1, 7, 30, 90];

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

export default async function Page({ searchParams }: { searchParams: Promise<{ d?: string }> }) {
  await requireAdmin();
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
    <div className="mx-auto max-w-4xl space-y-6">
      <AutoRefresh seconds={30} />
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Analytics</h1>
          <p className="text-sm text-muted">Anonymous visitors to the public site. Times are Madinah time. Refreshes every 30 seconds.</p>
        </div>
        <div className="flex gap-1 rounded-full border border-line bg-card p-1 text-sm">
          {RANGES.map((n) => (
            <Link key={n} href={`/admin/analytics?d=${n}`} className={`rounded-full px-3 py-1 ${n === days ? "bg-primary font-semibold text-primary-ink" : "text-muted"}`}>
              {n === 1 ? "24 h" : `${n} days`}
            </Link>
          ))}
        </div>
      </div>

      {error || !r ? (
        <p className="card p-4 text-sm">Analytics couldn&apos;t load: {error}</p>
      ) : (
        <>
          <section className="card p-4">
            <div className="flex items-center gap-2">
              <span className="relative flex size-3">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-60" />
                <span className="relative inline-flex size-3 rounded-full bg-green-500" />
              </span>
              <h2 className="text-lg font-semibold">{r.liveNow} on the site right now</h2>
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

          <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Visitors" value={fmt(r.visitors)} note={`${fmt(r.newVisitors)} new, ${fmt(Math.max(0, r.visitors - r.newVisitors))} returning`} />
            <Stat label="Visits" value={fmt(r.sessions)} note={`${r.pagesPerSession.toFixed(1)} pages per visit`} />
            <Stat label="Page views" value={fmt(r.pageviews)} note={`${fmt(r.clicks)} clicks`} />
            <Stat label="Avg visit length" value={dur(r.avgSessionSec)} note={`${dur(r.avgPageSec)} per page`} />
            <Stat label="Left after one page" value={pct(r.bounceRate)} note="Bounce rate" />
            <Stat label="Busiest day" value={r.peakDay ? fmt(r.peakDay.visitors) : "0"} note={r.peakDay ? riyadh(`${r.peakDay.day}T12:00:00Z`, { weekday: "short", day: "numeric", month: "short" }) : "No data yet"} />
          </section>

          <Panel title="Visitors per day">
            <Bars rows={r.daily.map((x) => ({ key: riyadh(`${x.day}T12:00:00Z`, { day: "numeric", month: "short" }), n: x.visitors, extra: x.pageviews }))} extraLabel="views" vertical />
          </Panel>

          <Panel title="Busiest hours (Madinah time)">
            <Bars rows={r.hours.map((h) => ({ key: `${String(h.hour).padStart(2, "0")}`, n: h.n }))} vertical />
          </Panel>

          <Panel title="Pages">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-xs text-muted">
                  <tr><th className="py-1 pr-2">Page</th><th className="px-2 text-right">Views</th><th className="px-2 text-right">Visitors</th><th className="px-2 text-right">Avg time</th><th className="pl-2 text-right">Scrolled</th></tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {r.pages.map((p) => (
                    <tr key={p.path}>
                      <td className="max-w-64 truncate py-1.5 pr-2"><a href={p.path} target="_blank" rel="noopener noreferrer" className="hover:underline">{p.path}</a></td>
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

          <Panel title="What people click">
            <ul className="divide-y divide-line text-sm">
              {r.clicksTop.map((c, i) => (
                <li key={i} className="flex justify-between gap-3 py-1.5">
                  <span className="min-w-0"><b className="block truncate">{c.label}</b><span className="block truncate text-xs text-muted">{c.target}</span></span>
                  <span className="tabular-nums">{fmt(c.n)}</span>
                </li>
              ))}
            </ul>
            {r.clicksTop.length === 0 && <Empty />}
          </Panel>

          <div className="grid gap-6 md:grid-cols-2">
            <Panel title="Where they come from"><Bars rows={r.referrers} /></Panel>
            <Panel title="Links out of MESH"><Bars rows={r.outbound} /></Panel>
            <Panel title="First page of a visit"><Bars rows={r.entries} /></Panel>
            <Panel title="Last page of a visit"><Bars rows={r.exits} /></Panel>
            <Panel title="Countries"><Bars rows={r.countries.map((c) => ({ ...c, key: `${flag(c.key)} ${c.key}` }))} /></Panel>
            <Panel title="Cities"><Bars rows={r.cities} /></Panel>
            <Panel title="Devices"><Bars rows={r.devices} /></Panel>
            <Panel title="Browsers"><Bars rows={r.browsers} /></Panel>
            <Panel title="Systems"><Bars rows={r.oses} /></Panel>
            <Panel title="Phone language"><Bars rows={r.languages} /></Panel>
            <Panel title="Site language"><Bars rows={r.locales.map((l) => ({ ...l, key: l.key === "ar" ? "Arabic" : l.key === "en" ? "English" : l.key }))} /></Panel>
            <Panel title="Campaign links (?utm_source=)"><Bars rows={r.campaigns} /></Panel>
          </div>

          <Panel title="Recent visits, step by step">
            <ul className="space-y-2">
              {r.journeys.map((j) => (
                <li key={j.id}>
                  <details className="rounded-xl border border-line p-3">
                    <summary className="flex cursor-pointer flex-wrap justify-between gap-2 text-sm">
                      <span className="font-medium">{riyadh(j.started, { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })} · {flag(j.country)} {j.city ?? j.country ?? "?"}</span>
                      <span className="text-muted">{j.isNew ? "New" : "Returning"} · {j.device} · {j.referrer ?? "Direct"} · {j.pageviews} pages · {j.clicks} clicks · {dur(j.seconds)}</span>
                    </summary>
                    <ol className="mt-2 space-y-1 border-l border-line pl-3 text-sm">
                      {j.steps.map((s, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="shrink-0 tabular-nums text-xs text-muted">{riyadh(s.ts, { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</span>
                          {s.type === "pageview" ? (
                            <span>Opened <b>{s.path}</b>{s.ms ? <span className="text-muted"> for {dur(s.ms / 1000)}</span> : null}</span>
                          ) : (
                            <span>Clicked <b>{s.label}</b> <span className="text-muted">→ {s.target}</span></span>
                          )}
                        </li>
                      ))}
                    </ol>
                  </details>
                </li>
              ))}
            </ul>
            {r.journeys.length === 0 && <Empty />}
          </Panel>
        </>
      )}
    </div>
  );
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

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card p-4">
      <h2 className="mb-3 text-base font-semibold">{title}</h2>
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
            <span className="truncate">{r.key}</span>
            <span className="tabular-nums">{fmt(r.n)}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
