import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, query } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { noDb } from "@/lib/mesh-api";
import { requireAdmin } from "@/lib/mesh-admin";

export async function GET(req: NextRequest) {
  if (!dbConfigured()) return noDb(); try { await ensureMesh(); } catch { return noDb(); }
  const admin = await requireAdmin(); if (!admin) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const status = (req.nextUrl.searchParams.get("status") || "open").toLowerCase();
  const params: unknown[] = [];
  let where = "";
  if (["open", "resolved", "dismissed"].includes(status)) { params.push(status); where = `WHERE r.status=$1`; }
  const rows = await query(
    `SELECT r.id, r.target_type, r.target_id, r.reason, r.status, r.created_at,
       r.reporter_id, ru.display_name AS reporter_name,
       q.title AS question_title,
       aq.id AS answer_question_id, aq.title AS answer_question_title,
       CASE WHEN r.target_type='answer' THEN left(a.body, 160) ELSE NULL END AS answer_excerpt,
       (q.deleted_at IS NOT NULL) AS question_deleted,
       (a.deleted_at IS NOT NULL) AS answer_deleted
     FROM mesh_reports r
     LEFT JOIN mesh_users ru ON ru.id=r.reporter_id
     LEFT JOIN mesh_questions q ON r.target_type='question' AND q.id=r.target_id
     LEFT JOIN mesh_answers a ON r.target_type='answer' AND a.id=r.target_id
     LEFT JOIN mesh_questions aq ON a.question_id=aq.id
     ${where}
     ORDER BY CASE r.status WHEN 'open' THEN 0 WHEN 'resolved' THEN 1 ELSE 2 END, r.created_at DESC
     LIMIT 200`, params);
  return NextResponse.json({ reports: rows });
}
