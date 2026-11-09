import type { Metadata } from "next";
import { metaDescription, metaTitle } from "@/lib/text";
import { notFound } from "next/navigation";
import { getDb } from "@/server/db/client";
import { getGuide, listFaqs, listGuides } from "@/server/content/queries";
import { getWhatsAppUrl } from "@/server/settings";
import { GuidePage } from "@/features/content/ContentPages";
import { guideText } from "@/lib/arabic-content";

export const revalidate = 300;
/** Built on first visit, then cached and refreshed every 5 minutes. */
export function generateStaticParams() {
  return [];
}
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const g = await getGuide(await getDb(), slug);
  return g
    ? {
        title: metaTitle(g.title),
        description: metaDescription(g.summary ?? g.title),
        // Once the guide is translated, the English and Arabic pages point to each other.
        alternates: guideText(g, "ar").bodyInArabic ? { canonical: `/guides/${slug}`, languages: { en: `/guides/${slug}`, ar: `/ar/guides/${slug}`, "x-default": `/guides/${slug}` } } : { canonical: `/guides/${slug}` },
        openGraph: { type: "article", title: g.title, description: g.summary, url: `/guides/${slug}`, siteName: "MESH", ...(g.coverUrl ? { images: [g.coverUrl] } : {}) },
        twitter: { card: "summary_large_image", title: g.title, description: g.summary },
      }
    : {};
}

export default async function Page({ params }: Props) {
  const db = await getDb();
  const guide = await getGuide(db, (await params).slug);
  if (!guide) notFound();
  const [whatsappUrl, guides, faqs] = await Promise.all([getWhatsAppUrl(db), listGuides(db), listFaqs(db)]);
  return <GuidePage guide={guide} whatsappUrl={whatsappUrl} guides={guides} faqs={faqs} />;
}
