import type { Metadata } from "next";
import Link from "next/link";
import { PageBand } from "@/components/ui";
import { MAHAD_EXTRA } from "@/content/library";
import { isFolder, levelLabel, treeOf, type LibFile, type LibFolder, type LibNode } from "@/content/library-books";
import { toArabicDigits, type Locale } from "@/lib/locale";

const files = (n: LibNode): LibFile[] => (isFolder(n) ? n.f.flatMap(files) : [n]);
const levelNo = (f: LibFolder) => Number(levelLabel(f.t)?.replace("Level ", "") ?? 99);

/** Level folders of one top-level Ma'had folder, in order, each with every file inside it. */
function levels(tree: LibFolder | null, match: RegExp, locale: Locale) {
  const top = tree?.f.find((n): n is LibFolder => isFolder(n) && match.test(n.t));
  if (!top) return [];
  return top.f
    .filter((n): n is LibFolder => isFolder(n) && levelLabel(n.t) !== null)
    .sort((a, b) => levelNo(a) - levelNo(b))
    .map((f) => ({ label: locale === "ar" ? `المستوى ${toArabicDigits(levelNo(f))}` : levelLabel(f.t)!, files: files(f) }));
}

function folderLink(tree: LibFolder | null, match: RegExp, base: string) {
  const top = tree?.f.find((n): n is LibFolder => isFolder(n) && match.test(n.t));
  return top ? `${base}/mahad#f-${top.id}` : `${base}/mahad`;
}

/** The page copy in both languages. Exported so the assistant can answer from it (src/server/assistant/knowledge.ts). */
export const MAHAD_COPY = {
  en: {
    metaTitle: "Ma'had hub: books, answers and levels",
    metaDescription: "The Arabic Language Institute at the Islamic University of Madinah: the textbooks for every level, the answer keys, and what happens if you fail a level.",
    title: "Ma'had hub",
    subtitle: "Everything for the Arabic Language Institute in one place: the books for your level, the answer keys, the rules, and what happens if you fail a level.",
    sections: "Sections",
    nav: [["books", "Books by level"], ["answers", "Answer keys"], ["fail", "If you fail a level"], ["more", "Rules and guides"]],
    booksTitle: "Textbooks by level",
    booksIntro: "The four-level textbooks the Institute teaches from. Open any book to read it here.",
    sixTitle: "The new six-level books",
    sixIntro: "The newer six-level series. If your teacher uses it, start here.",
    more: (n: number) => `and ${n} more in the Library`,
    answersTitle: "Answer keys",
    answersIntro: "Check your homework against the answers for every level of the Madinah Books. Try each exercise first, then check.",
    failTitle: "If you fail a level",
    fail: [
      ["Attendance comes first.", " Miss more than a quarter of the classes in a subject and the system fails you in that subject, whatever your marks. Keep your absences under 25 percent."],
      ["One failed semester:", " you repeat the level the next semester."],
      ["Two failed semesters in a row", " end your place at the Institute. If you are struggling, get help early: a tutor, the answer keys above, and your teacher."],
      ["The placement test is not pass or fail.", " It only decides which level you start in, so answer honestly."],
    ],
    checked: "Last checked 8 November 2026. The full rules are in the study and exam regulations below.",
    rulesTitle: "Rules and guides",
    rules: ["Student guide", "Study and exam regulations", "How-to videos: excuses, withdrawal, Blackboard", "Extra material for every level"],
    footer: ["Everything else for the Ma'had is in the ", "Library", ". Coming to study? Read the ", "guides", "."],
  },
  ar: {
    metaTitle: "دليل المعهد: الكتب والإجابات والمستويات",
    metaDescription: "معهد تعليم اللغة العربية بالجامعة الإسلامية في المدينة المنورة: كتب كل مستوى، ومفاتيح الإجابات، وما يحدث إذا رسبت في مستوى.",
    title: "دليل المعهد",
    subtitle: "كل ما يحتاجه طالب معهد اللغة العربية في مكان واحد: كتب مستواك، ومفاتيح الإجابات، والأنظمة، وما يحدث إذا رسبت في مستوى.",
    sections: "الأقسام",
    nav: [["books", "الكتب حسب المستوى"], ["answers", "مفاتيح الإجابات"], ["fail", "إذا رسبت في مستوى"], ["more", "الأنظمة والأدلة"]],
    booksTitle: "الكتب حسب المستوى",
    booksIntro: "كتب المستويات الأربعة التي يدرّس منها المعهد. افتح أي كتاب لتقرأه هنا.",
    sixTitle: "كتب المستويات الست الجديدة",
    sixIntro: "السلسلة الأحدث ذات المستويات الست. إن كان أستاذك يدرّس منها فابدأ هنا.",
    more: (n: number) => `و${toArabicDigits(n)} غيرها في المكتبة`,
    answersTitle: "مفاتيح الإجابات",
    answersIntro: "راجع واجباتك على إجابات كل مستويات كتب المدينة. حلّ التمرين أولًا، ثم راجع الإجابة.",
    failTitle: "إذا رسبت في مستوى",
    fail: [
      ["الحضور أولًا.", " إن تغيّبت عن أكثر من ربع حصص مادة رسبت فيها مهما كانت درجاتك. أبقِ غيابك دون ٢٥ بالمئة."],
      ["الرسوب في فصل واحد:", " تعيد المستوى في الفصل التالي."],
      ["الرسوب في فصلين متتاليين", " ينهي قيدك في المعهد. إن وجدت صعوبة فاطلب العون مبكرًا: مدرّس خصوصي، ومفاتيح الإجابات أعلاه، وأستاذك."],
      ["اختبار تحديد المستوى لا نجاح فيه ولا رسوب.", " هو يحدد المستوى الذي تبدأ منه فقط، فأجب بصدق."],
    ],
    checked: "آخر مراجعة ٨ نوفمبر ٢٠٢٦. الأنظمة كاملة في لائحة الدراسة والاختبارات أدناه.",
    rulesTitle: "الأنظمة والأدلة",
    rules: ["دليل الطالب", "لائحة الدراسة والاختبارات", "مقاطع إرشادية: الأعذار والانسحاب وBlackboard", "مواد إضافية لكل مستوى"],
    footer: ["وكل ما يخص المعهد غير ذلك تجده في ", "المكتبة", ". قادم للدراسة؟ اقرأ ", "الأدلة", "."],
  },
};
const T = MAHAD_COPY;

export function mahadMetadata(locale: Locale): Metadata {
  const t = T[locale];
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: locale === "ar" ? { canonical: "/ar/mahad", languages: { en: "/mahad", ar: "/ar/mahad" } } : { canonical: "/mahad", languages: { en: "/mahad", ar: "/ar/mahad" } },
  };
}

function LevelGrid({ title, intro, rows, base, more }: { title: string; intro: string; rows: ReturnType<typeof levels>; base: string; more: (n: number) => string }) {
  if (!rows.length) return null;
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-1 max-w-3xl text-muted">{intro}</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {rows.map((r) => (
          <div key={r.label} className="rounded-3xl border border-line bg-card p-5">
            <h3 className="font-semibold text-primary">{r.label}</h3>
            <ul className="mt-2 grid gap-1 text-sm">
              {r.files.slice(0, 8).map((f) => (
                <li key={f.id}>
                  <Link href={`${base}/read/${f.id}`} dir="auto" className="hover:text-primary hover:underline">{f.t}</Link>
                </li>
              ))}
            </ul>
            {r.files.length > 8 && <p className="mt-2 text-xs text-muted">{more(r.files.length - 8)}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

/** The Ma'had hub: the Institute's books by level, the answer keys, the failing rules and the guides. */
export function MahadPage({ locale = "en" }: { locale?: Locale }) {
  const ar = locale === "ar";
  const t = T[locale];
  const base = ar ? "/ar/library" : "/library";
  const tree = treeOf("mahad");
  const current = levels(tree, /^Textbooks/, locale);
  const six = levels(tree, /six levels/, locale);
  const rules: [string, string][] = [
    [t.rules[0], folderLink(tree, /^Student guide/, base)],
    [t.rules[1], folderLink(tree, /regulations/, base)],
    [t.rules[2], folderLink(tree, /^How-to videos/, base)],
    [t.rules[3], folderLink(tree, /^Extra material/, base)],
  ];
  return (
    <>
      <PageBand title={t.title} subtitle={t.subtitle}>
        <nav aria-label={t.sections} className="mt-6 flex flex-wrap gap-2">
          {t.nav.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/15 transition hover:bg-white/20">{label}</a>
          ))}
        </nav>
      </PageBand>
      <div className="shell pb-16">
        <div id="books" className="scroll-mt-24">
          <LevelGrid title={t.booksTitle} intro={t.booksIntro} rows={current} base={base} more={t.more} />
          <LevelGrid title={t.sixTitle} intro={t.sixIntro} rows={six} base={base} more={t.more} />
        </div>

        <section id="answers" className="mt-12 scroll-mt-24">
          <h2 className="text-2xl font-semibold">{t.answersTitle}</h2>
          <p className="mt-1 max-w-3xl text-muted">{t.answersIntro}</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {MAHAD_EXTRA.map((l) => {
              const note = ar ? l.noteAr : l.note;
              return (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="block rounded-3xl border border-line bg-card p-5 transition-colors hover:border-primary/50">
                  <span className="font-semibold text-primary">{ar ? (l.titleAr ?? l.title) : l.title}</span>
                  {note && <span className="mt-1 block text-sm text-muted">{note}</span>}
                </a>
              );
            })}
          </div>
        </section>

        <section id="fail" className="mt-12 max-w-3xl scroll-mt-24">
          <h2 className="text-2xl font-semibold">{t.failTitle}</h2>
          <ul className="mt-3 grid gap-3">
            {t.fail.map(([lead, rest]) => (
              <li key={lead} className="rounded-3xl border border-line bg-card p-5"><strong>{lead}</strong>{rest}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted">{t.checked}</p>
        </section>

        <section id="more" className="mt-12 scroll-mt-24">
          <h2 className="text-2xl font-semibold">{t.rulesTitle}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {rules.map(([label, href]) => (
              <Link key={label} href={href} className="block rounded-3xl border border-line bg-card p-5 font-semibold text-primary transition-colors hover:border-primary/50">{label}</Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            {t.footer[0]}
            <Link href={`${base}/mahad`} className="font-semibold text-primary hover:underline">{t.footer[1]}</Link>
            {t.footer[2]}
            <Link href={ar ? "/ar/guides" : "/guides"} className="font-semibold text-primary hover:underline">{t.footer[3]}</Link>
            {t.footer[4]}
          </p>
        </section>
      </div>
    </>
  );
}
