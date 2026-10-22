import { cache } from "react";
import type { Metadata } from "next";
import ArticleReader from "@/components/mesh/ArticleReader";
import JsonLd from "@/components/JsonLd";
import { dbConfigured, queryOne } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { excerptOf } from "@/lib/mesh-sanitize";
import { articleUrl, articleOgImage } from "@/lib/mesh-share";
import { meshSeedArticles } from "@/data/mesh-articles-seed";
import { meshSeedUsers } from "@/data/mesh-seed";
import { abs, siteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

const GENERIC: Metadata = {
  title: "Article · MESH Resources",
  description: "Guides and walkthroughs from MESH — Medinah English Students Hub.",
};

type ArticleSeoRow = {
  title: string; banner: string | null; body_html: string; status: string;
  created_at: string; updated_at: string; author_name: string;
};

const getArticleRow = cache(async (id: number): Promise<ArticleSeoRow | null> => {
  if (!dbConfigured()) return null;
  try {
    await ensureMesh();
    return await queryOne<ArticleSeoRow>(
      `SELECT a.title, a.banner, a.body_html, a.status, a.created_at, a.updated_at,
         COALESCE(u.display_name, 'Deleted User') AS author_name
       FROM mesh_articles a LEFT JOIN mesh_users u ON u.id = a.author_id
       WHERE a.id = $1`,
      [id]
    );
  } catch {
    return null;
  }
});

/** Link embeds (X, WhatsApp, Telegram…): banner image, title, and the first
 *  couple of lines of the article as the description. Published articles only —
 *  a draft's title and text must never leak into a public preview. */
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = parseInt(params.id, 10);
  if (!id || !dbConfigured()) return GENERIC;
  const row = await getArticleRow(id);
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
}

const publisherLd = {
  "@type": "Organization",
  name: "MESH — Medinah English Students Hub",
  url: siteUrl(),
  logo: { "@type": "ImageObject", url: abs("/mesh-hero-poster.jpg") },
};

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  let articleLd: Record<string, unknown> | null = null;

  const row = id ? await getArticleRow(id) : null;
  if (row && row.status === "published") {
    articleLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: row.title,
      description: excerptOf(row.body_html, 200),
      image: [articleOgImage(id, row.banner)],
      datePublished: new Date(row.created_at).toISOString(),
      dateModified: new Date(row.updated_at).toISOString(),
      author: { "@type": "Person", name: row.author_name },
      publisher: publisherLd,
      mainEntityOfPage: articleUrl(id),
    };
  } else if (!dbConfigured() && id) {
    // No database configured (local/demo): describe the seed article this
    // id stands for — seedMeshArticlesIfEmpty inserts them in array order,
    // so on a fresh database id N is seed article N-1.
    const seed = meshSeedArticles[id - 1];
    if (seed) {
      const mandoob = meshSeedUsers.find((u) => u.role === "mandoob");
      articleLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: seed.title,
        description: excerptOf(seed.bodyHtml, 200),
        image: [abs("/mesh-hero-poster.jpg")],
        author: { "@type": "Person", name: mandoob?.displayName ?? "MESH" },
        publisher: publisherLd,
        mainEntityOfPage: articleUrl(id),
      };
    }
  }

  return (
    <>
      {articleLd && <JsonLd data={articleLd} />}
      <ArticleReader id={String(params.id)} />
    </>
  );
}
