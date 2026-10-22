import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, query, queryOne } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { getCurrentUser } from "@/lib/mesh-auth";
import { noDb, bad } from "@/lib/mesh-api";
import { audit } from "@/lib/mesh-admin";
import { articleSelect, articleDetail, parseArticlePatch, type ArticleRow } from "@/lib/mesh-articles";
import { plainTextOf } from "@/lib/mesh-sanitize";
import { pingIndexNow } from "@/lib/indexnow";
import { abs } from "@/lib/site";

async function loadArticle(id: number, viewerId: number): Promise<ArticleRow | null> {
  return queryOne<ArticleRow>(articleSelect("$2") + ` WHERE a.id = $1`, [id, viewerId]);
}

function canManage(user: { id: number; role: string } | null, row: ArticleRow): boolean {
  return !!user && (user.role === "admin" || row.author_id === user.id);
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!dbConfigured()) return noDb(); try { await ensureMesh(); } catch { return noDb(); }
  const id = parseInt(params.id, 10);
  if (!id) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const user = await getCurrentUser();
  const row = await loadArticle(id, user?.id ?? -1);
  if (!row) return NextResponse.json({ error: "not_found" }, { status: 404 });
  // Drafts are private to their author and admins — everyone else gets a plain 404.
  if (row.status === "draft" && !canManage(user, row)) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json({ article: articleDetail(row) });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!dbConfigured()) return noDb(); try { await ensureMesh(); } catch { return noDb(); }
  const id = parseInt(params.id, 10);
  if (!id) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const row = await queryOne<{ author_id: number | null; body_html: string; status: string }>(`SELECT author_id, body_html, status FROM mesh_articles WHERE id=$1`, [id]);
  if (!row) return NextResponse.json({ error: "not_found" }, { status: 404 });
  if (!(user.role === "admin" || row.author_id === user.id)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const body = await req.json().catch(() => ({})) as Record<string, unknown>;
  const parsed = parseArticlePatch(body);
  if ("error" in parsed) return bad(parsed.error);
  const patch = parsed.patch;
  const nextStatus = patch.status ?? row.status;
  const nextBody = patch.bodyHtml ?? row.body_html;
  if (nextStatus === "published" && plainTextOf(nextBody).length === 0) return bad("empty_body");
  const updated = await queryOne<{ updated_at: string }>(
    `UPDATE mesh_articles SET
       title = CASE WHEN $1::boolean THEN $2 ELSE title END,
       banner = CASE WHEN $3::boolean THEN $4 ELSE banner END,
       body_html = CASE WHEN $5::boolean THEN $6 ELSE body_html END,
       status = CASE WHEN $7::boolean THEN $8 ELSE status END,
       updated_at = now()
     WHERE id = $9
     RETURNING updated_at`,
    [
      patch.title !== undefined, patch.title ?? null,
      patch.banner !== undefined, patch.banner ?? null,
      patch.bodyHtml !== undefined, patch.bodyHtml ?? null,
      patch.status !== undefined, patch.status ?? null,
      id,
    ]
  );
  // Instant-indexing ping when this edit publishes the article (fire-and-forget).
  if (nextStatus === "published" && (row.status !== "published" || patch.status === "published")) {
    pingIndexNow([abs(`/resources/${id}`)]);
  }
  return NextResponse.json({ id, status: nextStatus, updated_at: updated?.updated_at ?? null });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!dbConfigured()) return noDb(); try { await ensureMesh(); } catch { return noDb(); }
  const id = parseInt(params.id, 10);
  if (!id) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const row = await queryOne<{ author_id: number | null; title: string }>(`SELECT author_id, title FROM mesh_articles WHERE id=$1`, [id]);
  if (!row) return NextResponse.json({ error: "not_found" }, { status: 404 });
  if (!(user.role === "admin" || row.author_id === user.id)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  await query(`DELETE FROM mesh_articles WHERE id=$1`, [id]);
  // Every article deletion is audited, whoever performed it.
  await audit(user.id, "article_delete", "article", id, row.title);
  return NextResponse.json({ ok: true });
}
