import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, query, queryOne } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { getCurrentUser } from "@/lib/mesh-auth";
import { noDb, bad } from "@/lib/mesh-api";
import { articleSelect, articleListItem, parseArticleInput, type ArticleRow } from "@/lib/mesh-articles";
import { pingIndexNow } from "@/lib/indexnow";
import { abs } from "@/lib/site";

export async function GET(req: NextRequest) {
  if (!dbConfigured()) return noDb(); try { await ensureMesh(); } catch { return noDb(); }
  const scope = req.nextUrl.searchParams.get("scope") === "mine" ? "mine" : "published";
  const limit = Math.min(50, Math.max(1, parseInt(req.nextUrl.searchParams.get("limit") || "30", 10) || 30));
  const user = await getCurrentUser();

  if (scope === "mine") {
    if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    // Own articles, drafts included. body_html is trimmed to a head slice: the list only
    // needs an excerpt + reading-time estimate, not every inline image of every article.
    const rows = await query<ArticleRow>(
      articleSelect("$1").replace("a.body_html", "LEFT(a.body_html, 20000) AS body_html") + ` WHERE a.author_id = $1 ORDER BY a.updated_at DESC LIMIT $2`,
      [user.id, limit]
    );
    return NextResponse.json({ articles: rows.map(articleListItem) });
  }

  const rows = await query<ArticleRow>(
    articleSelect("$1").replace("a.body_html", "LEFT(a.body_html, 20000) AS body_html") + ` WHERE a.status = 'published' ORDER BY a.created_at DESC LIMIT $2`,
    [user?.id ?? -1, limit]
  );
  return NextResponse.json({ articles: rows.map(articleListItem) });
}

export async function POST(req: NextRequest) {
  if (!dbConfigured()) return noDb(); try { await ensureMesh(); } catch { return noDb(); }
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (user.role !== "mandoob" && user.role !== "contributor" && user.role !== "admin") return NextResponse.json({ error: "writers_only" }, { status: 403 });
  const body = await req.json().catch(() => ({})) as Record<string, unknown>;
  const parsed = parseArticleInput(body);
  if ("error" in parsed) return bad(parsed.error);
  const { title, banner, bodyHtml, status } = parsed.input;
  const row = await queryOne<{ id: number; updated_at: string }>(
    `INSERT INTO mesh_articles (author_id, title, banner, body_html, status) VALUES ($1,$2,$3,$4,$5) RETURNING id, updated_at`,
    [user.id, title, banner, bodyHtml, status]
  );
  if (!row) return bad("Could not create article", 500);
  // Instant-indexing ping when an article is born published (fire-and-forget).
  if (status === "published") pingIndexNow([abs(`/resources/${row.id}`)]);
  return NextResponse.json({ id: row.id, status, updated_at: row.updated_at }, { status: 201 });
}
