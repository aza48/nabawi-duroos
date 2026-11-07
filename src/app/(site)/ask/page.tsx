import type { Metadata } from "next";
import { getDb } from "@/server/db/client";
import { listFaqs } from "@/server/content/queries";
import { getWhatsAppUrl } from "@/server/settings";
import { AskPage } from "@/features/content/ContentPages";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Questions and answers",
  description: "Verified answers to the questions English-speaking students in Madinah ask most.",
  alternates: { canonical: "/ask" },
};

export default async function Page() {
  const db = await getDb();
  const [faqs, whatsappUrl] = await Promise.all([listFaqs(db), getWhatsAppUrl(db)]);
  return <AskPage faqs={faqs} whatsappUrl={whatsappUrl} />;
}
