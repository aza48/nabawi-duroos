import type { Metadata } from "next";
import { getDb } from "@/server/db/client";
import { listGuides } from "@/server/content/queries";
import { GuidesPage } from "@/features/content/ContentPages";
import { GUIDE_CARD } from "@/features/guides/company/content";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Guides",
  description: "Step-by-step guides for English-speaking students in Madinah: arriving, settling in, family life and leaving.",
  alternates: { canonical: "/guides", languages: { en: "/guides", ar: "/ar/guides", "x-default": "/guides" } },
};

export default async function Page() {
  const guides = await listGuides(await getDb());
  return <GuidesPage guides={[GUIDE_CARD, ...guides.filter((g) => g.slug !== GUIDE_CARD.slug)]} />;
}
