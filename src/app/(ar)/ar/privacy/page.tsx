import type { Metadata } from "next";
import { getDb } from "@/server/db/client";
import { getHelpContact } from "@/server/settings";
import { PrivacyPage } from "@/features/content/PrivacyPage";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "الخصوصية",
  description: "ما يحتفظ به medinahub.org عن زيارتك (عدّ مجهول للصفحات، بلا أسماء أو عناوين)، ومدته، وكيف توقفه.",
  alternates: { canonical: "/ar/privacy", languages: { en: "/privacy", ar: "/ar/privacy", "x-default": "/privacy" } },
};

export default async function Page() {
  return <PrivacyPage helpContact={await getHelpContact(await getDb())} locale="ar" />;
}
