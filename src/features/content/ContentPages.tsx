import { UniversityCalendar } from "./UniversityCalendar";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BadgePercent, Bell, BookOpen, CalendarDays, ChevronDown, CircleCheck, CircleHelp, Compass, FileText, GraduationCap, KeyRound, Landmark, Languages, Library, MessageCircleQuestion, Plane, Radio, ScrollText, Users } from "lucide-react";
import type { FaqRow, GuideRow } from "@/server/content/queries";
import { FAQ_CATEGORIES } from "@/server/content/queries";
import { OLD_ANCHORS, groupGuides, topicById, topicOf, type GuideTopicId } from "@/lib/guide-topics";
import { sanitizeArticleHtml } from "@/lib/sanitize";
import { Breadcrumbs, PageBand, SectionHeader } from "@/components/ui";
import { related, type RelItem } from "@/lib/related";
import { FaqExplorer } from "./FaqExplorer";
import { GuideBody } from "./GuideBody";
import { enhanceGuideHtml } from "@/lib/guide-html";
import { JsonLd, ORG_ID, breadcrumbs } from "@/components/JsonLd";
import { abs } from "@/lib/site";

const plain = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
import { WhatsAppIcon } from "@/components/shell/WhatsApp";
import { AdminHelp } from "@/components/shell/AdminHelp";
import { AlertsButton } from "@/features/duroos/AlertsButton";
import { EnglishNote } from "@/components/EnglishNote";
import { faqText, guideText, textAttrs } from "@/lib/arabic-content";
import type { Locale } from "@/lib/locale";
import { TextSizeControl } from "@/components/shell/TextSize";
import { ThemeToggle } from "@/components/shell/ThemeToggle";
import { PrintFooter } from "@/components/shell/PrintFooter";
import { arCount, arDigits } from "@/lib/arabic-count";

const verified = (d: Date | null, locale: Locale = "en") =>
  d
    ? locale === "ar"
      ? `آخر تحقق ${new Intl.DateTimeFormat("ar-SA-u-ca-gregory-nu-latn", { day: "numeric", month: "long", year: "numeric" }).format(d)}`
      : `Last verified ${new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(d)}`
    : null;

const asGuide = (g: GuideRow): RelItem => ({ slug: g.slug, title: g.title, text: g.summary, group: topicOf(g) });

const TOPIC_ICON: Record<GuideTopicId, typeof BookOpen> = {
  "getting-started": Plane,
  papers: FileText,
  home: KeyRound,
  study: GraduationCap,
  "more-study": Library,
  haram: Landmark,
  family: Users,
  explore: Compass,
};
const asFaq = (f: FaqRow): RelItem => ({ slug: f.slug, title: f.question, text: plain(f.answerHtml).slice(0, 400), group: f.category, tags: f.tags });

/** Related items keep their English matching but show the Arabic title and summary where a translation exists. */
function localRel(items: RelItem[], kind: "guides" | "faqs", guides: GuideRow[], faqs: FaqRow[], locale: Locale): RelItem[] {
  if (locale !== "ar") return items;
  if (kind === "guides") {
    const by = new Map(guides.map((g) => [g.slug, guideText(g, locale)]));
    return items.map((it) => { const t = by.get(it.slug); return t ? { ...it, title: t.title, text: t.summary ?? it.text } : it; });
  }
  const by = new Map(faqs.map((f) => [f.slug, faqText(f, locale)]));
  return items.map((it) => { const t = by.get(it.slug); return t ? { ...it, title: t.question } : it; });
}

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

/** `whatsappUrl` is no longer used: help goes to Admin, never to the group. Kept optional for older callers. */
export function AskPage({ faqs, locale = "en" }: { faqs: FaqRow[]; whatsappUrl?: string; locale?: Locale }) {
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
        {ar && faqs.some((f) => !faqText(f, locale).answerInArabic) && <EnglishNote className="mb-6 max-w-3xl lg:ms-[288px]" />}
        <FaqExplorer items={faqs.map((f) => ({ slug: f.slug, question: faqText(f, locale).question, category: f.category }))} categories={FAQ_CATEGORIES} locale={locale} />
        <div className="mt-10 max-w-3xl lg:ms-[288px]">
          <AdminHelp locale={locale} kind="question" />
        </div>
      </div>
    </>
  );
}

export function FaqPage({ faq, locale = "en", guides = [], faqs = [] }: { faq: FaqRow; whatsappUrl?: string; locale?: Locale; guides?: GuideRow[]; faqs?: FaqRow[] }) {
  const ar = locale === "ar";
  const cat = FAQ_CATEGORIES.find((c) => c.id === faq.category);
  const ft = faqText(faq, locale);
  const me = asFaq(faq);
  const relFaqs = localRel(related(me, faqs.map(asFaq), 4), "faqs", guides, faqs, locale);
  const relGuides = localRel(related(me, guides.map(asGuide), 3), "guides", guides, faqs, locale);
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
      {ar && !ft.answerInArabic && <EnglishNote className="mt-4" />}
      <div>
        <h1 className="mt-2 text-3xl font-semibold leading-tight" {...textAttrs(ft.questionInArabic, locale)}>{ft.question}</h1>
        {verified(faq.lastVerifiedAt) && !ar && (
          <p className="mt-2 flex items-center gap-1.5 text-sm text-on">
            <CircleCheck size={15} /> {verified(faq.lastVerifiedAt)}
          </p>
        )}
        <div className="article mt-5" {...textAttrs(ft.answerInArabic, locale)} dangerouslySetInnerHTML={{ __html: sanitizeArticleHtml(ft.answerHtml) }} />
      </div>
      {ar && verified(faq.lastVerifiedAt, "ar") && (
        <p className="mt-4 flex items-center gap-1.5 text-sm text-on">
          <CircleCheck size={15} /> {verified(faq.lastVerifiedAt, "ar")}
        </p>
      )}
      <AdminHelp locale={locale} className="mt-6" />
      <RelatedList kind="guides" items={relGuides} locale={locale} />
      <div className="xl:hidden">
        <RelatedList kind="faqs" items={relFaqs} locale={locale} />
      </div>
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
  const topics = groupGuides(guides)
    .map((t) => ({ ...t, label: ar ? t.labelAr : t.label, blurb: ar ? t.blurbAr : t.blurb }))
    .filter((t) => t.items.length > 0);
  const aliases = (id: GuideTopicId) => Object.entries(OLD_ANCHORS).filter(([, to]) => to === id).map(([from]) => from);
  return (
    <>
      <PageBand
        title={ar ? "الحياة في المدينة" : "Life in Madinah"}
        subtitle={ar ? "أدلة خطوة بخطوة، مرتبة حسب ما تحتاج إليه: من التقديم والوصول إلى الدراسة والأسرة والتعرف على المدينة." : "Step-by-step guides, grouped by what you need: from applying and arriving to study, family life and getting to know the city."}
      >
        {/* One swipeable row on phones, wrapped on wider screens. */}
        <nav aria-label={ar ? "المواضيع" : "Topics"} className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [scrollbar-width:none]">
          {topics.map((t) => {
            const Icon = TOPIC_ICON[t.id];
            return (
              <a key={t.id} href={`#${t.id}`} className="inline-flex min-h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/15 transition hover:bg-white/20">
                <Icon size={16} className="text-gold-bright" /> {t.label}
                <span className="text-white/75 tabular">{ar ? arDigits(t.items.length) : t.items.length}</span>
              </a>
            );
          })}
          <Link href={ar ? "/ar/mahad" : "/mahad"} className="inline-flex min-h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-gold-bright px-4 py-2 text-sm font-semibold text-brand-deep transition hover:bg-gold">
            {ar ? "دليل المعهد" : <>Ma&apos;had hub</>}
          </Link>
        </nav>
      </PageBand>
      <div className="shell mt-10 space-y-14 md:mt-14">
        {ar && guides.some((g) => !guideText(g, locale).bodyInArabic) && <EnglishNote className="max-w-3xl" />}
        {topics.map((t, i) => {
          const Icon = TOPIC_ICON[t.id];
          return (
            <section key={t.id} id={t.id} className="scroll-mt-24">
              {aliases(t.id).map((a) => <span key={a} id={a} className="block scroll-mt-24" aria-hidden />)}
              <SectionHeader title={t.label} subtitle={t.blurb} icon={Icon} rtl={ar} />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {t.items.map((g, n) => (
                  <Link key={g.slug} href={`${ar ? "/ar" : ""}/guides/${g.slug}`} className="lift group flex flex-col rounded-2xl border border-line bg-card p-5 hover:border-primary/50">
                    {i === 0 && <span className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent">{ar ? `الخطوة ${arDigits(n + 1)}` : `Step ${n + 1}`}</span>}
                    <span className="font-heading text-lg font-semibold leading-snug group-hover:text-primary" dir="auto">{guideText(g, locale).title}</span>
                    <span className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted" dir="auto">{guideText(g, locale).summary}</span>
                    <span className="mt-auto flex items-center gap-3 pt-4 text-xs text-muted">
                      <span className="flex items-center gap-1"><BookOpen size={13} /> {ar ? arCount(guideText(g, locale).readingMinutes, "minute", { one: "bare" }) : `${g.readingMinutes} min`}</span>
                      {g.lastVerifiedAt && <span className="flex items-center gap-1 text-on"><CircleCheck size={13} /> {ar ? "موثّق" : "Verified"}</span>}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
        <Link
          href={ar ? "/ar/assistant" : "/assistant"}
          className="lift flex flex-wrap items-center gap-4 rounded-2xl border border-primary/30 bg-primary-soft p-5 md:p-6"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-ink"><MessageCircleQuestion size={22} /></span>
          <span className="min-w-0 flex-1">
            <span className="block font-heading text-lg font-semibold">{ar ? "لم تجد ما تبحث عنه؟" : "Can't find what you need?"}</span>
            <span className="block text-sm text-muted">{ar ? "اسأل مساعد MESH، فهو يبحث في كل الأدلة والأسئلة وجدول الدروس." : "Ask the Meshaykh. It searches every guide, answer and the duroos schedule for you."}</span>
          </span>
          <ArrowRight size={18} className="shrink-0 text-primary rtl:rotate-180" />
        </Link>
      </div>
    </>
  );
}

export function GuidePage({ guide, locale = "en", guides = [], faqs = [] }: { guide: GuideRow; whatsappUrl?: string; locale?: Locale; guides?: GuideRow[]; faqs?: FaqRow[] }) {
  const ar = locale === "ar";
  const topic = topicById(topicOf(guide));
  const stageLabel = ar ? topic.labelAr : topic.label;
  const onPage = ar ? "في هذه الصفحة" : "On this page";
  const Icon = TOPIC_ICON[topic.id] ?? BookOpen;
  const isCalendar = guide.slug === "university-calendar-1448";
  const gt = guideText(guide, locale);
  const { html, toc, steps: rawSteps } = enhanceGuideHtml(sanitizeArticleHtml(gt.bodyHtml));
  const steps = isCalendar ? 0 : rawSteps;
  const me = asGuide(guide);
  const relGuides = localRel(related(me, guides.map(asGuide), 4), "guides", guides, faqs, locale);
  const relFaqs = localRel(related(me, faqs.map(asFaq), 5), "faqs", guides, faqs, locale);
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
      {!ar && <JsonLd data={[ld, breadcrumbs([["Guides", "/guides"], [topic.label, `/guides#${topic.id}`], [guide.title, `/guides/${guide.slug}`]])]} />}
      <section className="lattice overflow-hidden bg-brand text-white" data-print-band>
        <div className="shell py-10 md:py-14">
          <div className="flex items-center gap-2" data-noprint>
            <Icon size={15} className="shrink-0 text-gold-bright" aria-hidden="true" />
            <Breadcrumbs
              tone="band"
              rtl={ar}
              items={[
                [ar ? "الرئيسية" : "Home", ar ? "/ar" : "/"],
                [ar ? "الأدلة" : "Guides", `${ar ? "/ar" : ""}/guides`],
                [stageLabel, `${ar ? "/ar" : ""}/guides#${topic.id}`],
              ]}
            />
          </div>
          <h1 className="mt-3 max-w-4xl font-heading text-4xl font-bold leading-[1.05] md:text-6xl" dir="auto">{gt.title}</h1>
          <p className="mt-4 max-w-2xl text-white/85 md:text-lg" dir="auto">{gt.summary}</p>
          <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/75">
            {!isCalendar && <span className="flex items-center gap-1.5"><BookOpen size={15} /> {ar ? `${arCount(gt.readingMinutes, "minute", { one: "bare" })} للقراءة` : `${guide.readingMinutes} min read`}</span>}
            {steps > 0 && <span className="flex items-center gap-1.5"><CircleCheck size={15} /> {ar ? arCount(steps, "step") : `${steps} ${steps === 1 ? "step" : "steps"} to tick off`}</span>}
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
          <nav aria-label={onPage} data-noprint className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
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
          <details className="group min-w-0 max-w-full rounded-2xl border border-line bg-card lg:hidden" data-noprint>
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 text-sm font-semibold [&::-webkit-details-marker]:hidden">
              {onPage} <span className="text-muted">({ar ? arDigits(toc.length) : toc.length})</span>
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
          {ar && !isCalendar && !gt.bodyInArabic && <EnglishNote className="mb-6 print:hidden" />}
          <div {...(ar && !isCalendar ? textAttrs(gt.bodyInArabic, locale) : {})} data-print-guide={isCalendar ? undefined : ""}>
            {guide.slug === "university-calendar-1448" ? <UniversityCalendar locale={locale} /> : <GuideBody html={html} slug={gt.bodyInArabic ? `${guide.slug}.ar` : guide.slug} steps={steps} locale={ar ? "ar" : "en"} />}
          </div>
          <div className={isCalendar ? "max-w-3xl" : undefined} data-noprint>
            <AdminHelp locale={locale} className="mt-6" />
            <RelatedList kind="guides" items={relGuides} locale={locale} />
            {relFaqs.length > 0 && (
              <div className={isCalendar ? undefined : "xl:hidden"}>
                <RelatedList kind="faqs" items={relFaqs} locale={locale} />
              </div>
            )}
          </div>
          <PrintFooter path={`${ar ? "/ar" : ""}/guides/${guide.slug}`} locale={locale} />
        </article>
        {!isCalendar && relFaqs.length > 0 && (
          <aside data-noprint className="hidden xl:sticky xl:top-28 xl:block xl:self-start">
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

        <section id="display" aria-labelledby="display-title" className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-line bg-card p-5 md:p-6">
          <span>
            <h2 id="display-title" className="font-heading text-xl font-bold">{ar ? "حجم الخط والمظهر" : "Text size and theme"}</h2>
            <span className="mt-0.5 block text-sm text-muted">{ar ? "يُحفظ على هذا الهاتف." : "Saved on this phone."}</span>
          </span>
          <span className="flex items-center gap-3">
            <TextSizeControl locale={locale} />
            <ThemeToggle label={ar ? "تبديل المظهر" : "Switch light / dark"} />
          </span>
        </section>

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
                  الإعلانات والفعاليات في مجموعة واتساب، وهذا الموقع يجمع الأجوبة الموثّقة والأدلة وجدول الدروس المباشر في مكان واحد. ولأي سؤال أو تصحيح راسل المشرف على واتساب أو على البريد الإلكتروني <span dir="ltr">mesh@albaseerah.org</span>.
                </p>
              ) : (
                <p className="mt-3 leading-relaxed">
                  MESH (Medina English Student Hub) is run by students, for English-speaking students in Madinah.
                  Announcements and events happen in the WhatsApp group. This website keeps the verified answers, the
                  guides and the live duroos schedule in one place. For any question or correction, message Admin on WhatsApp or email mesh@albaseerah.org.
                </p>
              )}
              <AdminHelp locale={locale} kind="question" className="mt-4" />
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
