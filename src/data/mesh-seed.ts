export type MeshCategory = { slug: string; name: string; description: string; parentSlug: string | null; isMain: boolean; displayOrder: number };
export type MeshUserSeed = { id: number; displayName: string; bio: string; createdAt: string };
export type MeshAnswerSeed = { id: number; authorId: number; authorName: string; body: string; voteCount: number; createdAt: string; isSeed: true };
export type MeshQuestionSeed = {
  id: number; authorId: number; authorName: string; categorySlug: string; categoryName: string; subcategorySlug?: string;
  title: string; body: string; voteCount: number; createdAt: string; updatedAt: string; isSeed: true;
  tags: string[]; answers: MeshAnswerSeed[]; acceptedAnswerId: number | null;
};

export const meshCategories: MeshCategory[] = [
  { slug: "getting-started", name: "Getting Started", description: "Admissions, paperwork, residency, and your first steps in Madinah.", parentSlug: null, isMain: true, displayOrder: 1 },
  { slug: "getting-settled", name: "Getting Settled", description: "Find housing, get connected, navigate the city, and settle into daily life.", parentSlug: null, isMain: true, displayOrder: 2 },
  { slug: "getting-ready-to-leave", name: "Getting Ready to Leave", description: "Travel plans, final paperwork, closing accounts, and moving on from Madinah.", parentSlug: null, isMain: true, displayOrder: 3 },
  { slug: "admissions-enrollment", name: "Admissions and Enrollment", description: "University admission and enrollment steps.", parentSlug: "getting-started", isMain: false, displayOrder: 11 },
  { slug: "visa-iqama", name: "Visa and Iqama", description: "Entry visa and residency questions.", parentSlug: "getting-started", isMain: false, displayOrder: 12 },
  { slug: "nafath-absher", name: "Nafath and Absher", description: "Digital government services setup.", parentSlug: "getting-started", isMain: false, displayOrder: 13 },
  { slug: "university-registration", name: "University Registration", description: "Registration, documents and student systems.", parentSlug: "getting-started", isMain: false, displayOrder: 14 },
  { slug: "documents-requirements", name: "Documents and Requirements", description: "What to bring and keep ready.", parentSlug: "getting-started", isMain: false, displayOrder: 15 },
  { slug: "first-arrival", name: "First Arrival", description: "Your first days in Madinah.", parentSlug: "getting-started", isMain: false, displayOrder: 16 },
  { slug: "housing-accommodation", name: "Housing and Accommodation", description: "Finding and keeping housing.", parentSlug: "getting-settled", isMain: false, displayOrder: 21 },
  { slug: "transport", name: "Transport", description: "Getting around Madinah.", parentSlug: "getting-settled", isMain: false, displayOrder: 22 },
  { slug: "sim-cards", name: "Mobile Networks and SIM Cards", description: "SIMs, eSIMs and mobile plans.", parentSlug: "getting-settled", isMain: false, displayOrder: 23 },
  { slug: "banking-payments", name: "Banking and Payments", description: "Accounts, cards and transfers.", parentSlug: "getting-settled", isMain: false, displayOrder: 24 },
  { slug: "shopping-groceries", name: "Shopping and Groceries", description: "Everyday shopping in Madinah.", parentSlug: "getting-settled", isMain: false, displayOrder: 25 },
  { slug: "food-essentials", name: "Food and Daily Essentials", description: "Food and household basics.", parentSlug: "getting-settled", isMain: false, displayOrder: 26 },
  { slug: "healthcare-services", name: "Healthcare and Practical Services", description: "Clinics and everyday services.", parentSlug: "getting-settled", isMain: false, displayOrder: 27 },
  { slug: "life-in-madinah", name: "Life in Madinah", description: "Day-to-day life as a student.", parentSlug: "getting-settled", isMain: false, displayOrder: 28 },
  { slug: "travel-planning", name: "Travel Planning", description: "Trips during and after studies.", parentSlug: "getting-ready-to-leave", isMain: false, displayOrder: 31 },
  { slug: "university-clearance", name: "University Clearance", description: "Clearance before leaving.", parentSlug: "getting-ready-to-leave", isMain: false, displayOrder: 32 },
  { slug: "exit-procedures", name: "Residency and Exit Procedures", description: "Exit-related questions.", parentSlug: "getting-ready-to-leave", isMain: false, displayOrder: 33 },
  { slug: "closing-accounts", name: "Closing Accounts and Services", description: "Bank, SIM and subscriptions.", parentSlug: "getting-ready-to-leave", isMain: false, displayOrder: 34 },
  { slug: "housing-handover", name: "Housing Handover", description: "Leaving accommodation cleanly.", parentSlug: "getting-ready-to-leave", isMain: false, displayOrder: 35 },
  { slug: "final-documents", name: "Final Documents", description: "Transcripts and attestations.", parentSlug: "getting-ready-to-leave", isMain: false, displayOrder: 36 },
  { slug: "moving-luggage", name: "Moving and Luggage", description: "Shipping and packing.", parentSlug: "getting-ready-to-leave", isMain: false, displayOrder: 37 },
];

export const meshTags: string[] = ["University admission","Visa and Iqama","Nafath","Absher","University registration","Accommodation","Transport","SIM cards","Banking","Groceries and essentials","Exit procedures","Travel","Final paperwork","Accommodation handover","Closing accounts"];

export const meshSeedUsers: MeshUserSeed[] = [
  { id: 1, displayName: "Yusuf A.", bio: "Second-year student, based near the university.", createdAt: "2026-09-12T10:00:00Z" },
  { id: 2, displayName: "Fatima K.", bio: "Student of knowledge, in Madinah since 2024.", createdAt: "2026-08-20T10:00:00Z" },
  { id: 3, displayName: "Bilal R.", bio: "Recently arrived — sharing what I learn as I go.", createdAt: "2026-10-02T10:00:00Z" },
  { id: 4, displayName: "Maryam S.", bio: "Final-year student, happy to help newcomers.", createdAt: "2025-11-15T10:00:00Z" },
  { id: 5, displayName: "Idris O.", bio: "Part-time Arabic student.", createdAt: "2026-07-10T10:00:00Z" },
  { id: 6, displayName: "Hannah T.", bio: "Moved to Madinah with family in 2025.", createdAt: "2026-05-18T10:00:00Z" },
  { id: 7, displayName: "Omar N.", bio: "Graduating this year.", createdAt: "2025-09-01T10:00:00Z" },
  { id: 8, displayName: "Safiyyah B.", bio: "New student, asking lots of questions.", createdAt: "2026-10-05T10:00:00Z" },
];

function a(id: number, authorId: number, body: string, voteCount: number, createdAt: string): MeshAnswerSeed {
  const u = meshSeedUsers.find((x) => x.id === authorId)!;
  return { id, authorId, authorName: u.displayName, body, voteCount, createdAt, isSeed: true };
}
function q(id: number, authorId: number, categorySlug: string, subcategorySlug: string | undefined, title: string, body: string, voteCount: number, createdAt: string, tags: string[], answers: MeshAnswerSeed[], acceptedAnswerId: number | null): MeshQuestionSeed {
  const u = meshSeedUsers.find((x) => x.id === authorId)!;
  const cat = meshCategories.find((c) => c.slug === categorySlug)!;
  return { id, authorId, authorName: u.displayName, categorySlug, categoryName: cat.name, subcategorySlug, title, body, voteCount, createdAt, updatedAt: createdAt, isSeed: true, tags, answers, acceptedAnswerId };
}

export const meshSeedQuestions: MeshQuestionSeed[] = [
  q(1, 3, "getting-started", "nafath-absher", "Can I complete Nafath registration before my Iqama is issued?", "I have arrived on a student visa and my Iqama is still being processed. The university portal is asking me to verify through Nafath but I do not have an Iqama number yet. Has anyone managed to register before the Iqama came through, or do I need to wait?", 18, "2026-10-18T08:30:00Z", ["Nafath","Visa and Iqama"], [
    a(101, 1, "When I arrived in 2025 I had to wait until the Iqama was issued — the registration asked for the Iqama number at the first step. This was my experience — confirm on the official Nafath source for current steps, as it may have changed.", 14, "2026-10-18T11:00:00Z"),
    a(102, 4, "Same here. In the meantime, ask the university admissions office — they had a temporary way to verify new students manually while Iqamas were pending. Worth a visit rather than waiting silently.", 9, "2026-10-18T14:20:00Z"),
  ], 101),
  q(2, 8, "getting-settled", "housing-accommodation", "Where do students usually look for accommodation near the university?", "I will be arriving next month and need a small flat or shared house within walking distance or a short bus ride of the university. Where do students actually find places — agents, noticeboards, groups? Roughly what should I budget for a first month including deposit?", 24, "2026-10-17T09:15:00Z", ["Accommodation"], [
    a(103, 6, "Most people I know found places through word of mouth and the student housing noticeboard near the main gate, plus asking seniors in your faculty. Visit in person before paying anything, and photograph the meter readings on day one — this was my experience when I moved in 2025.", 16, "2026-10-17T12:40:00Z"),
    a(104, 2, "Shared houses fill up fast at the start of term. If you can, arrive a week early and view 3–4 places. Keep the deposit receipt and a signed copy of the contract — you will need it later for handover.", 11, "2026-10-17T16:05:00Z"),
  ], 103),
  q(3, 3, "getting-settled", "sim-cards", "What's the easiest way to get a local SIM card?", "Landing this week and I need data immediately for maps and messages. Can I get a SIM at the airport or should I wait until I am in the city? What ID do visitors usually need before the Iqama is ready?", 15, "2026-10-19T07:00:00Z", ["SIM cards"], [
    a(105, 5, "I picked up a visitor SIM at the airport arrivals hall with just my passport and visa — it was enough for the first weeks. Once my Iqama arrived I switched to a regular plan in a city branch. This was my experience — confirm current ID requirements on the provider's official page.", 12, "2026-10-19T09:30:00Z"),
  ], 105),
  q(4, 8, "getting-started", "university-registration", "Which documents should I keep ready for university registration?", "Registration opens soon and I want one folder with everything ready. From experience, which documents did you actually get asked for — and did you need attested copies or were scans enough?", 21, "2026-10-15T10:45:00Z", ["University registration","University admission"], [
    a(106, 4, "Keep originals plus two photocopies and phone scans of: passport, visa page, acceptance letter, previous certificates, and passport photos. I was asked for attested copies of my main certificate only — but requirements vary by faculty, so check the university's official registration page for your programme.", 18, "2026-10-15T13:10:00Z"),
    a(107, 1, "Add your vaccine record if you have it — I was asked once and was glad I had a scan. A single labelled folder (paper + cloud backup) saved me multiple trips.", 7, "2026-10-15T18:00:00Z"),
  ], 106),
  q(5, 7, "getting-ready-to-leave", "travel-planning", "What should I arrange before travelling home at the end of my studies?", "I finish this semester and plan to travel home for a long break. What are the easy-to-forget things to arrange in Madinah before I leave — housing, SIM, bank, university paperwork?", 13, "2026-10-14T08:00:00Z", ["Travel","Final paperwork"], [
    a(108, 4, "Make a checklist two months out: notify your landlord in writing, photograph the flat, settle any bills, back up your university documents, and confirm your travel paperwork on the official Absher source — rules change, so do not rely on old screenshots from friends. This was my experience in 2025.", 10, "2026-10-14T11:25:00Z"),
  ], null),
  q(6, 5, "getting-settled", "banking-payments", "How did you open a bank account as a new student?", "I tried one bank app and it asked for things I do not have yet. Which route worked for you as a newly arrived student, and what did you need to bring to the branch?", 9, "2026-10-19T15:30:00Z", ["Banking"], [
    a(109, 1, "I went in person with passport, Iqama, and my university acceptance letter. The branch set up a basic account the same day. This was my experience — confirm on the bank's official site what documents they currently require for students.", 8, "2026-10-19T17:45:00Z"),
    a(110, 7, "If the app route fails, do not keep retrying — a branch visit sorted mine in one go. Ask about student fee waivers while you are there.", 4, "2026-10-20T08:10:00Z"),
  ], null),
  q(7, 2, "getting-settled", "transport", "Which bus routes do students use to get to the Haram?", "I live near the university and want to visit the Haram regularly without taxis every time. Which buses do students actually use, where do you board, and how do you pay?", 17, "2026-10-16T06:50:00Z", ["Transport"], [], null),
  q(8, 3, "getting-started", "nafath-absher", "How do you activate Absher at an ATM or kiosk?", "My Absher account is created but not activated. I heard you can activate at certain ATMs or self-service kiosks. Where did you do yours in Madinah and how long did it take?", 11, "2026-10-20T09:00:00Z", ["Absher","Nafath"], [
    a(111, 6, "I used a self-service kiosk at a large mall — passport/Iqama and fingerprint, about ten minutes. This was my experience — confirm the current activation options on the official Absher page before you go, as locations change.", 9, "2026-10-20T10:40:00Z"),
  ], null),
  q(9, 8, "getting-settled", "housing-accommodation", "Any tips for finding a compatible roommate?", "Renting alone is stretching my budget. For those in shared houses — how did you find a roommate you actually got along with, and what did you agree on in writing beforehand?", 6, "2026-10-20T12:15:00Z", ["Accommodation"], [], null),
  q(10, 7, "getting-ready-to-leave", "moving-luggage", "Shipping belongings home — what worked for you?", "I have books and winter clothes I do not want to carry in luggage. Has anyone shipped a box home from Madinah? Which service did you use, what did it cost roughly, and what was not worth shipping?", 8, "2026-10-13T14:00:00Z", ["Travel","Moving and Luggage"], [
    a(112, 2, "I shipped one 20kg box of books by sea freight and carried clothes. Books were worth it; bulky low-value items were not. Get the quote in writing with delivery time — mine took six weeks. This was my experience — get a current quote from the carrier.", 6, "2026-10-13T17:30:00Z"),
  ], null),
  q(11, 1, "getting-ready-to-leave", "university-clearance", "What are the university clearance steps before graduating?", "Final semester and I keep hearing about a clearance process (library, housing, departments). In what order did you do yours, and what caught you out?", 19, "2026-10-12T09:40:00Z", ["Final paperwork","University registration"], [
    a(113, 7, "Start with the library — an overdue book blocked everything else for me. Then housing, then your faculty office. Keep every stamped copy. This was my experience — confirm the current order on the university's official student portal, as it was updated recently.", 15, "2026-10-12T12:00:00Z"),
    a(114, 4, "Do not leave it to the last week. I started a month early and it was calm; friends who started late queued for days.", 8, "2026-10-12T15:20:00Z"),
  ], 113),
  q(12, 6, "getting-settled", "shopping-groceries", "First-week groceries — where do you buy essentials cheaply?", "Arriving with an empty kitchen. Where do students buy basics (rice, oil, cleaning supplies) without overspending in the first week, and is it worth one big trip or several small ones?", 7, "2026-10-19T18:20:00Z", ["Groceries and essentials"], [], null),
  q(13, 2, "getting-ready-to-leave", "closing-accounts", "How do I keep my Saudi number after leaving, or should I close it?", "Leaving Saudi for at least a year. I use my Saudi number for bank alerts. Can I keep it active on a minimal plan, or is closing and switching alerts to email cleaner? What did leavers do?", 5, "2026-10-18T20:10:00Z", ["SIM cards","Closing accounts"], [
    a(115, 7, "I kept mine on the cheapest plan and topped up occasionally to keep it alive for bank alerts — worked for a year away. This was my experience — confirm the provider's current inactivity rules on their official page before relying on it.", 5, "2026-10-19T08:00:00Z"),
  ], null),
  q(14, 5, "getting-started", "first-arrival", "Second-hand furniture — worth it for a first flat?", "Setting up a first flat on a budget. Is second-hand furniture in Madinah decent value, where do students find it, and what should I buy new instead?", 4, "2026-10-20T16:45:00Z", ["Accommodation","Groceries and essentials"], [], null),
];

export function seedQuestionToListItem(qq: MeshQuestionSeed) {
  return {
    id: qq.id, title: qq.title, body: qq.body, author_id: qq.authorId, author_name: qq.authorName,
    category_slug: qq.categorySlug, category_name: qq.categoryName, subcategory_slug: qq.subcategorySlug ?? null,
    vote_count: qq.voteCount, answer_count: qq.answers.length, solved: qq.acceptedAnswerId != null,
    accepted_answer_id: qq.acceptedAnswerId, is_seed: true, tags: qq.tags, created_at: qq.createdAt, updated_at: qq.updatedAt,
  };
}
export type MeshListItem = ReturnType<typeof seedQuestionToListItem>;
export function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now"; if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60); if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24); if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
