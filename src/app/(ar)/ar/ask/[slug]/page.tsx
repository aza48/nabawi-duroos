import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { metaTitle } from "@/lib/text";
import { getDb } from "@/server/db/client";
import { getFaq, listFaqs, listGuides } from "@/server/content/queries";
import { getWhatsAppUrl } from "@/server/settings";
import { FaqPage } from "@/features/content/ContentPages";
import { faqText } from "@/lib/arabic-content";

export const revalidate = 300;
export function generateStaticParams() {
  return [];
}
type Props = { params: Promise<{ slug: string }> };

/** A translated answer is its own page in Arabic; until then it is English, so search engines are pointed at the English page. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const f = await getFaq(await getDb(), slug);
  if (!f) return {};
  const t = faqText(f, "ar");
  const alternates = t.answerInArabic
    ? { canonical: `/ar/ask/${slug}`, languages: { en: `/ask/${slug}`, ar: `/ar/ask/${slug}`, "x-default": `/ask/${slug}` } }
    : { canonical: `/ask/${slug}` };
  return { title: metaTitle(t.question), alternates };
}

export default async function Page({ params }: Props) {
  const db = await getDb();
  const faq = await getFaq(db, (await params).slug);
  if (!faq) notFound();
  const [whatsappUrl, guides, faqs] = await Promise.all([getWhatsAppUrl(db), listGuides(db), listFaqs(db)]);
  return <FaqPage faq={faq} whatsappUrl={whatsappUrl} guides={guides} faqs={faqs} locale="ar" />;
}
