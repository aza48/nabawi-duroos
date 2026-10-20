import { Localized } from "../lib/types";

const L = (ar: string, en: string): Localized => ({ ar, en });

export interface ShaykhProfile {
  /** Portrait shown on the profile card (path under /public). */
  photo: string;
  /** One-line role shown under the name. */
  role: Localized;
  /** Short verified facts, shown as a list beside the photo. */
  facts: Localized[];
}

/** Keyed by the shaykh's Arabic name, exactly as used in lessons/announcements.
    Portraits were identity-verified against their sources (nameplates, captions,
    official pages) in October 2026; shuyukh with no verifiable photo have no entry. */
export const SHAYKH_PROFILES: Record<string, ShaykhProfile> = {
  "أ. د. سليمان بن سليم الله الرحيلي": {
    photo: "/images/ruhaily.png",
    role: L(
      "أستاذ كرسي الفتوى وضوابطها بالجامعة الإسلامية بالمدينة المنورة",
      "Professor of the Chair of Fatwa and its Principles at the Islamic University of Madinah"
    ),
    facts: [
      L("مدرّس في المسجد النبوي الشريف", "A teacher at the Prophet's Mosque"),
      L(
        "من دروسه في المسجد النبوي: شرح «دليل الطالب» وشرح «صحيح الترغيب والترهيب» بعد صلاة العصر، وشرح «كتاب التوحيد» بعد فجر يوم السبت",
        "His lessons at the Prophet's Mosque include explanations of «Dalil al-Talib» and «Sahih al-Targhib wat-Tarhib» after Asr, and «Kitab al-Tawhid» after Fajr on Saturdays"
      ),
      L("موقعه الرسمي: sualruhaily.com", "His official website: sualruhaily.com"),
      L("قناته على تيليجرام: @Sulalruhaily", "His Telegram channel: @Sulalruhaily"),
    ],
  },
  "أ. د. عبد الرزاق بن عبد المحسن البدر": {
    photo: "/images/abdurrazzaq-al-badr.png",
    role: L("مدرّس في المسجد النبوي", "Teacher at the Prophet's Mosque"),
    facts: [
      L(
        "يُدرّس في المسجد النبوي (الجهة الغربية): تفسير السعدي بعد الفجر، وشرح كتاب التوحيد من تقريرات الشيخ محمد بن إبراهيم بعد المغرب، يوميًا عدا الجمعة والسبت",
        "He teaches at the Prophet's Mosque (western side): Tafsir as-Sa'di after Fajr, and the explanation of Kitab al-Tawhid from the reports of Shaykh Muhammad ibn Ibrahim after Maghrib, daily except Friday and Saturday"
      ),
      L("موقعه الرسمي: al-badr.net", "His official website: al-badr.net"),
      L("تُبث دروسه عبر Mixlr باسم al-badrnet", "His lessons stream on Mixlr as al-badrnet"),
    ],
  },
  "د. صالح بن سعد السحيمي": {
    photo: "/images/salih-as-suhaymi.png",
    role: L(
      "مفوّض الإفتاء بمنطقة المدينة النبوية سابقًا، والمدرّس بالحرمين الشريفين",
      "Former Fatwa Delegate for the Madinah region, and teacher in the Two Holy Mosques"
    ),
    facts: [
      L(
        "يدرّس شرح كتاب «المعتقد الصحيح» في المسجد النبوي الشريف، بين الحصوتين",
        "He teaches the explanation of «Al-Mu'taqad as-Sahih» at the Prophet's Mosque, between the two Haswas"
      ),
      L(
        "درسه يومي الأحد والاثنين من كل أسبوع، بعد صلاة المغرب مباشرة",
        "His lesson is every Sunday and Monday, immediately after Maghrib"
      ),
      L("قناته الرسمية على تيليجرام: @sohaymi", "His official Telegram channel: @sohaymi"),
    ],
  },
  "أ. د. علي بن غازي التويجري": {
    photo: "/images/ali-at-tuwaijri.png",
    role: L(
      "الأستاذ المشارك بقسم التفسير وعلوم القرآن",
      "Associate Professor in the Department of Tafsir and Qur'anic Sciences"
    ),
    facts: [
      L(
        "يشرح تفسير ابن كثير في المسجد النبوي يومي الأربعاء والخميس بعد المغرب (الحصوة الثانية، أمام باب عمر)",
        "He teaches Tafsir Ibn Kathir at the Prophet's Mosque on Wednesdays and Thursdays after Maghrib (Second Haswa, in front of Bab Umar)"
      ),
      L(
        "يشرح بلوغ المرام في المسجد النبوي يومي الأربعاء والخميس بعد العشاء (التوسعة الغربية)",
        "He teaches Bulugh al-Maram at the Prophet's Mosque on Wednesdays and Thursdays after Isha (Western Expansion)"
      ),
      L("قناته على تيليجرام: @twijri", "His Telegram channel: @twijri"),
    ],
  },
  "الشيخ علي بن عبد الرحمن الحذيفي": {
    photo: "/images/ali-al-hudhayfi.png",
    role: L("إمام وخطيب المسجد النبوي", "Imam and Khateeb of the Prophet's Mosque"),
    facts: [
      L("يدرّس كتاب نيل الأوطار في المسجد النبوي", "He teaches the book Nayl al-Awtar at the Prophet's Mosque"),
      L(
        "درسه يوم الاثنين بعد صلاة المغرب، بين الحصوتين (التوسعة السعودية الأولى)",
        "His lesson is on Mondays after Maghrib, between the two Haswas (the First Saudi Expansion)"
      ),
    ],
  },
  "الشيخ عبد المحسن بن محمد القاسم": {
    photo: "/images/abdulmuhsin-al-qasim.png",
    role: L("إمام وخطيب المسجد النبوي", "Imam and Khatib of the Prophet's Mosque"),
    facts: [
      L(
        "يدرّس في المسجد النبوي بالتوسعة الشرقية، أمام باب ٣٧",
        "He teaches at the Prophet's Mosque in the Eastern Expansion, in front of Gate 37"
      ),
      L("درسه بعد صلاة العشاء، من الأحد إلى الخميس", "His lesson is after Isha, Sunday to Thursday"),
      L(
        "يشرح حاليًا زاد المستقنع، ضمن سلسلة فقهية يليها بلوغ المرام، ثم الورقات، ثم قواعد الأسماء والصفات",
        "He is currently explaining Zad al-Mustaqni', in a fiqh sequence followed by Bulugh al-Maram, then Al-Waraqat, then Qawa'id al-Asma' wa as-Sifat"
      ),
    ],
  },
  "أ. د. ماهر بن عبد الرحيم خوجة": {
    photo: "/images/maher-khujah.png",
    role: L(
      "مدرّس في مسجد محمد بن إبراهيم بالجامعة الإسلامية",
      "Teacher at Masjid Muhammad ibn Ibrahim at the Islamic University"
    ),
    facts: [
      L(
        "يشرح «فضل الإسلام» للإمام محمد بن عبد الوهاب في مسجد محمد بن إبراهيم بالجامعة الإسلامية، بعد صلاة العشاء من يوم الاثنين",
        "He explains «Fadl al-Islam» by Imam Muhammad ibn Abd al-Wahhab at Masjid Muhammad ibn Ibrahim at the Islamic University, after Isha on Mondays"
      ),
      L(
        "أنهى شرح «كشف الشبهات»، و«فضل الإسلام» هو الكتاب الحالي في سلسلته",
        "He completed the explanation of «Kashf ash-Shubuhat»; «Fadl al-Islam» is the current book in his series"
      ),
      L(
        "يقدّم دروسًا من السيرة النبوية في مسجد قباء بعد مغرب أول خميس من كل شهر",
        "He gives lessons from the Prophetic Seerah at Masjid Quba after Maghrib on the first Thursday of each month"
      ),
      L("قناته على تيليجرام: @dr_maherkhujah", "His Telegram channel: @dr_maherkhujah"),
    ],
  },
  "الشيخ عبد السلام بن محمد الشويعر": {
    photo: "/images/abdussalam-ash-shuwayir.png",
    role: L(
      "أستاذ الفقه المقارن والمدرس بالحرمين الشريفين",
      "Professor of Comparative Fiqh and teacher in the Two Holy Mosques"
    ),
    facts: [
      L(
        "يشرح «الروض المربع شرح زاد المستقنع» في المسجد النبوي بعد مغرب يوم الأربعاء، ويستمر الدرس بعد العشاء",
        "He explains «Ar-Rawd al-Murbi'» (the explanation of Zad al-Mustaqni') at the Prophet's Mosque after Maghrib on Wednesdays, the lesson continuing after Isha"
      ),
      L(
        "يشرح «العقيدة الواسطية» لشيخ الإسلام ابن تيمية في المسجد النبوي بعد مغرب يوم السبت",
        "He explains «Al-Aqidah al-Wasitiyyah» by Shaykh al-Islam Ibn Taymiyyah at the Prophet's Mosque after Maghrib on Saturdays"
      ),
      L(
        "تُقام دروسه في التوسعة الشمالية بالمسجد النبوي — يمين الداخل من باب الملك فهد (٢١)",
        "His lessons are held in the Northern Expansion of the Prophet's Mosque — right of those entering from King Fahd Gate (21)"
      ),
    ],
  },
  "أ. د. محمد بن بخيت الحجيلي": {
    photo: "/images/muhammad-al-hujayli.png",
    role: L("إمام وخطيب مسجد قباء", "Imam and Khatib of Masjid Quba"),
    facts: [
      L(
        "يشرح «سلم الوصول إلى مباحث علم الأصول» للحكمي في مسجد قباء بعد عصر يوم الاثنين",
        "He explains «Sullam al-Wusul» by al-Hakami at Masjid Quba after Asr on Mondays"
      ),
      L(
        "يشرح «اللؤلؤ والمرجان فيما اتفق عليه الشيخان» في مسجد قباء بعد مغرب يوم الاثنين",
        "He explains «Al-Lu'lu' wal-Marjan fi ma Ittafaqa 'alayhi ash-Shaykhan» at Masjid Quba after Maghrib on Mondays"
      ),
    ],
  },
  "أ. د. إبراهيم بن عامر الرحيلي": {
    photo: "/images/ibrahim-ar-ruhayli.png",
    role: L("مدرّس في مسجد قباء", "Teacher at Masjid Quba"),
    facts: [
      L(
        "يدرّس «شرح كتاب جوامع الأخبار» للإمام السعدي في مسجد قباء بعد صلاة الظهر يوم السبت",
        "He teaches the explanation of Imam as-Sa'di's «Jawami' al-Akhbar» at Masjid Quba after Dhuhr on Saturdays"
      ),
      L("موقعه الرسمي: al-rehaili.net", "His official website: al-rehaili.net"),
    ],
  },
  "د. أحمد بن صابر الغامدي": {
    photo: "/images/ahmad-al-ghamdi.png",
    role: L(
      "عضو هيئة التدريس بقسم العقيدة بالجامعة الإسلامية بالمدينة المنورة",
      "Faculty member in the Department of Aqeedah at the Islamic University of Madinah"
    ),
    facts: [
      L(
        "يدرّس «دروس في العقيدة» في مسجد قباء بعد صلاة المغرب أيام الأحد، وفي الخميس الثاني من كل شهر",
        "He teaches «Lessons in Aqeedah» at Masjid Quba after Maghrib on Sundays, and on the second Thursday of each month"
      ),
      L(
        "عضو وحدة التوعية الفكرية بالجامعة الإسلامية",
        "Member of the Intellectual Awareness Unit at the Islamic University"
      ),
      L(
        "يقدّم محاضرات توعوية لرجال أمن المسجد النبوي بالتعاون مع وحدة التوعية الفكرية",
        "He delivers awareness lectures to the Prophet's Mosque security personnel in cooperation with the Intellectual Awareness Unit"
      ),
    ],
  },
  "أ. د. عمر بن مصلح الحسيني": {
    photo: "/images/umar-al-husayni.png",
    role: L("مدرّس في مسجد قباء", "Teacher at Masjid Quba"),
    facts: [
      L(
        "يدرّس «آداب المشي إلى الصلاة» و«فضل الإسلام» للإمام محمد بن عبد الوهاب في مسجد قباء بعد صلاة العشاء يوم الأحد",
        "He teaches «Adab al-Mashy ila as-Salah» and «Fadl al-Islam» by Imam Muhammad ibn Abd al-Wahhab at Masjid Quba after Isha on Sundays"
      ),
      L(
        "من دروسه المنشورة على قناة خزانة العلم: شرح «معاني أذكار الصلاة» بمسجد قباء",
        "Among his lessons published by the Khizanat al-'Ilm channel: an explanation of «The Meanings of the Adhkar of Prayer» at Masjid Quba"
      ),
    ],
  },
  "د. هيثم بن محمد جميل سرحان": {
    photo: "/images/haytham-sarhan.png",
    role: L("مدرّس في مسجد قباء", "Teacher at Masjid Quba"),
    facts: [
      L(
        "يدرّس في مسجد قباء سلسلة «أشراط الساعة من القرآن والسنة» بعد صلاة العصر من يوم الجمعة",
        "He teaches the series «Ashrat as-Sa'ah (Signs of the Hour) from the Qur'an and Sunnah» at Masjid Quba after Asr on Fridays"
      ),
      L(
        "تُنشر إعلانات دروسه في مسجد قباء عبر قناة «خزانة العلم» (@khizana_62)",
        "Announcements of his Masjid Quba lessons are posted by the Khizanat al-'Ilm channel (@khizana_62)"
      ),
    ],
  },
  "أ. د. عارف بن مزيد السحيمي": {
    photo: "/images/arif-as-suhaymi.png",
    role: L("مدرّس في مسجد قباء", "Teacher at Masjid Quba"),
    facts: [
      L(
        "يدرّس في مسجد قباء «التعليق على الأرجوزة المئية في ذكر حال أشرف البرية» بعد صلاة المغرب من يوم الجمعة",
        "He teaches the commentary on «Al-Arjuzah al-Mi'iyyah» at Masjid Quba after Maghrib on Fridays"
      ),
      L(
        "من دروسه المسجلة: شرح «كتاب الأصول الستة» ضمن الدورة العقدية الأولى بالمدينة المنورة",
        "Among his recorded lessons: the explanation of «Kitab al-Usul as-Sittah» in the first creed course held in Madinah"
      ),
      L("قناته على تيليجرام: @arifalsuhaimy", "His Telegram channel: @arifalsuhaimy"),
    ],
  },
  "د. يوسف بن محسن السعيدي": {
    photo: "/images/yusuf-as-saidi.png",
    role: L("مدرّس في جامع حماد البلوي", "Teacher at Jami' Hammad al-Balawi"),
    facts: [
      L(
        "يشرح «مختصر التحرير» لابن النجار الحنبلي في جامع حماد البلوي بالمدينة المنورة",
        "He explains «Mukhtasar at-Tahrir» by Ibn an-Najjar al-Hanbali at Jami' Hammad al-Balawi in Madinah"
      ),
      L("تُعقد دروسه أيام الأحد", "His lessons are held on Sundays"),
      L(
        "دروسه مصوّرة ومنشورة على قناة خزانة العلم في يوتيوب",
        "His lessons are filmed and published on the Khizanat al-'Ilm YouTube channel"
      ),
    ],
  },
  "د. غالب بن غازي السعيدي": {
    photo: "/images/ghalib-as-saidi.png",
    role: L("مدرّس في جامع حماد البلوي", "Teacher at Jami' Hammad al-Balawi"),
    facts: [
      L(
        "يشرح رسالة «العبودية» لابن تيمية في جامع حماد البلوي بالمدينة المنورة",
        "He explains Ibn Taymiyyah's «Risalat al-Ubudiyyah» at Jami' Hammad al-Balawi in Madinah"
      ),
      L(
        "يوم علمي أيام السبت بجلسات بعد العصر والمغرب والعشاء",
        "A Saturday scholarly day with sessions after Asr, Maghrib and Isha"
      ),
      L(
        "بدأت سلسلته المرقّمة في ١/٤/١٤٤٨هـ وما زالت مستمرة",
        "His numbered series began on 1/4/1448 AH and is still ongoing"
      ),
    ],
  },
  "أ. د. طارق القحطاني": {
    photo: "/images/tariq-al-qahtani.png",
    role: L(
      "أستاذ العقيدة بكلية العقيدة والدعوة بالجامعة الإسلامية بالمدينة المنورة",
      "Professor of Aqidah at the College of Aqidah and Da'wah, Islamic University of Madinah"
    ),
    facts: [
      L(
        "يشرح كتابه «فتح الواحد الصمد في أدلة صحيح المعتقد» في مسجد دار الهجرة بالمدينة المنورة",
        "He teaches his own book «Fath al-Wahid as-Samad fi Adillat Sahih al-Mu'taqad» at Masjid Dar al-Hijrah in Madinah"
      ),
      L(
        "تُعقد دروسه أيام الأربعاء وتُبث مباشرة عبر تيليجرام ويوتيوب",
        "His lessons are held on Wednesdays and livestreamed on Telegram and YouTube"
      ),
      L("قناته الرسمية في تيليجرام: @TariqAlQahtany", "His official Telegram channel: @TariqAlQahtany"),
    ],
  },
  "د. عبد اللطيف بن شلوة الشاماني": {
    photo: "/images/abdullatif-ash-shamani-shalwah.png",
    role: L("مدرّس في مسجد قباء", "Teacher at Masjid Quba"),
    facts: [
      L(
        "يعلّق على آيات الأحكام من خلال تفسير السعدي في مسجد قباء",
        "He comments on Ayat al-Ahkam through Tafsir as-Sa'di at Masjid Quba"
      ),
      L(
        "يُعقد درسه أول أحد من كل شهر بعد صلاة المغرب",
        "His lesson is held on the first Sunday of each month, after Maghrib"
      ),
    ],
  },
  "الشيخ عبدالله بن محمد الساعدي": {
    photo: "/images/abdullah-as-saadi.png",
    role: L(
      "مدرّس في مسجد محمد بن إبراهيم بالجامعة الإسلامية",
      "Teacher at Masjid Muhammad ibn Ibrahim at the Islamic University"
    ),
    facts: [
      L(
        "يعلّق على «كتاب الكافي» لابن قدامة المقدسي في مسجد محمد بن إبراهيم بالجامعة الإسلامية",
        "He comments on «Kitab al-Kafi» by Ibn Qudamah al-Maqdisi at Masjid Muhammad ibn Ibrahim at the Islamic University"
      ),
      L("تُعقد دروسه أيام الثلاثاء بعد صلاة المغرب", "His lessons are held on Tuesdays after Maghrib"),
      L(
        "سلسلة دروسه مصوّرة ومنشورة على قناة خزانة العلم في يوتيوب",
        "His lesson series is filmed and published on the Khizanat al-'Ilm YouTube channel"
      ),
    ],
  },
};
