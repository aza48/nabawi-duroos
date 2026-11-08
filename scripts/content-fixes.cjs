/**
 * One-off live content fixes for guides that exist only in the live database (they are not in the
 * seed files), plus the exam-schedule update.  Run once:  node scripts/content-fixes.cjs
 * Safe to run twice: every edit checks first and skips if it is already applied. It never changes
 * a guide's "last verified" date. Needs the live DATABASE_URL in .env.production.local.
 */
const fs = require("fs");

try {
  for (const line of fs.readFileSync(".env.production.local", "utf8").split("\n")) {
    const m = /^([A-Z_]+)=(.*)$/.exec(line.trim());
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, "");
  }
} catch {}

const CALENDAR_HTML = `<p>The 1448 academic year at the Islamic University of Madinah, 2026 to 2027. Every date, with live countdowns and a way to add them to your phone calendar, is on this page.</p>
<h2>Main dates</h2>
<ul>
<li>Classes start: Sunday 16 August 2026.</li>
<li>National Day holiday: 23 to 26 September 2026.</li>
<li>First-semester final exams: from 29 November 2026.</li>
<li>End-of-semester break: 15 to 19 December 2026.</li>
<li>Second semester starts: Sunday 20 December 2026.</li>
<li>Winter holiday: 8 to 16 January 2027.</li>
<li>Founding Day holiday: 19 to 22 February 2027.</li>
<li>Ramadan and Eid al-Fitr holiday: 26 February to 13 March 2027.</li>
<li>Second-semester final exams: from 25 April 2027.</li>
<li>Eid al-Adha holiday: 11 to 22 May 2027.</li>
<li>End of the academic year: 3 June 2027.</li>
<li>The 1449 academic year starts: 22 August 2027.</li>
</ul>`;

// [slug, [ [pattern, replacement], ... ]]
const EDITS = [
  [
    "university-calendar-1448",
    [[/^[\s\S]*$/, () => CALENDAR_HTML, "whole body"]],
  ],
  [
    "childbirth-options",
    [
      [/<p>Doctors marked \(recommended\)[^<]*<\/p>/, () => "<p>Obstetricians who deliver at each hospital, as last reported. MESH does not rate or recommend doctors.</p>", "doctors intro"],
      [/ \(recommended, previously at Al-Zahra\)/g, () => " (previously at Al-Zahra)", "previously at"],
      [/ \(recommended\)/g, () => "", "recommended tags"],
      [/Last updated in April 2025\./, () => "Information from April 2025.", "date line"],
    ],
  ],
  [
    "starting-a-business",
    [[/Check first(<\/p>\s*<p><strong>Mistakes)/, (_m, rest) => "Common mistakes" + rest, "box label"]],
  ],
  [
    "sisters-studying-in-madinah",
    [
      [/memorise Umdat al-Ahkam and ar-Rahbiyyah\.<\/li>/, () => "memorise Umdat al-Ahkam and ar-Rahbiyyah. A portion of Alfiyyat Ibn Malik may also be required (not confirmed).</li>", "alfiyyah"],
      [/This information dates from December 2023\.[^<]*<\/p>/, () => "This guide reflects information from December 2023, so it is one of the oldest on the site. Fees, levels and requirements may have changed. Contact the school before you apply.</p>", "date note"],
      [/<h2>Full information sheet<\/h2>\s*<p>Download the full school information sheet \(PDF\)\.<\/p>/, () => "<h2>Credit and corrections</h2>\n<p>This guide is based on the school information sheet compiled by the Sisters Studying in Madinah (S.S.I.M) team. To correct anything here, please message the S.S.I.M admins in their WhatsApp group.</p>", "credit"],
    ],
  ],
  [
    "graduate-procedures",
    [
      [/<p>A typical visit to a consulate general in Jeddah:[\s\S]*?<\/p>/, () => "<p>For most consulates, bring the MOFA-legalised documents and copies of your iqama, student card and passport, and register online beforehand if your consulate asks you to (for example, <em>Lapor Diri</em>, the Indonesian self-reporting system). Allow about 40 minutes and stay nearby, because names are called out. Check your consulate's own opening days and hours before you go.</p>", "consulate"],
      [/<h2>Already left without your certificate\?<\/h2>\s*<p>[\s\S]*?<\/p>/, () => "<h2>Already left without your certificate?</h2>\n<p>If you left before collecting or legalising your degree, ask in the MESH WhatsApp group whether someone in Madinah can help, and follow the legalisation steps above.</p>", "paid service"],
    ],
  ],
];

const ANNOUNCEMENT = {
  slug: "final-exam-schedules-released-1448",
  type: "info",
  titleEn: "Final exam schedules are released",
  titleAr: "صدور جداول الاختبارات النهائية",
  bodyEn: "Final exam schedules are now released, may Allah grant you success!",
  bodyAr: "صدرت جداول الاختبارات النهائية، وفّقكم الله ونجّحكم.",
};

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("Put the live DATABASE_URL in .env.production.local first.");
  const { Pool } = require("pg");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  try {
    for (const [slug, edits] of EDITS) {
      const { rows } = await pool.query("select body_html from guides where slug = $1", [slug]);
      if (!rows.length) { console.log(slug, ": not found, skipped"); continue; }
      let html = rows[0].body_html;
      const done = [];
      for (const [re, fn, label] of edits) {
        const next = html.replace(re, fn);
        if (next !== html) { html = next; done.push(label); }
      }
      if (!done.length) { console.log(slug, ": already up to date"); continue; }
      await pool.query("update guides set body_html = $2, updated_at = now() where slug = $1", [slug, html]);
      console.log(slug, ": updated (" + done.join(", ") + ")");
    }
    // The sports list was copied from another community site's page, so it comes off. The link redirects to our own sports guide.
    const del = await pool.query("delete from guides where slug = 'sports-and-martial-arts'");
    console.log("sports-and-martial-arts:", del.rowCount ? "removed" : "already removed");

    const a = ANNOUNCEMENT;
    const ins = await pool.query(
      `insert into announcements (slug, type, title_en, title_ar, body_en, body_ar, status, posted_at, published_at)
       values ($1,$2,$3,$4,$5,$6,'published', now(), now()) on conflict (slug) do nothing`,
      [a.slug, a.type, a.titleEn, a.titleAr, a.bodyEn, a.bodyAr]
    );
    console.log("announcement:", ins.rowCount ? "published" : "already there");
  } finally {
    await pool.end();
  }
}

main().catch((e) => { console.error(e instanceof Error ? e.message : e); process.exit(1); });
