import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, query, queryOne } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { getCurrentUser } from "@/lib/mesh-auth";
import { noDb, bad, clean } from "@/lib/mesh-api";
import { logQuestionEvent } from "@/lib/mesh-lifecycle";
async function guard(id:number, forDelete=false){ const user=await getCurrentUser(); if(!user) return {err:NextResponse.json({error:"unauthorized"},{status:401})};
  const a=await queryOne<{author_id:number;question_id:number;deleted_at:string|null}>(`SELECT author_id, question_id, deleted_at FROM mesh_answers WHERE id=$1`,[id]); if(!a) return {err:NextResponse.json({error:"not_found"},{status:404})};
  // Deletes are stricter than edits: the answer's author or an admin only (mandoobs cannot delete).
  const allowed = forDelete ? (a.author_id===user.id || user.role==="admin") : (a.author_id===user.id || user.role==="moderator" || user.role==="admin");
  if(!allowed) return {err:NextResponse.json({error:"forbidden"},{status:403})}; return {user, answer:a}; }
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }){
  if(!dbConfigured()) return noDb(); try{ await ensureMesh(); }catch{ return noDb(); }
  const id=parseInt(params.id,10); const g=await guard(id); if("err" in g && g.err) return g.err;
  if(g.answer?.deleted_at) return NextResponse.json({error:"not_found"},{status:404});
  const body=await req.json().catch(()=>({})) as Record<string,unknown>; const text=clean(body.body,5000); if(!text) return bad("Body cannot be empty");
  await query(`UPDATE mesh_answers SET body=$1, updated_at=now() WHERE id=$2`,[text,id]); return NextResponse.json({ok:true}); }
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }){
  if(!dbConfigured()) return noDb(); try{ await ensureMesh(); }catch{ return noDb(); }
  const id=parseInt(params.id,10); const g=await guard(id, true); if("err" in g && g.err) return g.err;
  if(g.answer?.deleted_at) return NextResponse.json({error:"not_found"},{status:404});
  // Soft delete. If this answer is the accepted solution, accepted_answer_id keeps pointing at it and the thread shows a "[deleted]" placeholder.
  await query(`UPDATE mesh_answers SET deleted_at=now(), deleted_by=$1, updated_at=now() WHERE id=$2`,[g.user!.id,id]);
  if(g.answer?.question_id) await logQuestionEvent(g.answer.question_id, g.user!.id, "answer_deleted", `answer:${id}`);
  return NextResponse.json({ok:true}); }
