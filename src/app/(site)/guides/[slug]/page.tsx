import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDb } from "@/server/db/client";
import { getGuide } from "@/server/content/queries";
import { getWhatsAppUrl } from "@/server/settings";
import { GuidePage } from "@/features/content/ContentPages";

export const revalidate = 300;
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const g = await getGuide(await getDb(), slug);
  return g
    ? {
        title: g.title,
        description: g.summary,
        alternates: { canonical: `/guides/${slug}` },
        openGraph: { type: "article", title: g.title, description: g.summary, url: `/guides/${slug}`, siteName: "MESH", ...(g.coverUrl ? { images: [g.coverUrl] } : {}) },
        twitter: { card: "summary_large_image", title: g.title, description: g.summary },
      }
    : {};
}

export default async function Page({ params }: Props) {
  const db = await getDb();
  const guide = await getGuide(db, (await params).slug);
  if (!guide) notFound();
  return <GuidePage guide={guide} whatsappUrl={await getWhatsAppUrl(db)} />;
}
