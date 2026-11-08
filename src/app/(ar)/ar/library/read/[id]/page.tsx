import type { Metadata } from "next";
import { metaDescription, metaTitle } from "@/lib/text";
import { notFound } from "next/navigation";
import { fileIndex, folderNameAr } from "@/content/library-books";
import { ReaderView } from "@/features/library/CoursePages";
import { addBookHref } from "@/features/library/add-link";

export const revalidate = 3600;
/** Rendered on first visit and cached for an hour; without this a dynamic segment is never ISR-cached. */
export function generateStaticParams(): { id: string }[] {
  return [];
}
type Props = { params: Promise<{ id: string }> };

/** The reader is the same book in both languages, so search engines are pointed at the English page. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const hit = fileIndex().get((await params).id);
  if (!hit) return {};
  const where = [hit.collection.titleAr, ...hit.path.slice(1).map((p) => folderNameAr(p.t))].join("، ");
  return { title: metaTitle(hit.file.t), description: metaDescription(`${hit.file.t}: ${where}. اقرأه على MESH.`), alternates: { canonical: `/library/read/${hit.file.id}` } };
}

export default async function Page({ params }: Props) {
  const hit = fileIndex().get((await params).id);
  if (!hit) notFound();
  return <ReaderView hit={hit} addHref={await addBookHref(hit.collection.titleAr, "ar")} locale="ar" />;
}
