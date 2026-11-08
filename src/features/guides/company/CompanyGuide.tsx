"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle, ArrowUpRight, BadgeCheck, Banknote, Building2, Calculator, Check, ChevronDown, CircleCheck, Clock,
  FileText, Flag, Globe2, Landmark, Lightbulb, ListChecks, Newspaper, Plane, Receipt, RotateCcw, Scale, Sparkles, Star, Users,
} from "lucide-react";
import {
  AFTER_CR, APOSTILLE, BANK_DOCS, BANKS, CHANGES_2025, CHECKED, COMPARE, DOCUMENTS, FAMILY, GLOSSARY, LINKS, MISTAKES,
  PATHS, PLAN, PREMIUM, SETUP_COSTS, STARTS, TAX, TIMELINE, TRANSFER_FEES, US_TAX, YEARLY,
} from "./content";

const SECTIONS = [
  { id: "changes", label: "What changed in 2025" },
  { id: "start", label: "Your starting point" },
  { id: "licence", label: "What kind of company" },
  { id: "timeline", label: "Timeline" },
  { id: "documents", label: "Documents" },
  { id: "cost", label: "Cost calculator" },
  { id: "after-cr", label: "After the CR" },
  { id: "family", label: "Iqama and family" },
  { id: "tax", label: "Taxes" },
  { id: "us-tax", label: "If you're American" },
  { id: "banks", label: "Bank account" },
  { id: "mistakes", label: "Mistakes to avoid" },
  { id: "uae", label: "Saudi or UAE" },
  { id: "premium", label: "Premium Residency" },
  { id: "plan", label: "Your action plan" },
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
        <Changes />
        <StartingPoint />
        <LicenceFinder />
        <Timeline />
        <Documents />
        <CostCalculator />
        <AfterCr />
        <Family />
        <Taxes />
        <UsTax />
        <Banks />
        <Mistakes />
        <SaudiOrUae />
        <Premium />
        <ActionPlan />
        <Glossary />
        {footer}
      </div>
    </div>
  );
}

function H2({ id, icon: Icon, kicker, title, sub }: { id: string; icon: typeof Clock; kicker: string; title: string; sub?: string }) {
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
    <div className={`flex gap-3 rounded-2xl p-4 text-sm leading-relaxed ${warn ? "bg-cancel-bg text-ink" : "bg-gold-bg text-ink"}`}>
      {warn ? <AlertTriangle size={18} className="mt-0.5 shrink-0 text-cancel" /> : <Lightbulb size={18} className="mt-0.5 shrink-0 text-gold" />}
      <div>{children}</div>
    </div>
  );
}

function Intro() {
  const setup = SETUP_COSTS.reduce((t, c) => t + c.sar, 0);
  return (
    <section className="space-y-5">
      <p className="text-lg leading-relaxed">
        Agencies will tell you a Saudi company is too complicated to set up yourself and quote 30,000 to 50,000 SAR. It is not. It is a checklist: a fixed order of government websites, a handful of documents, and a few traps that are easy to avoid once you know them.
      </p>
      <p className="leading-relaxed text-muted">
        Your own company can also be your route to residency: it sponsors your iqama (residence permit), and then your wife and children. This guide walks you through it in order, in plain English, with the fees founders in Madinah actually paid. You can start it from outside the Kingdom.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { big: `≈ ${Math.round(setup / 1000).toLocaleString("en-GB")},000`, small: "SAR to set up, before any iqama transfer", icon: Banknote },
          { big: "≈ 7 weeks", small: "from registration to a working bank account", icon: Clock },
          { big: "8 to 10 hrs", small: "of actual online paperwork. The rest is waiting", icon: Sparkles },
        ].map(({ big, small, icon: Icon }) => (
          <div key={big} className="rounded-2xl border border-line bg-card p-4">
            <Icon size={18} className="text-primary" />
            <p className="mt-2 font-heading text-2xl font-bold">{big}</p>
            <p className="text-sm text-muted">{small}</p>
          </div>
        ))}
      </div>
      <Tip>
        Ministries change their screens and fees often. If a government site shows something different from this guide, <b>follow the site</b>, and tell us in the group so we can update this page.
      </Tip>
    </section>
  );
}

function Changes() {
  return (
    <section className="space-y-5">
      <H2 id="changes" icon={Newspaper} kicker="Read this first" title="What changed in 2025" sub="Older guides, agencies and videos still describe the old system. These are the changes that matter to you." />
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

function StartingPoint() {
  const [pick, setPick] = useState(STARTS[0].id);
  const s = STARTS.find((x) => x.id === pick)!;
  return (
    <section className="space-y-5">
      <H2 id="start" icon={Plane} kicker="Step 0" title="Where are you starting from?" sub="Your first step depends on where you are today. Every path ends in the same place: an iqama through your own company." />
      <div role="tablist" aria-label="Starting point" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {STARTS.map((x) => (
          <button key={x.id} role="tab" aria-selected={pick === x.id} onClick={() => setPick(x.id)}
            className={`rounded-2xl border p-3.5 text-start transition ${pick === x.id ? "border-primary bg-primary text-primary-ink shadow-md" : "border-line bg-card hover:border-primary/50"}`}>
            <span className={`text-xs font-semibold uppercase tracking-wide ${pick === x.id ? "opacity-80" : "text-gold"}`}>{x.short}</span>
            <span className="mt-1 block text-sm font-semibold leading-snug">{x.label}</span>
          </button>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-card p-5">
          <p className="text-sm font-semibold text-muted">Your first step</p>
          <p className="mt-2 leading-relaxed">{s.first}</p>
        </div>
        <div className="rounded-2xl border border-line bg-card p-5">
          <p className="text-sm font-semibold text-muted">How you get the iqama</p>
          <p className="mt-2 leading-relaxed">{s.iqama}</p>
        </div>
      </div>
      {s.warn && <Tip tone="warn">{s.warn}</Tip>}
    </section>
  );
}

type Answer = { abroad?: boolean; what?: "services" | "goods" | "making" | "profession" | "property" };

function LicenceFinder() {
  const [a, setA] = useState<Answer>({});
  const result = useMemo(() => {
    if (a.what == null || a.abroad == null) return null;
    if (a.what === "goods") return "trading";
    if (a.what === "making") return "industrial";
    if (a.what === "profession") return "professional";
    if (a.what === "property") return "property";
    return a.abroad ? "service" : "startup";
  }, [a]);
  const p = PATHS.find((l) => l.id === result);
  const opt = (on: boolean) => `rounded-full border px-4 py-2 text-sm font-semibold transition ${on ? "border-primary bg-primary text-primary-ink" : "border-line bg-card hover:border-primary/50"}`;
  return (
    <section className="space-y-5">
      <H2 id="licence" icon={BadgeCheck} kicker="Step 1" title="What kind of company are you setting up?" sub="What your company does decides the rules you follow. Two questions point you the right way." />
      <div className="space-y-5 rounded-3xl border border-line bg-card p-5 md:p-6">
        <div>
          <p className="font-semibold">1. Do you own a company back home (any size), registered at least a year ago?</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button className={opt(a.abroad === true)} onClick={() => setA({ ...a, abroad: true })}>Yes</button>
            <button className={opt(a.abroad === false)} onClick={() => setA({ ...a, abroad: false })}>No, not yet</button>
          </div>
        </div>
        <div>
          <p className="font-semibold">2. What will the Saudi company mainly do?</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {([
              ["services", "Services, online work, consulting, teaching"],
              ["goods", "Sell physical products"],
              ["making", "Make or manufacture"],
              ["profession", "Law, accounting, engineering, health"],
              ["property", "Real estate"],
            ] as const).map(([k, label]) => (
              <button key={k} className={opt(a.what === k)} onClick={() => setA({ ...a, what: k })}>{label}</button>
            ))}
          </div>
        </div>
        {p ? (
          <div className="rounded-2xl bg-brand p-5 text-white" aria-live="polite">
            <p className="text-sm font-semibold uppercase tracking-wide text-gold-bright">Your route</p>
            <p className="mt-1 font-heading text-3xl font-bold">{p.name}</p>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div><dt className="text-white/60">Good for</dt><dd className="mt-0.5">{p.bestFor}</dd></div>
              <div><dt className="text-white/60">Money in the company</dt><dd className="mt-0.5">{p.capital}</dd></div>
              <div className="sm:col-span-2"><dt className="text-white/60">You will need</dt><dd className="mt-0.5">{p.needs}</dd></div>
            </dl>
            {p.note && <p className="mt-4 rounded-xl bg-white/10 p-3 text-sm">{p.note}</p>}
            {a.abroad === false && p.id !== "startup" && (
              <p className="mt-3 rounded-xl bg-white/10 p-3 text-sm">Without a company back home, either register a simple one there first, ask MISA about registering as an individual, or talk to a Saudi accelerator about the startup route.</p>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted">Answer both questions to see your route.</p>
        )}
      </div>
      <details className="group rounded-2xl border border-line bg-card">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 font-semibold [&::-webkit-details-marker]:hidden">
          Compare all six <ChevronDown size={18} className="text-muted transition group-open:rotate-180" />
        </summary>
        <div className="overflow-x-auto border-t border-line">
          <table className="w-full min-w-[560px] text-sm">
            <thead className="bg-bg-2 text-left text-xs uppercase tracking-wide text-muted">
              <tr><th className="p-3">Type</th><th className="p-3">Good for</th><th className="p-3">You will need</th></tr>
            </thead>
            <tbody className="divide-y divide-line">
              {PATHS.map((l) => (
                <tr key={l.id} className={l.id === result ? "bg-primary-soft" : ""}>
                  <td className="p-3 font-semibold">{l.name}</td><td className="p-3">{l.bestFor}</td><td className="p-3">{l.needs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
      <Tip>
        <b>One company, several activities.</b> You can list several related activities on one registration, but each must be named. Very different activities (for example food production and online teaching) can need separate approvals or two companies. Hajj and Umrah services need extra ministry approvals and usually a Saudi partner; expect 6 to 9 months.
      </Tip>
    </section>
  );
}

function Timeline() {
  const [open, setOpen] = useState(0);
  return (
    <section className="space-y-5">
      <H2 id="timeline" icon={Clock} kicker="Step 2" title="About 7 weeks, end to end" sub="Day 0 is your MISA registration. Tap a stage for the details." />
      <ol className="relative space-y-3 border-s-2 border-line ps-6">
        {TIMELINE.map((t, i) => {
          const on = open === i;
          return (
            <li key={t.title} className="relative">
              <span className={`absolute -start-[33px] top-4 grid size-4 place-items-center rounded-full ring-4 ring-bg ${on ? "bg-primary" : "bg-gold-bright"}`} />
              <button onClick={() => setOpen(on ? -1 : i)} aria-expanded={on}
                className={`w-full rounded-2xl border p-4 text-start transition ${on ? "border-primary bg-card shadow-md" : "border-line bg-card hover:border-primary/50"}`}>
                <span className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gold">{t.when}</span>
                  <span className="text-xs text-muted">{t.time}</span>
                </span>
                <span className="mt-1 flex items-center justify-between gap-2 font-semibold">
                  {t.title} <ChevronDown size={18} className={`shrink-0 text-muted transition ${on ? "rotate-180" : ""}`} />
                </span>
                {on && (
                  <span className="mt-3 block space-y-3 text-sm leading-relaxed">
                    <span className="block">{t.body}</span>
                    {t.tip && <span className="flex gap-2 rounded-xl bg-gold-bg p-3"><Lightbulb size={16} className="mt-0.5 shrink-0 text-gold" />{t.tip}</span>}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ol>
      <div className="rounded-3xl border border-line bg-card p-5 md:p-6">
        <p className="flex items-center gap-2 font-heading text-xl font-bold"><AlertTriangle size={20} className="text-cancel" /> The name trap</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">You register with MISA before you have a Saudi company name, so the registration carries your overseas company's name. The CR will only be issued if both names match. The fix is free; you just have to know it exists.</p>
        <ol className="mt-4 grid gap-2 sm:grid-cols-5">
          {["Register with MISA in your parent company's name", "MISA confirms", "Reserve your Saudi company name", "Update the name on MISA (free, 1 hour)", "File the CR"].map((s, i) => (
            <li key={s} className="rounded-xl bg-bg-2 p-3 text-sm">
              <span className="font-heading text-lg font-bold text-gold">{i + 1}</span>
              <span className="block leading-snug">{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
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

function Documents() {
  return (
    <section className="space-y-5">
      <H2 id="documents" icon={FileText} kicker="Before day 0" title="Documents to prepare first" sub="Tick them off as you go. Your progress is saved on this phone." />
      <Tip>
        <b>The order for every document:</b> notarize it at home, get an apostille (an international certificate that makes it valid abroad), then have it translated into Arabic by a certified translator in Saudi Arabia. Saudi Arabia has accepted apostilles since December 2022, so you no longer need the Saudi embassy step if your country is part of the Apostille Convention. Some agencies and older websites still say otherwise.
      </Tip>
      <Checklist storageKey="mesh-company-docs" items={DOCUMENTS} />
      <details className="group rounded-2xl border border-line bg-card">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 font-semibold [&::-webkit-details-marker]:hidden">
          Where to get an apostille <ChevronDown size={18} className="text-muted transition group-open:rotate-180" />
        </summary>
        <ul className="divide-y divide-line border-t border-line text-sm">
          {APOSTILLE.map((x) => (
            <li key={x.who} className="p-4"><b>{x.who}</b><p className="mt-1 leading-relaxed text-muted">{x.how}</p></li>
          ))}
          <li className="p-4 text-muted">Other countries: search the Hague Conference (HCCH) list to see whether yours is a member. If it is not, documents go through the Saudi embassy instead, which adds 2 to 4 weeks.</li>
        </ul>
      </details>
    </section>
  );
}

function CostCalculator() {
  const [transfer, setTransfer] = useState(0);
  const [family, setFamily] = useState(0);
  const [office, setOffice] = useState<"saudi" | "office" | "none">("none");
  const setup = SETUP_COSTS.reduce((t, c) => t + c.sar, 0) + TRANSFER_FEES[transfer].sar;
  const yearly = YEARLY.iqama + YEARLY.levyMonthly * 12 + YEARLY.muqeem + family * (YEARLY.dependantMonthly * 12);
  const agencyLow = 30000, agencyHigh = 50000;
  return (
    <section className="space-y-5">
      <H2 id="cost" icon={Calculator} kicker="The real cost" title="What you will actually pay" sub="Adjust it to your situation. Figures are what founders in Madinah paid in 2026." />
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
              <span className="shrink-0 tabular-nums font-medium">{sar(c.sar)}</span>
            </li>
          ))}
          {TRANSFER_FEES[transfer].sar > 0 && (
            <li className="flex justify-between gap-3 py-2.5"><span>Iqama transfer</span><span className="tabular-nums font-medium">{sar(TRANSFER_FEES[transfer].sar)}</span></li>
          )}
          <li className="flex justify-between gap-3 py-2.5 text-muted"><span>Chamber of Commerce</span><span>Free for 3 years</span></li>
        </ul>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-brand p-4 text-white">
            <p className="text-sm text-white/70">Doing it yourself</p>
            <p className="font-heading text-3xl font-bold tabular-nums">{sar(setup)}</p>
          </div>
          <div className="rounded-2xl bg-bg-2 p-4">
            <p className="text-sm text-muted">Typical agency quote</p>
            <p className="font-heading text-3xl font-bold tabular-nums">30,000 to 50,000 SAR</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex h-3 overflow-hidden rounded-full bg-bg-2">
            <div className="bg-primary" style={{ width: `${Math.min(100, (setup / agencyHigh) * 100)}%` }} />
          </div>
          <p className="mt-2 text-sm text-muted">You keep roughly <b className="text-ink">{sar(Math.max(0, agencyLow - setup))}</b> to <b className="text-ink">{sar(Math.max(0, agencyHigh - setup))}</b>.</p>
        </div>
      </div>

      <div className="rounded-3xl border border-line bg-card p-5 md:p-6">
        <p className="font-heading text-xl font-bold">Every year after</p>
        <p className="mt-1 text-sm text-muted">Agencies rarely mention these. Budget for them from day one.</p>
        <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-line px-3 py-2.5 text-sm">
          <span className="font-semibold">Wife and children on your iqama</span>
          <span className="flex items-center gap-2">
            <button onClick={() => setFamily((f) => Math.max(0, f - 1))} aria-label="Fewer" className="grid size-9 place-items-center rounded-full border border-line text-lg">−</button>
            <span className="w-6 text-center text-base font-semibold tabular-nums">{family}</span>
            <button onClick={() => setFamily((f) => Math.min(12, f + 1))} aria-label="More" className="grid size-9 place-items-center rounded-full border border-line text-lg">+</button>
          </span>
        </div>
        <ul className="mt-3 divide-y divide-line text-sm">
          <li className="flex justify-between gap-3 py-2.5"><span>Iqama renewal<span className="block text-xs text-muted">Yours, every year</span></span><span className="tabular-nums font-medium">{sar(YEARLY.iqama)}</span></li>
          <li className="flex justify-between gap-3 py-2.5"><span>Work permit levy<span className="block text-xs text-muted">About 800 SAR a month for each foreign worker on the company, usually including you. 700 SAR if Saudis are at least half your staff.</span></span><span className="shrink-0 tabular-nums font-medium">{sar(YEARLY.levyMonthly * 12)}</span></li>
          <li className="flex justify-between gap-3 py-2.5"><span>Muqeem subscription</span><span className="tabular-nums font-medium">{sar(YEARLY.muqeem)}</span></li>
          {family > 0 && (
            <li className="flex justify-between gap-3 py-2.5"><span>Family fee<span className="block text-xs text-muted">400 SAR a month for each family member</span></span><span className="shrink-0 tabular-nums font-medium">{sar(family * YEARLY.dependantMonthly * 12)}</span></li>
          )}
          <li className="flex justify-between gap-3 py-2.5 text-muted"><span>Accountant for your yearly tax return</span><span>Ask for quotes</span></li>
        </ul>
        <div className="mt-4 rounded-2xl bg-gold-bg p-4">
          <p className="text-sm text-muted">Roughly each year, before staff salaries</p>
          <p className="font-heading text-3xl font-bold tabular-nums">{sar(yearly)}</p>
        </div>
      </div>

      <div className="rounded-3xl border border-line bg-card p-5 md:p-6">
        <p className="font-heading text-xl font-bold">The Balady trap: rent an office or hire a Saudi?</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Run a service business from home and you may hit a wall at the iqama transfer: the system expects a city business license (Balady), which needs a physical office or shop. There are two ways through.
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {([
            ["office", "Rent a serviced office", "About 4,000 to 5,000 SAR a month. Gives you an address for Balady, but does nothing for your Saudization rating."],
            ["saudi", "Hire a Saudi employee", "For example a 4,000 SAR salary plus about 12% social insurance (GOSI), so about 4,500 SAR a month. Lifts your Saudization rating within about a week and unblocks the transfer. You will need a Saudi hire to grow anyway."],
          ] as const).map(([k, t, d]) => (
            <button key={k} onClick={() => setOffice(office === k ? "none" : k)} aria-pressed={office === k}
              className={`rounded-2xl border p-4 text-start text-sm transition ${office === k ? "border-primary bg-primary-soft" : "border-line hover:border-primary/50"}`}>
              <span className="flex items-center gap-2 font-semibold">{k === "saudi" ? <Users size={16} className="text-primary" /> : <Building2 size={16} className="text-primary" />} {t}</span>
              <span className="mt-1.5 block leading-relaxed text-muted">{d}</span>
            </button>
          ))}
        </div>
        {office !== "none" && (
          <p className="mt-3 text-sm">{office === "saudi"
            ? <>About <b>4,500 SAR</b> a month, and it counts towards Saudization. Usually the better choice.</>
            : <>About <b>4,000 to 5,000 SAR</b> a month, with no Saudization benefit. You will likely still need a Saudi hire later.</>}</p>
        )}
      </div>
      <p className="text-xs text-muted">Fees checked {CHECKED}. Confirm each fee on the government site before you pay.</p>
    </section>
  );
}

function Taxes() {
  return (
    <section className="space-y-5">
      <H2 id="tax" icon={Receipt} kicker="Saudi taxes" title="What your company pays" sub="ZATCA, the Saudi tax authority, opens your file automatically. Keep simple monthly books from day one." />
      <div className="grid gap-3 sm:grid-cols-2">
        {TAX.map((t) => (
          <div key={t.title} className="rounded-2xl border border-line bg-card p-4">
            <p className="font-semibold">{t.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{t.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function UsTax() {
  return (
    <section className="space-y-5">
      <H2 id="us-tax" icon={Flag} kicker="For US citizens" title="Your US filings" sub="Owning a Saudi company adds forms to your US tax return from the first year. Missing them is expensive." />
      <ol className="space-y-2">
        {US_TAX.map((t, i) => (
          <li key={t.title} className="flex gap-3 rounded-2xl border border-line bg-card p-4">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-ink">{i + 1}</span>
            <span><b className="block">{t.title}</b><span className="mt-1 block text-sm leading-relaxed text-muted">{t.body}</span></span>
          </li>
        ))}
      </ol>
      <Tip>
        Speak to a US tax preparer who works with Americans abroad <b>before</b> you set up. How the company is classified changes which forms you file and how its profits are taxed. Other nationalities: check your own country's rules on owning a company abroad.
      </Tip>
    </section>
  );
}

function Premium() {
  return (
    <section className="space-y-5">
      <H2 id="premium" icon={Star} kicker="Another route" title="Premium Residency" sub="A residence permit that does not depend on an employer or a company sponsor. Holders do not pay the monthly worker and family fees." />
      <div className="grid gap-3 sm:grid-cols-2">
        {PREMIUM.map((p) => (
          <div key={p.name} className="rounded-2xl border border-line bg-card p-4">
            <p className="font-semibold">{p.name}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.body}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-muted">Each category has an application fee (4,000 SAR at the time of writing) and its own conditions. For most students and graduates, a small company of your own is the realistic route; Premium Residency is worth knowing about as you grow.</p>
    </section>
  );
}

function AfterCr() {
  return (
    <section className="space-y-5">
      <H2 id="after-cr" icon={Landmark} kicker="Week 3 onwards" title="After the CR: simpler than you think" sub="Your CR is the trigger. Three government systems open by themselves within about an hour; the rest you do at your own pace." />
      <div className="grid gap-3 sm:grid-cols-2">
        {AFTER_CR.map((x) => (
          <div key={x.name} className="rounded-2xl border border-line bg-card p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="font-semibold">{x.name} <span className="font-normal text-muted">· {x.what}</span></p>
              {x.auto && <span className="shrink-0 rounded-full bg-on-bg px-2 py-0.5 text-xs font-semibold text-on">Automatic</span>}
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{x.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Family() {
  return (
    <section className="space-y-5">
      <H2 id="family" icon={Users} kicker="Residency" title="Your iqama, then your family" sub="The business gets you and your family residency, but only in this order. Skip a step and you wait weeks." />
      <ol className="grid gap-3 sm:grid-cols-2">
        {FAMILY.map((f, i) => (
          <li key={f.title} className="rounded-2xl border border-line bg-card p-4">
            <span className="flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-full bg-primary font-heading font-bold text-primary-ink">{i + 1}</span>
              <span><b className="block leading-tight">{f.title}</b><span className="text-xs text-gold">{f.time}</span></span>
            </span>
            <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Banks() {
  return (
    <section className="space-y-5">
      <H2 id="banks" icon={Banknote} kicker="The slowest step" title="Opening the company bank account" sub="The bank is where most timelines stall. Apply to two banks at once, and start the day your CR Extract is issued." />
      <div className="grid gap-3 sm:grid-cols-2">
        {BANKS.map((b) => (
          <div key={b.name} className="rounded-2xl border border-line bg-card p-4">
            <div className="flex items-baseline justify-between gap-2">
              <p className="font-semibold">{b.name}</p>
              <span className="text-xs text-muted">{b.time}</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed">{b.good}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{b.watch}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-muted">Listed alphabetically. MESH is not connected to any bank. Every bank needs the General Manager to sign in person, so plan one trip around it.</p>
      <h3 className="pt-2 font-heading text-xl font-bold">What to bring</h3>
      <Checklist storageKey="mesh-company-bank" items={BANK_DOCS.map((d, i) => ({ id: `b${i}`, ...d }))} />
    </section>
  );
}

function Mistakes() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="space-y-5">
      <H2 id="mistakes" icon={AlertTriangle} kicker="Avoid these" title="13 mistakes that cost founders time and money" sub="Most of the fixes are free. You just have to know them." />
      <div className="grid gap-2 sm:grid-cols-2">
        {MISTAKES.map((m, i) => {
          const on = open === i;
          return (
            <button key={m.title} onClick={() => setOpen(on ? null : i)} aria-expanded={on}
              className={`rounded-2xl border p-4 text-start transition ${on ? "border-cancel/50 bg-cancel-bg" : "border-line bg-card hover:border-cancel/40"}`}>
              <span className="flex items-start gap-3">
                <span className="font-heading text-2xl font-bold leading-none text-gold">{i + 1}</span>
                <span className="flex-1 font-semibold leading-snug">{m.title}</span>
                <ChevronDown size={18} className={`mt-0.5 shrink-0 text-muted transition ${on ? "rotate-180" : ""}`} />
              </span>
              {on && <span className="mt-2 block ps-9 text-sm leading-relaxed">{m.body}</span>}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function SaudiOrUae() {
  return (
    <section className="space-y-5">
      <H2 id="uae" icon={Scale} kicker="Honest comparison" title="Saudi Arabia or a UAE free zone?" />
      <div className="overflow-x-auto rounded-2xl border border-line bg-card">
        <table className="w-full min-w-[520px] text-sm">
          <thead className="bg-bg-2 text-left text-xs uppercase tracking-wide text-muted">
            <tr><th className="p-3" /><th className="p-3">Saudi company</th><th className="p-3">UAE (free zone)</th></tr>
          </thead>
          <tbody className="divide-y divide-line">
            {COMPARE.map((r, i) => (
              <tr key={r.row} className={i === COMPARE.length - 1 ? "bg-primary-soft font-semibold" : ""}>
                <td className="p-3 font-semibold">{r.row}</td><td className="p-3">{r.ksa}</td><td className="p-3">{r.uae}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm leading-relaxed text-muted">The UAE wins on tax. Saudi Arabia wins if you are building a life here and selling into the local market. With the old licence fee gone, Saudi running costs are far lower than they were.</p>
    </section>
  );
}

function ActionPlan() {
  const all = PLAN.flatMap((p) => p.items);
  const { ticks, toggle, reset } = useTicks("mesh-company-plan");
  const done = all.filter((i) => ticks.includes(i.id)).length;
  return (
    <section className="space-y-5">
      <H2 id="plan" icon={ListChecks} kicker="Your plan" title="Do it yourself, step by step" sub="Every step from today to a working company. Tick them off; your progress is saved on this phone." />
      <div className="sticky top-16 z-10 -mx-1 rounded-2xl border border-line bg-card/95 p-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-bg-2">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(done / all.length) * 100}%` }} />
          </div>
          <span className="text-sm font-semibold tabular-nums">{done}/{all.length}</span>
          {done > 0 && <button onClick={reset} aria-label="Reset plan" className="text-muted hover:text-ink"><RotateCcw size={15} /></button>}
        </div>
        {done === all.length && <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-on"><CircleCheck size={16} /> Mabrook. Your company is up and running.</p>}
      </div>
      {PLAN.map((p) => (
        <div key={p.phase}>
          <h3 className="mb-2 font-heading text-xl font-bold">{p.phase}</h3>
          <ul className="space-y-2">
            {p.items.map((i) => {
              const on = ticks.includes(i.id);
              return (
                <li key={i.id}>
                  <button onClick={() => toggle(i.id)} aria-pressed={on}
                    className={`flex w-full gap-3 rounded-2xl border p-4 text-start transition ${on ? "border-on/40 bg-on-bg" : "border-line bg-card hover:border-primary/50"}`}>
                    <span className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border-2 ${on ? "border-on bg-on text-white" : "border-line"}`}>{on && <Check size={14} strokeWidth={3} />}</span>
                    <span>
                      <span className={`block font-semibold ${on ? "line-through opacity-70" : ""}`}>{i.title}</span>
                      <span className="mt-0.5 block text-sm text-muted">{i.body}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
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
      <p className="text-sm text-muted">Checked {CHECKED}. This guide is general information, not legal or tax advice. For anything unusual, speak to a licensed Saudi lawyer or accountant.</p>
    </section>
  );
}
