"use server";

import { revalidatePath } from "next/cache";
import { getDb } from "@/server/db/client";
import { getAuth } from "@/server/auth/auth";
import { requireAdmin } from "@/server/auth/session";
import { Forbidden, type Permission } from "@/server/auth/permissions";
import { undo } from "@/server/admin/audit";
import { addOverride, createLesson, revokeOverride, saveAnnouncement, updateLesson, updateShaykh } from "@/server/admin/duroos";
import { deleteFaq, deleteGuide, saveFaq, saveGuide, setWhatsAppUrl } from "@/server/admin/content";
import { revokeAdmin, setRole } from "@/server/admin/admins";
import { createInvite } from "@/server/admin/invites";
import { answerQuestion, closeQuestion } from "@/server/admin/questions";
import { SITE_URL } from "@/lib/site";

export type ActionResult<T = undefined> = { ok: true; data?: T } | { ok: false; error: string };

const FRIENDLY: Record<string, string> = {
  forbidden: "Your role doesn't allow this.",
  lesson_not_found: "That lesson no longer exists.",
  shaykh_not_found: "That shaykh couldn't be found.",
  cannot_change_self: "You can't change your own access.",
  already_undone: "That change was already undone.",
  missing_row: "That item has since been deleted, so it can't be undone.",
  not_undoable: "That change can't be undone.",
  needs_lesson_and_date: "The AI couldn't tell which lesson or date. Use Change a dars instead.",
  suggestion_not_found: "That suggestion was already handled.",
  question_not_found: "That question no longer exists.",
};

function explain(e: unknown): string {
  if (e instanceof Forbidden) return FRIENDLY.forbidden;
  if (e && typeof e === "object" && "issues" in e) {
    const issue = (e as { issues: { message: string; path: (string | number)[] }[] }).issues[0];
    return issue ? `${issue.path.join(".") || "Input"}: ${issue.message}` : "Please check the form.";
  }
  const m = e instanceof Error ? e.message : "";
  return FRIENDLY[m] ?? "Something went wrong. Please try again.";
}

async function run<T>(perm: Permission | undefined, fn: (db: Awaited<ReturnType<typeof getDb>>, actor: Awaited<ReturnType<typeof requireAdmin>>) => Promise<T>): Promise<ActionResult<T>> {
  try {
    const actor = await requireAdmin(perm);
    const data = await fn(await getDb(), actor);
    revalidatePath("/admin", "layout");
    return { ok: true, data };
  } catch (e) {
    if (e && typeof e === "object" && "digest" in e && String((e as { digest: unknown }).digest).startsWith("NEXT_REDIRECT")) throw e;
    return { ok: false, error: explain(e) };
  }
}

/* Duroos */
export async function addOverrideAction(input: Parameters<typeof addOverride>[2]) {
  return run("duroos.write", async (db, a) => { await addOverride(db, a, input); });
}
export async function revokeOverrideAction(id: number) {
  return run("duroos.write", async (db, a) => { await revokeOverride(db, a, { id }); });
}
export async function updateLessonAction(input: Parameters<typeof updateLesson>[2]) {
  return run("duroos.write", async (db, a) => { await updateLesson(db, a, input); });
}
export async function createLessonAction(input: Parameters<typeof createLesson>[2]) {
  return run("duroos.write", async (db, a) => (await createLesson(db, a, input)).slug);
}
export async function updateShaykhAction(input: Parameters<typeof updateShaykh>[2]) {
  return run("duroos.write", async (db, a) => { await updateShaykh(db, a, input); });
}
export async function saveAnnouncementAction(input: Parameters<typeof saveAnnouncement>[2]) {
  return run("announcements.write", async (db, a) => {
    const r = await saveAnnouncement(db, a, input);
    return { slug: r.slug, scheduleUpdated: r.scheduleUpdated };
  });
}

/* Content */
export async function saveFaqAction(input: Parameters<typeof saveFaq>[2]) {
  return run("content.write", async (db, a) => (await saveFaq(db, a, input)).slug);
}
export async function deleteFaqAction(slug: string) {
  return run("content.write", (db, a) => deleteFaq(db, a, { slug }));
}
export async function saveGuideAction(input: Parameters<typeof saveGuide>[2]) {
  return run("content.write", async (db, a) => (await saveGuide(db, a, input)).slug);
}
export async function deleteGuideAction(slug: string) {
  return run("content.write", (db, a) => deleteGuide(db, a, { slug }));
}

/* Settings, activity, admins */
export async function setWhatsAppUrlAction(url: string) {
  return run("settings.write", async (db, a) => { await setWhatsAppUrl(db, a, { url }); });
}
export async function undoAction(auditId: number) {
  return run("activity.undo", async (db, a) => {
    const r = await undo(db, a, auditId);
    if (!r.ok) throw new Error(r.error);
  });
}
export async function inviteAdminAction(input: { email: string; role: Parameters<typeof createInvite>[2]["role"] }) {
  return run("admins.manage", async (db, a) => (await createInvite(db, a, input, process.env.BETTER_AUTH_URL ?? SITE_URL)).url);
}
export async function setRoleAction(input: Parameters<typeof setRole>[3]) {
  return run("admins.manage", async (db, a) => { await setRole(db, await getAuth(), a, input); });
}
export async function revokeAdminAction(userId: string) {
  return run("admins.manage", async (db, a) => { await revokeAdmin(db, await getAuth(), a, { userId }); });
}

/* Channel watcher */
export async function approveSuggestionAction(id: number) {
  return run("duroos.write", async (db, a) => {
    const { approveSuggestion } = await import("@/server/watcher/run");
    await approveSuggestion(db, a, id, {});
  });
}
export async function dismissSuggestionAction(id: number) {
  return run("duroos.write", async (db, a) => {
    const { dismissSuggestion } = await import("@/server/watcher/run");
    await dismissSuggestion(db, a, id);
  });
}
export async function setSourceAction(input: { handle: string; trusted?: boolean; autoPublish?: boolean }) {
  return run("settings.write", async (db, actor) => {
    const { sources } = await import("@/server/db/schema");
    const { eq } = await import("drizzle-orm");
    const patch: { trusted?: boolean; autoPublish?: boolean } = {};
    if (typeof input.trusted === "boolean") patch.trusted = input.trusted;
    if (typeof input.autoPublish === "boolean") patch.autoPublish = input.autoPublish;
    const [before] = await db.select().from(sources).where(eq(sources.handle, input.handle));
    const [after] = await db.update(sources).set(patch).where(eq(sources.handle, input.handle)).returning();
    // Turning auto-publish on is a real change: it shows in Activity and can be undone.
    if (before && after) {
      const { record } = await import("@/server/admin/audit");
      await record(db, actor, { action: "update", entity: "source", entityId: input.handle, before, after });
    }
  });
}

/* Questions for the admins: answers are saved only, never published straight away */
export async function answerQuestionAction(id: number, answer: string) {
  return run("content.write", async (db, a) => { await answerQuestion(db, a, { id, answer }); });
}
export async function closeQuestionAction(id: number) {
  return run("content.write", async (db, a) => { await closeQuestion(db, a, id); });
}
