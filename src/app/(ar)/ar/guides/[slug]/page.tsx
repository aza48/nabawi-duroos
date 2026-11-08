import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { metaDescription, metaTitle } from "@/lib/text";
import { getDb } from "@/server/db/client";
import { getGuide, listFaqs, listGuides } from "@/server/content/queries";
import { getWhatsAppUrl } from "@/server/settings";
import { GuidePage } from "@/features/content/ContentPages";

export const revalidate = 300;
export function generateStaticParams() {
  return [];
}
type Props = { params: Promise<{ slug: string }> };

/** The body is in English, so search engines are pointed at the English page. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const g = await getGuide(await getDb(), slug);
  return g ? { title: metaTitle(g.title), description: metaDescription(g.summary ?? g.title), alternates: { canonical: `/guides/${slug}` } } : {};
}

export default async function Page({ params }: Props) {
  const db = await getDb();
  const guide = await getGuide(db, (await params).slug);
  if (!guide) notFound();
  const [whatsappUrl, guides, faqs] = await Promise.all([getWhatsAppUrl(db), listGuides(db), listFaqs(db)]);
  return <GuidePage guide={guide} whatsappUrl={whatsappUrl} guides={guides} faqs={faqs} locale="ar" />;
}
