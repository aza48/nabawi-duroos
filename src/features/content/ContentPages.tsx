import { UniversityCalendar } from "./UniversityCalendar";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BadgePercent, Bell, BookOpen, CalendarDays, ChevronDown, CircleCheck, CircleHelp, Flag, GraduationCap, Languages, Library, Radio, ScrollText } from "lucide-react";
import type { FaqRow, GuideRow } from "@/server/content/queries";
import { FAQ_CATEGORIES, GUIDE_STAGES } from "@/server/content/queries";
import { sanitizeArticleHtml } from "@/lib/sanitize";
import { Breadcrumbs, PageBand, SectionHeader } from "@/components/ui";
import { related, type RelItem } from "@/lib/related";
import { STAGE_ICON } from "@/features/home/HomePage";
import { FaqExplorer } from "./FaqExplorer";
import { GuideBody } from "./GuideBody";
import { enhanceGuideHtml } from "@/lib/guide-html";
import { JsonLd, ORG_ID, breadcrumbs } from "@/components/JsonLd";
import { abs } from "@/lib/site";

const plain = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
import { AskOnWhatsApp, WhatsAppIcon } from "@/components/shell/WhatsApp";
import { AlertsButton } from "@/features/duroos/AlertsButton";
import { EnglishNote } from "@/components/EnglishNote";
import type { Locale } from "@/lib/locale";

const verified = (d: Date | null, locale: Locale = "en") =>
  d
    ? locale === "ar"
      ? `آخر تحقق ${new Intl.DateTimeFormat("ar-SA-u-ca-gregory-nu-latn", { day: "numeric", month: "long", year: "numeric" }).format(d)}`
      : `Last verified ${new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(d)}`
    : null;

const EN = { dir: "ltr", lang: "en" } as const;

const asGuide = (g: GuideRow): RelItem => ({ slug: g.slug, title: g.title, text: g.summary, group: g.stage });
const asFaq = (f: FaqRow): RelItem => ({ slug: f.slug, title: f.question, text: plain(f.answerHtml).slice(0, 400), group: f.category, tags: f.tags });

/** "Related guides" or "Related answers": a short list of links at the end of a page (or in the side rail). */
function RelatedList({ kind, items, locale, rail = false }: { kind: "guides" | "faqs"; items: RelItem[]; locale: Locale; rail?: boolean }) {
  if (!items.length) return null;
  const ar = locale === "ar";
  const guides = kind === "guides";
  const Icon = guides ? BookOpen : CircleHelp;
  const base = `${ar ? "/ar" : ""}/${guides ? "guides" : "ask"}/`;
  return (
    <section aria-labelledby={`rel-${kind}`} className={rail ? "" : "mt-10"}>
      <h2 id={`rel-${kind}`} className="flex items-center gap-2 font-heading text-lg font-bold">
        <Icon size={18} className="text-accent" aria-hidden="true" />
        {guides ? (ar ? "أدلة ذات صلة" : "Related guides") : ar ? "أسئلة ذات صلة" : "Related answers"}
      </h2>
      <ul className={`mt-3 grid gap-2 ${rail || !guides ? "" : "sm:grid-cols-2"}`}>
        {items.map((it) => (
          <li key={it.slug}>
            <Link
              href={base + it.slug}
              className="lift group flex h-full items-start gap-3 rounded-2xl border border-line bg-card p-3.5 transition hover:border-primary/50"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold leading-snug group-hover:text-primary" dir="auto">{it.title}</span>
                {guides && !rail && <span className="mt-1 line-clamp-2 block text-sm text-muted" dir="auto">{it.text}</span>}
              </span>
              <ArrowRight size={16} aria-hidden="true" className={`mt-0.5 shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-primary ${ar ? "rotate-180" : ""}`} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function AskPage({ faqs, whatsappUrl, locale = "en" }: { faqs: FaqRow[]; whatsappUrl: string; locale?: Locale }) {
  const ar = locale === "ar";
  return (
    <>
      {/* Each answer's FAQPage markup lives on its own page only; the list is an ItemList. The Arabic pages canonicalise to English and carry none. */}
      {!ar && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Questions, answered",
            itemListElement: faqs.map((f, i) => ({ "@type": "ListItem", position: i + 1, name: f.question, url: abs(`/ask/${f.slug}`) })),
          }}
        />
      )}
      <PageBand
        title={ar ? "أسئلة وأجوبة" : "Questions, answered"}
        subtitle={ar ? "أجوبة موثّقة لأكثر ما يسأل عنه الطلاب، يحدّثها فريق MESH باستمرار." : "Verified answers to what students ask most, kept up to date by the MESH team."}
      />
      <div className="shell mt-8 md:mt-12">
        {ar && <EnglishNote className="mb-6 max-w-3xl lg:ms-[288px]" />}
        <FaqExplorer items={faqs.map((f) => ({ slug: f.slug, question: f.question, category: f.category }))} categories={FAQ_CATEGORIES} locale={locale} />
        <div className="mt-10 max-w-3xl lg:ms-[288px]">
          <AskOnWhatsApp url={whatsappUrl} locale={locale} />
        </div>
      </div>
    </>
  );
}

function OutdatedNote({ whatsappUrl, locale = "en" }: { whatsappUrl: string; locale?: Locale }) {
  return (
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-6 flex items-center gap-2 text-sm text-muted hover:text-ink">
      <Flag size={14} /> {locale === "ar" ? "معلومة قديمة؟ أخبرنا في مجموعة واتساب." : "Something outdated? Tell us in the WhatsApp group."}
    </a>
  );
}

export function FaqPage({ faq, whatsappUrl, locale = "en", guides = [], faqs = [] }: { faq: FaqRow; whatsappUrl: string; locale?: Locale; guides?: GuideRow[]; faqs?: FaqRow[] }) {
  const ar = locale === "ar";
  const cat = FAQ_CATEGORIES.find((c) => c.id === faq.category);
  const me = asFaq(faq);
  const relFaqs = related(me, faqs.map(asFaq), 4);
  const relGuides = related(me, guides.map(asGuide), 3);
  const askHref = ar ? "/ar/ask" : "/ask";
  return (
    <div className={`shell pt-6 md:pt-10 ${relFaqs.length ? "xl:grid xl:grid-cols-[minmax(0,48rem)_300px] xl:justify-center xl:gap-14" : ""}`}>
    <article className="mx-auto max-w-3xl xl:mx-0">
      {!ar && (
        <JsonLd
          data={[
            { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: plain(faq.answerHtml) } }], dateModified: faq.updatedAt },
            breadcrumbs([["Ask", "/ask"], [faq.question, `/ask/${faq.slug}`]]),
          ]}
        />
      )}
      <Breadcrumbs
        rtl={ar}
        items={[
          [ar ? "الرئيسية" : "Home", ar ? "/ar" : "/"],
          [ar ? "أسئلة وأجوبة" : "Ask", askHref],
          ...(cat ? ([[ar ? cat.labelAr : cat.label, `${askHref}?c=${cat.id}`]] as [string, string][]) : []),
        ]}
      />
      {ar && <EnglishNote className="mt-4" />}
      <div {...(ar ? EN : {})}>
        <h1 className="mt-2 text-3xl font-semibold leading-tight">{faq.question}</h1>
        {verified(faq.lastVerifiedAt) && !ar && (
          <p className="mt-2 flex items-center gap-1.5 text-sm text-on">
            <CircleCheck size={15} /> {verified(faq.lastVerifiedAt)}
          </p>
        )}
        <div className="article mt-5" dangerouslySetInnerHTML={{ __html: sanitizeArticleHtml(faq.answerHtml) }} />
      </div>
      {ar && verified(faq.lastVerifiedAt, "ar") && (
        <p className="mt-4 flex items-center gap-1.5 text-sm text-on">
          <CircleCheck size={15} /> {verified(faq.lastVerifiedAt, "ar")}
        </p>
      )}
      <OutdatedNote whatsappUrl={whatsappUrl} locale={locale} />
      <RelatedList kind="guides" items={relGuides} locale={locale} />
      <div className="xl:hidden">
        <RelatedList kind="faqs" items={relFaqs} locale={locale} />
      </div>
      <div className="mt-10"><AskOnWhatsApp url={whatsappUrl} locale={locale} /></div>
    </article>
    {relFaqs.length > 0 && (
      <aside className="hidden pt-9 xl:sticky xl:top-24 xl:block xl:self-start">
        <RelatedList kind="faqs" items={relFaqs} locale={locale} rail />
      </aside>
    )}
    </div>
  );
}

export function GuidesPage({ guides, locale = "en" }: { guides: GuideRow[]; locale?: Locale }) {
  const ar = locale === "ar";
  const stages = GUIDE_STAGES.map((st) => ({ ...st, label: ar ? st.labelAr : st.label, blurb: ar ? st.blurbAr : st.blurb, items: guides.filter((g) => g.stage === st.id) }));
  return (
    <>
      <PageBand
        title={ar ? "الحياة في المدينة" : "Life in Madinah"}
        subtitle={ar ? "أدلة خطوة بخطوة، من يوم وصول التأشيرة إلى يوم العودة." : "Step-by-step guides, from the day your visa arrives to the day you fly home."}
      >
        <nav aria-label={ar ? "المراحل" : "Stages"} className="mt-8 flex flex-wrap gap-2">
          {stages.map((st) => {
            const Icon = STAGE_ICON[st.id];
            return (
              <a key={st.id} href={`#${st.id}`} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/15 transition hover:bg-white/20">
                <Icon size={16} className="text-gold-bright" /> {st.label}
                <span className="text-white/75 tabular">{st.items.length}</span>
              </a>
            );
          })}
          <Link href={ar ? "/ar/mahad" : "/mahad"} className="inline-flex items-center gap-2 rounded-full bg-gold-bright px-4 py-2 text-sm font-semibold text-brand-deep transition hover:bg-gold">
            {ar ? "دليل المعهد" : <>Ma&apos;had hub</>}
          </Link>
        </nav>
      </PageBand>
      <div className="shell mt-10 space-y-14 md:mt-14">
        {ar && <EnglishNote className="max-w-3xl" />}
        {stages.map((st) => {
          const Icon = STAGE_ICON[st.id];
          return (
            <section key={st.id} id={st.id} className="scroll-mt-24">
              <SectionHeader title={st.label} subtitle={st.blurb} icon={Icon} rtl={ar} />
              {st.items.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-line bg-card p-5 text-sm text-muted">{ar ? "هذا القسم قيد الكتابة. إلى ذلك الحين، اسأل في مجموعة واتساب." : "This section is being written. In the meantime, ask in the WhatsApp group."}</p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {st.items.map((g) => (
                    <Link key={g.slug} href={`${ar ? "/ar" : ""}/guides/${g.slug}`} className="lift group flex flex-col rounded-2xl border border-line bg-card p-5 hover:border-primary/50">
                      <span className="font-heading text-lg font-semibold leading-snug group-hover:text-primary" dir="auto">{g.title}</span>
                      <span className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted" dir="auto">{g.summary}</span>
                      <span className="mt-auto flex items-center gap-3 pt-4 text-xs text-muted">
                        <span className="flex items-center gap-1"><BookOpen size={13} /> {g.readingMinutes} {ar ? "دقائق" : "min"}</span>
                        {g.lastVerifiedAt && <span className="flex items-center gap-1 text-on"><CircleCheck size={13} /> {ar ? "موثّق" : "Verified"}</span>}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}

export function GuidePage({ guide, whatsappUrl, locale = "en", guides = [], faqs = [] }: { guide: GuideRow; whatsappUrl: string; locale?: Locale; guides?: GuideRow[]; faqs?: FaqRow[] }) {
  const ar = locale === "ar";
  const stage = GUIDE_STAGES.find((st) => st.id === guide.stage);
  const stageLabel = ar ? (stage?.labelAr ?? "الأدلة") : (stage?.label ?? "Guides");
  const onPage = ar ? "في هذه الصفحة" : "On this page";
  const Icon = STAGE_ICON[guide.stage] ?? BookOpen;
  const isCalendar = guide.slug === "university-calendar-1448";
  const { html, toc, steps: rawSteps } = enhanceGuideHtml(sanitizeArticleHtml(guide.bodyHtml));
  const steps = isCalendar ? 0 : rawSteps;
  const me = asGuide(guide);
  const relGuides = related(me, guides.map(asGuide), 4);
  const relFaqs = related(me, faqs.map(asFaq), 5);
  const hasToc = toc.length > 1 && !isCalendar;
  // Article only: HowTo rich results were withdrawn, and Article needs an image.
  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    name: guide.title,
    description: guide.summary,
    url: abs(`/guides/${guide.slug}`),
    image: abs(`/guides/${guide.slug}/opengraph-image`),
    inLanguage: "en",
    datePublished: guide.createdAt,
    dateModified: guide.lastVerifiedAt ?? guide.updatedAt,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    about: { "@type": "City", name: "Madinah" },
    timeRequired: `PT${guide.readingMinutes}M`,
  };
  return (
    <>
      {!ar && <JsonLd data={[ld, breadcrumbs([["Guides", "/guides"], [stage?.label ?? "Guides", `/guides#${guide.stage}`], [guide.title, `/guides/${guide.slug}`]])]} />}
      <section className="lattice overflow-hidden bg-brand text-white">
        <div className="shell py-10 md:py-14">
          <div className="flex items-center gap-2">
            <Icon size={15} className="shrink-0 text-gold-bright" aria-hidden="true" />
            <Breadcrumbs
              tone="band"
              rtl={ar}
              items={[
                [ar ? "الرئيسية" : "Home", ar ? "/ar" : "/"],
                [ar ? "الأدلة" : "Guides", `${ar ? "/ar" : ""}/guides`],
                [stageLabel, `${ar ? "/ar" : ""}/guides#${guide.stage}`],
              ]}
            />
          </div>
          <h1 className="mt-3 max-w-4xl font-heading text-4xl font-bold leading-[1.05] md:text-6xl" dir="auto">{guide.title}</h1>
          <p className="mt-4 max-w-2xl text-white/85 md:text-lg" dir="auto">{guide.summary}</p>
          <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/75">
            {!isCalendar && <span className="flex items-center gap-1.5"><BookOpen size={15} /> {ar ? `${guide.readingMinutes} دقائق للقراءة` : `${guide.readingMinutes} min read`}</span>}
            {steps > 0 && <span className="flex items-center gap-1.5"><CircleCheck size={15} /> {ar ? `${steps} خطوات` : `${steps} steps to tick off`}</span>}
            {verified(guide.lastVerifiedAt, locale) && <span className="flex items-center gap-1.5 text-gold-pale"><CircleCheck size={15} /> {verified(guide.lastVerifiedAt, locale)}</span>}
          </p>
        </div>
      </section>
      <div
        className={`shell mt-8 grid gap-10 md:mt-10 ${
          isCalendar ? "" : hasToc ? `lg:grid-cols-[240px_minmax(0,1fr)] ${relFaqs.length ? "xl:grid-cols-[240px_minmax(0,1fr)_280px]" : ""}` : relFaqs.length ? "xl:grid-cols-[minmax(0,1fr)_300px]" : ""
        }`}
      >
        {toc.length > 1 && !isCalendar && (
          <nav aria-label={onPage} className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
            <p className="text-sm font-semibold text-muted">{onPage}</p>
            <ul className="mt-3 space-y-1 border-s border-line">
              {toc.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} dir="auto" className="-ms-px block border-s-2 border-transparent py-1.5 ps-4 text-sm text-muted transition hover:border-primary hover:text-ink">
                    {t.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
        {toc.length > 2 && !isCalendar && (
          <details className="group min-w-0 max-w-full rounded-2xl border border-line bg-card lg:hidden">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 text-sm font-semibold [&::-webkit-details-marker]:hidden">
              {onPage} <span className="text-muted">({toc.length})</span>
              <ChevronDown size={18} className="ms-auto text-muted transition group-open:rotate-180" />
            </summary>
            <ul className="border-t border-line px-2 py-2">
              {toc.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} dir="auto" className="block rounded-lg px-2 py-2.5 text-sm text-muted [overflow-wrap:anywhere] hover:bg-primary/5 hover:text-ink">
                    {t.text}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        )}
        <article className={isCalendar ? "min-w-0" : "min-w-0 max-w-3xl"}>
          {ar && !isCalendar && <EnglishNote className="mb-6" />}
          <div {...(ar && !isCalendar ? EN : {})}>
            {guide.slug === "university-calendar-1448" ? <UniversityCalendar locale={locale} /> : <GuideBody html={html} slug={guide.slug} steps={steps} locale={ar ? "ar" : "en"} />}
          </div>
          <div className={isCalendar ? "max-w-3xl" : undefined}>
            <OutdatedNote whatsappUrl={whatsappUrl} locale={locale} />
            <RelatedList kind="guides" items={relGuides} locale={locale} />
            {relFaqs.length > 0 && (
              <div className={isCalendar ? undefined : "xl:hidden"}>
                <RelatedList kind="faqs" items={relFaqs} locale={locale} />
              </div>
            )}
            <div className="mt-10"><AskOnWhatsApp url={whatsappUrl} locale={locale} /></div>
          </div>
        </article>
        {!isCalendar && relFaqs.length > 0 && (
          <aside className="hidden xl:sticky xl:top-28 xl:block xl:self-start">
            <RelatedList kind="faqs" items={relFaqs} locale={locale} rail />
          </aside>
        )}
      </div>
    </>
  );
}

const RULES = [
  "The group is only for English-speaking Western students",
  "Keep posts relevant: announcements, posts from the scholars of the Sunnah in Madinah, or student-related info only",
  "Share only verified information",
  "No debates or arguments",
  "No spam. Ads only if relevant to students in Madinah",
  "Respect one another",
];

const RULES_AR = [
  "المجموعة خاصة بالطلاب الغربيين الناطقين بالإنجليزية فقط",
  "التزم بموضوع المجموعة: الإعلانات، ومنشورات علماء السنة في المدينة، وما يخص الطلاب فقط",
  "لا تنشر إلا معلومة موثّقة",
  "لا جدال ولا خصومات",
  "لا رسائل مزعجة، والإعلانات فقط إن كانت تهم طلاب المدينة",
  "احترموا بعضكم بعضًا",
];

export function MorePage({ whatsappUrl, locale = "en" }: { whatsappUrl: string; locale?: Locale }) {
  const ar = locale === "ar";
  const tiles = ar
    ? [
        { href: "/ar/programs", label: "الدراسة في المدينة", note: "معاهد العربية والدرجات الجامعية ومراكز الأخوات", icon: GraduationCap },
        { href: "/ar/library", label: "المكتبة", note: "مقررات الجامعة وكتب المعهد", icon: Library },
        { href: "/ar/discounts", label: "خصومات الطلاب", note: "عيادات ومدارس ونوادٍ وتأجير سيارات وغيرها", icon: BadgePercent },
        { href: "/ar/duroos/schedule", label: "جدول الأسبوع", note: "كل الدروس في كل المساجد في جدول واحد", icon: CalendarDays },
        { href: "/ar/duroos/live", label: "البث المباشر", note: "تابع دروس الحرم مباشرة", icon: Radio },
        { href: "/ar/duroos/updates", label: "آخر التحديثات", note: "الإلغاءات والكتب الجديدة والمحاضرات", icon: ScrollText },
        { href: "/more", label: "English", note: "هذه الصفحة بالإنجليزية", icon: Languages },
      ]
    : [
        { href: "/programs", label: "Study in Madinah", note: "Arabic institutes, degrees and sisters' marakiz", icon: GraduationCap },
        { href: "/library", label: "Jamiah library", note: "Muqarrarat and Ma'had books", icon: Library },
        { href: "/discounts", label: "Student discounts", note: "Clinics, schools, gyms, car rental and more", icon: BadgePercent },
        { href: "/duroos/schedule", label: "Weekly schedule", note: "Every dars, every masjid, in one grid", icon: CalendarDays },
        { href: "/duroos/live", label: "Live streams", note: "Watch the Haram duroos live", icon: Radio },
        { href: "/duroos/updates", label: "Duroos updates", note: "Cancellations, new books, lectures", icon: ScrollText },
        { href: "/ar", label: "MESH بالعربية", note: "The site in Arabic", icon: Languages },
      ];
  return (
    <>
      <PageBand
        title={ar ? "المزيد من MESH" : "More from MESH"}
        subtitle={ar ? "التنبيهات والجدول والبث المباشر، وما تقوم عليه المجموعة." : "Alerts, the schedule, livestreams, and what the group is about."}
      />
      <div className="shell mt-10 md:mt-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map(({ href, label, note, icon: Icon }) => (
            <Link key={href} href={href} className="lift group rounded-2xl border border-line bg-card p-5 hover:border-primary/50">
              <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary transition group-hover:bg-primary group-hover:text-primary-ink">
                <Icon size={20} />
              </span>
              <span className="mt-4 block font-heading text-lg font-semibold">{label}</span>
              <span className="mt-1 block text-sm text-muted">{note}</span>
            </Link>
          ))}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <section id="alerts" className="rounded-3xl border border-line bg-card p-6 md:p-8">
            <span className="grid size-11 place-items-center rounded-2xl bg-gold-bg text-gold"><Bell size={21} /></span>
            <h2 className="mt-4 font-heading text-2xl font-bold">{ar ? "تنبيهات الجوال" : "Phone alerts"}</h2>
            <p className="mt-1 text-muted">{ar ? "مجانية وبلا حساب. لمتابعة شيخ بعينه، استخدم الزر في صفحته." : "Free, no account. To follow one shaykh, use the button on his page."}</p>
            <AlertsButton topic="daily" locale={locale} label={ar ? "ملخص الصباح: دروس اليوم وتغييراتها" : "Morning brief: today's duroos and changes"} />
            <AlertsButton topic="all" locale={locale} label={ar ? "كل إلغاء وكل تغيير" : "Every cancellation and change"} />
          </section>

          <div className="space-y-10">
            <section id="about">
              <h2 className="font-heading text-2xl font-bold">{ar ? "عن MESH" : "About MESH"}</h2>
              {ar ? (
                <p className="mt-3 leading-relaxed">
                  MESH (ملتقى الطلاب الناطقين بالإنجليزية في المدينة) يديره طلاب لخدمة الطلاب الناطقين بالإنجليزية في المدينة المنورة.
                  الإعلانات والفعاليات والمساعدة اليومية في مجموعة واتساب، وهذا الموقع يجمع الأجوبة الموثّقة والأدلة وجدول الدروس المباشر في مكان واحد.
                </p>
              ) : (
                <p className="mt-3 leading-relaxed">
                  MESH (Medina English Student Hub) is run by students, for English-speaking students in Madinah.
                  Announcements, events and everyday help happen in the WhatsApp group. This website keeps the verified
                  answers, the guides and the live duroos schedule in one place.
                </p>
              )}
            </section>
            <section id="rules">
              <h2 className="font-heading text-2xl font-bold">{ar ? "قواعد المجموعة" : "Group rules"}</h2>
              <ul className="mt-3 grid gap-2">
                {(ar ? RULES_AR : RULES).map((r) => (
                  <li key={r} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold-bright" />
                    {r}
                  </li>
                ))}
              </ul>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-wa px-5 py-3 font-semibold text-wa-ink transition hover:brightness-105">
                <WhatsAppIcon size={18} /> {ar ? "انضم لمجموعة MESH" : "Join the MESH group"} <ArrowUpRight size={16} className="rtl:-scale-x-100" />
              </a>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
