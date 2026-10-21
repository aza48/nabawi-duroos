
import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, query, queryOne } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { noDb } from "@/lib/mesh-api";
export async function GET(_req: NextRequest, { params }: { params: { id: string } }){
  if(!dbConfigured()) return noDb(); try{ await ensureMesh(); }catch{ return noDb(); }
  const id=parseInt(params.id,10); const user=await queryOne<{display_name:string;bio:string|null;created_at:string}>(`SELECT display_name,bio,created_at FROM mesh_users WHERE id=$1`,[id]);
  if(!user) return NextResponse.json({error:"not_found"},{status:404});
  const questions=await query(`SELECT qq.id, qq.title, qq.body, qq.author_id, u.display_name AS author_name, COALESCE(pc.slug,c.slug) AS category_slug, COALESCE(pc.name,c.name) AS category_name,
    (SELECT count(*)::int FROM mesh_votes v WHERE v.target_type='question' AND v.target_id=qq.id) AS vote_count,
    (SELECT count(*)::int FROM mesh_answers a WHERE a.question_id=qq.id) AS answer_count,
    (qq.accepted_answer_id IS NOT NULL) AS solved, qq.accepted_answer_id, qq.is_seed, qq.created_at, qq.updated_at, '[]'::json AS tags
    FROM mesh_questions qq JOIN mesh_users u ON u.id=qq.author_id JOIN mesh_categories c ON c.id=qq.category_id LEFT JOIN mesh_categories pc ON pc.id=c.parent_id WHERE qq.author_id=$1 ORDER BY qq.created_at DESC LIMIT 50`,[id]);
  const ac=await queryOne<{c:string}>(`SELECT count(*)::text AS c FROM mesh_answers WHERE author_id=$1`,[id]);
  return NextResponse.json({ display_name: user.display_name, bio: user.bio, created_at: user.created_at, questions, answersCount: parseInt(ac?.c||"0",10) });
}
