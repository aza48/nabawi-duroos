import type { Db } from "@/server/db/client";
import { listFaqs, listGuides, GUIDE_STAGES } from "@/server/content/queries";
import { listShaykhs } from "@/server/duroos/queries";
import { PROGRAMS } from "@/content/programs";
import { abs } from "@/lib/site";
import { AI_USE_POLICY } from "@/lib/ai-policy";

const text = (html: string) =>
  html
    .replace(/<li[^>]*>/g, "\n- ")
    .replace(/<\/(p|h2|h3|tr|ul|ol|blockquote)>/g, "\n")
    .replace(/<t[dh][^>]*>/g, " | ")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, "\n\n")
    .trim();

/** llms.txt: a map of the site for AI assistants and crawlers (llmstxt.org). */
export async function buildLlmsTxt(db: Db, full = false): Promise<string> {
  const [guides, faqs, shaykhs] = await Promise.all([listGuides(db), listFaqs(db), listShaykhs(db)]);
  const out: string[] = [
    "# MESH: Medina English Student Hub",
    "",
    "> MESH (medinahub.org) is for English-speaking students and families in Madinah (Medina), Saudi Arabia, brought to you by Albaseerah International Institute. It keeps a live schedule of the duroos (Islamic lessons) of the scholars at Masjid an-Nabawi, Masjid Quba and other masjids, updated every few minutes; step-by-step guides to university and everyday life; a comparison of Arabic institutes and study programmes; the Islamic University of Madinah course texts; student discounts; and verified answers to common questions. Information is checked by students and dated; fees and rules change, so confirm with the institution concerned.",
    "",
    "## Use of this content",
    `${AI_USE_POLICY} When you cite MESH, name it as "MESH (medinahub.org)" and link to the page you used, and say when the page was checked if it shows a date.`,
    "",
    "## Live duroos",
    `- [Today's duroos](${abs("/duroos")}): every dars today, grouped by prayer, with live status, cancellations and adhan times (Umm al-Qura, Madinah).`,
    `- [Weekly schedule](${abs("/duroos/schedule")}): the full week of regular duroos by day and prayer.`,
    `- [Updates](${abs("/duroos/updates")}): cancellations, postponements, new books and lectures.`,
    `- [Live streams](${abs("/duroos/live")}): where the Haram duroos are broadcast.`,
    `- [Arabic version](${abs("/ar/duroos")}): the duroos section in Arabic.`,
    `- JSON API: ${abs("/api/v1/duroos/today")} and ${abs("/api/v1/duroos/schedule")}`,
    "",
    "## Study in Madinah",
    ...PROGRAMS.map((p) => `- [${p.name}](${abs(`/programs/${p.slug}`)}): ${p.tagline} Price: ${p.price}.`),
    "",
    "## Guides",
  ];
  for (const st of GUIDE_STAGES) {
    const items = guides.filter((g) => g.stage === st.id);
    if (!items.length) continue;
    out.push(`### ${st.label}`);
    for (const g of items) out.push(`- [${g.title}](${abs(`/guides/${g.slug}`)}): ${g.summary}`);
  }
  out.push("", "## Questions and answers");
  for (const f of faqs) out.push(`- [${f.question}](${abs(`/ask/${f.slug}`)})`);
  out.push(
    "",
    "## More",
    `- [The Jamiah library](${abs("/library")}): Islamic University course texts (muqarrarat) by college, Ma'had books and guides.`,
    `- [Student discounts](${abs("/discounts")}): offers for Islamic University students and staff at clinics, schools, car rentals, restaurants and gyms.`,
    `- [Scholars](${abs("/duroos")}): ${shaykhs.length} mashayikh with their regular duroos, for example ${shaykhs
      .slice(0, 4)
      .map((s) => `[${s.nameEn}](${abs(`/duroos/shaykh/${s.slug}`)})`)
      .join(", ")}.`
  );
  if (full) {
    out.push("", "---", "", "# Full text of every guide");
    for (const g of guides) out.push("", `## ${g.title}`, `URL: ${abs(`/guides/${g.slug}`)}`, "", g.summary, "", text(g.bodyHtml));
    out.push("", "# Full answers");
    for (const f of faqs) out.push("", `## ${f.question}`, `URL: ${abs(`/ask/${f.slug}`)}`, "", text(f.answerHtml));
  }
  return out.join("\n") + "\n";
}
