import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { metaDescription, metaTitle } from "@/lib/text";
import { PROGRAMS } from "@/content/programs";
import { ProgramPage } from "@/features/programs/ProgramPages";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROGRAMS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = PROGRAMS.find((x) => x.slug === slug);
  return p
    ? { title: metaTitle(p.nameAr), description: metaDescription(p.tagline), alternates: { canonical: `/ar/programs/${p.slug}`, languages: { en: `/programs/${p.slug}`, ar: `/ar/programs/${p.slug}` } } }
    : {};
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const p = PROGRAMS.find((x) => x.slug === slug);
  if (!p) notFound();
  return <ProgramPage p={p} locale="ar" />;
}
