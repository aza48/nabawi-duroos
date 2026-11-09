# The official schedule of duroos at Masjid an-Nabawi (November 2026)

Checked 9 November 2026 by akheeai. Source: the Presidency of Religious Affairs at the Two Holy Mosques publishes its lesson schedule at prh.gov.sa (Masjid an-Nabawi, جداول الدروس العلمية). The page loads its data from a public JSON API, `https://cpd.prh.gov.sa/api/v1/courses?mosque=madinah`, which returns every sitting with the teacher (with his title), the book, the time, the exact spot in the Masjid and a live stream link. This note compares it with MESH's lessons (`src/server/seed/legacy/lessons.ts`; the live database may already hold admin edits).

**Calendar note.** The API dates its sittings in the tabular Hijri calendar (`islamic-civil`), which runs one day behind Umm al-Qura in this period (it calls 9 Nov 2026 the 28th of Jumada al-Ula, Umm al-Qura the 29th). Read with Umm al-Qura, every dars appears one day early; read with the tabular calendar, the weekdays match MESH and the shaykhs' own announcements. Any importer must convert with `islamic-civil`.

**Coverage.** 212 sittings from 1448-05-28 to 1448-06-19 (tabular), about 9 to 30 November 2026, grouped into 32 recurring lessons by 23 teachers in 14 places. All are listed as after a prayer, with no clock times. Live sittings stream on the Presidency's YouTube channel: https://www.youtube.com/@wmngovksa/streams.

## Summary
- **19 official lessons match a MESH lesson** (17 with the same prayer and weekdays, 2 with a difference below).
- **13 official lessons are not in MESH**, by 11 teachers.
- **MESH lessons with no official sitting in these three weeks:** `ruh-dalil` (see below).
- MESH's lessons at Masjid Quba, Masjid Muhammad ibn Ibrahim and other masjids are outside this schedule.

## Corrections for MESH (Lane A data, and Admin > Duroos)
1. **The Fada'il al-Qur'an dars (`badrbadr-sequence`) belongs to Prof. Dr. Badr ibn Nasir al-Badr, not "Badr ibn Muqbil al-Badr".** Same spot (the Second Haswa, in front of Bab Uthman), same prayer (Maghrib) and same days (Saturday, Sunday, Monday). He is now teaching «كتاب الاعتصام بالكتاب والسنة من صحيح البخاري» and «كتاب منهج السالكين». This settles open question 1 of `docs/research/mashayikh-positions-2026-11.md`.
2. **`ruh-dalil` and `ruh-targhib`**: the official schedule lists one Asr sitting on Thursday, Friday and Saturday covering both «صحيح الترغيب والترهيب» and «دليل الطالب», with no Wednesday sitting in these three weeks. MESH has Targhib on Wednesday and Dalil on Thursday to Saturday. Confirm with the shaykh's own channel before merging them.
3. **Tafsir as-Sa'di after Fajr (`abadr-tafsir`)** runs Sunday to Friday (daily except Saturday). MESH has no days set (open owner question), and the shaykh's profile fact says "daily except Friday and Saturday".

## Lessons in the official schedule that MESH does not have
| Teacher (official title) | Book | After | Days | Place | Sittings | Live |
|---|---|---|---|---|---|---|
| الشيخ إبراهيم بن إبراهيم التركي | كتاب شرح عمدة الأحكام للشيخ صالح الفوزان | بعد الفجر | Fri | التوسعة الشمالية يمين باب عمر بن الخطاب رضي الله عنه | 3 |  |
| الشيخ إبراهيم بن إبراهيم التركي | كتاب التوحيد | بعد الفجر | Sat | التوسعة الشمالية يمين باب عمر بن الخطاب رضي الله عنه | 3 |  |
| الشيخ أ.د. عبدالعزيز بن صالح العبيد | تفسير السعدي | بعد المغرب إلى العشاء | Wed | التوسعة الغربية أمام الداخل من باب ( 11 ) | 3 |  |
| الشيخ أ.د. محمد سعد بن احمد اليوبي | كتاب بداية المجتهد | بعد المغرب | Sun, Mon | التوسعة الشمالية يمين باب عمر بن الخطاب رضي الله عنه | 7 |  |
| الشيخ أ.د.عبدالله بن إبراهيم الزاحم | كتاب عمدة الطالب | بعد الفجر | Mon, Wed | التوسعة الشمالية خلف باب عمر بن الخطاب رضي الله عنه | 7 |  |
| الشيخ أ.د.عبدالله بن إبراهيم الزاحم | كتاب العناية بأدلة الكفاية | بعد المغرب | Tue, Wed | التوسعة الشمالية خلف باب عمر بن الخطاب رضي الله عنه | 6 |  |
| الشيخ أ.د.عبدالله بن محمد الأمين | تفسير البغوي | بعد المغرب | Sun, Mon, Tue | التوسعة الغربية أمام الداخل من باب قباء (5) | 10 | yes |
| الشيخ أ.د.محمد بن سيدي الأمين | كتاب الإتقان في علوم القرآن للحافظ جلال الدين عبدالرحمن السيوطي | بعد المغرب | Wed | التوسعة الغربية يمين الداخل من باب قباء ( 5 ) | 3 |  |
| الشيخ أ.د.مسعود بن بشير المحمدي | صحيح مسلم | بعد المغرب | Sun, Mon, Tue, Wed | التوسعة الغربية يسار الداخل من باب قباء  ( 5 ) | 13 |  |
| الشيخ د. علي بن عبد العزيز السديس | كتاب الشرح الممتع على زاد المستقنع لابن عثيمين | بعد المغرب | Tue | التوسعة السعودية الأولى بين الحصوتين | 3 |  |
| الشيخ د.عبدالعزيز بن راجي الصاعدي | كتاب المحرر لابن عبد الهادي | بعد المغرب | Mon, Tue | التوسعة الغربية يمين الداخل من باب قباء (5) | 7 |  |
| الشيخ د.عبدالله بن عبد الرحمن البعيجان | تفسير جزء عم، كتاب الأربعين النووية | بعد المغرب | Wed | التوسعة السعودية الأولى بين الحصوتين | 3 | yes |
| معالي الشيخ د. صالح بن عبدالله العبود | كتاب فتح المجيد شرح كتاب التوحيد | بعد المغرب | Sun, Mon, Tue | التوسعة السعودية الأولى بين باب عمر وباب عثمان رضي الله عنهما | 10 |  |

## Lessons that match MESH (official place wording)
| MESH id | Teacher (official title) | Book | After | Days | Place |
|---|---|---|---|---|---|
| `abadr-tafsir` | الشيخ أ.د.عبدالرزاق بن عبدالمحسن البدر | تفسير السعدي | بعد الفجر | Sun, Mon, Tue, Wed, Thu, Fri | التوسعة الغربية امام الداخل من باب قباء ( 5 ) |
| `abadr-tawhid` | الشيخ أ.د.عبدالرزاق بن عبدالمحسن البدر | كتاب شرح كتاب التوحيد | بعد المغرب | Sun, Mon, Tue, Wed, Thu | التوسعة الغربية امام الداخل من باب قباء ( 5 ) |
| `badrbadr-sequence` | الشيخ أ.د. بدر بن ناصر البدر | كتاب الاعتصام بالكتاب والسنة من صحيح البخاري، كتاب منهج السالكين | بعد المغرب | Sun, Mon, Sat | الحصوة الثانية أمام باب عثمان رضي الله عنه |
| `battin-fath` | الشيخ د. علي بن فهد أبابطين | كتاب فتح الباري | بعد العصر | Tue | التوسعة السعودية الأولى بين الحصوتين |
| `battin-muslim` | الشيخ د. علي بن فهد أبابطين | صحيح مسلم | بعد المغرب | Thu | التوسعة السعودية الأولى بين الحصوتين |
| `battin-tirmidhi` | الشيخ د. علي بن فهد أبابطين | جامع الإمام الترمذي | بعد المغرب | Fri, Sat | التوسعة السعودية الأولى بين الحصوتين |
| `hudhayfi-nayl` | الشيخ د.علي بن عبدالرحمن الحذيفي | كتاب نيل الأوطار من منتقى الأخبار | بعد المغرب | Mon | التوسعة السعودية الأولى بين الحصوتين |
| `khalaf-tadmuriyyah` | الشيخ أ.د. سعود بن عبدالعزيز الخلف | كتاب التدمرية | بعد المغرب | Wed, Thu | التوسعة الشمالية يمين باب عمر بن الخطاب رضي الله عنه |
| `qasim-sequence` | الشيخ د.عبدالمحسن بن محمد القاسم | كتاب زاد المستقنع، كتاب بلوغ المرام، منظومة البيقونية، كتاب قواعد الأسماء والصفات | بعد العشاء | Sun, Mon, Tue, Wed, Thu | التوسعة الشرقية أمام الداخل من باب 37 |
| `ruh-targhib` | الشيخ أ.د.سليمان بن سليم الله الرحيلي | كتاب صحيح الترغيب والترهيب، كتاب دليل الطالب | بعد العصر | Thu, Fri, Sat | التوسعة السعودية الأولى بين باب عمر وباب عثمان رضي الله عنهما |
| `ruh-tawhid` | الشيخ أ.د.سليمان بن سليم الله الرحيلي | كتاب التوحيد | بعد الفجر | Sat | التوسعة الغربية أمام الداخل من باب قباء (5) |
| `shamani-tafsir` | الشيخ د. عبداللطيف بن شلوه الشاماني | تفسير السعدي | بعد المغرب | Tue, Wed, Thu | الحصوة الثانية أمام باب عثمان رضي الله عنه |
| `shuwayir-rawd` | الشيخ أ.د.عبدالسلام بن سالم السحيمي | كتاب الروض المربع شرح زاد المستقنع | بعد المغرب إلى العشاء | Wed | التوسعة الشمالية يمين الداخل من باب الملك فهد رقم (21) |
| `shuwayir-wasitiyyah` | الشيخ أ.د.عبدالسلام بن سالم السحيمي | كتاب العقيدة الواسطية | بعد المغرب | Sat | التوسعة الشمالية يمين الداخل من باب الملك فهد رقم (21) |
| `suhaymi-mutaqad` | الشيخ د. صالح بن سعد السحيمي | كتاب الداء والدواء | بعد المغرب | Sun, Mon | التوسعة السعودية الأولى بين الحصوتين |
| `tahir-adab` | الشيخ أ.د.أنيس بن أحمد طاهر | شرح كتاب الأدب المفرد للأمام البخاري | بعد المغرب | Tue | التوسعة الشمالية يمين الداخل من باب الملك فهد رقم (21) |
| `tahir-fadail` | الشيخ أ.د.أنيس بن أحمد طاهر | شرح كتاب فضائل الصحابة للأمام أحمد | بعد المغرب | Thu | التوسعة الشمالية يمين الداخل من باب الملك فهد رقم (21) |
| `tuwaijri-bulugh` | الشيخ أ.د.علي بن غازي التويجري | كتاب بلوغ المرام | بعد العشاء | Wed, Thu | التوسعة الغربية يمين الداخل من باب قباء ( 5 ) |
| `tuwaijri-kathir` | الشيخ أ.د.علي بن غازي التويجري | تفسير ابن كثير | بعد المغرب | Wed, Thu | الحصوة الثانية أمام باب عمر رضي الله عنه |

## Titles as the Presidency writes them
These are the official titles for the name fixes listed at the top of `MASHAYIKH_POSITIONS` (`src/server/seed/content/mashayikh.ts`):
- الشيخ أ.د. بدر بن ناصر البدر
- الشيخ أ.د. سعود بن عبدالعزيز الخلف
- الشيخ أ.د. عبدالعزيز بن صالح العبيد
- الشيخ أ.د. محمد سعد بن احمد اليوبي
- الشيخ أ.د.أنيس بن أحمد طاهر
- الشيخ أ.د.سليمان بن سليم الله الرحيلي
- الشيخ أ.د.عبدالرزاق بن عبدالمحسن البدر
- الشيخ أ.د.عبدالسلام بن سالم السحيمي
- الشيخ أ.د.عبدالله بن إبراهيم الزاحم
- الشيخ أ.د.عبدالله بن محمد الأمين
- الشيخ أ.د.علي بن غازي التويجري
- الشيخ أ.د.محمد بن سيدي الأمين
- الشيخ أ.د.مسعود بن بشير المحمدي
- الشيخ إبراهيم بن إبراهيم التركي
- الشيخ د. صالح بن سعد السحيمي
- الشيخ د. عبداللطيف بن شلوه الشاماني
- الشيخ د. علي بن عبد العزيز السديس
- الشيخ د. علي بن فهد أبابطين
- الشيخ د.عبدالعزيز بن راجي الصاعدي
- الشيخ د.عبدالله بن عبد الرحمن البعيجان
- الشيخ د.عبدالمحسن بن محمد القاسم
- الشيخ د.علي بن عبدالرحمن الحذيفي
- معالي الشيخ د. صالح بن عبدالله العبود

In particular: Saud al-Khalaf, Anis Tahir and Abdussalam al-Suhaymi are «أ.د.» (Prof. Dr.); Ali al-Hudhayfi and Abdulmuhsin al-Qasim are «د.» (Shaykh Dr.); Ali Abu Battin is «د.» (Dr., not Prof. Dr.), spelled أبابطين; Abdullatif al-Shamani is spelled شلوه.

## Recommendation (needs the owner's yes)
The official API is public, structured and current, and it is the one source that knows every dars at Masjid an-Nabawi. MESH could import it automatically: a daily job that reads the API, converts the dates with the tabular calendar, adds new lessons as drafts for an admin to approve, flags day, place or teacher changes in Admin > Inbox, and links each dars to the live stream when the API marks it live. Until the owner says yes, admins can use the tables above to add the missing lessons and apply the corrections by hand.

## Official photos (for the owner)
Each teacher in the official schedule has a photo published by the Presidency. These shaykhs have no verified photo on MESH yet. The owner decides whether to use them (the rule is verified photos only, and an official source counts as verified):

| MESH slug | Name as the Presidency writes it | Official photo |
|---|---|---|
| `abdulaziz-ibn-raji-al-saidi` | الشيخ د.عبدالعزيز بن راجي الصاعدي | https://cpd.prh.gov.sa/storage/images/Gz010JEOpnTRcxPMkQb5dWv7k5XDhfstOr4T2RCP.png |
| `abdulaziz-ibn-salih-al-ubayd` | الشيخ أ.د. عبدالعزيز بن صالح العبيد | https://cpd.prh.gov.sa/storage/images/3qjSOleYYMS3hUvl2jMTFp3bWVjNzRmoykEnBrhh.jpg |
| `abdullah-ibn-abdurrahman-al-buayjan` | الشيخ د.عبدالله بن عبد الرحمن البعيجان | https://cpd.prh.gov.sa/storage/images/s4YaixuLHQBplOoIGr5kPDzCHXKpNHACCTefHIms.jpg |
| `abdullah-ibn-ibrahim-al-zahim` | الشيخ أ.د.عبدالله بن إبراهيم الزاحم | https://cpd.prh.gov.sa/storage/images/hEI0Ma5LRTKtNzh0VI8ilnWoQUgvJUwV1L1M8sXI.png |
| `abdullah-ibn-muhammad-al-amin` | الشيخ أ.د.عبدالله بن محمد الأمين | https://cpd.prh.gov.sa/storage/images/ia98BaYig9r0G79FF8FehAwf57FZ1Iqc5LFwWpmX.png |
| `ali-ibn-abdulaziz-al-sudais` | الشيخ د. علي بن عبد العزيز السديس | https://cpd.prh.gov.sa/storage/images/QGPrKBn67NBSyNa6FsKgAROVScXjbvI1CP7fG2X8.png |
| `ali-ibn-fahd-abu-battin` | الشيخ د. علي بن فهد أبابطين | https://cpd.prh.gov.sa/storage/images/VSaEAn2lwALR3vPfvfjCdpm7dLvhaUkWGUGliXvF.png |
| `badr-ibn-nasir-al-badr` | الشيخ أ.د. بدر بن ناصر البدر | https://cpd.prh.gov.sa/storage/images/QdyAPOfMVM7l0E58I9pUsrfAIeVnqoApiZRSN8y4.png |
| `ibrahim-ibn-ibrahim-al-turki` | الشيخ إبراهيم بن إبراهيم التركي | https://cpd.prh.gov.sa/storage/images/AD4KM6sVRxngEjv9EFuLzyPzvgpD7Qwfy5xlAb0u.png |
| `masud-ibn-bashir-al-muhammadi` | الشيخ أ.د.مسعود بن بشير المحمدي | https://cpd.prh.gov.sa/storage/images/ZbKmBVmxAeCxMOMUvH3nvTl4rXZR1GZAOCGfop37.jpg |
| `muhammad-ibn-sidi-al-amin` | الشيخ أ.د.محمد بن سيدي الأمين | https://cpd.prh.gov.sa/storage/images/gNEc70jeVuG03XO9ajlhQWsVR4BBX9oyXcEbBZk5.png |
| `muhammad-sad-ibn-ahmad-al-yubi` | الشيخ أ.د. محمد سعد بن احمد اليوبي | https://cpd.prh.gov.sa/storage/images/JLwqNQ3jLIsWftz0tnXOkwbC0r55uswpZyRnFXq0.png |
| `salih-ibn-abdullah-al-abbud` | معالي الشيخ د. صالح بن عبدالله العبود | https://cpd.prh.gov.sa/storage/images/zbLhvh0QwpIWgJv7kD5vSIy0Rhyv5WFtcDXaCzWX.png |
| `saud-ibn-abdulaziz-al-khallaf` | الشيخ أ.د. سعود بن عبدالعزيز الخلف | https://cpd.prh.gov.sa/storage/images/YVBID1AIkbtlZFALlyz2dos8ZrgNZ50AAx5WBoe2.png |

Before adding one, open it and check it against the shaykh's own channel, then save it under `public/images/` and add `photo` to his profile in `src/server/seed/legacy/profiles.ts` (or in Admin > Shaykhs for the live site).
