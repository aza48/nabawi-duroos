import type { Metadata } from "next";
import { getDb } from "@/server/db/client";
import { getHelpContact, whatsappLink } from "@/server/settings";
import { LibraryPage } from "@/features/library/LibraryPage";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "The Jamiah library",
  description: "Islamic University course texts for every college, Ma'had books and guides, and official links.",
  alternates: { canonical: "/library", languages: { en: "/library", ar: "/ar/library", "x-default": "/library" } },
};

export default async function Page() {
  const help = await getHelpContact(await getDb());
  return <LibraryPage helpContact={help} takhleesHref={whatsappLink(help, "Assalamu alaykum, I have a takhlees to share for the MESH library:")} />;
}
