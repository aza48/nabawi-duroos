/**
 * The company guide, rendered on the server. Only the interactive parts (tick lists, the
 * situation tabs, the type finder, the phase accordion and the cost calculator) are client
 * islands, in islands.tsx, and each gets just the slice of content it needs.
 * The same component renders the English page and the Arabic one: `locale` picks content.ts or
 * content-ar.ts, and GUIDE_TEXT holds the fixed strings in both languages.
 */

import {
  AlertTriangle, ArrowUpRight, BadgeCheck, Banknote, Calculator, CalendarClock, Check, ChevronDown, CircleCheck,
  Compass, FileText, Flag, Globe2, Landmark, ListChecks, Newspaper, Receipt, Rocket, Star, Users, UserCheck,
} from "lucide-react";
import { arCount, type ArNoun } from "@/lib/arabic-count";
import type { Locale } from "@/lib/locale";
import { Checklist, CostCalculator, PhaseAccordion, PlanChecklist, SituationTabs, TypeFinder } from "./islands";
import { checkedOn, companyContent, type CompanyContent } from "./locale";
import { Card, Tip, num, sar } from "./ui";

type SectionId =
  | "fit" | "changes" | "situation" | "type" | "phases" | "documents" | "cost" | "nitaqat" | "bank" | "family"
  | "running" | "tax" | "home-tax" | "premium" | "pitfalls" | "plan" | "glossary";

type Head = { kicker: string; title: string; sub?: string };

/** Any Arabic letter. A title with none, such as "FBAR (FinCEN 114)", is isolated on the Arabic page so its closing bracket stays in place. */
const ARABIC = /[\u0600-\u06FF]/;

const PHASE_AR: ArNoun = { one: "مرحلة", two: { nom: "مرحلتان", obl: "مرحلتين" }, few: "مراحل", many: "مرحلة", gender: "f" };

/** Every fixed string on the page, in both languages. The guide's own copy lives in content.ts and content-ar.ts. */
export const GUIDE_TEXT = {
  en: {
    onThisPage: "On this page",
    sectionsNav: "Sections",
    sections: [
      ["fit", "Is it right for you?"],
      ["changes", "The 2025 rules"],
      ["situation", "Your situation"],
      ["type", "Type of company"],
      ["phases", "The four phases"],
      ["documents", "Documents"],
      ["cost", "What it costs"],
      ["nitaqat", "Saudization"],
      ["bank", "Your bank"],
      ["family", "Your family"],
      ["running", "Running it"],
      ["tax", "Saudi taxes"],
      ["home-tax", "Taxes back home"],
      ["premium", "Premium Residency"],
      ["pitfalls", "Pitfalls"],
      ["plan", "Your checklist"],
      ["glossary", "Words and links"],
    ] as [SectionId, string][],
    intro1: <>Owning a small Saudi company is one of the few ways a Western resident can sponsor their own iqama, and their family&apos;s, without depending on an employer. The process is long but not mysterious: a set of government portals, used in the right order.</>,
    intro2: "This guide follows that order, from the papers you prepare at home to the yearly tasks once you are trading. It is written for people who will do most of it themselves, and it explains every Saudi term in plain English.",
    statSetup: "to set up, before any iqama transfer",
    statTime: "2 to 3 months",
    statTimeSmall: "from paperwork at home to a working bank account",
    statPhases: "4 phases",
    statPhasesSmall: "prepare, register, switch on, settle",
    head: {
      fit: { kicker: "Start here", title: "Is a company right for you?", sub: "Tick what applies. Five ticks means you are ready to plan." },
      changes: { kicker: "Up to date", title: "The 2025 rules", sub: "The system changed in 2025. If a website, video or agency describes something different, it may be out of date." },
      situation: { kicker: "Your situation", title: "Where are you today?", sub: "Choose the closest. It changes how you get your iqama, not how you register." },
      type: { kicker: "Your company", title: "What type of company?", sub: "What you sell decides the rules you follow." },
      phases: { kicker: "Step by step", title: "The four phases", sub: "Each phase unlocks the next. Tap one to see what happens and what to watch for." },
      documents: { kicker: "Paperwork", title: "Documents", sub: "Two lists: what you prepare at home, and what you finish in Saudi Arabia. Ticks are saved on this phone." },
      cost: { kicker: "Money", title: "What it costs", sub: "Rounded figures from 2026. Adjust them to your situation." },
      nitaqat: { kicker: "Hiring", title: "Saudization (Nitaqat), explained", sub: "The rule that surprises most new owners." },
      bank: { kicker: "Banking", title: "Choosing your bank", sub: "Experience depends more on the branch and the officer than on the bank. Apply to two at once." },
      family: { kicker: "Family", title: "Bringing your family", sub: "Once your own iqama is issued, your company can sponsor your wife and children." },
      running: { kicker: "After you open", title: "Running your company", sub: "The rhythm of a small Saudi company, by month, quarter and year." },
      tax: { kicker: "Saudi taxes", title: "What your company pays", sub: "ZATCA, the Saudi tax authority, opens your file automatically." },
      "home-tax": { kicker: "Your home country", title: "Taxes back home", sub: "Sort this out before you move, not after." },
      premium: { kicker: "Another route", title: "Premium Residency", sub: "Residency with no employer or company sponsor, and no monthly worker or family fees." },
      pitfalls: { kicker: "Avoid these", title: "Pitfalls, phase by phase" },
      plan: { kicker: "Your checklist", title: "From idea to open", sub: "Every step in one list. Your progress is saved on this phone." },
      glossary: { kicker: "Reference", title: "Words you will meet, and where to go" },
    } as Record<SectionId, Head>,
    phasesNote: "Most people take 2 to 3 months in total. Having documents ready before you start is what makes it fast.",
    atHome: "At home",
    apostilleHow: "How apostilles work",
    apostilleNote: "Not sure about your country? Check the members list linked at the bottom of this page. Non-members go through the Saudi embassy instead, which takes longer.",
    inKsa: "In Saudi Arabia",
    feesChecked: (d: string) => `Fees checked ${d}. Government fees change; confirm each one on the portal before paying.`,
    bankAsk: "Questions to ask before you apply",
    banksNote: "Banks offering business accounts, listed alphabetically. MESH is not connected to any of them.",
    bring: "What to bring",
    bankTip: "The General Manager signs in person, with original documents. Plan to be in the Kingdom for it.",
    growing: "Growing",
    usTitle: "The exception: US citizens",
    usSub: "Moving abroad does not end US filings, and owning a foreign company adds forms from the first year.",
    taxTip: <>Whatever your passport, speak to a tax adviser who works with people abroad <b>before</b> you set up.</>,
    premiumNote: "Each category has an application fee and its own conditions. For most students and graduates, a small company is the realistic first step.",
    checkedNote: (d: string) => `Checked ${d}. General information, not legal or tax advice. For anything unusual, speak to a licensed Saudi lawyer or accountant.`,
  },
  ar: {
    onThisPage: "في هذه الصفحة",
    sectionsNav: "الأقسام",
    sections: [
      ["fit", "هل يناسبك؟"],
      ["changes", "أنظمة ٢٠٢٥"],
      ["situation", "وضعك"],
      ["type", "نوع الشركة"],
      ["phases", "المراحل الأربع"],
      ["documents", "المستندات"],
      ["cost", "التكاليف"],
      ["nitaqat", "السعودة"],
      ["bank", "البنك"],
      ["family", "أسرتك"],
      ["running", "إدارة الشركة"],
      ["tax", "الضرائب في السعودية"],
      ["home-tax", "الضرائب في بلدك"],
      ["premium", "الإقامة المميزة"],
      ["pitfalls", "أخطاء شائعة"],
      ["plan", "قائمتك"],
      ["glossary", "المصطلحات والروابط"],
    ] as [SectionId, string][],
    intro1: "امتلاك شركة سعودية صغيرة من الطرق القليلة التي يكفل بها المقيم الغربي إقامته وإقامة أسرته بنفسه، دون الاعتماد على صاحب عمل. الطريق طويل لكنه واضح: مجموعة من المنصات الحكومية تُستخدم بالترتيب الصحيح.",
    intro2: "يسير هذا الدليل على ذلك الترتيب، من الأوراق التي تجهزها في بلدك إلى المهام السنوية بعد بدء النشاط. وهو مكتوب لمن سينجز أكثر الخطوات بنفسه، ويشرح كل مصطلح سعودي بلغة واضحة.",
    statSetup: "للتأسيس، قبل أي نقل للإقامة",
    statTime: "من شهرين إلى ٣ أشهر",
    statTimeSmall: "من أوراقك في بلدك إلى حساب بنكي يعمل",
    statPhases: arCount(4, PHASE_AR),
    statPhasesSmall: "التجهيز والتسجيل والتفعيل والاستقرار",
    head: {
      fit: { kicker: "ابدأ من هنا", title: "هل تناسبك الشركة؟", sub: "اختر ما ينطبق عليك. خمس علامات تعني أنك جاهز للتخطيط." },
      changes: { kicker: "محدّث", title: "أنظمة ٢٠٢٥", sub: "تغيّر النظام في ٢٠٢٥. وأي موقع أو مقطع أو مكتب يصف غير ذلك فمعلوماته قديمة." },
      situation: { kicker: "وضعك", title: "أين أنت اليوم؟", sub: "اختر الأقرب إلى حالك. يغيّر ذلك طريقة حصولك على الإقامة، لا طريقة التسجيل." },
      type: { kicker: "شركتك", title: "أي نوع من الشركات؟", sub: "ما تبيعه يحدد الأنظمة التي تتبعها." },
      phases: { kicker: "خطوة بخطوة", title: "المراحل الأربع", sub: "كل مرحلة تفتح الطريق للتي بعدها. اضغط على أي مرحلة لترى ما يحدث فيها وما تنتبه له." },
      documents: { kicker: "الأوراق", title: "المستندات", sub: "قائمتان: ما تجهزه في بلدك، وما تكمله في السعودية. علاماتك محفوظة على هذا الهاتف." },
      cost: { kicker: "المال", title: "التكاليف", sub: "أرقام تقريبية لعام ٢٠٢٦. عدّلها بحسب وضعك." },
      nitaqat: { kicker: "التوظيف", title: "السعودة (نطاقات) بوضوح", sub: "النظام الذي يفاجئ أكثر أصحاب الشركات الجدد." },
      bank: { kicker: "البنوك", title: "اختيار البنك", sub: "التجربة تعتمد على الفرع والموظف أكثر من البنك نفسه. قدّم في بنكين معًا." },
      family: { kicker: "الأسرة", title: "استقدام أسرتك", sub: "بعد صدور إقامتك، تستطيع شركتك أن تكفل زوجتك وأولادك." },
      running: { kicker: "بعد الافتتاح", title: "إدارة شركتك", sub: "ما تفعله الشركة السعودية الصغيرة كل شهر وكل ربع سنة وكل سنة." },
      tax: { kicker: "الضرائب في السعودية", title: "ما تدفعه شركتك", sub: "تفتح هيئة الزكاة والضريبة والجمارك ملفك تلقائيًا." },
      "home-tax": { kicker: "بلدك", title: "الضرائب في بلدك", sub: "رتّب هذا قبل انتقالك، لا بعده." },
      premium: { kicker: "طريق آخر", title: "الإقامة المميزة", sub: "إقامة بلا صاحب عمل ولا شركة كفيلة، وبلا رسوم شهرية عن العمال أو المرافقين." },
      pitfalls: { kicker: "تجنّب هذه", title: "أخطاء شائعة، مرحلة بمرحلة" },
      plan: { kicker: "قائمتك", title: "من الفكرة إلى الافتتاح", sub: "كل الخطوات في قائمة واحدة. تقدمك محفوظ على هذا الهاتف." },
      glossary: { kicker: "مرجع", title: "مصطلحات ستمر بها، وأين تذهب" },
    } as Record<SectionId, Head>,
    phasesNote: "يستغرق الأمر عند أكثر الناس من شهرين إلى ٣ أشهر. وتجهيز المستندات قبل البدء هو ما يجعله سريعًا.",
    atHome: "في بلدك",
    apostilleHow: "كيف يعمل التصديق (الأبوستيل)",
    apostilleNote: "هل بلدك عضو في الاتفاقية؟ راجع قائمة الدول الأعضاء في الروابط أسفل هذه الصفحة. أما مستندات الدول غير الأعضاء فتمر عبر السفارة السعودية، وذلك يستغرق وقتًا أطول.",
    inKsa: "في السعودية",
    feesChecked: (d: string) => `آخر مراجعة للرسوم ${d}. الرسوم الحكومية تتغير، فتأكد من كل رسم في المنصة قبل الدفع.`,
    bankAsk: "أسئلة تطرحها قبل التقديم",
    banksNote: "بنوك تقدم حسابات للشركات، والترتيب لا يعني تفضيلًا. ولا صلة لـ MESH بأي منها.",
    bring: "ما تحضره معك",
    bankTip: "يوقّع المدير العام بنفسه وبالمستندات الأصلية، فخطط لتكون داخل المملكة حينها.",
    growing: "النمو",
    usTitle: "الاستثناء: المواطنون الأمريكيون",
    usSub: "الانتقال إلى الخارج لا ينهي الإقرارات الأمريكية، وامتلاك شركة أجنبية يضيف نماذج من السنة الأولى.",
    taxTip: <>أيًّا كان جوازك، استشر مستشارًا ضريبيًا يعمل مع المقيمين في الخارج <b>قبل</b> التأسيس.</>,
    premiumNote: "لكل فئة رسوم تقديم وشروط خاصة بها. وبالنسبة لأكثر الطلاب والخريجين، فالشركة الصغيرة هي الخطوة الأولى الواقعية.",
    checkedNote: (d: string) => `آخر مراجعة ${d}. هذه معلومات عامة وليست استشارة قانونية أو ضريبية. وفي الحالات غير المعتادة، استشر محاميًا أو محاسبًا سعوديًا مرخصًا.`,
  },
} satisfies Record<Locale, unknown>;

type Text = (typeof GUIDE_TEXT)[Locale];
/** What every section needs: the content, the fixed strings and the language. */
type P = { c: CompanyContent; t: Text; locale: Locale };

export function CompanyGuide({ footer, locale = "en" }: { footer?: React.ReactNode; locale?: Locale }) {
  const p: P = { c: companyContent(locale), t: GUIDE_TEXT[locale], locale };
  const { t } = p;
  return (
    <div className="shell mt-8 grid gap-10 md:mt-10 lg:grid-cols-[220px_minmax(0,1fr)]">
      <nav aria-label={t.onThisPage} className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
        <p className="text-sm font-semibold text-muted">{t.onThisPage}</p>
        <ul className="mt-3 space-y-1 border-s border-line">
          {t.sections.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="-ms-px block border-s-2 border-transparent py-1.5 ps-4 text-sm text-muted transition hover:border-primary hover:text-ink">{label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="min-w-0 max-w-3xl space-y-16">
        <nav aria-label={t.sectionsNav} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:hidden">
          {t.sections.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="shrink-0 rounded-full border border-line bg-card px-3.5 py-2 text-sm font-medium text-muted">{label}</a>
          ))}
        </nav>

        <Intro {...p} />
        <Fit {...p} />
        <Changes {...p} />
        <Situation {...p} />
        <Type {...p} />
        <Phases {...p} />
        <Documents {...p} />
        <Costs {...p} />
        <Nitaqat {...p} />
        <Bank {...p} />
        <Family {...p} />
        <Running {...p} />
        <Taxes {...p} />
        <HomeTax {...p} />
        <Premium {...p} />
        <Pitfalls {...p} />
        <Plan {...p} />
        <Glossary {...p} />
        {footer}
      </div>
    </div>
  );
}

function H2({ id, icon: Icon, t }: { id: SectionId; icon: typeof Compass; t: Text }) {
  const { kicker, title, sub } = t.head[id];
  return (
    <header id={id} className="scroll-mt-28">
      <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gold rtl:tracking-normal"><Icon size={16} /> {kicker}</p>
      <h2 className="mt-1 font-heading text-3xl font-bold leading-tight md:text-4xl">{title}</h2>
      {sub && <p className="mt-2 text-muted md:text-lg">{sub}</p>}
    </header>
  );
}

function Intro({ c, t, locale }: P) {
  const setup = c.SETUP_COSTS.reduce((sum, x) => sum + x.sar, 0);
  return (
    <section className="space-y-5">
      <p className="text-lg leading-relaxed">
        {t.intro1}
      </p>
      <p className="leading-relaxed text-muted">
        {t.intro2}
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { big: `≈ ${sar(Math.round(setup / 1000) * 1000, locale)}`, small: t.statSetup, icon: Banknote },
          { big: t.statTime, small: t.statTimeSmall, icon: CalendarClock },
          { big: t.statPhases, small: t.statPhasesSmall, icon: Compass },
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

function Fit({ c, t, locale }: P) {
  return (
    <section className="space-y-5">
      <H2 id="fit" icon={UserCheck} t={t} />
      <Checklist storageKey="mesh-company-fit" items={c.FIT} locale={locale} />
      <Tip>{c.NOT_FREELANCE}</Tip>
    </section>
  );
}

function Changes({ c, t }: P) {
  return (
    <section className="space-y-5">
      <H2 id="changes" icon={Newspaper} t={t} />
      <div className="grid gap-3 sm:grid-cols-2">
        {c.CHANGES_2025.map((x) => (
          <div key={x.title} className="rounded-2xl border border-primary/30 bg-primary-soft p-4">
            <p className="flex items-center gap-2 font-semibold"><CircleCheck size={17} className="text-primary" /> {x.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed">{x.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Situation({ c, t, locale }: P) {
  return (
    <section className="space-y-5">
      <H2 id="situation" icon={Users} t={t} />
      <SituationTabs situations={c.SITUATIONS} locale={locale} />
    </section>
  );
}

function Type({ c, t, locale }: P) {
  return (
    <section className="space-y-5">
      <H2 id="type" icon={BadgeCheck} t={t} />
      <TypeFinder paths={c.PATHS} locale={locale} />
    </section>
  );
}

function Phases({ c, t, locale }: P) {
  return (
    <section className="space-y-5">
      <H2 id="phases" icon={Compass} t={t} />
      <PhaseAccordion phases={c.PHASES} locale={locale} />
      <p className="text-sm text-muted">{t.phasesNote}</p>
    </section>
  );
}

function Documents({ c, t, locale }: P) {
  return (
    <section className="space-y-5">
      <H2 id="documents" icon={FileText} t={t} />
      <h3 className="font-heading text-xl font-bold">{t.atHome}</h3>
      <Checklist storageKey="mesh-company-docs-home" items={c.DOCS_HOME} locale={locale} />
      <details className="group rounded-2xl border border-line bg-card">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 font-semibold [&::-webkit-details-marker]:hidden">
          {t.apostilleHow} <ChevronDown size={18} className="text-muted transition group-open:rotate-180" />
        </summary>
        <p className="border-t border-line p-4 text-sm leading-relaxed">{c.APOSTILLE_RULE}</p>
        <ul className="divide-y divide-line border-t border-line text-sm">
          {c.APOSTILLE.map((x) => (
            <li key={x.who} className="p-4"><b>{x.who}</b><p className="mt-1 leading-relaxed text-muted">{x.how}</p></li>
          ))}
          <li className="p-4 text-muted">{t.apostilleNote}</li>
        </ul>
      </details>
      <h3 className="pt-2 font-heading text-xl font-bold">{t.inKsa}</h3>
      <Checklist storageKey="mesh-company-docs-ksa" items={c.DOCS_KSA} locale={locale} />
    </section>
  );
}

function Costs({ c, t, locale }: P) {
  return (
    <section className="space-y-5">
      <H2 id="cost" icon={Calculator} t={t} />
      <CostCalculator setupCosts={c.SETUP_COSTS} transferFees={c.TRANSFER_FEES} yearly={c.YEARLY} locale={locale} />
      <p className="text-xs text-muted">{t.feesChecked(checkedOn(locale))}</p>
    </section>
  );
}

function Nitaqat({ c, t }: P) {
  return (
    <section className="space-y-5">
      <H2 id="nitaqat" icon={Landmark} t={t} />
      <div className="grid gap-3 sm:grid-cols-2">
        {c.NITAQAT.map((n) => <Card key={n.title} title={n.title}>{n.body}</Card>)}
      </div>
    </section>
  );
}

function Bank({ c, t, locale }: P) {
  return (
    <section className="space-y-5">
      <H2 id="bank" icon={Banknote} t={t} />
      <div className="rounded-3xl border border-line bg-card p-5 md:p-6">
        <p className="font-semibold">{t.bankAsk}</p>
        <ul className="mt-3 space-y-2 text-sm">
          {c.BANK_ASK.map((q) => <li key={q} className="flex gap-2"><CircleCheck size={16} className="mt-0.5 shrink-0 text-primary" />{q}</li>)}
        </ul>
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {c.BANKS.map((b) => (
          <div key={b.name} className="rounded-2xl border border-line bg-card p-3.5">
            <p className="text-sm font-semibold">{b.name}</p>
            <p className="text-xs text-muted">{b.type}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-muted">{t.banksNote}</p>
      <h3 className="pt-2 font-heading text-xl font-bold">{t.bring}</h3>
      <Checklist storageKey="mesh-company-bank-docs" items={c.BANK_DOCS.map((d, i) => ({ id: `b${i}`, ...d }))} locale={locale} />
      <Tip>{t.bankTip}</Tip>
    </section>
  );
}

function Family({ c, t }: P) {
  return (
    <section className="space-y-5">
      <H2 id="family" icon={Users} t={t} />
      <ul className="space-y-2">
        {c.FAMILY.map((f) => (
          <li key={f} className="flex gap-3 rounded-2xl border border-line bg-card p-4 text-sm leading-relaxed"><CircleCheck size={17} className="mt-0.5 shrink-0 text-primary" />{f}</li>
        ))}
      </ul>
    </section>
  );
}

function Running({ c, t }: P) {
  return (
    <section className="space-y-5">
      <H2 id="running" icon={CalendarClock} t={t} />
      <div className="grid gap-3 sm:grid-cols-2">
        {c.RUNNING.map((r) => (
          <div key={r.when} className="rounded-2xl border border-line bg-card p-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-gold rtl:tracking-normal">{r.when}</p>
            <ul className="mt-2 space-y-2 text-sm leading-relaxed">
              {r.items.map((it) => <li key={it} className="flex gap-2"><Check size={15} className="mt-1 shrink-0 text-primary" />{it}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <h3 className="pt-2 font-heading text-xl font-bold">{t.growing}</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {c.GROW.map((g) => <Card key={g.title} title={<span className="flex items-center gap-2"><Rocket size={15} className="text-primary" />{g.title}</span>}>{g.body}</Card>)}
      </div>
    </section>
  );
}

function Taxes({ c, t }: P) {
  return (
    <section className="space-y-5">
      <H2 id="tax" icon={Receipt} t={t} />
      <div className="grid gap-3 sm:grid-cols-2">
        {c.TAX.map((x) => <Card key={x.title} title={x.title}>{x.body}</Card>)}
      </div>
    </section>
  );
}

function HomeTax({ c, t, locale }: P) {
  return (
    <section className="space-y-5">
      <H2 id="home-tax" icon={Flag} t={t} />
      <div className="grid gap-3 sm:grid-cols-2">
        {c.HOME_TAX.map((x) => <Card key={x.title} title={x.title}>{x.body}</Card>)}
      </div>
      <div className="rounded-3xl border border-amber/40 bg-amber-bg p-5 md:p-6">
        <p className="font-heading text-xl font-bold">{t.usTitle}</p>
        <p className="mt-1 text-sm text-muted">{t.usSub}</p>
        <ol className="mt-4 space-y-2">
          {c.US_TAX.map((x, i) => (
            <li key={x.title} className="flex gap-3 rounded-2xl bg-card p-4">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-ink">{num(i + 1, locale)}</span>
              <span><b className="block">{locale === "ar" && !ARABIC.test(x.title) ? <bdi>{x.title}</bdi> : x.title}</b><span className="mt-1 block text-sm leading-relaxed text-muted">{x.body}</span></span>
            </li>
          ))}
        </ol>
      </div>
      <Tip>{t.taxTip}</Tip>
    </section>
  );
}

function Premium({ c, t }: P) {
  return (
    <section className="space-y-5">
      <H2 id="premium" icon={Star} t={t} />
      <div className="grid gap-3 sm:grid-cols-2">
        {c.PREMIUM.map((x) => <Card key={x.name} title={x.name}>{x.body}</Card>)}
      </div>
      <p className="text-sm text-muted">{t.premiumNote}</p>
    </section>
  );
}

function Pitfalls({ c, t }: P) {
  const groups = [...new Set(c.PITFALLS.map((x) => x.phase))];
  return (
    <section className="space-y-5">
      <H2 id="pitfalls" icon={AlertTriangle} t={t} />
      {groups.map((g) => (
        <div key={g}>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-gold rtl:tracking-normal">{g}</p>
          <ul className="space-y-2">
            {c.PITFALLS.filter((x) => x.phase === g).map((x) => (
              <li key={x.title} className="rounded-2xl border border-line bg-card p-4">
                <p className="font-semibold">{x.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{x.body}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

function Plan({ c, t, locale }: P) {
  return (
    <section className="space-y-5">
      <H2 id="plan" icon={ListChecks} t={t} />
      <PlanChecklist plan={c.PLAN} locale={locale} />
    </section>
  );
}

function Glossary({ c, t, locale }: P) {
  return (
    <section className="space-y-5">
      <H2 id="glossary" icon={Globe2} t={t} />
      <dl className="grid gap-2 sm:grid-cols-2">
        {c.GLOSSARY.map((g) => (
          <div key={g.term} className="rounded-2xl border border-line bg-card p-4">
            <dt className="font-semibold">{g.term}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted">{g.def}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-wrap gap-2">
        {c.LINKS.map((l) => (
          <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-4 py-2 text-sm font-semibold transition hover:border-primary hover:text-primary">
            {l.label} <ArrowUpRight size={14} className="rtl:-scale-x-100" />
          </a>
        ))}
      </div>
      <p className="text-sm text-muted">{t.checkedNote(checkedOn(locale))}</p>
    </section>
  );
}
