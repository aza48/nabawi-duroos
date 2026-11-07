import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDb } from "@/server/db/client";
import { getFaq } from "@/server/content/queries";
import { getWhatsAppUrl } from "@/server/settings";
import { FaqPage } from "@/features/content/ContentPages";

export const revalidate = 300;
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const f = await getFaq(await getDb(), slug);
  return f ? { title: f.question, alternates: { canonical: `/ask/${slug}` } } : {};
}

export default async function Page({ params }: Props) {
  const db = await getDb();
  const faq = await getFaq(db, (await params).slug);
  if (!faq) notFound();
  return <FaqPage faq={faq} whatsappUrl={await getWhatsAppUrl(db)} />;
}
