import type { Metadata } from "next";
import { getDb } from "@/server/db/client";
import { getHelpContact } from "@/server/settings";
import { PrivacyPage } from "@/features/content/PrivacyPage";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Privacy",
  description: "What medinahub.org keeps about your visit (anonymous page counts, no names or addresses), how long, and how to switch counting off.",
  alternates: { canonical: "/privacy", languages: { en: "/privacy", ar: "/ar/privacy", "x-default": "/privacy" } },
};

export default async function Page() {
  return <PrivacyPage helpContact={await getHelpContact(await getDb())} />;
}
