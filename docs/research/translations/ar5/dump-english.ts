// Dumps the English of every seeded guide and answer at this checkout, as JSON on stdout.
import * as sync from "./src/server/seed/content/sync";
async function main() {
  let leads: Record<string, string> = {};
  try { leads = (await import("./src/server/seed/content/faq-leads")).FAQ_LEADS ?? {}; } catch {}
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const anyS = sync as unknown as Record<string, { slug: string; [k: string]: unknown }[]>;
  const G = anyS.ENGLISH_GUIDES ?? anyS.SEED_GUIDES ?? [];
  const F = anyS.ENGLISH_FAQS ?? anyS.SEED_FAQS ?? [];
  const guides: Record<string, unknown> = {};
  for (const g of G) guides[g.slug] = { title: g.title, summary: g.summary, bodyHtml: g.bodyHtml };
  const faqs: Record<string, unknown> = {};
  for (const f of F) {
    let a = String(f.answerHtml);
    const lead = leads[f.slug];
    if (lead && a.startsWith(`<p>${esc(lead)}</p>`)) a = a.slice(`<p>${esc(lead)}</p>`.length);
    faqs[f.slug] = { question: f.question, answerHtml: a, lead: lead ?? null };
  }
  process.stdout.write(JSON.stringify({ guides, faqs }));
}
main();
