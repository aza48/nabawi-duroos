/**
 * "Start your own company in Saudi Arabia" guide content.
 * Figures are what founders in Madinah paid in 2026. Government fees change often,
 * so the page tells readers to confirm each fee on the portal before paying.
 */

export const SLUG = "start-a-company-in-saudi";
export const TITLE = "Start your own company in Saudi Arabia";
export const SUMMARY =
  "Set up a MISA-licensed company and get residency for you and your family without paying an agency 30,000 to 50,000 SAR. The order of steps, real fees, documents, banks, and the mistakes that cost founders time.";
export const CHECKED = "8 November 2026";

export type Licence = { id: string; name: string; bestFor: string; capital: string; fee: string; needs: string; note?: string };

export const LICENCES: Licence[] = [
  {
    id: "service",
    name: "Service",
    bestFor: "Consulting, IT, marketing, design, training, e-learning",
    capital: "None on paper. Banks may expect around 100,000 SAR as an operating balance.",
    fee: "About 62,000 SAR a year at the standard rate",
    needs: "A parent company abroad, at least a year old, with its CR, articles of association and last year's financials, apostilled and translated into Arabic.",
    note: "The most common route for students and graduates with a small business back home.",
  },
  {
    id: "entrepreneur",
    name: "Entrepreneur (startup)",
    bestFor: "Solo founders with no company abroad yet, still testing an idea",
    capital: "Often none",
    fee: "Far lower than the Service licence",
    needs: "A support letter from a recognised Saudi accelerator, incubator or programme, which sponsors your application.",
    note: "Renewed every year, for up to 5 years. Each renewal asks you to show real activity, so plan to move to a standard licence in year 2 or 3.",
  },
  {
    id: "trading",
    name: "Trading",
    bestFor: "Wholesale or retail of physical goods",
    capital: "30,000,000 SAR for 100% foreign ownership, much less with a Saudi partner holding 25% or more",
    fee: "About 62,000 SAR a year",
    needs: "Registered companies in at least 3 countries, or a Saudi joint-venture partner.",
  },
  {
    id: "industrial",
    name: "Industrial",
    bestFor: "Manufacturing, food production, assembly",
    capital: "500,000 SAR",
    fee: "About 62,000 SAR a year plus Ministry of Industry fees",
    needs: "Parent company, financials, and Ministry of Industry approval.",
  },
  {
    id: "professional",
    name: "Professional services",
    bestFor: "Law, accounting, engineering, healthcare",
    capital: "Set by the profession's body",
    fee: "About 62,000 SAR a year",
    needs: "Parent company, financials, and approval from the profession's body (for example SOCPA for accountants, SCE for engineers).",
  },
  {
    id: "realestate",
    name: "Real estate",
    bestFor: "Development and brokerage",
    capital: "Varies",
    fee: "About 62,000 SAR a year",
    needs: "REGA approval. Real estate activity in Makkah and Madinah is restricted for foreign owners.",
  },
];

export type Stage = { when: string; title: string; time: string; body: string; tip?: string };

export const TIMELINE: Stage[] = [
  {
    when: "Before day 0",
    title: "Notarise, apostille, translate",
    time: "2 to 4 weeks",
    body: "Notarise your parent company's CR, articles of association, financials and board resolution in your home country, apostille them, then have them translated into Arabic by a certified translator in Saudi Arabia. Budget about 1,500 SAR.",
    tip: "This is the step people forget. Start it the day you decide.",
  },
  {
    when: "Day 0",
    title: "Apply for the MISA licence",
    time: "1 day",
    body: "Apply on investsaudi.sa under your parent company's legal name. You do not have a Saudi trade name yet, and that is expected.",
  },
  {
    when: "Week 1 to 2",
    title: "MISA approves",
    time: "1 to 2 weeks",
    body: "The licence is issued under your overseas name. Pay the processing fee on issue.",
  },
  {
    when: "Week 2 to 3",
    title: "Reserve your Saudi trade name, then amend MISA",
    time: "Same day",
    body: "Reserve the name your company will trade under in Saudi (hajz al-ism) through the Saudi Business Center. Then log back into investsaudi.sa and amend the licence to match. The amendment is free and takes about an hour.",
    tip: "Skip the amendment and the CR will refuse to issue.",
  },
  {
    when: "Week 3 to 4",
    title: "Commercial Registration (CR)",
    time: "3 to 5 days",
    body: "File the LLC through the Saudi Business Center. The CR comes with Saudi articles of association written for you. GOSI, Qiwa and ZATCA open your files within about an hour. Order the CR Extract (100 SAR) the same day.",
  },
  {
    when: "Week 5 to 7",
    title: "Muqeem, iqama, bank account",
    time: "2 to 4 weeks, in parallel",
    body: "Subscribe to Muqeem, sort your iqama (new or transferred), change your occupation, print the physical iqama, then open the company bank account.",
    tip: "The bank waits for the physical iqama card, so order it early.",
  },
];

export type Cost = { id: string; label: string; sar: number | null; agency: string; note?: string; optional?: boolean };

export const COSTS: Cost[] = [
  { id: "apostille", label: "Notarise, apostille and translate documents", sar: 1500, agency: "Bundled", note: "Varies by country" },
  { id: "misa", label: "MISA licence, year 1", sar: 500, agency: "15,000+", note: "Processing fee. Check whether the first-year fee is still waived" },
  { id: "sbc", label: "Saudi Business Center, LLC set-up", sar: 1775, agency: "Bundled" },
  { id: "cr", label: "Commercial Registration", sar: 1163, agency: "3,000+" },
  { id: "extract", label: "CR Extract (banks need it)", sar: 100, agency: "Bundled" },
  { id: "muqeem", label: "Muqeem subscription, basic", sar: 1265, agency: "Not included" },
  { id: "occupation", label: "Change of occupation on your iqama", sar: 1000, agency: "Not included" },
  { id: "print", label: "Physical iqama print (Muqeem points)", sar: 575, agency: "Not included" },
  { id: "qiwa", label: "Labour office (Qiwa)", sar: 90, agency: "Bundled" },
  { id: "chamber", label: "Chamber of Commerce, yearly", sar: 1000, agency: "Bundled", note: "1,000 to 3,000 SAR by tier", optional: true },
];

/** Iqama transfer fee by how many times you have transferred before. */
export const TRANSFER_FEES = [
  { label: "New iqama, no transfer", sar: 0 },
  { label: "1st transfer", sar: 2000 },
  { label: "2nd transfer", sar: 4000 },
  { label: "3rd or later", sar: 6000 },
];

export type Start = { id: string; label: string; short: string; first: string; iqama: string };

export const STARTS: Start[] = [
  {
    id: "abroad",
    label: "Abroad, no Saudi visa",
    short: "Most common",
    first: "Do all of the apostille and translation work at home, then apply to MISA from abroad. No need to fly in yet.",
    iqama: "Once the CR, GOSI and Qiwa are live, your company issues your own work visa as General Manager. Get it stamped at the Saudi consulate, fly in, do biometrics and the medical, and the iqama follows in 2 to 4 weeks.",
  },
  {
    id: "visit",
    label: "In Saudi on a visit or Umrah visa",
    short: "Apply from here",
    first: "You can apply to MISA from inside the Kingdom. The portal does not check your visa type.",
    iqama: "You cannot receive an iqama on a visit visa. Once your company issues the General Manager visa, leave, collect it at a Saudi consulate in your home country or nearby, come back on it, and the iqama follows in 2 to 4 weeks.",
  },
  {
    id: "iqama",
    label: "In Saudi on someone else's iqama",
    short: "Transfer",
    first: "Set up the company as normal. You do not need to leave the country, but your current sponsor has to release you.",
    iqama: "Transfer the iqama to your own company through Muqeem (change of occupation, new sponsor). Expect about 4,000 SAR in fees, and you will need at least one Saudi on payroll for Nitaqat before the transfer goes through.",
  },
];

export const DOCUMENTS = [
  { id: "cr", title: "Parent company CR", body: "Registered at least a year ago. No company yet? Register a simple one at home first (Ltd, Pty Ltd, LLC, Sdn Bhd). That becomes your parent." },
  { id: "fin", title: "Last year's audited financials", body: "For a young parent company, an accountant's letter is often accepted." },
  { id: "aoa", title: "Parent articles of association", body: "The company's founding document. Names must match the CR exactly." },
  { id: "res", title: "Board resolution", body: "Approves the Saudi investment and appoints the General Manager. Wording must match the articles of association." },
  { id: "gm", title: "General Manager's passport and CV", body: "The Arabic spelling of your name must match across every document and visa stamp." },
  { id: "poa", title: "Power of attorney (only if needed)", body: "Only if someone in Saudi Arabia will sign for you. Notarised and apostilled like the rest." },
  { id: "ar", title: "Arabic company name, checked", body: "Pay a Saudi lawyer (about 500 to 1,500 SAR) to check the Arabic name. The Arabic version is the legally binding one." },
];

export const AFTER_CR = [
  { name: "GOSI", what: "Social insurance", body: "Opens by itself within about an hour of the CR. Log in to activate. Needed before you hire anyone.", auto: true },
  { name: "Qiwa", what: "Labour ministry platform", body: "Opens by itself. Manage your Nitaqat (Saudization) rating, work visas and contracts.", auto: true },
  { name: "ZATCA", what: "Zakat, tax and VAT", body: "Opens by itself. Log in and confirm the details. VAT registration is compulsory once sales pass 375,000 SAR a year. You may register voluntarily from 187,500 SAR.", auto: true },
  { name: "National Address", what: "Saudi Post (SPL)", body: "Free. A home address is fine. Needed for the bank, iqama renewals and government letters." },
  { name: "Chamber of Commerce", what: "Yearly subscription", body: "Online, same day. About 1,000 to 3,000 SAR a year depending on tier." },
  { name: "Muqeem", what: "Iqama management", body: "Renewals, dependants, change of occupation and physical iqama prints. Basic package about 1,265 SAR." },
  { name: "Mudad", what: "Salary system", body: "Only once you have staff on payroll. It also shows your salary, which matters for family visas." },
  { name: "Balady", what: "Municipal licence", body: "Only if you work from a physical shop or office. Many online and service businesses never need it." },
];

export const FAMILY = [
  { title: "GOSI and Qiwa are live", time: "1 to 2 days after the CR", body: "No work visa can be issued until your company's labour file exists." },
  { title: "General Manager work visa", time: "2 to 4 weeks", body: "Issue it on Qiwa, get it stamped at a Saudi consulate, and enter on it." },
  { title: "Your iqama", time: "2 to 4 weeks after entry", body: "Biometrics, medical, then the iqama card. You are now a resident." },
  { title: "Wife and children", time: "4 to 6 weeks", body: "Once Mudad shows your salary at about 4,000 SAR a month or more, apply for family visas, then their iqamas." },
];

export const BANKS = [
  { name: "Al Rajhi Bank", good: "Largest branch network, fully Sharia-compliant, strong SME onboarding.", watch: "Heavy document checks. Turns away crypto, money services and gaming.", time: "4 to 6 weeks" },
  { name: "Alinma Bank", good: "Fully Sharia-compliant, with branches in Madinah that handle new company accounts.", watch: "Experience varies by branch. Ask for the business banking officer.", time: "1 to 3 weeks" },
  { name: "Riyad Bank", good: "Experienced SME team, reasonable document demands, trade finance.", watch: "Varies by branch. Ask for a relationship manager rather than walking in.", time: "4 to 7 weeks" },
  { name: "Saudi National Bank (SNB)", good: "Strong English-language corporate banking and online portal. Good for incoming foreign transfers.", watch: "Often asks for a higher opening balance (around 100,000 SAR). It stays usable as operating money.", time: "5 to 8 weeks" },
];

export const BANK_DOCS = [
  { title: "CR certificate", body: "السجل التجاري. Bring it, but it is not enough on its own." },
  { title: "CR Extract", body: "مستخرج السجل. Ordered on the Ministry of Commerce portal, 100 SAR. Banks treat it as a separate document." },
  { title: "Saudi articles of association", body: "عقد التأسيس. Issued with your CR. You do not draft it yourself." },
  { title: "Foreign articles of association", body: "Your parent company's, apostilled and in Arabic. The work you did before day 0 pays off here." },
  { title: "National Address", body: "العنوان الوطني. From Saudi Post. Free, and the bank will not open the account without it." },
  { title: "Physical iqama card", body: "أصل الإقامة. Showing your new occupation and your own company. Banks refuse the digital copy." },
  { title: "MISA licence", body: "رخصة الاستثمار. Download the latest PDF from investsaudi.sa." },
];

export const MISTAKES = [
  { title: "Choosing the wrong licence", body: "Service, Trading and Industrial are not interchangeable. Pick what you will actually invoice for. Amending later costs fees and months." },
  { title: "Skipping the MISA name amendment", body: "Your CR will not issue if the MISA name and the reserved trade name differ. The fix is free and takes an hour on investsaudi.sa." },
  { title: "A careless Arabic name", body: "The Arabic company name is the binding one. Have a lawyer check it. Do not trust machine translation." },
  { title: "Taking only the CR certificate to the bank", body: "Banks want the CR Extract (100 SAR) as well." },
  { title: "Forgetting the physical iqama", body: "After a transfer, banks need the printed card showing your new employer. Order it through Muqeem." },
  { title: "Wrong occupation on the iqama", body: "Your iqama job title must match your role as General Manager. Change it in Muqeem before the bank or GOSI ask." },
  { title: "Applying to one bank at a time", body: "Apply to two at once. Start the day your CR Extract is issued." },
  { title: "Hiring two foreigners first", body: "Your Nitaqat rating drops straight away. Hire your first Saudi before your second foreigner." },
  { title: "Making your wife the General Manager", body: "The General Manager is personally liable for tax and labour breaches. It is not a formality." },
  { title: "Withdrawing capital early", body: "Capital you deposited and certified must stay in until the business starts operating." },
  { title: "Leaving VAT too late", body: "Register as soon as you expect to pass the threshold. Late registration carries a 10,000 SAR fine, and back-dated VAT is painful." },
  { title: "English-only contracts", body: "Saudi courts work from the Arabic. Negotiate the Arabic version, not a translation of the English one." },
];

export const PLAN = [
  { phase: "This week", items: [
    { id: "p1", title: "Decide your licence", body: "Use the licence finder above. Most people with a small business at home need the Service licence." },
    { id: "p2", title: "Make sure you have a parent company", body: "Any structure works. If you have none, register one at home now. The standard licence wants a year of history." },
    { id: "p3", title: "Start the apostille work", body: "Parent CR, articles of association, financials, board resolution and your passport. 2 to 4 weeks and about 1,500 SAR." },
  ] },
  { phase: "Next 30 days", items: [
    { id: "p4", title: "Apply on investsaudi.sa", body: "Use your parent company's name." },
    { id: "p5", title: "Pay the processing fee when approved", body: "Usually 1 to 2 weeks." },
    { id: "p6", title: "Reserve your Saudi trade name", body: "Through the Saudi Business Center." },
    { id: "p7", title: "Amend the MISA licence to that name", body: "Free, about an hour." },
    { id: "p8", title: "File the CR and order the CR Extract", body: "3 to 5 days, then 100 SAR for the extract." },
    { id: "p9", title: "Log in to GOSI, Qiwa and ZATCA", body: "They open by themselves within about an hour of the CR." },
    { id: "p10", title: "Register your National Address", body: "Free through Saudi Post." },
  ] },
  { phase: "Getting operational", items: [
    { id: "p11", title: "Hire your first Saudi", body: "Lifts your Nitaqat within about a week and clears the way for your iqama." },
    { id: "p12", title: "Iqama, change of occupation, physical card", body: "All through Muqeem." },
    { id: "p13", title: "Open the bank account", body: "Two banks at once. The General Manager signs in person." },
    { id: "p14", title: "Later, only when needed", body: "Mudad once you pay salaries. Balady only if you trade from premises." },
  ] },
];

export const COMPARE = [
  { row: "Year 1 set-up", ksa: "About 12,000 SAR in government fees while the first-year fee is waived", uae: "About 20,000 to 35,000 SAR" },
  { row: "Each year after", ksa: "About 80,000 SAR, mostly the MISA licence and iqama renewals", uae: "About 15,000 to 25,000 SAR" },
  { row: "Corporate tax", ksa: "20% on the foreign-owned share", uae: "9% above AED 375,000" },
  { row: "VAT", ksa: "15%", uae: "5%" },
  { row: "Market", ksa: "35 million people and heavy Vision 2030 spending", uae: "About 10 million, mostly expatriates" },
  { row: "Government contracts", ksa: "Full access to tenders", uae: "Limited without a mainland branch" },
  { row: "Living in Madinah", ksa: "You are already here", uae: "A different life entirely" },
];

export const GLOSSARY = [
  { term: "MISA", def: "Ministry of Investment. Issues the licence that lets a foreigner own a Saudi company. Portal: investsaudi.sa." },
  { term: "CR (Commercial Registration)", def: "Your company's registration with the Ministry of Commerce. السجل التجاري." },
  { term: "AoA", def: "Articles of association. The founding document of a company." },
  { term: "Apostille", def: "A stamp that makes a document valid abroad. Saudi Arabia has accepted apostilles since December 2022, so documents from member countries no longer need the Saudi embassy step." },
  { term: "Hajz al-ism", def: "Reserving your Saudi trade name. حجز الاسم." },
  { term: "Saudi Business Center", def: "One-stop government service where you file the CR." },
  { term: "GOSI", def: "General Organization for Social Insurance. Contributions on salaries." },
  { term: "Qiwa", def: "Labour ministry platform for work visas, contracts and Nitaqat." },
  { term: "Nitaqat", def: "Saudization rating. Your colour band decides what visas and transfers you can do." },
  { term: "ZATCA", def: "Zakat, Tax and Customs Authority. VAT, corporate tax and zakat." },
  { term: "Muqeem", def: "Platform for managing iqamas: renewals, dependants, occupation changes, prints." },
  { term: "Mudad", def: "Salary protection system. Shows what your company pays you." },
  { term: "Balady", def: "Municipal licence for physical premises." },
  { term: "National Address", def: "Your official address registered with Saudi Post." },
];

export const LINKS = [
  { label: "Invest Saudi (MISA licence)", href: "https://investsaudi.sa" },
  { label: "Saudi Business Center", href: "https://business.sa" },
  { label: "Ministry of Commerce", href: "https://mc.gov.sa" },
  { label: "Qiwa", href: "https://qiwa.sa" },
  { label: "GOSI", href: "https://www.gosi.gov.sa" },
  { label: "ZATCA", href: "https://zatca.gov.sa" },
  { label: "Muqeem", href: "https://muqeem.sa" },
  { label: "Saudi Post National Address", href: "https://splonline.com.sa" },
  { label: "Mudad", href: "https://mudad.com.sa" },
  { label: "Balady", href: "https://balady.gov.sa" },
];

/** Shown in the guides list, search and sitemap alongside the guides stored in the database. */
export const GUIDE_CARD = {
  id: -1,
  slug: SLUG,
  title: TITLE,
  summary: SUMMARY,
  bodyHtml: "",
  stage: "getting-settled" as const,
  coverUrl: null,
  readingMinutes: 12,
  status: "published" as const,
  lastVerifiedAt: new Date("2026-11-08T00:00:00Z"),
  createdAt: new Date("2026-11-08T00:00:00Z"),
  updatedAt: new Date("2026-11-08T00:00:00Z"),
};

/** Plain text for site search. */
export const SEARCH_TEXT = [
  "MISA licence investment company business CR commercial registration iqama GOSI Qiwa ZATCA VAT Muqeem Nitaqat bank account apostille entrepreneur startup",
  ...LICENCES.map((l) => `${l.name} ${l.bestFor}`),
  ...MISTAKES.map((m) => m.title),
].join(" ");
