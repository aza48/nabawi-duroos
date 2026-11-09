# FAQ short answers for review (November 2026)

Once synced, every FAQ on /ask opens with one plain sentence that answers the question, then the full answer as before. 57 of the 61 seeded FAQs get a new short answer; the other 4 already open with one and are unchanged.

- The short answers live in `src/server/seed/content/faq-leads.ts`, keyed by FAQ slug. The FAQ text in the `guides-*.ts` files is not touched.
- `src/server/seed/content/sync.ts` adds each one as the first paragraph of its FAQ when the content syncs.
- Each one is a single sentence of at most 25 words, restates only what that FAQ's answer already says, uses no number the answer does not give, and does not start with or reword the sentence after it. `tests/faq-leads.test.ts` checks this.
- **To make them live, the owner runs `npm run content:sync`.** They are not live until then. To change or drop one, edit or delete its line in `faq-leads.ts` and sync again.
- **What the sync also changes.** Syncing marks these 57 FAQs as checked on the sync date, so the "Last checked" date on each /ask page moves to that day even though no fact was checked again. The short answer also becomes the start of each FAQ's page description, its search result subtitle, its FAQPage structured data and its entry in llms.txt.

## Hold the sync until these 11 are fixed

On the 11 FAQs below, the full answer itself opens with "Yes." or "No." (or "With an iqama, yes." or "Collecting: yes."), so the page would say it twice, once in the short answer and again straight after. The clean fix is in the guide files, which belong to akhiai: split each answer's opening into its own short first paragraph, for example `<p>Yes. Visitor ID holders can open an account and get a mada card.</p>`. Then delete that FAQ's line from `faq-leads.ts` and its slug from `YES_NO_TWICE` in `tests/faq-leads.test.ts`. The test fails if a new FAQ joins this list, and also when one is fixed but still listed, so the list stays accurate.

- `bank-account-without-iqama`
- `student-discounts`
- `joint-bank-account-spouse`
- `foreign-prescriptions`
- `free-bus-to-haram`
- `summer-semester`
- `rent-on-student-visa`
- `drive-on-visit-visa`
- `bringing-medicine-into-saudi`
- `buying-a-used-car`
- `degree-collection-and-verification`

## New short answers

| # | Question | Short answer |
|---|---|---|
| 1 | Can I defer my place at the University? (`defer-my-place`) | Do not count on it: asking to arrive later than the semester you are offered can send your visa application back. |
| 2 | Is housing included for scholarship students? (`is-housing-included`) | Yes for full scholarship students, whom the University houses; no for partial scholarships, which cover tuition only. |
| 3 | Can I sponsor my family, and what is the deposit? (`istiqdam-deposit`) | No. Family residency through the University has been closed since January 2025, so there is no deposit to pay. |
| 4 | How do I join the MESH WhatsApp group? (`join-mesh-group`) | Through any "Join the group" button on this site; members keep posts relevant, share only verified information and avoid debates. |
| 5 | How do I apply to the Islamic University of Madinah? (`how-to-apply-iu`) | Apply online on the national Study in Saudi portal while applications are open, choosing up to 25 programmes. |
| 6 | How much is the University stipend? (`stipend-amount`) | It is set by college: check your own monthly figure in the Academic System, under Personal, then Rewards. |
| 7 | Where can I learn Arabic in Madinah before getting into the University? (`learn-arabic-before-iu`) | At year-round institutes, from about 350 SAR a month, or in one-month intensive courses on the University campus. |
| 8 | Where can sisters study Arabic and Islamic sciences? (`sisters-study`) | At the women's marakiz, at the Masjid an-Nabawi Ma'had and Kulliyah for women, and at several paid institutes. |
| 9 | How much money do I need per month in Madinah? (`monthly-budget`) | A single person renting needs roughly 2,900 to 6,700 SAR a month, and scholarship students in the halls spend far less. |
| 10 | Can I open a Saudi bank account without an iqama? (`bank-account-without-iqama`) | Yes. With an active Visitor ID, a National Address and a Saudi number linked to Absher, you can open one with a mada card. |
| 11 | Can I drive on a visit visa? (`drive-on-visit-visa`) | Yes, on your home licence if Saudi Arabia recognises it, but a Saudi licence or a car in your name needs an iqama. |
| 12 | How do I visit the Rawdah? (`rawdah-booking`) | With a free Nusuk permit booked for a set time; same-day slots are also released for people at the masjid. |
| 13 | Are there duroos in English in the Haram? (`duroos-english`) | Rarely: English lessons are few, and almost all duroos in the Haram are taught in Arabic. |
| 14 | What's the difference between ta'jeel and i'tithaar? (`tajeel-vs-itithaar`) | Ta'jeel postpones a semester before it begins; i'tithaar withdraws you from one already under way. |
| 15 | What is Etimad and why do I need it? (`etimad-what-for`) | It is the government platform for your University travel orders and ticket letters, and your details on it must match your passport exactly. |
| 16 | Are there discounts for University students? (`student-discounts`) | Yes. Students get over 100 partner offers through the University and reduced rates at its sports club. |
| 17 | Where are the muqarrarat for my college? (`muqarrarat`) | In the Jamiah library, under your college and then your level. |
| 18 | My Absher or Nafath activation keeps failing. What do I do? (`absher-nafath-activation`) | Call Absher customer care on 920020405 and ask for a technical support ticket, saying you are a new international scholarship student. |
| 19 | Where do I find my class timetable? (`find-my-timetable`) | Your timetable is under Registered Courses, in the Electronic Registration section of the Academic System. |
| 20 | Can I register a rental contract on a student visa? (`rent-on-student-visa`) | Yes, through an accredited real-estate agent from Ejar's official list, who registers the contract on Ejar for you. |
| 21 | Can I take a bag or laptop into the libraries? (`library-bags-laptops`) | No bags in either library; laptops are allowed in the University Central Library, but not in the Masjid an-Nabawi library without a permit. |
| 22 | Someone posted a link in my Blackboard class chat. Is it safe? (`blackboard-phishing`) | No. Opening it can hand your University account to fake student accounts, so report the account and leave the group. |
| 23 | What do I need to do when I graduate? (`leaving-steps`) | Clear your file with the University before you leave, and book no ticket until it confirms your clearance. |
| 24 | How do I see how many SIMs are registered under my iqama? (`check-sims-on-iqama`) | Mutasil, the My Numbers Inquiry, the CST app and Tawakkalna all list the numbers registered under your iqama. |
| 25 | How do I change the mobile number on my Absher account? (`change-absher-mobile`) | In the Absher app, in the Nafath app, or at an Absher kiosk, which works even without your old number. |
| 26 | What is a short address and how do I find mine? (`short-address`) | It is the eight character code for your National Address, and you find it in Absher or with Saudi Post. |
| 27 | How do I check that my health insurance is valid? (`check-health-insurance`) | Enter your iqama number on the Council of Health Insurance or Insurance Authority website, Tawakkalna, Absher or CHI Daman, and check the expiry date. |
| 28 | How do I send money home from Madinah? (`send-money-home`) | Use a transfer app or service your ID and bank account allow, and compare what your family receives after fees. |
| 29 | What are the emergency numbers in Saudi Arabia? (`emergency-numbers`) | Call 997 for an ambulance, 999 for the police and 998 for fire; 911 also works in Madinah. |
| 30 | What is the best time of year in Madinah? (`best-time-to-visit-madinah`) | For weather, November to February; for good weather with calmer crowds, late September to mid November or late February to March. |
| 31 | How much do meals cost at the University mat'am? (`mataam-prices`) | Full scholarship students pay 1 SAR or 2 SAR a meal, booked a month at a time online. |
| 32 | Do married students get free housing? (`married-students-housing`) | Not as a rule: a University family unit is offered only when one is available, so most married students rent in the city. |
| 33 | What is Ejar and what do I use it for? (`what-is-ejar`) | Ejar is the national platform for registering a home rental, and a registered contract is what you use to connect utilities or renew your iqama. |
| 34 | Can I open a joint bank account with my wife? (`joint-bank-account-spouse`) | Yes. Residents can open a joint account with a spouse; ask your bank which documents it needs. |
| 35 | Will a pharmacy accept my prescription from home? (`foreign-prescriptions`) | No. Pharmacies here accept only prescriptions from doctors licensed in Saudi Arabia, so see a Saudi doctor for a new one. |
| 36 | Is there a free bus from the University to the Haram? (`free-bus-to-haram`) | Yes. University buses link the campus with Masjid an-Nabawi and with the halls outside the campus, at no charge. |
| 37 | When is the University Medical Center open? (`medical-center-hours`) | Sunday to Thursday from 8:00 am, with emergency care until 11:00 pm; Fridays and Saturdays, emergency care only, 1:00 pm to 9:00 pm. |
| 38 | What are the rules for my University ticket home? (`student-ticket-rules`) | Your ticket needs an Etimad travel order, is valid for 3 months from the first travel date, and has no cash refund. |
| 39 | How do I get from Madinah airport to the Haram or the University? (`airport-to-haram-and-university`) | Madinah Bus route 400, a ride app or a taxi takes you to the Haram; arriving scholarship students can ask about a University reception trip. |
| 40 | Is there a summer semester at the Islamic University? (`summer-semester`) | Yes. It is an optional semester for catching up, such as retaking a failed course. |
| 41 | Who renews my student iqama, and what do I need to do? (`student-iqama-renewal`) | The University's Travel Management renews it for you; your part is to keep your file clear so nothing holds the renewal up. |
| 42 | How many classes can I miss at the University? (`how-many-classes-can-i-miss`) | Missing more than a quarter of a course's hours bars you from its final exam and fails the course. |
| 43 | Where do I see my exam results and my GPA? (`exam-results-where`) | Both are in the Academic System: grades under Course results once your college approves them, and your GPA under your academic record. |
| 44 | I missed a final exam. What happens now? (`missed-a-final-exam`) | Without an accepted excuse you score zero; with one, you sit a substitute exam by the end of the next semester's second week. |
| 45 | I failed a course. What does it mean for me? (`failed-a-course`) | Retake it and pass it to graduate; the F still counts against your GPA. |
| 46 | What plugs and voltage does Saudi Arabia use? (`power-plugs-and-voltage`) | Type G, the UK style plug, at 230 volts and 60 hertz; chargers labelled 100 to 240 V need only an adapter. |
| 47 | Can I bring my regular medicine to Saudi Arabia? (`bringing-medicine-into-saudi`) | Yes, in the original boxes in your hand luggage with a doctor's letter; narcotic or psychotropic medicines also need a traveller's permit before you fly. |
| 48 | How do I make sure my name is right on my degree certificate? (`graduation-certificate-name-check`) | Use the graduation certificate data check in the Academic System during your final semester, and correct any difference from your passport. |
| 49 | Can someone else collect my degree certificate, and how can an employer check it? (`degree-collection-and-verification`) | Yes, with the Deanship's official authorisation form, and employers can check your degree on eduportal.iu.edu.sa. |
| 50 | I was offered a year of online Arabic. How do I get to Madinah after it? (`online-arabic-year-to-madinah`) | Apply again on Study in Saudi as soon as the portal next opens, because the online year does not lead to a visa by itself. |
| 51 | Where is the Eid prayer held in Madinah, and when does it start? (`eid-prayer-in-madinah`) | At Masjid an-Nabawi and at masjids and Eid musallas across the city, starting 15 minutes after sunrise. |
| 52 | How do I get my baby vaccinated in Madinah? (`baby-vaccinations`) | Register at your nearest primary health care centre and book each dose in Sehhaty, following the national schedule from birth. |
| 53 | My passport is expiring. How do I renew it in Saudi Arabia, and what must I update afterwards? (`renew-passport-in-saudi`) | At your embassy in Riyadh or consulate in Jeddah; then send the University a copy and update your family's passports in Absher. |
| 54 | How do I check and pay traffic fines? (`traffic-fines`) | Check them in Absher under traffic violations, and pay in your banking app through SADAD or in Absher. |
| 55 | Can I buy a used car as a student, and what do I need? (`buying-a-used-car`) | With an iqama, yes: insure it in your name, then transfer it in Absher; on a Visitor ID, you cannot buy one in your name. |
| 56 | Where can I learn tajweed in Madinah? (`learn-tajweed-in-madinah`) | In the free Qur'an halaqat of Masjid an-Nabawi, which teach correct recitation; register at reg.qm.edu.sa. |
| 57 | How do I log in to Blackboard, and what do I do if it fails? (`blackboard-login`) | Sign in at sso.iu.edu.sa or in the University app; if it fails, test the Academic System, then ask through Tawasul. |

## Already open with a short answer (unchanged)

- How do I get home internet without an iqama? (`home-internet-no-iqama`)
- Do I need to register to attend the duroos? (`do-i-register-for-duroos`)
- Where can I find the Ma'had books and the answers? (`mahad-books`)
- Can I see a female doctor in Madinah? (`female-doctor`)

## Update after admin's corrections (#76, 9 November 2026)
- `istiqdam-deposit`: lead changed to match the corrected answer (family residency closed since January 2025).
- `tajeel-vs-itithaar`: lead shortened so it no longer repeats the first sentence.
- `mahad-books`: new lead, because the rewritten answer opens with a long paragraph.
- `summer-semester` and `degree-collection-and-verification` no longer repeat Yes or No, so they left the test's list. Eight FAQs remain on it; aiakhee's FAQ fixes PR rewrites their openings.
