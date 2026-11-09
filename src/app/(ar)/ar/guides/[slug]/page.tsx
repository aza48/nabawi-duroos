import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { metaDescription, metaTitle } from "@/lib/text";
import { getDb } from "@/server/db/client";
import { getGuide, listFaqs, listGuides } from "@/server/content/queries";
import { getWhatsAppUrl } from "@/server/settings";
import { GuidePage } from "@/features/content/ContentPages";
import { guideText } from "@/lib/arabic-content";

export const revalidate = 300;
export function generateStaticParams() {
  return [];
}
type Props = { params: Promise<{ slug: string }> };

/** A translated guide is its own page in Arabic; until then the body is English, so search engines are pointed at the English page. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const g = await getGuide(await getDb(), slug);
  if (!g) return {};
  const t = guideText(g, "ar");
  const alternates = t.bodyInArabic
    ? { canonical: `/ar/guides/${slug}`, languages: { en: `/guides/${slug}`, ar: `/ar/guides/${slug}`, "x-default": `/guides/${slug}` } }
    : { canonical: `/guides/${slug}` };
  return { title: metaTitle(t.title), description: metaDescription(t.summary ?? t.title), alternates };
}

export default async function Page({ params }: Props) {
  const db = await getDb();
  const guide = await getGuide(db, (await params).slug);
  if (!guide) notFound();
  const [whatsappUrl, guides, faqs] = await Promise.all([getWhatsAppUrl(db), listGuides(db), listFaqs(db)]);
  return <GuidePage guide={guide} whatsappUrl={whatsappUrl} guides={guides} faqs={faqs} locale="ar" />;
}
