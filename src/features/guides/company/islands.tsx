"use client";

/**
 * The interactive parts of the company guide. Each island receives only its own slice of the
 * content as props, so the 28 KB of guide copy stays in the server-rendered HTML and never
 * ships as JavaScript.
 */

import { useEffect, useMemo, useState } from "react";
import { Check, ChevronDown, CircleCheck, RotateCcw } from "lucide-react";
import type { Locale } from "@/lib/locale";
import type { Cost, Path, Phase, Situation } from "./content";
import { Card, Tip, num, sar } from "./ui";

type Answer = { home?: boolean; what?: "services" | "goods" | "making" | "profession" | "property" };
type What = NonNullable<Answer["what"]>;

/** Every fixed string in the islands, in both languages. Amounts come from the content, so the notes are functions. */
export const ISLAND_TEXT = {
  en: {
    of: (done: number, total: number) => `${done} of ${total}`,
    progress: (done: number, total: number) => `${done}/${total}`,
    reset: "Reset",
    resetChecklist: "Reset checklist",
    situationTabs: "Your situation",
    first: "First",
    residency: "Your residency",
    homeQ: "Do you already own a registered company in your home country?",
    yes: "Yes",
    no: "No",
    whatQ: "What will the Saudi company mostly do?",
    what: [
      ["services", "Services or online work"],
      ["goods", "Sell physical products"],
      ["making", "Make products"],
      ["profession", "A licensed profession"],
      ["property", "Property"],
    ] as [What, string][],
    bestFit: "Best fit",
    goodFor: "Good for",
    capital: "Money in the company",
    needs: "You will need",
    noHome: "With no company at home, you can register a simple one there first, ask MISA about the personal route, or approach a Saudi startup programme.",
    answerBoth: "Answer both to see your best fit.",
    settingUp: "Setting up",
    yourIqama: "Your iqama",
    iqamaTransfer: "Iqama transfer",
    chamber: "Chamber of Commerce",
    chamberFree: "Free for 3 years",
    roughSetup: "Roughly, to set up",
    agencies: "Agencies typically charge several times this for the same steps.",
    everyYear: "Every year",
    forget: "The costs people forget to plan for.",
    familyMembers: "Family members on your iqama",
    saudiEmployees: "Saudi employees",
    fewer: (label: string) => `Fewer ${label}`,
    more: (label: string) => `More ${label}`,
    renewal: "Your iqama renewal",
    levy: "Work permit levy",
    levyNote: (monthly: number) => `About ${sar(monthly)} a month per foreign worker, usually including you`,
    muqeem: "Muqeem subscription",
    familyFee: "Family fee",
    familyFeeNote: (monthly: number) => `${sar(monthly)} a month each`,
    saudiStaff: "Saudi staff",
    saudiStaffNote: `At ${sar(4000)} a month each, plus about 12% GOSI`,
    accountant: "Accountant, health insurance",
    quotes: "Get quotes",
    roughYear: "Roughly each year",
    mabrook: "Mabrook. Your company is open.",
  },
  ar: {
    of: (done: number, total: number) => `${num(done, "ar")} من ${num(total, "ar")}`,
    progress: (done: number, total: number) => `${num(done, "ar")} من ${num(total, "ar")}`,
    reset: "إعادة",
    resetChecklist: "إعادة القائمة",
    situationTabs: "وضعك الحالي",
    first: "أولًا",
    residency: "إقامتك",
    homeQ: "هل تملك شركة مسجلة في بلدك؟",
    yes: "نعم",
    no: "لا",
    whatQ: "ما النشاط الأساسي للشركة السعودية؟",
    what: [
      ["services", "خدمات أو عمل عبر الإنترنت"],
      ["goods", "بيع منتجات ملموسة"],
      ["making", "تصنيع منتجات"],
      ["profession", "مهنة مرخصة"],
      ["property", "العقار"],
    ] as [What, string][],
    bestFit: "الأنسب لك",
    goodFor: "يناسب",
    capital: "رأس المال",
    needs: "ستحتاج إلى",
    noHome: "إن لم تكن لديك شركة في بلدك، فسجّل شركة بسيطة هناك أولًا، أو اسأل وزارة الاستثمار عن المسار الشخصي، أو تواصل مع أحد برامج ريادة الأعمال السعودية.",
    answerBoth: "أجب عن السؤالين لترى الأنسب لك.",
    settingUp: "التأسيس",
    yourIqama: "إقامتك",
    iqamaTransfer: "نقل الإقامة",
    chamber: "الغرفة التجارية",
    chamberFree: "مجانًا لثلاث سنوات",
    roughSetup: "تكلفة التأسيس تقريبًا",
    agencies: "تتقاضى مكاتب الخدمات عادةً أضعاف هذا المبلغ على الخطوات نفسها.",
    everyYear: "كل سنة",
    forget: "تكاليف ينساها كثيرون عند التخطيط.",
    familyMembers: "أفراد الأسرة على إقامتك",
    saudiEmployees: "الموظفون السعوديون",
    fewer: (label: string) => `إنقاص العدد: ${label}`,
    more: (label: string) => `زيادة العدد: ${label}`,
    renewal: "تجديد إقامتك",
    levy: "المقابل المالي لرخصة العمل",
    levyNote: (monthly: number) => `نحو ${sar(monthly, "ar")} شهريًا عن كل عامل أجنبي، وأنت منهم عادةً`,
    muqeem: "اشتراك مقيم",
    familyFee: "رسوم المرافقين",
    familyFeeNote: (monthly: number) => `${sar(monthly, "ar")} شهريًا عن كل فرد`,
    saudiStaff: "الموظفون السعوديون",
    saudiStaffNote: `براتب ${sar(4000, "ar")} شهريًا لكل موظف، يضاف إليه نحو ${num(12, "ar")}٪ للتأمينات الاجتماعية`,
    accountant: "المحاسب والتأمين الصحي",
    quotes: "اطلب عروض أسعار",
    roughYear: "التكلفة السنوية تقريبًا",
    mabrook: "مبارك، شركتك جاهزة للعمل.",
  },
} satisfies Record<Locale, unknown>;

/** A set of ticked ids remembered in this browser. */
function useTicks(baseKey: string, locale: Locale) {
  const key = locale === "ar" ? `${baseKey}.ar` : baseKey;
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

export function Checklist({ storageKey, items, locale = "en" }: { storageKey: string; items: { id: string; title: string; body: string }[]; locale?: Locale }) {
  const t = ISLAND_TEXT[locale];
  const { ticks, toggle, reset } = useTicks(storageKey, locale);
  const done = items.filter((i) => ticks.includes(i.id)).length;
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-bg-2">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(done / items.length) * 100}%` }} />
        </div>
        <span className="text-sm tabular-nums text-muted">{t.of(done, items.length)}</span>
        {done > 0 && <button onClick={reset} className="flex items-center gap-1 text-xs text-muted hover:text-ink"><RotateCcw size={13} /> {t.reset}</button>}
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

export function SituationTabs({ situations, locale = "en" }: { situations: Situation[]; locale?: Locale }) {
  const t = ISLAND_TEXT[locale];
  const [pick, setPick] = useState(situations[0].id);
  const s = situations.find((x) => x.id === pick)!;
  return (
    <>
      <div role="tablist" aria-label={t.situationTabs} className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {situations.map((x) => (
          <button key={x.id} role="tab" aria-selected={pick === x.id} onClick={() => setPick(x.id)}
            className={`rounded-2xl border p-3.5 text-start text-sm font-semibold leading-snug transition ${pick === x.id ? "border-primary bg-primary text-primary-ink shadow-md" : "border-line bg-card hover:border-primary/50"}`}>
            {x.label}
          </button>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <Card title={t.first}>{s.first}</Card>
        <Card title={t.residency}>{s.residency}</Card>
      </div>
      {s.warn && <Tip tone="warn">{s.warn}</Tip>}
    </>
  );
}

export function TypeFinder({ paths, locale = "en" }: { paths: Path[]; locale?: Locale }) {
  const t = ISLAND_TEXT[locale];
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
        <p className="font-semibold">{t.homeQ}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button className={opt(a.home === true)} onClick={() => setA({ ...a, home: true })}>{t.yes}</button>
          <button className={opt(a.home === false)} onClick={() => setA({ ...a, home: false })}>{t.no}</button>
        </div>
      </div>
      <div>
        <p className="font-semibold">{t.whatQ}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {t.what.map(([k, label]) => (
            <button key={k} className={opt(a.what === k)} onClick={() => setA({ ...a, what: k })}>{label}</button>
          ))}
        </div>
      </div>
      {p ? (
        <div className="rounded-2xl bg-brand p-5 text-white" aria-live="polite">
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-pale rtl:tracking-normal">{t.bestFit}</p>
          <p className="mt-1 font-heading text-3xl font-bold">{p.name}</p>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <div><dt className="text-white/60">{t.goodFor}</dt><dd className="mt-0.5">{p.bestFor}</dd></div>
            <div><dt className="text-white/60">{t.capital}</dt><dd className="mt-0.5">{p.capital}</dd></div>
            <div className="sm:col-span-2"><dt className="text-white/60">{t.needs}</dt><dd className="mt-0.5">{p.needs}</dd></div>
          </dl>
          {p.note && <p className="mt-4 rounded-xl bg-white/10 p-3 text-sm">{p.note}</p>}
          {a.home === false && p.id !== "startup" && (
            <p className="mt-3 rounded-xl bg-white/10 p-3 text-sm">{t.noHome}</p>
          )}
        </div>
      ) : (
        <p className="text-sm text-muted">{t.answerBoth}</p>
      )}
    </div>
  );
}

export function PhaseAccordion({ phases, locale = "en" }: { phases: Phase[]; locale?: Locale }) {
  const [open, setOpen] = useState(0);
  return (
    <ol className="space-y-3">
      {phases.map((ph, i) => {
        const on = open === i;
        return (
          <li key={ph.id} className={`overflow-hidden rounded-3xl border transition ${on ? "border-primary bg-card shadow-md" : "border-line bg-card"}`}>
            <button onClick={() => setOpen(on ? -1 : i)} aria-expanded={on} className="flex w-full items-center gap-4 p-4 text-start md:p-5">
              <span className={`grid size-11 shrink-0 place-items-center rounded-2xl font-heading text-lg font-bold ${on ? "bg-primary text-primary-ink" : "bg-primary-soft text-primary"}`}>{num(i + 1, locale)}</span>
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

export function CostCalculator({ setupCosts, transferFees, yearly: Y, locale = "en" }: { setupCosts: Cost[]; transferFees: { label: string; sar: number }[]; yearly: Yearly; locale?: Locale }) {
  const t = ISLAND_TEXT[locale];
  const money = (n: number) => sar(n, locale);
  const [transfer, setTransfer] = useState(0);
  const [family, setFamily] = useState(0);
  const [saudis, setSaudis] = useState(0);
  const setup = setupCosts.reduce((t, c) => t + c.sar, 0) + transferFees[transfer].sar;
  const saudiYear = saudis * 4000 * 12 * 1.12;
  const yearly = Y.iqama + Y.levyMonthly * 12 + Y.muqeem + family * Y.dependantMonthly * 12;
  return (
    <>
      <div className="rounded-3xl border border-line bg-card p-5 md:p-6">
        <p className="font-heading text-xl font-bold">{t.settingUp}</p>
        <label className="mt-4 block text-sm">
          <span className="font-semibold">{t.yourIqama}</span>
          <select value={transfer} onChange={(e) => setTransfer(Number(e.target.value))} className="mt-1.5 w-full rounded-xl border border-line bg-bg px-3 py-2.5 text-base text-ink">
            {transferFees.map((f, i) => <option key={f.label} value={i}>{f.label}{f.sar ? ` (${money(f.sar)})` : ""}</option>)}
          </select>
        </label>
        <ul className="mt-4 divide-y divide-line text-sm">
          {setupCosts.map((c) => (
            <li key={c.id} className="flex items-start justify-between gap-3 py-2.5">
              <span>{c.label}{c.note && <span className="block text-xs text-muted">{c.note}</span>}</span>
              <span className="shrink-0 tabular-nums font-medium">≈ {money(c.sar)}</span>
            </li>
          ))}
          {transferFees[transfer].sar > 0 && (
            <li className="flex justify-between gap-3 py-2.5"><span>{t.iqamaTransfer}</span><span className="tabular-nums font-medium">{money(transferFees[transfer].sar)}</span></li>
          )}
          <li className="flex justify-between gap-3 py-2.5 text-muted"><span>{t.chamber}</span><span>{t.chamberFree}</span></li>
        </ul>
        <div className="mt-4 rounded-2xl bg-brand p-4 text-white">
          <p className="text-sm text-white/70">{t.roughSetup}</p>
          <p className="font-heading text-3xl font-bold tabular-nums">{money(setup)}</p>
          <p className="mt-1 text-xs text-white/70">{t.agencies}</p>
        </div>
      </div>

      <div className="rounded-3xl border border-line bg-card p-5 md:p-6">
        <p className="font-heading text-xl font-bold">{t.everyYear}</p>
        <p className="mt-1 text-sm text-muted">{t.forget}</p>
        {([
          [t.familyMembers, family, setFamily, 12],
          [t.saudiEmployees, saudis, setSaudis, 10],
        ] as const).map(([label, val, set, max]) => (
          <div key={label} className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-line px-3 py-2.5 text-sm">
            <span className="font-semibold">{label}</span>
            <span className="flex items-center gap-2">
              <button onClick={() => set((n) => Math.max(0, n - 1))} aria-label={t.fewer(label)} className="grid size-9 place-items-center rounded-full border border-line text-lg">−</button>
              <span className="w-6 text-center text-base font-semibold tabular-nums">{num(val, locale)}</span>
              <button onClick={() => set((n) => Math.min(max, n + 1))} aria-label={t.more(label)} className="grid size-9 place-items-center rounded-full border border-line text-lg">+</button>
            </span>
          </div>
        ))}
        <ul className="mt-3 divide-y divide-line text-sm">
          <li className="flex justify-between gap-3 py-2.5"><span>{t.renewal}</span><span className="tabular-nums font-medium">{money(Y.iqama)}</span></li>
          <li className="flex justify-between gap-3 py-2.5"><span>{t.levy}<span className="block text-xs text-muted">{t.levyNote(Y.levyMonthly)}</span></span><span className="shrink-0 tabular-nums font-medium">{money(Y.levyMonthly * 12)}</span></li>
          <li className="flex justify-between gap-3 py-2.5"><span>{t.muqeem}</span><span className="tabular-nums font-medium">≈ {money(Y.muqeem)}</span></li>
          {family > 0 && <li className="flex justify-between gap-3 py-2.5"><span>{t.familyFee}<span className="block text-xs text-muted">{t.familyFeeNote(Y.dependantMonthly)}</span></span><span className="shrink-0 tabular-nums font-medium">{money(family * Y.dependantMonthly * 12)}</span></li>}
          {saudis > 0 && <li className="flex justify-between gap-3 py-2.5"><span>{t.saudiStaff}<span className="block text-xs text-muted">{t.saudiStaffNote}</span></span><span className="shrink-0 tabular-nums font-medium">≈ {money(Math.round(saudiYear))}</span></li>}
          <li className="flex justify-between gap-3 py-2.5 text-muted"><span>{t.accountant}</span><span>{t.quotes}</span></li>
        </ul>
        <div className="mt-4 rounded-2xl bg-gold-bg p-4">
          <p className="text-sm text-muted">{t.roughYear}</p>
          <p className="font-heading text-3xl font-bold tabular-nums">{money(Math.round(yearly + saudiYear))}</p>
        </div>
      </div>
    </>
  );
}

type PlanPhase = { phase: string; items: { id: string; title: string; body: string }[] };

export function PlanChecklist({ plan, locale = "en" }: { plan: PlanPhase[]; locale?: Locale }) {
  const t = ISLAND_TEXT[locale];
  const all = plan.flatMap((p) => p.items);
  const { ticks, toggle, reset } = useTicks("mesh-company-checklist", locale);
  const done = all.filter((i) => ticks.includes(i.id)).length;
  return (
    <>
      <div className="sticky top-16 z-10 -mx-1 rounded-2xl border border-line bg-card/95 p-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-bg-2">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(done / all.length) * 100}%` }} />
          </div>
          <span className="text-sm font-semibold tabular-nums">{t.progress(done, all.length)}</span>
          {done > 0 && <button onClick={reset} aria-label={t.resetChecklist} className="text-muted hover:text-ink"><RotateCcw size={15} /></button>}
        </div>
        {done === all.length && <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-on"><CircleCheck size={16} /> {t.mabrook}</p>}
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
