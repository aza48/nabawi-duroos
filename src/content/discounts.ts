/**
 * Discounts that private companies offer to Islamic University staff and students
 * (the University's partner-offers programme, 111 offers). Show your University card and
 * ask before paying: some offers are for staff only, and companies change terms.
 */
export type Offer = { name: string; nameEn?: string; deal: string; students?: boolean };
export type OfferGroup = { id: string; label: string; labelAr: string; offers: Offer[] };

export const DISCOUNTS: OfferGroup[] = [
  {
    id: "health",
    label: "Hospitals, clinics and labs",
    labelAr: "العروض الصحية",
    offers: [
      { name: "مستشفى المدينة المتحدة", nameEn: "United Madinah Hospital", deal: "40% off outpatient visits, 30% off labs and X-rays, 30% off surgery and admission" },
      { name: "مستشفى د. حامد سليمان الأحمدي", nameEn: "Dr. Hamid Al-Ahmadi Hospital", deal: "Up to 40% off services" },
      { name: "المستشفى السعودي الألماني", nameEn: "Saudi German Hospital", deal: "10% off consultations booked online, 15% off labs, X-rays, admission and surgery" },
      { name: "مستشفى المواساة", nameEn: "Al-Mouwasat Hospital", deal: "20% off all health services" },
      { name: "مجمع عيادات عامر الطبي", nameEn: "Amer Medical Clinics", deal: "50% off all services" },
      { name: "المجمع الدولي الطبي العام", nameEn: "International Medical Complex", deal: "50% off consultations, 30% off other services" },
      { name: "مجمع حكيم طيبة الطبي", nameEn: "Hakeem Taibah Medical Complex", deal: "35% off every department" },
      { name: "مجمع صفوة المهيدب", nameEn: "Safwat Al-Muhaidib Complex", deal: "20% to 50% off all services" },
      { name: "العيادة الذهبية", nameEn: "The Golden Clinic", deal: "20% to 50% off 18+ services" },
      { name: "مجمع روح الشفاء الطبية", nameEn: "Rouh Al-Shifa Medical", deal: "50% off consultations, 30% off services" },
      { name: "مختبرات الدليل الصحيح", nameEn: "Al-Daleel Al-Saheeh Labs", deal: "50% off routine tests, plus a 15-test package made for IU students", students: true },
      { name: "مختبرات الشامل", nameEn: "Al-Shamel Labs", deal: "50% off individual tests" },
      { name: "مختبرات ألفا", nameEn: "Alpha Labs", deal: "50% off individual tests, for staff, students and families", students: true },
      { name: "مجمع الشيناوي لطب الأسنان", nameEn: "Al-Shinawi Dental", deal: "50% off check-ups, panoramic X-ray and cleaning; 25% off fillings, braces and root canals" },
      { name: "عيادات طابة دنت", nameEn: "Taba Dent", deal: "50% off X-rays and check-ups, 40% off treatment, 30% off crowns" },
      { name: "مركز الحجامة المتقدمة", nameEn: "Advanced Hijama Centre", deal: "20% off all services" },
    ],
  },
  {
    id: "schools",
    label: "Schools and nurseries",
    labelAr: "العروض التعليمية",
    offers: [
      { name: "مدارس مناهل الوفاء الأهلية", nameEn: "Manahil Al-Wafa Schools", deal: "10% off fees, 30% off school transport and enrichment books" },
      { name: "روضة واحة السلام", nameEn: "Wahat Al-Salam Kindergarten", deal: "15% off fees" },
      { name: "مدارس الطفل المبدع", nameEn: "Creative Child Schools", deal: "8% to 15% off nursery, kindergarten and programmes" },
      { name: "مدارس الحياة الأهلية", nameEn: "Al-Hayat Schools", deal: "From 12% off fees" },
      { name: "مدرسة المستقبل الواعد", nameEn: "Promising Future School (Qur'an)", deal: "4,000 instead of 6,000 SAR a semester, books and uniform included, instalments possible" },
      { name: "بامزينو حضانة ومركز ترفيهي", nameEn: "Bamzino Nursery", deal: "20% off monthly fees, or a free month with two" },
    ],
  },
  {
    id: "cars",
    label: "Car rental and car care",
    labelAr: "السيارات",
    offers: [
      { name: "الأفضل لتأجير السيارات", nameEn: "Al-Afdal Car Rental", deal: "25% off every car" },
      { name: "بدجت السعودية", nameEn: "Budget Saudi", deal: "5% off every car" },
      { name: "شركة لومي", nameEn: "Lumi Car Rental", deal: "Discount with the code MOEDU" },
      { name: "محمد يوسف ناغي (هيونداي)", nameEn: "Hyundai (Naghi)", deal: "30% off servicing, 35% off parts" },
      { name: "ثري إم للعزل الحراري", nameEn: "3M window film", deal: "50% off heat-insulation film" },
      { name: "جونسون القناع الشفاف", nameEn: "Johnson film", deal: "50% off insulation and nano-ceramic" },
      { name: "محترف المركبات", nameEn: "Vehicle Pro maintenance", deal: "20% off all servicing" },
      { name: "فقاعة صافية لغسيل السيارات", nameEn: "Safia car wash", deal: "15 SAR small car, 25 SAR large car" },
    ],
  },
  {
    id: "food",
    label: "Restaurants and cafes",
    labelAr: "المطاعم والمقاهي",
    offers: [
      { name: "المكنان للتمور", nameEn: "Al-Maknan Dates", deal: "20% off" },
      { name: "مقهى ذا بالم", nameEn: "The Palm Cafe", deal: "20% off" },
      { name: "مطعم قصر الريحان", nameEn: "Qasr Al-Rayhan", deal: "15% off" },
      { name: "مطاعم زيتون وتين", nameEn: "Zaitoon wa Teen", deal: "15% off" },
      { name: "أبل بيز", nameEn: "Applebee's", deal: "15% off for staff and students", students: true },
      { name: "بهجة مراكش", nameEn: "Bahjat Marrakesh", deal: "15% off" },
      { name: "أنا كافيه", nameEn: "Ana Cafe", deal: "15% off everything" },
      { name: "مطعم الوردة البخاري", nameEn: "Al-Warda Bukhari", deal: "10% off everything" },
      { name: "كافيه تيام", nameEn: "Tiam Cafe", deal: "10% off coffee" },
    ],
  },
  {
    id: "sport",
    label: "Sport and fitness",
    labelAr: "الأندية الرياضية",
    offers: [
      { name: "نادي الجامعة الإسلامية", nameEn: "Islamic University Sports Club", deal: "50% off for students", students: true },
      { name: "نادي إيجل الرياضي (نسائي)", nameEn: "Eagle Club (women)", deal: "35% off outside promotions" },
      { name: "نادي ToBE", nameEn: "ToBE Club", deal: "25% off" },
      { name: "نادي العقيق للأطفال", nameEn: "Al-Aqeeq Kids Club", deal: "20% off" },
      { name: "نادي ألفا الرياضي", nameEn: "Alpha Sports Club", deal: "15% off" },
      { name: "نادي بادل جو", nameEn: "Padel Go", deal: "10% off" },
    ],
  },
  {
    id: "everyday",
    label: "Tailors, glasses, laundry and more",
    labelAr: "خدمات متنوعة",
    offers: [
      { name: "مركز زيار للنظارات", nameEn: "Ziyar Optics", deal: "50% off glasses, lenses and sunglasses" },
      { name: "تلسكوب للبصريات", nameEn: "Telescope Optics", deal: "40% off, free eye test" },
      { name: "لي رويال للخياطة", nameEn: "Le Royal Tailoring", deal: "20% off for staff, their children and students", students: true },
      { name: "دار الموضة للخياطة", nameEn: "Dar Al-Moda Tailoring", deal: "33% off" },
      { name: "الديرمان للخياطة", nameEn: "Al-Dairman Tailoring", deal: "20% off made-to-measure thobes" },
      { name: "مغاسل أقطان المدينة", nameEn: "Aqtan Laundry", deal: "Up to 20% off for students, with pickup and delivery", students: true },
      { name: "مؤسسة أكسجين للاتصالات", nameEn: "Oxygen Telecom", deal: "Up to 50% off Zain, Mobily, Red Bull Mobile and Virgin SIMs" },
      { name: "يورك للمكيفات", nameEn: "York air conditioners", deal: "Discount with the code iupr on york.com.sa" },
      { name: "مجوهرات فايندرا للفضة", nameEn: "Vindra Silver", deal: "30% off" },
    ],
  },
  {
    id: "travel",
    label: "Hotels and travel",
    labelAr: "الفنادق والسفر",
    offers: [
      { name: "فندق حفاوة", nameEn: "Hafawa Hotel", deal: "King room 223 SAR, suite 295 SAR a night" },
      { name: "منتجع رضوى الرمادة", nameEn: "Radwa Al-Ramada Resort", deal: "25% off" },
      { name: "منتجع درة العروس", nameEn: "Durrat Al-Arus Resort", deal: "20% off beach chalets" },
      { name: "فندق سدرة العالمي", nameEn: "Sidra International Hotel", deal: "15% off outside Ramadan and the Hajj months" },
      { name: "فندق عمرية", nameEn: "Omariya Hotel", deal: "15% off outside Ramadan" },
      { name: "خزيمة للسفر والسياحة", nameEn: "Khuzaimah Travel", deal: "15% off" },
      { name: "الخطوط القطرية والتركية", nameEn: "Qatar Airways and Turkish Airlines", deal: "Special fares for IU staff and students", students: true },
    ],
  },
];
