import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronDown, FileText, GraduationCap, Landmark, type LucideIcon, Sun, Wallet } from "lucide-react";
import { PageBand, SectionHeader } from "@/components/ui";
import { JsonLd, ORG_ID, breadcrumbs } from "@/components/JsonLd";
import { GLOSSARY, GLOSSARY_GROUPS, termsIn, type GlossaryGroup, type GlossaryHref, type GlossaryTerm } from "@/content/glossary";
import { toArabicDigits, type Locale } from "@/lib/locale";
import { abs } from "@/lib/site";
import { HELP_CONTACT_DEFAULT, whatsappLink } from "@/server/settings";

const GROUP_ICON: Record<GlossaryGroup, LucideIcon> = {
  papers: FileText,
  university: GraduationCap,
  money: Wallet,
  daily: Sun,
  haram: Landmark,
};

/** The page copy in both languages. The terms' meanings stay in English on both pages. */
export const GLOSSARY_COPY = {
  en: {
    metaTitle: "Glossary of local words",
    metaDescription:
      "Iqama, Jawazat, Nafath, Ejar, ta'jeel, mukafa'ah and the other words students and families meet in Madinah, in plain English with the Arabic spelling.",
    title: "Words you will hear in Madinah",
    subtitle: (n: number) => `${n} local words in plain English, from iqama and Nafath to ta'jeel and mukafa'ah, each with its Arabic spelling and a page that explains more.`,
    groups: "Jump to a group",
    index: "All words, A to Z",
    read: { guides: "Read the guide", ask: "Read the answer", programs: "See the programme", mahad: "Open the Ma'had hub" },
    helpTitle: "Missing a word?",
    help: "Please message Admin on WhatsApp at",
    breadcrumb: "Glossary",
  },
  ar: {
    metaTitle: "مسرد الكلمات المحلية",
    metaDescription: "الإقامة والجوازات ونفاذ وإيجار والتأجيل والاعتذار والمكافأة وغيرها من الكلمات التي تمر بالطلاب والأسر في المدينة المنورة، مع شرح موجز بالإنجليزية.",
    title: "كلمات تسمعها في المدينة",
    subtitle: (n: number) => `${toArabicDigits(n)} كلمة محلية بإملائها العربي، مع شرح موجز بالإنجليزية ورابط إلى صفحة تفصّلها.`,
    groups: "انتقل إلى مجموعة",
    index: "كل الكلمات مرتبة",
    read: { guides: "اقرأ الدليل", ask: "اقرأ الإجابة", programs: "تفاصيل البرنامج", mahad: "افتح دليل المعهد" },
    helpTitle: "لم تجد كلمة؟",
    help: "راسل المشرف على واتساب:",
    breadcrumb: "المسرد",
  },
};

export function glossaryMetadata(locale: Locale): Metadata {
  const t = GLOSSARY_COPY[locale];
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates:
      locale === "ar"
        ? { canonical: "/ar/glossary", languages: { en: "/glossary", ar: "/ar/glossary" } }
        : { canonical: "/glossary", languages: { en: "/glossary", ar: "/ar/glossary", "x-default": "/glossary" } },
  };
}

const readKind = (href: GlossaryHref) => (href === "/mahad" ? "mahad" : (href.split("/")[1] as "guides" | "ask" | "programs"));

/** Sorting name: "The Haram" files under H. */
const sortName = (t: GlossaryTerm) => t.term.replace(/^the\s+/i, "");

/** Arabic sorting name: the article ال is ignored, as in a dictionary, so الجوازات files under ج. */
const arSortName = (t: GlossaryTerm) => t.ar.replace(/^ال/, "");

/** Every term in alphabetical order: by the English name, or by the Arabic spelling on the Arabic page. */
export function glossaryIndex(locale: Locale): GlossaryTerm[] {
  return [...GLOSSARY].sort((a, b) =>
    locale === "ar" ? arSortName(a).localeCompare(arSortName(b), "ar") : sortName(a).localeCompare(sortName(b), "en"),
  );
}

function TermCard({ t, locale }: { t: GlossaryTerm; locale: Locale }) {
  const ar = locale === "ar";
  const c = GLOSSARY_COPY[locale];
  return (
    <article
      id={t.id}
      className="flex scroll-mt-28 flex-col rounded-2xl border border-line bg-card p-5 transition target:border-primary target:ring-2 target:ring-primary/25"
    >
      {ar ? (
        <header>
          <h3 lang="ar" className="font-arabic text-2xl font-bold leading-snug text-primary">{t.ar}</h3>
          <p lang="en" dir="auto" className="mt-0.5 text-sm font-semibold text-muted">{t.term}</p>
        </header>
      ) : (
        <header className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h3 className="font-heading text-xl font-bold leading-snug">{t.term}</h3>
          <span lang="ar" dir="rtl" className="font-arabic text-xl leading-snug text-primary">{t.ar}</span>
        </header>
      )}
      <p lang="en" dir="auto" className="mt-2 leading-relaxed">{t.meaning}</p>
      <p lang="en" dir="auto" className="mt-2 text-sm leading-relaxed text-muted">{t.use}</p>
      {t.href && (
        <Link
          href={`${ar ? "/ar" : ""}${t.href}`}
          className="group mt-auto inline-flex items-center gap-1.5 self-start pt-4 text-sm font-semibold text-primary hover:underline"
        >
          {c.read[readKind(t.href)]}
          <ArrowRight size={15} aria-hidden="true" className="transition group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
        </Link>
      )}
    </article>
  );
}

function IndexList({ locale, className = "" }: { locale: Locale; className?: string }) {
  const ar = locale === "ar";
  return (
    <ul className={className}>
      {glossaryIndex(locale).map((t) => (
        <li key={t.id}>
          <a
            href={`#${t.id}`}
            className="flex items-baseline justify-between gap-3 rounded-lg px-2 py-1.5 text-sm text-muted transition hover:bg-primary/5 hover:text-ink"
          >
            {ar ? (
              <>
                <span lang="ar" className="font-arabic text-base">{t.ar}</span>
                <span lang="en" dir="ltr" className="truncate text-xs">{t.term}</span>
              </>
            ) : (
              <span>{t.term}</span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}

/** The glossary: every local word, grouped, each card an anchor (/glossary#iqama) that the guides link to. */
export function GlossaryPage({ locale = "en" }: { locale?: Locale }) {
  const ar = locale === "ar";
  const c = GLOSSARY_COPY[locale];
  const ld = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": abs("/glossary#set"),
    name: GLOSSARY_COPY.en.metaTitle,
    description: GLOSSARY_COPY.en.metaDescription,
    url: abs("/glossary"),
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
    hasDefinedTerm: GLOSSARY.map((t) => ({
      "@type": "DefinedTerm",
      "@id": abs(`/glossary#${t.id}`),
      name: t.term,
      alternateName: t.ar,
      description: t.meaning,
      url: abs(`/glossary#${t.id}`),
      inDefinedTermSet: abs("/glossary#set"),
    })),
  };

  return (
    <>
      {!ar && <JsonLd data={[ld, breadcrumbs([[c.breadcrumb, "/glossary"]])]} />}
      <PageBand title={c.title} subtitle={c.subtitle(GLOSSARY.length)}>
        <nav aria-label={c.groups} className="mt-6 flex flex-wrap gap-2">
          {GLOSSARY_GROUPS.map((g) => (
            <a
              key={g.id}
              href={`#g-${g.id}`}
              className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              {ar ? g.ar : g.en}
            </a>
          ))}
        </nav>
      </PageBand>

      <div className="shell mt-8 grid gap-10 md:mt-12 lg:grid-cols-[230px_minmax(0,1fr)]">
        <nav aria-label={c.index} className="hidden lg:sticky lg:top-28 lg:block lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto">
          <p className="px-2 text-sm font-semibold">{c.index}</p>
          <IndexList locale={locale} className="mt-2 border-s border-line ps-1" />
        </nav>

        <div className="min-w-0">
          <details className="group mb-8 rounded-2xl border border-line bg-card lg:hidden">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 text-sm font-semibold [&::-webkit-details-marker]:hidden">
              {c.index} <span className="text-muted">({ar ? toArabicDigits(GLOSSARY.length) : GLOSSARY.length})</span>
              <ChevronDown size={18} aria-hidden="true" className="ms-auto text-muted transition group-open:rotate-180" />
            </summary>
            <IndexList locale={locale} className="grid gap-x-4 border-t border-line p-2 sm:grid-cols-2 md:grid-cols-3" />
          </details>

          {GLOSSARY_GROUPS.map((g) => (
            <section key={g.id} id={`g-${g.id}`} aria-labelledby={`h-${g.id}`} className="mb-12 scroll-mt-28">
              <SectionHeader id={`h-${g.id}`} title={ar ? g.ar : g.en} icon={GROUP_ICON[g.id]} rtl={ar} />
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {termsIn(g.id).map((t) => (
                  <TermCard key={t.id} t={t} locale={locale} />
                ))}
              </div>
            </section>
          ))}

          <p className="mb-4 flex flex-wrap items-baseline gap-x-2 gap-y-1 rounded-2xl bg-gold-bg p-4 text-sm leading-relaxed text-ink md:p-5">
            <strong className="font-semibold">{c.helpTitle}</strong>
            <span>
              {c.help}{" "}
              <a href={whatsappLink(HELP_CONTACT_DEFAULT)} target="_blank" rel="noopener noreferrer" dir="ltr" className="font-semibold text-primary underline underline-offset-[3px]">
                {HELP_CONTACT_DEFAULT}
              </a>
              .
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
