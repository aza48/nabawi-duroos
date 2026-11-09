# Mashayikh: current positions (research, November 2026)

Checked: 9 November 2026. Status: complete for all 31 shaykhs in lessons.ts, plus 13 other teachers named in the repo.

## Summary

- Covered: 31 lesson shaykhs (sections 1 to 31, in lessons.ts order) and 13 other teachers from events.ts and al-midad.ts.
- Of the 20 shaykhs who already have a profile card in `profiles.ts`, 13 role lines should change and 7 are already right (Salih al-Suhaymi, al-Hudhayfi, al-Qasim, Abdussalam al-Suhaymi, Yusuf al-Sa'idi, Tariq al-Qahtani, Anis Tahir apart from his title).
- For the 11 shaykhs without a profile, a role line is proposed for 9; two (Badr "ibn Muqbil al-Badr" and Maher al-Qahtani) wait on the admins because the person could not be identified.

### Most important corrections

1. Prof. Dr. Mahir Khujah: Dean of the College of Aqidah and Da'wah at the Islamic University (in office by 30 April 2026), Supervisor of the IU Intellectual Awareness Unit, and chair of the organising committee of the IU international conference of September 2026. MESH says only "Teacher at Masjid Muhammad ibn Ibrahim".
2. Dr. Ahmad al-Ghamidi: Vice-Dean of the College of Aqidah and Da'wah for Development and Quality (27 August 2026), promoted to Associate Professor (18 December 2025).
3. Prof. Dr. Sulayman al-Ruhayli: Imam and Khatib of Masjid Quba since 2020 (missing from MESH).
4. Prof. Dr. Ali al-Tuwaijri: MESH calls him an Associate Professor; he reached full Professor and retired from the University in 1439 AH, and is now a teacher at the Prophet's Mosque.
5. Shaykh Dr. Ali al-Hudhayfi: also Head of the Scholarly Committee for Reviewing the Madinah Mushaf (King Fahd Complex), and the Arafah khatib of Hajj 1447 (May 2026).
6. Prof. Dr. Saud al-Khalaf: MESH has "Shaykh"; he is Prof. Dr., Professor of Aqidah at IU, President of the Saudi Scientific Society for Aqidah, Religions, Sects and Schools, and a teacher at the Prophet's Mosque.
7. Prof. Dr. Abdurrazzaq al-Badr: also Professor of Aqidah (graduate studies) at IU, teaching at the Prophet's Mosque since 1406 AH.
8. Dr. Abdullatif al-Shamani: MESH says "Teacher at Masjid Quba"; he is a teacher at the Prophet's Mosque and a faculty member in Usul al-Fiqh, College of Shariah.
9. Prof. Dr. Muhammad al-Hujayli: add Professor at IU (Fiqh al-Sunnah) to his Quba imamate (since March 2023).
10. "Shaykh Badr ibn Muqbil al-Badr" does not exist in any source. The lesson most likely belongs to Prof. Dr. Badr ibn Nasir al-Badr (teacher at the Prophet's Mosque), or the name was mixed with Prof. Dr. Badr ibn Muqbil al-Dhafiri (former dean). Admin to confirm.

Also: Prof. Dr. Ibrahim al-Ruhayli, Prof. Dr. Umar al-Husaini, Prof. Dr. Husayn al-Tuwaijri, Prof. Dr. Arif al-Suhaymi, Prof. Dr. Abdulqadir Sufi, Prof. Dr. Abdullah al-Sa'adi and Dr. Ghalib al-Sa'idi all hold IU posts that MESH reduces to "Teacher at ...".

### Titles and names that are wrong in MESH

| MESH | Correct | Section |
|---|---|---|
| الشيخ سعود بن عبد العزيز الخلف (Shaykh) | أ. د. (Prof. Dr.); spelled الخَلَف, al-Khalaf | 2 |
| الشيخ أنيس بن أحمد طاهر (Shaykh) | أ. د. (Prof. Dr.) | 4 |
| الشيخ عبدالله بن محمد الساعدي (Shaykh) | أ. د. (Prof. Dr.) | 27 |
| الشيخ علي بن عبد الرحمن الحذيفي | الشيخ د. (Shaykh Dr.) | 8 |
| الشيخ عبد المحسن بن محمد القاسم | الشيخ د. (Shaykh Dr.) | 10 |
| أ. د. علي بن فهد أبا بطين | official pages: د. علي بن فهد أبابطين (Dr.); confirm | 3 |
| د. يوسف بن محسن السعيدي | الصاعدي (with ص) | 28 |
| د. غالب بن غازي السعيدي | الصاعدي (with ص) | 29 |
| أ. د. عبد القادر بن عطا صوفي | عبد القادر بن محمد عطا صوفي | 26 |
| الشيخ بدر بن مقبل البدر | person not found; see open question 1 | 11 |
| الشيخ صالح بن محمد الصويح (events) | السويح (with س) | Other teachers |
| الشيخ عبدالإله بن عبدالعزيز الرفاعي (al-Midad) | د. (Dr.) | Other teachers |

Note for whoever applies this: the Arabic name is the key in `SHAYKH_PROFILES` and is matched against lessons, so a name fix must change `profiles.ts`, `lessons.ts` and the database row together.

Scope: the 31 shaykhs in `src/server/seed/legacy/lessons.ts` (in that file's order), then the other teachers named in `src/server/seed/legacy/events.ts` and `src/server/seed/content/al-midad.ts`.

Confidence: high (official page, or two independent recent sources); medium (one reputable source); low (social posts only). Only high and medium items go into the proposed role and facts.

## Method and limits

- All searches were run on 9 November 2026 (the "checked" date for every item below).
- From this session, direct page fetches to iu.edu.sa, x.com, t.me and the Saudi news sites were blocked by the network sandbox, so each item rests on what the search engine returned for those pages (titles, snippets and dates). Before publishing, an admin opening each linked page once is enough to confirm.
- Dates of X posts are read from the post ID (X IDs encode the posting time), so they are exact even when the page shows no date.
- Important naming point: the Islamic University's da'wah college is now officially called the College of Aqidah and Da'wah (كلية العقيدة والدعوة). It is the college the owner calls "the College of Da'wah".

---

## 1. Prof. Dr. Sulayman ibn Saleemullah al-Ruhayli (أ. د. سليمان بن سليم الله الرحيلي)

Title: Prof. Dr. is correct (his official site and YouTube titles use أ.د.).

Current positions:
| Arabic | English | Source | Source date | Checked |
|---|---|---|---|---|
| إمام وخطيب مسجد قباء | Imam and Khatib of Masjid Quba | SPA, appointment report: https://www.spa.gov.sa/2076544 ; Friday khutbah at Quba on 3/2/1448 on his official site: https://sualruhaily.com/play/2861 ; Sawt al-Umam calls him imam and khatib of Quba and teacher at the Prophet's Mosque: https://www.soutalomam.net/%D8%A7%D9%84%D8%B1%D8%AD%D9%8A%D9%84%D9%8A-%D9%8A%D8%B4%D9%8A%D8%AF-%D8%A8%D8%AC%D9%87%D9%88%D8%AF-%D9%88%D8%B2%D9%8A%D8%B1-%D8%A7%D9%84%D8%B4%D8%A4%D9%88%D9%86/ | appointed March 2020; khutbah 3/2/1448 (July 2026); article 27 June 2026 | 9 Nov 2026 |
| أستاذ كرسي الفتوى وضوابطها وأستاذ الدراسات العليا بالجامعة الإسلامية | Professor of the Chair of Fatwa and its Principles, and graduate studies professor, at the Islamic University of Madinah | his X bio (@solyman24) and official Facebook page; Arabic Wikipedia: https://ar.wikipedia.org/wiki/%D8%B3%D9%84%D9%8A%D9%85%D8%A7%D9%86_%D8%A8%D9%86_%D8%B3%D9%84%D9%8A%D9%85_%D8%A7%D9%84%D9%84%D9%87_%D8%A7%D9%84%D8%B1%D8%AD%D9%8A%D9%84%D9%8A | current bio | 9 Nov 2026 |
| مدرّس في المسجد النبوي | Teacher at the Prophet's Mosque | his official site https://www.sualruhaily.com/ (lessons dated 1448) and Telegram @sualruhaily | 1448 (2026) | 9 Nov 2026 |

Teaching: the Prophet's Mosque (MESH lists three lessons) and Masjid Quba (MESH lists one).

Proposed role:
- EN: Imam and Khatib of Masjid Quba, and Professor at the Islamic University of Madinah
- AR: إمام وخطيب مسجد قباء، والأستاذ بالجامعة الإسلامية بالمدينة المنورة

Proposed facts:
- إمام وخطيب مسجد قباء منذ عام ١٤٤١هـ / Imam and Khatib of Masjid Quba since 2020
- أستاذ كرسي الفتوى وضوابطها بالجامعة الإسلامية / Professor of the Chair of Fatwa and its Principles at the Islamic University
- مدرّس في المسجد النبوي / Teacher at the Prophet's Mosque
- موقعه الرسمي sualruhaily.com، وقناته على تيليجرام @Sualruhaily، وحسابه على إكس @solyman24 / Official website sualruhaily.com, Telegram @Sualruhaily, X @solyman24

Confidence: high (SPA appointment plus his own site showing a 1448 Quba khutbah, plus a June 2026 report).

---

## 2. Shaykh Saud ibn Abdulaziz al-Khallaf (الشيخ سعود بن عبد العزيز الخلف)

Title: MESH has "Shaykh"; the correct academic title is Prof. Dr. (أ. د.). Sources: the Two Holy Mosques "Manarat al-Haramain" page https://manaratalharamain.gov.sa/sheikh/25 names him أ.د. سعود بن عبدالعزيز الخلف; his X account @saud_alkhalaf8 and Telegram channel use أ.د.
Spelling note: his Telegram writes the name الخَلَف (al-Khalaf, one l). MESH's English "al-Khallaf" could be "al-Khalaf".

Current positions:
| Arabic | English | Source | Source date | Checked |
|---|---|---|---|---|
| أستاذ العقيدة بالجامعة الإسلامية | Professor of Aqidah at the Islamic University of Madinah | his X bio https://x.com/saud_alkhalaf8 ; Manarat al-Haramain page above (BA Shariah 1401 AH, PhD in Aqidah 1412 AH, both IU) | current bio | 9 Nov 2026 |
| رئيس الجمعية العلمية السعودية لعلوم العقيدة والأديان والفرق والمذاهب | President of the Saudi Scientific Society for Aqidah, Religions, Sects and Schools | his X bio; the society's Telegram (@aqeedaa1) names him chairman of the board | X bio current; Telegram post undated; a third-party X post of Oct 2023 repeats it | 9 Nov 2026 |
| مدرّس في المسجد النبوي | Teacher at the Prophet's Mosque | Manarat al-Haramain (official Two Holy Mosques page); his Telegram t.me/DrSaudAlKhalaf posts "from the Prophet's Mosque lessons" | current | 9 Nov 2026 |

Teaching: the Prophet's Mosque (MESH: Al-Tadmuriyyah, Wednesday and Thursday after Maghrib).

Proposed role:
- EN: Professor of Aqidah at the Islamic University of Madinah, and teacher at the Prophet's Mosque
- AR: أستاذ العقيدة بالجامعة الإسلامية بالمدينة المنورة، والمدرّس بالمسجد النبوي

Proposed facts:
- أستاذ العقيدة بالجامعة الإسلامية / Professor of Aqidah at the Islamic University of Madinah
- رئيس الجمعية العلمية السعودية لعلوم العقيدة والأديان والفرق والمذاهب / President of the Saudi Scientific Society for Aqidah, Religions, Sects and Schools
- مدرّس في المسجد النبوي / Teacher at the Prophet's Mosque
- قناته الرسمية على تيليجرام @DrSaudAlKhalaf، وحسابه على إكس @saud_alkhalaf8 / Official Telegram @DrSaudAlKhalaf, X @saud_alkhalaf8

Confidence: high for professor and Prophet's Mosque teacher (official Haramain page plus his own accounts); medium for the society presidency (his own bio; no dated 2025 or 2026 board announcement found).

---

## 3. Prof. Dr. Ali ibn Fahd Abu Battin (أ. د. علي بن فهد أبا بطين)

Title: the official Haramain page names him د. علي بن فهد بن عبدالله أبابطين (Dr.), and no source found calls him Prof. Dr. MESH's "أ. د." could not be confirmed; see open questions. Spelling: official pages write أبابطين (one word).

Current positions:
| Arabic | English | Source | Source date | Checked |
|---|---|---|---|---|
| مدرّس في المسجد النبوي الشريف | Teacher at the Prophet's Mosque | Manarat al-Haramain (Presidency of Religious Affairs): https://manaratalharamain.gov.sa/sheikh/147 ; also listed on prh.gov.sa scholars page | current | 9 Nov 2026 |
| عضو هيئة التدريس بقسم فقه السنة ومصادرها بكلية الحديث الشريف بالجامعة الإسلامية، وأستاذ الدراسات العليا | Faculty member in the Department of Fiqh al-Sunnah and its Sources, College of Hadith, Islamic University of Madinah, and graduate studies teacher | IU faculty page https://iu.edu.sa/faculty-member900695 ; Manarat al-Haramain page | current | 9 Nov 2026 |

Former and background (well sourced, Manarat page): BA from Imam Muhammad ibn Saud University; MA and PhD from the IU College of Hadith with distinction; studied under Ibn Baz, Ibn Uthaymin and Salih al-Fawzan.

Teaching: the Prophet's Mosque (three lessons in MESH) and Masjid Quba (one lesson).

Proposed role:
- EN: Teacher at the Prophet's Mosque, and faculty member at the College of Hadith, Islamic University of Madinah
- AR: المدرّس بالمسجد النبوي، وعضو هيئة التدريس بكلية الحديث الشريف بالجامعة الإسلامية

Proposed facts:
- مدرّس في المسجد النبوي / Teacher at the Prophet's Mosque
- عضو هيئة التدريس بقسم فقه السنة ومصادرها بكلية الحديث الشريف / Faculty member in the Department of Fiqh al-Sunnah and its Sources, College of Hadith
- يدرّس أيضًا في مسجد قباء / He also teaches at Masjid Quba

Confidence: high (two official pages, Haramain and IU).

---

## 4. Shaykh Anis ibn Ahmad Tahir (الشيخ أنيس بن أحمد طاهر)

Title: MESH has "Shaykh"; the correct academic title is Prof. Dr. (أ. د.). Sources: the General Authority for the Affairs of the Two Holy Mosques, Prophet's Mosque account, announces a lecture by "الشيخ الأستاذ الدكتور أنيس بن أحمد طاهر" (https://twitter.com/wmngovsa/status/1674039955948179457, 28 June 2023); the Presidency's lesson clips title him أ.د. (for example https://www.youtube.com/watch?v=7F7FI_yqRPE); the Faculty of Hadith of Canada calls him Professor Dr.

Current positions:
| Arabic | English | Source | Source date | Checked |
|---|---|---|---|---|
| مدرّس في المسجد النبوي | Teacher at the Prophet's Mosque | Two Holy Mosques authority X post above; Presidency of Religious Affairs program at the Prophet's Mosque explaining «at-Tadhkirah» of Ibn al-Mulaqqin: https://shahdnow.sa/308370/ | 2023; 2025 | 9 Nov 2026 |

Former notable positions: Professor in the Department of Hadith Sciences, College of Hadith and Islamic Studies, Islamic University of Madinah (Faculty of Hadith of Canada: https://facultyofhadith.ca/en/events-en/online-classes-en/summary-of-mustalah-dr-anis-en/ ; IU faculty page https://iu.edu.sa/faculty-member400492). Medium confidence that the IU post is now former.

Teaching: the Prophet's Mosque (two lessons in MESH, Northern Expansion).

Proposed role:
- EN: Teacher at the Prophet's Mosque (no change in substance; the title in the name changes to Prof. Dr.)
- AR: مدرّس في المسجد النبوي الشريف

Proposed facts:
- مدرّس في المسجد النبوي / Teacher at the Prophet's Mosque
- أستاذ سابق بقسم علوم الحديث بكلية الحديث الشريف بالجامعة الإسلامية / Formerly Professor in the Department of Hadith Sciences, College of Hadith, Islamic University of Madinah
- قناته على يوتيوب: «قناة الشيخ أ.د أنيس طاهر» / His YouTube channel: "Qanat ash-Shaykh Prof. Dr. Anis Tahir"

Confidence: high for the Prophet's Mosque and the title (official authority post plus Presidency clips); medium for the former IU professorship.

---

## 5. Prof. Dr. Abdussalam ibn Salim al-Suhaymi (أ. د. عبد السلام بن سالم السحيمي)

Title: Prof. Dr. is correct (official site al-suhaimy.com and X @Alsuhaimy_net).

Current positions:
| Arabic | English | Source | Source date | Checked |
|---|---|---|---|---|
| أستاذ بقسم الفقه بكلية الشريعة بالجامعة الإسلامية بالمدينة المنورة | Professor in the Department of Fiqh, College of Shariah, Islamic University of Madinah | official biography https://al-suhaimy.com/biography-of-shaikh/ ; IU faculty page https://iu.edu.sa/faculty-member400596 | current | 9 Nov 2026 |
| مدرّس في المسجد النبوي | Teacher at the Prophet's Mosque | his X post announcing «Kitab as-Siyam» of Manhaj as-Salikin "from the Prophet's Mosque", Asr Saturday 11/9/1447: https://x.com/Alsuhaimy_net/status/2028101747567370692 | 1 March 2026 | 9 Nov 2026 |

Former notable positions (official biography): Dean of the College of Shariah at the Islamic University (the site gives 1416 to 1418 AH; another biography gives other years, so no years are proposed); Vice-Dean of the College of Shariah for evening study (1415 AH).

Teaching: the Prophet's Mosque, Northern Expansion (two lessons in MESH).

Proposed role: no change needed. Current MESH line is accurate:
- EN: Professor in the Department of Fiqh at the College of Shariah, Islamic University of Madinah, and teacher at the Prophet's Mosque
- AR: الأستاذ بقسم الفقه بكلية الشريعة بالجامعة الإسلامية بالمدينة المنورة والمدرس بالمسجد النبوي

Proposed facts (add to the current list):
- عميد كلية الشريعة بالجامعة الإسلامية سابقًا / Former Dean of the College of Shariah at the Islamic University
- موقعه الرسمي: al-suhaimy.com / His official website: al-suhaimy.com
- (keep the existing lesson lines and the X account line; note that the current location line in profiles.ts, "التوسعة الشمالية ... يمين الداخل", separates its parts with a long dash, which the house style forbids, so it should use a comma)

Confidence: high (official site, IU page, own X account with dated 2026 lesson).

---

## 6. Dr. Salih ibn Sa'd al-Suhaymi (د. صالح بن سعد السحيمي)

Title: MESH has Dr. A Presidency of Religious Affairs lesson notice (shared on his X account, 1 January 2025) calls him "الأستاذ الدكتور"; his own X name uses "د.". Left as Dr.; see open questions.

Current positions:
| Arabic | English | Source | Source date | Checked |
|---|---|---|---|---|
| المدرّس بالحرمين الشريفين | Teacher at the Two Holy Mosques | Presidency notice on his X: https://x.com/SalehAlsohaime/status/1874556065389429240 ; Makkah News on the visit of the Head of Religious Affairs to him, which calls him a teacher at the Prophet's Mosque: https://www.makkahnews.sa/5465931.html | 1 Jan 2025; 17 July 2025 | 9 Nov 2026 |
| عضو هيئة التدريس بالجامعة الإسلامية | Faculty member at the Islamic University of Madinah | Al-Jazirah report of his fatwa appointment: https://www.al-jazirah.com/2022/20220118/lp2.htm | 18 Jan 2022 | 9 Nov 2026 |

Former notable positions: Fatwa Delegate (مفوّض الإفتاء) for the Madinah region, appointed by the Grand Mufti in January 2022 (Al-Jazirah above; Akhbaar24). He still held it on 17 July 2025 (Makkah News above). His channels now describe it as former (سابقًا). Former head of the Aqidah department at the Islamic University (SubulasSalaam biography, single source, so it is not proposed).

Teaching: the Prophet's Mosque, between the two Haswas.

Proposed role: no change needed. The current MESH line ("Former Fatwa Delegate for the Madinah region, and teacher in the Two Holy Mosques") matches the latest sources.

Proposed facts (keep the existing lesson lines and add):
- مفوّض الإفتاء بمنطقة المدينة المنورة سابقًا (عُيّن عام ١٤٤٣هـ) / Former Fatwa Delegate for the Madinah region (appointed in 2022)
- حسابه على إكس @SalehAlsohaime / His X account: @SalehAlsohaime

Confidence: high (appointment in national press; July 2025 SPA-carried visit; his own channels).

---

## 7. Dr. Abdullatif ibn Shalwah al-Shamani (د. عبد اللطيف بن شلوة الشاماني)

Title: Dr. is correct. Spelling: IU and his own accounts write شلوه / شُلوّه (with ه).

Current positions:
| Arabic | English | Source | Source date | Checked |
|---|---|---|---|---|
| عضو هيئة التدريس بقسم أصول الفقه بكلية الشريعة بالجامعة الإسلامية | Faculty member in the Department of Usul al-Fiqh, College of Shariah, Islamic University of Madinah | IU faculty page https://iu.edu.sa/faculty-member900210 and College of Shariah staff list; College of Shariah lecture notice for 21/4/1447 | 2025 | 9 Nov 2026 |
| مدرّس في المسجد النبوي | Teacher at the Prophet's Mosque | Ajel: https://ajel.sa/local/z3k6eea8s3 ; Presidency "Prophet's Mosque lessons" clips (for example https://www.youtube.com/watch?v=55GYzjeLuAo); his X bio @alshamani13 | Feb 2025 | 9 Nov 2026 |

Also: one of the teachers of the Presidency's summer course at the Grand Mosque in Makkah (Watan News, July 2026, https://www.watannews-sa.com/382980.html). Single source, not proposed.

Teaching: the Prophet's Mosque (Second Haswa, in front of Bab Uthman) and Masjid Quba (first Sunday monthly).

Proposed role:
- EN: Teacher at the Prophet's Mosque, and faculty member at the College of Shariah, Islamic University of Madinah
- AR: المدرّس بالمسجد النبوي، وعضو هيئة التدريس بكلية الشريعة بالجامعة الإسلامية

Proposed facts:
- مدرّس في المسجد النبوي / Teacher at the Prophet's Mosque
- عضو هيئة التدريس بقسم أصول الفقه بكلية الشريعة بالجامعة الإسلامية / Faculty member in the Department of Usul al-Fiqh, College of Shariah, Islamic University of Madinah
- (keep the Masjid Quba lesson lines)
- قناته على تيليجرام @SheikhAbdulLateefShamani، وحسابه على إكس @alshamani13 / Telegram @SheikhAbdulLateefShamani, X @alshamani13

Confidence: high (IU page plus press and Presidency channel).

---

## 8. Shaykh Ali ibn Abdurrahman al-Hudhayfi (الشيخ علي بن عبد الرحمن الحذيفي)

Title: SPA calls him "الشيخ الدكتور" (he holds an MA and PhD from al-Azhar). MESH's "Shaykh" is respectful but incomplete; proposed: Shaykh Dr. (الشيخ د.).

Current positions:
| Arabic | English | Source | Source date | Checked |
|---|---|---|---|---|
| إمام وخطيب المسجد النبوي | Imam and Khatib of the Prophet's Mosque | SPA, Arafah khutbah report naming him imam and khatib of the Prophet's Mosque: https://www.spa.gov.sa/N2599240 ; Al-Bilad on his appointment as Arafah khatib: https://albiladdaily.com/2026/05/18/%D8%AA%D9%83%D9%84%D9%8A%D9%81-%D8%A7%D9%84%D8%B4%D9%8A%D8%AE-%D8%B9%D9%84%D9%8A-%D8%A7%D9%84%D8%AD%D8%B0%D9%8A%D9%81%D9%8A-%D8%AE%D8%B7%D9%8A%D8%A8%D9%8B%D8%A7-%D9%84%D9%8A%D9%88%D9%85-%D8%B9%D8%B1/ | 26 May 2026 (9 Dhul-Hijjah 1447); 18 May 2026 | 9 Nov 2026 |
| رئيس اللجنة العلمية لمراجعة مصحف المدينة النبوية بمجمع الملك فهد لطباعة المصحف الشريف | Head of the Scholarly Committee for Reviewing the Madinah Mushaf at the King Fahd Glorious Qur'an Printing Complex | Makkah News "Imams of the Two Holy Mosques" series: https://www.makkahnews.sa/5451993.html ; Ajel news profile (May 2026, X post 2056417603984167281); Al-Bayan 2018 | 2018 to May 2026 | 9 Nov 2026 |

Notable: delivered the Arafah khutbah of Hajj 1447 (26 May 2026), SPA above. Imam at the Prophet's Mosque since 1402 AH (with an earlier period 1399 to 1401 AH), Arabic Wikipedia.

Teaching: the Prophet's Mosque (Nayl al-Awtar, Monday after Maghrib, between the two Haswas).

Proposed role: no change needed ("Imam and Khatib of the Prophet's Mosque" / "إمام وخطيب المسجد النبوي").

Proposed facts:
- إمام وخطيب المسجد النبوي منذ عام ١٤٠٢هـ / Imam and Khatib of the Prophet's Mosque since 1402 AH
- رئيس اللجنة العلمية لمراجعة مصحف المدينة النبوية بمجمع الملك فهد / Head of the Scholarly Committee for Reviewing the Madinah Mushaf at the King Fahd Qur'an Complex
- خطيب يوم عرفة لعام ١٤٤٧هـ / Delivered the Arafah khutbah in 1447 AH (2026)
- (keep the two Nayl al-Awtar lesson lines)

Confidence: high (SPA 2026; committee headship in several independent profiles, 2018 to 2026).

---

## 9. Prof. Dr. Ali ibn Ghazi al-Tuwaijri (أ. د. علي بن غازي التويجري)

Title: Prof. Dr. is correct (his Telegram "قناة أ.د. علي بن غازي التويجري", YouTube and X @AltuwayjiriAli).

MESH role is out of date: it calls him "Associate Professor in the Department of Tafsir". He rose to full Professor at the College of the Noble Qur'an and retired from the university in 1439 AH (Shamela biography https://shamela.ws/author/2430 ; his official site https://ali-ghazi.com/ describes him as "teacher at the Prophet's Mosque and formerly a faculty member at the Islamic University").

Current positions:
| Arabic | English | Source | Source date | Checked |
|---|---|---|---|---|
| المدرّس في المسجد النبوي | Teacher at the Prophet's Mosque | official site https://ali-ghazi.com/ ; Shamela biography; recent Prophet's Mosque lesson announcements on Telegram @twijri | current | 9 Nov 2026 |

Former notable positions: Professor in the Department of Tafsir, College of the Noble Qur'an, Islamic University of Madinah (retired 1439 AH). Sources above.

Teaching: the Prophet's Mosque (Tafsir Ibn Kathir and Bulugh al-Maram).

Proposed role:
- EN: Teacher at the Prophet's Mosque, and formerly Professor of Tafsir at the Islamic University of Madinah
- AR: المدرّس بالمسجد النبوي، وأستاذ التفسير بالجامعة الإسلامية سابقًا

Proposed facts:
- مدرّس في المسجد النبوي / Teacher at the Prophet's Mosque
- أستاذ التفسير بكلية القرآن الكريم بالجامعة الإسلامية سابقًا / Formerly Professor of Tafsir at the College of the Noble Qur'an, Islamic University of Madinah
- (keep the two lesson lines)
- موقعه الرسمي ali-ghazi.com، وقناته على تيليجرام @twijri / Official website ali-ghazi.com, Telegram @twijri

Confidence: high (official site plus Shamela biography).

---

## 10. Shaykh Abdulmuhsin ibn Muhammad al-Qasim (الشيخ عبد المحسن بن محمد القاسم)

Title: his official site and the Presidency page call him "الشيخ د." / "فضيلة الشيخ الدكتور" (PhD in Islamic Fiqh, Imam Muhammad ibn Saud University, per Okaz). Proposed: Shaykh Dr. (الشيخ د.).

Current positions:
| Arabic | English | Source | Source date | Checked |
|---|---|---|---|---|
| إمام وخطيب المسجد النبوي | Imam and Khatib of the Prophet's Mosque | official site https://a-alqasim.com/ ; Presidency of Religious Affairs profile https://pg.prh.gov.sa/ar/?catid=84&id=253 ; Al-Jazirah Online Ramadan khutbah report: https://www.al-jazirahonline.com/2026/02/13/483475/ | 13 Feb 2026 | 9 Nov 2026 |

Imam at the Prophet's Mosque since 1418 AH (official site and Presidency page).

Teaching: the Prophet's Mosque, Eastern Expansion in front of Gate 37, after Isha Sunday to Thursday.

Proposed role: no change needed ("Imam and Khatib of the Prophet's Mosque").

Proposed facts:
- إمام وخطيب المسجد النبوي منذ عام ١٤١٨هـ / Imam and Khatib of the Prophet's Mosque since 1418 AH
- موقعه الرسمي: a-alqasim.com / His official website: a-alqasim.com
- (keep the three lesson lines)

Confidence: high. His judicial post (General Court or Court of Appeal in Madinah) is described differently by different sources, so it is under open questions.

---

## 11. Shaykh Badr ibn Muqbil al-Badr (الشيخ بدر بن مقبل البدر)

Finding: no scholar with this exact name could be found in any source. Two real scholars match parts of it:
1. Prof. Dr. Badr ibn Nasir al-Badr (أ. د. بدر بن ناصر البدر): teacher at the Prophet's Mosque, a Qur'an sciences specialist, formerly head of the Department of the Qur'an and its Sciences and graduate studies professor at Imam Muhammad ibn Saud Islamic University in Riyadh. Sources: his official site https://badr-albadr.com/ (and https://www.elbdr.com/, titled "teacher at the Prophet's Mosque"); his official Facebook page; Presidency clips "from the Prophet's Mosque lessons" by "أ.د/ بدر بن ناصر البدر", including "from the virtues of Surat al-Kahf" (https://www.youtube.com/watch?v=feUbh0N306o, May 2025); the Prophet's Mosque scientific affairs agency X post 1933248052984238279 (12 June 2025).
2. Prof. Dr. Badr ibn Muqbil al-Dhafiri (أ. د. بدر بن مقبل الظفيري): the dean of the College of Aqidah and Da'wah at the Islamic University before Prof. Dr. Mahir Khujah (Nida al-Islam radio X post, April 2025; College X post of 30 April 2026 thanking him as a former dean). No source places a lesson of his at the Prophet's Mosque.

The MESH lesson (Fada'il al-Qur'an, then al-Arba'in an-Nawawiyyah, at the Prophet's Mosque) fits the first: a Qur'an sciences teacher of the Prophet's Mosque whose surname is al-Badr. The name "ibn Muqbil" fits the second. This must be settled by an admin before any profile is written. See open questions.

Proposed role, only once the admin confirms it is Prof. Dr. Badr ibn Nasir al-Badr:
- EN: Teacher at the Prophet's Mosque, and graduate studies professor at Imam Muhammad ibn Saud Islamic University
- AR: المدرّس بالمسجد النبوي، وأستاذ الدراسات العليا بجامعة الإمام محمد بن سعود الإسلامية

Confidence: low on identity (no source for the name as written). Medium on the positions of each candidate.

---

## 12. Prof. Dr. Abdurrazzaq ibn Abdulmuhsin al-Badr (أ. د. عبد الرزاق بن عبد المحسن البدر)

Title: Prof. Dr. is correct (graduate studies professor, Aqidah department, IU).

Current positions:
| Arabic | English | Source | Source date | Checked |
|---|---|---|---|---|
| المدرّس في المسجد النبوي | Teacher at the Prophet's Mosque (since early 1406 AH) | official site https://al-badr.net/ ; Arabic Wikipedia https://ar.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D8%B1%D8%B2%D8%A7%D9%82_%D8%A7%D9%84%D8%A8%D8%AF%D8%B1 | current | 9 Nov 2026 |
| أستاذ بقسم العقيدة بالجامعة الإسلامية (الدراسات العليا) | Professor in the Department of Aqidah (graduate studies), Islamic University of Madinah | Shamela biography https://shamela.ws/author/936 ; Arabic Wikipedia | current biographies, undated | 9 Nov 2026 |

Teaching: the Prophet's Mosque, western side.

Proposed role:
- EN: Teacher at the Prophet's Mosque, and Professor of Aqidah at the Islamic University of Madinah
- AR: المدرّس بالمسجد النبوي، وأستاذ العقيدة بالجامعة الإسلامية بالمدينة المنورة

Proposed facts:
- مدرّس في المسجد النبوي منذ عام ١٤٠٦هـ / Teacher at the Prophet's Mosque since 1406 AH
- أستاذ بقسم العقيدة بالجامعة الإسلامية / Professor in the Department of Aqidah at the Islamic University of Madinah
- (keep the lesson line and the al-badr.net and Mixlr lines)
- حسابه على إكس @albadr_net / X: @albadr_net

Confidence: high for the Prophet's Mosque (official site, many sources); medium for the IU professorship (biographies, no dated IU page found from here).

---

## 13. Dr. Mis'ad ibn Musa'id al-Husaini (د. مسعد بن مساعد الحسيني)

Title: Dr. is correct (his X @mosed1122 and Telegram use د.). One forum biography calls him "الأستاذ الدكتور"; not confirmed, so Dr. stays.

Current positions:
| Arabic | English | Source | Source date | Checked |
|---|---|---|---|---|
| عضو هيئة التدريس بقسم التفسير بكلية القرآن الكريم بالجامعة الإسلامية | Faculty member in the Department of Tafsir, College of the Noble Qur'an, Islamic University of Madinah | Qaf author profile https://qaf.ai/ar/authors/musaad-bin-musaid-al-husayni (MA and PhD from the IU Tafsir department; MA thesis published by IU, Shamela https://shamela.ws/author/1064); IU Intellectual Awareness Unit lecture notice "الوسطية في الإسلام" | undated | 9 Nov 2026 |

Teaching: Masjid Quba (MESH). A circle on Tafsir as-Sa'di (Qaf profile).

Proposed role:
- EN: Faculty member at the College of the Noble Qur'an, Islamic University of Madinah, and teacher at Masjid Quba
- AR: عضو هيئة التدريس بكلية القرآن الكريم بالجامعة الإسلامية، والمدرّس بمسجد قباء

Proposed facts:
- عضو هيئة التدريس بقسم التفسير بكلية القرآن الكريم بالجامعة الإسلامية / Faculty member in the Department of Tafsir, College of the Noble Qur'an, Islamic University of Madinah
- يدرّس في مسجد قباء / Teaches at Masjid Quba
- قناته الرسمية على تيليجرام @mosedalhosine5، وحسابه على إكس @mosed1122 / Official Telegram @mosedalhosine5, X @mosed1122

Confidence: medium (one profile plus an IU notice; no dated IU staff page read).

---

## 14. Prof. Dr. Ibrahim ibn Amir al-Ruhayli (أ. د. إبراهيم بن عامر الرحيلي)

Title: Prof. Dr. is correct (his X @rehyli "أ.د. إبراهيم الرحيلي"; Telegram; Midad lists rank Professor).

Current positions:
| Arabic | English | Source | Source date | Checked |
|---|---|---|---|---|
| أستاذ العقيدة بكلية العقيدة والدعوة بالجامعة الإسلامية | Professor of Aqidah at the College of Aqidah and Da'wah, Islamic University of Madinah | his X bio https://x.com/rehyli (still uses the old college name "كلية الدعوة وأصول الدين"); Midad https://midad.com/scholar/41735 ; official biography https://al-rehaili.net/%D8%A7%D9%84%D8%B3%D9%8A%D8%B1%D8%A9-%D8%A7%D9%84%D8%B0%D8%A7%D8%AA%D9%8A%D8%A9/ | X posts dated 22/4/1448 | 9 Nov 2026 |
| المدرّس بالمسجد النبوي | Teacher at the Prophet's Mosque | his X bio; his Telegram @rehyli announces a daily lesson after Asr at the Prophet's Mosque, western side (Majmu' al-Fawa'id of as-Sa'di); SoundCloud bio | current bio; Telegram post undated | 9 Nov 2026 |

Teaching: Masjid Quba (MESH: Jawami' al-Akhbar, Saturday after Dhuhr) and the Prophet's Mosque (his own channels).

Proposed role:
- EN: Professor of Aqidah at the Islamic University of Madinah, and teacher at the Prophet's Mosque and Masjid Quba
- AR: أستاذ العقيدة بالجامعة الإسلامية بالمدينة المنورة، والمدرّس بالمسجد النبوي ومسجد قباء

Proposed facts:
- أستاذ العقيدة بكلية العقيدة والدعوة بالجامعة الإسلامية / Professor of Aqidah at the College of Aqidah and Da'wah, Islamic University of Madinah
- مدرّس في المسجد النبوي / Teacher at the Prophet's Mosque
- (keep the Quba lesson line and al-rehaili.net)
- قناته على تيليجرام @rehyli، وحسابه على إكس @rehyli / Telegram @rehyli, X @rehyli

Confidence: high for the professorship (own X bio, Midad, official biography). Medium for the Prophet's Mosque (his own channels only; not seen on a Presidency page from here).

---

## 15. Dr. Mu'adh ibn Abdurrahim Khujah (د. معاذ بن عبد الرحيم خوجة)

Title: Dr. is correct (IU notices: "د. معاذ بن عبدالرحيم خوجه").

Current positions: none found beyond teaching. No faculty page, rank or administrative post was found.

Background (medium): one of the editors of Ibn Shabbah's «Akhbar al-Madinah» (Dar al-Maymanah, 2022), a set of PhD theses in the Department of Hadith Sciences, College of Hadith, Islamic University (Shamela https://shamela.ws/book/30195).

Teaching:
- Masjid Quba (MESH).
- Islamic University lessons in the Intellectual Awareness Unit program with the Deanship of Student Affairs: «Fadl al-Islam» and «Sharh Nukhbat al-Fikar» (8/7/1446). IU news: https://iu.edu.sa/%D8%AF%D8%B1%D8%B3-%D8%B9%D9%84%D9%85%D9%8A-%D8%A8%D8%B9%D9%86%D9%88%D8%A7%D9%86-%D8%B4%D8%B1%D8%AD-%D9%86%D8%AE%D8%A8%D8%A9-%D8%A7%D9%84%D9%81%D9%83%D8%B1-%D9%84%D9%81%D8%B6%D9%8A%D9%84%D8%A9-%D8%A7%D9%84%D8%B4%D9%8A%D8%AE-%D8%AF-%D9%85%D8%B9%D8%A7%D8%B0-%D8%A8%D9%86-%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D9%83%D8%B1%D9%8A%D9%85-%D8%AE%D9%88%D8%AC%D9%87-%D8%B6%D9%85%D9%86-%D8%A8%D8%B1%D8%A7%D9%85%D8%AC-%D9%88%D8%AD%D8%AF%D8%A9-%D8%A7%D9%84%D8%AA%D9%88%D8%B9%D9%8A%D8%A9-%D8%A7%D9%84%D9%81%D9%83%D8%B1%D9%8A%D8%A9-%D8%A8%D8%A7%D9%84%D8%AA%D8%B9%D8%A7%D9%88%D9%86-%D9%85%D8%B9-%D8%B9%D9%85%D8%A7%D8%AF%D8%A9-%D8%B4%D9%88%D9%88%D9%86-%D8%A7%D9%84%D8%B7%D9%84%D8%A7%D8%A8 (January 2025).

Proposed role:
- EN: Teacher at Masjid Quba
- AR: مدرّس في مسجد قباء

Proposed facts:
- يدرّس في مسجد قباء / Teaches at Masjid Quba
- يقدّم دروسًا علمية بالجامعة الإسلامية ضمن برامج وحدة التوعية الفكرية / Gives lessons at the Islamic University in the Intellectual Awareness Unit program
- قناته الرسمية على تيليجرام @muath_khoja، وحسابه على إكس @muath_khoja / Official Telegram @muath_khoja, X @muath_khoja (channels named in docs/research/shaykh-photos.md)

Confidence: high for the IU lessons (IU news). Position at the university: open question.

---

## 16. Dr. Ahmad ibn Sabir al-Ghamidi (د. أحمد بن صابر الغامدي)

Title: Dr. is correct (Associate Professor).

Current positions:
| Arabic | English | Source | Source date | Checked |
|---|---|---|---|---|
| وكيل كلية العقيدة والدعوة للتطوير والجودة | Vice-Dean of the College of Aqidah and Da'wah for Development and Quality, Islamic University of Madinah | IU news: https://iu.edu.sa/news1448314 ; College X post: https://x.com/DaawaFaculty/status/2092928774706802979 | 27 Aug 2026 | 9 Nov 2026 |
| أستاذ مشارك بقسم العقيدة | Associate Professor in the Department of Aqidah | College X post on his promotion: https://x.com/DaawaFaculty/status/2001686128617771400 | 18 Dec 2025 | 9 Nov 2026 |
| عضو وحدة التوعية الفكرية بالجامعة الإسلامية | Member of the Intellectual Awareness Unit at the Islamic University | IU news on 8 lectures in the al-Ula da'wah program (already in MESH) | undated | 9 Nov 2026 |

Former notable: led Taraweeh at Masjid Quba in Ramadan 1442 (College X post 1382083148670963716, 13 April 2021). Not proposed (a single past year).

Teaching: Masjid Quba (two MESH lessons).

Proposed role:
- EN: Vice-Dean of the College of Aqidah and Da'wah for Development and Quality at the Islamic University of Madinah, and teacher at Masjid Quba
- AR: وكيل كلية العقيدة والدعوة للتطوير والجودة بالجامعة الإسلامية بالمدينة المنورة، والمدرّس بمسجد قباء

Proposed facts:
- وكيل كلية العقيدة والدعوة للتطوير والجودة منذ أغسطس ٢٠٢٦م / Vice-Dean of the College of Aqidah and Da'wah for Development and Quality since August 2026
- أستاذ مشارك بقسم العقيدة بالجامعة الإسلامية / Associate Professor in the Department of Aqidah, Islamic University of Madinah
- (keep the Quba lesson line and the Intellectual Awareness Unit line)
- قناته على يوتيوب @Dr-ahmd-algamdi / YouTube @Dr-ahmd-algamdi

Confidence: high (IU news plus the College's account).

---

## 17. Prof. Dr. Umar ibn Muslih al-Husaini (أ. د. عمر بن مصلح الحسيني)

Title: Prof. Dr. is correct (IU: "أستاذ فقه السنة"; YouTube "أ. د.").

Current positions:
| Arabic | English | Source | Source date | Checked |
|---|---|---|---|---|
| أستاذ فقه السنة بكلية الحديث الشريف بالجامعة الإسلامية | Professor of Fiqh al-Sunnah at the College of Hadith, Islamic University of Madinah | IU X post: https://x.com/iu_edu/status/1222470339852107776 ; IU faculty page https://iu.edu.sa/faculty-member900152 | Jan 2020; current page | 9 Nov 2026 |

Teaching: Masjid Quba (MESH, Sunday after Isha).

Proposed role:
- EN: Professor of Fiqh al-Sunnah at the College of Hadith, Islamic University of Madinah, and teacher at Masjid Quba
- AR: أستاذ فقه السنة بكلية الحديث الشريف بالجامعة الإسلامية، والمدرّس بمسجد قباء

Proposed facts:
- أستاذ فقه السنة بكلية الحديث الشريف بالجامعة الإسلامية / Professor of Fiqh al-Sunnah at the College of Hadith, Islamic University of Madinah
- (keep the two lesson lines)
- من مؤلفاته «مكانة السنة النبوية» / His works include «Makanat as-Sunnah an-Nabawiyyah»

Confidence: high (IU account and IU faculty page).

---

## 18. Prof. Dr. Muhammad ibn Bukhayt al-Hujayli (أ. د. محمد بن بخيت الحجيلي)

Title: Prof. Dr. is correct (Ministry and press: "الشيخ الأستاذ الدكتور").

Current positions:
| Arabic | English | Source | Source date | Checked |
|---|---|---|---|---|
| إمام وخطيب مسجد قباء | Imam and Khatib of Masjid Quba | Ministry of Islamic Affairs: https://www.moia.gov.sa/MediaCenter/News/Pages/25081444_9.aspx ; Al Riyadh: https://www.alriyadh.com/2003073 ; Sabq: https://sabq.org/saudia/f2y5n0q6jx | 25/8/1444 (16 March 2023) | 9 Nov 2026 |
| أستاذ بقسم فقه السنة ومصادرها بالجامعة الإسلامية | Professor in the Department of Fiqh al-Sunnah and its Sources, Islamic University of Madinah | press reports of the 2023 appointment (Eremnews, Sarayanews) | March 2023 | 9 Nov 2026 |

Former notable: Imam and Khatib of Jami' al-Ranuna' al-Kabir in Madinah, before his move to Quba (Ministry news above).

Teaching: Masjid Quba (two MESH lessons).

Proposed role: keep, and add the university:
- EN: Imam and Khatib of Masjid Quba, and Professor at the Islamic University of Madinah
- AR: إمام وخطيب مسجد قباء، والأستاذ بالجامعة الإسلامية بالمدينة المنورة

Proposed facts:
- إمام وخطيب مسجد قباء منذ شعبان ١٤٤٤هـ / Imam and Khatib of Masjid Quba since March 2023
- أستاذ بقسم فقه السنة ومصادرها بالجامعة الإسلامية / Professor in the Department of Fiqh al-Sunnah and its Sources, Islamic University of Madinah
- (keep the two lesson lines)

Confidence: high (Ministry release plus Al Riyadh and Sabq).

---

## 19. Prof. Dr. Husayn ibn Ghazi al-Tuwaijri (أ. د. حسين بن غازي التويجري)

Title: Prof. Dr. is correct (Shamela lists his research under "أ. د. حسين بن غازي التويجري"; IU calls him a professor).

Current positions:
| Arabic | English | Source | Source date | Checked |
|---|---|---|---|---|
| أستاذ بقسم فقه السنة ومصادرها بكلية الحديث الشريف والدراسات الإسلامية بالجامعة الإسلامية | Professor in the Department of Fiqh al-Sunnah and its Sources, College of Hadith and Islamic Studies, Islamic University of Madinah | IU faculty page https://iu.edu.sa/faculty-member900200 and College of Hadith staff list; Shamela https://shamela.ws/author/2854 | current | 9 Nov 2026 |

Teaching: Masjid Quba (MESH: commentary on Kitab al-'Ilm of Sahih al-Bukhari, Monday after Isha). He also taught «Umdat al-Ahkam» in the IU scientific courses program (IU news https://iu.edu.sa/news-2121).

Proposed role:
- EN: Professor of Fiqh al-Sunnah at the College of Hadith, Islamic University of Madinah, and teacher at Masjid Quba
- AR: أستاذ فقه السنة بكلية الحديث الشريف بالجامعة الإسلامية، والمدرّس بمسجد قباء

Proposed facts:
- أستاذ بقسم فقه السنة ومصادرها بكلية الحديث الشريف بالجامعة الإسلامية / Professor in the Department of Fiqh al-Sunnah and its Sources, College of Hadith, Islamic University of Madinah
- يدرّس في مسجد قباء / Teaches at Masjid Quba
- موقعه الرسمي hussein-ghazi.org، وقناته على تيليجرام @husseinaltuwaijri / Official website hussein-ghazi.org, Telegram @husseinaltuwaijri

Confidence: high (IU page plus Shamela and his own site).

---

## 20. Prof. Dr. Muhammad ibn Nasir al-Humaid (أ. د. محمد بن ناصر الحميد)

No current position could be confirmed. Searches found only an experts directory entry "أ. د. محمد ناصر الحميد" (PhD in Shariah, Tafsir specialty, 26 years' experience, university not named: https://www.expertsgulf.com/ar-sa/experts/3498afb6-762d-4f61-803c-3ce3e186e89d) and his author page at islamancient.com (articles, no post). Nothing ties him to a named university or office. MESH also spells him two ways: "al-Humaid" in lessons.ts and "al-Humayd" in events.ts.

Teaching: Masjid Quba (Tafsir of Surat al-Baqarah, Tuesday after Maghrib) and a lecture at Masjid al-Qiblatayn on 13/1/1448 (MESH events, source Khizanat al-'Ilm).

Proposed role (no change in substance):
- EN: Teacher at Masjid Quba
- AR: مدرّس في مسجد قباء

Proposed facts:
- يدرّس تفسير سورة البقرة في مسجد قباء / He teaches the Tafsir of Surat al-Baqarah at Masjid Quba

Confidence: low for any position (see open questions).

---

## 21. Prof. Dr. Abdullah ibn Ibrahim al-Luhaydan (أ. د. عبد الله بن إبراهيم اللحيدان)

No current position could be confirmed. Found: an author page "د. عبدالله بن إبراهيم اللحيدان" on Alukah (no post given); a name listing in the King Fahd Complex "Journal of Qur'anic Research and Studies" (role not shown); an Imam Muhammad ibn Saud University news item titled "كلمة أ.د. عبدالله اللحيدان" for National Day 2022 (https://imamu.edu.sa/news/Pages/news_20_9_2022_7.aspx), which may or may not be him. Nothing places him at a Madinah institution.

Teaching: Masjid Quba (commentary on Zad al-Ma'ad, Wednesday after Asr).

Proposed role (no change in substance):
- EN: Teacher at Masjid Quba
- AR: مدرّس في مسجد قباء

Proposed facts:
- يعلّق على «زاد المعاد» لابن القيم في مسجد قباء / He comments on Ibn al-Qayyim's «Zad al-Ma'ad» at Masjid Quba

Confidence: low for any position; the "أ. د." title is also unconfirmed (see open questions).

---

## 22. Dr. Abdullah ibn Abdurrahman al-Ruhayli (د. عبد الله بن عبد الرحمن الرحيلي)

Title: Dr. is correct (his X @ruhaile: "PhD in Aqidah from the Islamic University").

Current positions:
| Arabic | English | Source | Source date | Checked |
|---|---|---|---|---|
| عضو هيئة التدريس بقسم العقيدة بكلية العقيدة والدعوة بالجامعة الإسلامية | Faculty member in the Department of Aqidah, College of Aqidah and Da'wah, Islamic University of Madinah | IU College of Aqidah and Da'wah staff list (https://iu.edu.sa/FacultyofDawahandUsuluddeen/FacultyMembers, lists "عبدالله عبدالرحمن ناجي الرحيلي", Department of Aqidah); IU faculty page https://iu.edu.sa/faculty-member900524 ; his X bio | current list (the list still shows his earlier MA degree) | 9 Nov 2026 |

Teaching: Masjid Quba (Al-Wasiyyah as-Sughra, Wednesday after Isha).

Proposed role:
- EN: Faculty member in the Department of Aqidah at the Islamic University of Madinah, and teacher at Masjid Quba
- AR: عضو هيئة التدريس بقسم العقيدة بالجامعة الإسلامية، والمدرّس بمسجد قباء

Proposed facts:
- عضو هيئة التدريس بقسم العقيدة بكلية العقيدة والدعوة بالجامعة الإسلامية / Faculty member in the Department of Aqidah, College of Aqidah and Da'wah, Islamic University of Madinah
- يشرح «الوصية الصغرى» لابن تيمية في مسجد قباء / He explains Ibn Taymiyyah's «Al-Wasiyyah as-Sughra» at Masjid Quba
- حسابه على إكس @ruhaile / X: @ruhaile

Confidence: medium (IU list plus his own bio; no dated appointment).

---

## 23. Prof. Dr. Mahir ibn Abdurrahim Khujah (أ. د. ماهر بن عبد الرحيم خوجة)

Title: Prof. Dr. is correct (the College and the University address him as "أ. د.").

MESH role is incomplete: it says only "Teacher at Masjid Muhammad ibn Ibrahim at the Islamic University".

Current positions:
| Arabic | English | Source | Source date | Checked |
|---|---|---|---|---|
| عميد كلية العقيدة والدعوة بالجامعة الإسلامية | Dean of the College of Aqidah and Da'wah at the Islamic University of Madinah | IU dean's office page: https://iu.edu.sa/%D9%85%D9%83%D8%AA%D8%A8-%D8%A7%D9%84%D8%B9%D9%85%D9%8A%D8%AF-0 ; College X post in which "the Dean of the College, Prof. Dr. Mahir ibn Abdurrahim Khujah" thanks the former deans Prof. Dr. Badr ibn Muqbil al-Dhafiri and Prof. Dr. Fahd ibn Isa al-Anzi: https://x.com/DaawaFaculty/status/2049726085462409365 ; Al-Madina newspaper: https://www.al-madina.com/article/988229/ ; SPA on the IU international conference (he chaired its organising committee as dean): https://www.spa.gov.sa/N2665124 and Al Riyadh https://www.alriyadh.com/2207750 | X post 30 Apr 2026; Al-Madina 8 May 2026; SPA and Al Riyadh Sept 2026 | 9 Nov 2026 |
| المشرف على وحدة التوعية الفكرية بالجامعة الإسلامية | Supervisor of the Intellectual Awareness Unit at the Islamic University | IU X post: https://x.com/iu_edu/status/1957502767670653021 ; IU unit supervisor page: https://enweb.iu.edu.sa/Departments/IntellectualAwarenessUnit/UnitSupervisor ; Al-Madina (8 May 2026) above | 18 Aug 2025; 8 May 2026 | 9 Nov 2026 |
| رئيس اللجنة المنظمة للمؤتمر الدولي لجهود المملكة العربية السعودية في مواجهة الانحرافات الفكرية | Chair of the organising committee of the International Conference on the Kingdom of Saudi Arabia's Efforts in Confronting Intellectual Deviation (held 27 and 28 September 2026) | SPA N2665124; Sabq https://sabq.org/article/b2rkavo ; Swift News (carrying SPA) | Sept 2026 | 9 Nov 2026 |

When the deanship began: the College's post of 30 April 2026 is his first-person thanks to his predecessors as the new dean, so he took office in spring 2026 (no decision date found). The owner's wording "College of Da'wah" refers to this college; its official name is now College of Aqidah and Da'wah. The owner's "head of intellectual awareness" is, in the University's own wording, supervisor (مشرف) of the Intellectual Awareness Unit.

Teaching: Masjid Muhammad ibn Ibrahim at the Islamic University («Fadl al-Islam», Monday after Isha) and Masjid Quba (Seerah, first Thursday of each month).

Proposed role:
- EN: Dean of the College of Aqidah and Da'wah at the Islamic University of Madinah
- AR: عميد كلية العقيدة والدعوة بالجامعة الإسلامية بالمدينة المنورة

Proposed facts:
- عميد كلية العقيدة والدعوة بالجامعة الإسلامية / Dean of the College of Aqidah and Da'wah at the Islamic University of Madinah
- المشرف على وحدة التوعية الفكرية بالجامعة الإسلامية / Supervisor of the Intellectual Awareness Unit at the Islamic University
- يشرح «فضل الإسلام» في مسجد محمد بن إبراهيم بالجامعة الإسلامية بعد عشاء الاثنين / He explains «Fadl al-Islam» at Masjid Muhammad ibn Ibrahim at the Islamic University after Isha on Mondays
- يقدّم دروسًا في السيرة النبوية بمسجد قباء أول خميس من كل شهر / He gives Seerah lessons at Masjid Quba on the first Thursday of each month
- قناته على تيليجرام @dr_maherkhujah / His Telegram channel: @dr_maherkhujah

Confidence: high (IU page, the College's and the University's X accounts, Al-Madina, SPA, Al Riyadh, Sabq).

---

## 24. Dr. Haytham ibn Muhammad Jamil Sarhan (د. هيثم بن محمد جميل سرحان)

Title: Dr. is correct (his downloads site sarhaan.com: "Shaikh Dr. Haythem Sarhan").

Current positions:
| Arabic | English | Source | Source date | Checked |
|---|---|---|---|---|
| المشرف على معهد السنة | Supervisor of Ma'had as-Sunnah (an online institute of free Islamic courses) | his site https://sarhaan.com/ab/%D9%85%D8%B9%D9%87%D8%AF-%D8%A7%D9%84%D8%B3%D9%86%D8%A9-%D8%A8%D8%A7%D9%95%D8%B4%D8%B1%D8%A7%D9%81-%D8%AF-%D9%87%D9%8A%D8%AB%D9%85-%D8%B3%D8%B1%D8%AD%D8%A7%D9%86/ ; https://mahadsunnah.com/ ; his X @SarhanHaythem | current | 9 Nov 2026 |

Former notable (medium): appointed teacher at the Haram Institute, Prophet's Mosque branch (معهد الحرم النبوي), in 1428 AH, teaching aqidah, fiqh and fara'id (biographies at https://www.mimham.net/che-593 and IslamHouse https://islamhouse.com/ar/author/443254/). Whether he still teaches there is not confirmed, so it is not in the proposed role.

Teaching: Masjid Quba (Ashrat as-Sa'ah, Friday after Asr). One-day courses at Masjid Muhammad ibn Ibrahim at the Islamic University.

Proposed role:
- EN: Supervisor of Ma'had as-Sunnah, and teacher at Masjid Quba
- AR: المشرف على معهد السنة، والمدرّس بمسجد قباء

Proposed facts:
- المشرف على معهد السنة للدورات العلمية / Supervisor of Ma'had as-Sunnah for scholarly courses
- (keep the two Quba lesson lines)
- موقعه sarhaan.com، وقناته على تيليجرام @Sarhaan / Website sarhaan.com, Telegram @Sarhaan

Confidence: medium (his own sites and accounts).

---

## 25. Prof. Dr. Arif ibn Mazid al-Suhaymi (أ. د. عارف بن مزيد السحيمي)

Title: Prof. Dr. is used by the Aqidah research site (https://aqeedamm.com, "أ.د عارف بن مزيد بن حامد السحيمي"), islamancient.com and his recorded lessons ("للأستاذ الدكتور"). Older profiles call him assistant or associate professor. Prof. Dr. stands, medium.

Current positions:
| Arabic | English | Source | Source date | Checked |
|---|---|---|---|---|
| عضو هيئة التدريس بقسم العقيدة بكلية العقيدة والدعوة بالجامعة الإسلامية | Faculty member in the Department of Aqidah, College of Aqidah and Da'wah, Islamic University of Madinah | IU faculty page https://iu.edu.sa/faculty-member900193 ; College staff list https://iu.edu.sa/FacultyofDawahandUsuluddeen/FacultyMembers?after=116 | current | 9 Nov 2026 |

Teaching: Masjid Quba (Al-Arjuzah al-Mi'iyyah, Friday after Maghrib).

Proposed role:
- EN: Professor in the Department of Aqidah at the Islamic University of Madinah, and teacher at Masjid Quba
- AR: الأستاذ بقسم العقيدة بالجامعة الإسلامية بالمدينة المنورة، والمدرّس بمسجد قباء

Proposed facts:
- أستاذ بقسم العقيدة بكلية العقيدة والدعوة بالجامعة الإسلامية / Professor in the Department of Aqidah, College of Aqidah and Da'wah, Islamic University of Madinah
- (keep the existing lesson lines and the Telegram line, which the earlier photo research says is run by his students: "@arifalsuhaimy" could be labelled "a channel of his lessons")

Confidence: high for the IU Aqidah department; medium for the full professor rank.

---

## 26. Prof. Dr. Abdulqadir ibn Ata Sufi (أ. د. عبد القادر بن عطا صوفي)

Name: his full name in official and publisher sources is عبد القادر بن محمد عطا صوفي (Abdulqadir ibn Muhammad Ata Sufi). MESH drops "Muhammad"; "ibn Ata" reads as if Ata were his father.
Title: Prof. Dr. (taseelaqeeda.org and aqeedamm.com "أ.د. عبدالقادر بن محمد عطا صوفي"). Some older profiles say associate professor.

Current positions:
| Arabic | English | Source | Source date | Checked |
|---|---|---|---|---|
| عضو هيئة التدريس بقسم العقيدة بكلية العقيدة والدعوة بالجامعة الإسلامية | Faculty member in the Department of Aqidah, College of Aqidah and Da'wah, Islamic University of Madinah | College staff list https://iu.edu.sa/FacultyofDawahandUsuluddeen/FacultyMembers ; College Telegram @daawafaculty1 lecture notices; Shamela https://shamela.ws/author/1987 | current | 9 Nov 2026 |

Teaching: Masjid Quba (Sharh al-Fatwa al-Hamawiyyah, Friday after Isha).

Proposed role:
- EN: Professor in the Department of Aqidah at the Islamic University of Madinah, and teacher at Masjid Quba
- AR: الأستاذ بقسم العقيدة بالجامعة الإسلامية بالمدينة المنورة، والمدرّس بمسجد قباء

Proposed facts:
- أستاذ بقسم العقيدة بكلية العقيدة والدعوة بالجامعة الإسلامية / Professor in the Department of Aqidah, College of Aqidah and Da'wah, Islamic University of Madinah
- يشرح «الفتوى الحموية» لابن تيمية في مسجد قباء / He explains Ibn Taymiyyah's «Al-Fatwa al-Hamawiyyah» at Masjid Quba
- من مؤلفاته «المفيد في مهمات التوحيد» / His works include «Al-Mufid fi Muhimmat at-Tawhid»

Confidence: high for the IU Aqidah department; medium for the full professor rank.

---

## 27. Shaykh Abdullah ibn Muhammad al-Sa'adi (الشيخ عبدالله بن محمد الساعدي)

Title: MESH has "Shaykh"; the correct academic title is Prof. Dr. (أ. د.). Sources: the IU College of Shariah Fiqh Department page lists "أ.د. عبدالله بن محمد الساعدي" as a professor (https://iu.edu.sa/FacultyofShariah/FiqhDepartment, as recorded in docs/research/shaykh-photos.md); the lesson channel page "صفحة الشيخ أ. د. عبدالله بن محمد الساعدي" (https://www.youtube.com/playlist?list=PLPMH2dm2YEnRnGXwSlJ13IhSsUwFj1W5G). His IU record name is عبدالله محمد عيد الساعدي.

Current positions:
| Arabic | English | Source | Source date | Checked |
|---|---|---|---|---|
| أستاذ بقسم الفقه بكلية الشريعة بالجامعة الإسلامية | Professor in the Department of Fiqh, College of Shariah, Islamic University of Madinah | IU Fiqh Department page above | current | 9 Nov 2026 |

Teaching: Masjid Muhammad ibn Ibrahim at the Islamic University (Kitab al-Kafi of Ibn Qudamah, Tuesday after Maghrib).

Proposed role:
- EN: Professor in the Department of Fiqh at the College of Shariah, Islamic University of Madinah
- AR: الأستاذ بقسم الفقه بكلية الشريعة بالجامعة الإسلامية بالمدينة المنورة

Proposed facts:
- أستاذ بقسم الفقه بكلية الشريعة بالجامعة الإسلامية / Professor in the Department of Fiqh, College of Shariah, Islamic University of Madinah
- (keep the three existing lines)

Confidence: medium (IU department page as read in the October photo research; the page was not reachable from this session).

---

## 28. Dr. Yusuf ibn Muhsin al-Sa'idi (د. يوسف بن محسن السعيدي)

Name: his own materials and the King Fahd National Library catalogue spell the surname الصاعدي (al-Sa'idi with ص), not السعيدي. The Arabic in MESH needs this correction (key in profiles.ts and lessons.ts). Sources: the King Fahd National Library record "الصاعدي، يوسف بن محسن" (https://ecat.kfnl.gov.sa), the lesson channel page "صفحة الشيخ د. يوسف بن محسن الصاعدي" (https://www.youtube.com/playlist?list=PLPMH2dm2YEnQCqAayC7729MyAsqXz82t2) and his recorded explanation of «Mukhtasar at-Tahrir».

Title: Dr. is correct.

Current positions: none found. No university or official post could be confirmed.

Teaching: Jami' Hammad al-Balawi (Mukhtasar at-Tahrir, Sundays). A playlist of his «Al-Waraqat» in usul al-fiqh also exists.

Proposed role: unchanged ("Teacher at Jami' Hammad al-Balawi" / "مدرّس في جامع حماد البلوي").

Proposed facts: keep the current three lines.

Confidence: high for the spelling (national library plus his own lesson pages); low for any position (open question).

---

## 29. Dr. Ghalib ibn Ghazi al-Sa'idi (د. غالب بن غازي السعيدي)

Name: the IU faculty page and the College's posts spell the surname الصاعدي (al-Sa'idi with ص): "غالب غازي عوض الصاعدي". MESH's Arabic السعيدي needs correction.
Title: Dr. is correct.

Current positions:
| Arabic | English | Source | Source date | Checked |
|---|---|---|---|---|
| عضو هيئة التدريس بقسم العقيدة بكلية العقيدة والدعوة بالجامعة الإسلامية | Faculty member in the Department of Aqidah, College of Aqidah and Da'wah, Islamic University of Madinah | IU faculty page https://iu.edu.sa/faculty-member900582 ; College X post: https://x.com/DaawaFaculty/status/1853138334073151747 ; College of Shariah notice of his lecture "أثر القرآن الكريم على القلوب" https://iu.edu.sa/Awareness-15 | 3 Nov 2024 | 9 Nov 2026 |

Teaching: Jami' Hammad al-Balawi (Risalat al-Ubudiyyah, Saturdays).

Proposed role:
- EN: Faculty member in the Department of Aqidah at the Islamic University of Madinah, and teacher at Jami' Hammad al-Balawi
- AR: عضو هيئة التدريس بقسم العقيدة بالجامعة الإسلامية، والمدرّس بجامع حماد البلوي

Proposed facts:
- عضو هيئة التدريس بقسم العقيدة بكلية العقيدة والدعوة بالجامعة الإسلامية / Faculty member in the Department of Aqidah, College of Aqidah and Da'wah, Islamic University of Madinah
- (keep the three lesson lines)
- قناته على تيليجرام «مدارسة القرآن» @modarstalquran / His Telegram channel "Mudarasat al-Qur'an": @modarstalquran

Confidence: high (IU page and the College's account).

---

## 30. Shaykh Maher al-Qahtani (الشيخ ماهر القحطاني)

No Madinah-based scholar of this name could be found. The only Shaykh Maher al-Qahtani in the sources is Shaykh Maher ibn Dhafir al-Qahtani (ماهر بن ظافر القحطاني), whose recorded explanation of Kitab at-Tawhid was given at Jami' al-Rajhi in Makkah (https://www.youtube.com/playlist?list=PLFnok_XhNT_1XjIcILn34fBQG_DLJuNep). Searches for Masjid Dar al-Hijrah return only Prof. Dr. Tariq al-Qahtani's lessons there. Whether the MESH lesson is his visiting monthly lesson, or belongs to another teacher, cannot be settled from public sources.

Proposed role: keep "Teacher at Masjid Dar al-Hijrah" only if the admin confirms the lesson; no position is proposed.

Confidence: low (open question).

---

## 31. Prof. Dr. Tariq al-Qahtani (أ. د. طارق القحطاني)

Name: full name Tariq ibn Sa'id al-Qahtani (طارق بن سعيد القحطاني); the IU page has طارق سعيد عبدالله القحطاني.
Title: Prof. Dr. is correct (his Telegram "قناة أ.د. طارق بن سعيد القحطاني" and site).

Current positions:
| Arabic | English | Source | Source date | Checked |
|---|---|---|---|---|
| أستاذ العقيدة بكلية العقيدة والدعوة بالجامعة الإسلامية | Professor of Aqidah at the College of Aqidah and Da'wah, Islamic University of Madinah | IU faculty page https://iu.edu.sa/faculty-member900601 ; official site https://tariqalqahtany.com/ ; Telegram https://t.me/s/TariqAlQahtany ; Linktree | current | 9 Nov 2026 |

Teaching: Masjid Dar al-Hijrah, al-Faisaliyah (his «Fath al-Wahid as-Samad», Wednesdays).

Proposed role: no change needed (current MESH line is accurate). Optional: add "ibn Sa'id" to the name.

Proposed facts: keep the current three; add
- موقعه الرسمي: tariqalqahtany.com / His official website: tariqalqahtany.com

Confidence: high (IU page plus his official channels).

---

## Other teachers named in the repo

These appear in `src/server/seed/legacy/events.ts` (one-off lectures) and `src/server/seed/content/al-midad.ts` (Al-Midad calendar import). They have no profile cards today, so only name and title corrections and any confirmed post are given.

### Shaykh Salih ibn Muhammad al-Suwayh (الشيخ صالح بن محمد الصويح), events.ts
Name: his own blog, X (@salehalswayeh) and YouTube spell it السويح (with س): Salih ibn Muhammad al-Suwayh. MESH's الصويح needs correction. Sources: https://salehalswayeh.blogspot.com/ ; https://midad.com/scholar/48906. From al-Bukayriyah (Qassim); graduate of the College of Shariah in Qassim. No official post found. Confidence for spelling: high.

### Shaykh Muhammad ibn Ramzan al-Hajiri (الشيخ محمد بن رمزان الهاجري), events.ts
Based in al-Jubail (Eastern Province); MA in Fiqh from Imam Muhammad ibn Saud University (biographies at https://www.mimham.net/che-96 and Midad). Official sites mohammed-ramzan.com and binramzan.net. No official post found. Title "Shaykh" is right. Confidence: medium.

### Prof. Dr. Arif al-Rukabi (أ. د. عارف الركابي), events.ts
Full name Arif ibn Awad al-Rukabi. Professor of Usul al-Fiqh; Okaz (August 2023) names him professor of Usul al-Fiqh at Umm al-Qura University (https://www.okaz.com.sa/news/local/2140741); Al-Sayha reports his Saudi citizenship and his career at Qassim University, Umm al-Qura University and the Makkah Haram College (https://www.assayha.net/87893/). Official site arif-alrikaby.com; Telegram @ArifAlrikaby. Title Prof. Dr. is right. Confidence: medium (2023 is the latest dated source).

### Shaykh Hamad ibn Abdullah al-Hamad (الشيخ حمد بن عبد الله الحمد), events.ts
Preacher (داعية) at the Da'wah and Guidance Centre in Ha'il, Ministry of Islamic Affairs (Shamela https://old.shamela.ws/index.php/author/585). Known for his explanations of Zad al-Mustaqni' and as-Sa'di's fiqh maxims poem. X @t_hamad_alhamad. Confidence: medium (one biography, undated).

### Dr. Abdulhadi ibn Awad al-Omari (د. عبد الهادي بن عوض العمري), events.ts
Sources disagree: Shamela calls him a faculty member in the Department of Aqidah and Contemporary Schools, College of Usul ad-Din, Imam Muhammad ibn Saud University (https://shamela.ws/author/2532); Midad calls him a teacher in the Madinah education administration. He gave a talk for the IU Intellectual Awareness Unit on the Kingdom's efforts in spreading Tawhid (IU news). No position proposed. Confidence: low.

### Usama ibn Zayd al-Madkhali (أسامة بن زيد المدخلي) and Ust. Aisha Ilyas (الأستاذة عائشة إلياس), events.ts
Listed only as speakers at single events; not researched further. No change proposed.

### Shaykh Eid ibn Marzuq al-Yahyawi (الشيخ عيد بن مرزوق اليحيوي), al-midad.ts
Gives lectures in Madinah, including the Masjid Quba weekly lecture series in 1447 ("فضل العمل الصالح"). Some listings add the tribal name al-Harbi. No official post found. Confidence: low for any post.

### Shaykh Abdulilah ibn Abdulaziz al-Rifa'i (الشيخ عبدالإله بن عبدالعزيز الرفاعي), al-midad.ts
Title: his own X account (@alrfaee1433) and Telegram (@alrfaee1440) use "د." (Dr.). Teaches Manhaj as-Salikin of as-Sa'di at Jami' Mus'ad Mubayrik al-Radadi, Wednesday after Maghrib, streamed by Miraath al-Anbiya'. No official post found. Confidence: medium for the title.

### Dr. Munirah bint Sayyaf al-Umari (د. منيرة بنت صياف العمري), al-midad.ts
Only a members' page at an online academy names "الدكتورة منيرة صياف العمري", without details. No position found. Title Dr. kept as in the Al-Midad calendar. Confidence: low.

### Shaykhah Barakah bint Mudayf al-Talhi, Shaykhah Badriyyah bint Muhammad al-Radadi, Shaykhah Jamilah bint Nashi al-Muzayni (al-midad.ts)
No public sources found (as expected for sisters' teachers who do not publish online). Keep the names and titles from the Al-Midad calendar.

---

## Open questions for the admins

**Resolved on 9 Nov 2026 by the official schedule** (`docs/research/duroos-official-schedule-2026-11.md`, the Presidency's own lesson data):
- **Question 1:** the Fada'il al-Qur'an dars belongs to Prof. Dr. Badr ibn Nasir al-Badr, with the same spot, prayer and days. The lesson data is corrected (#88), and his positions are in `mashayikh-positions-2026-11-new.md`.
- **Question 4:** the Presidency writes «د. علي بن فهد أبابطين»: Dr., not Prof. Dr.
- **Question 5:** the Presidency's current lesson data writes «د. صالح بن سعد السحيمي»: Dr.

The other questions stay open.

1. Shaykh Badr ibn Muqbil al-Badr (section 11): no such name exists in any source. Is this Prof. Dr. Badr ibn Nasir al-Badr (teacher at the Prophet's Mosque, Qur'an sciences; fits the Fada'il al-Qur'an lesson) or Prof. Dr. Badr ibn Muqbil al-Dhafiri (former dean of the College of Aqidah and Da'wah)? Please check the original announcement.
2. Shaykh Maher al-Qahtani (section 30): the only known scholar of this name, Maher ibn Dhafir al-Qahtani, teaches in Makkah. Please confirm the teacher of the monthly Kitab at-Tawhid lesson at Masjid Dar al-Hijrah.
3. Prof. Dr. Muhammad ibn Nasir al-Humaid and Prof. Dr. Abdullah ibn Ibrahim al-Luhaydan (sections 20 and 21): no institution or rank found; the "أ. د." titles are unconfirmed. Ask the Quba lesson organisers or the Khizanat al-'Ilm channel for their posts.
4. Prof. Dr. Ali Abu Battin (section 3): the official Haramain page calls him د. (Dr.), not أ. د. Confirm the rank before keeping Prof. Dr.
5. Dr. Salih al-Suhaymi (section 6): a Presidency notice of January 2025 calls him "الأستاذ الدكتور"; his own account uses "د.". Admin choice.
6. Shaykh Abdulmuhsin al-Qasim (section 10): judge at the General Court or at the Court of Appeal in Madinah? Sources differ. Not proposed until confirmed. Also unconfirmed: that he supervises the Qur'an and Sunnah academies at the Prophet's Mosque.
7. Prof. Dr. Abdussalam al-Suhaymi (section 5): his biography lists "head of the advisory board at the Islamic University and adviser to the University President". It is not clear if this is current. Not proposed.
8. Prof. Dr. Mahir Khujah (section 23): one College post congratulates him on being made the official spokesman of the Islamic University; its date could not be read. Not proposed until a dated source is found.
9. Dr. Mu'adh Khujah and Dr. Yusuf al-Sa'idi (sections 15 and 28): no university or official post found.
10. Dr. Haytham Sarhan (section 24): is he still a teacher at the Haram Institute (Prophet's Mosque branch), where he was appointed in 1428 AH?
11. Prof. Dr. Saud al-Khalaf (section 2): his X bio says he heads the Saudi Scientific Society for Aqidah; no dated 2025 or 2026 board notice was found. Proposed at medium; an admin may want to confirm.

---
