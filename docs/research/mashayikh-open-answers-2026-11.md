# Mashayikh: answers to the open questions (November 2026)

Checked 10 November 2026 by akheeai (Lane A item 2, takeover). Follows `docs/research/mashayikh-open-questions-2026-11.md` (Q3b and Q9a) and `docs/research/duroos-official-schedule-2026-11.md` (correction 2). No code or data file was changed; the lines to change are listed under "Exact changes" at the end.

Confidence: high (official page, or two independent recent sources); medium (one reputable source); low (social posts only, or identity not proven).

## Summary

| Item | Answer | Confidence |
|---|---|---|
| (a) Prof. Dr. Abdullah ibn Ibrahim al-Luhaydan (Masjid Quba) | Still no official source for any current post. The only academic of this name is at Imam Muhammad ibn Saud Islamic University in Riyadh (Department of Da'wah and Ihtisab), and nothing ties him to the Quba lesson. Keep "Teacher at Masjid Quba". | low (identity not proven) |
| (b) Dr. Mu'adh ibn Abdurrahim Khujah | No university, ministry or other official post found. Official bodies name him only as a lecturer: the Islamic University's Intellectual Awareness Unit (latest IU item 15 Jan 2026) and the Madinah branch of the Ministry of Islamic Affairs (invitation of 15 Sept 2026). Keep the current role line. | high that no post is published; n/a for a post |
| (c) al-Ruhayli, `ruh-targhib` and `ruh-dalil` | **Not merged. They are still two lessons.** Sahih at-Targhib is on Wednesday after Asr and Dalil at-Talib is Thursday to Saturday after Asr, both in Circle 2. The Presidency's own YouTube channel streamed Targhib on Wednesdays 21 Oct, 28 Oct and 4 Nov 2026 and Dalil on Thursday 29 and Friday 30 Oct 2026. The schedule API lists one Thursday to Saturday entry naming both books and leaves out the Wednesday sitting; that is a listing simplification, not a change. MESH's `lessons.ts` is right as it stands. | high |

Side finding: the shaykh moved his official Telegram channel from @Sualruhaily to @Sulalruhaily on 2 November 2025. Two profile facts and the watcher still use the old handle (see "Exact changes").

## Access this session

- Reachable: cpd.prh.gov.sa API (curl through the proxy), t.me public previews (`t.me/s/...`, including channel search), YouTube oEmbed (gives a video's title and owning channel), x.com profile HTML (bio and latest posts only), pbs.twimg.com images, imamu.edu.sa (search returned no static results), jqrs.qurancomplex.gov.sa.
- Blocked: sualruhaily.com (not in the session's allowed domains: DNS failure), qubaa.mda.gov.sa (connection reset), gmalnafea.org (DNS failure), midad.com through WebFetch (reached by curl, no biography text). The new channel t.me/Sulalruhaily has web preview turned off (`/s/` returns 302), so its posts cannot be read without the app.

---

## (c) Shaykh Sulayman al-Ruhayli: Asr lessons at Masjid an-Nabawi

MESH: `src/server/seed/legacy/lessons.ts`
- `ruh-targhib` (lines 13 to 23): «شرح صحيح الترغيب والترهيب», `days: [3]` (Wednesday), Asr, Circle 2, First Saudi Expansion between Bab Umar and Bab Uthman.
- `ruh-dalil` (lines 24 to 34): «شرح دليل الطالب لنيل المطالب», `days: [4, 5, 6]` (Thursday to Saturday), Asr, same circle.

### The official API (fetched 10 Nov 2026, 00:18 UTC)

`https://cpd.prh.gov.sa/api/v1/courses?mosque=madinah` returned 200 sittings, tabular dates 1448-05-29 to 1448-06-19 (10 to 30 Nov 2026 after converting with `islamic-civil`). Teacher record: imam_id 25, «الشيخ أ.د.سليمان بن سليم الله الرحيلي».

| API ids | Tabular date | Gregorian | Day | After | Book field | Place |
|---|---|---|---|---|---|---|
| 9354, 9361, 9368 | 1448-06-01 to 06-03 | 12 to 14 Nov | Thu, Fri, Sat | العصر | «- كتاب صحيح الترغيب والترهيب / - كتاب دليل الطالب» | place_id 29, التوسعة السعودية الأولى بين باب عمر وباب عثمان |
| 9375, 9382, 9389 | 06-08 to 06-10 | 19 to 21 Nov | Thu, Fri, Sat | العصر | same | same |
| 9396, 9403, 9410 | 06-15 to 06-17 | 26 to 28 Nov | Thu, Fri, Sat | العصر | same | same |
| 9424, 9431, 9438 | 06-03, 06-10, 06-17 | 14, 21, 28 Nov | Sat | الفجر | كتاب التوحيد | place_id 58, التوسعة الغربية أمام الداخل من باب قباء (5) |

All his Asr entries were created at the same moment (2026-10-29T14:52:37Z) and carry `is_live: 1` with the Presidency's stream link https://www.youtube.com/@wmngovksa/streams. No Wednesday Asr entry exists for anyone at place 29; the only other Asr sitting in the whole API is Abu Battin's Fath al-Bari on Tuesday. The same pattern of one entry naming several books appears for other teachers (for example `qasim-sequence`, `badrbadr-sequence`): the API groups a teacher's books under one slot rather than listing each sitting's book.

### What actually happens, sitting by sitting

The Presidency's own YouTube channel («دروس المسجد النبوي», https://www.youtube.com/@wmngovksa) titles each stream with the single book read in it. Titles read through YouTube oEmbed; dates from the drosalmadina "live now" post that carries each link (times are Madinah time, all just after Asr):

| Date | Day | Book in the official stream title | Stream | Announcement |
|---|---|---|---|---|
| 21 Oct 2026 | Wed | «الدروس العلمية لفضيلة الشيخ أ.د. سليمان بن سليم الله الرحيلي - كتاب صحيح الترغيب والترهيب» | https://youtube.com/live/hCTyxo1nOX8 | https://t.me/drosalmadina/12530 |
| 28 Oct 2026 | Wed | same, «كتاب صحيح الترغيب والترهيب» | https://youtube.com/live/JGys1TM2534 | https://t.me/drosalmadina/12555 |
| 29 Oct 2026 | Thu | «... - كتاب دليل الطالب لنيل المطالب» | https://youtube.com/live/mGyldNgIDmA | https://t.me/drosalmadina/12562 |
| 30 Oct 2026 | Fri | «... - كتاب دليل الطالب لنيل المطالب» | https://youtube.com/live/8ek-6mykbAw | https://t.me/drosalmadina/12565 |
| 4 Nov 2026 | Wed | «... - كتاب صحيح الترغيب والترهيب» | https://youtube.com/live/xjrTJdEk9bo | https://t.me/drosalmadina/12581 |

drosalmadina (the Madinah lessons announcer, which links each sitting to the shaykh's own Mixlr stream sualruhaily.mixlr.com and his site's recordings, sualruhaily.com/cat/84 for Targhib) shows the same split every week since the year began:

| Weeks | Wednesday Asr, Circle 2 | Thursday to Saturday Asr, Circle 2 |
|---|---|---|
| 2 Sept to 7 Nov 2026 | «شرح صحيح الترغيب والترهيب»: 2, 9, 16, 30 Sept; 7, 14, 21, 28 Oct; 4 Nov | «شرح دليل الطالب»: 12, 17 to 19 Sept; 1 to 3, 8, 9, 15, 16, 22 to 24, 29 to 31 Oct; 5 to 7 Nov |

Post ids, in order: 12345, 12376, 12407, 12448, 12475, 12502, 12530, 12555, 12581 (Targhib); 12390, 12411, 12416, 12419, 12452, 12455, 12459, 12479, 12484, 12507, 12508, 12536, 12539, 12542, 12562, 12565, 12569, 12586, 12590, 12593 (Dalil). On Saturday 17 Oct the shaykh excused himself from the Asr lesson (https://t.me/drosalmadina/12512).

The year's timetable, posted 28 Aug 2026 and marked as kept up to date (https://t.me/drosalmadina/12332): «شرح صحيح الترغيب والترهيب ... الأربعاء من كل أسبوع ... ابتداءً من ٢٠/ ٣ ... في المسجد النبوي (حلقة ٢)» and «شرح دليل الطالب لنيل المطالب ... من الخميس إلى السبت ... ابتداءً من ٢١/ ٣ ... في المسجد النبوي (حلقة ٢)». The same post lists his Tuesday Asr «شرح كتاب الكبائر» at Masjid Quba and his Saturday Fajr «شرح كتاب التوحيد» (western expansion), both of which match MESH (`quba-ruh-kabair`, `ruh-tawhid`).

History that explains the API wording: before the summer break the Asr lesson ran Targhib on most days (15 to 22 June 2026, https://t.me/drosalmadina/12114 to 12145), and the lessons stopped on 22 June after he finished the Book of Hajj of Sahih at-Targhib (https://t.me/drosalmadina/12147). In 1448 the two books were given separate days.

### The shaykh's own channels

- Telegram: the old official channel @Sualruhaily pinned a notice on 2 Nov 2025 that it is being replaced: «لأسباب تقنية سنقوم بتغيير القناة الرسمية الأولى على التيليغرام. نرجو من الإخوة الانضمام للقناة الجديدة لأن القناة الحالية ستُحذف» and linked t.me/Sulalruhaily (https://t.me/Sualruhaily/8313 to 8315). The old channel has no post after that. The new channel describes itself as «القناة الرسمية الأولى التابعة للموقع الرسمي لشيخنا حفظه الله http://www.sualruhaily.com» but has no public web preview, so its posts could not be read.
- Website sualruhaily.com: blocked in this session. X @solyman24: not read.
- The streams named above are his own Mixlr feed (sualruhaily.mixlr.com) and the Presidency's channel, and the recordings sit in his site's category 84 (Targhib). That is consistent with two separate series.

### Answer

Not one sitting. Wednesday after Asr is Sahih at-Targhib wat-Tarhib; Thursday, Friday and Saturday after Asr are Dalil at-Talib, as MESH already has. The API's single Thursday to Saturday entry naming both books, with no Wednesday entry, does not match the Presidency's own streams.

Confidence: **high**. The Presidency's own stream titles (official) and the announcer's per-sitting posts agree for every week from 2 Sept to 7 Nov 2026. The API window starts 10 Nov, after the last sitting checked, so one more check settles it beyond doubt: after Asr on Wednesday 11 Nov 2026 (about 12:40 UTC) look for a Targhib "live now" post on t.me/s/drosalmadina or a Targhib stream on @wmngovksa.

Note for the planned API importer: do not merge or delete MESH lessons on the strength of a multi-book API entry, and do not treat a missing weekday in the API as a cancellation without a second source.

---

## (a) Prof. Dr. Abdullah ibn Ibrahim al-Luhaydan (أ. د. عبد الله بن إبراهيم اللحيدان)

MESH: lesson `quba-luhaydan-zad` (`lessons.ts` lines 542 to 552); no entry in `MASHAYIKH_POSITIONS` (`src/server/seed/content/mashayikh.ts`) and none in `profiles.ts`.

What was found:

| Item | Source | Date |
|---|---|---|
| The lesson, sessions 1 to 4: «(١) التعليق على كتاب (زاد المعاد) لابن القيم ... الأربعاء ٣ / ٤ / ١٤٤٨ بمسجد قباء ... لفضيلة الشيخ أ. د. عبدالله بن إبراهيم اللحيدان». The recordings are uploaded by «قناة خزانة العلم» (youtube.com/@khizana_62), not by an official body. The posts print the month as ٤; the dates (Wednesdays 14, 21, 28 Oct and 4 Nov 2026) fall in Jumada al-Ula (month ٥). | https://t.me/khizana_62/10800 ; /10927 ; /11015 ; /11087 ; oEmbed of https://youtu.be/0llbQIJTCB0 and https://youtu.be/owhaxlPBqVo | 16 Oct to 5 Nov 2026 |
| Imam University news headline «كلمة أ.د. عبدالله اللحيدان في الذكرى الـ 92 لليوم الوطني» (no father's name; the page now redirects to the news index, so the body could not be read) | https://imamu.edu.sa/news/Pages/news_20_9_2022_7.aspx | 20 Sept 2022 |
| A paper by «عبد الله بن إبراهيم اللحيدان: أستاذ مشارك بقسم الدعوة والاحتساب، كلية الدعوة والإعلام، جامعة الإمام» (search-engine snippet of a reposted copy) | https://www.democratsudan.com/%D8%B3%D9%85%D8%A7%D8%AD%D8%A9-%D8%A7%D9%84%D8%A5%D8%B3%D9%84%D8%A7%D9%85-%D9%81%D9%8A-%D9%85%D8%B9%D8%A7%D9%85%D9%84%D8%A9-%D8%BA%D9%8A%D8%B1-%D8%A7%D9%84%D9%85%D8%B3%D9%84%D9%85%D9%8A%D9%86/ | about 2022 |
| Al-Jazirah: «الدكتور عبدالله بن إبراهيم اللحيدان رئيس قسم الدعوة والاحتساب» (Imam University, Riyadh) | https://www.al-jazirah.com/2007/20070607/as13.htm | 7 June 2007 |
| Author pages with da'wah works only (Alukah, Midad «العلماء والدعاة»: «المملكة العربية السعودية», no post; book «سماحة الإسلام في معاملة غير المسلمين» published by the Ministry of Islamic Affairs) | https://www.alukah.net/authors/view/home/2905/ ; https://midad.com/scholar/38173 ; https://shamela.ws/author/386 | undated |
| A biography page exists at Jami' an-Nafi' («عبد الله بن إبراهيم بن علي اللحيدان»), which this session cannot reach | https://www.gmalnafea.org/sheikhs/15-%D8%B9%D8%A8%D8%AF-%D8%A7%D9%84%D9%84%D9%87-%D8%A8%D9%86-%D8%A5%D8%A8%D8%B1%D8%A7%D9%87%D9%8A%D9%85-%D8%A8%D9%86-%D8%B9%D9%84%D9%8A-%D8%A7%D9%84%D9%84%D8%AD%D9%8A%D8%AF%D8%A7%D9%86/biography | unknown |
| Not found: IU site (search, 9 Nov), Taibah University, the King Fahd Complex journal site (home page and site search have no «اللحيدان» today), SPA, drosalmadina | | 9 and 10 Nov 2026 |

Reading: the Imam University academic in Da'wah and Ihtisab (head of department 2007, associate professor about 2022, possibly "أ.د." by September 2022) fits the "أ. د." title and a da'wah profile, but no source places him in Madinah or at Quba, and no official body (Ministry of Islamic Affairs, which runs Masjid Quba, or any university) names the Quba teacher's post. Merging the two would be a guess.

Confidence: low. No role change. Keep "Teacher at Masjid Quba" and the Zad al-Ma'ad fact from section 21 of the positions file. The fastest way to close it: an admin opens the Jami' an-Nafi' biography page above (it carries the full four-part name and may give his post and city), or asks Khizanat al-'Ilm (t.me/khizana_62).

---

## (b) Dr. Mu'adh ibn Abdurrahim Khujah (د. معاذ بن عبد الرحيم خوجة)

MESH: `mashayikh.ts` lines 274 to 288 (role "Teacher at Masjid Quba"); lesson `quba-khuja-arbaun` (`lessons.ts` lines 429 to 439, Saturday Asr).

| Item | Source | Date |
|---|---|---|
| X profile: display name «د. معاذ بن عبدالرحيم خوجة», empty bio, joined May 2014. His only recent original post with a picture (15 Sept 2026, «أسأل الله التوفيق والسداد») is a Ministry invitation, not an appointment: «يسر فرع وزارة الشؤون الإسلامية والدعوة والإرشاد بمنطقة المدينة المنورة بالتعاون مع جمعية النورانية دعوتكم لحضور كلمة بعنوان {ولا تتبعوا خطوات الشيطان} لفضيلة الشيخ د. معاذ بن عبدالرحيم خوجة ... يوم الأربعاء ١٤٤٨/٤/٥ ... جامع أحمد بن حنبل، حي بني ظفر، بعد صلاة العشاء» | https://x.com/muath_khoja ; https://x.com/muath_khoja/status/2099935688565149839 | 15 Sept 2026 |
| Telegram channel description only «دروس وفتاوى وفوائد علمية». Keyword searches of the channel (إمام، خطيب، المسجد النبوي، معهد، الجامعة، أستاذ، محاضر، عضو، الدكتوراه، مدرس، وزارة) find no post or title. «معهد» hits are an online course for «طلاب معهد الإمام الشافعي» (2022 to 2023), a teaching role, not a post. | https://t.me/s/muath_khoja | searched 10 Nov 2026 |
| Saturday Asr Arba'in at Quba is current: «نذكركم بدرس شيخنا اليوم في شرح الأربعين النووية بعد صلاة العصر في مسجد قباء ... الحديث السابع والثلاثين» (Sat 24 Oct); excused for Sat 31 Oct | https://t.me/muath_khoja/3562 ; https://t.me/muath_khoja/3566 | 24 and 30 Oct 2026 |
| Symposium at Masjid Quba «كشف زيف الحوثية وخطرها على الدين والأمن», his talk «جهود المملكة العربية السعودية في دحر الحوثيين» | https://t.me/muath_khoja/3572 | 5 Nov 2026 |
| IU news, latest: «تنفيذ درس علمي بعنوان: "شرح كتاب فضل الإسلام" ... قدمه: د. معاذ بن عبد الرحيم خوجة» (Intellectual Awareness Unit with the Ministry's Madinah branch, at Jami' ash-Shaykh Muhammad ibn Ibrahim, the University's mosque) | https://iu.edu.sa/%D8%AA%D9%86%D9%81%D9%8A%D8%B0-%D8%AF%D8%B1%D8%B3-%D8%B9%D9%84%D9%85%D9%8A-%D8%A8%D8%B9%D9%86%D9%88%D8%A7%D9%86-%D8%B4%D8%B1%D8%AD-%D9%83%D8%AA%D8%A7%D8%A8-%D9%81%D8%B6%D9%84-%D8%A7%D9%84%D8%A7%D8%B3%D9%84%D8%A7%D9%85-%D9%84%D9%84%D8%A7%D9%85%D8%A7%D9%85-%D9%85%D8%AD%D9%85%D8%AF-%D8%A8%D9%86-%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D9%88%D9%87%D8%A7%D8%A8-%D8%B1%D8%AD%D9%85%D9%87-%D8%A7%D9%84%D9%84%D9%87-%D9%82%D8%AF%D9%85%D9%87-%D8%AF-%D9%85%D8%B9%D8%A7%D8%B0-%D8%A8%D9%86-%D8%B9%D8%A8%D8%AF-%D8%A7%D9%84%D8%B1%D8%AD%D9%8A%D9%85-%D8%AE%D9%88%D8%AC%D8%A9- | 15 Jan 2026 |
| YouTube channel run for him: «قناة خاصة بنقل علم فضيلة الشيخ د. معاذ بن عبدالرحيم خوجة وفقه الله»; no post | https://www.youtube.com/channel/UC1djOnspbBVGbfCWjdmlBiQ | fetched 10 Nov 2026 |
| Not found: IU faculty records (none named Khujah among the Mu'adhs; College of Hadith list), SPA, Taibah, Ministry pages | | 9 and 10 Nov 2026 |

Answer: no official position is published anywhere. Every official body that names him (the Islamic University and the Madinah branch of the Ministry of Islamic Affairs) does so as a lecturer in their programmes, always as «د.». He is not the IU spokesman or Dean; those are his namesake Prof. Dr. Mahir ibn Abdurrahim Khujah (iu.edu.sa/news14471127, iu.edu.sa/news14471112-1).

Confidence: high that no post is published; no post to propose. Keep the role line. One optional fact is supported by an official invitation (Ministry branch, 15 Sept 2026) together with the IU items already cited:

- AR: يُلقي كلمات ومحاضرات بدعوة من فرع وزارة الشؤون الإسلامية والدعوة والإرشاد بمنطقة المدينة المنورة
- EN: He gives talks and lectures at the invitation of the Madinah branch of the Ministry of Islamic Affairs, Da'wah and Guidance

---

## Exact changes (not applied; for the file owners and the admins)

Paths are the same in `/home/user/medinahub` and `/home/user/wt-research` (the files are identical in both trees today).

### (c) al-Ruhayli
1. `src/server/seed/legacy/lessons.ts` lines 13 to 34 (`ruh-targhib`, `ruh-dalil`): **no change.** Do not merge them. Wednesday for Targhib (`days: [3]`) and Thursday to Saturday for Dalil (`days: [4, 5, 6]`) are correct. The same holds for the live database rows (Admin > Duroos).
2. `docs/research/duroos-official-schedule-2026-11.md`:
   - line 12: remove `ruh-dalil` from "MESH lessons with no official sitting". The API's Thursday to Saturday entry is the Dalil sitting; what the API leaves out is the Wednesday Targhib sitting. Suggested text: "MESH lessons with no separate official entry: `ruh-targhib` (Wednesday). The API folds it into the Thursday to Saturday entry; the Presidency's own streams show it is still held on Wednesdays."
   - line 17 (correction 2): replace "Confirm with the shaykh's own channel before merging them." with "Resolved 10 Nov 2026: keep both lessons as they are; see `docs/research/mashayikh-open-answers-2026-11.md`."
   - line 49 (matches table): the MESH id for this API entry should read `ruh-dalil` (Thu, Fri, Sat), with a note that `ruh-targhib` (Wed) has no API entry.
3. Optional, more precise profile fact (only if the owner wants days on profiles): `src/server/seed/content/mashayikh.ts` lines 53 to 56 (the `F(...)` holding lines 54 and 55) and `src/server/seed/legacy/profiles.ts` lines 26 to 29 (the `L(...)` holding lines 27 and 28) could read
   - AR: من دروسه في المسجد النبوي: شرح «صحيح الترغيب والترهيب» بعد عصر الأربعاء، وشرح «دليل الطالب» بعد العصر من الخميس إلى السبت، وشرح «كتاب التوحيد» بعد فجر يوم السبت
   - EN: His lessons at the Prophet's Mosque include «Sahih al-Targhib wat-Tarhib» after Asr on Wednesdays, «Dalil al-Talib» after Asr from Thursday to Saturday, and «Kitab al-Tawhid» after Fajr on Saturdays

### Side finding: al-Ruhayli's Telegram handle
4. `src/server/seed/content/mashayikh.ts` lines 58 to 59: change `@Sualruhaily` to `@Sulalruhaily` in both the Arabic and English strings (the shaykh's pinned notice of 2 Nov 2025; `streams.ts` lines 61 to 64 and `announcements.ts` lines 30 to 35 already use @Sulalruhaily).
5. `src/server/seed/legacy/profiles.ts` line 31: same change, `@Sualruhaily` to `@Sulalruhaily`.
6. `src/server/watcher/sources.ts` line 13 (`{ handle: "Sualruhaily", ... }`): the watcher reads a channel with no new posts since 2 Nov 2025. Switching it to `Sulalruhaily` will not work either, because the new channel has no public preview (`t.me/s/Sulalruhaily` answers 302). drosalmadina (line 12) already covers all his lessons. Watcher owner to decide: drop the line, or keep it and accept that it is silent.
7. `src/server/seed/legacy/announcements.ts` line 33 (`previewUrl: "https://t.me/s/Sulalruhaily"`): the preview link redirects to the plain channel page, so any preview read of it returns nothing. Point readers at `https://t.me/Sulalruhaily`, or leave it if the UI only links out.

### (a) al-Luhaydan
8. No change. `lessons.ts` line 544 keeps «أ. د.»/"Prof. Dr." (it matches every announcement). Do not add an institution. `docs/research/mashayikh-open-questions-2026-11.md` line 306 stays open, with the new lead: the Jami' an-Nafi' biography page above.

### (b) Mu'adh Khujah
9. No change to the role (`mashayikh.ts` lines 275 to 276). Optional: add the Ministry-invitation fact above after line 282 (after the Intellectual Awareness Unit fact). `docs/research/mashayikh-open-questions-2026-11.md` line 307 can be closed as "no published post; checked 10 Nov 2026".
