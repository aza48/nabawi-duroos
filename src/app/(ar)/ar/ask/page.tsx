import type { Metadata } from "next";
import { getDb } from "@/server/db/client";
import { listFaqs } from "@/server/content/queries";
import { getWhatsAppUrl } from "@/server/settings";
import { AskPage } from "@/features/content/ContentPages";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "أسئلة وأجوبة",
  description: "أجوبة موثّقة لأكثر ما يسأل عنه الطلاب الناطقون بالإنجليزية في المدينة.",
  alternates: { canonical: "/ar/ask", languages: { en: "/ask", ar: "/ar/ask" } },
};

export default async function Page() {
  const db = await getDb();
  const [faqs, whatsappUrl] = await Promise.all([listFaqs(db), getWhatsAppUrl(db)]);
  return <AskPage faqs={faqs} whatsappUrl={whatsappUrl} locale="ar" />;
}
