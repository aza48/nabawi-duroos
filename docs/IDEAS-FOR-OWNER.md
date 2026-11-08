# For the owner: questions and ideas

Answer these when you can; each answer lets MESH state something with authority or fix a page. The owner answered the earlier questions on 8 November 2026; what was decided and applied is in the next section, and only what is still open stays below.

## Decided and applied (8 November 2026)
- **Deferral:** MESH states what the University says (new students may defer up to two years) and adds that some students on the new electronic study visa report it was not available. FAQ "Can I defer my place at the University?".
- **Housing:** scholarship students are housed by default, inside the Jamiah or in the Rabwa halls. FAQ "Is housing included for scholarship students?".
- **Family residency deposit (istiqdam):** the latest figure (30,000 SAR, November 2025), with a note that earlier reports said 10,000 SAR (January 2025). FAQ "Can I sponsor my family, and what is the deposit?".
- **Second semester:** 20 December 2026 confirmed against the owner's calendar, and every other date in the calendar matches it too.
- **Islamic dates:** no more "expected" wording; they follow Umm al-Qura and moon sighting is assumed.
- **Latest update:** "Final exam schedules are now released, may Allah grant you success!" is in the live-fix script (`node scripts/content-fixes.cjs`).
- **No recommending anyone:** the childbirth doctors list states facts only, with no "(recommended)" tags.
- **No links to competitors:** the sports list copied from another community site is removed; its address goes to our own sports guide.
- **Dated information:** guides built on old information say so at the top (sisters' schools: December 2023; childbirth and having a baby: April 2025).
- **Sisters Studying in Madinah:** credited at the bottom of the guide, with a note to message their admins for corrections. The Alfiyyat Ibn Malik line is back as "may also be required (not confirmed)".
- **Other calls made:** cost-of-living single total now adds up (2,900 to 6,700); "Check first" on the business mistakes box is now "Common mistakes"; the consulate example no longer states Jeddah's hours; the private paid certificate service number is gone; apartment agencies are no longer named; step 2 of the bank guide says Nafath or Absher is needed; the Fiqh PhD total stays 66,000.
- **Fusha:** now called "Fusha", with a note that it is not the Al-Fusha private schools. The exact name and contact are still welcome (see below).

## Shaykh photos
- 20 of 31 shuyukh are pictured. The 11 without a verified photo are listed in docs/research/shaykh-photos.md, with any single-source photos the researchers found. Send photos or approve those.

## Questions from the wording sweep

### Guides (part 1)
- tajeel-and-itithaar: does the X under حذف in the portal actually delete a submitted request? The edit no longer says it does, because that was never confirmed.
- tajeel-and-itithaar: the table says 'You may need to' for handing back the dorm room and leaving Saudi under i'tithaar. Can you confirm when this applies, so it can be stated plainly?

### Guides (part 2)

### Guides (part 3)

### FAQs, announcements, events, shaykh facts
- abadr-tafsir (Tafsir as-Sa'di after Fajr, Prophet's Mosque, western side): which weekdays is this lesson held? The day label was a research note and is now cleared. The shaykh's fact says 'daily except Friday and Saturday', but it is unclear whether that covers the Fajr tafsir as well as the Maghrib Kitab al-Tawhid.
- hijrah-qahtani-tawhid (monthly Kitab al-Tawhid at Dar al-Hijrah): is it held on a fixed weekday or week each month (for example the first Saturday)? If so, the label can say that instead of naming the single past date 1/4/1448.
- Haytham Sarhan's fact pointing visitors to Khizanat al-'Ilm (@khizana_62) for announcements has been removed as a source mention. If you want visitors to follow that channel, should it go in as a stream link (the streams table already has tg-khizana-62) rather than as a shaykh fact?
- The facts for Abdullah al-Sa'adi and Yusuf al-Sa'idi say their lessons are filmed and published on the Khizanat al-'Ilm YouTube channel. They were kept because they tell visitors where to watch. Should they stay, or be cut down to 'filmed and published on YouTube'?
- The streams labels and the shaykh facts name Telegram channels (for example 'His Telegram channel: @sohaymi'). They were kept as follow links (an action for the reader). Please confirm this is acceptable under the 'no Telegram' rule.
- Announcements and events carry sourceUrl/sourceHandle fields pointing at Telegram posts (one announcement uses the placeholder '@admin'). Please confirm the public pages never show these fields.
- Archived announcements still hold uncertain dates: ruh-asr-cancelled says '[a day in early 5/1448 AH]' and tuwaijri-wed-cancelled says '[Wednesday of the week of ~24/4/1448 AH]'. They were left alone because they are archived. Confirm they can never be shown publicly, or say whether they should be corrected or deleted.
- Name titles do not match: the suhaymi-week-cancelled announcement calls him 'Prof. Dr. Salih ibn Sa'd al-Suhaymi', while his shaykh profile and the suhaymi-cancelled announcement say 'Dr.'. The quba-sufi-hamawiyyah-cancelled body says 'Prof. Abdulqadir bin Muhammad Ata Sufi', while its title says 'Prof. Dr. Abdulqadir ibn Ata Sufi'. Event balawi-rukabi-postponed says 'Shaykh Prof. Arif al-Rukabi' in the title and 'Prof. Dr.' in shaykhEn. Which forms are correct?

### Programmes, discounts, library
- Mutun al-Ijaz: I removed "a recommendation for university admission may be possible" because it could not be stated with authority. Does the institute definitely give a recommendation for university admission? If so it can go back in as a plain statement.
- Library page (src/content/library.ts CHANNELS): it still lists "Study in Saudi (Madi Abu Yahya)" on YouTube, "Study in Saudi on Telegram" and "Study in Saudi on X" as channels worth following. They are shown as recommendations, not as citations, so I left them. But these are also MESH's research sources. Keep them or remove them?
- As-Safwah: the contact link "Details file" points to a Google Drive folder, and the embedded video is the Study in Saudi review (titled "As-Safwah complete review (2026)"). I kept both because they give readers the levels and fees. Is the Drive folder the institute's own, or should it come off? Also, can you confirm a current monthly fee so the price line can state a figure?
- Manarat al-Ilm video titled "What students think after joining": I kept it as a video title. Rename it if you read it as attributing to students.

### Site interface
- Shaykh profile 'facts' (seed data in src/server/seed/legacy/profiles.ts, editable in admin) are shown on shaykh pages without any wording filter. They are outside my area, so I did not check them for source or hedge wording. Should someone review them, or should the BACKSTAGE filter also be applied to them?
- Announcement titles and bodies on the Updates page and on the home page 'Latest updates' are shown exactly as stored. If the watcher or a researcher wrote source wording into one, it will appear. Should announcements be filtered too, or is the watcher now trusted to write clean text?

### Added 8 November 2026 (intake desk)
- Camping trip (20 and 21 November 2026, guide sports-and-activities): the poster only has a QR code for booking. What phone number or link should readers use? Until then the guide gives no booking route. The section is due to be removed on 21 November (see docs/EXPIRING.md).
- Having a baby in Madinah: the sister's write-up was last updated on 21 April 2025. Can someone confirm the fees and visiting rules again? I left out her individual doctor recommendations (ticks next to named doctors) because MESH does not recommend individuals. Do you want a neutral list of doctors by hospital instead?
- Having a baby in Madinah: the note "Uhud hospital (closed March 20)" under the birth companion programme was unclear, so I left it out. Does it mean the programme is closed at Uhud?
- Sports guide: are adult classes at the University Sports Center open to women? The poster does not say, and girls are only listed for the children's classes.
- Dar at-Tawheed wa as-Sunnah: what are the fees, and is registration still open? The page says to ask the centre.
- Fees guide and phone guide are based on published guides dated July to September 2026. Please confirm the exit and re-entry fees on Absher when you next use it.
- MesaFind-style visitor pages (museums, markets, parks, off-roading, photography spots, guided tours, events, flights, hotels, restaurants, Quran reader) were not added: they are tourist listings with prices that cannot be checked, or already covered. Do you want a "Things to do" page for families with museum and park opening hours once someone has checked them?
- Property: the Holy City rules on foreign ownership could not be stated with authority. Do you want a short "Can I buy a home in Madinah?" guide once the current rule is confirmed? The portals Aqar, Bayut and Property Finder are worth adding to the flat guide at the next sync of that guide.
- Healthcare: one source says all visitors get free emergency care at government hospitals. The site says there is no free healthcare on a visit visa. Which is right for emergencies?
- Public WhatsApp and Telegram groups listed elsewhere (housing, mums, sports) were not copied. Do you want a neutral "Community groups" page with only groups you have checked?

### Student life research (8 November 2026), please confirm before these go on the site
- Arrival and graduation payments: a student-run site says new scholarship students get a one-off arrival payment of 1,680 SAR (two monthly stipends) and a graduation payment of 2,520 SAR (three stipends) for shipping belongings. Is this right and current?
- Free buses to the Haram: what are the pick-up points and times, and do they run every day, including Friday?
- Mat'am: where is it, and what are the opening hours for breakfast, lunch and dinner? (Prices are on the site now: 1, 2 and 2 SAR.)
- Rooms: how many students share a room in the Jamiah and in the Rabwa halls? Do newer blocks have air conditioning?
- Married students: one source says family housing can be applied for after a probation period, another says there is none. Which is right?
- University sports club: which facilities do students get (indoor hall, outdoor and covered pools, pitches, gym)? Only the 50% discount is on the site now.
- Class hours: older notes say morning classes run 7:30 am to 12:30 pm with about 22 hours a week on campus. Is that still true?
- The University's official guide PDFs (student guide 1445 AH, admission guide 1448 AH, procedural guide for educational-visa students) could not be opened from here. If you save them in the repo folder docs/research I can read them and fill gaps with official facts.
- Student care contact on the University's own page: 920022042 and care@iu.edu.sa (published on the site now).

### AI protection (8 November 2026)
- robots.txt now refuses AI training crawlers and welcomes search and assistant agents that link back; named training crawlers also get a 403; every page carries a rights-reserved header (TDMRep) and the footer states the copyright policy. This stops honest crawlers, not a determined scraper using a disguised browser. For stronger protection, turn on Bot Protection and the AI bots rule under Firewall in the Vercel dashboard (project medinahub), which only you can do.

## Still open from the first round
- **Fusha:** the exact name, contact, and whether it teaches sisters.
- **Mutun al-Ijaz:** price (550 or 400 SAR a month) and whether the institute gives a recommendation for university admission.
- **Study in Saudi channels** on the Library page: keep as channels to follow, or remove?

## Ideas, ranked by what they give students
1. **Admin editing for programmes, discounts, key dates and the library.** Fees and dates change and today need a developer. Start with discounts, then key dates, programmes, library. Needs one database migration on live first.
2. **Arabic home page and the remaining Arabic pages** (`/ar` still goes to duroos; library colleges, reader, `/mahad`, search).
3. **Compare programmes side by side** with common price units, and a sort by name or price.
4. **Filter duroos by level and language** (needs two new lesson fields).
5. **A "Start here" path for a new student** covering the first 30 days (arrive, SIM and bank, Absher and Nafath, accommodation, timetable, first duroos) as one checklist that remembers what is done.
6. **Reminders for key dates** (exam windows, ta'jeel requests) by free notification.
7. **Women's areas and gates at the Haram**, with verified facts, for sisters and families.
8. **A page in the admin listing every fact older than six months**, each with a one-tap "still correct" button.
