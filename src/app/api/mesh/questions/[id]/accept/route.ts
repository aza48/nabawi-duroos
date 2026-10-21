
import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, query, queryOne } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { getCurrentUser } from "@/lib/mesh-auth";
import { noDb, bad } from "@/lib/mesh-api";
export async function POST(req: NextRequest, { params }: { params: { id: string } }){
  if(!dbConfigured()) return noDb(); try{ await ensureMesh(); }catch{ return noDb(); }
  const user=await getCurrentUser(); if(!user) return NextResponse.json({error:"unauthorized"},{status:401});
  const qid=parseInt(params.id,10); const q=await queryOne<{author_id:number}>(`SELECT author_id FROM mesh_questions WHERE id=$1`,[qid]); if(!q) return NextResponse.json({error:"not_found"},{status:404});
  if(q.author_id!==user.id && user.role!=="moderator" && user.role!=="admin") return NextResponse.json({error:"forbidden"},{status:403});
  const body=await req.json().catch(()=>({})) as {answerId?:number|null}; const aid = body.answerId ?? null;
  if(aid!==null){ const a=await queryOne(`SELECT id FROM mesh_answers WHERE id=$1 AND question_id=$2`,[aid,qid]); if(!a) return bad("Answer does not belong to this question"); }
  await query(`UPDATE mesh_questions SET accepted_answer_id=$1, updated_at=now() WHERE id=$2`,[aid,qid]);
  return NextResponse.json({ ok: true, accepted_answer_id: aid });
}
