import Link from "next/link";
import { BookOpen, CircleCheck, Flag } from "lucide-react";
import type { FaqRow, GuideRow } from "@/server/content/queries";
import { FAQ_CATEGORIES, GUIDE_STAGES } from "@/server/content/queries";
import { sanitizeArticleHtml } from "@/lib/sanitize";
import { EmptyState, PageTitle } from "@/components/ui";
import { AskOnWhatsApp, WhatsAppIcon } from "@/components/shell/WhatsApp";

const verified = (d: Date | null) =>
  d ? `Last verified ${new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(d)}` : null;

export function AskPage({ faqs, whatsappUrl }: { faqs: FaqRow[]; whatsappUrl: string }) {
  const byCat = FAQ_CATEGORIES.map((c) => ({ ...c, items: faqs.filter((f) => f.category === c.id) })).filter((c) => c.items.length);
  return (
    <div className="mx-auto max-w-2xl">
      <PageTitle title="Ask" subtitle="Verified answers to the questions students ask most — kept up to date by the MESH team." />
      <AskOnWhatsApp url={whatsappUrl} />
      <div className="mt-6">
        {byCat.length === 0 ? (
          <EmptyState
            title="The first answers are being written"
            body="Questions asked in the WhatsApp group are turned into verified answers here. Ask yours in the group."
          />
        ) : (
          byCat.map((c) => (
            <section key={c.id} className="mb-6">
              <h2 className="mb-2 text-lg font-semibold">{c.label}</h2>
              <ul className="card divide-y divide-line">
                {c.items.map((f) => (
                  <li key={f.slug}>
                    <Link href={`/ask/${f.slug}`} className="block p-3.5 font-medium hover:text-primary">
                      {f.question}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </div>
    </div>
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
    <article className="mx-auto max-w-2xl">
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
  return (
    <div className="mx-auto max-w-2xl">
      <PageTitle title="Guides" subtitle="Step-by-step help for every stage of life in Madinah." />
      {GUIDE_STAGES.map((s) => {
        const items = guides.filter((g) => g.stage === s.id);
        return (
          <section key={s.id} className="mb-7">
            <h2 className="text-xl font-semibold">{s.label}</h2>
            <p className="mb-2.5 text-sm text-muted">{s.blurb}</p>
            {items.length === 0 ? (
              <p className="card border-dashed p-3.5 text-sm text-muted">Coming soon.</p>
            ) : (
              <div className="grid gap-2.5 sm:grid-cols-2">
                {items.map((g) => (
                  <Link key={g.slug} href={`/guides/${g.slug}`} className="card block p-4 transition hover:border-primary">
                    <p className="font-semibold leading-snug">{g.title}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-muted">{g.summary}</p>
                    <p className="mt-2 flex items-center gap-1 text-xs text-muted">
                      <BookOpen size={12} /> {g.readingMinutes} min read
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

export function GuidePage({ guide, whatsappUrl }: { guide: GuideRow; whatsappUrl: string }) {
  const stage = GUIDE_STAGES.find((s) => s.id === guide.stage);
  return (
    <article className="mx-auto max-w-2xl">
      <Link href="/guides" className="text-sm font-medium text-muted">← {stage?.label ?? "Guides"}</Link>
      <h1 className="mt-2 text-3xl font-semibold leading-tight md:text-4xl">{guide.title}</h1>
      <p className="mt-2 text-lg text-muted">{guide.summary}</p>
      <p className="mt-2 flex flex-wrap items-center gap-x-3 text-sm text-muted">
        <span className="flex items-center gap-1"><BookOpen size={14} /> {guide.readingMinutes} min read</span>
        {verified(guide.lastVerifiedAt) && (
          <span className="flex items-center gap-1 text-on"><CircleCheck size={14} /> {verified(guide.lastVerifiedAt)}</span>
        )}
      </p>
      <div className="article mt-6 text-[1.02rem]" dangerouslySetInnerHTML={{ __html: sanitizeArticleHtml(guide.bodyHtml) }} />
      <OutdatedNote whatsappUrl={whatsappUrl} />
      <div className="mt-6"><AskOnWhatsApp url={whatsappUrl} /></div>
    </article>
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
  const links = [
    { href: "/duroos/updates", label: "Duroos updates", note: "Cancellations, new books, lectures" },
    { href: "/duroos/live", label: "Livestreams", note: "Watch the Prophet's Mosque duroos live" },
    { href: "/duroos/schedule", label: "Weekly schedule", note: "Every dars, every masjid" },
    { href: "/ar/duroos", label: "الدروس بالعربية", note: "The duroos section in Arabic" },
  ];
  return (
    <div className="mx-auto max-w-2xl">
      <PageTitle title="More" />
      <ul className="card divide-y divide-line">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="block p-3.5">
              <span className="block font-semibold">{l.label}</span>
              <span className="block text-sm text-muted">{l.note}</span>
            </Link>
          </li>
        ))}
      </ul>

      <section id="about" className="mt-8">
        <h2 className="text-xl font-semibold">About MESH</h2>
        <p className="mt-2">
          MESH — the Medina English Student Hub — is run by students, for English-speaking students in Madinah. The
          WhatsApp group is where announcements, events and everyday help happen; this website is where the verified
          answers, guides and the live duroos schedule are kept.
        </p>
      </section>

      <section id="rules" className="mt-8">
        <h2 className="text-xl font-semibold">Group rules</h2>
        <ul className="mt-2 grid gap-1.5">
          {RULES.map((r) => (
            <li key={r} className="flex gap-2">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
              {r}
            </li>
          ))}
        </ul>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-wa px-5 py-3 font-semibold text-white">
          <WhatsAppIcon size={18} /> Join the MESH group
        </a>
      </section>
    </div>
  );
}
