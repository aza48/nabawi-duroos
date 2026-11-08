# For the owner: questions and ideas

Answer these when you can; each answer lets MESH state something with authority or fix a page. Ideas for new features are added at the end as the work continues.

## Decisions the research could not settle
- **Deferral:** the University page says new students can defer up to 2 years, but students on the new electronic study visa report no deferral. Which should MESH say?
- **Housing:** the 2025 intake was told housing is not included, but later reports say unmarried students get free housing. Which is current?
- **Family residency deposit (istiqdam):** quoted as 10,000 SAR (Jan 2025) and 30,000 SAR (Nov 2025). Which is current?
- **Al-Fusha Academy (Study page):** no Arabic-for-foreigners "Al-Fusha Academy" could be found; alfusha.edu.sa is Al-Fusha Private Schools (nursery to secondary). The group chat lists an institute called "Fusha" at 1,000 to 2,400 SAR. What is its exact name and contact, and does it teach sisters?
- **Second semester start:** confirm 20 December 2026 against the official calendar image.

## Shaykh photos
- 20 of 31 shuyukh are pictured. The 11 without a verified photo are listed in docs/research/shaykh-photos.md, with any single-source photos the researchers found. Send photos or approve those.

## Questions from the wording sweep

### Guides (part 1)
- cost-of-living: the single-person budget total says 'about 2,900 to 6,100', but the rows add up to 2,900 to 6,700 (2,000 + 1,000 + 600 + 1,000 + 600 + 1,200 + 300). Which figure is correct? Also, the single-person rent row (1,000 to 2,000) is lower than the studio rent range (1,500 to 2,500). Is that intended, for example a shared room?
- childbirth-options: Dr Ghada Ramzi had two ticks, and the edit shows her as plain '(recommended)' like the others. Did the double tick mean something extra, such as 'highly recommended', that you want shown?
- sports-and-martial-arts: every contact-details link points to hijrahnow.com/madinah, a third-party site, which shows where this list came from. Keep those links, or put the contact details directly on MESH?
- university-calendar-1448: the bodyHtml looks like text copied from the rendered calendar page ('At a glanceAll dates29', 'Add to calendar' repeated, 'Nothing in this period. Try a longer range.'). Is the page drawn by a calendar component that ignores bodyHtml? If not, the body needs rebuilding.
- tajeel-and-itithaar: does the X under حذف in the portal actually delete a submitted request? The edit no longer says it does, because that was never confirmed.
- tajeel-and-itithaar: the table says 'You may need to' for handing back the dorm room and leaving Saudi under i'tithaar. Can you confirm when this applies, so it can be stated plainly?
- starting-a-business: the 'Check first' label sits on a box that lists common mistakes. Would 'Common mistakes' be a better label?

### Guides (part 2)
- sisters-studying-in-madinah: I removed the Masjid an-Nabawi Ma'had line saying a portion of Alfiyyat Ibn Malik 'may also be required' for Thanawiyyah entry, because it was marked unconfirmed in 2023. Is it required now? If so, it can go back as a plain fact.
- sisters-studying-in-madinah: the downloadable PDF was compiled by the Sisters Studying in Madinah (S.S.I.M) team, who asked for corrections to go to their WhatsApp group admins. I removed that credit from the page. Do you want to keep a short credit to them, or ask their permission to host the sheet without it?
- postgraduate-admission-1448: the official guide prints the Fiqh PhD total as 660,000; the table shows 66,000, which matches 11,000 a semester for 6 semesters. Can you confirm 66,000 with the Deanship of Graduate Studies?
- graduate-procedures: the consulate example (about 40 minutes; open Sunday to Thursday, 8:30am to 5pm; Lapor Diri) seems to describe the Indonesian Consulate General in Jeddah. Should the page name that consulate, or should the opening hours be removed because they do not apply to every consulate?
- graduate-procedures: the page publishes a private WhatsApp number (+966 56 820 2297) for a paid certificate collection and legalisation service. Do you want to keep listing it?
- sisters-studying-in-madinah: this guide says its information dates from December 2023. Is a fresh check of fees and requirements planned?

### Guides (part 3)
- Visas guide (visas-for-family-and-visitors): the page says people on a visit visa "may ... work online for clients abroad". Can MESH state this as a firm rule? If not, should the sentence be cut back to living and studying at language centres?
- SIM and bank guide (sim-internet-bank): step 2 says "activate Nafath or Absher if you can", but step 3 says you verify your identity through Nafath or Absher. Is Nafath or Absher required to open the account? If it is, "if you can" should go.
- Apartment guide (finding-an-apartment): the edit keeps the claim that unpaid bills of over 3,000 riyals are "not unusual". This generalises from a single case. Would you rather drop the figure and keep only the advice to check the meter?
- Apartment guide: should the page name specific WhatsApp/Telegram groups (Shoqaq Madinah, LM Renting in Madinah) and agencies (LiveinMadinah, Find Baity)? Naming them could read as an endorsement. They are kept for now because they tell readers where to look, not where a fact came from.

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
- Finding a flat: the anecdote's figure (previous tenant owed over 3,000 riyals) was dropped along with the anecdote. Restore it only if you want a concrete example.

### Site interface
- Shaykh profile 'facts' (seed data in src/server/seed/legacy/profiles.ts, editable in admin) are shown on shaykh pages without any wording filter. They are outside my area, so I did not check them for source or hedge wording. Should someone review them, or should the BACKSTAGE filter also be applied to them?
- Announcement titles and bodies on the Updates page and on the home page 'Latest updates' are shown exactly as stored. If the watcher or a researcher wrote source wording into one, it will appear. Should announcements be filtered too, or is the watcher now trusted to write clean text?
- The University calendar labels Islamic dates as "Islamic, expected" and the home page says "Expected dates, confirmed by moon sighting." I kept both as protective wording under rule 4. Please confirm you are happy with "expected".

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
