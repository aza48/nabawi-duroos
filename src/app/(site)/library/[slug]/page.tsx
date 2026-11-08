import type { Metadata } from "next";
import { metaDescription, metaTitle } from "@/lib/text";
import { notFound } from "next/navigation";
import { COLLECTIONS, countFiles, treeOf } from "@/content/library-books";
import { CollectionView } from "@/features/library/CoursePages";
import { addBookHref } from "@/features/library/add-link";

export const revalidate = 3600;
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return COLLECTIONS.filter((c) => treeOf(c.slug)).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const c = COLLECTIONS.find((x) => x.slug === slug);
  const tree = c && treeOf(c.slug);
  if (!c || !tree) return {};
  return {
    title: metaTitle(`${c.title} course books`),
    description: metaDescription(`${countFiles(tree)} course books and summaries for ${c.title} (${c.titleAr}) at the Islamic University of Madinah, by level, readable on MESH.`),
    alternates: { canonical: `/library/${c.slug}` },
  };
}

export default async function Page({ params }: Props) {
  const slug = (await params).slug;
  const c = COLLECTIONS.find((x) => x.slug === slug);
  const tree = c && treeOf(c.slug);
  if (!c || !tree) notFound();
  return <CollectionView collection={c} tree={tree} addHref={await addBookHref(c.title)} />;
}
