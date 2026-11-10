/**
 * Read only. Compares the live guides and FAQs with the seed on this branch and says what a full
 * `npm run content:sync` would add or change, so nobody overwrites an edit made in the admin by accident.
 *   npm run content:diff                 (summary)
 *   npm run content:diff -- --backup=dir (also saves every live guide and FAQ as JSON in dir first)
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

try {
  for (const line of readFileSync(".env.production.local", "utf8").split("\n")) {
    const m = /^([A-Z_]+)=(.*)$/.exec(line.trim());
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, "");
  }
} catch {}

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("Put the live DATABASE_URL in .env.production.local first.");
  (process.env as Record<string, string>).NODE_ENV = "production";
  const { getDb } = await import("@/server/db/client");
  const { guides, faqs } = await import("@/server/db/schema");
  const { SEED_GUIDES, SEED_FAQS } = await import("@/server/seed/content/sync");
  const { cleanText } = await import("@/lib/text");
  const db = await getDb();
  const liveG = await db.select({ slug: guides.slug, title: guides.title, bodyHtml: guides.bodyHtml, status: guides.status, updatedAt: guides.updatedAt }).from(guides);
  const liveF = await db.select({ slug: faqs.slug, question: faqs.question, answerHtml: faqs.answerHtml, status: faqs.status, updatedAt: faqs.updatedAt }).from(faqs);

  const backup = process.argv.find((a) => a.startsWith("--backup="))?.slice(9);
  if (backup) {
    mkdirSync(backup, { recursive: true });
    const full = { guides: await db.select().from(guides), faqs: await db.select().from(faqs) };
    writeFileSync(join(backup, `live-content-${new Date().toISOString().slice(0, 16).replace(/:/g, "")}.json`), JSON.stringify(full, null, 1));
    console.log(`Backup saved in ${backup}`);
  }

  const report = (kind: string, live: { slug: string; text: string; status: string; updatedAt: Date | null }[], seed: { slug: string; text: string }[]) => {
    const l = new Map(live.map((r) => [r.slug, r]));
    const s = new Map(seed.map((r) => [r.slug, r]));
    const added = [...s.keys()].filter((k) => !l.has(k));
    const changed = [...s.values()].filter((r) => l.has(r.slug) && l.get(r.slug)!.text !== r.text).map((r) => r.slug);
    const liveOnly = [...l.keys()].filter((k) => !s.has(k));
    console.log(`\n${kind}: ${live.length} live, ${seed.length} in the seed`);
    console.log(`  new (not live yet): ${added.length}${added.length ? `\n    ${added.join(", ")}` : ""}`);
    console.log(`  would change: ${changed.length}${changed.length ? `\n    ${changed.map((k) => `${k} (live edited ${l.get(k)!.updatedAt?.toISOString().slice(0, 16) ?? "?"})`).join("\n    ")}` : ""}`);
    console.log(`  live only (made in the admin, never touched by a sync): ${liveOnly.length}${liveOnly.length ? `\n    ${liveOnly.join(", ")}` : ""}`);
  };
  report(
    "Guides",
    liveG.map((g) => ({ slug: g.slug, text: `${g.title}\n${g.bodyHtml}`, status: g.status, updatedAt: g.updatedAt })),
    SEED_GUIDES.map((g) => ({ slug: g.slug, text: `${cleanText(g.title, "en")}\n${g.bodyHtml.trim()}` })),
  );
  report(
    "FAQs",
    liveF.map((f) => ({ slug: f.slug, text: `${f.question}\n${f.answerHtml}`, status: f.status, updatedAt: f.updatedAt })),
    SEED_FAQS.map((f) => ({ slug: f.slug, text: `${cleanText(f.question, "en")}\n${f.answerHtml}` })),
  );
  process.exit(0);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
