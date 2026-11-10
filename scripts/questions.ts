/**
 * Questions for the admins (shown in Admin > More > Questions for you).
 *
 *   npm run questions:add -- scripts/open-questions.json   add open questions from a JSON file (safe to repeat)
 *   npm run questions:pull                                 export answered questions to docs/ADMIN-ANSWERS.md
 *   npx tsx --tsconfig tsconfig.json scripts/questions.ts close "<text>"   close open questions that contain this text
 *
 * An answer is never published automatically. After `questions:pull`, a maintainer reads
 * docs/ADMIN-ANSWERS.md, interprets each answer, writes the content in MESH's own words and
 * publishes it, then moves the entry under "Processed" in that file.
 */
import { appendFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { loadEnvFile } from "./load-env";

loadEnvFile(".env.production.local");

const NOTES = "docs/ADMIN-ANSWERS.md";
const HEADER = `# Admin answers

Answers the admins gave in Admin > Questions for you. **Nothing here is published yet.** For each entry under "To process": read it, work out what it really means, write the content in MESH's own words (follow the owner's rules in docs/HANDOFF.md), publish it, then move the entry under "Processed" with a one-line note of what was published.

## To process

## Processed
`;

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("Put the live DATABASE_URL in .env.production.local first.");
  (process.env as Record<string, string>).NODE_ENV = "production";
  const { getDb, migrateLive } = await import("@/server/db/client");
  await migrateLive(process.env.DATABASE_URL as string);
  const db = await getDb();
  const [cmd, file] = process.argv.slice(2);
  const { addQuestion, pullAnswers } = await import("@/server/admin/questions");
  if (cmd === "add") {
    const items = JSON.parse(readFileSync(file, "utf8")) as { topic: string; question: string; context?: string }[];
    for (const it of items) await addQuestion(db, it);
    console.log(`${items.length} questions are now in the admin panel (duplicates skipped)`);
  } else if (cmd === "pull") {
    const rows = await pullAnswers(db);
    if (!existsSync(NOTES)) writeFileSync(NOTES, HEADER);
    if (!rows.length) console.log("No new answers.");
    else {
      const text = rows
        .map((r) => `\n### ${r.topic}: ${r.question}\n- Context: ${r.context || "none"}\n- Answer: ${r.answer}\n- Answered by ${r.answeredBy} on ${r.answeredAt?.toISOString().slice(0, 10)}\n`)
        .join("");
      const cur = readFileSync(NOTES, "utf8");
      writeFileSync(NOTES, cur.replace("## To process\n", `## To process\n${text}`));
      console.log(`${rows.length} answers written to ${NOTES}. Read them, then publish.`);
    }
  } else if (cmd === "close") {
    const { adminQuestions } = await import("@/server/db/schema");
    const { like, eq, and } = await import("drizzle-orm");
    const r = await db.update(adminQuestions).set({ status: "closed" }).where(and(like(adminQuestions.question, `%${file}%`), eq(adminQuestions.status, "open"))).returning({ id: adminQuestions.id });
    console.log(`${r.length} questions closed`);
  } else throw new Error("Use: questions add <file.json> | questions pull | questions close <text in the question>");
  process.exit(0);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
