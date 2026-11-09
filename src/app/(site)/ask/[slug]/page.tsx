import type { Metadata } from "next";
import { metaDescription, metaTitle } from "@/lib/text";
import { notFound } from "next/navigation";
import { getDb } from "@/server/db/client";
import { getFaq, listFaqs, listGuides } from "@/server/content/queries";
import { getWhatsAppUrl } from "@/server/settings";
import { FaqPage } from "@/features/content/ContentPages";
import { faqText } from "@/lib/arabic-content";

export const revalidate = 300;
/** Built on first visit, then cached and refreshed every 5 minutes. */
export function generateStaticParams() {
  return [];
}
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const f = await getFaq(await getDb(), slug);
  return f ? { title: metaTitle(f.question), description: metaDescription(f.answerHtml.replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ") || f.question), alternates: faqText(f, "ar").answerInArabic ? { canonical: `/ask/${slug}`, languages: { en: `/ask/${slug}`, ar: `/ar/ask/${slug}`, "x-default": `/ask/${slug}` } } : { canonical: `/ask/${slug}` } } : {};
}

export default async function Page({ params }: Props) {
  const db = await getDb();
  const faq = await getFaq(db, (await params).slug);
  if (!faq) notFound();
  const [whatsappUrl, guides, faqs] = await Promise.all([getWhatsAppUrl(db), listGuides(db), listFaqs(db)]);
  return <FaqPage faq={faq} whatsappUrl={whatsappUrl} guides={guides} faqs={faqs} />;
}
