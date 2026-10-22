import { Announcement, Localized, PendingPost, TelegramSource } from "../lib/types";

const L = (ar: string, en: string): Localized => ({ ar, en });

export const TELEGRAM_SOURCES: TelegramSource[] = [
  {
    handle: "@drosalmadina",
    name: L("دروس المدينة النبوية", "Duroos al-Madinah an-Nabawiyyah"),
    previewUrl: "https://t.me/s/drosalmadina",
    note: L("المصدر الرئيسي للتحديثات والإعلانات", "Main source of updates and announcements"),
  },
  {
    handle: "@khizana_62",
    name: L("خزانة العلم", "Khizanat al-'Ilm"),
    previewUrl: "https://t.me/s/khizana_62",
    note: L("ينشر أغلب الدروس والبثوث المباشرة", "Posts most of the duroos and live streams"),
  },
  {
    handle: "@sohaymi",
    name: L("فوائد الشيخ د. صالح السحيمي", "Beneficial lessons of Dr. Salih al-Suhaymi"),
    previewUrl: "https://t.me/s/sohaymi",
    note: L("قناة الشيخ صالح السحيمي الرسمية — المصدر المعتمد لإعلاناته", "Shaykh Salih al-Suhaymi's official channel — authoritative source for his announcements"),
  },
  {
    handle: "@dr_maherkhujah",
    name: L("قناة أ. د. ماهر خوجة", "Prof. Dr. Mahir Khujah's channel"),
    previewUrl: "https://t.me/s/dr_maherkhujah",
    note: L("دروس الشيخ ماهر خوجة بالجامعة الإسلامية", "Shaykh Mahir Khujah's lessons at the Islamic University"),
  },
  {
    handle: "@Sulalruhaily",
    name: L("قناة الشيخ سليمان الرحيلي", "Shaykh Sulayman al-Ruhayli's channel"),
    previewUrl: "https://t.me/s/Sulalruhaily",
    note: L("إعلانات ودروس الشيخ سليمان الرحيلي", "Announcements and lessons of Shaykh Sulayman al-Ruhayli"),
  },
  {
    handle: "@twijri",
    name: L("قناة أ. د. علي بن غازي التويجري", "Prof. Dr. Ali al-Tuwaijri's channel"),
    previewUrl: "https://t.me/s/twijri",
    note: L("إعلانات ودروس الشيخ علي التويجري", "Announcements and lessons of Shaykh Ali al-Tuwaijri"),
  },
];

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "quba-sufi-hamawiyyah-cancelled-12-5-1448",
    shaykh: L("أ. د. عبد القادر بن عطا صوفي", "Prof. Dr. Abdulqadir ibn Ata Sufi"),
    text: L(
      "يعتذر الشيخ أ. د. عبدالقادر بن محمد عطا صوفي عن درس الجمعة — شرح الحموية — بعد صلاة العشاء بمسجد قباء، يوم [الجمعة ١٢/٥/١٤٤٨]، لظرف السفر؛ ويُستأنف الدرس يوم [الجمعة ١٩/٥/١٤٤٨] بإذن الله",
      "Shaykh Prof. Abdulqadir bin Muhammad Ata Sufi has excused himself from his Friday lesson — Sharh al-Hamawiyyah — after Isha prayer at Masjid Quba, on [Friday 12/5/1448], due to travel; the lesson resumes on [Friday 19/5/1448], God willing."
    ),
    postedHijri: L("١١/٥/١٤٤٨هـ", "11/5/1448 AH"),
    postedGregorian: L("٢٢ أكتوبر ٢٠٢٦", "22 October 2026"),
    source: "@khizana_62",
    sourceName: L("قناة خزانة العلم", "Khazanat al-Ilm channel"),
    type: "cancellation",
    expired: false,
    eventDate: "2026-10-23",
    masjidId: "quba",
    channelNote: L("إلغاء لجمعة واحدة فقط — من @khizana_62 (المنشور 10897)", "Single-Friday cancellation only — from @khizana_62 (post 10897)"),
  },
  {
    id: "lecture-quba-omari-14480510",
    shaykh: L("د. عبد الهادي بن عوض العمري", "Dr. Abdulhadi bin Awad al-Omari"),
    text: L(
      "محاضرة بعنوان: القدوات الحسنة وأثرها في تثبيت العقيدة الصحيحة — في مسجد قباء، بعد صلاة المغرب، يوم [الأربعاء ١٠/٥/١٤٤٨]",
      "A lecture titled: Righteous Role Models and Their Effect in Firmly Establishing the Correct Creed — at Masjid Quba, on [Wednesday 10/5/1448] after Maghrib prayer"
    ),
    postedHijri: L("١٠/٥/١٤٤٨هـ", "10/5/1448 AH"),
    postedGregorian: L("٢١ أكتوبر ٢٠٢٦", "21 October 2026"),
    source: "@khizana_62",
    sourceName: L("قناة خزانة العلم", "Khazanat al-Ilm channel"),
    type: "lecture",
    expired: false,
    eventDate: "2026-10-21",
    masjidId: "quba",
  },
  {
    id: "ruh-asr-cancelled-9-5-1448",
    shaykh: L("أ. د. سليمان بن سليم الله الرحيلي", "Prof. Dr. Sulayman ibn Saleemullah al-Ruhayli"),
    text: L(
      "يعتذر الشيخ عن درس عصر [الثلاثاء ٩/٥/١٤٤٨هـ] في المسجد النبوي",
      "The shaykh apologizes for the Asr lesson of [Tuesday 9/5/1448 AH] at the Prophet's Mosque"
    ),
    postedHijri: L("الثلاثاء ٩/٥/١٤٤٨هـ", "Tuesday 9/5/1448 AH"),
    postedGregorian: L("٢٠ أكتوبر ٢٠٢٦", "20 October 2026"),
    source: "@drosalmadina",
    sourceName: L("دروس المدينة النبوية", "Duroos al-Madinah an-Nabawiyyah"),
    type: "cancellation",
    expired: false,
    channelNote: L("إشعار ليوم واحد — أثره ينتهي بانتهاء اليوم", "Single-day notice — its effect ends with today"),
  },
  {
    id: "abadr-tawhid-postponed",
    shaykh: L("أ. د. عبد الرزاق بن عبد المحسن البدر", "Prof. Dr. Abdurrazzaq ibn Abdulmuhsin al-Badr"),
    text: L(
      "تم تأجيل التعليق على شرح كتاب التوحيد من تقريرات سماحة الشيخ محمد بن إبراهيم إلى يوم [الثلاثاء ٩/٥/١٤٤٨هـ]",
      "The commentary on the explanation of Kitab al-Tawhid from the reports of Shaykh Muhammad ibn Ibrahim has been postponed to [Tuesday 9/5/1448 AH]"
    ),
    postedHijri: L("الاثنين ٨/٥/١٤٤٨هـ", "Monday 8/5/1448 AH"),
    postedGregorian: L("١٩ أكتوبر ٢٠٢٦", "19 October 2026"),
    source: "@drosalmadina",
    sourceName: L("دروس المدينة النبوية", "Duroos al-Madinah an-Nabawiyyah"),
    type: "postponement",
    expired: false,
    channelNote: L("أثر هذا الإعلان ينتهي اليوم: الدرس قائم الليلة بعد المغرب", "This notice expires today: the lesson is ON tonight after Maghrib"),
  },
  {
    id: "abadr-tawhid-newbook",
    shaykh: L("أ. د. عبد الرزاق بن عبد المحسن البدر", "Prof. Dr. Abdurrazzaq ibn Abdulmuhsin al-Badr"),
    text: L(
      "سيشرع الشيخ في شرح «كتاب التوحيد» من تقريرات سماحة الشيخ محمد بن إبراهيم — يوميًا عدا الجمعة والسبت، بعد صلاة المغرب، في المسجد النبوي (الغربية)",
      "The shaykh will begin the explanation of «Kitab al-Tawhid» from the reports of Shaykh Muhammad ibn Ibrahim — daily except Friday and Saturday, after Maghrib prayer, at the Prophet's Mosque (western side)"
    ),
    postedHijri: L("الأحد ٧/٥/١٤٤٨هـ", "Sunday 7/5/1448 AH"),
    postedGregorian: L("١٨ أكتوبر ٢٠٢٦", "18 October 2026"),
    source: "@drosalmadina",
    sourceName: L("دروس المدينة النبوية", "Duroos al-Madinah an-Nabawiyyah"),
    type: "new-book",
    expired: false,
  },
  {
    id: "suhaymi-cancelled",
    shaykh: L("د. صالح بن سعد السحيمي", "Dr. Salih ibn Sa'd al-Suhaymi"),
    text: L(
      "يعتذر الشيخ عن درس ليلة [الأحد ٧/٥/١٤٤٨هـ]، ودرس [الاثنين ٨/٥/١٤٤٨هـ] قائم بمشيئة الله",
      "The shaykh apologizes for the lesson on the night of [Sunday 7/5/1448 AH]; the [Monday 8/5/1448 AH] lesson will proceed, in sha Allah"
    ),
    postedHijri: L("الأحد ٧/٥/١٤٤٨هـ", "Sunday 7/5/1448 AH"),
    postedGregorian: L("١٨ أكتوبر ٢٠٢٦", "18 October 2026"),
    source: "@sohaymi",
    sourceName: L("فوائد الشيخ د. صالح السحيمي", "Beneficial lessons of Dr. Salih al-Suhaymi"),
    type: "cancellation",
    expired: true,
    channelNote: L("وصل عبر إعادة النشر في @drosalmadina — أثره انتهى بانتهاء تلك الليلة", "Forwarded by @drosalmadina — its effect ended with that night"),
  },
  {
    id: "ruh-asr-cancelled",
    shaykh: L("أ. د. سليمان بن سليم الله الرحيلي", "Prof. Dr. Sulayman ibn Saleemullah al-Ruhayli"),
    text: L(
      "يعتذر الشيخ عن درس عصر [يومٍ في أوائل ٥/١٤٤٨هـ]",
      "The shaykh apologizes for the Asr lesson of [a day in early 5/1448 AH]"
    ),
    postedHijri: L("أوائل ٥/١٤٤٨هـ", "Early 5/1448 AH"),
    postedGregorian: L("منتصف أكتوبر ٢٠٢٦", "Mid-October 2026"),
    source: "@Sulalruhaily",
    sourceName: L("قناة الشيخ سليمان الرحيلي", "Shaykh Sulayman al-Ruhayli's channel"),
    type: "cancellation",
    expired: true,
  },
  {
    id: "tuwaijri-wed-cancelled",
    shaykh: L("أ. د. علي بن غازي التويجري", "Prof. Dr. Ali ibn Ghazi al-Tuwaijri"),
    text: L(
      "يعتذر الشيخ عن درس [يوم الأربعاء من أسبوع نحو ٢٤/٤/١٤٤٨هـ] في المسجد النبوي، ودرس [يوم الخميس] قائم ومستمر بعد المغرب وبعد العشاء",
      "The shaykh apologizes for the [Wednesday of the week of ~24/4/1448 AH] lesson at the Prophet's Mosque; the [Thursday] lessons continue as usual after Maghrib and after Isha"
    ),
    postedHijri: L("أسبوع نحو ٢٤/٤/١٤٤٨هـ", "Week of ~24/4/1448 AH"),
    postedGregorian: L("أوائل أكتوبر ٢٠٢٦", "Early October 2026"),
    source: "@twijri",
    sourceName: L("قناة أ. د. علي بن غازي التويجري", "Prof. Dr. Ali al-Tuwaijri's channel"),
    type: "cancellation",
    expired: true,
    channelNote: L("أقيمت الدروس اللاحقة كالمعتاد (الأربعاء ٣/٥ والخميس ٤/٥)", "Later lessons were held normally (Wednesday 3/5 and Thursday 4/5)"),
  },
  {
    id: "maher-fadl-started",
    shaykh: L("أ. د. ماهر بن عبد الرحيم خوجة", "Prof. Dr. Mahir ibn Abdurrahim Khujah"),
    text: L(
      "بدأ الشيخ الدرس الأول من شرح «فضل الإسلام» يوم [الاثنين ٨/٥/١٤٤٨هـ] بعد صلاة العشاء في مسجد محمد بن إبراهيم بالجامعة الإسلامية",
      "The shaykh began the first lesson of the explanation of «Fadl al-Islam» on [Monday 8/5/1448 AH] after Isha at Masjid Muhammad ibn Ibrahim, Islamic University"
    ),
    postedHijri: L("الاثنين ٨/٥/١٤٤٨هـ", "Monday 8/5/1448 AH"),
    postedGregorian: L("١٩ أكتوبر ٢٠٢٦", "19 October 2026"),
    source: "@dr_maherkhujah",
    sourceName: L("قناة أ. د. ماهر خوجة", "Prof. Dr. Mahir Khujah's channel"),
    type: "new-book",
    expired: false,
    channelNote: L("القناة كتبت ٩/٥ سهوًا — اليوم كان يوم الاثنين", "The channel wrote 9/5 by mistake — the day was Monday"),
  },
  {
    id: "abadr-tanbihat-finished",
    shaykh: L("أ. د. عبد الرزاق بن عبد المحسن البدر", "Prof. Dr. Abdurrazzaq ibn Abdulmuhsin al-Badr"),
    text: L(
      "ختم الشيخ مغرب [يوم الأحد ٣٠/٤/١٤٤٨هـ] التعليق على «التنبيهات السنية على العقيدة الواسطية»، ويتوقف درس المغرب والفجر مع الاستئناف [يوم الأحد ٧/٥/١٤٤٨هـ]",
      "The shaykh completed the commentary on «At-Tanbihat as-Saniyyah 'ala al-Aqidah al-Wasitiyyah» on [Sunday 30/4/1448 AH] at Maghrib; the Maghrib and Fajr lessons pause, resuming [Sunday 7/5/1448 AH]"
    ),
    postedHijri: L("الأحد ٣٠/٤/١٤٤٨هـ", "Sunday 30/4/1448 AH"),
    postedGregorian: L("١١ أكتوبر ٢٠٢٦", "11 October 2026"),
    source: "@drosalmadina",
    sourceName: L("دروس المدينة النبوية", "Duroos al-Madinah an-Nabawiyyah"),
    type: "book-finished",
    expired: true,
  },
  {
    id: "quba-friday-held",
    shaykh: L("مشايخ مسجد قباء", "Shuyukh of Masjid Quba"),
    text: L(
      "أُقيمت دروس [يوم الجمعة ٥/٥/١٤٤٨هـ] بمسجد قباء كالمعتاد: المجلس الخامس من أشراط الساعة للشيخ هيثم سرحان، والمجلس الثاني والعشرون من شرح الفتوى الحموية للشيخ عبد القادر صوفي، والمجلس السابع من شرح الأرجوزة المئية للشيخ عارف السحيمي",
      "The lessons of [Friday 5/5/1448 AH] at Masjid Quba were held as usual: Majlis 5 of Ashrat as-Sa'ah by Shaykh Haytham Sarhan, Majlis 22 of the Hamawiyyah explanation by Shaykh Abdulqadir Sufi, and Majlis 7 of the Arjuzah al-Mi'iyyah commentary by Shaykh Arif al-Suhaymi"
    ),
    postedHijri: L("الجمعة ٥/٥/١٤٤٨هـ", "Friday 5/5/1448 AH"),
    postedGregorian: L("١٦ أكتوبر ٢٠٢٦", "16 October 2026"),
    source: "@khizana_62",
    sourceName: L("خزانة العلم", "Khizanat al-'Ilm"),
    type: "info",
    expired: true,
  },
];

export const PENDING_POSTS: PendingPost[] = [
  {
    id: "p1",
    source: "@khizana_62",
    sourceName: L("خزانة العلم", "Khizanat al-'Ilm"),
    preview: L("المجلس (٥) سلسلة أشراط الساعة من الكتاب والسنة — الشيخ د. هيثم بن محمد جميل سرحان — مسجد قباء", "Majlis (5) of the Ashrat as-Sa'ah series — Dr. Haytham ibn Muhammad Jamil Sarhan — Masjid Quba"),
    receivedAt: L("قبل ساعات", "Hours ago"),
  },
  {
    id: "p2",
    source: "@khizana_62",
    sourceName: L("خزانة العلم", "Khizanat al-'Ilm"),
    preview: L("المجلس (٢٢) شرح الفتوى الحموية — الشيخ أ. د. عبد القادر بن محمد عطا صوفي — مسجد قباء", "Majlis (22) of the Hamawiyyah explanation — Prof. Dr. Abdulqadir ibn Muhammad Ata Sufi — Masjid Quba"),
    receivedAt: L("قبل يوم", "A day ago"),
  },
  {
    id: "p3",
    source: "@khizana_62",
    sourceName: L("خزانة العلم", "Khizanat al-'Ilm"),
    preview: L("المجلس (٧) شرح الأرجوزة المئية في ذكر حال أشرف البرية — الشيخ أ. د. عارف بن مزيد السحيمي — مسجد قباء", "Majlis (7) of the Arjuzah al-Mi'iyyah commentary — Prof. Dr. Arif ibn Mazid al-Suhaymi — Masjid Quba"),
    receivedAt: L("قبل يومين", "Two days ago"),
  },
];
