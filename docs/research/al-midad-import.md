# Al-Midad calendar import (8 November 2026)

Source: the owner's Al-Midad Google Calendar (Asia/Riyadh). Read the weeks of 8 to 14 November and 13 to 19 December 2026. Compared with the duroos in `src/server/seed/legacy/lessons.ts` by shaykh, book, masjid and prayer. Applied by `syncAlMidad` in `src/server/seed/content/al-midad.ts`, which runs in `npm run content:sync` and in the seed. It only inserts new rows and fills gaps, so admin edits are never overwritten.

## Added (7 duroos, 6 teachers, 3 masjids)
| Slug | Teacher | Book | Where | When | Audience |
|---|---|---|---|---|---|
| yahyawi-waqafat | Eid ibn Marzuq al-Yahyawi (new) | Reflections on verses from Tafsir as-Sa'di | Jami' Jabir ibn Umayr, al-Barakah (new) | Tuesday, Isha | all |
| rifai-manhaj | Abdulilah ibn Abdulaziz al-Rifa'i (new) | Manhaj as-Salikin (as-Sa'di) | Jami' Mus'ad Mubayrik al-Radadi (new) | Wednesday, Maghrib | all |
| sisters-talhi-ighathah | Barakah bint Mudayf al-Talhi (new) | Ighathat al-Lahfan (Ibn al-Qayyim) | Quba, upper floor | Sunday, Maghrib | women |
| sisters-umari-arbain | Dr. Munirah bint Sayyaf al-Umari (new) | Sharh al-Arba'in an-Nawawiyyah (Ibn Uthaymin) | Jami' Ahmad ibn Hanbal, al-Hizam (new) | Monday, Maghrib | women |
| sisters-radadi-tawhid | Badriyyah bint Muhammad al-Radadi (new) | Kitab at-Tawhid | Quba, upper floor | Tuesday, Maghrib | women |
| sisters-umari-kabair | Dr. Munirah bint Sayyaf al-Umari | Kitab al-Kaba'ir (adh-Dhahabi) | Quba, upper floor | Thursday, Maghrib | women |
| sisters-muzayni-mujadilah | Jamilah bint Nashi al-Muzayni (new) | Tafsir of Juz' al-Mujadilah (as-Sa'di) | Quba, upper floor | Friday, Maghrib | women |

The audience column arrives with the Sisters section (next deploy); until then these rows show like any other dars.

## Updated (existing duroos)
- **abadr-tafsir** (Abdurrazzaq al-Badr, Tafsir as-Sa'di, Nabawi, Fajr): the seed had no weekdays. Al-Midad: Sunday to Friday, Western expansion facing the Bab Quba entrance (gate 5). Applied only while the row still has no days.
- **abadr-tawhid** (same shaykh, Kitab at-Tawhid from the Taqrirat of Shaykh Muhammad ibn Ibrahim, Sunday to Thursday after Maghrib): days already match; added the exact spot (facing Bab Quba, gate 5).
- **shamani-tafsir** (Nabawi, Tuesday to Thursday after Maghrib, second Haswa facing Bab Uthman): matches, no change.

## Not imported (ambiguous, owner to confirm)
1. **Quba weekly duroos disagree with our seed.** Al-Midad has Maher Khujah's Sirah on Sunday after Asr, Mu'adh Khujah's Arba'in on Sunday after Maghrib, al-Ghamidi's Aqidah on Sunday after Isha and Monday after Asr, Abu Battin's Bulugh al-Maram on Monday after Maghrib and al-Shamani's Ayat al-Ahkam on Monday after Isha. Our seed (backed by the group-chat research) has Mu'adh on Saturday after Asr, Abu Battin on Sunday after Asr, al-Ghamidi on Sunday after Maghrib. The calendar looks shifted by about one day and one prayer, possibly from "laylat al-Ahad" (Saturday night) being read as Sunday. Nothing changed. Which is right?
2. **Iman al-Marzuq** (women, Saturdays after Maghrib, Kuwait time, on Zoom): the title says "ar-Riyad az-Zahirah" but the description says "Nuzhat al-Muttaqin". Online and not in Madinah. Not imported; should online women's duroos be listed?
3. **One-off lectures on 8 November** (not weekly, so not lessons): Salih al-Suwayh, Kashf ash-Shubuhat at Masjid al-Balawi (after Asr, Maghrib and Isha, a one-day course); Yasir al-Mutrafi, Adab al-Masajid at Jami' at-Tawbah, ad-Du'aythah (Asr); Abdullah al-Jabiri, events between Uhud and al-Khandaq at Jami' al-Birr, ar-Ranuna (Isha); Dr. Abdulaziz al-Mili, Adab al-Majalis at Jami' as-Saqqat, ad-Du'aythah (Isha); Saud ibn Siraj, Sayyid al-Istighfar at Masjid al-Izzah, ar-Rabwah (Isha). These fit the events list better; not added.
4. **End dates.** In the 13 to 19 December week only three sisters' duroos remain (al-Talhi Sunday, al-Umari Kaba'ir Thursday, al-Muzayni Friday). The al-Badr and al-Shamani Nabawi duroos, al-Radadi, al-Umari's Arba'in, al-Yahyawi and al-Rifa'i are absent that week. No end date was set because the calendar does not say why (a break or the end of the series).
5. **Book links.** Al-Midad links Shamela; MESH links turath.io editions with PDFs, so no book links were added.

## Recurring source?
Al-Midad is reviewed twice a day, so a daily read would keep MESH current. Not built: see the question in docs/HANDOFF.md.
