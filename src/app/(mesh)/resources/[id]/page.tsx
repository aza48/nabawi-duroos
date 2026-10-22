import type { Metadata } from "next";
import ArticleReader from "@/components/mesh/ArticleReader";
import { dbConfigured, queryOne } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { excerptOf } from "@/lib/mesh-sanitize";
import { articleUrl, articleOgImage } from "@/lib/mesh-share";

export const dynamic = "force-dynamic";

const GENERIC: Metadata = {
  title: "Article · MESH Resources",
  description: "Guides and walkthroughs from MESH — Medinah English Students Hub.",
};

/** Link embeds (X, WhatsApp, Telegram…): banner image, title, and the first
 *  couple of lines of the article as the description. Published articles only —
 *  a draft's title and text must never leak into a public preview. */
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = parseInt(params.id, 10);
  if (!id || !dbConfigured()) return GENERIC;
  try {
    await ensureMesh();
    const row = await queryOne<{
      title: string; banner: string | null; body_html: string; status: string;
      created_at: string; updated_at: string; author_name: string;
    }>(
      `SELECT a.title, a.banner, a.body_html, a.status, a.created_at, a.updated_at,
         COALESCE(u.display_name, 'Deleted User') AS author_name
       FROM mesh_articles a LEFT JOIN mesh_users u ON u.id = a.author_id
       WHERE a.id = $1`,
      [id]
    );
    if (!row || row.status !== "published") return GENERIC;

    const description = excerptOf(row.body_html, 200);
    const image = articleOgImage(id, row.banner);
    const url = articleUrl(id);
    const title = row.title;
    return {
      title: `${title} · MESH`,
      description,
      alternates: { canonical: url },
      openGraph: {
        type: "article",
        siteName: "MESH — Medinah English Students Hub",
        title,
        description,
        url,
        publishedTime: new Date(row.created_at).toISOString(),
        modifiedTime: new Date(row.updated_at).toISOString(),
        authors: [row.author_name],
        images: [{ url: image, width: 1200, height: 480, alt: title }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
    };
  } catch {
    return GENERIC;
  }
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  return <ArticleReader id={String(params.id)} />;
}
