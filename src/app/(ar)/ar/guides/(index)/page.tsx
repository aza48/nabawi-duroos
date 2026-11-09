import type { Metadata } from "next";
import { getDb } from "@/server/db/client";
import { listGuides } from "@/server/content/queries";
import { GuidesPage } from "@/features/content/ContentPages";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "الأدلة",
  description: "أدلة خطوة بخطوة للطلاب الناطقين بالإنجليزية في المدينة: الوصول والاستقرار وحياة الأسرة والمغادرة.",
  alternates: { canonical: "/ar/guides", languages: { en: "/guides", ar: "/ar/guides" } },
};

export default async function Page() {
  return <GuidesPage guides={await listGuides(await getDb())} locale="ar" />;
}
