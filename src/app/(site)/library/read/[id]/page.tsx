import type { Metadata } from "next";
import { metaDescription, metaTitle } from "@/lib/text";
import { notFound } from "next/navigation";
import { fileIndex, levelLabel } from "@/content/library-books";
import { ReaderView } from "@/features/library/CoursePages";
import { addBookHref } from "@/features/library/add-link";

export const revalidate = 3600;
/** Rendered on first visit and cached for an hour; without this a dynamic segment is never ISR-cached. */
export function generateStaticParams(): { id: string }[] {
  return [];
}
type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const hit = fileIndex().get((await params).id);
  if (!hit) return {};
  const where = [hit.collection.title, ...hit.path.slice(1).map((p) => levelLabel(p.t) ?? p.t)].join(", ");
  return { title: metaTitle(hit.file.t), description: metaDescription(`${hit.file.t}: ${where}. Read it on MESH.`), alternates: { canonical: `/library/read/${hit.file.id}` } };
}

export default async function Page({ params }: Props) {
  const hit = fileIndex().get((await params).id);
  if (!hit) notFound();
  return <ReaderView hit={hit} addHref={await addBookHref(hit.collection.title)} />;
}
