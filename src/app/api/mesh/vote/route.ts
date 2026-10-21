
import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, query, queryOne } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { getCurrentUser } from "@/lib/mesh-auth";
import { noDb, bad } from "@/lib/mesh-api";
export async function POST(req: NextRequest){
  if(!dbConfigured()) return noDb(); try{ await ensureMesh(); }catch{ return noDb(); }
  const user=await getCurrentUser(); if(!user) return NextResponse.json({error:"unauthorized"},{status:401});
  const body=await req.json().catch(()=>({})) as {targetType?:string;targetId?:number};
  const tt=body.targetType; const tid=Number(body.targetId);
  if((tt!=="question"&&tt!=="answer")||!tid) return bad("Invalid vote target");
  const exists = tt==="question" ? await queryOne(`SELECT id FROM mesh_questions WHERE id=$1`,[tid]) : await queryOne(`SELECT id FROM mesh_answers WHERE id=$1`,[tid]);
  if(!exists) return NextResponse.json({error:"not_found"},{status:404});
  const prev=await queryOne(`SELECT id FROM mesh_votes WHERE user_id=$1 AND target_type=$2 AND target_id=$3`,[user.id,tt,tid]);
  let voted:boolean;
  if(prev){ await query(`DELETE FROM mesh_votes WHERE id=$1`,[(prev as {id:number}).id]); voted=false; }
  else { await query(`INSERT INTO mesh_votes (user_id,target_type,target_id) VALUES ($1,$2,$3) ON CONFLICT DO NOTHING`,[user.id,tt,tid]); voted=true; }
  const c=await queryOne<{count:string}>(`SELECT count(*)::text AS count FROM mesh_votes WHERE target_type=$1 AND target_id=$2`,[tt,tid]);
  return NextResponse.json({ voted, count: parseInt(c?.count||"0",10) });
}
