"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle, ArrowUpRight, BadgeCheck, Banknote, Calculator, CalendarClock, Check, ChevronDown, CircleCheck,
  Compass, FileText, Flag, Globe2, Landmark, Lightbulb, ListChecks, Newspaper, Receipt, RotateCcw, Rocket, Star, Users,
  UserCheck,
} from "lucide-react";
import {
  APOSTILLE, APOSTILLE_RULE, BANK_ASK, BANK_DOCS, BANKS, CHANGES_2025, CHECKED, DOCS_HOME, DOCS_KSA, FAMILY, FIT, GLOSSARY,
  GROW, HOME_TAX, LINKS, NITAQAT, NOT_FREELANCE, PATHS, PHASES, PITFALLS, PLAN, PREMIUM, RUNNING, SETUP_COSTS, SITUATIONS,
  TAX, TRANSFER_FEES, US_TAX, YEARLY,
} from "./content";

const SECTIONS = [
  { id: "fit", label: "Is it right for you?" },
  { id: "changes", label: "The 2025 rules" },
  { id: "situation", label: "Your situation" },
  { id: "type", label: "Type of company" },
  { id: "phases", label: "The four phases" },
  { id: "documents", label: "Documents" },
  { id: "cost", label: "What it costs" },
  { id: "nitaqat", label: "Saudization" },
  { id: "bank", label: "Your bank" },
  { id: "family", label: "Your family" },
  { id: "running", label: "Running it" },
  { id: "tax", label: "Saudi taxes" },
  { id: "home-tax", label: "Taxes back home" },
  { id: "premium", label: "Premium Residency" },
  { id: "pitfalls", label: "Pitfalls" },
  { id: "plan", label: "Your checklist" },
  { id: "glossary", label: "Words and links" },
];

const sar = (n: number) => `${n.toLocaleString("en-GB")} SAR`;

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

export function CompanyGuide({ footer }: { footer?: React.ReactNode }) {
  return (
    <div className="shell mt-8 grid gap-10 md:mt-10 lg:grid-cols-[220px_minmax(0,1fr)]">
      <nav aria-label="On this page" className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
        <p className="text-sm font-semibold text-muted">On this page</p>
        <ul className="mt-3 space-y-1 border-s border-line">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="-ms-px block border-s-2 border-transparent py-1.5 ps-4 text-sm text-muted transition hover:border-primary hover:text-ink">{s.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="min-w-0 max-w-3xl space-y-16">
        <nav aria-label="Sections" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:hidden">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="shrink-0 rounded-full border border-line bg-card px-3.5 py-2 text-sm font-medium text-muted">{s.label}</a>
          ))}
        </nav>

        <Intro />
        <Fit />
        <Changes />
        <Situation />
        <TypeFinder />
        <Phases />
        <Documents />
        <Costs />
        <Nitaqat />
        <Bank />
        <Family />
        <Running />
        <Taxes />
        <HomeTax />
        <Premium />
        <Pitfalls />
        <Plan />
        <Glossary />
        {footer}
      </div>
    </div>
  );
}

function H2({ id, icon: Icon, kicker, title, sub }: { id: string; icon: typeof Compass; kicker: string; title: string; sub?: string }) {
  return (
    <header id={id} className="scroll-mt-28">
      <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gold"><Icon size={16} /> {kicker}</p>
      <h2 className="mt-1 font-heading text-3xl font-bold leading-tight md:text-4xl">{title}</h2>
      {sub && <p className="mt-2 text-muted md:text-lg">{sub}</p>}
    </header>
  );
}

function Tip({ children, tone = "gold" }: { children: React.ReactNode; tone?: "gold" | "warn" }) {
  const warn = tone === "warn";
  return (
    <div className={`flex gap-3 rounded-2xl p-4 text-sm leading-relaxed ${warn ? "bg-cancel-bg" : "bg-gold-bg"}`}>
      {warn ? <AlertTriangle size={18} className="mt-0.5 shrink-0 text-cancel" /> : <Lightbulb size={18} className="mt-0.5 shrink-0 text-gold" />}
      <div>{children}</div>
    </div>
  );
}

function Card({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-card p-4">
      <p className="font-semibold">{title}</p>
      <div className="mt-1.5 text-sm leading-relaxed text-muted">{children}</div>
    </div>
  );
}

function Checklist({ storageKey, items }: { storageKey: string; items: { id: string; title: string; body: string }[] }) {
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

function Intro() {
  const setup = SETUP_COSTS.reduce((t, c) => t + c.sar, 0);
  return (
    <section className="space-y-5">
      <p className="text-lg leading-relaxed">
        Owning a small Saudi company is one of the few ways a Western resident can sponsor their own iqama, and their family&apos;s, without depending on an employer. The process is long but not mysterious: a set of government portals, used in the right order.
      </p>
      <p className="leading-relaxed text-muted">
        This guide follows that order, from the papers you prepare at home to the yearly tasks once you are trading. It is written for people who will do most of it themselves, and it explains every Saudi term in plain English.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { big: `≈ ${sar(Math.round(setup / 1000) * 1000)}`, small: "to set up, before any iqama transfer", icon: Banknote },
          { big: "2 to 3 months", small: "from paperwork at home to a working bank account", icon: CalendarClock },
          { big: "4 phases", small: "prepare, register, switch on, settle", icon: Compass },
        ].map(({ big, small, icon: Icon }) => (
          <div key={small} className="rounded-2xl border border-line bg-card p-4">
            <Icon size={18} className="text-primary" />
            <p className="mt-2 font-heading text-2xl font-bold">{big}</p>
            <p className="text-sm text-muted">{small}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Fit() {
  return (
    <section className="space-y-5">
      <H2 id="fit" icon={UserCheck} kicker="Start here" title="Is a company right for you?" sub="Tick what applies. Five ticks means you are ready to plan." />
      <Checklist storageKey="mesh-company-fit" items={FIT} />
      <Tip>{NOT_FREELANCE}</Tip>
    </section>
  );
}

function Changes() {
  return (
    <section className="space-y-5">
      <H2 id="changes" icon={Newspaper} kicker="Up to date" title="The 2025 rules" sub="The system changed in 2025. If a website, video or agency describes something different, it may be out of date." />
      <div className="grid gap-3 sm:grid-cols-2">
        {CHANGES_2025.map((c) => (
          <div key={c.title} className="rounded-2xl border border-primary/30 bg-primary-soft p-4">
            <p className="flex items-center gap-2 font-semibold"><CircleCheck size={17} className="text-primary" /> {c.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed">{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Situation() {
  const [pick, setPick] = useState(SITUATIONS[0].id);
  const s = SITUATIONS.find((x) => x.id === pick)!;
  return (
    <section className="space-y-5">
      <H2 id="situation" icon={Users} kicker="Your situation" title="Where are you today?" sub="Choose the closest. It changes how you get your iqama, not how you register." />
      <div role="tablist" aria-label="Your situation" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {SITUATIONS.map((x) => (
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
    </section>
  );
}

type Answer = { home?: boolean; what?: "services" | "goods" | "making" | "profession" | "property" };

function TypeFinder() {
  const [a, setA] = useState<Answer>({});
  const result = useMemo(() => {
    if (a.what == null || a.home == null) return null;
    if (a.what === "goods") return "trading";
    if (a.what === "making") return "industrial";
    if (a.what === "profession") return "professional";
    if (a.what === "property") return "property";
    return a.home ? "service" : "startup";
  }, [a]);
  const p = PATHS.find((l) => l.id === result);
  const opt = (on: boolean) => `rounded-full border px-4 py-2 text-sm font-semibold transition ${on ? "border-primary bg-primary text-primary-ink" : "border-line bg-card hover:border-primary/50"}`;
  return (
    <section className="space-y-5">
      <H2 id="type" icon={BadgeCheck} kicker="Your company" title="What type of company?" sub="What you sell decides the rules you follow." />
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
            <p className="text-sm font-semibold uppercase tracking-wide text-gold-bright">Best fit</p>
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
    </section>
  );
}

function Phases() {
  const [open, setOpen] = useState(0);
  return (
    <section className="space-y-5">
      <H2 id="phases" icon={Compass} kicker="Step by step" title="The four phases" sub="Each phase unlocks the next. Tap one to see what happens and what to watch for." />
      <ol className="space-y-3">
        {PHASES.map((ph, i) => {
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
      <p className="text-sm text-muted">Most people take 2 to 3 months in total. Having documents ready before you start is what makes it fast.</p>
    </section>
  );
}

function Documents() {
  return (
    <section className="space-y-5">
      <H2 id="documents" icon={FileText} kicker="Paperwork" title="Documents" sub="Two lists: what you prepare at home, and what you finish in Saudi Arabia. Ticks are saved on this phone." />
      <h3 className="font-heading text-xl font-bold">At home</h3>
      <Checklist storageKey="mesh-company-docs-home" items={DOCS_HOME} />
      <details className="group rounded-2xl border border-line bg-card">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 font-semibold [&::-webkit-details-marker]:hidden">
          How apostilles work <ChevronDown size={18} className="text-muted transition group-open:rotate-180" />
        </summary>
        <p className="border-t border-line p-4 text-sm leading-relaxed">{APOSTILLE_RULE}</p>
        <ul className="divide-y divide-line border-t border-line text-sm">
          {APOSTILLE.map((x) => (
            <li key={x.who} className="p-4"><b>{x.who}</b><p className="mt-1 leading-relaxed text-muted">{x.how}</p></li>
          ))}
          <li className="p-4 text-muted">Not sure about your country? Check the members list linked at the bottom of this page. Non-members go through the Saudi embassy instead, which takes longer.</li>
        </ul>
      </details>
      <h3 className="pt-2 font-heading text-xl font-bold">In Saudi Arabia</h3>
      <Checklist storageKey="mesh-company-docs-ksa" items={DOCS_KSA} />
    </section>
  );
}

function Costs() {
  const [transfer, setTransfer] = useState(0);
  const [family, setFamily] = useState(0);
  const [saudis, setSaudis] = useState(0);
  const setup = SETUP_COSTS.reduce((t, c) => t + c.sar, 0) + TRANSFER_FEES[transfer].sar;
  const saudiYear = saudis * 4000 * 12 * 1.12;
  const yearly = YEARLY.iqama + YEARLY.levyMonthly * 12 + YEARLY.muqeem + family * YEARLY.dependantMonthly * 12;
  return (
    <section className="space-y-5">
      <H2 id="cost" icon={Calculator} kicker="Money" title="What it costs" sub="Rounded figures from 2026. Adjust them to your situation." />
      <div className="rounded-3xl border border-line bg-card p-5 md:p-6">
        <p className="font-heading text-xl font-bold">Setting up</p>
        <label className="mt-4 block text-sm">
          <span className="font-semibold">Your iqama</span>
          <select value={transfer} onChange={(e) => setTransfer(Number(e.target.value))} className="mt-1.5 w-full rounded-xl border border-line bg-bg px-3 py-2.5 text-base text-ink">
            {TRANSFER_FEES.map((t, i) => <option key={t.label} value={i}>{t.label}{t.sar ? ` (${sar(t.sar)})` : ""}</option>)}
          </select>
        </label>
        <ul className="mt-4 divide-y divide-line text-sm">
          {SETUP_COSTS.map((c) => (
            <li key={c.id} className="flex items-start justify-between gap-3 py-2.5">
              <span>{c.label}{c.note && <span className="block text-xs text-muted">{c.note}</span>}</span>
              <span className="shrink-0 tabular-nums font-medium">≈ {sar(c.sar)}</span>
            </li>
          ))}
          {TRANSFER_FEES[transfer].sar > 0 && (
            <li className="flex justify-between gap-3 py-2.5"><span>Iqama transfer</span><span className="tabular-nums font-medium">{sar(TRANSFER_FEES[transfer].sar)}</span></li>
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
        {[
          ["Family members on your iqama", family, setFamily, 12],
          ["Saudi employees", saudis, setSaudis, 10],
        ].map(([label, val, set, max]) => (
          <div key={label as string} className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-line px-3 py-2.5 text-sm">
            <span className="font-semibold">{label as string}</span>
            <span className="flex items-center gap-2">
              <button onClick={() => (set as (f: (n: number) => number) => void)((n) => Math.max(0, n - 1))} aria-label={`Fewer ${label}`} className="grid size-9 place-items-center rounded-full border border-line text-lg">−</button>
              <span className="w-6 text-center text-base font-semibold tabular-nums">{val as number}</span>
              <button onClick={() => (set as (f: (n: number) => number) => void)((n) => Math.min(max as number, n + 1))} aria-label={`More ${label}`} className="grid size-9 place-items-center rounded-full border border-line text-lg">+</button>
            </span>
          </div>
        ))}
        <ul className="mt-3 divide-y divide-line text-sm">
          <li className="flex justify-between gap-3 py-2.5"><span>Your iqama renewal</span><span className="tabular-nums font-medium">{sar(YEARLY.iqama)}</span></li>
          <li className="flex justify-between gap-3 py-2.5"><span>Work permit levy<span className="block text-xs text-muted">About 800 SAR a month per foreign worker, usually including you</span></span><span className="shrink-0 tabular-nums font-medium">{sar(YEARLY.levyMonthly * 12)}</span></li>
          <li className="flex justify-between gap-3 py-2.5"><span>Muqeem subscription</span><span className="tabular-nums font-medium">≈ {sar(YEARLY.muqeem)}</span></li>
          {family > 0 && <li className="flex justify-between gap-3 py-2.5"><span>Family fee<span className="block text-xs text-muted">400 SAR a month each</span></span><span className="shrink-0 tabular-nums font-medium">{sar(family * YEARLY.dependantMonthly * 12)}</span></li>}
          {saudis > 0 && <li className="flex justify-between gap-3 py-2.5"><span>Saudi staff<span className="block text-xs text-muted">At 4,000 SAR a month each, plus about 12% GOSI</span></span><span className="shrink-0 tabular-nums font-medium">≈ {sar(Math.round(saudiYear))}</span></li>}
          <li className="flex justify-between gap-3 py-2.5 text-muted"><span>Accountant, health insurance</span><span>Get quotes</span></li>
        </ul>
        <div className="mt-4 rounded-2xl bg-gold-bg p-4">
          <p className="text-sm text-muted">Roughly each year</p>
          <p className="font-heading text-3xl font-bold tabular-nums">{sar(Math.round(yearly + saudiYear))}</p>
        </div>
      </div>
      <p className="text-xs text-muted">Fees checked {CHECKED}. Government fees change; confirm each one on the portal before paying.</p>
    </section>
  );
}

function Nitaqat() {
  return (
    <section className="space-y-5">
      <H2 id="nitaqat" icon={Landmark} kicker="Hiring" title="Saudization (Nitaqat), explained" sub="The rule that surprises most new owners." />
      <div className="grid gap-3 sm:grid-cols-2">
        {NITAQAT.map((n) => <Card key={n.title} title={n.title}>{n.body}</Card>)}
      </div>
    </section>
  );
}

function Bank() {
  return (
    <section className="space-y-5">
      <H2 id="bank" icon={Banknote} kicker="Banking" title="Choosing your bank" sub="Experience depends more on the branch and the officer than on the bank. Apply to two at once." />
      <div className="rounded-3xl border border-line bg-card p-5 md:p-6">
        <p className="font-semibold">Questions to ask before you apply</p>
        <ul className="mt-3 space-y-2 text-sm">
          {BANK_ASK.map((q) => <li key={q} className="flex gap-2"><CircleCheck size={16} className="mt-0.5 shrink-0 text-primary" />{q}</li>)}
        </ul>
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {BANKS.map((b) => (
          <div key={b.name} className="rounded-2xl border border-line bg-card p-3.5">
            <p className="text-sm font-semibold">{b.name}</p>
            <p className="text-xs text-muted">{b.type}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-muted">Banks offering business accounts, listed alphabetically. MESH is not connected to any of them.</p>
      <h3 className="pt-2 font-heading text-xl font-bold">What to bring</h3>
      <Checklist storageKey="mesh-company-bank-docs" items={BANK_DOCS.map((d, i) => ({ id: `b${i}`, ...d }))} />
      <Tip>The General Manager signs in person, with original documents. Plan to be in the Kingdom for it.</Tip>
    </section>
  );
}

function Family() {
  return (
    <section className="space-y-5">
      <H2 id="family" icon={Users} kicker="Family" title="Bringing your family" sub="Once your own iqama is issued, your company can sponsor your wife and children." />
      <ul className="space-y-2">
        {FAMILY.map((f) => (
          <li key={f} className="flex gap-3 rounded-2xl border border-line bg-card p-4 text-sm leading-relaxed"><CircleCheck size={17} className="mt-0.5 shrink-0 text-primary" />{f}</li>
        ))}
      </ul>
    </section>
  );
}

function Running() {
  return (
    <section className="space-y-5">
      <H2 id="running" icon={CalendarClock} kicker="After you open" title="Running your company" sub="The rhythm of a small Saudi company, by month, quarter and year." />
      <div className="grid gap-3 sm:grid-cols-2">
        {RUNNING.map((r) => (
          <div key={r.when} className="rounded-2xl border border-line bg-card p-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-gold">{r.when}</p>
            <ul className="mt-2 space-y-2 text-sm leading-relaxed">
              {r.items.map((it) => <li key={it} className="flex gap-2"><Check size={15} className="mt-1 shrink-0 text-primary" />{it}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <h3 className="pt-2 font-heading text-xl font-bold">Growing</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {GROW.map((g) => <Card key={g.title} title={<span className="flex items-center gap-2"><Rocket size={15} className="text-primary" />{g.title}</span>}>{g.body}</Card>)}
      </div>
    </section>
  );
}

function Taxes() {
  return (
    <section className="space-y-5">
      <H2 id="tax" icon={Receipt} kicker="Saudi taxes" title="What your company pays" sub="ZATCA, the Saudi tax authority, opens your file automatically." />
      <div className="grid gap-3 sm:grid-cols-2">
        {TAX.map((t) => <Card key={t.title} title={t.title}>{t.body}</Card>)}
      </div>
    </section>
  );
}

function HomeTax() {
  return (
    <section className="space-y-5">
      <H2 id="home-tax" icon={Flag} kicker="Your home country" title="Taxes back home" sub="Sort this out before you move, not after." />
      <div className="grid gap-3 sm:grid-cols-2">
        {HOME_TAX.map((t) => <Card key={t.title} title={t.title}>{t.body}</Card>)}
      </div>
      <div className="rounded-3xl border border-amber/40 bg-amber-bg p-5 md:p-6">
        <p className="font-heading text-xl font-bold">The exception: US citizens</p>
        <p className="mt-1 text-sm text-muted">Moving abroad does not end US filings, and owning a foreign company adds forms from the first year.</p>
        <ol className="mt-4 space-y-2">
          {US_TAX.map((t, i) => (
            <li key={t.title} className="flex gap-3 rounded-2xl bg-card p-4">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-ink">{i + 1}</span>
              <span><b className="block">{t.title}</b><span className="mt-1 block text-sm leading-relaxed text-muted">{t.body}</span></span>
            </li>
          ))}
        </ol>
      </div>
      <Tip>Whatever your passport, speak to a tax adviser who works with people abroad <b>before</b> you set up.</Tip>
    </section>
  );
}

function Premium() {
  return (
    <section className="space-y-5">
      <H2 id="premium" icon={Star} kicker="Another route" title="Premium Residency" sub="Residency with no employer or company sponsor, and no monthly worker or family fees." />
      <div className="grid gap-3 sm:grid-cols-2">
        {PREMIUM.map((p) => <Card key={p.name} title={p.name}>{p.body}</Card>)}
      </div>
      <p className="text-sm text-muted">Each category has an application fee and its own conditions. For most students and graduates, a small company is the realistic first step.</p>
    </section>
  );
}

function Pitfalls() {
  const groups = [...new Set(PITFALLS.map((p) => p.phase))];
  return (
    <section className="space-y-5">
      <H2 id="pitfalls" icon={AlertTriangle} kicker="Avoid these" title="Pitfalls, phase by phase" />
      {groups.map((g) => (
        <div key={g}>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-gold">{g}</p>
          <ul className="space-y-2">
            {PITFALLS.filter((p) => p.phase === g).map((p) => (
              <li key={p.title} className="rounded-2xl border border-line bg-card p-4">
                <p className="font-semibold">{p.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

function Plan() {
  const all = PLAN.flatMap((p) => p.items);
  const { ticks, toggle, reset } = useTicks("mesh-company-checklist");
  const done = all.filter((i) => ticks.includes(i.id)).length;
  return (
    <section className="space-y-5">
      <H2 id="plan" icon={ListChecks} kicker="Your checklist" title="From idea to open" sub="Every step in one list. Your progress is saved on this phone." />
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
        {PLAN.map((p) => (
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
    </section>
  );
}

function Glossary() {
  return (
    <section className="space-y-5">
      <H2 id="glossary" icon={Globe2} kicker="Reference" title="Words you will meet, and where to go" />
      <dl className="grid gap-2 sm:grid-cols-2">
        {GLOSSARY.map((g) => (
          <div key={g.term} className="rounded-2xl border border-line bg-card p-4">
            <dt className="font-semibold">{g.term}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted">{g.def}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-wrap gap-2">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-4 py-2 text-sm font-semibold transition hover:border-primary hover:text-primary">
            {l.label} <ArrowUpRight size={14} />
          </a>
        ))}
      </div>
      <p className="text-sm text-muted">Checked {CHECKED}. General information, not legal or tax advice. For anything unusual, speak to a licensed Saudi lawyer or accountant.</p>
    </section>
  );
}
