
import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, queryOne } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { getCurrentUser } from "@/lib/mesh-auth";
import { noDb, bad, clean } from "@/lib/mesh-api";
export async function POST(req: NextRequest, { params }: { params: { id: string } }){
  if(!dbConfigured()) return noDb(); try{ await ensureMesh(); }catch{ return noDb(); }
  const user=await getCurrentUser(); if(!user) return NextResponse.json({error:"unauthorized"},{status:401});
  const qid=parseInt(params.id,10); const exists=await queryOne(`SELECT id FROM mesh_questions WHERE id=$1`,[qid]); if(!exists) return NextResponse.json({error:"not_found"},{status:404});
  const body=await req.json().catch(()=>({})) as Record<string,unknown>; const text=clean(body.body,5000); if(!text) return bad("Answer cannot be empty");
  const row=await queryOne<{id:number}>(`INSERT INTO mesh_answers (question_id,author_id,body) VALUES ($1,$2,$3) RETURNING id`,[qid,user.id,text]);
  return NextResponse.json({ id: row?.id }, { status: 201 });
}
