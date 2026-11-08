# MESH persona audit (live site, 8 November 2026, about 20:20 to 20:45 Madinah time)

Method: headless Microsoft Edge (playwright-core), GET only, no forms submitted, /admin not touched. Phone personas at 390x844 touch, parent at 1440x900. About 120 pages read as text (sitemap: 1,993 URLs, of which 1,691 are library files), plus the live search box, the ICS feeds, `/api/v1/duroos/today`, the manifest and `sw.js`. One UI button was pressed ("Alert me when his duroos change") to see what it does; notification permission was not granted, so nothing was subscribed.

All raw page dumps and screenshots are in
`C:/Users/akhmu/AppData/Local/Temp/claude/e8a567db7955d8a8/8a2f9b30-c840-4fc6-81dd-635eb4325b9b/scratchpad/personas/` (written below as `personas/`). Text dumps: `personas/p7__*.txt`, `personas/p6__*.txt`, `personas/p5__*.txt`, `personas/pages/ph__*.txt`.

"Taps" are counted from the path a first-time user would realistically take, starting from the home page (bottom bar or header counts as one tap; scrolling is not counted).

---

## Persona 1: new Kulliyah student, landed yesterday on the electronic study visa with a digital Visitor ID

| # | Task | Path | Taps | Result | Friction / what was missing |
|---|---|---|---|---|---|
| 1 | What do I do first, in order? | / > Guides > Getting started > First steps for new students (`/guides/new-student-steps`) | 3 | Success | Clear 7-step order. But it calls the card "Zaair ID" while the SIM/bank guide and the FAQ say "Visitor ID"; search for "zaer" or "hawiya" (spellings students use) returns "Nothing found". No "last verified" date on this page, unlike most others. Step 7 is a University bank card, but the SIM guide describes opening your own account by Nafath: two bank paths and no line on which one a new student needs. |
| 2 | Iqama vs Visitor ID: what is the difference, what can I not do? | Search "iqama vs", "visitor id" | 2 | Fail | No page explains it. Several pages still assume an iqama: campus-life says "Students on a study visa pay nothing for their iqama"; Ma'had-to-Kulliyah asks for "Your iqama number"; Uhud free delivery "needs her own iqama"; driving licence "You need an iqama". A Visitor ID student cannot tell which of these apply to him. |
| 3 | SIM card | Guides > SIM card, internet and a Saudi bank card | 3 | Partial | Says passport with a valid visa is enough. Missing: SIMs of Visitor ID students being cut off every 6 to 7 months (in the group research), and what to do when it happens. |
| 4 | Bank account | `/ask/bank-account-without-iqama`, SIM guide | 3 | Partial | "Yes, since September 2025". No bank names that actually accept Visitor ID students, no documents list (printed visa, national address, border number). |
| 5 | Absher and Nafath activation failing | Search "Nafath" > `/ask/absher-nafath-activation` | 3 | Success | Good: phone number 920020405 and the exact words to say. |
| 6 | Where is my timetable? | Ask > "Where do I find my class timetable?" | 3 | Partial | Names the menus in Arabic but gives no link; the exam-schedule update on the home page does give URLs (eservices.iu.edu.sa), this answer does not. |
| 7 | Where are the first duroos tonight? | / (home, scroll to "Today's duroos") | 0 to 1 | Success | Very good: grouped by prayer, adhan time, gate number, map link. Confusing: at 20:20, about 70 minutes after the Isha adhan, two after-Maghrib lessons (Suhaymi, Abdurrazzaq al-Badr) still show "LIVE NOW" and the hero says "4 live now" (see Broken). |
| 8 | Free bus to the Haram: times and stops | Search "bus" > `/ask/free-bus-to-haram` | 2 to 3 | Fail | Answer is "Yes … Ask in the MESH group for the current pick-up points and times." No stop, no times, not even "last known" times. |
| 9 | Mat'am hours | Search "mataam" > `/ask/mataam-prices`, campus-life guide | 3 | Fail | Prices only (1/2/2 SAR). No opening hours, no meal-card or booking rules, no location. |
| 10 | University clinic | Campus-life > Health | 3 | Fail | "The University clinic covers students." No location, hours, what to bring, whether it covers Visitor ID students' first weeks. |
| 11 | Contact the University | Campus-life > Contacting the University | 3 | Success | 920022042 and care@iu.edu.sa. Missing: Tawasul ("Educational visa" subject) route for Visitor ID problems, which the group says is the official channel. |

Hedging / jargon noticed: "Ask in the MESH group" used as the answer, not a supplement (bus, family visas, application questions). Mixed terms for the same office: "Maktab 22 (the Istiqbal office)" in first steps vs "Wihda 22" in the visas guide.

Top 3 that would make MESH indispensable to him:
1. One "Living on the Visitor ID" page: what it is, what works (bank, SIM, Ejar via agent), what does not yet (licence, Hajj, family), where to complain (Tawasul subject), last verified date.
2. Campus practicals with real numbers: bus stops and times, mat'am hours, clinic hours and place, gate hours.
3. A "first 7 days" checklist that links each step to the exact office, the exact URL and what to bring.

---

## Persona 2: Ma'had student, weak English

| # | Task | Path | Taps | Result | Friction / what was missing |
|---|---|---|---|---|---|
| 1 | Find the Ma'had hub | / > Guides > "Ma'had hub" chip (`/mahad`) | 2 | Partial | `/mahad` is not in the bottom bar, header, or the More page. Only reachable from a chip on /guides or an FAQ link. Not in the Arabic site at all: `/ar/mahad` returns 404. |
| 2 | Books for my level | `/mahad` > Books by level | 2 to 3 | Partial | All books are there, but titles are raw file names: "Emailing القراءة م1", "التدريبات م٥ merged", "بدون حذف النصوص الأدبية المستوى 6", invisible bidi characters around some titles. The "four-level" section lists level 5 and 6 books under Level 3 and Level 4. Screenshot `personas/shot_mahad_filenames.png`. |
| 3 | Answer keys | `/mahad` > Answer keys | 3 | Success | External links (Qalam, ejtaal) with a short line. |
| 4 | What if I fail a level? | `/mahad` > If you fail a level | 3 | Success | Clear and short (repeat once, two failed semesters ends your place). Search for "fail level" does not surface this section; search for "attendance" returns "Nothing found" although the rule is on `/mahad`. The Ma'had hub is not indexed by site search. |
| 5 | Attendance rules | as above | 3 | Success (only if he found /mahad) | 25 percent rule clearly stated. |
| 6 | Arabic duroos for beginners | Duroos > Schedule | 2 | Fail | No level tag on any dars (beginner, intermediate, advanced), no "good first dars" pointer. `/ask/duroos-english` only says "excellent listening practice". |
| 7 | Read the same answer in Arabic | عربي button on any guide or FAQ | 1 | Fail | Arabic pages show the Arabic menu and a line "تفاصيل هذه الصفحة مكتوبة بالإنجليزية حاليًا" and then the full English text. All 34 guides and 39 FAQs are English only. |
| 8 | Moving to the Kulliyah | Guides > Moving from the Ma'had to the Kulliyah | 3 | Partial | Clear, but asks for "Your iqama number" (Visitor ID students have none). |
| 9 | Join the group | Header WhatsApp | 1 | Confusing | Footer, More page and Arabic footer say "Only for English-speaking Western students" / "المجموعة خاصة بالطلاب الغربيين الناطقين بالإنجليزية فقط". A non-Western student with weak English reads this as "not for me", while every page tells him to ask in that group. |

Top 3:
1. The Ma'had hub in Arabic, linked from the Arabic menu, and in search.
2. Clean book titles (level, subject, edition) instead of file names.
3. A short "first duroos for Ma'had students" list (easy books, slow teachers, where to sit).

---

## Persona 3: brother abroad planning to apply to a markaz or institute

| # | Task | Path | Taps | Result | Friction / what was missing |
|---|---|---|---|---|---|
| 1 | Compare programmes | Header Study (`/programs`) | 1 | Partial | Good list with fees and audience filters. No side-by-side comparison (hours a day, level count, length, visa support, online option). |
| 2 | Fees | `/programs` cards | 1 | Success | Fees on every card, except As-Safwah ("Lower than most private institutes. Confirm current fees") and Dar at-Tawheed ("Ask the centre"). |
| 3 | Start dates | Programme pages | 2 | Fail for most | Only MAP shows a next intake (21 Jan to 20 Feb 2027). Taba, Ahlul Athar, Mutun al-Ijaz, Fusha: no next start date. |
| 4 | Which visa do I need for a private institute? | Programme pages, Visas guide | 3 to 4 | Partial | No programme page mentions the visa. The visas guide says on a visit visa you "may … take short courses at language centres" and degree study needs a student visa; nothing says which institutes can sponsor a student visa (probably none) or how long a tourist visa lets you stay per entry. |
| 5 | How to apply to IU | Study > IU > "How to apply" tab, and the long guide | 2 to 4 | Success | `/guides/applying-to-the-islamic-university` is very good (window dates, age, certificate age, Minhati 24h, initial vs final acceptance, agent warning). The IU programme page itself is thin (4 steps) and says "Last checked by MESH: April 2026". |
| 6 | Is MESH independent / paid by institutes? | `/programs` footer | 1 + scroll | Partial | One line at the bottom: "MESH is run by students and is not connected to any institute listed here." Not on programme pages, not on /more. MAP's page reads like an advert ("Everything around the classes is handled", 5 videos, Instagram and YouTube links), priced in GBP. |
| 7 | What does "last checked" / "Verified" mean? | Any guide | , | Fail | Nowhere explained. 47 pages say "Last verified 8 November 2026" (today), 15 say 7 November: it reads as automatic, not as a human check. "Having a baby in Madinah" says "Last verified 8 November 2026" at the top and "last checked in April 2025" in the first paragraph. Programme cards on the list show no date at all. |
| 8 | Who runs MESH / how to contact | /more > About MESH; footer | 1 | Partial | About is three sentences. Only contact is a WhatsApp number shown as "+1 234 567 9076" (wa.me/12345679076), which looks like a placeholder. `/contact` 404; `/about` and `/privacy` redirect to /more, which has no privacy text. |

Top 3:
1. A comparison table of institutes: hours, length, levels, fee, next start, online, visa needed or sponsored.
2. A plain "how MESH checks information" note, and dates shown on list cards.
3. A real, named contact route (email or verified WhatsApp).

---

## Persona 4: sister with two young children

| # | Task | Path | Taps | Result | Friction / what was missing |
|---|---|---|---|---|---|
| 1 | Sisters' duroos | Duroos > Sisters chip (`/duroos/sisters`) | 2 | Success | Five weekly duroos with place (Quba upper floor, Jami' Ahmad ibn Hanbal women's section). No dars for Saturday or Wednesday, and no note whether children are allowed. |
| 2 | Women's areas at the Haram | Guides > Visiting Masjid an-Nabawi | 3 | Fail | No women's gates, no women's sections, no women's Rawdah times beyond "separate slots", nothing on strollers or children. Search "women's section" returns childbirth guides, not the sisters' duroos. Search "stroller": nothing. |
| 3 | Listen live from home | Duroos > Live | 2 | Success | YouTube and Telegram channels, a short "for sisters" note. No schedule of what is broadcast on which channel. |
| 4 | Schools for the children | Guides > Family life > Kindergartens and schools | 3 | Success | Age, fees (about 4,000 SAR a year), times, documents. Short, no school names other than two internationals. |
| 5 | Study for herself | Guides > Where sisters can study | 3 | Partial | Detailed, but "Information from December 2023". `/programs` tags the Islamic University as "Sisters" without saying whether women can take the scholarship. |
| 6 | Childbirth | Guides > Family life | 3 | Confusing | Two overlapping guides: "Having a baby in Madinah" and "Giving birth in Madinah". They disagree: one lists the Uhud and Zahra birth-companion programme as available, the other says it was suspended in Covid and to ask. Doctor names spelled differently. Both from April 2025. Free delivery at Uhud "needs her own iqama": nothing for Visitor ID families. |
| 7 | Family visa | Guides > Visas for family members | 3 | Partial | Says family visas "go through the University and its own procedures. Ask at the student affairs office (Wihda 22) and in the MESH group". `/ask/istiqdam-deposit` gives 30,000 SAR (Nov 2025) but the group research says istiqdam is currently closed. The visas guide says Ejar needs an iqama; `/ask/rent-on-student-visa` says students on a student visa can register on Ejar via an agent: contradiction. |
| 8 | Female doctor / paediatrician | Guides > Doctors, hospitals | 3 | Fail | Hospitals list only, no paediatricians, no female GPs, no clinic hours. Obstetricians are only in the childbirth guide. |
| 9 | Ask a question | Every page: "Post it in the MESH WhatsApp chat" | 1 | Unclear | The group is described as for "English-speaking Western students"; nothing says whether sisters may join or whether there is a sisters' group. |

Top 3:
1. A sisters' Haram page: women's gates and sections, Rawdah slots for women, children and strollers, where to sit for each dars.
2. One merged, dated childbirth guide with the Visitor ID question answered.
3. A sisters' contact or group route stated plainly.

---

## Persona 5: parent abroad on a laptop (1440x900)

| # | Task | Path | Taps (clicks) | Result | Friction / what was missing |
|---|---|---|---|---|---|
| 1 | Is my son safe? | Home, More, Guides | 3+ | Fail | No page for families back home: safety, who to call in an emergency for a student, the University's care number is buried in the campus-life guide. Emergency numbers exist (doctors guide). |
| 2 | What does it cost? | Guides > What it costs to live in Madinah | 2 | Partial | Good ranges for a family. The scholarship student's budget is one note ("costs are far lower than this"); no "what a single scholarship student actually spends a month". |
| 3 | What the University provides | Guides > Student life at the IU; Ask > stipend, housing | 2 to 3 | Success | Stipend 840 SAR, housing, meals at 1 to 2 SAR, flights via Etimad, clinic. Scattered across one guide and four FAQs. |
| 4 | Term dates | Home "Coming up" > Full calendar | 1 to 2 | Success | Clear calendar with Hijri and Gregorian. Home says "20 days" to exams while the calendar says "In 21 days" for the same date. |
| 5 | Subscribe to dates | Calendar page > Add to phone calendar / Add to Google Calendar | 2 | Success | Works (ICS has 31 dated events). The home page offers only a `webcal://` link, which does nothing on most Windows laptops without a calendar app. |
| 6 | Contact someone | Footer | 1 | Weak | Only "+1 234 567 9076" on WhatsApp (looks like a placeholder). No email, no names, no response time. |
| 7 | Who is behind the site? | More > About | 1 | Weak | Three sentences, "run by students". No named editor or method. |
| 8 | Apply as a family / what if he wants to marry | Ask > married housing, istiqdam | 3 | Partial | Married students get no housing; deposit 30,000 SAR "confirm with the University". |

Desktop layout looked clean (`personas/p5__.png`). The sun-path graphic labels Maghrib as "Live now" at 20:20 (same live-status issue).

Top 3:
1. A "For parents" page: what the scholarship covers, typical month, safety, University care contact, how to reach MESH.
2. A real contact with a named role and an email.
3. One-click calendar subscribe that works on desktop (Google / Outlook links next to webcal on the home page too).

---

## Persona 6: Arabic-first visitor using /ar only

| # | Task | Path | Taps | Result | Friction / what was missing |
|---|---|---|---|---|---|
| 1 | Arabic home | `/ar` | 0 | Partial | `/ar` lands on `/ar/duroos` (today's duroos). The English home's calendar, exam countdown, Islamic dates and latest updates have no Arabic equivalent. |
| 2 | Today's duroos in Arabic | `/ar/duroos` | 0 | Success | Fully Arabic, Arabic numerals. Small issues: Latin comma in "النبوي, التوسعة الغربية"; "٢ دروس" (should be درسان). |
| 3 | A lesson's latest change | `/ar/duroos/lesson/qasim-sequence` | 2 | Contradiction | Arabic says al-Qasim starts «الأذكار والآداب» "ابتداءً من الأحد ٢٨ جمادى الأولى ١٤٤٨هـ" (today); English says "starting November 22, 2026" (12 Jumada al-Akhirah). Both are headed "[Sunday 12/6/1448]". Screenshots `personas/shot_ar_qasim_change.png`, `personas/shot_en_qasim_change.png`. |
| 4 | Guides in Arabic | Bottom bar الأدلة | 1 | Fail | Arabic chrome, English titles and bodies, with a banner "this page is in English for now". "1 دقائق" / "2 دقائق" grammar. "Start a company" guide missing from the Arabic list (15 vs 16). |
| 5 | FAQs in Arabic | المزيد > الأسئلة الشائعة | 2 | Fail | All 39 questions in English. |
| 6 | Programmes in Arabic | الدراسة في المدينة | 2 | Partial | Arabic names and filters, English descriptions and fees ("750 to 1,000 SAR a month"). |
| 7 | Ma'had hub | , | , | Fail | `/ar/mahad` 404, no link from the Arabic menu. |
| 8 | Search | Search icon in header | 1 | Partial | `/ar/search` is 404. The header search does accept Arabic (التوحيد, زاد المستقنع return correct duroos), but results are in English. |
| 9 | Language switch and memory | عربي / English buttons | 1 | Partial | Switch works on every page and keeps the same page. The "English" link on `/ar` goes to `/duroos`, not `/`. Nothing is remembered: no cookie is set; after visiting `/ar` and then opening `/`, you get English. An Arabic browser (Accept-Language ar) is not offered Arabic on `/`. |
| 10 | Join the group | انضم الآن | 1 | Excluded | Arabic footer tells Arabic readers the group is "خاصة بالطلاب الغربيين الناطقين بالإنجليزية فقط". |

Where Arabic runs out: everything beyond duroos, programme names, the More page and the menus. Guides, FAQs, Ma'had hub, calendar page, discounts descriptions and search results are English.

Top 3:
1. Arabic versions of the 10 most-read guides and FAQs (or a clear "English only" label on links before the tap).
2. `/ar` home with the calendar and updates, and a remembered language choice.
3. Arabic Ma'had hub.

---

## Persona 7: current student, uses the site every day for duroos

| # | Task | Path | Taps | Result | Friction / what was missing |
|---|---|---|---|---|---|
| 1 | What is on today | / or Duroos | 0 to 1 | Success | Excellent at a glance: adhan times, gate numbers, Fajr countdown. |
| 2 | Tonight after Isha | Duroos > Schedule > "After Isha" filter (`/duroos/schedule?prayer=isha`) | 3 | Success | Filter chips work. The chip row runs off-screen (Arabic chip at x=530 on a 390 screen); it scrolls sideways, which is not obvious. |
| 3 | Which shaykh is live right now | Home "4 live now" > #live; Duroos > Live | 1 to 2 | Misleading | At 20:20 Madinah time the API marks Suhaymi's and al-Badr's after-Maghrib lessons as "live" (stream isLive=true) although Isha was at 19:08; Badr ibn Muqbil's Maghrib lesson is "done". The /duroos/live page has a YouTube embed and a channel list, but no "who is live now" list. Abdurrazzaq al-Badr's Mixlr stream is not in the /live channel list (only on his own page). |
| 4 | Cancellations | Duroos > Updates | 2 | Partial | Feed exists, but: dates only as "[Wednesday 17/5/1448]" with no Gregorian date; unfinished placeholders "[Wednesday of the week of ~24/4/1448 AH]" and "[a day in early 5/1448 AH]"; not strictly in date order (17/5 before 18/5); the newest duroos item is 11 days old, while al-Qasim's book-change notice is only on his lesson page, not in the feed. Screenshot `personas/shot_updates_hijri.png`. |
| 5 | Add to calendar | Lesson or shaykh page > Add to my calendar | 2 to 3 | Partial | Links are `webcal://` only. Android has no webcal handler, so on most Android phones the tap does nothing. The al-Qasim ICS keeps "Zad al-Mustaqni'" on every evening through December, ignoring the announced change. |
| 6 | Follow a shaykh | Shaykh page > Alert me when his duroos change | 2 to 3 | Fail (silent) | Pressing it in a browser without notification permission produced no message, no dialog, no state change (`personas/p7_alert_click.png`). No service worker is registered on page load. iPhone users (who need the site installed first) get no hint. |
| 7 | Search by book name | Header search | 2 | Mixed | "Zad", "زاد المستقنع", "التوحيد" work well. "kitab at-tawhid" returns campus life, sport and kids guides first and no Kitab at-Tawhid dars in the top results; "tawheed" returns kindergartens first. No transliteration tolerance (Tawhid/Tawheed). |
| 8 | Shaykh's schedule is right | `/duroos/shaykh/abdurrazzaq-…` | 2 | Contradiction | Intro: both lessons "daily except Friday and Saturday". Lesson card: Tafsir as-Sa'di "Sunday to Friday". |
| 9 | Share a dars on WhatsApp | Copy the lesson URL | , | Partial | Lesson pages: good og:title and og:description, but the generic site image, no og:url, no canonical anywhere. Shaykh pages: og:image is a 670x720 photo (not 1200x630, will crop), and og:type/og:locale missing. /duroos/live and /duroos/updates use the generic site description. Updates entries have anchor links but no share button. |
| 10 | Install on home screen | , | , | Partial | Manifest is fine (standalone, shortcuts to Today and Schedule). No install hint anywhere on the site; search "install" or "home screen" finds nothing relevant. No offline support (no service worker on load). |
| 11 | Where exactly to sit | Lesson page > Location | 2 | Success | Gate numbers and "between the two Haswas (Circle 1)". Map link only goes to the masjid as a whole. |

Top 3:
1. Reliable "live now" (time-bounded, with which channel) and a one-tap "now and next" view.
2. Follow and alerts that visibly work, with feedback and an iPhone explanation; calendar links that work on Android (https/Google).
3. An updates feed that is the single place for every change, dated in Gregorian too, newest first.

---

## Consolidated: Missing information (ranked)

| # | What | Who needs it | Where it should live |
|---|---|---|---|
| 1 | Living on the Visitor ID (hawiyat zair): what it is vs an iqama, what works and what does not (bank, SIM cut-offs, Ejar, licence, Hajj, family, home internet), where to complain (Tawasul "Educational visa"), with one consistent name and search synonyms (zaer, zair, hawiya) | P1, P4, P5 | New guide in Getting started; linked from first-steps, SIM/bank, visas, childbirth, driving licence |
| 2 | Free bus stops and times, mat'am hours and rules, University clinic place and hours, gate hours | P1, P5 | Student life at the IU guide and the bus/mat'am FAQs (replace "ask in the group") |
| 3 | Arabic content for guides and FAQs, Arabic Ma'had hub, Arabic home | P2, P6 | /ar/guides, /ar/ask, /ar/mahad, /ar |
| 4 | Women at the Haram: gates, sections, Rawdah for women, children and strollers, where to sit for each dars | P4 | Masjid an-Nabawi first-visit guide or a new sisters' Haram page; linked from /duroos/sisters |
| 5 | A real contact and "who we are / how we check": named role, email, what "Verified" and "Last verified" mean | P3, P5 | /more#about, footer, a short /about page |
| 6 | For parents: what the scholarship covers, a scholarship student's real monthly spend, safety and emergency contacts | P5 | New "For families back home" page |
| 7 | Programme start dates and visa route for each private institute; a comparison table | P3 | /programs and each programme page |
| 8 | Family visas now (istiqdam status), Ejar rule made consistent | P4, P1 | Visas guide, istiqdam FAQ |
| 9 | Level tags on duroos (beginner friendly) and "first duroos" suggestions | P2, P1 | Duroos schedule and lesson pages |
| 10 | Female doctors, paediatricians, clinic hours | P4 | Doctors, hospitals guide |

## Consolidated: Friction (ranked)

| # | What | Where | Fix |
|---|---|---|---|
| 1 | "LIVE NOW" shown on after-Maghrib lessons about 70 to 80 minutes after Isha; hero says "4 live now" | /, /duroos, /ar/duroos, desktop sun-path | Cap "live" to a window after the adhan (or until the next prayer) even when the stream flag is true; say which channel is live |
| 2 | "Alert me" does nothing visible when notifications are not allowed or unsupported | Shaykh and lesson pages, /more Phone alerts | Show a message on every outcome (granted, denied, unsupported, iPhone needs install); set aria-pressed and a "Following" state |
| 3 | Same update dated differently in EN and AR; book change not in the updates feed; ICS ignores the change | `/duroos/lesson/qasim-sequence`, `/ar/...`, `/duroos/updates`, `lesson-qasim-sequence.ics` | One source for changes; show them in the feed and in the ICS; check dates in both languages |
| 4 | Calendar links are webcal:// only | Lesson, shaykh and home pages | Add "Google Calendar" and an https .ics link next to webcal, as the calendar page already does |
| 5 | Guides and FAQs are English inside the Arabic site | /ar/guides, /ar/ask, all guide pages | Translate the top items; meanwhile mark English-only links before the tap |
| 6 | Search ranking and coverage: "kitab at-tawhid" and "tawheed" return unrelated guides first; /mahad not indexed ("attendance" = nothing); no synonyms (zaer, hawiya) | /search | Weight exact title and book-name matches; index /mahad; add a synonym list |
| 7 | "Verified today" on 47 pages; "Last verified 8 Nov 2026" on top of "checked April 2025" | Most guides and FAQs, "Having a baby" | Show the date of the last human check of the content, not the build; explain what Verified means |
| 8 | Two contradictory childbirth guides | `/guides/having-a-baby-in-madinah`, `/guides/childbirth-options` | Merge into one |
| 9 | Contradictions: Ejar needs an iqama (visas guide) vs yes via agent (FAQ); Abdurrazzaq "daily except Fri and Sat" vs "Sunday to Friday"; Maktab 22 vs Wihda 22; iqama assumed for Visitor ID students | Visas guide, `/ask/rent-on-student-visa`, shaykh page, first steps, campus life | Fix the text |
| 10 | "Only for English-speaking Western students" on every footer, including Arabic | Footer, /more, /ar | Decide the audience; if the group is restricted, offer another route for everyone else |
| 11 | Updates use bracketed Hijri only and contain placeholders ("~24/4", "a day in early 5/1448") | /duroos/updates | Add Gregorian date; remove placeholders; sort by date |
| 12 | Ma'had hub hard to find | Not in nav or More; /ar/mahad 404 | Link from More and the Library, add Arabic |
| 13 | Language choice not remembered; "English" on /ar goes to /duroos | /ar | Remember choice; map /ar to / |
| 14 | Answers that are only "ask in the group" | Bus FAQ, visas guide, applying tips | Give the last known facts with a date, then point to the group |
| 15 | MAP page reads like an advert; independence note only at the bottom of /programs | /programs/map, /programs | Same tone as other entries; put the independence line on each programme page |

## Consolidated: Broken or ugly

| URL | Viewport | Issue | Screenshot |
|---|---|---|---|
| https://medinahub.org/guides/postgraduate-admission-1448 | 390x844 | Page scrolls sideways: the "On this page" box is 409px wide on a 390 screen; content shifts and touches the left edge | `personas/shot_postgrad_overflow.png` |
| https://medinahub.org/ and /duroos | 390x844 and 1440x900 | "LIVE NOW" on two Maghrib lessons at 20:20; "4 live now" | `personas/p7__.png`, `personas/p7__duroos_full.png`, `personas/p5__.png` |
| https://medinahub.org/duroos/lesson/qasim-sequence | 390x844 | Raw status token "ON," before the date | `personas/shot_en_qasim_change.png` |
| https://medinahub.org/ar/duroos/lesson/qasim-sequence | 390x844 | Date contradicts English (28/5 vs 22 Nov) | `personas/shot_ar_qasim_change.png` |
| https://medinahub.org/mahad | 390x844 | Book titles are file names ("Emailing …", "merged") | `personas/shot_mahad_filenames.png` |
| https://medinahub.org/duroos/updates | 390x844 | Placeholder dates, Hijri only | `personas/shot_updates_hijri.png` |
| https://medinahub.org/duroos/shaykh/abdulmuhsin-ibn-muhammad-al-qasim | 390x844 | "Alert me" gives no feedback | `personas/p7_alert_click.png` |
| https://medinahub.org/more | 390x844 | "Morning brief" button wraps to two lines with a small, misaligned bell icon (minor) | `personas/probe_Morning_brief.png` |
| https://medinahub.org/ar/search, https://medinahub.org/ar/mahad | any | 404 | none |
| Duroos sub-nav chips (/duroos/*) | 390x844 | Chip row extends to x=530; last chip (عربي) off-screen with no scroll cue (minor) | `personas/p7__duroos_schedule_full.png` |
| Footer contact "+1 234 567 9076" | all | Looks like a placeholder number | any page footer |

No console errors other than one 404 resource on several pages; overflow checks on about 90 other phone pages were clean.

## What would make it indispensable (across personas)

1. The Visitor ID guide, kept current with dates: the single question almost every new student has this year.
2. Duroos you can trust minute by minute: correct live status, every change in one feed and in the calendar, alerts that confirm they worked.
3. Campus practicals with numbers (bus, mat'am, clinic, gates), not "ask in the group".
4. Arabic that goes beyond the duroos: top guides, FAQs and the Ma'had hub.
5. A trust layer: who runs MESH, how it checks, a real contact, a page for parents.
6. Sisters' practical Haram information and one clean family/childbirth guide.
7. A comparison table for institutes with start dates and visa route.
