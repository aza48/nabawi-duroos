import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { metaTitle } from "@/lib/text";
import { getDb } from "@/server/db/client";
import { getFaq } from "@/server/content/queries";
import { getWhatsAppUrl } from "@/server/settings";
import { FaqPage } from "@/features/content/ContentPages";

export const revalidate = 300;
export function generateStaticParams() {
  return [];
}
type Props = { params: Promise<{ slug: string }> };

/** The answer is in English, so search engines are pointed at the English page. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const f = await getFaq(await getDb(), slug);
  return f ? { title: metaTitle(f.question), alternates: { canonical: `/ask/${slug}` } } : {};
}

export default async function Page({ params }: Props) {
  const db = await getDb();
  const faq = await getFaq(db, (await params).slug);
  if (!faq) notFound();
  return <FaqPage faq={faq} whatsappUrl={await getWhatsAppUrl(db)} locale="ar" />;
}
