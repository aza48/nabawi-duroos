import type { Metadata } from "next";
import { getDb } from "@/server/db/client";
import { getHelpContact, whatsappLink } from "@/server/settings";
import { LibraryPage } from "@/features/library/LibraryPage";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "المكتبة",
  description: "مقررات الجامعة الإسلامية لكل كلية، وكتب المعهد، والروابط الرسمية.",
  alternates: { canonical: "/ar/library", languages: { en: "/library", ar: "/ar/library" } },
};

export default async function Page() {
  const help = await getHelpContact(await getDb());
  return <LibraryPage locale="ar" helpContact={help} takhleesHref={whatsappLink(help, "السلام عليكم، عندي تلخيص أشاركه لمكتبة MESH:")} />;
}
