# Dars locations: the exact spot of every active dars (9 November 2026)

Internal research note by aiakhee (task B4). Research only: no code, seed or database change. Sources are named here because this is not public text.

## How to apply
1. Open Admin > Duroos and open the lesson (search by the slug or the book in the first column).
2. In the lesson form, the location is the pair of fields "Place (English)" and "Place (Arabic)". Paste the proposed English text into the first and the proposed Arabic text into the second. Change both languages together.
3. Save. Apply only the rows marked **confirmed** or **likely**; for **unknown** rows, keep the current text until an admin answers the questions at the end.

Notes on the table:
- 52 active lessons: 45 from `src/server/seed/legacy/lessons.ts` (the importer makes every one of them active) and 7 from `src/server/seed/content/al-midad.ts`. The local database (`MESH_LOCAL_DB=1`) is seeded from exactly these files. Production may differ if an admin has edited a lesson since.
- "Current" is the text as the site shows it. The seed stores an em dash between the area and the detail; the site turns it into a comma, so it is written with a comma here.
- Proposed text follows the existing style: area first, then a comma, then the door or seat, gate number in brackets. Arabic uses Arabic-Indic digits.
- Confidence: **confirmed** means a dated post from the shaykh's own channel, his office, or the Madinah duroos channel (t.me/drosalmadina, which relays the shaykhs' own posts and live streams) states this spot for this lesson in 1448. **likely** means the area is confirmed but the door or seat comes from an older post, a single student report, or a listing calendar. **unknown** means nothing found states the spot.
- "t.me/drosalmadina/12332" is that channel's pinned 1448 timetable, which it keeps up to date ("منشور محدث باستمرار"). All Telegram posts were read on 9 Nov 2026 through the public t.me web preview; the date given is the post date.
- The Authority's own lesson tables (prh.gov.sa, isdarat-alharamain.com, eserv.wmn.gov.sa) could not be opened from this session (network policy), so they were not used.

## Masjid an-Nabawi (20 lessons)

| # | Lesson (slug; book; shaykh; when) | Current location | Proposed locationEn | Proposed locationAr | Confidence | Sources (post date) |
|---|---|---|---|---|---|---|
| 1 | `ruh-targhib`; Sahih at-Targhib wat-Tarhib; Sulayman al-Ruhayli; Wed after Asr | Circle 2 / First Saudi Expansion, between Bab Umar and Bab Uthman | First Saudi expansion, between Bab Umar and Bab Uthman (circle 2) | التوسعة السعودية الأولى، بين باب عمر وباب عثمان (حلقة ٢) | likely | Circle 2 is confirmed for this lesson in 1448: https://t.me/drosalmadina/12332 (timetable: "في المسجد النبوي (حلقة ٢)", Wednesday after Asr) and https://t.me/drosalmadina/12581 (live from "حلقة٢", Wed 4 Nov 2026). The doors come only from https://t.me/drosalmadina/11499 (23 Jan 2026, 1447), which announces a one-off lecture on the Khawarij at "التوسعة السعودية الأولى بين باب عمر وباب عثمان، كرسي رقم (٢)"; it is the Madinah duroos channel relaying his channel, not a post about this lesson. |
| 2 | `ruh-dalil`; Dalil at-Talib; Sulayman al-Ruhayli; Thu to Sat after Asr | same as 1 | First Saudi expansion, between Bab Umar and Bab Uthman (circle 2) | التوسعة السعودية الأولى، بين باب عمر وباب عثمان (حلقة ٢) | likely | as row 1 (the timetable gives "حلقة ٢" for Thursday to Saturday); https://t.me/drosalmadina/12586 and /12590 (live from "حلقة٢", Thu 5 and Fri 6 Nov 2026) |
| 3 | `ruh-tawhid`; Kitab at-Tawhid; Sulayman al-Ruhayli; Sat after Fajr | Western side, left of those entering from Bab Quba (5) | Western expansion, near the Bab Quba entrance (gate 5) | التوسعة الغربية، قرب الداخل من باب قباء (٥) | likely | Area confirmed: https://t.me/drosalmadina/12332 (timetable: Saturday after Fajr, "في المسجد النبوي (الغربية)") and https://t.me/drosalmadina/12592 (live from "الغربية", Sat 7 Nov 2026). Gate only from one student report in `docs/research/group-chat-2026.md` ("Gate 5 straight ahead for Badr and Ruhayli"). No post says left or straight ahead. |
| 4 | `khalaf-tadmuriyyah`; At-Tadmuriyyah; Saud al-Khallaf; Wed and Thu after Maghrib | Northern Expansion, right of Bab Umar ibn al-Khattab | keep current | keep current | unknown (was likely) | https://t.me/drosalmadina/12077 (9 Jun 2026) announces a one-off lecture, "الإحسان", on Tuesday 23/12/1447 after Maghrib "في المسجد النبوي (الشمالية)". It is a different event, on a different day, in 1447; nothing places At-Tadmuriyyah in 1448. |
| 5 | `battin-fath`; Fath al-Bari; Ali Abu Battin; Tue after Asr | First Saudi Expansion, between the two Haswas | keep current | keep current | unknown (was likely) | https://t.me/drosalmadina/10822 (28 Jul 2025) is a live one-off lecture, "الوسطية في الكتاب والسنة", from "بين الحصوتين", not this lesson and before 1448. The only 1448 support is one student report in `docs/research/group-chat-2026.md` (MEDIUM: he "teaches on Shaykh Suhaymi's chair"), which does not name the area. The proposed text only tidied the wording, so nothing is lost by keeping the current text. |
| 6 | `battin-muslim`; Sahih Muslim; Ali Abu Battin; Thu after Maghrib | same as 5 | keep current | keep current | unknown (was likely) | as row 5 |
| 7 | `battin-tirmidhi`; Jami' at-Tirmidhi; Ali Abu Battin; Fri and Sat after Maghrib | same as 5 | keep current | keep current | unknown (was likely) | as row 5 |
| 8 | `tahir-adab`; Al-Adab al-Mufrad; Anis Tahir; Tue after Maghrib | Northern Expansion, right of those entering from King Fahd Gate (21) | keep current | keep current | unknown | Nothing found in 2025 or 2026. |
| 9 | `tahir-fadail`; Fada'il as-Sahabah; Anis Tahir; Thu after Maghrib | same as 8 | keep current | keep current | unknown | as row 8 |
| 10 | `shuwayir-rawd`; Ar-Rawd al-Murbi'; Abdussalam al-Suhaymi; Wed after Maghrib and Isha | Northern Expansion, right of those entering from King Fahd Gate (21) | Northern expansion | التوسعة الشمالية | likely | https://t.me/drosalmadina/7598 (16 Oct 2023) places this lesson, Wednesday after Maghrib, in "التوسعة الشمالية، يسار الداخل من باب ١٧". In 1448, https://t.me/drosalmadina/12304 (21 Aug 2026) confirms it resumed in the Masjid an-Nabawi (no area), and https://t.me/drosalmadina/12583 (Wed 4 Nov 2026) is a live one-off lecture on handling doubts from "الشمالية" in the same Wednesday Maghrib slot, not the Rawd itself. The door conflicts: gate 17 (2023), "outside gate 20" (one student), King Fahd Gate 21 (our seed). Area only until an admin confirms the door. |
| 11 | `shuwayir-wasitiyyah`; Al-Aqidah al-Wasitiyyah; Abdussalam al-Suhaymi; Sat after Maghrib | same as 10 | keep current | keep current | unknown (was likely) | https://t.me/drosalmadina/12304 confirms the Saturday lesson resumed in the Masjid an-Nabawi in 1448 but names no area. The 2023 post in row 10 lists only Ar-Rawd and Hilyat Talib al-Ilm, and the 4 Nov lecture was on a Wednesday. Nothing places this lesson. |
| 12 | `suhaymi-mutaqad`; Al-Mu'taqad as-Sahih; Salih al-Suhaymi; Sun and Mon after Maghrib | Al-Masjid an-Nabawi, between the two Haswas (Circle 1) | First Saudi expansion, between the two Haswas (circle 1) | التوسعة السعودية الأولى، بين الحصوتين (حلقة ١) | confirmed | https://t.me/drosalmadina/12597 (live of this lesson from "حلقة ١", Sun 8 Nov 2026). The area is from 1448 posts on Al-Da' wad-Dawa', the book he also taught in the same Sunday and Monday Maghrib slot this year: https://t.me/drosalmadina/12393 (13 Sep 2026, relayed from his office's channel: "التوسعة السعودية الأولى بين الحصوتين") and https://t.me/drosalmadina/12332 (timetable: that lesson at "حلقة ١"). Optional extra detail, likely: "left of those entering from Bab Bilal (gate 36)" / "يسار الداخل من باب بلال (٣٦)", stated in https://t.me/drosalmadina/10676 (16 Jun 2025, 1446). |
| 13 | `shamani-tafsir`; Tafsir as-Sa'di; Abdullatif al-Shamani; Tue to Thu after Maghrib | Second Haswa, in front of Bab Uthman | First Saudi expansion, second Haswa, facing Bab Uthman | التوسعة السعودية الأولى، الحصوة الثانية أمام باب عثمان | confirmed | https://t.me/SheikhAbdulLateefShamani/3843 (4 Oct 2026, his channel: "في المكان المعتاد: التوسعة السعودية الأولى للمسجد النبوي، أمام باب عثمان"); /3900 and /3903 (live of Tafsir as-Sa'di from the same spot, Tue 3 and Wed 4 Nov 2026); https://t.me/drosalmadina/12332 (timetable: "الحصوة الثانية") |
| 14 | `hudhayfi-nayl`; Nayl al-Awtar; Ali al-Hudhayfi; Mon after Maghrib | First Saudi Expansion, between the two Haswas | keep current | keep current | unknown | Nothing found in 2025 or 2026. |
| 15 | `tuwaijri-kathir`; Tafsir Ibn Kathir; Ali al-Tuwaijri; Wed and Thu after Maghrib | Second Haswa, in front of Bab Umar | First Saudi expansion, second Haswa, facing Bab Umar (chair 34) | التوسعة السعودية الأولى، الحصوة الثانية أمام باب عمر (كرسي ٣٤) | likely | Area confirmed: https://t.me/drosalmadina/12332 (timetable: "الحصوة الثانية"). Chair 34: https://t.me/drosalmadina/12503 (live from "كرسي ٣٤", Wed 14 Oct 2026) and https://t.me/drosalmadina/10902 (24 Aug 2025: "الكرسي رقم (٣٤) مقابل باب عمر"). Caveats: https://t.me/drosalmadina/11422 (6 Jan 2026) says chair 24 in the second Haswa facing Bab Umar, and on Thu 22 Oct 2026 the shaykh moved that day's tafsir to chair 14 (https://t.me/twijri/5646). |
| 16 | `tuwaijri-bulugh`; Bulugh al-Maram; Ali al-Tuwaijri; Wed and Thu after Isha | Western Expansion, right of those entering from Bab Quba (5) | Western expansion, right of those entering from Bab Quba (gate 5), chair 14 | التوسعة الغربية، يمين الداخل من باب قباء (٥)، كرسي ١٤ | confirmed | https://t.me/twijri/5646 (22 Oct 2026, his channel: "درس بلوغ المرام الذي بعد العشاء الكرسي رقم (14) على يمين الداخل من باب قباء"); https://t.me/drosalmadina/12332 (timetable: "الغربية"); https://t.me/drosalmadina/11481 (19 Jan 2026: "التوسعة الغربية يمين الداخل من باب قباء"). An older post, https://t.me/drosalmadina/11422 (6 Jan 2026), put the Isha lesson facing Bab al-Hijrah; the later posts supersede it. |
| 17 | `qasim-sequence`; Zad al-Mustaqni' and others; Abdulmuhsin al-Qasim; Sun to Thu after Isha | Eastern Expansion, in front of those entering from Gate (37) | Eastern expansion | التوسعة الشرقية | confirmed | https://t.me/FawaidAlQasim/12732 (7 Nov 2026, his channel: new book from Sunday after Isha "في التوسعة الشرقية بالمسجد النبوي", while continuing Zad al-Mustaqni', Bulugh al-Maram and Mukhtasar as-Sirah). No source names gate 37; keep the gate only if an admin confirms it. |
| 18 | `badrbadr-sequence`; Fada'il al-Qur'an; Badr al-Badr; Sat to Mon after Maghrib | Second Haswa, in front of Bab Uthman | keep current | keep current | unknown | Nothing found. Web results only show "Badr ibn Nasir al-Badr", not "Badr ibn Muqbil" (see questions). |
| 19 | `abadr-tafsir`; Tafsir as-Sa'di; Abdurrazzaq al-Badr; Sun to Fri after Fajr | Al-Masjid an-Nabawi, Western side (seed) | Western expansion, facing the Bab Quba entrance (gate 5) | التوسعة الغربية، أمام الداخل من باب قباء (٥) | likely (was confirmed) | Area confirmed: https://t.me/drosalmadina/12332 (timetable: "الغربية", daily except Saturday) and https://t.me/drosalmadina/12589 (live from "الغربية", Fri 6 Nov 2026). The door comes from a listing calendar and older or student sources: the Al-Midad calendar (read 8 Nov 2026, `docs/research/al-midad-import.md`); https://t.me/drosalmadina/8954 (22 Jun 2024, a one-off lecture after Fajr at "الغربية أمام الداخل من باب قباء (٥)"); one student in `group-chat-2026.md` ("Gate 5: walk straight to his chair"). No 1448 post from his channel or the duroos channel gives the gate. `npm run content:sync` already writes this text, so production may show it already. |
| 20 | `abadr-tawhid`; Kitab at-Tawhid (taqrirat of Shaykh Muhammad ibn Ibrahim); Abdurrazzaq al-Badr; Sun to Thu after Maghrib | same as 19 | Western expansion, facing the Bab Quba entrance (gate 5) | التوسعة الغربية، أمام الداخل من باب قباء (٥) | likely (was confirmed) | Area confirmed: https://t.me/drosalmadina/12596 (live of this lesson from "الغربية", Sun 8 Nov 2026) and https://t.me/drosalmadina/12332 (the Maghrib lesson before it, "الغربية"). Door as row 19 (Al-Midad calendar, a 2024 Fajr lecture and one student). |

## Masjid Quba (19 lessons, all "Masjid Quba" / "مسجد قباء" today)

Every post found says only "مسجد قباء" for the men's duroos, so no inner spot is known. Keep the current text for all 19. Rows with a fresh post confirm at least that the lesson is still at Quba.

| # | Lesson (slug; book; shaykh; when) | Proposed | Confidence (inner spot) | Sources (post date) |
|---|---|---|---|---|
| 21 | `quba-husaini-tafsir`; Tafsir as-Sa'di; Mis'ad al-Husaini; Sat after Fajr | keep current | unknown | live from Quba, https://t.me/drosalmadina/12591 (7 Nov 2026) |
| 22 | `quba-ruh-jawami`; Jawami' al-Akhbar; Ibrahim al-Ruhayli; Sat after Dhuhr | keep current | unknown | not rechecked |
| 23 | `quba-khuja-arbaun`; Al-Arba'in an-Nawawiyyah; Mu'adh Khujah; Sat after Asr | keep current | unknown | not rechecked (Al-Midad lists different days, see `al-midad-import.md`) |
| 24 | `quba-battin-bulugh`; Bulugh al-Maram and Al-Muharrar; Ali Abu Battin; Sun after Asr | keep current | unknown | not rechecked |
| 25 | `quba-ghamidi-aqidah`; Lessons in Aqeedah; Ahmad al-Ghamidi; Sun after Maghrib | keep current | unknown | not rechecked |
| 26 | `quba-shamani-ayat`; Ayat al-Ahkam; Abdullatif al-Shamani; first Sunday monthly | keep current | unknown | not rechecked |
| 27 | `quba-omar-adab`; Adab al-Mashy and Fadl al-Islam; Umar al-Husaini; Sun after Isha | keep current | unknown | not rechecked |
| 28 | `quba-hujayli-sullam`; Sullam al-Wusul; Muhammad al-Hujayli; Mon after Asr | keep current | unknown | https://t.me/drosalmadina/12469 (6 Oct 2026, his Quba duroos resume 8/5/1448) |
| 29 | `quba-hujayli-lulu`; Al-Lu'lu' wal-Marjan; Muhammad al-Hujayli; Mon after Maghrib | keep current | unknown | as row 28 |
| 30 | `quba-tuwaijri-ilm`; Kitab al-'Ilm of al-Bukhari; Husayn al-Tuwaijri; Mon after Isha | keep current | unknown | not rechecked |
| 31 | `quba-ruh-kabair`; Al-Kaba'ir; Sulayman al-Ruhayli; Tue after Asr | keep current | unknown | live from Quba, https://t.me/drosalmadina/12577 (3 Nov 2026) |
| 32 | `quba-humaid-baqarah`; Tafsir of al-Baqarah; Muhammad al-Humaid; Tue after Maghrib | keep current | unknown | not rechecked |
| 33 | `quba-luhaydan-zad`; Zad al-Ma'ad; Abdullah al-Luhaydan; Wed after Asr | keep current | unknown | not rechecked |
| 34 | `quba-ruh-wasiyyah`; Al-Wasiyyah as-Sughra; Abdullah al-Ruhayli; Wed after Isha | keep current | unknown | not rechecked |
| 35 | `quba-maher-sirah`; Lessons from the Seerah; Mahir Khujah; first Thursday monthly | keep current | unknown | not rechecked |
| 36 | `quba-ghamidi-aqidah2`; Lessons in Aqeedah; Ahmad al-Ghamidi; second Thursday monthly | keep current | unknown | not rechecked |
| 37 | `quba-sarhan-ashrat`; Ashrat as-Sa'ah; Haytham Sarhan; Fri after Asr | keep current | unknown | not rechecked |
| 38 | `quba-suhaymi-arjuzah`; Al-Arjuzah al-Mi'iyyah; Arif al-Suhaymi; Fri after Maghrib | keep current | unknown | not rechecked |
| 39 | `quba-sufi-hamawiyyah`; Al-Fatwa al-Hamawiyyah; Abdulqadir Sufi; Fri after Isha | keep current | unknown | not rechecked |

## Other masjids (6 lessons from the legacy seed)

For a neighbourhood masjid the venue itself is the location, so the check is whether the venue text is still right.

| # | Lesson (slug; book; shaykh; when) | Current location | Proposed | Confidence | Sources (post date) |
|---|---|---|---|---|---|
| 40 | `uni-maher-sequence`; Fadl al-Islam; Mahir Khujah; Mon after Isha | Masjid Muhammad ibn Ibrahim, at the Islamic University | keep current | confirmed | https://t.me/drosalmadina/12391 (12 Sep 2026: his lessons from Monday 4/4/1448 after Isha "في جامع الشيخ محمد بن إبراهيم (بالجامعة الإسلامية)"). The post names the venue, day and prayer but not the book. |
| 41 | `uni-saadi-kafi`; Al-Kafi; Abdullah al-Sa'adi; Tue after Maghrib | same as 40 | keep current | unknown (was likely) | Nothing found on this lesson. https://t.me/drosalmadina/12305 (22 Aug 2026) is a one-day course of his on Raf' al-Malam at Jami' al-Balawi; it says nothing about Al-Kafi or the University masjid. |
| 42 | `balawi-saidi-tahrir`; Mukhtasar at-Tahrir; Yusuf al-Sa'idi; Sun evening | Jami' Hammad al-Balawi, al-Faisaliyah District | keep current | unknown (was likely) | Nothing found on this series. https://t.me/drosalmadina/12305 only shows the masjid hosting another shaykh's course in 2026. |
| 43 | `balawi-ghalib-ubudiyyah`; Al-'Ubudiyyah; Ghalib al-Sa'idi; Sat | same as 42 | keep current | unknown (was likely) | as row 42 |
| 44 | `hijrah-qahtani-tawhid`; Kitab at-Tawhid; Maher al-Qahtani; monthly | Masjid Dar al-Hijrah, al-Faisaliyah | keep current | confirmed (was likely) | https://t.me/drosalmadina/12389 (12 Sep 2026) announces this very series: his monthly "شرح كتاب التوحيد", Saturday 1/4/1448 after Maghrib, "في مسجد دار الهجرة (الفيصلية)". The earlier note wrongly said the series was not rechecked. |
| 45 | `hijrah-tariq-fath`; Fath al-Wahid as-Samad; Tariq al-Qahtani; Wed evening | same as 44 | keep current | confirmed | https://t.me/drosalmadina/12534 (live of this book "من مسجد دار الهجرة", Wed 21 Oct 2026) |

## Al-Midad duroos (7 lessons from `al-midad.ts`)

| # | Lesson (slug; book; teacher; when) | Current location | Proposed | Confidence | Sources (post date) |
|---|---|---|---|---|---|
| 46 | `yahyawi-waqafat`; Reflections from Tafsir as-Sa'di; Eid al-Yahyawi; Tue after Isha | Jami' Jabir ibn Umayr, al-Barakah district | keep current | likely | Al-Midad calendar only (read 8 Nov 2026, week of 8 to 14 Nov); no Telegram post found |
| 47 | `rifai-manhaj`; Manhaj as-Salikin; Abdulilah al-Rifa'i; Wed after Maghrib | Jami' Mus'ad Mubayrik al-Radadi | keep current | likely | Al-Midad calendar only (read 8 Nov 2026, week of 8 to 14 Nov); no Telegram post found |
| 48 | `sisters-talhi-ighathah`; Ighathat al-Lahfan; Barakah al-Talhi; Sun after Maghrib | Masjid Quba, upper floor (women's section) | keep current | likely | Al-Midad calendar (8 Nov 2026) places this lesson at Quba, upper floor. https://t.me/drosalmadina/12211 (16 Jul 2026) puts another course of hers, the Seerah on Friday, Sunday and Wednesday after Maghrib, "في مسجد قباء (الدور العلوي)"; it does not name this book. |
| 49 | `sisters-umari-arbain`; Sharh al-Arba'in (Ibn Uthaymin); Munirah al-Umari; Mon after Maghrib | Jami' Ahmad ibn Hanbal (al-Hizam), women's section | keep current | confirmed | https://t.me/drosalmadina/12547 (26 Oct 2026, "للنساء": this book, Mondays after Maghrib from 15/5/1448, "في جامع أحمد بن حنبل (الحزام)") |
| 50 | `sisters-radadi-tawhid`; Kitab at-Tawhid; Badriyyah al-Radadi; Tue after Maghrib | same as 48 | keep current | likely | Al-Midad calendar (8 Nov 2026); https://t.me/drosalmadina/12183 (6 Jul 2026: her Tuesday Maghrib lesson is "في مسجد قباء (الدور العلوي)", but the book there is Kitab al-Libas from Riyad as-Salihin) |
| 51 | `sisters-umari-kabair`; Kitab al-Kaba'ir; Munirah al-Umari; Thu after Maghrib | same as 48 | keep current | likely | Al-Midad calendar only (8 Nov 2026); every women's lesson at Quba found in 1448 is announced for the upper floor (rows 48, 50, 52) |
| 52 | `sisters-muzayni-mujadilah`; Tafsir of Juz' al-Mujadilah; Jamilah al-Muzayni; Fri after Maghrib | same as 48 | keep current | confirmed | https://t.me/drosalmadina/12354 (3 Sep 2026, "للنساء": this book, Fridays after Maghrib from 22/3/1448, "في مسجد قباء (الدور العلوي)") |

## Totals
- 52 active lessons.
- **Confirmed: 9** (rows 12, 13, 16, 17, 40, 44, 45, 49, 52).
- **Likely: 12** (rows 1, 2, 3, 10, 15, 19, 20, 46, 47, 48, 50, 51).
- **Unknown: 31** (rows 4, 5, 6, 7, 8, 9, 11, 14, 18, 41, 42, 43 and the 19 Quba rows 21 to 39).
- Text changes to apply: 11 rows (1, 2, 3, 10, 12, 13, 15, 16, 17, 19, 20); 19 and 20 only if production still shows the old seed text. Rows 1 and 2 only tidy the wording; the place is the same.

## Fact check (9 November 2026)
Every source cited for a confirmed or likely row was reopened on 9 Nov 2026 through the t.me web preview and read in full. Ratings were then held to the definitions above: confirmed needs a 1448 post that states the spot for this lesson; a door or seat taken from an older post, a one-off lecture, a single student or a listing calendar is likely at best.
- Rows 1 and 2, confirmed to likely: circle 2 is confirmed for 1448, but the doors (between Bab Umar and Bab Uthman) come from a January 2026 lecture post, not from a post on these lessons. The note also wrongly called that post the shaykh's own channel.
- Row 4, likely to unknown: the only source is a one-off lecture on a Tuesday in 1447, not At-Tadmuriyyah.
- Rows 5, 6 and 7, likely to unknown: the only post is a 2025 lecture; the 1448 support is one student report that does not name the area.
- Row 11, likely to unknown: no source names the area for the Saturday Wasitiyyah lesson.
- Rows 19 and 20, confirmed to likely: the area is confirmed, but gate 5 comes from the Al-Midad calendar, a 2024 lecture and one student, which is the definition of likely.
- Rows 41, 42 and 43, likely to unknown: the cited post is about another course and only shows the venue is in use.
- Row 44, likely to confirmed: the cited post announces this very series at this venue in 1448.
- Rows 10 and 12 keep their rating, with corrected notes: the 4 Nov 2026 post for row 10 is a one-off lecture in the same slot, and the area for row 12 comes from 1448 posts on the other book he taught in the same slot.
- All other confirmed and likely rows were supported as written. Dates, weekdays and quotes were checked against each post; no en or em dashes are in this note.

## Questions for admins
Ask the shaykh's office or a student who attends, and reply with the door or gate number and the side (right or left of those entering).

1. **Anis Tahir** (rows 8, 9): are Al-Adab al-Mufrad (Tuesday) and Fada'il as-Sahabah (Thursday) still taught after Maghrib, and is the seat still in the Northern expansion, right of those entering from King Fahd Gate (21)?
2. **Ali al-Hudhayfi** (row 14): is Nayl al-Awtar still on Mondays after Maghrib, and where does he sit?
3. **Badr al-Badr** (row 18): is the teacher's full name Badr ibn Muqbil al-Badr or Badr ibn Nasir al-Badr? Is Fada'il al-Qur'an (Saturday to Monday after Maghrib) still running, and is the seat still in the second Haswa facing Bab Uthman?
4. **Masjid Quba, men's duroos** (rows 21 to 39): where inside Quba are they held (main prayer hall, which side, near which door)? One answer may cover all of them if they share a chair. Also see the day conflict already open in `al-midad-import.md`.
5. **Abdussalam al-Suhaymi** (rows 10, 11): is the Saturday Wasitiyyah in the same place as the Wednesday Rawd? Which door in the Northern expansion: King Fahd Gate 21 (our seed), gate 17 (posts from 2022 to 2024), or near gate 20 (a student)? Right or left of those entering?
6. **Sulayman al-Ruhayli, Kitab at-Tawhid on Saturday after Fajr** (row 3): is it on Shaykh Abdurrazzaq al-Badr's chair facing the Bab Quba entrance (gate 5), or to the left of it as our seed says?
7. **Ali al-Tuwaijri, Tafsir Ibn Kathir** (row 15): since 22 Oct 2026, is the tafsir back on chair 34 facing Bab Umar, or does it now stay on chair 14 with Bulugh al-Maram?
8. **Abdulmuhsin al-Qasim** (row 17): which gate of the Eastern expansion is nearest his chair? Our seed says gate 37; no source found says so.
9. **Ali Abu Battin** (rows 5 to 7): is the seat between the two Haswas the one called circle 1 (Shaykh Salih al-Suhaymi's chair)? If so, add "(circle 1)" / "(حلقة ١)".
10. **Saud al-Khallaf** (row 4): is At-Tadmuriyyah still on Wednesday and Thursday after Maghrib, right of Bab Umar ibn al-Khattab in the Northern expansion?
11. **Other masjids** (rows 41 to 43): is Shaykh Abdullah al-Sa'adi's Al-Kafi still on Tuesdays after Maghrib at Jami' ash-Shaykh Muhammad ibn Ibrahim, and are Mukhtasar at-Tahrir (Yusuf al-Sa'idi) and Al-'Ubudiyyah (Ghalib al-Sa'idi) still taught at Jami' al-Balawi?

## Seen while researching (not location, for the owner)
- `qasim-sequence`: the books listed are out of date. His channel lists Zad al-Mustaqni', Bulugh al-Maram and Mukhtasar Sirat ar-Rasul, and from Sunday 28/5/1448 (8 Nov 2026) Al-Adhkar wal-Adab (https://t.me/FawaidAlQasim/12732).
- `tuwaijri-kathir`: the note "Latest covered: Al-Humazah and Al-Asr" is behind; on 6 Nov 2026 he reached Surat al-Ikhlas (https://t.me/twijri/5684).
- `sisters-radadi-tawhid`: the Tuesday lesson posted in July 2026 is Kitab al-Libas from Riyad as-Salihin, not Kitab at-Tawhid (row 50).
