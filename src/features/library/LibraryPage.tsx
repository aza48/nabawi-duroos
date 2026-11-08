import { ArrowUpRight, FileText, Folder, Globe, MonitorPlay, Send } from "lucide-react";
import { PageBand } from "@/components/ui";
import Link from "next/link";
import { CHANNELS, MAHAD_EXTRA, OFFICIAL, type LibraryLink, type Manuscript } from "@/content/library";
import { LIVE_COLLECTIONS, countFiles, treeOf } from "@/content/library-books";
import { CurriculumNote, LibrarySearchForm, firstLevelCount } from "./CoursePages";
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
  { id: "course-books", label: "Course books" },
  { id: "mahad-extra", label: "Ma'had extras" },
  { id: "official", label: "Official links" },
  { id: "channels", label: "Channels" },
  { id: "manuscripts", label: "Manuscripts" },
];

export function LibraryPage({ takhleesHref }: { takhleesHref: string; helpContact?: string }) {
  return (
    <>
      <PageBand title="Library" subtitle="Course books and summaries for every college and the Ma'had, readable right here, plus official links and 300+ manuscript libraries.">
        <div className="mt-8"><LibrarySearchForm /></div>
        <nav aria-label="Sections" className="mt-5 flex flex-wrap gap-2">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/15 transition hover:bg-white/20">
              {s.label}
            </a>
          ))}
        </nav>
      </PageBand>

      <div className="shell mt-10 space-y-16 md:mt-14">
        <section id="course-books" className="scroll-mt-24">
          <h2 className="font-heading text-3xl font-bold">Course books by college</h2>
          <p className="mt-2 max-w-2xl text-muted">Every file opens here on MESH. Pick your college, then your level.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {LIVE_COLLECTIONS.map((c) => {
              const tree = treeOf(c.slug)!;
              const levels = firstLevelCount(tree);
              return (
                <Link key={c.slug} href={`/library/${c.slug}`} className={`group flex flex-col rounded-2xl border p-5 transition-colors hover:border-primary/50 ${c.group === "mahad" ? "border-primary/40 bg-primary-soft/40" : "border-line bg-card"}`}>
                  <span className="font-heading text-lg font-semibold leading-snug group-hover:text-primary">{c.title}</span>
                  <span className="ar-text text-[15px] text-muted">{c.titleAr}</span>
                  <span className="mt-2 text-sm text-muted">{c.blurb}</span>
                  <span className="mt-auto pt-4 text-sm font-semibold text-primary">
                    {countFiles(tree)} files{levels ? `, ${levels} levels` : ""}
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="mt-6"><CurriculumNote addHref={takhleesHref} /></div>
        </section>

        <section id="mahad-extra" className="scroll-mt-24">
          <h2 className="font-heading text-2xl font-bold">More for Ma&apos;had students</h2>
          <p className="mt-1 text-muted">All of it by level, with the answer keys and the rules for failing a level, in the <Link href="/mahad" className="font-semibold text-primary hover:underline">Ma&apos;had hub</Link>.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {MAHAD_EXTRA.map((l) => <LinkCard key={l.href} l={l} />)}
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
