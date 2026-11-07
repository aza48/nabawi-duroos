import { ArrowUpRight, FileText, Folder, Globe, MonitorPlay, Send } from "lucide-react";
import { PageBand } from "@/components/ui";
import { CHANNELS, MAHAD, MUQARRARAT, OFFICIAL, type LibraryLink, type Manuscript } from "@/content/library";
import manuscripts from "@/content/manuscripts.json";
import { ManuscriptDirectory } from "./ManuscriptDirectory";

const ICON: Record<LibraryLink["kind"], typeof Folder> = { folder: Folder, pdf: FileText, site: Globe, youtube: MonitorPlay, telegram: Send, x: Globe, whatsapp: Send };

function LinkCard({ l }: { l: LibraryLink }) {
  const Icon = ICON[l.kind];
  return (
    <a href={l.href} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 rounded-2xl border border-line bg-card p-4 transition-colors hover:border-primary/50">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary transition group-hover:bg-primary group-hover:text-primary-ink">
        <Icon size={19} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold leading-snug group-hover:text-primary">{l.title}</span>
        {l.titleAr && <span className="ar-text block text-[15px] text-muted">{l.titleAr}</span>}
        {l.note && <span className="mt-0.5 block text-sm text-muted">{l.note}</span>}
      </span>
      <ArrowUpRight size={16} className="mt-1 shrink-0 text-muted" />
    </a>
  );
}

const SECTIONS = [
  { id: "muqarrarat", label: "Muqarrarat" },
  { id: "mahad", label: "Ma'had" },
  { id: "official", label: "Official links" },
  { id: "channels", label: "Channels" },
  { id: "manuscripts", label: "Manuscripts" },
];

export function LibraryPage({ takhleesHref, helpContact }: { takhleesHref: string; helpContact: string }) {
  return (
    <>
      <PageBand title="The Jamiah library" subtitle="Course texts for every college, the Ma'had books and guides, official links, and 300+ manuscript libraries.">
        <nav aria-label="Sections" className="mt-8 flex flex-wrap gap-2">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/15 transition hover:bg-white/20">
              {s.label}
            </a>
          ))}
        </nav>
      </PageBand>

      <div className="shell mt-10 space-y-16 md:mt-14">
        <section id="muqarrarat" className="scroll-mt-24">
          <h2 className="font-heading text-3xl font-bold">Muqarrarat by college</h2>
          <p className="mt-2 max-w-2xl text-muted">The set texts for each college and level, collected by students. Open a college to find your level.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MUQARRARAT.map((l) => <LinkCard key={l.href} l={l} />)}
          </div>

          <div className="lattice mt-8 overflow-hidden rounded-3xl bg-brand-deep p-6 text-white md:flex md:items-center md:justify-between md:gap-8 md:p-8">
            <div>
              <p className="font-heading text-2xl font-bold">Have a takhlees you think will benefit?</p>
              <p className="mt-2 max-w-xl text-white/80">
                Please send it to {helpContact} and we will review and upload it. May Allah write your reward!
              </p>
            </div>
            <a href={takhleesHref} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex shrink-0 items-center gap-2 rounded-full bg-gold-bright px-5 py-3 font-bold text-brand-deep transition hover:brightness-105 md:mt-0">
              Send a takhlees <ArrowUpRight size={17} />
            </a>
          </div>
        </section>

        <section id="mahad" className="scroll-mt-24">
          <h2 className="font-heading text-3xl font-bold">Arabic Language Institute (Ma&apos;had)</h2>
          <p className="mt-2 max-w-2xl text-muted">The official student guide, every level&apos;s books, answer keys and the regulations.</p>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {MAHAD.map((l) => <LinkCard key={l.href} l={l} />)}
          </div>
        </section>

        <section id="official" className="scroll-mt-24">
          <h2 className="font-heading text-3xl font-bold">Official links</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {OFFICIAL.map((l) => <LinkCard key={l.href} l={l} />)}
          </div>
        </section>

        <section id="channels" className="scroll-mt-24">
          <h2 className="font-heading text-3xl font-bold">Channels worth following</h2>
          <p className="mt-2 max-w-2xl text-muted">People who live here and keep their information current.</p>
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {CHANNELS.map((l) => <LinkCard key={l.href} l={l} />)}
          </div>
        </section>

        <section id="manuscripts" className="scroll-mt-24">
          <h2 className="font-heading text-3xl font-bold">Manuscript libraries on Telegram</h2>
          <p className="mt-2 mb-6 max-w-2xl text-muted">
            Over 300 channels sharing scans from manuscript collections around the world, from Istanbul to Timbuktu. List checked 1 January 2026.
          </p>
          <ManuscriptDirectory items={manuscripts as Manuscript[]} />
        </section>
      </div>
    </>
  );
}
