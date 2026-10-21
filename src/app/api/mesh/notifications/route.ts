import { NextResponse } from "next/server";
import { dbConfigured, query, queryOne } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { getCurrentUser } from "@/lib/mesh-auth";
import { noDb } from "@/lib/mesh-api";

export async function GET(){
  if(!dbConfigured()) return noDb(); try{ await ensureMesh(); }catch{ return noDb(); }
  const user=await getCurrentUser(); if(!user) return NextResponse.json({error:"unauthorized"},{status:401});
  const rows=await query(`SELECT n.id, n.type, n.question_id, n.answer_id, n.actor_id, n.read_at, n.created_at, q.title AS question_title, u.display_name AS actor_name
    FROM mesh_notifications n LEFT JOIN mesh_questions q ON q.id=n.question_id LEFT JOIN mesh_users u ON u.id=n.actor_id
    WHERE n.user_id=$1 ORDER BY n.created_at DESC, n.id DESC LIMIT 30`,[user.id]);
  const unread=await queryOne<{c:string}>(`SELECT count(*)::text AS c FROM mesh_notifications WHERE user_id=$1 AND read_at IS NULL`,[user.id]);
  return NextResponse.json({ notifications: rows, unread: parseInt(unread?.c||"0",10) });
}
