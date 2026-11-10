# Brief: one new MESH guide (naseer, 9 Nov 2026)

MESH (medinahub.org) is a free site run by students for English-speaking students and families living in Madinah (many at the Islamic University of Madinah, IU; many on student iqamas or Visitor IDs, some with wives and children). Repo: /home/user/medinahub (read only for you; do NOT edit any file in the repo, do NOT git anything).

## Your output (write both files into /tmp/claude-0/-home-user-medinahub/c614ae6f-01c9-5b78-a358-c8b89e66ee04/scratchpad/guides/)
1. `<slug>.ts.txt`: exactly one TypeScript object literal of type SeedGuide, ready to paste into an array:
   { slug: "...", stage: "getting-settled" | "getting-started" | "study" | "family" | "leaving", title: "...", summary: "...", bodyHtml: `\n<p>...</p>\n<h2>...</h2>...` },
   bodyHtml is a template literal: no backticks or `${` inside it. Allowed tags: p, h2, h3, ul, ol, li, strong, em, a, table, thead, tbody, tr, th, td, blockquote. Callouts are `<blockquote><p>Tip: ...</p></blockquote>` (or "Note:" / "Important:"). Use <ol> only for real steps in order. Aim for 600 to 1,300 words, 4 to 8 h2 sections. Start the body with "<p>Checked November 2026. ..." followed by a two or three sentence plain overview.
2. `<slug>.md`: research notes: every fact in the guide with its source URL(s), what conflicted and how you settled it, and an "Open questions for the owner" list (facts you could not confirm and therefore LEFT OUT of the guide).

## Read first (style and to avoid repeating other guides)
- /home/user/medinahub/CONTRIBUTING.md (house rules)
- An example guide for voice and markup: the `check-visa-and-iqama-online` guide in /home/user/medinahub/src/server/seed/content/guides-admin-papers-2026-11.ts and `cost-of-living` in guides-2026.ts
- grep /home/user/medinahub/src/server/seed/content/ for your topic's keywords so you link to existing guides and do not repeat them at length. Existing guide and FAQ slugs are in /tmp/claude-0/-home-user-medinahub/c614ae6f-01c9-5b78-a358-c8b89e66ee04/scratchpad/guides/slugs.txt. Link to them as <a href="/guides/<slug>">Title</a> (FAQs are /ask/<slug>; check which file a slug is in: FAQ objects have `question:` not `title:`). Only link slugs that exist.
- /home/user/medinahub/docs/research/ has research notes; grep it for your topic too (e.g. telegram-iu-2026-11, gomedine-2026-11, chats-2026-11, living-in-madinah.md) for local detail.

## Research
Use WebSearch (and WebFetch where a host answers) for official sources: my.gov.sa, moh.gov.sa, absher.sa, moj.gov.sa / najiz.sa, se.com.sa, nwc.com.sa, amana-md.gov.sa, wmn.gov.sa (the Presidency for the Two Holy Mosques' affairs), qurancomplex.gov.sa, spa.gov.sa, iu.edu.sa, and reputable news. Only publish facts that an official source states, or that several independent reliable sources agree on. Prices and dates: give the month checked ("November 2026"). If a fact is uncertain, leave it out and list it as an open question. Do not guess.

## House rules (a PR that breaks them is sent back)
- NO em dash or en dash anywhere (use commas, colons, "to"). Check with grep for — and –.
- Plain, warm, professional British-leaning English ("organise", "programme"), short sentences, second person. No filler, no AI-sounding phrasing ("navigate", "seamless", "crucial", "delve", "embark", "whether you're", "it's important to note", "in conclusion"). No exclamation marks.
- Speak with authority: never mention where information came from in the guide text (no "according to", "reportedly", "sources say", "some say", "may", "might", "it is believed", "not stated"). The guide just states facts. Uncertain facts are left out.
- Impartial: never recommend or feature one markaz, institute, business, shop, clinic or doctor. Where you list businesses or providers, list several, alphabetically, without praise. No adverts. Government bodies are fine.
- Rewrite in your own words; never copy text from a site.
- Religious matters: describe practice and logistics, never give a fiqh ruling of your own; where a ruling matters, say to ask a scholar, and the University's or Haram's scholars answer questions. Never call MESH or its assistant a shaykh.
- Do not add a "contact Admin" help line: the page adds one itself.
- Arabic names of offices or services may appear once in brackets after the English, e.g. Civil Affairs (الأحوال المدنية).
