import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, query, queryOne } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { noDb, bad } from "@/lib/mesh-api";
import { requireAdmin, audit } from "@/lib/mesh-admin";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!dbConfigured()) return noDb(); try { await ensureMesh(); } catch { return noDb(); }
  const admin = await requireAdmin(); if (!admin) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const id = parseInt(params.id, 10); if (!id) return bad("Invalid id", 404);
  const report = await queryOne<{ id: number; status: string; target_type: string; target_id: number }>(`SELECT id, status, target_type, target_id FROM mesh_reports WHERE id=$1`, [id]);
  if (!report) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const body = await req.json().catch(() => ({})) as Record<string, unknown>;
  const status = typeof body.status === "string" ? body.status : "";
  if (!["resolved", "dismissed", "open"].includes(status)) return bad("Invalid status");
  await query(`UPDATE mesh_reports SET status=$1 WHERE id=$2`, [status, id]);
  await audit(admin.id, "report_update", "report", id, `${report.target_type}:${report.target_id} ${report.status} -> ${status}`);
  return NextResponse.json({ ok: true, status });
}
