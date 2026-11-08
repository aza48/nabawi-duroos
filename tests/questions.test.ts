import { beforeAll, describe, expect, it } from "vitest";
import { resetTestDb, type Db } from "@/server/db/client";
import { addQuestion, answerQuestion, closeQuestion, countOpenQuestions, listQuestions, pullAnswers } from "@/server/admin/questions";
import { Forbidden, type Actor } from "@/server/auth/permissions";
import { faqs, guides } from "@/server/db/schema";

let db: Db;
const editor: Actor = { id: "e1", name: "Hana", role: "content_editor" };
const duroos: Actor = { id: "d1", name: "Sami", role: "duroos_editor" };

beforeAll(async () => {
  db = await resetTestDb();
});

describe("questions for the admins", () => {
  it("adds a question once and counts it as open", async () => {
    const a = await addQuestion(db, { topic: "University", question: "Where is the mat'am?", context: "Prices are known." });
    const b = await addQuestion(db, { topic: "University", question: "Where is the mat'am?" });
    expect(b.id).toBe(a.id);
    expect(await countOpenQuestions(db)).toBe(1);
  });

  it("saves an answer without publishing anything", async () => {
    const [q] = (await listQuestions(db)).open;
    await answerQuestion(db, editor, { id: q.id, answer: "Next to the library, 6 to 9 am." });
    const { open, answered } = await listQuestions(db);
    expect(open).toHaveLength(0);
    expect(answered[0]).toMatchObject({ status: "answered", answeredBy: "Hana", answer: "Next to the library, 6 to 9 am." });
    expect(await db.select().from(guides)).toHaveLength(0);
    expect(await db.select().from(faqs)).toHaveLength(0);
  });

  it("refuses roles without content access", async () => {
    const q = await addQuestion(db, { topic: "Sport", question: "Are adult classes open to women?" });
    await expect(answerQuestion(db, duroos, { id: q.id, answer: "Yes" })).rejects.toBeInstanceOf(Forbidden);
  });

  it("exports each answer once for Claude to process", async () => {
    const first = await pullAnswers(db);
    expect(first).toHaveLength(1);
    expect(first[0].answer).toContain("library");
    expect(await pullAnswers(db)).toHaveLength(0);
    const { answered } = await listQuestions(db);
    expect(answered[0].status).toBe("exported");
  });

  it("closes a question that is no longer needed", async () => {
    const q = await addQuestion(db, { topic: "Property", question: "Can foreigners buy a home?" });
    await closeQuestion(db, editor, q.id);
    expect((await listQuestions(db)).open.map((r) => r.id)).not.toContain(q.id);
  });
});
