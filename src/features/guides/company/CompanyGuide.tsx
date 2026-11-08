"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle, ArrowUpRight, BadgeCheck, Banknote, Building2, Calculator, Check, ChevronDown, CircleCheck, Clock,
  FileText, Globe2, Landmark, Lightbulb, ListChecks, Plane, RotateCcw, Scale, Sparkles, Users,
} from "lucide-react";
import {
  AFTER_CR, BANK_DOCS, BANKS, CHECKED, COMPARE, COSTS, DOCUMENTS, FAMILY, GLOSSARY, LICENCES, LINKS, MISTAKES, PLAN,
  STARTS, TIMELINE, TRANSFER_FEES,
} from "./content";

const SECTIONS = [
  { id: "start", label: "Your starting point" },
  { id: "licence", label: "Which licence" },
  { id: "timeline", label: "Timeline" },
  { id: "documents", label: "Documents" },
  { id: "cost", label: "Cost calculator" },
  { id: "after-cr", label: "After the CR" },
  { id: "family", label: "Iqama and family" },
  { id: "banks", label: "Bank account" },
  { id: "mistakes", label: "12 mistakes" },
  { id: "uae", label: "Saudi or UAE" },
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
        <StartingPoint />
        <LicenceFinder />
        <Timeline />
        <Documents />
        <CostCalculator />
        <AfterCr />
        <Family />
        <Banks />
        <Mistakes />
        <SaudiOrUae />
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
  return (
    <section className="space-y-5">
      <p className="text-lg leading-relaxed">
        Agencies will tell you a MISA company is too complicated to do yourself and quote 30,000 to 50,000 SAR. It is not. It is a checklist: a fixed order of portals, a handful of documents, and a few traps that are easy to avoid once you know them.
      </p>
      <p className="leading-relaxed text-muted">
        This guide walks you through it in order, with the fees founders in Madinah actually paid. If you can follow instructions and use a translation app, you can do this yourself, including from outside the Kingdom.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { big: "≈ 12,000", small: "SAR in government fees, year 1", icon: Banknote },
          { big: "≈ 7 weeks", small: "from MISA application to a working bank account", icon: Clock },
          { big: "8 to 10 hrs", small: "of actual portal work. The rest is waiting", icon: Sparkles },
        ].map(({ big, small, icon: Icon }) => (
          <div key={big} className="rounded-2xl border border-line bg-card p-4">
            <Icon size={18} className="text-primary" />
            <p className="mt-2 font-heading text-2xl font-bold">{big}</p>
            <p className="text-sm text-muted">{small}</p>
          </div>
        ))}
      </div>
      <Tip>
        Ministries change their screens and fees often. If a portal shows something different from this guide, <b>follow the portal</b>, and tell us in the group so we can update this page.
      </Tip>
    </section>
  );
}

function StartingPoint() {
  const [pick, setPick] = useState(STARTS[0].id);
  const s = STARTS.find((x) => x.id === pick)!;
  return (
    <section className="space-y-5">
      <H2 id="start" icon={Plane} kicker="Step 0" title="Where are you starting from?" sub="Your first step depends on where you are today. Every path ends in the same place: an iqama through your own company." />
      <div role="tablist" aria-label="Starting point" className="grid gap-2 sm:grid-cols-3">
        {STARTS.map((x) => (
          <button key={x.id} role="tab" aria-selected={pick === x.id} onClick={() => setPick(x.id)}
            className={`rounded-2xl border p-4 text-start transition ${pick === x.id ? "border-primary bg-primary text-primary-ink shadow-md" : "border-line bg-card hover:border-primary/50"}`}>
            <span className={`text-xs font-semibold uppercase tracking-wide ${pick === x.id ? "opacity-80" : "text-gold"}`}>{x.short}</span>
            <span className="mt-1 block font-semibold leading-snug">{x.label}</span>
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
    if (a.what === "property") return "realestate";
    return a.abroad ? "service" : "entrepreneur";
  }, [a]);
  const lic = LICENCES.find((l) => l.id === result);
  const opt = (on: boolean) => `rounded-full border px-4 py-2 text-sm font-semibold transition ${on ? "border-primary bg-primary text-primary-ink" : "border-line bg-card hover:border-primary/50"}`;
  return (
    <section className="space-y-5">
      <H2 id="licence" icon={BadgeCheck} kicker="Step 1" title="Which licence do you need?" sub="Picking the wrong licence is the most expensive mistake. Two questions find yours." />
      <div className="space-y-5 rounded-3xl border border-line bg-card p-5 md:p-6">
        <div>
          <p className="font-semibold">1. Do you own a company abroad that is at least a year old?</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button className={opt(a.abroad === true)} onClick={() => setA({ ...a, abroad: true })}>Yes</button>
            <button className={opt(a.abroad === false)} onClick={() => setA({ ...a, abroad: false })}>No, not yet</button>
          </div>
        </div>
        <div>
          <p className="font-semibold">2. What will the Saudi company mainly do?</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {([
              ["services", "Services, online, consulting, teaching"],
              ["goods", "Sell physical goods"],
              ["making", "Make or manufacture"],
              ["profession", "Law, accounting, engineering, health"],
              ["property", "Real estate"],
            ] as const).map(([k, label]) => (
              <button key={k} className={opt(a.what === k)} onClick={() => setA({ ...a, what: k })}>{label}</button>
            ))}
          </div>
        </div>
        {lic ? (
          <div className="rounded-2xl bg-brand p-5 text-white" aria-live="polite">
            <p className="text-sm font-semibold uppercase tracking-wide text-gold-bright">Your licence</p>
            <p className="mt-1 font-heading text-3xl font-bold">{lic.name}</p>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div><dt className="text-white/60">Best for</dt><dd className="mt-0.5">{lic.bestFor}</dd></div>
              <div><dt className="text-white/60">Capital</dt><dd className="mt-0.5">{lic.capital}</dd></div>
              <div><dt className="text-white/60">Yearly fee</dt><dd className="mt-0.5">{lic.fee}</dd></div>
              <div><dt className="text-white/60">You will need</dt><dd className="mt-0.5">{lic.needs}</dd></div>
            </dl>
            {lic.note && <p className="mt-4 rounded-xl bg-white/10 p-3 text-sm">{lic.note}</p>}
            {a.abroad === false && lic.id !== "entrepreneur" && (
              <p className="mt-3 rounded-xl bg-white/10 p-3 text-sm">This licence expects a parent company abroad. Register one at home first, or speak to a Saudi accelerator about the Entrepreneur route.</p>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted">Answer both questions to see your licence.</p>
        )}
      </div>
      <details className="group rounded-2xl border border-line bg-card">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 font-semibold [&::-webkit-details-marker]:hidden">
          Compare all six licences <ChevronDown size={18} className="text-muted transition group-open:rotate-180" />
        </summary>
        <div className="overflow-x-auto border-t border-line">
          <table className="w-full min-w-[560px] text-sm">
            <thead className="bg-bg-2 text-left text-xs uppercase tracking-wide text-muted">
              <tr><th className="p-3">Licence</th><th className="p-3">Best for</th><th className="p-3">Capital</th><th className="p-3">Yearly fee</th></tr>
            </thead>
            <tbody className="divide-y divide-line">
              {LICENCES.map((l) => (
                <tr key={l.id} className={l.id === result ? "bg-primary-soft" : ""}>
                  <td className="p-3 font-semibold">{l.name}</td><td className="p-3">{l.bestFor}</td><td className="p-3">{l.capital}</td><td className="p-3">{l.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
      <Tip>
        <b>One licence, one category.</b> Within a category you can list several activities on the same licence, but each must be named. Activities from different categories (for example food manufacturing and e-learning) need two licences, or a holding company with two companies under it. Hajj and Umrah operators need extra ministry approvals and a Saudi partner is strongly advised; expect 6 to 9 months.
      </Tip>
    </section>
  );
}

function Timeline() {
  const [open, setOpen] = useState(0);
  return (
    <section className="space-y-5">
      <H2 id="timeline" icon={Clock} kicker="Step 2" title="About 7 weeks, end to end" sub="Day 0 is your MISA application. Tap a stage for the details." />
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
        <p className="mt-2 text-sm leading-relaxed text-muted">You apply to MISA before you have a Saudi trade name, so the licence carries your overseas company's name. The CR will only issue if both names match. The fix is free; you just have to know it exists.</p>
        <ol className="mt-4 grid gap-2 sm:grid-cols-5">
          {["Apply to MISA in your parent's name", "MISA approves", "Reserve your Saudi trade name", "Amend MISA to that name (free, 1 hour)", "File the CR"].map((s, i) => (
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
      <H2 id="documents" icon={FileText} kicker="Before day 0" title="Documents to prepare before the portal" sub="Tick them off as you go. Your progress is saved on this phone." />
      <Tip>
        <b>Order for every document:</b> notarise at home, then apostille, then a certified Arabic translation in Saudi Arabia. Saudi Arabia joined the Apostille Convention in December 2022, so if your country is a member (the UK, US, Australia, Canada and most of Europe are) the apostille is enough and you can skip the Saudi embassy. Countries outside the convention still go through the embassy, which adds 2 to 4 weeks.
      </Tip>
      <Checklist storageKey="mesh-company-docs" items={DOCUMENTS} />
    </section>
  );
}

function CostCalculator() {
  const [transfer, setTransfer] = useState(0);
  const [chamber, setChamber] = useState(true);
  const [office, setOffice] = useState<"saudi" | "office" | "none">("none");
  const base = COSTS.filter((c) => !c.optional || chamber).reduce((t, c) => t + (c.sar ?? 0), 0);
  const total = base + TRANSFER_FEES[transfer].sar;
  const monthly = office === "saudi" ? 4500 : office === "office" ? 4500 : 0;
  const agencyLow = 30000, agencyHigh = 50000;
  return (
    <section className="space-y-5">
      <H2 id="cost" icon={Calculator} kicker="The real cost" title="What you will actually pay" sub="Adjust it to your situation. These are government and service fees founders paid in 2026." />
      <div className="rounded-3xl border border-line bg-card p-5 md:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="font-semibold">Iqama</span>
            <select value={transfer} onChange={(e) => setTransfer(Number(e.target.value))} className="mt-1.5 w-full rounded-xl border border-line bg-bg px-3 py-2.5 text-base text-ink">
              {TRANSFER_FEES.map((t, i) => <option key={t.label} value={i}>{t.label}{t.sar ? ` (${sar(t.sar)})` : ""}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-3 self-end rounded-xl border border-line px-3 py-2.5 text-sm">
            <input type="checkbox" checked={chamber} onChange={(e) => setChamber(e.target.checked)} className="size-5 accent-[var(--primary)]" />
            Include Chamber of Commerce (yearly)
          </label>
        </div>
        <ul className="mt-5 divide-y divide-line text-sm">
          {COSTS.filter((c) => !c.optional || chamber).map((c) => (
            <li key={c.id} className="flex items-start justify-between gap-3 py-2.5">
              <span>{c.label}{c.note && <span className="block text-xs text-muted">{c.note}</span>}</span>
              <span className="shrink-0 tabular-nums font-medium">{sar(c.sar ?? 0)}</span>
            </li>
          ))}
          {TRANSFER_FEES[transfer].sar > 0 && (
            <li className="flex justify-between gap-3 py-2.5"><span>Iqama transfer</span><span className="tabular-nums font-medium">{sar(TRANSFER_FEES[transfer].sar)}</span></li>
          )}
        </ul>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-brand p-4 text-white">
            <p className="text-sm text-white/70">Doing it yourself</p>
            <p className="font-heading text-3xl font-bold tabular-nums">{sar(total)}</p>
          </div>
          <div className="rounded-2xl bg-bg-2 p-4">
            <p className="text-sm text-muted">Typical agency quote</p>
            <p className="font-heading text-3xl font-bold tabular-nums">30,000 to 50,000 SAR</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex h-3 overflow-hidden rounded-full bg-bg-2">
            <div className="bg-primary" style={{ width: `${Math.min(100, (total / agencyHigh) * 100)}%` }} />
          </div>
          <p className="mt-2 text-sm text-muted">You keep roughly <b className="text-ink">{sar(Math.max(0, agencyLow - total))}</b> to <b className="text-ink">{sar(Math.max(0, agencyHigh - total))}</b>.</p>
        </div>
      </div>

      <div className="rounded-3xl border border-line bg-card p-5 md:p-6">
        <p className="font-heading text-xl font-bold">The Balady trap: office or first hire?</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Run a service business from home and you may hit a wall at the iqama transfer: the system expects a municipal (Balady) licence, which needs physical premises. There are two ways through.
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {([
            ["office", "Rent a serviced office", "About 4,000 to 5,000 SAR a month. Gives you an address for Balady, but it does not help your Nitaqat rating."],
            ["saudi", "Hire a Saudi employee", "For example 4,000 SAR salary plus about 12% GOSI, so about 4,500 SAR a month. Lifts your Nitaqat within about a week and unblocks the transfer. You will need a Saudi hire to grow anyway."],
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
            ? <>About <b>{sar(monthly)}</b> a month, and it counts towards Saudization. Usually the better choice.</>
            : <>About <b>{sar(monthly)}</b> a month, with no Nitaqat benefit. You will likely still need a Saudi hire later.</>}</p>
        )}
      </div>
      <p className="text-xs text-muted">Fees checked {CHECKED}. The MISA first-year fee has been waived for most investors recently; the standard licence fee is about 62,000 SAR a year. Confirm the current fee on investsaudi.sa before you budget.</p>
    </section>
  );
}

function AfterCr() {
  return (
    <section className="space-y-5">
      <H2 id="after-cr" icon={Landmark} kicker="Week 3 onwards" title="After the CR: simpler than you think" sub="Your CR is the trigger. Three systems open by themselves within about an hour; the rest you do at your own pace." />
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
      <Tip>
        <b>Tax, in short:</b> foreign-owned companies pay 20% corporate income tax on profit. Any Saudi or GCC-owned share pays 2.5% zakat instead. File through ZATCA once a year, and keep simple monthly books from day one.
      </Tip>
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
      <H2 id="mistakes" icon={AlertTriangle} kicker="Avoid these" title="12 mistakes that cost founders time and money" sub="Most of the fixes are free. You just have to know them." />
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
            <tr><th className="p-3" /><th className="p-3">Saudi (MISA company)</th><th className="p-3">UAE (free zone)</th></tr>
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
      <p className="text-sm leading-relaxed text-muted">The UAE wins on tax. Saudi Arabia wins if you are building a life here and selling into the local market. Do not count on the first-year waiver lasting.</p>
    </section>
  );
}

function ActionPlan() {
  const all = PLAN.flatMap((p) => p.items);
  const { ticks, toggle, reset } = useTicks("mesh-company-plan");
  const done = all.filter((i) => ticks.includes(i.id)).length;
  return (
    <section className="space-y-5">
      <H2 id="plan" icon={ListChecks} kicker="Your plan" title="Do it yourself, step by step" sub="Fourteen steps from today to a working company. Tick them off; your progress is saved on this phone." />
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
      <p className="text-sm text-muted">Checked {CHECKED}. This guide is general information from founders who have done it, not legal or tax advice. For anything unusual, speak to a licensed Saudi lawyer or accountant.</p>
    </section>
  );
}
