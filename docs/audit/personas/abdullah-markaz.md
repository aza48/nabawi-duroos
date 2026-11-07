# Persona audit: Abdullah (markaz student, future IU applicant)

Tested https://medinahub.org on Saturday 7 November 2026 with headless Edge at 2000x1100, 1440x1000 and 390x844. Scripts and screenshots are in C:/Users/akhmu/AppData/Local/Temp/claude/1b16e9379667e0a5/f8098e22-02f6-41ec-a78b-2f35c5c4b1b8/scratchpad/agents/abdullah/ (screenshots in the shots folder). No repo files edited, no forms submitted.

Honesty note: I looked at screenshots of home (2000), /programs (1440), /programs/taba (2000), /duroos/schedule (2000), /ask (2000 and 390), /more (2000), /guides/finding-an-apartment (2000), /programs mobile. For the other pages (library, discounts, guides index, calendar guide, cost of living, visas, SIM, IU pages, shaykh pages) I read the full text and checked page height and horizontal overflow, but did not eyeball every layout. Screenshots for those exist in the shots folder at 2000, 1440 and 390 (full page) if you want to check them.

## Goals

| # | Goal | Result | Path and clicks | Where stuck |
|---|------|--------|-----------------|-------------|
| 1 | Compare Arabic programmes for a brother (price per month, schedule, level, location, start date) | PARTIAL | Home > Study (1 click). Cards on /programs. Then open each of MAP, Taba, Ahlul Athar, Mutun, Fusha, Safwah (2 to 5 clicks each, plus tab clicks for Levels and How to apply). About 15 clicks to build my own table. | No filter, no sort, no compare view. "Compared side by side" in the hero is not true: it is a list of cards. Prices are in mixed units (MAP is GBP 2,699 for one month, Taba is 400 SAR a month, Safwah says "Affordable", Mutun and Ahlul Athar a flat figure). No class hours or schedule anywhere except MAP (4 to 5 hours a day). Only MAP shows an intake date. Taba, Ahlul Athar, Mutun have no start date or "rolling intake" statement. Levels are on tabs, different on each page. Cannot answer "which starts soonest". |
| 2 | Apply to the Islamic University: open date, documents, age limit, portal steps | FAILED for undergraduate / Ma'had, PARTIAL for postgraduate | Ctrl K "apply iu" > nothing relevant at the top. /ask/how-to-apply-iu (2 clicks) gives two sentences. /programs/iu-madinah > How to apply tab gives 4 generic steps. | No date for when applications open or close. No document list (it says "see the Study in Saudi list" with no link on that line in the tab text). No age limit, no minimum grade, no Arabic or Islamic-studies prerequisites, no visa status rules (I am on a visit visa: can I apply from inside Saudi?). Only the postgraduate guide has real detail (fees, SAR 300 application fee, conditions), which is useless for a 27 year old with no degree plan yet. The IU page "Last checked: April 2026" is 7 months old and the FAQ above it says "Last verified 7 November 2026", so the freshness signals contradict each other. |
| 3 | Rent a flat near the Haram or the University | PARTIAL | Search "rent apartment" > /guides/finding-an-apartment (2 clicks). Also /guides/cost-of-living for prices. | No area names at all (no Quba, Al-Aziziyah, Sultanah, Al-Jami'ah, Bab Majidi etc.), no distance to the Haram or campus beyond "8 to 15 minute drive", no price per area, no sample listings. Price table is by size only (studio 1,500 to 2,500) and contradicts the budget table (single person rent 1,000 to 2,000). Search tips are good (groups, Haraj, agencies, checklist). Group names are plain text with no links. |
| 4 | Bank account and SIM without iqama, home internet | SUCCESS | Guides > SIM card, internet and a Saudi bank card (2 clicks). FAQ answers also exist. | Minor: no prices for the SIM or data plans, no named router or plan, no list of banks that accept Visitor ID, says "if you can" activate Nafath, which is the hard part for a visitor and is not explained. Works as a checklist. |
| 5 | Full weekly duroos schedule, subscribe to a shaykh in his calendar | SUCCESS with friction | Duroos > Schedule (2 clicks), tap a card to open the lesson or shaykh (3), "Add to my calendar" is a webcal link. I fetched the .ics: HTTP 200, text/calendar, Asia/Riyadh timezone, 3 hour refresh. Works. | The grid has no subscribe action. You must open the shaykh page first. Webcal links do not work on desktop Chrome without an app handler, no "copy link" or Google Calendar button. Grid cards truncate Arabic titles to "..." and show no English title or time. 5 duroos are in a "days not stated in the source" list, which reads like an internal note. |
| 6 | Monthly budget | SUCCESS | Search "budget" (1 result: the cost guide, plus a car rental discount) or Ask > "How much money do I need per month" (3 clicks). | Single person range 2,900 to 6,100 is huge. No "markaz student on a visit visa" scenario (language centre fee, visa runs, no health cover). Rent row contradicts the rent table. Fine otherwise. |
| 7 | Extend or understand visit visa options | PARTIAL | Search "visit visa extension" > Visas for family members and visitors (2 clicks). | Gives validity by passport (UK, US, EU/Canada 90 days) but never says what to do at day 90: can it be extended inside the Kingdom, via Absher, cost, exit and re-entry, how markaz students on a language-study stay do it. The guide title is about family members, so visitors might not click it. Nothing for a Canadian specifically beyond "1 to 5 years, 90 days per stay". |

## Friction list

Severity: H high, M medium, L low.

1. H. /programs, all viewports. Expected: filter by gender, online, price, level, start date, and a compare table (hero promises "compared side by side"). Actual: 13 unsorted cards, three different price formats. Fix: add a compare table (rows: institute, price per month in SAR, hours per week, levels, start dates, location, online yes/no, age) with column sort and filter chips (Brothers, Online, Under 500 SAR). Normalise the price field to a number plus a note (MAP: about 10,999 SAR for one month all inclusive). Screenshot: shots/programs_1440.png.
2. H. No undergraduate IU admission content anywhere. Expected: a guide "Applying to the Islamic University (Ma'had and college)": opening window, documents, age limit, Study in Saudi steps, what a visit visa holder must do. Actual: two-sentence FAQ plus 4 generic steps. Search "age limit", "admission requirements", "قبول" return nothing useful. Fix: write the guide, link it from the FAQ and from the IU programme page, add the key dates to the home "Coming up" strip.
3. H. Contact number is +1 234 567 9076 (wa.me/12345679076) in the footer of every page, on /ask, /library and "Send a takhlees". It looks like a placeholder number. If it is not real, every "message the owner" path is dead. If it is real, it still looks fake to a stranger. Fix: confirm, and show the owner's name or role beside it. Screenshot: shots/ask_2000.png (footer).
4. H. /ask at 390px: page is 815px wide (document scrollWidth 815 on a 390 viewport). The topic pills and the search box and question rows run off the right edge, "Can I open a Saudi bank account without an iqa" is cut off. Cause: the topic pill list items (LI.shrink-0) are not in an overflow-x container. Fix: wrap the pills in overflow-x-auto with min-w-0 on the parent, check the grid column has min-w-0. Screenshot: shots/ask_mobile_view.png.
5. M. Search ranking, Ctrl K. "compare arabic courses" returns the Study page first (good) but then Starting a business and Emergency numbers; "cheapest arabic program" puts Study as a page then sisters guide, business guide; "apply iu" returns the library and discounts as top Pages and no IU programme page or the "How do I apply" FAQ in the visible top results; "MAP" returns Restaurants ("on a map") first; "ahlul athar price" returns play areas and cost of living before anything about Ahlul Athar; "قبول" returns nothing. Fix: weight title and alias matches above body matches, add aliases (iu, jamiah, jami'ah, markaz, marakiz, qubool, قبول, admission, visa run, rent, flat, apartment), stop matching on common words ("program", "course", "map") against body text. See search table below.
6. M. Freshness is contradictory. Every guide and FAQ shows "Last verified 7 November 2026" (today), programme pages show "Last checked" Mar 2026, Apr 2026, Oct 2026, Oct 2025 (Mutun). The blanket date looks auto-stamped, so it stops being believable. Mutun at 13 months old with a price of 550 SAR is stale. Fix: per-page real check dates, flag anything over 6 months in amber, show "who checked" (initials or role).
7. M. Programme pages: Taba, Ahlul Athar, Mutun have no fees tab and no dates tab. Price only appears in the hero. Fix: add a Fees and dates tab on every programme page with the same fields as MAP.
8. M. /duroos/schedule grid: Arabic titles truncated with "...", English title not shown, no time in cells (only the prayer row), and no way to pick a shaykh and subscribe from the grid. Fix: show a shaykh filter or a "Subscribe" icon on each card, plus a "copy calendar link" and a Google Calendar link next to webcal.
9. M. /guides/visas-for-family-and-visitors: nothing about extension or what happens after 90 days. Fix: add a "Staying past your visa" section and rename the guide "Visit visas, extensions and family visas".
10. M. /guides/finding-an-apartment: no neighbourhoods or prices by area. Fix: add a table (area, distance to Haram and to campus, typical studio rent, who lives there).
11. M. Rent numbers disagree between the rent table (1,500 to 2,500 studio) and the budget table (single person rent 1,000 to 2,000). Fix: single source of truth for the figures.
12. L. WhatsApp round button floats over content at every viewport, and at 390px it covers the "Next intake" line on MAP (cut at "20 February 20"). Fix: hide on pages with a sticky bottom nav or shift it above the bottom nav and make it dismissible. Screenshot: shots/prog_mobile_view.png.
13. L. Home hero "Next adhan (tomorrow) Fajr 6:19:14" ticks every second, which is fine, but "Finished" tags on every dars after Isha hide that there is nothing left today. Today's duroos shows all Finished at night, so the largest block of the home page is a list of things I cannot attend. Fix: after the last dars, show tomorrow's duroos instead.
14. L. "Join the group" appears in the nav, the floating button, the hero card, the footer and a card in the content on most pages: 4 to 5 times per page.
15. L. Tab focus order works (skip link, logo, nav, search, join, theme), visible focus outline exists. Ctrl K opens, Escape closes, arrows and Enter navigate. Good. Not an issue, noted as a pass.

## Desktop layout critique

Content is capped at roughly 1500px at 2000 wide (about 250px side gutters), so the page is not stretched, but several pages feel half-empty inside that column.

Home (/):
- 2000: The hero is good. "Coming up" has three cards, the big exam card has a big empty body between the counter and "Then:" line (about 100px of blank). "Today's duroos" is a two column grid with a lone card at the end of nearly every section (After Dhuhr has one card and an empty right half, After Asr and After Maghrib have 3 cards so the third sits alone), leaving visible holes. The right rail (MESH group, Latest updates) stops after about 230px, then there is empty space down the right side for the rest of the list. "Settling in Madinah" is 8 cards in 4 columns, fine, but picks the first 8 guides, not the most useful (no SIM, no cost of living, no first steps).
- 1440: Same structure, tighter, the holes are less obvious.

/programs:
- 2000 and 1440: 3 column grid. Rows end with orphans: Arabic institutes has 5 cards (3 and 2), Degrees 2 cards in a 3 column grid, For sisters 4 (3 and 1), In the Haram 1 lonely card. Cards are different heights with the price line pinned to different positions. Gender badges are inconsistent in order (Brothers, Sisters, Online / Sisters, Children, Brothers). A large blank band above the footer. The MAP hero is strong, but its right half is a short list of three facts with a lot of empty dark green.

/programs/taba (and likely every programme page):
- 2000: The body text column is about 740px wide and the right card sits at 1430px, so there is a ~400px dead gutter between them. Under the text there is about 150px empty before the footer on Overview. Tabs for Levels and Apply have 3 lines of text each, so those tabs are mostly white space. The hero has an empty right half. Nothing in the tab content uses the width: a table of levels and fees would fit.
- 1440: better, the gutter shrinks.

/duroos/schedule:
- 2000 and 1440: The grid fits the width well and is the best-used page. But the grid has big blank cells (Saturday Isha, Fri Maghrib bottom, Mon to Fri Fajr and Dhuhr rows are tall and empty because of the Dhuhr and Fajr rows being sized to Saturday only). Text in cells is tiny (about 10px) at 2000. The "days not stated" cards run full width at 1340px for two lines of text each, which is an awkward use of width.

/ask:
- 2000: left topic rail plus a 1150px list. The answers collapse so the page is a long list of one-line questions with an empty right margin in every row; the "Have a question" card only fills 60% of the width and is left aligned with a blank right side. Topic counts (1, 1, 3) show most topics hold 1 question, so the filter rail is almost useless with 18 questions.
- 1440: fine.

/more:
- 2000: 4 column card grid with 7 cards (3 on the second row, one empty slot). The Phone alerts card has about 180px of empty space inside it at the bottom because it is stretched to match the height of the "About MESH" column. Two of the "More" cards (Study, Library, Discounts, Schedule, Live, Updates) just repeat footer and nav links. A whole page that mostly duplicates the nav.

/guides/finding-an-apartment (same template for every guide):
- 2000: left "On this page" rail, a 600px article column, and the right 700px of the page is blank. The article is 2.5 screens tall because it is a narrow column in a 1500px layout. A checklist and a table would fit if the right column held a "key facts" box or related guides.
- 1440: the blank right side shrinks to about 300px.

/guides (index), /library, /discounts, /guides/university-calendar-1448, /duroos, and the lesson and shaykh pages: not eyeballed, but heights are 3.5 to 7k pixels at 2000 and 1440 with no horizontal overflow. /discounts is 4,500px tall (10,194px on mobile), which is a lot of scrolling for what is a list of offers.

Mobile (390): /ask overflows (see friction 4). Other pages checked have no horizontal overflow. Bottom nav works. The WhatsApp button overlaps content.

## Search (Ctrl K, run from the home page)

| Query | What came back | What should have come back |
|-------|----------------|----------------------------|
| compare arabic courses | Page: Study in Madinah. Guides: Arabic learning resources, sisters guide, Starting a business, Course descriptions, Emergency numbers. Answers: Where can I learn Arabic... | Study page first (ok), then individual institute pages. The business and emergency guides are noise. |
| cheapest arabic program | Study page, sisters guide, Arabic resources, Starting a business, Postgraduate admission, Emergency numbers | Study page and Ahlul Athar (350 SAR, the cheapest paid one) at the top. Fuzzy words "program" match everything. |
| apply iu | Pages: Jamiah library, Student discounts. Guides: Postgraduate admission, Moving from Ma'had, Calendar, sisters, ta'jeel | The FAQ "How do I apply to the Islamic University" and the IU programme page. They were not in the visible top results. |
| admission requirements | Postgraduate admission, sisters guide, Starting a business, First steps for new students, Mutun al-Ijaz | An undergraduate admission guide (does not exist). |
| age limit | Play areas, Kindergartens, Postgraduate, Finding and renting a flat; answers ta'jeel | An IU and institute age limits page (Taba from 12, Mutun 6 to 10, etc. exist as text inside pages but are not surfaced). |
| rent apartment | Finding and renting a flat, cost of living, visas, getting around, graduating; answer: stipend | OK. Top two right. |
| visit visa extension | Visas for family members and visitors, First steps, SIM card, Kindergartens, Umrah | The visas guide first (ok) but it does not answer extension. SIM and Kindergartens are noise. |
| budget | Cost of living guide, and Discounts "Budget Saudi 5% off every car" | Cost guide and the budget FAQ. The FAQ "How much money do I need per month" did not show for the bare word. Car rental discount is noise. |
| قبول | "Nothing found" | The IU programme page and apply FAQ. Add Arabic aliases. |
| jamiah | Jamiah library, Student discounts, Ma'had to Kulliyah, Calendar, Postgraduate, Giving birth, sisters | OK for library. Rest is body-text noise. |
| markaz | Study in Madinah, Play areas, sisters, Sports, Getting around, Visas | Study page and the Taba, Ahlul Athar etc. cards. Sports and Play areas are noise. |
| taba | Two FAQs, Taba Institute, Academiyah al-Ma'rifah, discount "Taba Dent" | Taba Institute first. It is third, below FAQs. Taba Dent (a dentist) shows up too, which is mildly funny but confusing. |
| bank | Student discounts, SIM card guide, First steps, Etimad, Driving licence, Ma'had to Kulliyah | SIM, internet and bank guide first. It is second. Discounts should not beat it. |
| sim card / internet | SIM guide present, plus phone alerts page for "sim" and "internet" (matches "notifications"?) | OK, with a stray "Phone alerts" page. |
| visa | Visas guide first | OK. |
| calendar subscribe | Calendar and holidays guide, ta'jeel guide | A shaykh calendar help page or the schedule page. Does not return anything about adding a shaykh to a calendar. |
| MAP | Restaurants guide first, play areas, sisters guide, answers, then Madinah Arabic Program | MAP programme first. Acronym needs an alias and exact title match boost. |
| ahlul athar price | Play areas, cost of living, Starting a business, Everyday apps, Sports | Ahlul Athar page, and the Study page card with 350 SAR. Did not return the institute in the first screen. |
| scholarship | Postgraduate, stipend FAQ, monthly budget FAQ, IU and Manarat programmes | Good. |
| when do applications open | Phone alerts, Ma'had to Kulliyah, Postgraduate, First steps, Course descriptions, Graduating | No page has the answer. |
| documents | Graduating guide and a graduation FAQ | Admission documents, nothing exists. |
| hotel | Finding and renting a flat, plus 5 hotel discounts | OK. |
| apartment near haram | Today's duroos (!), Finding and renting a flat, cost of living, getting around, sisters, visas | Finding and renting a flat only. "Today's duroos" matching "haram" is wrong. |
| stipend | Ta'jeel guide, Sports and martial arts (!), First steps, Calendar, stipend FAQ | Stipend FAQ first. Sports guide is noise. |

Overall: the engine matches many words anywhere in the body, so long guides appear for everything. Titles and FAQs should win. Keyboard behaviour is good (Ctrl K, arrows, Enter, Escape).

## Trust

- Who runs it: "Run by students, for English-speaking students in Madinah". No names, no team page, no contact other than the +1 234 567 9076 number that looks like a placeholder, no email. A newcomer sending money based on this has no idea who is accountable.
- Last checked: shown on guides and programme pages, but the guides all show today's date, so I cannot tell what was really checked. Programme pages show real mixed dates, one 13 months old. Home shows "Checked against the official channels 1 min ago" for the duroos, which is good.
- Sources: guides do not cite sources. The visa guide says "check visa.mofa.gov.sa" without a link. IU pages link to Study in Saudi. Prices have no "reported by" or date per price. Student quotes are anonymous ("one resident's power was cut").
- Disclaimer on the Study page ("Fees and dates change... confirm with the institute") is good.
- Library: 300+ manuscript links and Telegram channels with no description or vetting, linking out to many unknown Telegram groups. Reasonable for students, but trust cues are absent.
- MAP is labelled "Our first recommendation" with no explanation of why or whether MESH has any relationship with MAP. A markaz student comparing options will ask if this is paid placement. Say so either way.

## Content gaps for a markaz student and future applicant

- Undergraduate admission: opening window, closing date, documents, age, minimum education, what a visit visa holder can do, how markaz study affects the application, whether a markaz certificate helps, test or interview, acceptance rates and timeline.
- Side-by-side programme data: weekly hours, class size, start dates per month, level mapping between institutes (what Taba Qadir 2 equals in Ahlul Athar or Madinah Books), whether the curriculum is Madinah Books or another series, which prepares you best for the Ma'had.
- Student visa versus visit visa for markaz study: what status a language-centre student has, whether the institute issues a letter, extensions, cost of visa runs, Umrah visa limits.
- Visit visa extension and exit/re-entry mechanics, with costs.
- Areas guide with prices and distance to the Haram and University; short-term housing (weekly and monthly).
- Real monthly budget for a visit visa markaz student (rent share, markaz fee, food, transport, health, visa run), with a calculator.
- Where to pray and study halaqat as a non-Arabic speaker, Arabic-to-English duroos options (one FAQ covers it).
- Health insurance for visit visa holders (only one line about no free healthcare).
- Transport to the markaz from common neighbourhoods.
- A "your first 30 days as a markaz student" path (the Guides index groups by stage, but "Getting started" has 3 guides and none for a visit-visa student).
- Money transfer and cards from Canada, Wise and remittance, cash vs card.

## Useless or confusing elements

- "compared side by side" on /programs: it is not.
- The /more page: 7 cards that duplicate the nav and footer. Merge Phone alerts into the schedule page and put group rules in the footer or About.
- Footer owner contact line repeated on every page (and looks like a placeholder).
- Floating WhatsApp button on every page on top of a nav button, a hero card, a footer button and a content card.
- /ask topic rail: 6 topics for 18 questions, 3 topics have 1 question each. A single searchable list does the job.
- "Days not stated in the source" cards on the schedule: internal language, and 5 full-width cards for 5 shaykhs.
- Dead white space in the programme page sidebar and the Phone alerts card.
- "Latest updates: No changes announced" card on the home page is permanent empty text most days.
- Islamic dates widget (Ramadan, last ten nights, Eid) is useful but gets the same visual weight as the exam countdown.
- "21d 01h 07m 24s" monospace ticking timer inside the exam card is noise next to "22 days to go".
- Checklists with "0 of 8 steps done" on a read-once guide: fine for SIM, odd on the apartment guide.
- Search results show "Pages", "Guides", "Answers" in a fixed order, so the actual best hit is often third.

## Anything broken

- /ask at 390px: horizontal overflow (page 815px wide).
- Placeholder-looking phone number site-wide (+1 234 567 9076).
- WhatsApp FAB overlaps the MAP intake date on mobile.
- Search returns nothing for Arabic query "قبول", and poor ranking for acronyms (MAP).
- Webcal "Add to my calendar" is the only subscription method; works on phones and Apple Calendar, not copyable or usable on a desktop without a calendar app handler. The .ics itself is valid (200, text/calendar).
- Everything else loaded: all tested pages returned 200, an unknown URL returns 404, robots.txt and sitemap.xml return 200.

## Top 5 problems

1. No undergraduate IU admission guide (dates, documents, age limit, visit-visa rules): search for "age limit", "admission requirements" or "قبول" returns nothing useful.
2. /programs is not a comparison: no filter, no sort, mixed price units, no start dates or hours except MAP, and Taba, Ahlul Athar and Mutun have no fees or dates tab.
3. Trust signals contradict each other: every guide says "Last verified 7 November 2026", programme pages say Mar 2026 to Oct 2025, and the owner number looks like a placeholder (+1 234 567 9076).
4. Search ranking is noisy: "MAP" returns Restaurants first, "apply iu" misses the IU FAQ and page, and long guides match every query.
5. Layout and mobile: /ask overflows horizontally at 390px, guide and programme pages leave 30 to 45 percent of a 2000px screen blank, and the home and programme grids end on orphan cards.
