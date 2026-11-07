# Persona audit: Yusuf, first-year Kulliyah of Sharia (live site, 7 Nov 2026)

Tested https://medinahub.org with headless Edge at 390x844 (phone) and 1440x1000 (laptop). Screenshots are in
`C:/Users/akhmu/AppData/Local/Temp/claude/1b16e9379667e0a5/f8098e22-02f6-41ec-a78b-2f35c5c4b1b8/scratchpad/agents/yusuf/` (called SHOTS below).

## Goal results

| # | Goal | Result | Taps (approx) |
|---|------|--------|------|
| 1 | Sharia level 1 muqarrarat and takhlees | Partial | 3 to reach a Drive folder, then unknown |
| 2 | Exam start, break, into phone calendar | Success on home, broken on the Calendar guide | 2 from home |
| 3 | Fiqh or aqeedah dars tonight after Maghrib, where to sit | Partial (only by browsing, search cannot do it) | 4 |
| 4 | Stipend: how it works, when it stops | Partial | 2 |
| 5 | Etimad ticket and ta'jeel | Success (good content) | 3 each |
| 6 | Discounts: gym, optician | Partial (found by browsing, local search fails on both words) | 3 |
| 7 | Unknown topics (iqama renewal, student affairs office, bus) | Failed, but gracefully: search shows loosely related guides, no honest "we don't cover this" | 2 |

### 1. Muqarrarat and takhlees: partial
Path: Library (nav) > "Muqarrarat by college" > Shariah tile. That opens one Google Drive folder (link works, HTTP 200).
Search "muqararat sharia" gives the Library page first (good), but also sisters guides, driving licence, etc.
Stuck: the site gives me one Drive folder per college. It says "Open a college to find your level" but the site itself does not list levels, books or takhlees for Sharia level 1. I cannot tell from MESH what the level 1 books are, which are taklhees, or whether anything is there. The FAQ "Where are the muqarrarat for my college?" is two sentences with no link to the Library. A takhlees invitation sits on the page but no takhlees is visible anywhere. Search "takhlees" returns a business-startup guide and the Etimad guide before the one relevant FAQ.

### 2. Exams and break into calendar: success from the home page only
Path: Home, scroll one screen to "Coming up". Card says "First-semester final exams, Sun 29 Nov to Mon 14 Dec, 21 days", "Then: End-of-semester break, Tue 15 Dec" and a button "Add University dates to my calendar" (webcal://medinahub.org/api/v1/calendar/dates.ics, works, 200). 2 taps. Data matches the Calendar guide and the ICS.
Problems: the feed is all or nothing (university plus Islamic dates, Ramadan, Ashura, Founding Day...). I cannot subscribe to just exams and break. The ta'jeel window (13 to 19 Dec) is in the Calendar list but NOT in the feed and not on the home card, even though it is the single most time-critical date for a student thinking of a semester off.
The Calendar guide itself (Guides > Calendar & holidays, or "Full calendar") is broken, see friction list F1. The per-date "Add to calendar" is a plain paragraph, not a button; it does nothing.
No exam timetable (which exam on which day). The site gives only the start date and nothing says where to find the timetable.

### 3. Dars tonight: partial
Path: Home > "Today's duroos" list or Duroos > Today. At Maghrib there are 3 duroos, two are relevant: al-Aqidah al-Wasitiyyah (Suhaymi, Nabawi Northern Expansion, right of those entering from King Fahd Gate (21)) and Tirmidhi (hadith). Lesson page gives the location, adhan time, "starts right after the iqamah", book link (turath), YouTube broadcast, "Add to my calendar" (ICS works, repeats weekly). That part is genuinely good.
Stuck: there is no subject label or filter (fiqh, aqeedah, hadith, tafsir). I had to know that "Wasitiyyah" is aqeedah. Search "fiqh dars" returns sports and business guides; search "fiqh" returns Markaz Taibah and one Suhaymi lecture, but not Dalil al-Talib, Zad al-Mustaqni, Rawd al-Murbi, which are all on the schedule. The schedule shows many lessons under a heading "DAYS NOT STATED IN THE SOURCE", which tells me nothing and looks like a data problem. "Where exactly to sit" is text only; no map or photo of the gate, so "between the two Haswas" or "Second Haswa" mean little to a new student.
Also all cards say "Finished" when I looked after Isha; the site did not offer "tomorrow" highlights at that point. The hero says only "Next adhan (tomorrow) Fajr".

### 4. Stipend: partial
Path: search "stipend" (or "mukafaa") > Answers section > "How much is the University stipend?" (scroll down the palette, answers are listed after 5 guides, so it is easy to miss). 2 to 3 taps.
Answer: 840 SAR a month, stops during ta'jeel or i'tithaar. That is all. Missing: when it is paid, how (bank card), whether it continues in summer holidays, when it stops at graduation or after the 4-year limit, what if you fail or are dismissed, deductions, what happens to the stipend during the holiday after the final month. "When it stops" is only answered for ta'jeel. The page has no link to the ta'jeel guide and no related links.

### 5. Etimad and ta'jeel: success
Etimad guide (Guides > Setting up your Etimad account) is clear: 6 steps with a passport-mismatch warning. Search "etimad", "itimad" both work. Missing: how to actually request the ticket (the guide stops at profile setup), who to see at the university, how long it takes, the summer ticket entitlement window.
Ta'jeel guide: very good, table of ta'jeel vs i'tithaar, effects on stipend, room, visa, 4-year limit, portal steps. It warns the source is a 2023 student guide, which is honest. Search "tajeel", "tajil", "ta3jeel" all find it; "ajal" does not.
Small issue: the page says the "ta'jeel window is short, see the academic calendar" but does not state the 1448 window itself (13 to 19 Dec 2026) in the guide.

### 6. Discounts: partial
Path: More > Student discounts (or search "gym" > FAQ). The page has category chips including "Sport and fitness" and "Tailors, glasses, laundry and more". Islamic University Sports Club, 50% off for students, is tagged "Students named"; Ziyar Optics 50% and Telescope Optics 40% with free eye test are there.
Broken: the page's own "Search offers" box returns "No offer matches" for "optician" and "gym", although the page intro says "gyms" and Ziyar is an optician. "glasses" works. The category chip named "Tailors, glasses, laundry and more" hides opticians in a catch-all. Global search "optician" shows only the FAQ answer and no link to the discounts page offers; "gym" shows the sports guide (martial arts) first.
No indication of the discount's date, validity, or how to prove student status beyond "show your University card". Most offers are staff-oriented ("منسوبي الجامعة"), which is mentioned, good.

### 7. Things the site may not cover
"how do I get my iqama renewed", "where is the student affairs office", "university bus times", "exam timetable", "transcript": the palette shows 5 to 8 loosely related results (the driving licence guide, SIM guide, Student discounts) as if they were answers. Only a truly nonsense query ("xqzvbn") says "Nothing found... ask in the WhatsApp group". So the site never admits it lacks an answer for a real question; it shows junk. The "Ask" page search box shows no result for these queries and just the WhatsApp card, which is the correct behaviour; the palette should do the same.
Real answers that do exist but are not found: student affairs office is in the "Moving from the Ma'had to the Kulliyah" guide (3rd floor, Deanship of Student Affairs) but the query "student affairs office" did not rank it first.

## Friction list

| ID | Severity | URL | Viewport | Expected vs actual | Screenshot | Fix |
|----|----------|-----|----------|--------------------|------------|-----|
| F1 | blocker | /guides/university-calendar-1448 | both | Expected a clean calendar of dates with working "Add to calendar". Actual: the "At a glance" block renders as raw text ("At a glanceAll dates29", "2 months 6 months Whole year", "UniversityIslamic (expected...)"), the months are rendered as empty tick-circles (guide "steps" component reused), the header says "12 steps to tick off, 0 of 12 steps done" on a calendar, and per-date "Add to calendar" is a non-clickable paragraph. Looks broken, not designed. | SHOTS/cal-top-m.png, cal2-m.png, d_guides_university_calendar_1448.png | Do not render this guide through the step-checklist template. Render the at-a-glance and all-dates components as real UI; make "Add to calendar" a link to a per-event ICS; remove the progress bar and "steps" label. |
| F2 | blocker | /ask | 390px | Expected FAQ list that fits the screen. Actual: horizontal page overflow (scrollWidth 815 on a 390 screen). The category chip row (`nav.lg:sticky`) is wider than the viewport, the question list is cut off at the right edge ("Can I open a Saudi bank account without an iqa..."), and category filters can only be reached by scrolling the whole page sideways. | SHOTS/ask-m.png | Make the topic nav `min-w-0` / `max-w-full` in the grid so it scrolls inside its own container; verify no element exceeds viewport width. |
| F3 | major | palette and /search | both | Typing a real question the site cannot answer ("student affairs office", "iqama renewal", "exam timetable", "university bus times") should say so. Actual: 5 to 8 unrelated results, always starting with "Student discounts". | SHOTS/pal-iqama.png | Add a relevance threshold; below it, show "No exact answer. Ask in the WhatsApp group" plus the 2 best matches. Drop "Student discounts" from the generic fallback. |
| F4 | major | palette | both | "fiqh", "aqeedah", "hadith", "dars tonight" should find lessons by subject. Actual: "fiqh dars" returns sports/business guides, "fiqh" returns Markaz Taibah women's centre and one lecture. Dalil al-Talib, Zad, Rawd are not matched. | n/a (text) | Tag every lesson with subject (fiqh, aqeedah, hadith, tafsir, seerah, usul, lugha). Index the tag. Add subject chips to Today and Schedule. Add intents: "tonight", "after maghrib", "now". |
| F5 | major | /library | both | Expected Sharia level 1 books and takhlees visible. Actual: the college tile is one Drive link, no level breakdown, no list of books, no takhlees shown. | SHOTS/plibrary.png | Add a page per college with levels 1 to 8 and book titles (even just a list). Link takhlees per course. |
| F6 | major | /discounts | 390px | Page search must find "optician", "gym". Actual: "No offer matches". | SHOTS/disc-gym-m.png | Add synonyms (optician = optics/glasses/eye, gym = club/sports/fitness) and match the category label. Rename the catch-all category and give opticians their own chip. |
| F7 | major | /guides/tajeel-and-itithaar, home | both | The ta'jeel window (13 to 19 Dec 2026) should be stated where a student looks. Actual: only in the Calendar guide list; not on home, not in the ta'jeel guide, not in the ICS feed. | SHOTS/pg_tajeel_and_itithaar.png (text) | Put key deadlines (ta'jeel window, i'tithaar deadline) in the "Coming up" card, in the guide, and in the ICS. |
| F8 | major | /ask/stipend-amount | both | Full stipend answer. Actual: two sentences; nothing on payment timing, summer, graduation, 4-year limit or dismissal. No link to related guides. | n/a | Expand with when and how paid and every condition that stops it. Link to ta'jeel guide. |
| F9 | major | whole site | both | Contact number should be real. Actual: owner WhatsApp is "+1 234 567 9076" (wa.me/12345679076 redirects 302). That looks like a placeholder number and appears in the footer, the library takhlees invitation and other pages. If it is not the real number nobody can contribute takhlees or ask for help. | SHOTS/home-full-m.png | Verify the number; if placeholder, replace. |
| F10 | minor | home | 390px | First screen should show something to act on. Actual: the hero takes about 660px of a 844px screen with a decorative day arc; "Coming up" (exams) starts at the very bottom and is covered by the green WhatsApp button. Maghrib and Isha labels on the arc overlap. | SHOTS/home-m.png | Cut hero height by half on phones; move next-dars or exam card above the arc. Fix label collision. |
| F11 | minor | all | 390px | The floating WhatsApp button covers content: "Full calendar" link, the palette's "See all results" link, last lines of lists. | SHOTS/pal-iqama.png, home-m.png | Remove it (the group is linked in the nav, footer, section and More) or move it above the bottom nav and hide while the palette is open. |
| F12 | minor | /duroos/schedule | both | A "DAYS NOT STATED IN THE SOURCE" section with 5+ lessons. Reads like an internal data note. | n/a | Rename "Day to be confirmed" or hide until confirmed. |
| F13 | minor | /guides/graduating-from-mahad | 390px | The text says "three things" (and headings list 3) but the page counts "2 steps to tick off". | n/a | Make the counts consistent. |
| F14 | minor | every FAQ and guide | both | "Last verified 7 November 2026" is today's date on every page I opened. A trust badge that always equals today stops being believed. | SHOTS (text) | Show the real last-checked date per item, or hide the badge. |
| F15 | minor | palette | both | Results show truncated titles and the first group is always "Pages" with generic items; answers (the most useful) come last, after 5 guides. | SHOTS/pal-iqama.png | Show Answers first when the query is a question or matches an FAQ title. |
| F16 | minor | palette | both | Transliteration gaps: "wasitia" nothing, "ajal" nothing, "eid" nothing (the calendar has Eid), "transcript" nothing, "sharia" does not return the Library. | n/a | Add aliases: wasitia/wasitiya, ajal, eid, sharia/shariah. |

## Search quality (every query)

Palette (Ctrl+K or magnifier). "Got" lists the first results. Verdict: G good, P partial, B bad.

| Query | Got | Should have | Verdict |
|---|---|---|---|
| muqararat sharia | Library page, then sisters guide, Getting around, Visas | Library, FAQ muqarrarat | P |
| takhlees | Library, business guide, Etimad, calendar, FAQ muqarrarat last | Library, FAQ muqarrarat | P |
| المقررات | Course descriptions Aqeedah, Library | Library first | G |
| كلية الشريعة | Ma'had to Kulliyah, ta'jeel, Aqeedah descriptions, sisters | Library (Shariah) | P |
| المستوى الأول | Aqeedah descriptions, random lecturers, Saudi German Hospital | Library | B |
| books level 1, shariah level 1, book | Library, updates, descriptions, many unrelated | Library | P |
| exam dates | Calendar, sisters guide, flat guide, postgrad | Calendar only | P |
| exams / final exams | Graduating, Calendar, postgrad, sisters | Calendar first | P |
| exam timetable | Weekly schedule, postgrad, sisters, graduating | "We do not cover timetables" | B |
| holiday | Calendar, Getting around | Calendar | G |
| eid | Nothing | Calendar | B |
| stipend | ta'jeel guide, sports, first steps, calendar, then FAQ stipend | FAQ stipend | P |
| mukafaa, mukafa, مكافأة | Same set; FAQ stipend near the end | FAQ stipend first | P |
| iqama | Visas, driving licence, SIM, Getting around, schools; FAQ home internet | "No answer" (no iqama guide) | B |
| how do I get my iqama renewed | Same junk plus SIM guide | Honest no-answer | B |
| etimad / itimad / etimad ticket | Etimad guide first | Etimad guide first | G |
| tickit home | Graduating, Etimad guide | Etimad guide first | P |
| tajeel, ta3jeel, tajil | ta'jeel guide first (tajil also lists updates and discounts above it) | ta'jeel guide | G (tajil P) |
| ajal | Nothing | ta'jeel guide | B |
| dars tonight, fiqh dars, dars | Today's duroos, alerts, schedule, then sports and business guides | Today's duroos with tonight's list | P |
| fiqh | Markaz Taibah (women), one Suhaymi lecture | All fiqh lessons | B |
| hadith | Markaz Taibah, Battin, Bulugh lecture | Tirmidhi tonight, Fath, Bulugh | P |
| aqeedah after maghrib | Aqeedah descriptions guide, graduating, schools | Wasitiyyah (Maghrib) | B |
| wasitiyyah | Suhaymi, lesson | Lesson page | G |
| wasitia | Nothing | Lesson page | B |
| tawheed, kitab tawhid | A kindergarten guide, MAP, then lecturers and lessons | Lessons first | P |
| tafsir, ruhayli, sulayman ruhayli, fatwa | Lecturers and lessons | OK | G |
| gym | Sports guide, cost of living, apps, FAQ discounts | Discounts page "Sport and fitness" | P |
| optician | FAQ discounts only | Ziyar Optics, Telescope Optics | B |
| student affairs office | Student discounts, graduating, visas, first steps, Ma'had to Kulliyah | Ma'had to Kulliyah guide first | P |
| university bus times | Library, discounts, Ma'had to Kulliyah, calendar... | "No answer" | B |
| bank, absher | Good matches (first steps, bank guide, FAQ) | OK | G |
| scholarship | Postgrad, FAQ stipend, budget | FAQ stipend | P |
| transcript, blackboard, timetable | Nothing / how-to videos (correct for blackboard, timetable) | OK | G/B |
| taxi, uber, ride | Getting around | OK | G |
| xqzvbn | "Nothing found... ask in the WhatsApp group" | OK | G |
| Discounts page box: optician, gym | "No offer matches" | Ziyar, Sports Club | B |
| Discounts page box: glasses | Ziyar Optics | OK | G |
| Ask page box: stipend | FAQ stipend | OK | G |
| Ask page box: iqama renewal, muqararat, bus, student affairs | Nothing but WhatsApp card | OK (muqararat should match) | P |

Summary: exact spellings and guide titles work; synonyms, subjects and honest "no answer" do not. There is also a pattern where one or two generic items ("Student discounts", "Graduating", "Moving from the Ma'had", sisters guide) appear for almost every query, which pads the list with noise.

## Content gaps for a first-year Kulliyah student

1. Level-by-level book list for each college (at least Sharia levels 1 to 8), with takhlees links.
2. Exam timetable and where to find it (portal link), exam rules, what to bring, retakes and the "mulhaq" system.
3. Student affairs office: location, hours, who to see for what; a wakeel contact per college.
4. Iqama issuance and renewal, Absher for students (the First steps guide covers the first issuance only).
5. Timetable and Blackboard how-to as a MESH guide (only a Drive folder of videos in the Ma'had section).
6. University bus or transport between campus and dorms or the Haram.
7. Stipend full rules, payment dates, and what ends it.
8. Attendance rules (absence limits and excuses) for the Kulliyah, grades and GPA system, dismissal warning.
9. Dorm rules and room changes for Kulliyah students.
10. Summer ticket request process after Etimad setup.
11. Subject-based browsing for duroos, and a "which dars is good for my level" note.
12. Maps or photos for sitting spots in the Haram.
13. Medical insurance or clinic access for students.

## Useless or confusing elements (blunt)

- The home hero (day arc, big Hijri date, large countdown) uses about 500 to 660px for information that the Today page also shows. The Fajr countdown after Isha is the biggest object on the page and nobody needs a ticking clock to Fajr. Replace with "next dars near you" or the exams card.
- The step-checklist template (progress bar, "0 of 12 steps done", tick circles) on the Calendar guide, and "2 steps to tick off" on a 3-part guide. It only makes sense for real procedures like Etimad.
- The floating WhatsApp button duplicates nav "Join the group", the home section, the footer and More. Five entries for one link, and it covers content.
- "Study" in the main nav is about Arabic institutes, MAP and Manarat (a paid private college), sisters' centres. Nothing for an enrolled student; it reads like an ad for somebody else. Consider moving it out of the primary nav for logged-in-style use or add a "I am already at the University" shortcut.
- "Last verified 7 November 2026" on every page (see F14).
- The library page lists about 308 manuscript libraries in Arabic (Turkish, Iraqi, etc.) in a very long list. Useful to a handful of researchers, but it makes the page very long and pushes the muqarrarat down for everyone. Collapse it or give it its own page.
- "DAYS NOT STATED IN THE SOURCE" on the schedule.
- On the library, channels such as "Real Estate in Saudi" or "The Hijrah Family" are not related to course study.
- Home "Latest updates: No changes announced. Every dars is on as usual." A permanent empty-state block that takes a section; show it only when something changed.
- Islamic dates dark card on the home page (Ramadan, last ten nights, Eid al-Fitr countdowns) next to the exams. Fine as a nice touch, but it competes with the exams card for the same row.

## Broken or wrong

- /ask horizontally overflows on a 390px phone (F2).
- /guides/university-calendar-1448: unstyled "At a glance", non-functional "Add to calendar", checklist chrome (F1).
- /api/v1/calendar/dates.ics works; per-lesson ICS works with weekly events; other feed names (university, exams) return 404, so any bookmarked or guessed name fails.
- ICS feed omits the ta'jeel window, the i'tithaar deadlines and the add/drop dates.
- Discounts page local search misses "optician" and "gym" (F6).
- Owner phone number looks like a placeholder (F9).
- Calendar guide "Until 22 Oct", "Until 5 Nov" entries are already past on 7 Nov and still shown first in "All dates" (stale items at the top of the list, with the useful exam date fourth).
- No console errors, no dead links found in the pages tested (Drive folder and portal links responded).
- No horizontal overflow at 1440px on any page tested; at 390px only /ask overflowed.

## Summary (top 5)

1. The Calendar guide page is visibly broken on both phone and laptop (raw text, empty tick circles, "Add to calendar" that does nothing); only the home card's webcal button works.
2. /ask overflows sideways on a phone, so the FAQ list is cut off and the topic filter is unreachable.
3. Search shows irrelevant pages for real questions it cannot answer (iqama renewal, student affairs, bus, exam timetable) and misses subjects and synonyms (fiqh, optician, gym, eid, ajal, wasitia).
4. Kulliyah content is thin: one Drive folder per college with no levels, books or takhlees; stipend answer is two lines; no exam timetable, student affairs, iqama renewal or ta'jeel dates on the home card.
5. Many elements take space without helping: a 660px phone hero, the WhatsApp button repeated five times and covering content, the checklist template on non-procedures, "Last verified" always equal to today, the "Study" nav aimed at newcomers, and a placeholder-looking contact number.
