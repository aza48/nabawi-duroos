import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, query, queryOne } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { getCurrentUser } from "@/lib/mesh-auth";
import { noDb } from "@/lib/mesh-api";
export async function GET(_req: NextRequest, { params }: { params: { id: string } }){
  if(!dbConfigured()) return noDb(); try{ await ensureMesh(); }catch{ return noDb(); }
  const id=parseInt(params.id,10); const user=await queryOne<{display_name:string;bio:string|null;created_at:string;role:string;entry_year_hijri:number|null;country:string|null}>(`SELECT display_name,bio,created_at,role,entry_year_hijri,country FROM mesh_users WHERE id=$1`,[id]);
  if(!user) return NextResponse.json({error:"not_found"},{status:404});
  const questions=await query(`SELECT qq.id, qq.title, qq.body, qq.author_id, u.display_name AS author_name, u.role AS author_role, u.entry_year_hijri AS author_entry_year, u.country AS author_country, COALESCE(pc.slug,c.slug) AS category_slug, COALESCE(pc.name,c.name) AS category_name,
    (SELECT count(*)::int FROM mesh_votes v WHERE v.target_type='question' AND v.target_id=qq.id) AS vote_count,
    (SELECT count(*)::int FROM mesh_answers a WHERE a.question_id=qq.id AND a.deleted_at IS NULL) AS answer_count,
    (qq.accepted_answer_id IS NOT NULL) AS solved, qq.accepted_answer_id, qq.status, qq.is_seed, qq.created_at, qq.updated_at, '[]'::json AS tags
    FROM mesh_questions qq JOIN mesh_users u ON u.id=qq.author_id JOIN mesh_categories c ON c.id=qq.category_id LEFT JOIN mesh_categories pc ON pc.id=c.parent_id WHERE qq.author_id=$1 AND qq.deleted_at IS NULL ORDER BY qq.created_at DESC LIMIT 50`,[id]);
  const ac=await queryOne<{c:string}>(`SELECT count(*)::text AS c FROM mesh_answers WHERE author_id=$1 AND deleted_at IS NULL`,[id]);
  const out: Record<string, unknown> = { display_name: user.display_name, bio: user.bio, created_at: user.created_at, role: user.role, entry_year_hijri: user.entry_year_hijri, country: user.country, questions, answersCount: parseInt(ac?.c||"0",10) };
  // Only the profile owner sees their own soft-deleted questions (restorable for 30 days).
  const viewer = await getCurrentUser();
  if(viewer && viewer.id===id){
    out.own_deleted_questions = await query(`SELECT id, title, deleted_at FROM mesh_questions WHERE author_id=$1 AND deleted_at IS NOT NULL AND deleted_at > now() - interval '30 days' ORDER BY deleted_at DESC`,[id]);
  }
  return NextResponse.json(out);
}
