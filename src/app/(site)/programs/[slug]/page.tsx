import type { Metadata } from "next";
import { metaDescription, metaTitle } from "@/lib/text";
import { notFound } from "next/navigation";
import { PROGRAMS } from "@/content/programs";
import { ProgramPage } from "@/features/programs/ProgramPages";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROGRAMS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = PROGRAMS.find((x) => x.slug === slug);
  return p ? { title: metaTitle(p.name), description: metaDescription(p.tagline), alternates: { canonical: `/programs/${p.slug}` } } : {};
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const p = PROGRAMS.find((x) => x.slug === slug);
  if (!p) notFound();
  return <ProgramPage p={p} />;
}
