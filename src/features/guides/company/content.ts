/**
 * "Start your own company in Saudi Arabia": MESH's own guide.
 *
 * Checked against the 2025 Investment Law (MISA registration replaced the licence), the
 * Commercial Register Law (April 2025), the Chambers of Commerce Law (3-year exemption),
 * ZATCA rules (VAT, e-invoicing waves, 120-day returns), GOSI rates, the HCCH apostille
 * table, residence-based tax rules in Western countries and IRS figures for 2026.
 * Fees are rounded and change often; the page tells readers to confirm on each portal.
 */

export const SLUG = "start-a-company-in-saudi";
export const TITLE = "Start your own company in Saudi Arabia";
export const SUMMARY =
  "A plain-English guide to owning a Saudi company as a Western resident: the 2025 rules, each phase from paperwork at home to your first invoice, what it costs to set up and keep running, taxes in Saudi Arabia and back home, and bringing your family.";
export const CHECKED = "8 November 2026";

export const FIT = [
  { id: "f1", title: "You have something to invoice", body: "Clients who will pay your Saudi company for a service: teaching, design, software, translation, consulting. A company with no revenue still has yearly costs." },
  { id: "f2", title: "You can carry the yearly costs before profit", body: "Iqama, work permit and family fees arrive whether or not the business earns. Use the calculator below to see your number." },
  { id: "f3", title: "You are ready to hire a Saudi as you grow", body: "Saudization rules shape which visas and transfers your company can use. One Saudi employee changes a lot." },
  { id: "f4", title: "You are not relying on a scholarship iqama", body: "An iqama has one sponsor. If the University sponsors you, read the student note below first." },
  { id: "f5", title: "You are happy with yearly paperwork", body: "Tax returns, registration updates and renewals every year. An accountant can do most of it for you." },
];

export const NOT_FREELANCE =
  "Why not just freelance? Saudi Arabia's freelance document (freelance.sa) is for Saudi nationals. Foreign residents need a sponsor for any paid work: an employer, their own company, or Premium Residency. Working for local clients without the right status can lead to fines and losing your residency.";

export const CHANGES_2025 = [
  { title: "Registration, not a licence", body: "Since February 2025, foreign owners register with the Ministry of Investment (MISA) instead of buying an investment licence, and the large yearly licence fee has gone. Many websites still describe the old licence." },
  { title: "Keep your registration current", body: "Update your MISA registration once a year, and whenever owners, capital or activities change." },
  { title: "Company registrations no longer expire", body: "Since April 2025 the commercial registration (CR) has no expiry date. Instead, confirm its details online once a year. Leave it more than 90 days late and the CR is suspended, which can freeze your bank account." },
  { title: "No Chamber fee for 3 years", body: "New companies pay no Chamber of Commerce subscription for their first 3 years." },
];

export type Situation = { id: string; label: string; first: string; residency: string; warn?: string };

export const SITUATIONS: Situation[] = [
  {
    id: "abroad",
    label: "Living outside Saudi Arabia",
    first: "Everything up to the company registration can be done online from home. Certify your documents locally before you start.",
    residency: "Your new company requests a work visa for you as General Manager. You collect it at a Saudi consulate, travel in on it, complete the medical and fingerprints, and receive your iqama.",
  },
  {
    id: "visit",
    label: "Here on a visit or Umrah visa",
    first: "You can register the company while you are here; the portals do not depend on your visa type.",
    residency: "A visit visa cannot become an iqama. When your work visa is ready, you leave, have it stamped at a Saudi consulate abroad, and come back on it.",
  },
  {
    id: "employee",
    label: "Working here for someone else",
    first: "Register the company alongside your job. Nothing changes for you until you move your iqama.",
    residency: "Your employer releases you and your iqama is transferred to your own company. Transfer fees rise with each transfer you have made, and your company's Saudization rating may need to be healthy first.",
  },
  {
    id: "student",
    label: "On a University scholarship",
    first: "While you study, the University is your sponsor, and an iqama can only have one.",
    residency: "Moving your iqama to your own company means leaving University sponsorship, with its housing, stipend and student status. Most students wait until graduation.",
    warn: "Speak to the University before you register a company that depends on your iqama.",
  },
];

export type Path = { id: string; name: string; bestFor: string; needs: string; capital: string; note?: string };

export const PATHS: Path[] = [
  {
    id: "service",
    name: "Services company",
    bestFor: "Teaching, translation, design, software, marketing, consulting and other work you invoice for",
    needs: "Usually a company you already own at home, with its registration, founding rules and latest accounts. Some founders register as individuals with proof of personal funds; ask MISA which route fits you.",
    capital: "No legal minimum for an LLC, but keep enough in the account to look like a working business.",
    note: "The usual choice for students, graduates and remote professionals.",
  },
  {
    id: "startup",
    name: "Startup route",
    bestFor: "A new, scalable product with no company behind it yet",
    needs: "Backing from a recognised Saudi accelerator, incubator or startup programme.",
    capital: "Often none",
    note: "Programmes expect real progress at each renewal. Plan your move to a standard registration early.",
  },
  {
    id: "trading",
    name: "Selling physical goods",
    bestFor: "Importing, wholesale or retail",
    needs: "Fully foreign-owned trading carries much stricter conditions, including far higher capital. A Saudi partner can make it simpler.",
    capital: "High when fully foreign-owned",
    note: "Selling your own services online is not trading. Choose activities carefully.",
  },
  {
    id: "industrial",
    name: "Manufacturing",
    bestFor: "Producing, packing or assembling goods",
    needs: "An industrial licence from the Ministry of Industry as well as the MISA registration.",
    capital: "Set by the industrial licence",
  },
  {
    id: "professional",
    name: "Licensed profession",
    bestFor: "Law, accounting, engineering, healthcare",
    needs: "Approval from the profession's Saudi body, such as SOCPA (accountants), the Saudi Council of Engineers or the Saudi Commission for Health Specialties.",
    capital: "Set by the profession's body",
  },
  {
    id: "property",
    name: "Real estate",
    bestFor: "Development, brokerage, property management",
    needs: "Approval from the Real Estate General Authority (REGA). Property activity inside Makkah and Madinah is restricted for non-Saudis.",
    capital: "Varies",
  },
];

export type Phase = { id: string; name: string; time: string; steps: string[]; watch: string };

export const PHASES: Phase[] = [
  {
    id: "home",
    name: "Paperwork at home",
    time: "2 to 4 weeks",
    steps: [
      "Decide exactly what the company will do. Activities are chosen from a fixed national list, and changing them later costs time.",
      "Gather your home company's papers, or prepare the personal route if MISA allows it.",
      "Certify private documents with a notary or lawyer, then apostille everything.",
    ],
    watch: "Translations into Arabic must be done by a certified translator in Saudi Arabia, so keep apostilled originals safe for that step.",
  },
  {
    id: "register",
    name: "Register the company",
    time: "2 to 4 weeks",
    steps: [
      "Register with MISA on investsaudi.sa and choose your activities.",
      "Reserve your Saudi company name, in Arabic and English, at the Saudi Business Center.",
      "Make sure the name on your MISA registration matches the reserved name exactly. Updating it on investsaudi.sa is free.",
      "Form the LLC and receive your commercial registration (CR). Saudi articles of association are produced for you.",
      "Order the official CR extract; banks and many offices ask for it.",
    ],
    watch: "A mismatch between the MISA name and the reserved name stops the CR. Check spelling, spacing and Arabic letters.",
  },
  {
    id: "accounts",
    name: "Switch on government accounts",
    time: "About a week",
    steps: [
      "GOSI (social insurance), Qiwa (labor) and ZATCA (tax) open automatically after the CR. Log in to each and confirm the details.",
      "Register the company's National Address with Saudi Post.",
      "Activate Absher Business for the company's government services.",
      "Subscribe to Muqeem to manage iqamas.",
    ],
    watch: "Use a company email and phone number you will keep. Every portal sends codes to them for years.",
  },
  {
    id: "residency",
    name: "Residency and bank",
    time: "3 to 6 weeks",
    steps: [
      "Issue your General Manager work visa through Qiwa, or transfer your existing iqama.",
      "Medical, fingerprints, then your iqama. Set your job title to your real role.",
      "Order the printed iqama card; banks ask for it.",
      "Open the company bank account. The General Manager signs in person.",
    ],
    watch: "Health insurance from an approved insurer is required for you and your family's iqamas. Arrange it before renewals fall due.",
  },
];

export type Cost = { id: string; label: string; sar: number; note?: string };

export const SETUP_COSTS: Cost[] = [
  { id: "docs", label: "Certifying documents at home and Arabic translation", sar: 1500, note: "Depends on your country and how many documents" },
  { id: "misa", label: "MISA registration processing", sar: 500 },
  { id: "company", label: "Company formation and CR at the Saudi Business Center", sar: 3000 },
  { id: "extract", label: "Official CR extract", sar: 100 },
  { id: "iqama", label: "Muqeem subscription, job title change and printed iqama", sar: 2800 },
  { id: "misc", label: "Labor office and small government fees", sar: 200 },
];

export const TRANSFER_FEES = [
  { label: "New iqama, no transfer", sar: 0 },
  { label: "Transfer, 1st time", sar: 2000 },
  { label: "Transfer, 2nd time", sar: 4000 },
  { label: "Transfer, 3rd time or more", sar: 6000 },
];

export const YEARLY = {
  iqama: 650,
  levyMonthly: 800,
  dependantMonthly: 400,
  muqeem: 1300,
};

export const DOCS_HOME = [
  { id: "h1", title: "Home company registration", body: "Certificate of incorporation (for a US LLC, the certificate of formation or articles of organization), plus a recent certificate of good standing." },
  { id: "h2", title: "Founding rules", body: "Articles of association, bylaws or, for a US LLC, the operating agreement." },
  { id: "h3", title: "Latest accounts", body: "Last year's financial statements. A young company can often use an accountant's letter." },
  { id: "h4", title: "Owners' decision", body: "A signed resolution approving the Saudi company and naming you General Manager." },
  { id: "h5", title: "Passport and CV", body: "Yours, as General Manager. Spell your name the same way everywhere." },
  { id: "h6", title: "Family certificates", body: "Marriage and children's birth certificates, if your family will join you. Apostille them now to save a second round." },
];

export const DOCS_KSA = [
  { id: "k1", title: "Certified Arabic translations", body: "Of everything you apostilled, by a certified translator in Saudi Arabia." },
  { id: "k2", title: "Checked Arabic company name", body: "A Saudi lawyer's review of the Arabic name costs a few hundred riyals and avoids a binding mistake." },
  { id: "k3", title: "Power of attorney (if needed)", body: "Only if someone here will sign for you while you are abroad." },
];

export const APOSTILLE_RULE =
  "Every country in the Apostille Convention has an official issuer, usually the foreign ministry or a state, provincial or regional office. Documents issued by a government office (company registry records, birth and marriage certificates) can usually be apostilled as they are. Private documents (resolutions, copies, your CV) need a notary or lawyer to certify them first. Saudi Arabia has accepted apostilles since December 2022, so the Saudi embassy step is no longer needed for member countries.";

export const APOSTILLE = [
  { who: "United States", how: "Two issuers: the Secretary of State of the state that issued the document, or the US Department of State for federal documents such as FBI background checks." },
  { who: "United Kingdom", how: "The FCDO Legalisation Office. Company documents usually need a solicitor or notary to certify them first." },
  { who: "Canada", how: "A member only since January 2024, so older advice still describes embassy legalisation. Global Affairs Canada and some provinces issue apostilles." },
  { who: "Europe, Australia, New Zealand", how: "Members. The foreign ministry, or a court or regional office in some European countries, issues them." },
];

export const RUNNING = [
  { when: "Every month", items: [
    "Pay salaries through the bank and upload them to Mudad (the wage protection system).",
    "Pay GOSI contributions: 2% for foreign staff, about 12% from the employer for Saudi staff.",
    "Keep your books up to date and your company and personal money separate.",
  ] },
  { when: "Every quarter", items: [
    "File the VAT return if you are registered, by the end of the following month. Companies above 40 million SAR file monthly.",
  ] },
  { when: "All the time", items: [
    "Issue invoices from e-invoicing software that meets ZATCA's Fatoora rules once you are VAT-registered. ZATCA tells each business when it must connect its system.",
    "Record every employment contract on Qiwa.",
  ] },
  { when: "Every year", items: [
    "File your corporate tax or zakat return within 120 days of your financial year end.",
    "Confirm your CR details online and update your MISA registration.",
    "Renew iqamas and health insurance, and from year 4 the Chamber subscription.",
  ] },
];

export const NITAQAT = [
  { title: "What it is", body: "A rating for every company based on how many Saudis it employs compared with foreigners, shown as a color band." },
  { title: "Why it matters", body: "Your band decides which services you can use: new work visas, iqama transfers and renewals. Low bands lose access." },
  { title: "What counts", body: "A Saudi employee paid at least 4,000 SAR a month counts fully. Contracts must be recorded on Qiwa and salaries paid through Mudad." },
  { title: "Premises", body: "Some activities need a municipal (Balady) licence, which needs a real shop or office. If you work from home, ask the Saudi Business Center which activities can be registered without one before you choose." },
];

export const BANKS = [
  { name: "Al Rajhi Bank", type: "Islamic" },
  { name: "Alinma Bank", type: "Islamic" },
  { name: "Arab National Bank (ANB)", type: "Conventional, with Islamic products" },
  { name: "Bank Albilad", type: "Islamic" },
  { name: "Bank AlJazira", type: "Islamic" },
  { name: "Banque Saudi Fransi", type: "Conventional, with Islamic products" },
  { name: "Riyad Bank", type: "Conventional, with Islamic products" },
  { name: "Saudi Awwal Bank (SAB)", type: "Conventional, with Islamic products" },
  { name: "Saudi National Bank (SNB)", type: "Conventional, with Islamic products" },
];

export const BANK_ASK = [
  "Do you open accounts for companies owned by foreign residents, and how long does it usually take?",
  "Is there a minimum opening or monthly balance?",
  "Is online banking available in English, with more than one user?",
  "Can you provide a business card, payment terminal or online payment link?",
  "Can I receive international transfers, and what do they cost?",
];

export const BANK_DOCS = [
  { title: "Commercial registration and CR extract", body: "Both. The extract is ordered online for 100 SAR." },
  { title: "Saudi articles of association", body: "Issued with your CR." },
  { title: "Home company documents", body: "Apostilled and translated, if a parent company owns the Saudi company." },
  { title: "MISA registration", body: "The latest copy from investsaudi.sa." },
  { title: "National Address", body: "The company's, from Saudi Post." },
  { title: "Printed iqama", body: "Showing your own company as sponsor and your current job title." },
];

export const GROW = [
  { title: "A .sa website", body: "Saudi domains are registered through SaudiNIC and need your CR." },
  { title: "Protect your name", body: "Register your brand as a trademark with the Saudi Authority for Intellectual Property (SAIP)." },
  { title: "Take payments online", body: "Payment gateways ask for your CR, VAT certificate (if registered) and a bank letter." },
  { title: "Selling online", body: "Online stores register their e-commerce activity through the Saudi Business Center." },
];

export const FAMILY = [
  "Your recorded salary must meet the minimum for family sponsorship.",
  "Apostilled and translated marriage and birth certificates.",
  "Health insurance for each family member.",
  "A family fee of 400 SAR a month for each dependant, paid with iqama renewals.",
  "Family visas are requested online once your own iqama is issued.",
];

export const TAX = [
  { title: "Corporate income tax: 20%", body: "On the profit of the foreign-owned share of your company." },
  { title: "Zakat: 2.5%", body: "In place of income tax on any share owned by Saudi or GCC nationals." },
  { title: "VAT: 15%", body: "Registration is compulsory once sales pass 375,000 SAR a year and voluntary from 187,500 SAR. Registering late carries a 10,000 SAR fine." },
  { title: "Dividends paid abroad: 5% withheld", body: "When profits go to a shareholder outside Saudi Arabia, such as your home company." },
  { title: "No personal income tax", body: "Your salary is not taxed in Saudi Arabia. Your home country may see it differently; see below." },
];

export const HOME_TAX = [
  { title: "Most countries tax where you live", body: "The UK, Canada, Australia, Ireland and most of Europe tax by residence, not passport. Once you have properly left, your Saudi salary is usually not taxed at home. Income from home, such as rent, still is." },
  { title: "Leaving has to be done properly", body: "Each country has its own residence test. Keeping a home, family or long stays there can leave you resident. Tell your tax office you have moved." },
  { title: "Some countries tax you as you leave", body: "Canada, for example, can tax gains on certain assets on the day you emigrate (departure tax)." },
  { title: "Owning a company abroad while still resident", body: "If you remain resident at home, controlled foreign company rules can tax your Saudi company's profits there. The UK, Canada, Australia and EU countries all have them." },
];

export const US_TAX = [
  { title: "You still file a US return", body: "The US taxes its citizens wherever they live, and has no income tax treaty with Saudi Arabia." },
  { title: "Foreign earned income exclusion", body: "Up to $132,900 of salary earned abroad in 2026 (Form 2555), if you pass the physical presence or residence test. It does not cover company profits or dividends." },
  { title: "FBAR (FinCEN 114)", body: "Report foreign accounts if together they exceed $10,000 at any point in the year, including the company account you can sign on." },
  { title: "Form 5471 or 8858", body: "Owning a foreign company means an information return each year. Penalties for missing it start at $10,000." },
  { title: "Profits left in the company", body: "GILTI and Subpart F rules can tax some profits of a foreign company you control even if they are not paid out. Saudi tax paid can often be credited." },
];

export const PREMIUM = [
  { name: "Entrepreneur", body: "For founders backed by an approved investor or incubator." },
  { name: "Business investor", body: "Investing at least 7,000,000 SAR in a Saudi company." },
  { name: "Real estate owner", body: "Owning residential property worth at least 4,000,000 SAR." },
  { name: "Special talent", body: "For specialists in health, science, research, culture and sport." },
];

export const PITFALLS = [
  { phase: "Before you start", title: "Choosing activities in a hurry", body: "Activities decide your rules, licences and whether you need premises. Read the list properly." },
  { phase: "Before you start", title: "Assuming a student iqama can carry a company", body: "It cannot without leaving University sponsorship." },
  { phase: "Registering", title: "Names that do not match", body: "MISA, the reserved name and the CR must agree letter for letter." },
  { phase: "Registering", title: "An unchecked Arabic name", body: "The Arabic name is the binding one. Avoid machine translation." },
  { phase: "Residency", title: "The wrong job title on your iqama", body: "Banks, GOSI and visa services check it. Fix it in Muqeem early." },
  { phase: "Residency", title: "Letting insurance or iqamas lapse", body: "Late renewals bring fines and block other services." },
  { phase: "Running it", title: "Mixing personal and company money", body: "It makes tax returns painful and weakens the protection of the LLC." },
  { phase: "Running it", title: "Hiring without Qiwa and Mudad", body: "Unrecorded contracts and unpaid salaries through the system both count against you." },
  { phase: "Running it", title: "Ignoring VAT and e-invoicing", body: "Watch your sales against the thresholds and use compliant invoicing software." },
  { phase: "Running it", title: "Forgetting the yearly confirmations", body: "A suspended CR can freeze your bank account." },
  { phase: "Back home", title: "Not telling your home tax office", body: "And for US citizens, missing FBAR or Form 5471." },
];

export const PLAN = [
  { phase: "Decide", items: [
    { id: "d1", title: "Check you are a good fit", body: "Revenue, yearly costs, your iqama situation." },
    { id: "d2", title: "Choose your company type and activities", body: "Use the finder and the national activity list." },
    { id: "d3", title: "Speak to a tax adviser for your home country", body: "Before you move money or sign anything." },
  ] },
  { phase: "Prepare", items: [
    { id: "p1", title: "Collect and certify documents at home", body: "Then apostille them." },
    { id: "p2", title: "Translate them in Saudi Arabia", body: "By a certified translator." },
    { id: "p3", title: "Have the Arabic company name checked", body: "By a Saudi lawyer." },
  ] },
  { phase: "Register", items: [
    { id: "r1", title: "Register with MISA", body: "On investsaudi.sa." },
    { id: "r2", title: "Reserve the company name", body: "At the Saudi Business Center, and match it on MISA." },
    { id: "r3", title: "Form the LLC and receive the CR", body: "Then order the CR extract." },
    { id: "r4", title: "Activate GOSI, Qiwa, ZATCA and Absher Business", body: "Plus the National Address and Muqeem." },
  ] },
  { phase: "Settle", items: [
    { id: "s1", title: "Your work visa or iqama transfer", body: "Then medical, fingerprints and iqama." },
    { id: "s2", title: "Printed iqama and correct job title", body: "Through Muqeem." },
    { id: "s3", title: "Company bank account", body: "Apply to two banks at once." },
    { id: "s4", title: "Family visas", body: "Once your own iqama is issued." },
  ] },
  { phase: "Run", items: [
    { id: "u1", title: "Accounting and invoicing set up", body: "Including e-invoicing once VAT-registered." },
    { id: "u2", title: "Calendar the yearly tasks", body: "Tax return, CR confirmation, MISA update, renewals." },
  ] },
];

export const GLOSSARY = [
  { term: "MISA", def: "Ministry of Investment. Foreign owners register with it before forming a company. Portal: investsaudi.sa." },
  { term: "CR (commercial registration)", def: "Your company's official registration, like a certificate of incorporation. السجل التجاري." },
  { term: "LLC", def: "Limited liability company. The usual structure; one owner is enough." },
  { term: "Articles of association", def: "A company's founding rules. Also called bylaws; for a US LLC, the operating agreement." },
  { term: "General Manager", def: "The person legally running the company, usually you. Your iqama comes through this role." },
  { term: "Iqama", def: "Saudi residence permit, tied to one sponsor." },
  { term: "Apostille", def: "An international certificate that makes an official document from one country valid in another." },
  { term: "Saudi Business Center", def: "Government one-stop shop for company names and registrations. business.sa." },
  { term: "Absher Business", def: "The company's account for government services such as visas and iqamas." },
  { term: "Chamber of Commerce", def: "Local business association. Voluntary in most Western countries; in Saudi Arabia membership comes with your CR." },
  { term: "GOSI", def: "Social insurance on salaries, like Social Security or National Insurance." },
  { term: "Qiwa", def: "Labor ministry portal for work visas, contracts and Nitaqat." },
  { term: "Nitaqat", def: "Saudization rating that decides which visa and iqama services your company can use." },
  { term: "Mudad", def: "Wage protection system. Salaries are paid through it." },
  { term: "ZATCA", def: "Zakat, Tax and Customs Authority. The Saudi equivalent of the IRS, HMRC or CRA." },
  { term: "Fatoora", def: "ZATCA's e-invoicing system and rules." },
  { term: "Zakat", def: "2.5% levy on the Saudi or GCC-owned share of a company." },
  { term: "VAT", def: "Value added tax, a 15% sales tax." },
  { term: "Muqeem", def: "Platform companies use to manage their foreign staff's iqamas." },
  { term: "Balady", def: "Municipal licence for physical premises." },
  { term: "Levy", def: "Monthly government fees for each foreign worker and each family member." },
];

export const LINKS = [
  { label: "Invest Saudi (MISA)", href: "https://investsaudi.sa" },
  { label: "Saudi Business Center", href: "https://business.sa" },
  { label: "Ministry of Commerce", href: "https://mc.gov.sa" },
  { label: "Qiwa", href: "https://qiwa.sa" },
  { label: "GOSI", href: "https://www.gosi.gov.sa" },
  { label: "ZATCA", href: "https://zatca.gov.sa" },
  { label: "Muqeem", href: "https://muqeem.sa" },
  { label: "Absher", href: "https://www.absher.sa" },
  { label: "Mudad", href: "https://mudad.com.sa" },
  { label: "Saudi Post National Address", href: "https://splonline.com.sa" },
  { label: "Balady", href: "https://balady.gov.sa" },
  { label: "SAIP (trademarks)", href: "https://www.saip.gov.sa" },
  { label: "Apostille Convention members", href: "https://www.hcch.net/en/instruments/conventions/status-table/?cid=41" },
  { label: "IRS: US citizens abroad", href: "https://www.irs.gov/individuals/international-taxpayers/us-citizens-and-resident-aliens-abroad" },
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
  readingMinutes: 15,
  status: "published" as const,
  lastVerifiedAt: new Date("2026-11-08T00:00:00Z"),
  createdAt: new Date("2026-11-08T00:00:00Z"),
  updatedAt: new Date("2026-11-08T00:00:00Z"),
};

/** Plain text for site search. */
export const SEARCH_TEXT = [
  "MISA investment registration company business LLC CR commercial registration iqama GOSI Qiwa ZATCA VAT zakat e-invoicing Fatoora Muqeem Mudad Nitaqat bank account apostille startup premium residency freelance FBAR 5471 tax",
  ...PATHS.map((p) => `${p.name} ${p.bestFor}`),
  ...PITFALLS.map((m) => m.title),
].join(" ");
