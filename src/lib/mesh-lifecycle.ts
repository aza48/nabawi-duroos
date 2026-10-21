import { query } from "./db";

/** Lifecycle event types recorded in mesh_question_events (the visible thread history). */
export type MeshEventType =
  | "resolved" | "reopened" | "locked" | "unlocked"
  | "outdated_flagged" | "staff_update" | "deleted" | "restored" | "answer_deleted";

export async function logQuestionEvent(questionId: number, actorId: number | null, type: MeshEventType, detail?: string | null): Promise<void> {
  try {
    await query(`INSERT INTO mesh_question_events (question_id, actor_id, type, detail) VALUES ($1,$2,$3,$4)`, [questionId, actorId, type, detail ?? null]);
  } catch { /* history is best-effort; never block the action itself */ }
}

export async function createNotification(userId: number, type: string, questionId: number | null, answerId: number | null, actorId: number | null): Promise<void> {
  try {
    await query(`INSERT INTO mesh_notifications (user_id, type, question_id, answer_id, actor_id) VALUES ($1,$2,$3,$4,$5)`, [userId, type, questionId, answerId, actorId]);
  } catch { /* notifications are best-effort */ }
}

export type ThreadCaps = { canReopen: boolean; canStaffUpdate: boolean; canDelete: boolean; canLock: boolean; canRestore: boolean };

type ViewerLike = { id: number; role: string; country: string | null } | null;
type QuestionLike = { author_id: number; author_country?: string | null; status: string; deleted_at: string | null };

/** Server-side capabilities for a question detail view — the UI consumes these and never re-derives rules. */
export function threadCapabilities(viewer: ViewerLike, q: QuestionLike): ThreadCaps {
  const none: ThreadCaps = { canReopen: false, canStaffUpdate: false, canDelete: false, canLock: false, canRestore: false };
  if (!viewer) return none;
  const isOP = viewer.id === q.author_id;
  const isAdmin = viewer.role === "admin";
  const deleted = !!q.deleted_at;
  const mandoobCountryMatch = viewer.role === "mandoob" && (q.author_country == null || q.author_country === viewer.country);
  return {
    canReopen: !deleted && q.status === "resolved" && (isOP || isAdmin || mandoobCountryMatch),
    canStaffUpdate: !deleted && q.status !== "open" && (isAdmin || viewer.role === "mandoob"),
    canDelete: !deleted && (isOP || isAdmin),
    canLock: !deleted && isAdmin,
    canRestore: deleted && (isOP || isAdmin),
  };
}

/** 30-day restore window check. */
export function withinRestoreWindow(deletedAt: string | null): boolean {
  if (!deletedAt) return false;
  return Date.now() - new Date(deletedAt).getTime() <= 30 * 24 * 3600 * 1000;
}
