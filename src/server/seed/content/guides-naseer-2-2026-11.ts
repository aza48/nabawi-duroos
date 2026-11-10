import type { SeedGuide } from "./guides-2026";

/**
 * New guides by naseer, November 2026, batch 2: ways to live in Madinah long term, homeschooling,
 * avoiding scams, and paperwork to finish in the US before moving. Researched from official sources
 * (leads from docs/research/sources-2026-11/), then checked by three independent reviewers (facts,
 * house rules, consistency with the site). Sources and open questions per guide are in
 * docs/research/guides-naseer-2026-11/batch-2/<slug>.md. Topics in src/lib/guide-topics.ts.
 */
export const GUIDES_NASEER_2_2026_11: SeedGuide[] = [
{
    slug: "ways-to-live-in-madinah-long-term",
    stage: "getting-started",
    title: "Ways to live in Madinah long term: study, work, family, a company or Premium Residency",
    summary: "The lawful routes to live in Madinah for years, side by side: studying, a job with a Saudi employer, living as a dependant, your own company and Premium Residency, with who sponsors you, whether family can join, whether you can work and what it costs, and what a visit or Umrah visa does not allow.",
    bodyHtml: `
<p>Checked November 2026. Living in Madinah for years needs a residency of your own or a place on someone else's. There are five lawful routes: study, a job with a Saudi employer, living as a dependant, a company of your own, and Premium Residency. This page compares them and points you to the detail for each.</p>
<h2>The routes at a glance</h2>
<table><thead><tr><th>Route</th><th>Who it suits</th><th>Who sponsors you</th><th>Can family join?</th><th>Can you work?</th><th>Cost to you</th></tr></thead><tbody>
<tr><td><strong>Islamic University full scholarship</strong></td><td>Brothers living outside Saudi Arabia, aged 17 to 25 for a bachelor's degree</td><td>The University</td><td>On visit visas only. University family residency (istiqdam) is closed</td><td>Ask the University before taking any paid work</td><td>None. Tuition, housing and a monthly stipend are covered</td></tr>
<tr><td><strong>Study while already resident</strong></td><td>Residents who want a degree or Islamic studies alongside their life here</td><td>Your existing sponsor</td><td>As on your existing residency</td><td>Yes, if your employer approves your study in writing</td><td>Free tuition, no stipend or free housing</td></tr>
<tr><td><strong>A job with a Saudi employer</strong></td><td>Anyone with a job offer</td><td>Your employer</td><td>You can apply for them as dependants once your iqama is issued, if your salary meets the minimum</td><td>Yes, for that employer</td><td>400 SAR a month for each dependant</td></tr>
<tr><td><strong>Dependant of a family member</strong></td><td>A wife and children of an iqama holder</td><td>The family member</td><td>Through the same head of the family</td><td>Not on the dependant iqama itself</td><td>400 SAR a month for each dependant on a work iqama</td></tr>
<tr><td><strong>Your own company</strong></td><td>People with paying clients and money to carry the yearly costs</td><td>Your company</td><td>Yes, once your iqama is issued, if your salary meets the minimum</td><td>Yes, in your company</td><td>Setup and yearly fees, a levy of 700 or 800 SAR a month for each foreign worker, 400 SAR a month for each dependant</td></tr>
<tr><td><strong>Premium Residency</strong></td><td>People who meet one product's conditions</td><td>No sponsor</td><td>Yes</td><td>Yes, in the private sector, except jobs kept for Saudis</td><td>A government fee set for each product</td></tr>
</tbody></table>
<p>An iqama has one sponsor at a time. Moving from one route to another means leaving the first sponsor, so plan the order before you start.</p>
<h2>Studying</h2>
<p><strong>The Islamic University</strong> is the main route for brothers who come from abroad. You apply free on Study in Saudi in the yearly window. A full scholarship covers tuition, housing and a monthly stipend. New students arrive on the educational visa and hold a digital Visitor ID, not an iqama, and the visa is renewed each year while you study. Family residency (istiqdam) through the University is closed, so a student's wife and children come on visit visas. Scholarship students agree to go home when their studies end, so a degree is a stay of several years, not a permanent one.</p>
<ul>
<li>How to apply: <a href="/guides/applying-to-the-islamic-university">Applying to the Islamic University</a></li>
<li>Daily life without an iqama: <a href="/guides/living-on-a-visitor-id">Living on a Visitor ID: what works and what does not</a></li>
<li>Students from earlier intakes with a student iqama: <a href="/ask/student-iqama-renewal">Who renews my student iqama?</a></li>
<li>Sisters: <a href="/guides/sisters-studying-in-madinah">Where sisters can study Arabic and Islamic sciences in Madinah</a></li>
</ul>
<p><strong>Already living here?</strong> You apply for the University's partial scholarship, which gives free tuition and nothing else, and you keep your own residency for the whole degree. <a href="/guides/masjid-an-nabawi-institute-and-college">The Masjid an-Nabawi Institute and College</a> teaches brothers and sisters free inside the Haram, but non-Saudis need a valid iqama to register, so it is a place to study once you live here, not a way in. Taibah University and others are in <a href="/guides/other-universities-in-madinah">Other universities in Madinah</a>.</p>
<h2>Working for a Saudi employer</h2>
<p>Employment is the commonest route to an iqama. The employer applies for your work visa and work permit through Qiwa, the labour ministry's platform. Your work visa is issued while you are abroad. You enter on it, complete the medical and fingerprints here and receive your iqama. Under the Labour Law the employer pays the fees for recruiting you, your iqama, your work permit and their renewals.</p>
<ul>
<li>Your contract is recorded on Qiwa. Read it in your own Qiwa account before you rely on any promise made outside it.</li>
<li>Once your iqama is issued, and if your recorded salary meets the minimum for family sponsorship, you can request visas for your wife and children as dependants.</li>
<li>Fees for the iqama, exit and re-entry and dependants are in <a href="/guides/iqama-and-exit-reentry-fees">Iqama, exit and re-entry, final exit and dependant fees</a>.</li>
</ul>
<h2>Living here as a dependant</h2>
<p>An iqama holder's spouse and children can hold dependant iqamas on his file. The head of the family handles their papers in Absher, and a fee of 400 SAR a month is charged for each dependant on a work iqama, paid when the iqamas are renewed. A dependant iqama is not a work iqama. University students cannot add dependants, because University family residency (istiqdam) is closed, so a student's wife and children come on family visit visas.</p>
<ul>
<li>Family visit visas, and moving children from a visit visa to an iqama: <a href="/guides/visas-for-family-and-visitors">Visas for family members and visitors</a></li>
<li>Renewing their iqamas, exit and re-entry and other records: <a href="/guides/family-records-on-absher">Your family's iqamas and records on Absher</a></li>
<li>Students and the closed University family residency: <a href="/ask/istiqdam-deposit">Can I sponsor my family, and what is the deposit?</a></li>
</ul>
<h2>Starting your own company</h2>
<p>You register with the Ministry of Investment as a foreign owner, set up the company and its commercial registration, and the company then issues a work visa for you as its General Manager. Your iqama comes through your own company, and your family follows as dependants. The yearly fees and the levy fall due whether or not the business earns. If you are on a University scholarship, you cannot be sponsored by your own company without leaving University sponsorship.</p>
<p>Never run a business in a Saudi's name. This is commercial concealment (التستر), and the penalties include up to five years in prison, fines of up to 5 million SAR, closure of the business and deportation with a ban on returning to work. Every phase, cost and tax is in <a href="/guides/start-a-company-in-saudi">Start your own company in Saudi Arabia</a>.</p>
<h2>Premium Residency</h2>
<p>Premium Residency (الإقامة المميزة) is a residency in your own name with no sponsor, issued by the Premium Residency Center and applied for at <a href="https://pr.gov.sa/">pr.gov.sa</a>. There are seven products:</p>
<ul>
<li><strong>Special Talent:</strong> specialised professionals and senior leaders.</li>
<li><strong>Gifted:</strong> people with exceptional ability in their field.</li>
<li><strong>Investor:</strong> people investing in the Saudi economy.</li>
<li><strong>Entrepreneur:</strong> founders of a start-up funded by an approved investment body.</li>
<li><strong>Real Estate Owner:</strong> owning a built residential property in Saudi Arabia worth at least 4 million SAR, with no mortgage on it. Land does not count.</li>
<li><strong>Limited Duration:</strong> a renewable residency of one year or more.</li>
<li><strong>Unlimited Duration:</strong> permanent residency.</li>
</ul>
<p>With Premium Residency you live here with your family, work in private companies and change jobs (except in jobs kept for Saudis), and leave and re-enter without an exit and re-entry visa. Each product carries its own conditions and its own government fee, both shown on the portal. You can own property in other cities. In Madinah and Makkah, as a Muslim you can own only inside the approved zones and hold a right of use only outside them: see <a href="/guides/owning-property-as-a-non-saudi">Owning a home in Madinah as a non-Saudi</a>. Buying an ordinary home gives no residency.</p>
<h2>What a visit or Umrah visa does not allow</h2>
<ul>
<li><strong>No work.</strong> A tourist eVisa, a family visit visa or an Umrah visa does not allow any paid work.</li>
<li><strong>No switching.</strong> You cannot turn a visit, tourist or Umrah visa into your own iqama. A work visa is issued abroad and you enter on it. The one exception is for children under 18 on a family visit visa whose parents both hold iqamas: see <a href="/guides/visas-for-family-and-visitors">Visas for family members and visitors</a>.</li>
<li><strong>A limited stay.</strong> A family visit visa reaches 180 days at most with every extension. A tourist eVisa allows 90 days in a year and cannot be extended.</li>
</ul>
<blockquote><p>Important: Anyone who offers to turn your visit visa into a job or an iqama for a fee, or to arrange residency as part of a property sale, is not following the rules. Do not pay them. Every route here runs through an official platform: Study in Saudi, Qiwa, Absher, the Ministry of Investment or the Premium Residency portal.</p></blockquote>`,
  },
{
    slug: "homeschooling-in-madinah",
    stage: "family",
    title: "Homeschooling your children in Madinah",
    summary: "What Saudi law says about schooling, the records to keep, curricula and IGCSE exams, Arabic and Qur'an circles, friends, libraries and sport, and how to move a child taught at home into a school here, including certificate equivalence.",
    bodyHtml: `
<p>Checked November 2026. Some English-speaking families in Madinah teach their children at home, for a few years or for the whole stay. This guide covers what Saudi law says about schooling, the records to keep, curricula and exams, Arabic and Qur'an, friends and sport, and how to move a child into a school here later.</p>
<h2>What the law says</h2>
<p>Saudi Arabia has a new General Education Law (نظام التعليم العام), approved by royal decree and published on 24 July 2026. It comes into force 180 days after publication, in January 2027. It makes schooling compulsory from age 6 to 15, keeps education free in government schools, and lets the Ministry of Education act against anyone who keeps a child of those ages out of education.</p>
<p>Before you plan a year at home, ask how the law applies to your child. The office for Madinah is the General Administration of Education in Madinah Region (الإدارة العامة للتعليم بمنطقة المدينة المنورة), at <a href="https://sites.moe.gov.sa/Madinah/">sites.moe.gov.sa/Madinah</a>. The Ministry also answers on 19996, 24 hours a day, and through its Tawasul service at <a href="https://tawasul.moe.gov.sa/">tawasul.moe.gov.sa</a>. Ask through Tawasul so you have the answer in writing, and keep it with your records.</p>
<p>Two routes inside the Saudi system suit some families who study at home. Ask the Education Department whether your child qualifies for either.</p>
<ul>
<li><strong>Affiliation (الانتساب):</strong> in the intermediate and secondary stages, a child can be enrolled with a Saudi school without attending daily, and sits the school's exams on the Saudi curriculum. Print proof of entry and residence from Absher and give it to the school four weeks before the first and the second semester exams. A child who was not living in the Kingdom just before the exams is removed, unless circumstances forced a trip of no more than two weeks.</li>
<li><strong>Placement test (اختبار تحديد المستوى):</strong> for the intermediate and secondary stages, for a child who has never been to school, or who has been out of school for three years or more. The Education Department registers candidates and sets the dates.</li>
</ul>
<h2>Choosing a curriculum</h2>
<p>The usual options are:</p>
<ul>
<li>Your own country's national curriculum, with its books and tests.</li>
<li>An online school accredited in its own country, with classes, marking and a report for each year.</li>
<li>International exams such as the IGCSE and A Levels, taken as a private candidate.</li>
</ul>
<p>Whatever you choose, think about where your child will finish. The Ministry of Education makes a certificate from abroad equivalent to a Saudi grade only when the school is accredited by the education authority of its own country, its secondary certificate is accepted by universities there, and the child attended the school regularly, in a clear sequence, with a pass record for each earlier year. The Saudi Arabian Cultural Mission in the United States does not attest high school diplomas from homeschool, online or distance programmes. If a university in the Kingdom is the goal, check the final certificate against these rules before the secondary years.</p>
<h3>Sitting IGCSE and A Levels as a private candidate</h3>
<p>The British Council in Saudi Arabia enters private candidates for Cambridge International exams in May and June and in October and November, and for Pearson Edexcel exams in January, in May and June, and in October and November. Each series has its own entry deadline, listed on the <a href="https://saudiarabia.britishcouncil.org/en/exam/igcse-school/register/dates-deadlines">registration dates page</a>.</p>
<ol>
<li>Register online through the British Council's School Registration System on <a href="https://saudiarabia.britishcouncil.org/en/exam/igcse-school/register/private">saudiarabia.britishcouncil.org</a>, before the deadline for the series.</li>
<li>Pay the fees shown in the system. Your entry is not processed until you pay.</li>
<li>About three weeks before the exams, you receive the Statement of Entry and the venue details.</li>
</ol>
<p>The British Council's offices are in Riyadh, Jeddah and Al Khobar, so ask where your child will sit before you register and plan the travel.</p>
<h2>Records and documents to keep</h2>
<ul>
<li><strong>Identity:</strong> each child's passport with a valid visa, or the child's iqama. Dependants' iqamas are renewed in Absher (see <a href="/guides/family-records-on-absher">Your family's iqamas and records on Absher</a>). On a Visitor ID there are no dependant iqamas (see <a href="/guides/living-on-a-visitor-id">Living on a Visitor ID</a>).</li>
<li><strong>Birth certificate and vaccination record:</strong> every school asks for both, with the birth certificate attested and translated into Arabic. See <a href="/ask/baby-vaccinations">How do I get my baby vaccinated in Madinah?</a> for the Saudi schedule.</li>
<li><strong>School papers from before you came:</strong> every report and certificate, attested by the Ministry of Education (or the body that runs schools) and the Ministry of Foreign Affairs in the country that issued it, then by the Saudi embassy there, with its cultural attaché where there is one. Papers not in Arabic or English need a certified translation.</li>
<li><strong>Your home programme's records:</strong> the enrolment letter, a report or transcript for each year, exam certificates, and a small folder of your child's work in each subject.</li>
</ul>
<blockquote><p>Important: the Ministry asks for originals, with no crossings out, and the child's name spelled the same on every paper. Fix any mismatch with the issuing school before you leave home, and keep scans of everything.</p></blockquote>
<h2>Arabic and Qur'an</h2>
<p>Give Arabic a daily slot from the start, so your child is ready if you move into a Saudi school later.</p>
<ul>
<li><strong>Masjid an-Nabawi halaqat:</strong> free Qur'an circles for children and adults. Register at <a href="https://reg.qm.edu.sa/">reg.qm.edu.sa</a>, make a separate account for each child, and choose the section, the type of study and the time. There is no entry test or interview for the recitation, memorisation and revision circles. Use an email address you check, because that is how the circles contact you. Ages, gates and times are in <a href="/guides/kindergartens-and-schools">Kindergartens and schools for your children</a>.</li>
<li><strong>Your local masjid:</strong> most neighbourhood masjids run Qur'an circles after Asr or Maghrib. Ask the imam.</li>
<li><strong>While you pray at the Haram:</strong> see <a href="/ask/children-at-masjid-an-nabawi">Is there somewhere for my children while I pray at Masjid an-Nabawi?</a></li>
<li><strong>For mothers:</strong> several women's marakiz have a nursery or kindergarten beside the classes. See <a href="/guides/sisters-studying-in-madinah">Where sisters can study Arabic and Islamic sciences in Madinah</a>.</li>
</ul>
<h2>Friends, libraries and sport</h2>
<ul>
<li><strong>Other families:</strong> you meet them at the Haram circles, the masjid after Asr, the parks and play centres in <a href="/guides/kids-activities">Play areas and fun places for children in Madinah</a>, and in the MESH group (see <a href="/ask/join-mesh-group">How do I join the MESH WhatsApp group?</a>). Sharing lessons with one or two families, each parent taking a subject, gives children a small class of their own.</li>
<li><strong>Libraries:</strong> the Prophet's Mosque Library has reading halls for children, open every day. Where each library is and what you can take in are in <a href="/ask/library-bags-laptops">Can I take a bag or laptop into the libraries?</a> The Madinah Book Fair, run by the Literature, Publishing and Translation Commission, has areas for children. Dates for each year are on <a href="https://lpt.moc.gov.sa/">lpt.moc.gov.sa</a>.</li>
<li><strong>Sport:</strong> the Islamic University Sports Club and classes for children, such as jiu-jitsu and fitness, are in <a href="/guides/sports-and-activities">Sport and fitness classes</a>.</li>
</ul>
<h2>Moving into a school later</h2>
<p>Fees, documents, Noor and registration dates are in <a href="/guides/kindergartens-and-schools">Kindergartens and schools for your children</a>. A child taught at home needs a few extra steps.</p>
<ul>
<li><strong>International and private schools</strong> set their own entry assessments. Ask each school what it needs from a child taught at home, and bring your yearly reports and work folder.</li>
<li><strong>Government schools</strong> take the children of iqama holders into places left after Saudi pupils are registered, within a share of 15% set by the Council of Ministers. The child needs an authorisation letter from the Ministry of Education and a letter from the parent's employer. Children on a visit, tourist or Umrah visa are not taken.</li>
<li><strong>Entry points:</strong> the first intermediate year needs a pass in the sixth primary year or its equivalent, attested. The first secondary year needs the intermediate certificate or its equivalent.</li>
</ul>
<h3>Getting your child's certificate made equivalent</h3>
<ol>
<li>Gather the originals: the latest certificate and the pass records for earlier years, attested and translated as above.</li>
<li>Submit them at the Education Department in Madinah. For any grade below the final secondary year, the Department makes the papers equivalent itself. A secondary school leaving certificate is sent on to the Ministry electronically, and the decision comes back through the Department.</li>
<li>The school places your child in the grade the equivalence decision names.</li>
</ol>
<p>For the intermediate and secondary stages, a child with no recognised records applies for the placement test above.</p>`,
  },
{
    slug: "avoiding-scams-in-madinah",
    stage: "getting-settled",
    title: "Avoiding scams in Madinah: flats, deposits, jobs, visas and phone fraud",
    summary: "The traps that catch newcomers, each with the official safe route: flats and deposits, property sold with a promise of residency, jobs on visit visas and visa conversion offers, running a business in someone else's name, fake Hajj and Umrah offers, calls and texts posing as your bank, Absher or the University, counterfeit goods, and where to report each one.",
    bodyHtml: `
<p>Checked November 2026. Most scams aimed at newcomers follow one pattern: an offer that skips the official system, and a request for money or a code before anything is in writing. Each trap below has an official route that protects you and an official place to report it.</p>
<h2>Renting a flat</h2>
<ul>
<li><strong>Never transfer a deposit or a "holding fee"</strong> before you have seen the flat in person and a contract is ready to register. A cheap flat from someone who cannot meet you is the usual bait.</li>
<li><strong>Check the agent.</strong> A real-estate broker needs a FAL licence from the Real Estate General Authority (REGA). Check the licence number on REGA's broker inquiry service at <a href="https://rega.gov.sa/">rega.gov.sa</a> or in REGA's app, Aqari (عقاري). Every property advert also needs its own advertisement licence, which REGA's advertisement licence inquiry confirms.</li>
<li><strong>Register the contract on Ejar and pay the rent only through Ejar.</strong> Cash, or a transfer to someone's personal account, is no proof that you paid.</li>
</ul>
<p>The full checklist and the warning signs are in <a href="/guides/finding-an-apartment">Finding and renting a flat</a>. For a problem with a registered contract, call Ejar on <strong>199011</strong>.</p>
<h2>Buying property with "residency included"</h2>
<p>Under the law in force since 22 January 2026, a Muslim non-Saudi can own a home in Madinah, but only inside the approved zones, and only through REGA's official portal, Saudi Properties, at <a href="https://saudiproperties.rega.gov.sa/">saudiproperties.rega.gov.sa</a>. Owning a home gives you no residency and no visa.</p>
<ul>
<li>A seller who promises an iqama with the flat is selling something he cannot give. The only residency linked to property is the Real Estate Owner product of Premium Residency. You apply for it yourself to the Premium Residency Center, through the <a href="https://my.gov.sa/en/services/187911">National Platform</a>, and it has its own conditions.</li>
<li>Check the plot on the portal's zone map, get the eligibility certificate there, and pay electronically. Never pay in cash or into a personal account.</li>
<li>A guaranteed profit, or a plot that "will be inside the zones soon", is a warning sign.</li>
</ul>
<p>The rules and the five steps are in <a href="/guides/owning-property-as-a-non-saudi">Owning a home in Madinah as a non-Saudi</a>.</p>
<h2>Job offers and "visa conversion"</h2>
<p>The tourist eVisa and the Umrah visa are not work visas, and their holders must not take paid work. A visit visa cannot be converted into a work iqama inside the Kingdom, whatever someone charges for it. A job "on your visit visa, papers later", or a paid "conversion", leaves you working illegally.</p>
<p>A real job comes with a work visa that the employer applies for before you travel. Once you are resident, your contract is recorded on Qiwa, and you can read it in your own Qiwa account under Employment Contracts. Under the Labour Law the employer pays the recruitment fees and the iqama and work permit fees, and their renewals. Anyone who asks you to pay for "your visa" or "your iqama" is not offering a lawful job. Report labour violations to the Ministry of Human Resources on <strong>19911</strong> or in its app.</p>
<h2>Running a business in someone else's name</h2>
<p>Some newcomers are offered a shop, a delivery business or an online store "in a Saudi's name, you just run it". This is commercial concealment (التستر التجاري, tasattur), a crime under the Anti-Commercial Concealment Law. The penalties include:</p>
<ul>
<li>up to five years in prison and fines of up to 5 million SAR;</li>
<li>confiscation of the money made, closure of the business and cancellation of its commercial registration;</li>
<li>deportation of the non-Saudi involved, with a ban on returning to work in the Kingdom.</li>
</ul>
<p>The lawful route is a company of your own, registered in your name. On a University iqama that means leaving University sponsorship first: see <a href="/guides/start-a-company-in-saudi">Start your own company in Saudi Arabia</a>. Concealment is reported to the Ministry of Commerce on <strong>1900</strong> or in its Balagh Tijari app (بلاغ تجاري).</p>
<h2>Hajj, Umrah and Rawdah offers</h2>
<ul>
<li><strong>Hajj:</strong> residents book domestic Hajj only in Nusuk, at <a href="https://www.nusuk.sa/">nusuk.sa</a> or in the app, with a licensed company listed there. A "campaign" sold on social media, by phone or by word of mouth outside Nusuk gives you no permit, and Hajj without a permit brings heavy fines and, for residents, deportation. See <a href="/guides/hajj-as-a-student">Hajj from Madinah as a student or resident</a>.</li>
<li><strong>Umrah and the Rawdah:</strong> permits are in Nusuk, in your own name, and the Rawdah permit is free. Anyone selling paid or guaranteed access is running a scam. See <a href="/guides/umrah-rawdah-quba">Umrah, the Rawdah and Quba from Madinah</a>.</li>
</ul>
<p>Report fake Hajj adverts on <strong>911</strong>. For any problem with a Hajj or Umrah service, the unified number <strong>1966</strong> answers around the clock and in several languages.</p>
<h2>Calls, texts and links pretending to be your bank, Absher or the University</h2>
<p>The caller claims to be your bank, the police, Absher or the University, or a text says your card is blocked or a fine is due and gives a link. The aim is always your password, your card details or the code sent to your phone.</p>
<ul>
<li><strong>Never share a one-time code (OTP),</strong> a password or a card number with anyone, on any call, in any chat, even with someone who says he is from your bank or a government office.</li>
<li><strong>Nafath:</strong> approve a request only when you started the sign-in yourself and the number in the app matches the one on your screen. Reject any request you did not start, and never pick a number someone reads to you on the phone.</li>
<li><strong>Fines and fees:</strong> ignore texts with payment links. Check fines yourself in Absher and pay through your banking app: see <a href="/ask/traffic-fines">How do I check and pay traffic fines?</a></li>
<li><strong>The University:</strong> fake accounts post links in Blackboard class chats to take over student accounts. See <a href="/ask/blackboard-phishing">Someone posted a link in my Blackboard class chat. Is it safe?</a> and <a href="/guides/university-email-and-microsoft-365">Your University email and Microsoft 365</a>.</li>
<li><strong>Money and "investments":</strong> if a stranger sends money "by mistake" and asks you to send it on, tell your bank and transfer nothing. Do not put money into "investment" offers posted in groups.</li>
<li><strong>Scam texts:</strong> forward them, free, to <strong>330330</strong>, the reporting number of the Communications, Space and Technology Commission.</li>
</ul>
<blockquote><p>Important: If you have already shared a code or your card details, call your bank at once on the number in its app or on the back of your card, and ask it to block the card and stop the transfer. Then change your passwords and report the fraud in Absher, under Public Security, Financial Fraud Reports, or in the Ministry of Interior's Kollona Amn app (كلنا أمن).</p></blockquote>
<h2>Counterfeit goods</h2>
<p>Fake brand perfumes, phones, chargers and spare parts are sold in markets and through "message me" posts. Buy electronics from shops that give a tax invoice, and keep it for the warranty. Report counterfeit goods and commercial fraud to the Ministry of Commerce on <strong>1900</strong> or in the Balagh Tijari app.</p>
<h2>Where to report</h2>
<table><thead><tr><th>What happened</th><th>Where to report</th></tr></thead><tbody>
<tr><td>Money taken from your card or account</td><td>Your bank first. Then Absher, Financial Fraud Reports, or the Kollona Amn app</td></tr>
<tr><td>Your bank does not resolve your complaint</td><td>The Saudi Central Bank's consumer protection line, free on <strong>8001256666</strong></td></tr>
<tr><td>Scam text message</td><td>Forward it to <strong>330330</strong></td></tr>
<tr><td>Fraud, impersonation, extortion or a hacked account</td><td>The Kollona Amn app. In an emergency, <strong>911</strong></td></tr>
<tr><td>A problem with a registered rental contract</td><td>Ejar, <strong>199011</strong></td></tr>
<tr><td>Fake Hajj adverts</td><td><strong>911</strong></td></tr>
<tr><td>Hajj or Umrah services</td><td>The unified number <strong>1966</strong></td></tr>
<tr><td>Labour violations</td><td>Ministry of Human Resources, <strong>19911</strong> or its app</td></tr>
<tr><td>Tasattur, counterfeit goods, commercial fraud</td><td>Ministry of Commerce, <strong>1900</strong> or the Balagh Tijari app</td></tr>
<tr><td>A University account taken over</td><td><strong>it.care@iu.edu.sa</strong>, and report fake Blackboard accounts to <strong>bb@iu.edu.sa</strong></td></tr>
</tbody></table>
<p>All the emergency numbers are in <a href="/ask/emergency-numbers">What are the emergency numbers in Saudi Arabia?</a></p>`,
  },
];
