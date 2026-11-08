import type { Metadata } from "next";
import { getDb } from "@/server/db/client";
import { getWhatsAppUrl } from "@/server/settings";
import { MorePage } from "@/features/content/ContentPages";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "المزيد",
  description: "تنبيهات الدروس على الجوال، وجدول الأسبوع، والبث المباشر، وقواعد مجموعة MESH على واتساب.",
  alternates: { canonical: "/ar/more", languages: { en: "/more", ar: "/ar/more" } },
};

export default async function Page() {
  return <MorePage whatsappUrl={await getWhatsAppUrl(await getDb())} locale="ar" />;
}
