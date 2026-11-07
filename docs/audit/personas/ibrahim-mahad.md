# Persona test: Ibrahim, Ma'had level 2 student (phone, 390px, weak Arabic)

Tested on https://medinahub.org on 7 Nov 2026 with headless Edge, 390x844, touch, Android user agent. One run on slow 3G (400 ms latency, about 50 KB/s).
Screenshot folder (all file names below are inside it):
`C:/Users/akhmu/AppData/Local/Temp/claude/1b16e9379667e0a5/f8098e22-02f6-41ec-a78b-2f35c5c4b1b8/scratchpad/agents/ibrahim/`

## 1. Goals

| # | Goal | Result | Path and taps | Where stuck |
|---|------|--------|---------------|-------------|
| 1 | Ma'had level 2 books and answer keys | Partial | Search icon (1), type "mahad books", tap "The Jamiah library" (2), tap the "Ma'had" chip (3), tap "Textbooks for all four levels" (4), Google Drive opens, tap the level 2 folder (5). Without search: More (1), Jamiah library (2), then the same. | The Drive folder is all Arabic and the site never says "level 2 = المستوى الثاني". Answer keys: the only link is "Every level, with answers" which goes to a Malaysian site (qalam.mediu.edu.my) about "Madinah Books". The site does not say if that matches Ma'had level 2. I could not tell if keys exist inside the Drive level 2 folder. Library is NOT in the bottom nav on phone (it is hidden inside More). |
| 2 | Easy duroos, short, after Asr or Isha, any in English | Partial for times, Failed for easy and English | Duroos (1), Schedule (2), tap a day (3), scroll to "After Isha". 3 taps and a long scroll. The FAQ "Are there duroos in English in the Haram?" is reachable by search "english dars" (3 taps) but it is at the bottom of the results list under about 8 weak results. | No filter by prayer, level, length or language. Cards show only shaykh name, Arabic title, English translation and place. Nothing says "slow Arabic", "beginner", "30 minutes". The FAQ says "English lessons are rare" and names none. The campus masjid (Ibn Ibrahim, at the Islamic University) is not highlighted for a campus student. |
| 3 | Campus to Haram, cheap | Partial (only the generic price), Failed for the actual route | Search "bus to haram" (3 taps) then "Getting around Madinah, and to Makkah". Or Guides (1), card (2). | The page gives "City buses: 3 SAR, download the Madinah Bus app". It never mentions the University, the campus, a bus number, a stop, times, or a campus shuttle. The top search hit for "bus to haram" is "Today's duroos". |
| 4 | What if I fail a level, what are ta'jeel and i'tithaar | Ta'jeel and i'tithaar: Success with effort. Failing a level: Failed | Search "tajeel" (2 taps), then the guide or the FAQ "What's the difference between ta'jeel and i'tithaar?". | Nothing says what happens if a Ma'had student fails a level (repeat? lose stipend? dismissed?). The only hint is a calendar line "Requests for additional chances for academically dismissed students" with no explanation. The ta'jeel guide is written for the Kulliyah ("4-year Kulliyah deadline") and comes from a 2023 student guide. The Ma'had regulations exist as an Arabic folder in the Library but are not linked from the guide. |
| 5 | Holiday: Umrah from Madinah, visiting Quba | Partial | Search "umra" (2 taps), then "Umrah, the Rawdah and Quba from Madinah". Holiday dates are on Home (scroll): break 15 to 19 Dec, winter holiday 8 to 16 Jan. | The guide is 1 minute long. Quba is covered (every Saturday, 3 to 4 km, shuttle about 10 SAR). Umrah is two sentences: train from 160 SAR, miqat Dhul Hulayfah. No steps for doing Umrah, no what to wear, no where to stay in Makkah, no total cost for a student, no group trips. The Calendar page that should list the holiday is broken (see section 8). |
| 6 | Cheap SIM, internet, bank card | Success | Search "sim card" (2 taps), then "SIM card, internet and a Saudi bank card". | Good page. Missing: the price of a student SIM or data plan and which plan to buy. For students it points to "First steps for new students" for the bank card, which is correct and clear. |
| 7 | WhatsApp group and someone to ask | Success for the group, Doubtful for "someone" | The green WhatsApp button is on every page (1 tap). | The owner help number at the bottom of every page is "+1 234 567 9076". It looks like a placeholder (1 234 567 ...). If it is one, every "message the owner" and "Send a takhlees" link is dead. The Ma'had WhatsApp groups (the useful ones for level 2) are only a Drive file in Library, Ma'had section, found by search "whatsapp" at the very bottom of the results. |

## 2. Friction list

| Severity | URL | Expected vs happened | Screenshot | Fix |
|----------|-----|----------------------|------------|-----|
| Blocker | /guides/university-calendar-1448 | Expected a clean calendar with holidays. Got a broken layout: filter buttons show as plain words ("2 months 6 months Whole year", "UniversityIslamic"), 12 month cards with an empty tick circle and only the month name, "Nothing in this period. Try a longer range.", and the date list run together ("Until22Oct 2026Thu", "First semester Add to calendar 5. 11Dec 2026Fri"). The page has 0 buttons and 12 checkboxes in main. No console errors. | cal-y450.png, cal-y1300.png, cal-y2700.png | Do not render the calendar through the guide checklist component. Render the interactive "At a glance" and "All dates" widgets as real components, add spaces and line breaks between date fields, remove "0 of 12 steps done". Add a plain fallback list. |
| Major | /library | Ma'had is what I need, but it is the second chip and the section is 1800 px down, after 11 college cards. The Ma'had folder also appears a second time in the "Muqarrarat by college" list ("Arabic Language Institute (Ma'had)"), linking to a different folder from "Textbooks for all four levels". Two folders for the same thing is confusing. | library1.png, lib-mahad.png | For Ma'had students, put a Ma'had block first with four big buttons "Level 1" to "Level 4" going straight to each level's folder, plus "Answer keys". Remove the duplicate from the college list. |
| Major | Drive folder linked from /library | Level folders are named only in Arabic. A weak Arabic reader has to guess which is level 2. | drive-textbooks.png | Add "(Level 2)" next to each link on MESH, or rename the folders "Level 2 / المستوى الثاني". |
| Major | /library, answer keys | "Every level, with answers: Qalam, all Madinah Book levels" does not say it matches the Ma'had curriculum. A student cannot tell which Qalam level equals Ma'had level 2. | lib-mahad2.png | State exactly which book names belong to Ma'had levels 1 to 4 and where their answers are. |
| Major | Search overall | Weak words return noise: "easy dars" gives Sports and martial arts, Starting a business, Everyday apps. "bus to haram" top page is Today's duroos. The same unrelated guides (Sports, Business, Kindergartens, Sisters) appear on many queries. The best answer (FAQ) is often at the bottom of a long list. | s-easy_dars.png, s-mahad_books.png | Rank FAQ answers first for question style queries. Add a relevance cut off. Show at most 3 per group. |
| Major | Whole site | No page for Ma'had students. The bottom nav tab "Study" is about paid Arabic institutes and GBP prices for people outside the University. A scholarship Ma'had student gets nothing from it, while the Library, his main tool, is hidden in More. | home1.png, q_programs.png | Add a Ma'had hub: books by level, regulations in English, what if I fail, exam dates, level WhatsApp groups. Put Library or Ma'had in the bottom nav instead of Study, or rename Study to "Learn Arabic (outside the University)". |
| Major | /guides/tajeel-and-itithaar | Very dense (5857 px), written for the Kulliyah. Uses Arabic screen names, "wakeel", "mukafa'ah", "exit re-entry visa", "final exit visa", "Idarat as-Safar". 9 "steps to tick off" for a guide that is mostly explanation. Opens with a warning that it is from a 2023 student guide, not from the university. | p_guides_tajeel_and_itithaar.png, tajeel-table.png | Put a 3 line answer at the top in simple words: "Ta'jeel: you pause before the semester starts, no penalty. I'tithaar: you stop during the semester, it counts as not passed." Then add a Ma'had section. |
| Major | /duroos and Home | Duroos have no tags for difficulty, length, language or "good for beginners". The heading "DAYS NOT STATED IN THE SOURCE" on the schedule is internal jargon. | p_duroos_schedule.png | Add filters: prayer time (Asr, Isha), masjid, "slow and clear", "short". Rename the heading "Days not confirmed". |
| Major | Every page | The green WhatsApp floating button (56px) sits on top of content on every screen: it covers "Full calendar" on Home, the search results footer, table cells, and text in cards. | home1.png, home-y1300.png, tajeel-table.png | Hide it while scrolling, or move it into the nav or More. Keep one WhatsApp entry point. |
| Major | /guides/* with "N steps to tick off" (umrah, calendar, tajeel) | A sticky bar "0 of 9 steps done / Tap a step to tick it off" sits under the header and takes about 90 px of the 844 px screen the whole time you read. For Umrah and the calendar it makes no sense because they are not tasks. | p_guides_umrah_rawdah_quba.png, umrah-b.png | Use the checklist only on real step by step guides (SIM, first steps). Make the bar non sticky. |
| Minor | Home hero and /duroos hero | The first screen has no action in it: date, a big adhan countdown, and an arc graphic. The first useful block starts below the fold. On /duroos the list starts after about 1250 px. | home1.png, p_duroos.png | Shrink the hero to about 250 px and show duroos or the next event directly. |
| Minor | Home arc graphic | The "Maghrib" label sits on top of its dot and under "Isha"; labels overlap. | home1.png | Space the labels, or remove the arc. |
| Minor | Search dialog | The focus ring is a gold box bigger than the input and cutting into the dialog edge. Looks broken. | s-mahad_books.png | Use a normal focus ring on the field. |
| Minor | /duroos/lesson/* | Location says "Masjid Quba, Masjid Quba" (repeated). | p_duroos_lesson_quba_khuja_arbaun.png | Do not repeat the name when place and masjid are the same. |
| Minor | /duroos/updates | Says "No updates yet." and straight after shows an "EARLIER" list of updates. Dates appear as "[Thursday 18/5/1448 AH]" with square brackets and only the Hijri date. | q_duroos_updates.png | Remove the contradiction. Show the normal date first and strip the brackets. |
| Minor | /library | 308 Arabic Telegram channels for manuscripts is the longest part of the page. Nothing for a language student. | library-full.png | Move it to its own page. |
| Minor | Home "Settling in Madinah" | Eight guides in no clear order with random icons (key icon on Umrah, Getting around, Everyday apps). None for Ma'had study or exams. | home-y4300.png | Let the student choose "I am in the Ma'had" and show matching guides. |
| Minor | /guides/cost-of-living | Budget tables are for visit visas and families. A scholarship student gets one small note at the end of the budget. | (text only) | Add a "scholarship student" budget block at the top. |

## 3. Readability for a second-language English reader

Words that stopped me:
- Duroos, dars, mashayikh, muqarrarat, takhlees, kulliyah, ta'jeel, i'tithaar, mukafa'ah. A Ma'had student may know some, but not "muqarrarat" or "takhlees" (the Library hero and buttons use both: "Send a takhlees").
- "iqamah" (prayer start) and "iqama" (residency card) are two different words that look the same. "Starts right after the iqamah" is on every duroos card.
- "adhan" is used as a time unit: "Times are the adhan", "Adhan 3:15 PM".
- Place words: "Haswa", "Expansion", "Circle 2 / First Saudi Expansion, between Bab Umar and Bab Uthman", "Western side, left of those entering from Bab Quba (5)". Unusable for a new person without a map.
- Government words without a simple explanation: Nafath, Absher, Zaair ID, Raqm al-Hudood, Idarat as-Safar, wakeel, mushrif, mada card, "final exit visa", "exit re-entry visa", "legalise".
- Idioms and soft English: "carry on studying", "put you back into your classes", "Tap a step to tick it off", "Checked against the official channels", "Expected dates, confirmed by moon sighting", "Students named" (what does it mean?), "Requests for additional chances for academically dismissed students" (very hard), "Nothing in this period. Try a longer range.", "petrol", "crèches", "soft plays", "ride apps".
- Too dense: the ta'jeel guide (4 min, 5800 px, a 3 column comparison table with 5 to 6 lines per cell on a phone), the calendar guide (9300 px), the Library page.
- Good: the SIM guide, Umrah guide, Getting around guide and the FAQ answers are short and clear.

## 4. Search

| Query | What came back | What should have come back |
|-------|----------------|----------------------------|
| mahad books | Jamiah library first, then Study in Madinah, guides, FAQ "Where can I find the Ma'had books and the answers?" | Good. Library first is right. |
| maahad level 2 | Library, then guides (Course descriptions Aqeedah, sisters, ta'jeel, Arabic learning resources) and the FAQ | Works through fuzzy match. Should give a direct Ma'had level 2 link. |
| level 2 | Aqeedah course descriptions, sisters guide, first steps, everyday apps | Ma'had level 2 books. Nothing relevant on top. |
| answer key | Arabic learning resources first (good), then first steps, graduating, driving licence | OK. The FAQ about Ma'had books and answers should be near the top. |
| easy dars | Today's duroos, Phone alerts, Weekly schedule, Updates, Live, then Sports, Business, Everyday apps | A "which duroos are good for beginners" answer. None exists. |
| english dars | Duroos pages, then off topic guides, the FAQ "Are there duroos in English" only at the bottom | The FAQ first. |
| bus to haram | Today's duroos, Getting around guide (2nd), Umrah guide | Getting around first. |
| fail level | Aqeedah course descriptions, sisters, Arabic learning resources, FAQ Ma'had books | An answer on repeating a level. None exists. |
| sim card | Phone alerts, Student discounts, then the SIM guide | The SIM guide first. |
| bank | Student discounts first, then SIM guide, first steps, FAQ bank account | The SIM and bank guide first. |
| umra | Umrah guide, Getting around, MAP programme, a shaykh, Omariya hotel discount | Good. |
| معهد | Study in Madinah, Library, guides, FAQ | OK. |
| الكتب | Only one result: Library "New books collection, six levels" | The Library Ma'had section and the FAQ about Ma'had books. |
| المستوى الثاني | Aqeedah course descriptions, shaykh and dars matches | The level 2 folder. |
| اجابات (answers) | "Nothing found" | Library answer keys. |
| tajeel, itithar, tajil | Ta'jeel guide and FAQ found | Good. |
| "ta jeel" (with a space), rasib | "Nothing found" | Should match ta'jeel. |
| whatsapp | MESH group page, FAQ, and at the bottom "Ma'had WhatsApp groups" in Library | Ma'had groups should be near the top for a Ma'had student. |
| holiday, exam | Calendar guide first (but that page is broken) | OK once the calendar works. |
| campus to haram, university bus | Today's duroos, Umrah, Getting around | A campus to Haram answer. None exists. |
| beginner, short lesson | Arabic institutes, Today's duroos | Beginner friendly duroos. None exist. |

Note: the search nearly always returns something even for weak matches, so it looks like it found an answer when it did not.

## 5. Mobile performance

- Home first visit on slow 3G: first paint about 4.0 s, fully loaded 12.8 s, 28 requests, 588 KB. Other pages (library, tajeel, schedule) on a fresh load: first paint 3.8 to 4.0 s, loaded about 12.8 s. Largest items: three font files (106 KB, 98 KB, 43 KB) and a 72 KB script. The page is blank for about 4 s on a bad connection.
- Repeat visits are quick (about 1 s), so it is mostly the first load.
- Normal connection: Home loaded in 0.8 s, other pages 1.0 to 2.0 s.
- Layout shift: CLS near zero on Home (0.00003), 0.017 on Library, 0 on guides. Nothing jumpy.
- Home and /duroos countdowns tick every second (hero and exam card). Distracting, and extra work on a cheap phone.
- Tap targets: bottom nav items are 78x64 (fine), the floating button is 56x56 (fine but it covers things). Chips are 36 px high ("Muqarrarat", "Ma'had", "Official links"); the country filter chips in Library are 32 px high with small Arabic text. Both are below the 44 px guideline.
- No horizontal scroll on any page tested (scrollWidth 390). Tables fit but are cramped.
- Pages are very long on a phone: home 5900 px, calendar 9300 px, ta'jeel 5900 px.

## 6. Content gaps for a Ma'had student

1. A Ma'had page: how many levels and semesters, what each level teaches, which books, with level names in English.
2. A direct link per level to books and to answer keys, and a clear statement of what the Qalam link is.
3. What happens when you fail: pass mark, absence limit, repeating the level, effect on stipend and room, dismissal, "additional chances". An English summary of the Ma'had regulations (currently an Arabic folder only).
4. Ta'jeel and i'tithaar rules for the Ma'had (the guide is Kulliyah only).
5. Ma'had exam dates, timetable help, Blackboard help (how-to videos are in Library but not mentioned elsewhere).
6. Campus to Haram: bus number, stops, times, cost, where to get off, how to come back after Isha, shuttle options, walking time.
7. Duroos for beginners: which shaykhs speak slowly, which books are easy (for example Arba'in Nawawiyyah is short and famous), which are near campus, which have translation.
8. English duroos or translation channels, if any exist.
9. Holiday plan: Umrah steps and costs for a student, cheap group trips, Quba and Uhud visits, where to stay, flights, whether to stay in the hall during the break.
10. SIM: student offers, price, which plan, how to top up. Bank: what to do if the bank card has not come after 3 weeks.
11. A list of level by level WhatsApp groups on the site (not only a Drive file).
12. A real contact person or form for Ma'had questions, not only a number that looks fake.

## 7. Useless or confusing elements (blunt)

- The giant hero on Home and Duroos: a full screen of date, countdown and arc graphic before any real content. The arc repeats what the countdown card already says and its labels overlap.
- Ticking seconds on the Fajr countdown and the exam countdown. Pure decoration.
- The "Islamic dates" card: three big boxes (Ramadan 93 days, last ten nights 113, Eid al-Fitr 122). Not useful for a student's decision today.
- Three WhatsApp prompts at once on Home (floating button, a big green card, the footer card), plus the owner help line. Choose one.
- "Study" in the bottom nav: paid Arabic courses with prices in pounds for a student who already has a scholarship.
- Checklist bars ("0 of 12 steps done") on guides that are not tasks (calendar, Umrah).
- 308 Telegram manuscript channels in Arabic on the Library page.
- Sports, Business and Kindergartens guides keep showing in search results for unrelated queries.
- External link arrows go to Google Drive, Telegram, YouTube and other sites without saying so. On a cheap phone this can open the Drive app unexpectedly.
- Home guide cards with random icons (key on Umrah).

## 8. Broken things

1. /guides/university-calendar-1448: interactive widgets not working, month cards empty, text jammed together, numbering mixed into the previous item. This page is also the only place the exam, ta'jeel and holiday windows are listed in full.
2. /duroos/updates: "No updates yet." followed by an "EARLIER" list.
3. "Masjid Quba, Masjid Quba" duplicated location on lesson pages.
4. The owner number +1 234 567 9076 looks like a placeholder, used for help and for "Send a takhlees".
5. Search returns weak or unrelated results instead of "nothing found" for many queries, and finds nothing for "ta jeel" with a space or for "اجابات".
6. The search input focus outline is oversized and clips the dialog edge.

## Summary: top problems
1. The Calendar and holidays guide is broken on phone (empty month cards, jammed text, no working filters), and it is the only full page for holiday and ta'jeel dates.
2. There is no Ma'had hub: level 2 books are in an Arabic only Drive folder, the answer key link is unclear, and nothing explains what happens if you fail a level.
3. Duroos cannot be filtered or labelled for beginners, short length, Isha or Asr, or English, and there is no campus to Haram transport answer.
4. Search ranks irrelevant guides high and hides the best FAQ at the bottom, and the Library (his main need) is hidden in More while "Study" takes a nav slot.
5. Dense jargon, a floating WhatsApp button covering content, a full screen hero, sticky checklist bars, and a first load of about 12.8 s on slow 3G.
