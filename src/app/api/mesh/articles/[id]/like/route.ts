import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, query, queryOne } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { getCurrentUser } from "@/lib/mesh-auth";
import { noDb } from "@/lib/mesh-api";

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!dbConfigured()) return noDb(); try { await ensureMesh(); } catch { return noDb(); }
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "login_required" }, { status: 401 });
  const id = parseInt(params.id, 10);
  if (!id) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const article = await queryOne<{ id: number }>(`SELECT id FROM mesh_articles WHERE id=$1 AND status='published'`, [id]);
  if (!article) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const prev = await queryOne<{ id: number }>(`SELECT id FROM mesh_article_likes WHERE article_id=$1 AND user_id=$2`, [id, user.id]);
  let liked: boolean;
  if (prev) { await query(`DELETE FROM mesh_article_likes WHERE id=$1`, [prev.id]); liked = false; }
  else { await query(`INSERT INTO mesh_article_likes (article_id, user_id) VALUES ($1,$2) ON CONFLICT DO NOTHING`, [id, user.id]); liked = true; }
  const c = await queryOne<{ count: string }>(`SELECT count(*)::text AS count FROM mesh_article_likes WHERE article_id=$1`, [id]);
  return NextResponse.json({ liked, like_count: parseInt(c?.count || "0", 10) });
}
