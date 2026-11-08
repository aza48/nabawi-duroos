/**
 * "Start your own company in Saudi Arabia" guide content.
 *
 * Checked against the 2025 Investment Law (registration replaced the MISA licence,
 * in force February 2025), the Commercial Register Law (in force April 2025), the
 * Chambers of Commerce Law (3-year fee exemption for new members), ZATCA tax rules,
 * the HCCH apostille status table, residence-based tax rules in Western countries and IRS figures for 2026. Day-to-day fees are what
 * founders in Madinah paid in 2026; the page tells readers to confirm on each portal.
 */

export const SLUG = "start-a-company-in-saudi";
export const TITLE = "Start your own company in Saudi Arabia";
export const SUMMARY =
  "Set up your own Saudi company and get residency for you and your family without paying an agency 30,000 to 50,000 SAR. What changed in 2025, the order of steps, real costs, documents, banks, US tax filings, and the mistakes that cost founders time.";
export const CHECKED = "8 November 2026";

export const CHANGES_2025 = [
  { title: "No more MISA licence", body: "Since February 2025, foreign investors register with the Ministry of Investment (MISA) instead of applying for a licence. The old yearly licence fee of about 62,000 SAR is no longer charged. People still say \"MISA licence\" out of habit." },
  { title: "Your registration must stay current", body: "Update your MISA registration once a year, and whenever owners, capital or business activities change." },
  { title: "Commercial registrations no longer expire", body: "Since April 2025 your company registration (CR) has no expiry date. Instead, you confirm its details online once a year. Miss that by 90 days and the CR is suspended, which can freeze your bank account." },
  { title: "Chamber of Commerce free for 3 years", body: "New companies pay no Chamber of Commerce fee for their first 3 years." },
];

export type Path = { id: string; name: string; bestFor: string; needs: string; capital: string; note?: string };

/** What the MISA registration has to fit. Activities, not licence fees, decide the rules now. */
export const PATHS: Path[] = [
  {
    id: "service",
    name: "Services company",
    bestFor: "Consulting, IT, software, design, marketing, translation, training, online teaching",
    needs: "Usually a parent company abroad (any small company registered at home), its registration papers, articles and latest financial statements. Some founders register as an individual instead and show proof of personal funds; ask MISA which applies to you.",
    capital: "No legal minimum for an LLC. Banks often expect a working balance.",
    note: "The most common route for students and graduates.",
  },
  {
    id: "startup",
    name: "Startup route",
    bestFor: "Founders with no company abroad yet, building something new and scalable",
    needs: "A support letter from a recognised Saudi accelerator, incubator or startup programme, which backs your application.",
    capital: "Often none",
    note: "Renewals ask you to show real activity. Treat it as a launchpad and plan to move onto the standard route within 2 or 3 years.",
  },
  {
    id: "trading",
    name: "Trading (selling physical goods)",
    bestFor: "Wholesale or retail of products",
    needs: "Fully foreign-owned trading has carried heavy conditions (very large capital and companies in several countries). With a Saudi partner owning 25% or more, the bar is far lower.",
    capital: "High when 100% foreign-owned",
    note: "Selling your own digital services online is not trading. Check the exact activity on the portal before you apply.",
  },
  {
    id: "industrial",
    name: "Manufacturing",
    bestFor: "Making, packing or assembling products, food production",
    needs: "A Ministry of Industry licence as well as the MISA registration.",
    capital: "Set by the industrial licence",
  },
  {
    id: "professional",
    name: "Licensed professions",
    bestFor: "Law, accounting, engineering, healthcare",
    needs: "Approval from the profession's Saudi body (for example SOCPA for accountants, the Saudi Council of Engineers, the Saudi Commission for Health Specialties).",
    capital: "Set by the profession's body",
  },
  {
    id: "property",
    name: "Real estate",
    bestFor: "Property development or brokerage",
    needs: "Real Estate General Authority (REGA) approval. Real estate activity inside Makkah and Madinah is restricted for non-Saudis.",
    capital: "Varies",
  },
];

export type Stage = { when: string; title: string; time: string; body: string; tip?: string };

export const TIMELINE: Stage[] = [
  {
    when: "Before day 0",
    title: "Get your documents certified and translated",
    time: "1 to 4 weeks",
    body: "Get your home documents certified, then apostilled (the international certificate that makes them valid abroad), then translated into Arabic by a certified translator in Saudi Arabia. Budget about 1,500 SAR.",
    tip: "This is the step people forget. Start it the day you decide.",
  },
  {
    when: "Day 0",
    title: "Register with MISA",
    time: "1 day",
    body: "Apply on investsaudi.sa. If you are using a parent company, apply in its legal name. You do not have a Saudi company name yet, and that is expected.",
  },
  {
    when: "Week 1 to 2",
    title: "MISA confirms your registration",
    time: "Usually 1 to 2 weeks",
    body: "You receive the registration under your overseas or personal name. Pay the processing fee (founders paid around 500 SAR in 2026).",
  },
  {
    when: "Week 2 to 3",
    title: "Reserve your Saudi company name, then update MISA",
    time: "Same day",
    body: "Reserve the name your company will use in Saudi Arabia through the Saudi Business Center. Then log back into investsaudi.sa and change the name on your registration to match. It is free and takes about an hour.",
    tip: "Skip this and the company registration will be refused because the names do not match.",
  },
  {
    when: "Week 3 to 4",
    title: "Commercial Registration (CR)",
    time: "3 to 5 days",
    body: "File your LLC through the Saudi Business Center. The CR is your official company registration, like a certificate of incorporation back home. Saudi articles of association are generated for you. Your files with GOSI, Qiwa and ZATCA open within about an hour. Order the official CR extract (100 SAR) the same day.",
  },
  {
    when: "Week 5 to 7",
    title: "Residency and bank account",
    time: "2 to 4 weeks, in parallel",
    body: "Sort out your iqama (residence permit) through your new company, set your job title to General Manager, print the physical iqama card, then open the company bank account.",
    tip: "Banks want the physical iqama card, so order it early.",
  },
];

export type Cost = { id: string; label: string; sar: number; note?: string };

/** One-off set-up costs founders paid in 2026. */
export const SETUP_COSTS: Cost[] = [
  { id: "docs", label: "Notarize, apostille and translate documents", sar: 1500, note: "Varies by country and number of documents" },
  { id: "misa", label: "MISA registration processing", sar: 500 },
  { id: "sbc", label: "Saudi Business Center, LLC set-up", sar: 1775 },
  { id: "cr", label: "Commercial Registration", sar: 1163 },
  { id: "extract", label: "Official CR extract (banks need it)", sar: 100 },
  { id: "muqeem", label: "Muqeem subscription (iqama management system)", sar: 1265 },
  { id: "occupation", label: "Change of job title on your iqama", sar: 1000 },
  { id: "print", label: "Physical iqama card print", sar: 575 },
  { id: "qiwa", label: "Labor office registration (Qiwa)", sar: 90 },
];

/** Iqama transfer fee by how many times you have transferred before. */
export const TRANSFER_FEES = [
  { label: "New iqama, no transfer", sar: 0 },
  { label: "1st transfer", sar: 2000 },
  { label: "2nd transfer", sar: 4000 },
  { label: "3rd or later", sar: 6000 },
];

/** Yearly running costs. */
export const YEARLY = {
  iqama: 650,
  levyMonthly: 800,
  dependantMonthly: 400,
  muqeem: 1265,
};

export type Start = { id: string; label: string; short: string; first: string; iqama: string; warn?: string };

export const STARTS: Start[] = [
  {
    id: "abroad",
    label: "Outside Saudi Arabia",
    short: "Most common",
    first: "Do all the certifying and translation at home, then register with MISA online. You do not need to fly in yet.",
    iqama: "Once your company registration, GOSI and Qiwa are live, your company issues you a work visa as General Manager. Get it stamped at a Saudi consulate, fly in, do fingerprints and the medical, and your iqama follows in 2 to 4 weeks.",
  },
  {
    id: "visit",
    label: "In Saudi on a visit or Umrah visa",
    short: "Start from here",
    first: "You can register with MISA from inside the Kingdom. The portal does not check your visa type.",
    iqama: "You cannot get an iqama on a visit visa. Once your company issues your General Manager visa, leave, collect it at a Saudi consulate (home or a nearby country), come back on it, and the iqama follows in 2 to 4 weeks.",
  },
  {
    id: "iqama",
    label: "In Saudi on an employer's iqama",
    short: "Transfer",
    first: "Set up the company as normal. You do not need to leave, but your current employer has to release you.",
    iqama: "Transfer your iqama to your own company through Muqeem. Expect about 2,000 to 6,000 SAR in transfer fees depending on how many times you have transferred, and your company may need a Saudi employee before the transfer goes through.",
  },
  {
    id: "student",
    label: "On a University student iqama",
    short: "Read first",
    first: "An iqama has only one sponsor. While you are a scholarship student, your sponsor is the University.",
    iqama: "Moving your iqama to your own company means leaving University sponsorship, with everything that comes with it (housing, stipend, student status). Many students wait until they graduate. Speak to the University before you start.",
    warn: "Do not register a company that depends on your student iqama without checking with the University first.",
  },
];

export const DOCUMENTS = [
  { id: "cr", title: "Parent company registration", body: "Your home company's certificate of incorporation (called a certificate of formation or articles of organization for a US LLC), plus a recent certificate of good standing from the company registry. No company yet? A simple limited company or LLC at home can be your parent." },
  { id: "fin", title: "Latest financial statements", body: "Last year's accounts. For a young company, an accountant's letter is often accepted." },
  { id: "aoa", title: "Parent articles of association", body: "Your company's founding rules. Most countries call them articles of association or bylaws; for a US LLC it is the operating agreement. Names must match the registration exactly." },
  { id: "res", title: "Board or member resolution", body: "A signed decision by the company's owners approving the Saudi company and naming you General Manager." },
  { id: "gm", title: "Your passport and CV", body: "As General Manager. The Arabic spelling of your name must match across every document and visa." },
  { id: "poa", title: "Power of attorney (only if needed)", body: "Only if someone in Saudi Arabia will sign for you. Certified like the rest." },
  { id: "ar", title: "Arabic company name, checked", body: "Pay a Saudi lawyer (about 500 to 1,500 SAR) to check the Arabic name. The Arabic version is the legally binding one." },
];

export const APOSTILLE_RULE =
  "Every country in the Apostille Convention has an official issuer, usually the foreign ministry or a state, provincial or regional office. Documents issued by a government office (company registry records, birth and marriage certificates) can usually be apostilled as they are. Private documents (board resolutions, copies, your CV) need a notary or lawyer to certify them first.";

/** Where a country differs from the general rule, or where readers most often ask. */
export const APOSTILLE = [
  { who: "United States", how: "Two issuers: the Secretary of State of the state that issued the document (company filings, birth and marriage certificates), or the US Department of State for federal documents such as FBI background checks." },
  { who: "United Kingdom", how: "The Legalisation Office of the Foreign, Commonwealth and Development Office (FCDO). Company documents usually need a solicitor or notary to certify them first." },
  { who: "Canada", how: "Only a member since January 2024, so older guides still describe embassy legalisation. Global Affairs Canada issues apostilles, and some provinces issue their own." },
  { who: "Europe, Australia, New Zealand", how: "Members. The foreign ministry, or a court or regional office in some European countries, issues them." },
];

export const AFTER_CR = [
  { name: "GOSI", what: "Social insurance", body: "Social insurance on salaries, like Social Security or National Insurance back home. Opens by itself within about an hour of your CR. Log in to activate it. Needed before you hire anyone.", auto: true },
  { name: "Qiwa", what: "Labor ministry portal", body: "Work visas, employment contracts and your Saudization rating (Nitaqat). Opens by itself.", auto: true },
  { name: "ZATCA", what: "Tax authority", body: "The Saudi tax authority (like the IRS, HMRC or CRA): corporate tax, zakat and VAT (sales tax). Opens by itself. Log in and confirm your details.", auto: true },
  { name: "National Address", what: "Saudi Post (SPL)", body: "Your officially registered address. Free, and a home address is fine. Banks and government services require it." },
  { name: "Chamber of Commerce", what: "Business association", body: "In most Western countries a chamber of commerce is a voluntary business club (Germany and France are exceptions, where membership is compulsory). In Saudi Arabia, membership comes with your CR, and the Chamber certifies company documents for you. New companies pay no fee for 3 years." },
  { name: "Annual CR confirmation", what: "Ministry of Commerce", body: "Once a year, confirm your company's details online. Miss it by 90 days and the CR is suspended." },
  { name: "Muqeem", what: "Iqama management", body: "Renewals, adding family members, job-title changes and physical iqama prints." },
  { name: "Mudad", what: "Payroll system", body: "Only once you have staff on payroll. It also records your own salary, which matters for family visas." },
  { name: "Balady", what: "City business license", body: "Only if you work from a physical shop or office. Many online and service businesses never need it." },
];

export const FAMILY = [
  { title: "GOSI and Qiwa are live", time: "1 to 2 days after the CR", body: "No work visa can be issued until your company's labor file exists." },
  { title: "Your General Manager visa", time: "2 to 4 weeks", body: "Issue it on Qiwa, get it stamped at a Saudi consulate, and enter on it." },
  { title: "Your iqama", time: "2 to 4 weeks after entry", body: "Fingerprints, medical, then the iqama card. You are now a resident." },
  { title: "Wife and children", time: "4 to 6 weeks", body: "Your recorded salary has to meet the minimum for family sponsorship (founders were asked for about 4,000 SAR a month). Then apply for their visas and iqamas. You will need your marriage and children's birth certificates apostilled and translated too." },
];

export const BANKS = [
  { name: "Al Rajhi Bank", good: "Largest branch network, fully Sharia-compliant, strong small-business team.", watch: "Heavy document checks. Turns away crypto, money transfer and gaming businesses.", time: "4 to 6 weeks" },
  { name: "Alinma Bank", good: "Fully Sharia-compliant, with branches in Madinah that handle new company accounts.", watch: "Experience varies by branch. Ask for the business banking officer.", time: "1 to 3 weeks" },
  { name: "Riyad Bank", good: "Experienced small-business team, reasonable document demands.", watch: "Varies by branch. Ask for a relationship manager rather than walking in.", time: "4 to 7 weeks" },
  { name: "Saudi National Bank (SNB)", good: "Strong English-language business banking and online portal. Good for transfers from abroad.", watch: "Often asks for a higher opening balance (around 100,000 SAR). It stays your money to use.", time: "5 to 8 weeks" },
];

export const BANK_DOCS = [
  { title: "CR certificate", body: "السجل التجاري. Bring it, but it is not enough on its own." },
  { title: "Official CR extract", body: "مستخرج السجل. Ordered on the Ministry of Commerce portal, 100 SAR. Banks treat it as a separate document." },
  { title: "Saudi articles of association", body: "عقد التأسيس. Issued with your CR. You do not draft it yourself." },
  { title: "Parent company's articles", body: "Apostilled and translated. The work you did before day 0 pays off here." },
  { title: "National Address", body: "العنوان الوطني. From Saudi Post. Free, and required." },
  { title: "Physical iqama card", body: "أصل الإقامة. Showing your new job title and your own company. Banks refuse the digital copy." },
  { title: "MISA registration", body: "Download the latest PDF from investsaudi.sa." },
];

export const TAX = [
  { title: "Corporate income tax: 20%", body: "On the profit of the foreign-owned share of your company. Filed with ZATCA once a year." },
  { title: "Zakat: 2.5%", body: "Applies instead of income tax to any share owned by Saudi or GCC nationals. The zakat base is calculated differently from profit." },
  { title: "VAT: 15%", body: "A sales tax on most goods and services. You must register once sales pass 375,000 SAR a year, and may register from 187,500 SAR. Registering late carries a 10,000 SAR fine." },
  { title: "Dividends sent abroad: 5% withheld", body: "When the company pays profits to a shareholder outside Saudi Arabia (for example your parent company), 5% is withheld." },
  { title: "No personal income tax", body: "Saudi Arabia does not tax your salary. Your home country might." },
];

export const HOME_TAX = [
  { title: "Most countries tax where you live, not your passport", body: "The UK, Canada, Australia, Ireland and most of Europe tax you based on residence. Once you have properly left and become non-resident, your Saudi salary is usually not taxed at home. You still owe tax on income from back home, such as rent." },
  { title: "Leaving has to be done properly", body: "Each country has its own residence test (the UK's statutory residence test, for example). Keeping a home, family or long visits back home can leave you resident. Tell your tax office you have moved." },
  { title: "Some countries tax you on the way out", body: "Canada, for example, can tax gains on certain assets on the day you leave (departure tax). Check before you move, not after." },
  { title: "Owning a company abroad while still resident", body: "If you remain tax-resident at home, rules on controlled foreign companies can tax your Saudi company's profits there. This applies in the UK, Canada, Australia and across the EU." },
];

/** The big exception: the US taxes its citizens wherever they live. */
export const US_TAX = [
  { title: "You still file a US return", body: "US citizens are taxed on worldwide income wherever they live. There is no income tax treaty between the US and Saudi Arabia." },
  { title: "Foreign earned income exclusion", body: "Up to $132,900 of salary earned abroad can be excluded for 2026 (Form 2555), if you meet the physical presence or residence test. It covers salary, not company profits or dividends." },
  { title: "FBAR (FinCEN 114)", body: "If your foreign accounts total more than $10,000 at any point in the year, report them. This includes the company account, because you can sign on it." },
  { title: "Form 5471 or 8858", body: "Owning a foreign company triggers an information return. A Saudi LLC is usually treated as a corporation (Form 5471). You can elect to treat a one-owner company as disregarded (Form 8832, then Form 8858). Penalties for missing these start at $10,000." },
  { title: "Profits you leave in the company", body: "US rules (GILTI and Subpart F) can tax some profits of a foreign company you control even if you do not pay them out. Saudi corporate tax paid can often be credited." },
];

export const PREMIUM = [
  { name: "Entrepreneur", body: "For founders backed by an accredited investor or incubator. Funding thresholds apply." },
  { name: "Business investor", body: "Investing at least 7,000,000 SAR in a Saudi company." },
  { name: "Real estate owner", body: "Owning residential property worth at least 4,000,000 SAR." },
  { name: "Special talent and gifted", body: "For specialists in fields like health, science, research, culture and sport." },
];

export const MISTAKES = [
  { title: "Registering the wrong activity", body: "Your MISA registration and CR list specific activities. Pick what you will actually sell. Changing it later costs time and fees." },
  { title: "Skipping the name update on MISA", body: "Your CR will not issue if the MISA name and your reserved Saudi name differ. The fix is free and takes an hour." },
  { title: "A careless Arabic name", body: "The Arabic company name is the binding one. Have a lawyer check it. Do not trust machine translation." },
  { title: "Taking only the CR certificate to the bank", body: "Banks also want the official CR extract (100 SAR)." },
  { title: "Forgetting the physical iqama card", body: "After a transfer, banks need the printed card showing your new employer. Order it through Muqeem." },
  { title: "Wrong job title on the iqama", body: "It must say General Manager (or your actual role). Change it in Muqeem before the bank or GOSI ask." },
  { title: "Applying to one bank at a time", body: "Apply to two at once. Start the day your CR extract is issued." },
  { title: "Hiring two foreigners first", body: "Your Saudization (Nitaqat) rating drops straight away. Hire your first Saudi before your second foreigner." },
  { title: "Making your wife the General Manager on paper", body: "The General Manager is personally liable for tax and labor breaches. It is not a formality." },
  { title: "Missing the yearly confirmations", body: "Confirm your CR every year and keep your MISA registration updated. A suspended CR can freeze your bank account." },
  { title: "Leaving VAT too late", body: "Register as soon as you expect to pass 375,000 SAR in a year. Late registration costs 10,000 SAR, and back-dated VAT is painful." },
  { title: "English-only contracts", body: "Saudi courts work from the Arabic text. Negotiate the Arabic version, not a translation of the English." },
  { title: "Forgetting your home country's tax rules", body: "Tell your home tax office you have moved, and check its rules on owning a company abroad. US citizens: FBAR and Form 5471 apply from the year you open the company." },
];

export const PLAN = [
  { phase: "This week", items: [
    { id: "p1", title: "Decide what your company will do", body: "Use the finder above. Most students and graduates need a services company." },
    { id: "p2", title: "Check your iqama situation", body: "Student, employee or visitor? Your starting point changes the first steps." },
    { id: "p3", title: "Set up or confirm your parent company", body: "Any simple company at home works. If you have none, register one now." },
    { id: "p4", title: "Start the apostille and translation", body: "Company registration, articles, financial statements, resolution and your passport." },
  ] },
  { phase: "Next 30 days", items: [
    { id: "p5", title: "Register on investsaudi.sa", body: "In your parent company's name, or your own if MISA allows it." },
    { id: "p6", title: "Pay the processing fee when confirmed", body: "Usually within 1 to 2 weeks." },
    { id: "p7", title: "Reserve your Saudi company name", body: "Through the Saudi Business Center." },
    { id: "p8", title: "Update the name on your MISA registration", body: "Free, about an hour." },
    { id: "p9", title: "File the CR and order the CR extract", body: "3 to 5 days, then 100 SAR for the extract." },
    { id: "p10", title: "Log in to GOSI, Qiwa and ZATCA", body: "They open by themselves within about an hour of the CR." },
    { id: "p11", title: "Register your National Address", body: "Free through Saudi Post." },
  ] },
  { phase: "Getting operational", items: [
    { id: "p12", title: "Hire your first Saudi if you need to", body: "Lifts your Nitaqat rating within about a week and can unblock an iqama transfer." },
    { id: "p13", title: "Iqama, job title, physical card", body: "All through Muqeem." },
    { id: "p14", title: "Open the bank account", body: "Two banks at once. The General Manager signs in person." },
    { id: "p15", title: "Set reminders for yearly tasks", body: "CR confirmation, MISA update, iqama renewal, zakat and tax return, and your home-country filings." },
  ] },
];

export const COMPARE = [
  { row: "Company tax", ksa: "20% on the foreign-owned share", uae: "9% on profit above AED 375,000" },
  { row: "Sales tax (VAT)", ksa: "15%", uae: "5%" },
  { row: "Market", ksa: "About 35 million people and heavy government spending", uae: "About 10 million, mostly expatriates" },
  { row: "Government contracts", ksa: "Full access to tenders", uae: "Limited from a free zone" },
  { row: "Living in Madinah", ksa: "You are already here", uae: "A different life entirely" },
];

export const GLOSSARY = [
  { term: "MISA", def: "Ministry of Investment. Foreign owners register with it before setting up a company. Portal: investsaudi.sa." },
  { term: "CR (Commercial Registration)", def: "Your company's official registration, like a certificate of incorporation. السجل التجاري." },
  { term: "LLC", def: "Limited liability company. The usual structure; one owner is enough." },
  { term: "Articles of association", def: "A company's founding rules. Some countries call them bylaws; for a US LLC it is the operating agreement." },
  { term: "General Manager", def: "The person legally in charge of the company, usually you. Your iqama comes through this role." },
  { term: "Iqama", def: "Saudi residence permit. It is tied to one sponsor: an employer, the University, or your own company." },
  { term: "Apostille", def: "An international certificate that makes a document from one country valid in another. Saudi Arabia has accepted them since December 2022." },
  { term: "Notarize", def: "Have a notary (or in some countries a lawyer or solicitor) confirm your signature or certify a copy. Needed for private documents before an apostille." },
  { term: "Saudi Business Center", def: "Government one-stop shop where you reserve your name and file the CR. business.sa." },
  { term: "Chamber of Commerce", def: "The local business association. Voluntary in most Western countries, but in Saudi Arabia membership comes with your CR, and it certifies company documents." },
  { term: "GOSI", def: "Social insurance contributions on salaries, like Social Security or National Insurance." },
  { term: "Qiwa", def: "Labor ministry portal for work visas, contracts and Nitaqat." },
  { term: "Nitaqat", def: "Saudization rating: a color band based on how many Saudis you employ. It decides which visa and transfer services you can use." },
  { term: "ZATCA", def: "Zakat, Tax and Customs Authority. The Saudi equivalent of the IRS, HMRC or CRA." },
  { term: "Zakat", def: "2.5% levy on the Saudi or GCC-owned share of a company, in place of income tax." },
  { term: "VAT", def: "Value added tax, a 15% sales tax collected at each step of a sale." },
  { term: "Muqeem", def: "Platform companies use to manage their foreigners' iqamas." },
  { term: "Mudad", def: "Payroll system that records salaries paid." },
  { term: "Balady", def: "City business license for physical premises." },
  { term: "National Address", def: "Your official address registered with Saudi Post." },
  { term: "Levy (expat fee)", def: "Monthly government fee for each foreign worker (about 800 SAR) and each foreign family member (400 SAR)." },
];

export const LINKS = [
  { label: "Invest Saudi (MISA)", href: "https://investsaudi.sa" },
  { label: "Saudi Business Center", href: "https://business.sa" },
  { label: "Ministry of Commerce", href: "https://mc.gov.sa" },
  { label: "Qiwa", href: "https://qiwa.sa" },
  { label: "GOSI", href: "https://www.gosi.gov.sa" },
  { label: "ZATCA", href: "https://zatca.gov.sa" },
  { label: "Muqeem", href: "https://muqeem.sa" },
  { label: "Saudi Post National Address", href: "https://splonline.com.sa" },
  { label: "Mudad", href: "https://mudad.com.sa" },
  { label: "Balady", href: "https://balady.gov.sa" },
  { label: "IRS: US citizens abroad", href: "https://www.irs.gov/individuals/international-taxpayers/us-citizens-and-resident-aliens-abroad" },
  { label: "Apostille Convention members (HCCH)", href: "https://www.hcch.net/en/instruments/conventions/status-table/?cid=41" },
  { label: "US apostilles (USA.gov)", href: "https://www.usa.gov/authenticate-us-document" },
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
  "MISA investment registration licence license company business LLC CR commercial registration iqama GOSI Qiwa ZATCA VAT zakat Muqeem Nitaqat bank account apostille startup entrepreneur premium residency FBAR 5471 US tax",
  ...PATHS.map((p) => `${p.name} ${p.bestFor}`),
  ...MISTAKES.map((m) => m.title),
].join(" ");
