/**
 * First 100 days in Madinah: the order in which a new student or family settles in.
 * Each step is one line and links to the guide or answer that explains it.
 * `by` is the day, counted from arrival day (0), by which the step is best done.
 * Plain data, so other parts of the site (the home chooser, the assistant) can read it.
 */

export type StartStageId = "before" | "arrival" | "first-72-hours" | "first-week" | "first-month" | "first-semester";

/** Who a step is for, when it is not everyone. */
export type StartAudience = "student" | "family";

export type StartStep = {
  id: string;
  en: string;
  ar: string;
  /** Site path of the guide or answer, without the /ar prefix. */
  href: `/guides/${string}` | `/ask/${string}`;
  /** Day from arrival (0) by which to do it. Negative means before you fly. */
  by: number;
  /** Who the step is for, when it is not everyone. */
  for?: StartAudience;
};

export type StartStage = {
  id: StartStageId;
  en: string;
  ar: string;
  blurbEn: string;
  blurbAr: string;
  steps: StartStep[];
};

export const START_STAGES: StartStage[] = [
  {
    id: "before",
    en: "Before you fly",
    ar: "قبل السفر",
    blurbEn: "Paperwork is far easier at home than from Madinah.",
    blurbAr: "إنجاز الأوراق في بلدك أسهل بكثير منه في المدينة.",
    steps: [
      { id: "names-match", by: -14, href: "/ask/graduation-certificate-name-check", en: "Check that your name matches your passport, letter for letter, on your ticket, visa and every University record.", ar: "تأكد أن اسمك مطابق لجواز سفرك حرفًا بحرف في التذكرة والتأشيرة وكل سجلات الجامعة." },
      { id: "documents", by: -14, href: "/guides/what-to-bring-to-madinah", en: "Pack your original certificates, white background photos and scans of every document on your phone.", ar: "احمل شهاداتك الأصلية وصورًا بخلفية بيضاء ونسخًا ممسوحة من كل وثيقة على هاتفك." },
      { id: "attest", by: -14, href: "/guides/what-to-bring-to-madinah", en: "Have your certificates attested at home when your University, institute or children's school asks for them.", ar: "صدّق شهاداتك في بلدك إن طلبتها الجامعة أو المعهد أو مدرسة أبنائك." },
      { id: "medicine", by: -7, href: "/guides/what-to-bring-to-madinah", en: "Get a doctor's letter for any regular medicine, because foreign prescriptions are not accepted here.", ar: "خذ خطابًا من طبيبك لأي دواء تستعمله بانتظام، فالوصفات الأجنبية لا تُقبل هنا." },
      { id: "money", by: -3, href: "/guides/what-to-bring-to-madinah", en: "Bring enough money for two months, on two cards from different banks, plus some cash.", ar: "أحضر ما يكفيك شهرين على بطاقتين من بنكين مختلفين، مع شيء من النقد." },
      { id: "driving-permit", by: -3, href: "/guides/what-to-bring-to-madinah", en: "Bring your home licence and an International Driving Permit if you plan to drive.", ar: "أحضر رخصتك ورخصة القيادة الدولية إن كنت تنوي القيادة." },
    ],
  },
  {
    id: "arrival",
    en: "Arrival day",
    ar: "يوم الوصول",
    blurbEn: "Three things that make the first night easy.",
    blurbAr: "ثلاثة أمور تجعل الليلة الأولى سهلة.",
    steps: [
      { id: "border-number", by: 0, href: "/guides/what-to-bring-to-madinah", en: "Write down your border number when you land. The SIM, Absher and the bank all ask for it.", ar: "سجّل رقم الحدود عند وصولك، فالشريحة وأبشر والبنك كلها تطلبه." },
      { id: "sim", by: 0, href: "/guides/sim-internet-bank", en: "Buy a Saudi SIM at the airport with your passport. Every code that follows comes to this number.", ar: "اشترِ شريحة سعودية في المطار بجوازك، فكل رموز التحقق بعدها تصل إلى هذا الرقم." },
      { id: "first-night", by: 0, href: "/ask/airport-to-haram-and-university", en: "Get from the airport to your room or your first night's stay.", ar: "انتقل من المطار إلى سكنك أو مكان إقامتك في الليلة الأولى." },
      { id: "emergency", by: 0, href: "/guides/doctors-hospitals-and-pharmacies", en: "Save the emergency numbers: 997 for an ambulance and 911.", ar: "احفظ أرقام الطوارئ: ٩٩٧ للإسعاف و٩١١." },
    ],
  },
  {
    id: "first-72-hours",
    en: "The first 72 hours",
    ar: "أول ٧٢ ساعة",
    blurbEn: "Your digital identity, in order, because each step needs the one before it.",
    blurbAr: "هويتك الرقمية بالترتيب، لأن كل خطوة تحتاج إلى التي قبلها.",
    steps: [
      { id: "absher", by: 2, href: "/guides/new-student-steps", en: "Register on Absher and activate it at a self-service kiosk with your fingerprint.", ar: "سجّل في أبشر وفعّله من جهاز الخدمة الذاتية ببصمتك." },
      { id: "nafath", by: 2, href: "/guides/new-student-steps", en: "Activate Nafath in its app with the face check.", ar: "فعّل نفاذ من تطبيقه مع التحقق بالوجه." },
      { id: "visitor-id", by: 3, href: "/guides/living-on-a-visitor-id", for: "student", en: "Issue your Visitor ID in Absher if you are on the educational visa.", ar: "أصدر هوية الزائر من أبشر إن كنت على التأشيرة التعليمية." },
      { id: "first-visit", by: 3, href: "/guides/masjid-an-nabawi-first-visit", en: "Make your first visit to Masjid an-Nabawi, and learn the gates you will use most.", ar: "زر المسجد النبوي أول مرة، وتعرّف على الأبواب التي ستستعملها كثيرًا." },
    ],
  },
  {
    id: "first-week",
    en: "The first week",
    ar: "الأسبوع الأول",
    blurbEn: "The University, your address and your bank.",
    blurbAr: "الجامعة وعنوانك وحسابك البنكي.",
    steps: [
      { id: "student-card", by: 7, href: "/guides/new-student-steps", for: "student", en: "Collect your student card, at orientation or from the student card office.", ar: "استلم بطاقتك الجامعية في أسبوع التهيئة أو من مكتب البطاقات." },
      { id: "sso", by: 7, href: "/guides/new-student-steps", for: "student", en: "Sign in to your University accounts: email, the Academic System and Blackboard.", ar: "ادخل إلى حساباتك الجامعية: البريد والنظام الأكاديمي والبلاك بورد." },
      { id: "timetable", by: 7, href: "/ask/find-my-timetable", for: "student", en: "Find your class timetable in the Academic System.", ar: "اعثر على جدول محاضراتك في النظام الأكاديمي." },
      { id: "meals", by: 7, href: "/guides/campus-life-islamic-university", for: "student", en: "Book your meals at the mat'am for the month if you eat on campus.", ar: "احجز وجباتك في المطعم للشهر إن كنت تأكل في الجامعة." },
      { id: "address", by: 7, href: "/ask/short-address", en: "Register your National Address with Saudi Post. Banks and deliveries need it.", ar: "سجّل عنوانك الوطني في البريد السعودي، فالبنوك والتوصيل تحتاج إليه." },
      { id: "bank", by: 7, href: "/guides/sim-internet-bank", en: "Open a bank account and order your mada card.", ar: "افتح حسابًا بنكيًا واطلب بطاقة مدى." },
      { id: "getting-around", by: 7, href: "/guides/getting-around", en: "Learn the free bus to the Haram, the city buses and the ride apps.", ar: "تعرّف على الحافلة المجانية إلى الحرم وحافلات المدينة وتطبيقات التوصيل." },
    ],
  },
  {
    id: "first-month",
    en: "The first month",
    ar: "الشهر الأول",
    blurbEn: "Money, home and the duroos.",
    blurbAr: "المال والسكن والدروس.",
    steps: [
      { id: "iban", by: 14, href: "/guides/scholarship-stipend-and-allowances", for: "student", en: "Send your IBAN to the University so your stipend is paid into your account.", ar: "أرسل رقم الآيبان إلى الجامعة لتصرف مكافأتك في حسابك." },
      { id: "etimad", by: 21, href: "/guides/etimad-account", for: "student", en: "Set up your Etimad account for your flight tickets.", ar: "أنشئ حسابك في اعتماد لتذاكر الطيران." },
      { id: "flat", by: 21, href: "/guides/finding-an-apartment", for: "family", en: "Find a flat and sign the lease on Ejar.", ar: "ابحث عن شقة ووقّع العقد على منصة إيجار." },
      { id: "insurance", by: 21, href: "/ask/check-health-insurance", en: "Check your health insurance and find your nearest clinic and pharmacy.", ar: "تحقق من تأمينك الصحي واعرف أقرب مستوصف وصيدلية." },
      { id: "budget", by: 30, href: "/guides/cost-of-living", en: "Set a monthly budget for rent, food, transport and your phone.", ar: "ضع ميزانية شهرية للسكن والطعام والمواصلات والهاتف." },
      { id: "duroos", by: 30, href: "/ask/do-i-register-for-duroos", en: "Pick the duroos you will attend each week in the Haram.", ar: "اختر الدروس التي ستحضرها كل أسبوع في الحرم." },
      { id: "schools", by: 30, href: "/guides/kindergartens-and-schools", for: "family", en: "Enrol your children in a kindergarten or school.", ar: "سجّل أبناءك في روضة أو مدرسة." },
    ],
  },
  {
    id: "first-semester",
    en: "The first semester",
    ar: "الفصل الأول",
    blurbEn: "Study well, and know the rules before you need them.",
    blurbAr: "ادرس جيدًا، واعرف الأنظمة قبل أن تحتاج إليها.",
    steps: [
      { id: "attendance", by: 45, href: "/guides/exams-results-and-attendance", for: "student", en: "Learn the attendance rules and how many classes you can miss.", ar: "اعرف أنظمة الحضور وكم محاضرة يجوز لك الغياب عنها." },
      { id: "muqarrarat", by: 45, href: "/ask/muqarrarat", for: "student", en: "Get your muqarrarat, the set books for each course.", ar: "احصل على مقرراتك، الكتب المقررة لكل مادة." },
      { id: "rawdah", by: 60, href: "/guides/umrah-rawdah-quba", en: "Book your visit to the Rawdah and perform Umrah.", ar: "احجز زيارة الروضة وأدِّ العمرة." },
      { id: "visa-check", by: 75, href: "/guides/iqama-and-exit-reentry-fees", en: "Check your visa or iqama dates before any trip abroad.", ar: "تحقق من تواريخ تأشيرتك أو إقامتك قبل أي سفر إلى الخارج." },
      { id: "exams", by: 90, href: "/guides/exams-results-and-attendance", for: "student", en: "Prepare for final exams, and know where your results appear.", ar: "استعد للاختبارات النهائية، واعرف أين تظهر نتائجك." },
      { id: "break", by: 100, href: "/guides/day-trips-from-madinah", en: "Plan the semester break: a day trip, a visit home or a summer course.", ar: "خطط لإجازة الفصل: رحلة يومية أو زيارة لبلدك أو دورة صيفية." },
    ],
  },
];

export const START_STEPS: StartStep[] = START_STAGES.flatMap((s) => s.steps);
