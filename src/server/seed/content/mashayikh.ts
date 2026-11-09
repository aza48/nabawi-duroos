import { eq } from "drizzle-orm";
import type { Db } from "@/server/db/client";
import { shaykhs } from "@/server/db/schema";
import { record } from "@/server/admin/audit";

/**
 * Each shaykh's current positions: the role line and the verified facts on his profile.
 * Filled from docs/research/mashayikh-positions-2026-11.md (every line has a source there).
 * Keyed by the shaykh's slug. Published to the live site with: npm run shaykh:sync -- --apply
 */
export type ShaykhPosition = {
  roleEn: string;
  roleAr: string;
  facts: { en: string; ar: string }[];
  /** Only when the title in his name is wrong today (for example "Dr." who is now "Prof. Dr."). */
  nameEn?: string;
  nameAr?: string;
};

const F = (ar: string, en: string) => ({ en, ar });

/*
 * Name and title fixes from the research that are NOT applied here (apply them in Admin > Shaykhs).
 * nameAr is never set: the Arabic name is the key that joins profiles.ts, lessons.ts and announcements,
 * so an Arabic fix must change those files and the database row together.
 * nameEn is not set either: the watcher (isOwnChannel in src/server/watcher/sources.ts) and the
 * assistant (shaykhsNamed in src/server/assistant/live.ts) match shaykhs by their English name.
 * If an English name in lessons.ts changes, keep the slug: shaykhSlug strips only "Prof. Dr. Shaykh"
 * in that order, so "Shaykh Dr. ..." would produce a new slug.
 *
 * saud-ibn-abdulaziz-al-khallaf: Prof. Dr. Saud ibn Abdulaziz al-Khalaf / أ. د. سعود بن عبد العزيز الخلف
 * anis-ibn-ahmad-tahir: Prof. Dr. Anis ibn Ahmad Tahir / أ. د. أنيس بن أحمد طاهر
 * abdullah-ibn-muhammad-al-saadi: Prof. Dr. Abdullah ibn Muhammad al-Sa'adi / أ. د. عبدالله بن محمد الساعدي (medium)
 * ali-ibn-abdurrahman-al-hudhayfi: Shaykh Dr. Ali ibn Abdurrahman al-Hudhayfi / الشيخ د. علي بن عبد الرحمن الحذيفي
 * abdulmuhsin-ibn-muhammad-al-qasim: Shaykh Dr. Abdulmuhsin ibn Muhammad al-Qasim / الشيخ د. عبد المحسن بن محمد القاسم
 * abdulqadir-ibn-ata-sufi: Prof. Dr. Abdulqadir ibn Muhammad Ata Sufi / أ. د. عبد القادر بن محمد عطا صوفي
 * yusuf-ibn-muhsin-al-saidi: Arabic surname الصاعدي (with ص), د. يوسف بن محسن الصاعدي
 * ghalib-ibn-ghazi-al-saidi: Arabic surname الصاعدي (with ص), د. غالب بن غازي الصاعدي
 * abdullatif-ibn-shalwah-al-shamani: Arabic شلوه (with ه), د. عبد اللطيف بن شلوه الشاماني
 * ali-ibn-fahd-abu-battin: official pages write د. علي بن فهد أبابطين (Dr., one word); confirm the rank first
 * tariq-al-qahtani: optional full name Prof. Dr. Tariq ibn Sa'id al-Qahtani / أ. د. طارق بن سعيد القحطاني
 * maher-al-qahtani: identity unconfirmed, left out of this map (the "Badr ibn Muqbil al-Badr" dars is Prof. Dr. Badr ibn Nasir al-Badr's, per the official schedule)
 * Not lesson shaykhs: events.ts الصويح should be السويح (al-Suwayh); al-midad.ts الشيخ عبدالإله بن عبدالعزيز الرفاعي is د.
 */
export const MASHAYIKH_POSITIONS: Record<string, ShaykhPosition> = {
  "sulayman-ibn-saleemullah-al-ruhayli": {
    roleEn: "Imam and Khatib of Masjid Quba, and Professor at the Islamic University of Madinah",
    roleAr: "إمام وخطيب مسجد قباء، والأستاذ بالجامعة الإسلامية بالمدينة المنورة",
    facts: [
      F("إمام وخطيب مسجد قباء منذ عام ١٤٤١هـ (٢٠٢٠م)", "Imam and Khatib of Masjid Quba since 1441 AH (2020)"),
      F("أستاذ كرسي الفتوى وضوابطها بالجامعة الإسلامية", "Professor of the Chair of Fatwa and its Principles at the Islamic University of Madinah"),
      F("مدرّس في المسجد النبوي", "Teacher at the Prophet's Mosque"),
      F(
        "من دروسه في المسجد النبوي: شرح «دليل الطالب» وشرح «صحيح الترغيب والترهيب» بعد صلاة العصر، وشرح «كتاب التوحيد» بعد فجر يوم السبت",
        "His lessons at the Prophet's Mosque include explanations of «Dalil al-Talib» and «Sahih al-Targhib wat-Tarhib» after Asr, and «Kitab al-Tawhid» after Fajr on Saturdays"
      ),
      F(
        "موقعه الرسمي sualruhaily.com، وقناته على تيليجرام @Sualruhaily، وحسابه على إكس @solyman24",
        "His official website sualruhaily.com, his Telegram channel @Sualruhaily and his X account @solyman24"
      ),
    ],
  },
  "saud-ibn-abdulaziz-al-khallaf": {
    roleEn: "Professor of Aqidah at the Islamic University of Madinah, and teacher at the Prophet's Mosque",
    roleAr: "أستاذ العقيدة بالجامعة الإسلامية بالمدينة المنورة، والمدرّس بالمسجد النبوي",
    facts: [
      F("أستاذ العقيدة بالجامعة الإسلامية بالمدينة المنورة", "Professor of Aqidah at the Islamic University of Madinah"),
      F("مدرّس في المسجد النبوي", "Teacher at the Prophet's Mosque"),
      F(
        "يشرح «التدمرية» لشيخ الإسلام ابن تيمية في المسجد النبوي بعد المغرب يومي الأربعاء والخميس",
        "He explains «Al-Tadmuriyyah» by Shaykh al-Islam Ibn Taymiyyah at the Prophet's Mosque after Maghrib on Wednesdays and Thursdays"
      ),
      F(
        "قناته الرسمية على تيليجرام @DrSaudAlKhalaf، وحسابه على إكس @saud_alkhalaf8",
        "His official Telegram channel @DrSaudAlKhalaf and his X account @saud_alkhalaf8"
      ),
    ],
  },
  "ali-ibn-fahd-abu-battin": {
    roleEn: "Teacher at the Prophet's Mosque, and faculty member at the College of Hadith, Islamic University of Madinah",
    roleAr: "المدرّس بالمسجد النبوي، وعضو هيئة التدريس بكلية الحديث الشريف بالجامعة الإسلامية",
    facts: [
      F("مدرّس في المسجد النبوي", "Teacher at the Prophet's Mosque"),
      F(
        "عضو هيئة التدريس بقسم فقه السنة ومصادرها بكلية الحديث الشريف بالجامعة الإسلامية",
        "Faculty member in the Department of Fiqh al-Sunnah and its Sources, College of Hadith, Islamic University of Madinah"
      ),
      F(
        "من دروسه في المسجد النبوي: «فتح الباري» و«صحيح مسلم» و«جامع الترمذي»",
        "His lessons at the Prophet's Mosque include «Fath al-Bari», «Sahih Muslim» and «Jami' al-Tirmidhi»"
      ),
      F(
        "يدرّس في مسجد قباء تكملة «بلوغ المرام» و«المحرر» لابن عبد الهادي بعد عصر يوم الأحد",
        "At Masjid Quba he teaches the completion of «Bulugh al-Maram» and «Al-Muharrar» of Ibn Abd al-Hadi after Asr on Sundays"
      ),
    ],
  },
  "anis-ibn-ahmad-tahir": {
    roleEn: "Teacher at the Prophet's Mosque",
    roleAr: "مدرّس في المسجد النبوي الشريف",
    facts: [
      F("مدرّس في المسجد النبوي", "Teacher at the Prophet's Mosque"),
      F(
        "أستاذ بقسم علوم الحديث بكلية الحديث الشريف بالجامعة الإسلامية سابقًا",
        "Former Professor in the Department of Hadith Sciences, College of Hadith, Islamic University of Madinah"
      ),
      F(
        "يشرح «الأدب المفرد» للإمام البخاري في المسجد النبوي بعد صلاة المغرب",
        "He explains «Al-Adab al-Mufrad» by Imam al-Bukhari at the Prophet's Mosque after Maghrib"
      ),
    ],
  },
  "abdussalam-ibn-salim-al-suhaymi": {
    roleEn: "Professor in the Department of Fiqh at the College of Shariah, Islamic University of Madinah, and teacher at the Prophet's Mosque",
    roleAr: "الأستاذ بقسم الفقه بكلية الشريعة بالجامعة الإسلامية بالمدينة المنورة والمدرس بالمسجد النبوي",
    facts: [
      F("أستاذ بقسم الفقه بكلية الشريعة بالجامعة الإسلامية", "Professor in the Department of Fiqh, College of Shariah, Islamic University of Madinah"),
      F("عميد كلية الشريعة بالجامعة الإسلامية سابقًا", "Former Dean of the College of Shariah at the Islamic University of Madinah"),
      F(
        "يشرح «الروض المربع شرح زاد المستقنع» في المسجد النبوي بعد مغرب يوم الأربعاء، ويستمر الدرس بعد العشاء",
        "He explains «Ar-Rawd al-Murbi'» (the explanation of Zad al-Mustaqni') at the Prophet's Mosque after Maghrib on Wednesdays, the lesson continuing after Isha"
      ),
      F(
        "يشرح «العقيدة الواسطية» لشيخ الإسلام ابن تيمية في المسجد النبوي بعد مغرب يوم السبت",
        "He explains «Al-Aqidah al-Wasitiyyah» by Shaykh al-Islam Ibn Taymiyyah at the Prophet's Mosque after Maghrib on Saturdays"
      ),
      F(
        "تُقام دروسه في التوسعة الشمالية بالمسجد النبوي، يمين الداخل من باب الملك فهد (٢١)",
        "His lessons are held in the Northern Expansion of the Prophet's Mosque, right of those entering from King Fahd Gate (21)"
      ),
      F(
        "موقعه الرسمي al-suhaimy.com، وحسابه الرسمي على إكس @Alsuhaimy_net",
        "His official website al-suhaimy.com and his official X account @Alsuhaimy_net"
      ),
    ],
  },
  "salih-ibn-sad-al-suhaymi": {
    roleEn: "Former Fatwa Delegate for the Madinah region, and teacher in the Two Holy Mosques",
    roleAr: "مفوّض الإفتاء بمنطقة المدينة النبوية سابقًا، والمدرّس بالحرمين الشريفين",
    facts: [
      F(
        "مفوّض الإفتاء بمنطقة المدينة المنورة سابقًا، وقد عُيّن عام ١٤٤٣هـ (٢٠٢٢م)",
        "Former Fatwa Delegate for the Madinah region, appointed in 1443 AH (2022)"
      ),
      F(
        "يدرّس شرح كتاب «المعتقد الصحيح» في المسجد النبوي الشريف، بين الحصوتين",
        "He teaches the explanation of «Al-Mu'taqad as-Sahih» at the Prophet's Mosque, between the two Haswas"
      ),
      F("درسه يومي الأحد والاثنين من كل أسبوع، بعد صلاة المغرب مباشرة", "His lesson is every Sunday and Monday, immediately after Maghrib"),
      F(
        "قناته الرسمية على تيليجرام @sohaymi، وحسابه على إكس @SalehAlsohaime",
        "His official Telegram channel @sohaymi and his X account @SalehAlsohaime"
      ),
    ],
  },
  "abdullatif-ibn-shalwah-al-shamani": {
    roleEn: "Teacher at the Prophet's Mosque, and faculty member at the College of Shariah, Islamic University of Madinah",
    roleAr: "المدرّس بالمسجد النبوي، وعضو هيئة التدريس بكلية الشريعة بالجامعة الإسلامية",
    facts: [
      F("مدرّس في المسجد النبوي", "Teacher at the Prophet's Mosque"),
      F(
        "عضو هيئة التدريس بقسم أصول الفقه بكلية الشريعة بالجامعة الإسلامية",
        "Faculty member in the Department of Usul al-Fiqh, College of Shariah, Islamic University of Madinah"
      ),
      F("يعلّق على آيات الأحكام من خلال تفسير السعدي في مسجد قباء", "He comments on Ayat al-Ahkam through Tafsir as-Sa'di at Masjid Quba"),
      F("يُعقد درسه في قباء أول أحد من كل شهر بعد صلاة المغرب", "His Quba lesson is held on the first Sunday of each month, after Maghrib"),
      F(
        "قناته على تيليجرام @SheikhAbdulLateefShamani، وحسابه على إكس @alshamani13",
        "His Telegram channel @SheikhAbdulLateefShamani and his X account @alshamani13"
      ),
    ],
  },
  "ali-ibn-abdurrahman-al-hudhayfi": {
    roleEn: "Imam and Khatib of the Prophet's Mosque",
    roleAr: "إمام وخطيب المسجد النبوي",
    facts: [
      F("إمام وخطيب المسجد النبوي منذ عام ١٤٠٢هـ", "Imam and Khatib of the Prophet's Mosque since 1402 AH"),
      F(
        "رئيس اللجنة العلمية لمراجعة مصحف المدينة النبوية بمجمع الملك فهد لطباعة المصحف الشريف",
        "Head of the Scholarly Committee for Reviewing the Madinah Mushaf at the King Fahd Glorious Qur'an Printing Complex"
      ),
      F("ألقى خطبة يوم عرفة عام ١٤٤٧هـ (٢٠٢٦م)", "Delivered the Arafah khutbah in 1447 AH (2026)"),
      F("يدرّس كتاب نيل الأوطار في المسجد النبوي", "He teaches the book Nayl al-Awtar at the Prophet's Mosque"),
      F(
        "درسه يوم الاثنين بعد صلاة المغرب، بين الحصوتين (التوسعة السعودية الأولى)",
        "His lesson is on Mondays after Maghrib, between the two Haswas (the First Saudi Expansion)"
      ),
    ],
  },
  "ali-ibn-ghazi-al-tuwaijri": {
    roleEn: "Teacher at the Prophet's Mosque, and formerly Professor of Tafsir at the Islamic University of Madinah",
    roleAr: "المدرّس بالمسجد النبوي، وأستاذ التفسير بالجامعة الإسلامية سابقًا",
    facts: [
      F("مدرّس في المسجد النبوي", "Teacher at the Prophet's Mosque"),
      F(
        "أستاذ التفسير بكلية القرآن الكريم بالجامعة الإسلامية سابقًا",
        "Former Professor of Tafsir at the College of the Noble Qur'an, Islamic University of Madinah"
      ),
      F(
        "يشرح تفسير ابن كثير في المسجد النبوي يومي الأربعاء والخميس بعد المغرب (الحصوة الثانية، أمام باب عمر)",
        "He teaches Tafsir Ibn Kathir at the Prophet's Mosque on Wednesdays and Thursdays after Maghrib (Second Haswa, in front of Bab Umar)"
      ),
      F(
        "يشرح بلوغ المرام في المسجد النبوي يومي الأربعاء والخميس بعد العشاء (التوسعة الغربية)",
        "He teaches Bulugh al-Maram at the Prophet's Mosque on Wednesdays and Thursdays after Isha (Western Expansion)"
      ),
      F("موقعه الرسمي ali-ghazi.com، وقناته على تيليجرام @twijri", "His official website ali-ghazi.com and his Telegram channel @twijri"),
    ],
  },
  "abdulmuhsin-ibn-muhammad-al-qasim": {
    roleEn: "Imam and Khatib of the Prophet's Mosque",
    roleAr: "إمام وخطيب المسجد النبوي",
    facts: [
      F("إمام وخطيب المسجد النبوي منذ عام ١٤١٨هـ", "Imam and Khatib of the Prophet's Mosque since 1418 AH"),
      F("يدرّس في المسجد النبوي بالتوسعة الشرقية، أمام باب ٣٧", "He teaches at the Prophet's Mosque in the Eastern Expansion, in front of Gate 37"),
      F("درسه بعد صلاة العشاء، من الأحد إلى الخميس", "His lesson is after Isha, Sunday to Thursday"),
      F(
        "يشرح حاليًا زاد المستقنع، ضمن سلسلة فقهية يليها بلوغ المرام، ثم الورقات، ثم قواعد الأسماء والصفات",
        "He is currently explaining Zad al-Mustaqni', in a fiqh sequence followed by Bulugh al-Maram, then Al-Waraqat, then Qawa'id al-Asma' wa as-Sifat"
      ),
      F("موقعه الرسمي a-alqasim.com", "His official website: a-alqasim.com"),
    ],
  },
  "abdurrazzaq-ibn-abdulmuhsin-al-badr": {
    roleEn: "Teacher at the Prophet's Mosque, and Professor of Aqidah at the Islamic University of Madinah",
    roleAr: "المدرّس بالمسجد النبوي، وأستاذ العقيدة بالجامعة الإسلامية بالمدينة المنورة",
    facts: [
      F("مدرّس في المسجد النبوي منذ عام ١٤٠٦هـ", "Teacher at the Prophet's Mosque since 1406 AH"),
      F("أستاذ بقسم العقيدة بالجامعة الإسلامية", "Professor in the Department of Aqidah at the Islamic University of Madinah"),
      F(
        "يُدرّس في المسجد النبوي (الجهة الغربية): تفسير السعدي بعد الفجر، وشرح كتاب التوحيد من تقريرات الشيخ محمد بن إبراهيم بعد المغرب، يوميًا عدا الجمعة والسبت",
        "He teaches at the Prophet's Mosque (western side): Tafsir as-Sa'di after Fajr, and the explanation of Kitab al-Tawhid from the reports of Shaykh Muhammad ibn Ibrahim after Maghrib, daily except Friday and Saturday"
      ),
      F("موقعه الرسمي al-badr.net، وحسابه على إكس @albadr_net", "His official website al-badr.net and his X account @albadr_net"),
      F("تُبث دروسه عبر Mixlr باسم al-badrnet", "His lessons stream on Mixlr as al-badrnet"),
    ],
  },
  "misad-ibn-musaid-al-husaini": {
    roleEn: "Faculty member at the College of the Noble Qur'an, Islamic University of Madinah, and teacher at Masjid Quba",
    roleAr: "عضو هيئة التدريس بكلية القرآن الكريم بالجامعة الإسلامية، والمدرّس بمسجد قباء",
    facts: [
      F(
        "عضو هيئة التدريس بقسم التفسير بكلية القرآن الكريم بالجامعة الإسلامية",
        "Faculty member in the Department of Tafsir, College of the Noble Qur'an, Islamic University of Madinah"
      ),
      F("يدرّس تفسير السعدي في مسجد قباء بعد صلاة الفجر يوم السبت", "He teaches Tafsir as-Sa'di at Masjid Quba after Fajr on Saturdays"),
      F(
        "قناته الرسمية على تيليجرام @mosedalhosine5، وحسابه على إكس @mosed1122",
        "His official Telegram channel @mosedalhosine5 and his X account @mosed1122"
      ),
    ],
  },
  "ibrahim-ibn-amir-al-ruhayli": {
    roleEn: "Professor of Aqidah at the Islamic University of Madinah, and teacher at the Prophet's Mosque and Masjid Quba",
    roleAr: "أستاذ العقيدة بالجامعة الإسلامية بالمدينة المنورة، والمدرّس بالمسجد النبوي ومسجد قباء",
    facts: [
      F(
        "أستاذ العقيدة بكلية العقيدة والدعوة بالجامعة الإسلامية",
        "Professor of Aqidah at the College of Aqidah and Da'wah, Islamic University of Madinah"
      ),
      F("مدرّس في المسجد النبوي", "Teacher at the Prophet's Mosque"),
      F(
        "يدرّس «شرح كتاب جوامع الأخبار» للإمام السعدي في مسجد قباء بعد صلاة الظهر يوم السبت",
        "He teaches the explanation of Imam as-Sa'di's «Jawami' al-Akhbar» at Masjid Quba after Dhuhr on Saturdays"
      ),
      F(
        "موقعه الرسمي al-rehaili.net، وقناته على تيليجرام وحسابه على إكس @rehyli",
        "His official website al-rehaili.net, and his Telegram channel and X account @rehyli"
      ),
    ],
  },
  "muadh-ibn-abdurrahim-khujah": {
    roleEn: "Teacher at Masjid Quba",
    roleAr: "مدرّس في مسجد قباء",
    facts: [
      F("يدرّس «الأربعين النووية» في مسجد قباء بعد عصر يوم السبت", "He teaches «Al-Arba'in an-Nawawiyyah» at Masjid Quba after Asr on Saturdays"),
      F(
        "يقدّم دروسًا علمية بالجامعة الإسلامية ضمن برامج وحدة التوعية الفكرية",
        "He gives lessons at the Islamic University of Madinah in the Intellectual Awareness Unit program"
      ),
      F(
        "قناته الرسمية على تيليجرام @muath_khoja، وحسابه على إكس @muath_khoja",
        "His official Telegram channel @muath_khoja and his X account @muath_khoja"
      ),
    ],
  },
  "ahmad-ibn-sabir-al-ghamidi": {
    roleEn: "Vice-Dean of the College of Aqidah and Da'wah for Development and Quality at the Islamic University of Madinah, and teacher at Masjid Quba",
    roleAr: "وكيل كلية العقيدة والدعوة للتطوير والجودة بالجامعة الإسلامية بالمدينة المنورة، والمدرّس بمسجد قباء",
    facts: [
      F(
        "وكيل كلية العقيدة والدعوة للتطوير والجودة بالجامعة الإسلامية منذ أغسطس ٢٠٢٦م",
        "Vice-Dean of the College of Aqidah and Da'wah for Development and Quality at the Islamic University of Madinah since August 2026"
      ),
      F("أستاذ مشارك بقسم العقيدة بالجامعة الإسلامية", "Associate Professor in the Department of Aqidah, Islamic University of Madinah"),
      F("عضو وحدة التوعية الفكرية بالجامعة الإسلامية", "Member of the Intellectual Awareness Unit at the Islamic University"),
      F(
        "يدرّس «دروس في العقيدة» في مسجد قباء بعد صلاة المغرب أيام الأحد، وفي الخميس الثاني من كل شهر",
        "He teaches «Lessons in Aqidah» at Masjid Quba after Maghrib on Sundays, and on the second Thursday of each month"
      ),
      F(
        "يقدّم محاضرات توعوية لرجال أمن المسجد النبوي بالتعاون مع وحدة التوعية الفكرية",
        "He delivers awareness lectures to the Prophet's Mosque security personnel in cooperation with the Intellectual Awareness Unit"
      ),
      F("قناته على يوتيوب @Dr-ahmd-algamdi", "His YouTube channel: @Dr-ahmd-algamdi"),
    ],
  },
  "umar-ibn-muslih-al-husaini": {
    roleEn: "Professor of Fiqh al-Sunnah at the College of Hadith, Islamic University of Madinah, and teacher at Masjid Quba",
    roleAr: "أستاذ فقه السنة بكلية الحديث الشريف بالجامعة الإسلامية، والمدرّس بمسجد قباء",
    facts: [
      F(
        "أستاذ فقه السنة بكلية الحديث الشريف بالجامعة الإسلامية",
        "Professor of Fiqh al-Sunnah at the College of Hadith, Islamic University of Madinah"
      ),
      F(
        "يدرّس «آداب المشي إلى الصلاة» و«فضل الإسلام» للإمام محمد بن عبد الوهاب في مسجد قباء بعد صلاة العشاء يوم الأحد",
        "He teaches «Adab al-Mashy ila as-Salah» and «Fadl al-Islam» by Imam Muhammad ibn Abd al-Wahhab at Masjid Quba after Isha on Sundays"
      ),
      F(
        "من دروسه المنشورة على قناة خزانة العلم: شرح «معاني أذكار الصلاة» بمسجد قباء",
        "Among his lessons published by the Khizanat al-'Ilm channel: an explanation of «The Meanings of the Adhkar of Prayer» at Masjid Quba"
      ),
      F("من مؤلفاته «مكانة السنة النبوية»", "His works include «Makanat as-Sunnah an-Nabawiyyah»"),
    ],
  },
  "muhammad-ibn-bukhayt-al-hujayli": {
    roleEn: "Imam and Khatib of Masjid Quba, and Professor at the Islamic University of Madinah",
    roleAr: "إمام وخطيب مسجد قباء، والأستاذ بالجامعة الإسلامية بالمدينة المنورة",
    facts: [
      F("إمام وخطيب مسجد قباء منذ شعبان ١٤٤٤هـ (مارس ٢٠٢٣م)", "Imam and Khatib of Masjid Quba since Sha'ban 1444 AH (March 2023)"),
      F(
        "أستاذ بقسم فقه السنة ومصادرها بالجامعة الإسلامية",
        "Professor in the Department of Fiqh al-Sunnah and its Sources, Islamic University of Madinah"
      ),
      F(
        "يشرح «سلم الوصول إلى مباحث علم الأصول» للحكمي في مسجد قباء بعد عصر يوم الاثنين",
        "He explains «Sullam al-Wusul» by al-Hakami at Masjid Quba after Asr on Mondays"
      ),
      F(
        "يشرح «اللؤلؤ والمرجان فيما اتفق عليه الشيخان» في مسجد قباء بعد مغرب يوم الاثنين",
        "He explains «Al-Lu'lu' wal-Marjan fi ma Ittafaqa 'alayhi ash-Shaykhan» at Masjid Quba after Maghrib on Mondays"
      ),
    ],
  },
  "husayn-ibn-ghazi-al-tuwaijri": {
    roleEn: "Professor of Fiqh al-Sunnah at the College of Hadith, Islamic University of Madinah, and teacher at Masjid Quba",
    roleAr: "أستاذ فقه السنة بكلية الحديث الشريف بالجامعة الإسلامية، والمدرّس بمسجد قباء",
    facts: [
      F(
        "أستاذ بقسم فقه السنة ومصادرها بكلية الحديث الشريف بالجامعة الإسلامية",
        "Professor in the Department of Fiqh al-Sunnah and its Sources, College of Hadith, Islamic University of Madinah"
      ),
      F(
        "يعلّق على «كتاب العلم» من صحيح البخاري في مسجد قباء بعد عشاء يوم الاثنين",
        "He comments on «Kitab al-'Ilm» from Sahih al-Bukhari at Masjid Quba after Isha on Mondays"
      ),
      F(
        "موقعه الرسمي hussein-ghazi.org، وقناته على تيليجرام @husseinaltuwaijri",
        "His official website hussein-ghazi.org and his Telegram channel @husseinaltuwaijri"
      ),
    ],
  },
  "abdullah-ibn-abdurrahman-al-ruhayli": {
    roleEn: "Faculty member in the Department of Aqidah at the Islamic University of Madinah, and teacher at Masjid Quba",
    roleAr: "عضو هيئة التدريس بقسم العقيدة بالجامعة الإسلامية، والمدرّس بمسجد قباء",
    facts: [
      F(
        "عضو هيئة التدريس بقسم العقيدة بكلية العقيدة والدعوة بالجامعة الإسلامية",
        "Faculty member in the Department of Aqidah, College of Aqidah and Da'wah, Islamic University of Madinah"
      ),
      F(
        "يشرح «الوصية الصغرى» لابن تيمية في مسجد قباء بعد عشاء يوم الأربعاء",
        "He explains Ibn Taymiyyah's «Al-Wasiyyah as-Sughra» at Masjid Quba after Isha on Wednesdays"
      ),
      F("حسابه على إكس @ruhaile", "His X account: @ruhaile"),
    ],
  },
  "mahir-ibn-abdurrahim-khujah": {
    roleEn: "Dean of the College of Aqidah and Da'wah and Supervisor of the Intellectual Awareness Unit at the Islamic University of Madinah",
    roleAr: "عميد كلية العقيدة والدعوة والمشرف على وحدة التوعية الفكرية بالجامعة الإسلامية بالمدينة المنورة",
    facts: [
      F("عميد كلية العقيدة والدعوة بالجامعة الإسلامية", "Dean of the College of Aqidah and Da'wah at the Islamic University of Madinah"),
      F("المشرف على وحدة التوعية الفكرية بالجامعة الإسلامية", "Supervisor of the Intellectual Awareness Unit at the Islamic University of Madinah"),
      F(
        "رأس اللجنة المنظمة للمؤتمر الدولي لجهود المملكة العربية السعودية في مواجهة الانحرافات الفكرية، الذي عقدته الجامعة الإسلامية في سبتمبر ٢٠٢٦م",
        "Chaired the organising committee of the Islamic University's international conference on the Kingdom of Saudi Arabia's efforts in confronting intellectual deviation, held in September 2026"
      ),
      F(
        "يشرح «فضل الإسلام» للإمام محمد بن عبد الوهاب في مسجد محمد بن إبراهيم بالجامعة الإسلامية بعد صلاة العشاء من يوم الاثنين، بعد أن أنهى شرح «كشف الشبهات»",
        "He explains «Fadl al-Islam» by Imam Muhammad ibn Abd al-Wahhab at Masjid Muhammad ibn Ibrahim at the Islamic University after Isha on Mondays, having completed «Kashf ash-Shubuhat»"
      ),
      F(
        "يقدّم دروسًا من السيرة النبوية في مسجد قباء بعد مغرب أول خميس من كل شهر",
        "He gives lessons from the Prophetic Seerah at Masjid Quba after Maghrib on the first Thursday of each month"
      ),
      F("قناته على تيليجرام: @dr_maherkhujah", "His Telegram channel: @dr_maherkhujah"),
    ],
  },
  "haytham-ibn-muhammad-jamil-sarhan": {
    roleEn: "Supervisor of Ma'had as-Sunnah, and teacher at Masjid Quba",
    roleAr: "المشرف على معهد السنة، والمدرّس بمسجد قباء",
    facts: [
      F("المشرف على معهد السنة للدورات العلمية", "Supervisor of Ma'had as-Sunnah for scholarly courses"),
      F(
        "يدرّس في مسجد قباء سلسلة «أشراط الساعة من القرآن والسنة» بعد صلاة العصر من يوم الجمعة",
        "He teaches the series «Ashrat as-Sa'ah (Signs of the Hour) from the Qur'an and Sunnah» at Masjid Quba after Asr on Fridays"
      ),
      F(
        "تُنشر إعلانات دروسه في مسجد قباء عبر قناة «خزانة العلم» (@khizana_62)",
        "Announcements of his Masjid Quba lessons are posted by the Khizanat al-'Ilm channel (@khizana_62)"
      ),
      F("موقعه sarhaan.com، وقناته على تيليجرام @Sarhaan", "His website sarhaan.com and his Telegram channel @Sarhaan"),
    ],
  },
  "arif-ibn-mazid-al-suhaymi": {
    roleEn: "Professor in the Department of Aqidah at the Islamic University of Madinah, and teacher at Masjid Quba",
    roleAr: "الأستاذ بقسم العقيدة بالجامعة الإسلامية بالمدينة المنورة، والمدرّس بمسجد قباء",
    facts: [
      F(
        "أستاذ بقسم العقيدة بكلية العقيدة والدعوة بالجامعة الإسلامية",
        "Professor in the Department of Aqidah, College of Aqidah and Da'wah, Islamic University of Madinah"
      ),
      F(
        "يدرّس في مسجد قباء «التعليق على الأرجوزة المئية في ذكر حال أشرف البرية» بعد صلاة المغرب من يوم الجمعة",
        "He teaches the commentary on «Al-Arjuzah al-Mi'iyyah» at Masjid Quba after Maghrib on Fridays"
      ),
      F(
        "من دروسه المسجلة: شرح «كتاب الأصول الستة» ضمن الدورة العقدية الأولى بالمدينة المنورة",
        "Among his recorded lessons: the explanation of «Kitab al-Usul as-Sittah» in the first creed course held in Madinah"
      ),
      F("قناة لدروسه على تيليجرام: @arifalsuhaimy", "A Telegram channel of his lessons: @arifalsuhaimy"),
    ],
  },
  "abdulqadir-ibn-ata-sufi": {
    roleEn: "Professor in the Department of Aqidah at the Islamic University of Madinah, and teacher at Masjid Quba",
    roleAr: "الأستاذ بقسم العقيدة بالجامعة الإسلامية بالمدينة المنورة، والمدرّس بمسجد قباء",
    facts: [
      F(
        "أستاذ بقسم العقيدة بكلية العقيدة والدعوة بالجامعة الإسلامية",
        "Professor in the Department of Aqidah, College of Aqidah and Da'wah, Islamic University of Madinah"
      ),
      F(
        "يشرح «الفتوى الحموية» لابن تيمية في مسجد قباء بعد عشاء يوم الجمعة",
        "He explains Ibn Taymiyyah's «Al-Fatwa al-Hamawiyyah» at Masjid Quba after Isha on Fridays"
      ),
      F("من مؤلفاته «المفيد في مهمات التوحيد»", "His works include «Al-Mufid fi Muhimmat at-Tawhid»"),
    ],
  },
  "abdullah-ibn-muhammad-al-saadi": {
    roleEn: "Professor in the Department of Fiqh at the College of Shariah, Islamic University of Madinah",
    roleAr: "الأستاذ بقسم الفقه بكلية الشريعة بالجامعة الإسلامية بالمدينة المنورة",
    facts: [
      F("أستاذ بقسم الفقه بكلية الشريعة بالجامعة الإسلامية", "Professor in the Department of Fiqh, College of Shariah, Islamic University of Madinah"),
      F(
        "يعلّق على «كتاب الكافي» لابن قدامة المقدسي في مسجد محمد بن إبراهيم بالجامعة الإسلامية",
        "He comments on «Kitab al-Kafi» by Ibn Qudamah al-Maqdisi at Masjid Muhammad ibn Ibrahim at the Islamic University"
      ),
      F("تُعقد دروسه أيام الثلاثاء بعد صلاة المغرب", "His lessons are held on Tuesdays after Maghrib"),
      F(
        "سلسلة دروسه مصوّرة ومنشورة على قناة خزانة العلم في يوتيوب",
        "His lesson series is filmed and published on the Khizanat al-'Ilm YouTube channel"
      ),
    ],
  },
  "ghalib-ibn-ghazi-al-saidi": {
    roleEn: "Faculty member in the Department of Aqidah at the Islamic University of Madinah, and teacher at Jami' Hammad al-Balawi",
    roleAr: "عضو هيئة التدريس بقسم العقيدة بالجامعة الإسلامية، والمدرّس بجامع حماد البلوي",
    facts: [
      F(
        "عضو هيئة التدريس بقسم العقيدة بكلية العقيدة والدعوة بالجامعة الإسلامية",
        "Faculty member in the Department of Aqidah, College of Aqidah and Da'wah, Islamic University of Madinah"
      ),
      F(
        "يشرح رسالة «العبودية» لابن تيمية في جامع حماد البلوي بالمدينة المنورة",
        "He explains Ibn Taymiyyah's «Risalat al-Ubudiyyah» at Jami' Hammad al-Balawi in Madinah"
      ),
      F("يوم علمي أيام السبت بجلسات بعد العصر والمغرب والعشاء", "A Saturday scholarly day with sessions after Asr, Maghrib and Isha"),
      F("بدأت سلسلته المرقّمة في ١/٤/١٤٤٨هـ وما زالت مستمرة", "His numbered series began on 1/4/1448 AH and is still ongoing"),
      F("قناته على تيليجرام «مدارسة القرآن»: @modarstalquran", "His Telegram channel «Mudarasat al-Qur'an»: @modarstalquran"),
    ],
  },
  "tariq-al-qahtani": {
    roleEn: "Professor of Aqidah at the College of Aqidah and Da'wah, Islamic University of Madinah",
    roleAr: "أستاذ العقيدة بكلية العقيدة والدعوة بالجامعة الإسلامية بالمدينة المنورة",
    facts: [
      F(
        "أستاذ العقيدة بكلية العقيدة والدعوة بالجامعة الإسلامية",
        "Professor of Aqidah at the College of Aqidah and Da'wah, Islamic University of Madinah"
      ),
      F(
        "يشرح كتابه «فتح الواحد الصمد في أدلة صحيح المعتقد» في مسجد دار الهجرة بالمدينة المنورة",
        "He teaches his own book «Fath al-Wahid as-Samad fi Adillat Sahih al-Mu'taqad» at Masjid Dar al-Hijrah in Madinah"
      ),
      F("تُعقد دروسه أيام الأربعاء وتُبث مباشرة عبر تيليجرام ويوتيوب", "His lessons are held on Wednesdays and livestreamed on Telegram and YouTube"),
      F(
        "موقعه الرسمي tariqalqahtany.com، وقناته الرسمية في تيليجرام @TariqAlQahtany",
        "His official website tariqalqahtany.com and his official Telegram channel @TariqAlQahtany"
      ),
    ],
  },
  // The 12 teachers added from the official schedule on 9 Nov 2026 (docs/research/mashayikh-positions-2026-11-new.md)
  "badr-ibn-nasir-al-badr": {
    roleEn: "Teacher at the Prophet's Mosque, and graduate studies professor at Imam Muhammad ibn Saud Islamic University",
    roleAr: "المدرّس بالمسجد النبوي، وأستاذ الدراسات العليا بجامعة الإمام محمد بن سعود الإسلامية",
    facts: [
      F("أستاذ الدراسات العليا بقسم القرآن وعلومه في كلية أصول الدين بجامعة الإمام محمد بن سعود الإسلامية", "Graduate studies professor in the Department of the Qur'an and its Sciences, College of Usul al-Din, Imam Muhammad ibn Saud Islamic University"),
      F("رئيس قسم القرآن وعلومه سابقًا", "Former head of the Department of the Qur'an and its Sciences"),
      F("يشرح «كتاب الاعتصام بالكتاب والسنة» من صحيح البخاري و«منهج السالكين» في المسجد النبوي بعد المغرب أيام السبت والأحد والاثنين، في الحصوة الثانية أمام باب عثمان", "He explains «Kitab al-I'tisam bil-Kitab was-Sunnah» from Sahih al-Bukhari and «Manhaj as-Salikin» at the Prophet's Mosque after Maghrib on Saturday, Sunday and Monday, in the Second Haswa facing Bab Uthman"),
      F("موقعه الرسمي badr-albadr.com", "Official website: badr-albadr.com"),
    ],
  },
  "ibrahim-ibn-ibrahim-al-turki": {
    roleEn: "Teacher at the Prophet's Mosque",
    roleAr: "المدرّس بالمسجد النبوي",
    facts: [
      F("مدرّس في المسجد النبوي", "Teacher at the Prophet's Mosque"),
      F("يشرح «عمدة الأحكام» بشرح الشيخ صالح الفوزان بعد فجر الجمعة، و«كتاب التوحيد» بعد فجر السبت، في التوسعة الشمالية يمين باب عمر بن الخطاب", "He explains «Umdat al-Ahkam» with Shaykh Salih al-Fawzan's commentary after Fajr on Friday, and «Kitab at-Tawhid» after Fajr on Saturday, in the Northern Expansion to the right of Bab Umar ibn al-Khattab"),
      F("يلقي محاضرات عامة في سلسلة «من رحاب المسجد النبوي»", "He gives public lectures in the series «From the Courtyards of the Prophet's Mosque»"),
    ],
  },
  "abdulaziz-ibn-salih-al-ubayd": {
    roleEn: "Teacher at the Prophet's Mosque, and Professor of Tafsir and Qur'anic Sciences",
    roleAr: "المدرّس بالمسجد النبوي، وأستاذ التفسير وعلوم القرآن",
    facts: [
      F("مدرّس في المسجد النبوي", "Teacher at the Prophet's Mosque"),
      F("تخرّج في الجامعة الإسلامية بالمدينة المنورة ونال منها الماجستير والدكتوراه في القرآن وعلومه", "He graduated from the Islamic University of Madinah and earned his master's and doctorate there in the Qur'an and its sciences"),
      F("تولّى أمانة المجلس العلمي بالجامعة الإسلامية", "He served as Secretary of the Scientific Council of the Islamic University"),
      F("يشرح «تفسير السعدي» بين المغرب والعشاء يوم الأربعاء في التوسعة الغربية أمام الداخل من باب ١١", "He explains «Tafsir as-Sa'di» between Maghrib and Isha on Wednesday, in the Western Expansion facing Gate 11"),
    ],
  },
  "muhammad-sad-ibn-ahmad-al-yubi": {
    roleEn: "Professor of Usul al-Fiqh at the College of Shariah, Islamic University of Madinah, and teacher at the Prophet's Mosque",
    roleAr: "أستاذ أصول الفقه بكلية الشريعة بالجامعة الإسلامية، والمدرّس بالمسجد النبوي",
    facts: [
      F("أستاذ أصول الفقه بكلية الشريعة بالجامعة الإسلامية بالمدينة المنورة", "Professor of Usul al-Fiqh at the College of Shariah, Islamic University of Madinah"),
      F("مؤلف «مقاصد الشريعة الإسلامية وعلاقتها بالأدلة الشرعية»، وأصله رسالته للدكتوراه", "Author of «Maqasid ash-Shari'ah al-Islamiyyah wa 'Alaqatuha bil-Adillah ash-Shar'iyyah», first written as his doctoral thesis"),
      F("يشرح «بداية المجتهد» في المسجد النبوي بعد المغرب يومي الأحد والاثنين، في التوسعة الشمالية يمين باب عمر بن الخطاب", "He explains «Bidayat al-Mujtahid» at the Prophet's Mosque after Maghrib on Sunday and Monday, in the Northern Expansion to the right of Bab Umar ibn al-Khattab"),
    ],
  },
  "abdullah-ibn-ibrahim-al-zahim": {
    roleEn: "Professor of Fiqh at the College of Shariah, Islamic University of Madinah, and teacher at the Prophet's Mosque",
    roleAr: "أستاذ الفقه بكلية الشريعة بالجامعة الإسلامية، والمدرّس بالمسجد النبوي",
    facts: [
      F("أستاذ بقسم الفقه في كلية الشريعة بالجامعة الإسلامية", "Professor in the Department of Fiqh, College of Shariah, Islamic University of Madinah"),
      F("مدرّس في المسجد النبوي، وتنشر رئاسة الشؤون الدينية شرحه لـ«الكفاية الصغرى» ضمن «دروس الحرمين»", "Teacher at the Prophet's Mosque; the Presidency of Religious Affairs publishes his explanation of «al-Kifayah as-Sughra» in its «Durus al-Haramain» series"),
      F("يشرح «عمدة الطالب» بعد فجر الاثنين والأربعاء، و«العناية بأدلة الكفاية» بعد مغرب الثلاثاء والأربعاء، في التوسعة الشمالية خلف باب عمر بن الخطاب", "He explains «Umdat at-Talib» after Fajr on Monday and Wednesday, and «al-Inayah bi-Adillat al-Kifayah» after Maghrib on Tuesday and Wednesday, in the Northern Expansion behind Bab Umar ibn al-Khattab"),
    ],
  },
  "abdullah-ibn-muhammad-al-amin": {
    roleEn: "Teacher at the Prophet's Mosque, and former faculty member at the Islamic University of Madinah",
    roleAr: "المدرّس بالمسجد النبوي، وعضو هيئة التدريس بالجامعة الإسلامية سابقًا",
    facts: [
      F("مدرّس في المسجد النبوي", "Teacher at the Prophet's Mosque"),
      F("نجل العلامة محمد الأمين الشنقيطي صاحب «أضواء البيان»", "Son of al-Allamah Muhammad al-Amin al-Shinqiti, author of «Adwa' al-Bayan»"),
      F("يشرح «تفسير البغوي» بعد المغرب أيام الأحد والاثنين والثلاثاء في التوسعة الغربية أمام الداخل من باب قباء (٥)، ويُبث مباشرة", "He explains «Tafsir al-Baghawi» after Maghrib on Sunday, Monday and Tuesday, in the Western Expansion facing Bab Quba (Gate 5), streamed live"),
      F("قناته الرسمية على تيليجرام @alshinqiti17", "Official Telegram channel: @alshinqiti17"),
    ],
  },
  "muhammad-ibn-sidi-al-amin": {
    roleEn: "Teacher at the Prophet's Mosque, and former Head of the Department of Qira'at at the Islamic University of Madinah",
    roleAr: "المدرّس بالمسجد النبوي، ورئيس قسم القراءات بالجامعة الإسلامية سابقًا",
    facts: [
      F("مدرّس في المسجد النبوي", "Teacher at the Prophet's Mosque"),
      F("رئيس قسم القراءات بكلية القرآن الكريم بالجامعة الإسلامية سابقًا", "Former Head of the Department of Qira'at, College of the Noble Qur'an, Islamic University of Madinah"),
      F("مؤلف «الوجيز في حكم تجويد الكتاب العزيز» و«الإسناد عند علماء القراءات»", "Author of «al-Wajiz fi Hukm Tajwid al-Kitab al-Aziz» and «al-Isnad 'inda 'Ulama' al-Qira'at»"),
      F("يشرح «الإتقان في علوم القرآن» للسيوطي بعد مغرب الأربعاء في التوسعة الغربية يمين الداخل من باب قباء (٥)", "He explains al-Suyuti's «al-Itqan fi 'Ulum al-Qur'an» after Maghrib on Wednesday, in the Western Expansion to the right of Bab Quba (Gate 5)"),
    ],
  },
  "masud-ibn-bashir-al-muhammadi": {
    roleEn: "Professor at Taibah University, and teacher at the Prophet's Mosque",
    roleAr: "الأستاذ بجامعة طيبة، والمدرّس بالمسجد النبوي",
    facts: [
      F("الأستاذ بقسم الدراسات الإسلامية بجامعة طيبة بالمدينة المنورة", "Professor in the Department of Islamic Studies, Taibah University, Madinah"),
      F("المشرف العام على الدعوة والإرشاد بفرع وزارة الشؤون الإسلامية بالمدينة المنورة سابقًا", "Former General Supervisor of Da'wah and Guidance at the Madinah branch of the Ministry of Islamic Affairs"),
      F("يشرح «صحيح مسلم» بعد المغرب من الأحد إلى الأربعاء في التوسعة الغربية يسار الداخل من باب قباء (٥)", "He explains «Sahih Muslim» after Maghrib from Sunday to Wednesday, in the Western Expansion to the left of Bab Quba (Gate 5)"),
      F("حسابه على إكس @msoudalmohamady", "His X account: @msoudalmohamady"),
    ],
  },
  "ali-ibn-abdulaziz-al-sudais": {
    roleEn: "Teacher at the Prophet's Mosque, and former imam of the Prophet's Mosque",
    roleAr: "المدرّس بالمسجد النبوي، وإمام المسجد النبوي سابقًا",
    facts: [
      F("مدرّس في المسجد النبوي", "Teacher at the Prophet's Mosque"),
      F("أمّ المصلين في المسجد النبوي في عدد من مواسم رمضان، منها عام ١٤١٦هـ", "He led the prayers at the Prophet's Mosque in several Ramadan seasons, including 1416 AH"),
      F("يشرح «الشرح الممتع على زاد المستقنع» لابن عثيمين بعد مغرب الثلاثاء في التوسعة السعودية الأولى بين الحصوتين", "He explains Ibn Uthaymin's «ash-Sharh al-Mumti' 'ala Zad al-Mustaqni'» after Maghrib on Tuesday, in the First Saudi Expansion between the two Haswas"),
    ],
  },
  "abdulaziz-ibn-raji-al-saidi": {
    roleEn: "Faculty member at the College of Hadith, Islamic University of Madinah, and teacher at the Prophet's Mosque",
    roleAr: "عضو هيئة التدريس بكلية الحديث الشريف بالجامعة الإسلامية، والمدرّس بالمسجد النبوي",
    facts: [
      F("عضو هيئة التدريس بقسم فقه السنة ومصادرها في كلية الحديث الشريف بالجامعة الإسلامية", "Faculty member in the Department of Fiqh al-Sunnah and its Sources, College of Hadith, Islamic University of Madinah"),
      F("يشرح «المحرر في أحاديث الأحكام» لابن عبدالهادي بعد المغرب يومي الاثنين والثلاثاء في التوسعة الغربية يمين الداخل من باب قباء (٥)", "He explains Ibn Abd al-Hadi's «al-Muharrar fi Ahadith al-Ahkam» after Maghrib on Monday and Tuesday, in the Western Expansion to the right of Bab Quba (Gate 5)"),
      F("يشارك في الدورات العلمية لموسم الحج في المسجد النبوي", "He teaches in the Hajj-season scholarly courses at the Prophet's Mosque"),
    ],
  },
  "abdullah-ibn-abdurrahman-al-buayjan": {
    roleEn: "Imam and Khatib of the Prophet's Mosque, and faculty member at the Islamic University of Madinah",
    roleAr: "إمام وخطيب المسجد النبوي، وعضو هيئة التدريس بالجامعة الإسلامية بالمدينة المنورة",
    facts: [
      F("إمام وخطيب المسجد النبوي، عُيّن إمامًا بأمر ملكي عام ١٤٣٤هـ", "Imam and Khatib of the Prophet's Mosque, appointed imam by royal order in 1434 AH (2013)"),
      F("عضو هيئة التدريس بقسم الدراسات القضائية في كلية الأنظمة والدراسات القضائية بالجامعة الإسلامية", "Faculty member in the Department of Judicial Studies, College of Regulations and Judicial Studies, Islamic University of Madinah"),
      F("نال الدكتوراه في السياسة الشرعية من المعهد العالي للقضاء بتقدير ممتاز", "He holds a doctorate with distinction in Siyasah Shar'iyyah from the Higher Judicial Institute"),
      F("يشرح «تفسير جزء عم» و«الأربعين النووية» بعد مغرب الأربعاء في التوسعة السعودية الأولى بين الحصوتين، ويُبث مباشرة", "He explains «Tafsir Juz' 'Amma» and «al-Arba'in an-Nawawiyyah» after Maghrib on Wednesday, in the First Saudi Expansion between the two Haswas, streamed live"),
    ],
  },
  "salih-ibn-abdullah-al-abbud": {
    roleEn: "Teacher at the Prophet's Mosque, and former President of the Islamic University of Madinah",
    roleAr: "المدرّس بالمسجد النبوي، ومدير الجامعة الإسلامية بالمدينة المنورة سابقًا",
    facts: [
      F("مدير الجامعة الإسلامية بالمدينة المنورة من عام ١٤١٦هـ إلى عام ١٤٢٨هـ", "President of the Islamic University of Madinah from 1416 to 1428 AH (1995 to 2007)"),
      F("مدرّس في المسجد النبوي بأمر سامٍ منذ عام ١٤١٦هـ", "Teacher at the Prophet's Mosque by royal order since 1416 AH (1996)"),
      F("عميد كلية الدعوة وأصول الدين ورئيس قسم العقيدة بالجامعة الإسلامية سابقًا", "Former Dean of the College of Da'wah and Usul al-Din, and former Head of the Department of Aqidah, at the Islamic University"),
      F("يشرح «فتح المجيد شرح كتاب التوحيد» بعد المغرب أيام الأحد والاثنين والثلاثاء في التوسعة السعودية الأولى بين باب عمر وباب عثمان", "He explains «Fath al-Majid Sharh Kitab at-Tawhid» after Maghrib on Sunday, Monday and Tuesday, in the First Saudi Expansion between Bab Umar and Bab Uthman"),
    ],
  },
};

export type ShaykhChange = { slug: string; field: "role" | "facts" | "name"; before: string; after: string };

/** What a sync would change, without writing. Unknown slugs are reported, never created. */
export async function planShaykhSync(db: Db, positions = MASHAYIKH_POSITIONS, only?: string[]): Promise<{ changes: ShaykhChange[]; missing: string[] }> {
  const changes: ShaykhChange[] = [];
  const missing: string[] = [];
  for (const [slug, p] of Object.entries(positions)) {
    if (only?.length && !only.includes(slug)) continue;
    const [row] = await db.select().from(shaykhs).where(eq(shaykhs.slug, slug));
    if (!row) { missing.push(slug); continue; }
    const role = (en: string | null, ar: string | null) => `${en ?? ""} | ${ar ?? ""}`;
    if (role(row.roleEn, row.roleAr) !== role(p.roleEn, p.roleAr)) changes.push({ slug, field: "role", before: role(row.roleEn, row.roleAr), after: role(p.roleEn, p.roleAr) });
    // Compare facts as (en, ar) pairs: the database may return each fact's keys in another order.
    const pairs = (f: { en: string; ar: string }[]) => JSON.stringify(f.map((x) => [x.en, x.ar]));
    if (pairs(row.facts ?? []) !== pairs(p.facts)) changes.push({ slug, field: "facts", before: `${(row.facts ?? []).length} facts`, after: `${p.facts.length} facts` });
    if ((p.nameEn && p.nameEn !== row.nameEn) || (p.nameAr && p.nameAr !== row.nameAr)) changes.push({ slug, field: "name", before: `${row.nameEn} | ${row.nameAr}`, after: `${p.nameEn ?? row.nameEn} | ${p.nameAr ?? row.nameAr}` });
  }
  return { changes, missing };
}

/** Writes the positions to the live rows, one audit entry per shaykh, so every change can be undone in Activity. */
export async function syncShaykhPositions(db: Db, positions = MASHAYIKH_POSITIONS, only?: string[]): Promise<{ updated: string[]; missing: string[] }> {
  const updated: string[] = [];
  const { missing } = await planShaykhSync(db, positions, only);
  for (const [slug, p] of Object.entries(positions)) {
    if ((only?.length && !only.includes(slug)) || missing.includes(slug)) continue;
    const [before] = await db.select().from(shaykhs).where(eq(shaykhs.slug, slug));
    const set = { roleEn: p.roleEn, roleAr: p.roleAr, facts: p.facts, ...(p.nameEn ? { nameEn: p.nameEn } : {}), ...(p.nameAr ? { nameAr: p.nameAr } : {}) };
    const [after] = await db.update(shaykhs).set(set).where(eq(shaykhs.slug, slug)).returning();
    await record(db, "system", { action: "update", entity: "shaykh", entityId: slug, before, after });
    updated.push(slug);
  }
  return { updated, missing };
}
