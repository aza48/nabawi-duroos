"use client";

/**
 * The interactive parts of the company guide. Each island receives only its own slice of the
 * content as props, so the 28 KB of guide copy stays in the server-rendered HTML and never
 * ships as JavaScript.
 */

import { useEffect, useMemo, useState } from "react";
import { Check, ChevronDown, CircleCheck, RotateCcw } from "lucide-react";
import type { Cost, Path, Phase, Situation } from "./content";
import { Card, Tip, sar } from "./ui";

/** A set of ticked ids remembered in this browser. */
function useTicks(key: string) {
  const [ticks, setTicks] = useState<string[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setTicks(JSON.parse(raw));
    } catch {}
  }, [key]);
  const toggle = (id: string) =>
    setTicks((t) => {
      const next = t.includes(id) ? t.filter((x) => x !== id) : [...t, id];
      try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
      return next;
    });
  const reset = () => {
    setTicks([]);
    try { localStorage.removeItem(key); } catch {}
  };
  return { ticks, toggle, reset };
}

export function Checklist({ storageKey, items }: { storageKey: string; items: { id: string; title: string; body: string }[] }) {
  const { ticks, toggle, reset } = useTicks(storageKey);
  const done = items.filter((i) => ticks.includes(i.id)).length;
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-bg-2">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(done / items.length) * 100}%` }} />
        </div>
        <span className="text-sm tabular-nums text-muted">{done} of {items.length}</span>
        {done > 0 && <button onClick={reset} className="flex items-center gap-1 text-xs text-muted hover:text-ink"><RotateCcw size={13} /> Reset</button>}
      </div>
      <ul className="space-y-2">
        {items.map((i) => {
          const on = ticks.includes(i.id);
          return (
            <li key={i.id}>
              <button onClick={() => toggle(i.id)} aria-pressed={on}
                className={`flex w-full gap-3 rounded-2xl border p-4 text-start transition ${on ? "border-on/40 bg-on-bg" : "border-line bg-card hover:border-primary/50"}`}>
                <span className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border-2 ${on ? "border-on bg-on text-white" : "border-line"}`}>{on && <Check size={14} strokeWidth={3} />}</span>
                <span>
                  <span className={`block font-semibold ${on ? "line-through opacity-70" : ""}`}>{i.title}</span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-muted">{i.body}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function SituationTabs({ situations }: { situations: Situation[] }) {
  const [pick, setPick] = useState(situations[0].id);
  const s = situations.find((x) => x.id === pick)!;
  return (
    <>
      <div role="tablist" aria-label="Your situation" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {situations.map((x) => (
          <button key={x.id} role="tab" aria-selected={pick === x.id} onClick={() => setPick(x.id)}
            className={`rounded-2xl border p-3.5 text-start text-sm font-semibold leading-snug transition ${pick === x.id ? "border-primary bg-primary text-primary-ink shadow-md" : "border-line bg-card hover:border-primary/50"}`}>
            {x.label}
          </button>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <Card title="First">{s.first}</Card>
        <Card title="Your residency">{s.residency}</Card>
      </div>
      {s.warn && <Tip tone="warn">{s.warn}</Tip>}
    </>
  );
}

type Answer = { home?: boolean; what?: "services" | "goods" | "making" | "profession" | "property" };

export function TypeFinder({ paths }: { paths: Path[] }) {
  const [a, setA] = useState<Answer>({});
  const result = useMemo(() => {
    if (a.what == null || a.home == null) return null;
    if (a.what === "goods") return "trading";
    if (a.what === "making") return "industrial";
    if (a.what === "profession") return "professional";
    if (a.what === "property") return "property";
    return a.home ? "service" : "startup";
  }, [a]);
  const p = paths.find((l) => l.id === result);
  const opt = (on: boolean) => `rounded-full border px-4 py-2 text-sm font-semibold transition ${on ? "border-primary bg-primary text-primary-ink" : "border-line bg-card hover:border-primary/50"}`;
  return (
    <div className="space-y-5 rounded-3xl border border-line bg-card p-5 md:p-6">
      <div>
        <p className="font-semibold">Do you already own a registered company in your home country?</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button className={opt(a.home === true)} onClick={() => setA({ ...a, home: true })}>Yes</button>
          <button className={opt(a.home === false)} onClick={() => setA({ ...a, home: false })}>No</button>
        </div>
      </div>
      <div>
        <p className="font-semibold">What will the Saudi company mostly do?</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {([
            ["services", "Services or online work"],
            ["goods", "Sell physical products"],
            ["making", "Make products"],
            ["profession", "A licensed profession"],
            ["property", "Property"],
          ] as const).map(([k, label]) => (
            <button key={k} className={opt(a.what === k)} onClick={() => setA({ ...a, what: k })}>{label}</button>
          ))}
        </div>
      </div>
      {p ? (
        <div className="rounded-2xl bg-brand p-5 text-white" aria-live="polite">
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-pale">Best fit</p>
          <p className="mt-1 font-heading text-3xl font-bold">{p.name}</p>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <div><dt className="text-white/60">Good for</dt><dd className="mt-0.5">{p.bestFor}</dd></div>
            <div><dt className="text-white/60">Money in the company</dt><dd className="mt-0.5">{p.capital}</dd></div>
            <div className="sm:col-span-2"><dt className="text-white/60">You will need</dt><dd className="mt-0.5">{p.needs}</dd></div>
          </dl>
          {p.note && <p className="mt-4 rounded-xl bg-white/10 p-3 text-sm">{p.note}</p>}
          {a.home === false && p.id !== "startup" && (
            <p className="mt-3 rounded-xl bg-white/10 p-3 text-sm">With no company at home, you can register a simple one there first, ask MISA about the personal route, or approach a Saudi startup programme.</p>
          )}
        </div>
      ) : (
        <p className="text-sm text-muted">Answer both to see your best fit.</p>
      )}
    </div>
  );
}

export function PhaseAccordion({ phases }: { phases: Phase[] }) {
  const [open, setOpen] = useState(0);
  return (
    <ol className="space-y-3">
      {phases.map((ph, i) => {
        const on = open === i;
        return (
          <li key={ph.id} className={`overflow-hidden rounded-3xl border transition ${on ? "border-primary bg-card shadow-md" : "border-line bg-card"}`}>
            <button onClick={() => setOpen(on ? -1 : i)} aria-expanded={on} className="flex w-full items-center gap-4 p-4 text-start md:p-5">
              <span className={`grid size-11 shrink-0 place-items-center rounded-2xl font-heading text-lg font-bold ${on ? "bg-primary text-primary-ink" : "bg-primary-soft text-primary"}`}>{i + 1}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-heading text-xl font-bold">{ph.name}</span>
                <span className="text-sm text-muted">{ph.time}</span>
              </span>
              <ChevronDown size={20} className={`shrink-0 text-muted transition ${on ? "rotate-180" : ""}`} />
            </button>
            {on && (
              <div className="space-y-4 border-t border-line p-4 md:p-5">
                <ul className="space-y-2.5">
                  {ph.steps.map((s) => (
                    <li key={s} className="flex gap-3 text-sm leading-relaxed">
                      <CircleCheck size={17} className="mt-0.5 shrink-0 text-primary" /> {s}
                    </li>
                  ))}
                </ul>
                <Tip tone="warn">{ph.watch}</Tip>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

type Yearly = { iqama: number; levyMonthly: number; muqeem: number; dependantMonthly: number };

export function CostCalculator({ setupCosts, transferFees, yearly: Y }: { setupCosts: Cost[]; transferFees: { label: string; sar: number }[]; yearly: Yearly }) {
  const [transfer, setTransfer] = useState(0);
  const [family, setFamily] = useState(0);
  const [saudis, setSaudis] = useState(0);
  const setup = setupCosts.reduce((t, c) => t + c.sar, 0) + transferFees[transfer].sar;
  const saudiYear = saudis * 4000 * 12 * 1.12;
  const yearly = Y.iqama + Y.levyMonthly * 12 + Y.muqeem + family * Y.dependantMonthly * 12;
  return (
    <>
      <div className="rounded-3xl border border-line bg-card p-5 md:p-6">
        <p className="font-heading text-xl font-bold">Setting up</p>
        <label className="mt-4 block text-sm">
          <span className="font-semibold">Your iqama</span>
          <select value={transfer} onChange={(e) => setTransfer(Number(e.target.value))} className="mt-1.5 w-full rounded-xl border border-line bg-bg px-3 py-2.5 text-base text-ink">
            {transferFees.map((t, i) => <option key={t.label} value={i}>{t.label}{t.sar ? ` (${sar(t.sar)})` : ""}</option>)}
          </select>
        </label>
        <ul className="mt-4 divide-y divide-line text-sm">
          {setupCosts.map((c) => (
            <li key={c.id} className="flex items-start justify-between gap-3 py-2.5">
              <span>{c.label}{c.note && <span className="block text-xs text-muted">{c.note}</span>}</span>
              <span className="shrink-0 tabular-nums font-medium">≈ {sar(c.sar)}</span>
            </li>
          ))}
          {transferFees[transfer].sar > 0 && (
            <li className="flex justify-between gap-3 py-2.5"><span>Iqama transfer</span><span className="tabular-nums font-medium">{sar(transferFees[transfer].sar)}</span></li>
          )}
          <li className="flex justify-between gap-3 py-2.5 text-muted"><span>Chamber of Commerce</span><span>Free for 3 years</span></li>
        </ul>
        <div className="mt-4 rounded-2xl bg-brand p-4 text-white">
          <p className="text-sm text-white/70">Roughly, to set up</p>
          <p className="font-heading text-3xl font-bold tabular-nums">{sar(setup)}</p>
          <p className="mt-1 text-xs text-white/70">Agencies typically charge several times this for the same steps.</p>
        </div>
      </div>

      <div className="rounded-3xl border border-line bg-card p-5 md:p-6">
        <p className="font-heading text-xl font-bold">Every year</p>
        <p className="mt-1 text-sm text-muted">The costs people forget to plan for.</p>
        {([
          ["Family members on your iqama", family, setFamily, 12],
          ["Saudi employees", saudis, setSaudis, 10],
        ] as const).map(([label, val, set, max]) => (
          <div key={label} className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-line px-3 py-2.5 text-sm">
            <span className="font-semibold">{label}</span>
            <span className="flex items-center gap-2">
              <button onClick={() => set((n) => Math.max(0, n - 1))} aria-label={`Fewer ${label}`} className="grid size-9 place-items-center rounded-full border border-line text-lg">−</button>
              <span className="w-6 text-center text-base font-semibold tabular-nums">{val}</span>
              <button onClick={() => set((n) => Math.min(max, n + 1))} aria-label={`More ${label}`} className="grid size-9 place-items-center rounded-full border border-line text-lg">+</button>
            </span>
          </div>
        ))}
        <ul className="mt-3 divide-y divide-line text-sm">
          <li className="flex justify-between gap-3 py-2.5"><span>Your iqama renewal</span><span className="tabular-nums font-medium">{sar(Y.iqama)}</span></li>
          <li className="flex justify-between gap-3 py-2.5"><span>Work permit levy<span className="block text-xs text-muted">About 800 SAR a month per foreign worker, usually including you</span></span><span className="shrink-0 tabular-nums font-medium">{sar(Y.levyMonthly * 12)}</span></li>
          <li className="flex justify-between gap-3 py-2.5"><span>Muqeem subscription</span><span className="tabular-nums font-medium">≈ {sar(Y.muqeem)}</span></li>
          {family > 0 && <li className="flex justify-between gap-3 py-2.5"><span>Family fee<span className="block text-xs text-muted">400 SAR a month each</span></span><span className="shrink-0 tabular-nums font-medium">{sar(family * Y.dependantMonthly * 12)}</span></li>}
          {saudis > 0 && <li className="flex justify-between gap-3 py-2.5"><span>Saudi staff<span className="block text-xs text-muted">At 4,000 SAR a month each, plus about 12% GOSI</span></span><span className="shrink-0 tabular-nums font-medium">≈ {sar(Math.round(saudiYear))}</span></li>}
          <li className="flex justify-between gap-3 py-2.5 text-muted"><span>Accountant, health insurance</span><span>Get quotes</span></li>
        </ul>
        <div className="mt-4 rounded-2xl bg-gold-bg p-4">
          <p className="text-sm text-muted">Roughly each year</p>
          <p className="font-heading text-3xl font-bold tabular-nums">{sar(Math.round(yearly + saudiYear))}</p>
        </div>
      </div>
    </>
  );
}

type PlanPhase = { phase: string; items: { id: string; title: string; body: string }[] };

export function PlanChecklist({ plan }: { plan: PlanPhase[] }) {
  const all = plan.flatMap((p) => p.items);
  const { ticks, toggle, reset } = useTicks("mesh-company-checklist");
  const done = all.filter((i) => ticks.includes(i.id)).length;
  return (
    <>
      <div className="sticky top-16 z-10 -mx-1 rounded-2xl border border-line bg-card/95 p-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-bg-2">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(done / all.length) * 100}%` }} />
          </div>
          <span className="text-sm font-semibold tabular-nums">{done}/{all.length}</span>
          {done > 0 && <button onClick={reset} aria-label="Reset checklist" className="text-muted hover:text-ink"><RotateCcw size={15} /></button>}
        </div>
        {done === all.length && <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-on"><CircleCheck size={16} /> Mabrook. Your company is open.</p>}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {plan.map((p) => (
          <div key={p.phase}>
            <h3 className="mb-2 font-heading text-lg font-bold">{p.phase}</h3>
            <ul className="space-y-2">
              {p.items.map((i) => {
                const on = ticks.includes(i.id);
                return (
                  <li key={i.id}>
                    <button onClick={() => toggle(i.id)} aria-pressed={on}
                      className={`flex w-full gap-3 rounded-2xl border p-3.5 text-start transition ${on ? "border-on/40 bg-on-bg" : "border-line bg-card hover:border-primary/50"}`}>
                      <span className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border-2 ${on ? "border-on bg-on text-white" : "border-line"}`}>{on && <Check size={14} strokeWidth={3} />}</span>
                      <span>
                        <span className={`block text-sm font-semibold ${on ? "line-through opacity-70" : ""}`}>{i.title}</span>
                        <span className="mt-0.5 block text-xs text-muted">{i.body}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
