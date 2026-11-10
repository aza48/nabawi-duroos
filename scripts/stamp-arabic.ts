/**
 * Records that an Arabic guide or answer now matches today's English, by storing the English fingerprint in
 * docs/research/translations/en-sha.json. Run it only after you have brought the Arabic in line with the English.
 *   npm run arabic:stamp -- <slug> [<slug> ...]   (a guide or answer slug)
 *   npm run arabic:stamp -- --all                 (every guide and answer; only after a full check)
 */
import { readFileSync, writeFileSync } from "node:fs";
import { SEED_FAQS, SEED_GUIDES } from "@/server/seed/content/sync";
import { EN_SHA_FILE, enShaKey, faqEnSha, guideEnSha } from "@/server/seed/content/en-sha";

const args = process.argv.slice(2);
const all = args.includes("--all");
const want = new Set(args.filter((a) => !a.startsWith("--")));
if (!all && !want.size) throw new Error("Name the slugs you brought up to date, or --all.");

let table: Record<string, string> = {};
try {
  table = JSON.parse(readFileSync(EN_SHA_FILE, "utf8"));
} catch {}

const done: string[] = [];
for (const g of SEED_GUIDES) if (all || want.has(g.slug)) (table[enShaKey("guides", g.slug)] = guideEnSha(g)), done.push(g.slug);
for (const f of SEED_FAQS) if (all || want.has(f.slug)) (table[enShaKey("faqs", f.slug)] = faqEnSha(f)), done.push(f.slug);
const unknown = [...want].filter((s) => !done.includes(s));
if (unknown.length) throw new Error(`No guide or answer with the slug: ${unknown.join(", ")}`);

const sorted = Object.fromEntries(Object.entries(table).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(EN_SHA_FILE, `${JSON.stringify(sorted, null, 1)}\n`);
console.log(`Stamped ${done.length}: ${all ? "every guide and answer" : done.join(", ")}`);
