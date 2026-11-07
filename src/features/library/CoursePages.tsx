import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Download, ExternalLink, FileAudio, FileImage, FileText, FileVideo, Folder, Search, Send } from "lucide-react";
import {
  countFiles,
  driveLinks,
  isFolder,
  levelLabel,
  subjectHint,
  type Collection,
  type FileHit,
  type LibFile,
  type LibFolder,
  type LibNode,
} from "@/content/library-books";

const FILE_ICON = { pdf: FileText, img: FileImage, video: FileVideo, audio: FileAudio, doc: FileText, other: FileText } as const;
const KIND_LABEL = { pdf: "PDF", img: "Image", video: "Video", audio: "Audio", doc: "Document", other: "File" } as const;

/** The honest note every course page carries, with a way to add what is missing. */
export function CurriculumNote({ addHref }: { addHref: string }) {
  return (
    <div className="rounded-3xl border border-line bg-card p-5 md:flex md:items-center md:justify-between md:gap-6 md:p-6">
      <div>
        <p className="font-heading text-lg font-bold">Your class may use a different book</p>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          Students collected these files over several years. Some are older editions, and different classes can set different books for the same course. If your class uses a book that is missing here, send us your class timetable and the book your teacher set, and we will add it. Summaries that helped you are welcome too.
        </p>
      </div>
      <a href={addHref} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-ink transition hover:brightness-110 md:mt-0">
        <Send size={15} /> Send a book or summary
      </a>
    </div>
  );
}

export function LibrarySearchForm({ q = "", collection }: { q?: string; collection?: Collection }) {
  return (
    <form action="/library/search" method="get" role="search" className="flex w-full max-w-2xl items-center gap-2 rounded-full border border-line bg-card p-1.5 ps-4 shadow-sm">
      <Search size={18} className="shrink-0 text-muted" />
      {collection && <input type="hidden" name="c" value={collection.slug} />}
      <input
        name="q"
        defaultValue={q}
        placeholder={collection ? `Search ${collection.title} books, in Arabic or English` : "Search every course book, in Arabic or English"}
        aria-label="Search the course books"
        className="min-w-0 flex-1 bg-transparent py-2 text-base outline-none placeholder:text-muted"
      />
      <button type="submit" className="min-h-10 shrink-0 rounded-full bg-primary px-5 text-sm font-semibold text-primary-ink">Search</button>
    </form>
  );
}

function FileRow({ f, context }: { f: LibFile; context?: string }) {
  const Icon = FILE_ICON[f.k];
  return (
    <li>
      <Link href={`/library/read/${f.id}`} className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-bg-2">
        <Icon size={18} className="shrink-0 text-primary" />
        <span className="min-w-0 flex-1">
          <span dir="auto" className="ar-text block leading-snug group-hover:text-primary">{f.t}</span>
          {context && <span className="block text-xs text-muted">{context}</span>}
        </span>
        <span className="shrink-0 text-xs text-muted">{KIND_LABEL[f.k]}</span>
      </Link>
    </li>
  );
}

/** A subject (or any folder) as a card: Arabic name, English hint, its files and sub-folders. */
function FolderCard({ folder }: { folder: LibFolder }) {
  const files = folder.f.filter((n): n is LibFile => !isFolder(n));
  const subs = folder.f.filter(isFolder);
  const hint = subjectHint(folder.t);
  return (
    <div className="break-inside-avoid rounded-2xl border border-line bg-card p-4">
      <p dir="auto" className="ar-text text-lg font-semibold leading-snug">{folder.t}</p>
      {hint && <p className="text-sm text-muted">{hint}</p>}
      {files.length > 0 && <ul className="-mx-2 mt-2">{files.map((f) => <FileRow key={f.id} f={f} />)}</ul>}
      {subs.map((s) => (
        <details key={s.id} className="mt-2 rounded-xl bg-bg-2 px-3 py-2">
          <summary className="flex cursor-pointer items-center gap-2 text-sm font-semibold">
            <Folder size={15} className="text-gold" /> <span dir="auto" className="ar-text">{s.t}</span>
            <span className="ms-auto text-xs font-normal text-muted">{countFiles(s)}</span>
          </summary>
          <ul className="-mx-2 mt-1">
            {s.f.flatMap(function flat(n): LibFile[] { return isFolder(n) ? n.f.flatMap(flat) : [n]; }).map((f) => <FileRow key={f.id} f={f} />)}
          </ul>
        </details>
      ))}
    </div>
  );
}

/** One college: each level is a section, each subject a card. Loose files sit at the top. */
export function CollectionView({ collection, tree, addHref }: { collection: Collection; tree: LibFolder; addHref: string }) {
  const loose = tree.f.filter((n): n is LibFile => !isFolder(n));
  const sections = tree.f.filter(isFolder);
  return (
    <>
      <section className="lattice overflow-hidden bg-brand text-white">
        <div className="shell py-10 md:py-14">
          <Link href="/library" className="inline-flex items-center gap-1.5 text-sm text-white/75 hover:text-white"><BookOpen size={15} className="text-gold-bright" /> Library</Link>
          <h1 className="mt-3 font-heading text-4xl font-bold leading-[1.05] md:text-6xl">{collection.title}</h1>
          <p className="ar-text mt-2 text-xl text-white/80">{collection.titleAr}</p>
          <p className="mt-4 max-w-2xl text-white/85">{countFiles(tree)} files. {collection.blurb}</p>
          {sections.length > 1 && (
            <nav aria-label="Levels" className="mt-6 flex flex-wrap gap-2">
              {sections.map((s) => (
                <a key={s.id} href={`#f-${s.id}`} className="min-h-10 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/15 transition hover:bg-white/20">
                  {levelLabel(s.t) ?? s.t}
                </a>
              ))}
            </nav>
          )}
        </div>
      </section>
      <div className="shell mt-8 space-y-10 md:mt-10">
        <LibrarySearchForm collection={collection} />
        <CurriculumNote addHref={addHref} />
        {loose.length > 0 && <ul className="grid gap-1 md:grid-cols-2">{loose.map((f) => <FileRow key={f.id} f={f} />)}</ul>}
        {sections.map((s) => {
          const level = levelLabel(s.t);
          const subjects = s.f.filter(isFolder);
          const files = s.f.filter((n): n is LibFile => !isFolder(n));
          return (
            <section key={s.id} id={`f-${s.id}`} className="scroll-mt-24">
              <h2 className="font-heading text-2xl font-bold md:text-3xl">
                {level ?? <span dir="auto" className="ar-text">{s.t}</span>}
                {level && <span className="ar-text ms-3 text-lg font-normal text-muted">{s.t}</span>}
              </h2>
              <p className="mt-1 text-sm text-muted">{countFiles(s)} files{subjects.length ? `, ${subjects.length} subjects` : ""}</p>
              {files.length > 0 && <ul className="mt-3 grid gap-1 md:grid-cols-2">{files.map((f) => <FileRow key={f.id} f={f} />)}</ul>}
              {subjects.length > 0 && <div className="mt-4 gap-4 space-y-4 md:columns-2 xl:columns-3 [&>*]:mb-4">{subjects.map((sub) => <FolderCard key={sub.id} folder={sub} />)}</div>}
            </section>
          );
        })}
      </div>
    </>
  );
}

const pathText = (hit: FileHit) => [hit.collection.title, ...hit.path.slice(1).map((p) => levelLabel(p.t) ?? p.t)].join(" › ");

/** The reader: the book itself, embedded, with the rest of its subject beside it. */
export function ReaderView({ hit, addHref }: { hit: FileHit; addHref: string }) {
  const { file, collection, path } = hit;
  const parent = path[path.length - 1];
  const siblings = parent.f.filter((n): n is LibFile => !isFolder(n));
  const i = siblings.findIndex((s) => s.id === file.id);
  const prev = siblings[i - 1];
  const next = siblings[i + 1];
  const links = driveLinks(file.id);
  const hint = subjectHint(parent.t);
  return (
    <div className="shell pt-6 md:pt-8">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
        <Link href="/library" className="hover:text-ink">Library</Link>
        <span>›</span>
        <Link href={`/library/${collection.slug}`} className="hover:text-ink">{collection.title}</Link>
        {path.slice(1).map((p) => (
          <span key={p.id} className="flex items-center gap-2">
            <span>›</span>
            <Link href={`/library/${collection.slug}#f-${path[1].id}`} dir="auto" className="ar-text hover:text-ink">{levelLabel(p.t) ?? p.t}</Link>
          </span>
        ))}
      </nav>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 dir="auto" className="ar-text font-heading text-2xl font-bold leading-snug md:text-4xl">{file.t}</h1>
          {hint && <p className="mt-1 text-muted">{hint}</p>}
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={links.download} className="inline-flex min-h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-ink"><Download size={16} /> Download</a>
          <a href={links.view} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-card px-4 text-sm font-semibold"><ExternalLink size={15} /> Open full screen</a>
        </div>
      </div>
      <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="overflow-hidden rounded-2xl border border-line bg-bg-2">
          <iframe src={links.preview} title={file.t} className="h-[75vh] min-h-[480px] w-full" allow="autoplay; fullscreen" loading="lazy" />
        </div>
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="flex gap-2">
            {prev ? <Link href={`/library/read/${prev.id}`} className="flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-xl border border-line bg-card text-sm font-semibold"><ArrowLeft size={15} className="rtl:rotate-180" /> Previous</Link> : <span className="flex-1" />}
            {next ? <Link href={`/library/read/${next.id}`} className="flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-xl border border-line bg-card text-sm font-semibold">Next <ArrowRight size={15} className="rtl:rotate-180" /></Link> : <span className="flex-1" />}
          </div>
          {siblings.length > 1 && (
            <div className="rounded-2xl border border-line bg-card p-3">
              <p className="px-2 pb-1 text-sm font-semibold text-muted">In this folder</p>
              <ul>
                {siblings.map((s) =>
                  s.id === file.id ? (
                    <li key={s.id} dir="auto" className="ar-text rounded-xl bg-primary-soft px-3 py-2.5 font-semibold">{s.t}</li>
                  ) : (
                    <FileRow key={s.id} f={s} />
                  )
                )}
              </ul>
            </div>
          )}
          <p className="text-xs text-muted">The file is kept on Google Drive by the students who shared it. If it doesn't load, use Open full screen.</p>
        </aside>
      </div>
      <div className="mt-8"><CurriculumNote addHref={addHref} /></div>
    </div>
  );
}

export function SearchResults({ q, hits, collection }: { q: string; hits: FileHit[]; collection?: Collection }) {
  return (
    <div className="shell pt-8 md:pt-10">
      <Link href={collection ? `/library/${collection.slug}` : "/library"} className="text-sm text-muted hover:text-ink">{collection ? collection.title : "Library"}</Link>
      <h1 className="mt-2 font-heading text-3xl font-bold md:text-4xl">Search the course books</h1>
      <div className="mt-5"><LibrarySearchForm q={q} collection={collection} /></div>
      {q && (
        <p className="mt-6 text-sm text-muted">
          {hits.length ? `${hits.length}${hits.length >= 60 ? "+" : ""} files match "${q}"${collection ? ` in ${collection.title}` : ""}.` : `Nothing matches "${q}". Try the Arabic name of the subject, or one word such as توحيد or nahw.`}
        </p>
      )}
      {hits.length > 0 && (
        <ul className="mt-3 grid gap-1 rounded-2xl border border-line bg-card p-2 md:grid-cols-2">
          {hits.map((h) => <FileRow key={h.file.id} f={h.file} context={pathText(h)} />)}
        </ul>
      )}
    </div>
  );
}

export const firstLevelCount = (tree: LibFolder) => tree.f.filter((n: LibNode) => isFolder(n) && levelLabel(n.t)).length;
