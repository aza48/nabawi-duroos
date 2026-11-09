/**
 * How the guides are grouped for readers: by what you are trying to do, not by a single
 * "stage" of life. The stage stored on each guide is still used for guides not listed here
 * (a guide an admin adds later lands in a sensible topic straight away).
 *
 * The order of slugs inside a topic is the reading order shown on the guides page.
 */
export type GuideTopicId = "getting-started" | "papers" | "home" | "study" | "studies" | "more-study" | "haram" | "family" | "explore";

export type GuideTopic = { id: GuideTopicId; label: string; labelAr: string; blurb: string; blurbAr: string; slugs: string[] };

export const GUIDE_TOPICS: GuideTopic[] = [
  {
    id: "getting-started",
    label: "Start here",
    labelAr: "ابدأ هنا",
    blurb: "Applying, arriving and your first weeks: the steps in the order you will need them.",
    blurbAr: "التقديم والوصول وأسابيعك الأولى، بالترتيب الذي ستحتاجه.",
    slugs: ["applying-to-the-islamic-university", "what-to-bring-to-madinah", "first-30-days-in-madinah", "new-student-steps", "your-first-semester-week-by-week", "living-on-a-visitor-id", "lost-your-iqama-passport-or-card", "sim-internet-bank"],
  },
  {
    id: "papers",
    label: "Visas, iqama, money and work",
    labelAr: "التأشيرات والإقامة والمال والعمل",
    blurb: "Family visas, iqama and re-entry fees, Absher, your budget, everyday apps, driving, and starting a company.",
    blurbAr: "تأشيرات الأسرة ورسوم الإقامة والخروج والعودة وأبشر والميزانية والتطبيقات اليومية والقيادة وتأسيس شركة.",
    slugs: ["visas-for-family-and-visitors", "iqama-and-exit-reentry-fees", "phone-sims-and-absher", "cost-of-living", "owning-property-as-a-non-saudi", "sending-and-receiving-money", "everyday-apps-and-services", "drivers-license", "start-a-company-in-saudi", "check-visa-and-iqama-online"],
  },
  {
    id: "home",
    label: "Home, transport and health",
    labelAr: "السكن والمواصلات والصحة",
    blurb: "Renting a flat, buses, the train and taxis, and doctors, hospitals and pharmacies.",
    blurbAr: "استئجار شقة والحافلات والقطار وسيارات الأجرة والأطباء والمستشفيات والصيدليات.",
    slugs: ["finding-an-apartment", "getting-around", "haramain-train-and-city-buses", "university-to-the-haram", "shipping-and-receiving-parcels", "doctors-hospitals-and-pharmacies"],
  },
  {
    id: "study",
    label: "Life at the University",
    labelAr: "الحياة في الجامعة",
    blurb: "Campus life, your stipend, University offices, the calendar, the Ma'had, semesters off, tickets home and graduating.",
    blurbAr: "الحياة في الجامعة والمكافأة ومكاتب الجامعة والتقويم والمعهد وتأجيل الدراسة وتذاكر السفر والتخرج.",
    slugs: [
      "campus-life-islamic-university",
      "scholarship-stipend-and-allowances",
      "getting-your-stipend-off-the-university-card",
      "unit-13-and-paid-university-housing",
      "university-offices-and-contacts",
      "university-calendar-1448",
      "graduating-from-mahad",
      "tajeel-and-itithaar",
      "etimad-account",
      "graduate-procedures",
    ],
  },
  {
    id: "studies",
    label: "Your studies, step by step",
    labelAr: "دراستك خطوة بخطوة",
    blurb: "The University's student system, registering courses, exams and attendance, your GPA, what you study at each level, and your University email.",
    blurbAr: "نظام الطالب في الجامعة وتسجيل المقررات والاختبارات والحضور والمعدل وما تدرسه في كل مستوى وبريدك الجامعي.",
    slugs: [
      "university-student-system",
      "registering-your-courses",
      "exams-results-and-attendance",
      "gpa-warnings-and-dismissal",
      "what-you-study-by-level",
      "course-descriptions-aqeedah-dawah",
      "university-email-and-microsoft-365",
      "university-housing-and-student-services",
    ],
  },
  {
    id: "more-study",
    label: "Other ways to study",
    labelAr: "طرق أخرى للدراسة",
    blurb: "Postgraduate study, the Masjid an-Nabawi Institute and College, and the other universities in Madinah.",
    blurbAr: "الدراسات العليا ومعهد المسجد النبوي وكليته والجامعات الأخرى في المدينة.",
    slugs: ["postgraduate-admission-1448", "masjid-an-nabawi-institute-and-college", "other-universities-in-madinah"],
  },
  {
    id: "haram",
    label: "The Haram and worship",
    labelAr: "الحرم والعبادة",
    blurb: "Your first visit to Masjid an-Nabawi, the Rawdah, Umrah, Quba, the women's sections, and Hajj as a resident.",
    blurbAr: "زيارتك الأولى للمسجد النبوي والروضة والعمرة وقباء ومصليات النساء.",
    slugs: ["masjid-an-nabawi-first-visit", "umrah-rawdah-quba", "women-at-masjid-an-nabawi", "hajj-as-a-student"],
  },
  {
    id: "family",
    label: "Family, sisters and children",
    labelAr: "الأسرة والأخوات والأطفال",
    blurb: "Study for sisters, having a baby, schools and things to do with children.",
    blurbAr: "دراسة الأخوات والولادة والمدارس وأنشطة الأطفال.",
    slugs: ["sisters-studying-in-madinah", "having-a-baby-in-madinah", "kindergartens-and-schools", "bringing-parents-to-visit", "family-records-on-absher", "kids-activities"],
  },
  {
    id: "explore",
    label: "Explore Madinah",
    labelAr: "استكشف المدينة",
    blurb: "Historic sites, day trips, the seasons and camping, dates, and sport.",
    blurbAr: "المعالم التاريخية والرحلات القصيرة والمواسم والتخييم والتمور والرياضة.",
    slugs: ["historic-sites-and-masjids", "day-trips-from-madinah", "seasons-and-camping", "dates-of-madinah", "sports-and-activities", "volunteering-as-a-student"],
  },
];

/** Where a guide goes when it is not listed above, by its stored stage. */
const BY_STAGE: Record<string, GuideTopicId> = {
  "getting-started": "getting-started",
  "getting-settled": "home",
  study: "study",
  family: "family",
  leaving: "study",
};

/** Old section anchors (from links shared before the topics) and the topic that now holds them. */
export const OLD_ANCHORS: Record<string, GuideTopicId> = { "getting-settled": "home", leaving: "study" };

const SLUG_TOPIC = new Map(GUIDE_TOPICS.flatMap((t) => t.slugs.map((s, i) => [s, { topic: t.id, order: i }] as const)));

export function topicOf(g: { slug: string; stage: string }): GuideTopicId {
  return SLUG_TOPIC.get(g.slug)?.topic ?? BY_STAGE[g.stage] ?? "home";
}

export function topicById(id: GuideTopicId): GuideTopic {
  return GUIDE_TOPICS.find((t) => t.id === id)!;
}

/** The guides grouped by topic, each topic in reading order (listed slugs first, then the rest by title). */
export function groupGuides<G extends { slug: string; stage: string; title: string }>(guides: G[]): (GuideTopic & { items: G[] })[] {
  const rank = (g: G) => SLUG_TOPIC.get(g.slug)?.order ?? 1_000;
  return GUIDE_TOPICS.map((t) => ({
    ...t,
    items: guides.filter((g) => topicOf(g) === t.id).sort((a, b) => rank(a) - rank(b) || a.title.localeCompare(b.title)),
  }));
}
