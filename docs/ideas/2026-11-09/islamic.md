# Ideas from Islamic, masjid and Islamic-learning sites and apps

Studied (search snippets, store listings, product update pages and what I know of each): the Haramain authority's digital suite (alharamain.gov.sa, wmn.gov.sa e-services, the colour coded prayer area map, the 2026 interactive Haram map, the official "SmartAssistant" style mosque app with daily and weekly lessons), Nusuk (Rawdah permits, QR, crowd levels by zone), Eatmarna, the Quran and Mutun circles administration (qm.edu.sa, reg.qm.edu.sa), Islamic University of Madinah app and portal (digital ID, meal booking, schedule, clinic, Tawasul), IslamicFinder (Hijri converter, printable calendar, embeddable widgets), Muslim Pro (Ramadan companion, iftar countdown, fasting tracker, night prayer alarm), Pillars (ad free, on device calculation, no account, widgets, Live Activities, tracker), Athan, Athan+ by Masjidal (masjid finder with iqamah times), Athan Utility (big type, one page, VoiceOver), MAWAQIT (iqamah set by each masjid, Jumu'ah slots, imam messages, TV screen app, Ramadan and Eid schedules), Quran.com (Study Mode, ayah notes, collections, pinned verses, reading calendar, gentle streak reminders, Read in Context, Quran in a Year), Sunnah.com (stable references, grade field, Arabic and English search, open data), Tarteel (goals, streaks, heatmaps, mistake history, Test Mode), Bayyinah TV (learning paths, My Learning dashboard, audio or video toggle, resume), Yaqeen (free, papers plus media), SeekersGuidance (free catalog, streams, levels, quizzes, progress block), AlMaghrib (intensive seminars, local chapters, exam credits), East London Mosque (events and courses listing, new Muslim classes, sisters' Maryam Centre), Telegram and WhatsApp lesson channels, the public "nabawi-duroos" aggregator project.

Format: **Idea.** Why. How for MESH. `[type | effort | impact | inspired by]`

All ideas respect the house rules (no ads, impartial, no rulings, light theme, EN and AR, help points to Admin on WhatsApp).

---

## 1. Duroos listings and discovery

1. **"Right now and next" strip on the duroos page.** The official mosque app and MAWAQIT both lead with what is happening now, not a full grid. Pin a top card: "In progress: 2 lessons" and "Next after Asr: 4 lessons", each with location and a countdown, before the weekly table. `[UX | S | high | Haramain mosque app, MAWAQIT]`
2. **Filter chips that combine.** Big masjid listings (East London Mosque events and courses) and SeekersGuidance streams let people narrow fast. Chips for prayer slot (after Fajr, after Asr, after Maghrib, after Isha), subject (Aqeedah, Fiqh, Hadith, Tafsir, Arabic, Seerah), language of instruction, level (beginner, intermediate, advanced), place (Nabawi, Quba, other), sisters' access and livestreamed. State lives in the URL so filtered views can be shared on WhatsApp. `[UX | M | high | East London Mosque, SeekersGuidance]`
3. **"Suitable for me" quick profile.** SeekersGuidance and Bayyinah route newcomers to a starting point. A three question picker (Arabic level: none, Ma'had, Kulliyah; brother or sister; time of day free) saves to the device and pre-sets the filters. No account. `[UX | S | medium | Bayyinah TV, SeekersGuidance]`
4. **Lesson language and Arabic difficulty badge.** The Haramain authority runs halaqat in 16 languages; English speakers need to know whether a dars is in fusha a Ma'had level 2 student can follow. Add a "Arabic level to follow" badge (easy, medium, advanced) and a language field to each lesson. `[content | S | high | Haramain authority, Quran and Mutun circles]`
5. **Location inside the Haram, not just the masjid.** The 2026 interactive Haram map and Nusuk zone levels show the Haram is many places. Store a gate number and area ("near Gate 21, inside, rear of the old masjid") for every dars, with a small schematic. `[content | M | high | alharamain.gov.sa map, Nusuk]`
6. **"Open in Haram map" deep link.** The official map opens from a QR without installing anything. From each lesson page link to the official interactive map (or Google Maps pin for masaajid outside the Haram), plus "nearest gate" text. `[feature | S | medium | alharamain.gov.sa]`
7. **Seasonal schedule switch.** Haramain lessons pause or move online in Ramadan, and some shuyukh stop in summer and the Hajj season. Each lesson gets a season status (running, paused for Ramadan, paused for summer, online only) and the page shows a banner when the whole schedule is in a seasonal mode. `[function | M | high | Quran and Mutun circles, MAWAQIT Ramadan schedules]`
8. **"New this week" and "Ended" ribbons.** Telegram channels announce new duroos and completions in a stream that is easy to miss. Mark lessons added or finished in the last 14 days, and keep finished books visible in a "completed series" archive. `[UX | S | medium | Telegram lesson channels]`
9. **Week at a glance by prayer, printable.** IslamicFinder prints its calendar; families and older readers still print. A print stylesheet that renders the week as a one page A4 grid (prayer slots by day) in English or Arabic. `[accessibility | S | medium | IslamicFinder]`
10. **Embeddable today widget.** IslamicFinder offers widgets other sites embed. A small iframe or image "Today's duroos at the Haram" that student groups and other community sites can embed, linking back to MESH. Plain, no tracking, MESH branded lattice footer. `[SEO | M | medium | IslamicFinder widgets]`
11. **Quran and Mutun circles directory page.** The Haram's formal circles (hifz, revision, ijazah track, tajweed correction, mutun levels for men, women and children, Sunday to Thursday shifts) are a different thing from open duroos. A page explaining each circle type, who it suits, the registration window in Hijri dates and how to apply, written in MESH's voice. `[content | M | high | qm.edu.sa, reg.qm.edu.sa]`
12. **Registration window countdowns.** The circles registration opens for a fixed Hijri window (for example 20 Muharram to 16 Safar). Add these windows to the University calendar component with "opens in 12 days" and "closes in 3 days" states and a push alert. `[feature | S | high | qm.edu.sa, IU portal]`
13. **Intensive courses (dawrat) as a separate list.** AlMaghrib weekend seminars and summer dawrat in Madinah are short, dense events, unlike weekly duroos. A "Dawrat and intensives" list with start and end dates, daily timings and the book covered. `[feature | M | medium | AlMaghrib, Haram summer dawrat]`

## 2. Reminders, notifications and calendar

14. **Per lesson "remind me" with lead time by prayer.** Pillars and MAWAQIT let each prayer have its own alert. Let users choose "at adhan", "15 min before", or "after the iqamah" per followed lesson, stored with the push subscription. `[feature | M | high | Pillars, MAWAQIT]`
15. **Follow a shaykh, a book, or a place.** Telegram users subscribe to a channel per shaykh. Push topics for each shaykh, each book series and each masjid, so a cancellation notice reaches only those who care. `[feature | M | high | Telegram channels]`
16. **Gentle, capped notifications.** Quran.com talks about "gentle reminders"; Muslim apps lose trust with noisy alerts. Cap pushes to a daily digest plus urgent changes, with a quiet window setting (for example no alerts between Isha plus 2 hours and Fajr minus 30 minutes). `[UX | S | medium | Quran.com reminders]`
17. **Morning digest card.** Muslim Pro and Pillars widgets show the day at a glance. One push after Fajr: "Today: 6 lessons, 1 cancelled, Ayyam al-Bid fast tomorrow". `[feature | S | high | Pillars widgets, Muslim Pro]`
18. **Filtered .ics feeds.** The site already has feeds; let the calendar URL carry the user's filters (only sisters' access, only English, only after Maghrib) so the phone calendar is not flooded. `[function | S | medium | IslamicFinder calendars]`
19. **Change history on a lesson.** MAWAQIT shows iqamah changes immediately; regulars want to know what moved. A small "Changes" list on each lesson page (time moved on 3 Jumada al-Akhirah, cancelled on 10 Rajab) built from the watcher's overrides. `[trust | S | medium | MAWAQIT]`
20. **Add to Home Screen nudge after the third visit.** Pillars and Athan live on the home screen. A one time, dismissible card explaining "Add MESH to your Home Screen for one tap duroos and alerts", with iPhone and Android steps, since web push on iPhone needs the installed PWA. `[UX | S | high | Pillars, Athan]`

## 3. Livestreams, recordings and notes

21. **Live now badge with audio only option.** Bayyinah TV toggles audio and video; data in Madinah is costly for many students. When a dars is live, show "Live now" and offer the audio stream link first where one exists. `[feature | S | medium | Bayyinah TV, Haramain Jumu'ah stream]`
22. **Recording archive per book.** Bayyinah's series and SeekersGuidance's on demand courses keep every session in order. Each lesson page lists past recordings by session number and the pages covered, linked to the official channel, so a student who missed a week can catch up. `[content | M | high | Bayyinah TV, SeekersGuidance]`
23. **"Where we are in the book" marker.** Students arriving mid series need the current point. A field "Last reached: Bab al-Wudu, page 84" updated by the watcher or an editor, shown on the card. `[feature | S | high | Bayyinah resume, Telegram channels]`
24. **Private lesson notes on the device.** Quran.com ayah notes, archive and PDF export. A notes box per lesson session saved in localStorage, exportable as a text or PDF file, never uploaded. `[feature | M | medium | Quran.com notes]`
25. **Books to bring.** Telegram channels post "bring the Darussalam print" or a PDF. Each lesson page shows the edition used and links to the PDF in the MESH Library when it is there. `[content | S | high | Telegram channels, Library]`
26. **Friday khutbah corner.** The authority streams and translates the Jumu'ah khutbah. A Friday card with the khateeb of the day at the Nabawi (from the weekly imam schedule), the live stream link and the official translation channel. `[content | S | medium | Haramain authority, imam schedules]`
27. **Weekly imam schedule.** Imam rota for Fajr, Maghrib, Isha and Jumu'ah at the Nabawi is posted weekly and widely searched. Show it on the prayer day arc ("Maghrib: Shaykh X") as a light extra. `[content | S | medium | Haramain imam schedule channels]`

## 4. Prayer times and the day

28. **Iqamah times, not only adhan.** MAWAQIT and Athan+ show iqamah per masjid. Add the Nabawi and Quba iqamah gaps (and Ramadan changes) so "after Maghrib" lessons get a real start time. `[function | S | high | MAWAQIT, Athan+]`
29. **Jumu'ah view.** MAWAQIT lists each Jumu'ah slot. On Fridays the day arc swaps Dhuhr for Jumu'ah with the khutbah start and the stream. `[UX | S | medium | MAWAQIT]`
30. **Forbidden times and Duha window on the arc.** Prayer apps show sunrise, ishraq and the zawal window. Shade sunrise to ishraq, zawal and the Duha window on the existing day arc, labelled factually without rulings. `[UX | S | medium | IslamicFinder, Athan]`
31. **Last third of the night.** Muslim Pro's night prayer alarm. Show the start of the last third of the night and midnight on the arc, computed from Maghrib and Fajr. `[feature | S | medium | Muslim Pro]`
32. **On device calculation and no account.** Pillars wins trust by computing times on the phone and asking for nothing. Keep prayer time maths client side for Madinah (Umm al-Qura method) and say plainly in UI copy that MESH needs no account. `[trust | S | medium | Pillars]`
33. **Qibla is not needed, but direction to the Haram gate is.** In Madinah the useful direction is "which gate is nearest me". Use geolocation on demand only (never stored) to show the nearest Nabawi gate number and walking minutes. `[feature | M | medium | Pillars Qibla, alharamain.gov.sa map]`

## 5. Hijri calendar and season modes

34. **Hijri first date everywhere.** IslamicFinder shows both calendars side by side. Every date in MESH shows Hijri and Gregorian together ("12 Jumada al-Akhirah 1448, 23 Nov 2026"), with a user toggle for which comes first. `[UX | S | high | IslamicFinder]`
35. **Islamic days in the University calendar.** Ayyam al-Bid, Mondays and Thursdays, Ashura, Arafah, the first ten of Dhul Hijjah, the six of Shawwal, shown as small markers in the existing calendar. Fact listing only, no rulings. `[content | S | medium | IslamicFinder, Muslim Pro]`
36. **Hijri date converter tool.** IslamicFinder's converter is one of its most visited pages, and students juggle Hijri deadlines from the university against Gregorian visas and flights. A small converter in Tools, Umm al-Qura based, with "days from today". `[feature | S | medium | IslamicFinder]`
37. **Ramadan mode.** Muslim Pro's Ramadan companion and iftar countdown. From 1 Ramadan the home page swaps to: suhoor end and iftar countdown, Taraweeh and Tahajjud times at the Nabawi and Quba, how many juz the imams cover per night, iftar sufra locations inside the Haram, the online duroos that replace in person ones, and the last ten nights. Light theme, gold crescent accent. `[feature | L | high | Muslim Pro, IslamicFinder Ramadan, Haramain authority]`
38. **I'tikaf guide and registration window.** The authority runs I'tikaf registration for the Nabawi in the last ten. A guide plus a countdown to the registration opening. `[content | M | high | Haramain authority]`
39. **Hajj season mode.** Madinah students face Hajj permits, the crowd wave before and after Hajj, campus closures and the Dhul Hijjah ten. From 1 Dhul Qa'dah the home page highlights the Hajj guide, Nusuk permit dates, the crowd period and Eid prayer time at the Nabawi. `[feature | M | high | Nusuk, Eatmarna]`
40. **Eid card.** MAWAQIT lets masaajid publish Eid schedules. On the night of Eid show the Eid prayer time at the Nabawi and Quba, gates opening time and takbeerat note. `[content | S | medium | MAWAQIT]`
41. **Summer break mode.** Many students travel home. In the summer break show visa exit and re-entry reminders, which duroos keep running, and the summer dawrat list. `[UX | M | medium | IU calendar]`

## 6. Quran and hadith integrations

42. **Linkify references.** Sunnah.com has stable numbered references and Quran.com stable ayah URLs. Any "Bukhari 1" or "al-Baqarah 255" in guide bodies, lesson notes or the assistant's answers becomes a link to sunnah.com or quran.com (outbound only, no copying of text). `[function | S | high | Sunnah.com, Quran.com]`
43. **Ayah and hadith hover cards with Arabic.** Quran.com Study Mode. On tap, show the Arabic and one English translation via the Quran Foundation API (and the sunnah.com API with a key), cached, with a link to read in context. `[feature | M | medium | Quran.com, Sunnah.com API]`
44. **Tafsir lessons linked to the surah.** For Tafsir duroos, show the surah and ayah range currently being taught, linked to quran.com, so students can read ahead. `[feature | S | medium | Quran.com Read in Context]`
45. **Hadith collections linked to hadith duroos.** Lessons teaching Bulugh al-Maram, Riyad as-Salihin or the Sahihayn link to the matching book page on sunnah.com and the current hadith number. `[feature | S | medium | Sunnah.com]`

## 7. Study tracking: mutun, books and the Ma'had

46. **Mutun memorisation tracker.** Tarteel goals, streaks and heatmaps, done for mutun. For common mutun (al-Usul ath-Thalathah, al-Arba'in an-Nawawiyyah, al-Ajurrumiyyah, Tuhfat al-Atfal, al-Waraqat, Bulugh al-Maram) list the lines or chapters as tick boxes on the device, with a simple progress ring and a calm weekly heatmap, no public leaderboard. `[feature | M | high | Tarteel, Quran circles mutun levels]`
47. **Revision prompts using spacing.** Tarteel Test Mode and spaced revision. A "revise today" list that resurfaces chapters ticked 1, 3, 7 and 21 days ago. Device only. `[feature | M | medium | Tarteel]`
48. **Book attendance log.** Bayyinah's My Learning dashboard counts hours and completed series. A device only log: "I attended" button on a lesson session, giving a per book attendance count and completed books shelf. `[feature | M | medium | Bayyinah TV]`
49. **Study path pages.** SeekersGuidance streams and Bayyinah learning paths. Curated, impartial paths built from duroos already on MESH: "First year at the Haram: Aqeedah track" listing lessons in a logical order with the book each uses. `[content | M | high | SeekersGuidance, Bayyinah]`
50. **Ma'had level progress and exam countdown.** IU app shows the schedule; students track which level book they are on. On the Ma'had hub let a student set their level once, then see their books, the answer keys and the next exam date first. `[UX | M | high | IU app, SeekersGuidance progress block]`
51. **Quran in a year style plans for books.** Quran.com "Quran in a Year". Reading plans for library books ("read Riyad as-Salihin in 6 months: 9 hadith a day") with a daily reminder. `[feature | M | medium | Quran.com]`
52. **Export my progress.** Quran.com exports notes as PDF; device only data feels fragile. One button to export and import all device data (ticks, notes, progress) as a file so a phone change does not lose it. `[function | S | medium | Quran.com]`

## 8. Shaykh pages

53. **Shaykh page as a hub.** YouTube and Telegram presences are scattered. Each shaykh page shows: all current lessons with times, books taught over time, live and recording links, official channel links, and where he sits in the Haram, in both languages. No ranking or "most popular". `[content | M | high | Telegram channels, Bayyinah teacher pages]`
54. **Arabic name with correct spelling and transliteration.** Older Western visitors struggle with names. Show the Arabic name, a standard transliteration and a play button with a short audio pronunciation recorded by an editor. `[accessibility | S | medium | Quran.com recitation audio]`
55. **Alphabetical and by subject index only.** Impartiality rule. The shaykh index sorts A to Z or by subject taught, never by views or follows. `[trust | S | medium | house rule]`

## 9. Haram practicals

56. **Rawdah permit guide with live slot habits.** Nusuk permits are free, tied to the passport or iqama, separate for brothers and sisters and released in batches. A clear MESH guide (free, never through a paid middleman, what to bring, screenshot the QR for offline) linking straight into Nusuk. `[content | S | high | Nusuk]`
57. **Crowd status link card.** The authority's prayer area map uses green available, yellow crowded, pink full, grey unavailable. Link to the live official status from the home page at prayer times and in Ramadan, and teach the colours. `[feature | S | high | wmn.gov.sa prayers map, alharamain.gov.sa]`
58. **Sisters' gates, hours and sections.** Sisters need different gates and Rawdah times. A sisters' Haram map page showing entrances, sections and lesson locations open to them. (HANDOFF already lists this content gap.) `[content | M | high | alharamain.gov.sa map, Nusuk women's Rawdah]`
59. **Children at the Haram.** The authority opened a children's hospitality centre. A short family page: children's centre hours, children's Quran circles, what is allowed in the Rawdah. `[content | S | medium | Haramain authority]`
60. **Lost and found and help desks.** Official service points are hard to find. A list with gate numbers of help desks, lost and found, first aid and the Education Department at Gate 22. `[content | S | medium | Haramain authority, qm guides]`

## 10. Multilingual

61. **Per section language memory.** Quran.com Study Mode lets users pick a language per resource. Let users keep the interface in English but show lesson titles and book names in Arabic script alongside, as a setting. `[UX | S | medium | Quran.com Study Mode]`
62. **Arabic learner glossary tooltips.** Western students meet many terms (ta'jeel, iqama, mukafaah, zaer). A shared glossary; first use of a term in a guide gets a dotted underline with a one line meaning, in both languages. `[accessibility | M | high | Bayyinah new Muslim path, ELM new Muslim classes]`
63. **Urdu, French or Indonesian later as read only extras.** The authority serves 8 to 16 languages. Not now, but keep content keys language neutral so another language can be added for the most read guides. `[operations | S | low | Haramain authority]`

## 11. Accessibility for older users and newcomers

64. **Large text mode.** Athan Utility is loved for "everything in big font on one page". A visible A+ control that bumps base size and spacing, remembered on the device, and a "simple today" view with only today's lessons and the five prayers. `[accessibility | S | high | Athan Utility]`
65. **Screen reader friendly times.** Athan Utility added VoiceOver work. Countdown text announced politely (aria-live off by default, announced only on demand), prayer arc with a text alternative listing all five times. `[accessibility | S | medium | Athan Utility]`
66. **Visiting parents guide.** East London Mosque runs classes for new Muslims; MESH's equivalent newcomer is a visiting parent. A one page "Your first week in Madinah" for family visitors: Rawdah permit, gates, wheelchairs at the Haram, nearest clinics list (impartial, all listed), the lessons in English. `[content | M | high | ELM newcomer pages, Haramain wheelchair service]`
67. **Wheelchair and carts information.** The Haram offers wheelchairs and electric carts. Note where to collect them and which gates have ramps and lifts. `[accessibility | S | medium | Haramain authority]`

## 12. Community that stays impartial

68. **Suggest a lesson form.** MAWAQIT lets each masjid manage its own times; Telegram channels rely on members. A short "Tell us about a lesson" form (name, shaykh, time, place, source link) that lands in the admin queue, with help text pointing to Admin on WhatsApp. `[community | S | high | MAWAQIT, Telegram]`
69. **Report a change button on each lesson.** One tap "This lesson did not happen today" or "Time changed", logged for editors, which can raise the watcher's attention for that lesson. `[community | S | high | Athan+ community, Telegram]`
70. **Study partner board for revision, no profiles.** Quran circles pair students; AlMaghrib chapters build local groups. A light listing of "looking for a revision partner for Ajurrumiyyah, brothers, after Asr" that expires in 14 days, moderated, contact via WhatsApp only. Brothers and sisters kept separate. `[community | M | medium | AlMaghrib Qabeelahs, Quran circles]`
71. **Reflections stay private by default.** QuranReflect lets notes go public; MESH should not host public religious opinions. Keep notes private; any sharing is a plain share sheet to WhatsApp. `[trust | S | medium | Quran.com, QuranReflect]`

## 13. Trust signals

72. **"Checked on" stamp on every lesson.** MAWAQIT says times update "as soon as the masjid changes them". Show "Checked 2 days ago" on lessons (the guides already have last verified dates), driven by the watcher's last confirmation. Phrase as a fact, never as doubt. `[trust | S | high | MAWAQIT]`
73. **Free, no ads, no account statement.** Pillars and Yaqeen lead with "free, no ads". A one line footer: "MESH is free, has no adverts and needs no account." `[trust | S | medium | Pillars, Yaqeen]`
74. **Official links block.** Nusuk guides warn against paid third party permit sites. Guides that touch permits, visas or registration end with an "Official services" box linking only to Nusuk, Absher, Tawakkalna, the IU portal and qm.edu.sa. `[trust | S | high | Nusuk, IU portal]`

## 14. Offline and performance

75. **Offline today and this week.** Nusuk users are told to screenshot the QR because the app fails offline; inside the Haram signal drops. Cache the week's duroos, prayer times and saved guides in the service worker with a quiet "Saved for offline" note. `[performance | M | high | Nusuk, Pillars]`
76. **Lite data mode.** Bayyinah users complain about heavy players. Do not load video embeds until tapped; show a poster and the duration. `[performance | S | medium | Bayyinah TV]`
77. **Library PDFs saved for offline reading.** SeekersGuidance on demand courses are downloadable. A "Keep on this phone" toggle for library books using the Cache API, with storage used shown. `[performance | M | medium | SeekersGuidance]`

## 15. Operations and admin

78. **Screen mode for a student house or majlis TV.** MAWAQIT for TV shows times, iqamah, adhkar and notices on a screen. A /screen route: large clock, Hijri date, next prayer, today's duroos and the latest notice, auto refreshing, landscape. Useful for student residences. `[feature | M | medium | MAWAQIT TV]`
79. **Seasonal templates in admin.** MAWAQIT admins edit Ramadan and Eid schedules in one place. Admin presets "Ramadan timetable" and "Summer pause" that bulk apply season status to selected lessons and revert later. `[operations | M | medium | MAWAQIT]`
80. **Ingest the official weekly imam and lesson posts.** The watcher already reads Telegram; extend it to the weekly imam schedule posts and the official lesson tables so editors only approve. `[operations | M | medium | Telegram, nabawi-duroos aggregator]`

---

## Ten line summary of the strongest ideas

1. Ramadan and Hajj season modes that change the home page (iftar countdown, Taraweeh and Tahajjud times, online replacements for paused duroos, I'tikaf and Nusuk windows) (Muslim Pro, Haramain authority).
2. Location inside the Haram for every dars (gate number, area, deep link to the official interactive map), plus a sisters' gates and sections page (alharamain.gov.sa, Nusuk).
3. Follow a shaykh, book or masjid with per lesson reminder lead times and a capped morning digest after Fajr (Pillars, MAWAQIT, Telegram).
4. Combinable filter chips including language of instruction and "Arabic level to follow", saved in the URL for sharing (East London Mosque, SeekersGuidance).
5. "Where we are in the book", recordings by session and the edition to bring, so students can join mid series (Bayyinah, Telegram channels).
6. Device only mutun memorisation tracker with spaced revision prompts and export (Tarteel, Quran circles).
7. Quran and Mutun circles directory with registration window countdowns in Hijri (qm.edu.sa).
8. Auto linking of Quran and hadith references to quran.com and sunnah.com, with optional Arabic hover cards (Quran.com, Sunnah.com).
9. Large text mode and a "simple today" view for older visitors and visiting parents (Athan Utility).
10. Offline caching of the week, "Checked 2 days ago" stamps on lessons, and a "Suggest a lesson / Report a change" loop into the admin queue (Nusuk, MAWAQIT).
