
import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, query } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { getCurrentUser } from "@/lib/mesh-auth";
import { noDb, bad, clean } from "@/lib/mesh-api";

export async function GET(req: NextRequest){
  if(!dbConfigured()) return noDb();
  try{ await ensureMesh(); }catch{ return noDb(); }
  const sp = req.nextUrl.searchParams;
  const category = sp.get("category")||""; const q = sp.get("q")||""; const sort = sp.get("sort")||"recent";
  const limit = Math.min(100, Math.max(1, parseInt(sp.get("limit")||"20",10)||20));
  const offset = Math.max(0, parseInt(sp.get("offset")||"0",10)||0);
  const params: unknown[] = []; let where = "WHERE qq.deleted_at IS NULL";
  if(category){ params.push(category); where += ` AND (c.slug=$${params.length} OR pc.slug=$${params.length})`; }
  if(q){ params.push(`%${q}%`); const i=params.length; where += ` AND (qq.title ILIKE $${i} OR qq.body ILIKE $${i} OR EXISTS (SELECT 1 FROM mesh_question_tags qt JOIN mesh_tags t ON t.id=qt.tag_id WHERE qt.question_id=qq.id AND t.name ILIKE $${i}) OR EXISTS (SELECT 1 FROM mesh_answers aa WHERE aa.question_id=qq.id AND aa.body ILIKE $${i}))`; }
  if(sort==="unanswered") where += ` AND (SELECT count(*) FROM mesh_answers a2 WHERE a2.question_id=qq.id AND a2.deleted_at IS NULL)=0`;
  const order = sort==="top" ? "vote_count DESC, qq.created_at DESC" : "qq.created_at DESC";
  params.push(limit); params.push(offset);
  const rows = await query(`SELECT qq.id, qq.title, qq.body, qq.author_id, u.display_name AS author_name, u.role AS author_role, u.entry_year_hijri AS author_entry_year, u.country AS author_country, COALESCE(pc.slug, c.slug) AS category_slug, COALESCE(pc.name, c.name) AS category_name, c.slug AS raw_category_slug,
    (SELECT count(*)::int FROM mesh_votes v WHERE v.target_type='question' AND v.target_id=qq.id) AS vote_count,
    (SELECT count(*)::int FROM mesh_answers a WHERE a.question_id=qq.id AND a.deleted_at IS NULL) AS answer_count,
    (qq.accepted_answer_id IS NOT NULL) AS solved, qq.accepted_answer_id, qq.status, qq.is_seed, qq.created_at, qq.updated_at,
    COALESCE((SELECT json_agg(t.name) FROM mesh_question_tags qt JOIN mesh_tags t ON t.id=qt.tag_id WHERE qt.question_id=qq.id),'[]'::json) AS tags
    FROM mesh_questions qq JOIN mesh_users u ON u.id=qq.author_id JOIN mesh_categories c ON c.id=qq.category_id LEFT JOIN mesh_categories pc ON pc.id=c.parent_id
    ${where} ORDER BY ${order} LIMIT $${params.length-1} OFFSET $${params.length}`, params);
  return NextResponse.json({ questions: rows });
}
export async function POST(req: NextRequest){
  if(!dbConfigured()) return noDb();
  try{ await ensureMesh(); }catch{ return noDb(); }
  const user = await getCurrentUser(); if(!user) return NextResponse.json({error:"unauthorized"},{status:401});
  const body = await req.json().catch(()=>({})) as Record<string,unknown>;
  const title = clean(body.title, 200); const text = clean(body.body, 5000); const catSlug = clean(body.categorySlug, 80); const subSlug = clean(body.subcategorySlug, 80);
  if(title.length<10) return bad("Title must be at least 10 characters");
  if(text.length<20) return bad("Body must be at least 20 characters");
  if(!catSlug) return bad("Category is required");
  const { queryOne } = await import("@/lib/db");
  const cat = await queryOne<{id:number}>(`SELECT id FROM mesh_categories WHERE slug=$1`, [subSlug||catSlug]);
  const mainCat = cat || await queryOne<{id:number}>(`SELECT id FROM mesh_categories WHERE slug=$1`, [catSlug]);
  if(!mainCat) return bad("Unknown category");
  const row = await queryOne<{id:number}>(`INSERT INTO mesh_questions (author_id, category_id, title, body) VALUES ($1,$2,$3,$4) RETURNING id`, [user.id, mainCat.id, title, text]);
  if(!row) return bad("Could not create question", 500);
  const tags = Array.isArray(body.tags) ? body.tags.slice(0,5) : [];
  for(const t of tags){ const name=clean(t,40); if(!name) continue; const slug=name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
    const tag = await queryOne<{id:number}>(`INSERT INTO mesh_tags (name,slug) VALUES ($1,$2) ON CONFLICT (slug) DO UPDATE SET name=EXCLUDED.name RETURNING id`,[name,slug]);
    if(tag) await query(`INSERT INTO mesh_question_tags (question_id,tag_id) VALUES ($1,$2) ON CONFLICT DO NOTHING`,[row.id,tag.id]); }
  return NextResponse.json({ id: row.id }, { status: 201 });
}
