import Link from "next/link";
import { ArrowUpRight, Baby, CalendarCheck, Check, Laptop, MapPin, User, UserRound, Users, Wallet } from "lucide-react";
import { PageBand } from "@/components/ui";
import { Tabs } from "@/components/Tabs";
import { VideoEmbed } from "@/components/VideoEmbed";
import { PROGRAMS, PROGRAM_KINDS, type Audience, type Program } from "@/content/programs";
import { JsonLd, breadcrumbs } from "@/components/JsonLd";
import { AudienceFilter } from "./AudienceFilter";
import { abs } from "@/lib/site";
import { EnglishNote } from "@/components/EnglishNote";
import type { Locale } from "@/lib/locale";

const AUDIENCE: Record<Audience, { label: string; ar: string; icon: typeof User }> = {
  men: { label: "Brothers", ar: "الإخوة", icon: User },
  women: { label: "Sisters", ar: "الأخوات", icon: UserRound },
  children: { label: "Children", ar: "الأطفال", icon: Baby },
  online: { label: "Online", ar: "عن بُعد", icon: Laptop },
  families: { label: "Families", ar: "العائلات", icon: Users },
};

const checkedOn = (iso: string, locale: Locale = "en") =>
  new Intl.DateTimeFormat(locale === "ar" ? "ar-SA-u-ca-gregory-nu-latn" : "en-GB", { month: "long", year: "numeric" }).format(new Date(iso));

const T = {
  en: { title: "Study in Madinah", sub: "Arabic institutes, degrees, sisters' marakiz and Haram halaqat, with fees, dates and how to apply.", next: "Next intake:", note: "MESH is run by students and is not connected to any institute listed here. Programmes are listed in alphabetical order, each with the date it was last checked. Fees and dates change, so confirm with the institute before you pay, and tell us in the WhatsApp group if something is out of date.", overview: "Overview", levels: "Levels", fees: "Fees and what's included", apply: "How to apply", videos: "Videos", contact: "Contact and links", checked: "Last checked by MESH:", confirm: "Fees and dates change, so confirm with the institute before paying.", base: "" },
  ar: { title: "الدراسة في المدينة", sub: "معاهد اللغة العربية والدرجات الجامعية ومراكز الأخوات وحلقات المسجد النبوي، مع الرسوم والمواعيد وطريقة التسجيل.", next: "الدفعة القادمة:", note: "يدير MESH طلابٌ، ولا صلة له بأي معهد مذكور هنا. البرامج مرتبة أبجديًا، ولكل برنامج تاريخ آخر مراجعة. الرسوم والمواعيد تتغير، فتأكد من المعهد قبل الدفع، وأخبرنا في مجموعة واتساب إن وجدت معلومة قديمة.", overview: "نظرة عامة", levels: "المستويات", fees: "الرسوم وما تشمله", apply: "طريقة التسجيل", videos: "مقاطع مرئية", contact: "التواصل والروابط", checked: "آخر مراجعة من MESH:", confirm: "الرسوم والمواعيد تتغير، فتأكد من المعهد قبل الدفع.", base: "/ar" },
};

function AudienceChips({ p, light = false, locale = "en" }: { p: Program; light?: boolean; locale?: Locale }) {
  return (
    <span className="flex flex-wrap gap-1.5">
      {p.audience.map((a) => {
        const { label: en, ar, icon: Icon } = AUDIENCE[a];
        const label = locale === "ar" ? ar : en;
        return (
          <span key={a} className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${light ? "bg-white/12 text-white" : "bg-bg-2 text-ink"}`}>
            <Icon size={12} /> {label}
          </span>
        );
      })}
    </span>
  );
}

export function ProgramsIndex({ locale = "en" }: { locale?: Locale }) {
  const ar = locale === "ar";
  const t = T[locale];
  const byName = (x: Program, y: Program) => (ar ? x.nameAr.localeCompare(y.nameAr, "ar") : x.name.localeCompare(y.name));
  return (
    <>
      <PageBand title={t.title} subtitle={t.sub} />
      <div className="shell mt-10 md:mt-14">
        <nav aria-label="Jump to" className="flex flex-wrap gap-2">
          {PROGRAM_KINDS.filter((k) => PROGRAMS.some((p) => p.kind === k.id)).map((k) => (
            <a key={k.id} href={`#${k.id}`} className="min-h-10 rounded-full border border-line bg-card px-4 py-2 text-sm font-semibold text-muted transition hover:text-ink">
              {ar ? k.labelAr : k.label} <span className="tabular opacity-70">{PROGRAMS.filter((p) => p.kind === k.id).length}</span>
            </a>
          ))}
        </nav>
        <AudienceFilter options={(Object.keys(AUDIENCE) as Audience[]).filter((a) => PROGRAMS.some((p) => p.audience.includes(a))).map((a) => ({ id: a, label: ar ? AUDIENCE[a].ar : AUDIENCE[a].label }))} locale={locale}>
        {PROGRAM_KINDS.map((k) => {
          const items = PROGRAMS.filter((p) => p.kind === k.id).sort(byName);
          if (!items.length) return null;
          return (
            <section key={k.id} id={k.id} data-auds={[...new Set(items.flatMap((p) => p.audience))].join(" ")} className="mt-12 scroll-mt-24">
              <h2 className="mb-5 font-heading text-2xl font-bold md:text-3xl">{ar ? k.labelAr : k.label}</h2>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {items.map((p) => (
                  <Link key={p.slug} href={`${t.base}/programs/${p.slug}`} data-aud={p.audience.join(" ")} className="group flex flex-col rounded-2xl border border-line bg-card p-5 transition-colors hover:border-primary/50">
                    {ar ? (
                      <>
                        <span className="ar-text text-xl font-bold leading-snug group-hover:text-primary">{p.nameAr}</span>
                        <span className="text-sm text-muted" dir="ltr" lang="en">{p.name}</span>
                      </>
                    ) : (
                      <>
                        <span className="font-heading text-lg font-semibold leading-snug group-hover:text-primary">{p.name}</span>
                        <span className="ar-text text-[15px] text-muted">{p.nameAr}</span>
                      </>
                    )}
                    <span className="mt-2 text-sm leading-relaxed text-muted" dir="auto">{p.tagline}</span>
                    <span className="mt-4"><AudienceChips p={p} locale={locale} /></span>
                    <span className="mt-auto space-y-1.5 pt-4 text-sm">
                      <span className="flex items-start gap-1.5 font-semibold text-primary"><Wallet size={15} className="mt-0.5 shrink-0" /> <span dir="auto">{p.price}</span></span>
                      <span className="flex items-start gap-1.5 text-muted"><MapPin size={15} className="mt-0.5 shrink-0" /> <span dir="auto">{p.where}</span></span>
                      {p.nextIntake && <span className="flex items-start gap-1.5 text-muted"><CalendarCheck size={15} className="mt-0.5 shrink-0" /> {t.next} <span dir="auto">{p.nextIntake}</span></span>}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
        </AudienceFilter>
        {ar && <EnglishNote className="mt-10 max-w-3xl" />}
        <p className={`${ar ? "mt-4" : "mt-12"} rounded-2xl bg-bg-2 p-5 text-sm text-muted`}>{t.note}</p>
      </div>
    </>
  );
}

function List({ items, numbered = false }: { items: string[]; numbered?: boolean }) {
  return (
    <ol className="space-y-3">
      {items.map((x, i) => (
        <li key={x} className="flex gap-3">
          <span className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold ${numbered ? "bg-primary text-primary-ink" : "bg-primary-soft text-primary"}`}>
            {numbered ? i + 1 : <Check size={14} />}
          </span>
          <span className="pt-0.5 leading-relaxed">{x}</span>
        </li>
      ))}
    </ol>
  );
}

export function ProgramPage({ p, locale = "en" }: { p: Program; locale?: Locale }) {
  const ar = locale === "ar";
  const t = T[locale];
  const en = ar ? ({ dir: "ltr", lang: "en" } as const) : {};
  const tabs = [
    { id: "overview", label: t.overview, content: <div {...en} className="max-w-3xl space-y-4 text-[1.05rem] leading-relaxed">{p.overview.map((x) => <p key={x}>{x}</p>)}</div> },
    ...(p.levels ? [{ id: "levels", label: t.levels, content: <div {...en} className="max-w-3xl"><List items={p.levels} /></div> }] : []),
    ...(p.included ? [{ id: "fees", label: t.fees, content: <div {...en} className="max-w-3xl"><p className="mb-5 font-heading text-2xl font-bold">{p.price}</p><List items={p.included} /></div> }] : []),
    ...(p.steps ? [{ id: "apply", label: t.apply, content: <div {...en} className="max-w-3xl"><List items={p.steps} numbered /></div> }] : []),
    ...(p.videos?.length ? [{ id: "videos", label: `${t.videos} (${p.videos.length})`, content: <div className="grid gap-5 md:grid-cols-2">{p.videos.map((v) => <VideoEmbed key={v.id} id={v.id} title={v.title} />)}</div> }] : []),
  ];
  const ld = {
    "@context": "https://schema.org",
    "@type": p.kind === "degree" ? "EducationalOccupationalProgram" : "Course",
    name: p.name,
    alternateName: p.nameAr,
    description: [p.tagline, ...p.overview].join(" "),
    url: abs(`/programs/${p.slug}`),
    provider: { "@type": "EducationalOrganization", name: p.name, address: { "@type": "PostalAddress", addressLocality: "Madinah", addressCountry: "SA" }, ...(p.contact?.[0]?.href.startsWith("http") ? { url: p.contact[0].href } : {}) },
    inLanguage: ["ar", "en"],
    offers: { "@type": "Offer", description: p.price, category: p.price.toLowerCase().startsWith("free") ? "Free" : "Paid" },
    dateModified: p.checked,
    ...(p.videos?.length ? { video: p.videos.map((v) => ({ "@type": "VideoObject", name: v.title, embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`, thumbnailUrl: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`, uploadDate: p.checked, description: v.title })) } : {}),
  };
  return (
    <>
      <JsonLd data={[ld, breadcrumbs([["Study in Madinah", "/programs"], [p.name, `/programs/${p.slug}`]])]} />
      <section className="lattice overflow-hidden bg-brand text-white">
        <div className="shell py-10 md:py-14">
          <Link href={`${t.base}/programs`} className="text-sm text-white/75 hover:text-white">{t.title}</Link>
          {ar ? (
            <>
              <h1 className="ar-text mt-3 text-4xl font-bold leading-snug md:text-6xl">{p.nameAr}</h1>
              <p className="mt-2 text-xl text-white/80" dir="ltr" lang="en">{p.name}</p>
            </>
          ) : (
            <>
              <h1 className="mt-3 font-heading text-4xl font-bold leading-[1.05] md:text-6xl">{p.name}</h1>
              <p className="ar-text mt-2 text-2xl text-white/80">{p.nameAr}</p>
            </>
          )}
          <p className="mt-4 max-w-2xl text-white/85 md:text-lg" dir="auto">{p.tagline}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm md:text-base">
            <AudienceChips p={p} light locale={locale} />
            <span className="flex items-center gap-1.5"><Wallet size={17} className="text-gold-bright" /> <span dir="auto">{p.price}</span></span>
            <span className="flex items-center gap-1.5"><MapPin size={17} className="text-gold-bright" /> <span dir="auto">{p.where}</span></span>
          </div>
        </div>
      </section>
      <div className="shell mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
        <div className="min-w-0">
          {ar && <EnglishNote className="mb-6" />}
          <Tabs tabs={tabs} />
        </div>
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          {p.contact?.length ? (
            <div className="rounded-3xl border border-line bg-card p-5">
              <p className="font-heading text-lg font-bold">{t.contact}</p>
              <ul className="mt-3 space-y-2">
                {p.contact.map((c) => (
                  <li key={c.href}>
                    <a href={c.href} target={c.href.startsWith("/") ? undefined : "_blank"} rel="noopener noreferrer" className="flex items-center justify-between gap-2 rounded-xl bg-bg-2 px-3.5 py-2.5 text-sm font-semibold transition hover:bg-primary hover:text-primary-ink">
                      <span dir="auto">{c.label}</span> <ArrowUpRight size={15} className="shrink-0 rtl:-scale-x-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <p className="rounded-2xl bg-bg-2 p-4 text-xs leading-relaxed text-muted">
            {t.checked} {checkedOn(p.checked, locale)}. {t.confirm}
          </p>
        </aside>
      </div>
    </>
  );
}
