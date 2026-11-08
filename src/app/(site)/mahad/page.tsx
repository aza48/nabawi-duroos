import type { Metadata } from "next";
import Link from "next/link";
import { PageBand } from "@/components/ui";
import { MAHAD_EXTRA } from "@/content/library";
import { isFolder, levelLabel, treeOf, type LibFile, type LibFolder, type LibNode } from "@/content/library-books";

export const metadata: Metadata = {
  title: "Ma'had hub: books, answers and levels",
  description: "The Arabic Language Institute at the Islamic University of Madinah: the textbooks for every level, the answer keys, and what happens if you fail a level.",
  alternates: { canonical: "/mahad" },
};

const files = (n: LibNode): LibFile[] => (isFolder(n) ? n.f.flatMap(files) : [n]);
const levelNo = (f: LibFolder) => Number(levelLabel(f.t)?.replace("Level ", "") ?? 99);

/** Level folders of one top-level Ma'had folder, in order, each with every file inside it. */
function levels(tree: LibFolder | null, match: RegExp) {
  const top = tree?.f.find((n): n is LibFolder => isFolder(n) && match.test(n.t));
  if (!top) return [];
  return top.f
    .filter((n): n is LibFolder => isFolder(n) && levelLabel(n.t) !== null)
    .sort((a, b) => levelNo(a) - levelNo(b))
    .map((f) => ({ label: levelLabel(f.t)!, files: files(f) }));
}

function folderLink(tree: LibFolder | null, match: RegExp) {
  const top = tree?.f.find((n): n is LibFolder => isFolder(n) && match.test(n.t));
  return top ? `/library/mahad#f-${top.id}` : "/library/mahad";
}

function LevelGrid({ title, intro, rows }: { title: string; intro: string; rows: ReturnType<typeof levels> }) {
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
                  <Link href={`/library/read/${f.id}`} dir="auto" className="hover:text-primary hover:underline">{f.t}</Link>
                </li>
              ))}
            </ul>
            {r.files.length > 8 && <p className="mt-2 text-xs text-muted">and {r.files.length - 8} more in the Library</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Page() {
  const tree = treeOf("mahad");
  const current = levels(tree, /^Textbooks/);
  const six = levels(tree, /six levels/);
  return (
    <>
      <PageBand title="Ma'had hub" subtitle="Everything for the Arabic Language Institute in one place: the books for your level, the answer keys, the rules, and what happens if you fail a level.">
        <nav aria-label="Sections" className="mt-6 flex flex-wrap gap-2">
          {[["books", "Books by level"], ["answers", "Answer keys"], ["fail", "If you fail a level"], ["more", "Rules and guides"]].map(([id, label]) => (
            <a key={id} href={`#${id}`} className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/15 transition hover:bg-white/20">{label}</a>
          ))}
        </nav>
      </PageBand>
      <div className="shell pb-16">
        <div id="books" className="scroll-mt-24">
          <LevelGrid title="Textbooks by level" intro="The four-level textbooks the Institute teaches from. Open any book to read it here." rows={current} />
          <LevelGrid title="The new six-level books" intro="The newer six-level series. If your teacher uses it, start here." rows={six} />
        </div>

        <section id="answers" className="mt-12 scroll-mt-24">
          <h2 className="text-2xl font-semibold">Answer keys</h2>
          <p className="mt-1 max-w-3xl text-muted">Check your homework against the answers for every level of the Madinah Books. Try each exercise first, then check.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {MAHAD_EXTRA.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="block rounded-3xl border border-line bg-card p-5 transition-colors hover:border-primary/50">
                <span className="font-semibold text-primary">{l.title}</span>
                {l.note && <span className="mt-1 block text-sm text-muted">{l.note}</span>}
              </a>
            ))}
          </div>
        </section>

        <section id="fail" className="mt-12 scroll-mt-24 max-w-3xl">
          <h2 className="text-2xl font-semibold">If you fail a level</h2>
          <ul className="mt-3 grid gap-3">
            <li className="rounded-3xl border border-line bg-card p-5"><strong>Attendance comes first.</strong> Miss more than a quarter of the classes in a subject and the system fails you in that subject, whatever your marks. Keep your absences under 25 percent.</li>
            <li className="rounded-3xl border border-line bg-card p-5"><strong>One failed semester:</strong> you repeat the level the next semester.</li>
            <li className="rounded-3xl border border-line bg-card p-5"><strong>Two failed semesters in a row</strong> end your place at the Institute. If you are struggling, get help early: a tutor, the answer keys above, and your teacher.</li>
            <li className="rounded-3xl border border-line bg-card p-5"><strong>The placement test is not pass or fail.</strong> It only decides which level you start in, so answer honestly.</li>
          </ul>
          <p className="mt-3 text-xs text-muted">Last checked 8 November 2026. The full rules are in the study and exam regulations below.</p>
        </section>

        <section id="more" className="mt-12 scroll-mt-24">
          <h2 className="text-2xl font-semibold">Rules and guides</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["Student guide", folderLink(tree, /^Student guide/)],
              ["Study and exam regulations", folderLink(tree, /regulations/)],
              ["How-to videos: excuses, withdrawal, Blackboard", folderLink(tree, /^How-to videos/)],
              ["Extra material for every level", folderLink(tree, /^Extra material/)],
            ].map(([t, href]) => (
              <Link key={t} href={href} className="block rounded-3xl border border-line bg-card p-5 font-semibold text-primary transition-colors hover:border-primary/50">{t}</Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            Everything else for the Ma&apos;had is in the <Link href="/library/mahad" className="font-semibold text-primary hover:underline">Library</Link>. Coming to study? Read the <Link href="/guides" className="font-semibold text-primary hover:underline">guides</Link>.
          </p>
        </section>
      </div>
    </>
  );
}
