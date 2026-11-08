import type { Metadata } from "next";
import { metaDescription, metaTitle } from "@/lib/text";
import { notFound } from "next/navigation";
import { COLLECTIONS, countFiles, treeOf } from "@/content/library-books";
import { CollectionView } from "@/features/library/CoursePages";
import { addBookHref } from "@/features/library/add-link";
import { toArabicDigits } from "@/lib/locale";

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
    title: metaTitle(`مقررات ${c.titleAr}`),
    description: metaDescription(`${toArabicDigits(countFiles(tree))} ملفًا من مقررات ${c.titleAr} في الجامعة الإسلامية بالمدينة المنورة وملخصاتها، مرتبة حسب المستوى وتُقرأ على MESH.`),
    alternates: { canonical: `/ar/library/${c.slug}`, languages: { en: `/library/${c.slug}`, ar: `/ar/library/${c.slug}` } },
  };
}

export default async function Page({ params }: Props) {
  const slug = (await params).slug;
  const c = COLLECTIONS.find((x) => x.slug === slug);
  const tree = c && treeOf(c.slug);
  if (!c || !tree) notFound();
  return <CollectionView collection={c} tree={tree} addHref={await addBookHref(c.titleAr, "ar")} locale="ar" />;
}
