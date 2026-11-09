# American Students in IUM: attachments (PDFs and images)

## 1. Summary

- **Sources:** the attachments of the "American Students in IUM" chat, not the chat text. Five PDFs in `chats3/am/` and 203 images in `chats3/media/` (144 photos, 59 stickers). The chat text was used only for each attachment's date and caption.
- **Date range of the attachments:** 2 Jun 2025 to 7 Nov 2026.
- **What was useful:**
  - two versions of a student guide to graduating from the Ma'had (2024 and 2026)
  - the University's 111-offer discounts deck (Sep 2026)
  - the official 1448 to 1449 academic calendar
  - the Deanship of Admission and Registration's visa renewal notice for 1448
  - Travel Management's new ticket rules
  - the Deanship of Student Affairs' scooter sticker notice
  - the Tawasul path for iqama renewal and the Tawasul terms of use
  - the i'tikaf registration notices of the General Authority for the Care of the Two Holy Mosques
  - the Haram electric carts price list (Makkah)
  - the Masjid an-Nabawi duroos poster for Sha'ban 1447
  - the Rabwa hall bus times
  - Saudi Post (SPL) international shipping prices and a National Day offer
  - the Ministry of Education school holidays for 1447
  - the 1448 higher diploma list
  - the Ifta hotline notice for Hajj 1446
- **Not useful (skipped):**
  - 59 stickers
  - items for sale: furniture, phones, iPads, appliances, scooters, a car, perfume, supplements
  - school job adverts from the USA
  - restaurant and airline adverts
  - personal photos and ID cards
  - a list of members' names
  - a missing child poster
  - SMS screenshots with personal data
  - an X post
  - a Qur'an reflection
- **Contact sheets:** made and deleted.
- **Reliability:** high for the official notices: the University, the General Authority for the Care of the Two Holy Mosques, the Ministry of Education, Saudi Post and the Presidency of Ifta. Medium for the student guide and screenshots from members.

## 2. Findings by MESH target

### graduating-from-mahad (compared in detail)

**The two versions.**

| | Older version (file 00000302) | Newer version (file 00003568) |
|---|---|---|
| Year of publication | 2024 | 2026 |
| "Last edited" | 01-10-24, which is 10 Jan 2024 in the mm-dd-yy format the newer file also uses | 08-11-26, which is 11 Aug 2026 |
| PDF created | 29 Apr 2024 | 11 Aug 2026 |
| Posted in the chat | 18 Aug 2025 | 11 Aug 2026 |
| Author | A member | The same member |

The 2026 version is newer and replaces the 2024 one.

A third file, "Graduating from Ma'had: The Western Student's Guide to the Jaami'ah", was shared on 21 Jul 2025 and 11 May 2026. It was not attached ("document omitted"), so it could not be read.

**Differences between the versions (2026 against 2024):**
- **Card office location changed.** 2024: the University card room on floor 3 of the Student Affairs building. 2026: Wahdah (Unit) 22. From the entrance, go into the glass-walled hall on the left. It has many service windows. Use the window marked بطاقة الطالب (student card).
- **Housing paper location changed.** 2024: إدارة السكن (the housing administration). 2026: also Wahdah 22.
- **New timing advice in 2026, for both offices:** go early, before Dhuhr. They open at 8:00.
- **Passport picture:** 2026 adds "preferably new".
- **Iqama:** 2026 adds that staff want to see the iqama in the Absher app.
- Everything else is unchanged.

**Fact by fact against MESH** (file `src/server/seed/content/guides-research-2026-11.ts`, slug `graduating-from-mahad`):

1. **Choosing a college.** In the final Ma'had semester, the Ma'had's wakeel sends a link to the class group chats. Students rank a first, second and third choice of college. The guide tells students to watch the group chats and ask how to fill the form in properly.
   - Date: 11 Aug 2026. Source: student guide, single member. Confidence: medium.
   - **CONFIRMS** the ranking of three choices. MESH also gives the URL (alisc.iu.edu.sa); the guide gives no URL.
   - Possible addition: "the link is also sent to the Ma'had group chats by the wakeel."
2. **New University number for the Kulliyah.** The guide says only the last digit changes: a Ma'had number ending in 1 becomes the same number ending in 3. The guide uses a real example number, which is not reproduced here.
   - Date: 10 Jan 2024 and 11 Aug 2026. Source: student guide. Confidence: medium (one example only).
   - **NEW.** MESH says only "You receive a new University number for the Kulliyah."
3. **Where to get the new card: Wahdah 22, student card window.** Details are under "Differences" above.
   - Date: 11 Aug 2026. Source: student guide. Confidence: medium.
   - **NEW.** MESH says only "the student card office", with no location.
   - Supporting chat text: on 21 Jan 2026 a member said the University card (ATM card) renewal office is the far right kiosk in Wihda 22.
4. **What to bring.** The old University card, a passport photo (preferably new) and your iqama number. Staff want to see the iqama in the Absher app.
   - Date: 11 Aug 2026. Source: student guide. Confidence: medium.
   - **CONFIRMS** MESH's list (old card, photo, Visitor ID or iqama number, new University number).
   - **NEW:** "preferably a new photo" and "have Absher open to show the iqama".
5. **Keeping your room.** After the Ma'had you are a "graduate" in the system, so you get the paper that confirms your room. It is the same paper issued when you first arrived. In 2026 this is done at Wahdah 22. Go early; it opens at 8:00.
   - Date: 11 Aug 2026. Source: student guide. Confidence: medium.
   - **CONFIRMS** the step.
   - **CONFLICTS** on the place. MESH says: "Go to the housing office (إدارة السكن) and get the paper that confirms which room you are in." The 2026 guide says to go to Wahdah 22. Wahdah 22 may simply be where the housing office now sits. Suggest MESH writes "the housing office in Wahdah 22".
6. **Check with your building's mushrif.** Make sure his records show the right iqama number and the right (new) University number.
   - Source: both versions. Confidence: high.
   - **CONFIRMS** MESH.
7. **Not covered by either version of the guide:**
   - MESH's "Also check" items: the stipend continuing, the timetable, ta'jeel.
   - MESH's note that scholarship students cannot change college once placed. Neither version mentions changing college. See Open questions: chat text from Aug 2025 describes a change of major request.

### student-discounts FAQ and /discounts (src/content/discounts.ts)

**About the deck.** File `00003918-discound04.pdf`, 63 slides, created 2 Sep 2026, posted 12 Sep 2026 by a member together with a screenshot of the University website.
- **Title:** "العروض والتخفيضات المقدمة من شركات القطاع الخاص لمنسوبي الجامعة الإسلامية". It is the same 111-offer programme that discounts.ts cites.
- **The University page:** "العروض والمزايا" (Offers and benefits) on iu.edu.sa, under الإدارة العامة للاتصال والهوية المؤسسية (General Administration of Communication and Institutional Identity). It is addressed to faculty, staff and students and carries a QR code to the offers.
- **Enquiries:** WhatsApp +966 14 813 7178. The deck's last slide gives extension 50021 and a PR email that is cut off (shows "Pr@iu").
- **NEW for the MESH page:** say where the official list lives and give the enquiry line.
- **Coverage:** MESH lists 61 offers. About 50 offers in the deck are not on MESH. Most terms that MESH does list match the deck.

**Changes or extra detail on offers MESH already lists** (each is CONFIRMS plus a detail, unless marked):
- **Al-Daleel Al-Saheeh Labs:**
  - the IU student package is 15 tests for 90 SAR
  - an extra 10% off discounted packages
  - you must show your work card or student card
- **Alpha Labs (minor CONFLICT):** the deck says 50% off individual tests for University staff and all family members, in all branches in the Kingdom. It does not name students. MESH marks the offer `students: true` with "for staff, students and families".
- **Advanced Hijama Centre:** the deck has two slides for it, one at 25% and one at 20% off all services. MESH says 20%.
- **Rouh Al-Shifa:**
  - for staff and their families
  - excludes packages, offers and the pharmacy
  - a special discount on selected cosmetic services
- **Hyundai (Naghi):**
  - up to 3% off a new car at retail
  - 30% off accessories, window tint and ceramic polish
  - an extra 10% off maintenance packages of 1 to 5 years
  - 20% off tyres and batteries
  - wheel alignment and balancing for 199 SAR
  - AC gas refill and service for 299 SAR
- **Al-Dairman Tailoring:**
  - 20% off made-to-measure
  - 10% off sewing your own fabric
  - 10% off ready-made thobes
  - a special price for University students on ready-made thobes in Japanese fabric: 144 SAR
  - 10% off medical uniforms
  - 40% off designs and embroidery
  - free alterations for six months
- **Creative Child Schools:** preparatory 10%, kindergarten 10%, nursery 15%, gifted programme 10%, mental arithmetic 10%, English programme 8%.
- **Al-Hayat Schools:** 12% to 36%.
- **Bamzino Nursery:**
  - two months paid gives the third month free
  - eight months paid gives four months free
  - 20% off monthly fees
  - excludes promotions
- **Islamic University Sports Club:** 50% for students, 30% for staff.
- **ToBE Club:** 25% for staff and first-degree family.
- **Sidra International Hotel:** 15% off, or 10% in Ramadan, Dhul Qa'dah and Dhul Hijjah.
- **Hafawa:** the hotel also has a two-bedroom suite at 511 SAR a night. The resort lists a king room at 223 SAR, a king suite at 295 SAR and a villa at 952 SAR.
- **Durrat Al-Arus:** 20% off chalets at Blue Beach.
- **Khuzaimah Travel:** 15% for University staff.
- **Turkish Airlines:** "discounts for University staff and students on its flights".

**NEW offers in the deck but not on MESH** (date 2 to 12 Sep 2026, official deck, high confidence).

Health:
- **Al-Aqeeq Medical (Al-Sawwa):** up to 20%.
- **Anees Al-Khair Labs:** up to 40%.
- **Basmat Taibah Medical:** offers through a barcode.
- **Al-Amjad United Medical:** 50%.
- **Dr. Muhammad Al-Humaidi Dental:** 40% off root canals, fillings, prosthetics, Hollywood smile, whitening, braces, children's treatment, gums and implants.
- **Hayat Al-Jamal Medical:**
  - 30 SAR consultation in all clinics
  - skin and cosmetics 10%
  - dental and braces 25%
  - pregnancy follow-up without delivery 30%
  - pharmacy 5%
  - X-ray and lab 30%
- **Wad Clinic:** 20% off consultations and procedures for staff and families; up to 20% off surgery.
- **Al-Tib Al-Mutamayyiz:** 20% off services; 30% off implants and prosthetics.
- **Med Care Dental:** 20%, not on the consultation fee or consultants.
- **Madinah Medical Complex:**
  - a reception desk for University staff and students
  - booking on 920002077; the University line is 0596724032
  - physiotherapy 20%, X-ray 50%, lab 20%
  - dental 20% (not prosthetics)
  - nutrition 10%
  - skin 15%, plus 5% on skin offers
  - consultations 20% (not visiting doctors)
- **Madinah Specialist Centre for Psychological and Family Counselling:**
  - 30% off counselling sessions
  - 30% off specialist sessions: psychological disorders, burnout, speech, behaviour, autism, psychological tests
  - open to first-degree family
- **Mudawat wa Ri'ayah Medical:** consultations 20%, tests and X-ray 20%, MRI 50%, CT 40%.
- **Al-Mudawat Hijama Centres:**
  - free consultation
  - 36% off dry or wet cupping (6 cups)
  - 33% off sliding cupping
  - 33% off acupuncture
- **Wafa Talbah Complex:**
  - free consultations for laser, skin cleaning and fat reduction
  - 50% off skin, dental and women's health consultations
  - 10% to 20% off other services
  - 5% pharmacy

Schools:
- **Al-Rayyan Schools (boys and girls):** 15%.
- **Kawn Model Schools:** 15%.

Car rental and car care:
- **Al-Miftah (Key) Car Rental:** staff only, no rate stated.
- **Al-Zimam Car Rental:** 30%, not on luxury cars.
- **Ceramic Shield:** 45% off car heat insulation.
- **Golden Tyre:**
  - free fitting and laser balancing with new tyres
  - free oil check
  - 50% off computer balancing
  - 20% off basic mechanics
  - 10% off oils
  - pay later with Tabby
- **Professional Car Centre:**
  - 45% off labour (repairs of 700 to 1,000 SAR)
  - 20% off a full respray (5,000 to 8,000 SAR)
  - free computer check

Restaurants:
- **Bin Omar Cafeteria:** 10% with the code USL34.
- **Aqati Restaurant:** 10%.

Hotels:
- **Crowne Plaza; Park Inn by Radisson Al-Naseem (Makkah); Al-Dar Al-Baida Grand; Al-Madinah Meridien:** terms only through links to internal University SharePoint files. Not usable by the public.
- **Millennium hotel:** the same, terms only through an internal SharePoint link.
- **Unobi Resorts:** 15%.
- **Marriott serviced apartments:** studio 650 SAR a day, one bedroom and living room 850 SAR.
- **Dolphin Beach Resort:** 20% off stays, 25% off the restaurant, 30% off the private family pool, 50% off the games hall.
- **Just House Yanbu Al-Bahr:** one bedroom and living room 290 SAR; two bedrooms and living room 350 SAR.

Men's care:
- **Al-Umara men's care:** 20%.
- **Azure salon and spa:** 20%.
- **Thob Sar:** 20%.
- **ID men's care:** 20%.

Other offers:
- **Aban Optics:** free eye test, 40% off glasses.
- **Tasali Al-Khair:** up to 15% for University students, with pickup and delivery.
- **Aws Al-Thani Telecom:** 20% off repairs, 30% off Huawei tablets.
- **Muhandis recruitment office:** 10%.
- **Marbat Al-Amwaj equestrian:** up to 20% for staff and students, on riding lessons, stabling and trips.
- **Al-Ikhwan Hussein wal-Hasan Ghazi Shaker (air conditioners):** window units 10%, split 15%, cassette 40%, concealed 40%.
- **Top Trip Travel:**
  - 20 SAR added on domestic flights; a 50 SAR issuing fee on economy flights
  - 5% added on international flights and on trains
  - 10% off hotels and furnished flats
  - 10% off local trips
  - 5% off cruises
  - an international driving licence for one year for 80 SAR
  - 10% off tourist and student visa service fees
- **Zain:** a staff discount, through a link.
- **Arab National Bank:** personal finance rates by salary. Staff only, not relevant to students.
- **Emirates NBD:** finance offers. Staff only, not relevant to students.
- **Talad Real Estate:** 50,000 SAR off limited housing units, with SNB finance at 2.99%. Staff only, not relevant to students.

Suggestion for MESH: add the student-relevant ones (health, schools, men's care, Golden Tyre, Tasali, Aban, Wad Clinic, the Madinah Medical Complex student desk) and leave out the staff-only finance offers.

### university-calendar-1448 (src/content/key-dates.ts)

**Source.** The official calendar "التقويم الجامعي الجامعة الإسلامية 1448 to 1449 هـ", printed, photographed and posted on 25 Jun 2026 (file 00003347). Earlier calendar images: 00000209 and 00000283 for 1447 (Aug 2025), 00001868 for 1447 to 1448 (Feb 2026), 00000171 for 1446 in English (Jul 2025). Confidence: high (official), though it is a photo of a printout.

**CONFIRMS** almost every date MESH holds:
- first semester: withdrawal, excuse, re-enrolment, finals on 29 Nov 2026, the break from 15 to 19 Dec
- second semester: every date
- summer semester: begins 6 Jun 2027, finals 27 Jul 2027
- 1449 begins on 22 Aug 2027

**CONFLICTS:**
- **First-semester ta'jeel window** (shared with internal and external transfer):
  - Calendar: 19 Safar to 2 Rabi al-Awwal 1448, which is 2 to 15 Aug 2026.
  - MESH (key-dates.ts, id `postpone-1`): start "2026-08-02", end "2026-09-01", hijri "19 Safar to 19 Rabi al-Awwal 1448".
  - Chat support: on 15 Aug 2026 a member said ta'jeel was open "for 19 hours" more, which fits a close on 15 Aug.
- **First-semester drop, add and section change:**
  - Calendar: 26 to 30 Safar 1448, which is 9 to 13 Aug 2026.
  - MESH (id `drop-add-1`): start "2026-08-10", end "2026-08-30", "27 Safar to 17 Rabi al-Awwal 1448".
- Unless MESH has a later official extension notice, its first-semester windows look wrong. These windows have passed, so this matters most as a pattern for next year.

**NEW (past now, but they show the pattern):**
- first semester begins 3 Rabi al-Awwal 1448 (16 Aug 2026)
- extra chance requests for dismissed students: 15 Dhul Hijjah 1447 to 18 Safar 1448 (1 Jun to 1 Aug 2026)
- National Day holiday: 12 to 15 Rabi al-Akhir 1448 (23 to 26 Sep 2026)

### living-on-a-visitor-id and tajeel-and-itithaar (visa renewal)

1. **Official notice: "Guidance for educational visa renewal requests"** (إرشادات تقديم طلبات تجديد التأشيرة الدراسية). Issued by the Deanship of Admission and Registration. Posted 30 Mar 2026 (file 00002471). Official notice, high confidence. **NEW**: MESH only says to ask a new visa on the Minhati visa page.
   - **Who may apply:**
     - students whose status is deferred (مؤجل) or excused (معتذر)
     - students who asked for reinstatement in the Academic System and whose status is folded (مطوي قيده), withdrawn (منسحب) or discontinued (منقطع عن الدراسة)
     - students whose exit and re-entry visa expired, so their status became "exited and did not return" (خرج ولم يعد)
   - **Before you apply:**
     - The passport must have at least six months left from the expected travel date to the Kingdom.
     - Enter your name exactly as in the passport, with nothing added or missing, starting with the first name.
     - Choose the Saudi embassy or consulate where you will collect the visa (your "arrival point").
   - **After you apply:**
     - Follow the request in your own account until the visa notice (إفادة) is issued. It appears inside your request, not on the platform's main page.
     - Finish the visa at the Saudi embassy before the date set in the notice.
     - If the name or passport number does not match, the visa cannot be used and you cannot travel on it.
     - Arrive by the date in the notice.
   - **Window for the first semester of 1448:** Wednesday 15 Ramadan 1447 (4 Mar 2026) to Wednesday 20 Shawwal 1447 (8 Apr 2026).
   - The notice has QR codes for a how-to video, an explanation and the application link.
   - Caption by a member: "One week left to apply for Visa, for new students and students on tajeel and i'tithaar."
2. **University form: "Educational visa extension"** (تمديد التأشيرة التعليمية). Posted 2 Mar 2026 (file 00002164). Official form, high confidence. **NEW**: MESH says only "Ask the University about renewal well before that date, through Tawasul."
   - It is for students who were issued a Visitor ID (هوية زائر). They fill in their details exactly as in the passport and the ID; the data is approved officially.
   - Deadline that day: 9:00 pm.
   - A member added that students holding an iqama do not need to fill it in.
   - Pattern: the University runs Visitor ID renewal as a short form campaign announced in the groups, with a same-day deadline. Students must watch the official channels.

### etimad-account and student-ticket-rules FAQ

1. **Official notice from Travel Management: "New instructions on government travel tickets for students"** (التعليمات الجديدة بخصوص تذاكر السفر الحكومية للطلاب). Posted 28 Mar 2026 (file 00002427). Official notice, high confidence. **CONFIRMS** MESH's list of rules almost word for word: issued only against an official travel order on Etimad, no open tickets, 3 months validity, no name change, no change of outbound airports (date or time only, student pays the difference), no downgrade (upgrade at own cost), cancelling returns the ticket to the University with no cash refund, a no-show loses the whole ticket, no voucher after a change and nothing added to a wallet, one cabin bag and two checked bags per the carrier's rules. One difference:
   - The notice has 9 points and **does not mention "capital city only"**. MESH's first rule ("a capital city only, in your own country or in the country that issued the visa you arrived on") must come from another source.
   - Context from the chat captions: members with families found the new system hard. They can no longer cancel and use the money to book family tickets. Extra bags for a family cost about 400 to 500 USD, not counting the onward flight to their own city.

### student-iqama-renewal FAQ and university-offices-and-contacts

1. **The Tawasul path for iqama renewal and other Travel Management requests.** Posted 2 Sep 2026 (files 00003834, 00003837, 00003838). Screenshots and steps from a member, high confidence.
   - **The path:**
     1. Open eservices.iu.edu.sa.
     2. Under Programs, open نظام تواصل / إدارة الطلبات.
     3. Tap the menu (three lines, top left), then New request.
     4. Scroll near the bottom to تواصل مع إدارة السفر (Contact Travel Management). It is the helpdesk.iu.edu.sa form.
     5. Under نوع الطلب (request type), choose one:
        - طلب تذكرة سفر (travel ticket)
        - طلب تجديد الإقامة (iqama renewal)
        - طلب نقل مشروعية الجواز (move the iqama to a new passport)
        - طلب إصدار إقامة بدل فاقد (replace a lost iqama)
        - أخرى (other)
     6. Fill in the subject and details, with your name, University number and iqama number. Attach files if needed.
   - **CONFIRMS** the MESH FAQ (send the request to Travel Management through Tawasul).
   - **NEW:** the exact request types and menu path.
   - The same list of Tawasul destinations also shows "Contact the University Director" and "College of Law (Systems and Judicial Studies)".
2. **Tawasul terms of use** (شروط استخدام الخدمة). Posted 16 Feb 2026 (file 00001998). Screenshot of the system, high confidence. **NEW** for university-offices-and-contacts ("Writing a request that gets answered"):
   - The service is for individual requests about students' academic affairs.
   - The student must make sure the data and claims are correct. False data exposes the student to accountability.
   - Copy-paste messages break the posting rules and can get the account blocked. A member noted this means a group cannot all send the same letter.
   - Repeated messages for the same request also break the rules and can get the account blocked.
3. **Beneficiary service email.** A sign reading "خدمة المستفيدين / Customer Service: it.care@iu.edu.sa". Posted 10 Aug 2026 with the caption "Send mail here" (file 00003561). **CONFIRMS** the Blackboard FAQ, which already gives it.care@iu.edu.sa.

### campus-life-islamic-university and free-bus-to-haram FAQ

1. **Rabwa hall bus times** (توقيت حافلات الربوة). From a screenshot of the Rabwa students' group. Posted 8 Oct 2025 (file 00000879). Single member, medium confidence; the 2025 to 2026 year, needs confirming for 1448. **NEW**: MESH tells readers to message Admin for times.
   - **Rabwa to the University:** 7:00 am and 9:00 am. Buses that bring students from the University to Rabwa go straight back to the University.
   - **University to Rabwa:** 12:00 noon, 1:00 pm (after Dhuhr), 3:00 pm (before Asr), 5:00 pm (after Asr), 6:00 pm (just before Maghrib).
   - **Rabwa to the Haram:** Saturday to Thursday after 3:00 pm (Asr time), sometimes after the prayer and sometimes before it. Friday at 9:00 am.
2. **Official notice: stickers for bikes and scooters.** Deanship of Student Affairs, posted 12 May 2026 (file 00003082). High confidence. **NEW**.
   - Stickers for owners of motorbikes, bicycles and scooters are fitted at Wahdah (Unit) 22 from Wednesday 13 May 2026, by first letter of the name. 850 students are listed in total:

     | Group | Letters | Students | Days (2026) |
     |---|---|---|---|
     | 1 | ا | 133 | Wed 13 to Thu 14 May |
     | 2 | ب to ز | 120 | Fri 15 to Sat 16 May |
     | 3 | س to ل | 114 | Sun 17 to Mon 18 May |
     | 4 | ع | 131 | Tue 19 to Wed 20 May |
     | 5 | م | 253 | Thu 21 to Sat 23 May |
     | 6 | ن, هـ, و, ي and names in English letters | 99 | Sun 24 to Mon 25 May |

   - A member said it applies to anyone riding a scooter inside the University, not only residents, and that riders without one may be fined (not stated in the notice).
3. **Wahdah 22** comes up repeatedly as the service building: student card window, housing paper, card renewal kiosk, scooter stickers. **NEW**: MESH never names it. It would fit in campus-life or university-offices-and-contacts as "Wahdah (Unit) 22: student services windows, open from 8:00".

### postgraduate-admission-1448

1. **Official slide: "Higher diploma programmes open for admission in 1448"** (برامج الدبلوم العالي المتاحة للقبول في العام الجامعي 1448هـ). Posted 11 Jan 2026 (file 00001599). High confidence.
   - **College of Arabic Language and Humanities:** language skills; guidance and counselling; media and communication.
   - **College of Aqeedah and Da'wah:** Da'wah and Islamic culture.
   - **College of Law:** judiciary and Shari'ah policy.
   - **College of Computer:** cybersecurity.
   - **Language Teaching Institute:** teaching Arabic to non-native speakers.
   - **CONFIRMS** seven of MESH's eight diplomas.
   - MESH also lists an **Arbitration** diploma (8,000 SAR a semester). It is not on this slide. The slide is one frame of a carousel, so it may be on another frame or added later. Worth checking.
   - A member added that most colleges post the diploma list on their Telegram channel, and on QR codes in the classrooms.

### umrah-rawdah-quba (Makkah and the Haram)

1. **Haram electric carts in Makkah** (عربات الحرم الكهربائية). General Authority for the Care of the Two Holy Mosques, posted 28 Feb 2026 (file 00002141). Official, high confidence. **NEW**: MESH only mentions the Quba walkway carts and carts in Madinah's courtyards.
   - 300 SAR per person for a complete Umrah.
   - Free for people with disabilities and for children under 6.
   - 50% off for people aged 65 and over.
   - Booking ahead through the Unified Transport Platform (منصة التنقل الموحدة) is required.
   - A member added the booking site carts.alharamain.gov.sa, and that tawaf and sa'i must be booked together.
   - Authority contact: 1966.

### NEW guide or FAQ: I'tikaf in Ramadan at the two Harams

1. **Official notice for 1447.** General Authority for the Care of the Two Holy Mosques. Posted 19 Feb 2026 (file 00002075, with the link eservices.alharamain.gov.sa). High confidence.
   - Registration for i'tikaf for men and women, at Masjid al-Haram or Masjid an-Nabawi, opened on 3 Ramadan 1447 at 11:00 am.
   - I'tikaf runs from 20 to 30 Ramadan 1447.
   - **Steps:**
     1. Open the link and sign in or create an account. Citizens and residents can sign in through Nafath.
     2. Choose the place: Masjid al-Haram or Masjid an-Nabawi.
     3. Accept the conditions, complete the details and submit.
     4. Requests are reviewed against capacity. Accepted applicants get a text message.
2. **The 1446 notice.** Shared 19 Feb 2026 "from last year" (file 00002069, link alharamain.gov.sa/public/?module=eservices).
   - Applications from Wednesday 5 Ramadan 1446 at 11:00 am, until places run out.
   - I'tikaf from 20 to 30 Ramadan 1446.
   - Pattern: registration opens in the first week of Ramadan; places are limited.
3. **Where the permit appears.** A member said the permit shows in the Zaeroon (زائرون) app under Permits. Single member, medium confidence.
- MESH has nothing on i'tikaf: **NEW**.

### masjid-an-nabawi duroos (lessons database: src/server/seed/legacy/lessons.ts)

1. **Official poster "الدروس العلمية من رحاب المسجد النبوي".** Presidency of Religious Affairs at the Two Holy Mosques, issued Sha'ban 1447. Posted 21 Jan 2026 (file 00001689). It lists 24 teachers with books, days, times and places. Official, high confidence for that term.
   - It is **older** than the MESH lessons seed, which uses a Quba period of 1 Rabi al-Akhir to 30 Jumada al-Akhirah 1448.
   - **Teachers on the poster with no entry in MESH's legacy lessons:**
     - Shaykh Ibrahim ibn Ibrahim at-Turki: Sharh Umdat al-Ahkam (Friday after Fajr) and Kitab at-Tawhid (Saturday after Fajr), northern expansion near Bab Umar.
     - Prof. Ahmad ibn Ali as-Sudays: at-Tawdih wal-Bayan li Shajarat al-Iman (Sunday after Asr) and Tafsir as-Sa'di (Tuesday after Maghrib), first Saudi expansion.
     - Dr. Abdulaziz ibn Rajiy as-Sa'idi: al-Muharrar of Ibn Abdul Hadi (Monday and Tuesday after Maghrib), western expansion, Gate 4.
     - Prof. Abdulaziz ibn Salih al-Ubayd: Tafsir as-Sa'di (Wednesday after Maghrib and Isha), western expansion, Gate 11.
     - Prof. Abdullah ibn Muhammad al-Amin: Tafsir al-Baghawi (Sunday to Tuesday after Maghrib), western expansion, Gate 5 (Quba).
     - Prof. Abdullah ibn Ibrahim ar-Rajih: Umdat at-Talib (Sunday and Tuesday after Fajr) and al-Inayah bi Adillat al-Kifayah (Tuesday and Wednesday after Maghrib), northern expansion behind Bab Umar.
     - Dr. Abdullah ibn Abdurrahman al-Ujayan: Tafsir Juz Amma and al-Arba'in an-Nawawiyyah (Wednesday after Maghrib), first Saudi expansion.
     - Prof. Muhammad ibn Sidi al-Amin: al-Itqan fi Ulum al-Qur'an (Wednesday after Maghrib), western expansion, Gate 4.
     - A further teacher whose name is not fully legible on the photo: Bidayat al-Mujtahid (Sunday after Maghrib) and Umdat al-Ahkam (Monday after Maghrib), northern expansion near Bab Umar.
     - Prof. Mas'ud ibn Bashir al-Muhammadi: Sahih Muslim (Sunday to Wednesday after Maghrib), western expansion, Gate 8.
     - Prof. Ali ibn Abdulaziz as-Sudays: ash-Sharh al-Mumti' (Tuesday after Maghrib), first Saudi expansion.
     - Dr. Salih ibn Abdullah al-Abbud: Sharh al-Aqidah al-Wasitiyyah of Muhammad ibn Ibrahim (Sunday to Wednesday after Maghrib), first Saudi expansion between Bab Umar and Bab Uthman.
     - Shaykh Saud al-Khalaf on Sullam al-Wusul by Hafiz al-Hakami (Wednesday and Thursday after Maghrib), near Bab Umar. MESH has him for at-Tadmuriyyah.
   - Use this as a lead list to check against the current 1448 programme on prh.gov.sa or @PRAGOVSA before adding anything. It is not a current timetable.
   - Confidence for the present term: low. Old, needs confirming.

### hajj-as-a-student

1. **Ifta hotline notice for Hajj.** The General Presidency of Scholarly Research and Ifta, under the direction of the Grand Mufti, assigned scholars to answer pilgrims' questions during Hajj. Posted 8 Jun 2025, Hajj 1446 (file 00000059). Official, high confidence for 1446.
   - Ifta WhatsApp line: 0535256603.
   - Presidency switchboard 0114595555; alifta.gov.sa; alifta@alifta.gov.sa; X @aliftasa.
   - The individual scholars' numbers are not reproduced.
   - **NEW.** Old, needs confirming each year. Pattern: the Presidency publishes the numbers before each Hajj.

### kindergartens-and-schools and family (NEW FAQ: "Do school holidays match the University's?")

1. **Ministry of Education holidays for the 1447 school year (2025 to 2026).** Posted 12 Oct 2025 (file 00000938). Official content via the "almaydanedu" account. High confidence for 1447.
   - National Day: 1 Rabi al-Akhir 1447.
   - Extra days off: 20 Rabi al-Akhir 1447, and 20 to 23 Jumada al-Akhirah 1447.
   - Autumn break: 30 Jumada al-Ula to 8 Jumada al-Akhirah 1447.
   - Mid-year break: 20 to 28 Rajab 1447.
   - Founding Day: 5 Ramadan 1447.
   - Eid al-Fitr: 17 Ramadan to 9 Shawwal 1447.
   - Eid al-Adha: 5 to 15 Dhul Hijjah 1447.
   - End of year: 10 Muharram to 10 Rabi al-Awwal 1448.
   - A member asked whether this applied to University students. Others answered that it does not unless the University announces it.
   - **NEW:** families need both calendars, because school long weekends and the autumn break are not University holidays. Old, needs the 1448 version.

### graduate-procedures and scholarship-stipend-and-allowances (shipping books home)

1. **Saudi Post (SPL) international parcel prices by country.** Price card photographed and posted 25 Aug 2026 in answer to "shipping prices for SPL to the US for 10, 20, 30 kg" (file 00003729). Official price card, undated, medium confidence. **NEW**: MESH says the graduation allowance is for shipping books but gives no shipping costs. SAR by weight band:

   | Country | 1 to 10 kg | 10 to 20 kg | 20 to 30 kg |
   |---|---|---|---|
   | USA | 398 | 617 | 784 |
   | UK | 253 | 374 | 507 |
   | Canada | 362 | 604 | 776 |
   | Australia | 483 | 758 | 835 |
   | Germany | 362 | 531 | 696 |
   | France | 273 | 459 | 640 |
   | Nigeria | 277 | 422 | 563 |
   | Kenya | 277 | 459 | 616 |
   | Morocco | 277 | 382 | 519 |
   | Egypt | 200 | 241 | 265 |
   | Turkey | 156 | 224 | 289 |
   | India | 193 | 279 | 319 |
   | Pakistan | 212 | 265 | 303 |
   | Bangladesh | 237 | 340 | 384 |
   | Indonesia | 230 | 340 | 384 |
   | Malaysia | 230 | 340 | 391 |
   | Philippines | 217 | 281 | 351 |
   | South Africa | 362 | 531 | 696 |

   - The card covers about 70 countries, served from SPL branches in Makkah and Madinah.
   - SPL unified number: +966 11 289 8888, extension 9.
2. **SPL National Day offer 2026.** A flat 196 SAR for up to 30 kg from Saudi Arabia to anywhere in the world, from 11 to 16 Sep 2026. Posted 15 Sep 2026 (file 00003968). The caption says "200 riyals for up to 30 kg to any country", recommended for sending books home. Official advert, high confidence for those dates.
   - Pattern: watch for an SPL offer around Saudi National Day (23 Sep). It costs far less than the normal USA price of 784 SAR for 30 kg.

### visas-for-family-and-visitors

1. **The 180-day cap on visit visa extensions.** An Absher screenshot (26 Oct 2025, file 00001057) shows: "Cannot Proceed. The visit cannot be extended, because the visa duration after extension will exceed the allowed limit." **CONFIRMS** MESH's cap on the total stay: "the total stay is capped at 180 days" (guides-2026.ts). Single member, high confidence that the error exists.

### iqama-and-exit-reentry-fees

1. **How a single exit and re-entry visa reads in Absher.** Screenshot of 16 Feb 2026 (file 00001923): visa type تأشيرة خروج وعودة مفردة, exit before 21/02/2026, return before 21/02/2026. A member explained that the holder, then abroad, could enter Saudi Arabia, even through a transit in Riyadh, as long as it was before 11:59 pm Saudi time on 21 Feb. Medium confidence. **NEW**, a small FAQ: "My exit and re-entry shows two dates, what do they mean?"
2. **The Jawazat SMS about a last travel date.** A Jawazat SMS (2 Apr 2026, file 00002566) gave a "last travel date" for an iqama holder. A member said it can be ignored. Low confidence, needs confirming.

### NEW FAQ: Help for American citizens (US State Department lines)

1. **US State Department alert.** "Security Updates for Americans in the Middle East (Updated March 2, 4pm EST)". Posted 3 Mar 2026 (file 00002177).
   - It told Americans in 17 countries, including Saudi Arabia, to depart now via commercial means because of serious safety risks.
   - Help lines, 24 hours: +1 202 501 4444 from abroad; +1 888 407 4747 from the US and Canada.
   - Official, high confidence for that date. Time-bound.
   - The help lines are durable and suit a MESH FAQ for American students.
   - From the chat text (6 Oct 2026, not an attachment): the US Consulate Jeddah's appointment page for passport services is evisaforms.state.gov (postcode jdd).

### Library (course summaries, subject and level only)

- **00003177 "تلخيص مصطلح 4.pdf":**
  - A 113-page Arabic summary of the course Mustalah al-Hadith 4, College of Hadith, academic year 1447. Written by a student, posted 17 May 2026.
  - Covers the 24th and 25th types of Ibn as-Salah: receiving and passing on hadith, and writing and recording hadith.
  - Suits the library's College of Hadith muqarrarat folder, with the author's permission.
- **00004225 "التنظيم القضائي الاختبار النهائي.pdf":**
  - A 23-page Arabic final exam summary for the course al-Tanzim al-Qada'i (Judicial Organisation), College of Shari'ah, 1446.
  - Covers the judiciary in fiqh and the Saudi judicial system: courts, the Supreme Judicial Council, judges and notaries.
  - Posted 6 Oct 2026. Suits the College of Shari'ah folder. The level is not stated.

## 3. Recurring yearly patterns

- **Ma'had graduates:**
  - The college choice link reaches Ma'had group chats in the final Ma'had semester.
  - New cards and housing papers are handled at Wahdah 22 at the start of the Kulliyah semester (mid August), from 8:00, best before Dhuhr.
- **Visa renewal** for students on ta'jeel, i'tithaar or a broken status opens in Ramadan. For the 1448 first semester it ran from 4 Mar to 8 Apr 2026, on the Deanship of Admission and Registration's platform. Visitor ID extension forms come as same-day campaigns.
- **The academic calendar** is released before the timetable. Timetables come out a few days before drop and add (member, Jul 2025).
- **First-semester windows** (1448 pattern): ta'jeel and transfer from the start of August for about two weeks; drop and add the week before classes; classes in mid August.
- **I'tikaf registration** at the two Harams opens around 3 to 5 Ramadan at 11:00 am. The i'tikaf itself runs from 20 Ramadan to the end of the month. Places are limited.
- **Ifta hotlines** for pilgrims are published before each Hajj.
- **Saudi Post** runs a National Day shipping offer in mid September: flat 196 SAR up to 30 kg in 2026.
- **The University discounts deck** is refreshed. The 2026 edition is dated September and lives on the Communication and Institutional Identity page of iu.edu.sa.
- **Ministry of Education school holidays** differ from University holidays: autumn break, mid-year break and extra long weekends.
- **Travel Management's ticket rules** (2026) apply to every summer ticket. Students with families plan family tickets separately.

## 4. Open questions worth confirming officially

1. Were the first-semester 1448 ta'jeel window (calendar: 2 to 15 Aug 2026) and the drop and add window (9 to 13 Aug 2026) extended officially? This would explain MESH's later end dates (1 Sep and 30 Aug). If not, key-dates.ts needs correcting, and next year's entries should follow the printed calendar.
2. Is the housing office now in Wahdah 22, so that "the housing office (إدارة السكن)" and "Wahdah 22" are the same place? Is the student card window still there for the 1449 intake?
3. Does the new Kulliyah University number always end in 3 (the Ma'had number with its last digit changed)?
4. Can a scholarship student change college? MESH says no. Chat text of 18 Aug 2025 (not an attachment) says a "طلب تغيير تخصص" (change of specialisation) request sits under the Academic tab, after at least one semester in the Kulliyah. Needs an official answer.
5. The "capital city only" ticket rule in MESH is not in the 28 Mar 2026 Travel Management notice. Which official source states it?
6. Is the Arbitration higher diploma open for 1448? It is on MESH's fee table but not on the official programme slide.
7. Does the scooter sticker rule apply to non-residents riding on campus, and is there a fine?
8. Current Rabwa bus times for 1448, and whether they change in Ramadan and exam weeks.
9. Alpha Labs: are students included, or only staff and families?
10. A student who took two ta'jeels in a row: does he repeat the full new-student visa process? Chat text of 3 Mar 2026 says yes, unless his visa was extended to the end of August.

## 5. Top 10 additions for MESH, ranked

1. **Visa renewal (living-on-a-visitor-id and tajeel-and-itithaar):** add the Deanship of Admission and Registration's guidance: who is eligible, passport valid six months, exact name, choose the embassy, follow the request until the notice is issued, finish at the embassy before the date. Add the yearly window (Ramadan to Shawwal; 4 Mar to 8 Apr 2026 for 1448).
2. **graduating-from-mahad:** name Wahdah 22 (glass hall on the left, student card window, open from 8:00, go before Dhuhr) for the new card and the housing paper. Add "show your iqama in Absher" and "a new passport photo". Say the new number usually differs only in its last digit (1 becomes 3).
3. **key-dates.ts:** check the first-semester ta'jeel (calendar: 2 to 15 Aug 2026) and drop and add (9 to 13 Aug 2026) entries against the official printed 1448 to 1449 calendar. Add the first day of classes and the National Day holiday for completeness.
4. **/discounts:** add the official source (iu.edu.sa "Offers and benefits" page, WhatsApp +966 14 813 7178). Add the student-relevant offers missing from MESH: the Madinah Medical Complex student desk, Wad Clinic, Hayat Al-Jamal, the counselling centre, Mudawat wa Ri'ayah, Al-Rayyan and Kawn schools, the men's care salons, Golden Tyre, Tasali Al-Khair, Aban Optics. Add the extra terms: Daleel's 15 tests for 90 SAR, Al-Dairman's 144 SAR student thobe, Hyundai's fixed prices. Fix Alpha Labs (staff and families).
5. **Shipping books home (graduate-procedures and scholarship-stipend-and-allowances):** add the SPL price table (USA 398, 617 and 784 SAR for up to 10, 20 and 30 kg) and the tip to watch for the National Day offer (196 SAR flat up to 30 kg in Sep 2026).
6. **New I'tikaf FAQ or section:** registration on eservices.alharamain.gov.sa from about 3 Ramadan at 11:00 am, i'tikaf 20 to 30 Ramadan, Nafath sign-in, choose the Haram, accepted by SMS, permit in the Zaeroon app.
7. **student-iqama-renewal and university-offices-and-contacts:** give the exact Tawasul path to Travel Management and its five request types. Add the Tawasul terms: one request per matter, no copy-paste letters, no repeats, or the account can be blocked.
8. **campus-life and free-bus-to-haram:** publish the Rabwa bus times after confirming them for 1448, and add the bike and scooter sticker rule (Deanship of Student Affairs, Wahdah 22).
9. **umrah-rawdah-quba:** add the Makkah Haram electric carts: 300 SAR per person for a full Umrah, free under 6 and for people with disabilities, 50% off at 65 and over, book ahead on the Unified Transport Platform (carts.alharamain.gov.sa, tawaf and sa'i together).
10. **New FAQ for American students:** US State Department 24-hour lines (+1 202 501 4444 from abroad, +1 888 407 4747 from the US and Canada) and the US Consulate Jeddah appointment page. Also add a family FAQ that public school holidays (Ministry of Education) differ from the University's.
