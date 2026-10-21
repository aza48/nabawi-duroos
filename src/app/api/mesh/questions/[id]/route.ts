
import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, query, queryOne } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { getCurrentUser } from "@/lib/mesh-auth";
import { noDb, bad, clean } from "@/lib/mesh-api";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }){
  if(!dbConfigured()) return noDb(); try{ await ensureMesh(); }catch{ return noDb(); }
  const id = parseInt(params.id,10); if(!id) return bad("Invalid id",404);
  const viewer = await getCurrentUser();
  const qrow = await queryOne(`SELECT qq.id, qq.title, qq.body, qq.author_id, u.display_name AS author_name, COALESCE(pc.slug,c.slug) AS category_slug, COALESCE(pc.name,c.name) AS category_name, qq.accepted_answer_id, qq.is_seed, qq.created_at, qq.updated_at,
    (SELECT count(*)::int FROM mesh_votes v WHERE v.target_type='question' AND v.target_id=qq.id) AS vote_count,
    COALESCE((SELECT json_agg(t.name) FROM mesh_question_tags qt JOIN mesh_tags t ON t.id=qt.tag_id WHERE qt.question_id=qq.id),'[]'::json) AS tags
    FROM mesh_questions qq JOIN mesh_users u ON u.id=qq.author_id JOIN mesh_categories c ON c.id=qq.category_id LEFT JOIN mesh_categories pc ON pc.id=c.parent_id WHERE qq.id=$1`,[id]);
  if(!qrow) return NextResponse.json({error:"not_found"},{status:404});
  const answers = await query(`SELECT a.id, a.body, a.author_id, u.display_name AS author_name, a.is_seed, a.created_at, a.updated_at,
    (SELECT count(*)::int FROM mesh_votes v WHERE v.target_type='answer' AND v.target_id=a.id) AS vote_count
    FROM mesh_answers a JOIN mesh_users u ON u.id=a.author_id WHERE a.question_id=$1
    ORDER BY (a.id = (SELECT accepted_answer_id FROM mesh_questions WHERE id=$1)) DESC NULLS LAST, vote_count DESC, a.created_at ASC`,[id]);
  let qHas=false; const aVoted=new Set<number>();
  if(viewer){ const v=await query<{target_type:string;target_id:number}>(`SELECT target_type,target_id FROM mesh_votes WHERE user_id=$1 AND ((target_type='question' AND target_id=$2) OR (target_type='answer' AND target_id IN (SELECT id FROM mesh_answers WHERE question_id=$2)))`,[viewer.id,id]);
    for(const r of v){ if(r.target_type==="question") qHas=true; else aVoted.add(r.target_id); } }
  const question = { ...(qrow as object), tags: (qrow as {tags?:unknown}).tags ?? [], hasVoted: qHas };
  const outAnswers = (answers as Record<string,unknown>[]).map(a=>({ ...a, hasVoted: aVoted.has(Number(a.id)) }));
  return NextResponse.json({ question: { ...question, answers: outAnswers }, viewer: viewer ? { id: viewer.id, role: viewer.role } : null });
}
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }){
  if(!dbConfigured()) return noDb(); try{ await ensureMesh(); }catch{ return noDb(); }
  const user=await getCurrentUser(); if(!user) return NextResponse.json({error:"unauthorized"},{status:401});
  const id=parseInt(params.id,10); const existing=await queryOne<{author_id:number}>(`SELECT author_id FROM mesh_questions WHERE id=$1`,[id]); if(!existing) return NextResponse.json({error:"not_found"},{status:404});
  if(existing.author_id!==user.id && user.role!=="moderator" && user.role!=="admin") return NextResponse.json({error:"forbidden"},{status:403});
  const body=await req.json().catch(()=>({})) as Record<string,unknown>; const title=clean(body.title,200); const text=clean(body.body,5000);
  await query(`UPDATE mesh_questions SET title=COALESCE(NULLIF($1,''),title), body=COALESCE(NULLIF($2,''),body), updated_at=now() WHERE id=$3`,[title,text,id]);
  return NextResponse.json({ ok: true });
}
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }){
  if(!dbConfigured()) return noDb(); try{ await ensureMesh(); }catch{ return noDb(); }
  const user=await getCurrentUser(); if(!user) return NextResponse.json({error:"unauthorized"},{status:401});
  const id=parseInt(params.id,10); const existing=await queryOne<{author_id:number}>(`SELECT author_id FROM mesh_questions WHERE id=$1`,[id]); if(!existing) return NextResponse.json({error:"not_found"},{status:404});
  if(existing.author_id!==user.id && user.role!=="moderator" && user.role!=="admin") return NextResponse.json({error:"forbidden"},{status:403});
  await query(`DELETE FROM mesh_questions WHERE id=$1`,[id]); return NextResponse.json({ ok: true });
}
