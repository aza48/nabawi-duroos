import Link from "next/link";
import { Breadcrumbs } from "@/components/ui";
import { ArrowLeft, ArrowRight, BookOpen, Download, ExternalLink, FileAudio, FileImage, FileText, FileVideo, Folder, Search, Send } from "lucide-react";
import {
  countFiles,
  driveLinks,
  folderNameAr,
  isFolder,
  levelLabel,
  subjectHint,
  type Collection,
  type FileHit,
  type LibFile,
  type LibFolder,
  type LibNode,
} from "@/content/library-books";
import { toArabicDigits, type Locale } from "@/lib/locale";

const FILE_ICON = { pdf: FileText, img: FileImage, video: FileVideo, audio: FileAudio, doc: FileText, other: FileText } as const;
const KIND_LABEL = { pdf: "PDF", img: "Image", video: "Video", audio: "Audio", doc: "Document", other: "File" } as const;
const KIND_LABEL_AR = { pdf: "PDF", img: "صورة", video: "فيديو", audio: "صوت", doc: "مستند", other: "ملف" } as const;

/** Library paths for each language. */
const libBase = (locale: Locale) => (locale === "ar" ? "/ar/library" : "/library");
const num = (n: number, locale: Locale) => (locale === "ar" ? toArabicDigits(n) : String(n));
/** A level folder's name: "Level 3" in English; the Arabic folder name ("المستوى 3") as it is in Arabic. */
const levelName = (t: string, locale: Locale) => (locale === "ar" ? (levelLabel(t) ? toArabicDigits(t) : null) : levelLabel(t));
/** Any folder's name in the reader's language. */
const folderName = (t: string, locale: Locale) => (locale === "ar" ? folderNameAr(t) : t);
/** A file's name. Unnamed photos are called "Photo", which reads as "صورة" in Arabic. */
const fileName = (f: LibFile, locale: Locale) => (locale === "ar" && f.t === "Photo" ? "صورة" : f.t);

/** The honest note every course page carries, with a way to add what is missing. */
export function CurriculumNote({ addHref, locale = "en" }: { addHref: string; locale?: "en" | "ar" }) {
  const ar = locale === "ar";
  return (
    <div className="rounded-3xl border border-line bg-card p-5 md:flex md:items-center md:justify-between md:gap-6 md:p-6">
      <div>
        <p className="font-heading text-lg font-bold">{ar ? "قد تدرس شعبتك كتابًا آخر" : "Your class may use a different book"}</p>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          {ar
            ? "بعض هذه الكتب طبعات قديمة، وقد تقرر الشعب كتبًا مختلفة للمقرر نفسه. إن كانت شعبتك تدرس كتابًا غير موجود هنا فأرسل لنا جدولك والكتاب الذي حدده الأستاذ وسنضيفه. والملخصات التي أفادتك مرحب بها أيضًا."
            : "Some of these books are older editions, and classes can set different books for the same course. If your class uses a book that is not listed, send us your class timetable and the book your teacher set, and we will add it. Summaries that helped you are welcome too."}
        </p>
      </div>
      <a href={addHref} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-ink transition hover:brightness-110 md:mt-0">
        <Send size={15} /> {ar ? "أرسل كتابًا أو ملخصًا" : "Send a book or summary"}
      </a>
    </div>
  );
}

export function LibrarySearchForm({ q = "", collection, locale = "en" }: { q?: string; collection?: Collection; locale?: "en" | "ar" }) {
  const ar = locale === "ar";
  return (
    <form action={`${libBase(locale)}/search`} method="get" role="search" className="flex w-full max-w-2xl items-center gap-2 rounded-full border border-line bg-card p-1.5 ps-4 shadow-sm">
      <Search size={18} className="shrink-0 text-muted" />
      {collection && <input type="hidden" name="c" value={collection.slug} />}
      <input
        name="q"
        defaultValue={q}
        placeholder={
          ar
            ? collection ? `ابحث في كتب ${collection.titleAr}، بالعربية أو الإنجليزية` : "ابحث في كل كتب المقررات، بالعربية أو الإنجليزية"
            : collection ? `Search ${collection.title} books, in Arabic or English` : "Search every course book, in Arabic or English"
        }
        aria-label={ar ? "ابحث في كتب المقررات" : "Search the course books"}
        className="min-w-0 flex-1 bg-transparent py-2 text-base text-ink caret-primary outline-none placeholder:text-muted"
      />
      <button type="submit" className="min-h-10 shrink-0 rounded-full bg-primary px-5 text-sm font-semibold text-primary-ink">{ar ? "بحث" : "Search"}</button>
    </form>
  );
}

function FileRow({ f, context, locale = "en" }: { f: LibFile; context?: string; locale?: Locale }) {
  const Icon = FILE_ICON[f.k];
  return (
    <li>
      <Link href={`${libBase(locale)}/read/${f.id}`} className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-bg-2">
        <Icon size={18} className="shrink-0 text-primary" />
        <span className="min-w-0 flex-1">
          <span dir="auto" className="ar-text block leading-snug group-hover:text-primary">{fileName(f, locale)}</span>
          {context && <span className="block text-xs text-muted" dir="auto">{context}</span>}
        </span>
        <span className="shrink-0 text-xs text-muted">{(locale === "ar" ? KIND_LABEL_AR : KIND_LABEL)[f.k]}</span>
      </Link>
    </li>
  );
}

/** A subject (or any folder) as a card: Arabic name, English hint, its files and sub-folders. */
function FolderCard({ folder, locale = "en" }: { folder: LibFolder; locale?: Locale }) {
  const files = folder.f.filter((n): n is LibFile => !isFolder(n));
  const subs = folder.f.filter(isFolder);
  const hint = locale === "ar" ? null : subjectHint(folder.t);
  return (
    <div className="break-inside-avoid rounded-2xl border border-line bg-card p-4">
      <p dir="auto" className="ar-text text-lg font-semibold leading-snug">{folderName(folder.t, locale)}</p>
      {hint && <p className="text-sm text-muted">{hint}</p>}
      {files.length > 0 && <ul className="-mx-2 mt-2">{files.map((f) => <FileRow key={f.id} f={f} locale={locale} />)}</ul>}
      {subs.map((s) => (
        <details key={s.id} className="mt-2 rounded-xl bg-bg-2 px-3 py-2">
          <summary className="flex cursor-pointer items-center gap-2 text-sm font-semibold">
            <Folder size={15} className="text-gold" /> <span dir="auto" className="ar-text">{folderName(s.t, locale)}</span>
            <span className="ms-auto text-xs font-normal text-muted">{num(countFiles(s), locale)}</span>
          </summary>
          <ul className="-mx-2 mt-1">
            {s.f.flatMap(function flat(n): LibFile[] { return isFolder(n) ? n.f.flatMap(flat) : [n]; }).map((f) => <FileRow key={f.id} f={f} locale={locale} />)}
          </ul>
        </details>
      ))}
    </div>
  );
}

/** One college: each level is a section, each subject a card. Loose files sit at the top. */
export function CollectionView({ collection, tree, addHref, locale = "en" }: { collection: Collection; tree: LibFolder; addHref: string; locale?: Locale }) {
  const ar = locale === "ar";
  const loose = tree.f.filter((n): n is LibFile => !isFolder(n));
  const sections = tree.f.filter(isFolder);
  return (
    <>
      <section className="lattice overflow-hidden bg-brand text-white">
        <div className="shell py-10 md:py-14">
          <div className="flex items-center gap-2">
            <BookOpen size={15} className="shrink-0 text-gold-bright" aria-hidden="true" />
            <Breadcrumbs tone="band" rtl={ar} items={ar ? [["الرئيسية", "/ar"], ["المكتبة", "/ar/library"]] : [["Home", "/"], ["Library", "/library"]]} />
          </div>
          {ar ? (
            <h1 className="ar-text mt-3 text-4xl font-bold leading-snug md:text-6xl">{collection.titleAr}</h1>
          ) : (
            <>
              <h1 className="mt-3 font-heading text-4xl font-bold leading-[1.05] md:text-6xl">{collection.title}</h1>
              <p className="ar-text mt-2 text-xl text-white/80">{collection.titleAr}</p>
            </>
          )}
          <p className="mt-4 max-w-2xl text-white/85">{ar ? `${num(countFiles(tree), locale)} ملفًا. ${collection.blurbAr}` : `${countFiles(tree)} files. ${collection.blurb}`}</p>
          {sections.length > 1 && (
            <nav aria-label={ar ? "المستويات" : "Levels"} className="mt-6 flex flex-wrap gap-2">
              {sections.map((s) => (
                <a key={s.id} href={`#f-${s.id}`} dir="auto" className="min-h-10 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/15 transition hover:bg-white/20">
                  {levelName(s.t, locale) ?? folderName(s.t, locale)}
                </a>
              ))}
            </nav>
          )}
        </div>
      </section>
      <div className="shell mt-8 space-y-10 md:mt-10">
        <LibrarySearchForm collection={collection} locale={locale} />
        <CurriculumNote addHref={addHref} locale={locale} />
        {loose.length > 0 && <ul className="grid gap-1 md:grid-cols-2">{loose.map((f) => <FileRow key={f.id} f={f} locale={locale} />)}</ul>}
        {sections.map((s) => {
          const level = ar ? null : levelLabel(s.t);
          const subjects = s.f.filter(isFolder);
          const files = s.f.filter((n): n is LibFile => !isFolder(n));
          return (
            <section key={s.id} id={`f-${s.id}`} className="scroll-mt-24">
              <h2 className="font-heading text-2xl font-bold md:text-3xl">
                {level ?? <span dir="auto" className="ar-text">{folderName(s.t, locale)}</span>}
                {level && <span className="ar-text ms-3 text-lg font-normal text-muted">{s.t}</span>}
              </h2>
              <p className="mt-1 text-sm text-muted">
                {ar
                  ? `${num(countFiles(s), locale)} ملفًا${subjects.length ? `، ${num(subjects.length, locale)} مواد` : ""}`
                  : `${countFiles(s)} files${subjects.length ? `, ${subjects.length} subjects` : ""}`}
              </p>
              {files.length > 0 && <ul className="mt-3 grid gap-1 md:grid-cols-2">{files.map((f) => <FileRow key={f.id} f={f} locale={locale} />)}</ul>}
              {subjects.length > 0 && <div className="mt-4 gap-4 space-y-4 md:columns-2 xl:columns-3 [&>*]:mb-4">{subjects.map((sub) => <FolderCard key={sub.id} folder={sub} locale={locale} />)}</div>}
            </section>
          );
        })}
      </div>
    </>
  );
}

const pathText = (hit: FileHit, locale: Locale = "en") =>
  locale === "ar"
    ? [hit.collection.titleAr, ...hit.path.slice(1).map((p) => folderNameAr(p.t))].join(" ‹ ")
    : [hit.collection.title, ...hit.path.slice(1).map((p) => levelLabel(p.t) ?? p.t)].join(" › ");

/** The reader: the book itself, embedded, with the rest of its subject beside it. */
export function ReaderView({ hit, addHref, locale = "en" }: { hit: FileHit; addHref: string; locale?: Locale }) {
  const ar = locale === "ar";
  const base = libBase(locale);
  const { file, collection, path } = hit;
  const parent = path[path.length - 1];
  const siblings = parent.f.filter((n): n is LibFile => !isFolder(n));
  const i = siblings.findIndex((s) => s.id === file.id);
  const prev = siblings[i - 1];
  const next = siblings[i + 1];
  const links = driveLinks(file.id);
  const hint = ar ? null : subjectHint(parent.t);
  return (
    <div className="shell pt-6 md:pt-8">
      <Breadcrumbs
        rtl={ar}
        items={[
          [ar ? "الرئيسية" : "Home", ar ? "/ar" : "/"],
          [ar ? "المكتبة" : "Library", base],
          [ar ? collection.titleAr : collection.title, `${base}/${collection.slug}`],
          ...path.slice(1).map((p): [string, string] => [ar ? folderNameAr(p.t) : (levelLabel(p.t) ?? p.t), `${base}/${collection.slug}#f-${path[1].id}`]),
        ]}
      />
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 dir="auto" className="ar-text font-heading text-2xl font-bold leading-snug md:text-4xl">{fileName(file, locale)}</h1>
          {hint && <p className="mt-1 text-muted">{hint}</p>}
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={links.download} className="inline-flex min-h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-ink"><Download size={16} /> {ar ? "تنزيل" : "Download"}</a>
          <a href={links.view} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-card px-4 text-sm font-semibold"><ExternalLink size={15} /> {ar ? "فتح بملء الشاشة" : "Open full screen"}</a>
        </div>
      </div>
      <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="overflow-hidden rounded-2xl border border-line bg-bg-2">
          <iframe src={links.preview} title={fileName(file, locale)} className="h-[75vh] min-h-[480px] w-full" allow="autoplay; fullscreen" loading="lazy" />
        </div>
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="flex gap-2">
            {prev ? <Link href={`${base}/read/${prev.id}`} className="flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-xl border border-line bg-card text-sm font-semibold"><ArrowLeft size={15} className="rtl:rotate-180" /> {ar ? "السابق" : "Previous"}</Link> : <span className="flex-1" />}
            {next ? <Link href={`${base}/read/${next.id}`} className="flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-xl border border-line bg-card text-sm font-semibold">{ar ? "التالي" : "Next"} <ArrowRight size={15} className="rtl:rotate-180" /></Link> : <span className="flex-1" />}
          </div>
          {siblings.length > 1 && (
            <div className="rounded-2xl border border-line bg-card p-3">
              <p className="px-2 pb-1 text-sm font-semibold text-muted">{ar ? "في هذا المجلد" : "In this folder"}</p>
              <ul>
                {siblings.map((s) =>
                  s.id === file.id ? (
                    <li key={s.id} dir="auto" className="ar-text rounded-xl bg-primary-soft px-3 py-2.5 font-semibold">{fileName(s, locale)}</li>
                  ) : (
                    <FileRow key={s.id} f={s} locale={locale} />
                  )
                )}
              </ul>
            </div>
          )}
          <p className="text-xs text-muted">{ar ? "إذا تأخر تحميل الملف فافتحه بملء الشاشة." : "If the file is slow to load, open it full screen."}</p>
        </aside>
      </div>
      <div className="mt-8"><CurriculumNote addHref={addHref} locale={locale} /></div>
    </div>
  );
}

export function SearchResults({ q, hits, collection, locale = "en" }: { q: string; hits: FileHit[]; collection?: Collection; locale?: Locale }) {
  const ar = locale === "ar";
  const base = libBase(locale);
  const count = `${num(hits.length, locale)}${hits.length >= 60 ? "+" : ""}`;
  return (
    <div className="shell pt-8 md:pt-10">
      <Link href={collection ? `${base}/${collection.slug}` : base} className="text-sm text-muted hover:text-ink">{collection ? (ar ? collection.titleAr : collection.title) : ar ? "المكتبة" : "Library"}</Link>
      <h1 className="mt-2 font-heading text-3xl font-bold md:text-4xl">{ar ? "البحث في كتب المقررات" : "Search the course books"}</h1>
      <div className="mt-5"><LibrarySearchForm q={q} collection={collection} locale={locale} /></div>
      {q && (
        <p className="mt-6 text-sm text-muted">
          {ar
            ? hits.length
              ? `${count} ملفًا تطابق «${q}»${collection ? ` في ${collection.titleAr}` : ""}.`
              : `لا شيء يطابق «${q}». جرّب اسم المادة بالعربية، أو كلمة واحدة مثل: توحيد أو نحو.`
            : hits.length
              ? `${count} files match "${q}"${collection ? ` in ${collection.title}` : ""}.`
              : `Nothing matches "${q}". Try the Arabic name of the subject, or one word such as توحيد or nahw.`}
        </p>
      )}
      {hits.length > 0 && (
        <ul className="mt-3 grid gap-1 rounded-2xl border border-line bg-card p-2 md:grid-cols-2">
          {hits.map((h) => <FileRow key={h.file.id} f={h.file} context={pathText(h, locale)} locale={locale} />)}
        </ul>
      )}
    </div>
  );
}

export const firstLevelCount = (tree: LibFolder) => tree.f.filter((n: LibNode) => isFolder(n) && levelLabel(n.t)).length;
