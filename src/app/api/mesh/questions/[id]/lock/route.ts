import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, query, queryOne } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { getCurrentUser } from "@/lib/mesh-auth";
import { noDb } from "@/lib/mesh-api";
import { logQuestionEvent } from "@/lib/mesh-lifecycle";

export async function POST(req: NextRequest, { params }: { params: { id: string } }){
  if(!dbConfigured()) return noDb(); try{ await ensureMesh(); }catch{ return noDb(); }
  const user=await getCurrentUser(); if(!user) return NextResponse.json({error:"unauthorized"},{status:401});
  if(user.role!=="admin") return NextResponse.json({error:"forbidden"},{status:403});
  const qid=parseInt(params.id,10);
  const q=await queryOne<{status:string;deleted_at:string|null;accepted_answer_id:number|null}>(`SELECT status, deleted_at, accepted_answer_id FROM mesh_questions WHERE id=$1`,[qid]);
  if(!q || q.deleted_at) return NextResponse.json({error:"not_found"},{status:404});
  const body=await req.json().catch(()=>({})) as {locked?:unknown};
  if(body.locked===true){
    await query(`UPDATE mesh_questions SET status='locked', updated_at=now() WHERE id=$1`,[qid]);
    if(q.status!=="locked") await logQuestionEvent(qid, user.id, "locked");
    return NextResponse.json({ ok: true, status: "locked" });
  }
  if(body.locked===false){
    const next = q.accepted_answer_id ? "resolved" : "open";
    await query(`UPDATE mesh_questions SET status=$1, updated_at=now() WHERE id=$2`,[next,qid]);
    if(q.status==="locked") await logQuestionEvent(qid, user.id, "unlocked");
    return NextResponse.json({ ok: true, status: next });
  }
  return NextResponse.json({error:"invalid_body"},{status:400});
}
