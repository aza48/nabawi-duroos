import { asc, desc, eq, inArray } from "drizzle-orm";
import { z } from "zod";
import type { Db } from "@/server/db/client";
import { adminQuestions } from "@/server/db/schema";
import { assertCan, type Actor } from "@/server/auth/permissions";

export type QuestionRow = typeof adminQuestions.$inferSelect;

const newQuestion = z.object({
  topic: z.string().trim().min(2).max(80),
  question: z.string().trim().min(5).max(600),
  context: z.string().trim().max(2000).default(""),
});

/** Adds an open question for the admins. Used by Claude and by scripts; never touches public content. */
export async function addQuestion(db: Db, input: z.input<typeof newQuestion>): Promise<QuestionRow> {
  const v = newQuestion.parse(input);
  const existing = await db.select().from(adminQuestions).where(eq(adminQuestions.question, v.question));
  if (existing[0]) return existing[0];
  const [row] = await db.insert(adminQuestions).values(v).returning();
  return row;
}

export async function listQuestions(db: Db): Promise<{ open: QuestionRow[]; answered: QuestionRow[] }> {
  const open = await db.select().from(adminQuestions).where(eq(adminQuestions.status, "open")).orderBy(asc(adminQuestions.topic), asc(adminQuestions.id));
  const answered = await db
    .select()
    .from(adminQuestions)
    .where(inArray(adminQuestions.status, ["answered", "exported"]))
    .orderBy(desc(adminQuestions.answeredAt))
    .limit(50);
  return { open, answered };
}

export async function countOpenQuestions(db: Db): Promise<number> {
  return (await db.select({ id: adminQuestions.id }).from(adminQuestions).where(eq(adminQuestions.status, "open"))).length;
}

const answerInput = z.object({ id: z.number().int().positive(), answer: z.string().trim().min(1).max(4000) });

/**
 * Saves an admin's answer. It is only stored: nothing on the public site changes until Claude
 * has exported the answer, interpreted it and written the content.
 */
export async function answerQuestion(db: Db, actor: Actor, input: z.input<typeof answerInput>): Promise<void> {
  assertCan(actor, "content.write");
  const v = answerInput.parse(input);
  const [row] = await db.select().from(adminQuestions).where(eq(adminQuestions.id, v.id));
  if (!row) throw new Error("question_not_found");
  await db
    .update(adminQuestions)
    .set({ answer: v.answer, answeredBy: actor.name, answeredAt: new Date(), status: "answered", exportedAt: null })
    .where(eq(adminQuestions.id, v.id));
}

/** Closes a question nobody needs to answer any more. */
export async function closeQuestion(db: Db, actor: Actor, id: number): Promise<void> {
  assertCan(actor, "content.write");
  await db.update(adminQuestions).set({ status: "closed" }).where(eq(adminQuestions.id, id));
}

/**
 * Takes every answered question that has not been exported, marks it exported and returns it.
 * Claude writes these to docs/ADMIN-ANSWERS.md, then interprets and publishes them.
 */
export async function pullAnswers(db: Db, now: Date = new Date()): Promise<QuestionRow[]> {
  const rows = await db.select().from(adminQuestions).where(eq(adminQuestions.status, "answered")).orderBy(asc(adminQuestions.answeredAt));
  if (rows.length) await db.update(adminQuestions).set({ status: "exported", exportedAt: now }).where(inArray(adminQuestions.id, rows.map((r) => r.id)));
  return rows;
}
