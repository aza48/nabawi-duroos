import { NextResponse } from "next/server";
import { dbConfigured, queryOne } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { noDb } from "@/lib/mesh-api";
import { requireAdmin, TOMBSTONE_EMAIL } from "@/lib/mesh-admin";

async function count(sql: string, params: unknown[] = []): Promise<number> {
  const row = await queryOne<{ c: string }>(sql, params);
  return parseInt(row?.c || "0", 10);
}

export async function GET() {
  if (!dbConfigured()) return noDb(); try { await ensureMesh(); } catch { return noDb(); }
  const admin = await requireAdmin(); if (!admin) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const realUser = `is_seed=false AND email<>$1`;
  const [usersTotal, members, mandoobs, admins, suspended,
    questionsTotal, qOpen, qResolved, qLocked, answersTotal,
    reportsOpen, flags30d, trashQuestions, trashAnswers] = await Promise.all([
    count(`SELECT count(*)::text AS c FROM mesh_users WHERE ${realUser}`, [TOMBSTONE_EMAIL]),
    count(`SELECT count(*)::text AS c FROM mesh_users WHERE ${realUser} AND role='member'`, [TOMBSTONE_EMAIL]),
    count(`SELECT count(*)::text AS c FROM mesh_users WHERE ${realUser} AND role='mandoob'`, [TOMBSTONE_EMAIL]),
    count(`SELECT count(*)::text AS c FROM mesh_users WHERE ${realUser} AND role='admin'`, [TOMBSTONE_EMAIL]),
    count(`SELECT count(*)::text AS c FROM mesh_users WHERE suspended_at IS NOT NULL`),
    count(`SELECT count(*)::text AS c FROM mesh_questions WHERE deleted_at IS NULL`),
    count(`SELECT count(*)::text AS c FROM mesh_questions WHERE deleted_at IS NULL AND status='open'`),
    count(`SELECT count(*)::text AS c FROM mesh_questions WHERE deleted_at IS NULL AND status='resolved'`),
    count(`SELECT count(*)::text AS c FROM mesh_questions WHERE deleted_at IS NULL AND status='locked'`),
    count(`SELECT count(*)::text AS c FROM mesh_answers WHERE deleted_at IS NULL`),
    count(`SELECT count(*)::text AS c FROM mesh_reports WHERE status='open'`),
    count(`SELECT count(*)::text AS c FROM mesh_question_events WHERE type='outdated_flagged' AND created_at > now() - interval '30 days'`),
    count(`SELECT count(*)::text AS c FROM mesh_questions WHERE deleted_at IS NOT NULL`),
    count(`SELECT count(*)::text AS c FROM mesh_answers WHERE deleted_at IS NOT NULL`),
  ]);
  return NextResponse.json({
    users: { total: usersTotal, members, mandoobs, admins, suspended },
    questions: { total: questionsTotal, open: qOpen, resolved: qResolved, locked: qLocked },
    answers: { total: answersTotal },
    reports: { open: reportsOpen },
    flags: { outdated30d: flags30d },
    trash: { questions: trashQuestions, answers: trashAnswers, total: trashQuestions + trashAnswers },
  });
}
