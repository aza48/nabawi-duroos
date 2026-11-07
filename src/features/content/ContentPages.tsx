import Link from "next/link";
import { ArrowUpRight, BadgePercent, Bell, BookOpen, CalendarDays, CircleCheck, Flag, GraduationCap, Languages, Library, Radio, ScrollText } from "lucide-react";
import type { FaqRow, GuideRow } from "@/server/content/queries";
import { FAQ_CATEGORIES, GUIDE_STAGES } from "@/server/content/queries";
import { sanitizeArticleHtml } from "@/lib/sanitize";
import { PageBand } from "@/components/ui";
import { STAGE_ICON } from "@/features/home/HomePage";
import { FaqExplorer } from "./FaqExplorer";
import { GuideBody } from "./GuideBody";
import { enhanceGuideHtml } from "@/lib/guide-html";
import { JsonLd, ORG_ID, breadcrumbs } from "@/components/JsonLd";
import { abs } from "@/lib/site";

const plain = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
import { AskOnWhatsApp, WhatsAppIcon } from "@/components/shell/WhatsApp";
import { AlertsButton } from "@/features/duroos/AlertsButton";

const verified = (d: Date | null) =>
  d ? `Last verified ${new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(d)}` : null;

export function AskPage({ faqs, whatsappUrl }: { faqs: FaqRow[]; whatsappUrl: string }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, url: abs(`/ask/${f.slug}`), acceptedAnswer: { "@type": "Answer", text: plain(f.answerHtml) } })),
        }}
      />
      <PageBand title="Questions, answered" subtitle="Verified answers to what students ask most, kept up to date by the MESH team." />
      <div className="shell mt-8 md:mt-12">
        <FaqExplorer items={faqs.map((f) => ({ slug: f.slug, question: f.question, category: f.category }))} categories={FAQ_CATEGORIES} />
        <div className="mt-10 max-w-3xl lg:ms-[288px]">
          <AskOnWhatsApp url={whatsappUrl} />
        </div>
      </div>
    </>
  );
}

function OutdatedNote({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-6 flex items-center gap-2 text-sm text-muted hover:text-ink">
      <Flag size={14} /> Something outdated? Tell us in the WhatsApp group.
    </a>
  );
}

export function FaqPage({ faq, whatsappUrl }: { faq: FaqRow; whatsappUrl: string }) {
  const cat = FAQ_CATEGORIES.find((c) => c.id === faq.category);
  return (
    <article className="shell max-w-3xl pt-6 md:pt-10">
      <JsonLd
        data={[
          { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: plain(faq.answerHtml) } }], dateModified: faq.updatedAt },
          breadcrumbs([["Ask", "/ask"], [faq.question, `/ask/${faq.slug}`]]),
        ]}
      />
      <Link href="/ask" className="text-sm font-medium text-muted">← {cat?.label ?? "Ask"}</Link>
      <h1 className="mt-2 text-3xl font-semibold leading-tight">{faq.question}</h1>
      {verified(faq.lastVerifiedAt) && (
        <p className="mt-2 flex items-center gap-1.5 text-sm text-on">
          <CircleCheck size={15} /> {verified(faq.lastVerifiedAt)}
        </p>
      )}
      <div className="article mt-5" dangerouslySetInnerHTML={{ __html: sanitizeArticleHtml(faq.answerHtml) }} />
      <OutdatedNote whatsappUrl={whatsappUrl} />
      <div className="mt-6"><AskOnWhatsApp url={whatsappUrl} /></div>
    </article>
  );
}

export function GuidesPage({ guides }: { guides: GuideRow[] }) {
  const stages = GUIDE_STAGES.map((st) => ({ ...st, items: guides.filter((g) => g.stage === st.id) }));
  return (
    <>
      <PageBand title="Life in Madinah" subtitle="Step-by-step guides, from the day your visa arrives to the day you fly home.">
        <nav aria-label="Stages" className="mt-8 flex flex-wrap gap-2">
          {stages.map((st) => {
            const Icon = STAGE_ICON[st.id];
            return (
              <a key={st.id} href={`#${st.id}`} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/15 transition hover:bg-white/20">
                <Icon size={16} className="text-gold-bright" /> {st.label}
                <span className="text-white/60 tabular">{st.items.length}</span>
              </a>
            );
          })}
        </nav>
      </PageBand>
      <div className="shell mt-10 space-y-14 md:mt-14">
        {stages.map((st) => {
          const Icon = STAGE_ICON[st.id];
          return (
            <section key={st.id} id={st.id} className="scroll-mt-24">
              <div className="mb-5 flex items-center gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary text-primary-ink">
                  <Icon size={22} />
                </span>
                <div>
                  <h2 className="font-heading text-2xl font-bold md:text-3xl">{st.label}</h2>
                  <p className="text-sm text-muted md:text-base">{st.blurb}</p>
                </div>
              </div>
              {st.items.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-line bg-card p-5 text-sm text-muted">Being written. Ask in the WhatsApp group meanwhile.</p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {st.items.map((g) => (
                    <Link key={g.slug} href={`/guides/${g.slug}`} className="group flex flex-col rounded-2xl border border-line bg-card p-5 transition-colors hover:border-primary/50">
                      <span className="font-heading text-lg font-semibold leading-snug group-hover:text-primary">{g.title}</span>
                      <span className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{g.summary}</span>
                      <span className="mt-auto flex items-center gap-3 pt-4 text-xs text-muted">
                        <span className="flex items-center gap-1"><BookOpen size={13} /> {g.readingMinutes} min</span>
                        {g.lastVerifiedAt && <span className="flex items-center gap-1 text-on"><CircleCheck size={13} /> Verified</span>}
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

export function GuidePage({ guide, whatsappUrl }: { guide: GuideRow; whatsappUrl: string }) {
  const stage = GUIDE_STAGES.find((st) => st.id === guide.stage);
  const Icon = STAGE_ICON[guide.stage] ?? BookOpen;
  const { html, toc, steps } = enhanceGuideHtml(sanitizeArticleHtml(guide.bodyHtml));
  const stepTexts = [...html.matchAll(/<li data-step="\d+">([\s\S]*?)<\/li>/g)].map((m) => plain(m[1]));
  const ld = {
    "@context": "https://schema.org",
    "@type": steps > 0 ? ["Article", "HowTo"] : "Article",
    headline: guide.title,
    name: guide.title,
    description: guide.summary,
    url: abs(`/guides/${guide.slug}`),
    inLanguage: "en",
    datePublished: guide.createdAt,
    dateModified: guide.lastVerifiedAt ?? guide.updatedAt,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    about: { "@type": "City", name: "Madinah" },
    timeRequired: `PT${guide.readingMinutes}M`,
    ...(steps > 0 ? { step: stepTexts.map((t, i) => ({ "@type": "HowToStep", position: i + 1, text: t })) } : {}),
  };
  return (
    <>
      <JsonLd data={[ld, breadcrumbs([["Guides", "/guides"], [stage?.label ?? "Guides", `/guides#${guide.stage}`], [guide.title, `/guides/${guide.slug}`]])]} />
      <section className="lattice overflow-hidden bg-brand text-white">
        <div className="shell py-10 md:py-14">
          <Link href={`/guides#${guide.stage}`} className="inline-flex items-center gap-2 text-sm text-white/75 hover:text-white">
            <Icon size={15} className="text-gold-bright" /> {stage?.label ?? "Guides"}
          </Link>
          <h1 className="mt-3 max-w-4xl font-heading text-4xl font-bold leading-[1.05] md:text-6xl">{guide.title}</h1>
          <p className="mt-4 max-w-2xl text-white/85 md:text-lg">{guide.summary}</p>
          <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/75">
            <span className="flex items-center gap-1.5"><BookOpen size={15} /> {guide.readingMinutes} min read</span>
            {steps > 0 && <span className="flex items-center gap-1.5"><CircleCheck size={15} /> {steps} steps to tick off</span>}
            {verified(guide.lastVerifiedAt) && <span className="flex items-center gap-1.5 text-gold-bright"><CircleCheck size={15} /> {verified(guide.lastVerifiedAt)}</span>}
          </p>
        </div>
      </section>
      <div className={`shell mt-8 grid gap-10 md:mt-10 ${toc.length > 1 ? "lg:grid-cols-[240px_minmax(0,1fr)]" : ""}`}>
        {toc.length > 1 && (
          <nav aria-label="On this page" className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
            <p className="text-sm font-semibold text-muted">On this page</p>
            <ul className="mt-3 space-y-1 border-s border-line">
              {toc.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className="-ms-px block border-s-2 border-transparent py-1.5 ps-4 text-sm text-muted transition hover:border-primary hover:text-ink">
                    {t.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <article className="max-w-3xl">
          <GuideBody html={html} slug={guide.slug} steps={steps} />
          <OutdatedNote whatsappUrl={whatsappUrl} />
          <div className="mt-6"><AskOnWhatsApp url={whatsappUrl} /></div>
        </article>
      </div>
    </>
  );
}

const RULES = [
  "Keep posts relevant: announcements, posts from the scholars of the Sunnah in Madinah, or student-related info only",
  "Share only verified information",
  "No debates or arguments",
  "No spam. Ads only if relevant to students in Madinah",
  "Respect one another",
];

export function MorePage({ whatsappUrl }: { whatsappUrl: string }) {
  const tiles = [
    { href: "/programs", label: "Study in Madinah", note: "Arabic institutes, degrees and sisters' marakiz", icon: GraduationCap },
    { href: "/library", label: "Jamiah library", note: "Muqarrarat, Ma'had books, manuscripts", icon: Library },
    { href: "/discounts", label: "Student discounts", note: "Clinics, schools, gyms, car rental and more", icon: BadgePercent },
    { href: "/duroos/schedule", label: "Weekly schedule", note: "Every dars, every masjid, in one grid", icon: CalendarDays },
    { href: "/duroos/live", label: "Live streams", note: "Watch the Haram duroos live", icon: Radio },
    { href: "/duroos/updates", label: "Duroos updates", note: "Cancellations, new books, lectures", icon: ScrollText },
    { href: "/ar/duroos", label: "الدروس بالعربية", note: "The duroos section in Arabic", icon: Languages },
  ];
  return (
    <>
      <PageBand title="More from MESH" subtitle="Alerts, the schedule, livestreams, and what the group is about." />
      <div className="shell mt-10 md:mt-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map(({ href, label, note, icon: Icon }) => (
            <Link key={href} href={href} className="group rounded-2xl border border-line bg-card p-5 transition-colors hover:border-primary/50">
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
            <h2 className="mt-4 font-heading text-2xl font-bold">Phone alerts</h2>
            <p className="mt-1 text-muted">Free, no account. To follow one shaykh, use the button on his page.</p>
            <AlertsButton topic="daily" label="Morning brief: today's duroos and changes" />
            <AlertsButton topic="all" label="Every cancellation and change" />
          </section>

          <div className="space-y-10">
            <section id="about">
              <h2 className="font-heading text-2xl font-bold">About MESH</h2>
              <p className="mt-3 leading-relaxed">
                MESH (Medina English Student Hub) is run by students, for English-speaking students in Madinah.
                Announcements, events and everyday help happen in the WhatsApp group. This website keeps the verified
                answers, the guides and the live duroos schedule in one place.
              </p>
            </section>
            <section id="rules">
              <h2 className="font-heading text-2xl font-bold">Group rules</h2>
              <ul className="mt-3 grid gap-2">
                {RULES.map((r) => (
                  <li key={r} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold-bright" />
                    {r}
                  </li>
                ))}
              </ul>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-wa px-5 py-3 font-semibold text-wa-ink transition hover:brightness-105">
                <WhatsAppIcon size={18} /> Join the MESH group <ArrowUpRight size={16} />
              </a>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
