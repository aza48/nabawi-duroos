/**
 * The company guide, rendered on the server. Only the interactive parts (tick lists, the
 * situation tabs, the type finder, the phase accordion and the cost calculator) are client
 * islands, in islands.tsx, and each gets just the slice of content it needs.
 */

import {
  AlertTriangle, ArrowUpRight, BadgeCheck, Banknote, Calculator, CalendarClock, Check, ChevronDown, CircleCheck,
  Compass, FileText, Flag, Globe2, Landmark, ListChecks, Newspaper, Receipt, Rocket, Star, Users, UserCheck,
} from "lucide-react";
import {
  APOSTILLE, APOSTILLE_RULE, BANK_ASK, BANK_DOCS, BANKS, CHANGES_2025, CHECKED, DOCS_HOME, DOCS_KSA, FAMILY, FIT, GLOSSARY,
  GROW, HOME_TAX, LINKS, NITAQAT, NOT_FREELANCE, PATHS, PHASES, PITFALLS, PLAN, PREMIUM, RUNNING, SETUP_COSTS, SITUATIONS,
  TAX, TRANSFER_FEES, US_TAX, YEARLY,
} from "./content";
import { Checklist, CostCalculator, PhaseAccordion, PlanChecklist, SituationTabs, TypeFinder } from "./islands";
import { Card, Tip, sar } from "./ui";

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
        <Type />
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
  return (
    <section className="space-y-5">
      <H2 id="situation" icon={Users} kicker="Your situation" title="Where are you today?" sub="Choose the closest. It changes how you get your iqama, not how you register." />
      <SituationTabs situations={SITUATIONS} />
    </section>
  );
}

function Type() {
  return (
    <section className="space-y-5">
      <H2 id="type" icon={BadgeCheck} kicker="Your company" title="What type of company?" sub="What you sell decides the rules you follow." />
      <TypeFinder paths={PATHS} />
    </section>
  );
}

function Phases() {
  return (
    <section className="space-y-5">
      <H2 id="phases" icon={Compass} kicker="Step by step" title="The four phases" sub="Each phase unlocks the next. Tap one to see what happens and what to watch for." />
      <PhaseAccordion phases={PHASES} />
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
  return (
    <section className="space-y-5">
      <H2 id="cost" icon={Calculator} kicker="Money" title="What it costs" sub="Rounded figures from 2026. Adjust them to your situation." />
      <CostCalculator setupCosts={SETUP_COSTS} transferFees={TRANSFER_FEES} yearly={YEARLY} />
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
  return (
    <section className="space-y-5">
      <H2 id="plan" icon={ListChecks} kicker="Your checklist" title="From idea to open" sub="Every step in one list. Your progress is saved on this phone." />
      <PlanChecklist plan={PLAN} />
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
