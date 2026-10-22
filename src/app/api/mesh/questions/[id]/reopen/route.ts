import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, query, queryOne } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { getCurrentUser } from "@/lib/mesh-auth";
import { noDb } from "@/lib/mesh-api";
import { logQuestionEvent } from "@/lib/mesh-lifecycle";

export async function POST(_req: NextRequest, { params }: { params: { id: string } }){
  if(!dbConfigured()) return noDb(); try{ await ensureMesh(); }catch{ return noDb(); }
  const user=await getCurrentUser(); if(!user) return NextResponse.json({error:"unauthorized"},{status:401});
  const qid=parseInt(params.id,10);
  const q=await queryOne<{author_id:number;status:string;deleted_at:string|null;op_country:string|null}>(`SELECT qq.author_id, qq.status, qq.deleted_at, u.country AS op_country FROM mesh_questions qq JOIN mesh_users u ON u.id=qq.author_id WHERE qq.id=$1`,[qid]);
  if(!q || q.deleted_at) return NextResponse.json({error:"not_found"},{status:404});
  if(q.status==="locked") return NextResponse.json({error:"thread_locked"},{status:403});
  if(q.status==="open") return NextResponse.json({error:"already_open"},{status:400});
  // Reopen: the OP, any admin, or a mandoob/contributor whose country matches the OP's (or the OP has no country set).
  const allowed = user.id===q.author_id || user.role==="admin" ||
    ((user.role==="mandoob" || user.role==="contributor") && (q.op_country==null || q.op_country===user.country));
  if(!allowed) return NextResponse.json({error:"forbidden"},{status:403});
  await query(`UPDATE mesh_questions SET status='open', updated_at=now() WHERE id=$1`,[qid]);
  await logQuestionEvent(qid, user.id, "reopened");
  return NextResponse.json({ ok: true, status: "open" });
}
