import type { Metadata } from "next";
import { getDb } from "@/server/db/client";
import { listGuides } from "@/server/content/queries";
import { GuidesPage } from "@/features/content/ContentPages";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Guides",
  description: "Step-by-step guides for English-speaking students in Madinah: arriving, settling in, family life and leaving.",
  alternates: { canonical: "/guides" },
};

export default async function Page() {
  return <GuidesPage guides={await listGuides(await getDb())} />;
}
