import { ArrowUpRight, FileText, Folder, Globe, MonitorPlay, Send } from "lucide-react";
import { PageBand } from "@/components/ui";
import Link from "next/link";
import { CHANNELS, MAHAD_EXTRA, OFFICIAL, type LibraryLink, type Manuscript } from "@/content/library";
import { LIVE_COLLECTIONS, countFiles, treeOf } from "@/content/library-books";
import { CurriculumNote, LibrarySearchForm, firstLevelCount } from "./CoursePages";
import manuscripts from "@/content/manuscripts.json";
import { ManuscriptDirectory } from "./ManuscriptDirectory";
import { EnglishNote } from "@/components/EnglishNote";
import type { Locale } from "@/lib/locale";

const ICON: Record<LibraryLink["kind"], typeof Folder> = { folder: Folder, pdf: FileText, site: Globe, youtube: MonitorPlay, telegram: Send, x: Globe, whatsapp: Send };

function LinkCard({ l, ar = false }: { l: LibraryLink; ar?: boolean }) {
  const Icon = ICON[l.kind];
  return (
    <a href={l.href} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 rounded-2xl border border-line bg-card p-4 transition-colors hover:border-primary/50">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary transition group-hover:bg-primary group-hover:text-primary-ink">
        <Icon size={19} />
      </span>
      <span className="min-w-0 flex-1">
        {ar && l.titleAr ? (
          <>
            <span className="ar-text block font-semibold leading-snug group-hover:text-primary">{l.titleAr}</span>
            <span className="block text-sm text-muted" dir="auto" lang="en">{l.title}</span>
          </>
        ) : (
          <>
            <span className="block font-semibold leading-snug group-hover:text-primary" dir="auto">{l.title}</span>
            {l.titleAr && <span className="ar-text block text-[15px] text-muted">{l.titleAr}</span>}
          </>
        )}
        {l.note && <span className="mt-0.5 block text-sm text-muted" dir="auto">{l.note}</span>}
      </span>
      <ArrowUpRight size={16} className="mt-1 shrink-0 text-muted rtl:-scale-x-100" />
    </a>
  );
}

const SECTIONS = [
  { id: "course-books", label: "Course books", ar: "المقررات" },
  { id: "mahad-extra", label: "Ma'had extras", ar: "إضافات المعهد" },
  { id: "official", label: "Official links", ar: "روابط رسمية" },
  { id: "channels", label: "Channels", ar: "قنوات" },
  { id: "manuscripts", label: "Manuscripts", ar: "المخطوطات" },
];

const L = {
  en: { title: "Library", sub: "Course books and summaries for every college and the Ma'had, readable right here, plus official links and 300+ manuscript libraries.", sections: "Sections", books: "Course books by college", booksSub: "Every file opens here on MESH. Pick your college, then your level.", files: "files", levels: "levels", official: "Official links", channels: "Channels worth following", channelsSub: "People who live here and keep their information current.", ms: "Manuscript libraries on Telegram", msSub: "Over 300 channels sharing scans from manuscript collections around the world, from Istanbul to Timbuktu. List checked 1 January 2026." },
  ar: { title: "المكتبة", sub: "مقررات كل الكليات والمعهد وملخصاتها، تُقرأ هنا مباشرة، مع الروابط الرسمية وأكثر من ٣٠٠ مكتبة مخطوطات.", sections: "الأقسام", books: "المقررات حسب الكلية", booksSub: "كل ملف يُفتح هنا في MESH. اختر كليتك ثم مستواك.", files: "ملفًا", levels: "مستويات", official: "روابط رسمية", channels: "قنوات تستحق المتابعة", channelsSub: "أناس يعيشون هنا ويحدّثون معلوماتهم باستمرار.", ms: "مكتبات المخطوطات على تيليجرام", msSub: "أكثر من ٣٠٠ قناة تنشر صور مخطوطات من مكتبات العالم، من إسطنبول إلى تمبكتو. رُوجعت القائمة في ١ يناير ٢٠٢٦." },
};

export function LibraryPage({ takhleesHref, locale = "en" }: { takhleesHref: string; helpContact?: string; locale?: Locale }) {
  const ar = locale === "ar";
  const t = L[locale];
  return (
    <>
      <PageBand title={t.title} subtitle={t.sub}>
        <div className="mt-8"><LibrarySearchForm /></div>
        <nav aria-label={t.sections} className="mt-5 flex flex-wrap gap-2">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/15 transition hover:bg-white/20">
              {ar ? s.ar : s.label}
            </a>
          ))}
        </nav>
      </PageBand>

      <div className="shell mt-10 space-y-16 md:mt-14">
        {ar && <EnglishNote className="max-w-3xl" />}
        <section id="course-books" className="scroll-mt-24">
          <h2 className="font-heading text-3xl font-bold">{t.books}</h2>
          <p className="mt-2 max-w-2xl text-muted">{t.booksSub}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {LIVE_COLLECTIONS.map((c) => {
              const tree = treeOf(c.slug)!;
              const levels = firstLevelCount(tree);
              return (
                <Link key={c.slug} href={`/library/${c.slug}`} className={`group flex flex-col rounded-2xl border p-5 transition-colors hover:border-primary/50 ${c.group === "mahad" ? "border-primary/40 bg-primary-soft/40" : "border-line bg-card"}`}>
                  {ar ? (
                    <>
                      <span className="ar-text text-xl font-bold leading-snug group-hover:text-primary">{c.titleAr}</span>
                      <span className="text-sm text-muted" dir="auto" lang="en">{c.title}</span>
                    </>
                  ) : (
                    <>
                      <span className="font-heading text-lg font-semibold leading-snug group-hover:text-primary">{c.title}</span>
                      <span className="ar-text text-[15px] text-muted">{c.titleAr}</span>
                      <span className="mt-2 text-sm text-muted">{c.blurb}</span>
                    </>
                  )}
                  <span className="mt-auto pt-4 text-sm font-semibold text-primary">
                    {countFiles(tree)} {t.files}{levels ? `${ar ? "، " : ", "}${levels} ${t.levels}` : ""}
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="mt-6"><CurriculumNote addHref={takhleesHref} /></div>
        </section>

        <section id="mahad-extra" className="scroll-mt-24">
          <h2 className="font-heading text-2xl font-bold">{ar ? "المزيد لطلاب المعهد" : <>More for Ma&apos;had students</>}</h2>
          {ar ? (
            <p className="mt-1 text-muted">كل ذلك مرتبًا حسب المستوى، مع مفاتيح الإجابات وقواعد الرسوب في المستوى، في <Link href="/mahad" className="font-semibold text-primary hover:underline">دليل المعهد</Link>.</p>
          ) : (
            <p className="mt-1 text-muted">All of it by level, with the answer keys and the rules for failing a level, in the <Link href="/mahad" className="font-semibold text-primary hover:underline">Ma&apos;had hub</Link>.</p>
          )}
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {MAHAD_EXTRA.map((l) => <LinkCard key={l.href} l={l} ar={ar} />)}
          </div>
        </section>

        <section id="official" className="scroll-mt-24">
          <h2 className="font-heading text-3xl font-bold">{t.official}</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {OFFICIAL.map((l) => <LinkCard key={l.href} l={l} ar={ar} />)}
          </div>
        </section>

        <section id="channels" className="scroll-mt-24">
          <h2 className="font-heading text-3xl font-bold">{t.channels}</h2>
          <p className="mt-2 max-w-2xl text-muted">{t.channelsSub}</p>
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {CHANNELS.map((l) => <LinkCard key={l.href} l={l} ar={ar} />)}
          </div>
        </section>

        <section id="manuscripts" className="scroll-mt-24">
          <h2 className="font-heading text-3xl font-bold">{t.ms}</h2>
          <p className="mt-2 mb-6 max-w-2xl text-muted">{t.msSub}</p>
          <ManuscriptDirectory items={manuscripts as Manuscript[]} />
        </section>
      </div>
    </>
  );
}
