# Islamic University staff and student discounts (October 2026) and the University Sports Club leaflet

**Source 1, `student-discounts-deck.pdf` (Downloads: `discount010.pdf`).** This is an official Islamic University document. The title slide reads "العروض والتخفيضات المقدمة من شركات القطاع الخاص لمنسوبي الجامعة الإسلامية" (offers and discounts from private companies for Islamic University staff) and carries the University logo. The closing slide (page 68) names the issuer as the General Administration for Communication and Corporate Identity (الإدارة العامة للاتصال والهوية المؤسسية), with iu.edu.sa and the University's social accounts. The "click here" links inside point to files on the University's own Office 365 (iuoffice365 SharePoint). The PDF is a PowerPoint export created on **25 October 2026** (from the file metadata; no date appears on the slides). It has 68 pages. Page 2 says there are **118 offers** in total. The deck sets **no end date** for any offer. The only time limits are seasonal: Sidra International Hotel and Omariya Hotel. Most offers are worded for "منسوبي الجامعة" (University staff and affiliates), and some name students too. I read all 68 pages using the extracted text (`p07.txt`). The PDF was rendered page by page to images (Windows PDF renderer) to check the cover and closing slides, the two-column list slides, and pages 10, 12, 30, 43 to 45 and 66 to 67, where the text was jumbled or empty.

**Source 2, `sports-club-leaflet.pdf` (Downloads: `نبذة عن النادي الرياضي PDF_compressed.pdf`).** This is the official 10-page brochure of the Islamic University Sports Club, branded "IU SPORT / النادي الرياضي" with Vision 2030 branding. It is undated. It is a scan with no text layer, so I rendered all 10 pages to images and read them. The duplicate copy (`_النادي الرياضي.pdf`, same size) was ignored. Pages: 1 cover, 2 about and goals, 3 staff structure and branch, 4 to 8 facilities, 9 packages and prices, 10 opening hours.

**Compared with:** `src/content/discounts.ts` (61 offers in 7 groups; the live /discounts page renders from it), and the seed bodies of `campus-life-islamic-university` (`src/server/seed/content/guides-student-life.ts`, section "Sport"), `sports-and-activities` and `everyday-apps-and-services` "Gyms" (`guides-2026.ts`), plus the FAQ `student-discounts`.

## 1. Summary

The deck lists every company offer the University negotiated for its staff and students, in eight groups: health (32 listed), education (9), car rental (6), car services (7), restaurants (13), hotels and resorts (15), sport (6), men's care and tailoring (7) and other offers (23). The leaflet describes the University Sports Club: what it is for, its single branch, its facilities, its packages and prices for students, staff and the public, the rules for pausing a membership, and its opening hours.

**The 10 most valuable findings**
1. **The University's discount list now has 118 offers (October 2026). MESH lists 61. The deck has 54 offers MESH does not have,** including 14 more clinics, labs and hospitals, 4 schools and an institute, 5 car businesses and 4 restaurants (deck pages 2 to 67).
2. **Every offer MESH lists still appears in the deck. None has gone.**
3. **Sports Club prices (VAT included):** day pass 30 SAR for everyone. One month: 125 SAR for students, 175 SAR for staff, 250 SAR for the public. Three months: 345, 450 or 600. Six months: 600, 800 or 1,000. Twelve months: 1,000, 1,200 or 1,700 (leaflet page 9).
4. **Sports Club hours:** Saturday to Thursday 1:00 pm to 11:00 pm, Friday 4:00 pm to 11:00 pm (leaflet page 10).
5. **Pausing a membership:** a 3-month membership can be paused once for up to 15 days, a 6-month one once for up to 30 days, and a 12-month one twice for up to 60 days in total (leaflet page 9).
6. **Facilities:** an indoor multi-court hall (basketball, handball, volleyball), a covered air-conditioned Olympic pool, an outdoor Olympic pool (under maintenance), a squash court, a CrossFit hall, a cardio hall, a weights hall, outdoor football, five-a-side, volleyball and tennis courts, the IU Coffee cafe and the IU Store sports shop. There is one branch, inside the University behind the science colleges (leaflet pages 3 to 8).
7. **"50% off for students" at the Sports Club is exactly true only for the one-month package.** Longer student packages are 40% to 43% below the public price. The deck adds a staff discount of 30% (deck page 49, leaflet page 9).
8. **Alpha Labs' 50% is for University staff and all family members, at every branch in the Kingdom.** Students are not named, but MESH marks it as naming students (deck page 15).
9. **Sidra International Hotel gives 10%, not nothing, in Ramadan, Dhul Qa'dah and Dhul Hijjah** (15% the rest of the year). MESH says "outside Ramadan and the Hajj months" (deck page 46).
10. **New student-relevant offers:** Al-Daleel Al-Saheeh Labs has an "IU students package" of 15 tests for 90 SAR (show work or student card). Al-Dairman sells a ready-made Japanese-fabric thobe to students for 144 SAR. A counselling centre gives 30% off psychological and family counselling. Al-Madinah Medical Complex has a reception desk for University staff and students (deck pages 16, 17, 19, 55).

## 2. Findings by MESH topic

### 2.1 Discounts (target: `src/content/discounts.ts`, /discounts, FAQ `student-discounts`)

Every offer in the deck appears below, alphabetical by English name within each deck category. Status: **NEW** (not in discounts.ts), **CONFIRMS** (in discounts.ts with the same terms; any extra detail the deck adds is noted), **CONFLICTS** (different percentage or terms). "Staff" means منسوبي الجامعة. "Students named" means the deck mentions students (طلاب الجامعة) for that offer. No offer has an end date ("Expiry" column) unless stated.

#### Health (العروض الصحية), deck pages 3 to 21

| Business (English) | Arabic | Discount | Conditions | Expiry | Page | Status |
|---|---|---|---|---|---|---|
| Advanced Hijama Medical Centre | مركز الحجامة المتقدمة الطبي | 25% off all services | The slide has two entries with this name: 25% with the centre's logo, and 20% beside the Dr. Hamid Al-Ahmadi Hospital logo | none | 12 | CONFLICTS: MESH says "20% off all services" |
| Al-Amjad United Medical Company | شركة الأمجاد المتحدة الطبية | 50% off medical services | | none | 11 | NEW |
| Al-Aqeeq Medical Complex (Laswa) | مجمع العقيق الطبي (لاسوا) | Up to 20% off medical services | | none | 8 | NEW |
| Al-Daleel Al-Saheeh Medical Labs | مختبرات الدليل الصحيح الطبية | 50% off routine individual tests; extra 10% off already discounted packages; "IU students package" (باقة طلاب الجامعة الإسلامية) of 15 comprehensive tests for 90 SAR | Show your work card or student card. Students named | none | 19 | CONFIRMS (add the 10% and the 90 SAR price) |
| Al-Madinah Medical Complex | مجمع المدينة الطبي | 20% off consultations (not visiting doctors), physiotherapy, lab and dental work (not prosthetics); 50% off listed radiology services; 15% off dermatology and cosmetics, plus 5% more on dermatology offers; 10% off nutrition clinics | Not on marketing offers. Dedicated reception desk for University staff and students (students named). Booking line 920002077 | none | 16 | NEW |
| Al-Madinah Specialist Centre for Psychological and Family Counselling | مركز المدينة التخصصي للإرشاد النفسي والأسري | 30% off psychological, family, social and children's educational counselling; 30% off specialist sessions (psychological disorders, burnout, speech and language, behaviour modification, autism, psychological testing) | First-degree relatives can use it | none | 17 | NEW |
| Al-Mouwasat Hospital | مستشفى المواساة | 20% off all health services | | none | 9 | CONFIRMS |
| Al-Mudawah Hijama Centres Group | مجموعة مراكز المداواة للحجامة | Free consultation in all departments; 36% off dry or wet cupping (6 cups); 33% off sliding cupping; 33% off acupuncture | | none | 19 | NEW |
| Al-Shamel Medical Labs | مختبرات الشامل للتحاليل الطبية | 50% off all in-house individual tests | | none | 10 | CONFIRMS (add "in-house") |
| Al-Shinawi Dental Complex | مجمع الشيناوي لطب الأسنان | 50% off check-ups, panoramic X-ray, surface cleaning; 25% off scaling, prosthetics, children's dentistry, braces, root canals and fillings, cosmetic work | | none | 13 | CONFIRMS |
| Al-Tib Al-Mutamayiz Medical Complex | مجمع الطب المتميز الطبي | 20% off services; 30% off dental implants and prosthetics | | none | 14 | NEW |
| Alpha Labs (listed twice: "Alpha Medical Labs" and "Alpha Labs Complex") | مختبرات الفا | 50% off individual tests | For staff and all family members, at all branches in the Kingdom. Students not named | none | 15 | CONFLICTS: MESH says "for staff, students and families" (students: true) |
| Amer Medical Clinics Complex | مجمع عيادات عامر الطبي | 50% off all services | | none | 7 | CONFIRMS |
| Anees Al-Khair Medical Labs | مختبرات أنيس الخير للتحاليل الطبية | Up to 40% off | | none | 8 | NEW |
| Basma Taibah Medical Complex (dermatology, dental) | مجمع بسمة طيبة الطبي | Offers shown only through a QR code | No terms on the slide | none | 10 | NEW (no terms to publish) |
| Dr. Hamid Sulaiman Al-Ahmadi Hospital | مستشفى د. حامد سليمان الأحمدي | Up to 40% off medical services | | none | 5 | CONFIRMS |
| Dr. Mohammed Al-Humaidi Dental and Orthodontics Complex | مجمع الدكتور محمد الحميدي لطب وتقويم الأسنان | 40% off root canals and fillings, all prosthetics, Hollywood smile, whitening, braces, children's dentistry, gum treatment and implants | | none | 13 | NEW |
| Golden Clinic | العيادة الذهبية | 20% to 50% off more than 18 services | | none | 6 | CONFIRMS |
| Hakeem Taibah General Medical Complex | مجمع حكيم طيبة الطبي العام | 35% off all departments and services | | none | 6 | CONFIRMS |
| Hayat Al-Jamal Medical Complex | مجمع حياة الجمال الطبي | Consultation 30 SAR in all clinics; 10% off dermatology and cosmetics; 25% off dental and braces; 30% off pregnancy follow-up without delivery (scans included); 30% off all radiology and lab (some tests excluded); 5% off the pharmacy | | none | 14 | NEW |
| International General Medical Complex | المجمع الدولي الطبي العام | 50% off consultations, 30% off other services | | none | 9 | CONFIRMS |
| Med Care Medical Dental Complex | مجمع مد كير الطبي للأسنان | 20% off | Not on the consultation fee or consultants' services | none | 15 | NEW |
| Mudawah wa Ri'ayah Medical Company | شركة مداواة ورعاية طبية | 20% off consultations; 20% off tests and radiology; 50% off MRI; 40% off CT | For staff and families | none | 18 | NEW |
| Rouh Al-Shifa Medical Complex | مجمع روح الشفاء الطبية | 50% off consultations, 30% off services, a special discount on selected cosmetic services | For staff and families. Not on offers, packages or the pharmacy | none | 18 | CONFIRMS (add the exclusions) |
| Safwat Al-Muhaidib Complex | مجمع صفوة المهيدب | 20% to 50% off all services | | none | 7 | CONFIRMS |
| Saudi German Hospital | مستشفى السعودي الألماني | 10% off consultations booked on the website; 15% off radiology and lab; 15% off admission and surgery | | none | 11 | CONFIRMS |
| Taba Dent Clinics | عيادات طابة دنت | 50% off X-rays and check-ups; 40% off dental treatment; 30% off prosthetics | | none | 20 | CONFIRMS |
| United Madinah Hospital | مستشفى المدينة المتحدة | 40% off outpatient visits; 30% off lab and radiology; 30% off surgery and admission | | none | 5 | CONFIRMS |
| Wad Clinics (listed twice: "Wad Clinic" and "Wad Medical Clinics") | واد كلينيك / عيادات واد الطبية | 20% off consultations and all procedures; 20% (or "up to 20%") off surgery | For staff and first-degree relatives | none | 14, 21 | NEW |
| Wafaa Talbah Complex | مجمع وفاء طلبه | Free consultation for fat reduction, laser and skin cleaning; 50% off dermatology, dental and obstetrics consultations; 20% off laser hair removal, skin cleaning, slimming (not courses), dental (not whitening or prosthetics) and braces; 10% off whitening, prosthetics, all dermatology and cosmetics, obstetrics and women's cosmetic services; 5% off the cosmetics pharmacy | | none | 20 | NEW |

#### Education (العروض التعليمية), deck pages 22 to 27 (Bamzino is in "Other offers" in the deck; MESH lists it here)

| Business (English) | Arabic | Discount | Conditions | Expiry | Page | Status |
|---|---|---|---|---|---|---|
| Al-Fusha Private Schools | مدارس الفصحى الأهلية | Fees after the discount, in SAR: kindergarten 12,800 (was 14,500); girls' primary 16,500 general track (was 20,250), 16,850 Qur'an track (was 20,750); boys' grades 1 to 3 in the girls' school 16,850 (was 20,250); girls' intermediate 17,000 general (was 21,250), 17,500 Qur'an track (was 21,750); girls' secondary 18,250 (was 25,500) | Prices are for full payment | none | 26 | NEW |
| Al-Hayat Private Schools | مدارس الحياة الأهلية | 12% to 36% off | | none | 24 | CONFIRMS (MESH "From 12% off fees": add "to 36%") |
| Al-Mustaqbal Al-Wa'id School (Qur'an school, kindergarten and pre-school) | مدرسة المستقبل الواعد | 4,000 instead of 6,000 SAR per semester, curriculum and uniform included | Instalments possible | none | 25 | CONFIRMS |
| Al-Rayyan Private Schools for Boys and Girls | مدارس الريان الأهلية للبنين والبنات | 15% off | | none | 25 | NEW |
| Bamzino Nursery and Play Centre | بامزينو حضانة ومركز ترفيهي | 20% off monthly fees; pay 2 months and the third is free; pay 8 months and get 4 free | Not on promotional offers | none | 60 | CONFIRMS (add the 8 plus 4 offer and the exclusion) |
| Creative Child Private Schools | مدارس الطفل المبدع الأهلية | Pre-school (tamhidi) 10%, kindergarten 10%, nursery 15%, Mawhiba 10%, mental arithmetic 10%, accredited English programme 8% | | none | 24 | CONFIRMS |
| Gulf Institute | معهد الخليج | 30% off diplomas (English, cybersecurity, human resources), professional certificates (Microsoft Office Specialist, project management, ICDL, data analysis with Power BI, leadership), business courses and training courses (data entry, cybersecurity specialist, English at several levels) | | none | 27 | NEW |
| Kawn Model Schools | مدارس كون النموذجية | 15% off | | none | 25 | NEW |
| Manahil Al-Wafa Private Schools | مدارس مناهل الوفاء الأهلية | 10% off fees; 30% off school transport; 30% off enrichment books | | none | 23 | CONFIRMS |
| Wahat Al-Salam Kindergarten | روضة واحة السلام | 15% off fees | | none | 23 | CONFIRMS |

#### Car rental (عروض تأجير السيارات) and car services (خدمات وإكسسوارات السيارات), deck pages 28 to 35

| Business (English) | Arabic | Discount | Conditions | Expiry | Page | Status |
|---|---|---|---|---|---|---|
| 3M Protection and Insulation Films | مؤسسة ثري إم لأفلام الحماية والعزل الحراري | 50% off car heat-insulation film | | none | 33 | CONFIRMS |
| Al-Afdal Car Rental | الأفضل لتأجير السيارات | 25% off all available cars | | none | 29 | CONFIRMS |
| Al-Muftah (Key) Car Rental | المفتاح لتأجير السيارات | No percentage given ("نسبة الخصم المقدمة" with no figure) | Staff must follow the company's terms and conditions | none | 30 | NEW (no terms to publish) |
| Al-Zimam Car Rental | شركة الزمام لتأجير السيارات | 30% off | Not on luxury cars | none | 31 | NEW |
| Budget Saudi | بدجت السعودية | 5% off all available cars | | none | 29 | CONFIRMS |
| Ceramic Shield (nano-ceramic film) | شركة سيراميك شيلد لأفلام النانو سيراميك | 45% off car heat insulation | | none | 33 | NEW |
| Golden Tyre | شركة جولدن تاير للإطارات | Free fitting and laser balancing when you buy new tyres; free oil-level check; 50% off computerised wheel alignment; 20% off basic mechanical work; 10% off original engine and gearbox oils | Tabby payment for the online store (gt4ksa.com) | none | 34 | NEW |
| Hyundai (Mohammed Yousuf Naghi) | شركة محمد يوسف ناغي للسيارات هيونداي | Up to 3% off retail cars; 30% off routine servicing; 35% off genuine parts; 30% off accessories, window tinting and ceramic polish; extra 10% off 1 to 5 year service packages; 20% off tyres and batteries; wheel alignment and balancing 199 SAR; AC gas and service 299 SAR | | none | 31 | CONFIRMS (MESH has only servicing and parts: add the rest) |
| Johnson Clear Mask | وكالة جونسون القناع الشفاف | 50% off heat insulation, front protection film and nano-ceramic | | none | 35 | CONFIRMS |
| Lumi Car Rental | شركة لومي لتأجير السيارات | Discount with the code MOEDU | | none | 30 | CONFIRMS |
| Professional Car Centre | مركز السيارة المحترفة لصيانة السيارات | 45% off labour ("part repair from 700 to 1,000 SAR"); 20% off a full respray ("from 5,000 to 8,000 SAR"); free computer diagnosis and mechanical check | | none | 35 | NEW |
| Safia Bubble Car Wash | مؤسسة فقاعة صافية لغسيل السيارات | Large car 25 SAR, small car 15 SAR | | none | 35 | CONFIRMS |
| Vehicle Pro Maintenance | مؤسسة محترف المركبات لصيانة السيارات | 20% off all services | | none | 34 | CONFIRMS |

#### Restaurants and drinks (مطاعم ومشروبات), deck pages 36 to 41

| Business (English) | Arabic | Discount | Conditions | Expiry | Page | Status |
|---|---|---|---|---|---|---|
| Al-Maknan Dates | المكنان للتمور | 20% off | For staff | none | 37 | CONFIRMS |
| Al-Warda Bukhari Restaurant | مطعم الوردة البخاري | 10% off all items | | none | 38 | CONFIRMS |
| Ana Cafe | أنا كافيه | 15% off all items | | none | 38 | CONFIRMS |
| Applebee's | مطاعم أبل بيز | 15% off | Staff and students (students named) | none | 40 | CONFIRMS |
| Aqati Restaurant | مطعم أقاتي | 10% off | For staff | none | 38 | NEW |
| Bahjat Marrakesh | بهجة مراكش | 15% off | For staff | none | 37 | CONFIRMS |
| Bin Omar Cafeteria | بن عمر كافتيريا | 10% off | Discount code USL34 | none | 37 | NEW |
| Bino Restaurant | مطعم بينو | 15% off | Staff and students (students named). Not on offers. Sultanah branch only | none | 41 | NEW |
| Nashbird Restaurant | مطعم ناشبيرد | 10% off all orders | Not combined with other offers or discounts | none | 40 | NEW |
| Qasr Al-Rayhan Restaurant | مطعم قصر الريحان | 15% off | For staff | none | 39 | CONFIRMS |
| The Palm Cafe | مقهى ذا بالم لتقديم المشروبات | 20% off | | none | 39 | CONFIRMS |
| Tiam Cafe | كافيه تيام | 10% off all coffee drinks | | none | 40 | CONFIRMS |
| Zaitoon wa Teen Restaurants | مطاعم زيتون وتين | 15% off | | none | 39 | CONFIRMS |

#### Hotels and resorts (فنادق ومنتجعات), deck pages 42 to 47

| Business (English) | Arabic | Discount | Conditions | Expiry | Page | Status |
|---|---|---|---|---|---|---|
| Al-Dar Al-Baidaa Grand Hotel (Casablanca Grand) | فندق الدار البيضاء جراند | "Click here" link only | Terms are in a file on the University's SharePoint | none | 43 | NEW (no terms to publish) |
| Crowne Plaza Hotel | فندق كراون بلازا | "Click here" link only | As above | none | 43 | NEW (no terms to publish) |
| Dolphin Beach Resort | منتجع شاطئ الدولفين | 20% off; 25% off the restaurant and coffee shop; 30% off the private family pool; 50% off the games hall | | none | 44 | NEW |
| Durrat Al-Arus Resort | منتجع درة العروس | 20% off a chalet at Blue Beach (الشاطئ الأزرق) | Contact person named on the slide (private, not copied) | none | 46 | CONFIRMS (add "Blue Beach") |
| Hafawa Hotel and Hafawa Resort | فندق حفاوه / منتجع حفاوه | Hotel: king room 223 SAR, king suite 295 SAR, two-bedroom suite 511 SAR. Resort: king room 223 SAR, king suite 295 SAR, villa 952 SAR | "Per night" is not stated | none | 45 | CONFIRMS (add the two-bedroom suite and the resort villa) |
| Just House Yanbu Al-Bahr | فندق جست هاوس ينبع البحر | Room and sitting room, single bed 290 SAR; room and sitting room, double bed 290 SAR; two rooms and sitting room 350 SAR (prices after the discount) | | none | 46 | NEW |
| Le Meridien Madinah | فندق المدينة مريديان | "Click here" link only | As above | none | 43 | NEW (no terms to publish) |
| Marriott Hotel Apartments | ماريوت للشقق الفندقية | Studio 650 SAR a day, room and sitting room 850 SAR a day (after the discount) | | none | 44 | NEW |
| Millennium Hotel Madinah Airport | فندق ميلينيوم | "Click here" link only | As above | none | 45 | NEW (no terms to publish) |
| Omariya Hotel | فندق عمرية | 15% off | Except in Ramadan | Seasonal: not in Ramadan | 47 | CONFIRMS |
| Park Inn by Radisson Al-Naseem, Makkah | فندق بارك ان راديسون النسيم، مكة المكرمة | "Click here" link only | As above | none | 43 | NEW (no terms to publish) |
| Radwa Al-Ramada Resort | منتجع رضوى الرمادة | 25% off | | none | 44 | CONFIRMS |
| Sidra International Hotel | فندق سدرة العالمي | 15% off daily rates; 10% in Ramadan, Dhul Qa'dah and Dhul Hijjah | | Seasonal rate change | 46 | CONFLICTS: MESH says "15% off outside Ramadan and the Hajj months" |
| Sumou Real Estate | سمو العقارية | 1% off residential units | Contact person named on the slide (private, not copied) | none | 47 | NEW (a property sale: leave out) |
| Yonobi Hotel Resorts | منتجعات يونوبي الفندقية | 15% off | | none | 44 | NEW |

#### Sport (العروض الرياضية), deck pages 48 to 51

| Business (English) | Arabic | Discount | Conditions | Expiry | Page | Status |
|---|---|---|---|---|---|---|
| Al-Aqeeq Kids Club | نادي العقيق للأطفال | 20% off | | none | 49 | CONFIRMS |
| Alpha Sports Club | نادي الفا الرياضي | 15% off | | none | 51 | CONFIRMS |
| Eagle Sports Club (women) | نادي إيجل الرياضي (نسائي) | 35% off | Not during promotion periods | none | 49 | CONFIRMS |
| Islamic University Sports Club | نادي الجامعة الإسلامية | 50% off for students; 30% off for University employees | Students named | none | 49 | CONFIRMS (add the staff 30%; see 2.2 on how the 50% really works) |
| Padel Go Sports Club | نادي بادل جو الرياضي | 10% off | | none | 50 | CONFIRMS |
| ToBE Club | نادي ToBE | 25% off | For all staff in the sector and their first-degree dependants | none | 50 | CONFIRMS |

#### Men's care and tailoring (العناية بالرجل), deck pages 52 to 55

| Business (English) | Arabic | Discount | Conditions | Expiry | Page | Status |
|---|---|---|---|---|---|---|
| Al-Dairman Men's Tailoring | الديرمان للخياطة الرجالية | 20% off tailoring; 10% off tailoring with your own fabric; 10% off ready-made thobes; ready-made Japanese-fabric thobe 144 SAR for students; 10% off uniforms (lab coat, medical uniform); 40% off styles and embroidery | Free alterations and repairs for your own fabric; free for the shop's fabric within six months of tailoring; fabric not covered in case of misuse. Students named | none | 55 | CONFIRMS (MESH "20% off made-to-measure thobes": add the rest and mark students: true) |
| Al-Umaraa Men's Care Centre | شركة مركز الأمراء للعناية بالرجل | 20% off all services | | none | 53 | NEW |
| Azure Men's Care Salon and Spa | مركز أزور للعناية بالرجل صالون وسبا | 20% off all services | | none | 53 | NEW |
| Dar Al-Moda Men's Tailoring | دار الموضة للخياطة الرجالية | 33% off | | none | 54 | CONFIRMS |
| ID Men's Care Centre | مركز ID للعناية بالرجل | 20% off all services | | none | 54 | NEW |
| Le Royal Men's Tailoring | لي رويال للخياطة الرجالية | 20% off | Staff, their children and students (students named) | none | 55 | CONFIRMS |
| Thawb Sar | ثوب سار | 20% off | | none | 53 | NEW |

#### Other offers (العروض), deck pages 56 to 67

| Business (English) | Arabic | Discount | Conditions | Expiry | Page | Status |
|---|---|---|---|---|---|---|
| Aban Optics | أبان للنظارات | Free eye test; 40% off glasses | | none | 60 | NEW |
| Al-Amwaj Equestrian Stables | مربط الأمواج للفروسية | Up to 20% off riding training, beginners' riding, boarding, schooling, training, horse hire and group trips | Staff and students (students named). Contact person named on the slide (private, not copied) | none | 62 | NEW |
| Arab National Bank | البنك العربي الوطني | Personal finance rates by salary band (1.49% to 2.89%) for new customers or salary transfers | Two private contact names on the slide (not copied) | none | 59 | NEW (a loan product: leave out) |
| Aws Al-Thani Telecom | مؤسسة أوس الثاني للاتصالات | 20% off repairs; 30% off Huawei tablets | Contact person named on the slide (private, not copied) | none | 58 | NEW |
| Dhat Nakhl Museum | متحف ذات نخل | Listed as offer 22, but no slide gives terms | | none | 56 | NEW (no terms to publish) |
| Emirates NBD | بنك الإمارات دبي الوطني | Home and personal finance offers, "click here" link only | | none | 64 | NEW (a loan product: leave out) |
| Ghazi Shaker Trading (Al-Hussein and Al-Hassan Brothers) | شركة الإخوان حسين والحسن غازي شاكر للتجارة | Air conditioners: window 10%, split 15%, cassette 40%, concealed 40% | | none | 65 | NEW |
| Khuzaimah Travel and Tourism | شركة خزيمة للسفر والسياحة | 15% off | For staff | none | 66 | CONFIRMS |
| Muhandis Recruitment Services Office | مكتب مهندس لخدمات الاستقدام | 10% off | | none | 59 | NEW |
| Optimal X (nutrition and wellness) | Optimal X | 10% to 45% off selected products and services; InBody test, advice and a free consultation for staff | | none | 67 | NEW |
| Oxygen Telecom | مؤسسة أكسجين للاتصالات | Up to 50% off Zain, Mobily, Red Bull Mobile and Virgin SIMs | | none | 58 | CONFIRMS |
| Qatar Airways | الخطوط الجوية القطرية | Offers programme for staff and students, "click here" link | Students named | none | 66 | CONFIRMS |
| Aqtan Al-Madinah Laundry | مغاسل أقطان المدينة | Up to 20% off with pickup and delivery | For students (students named) | none | 61 | CONFIRMS |
| Talad Real Estate | شركة تلاد العقارية | 50,000 SAR off a limited number of homes, plus SNB (Al-Ahli Bank) finance at 2.99% | For staff | none | 63 (repeated on 64) | NEW (a property sale and loan: leave out) |
| Tasali Al-Khair | تسالي الخير | Up to 15% off with pickup and delivery | For students (students named) | none | 61 | NEW |
| Telescope Optics | تلسكوب للبصريات | 40% off and a free eye test | | none | 57 | CONFIRMS |
| Top Trip Travel and Tourism | توب تريب للسياحة والسفر | Mostly service fees: plus 20 SAR on domestic flight tickets, 50 SAR issue fee on economy tickets, plus 5% on international flights and trains. Discounts: 10% off hotels and furnished apartments, domestic trips (safari, camping, sea trips) and tourist and study visa service fees; 5% off cruises and study-abroad and admission services; international driving licence for one year 80 SAR | | none | 62 | NEW (mostly fees: leave out) |
| Turkish Airlines | الخطوط التركية | Discounts on its flights for staff and students | Students named | none | 63 | CONFIRMS |
| Vindra Silver Jewellery | مجوهرات فايندرا للفضة | 30% off | | none | 65 | CONFIRMS |
| York Air Conditioners | شركة يورك للمكيفات | Discount with the code iupr on york.com.sa | | none | 58 | CONFIRMS |
| Zain Telecom | شركة زين للاتصالات | Discount for staff, "click here" link only | | none | 66 | NEW (no terms to publish) |
| Ziyar Optics | مركز زيار للنظارات الطبية | 50% off all prescription glasses, lenses and sunglasses | | none | 57 | CONFIRMS |

#### Offers in discounts.ts that the deck does not have

**None.** All 61 offers in `discounts.ts` appear in the October 2026 deck. MESH's single entry "Qatar Airways and Turkish Airlines" matches two deck entries. Nothing needs to be removed as gone.

#### Other discount facts

**The deck has no end dates. The only time limits are seasonal (Sidra International Hotel, Omariya Hotel).**
Pages 3 to 67. Status: CONFIRMS discounts.ts (no expiry shown on any offer).

**The deck counts 118 offers. The header comment in discounts.ts says "111 offers".**
Page 2. Status: CONFLICTS discounts.ts (code comment only): MESH says "the University's partner-offers programme, 111 offers".

**Most offers are written for University staff (منسوبي الجامعة). Some name students as well.**
Pages 1, 15 to 67. Status: CONFIRMS /discounts: MESH says "Many offers are written for University staff (منسوبي الجامعة); those marked "Students named" mention students too."

**The University's public relations contact for the programme is extension 50021, and an email address cut off on the slide as "Pr@iu".**
Page 67. Status: NEW (internal; see section 5).

### 2.2 The University Sports Club (`campus-life-islamic-university`, `sports-and-activities`, `everyday-apps-and-services`)

**The Islamic University Sports Club (النادي الرياضي, branded "IU SPORT") is a full health and sports club for the University community and for Madinah as a whole, for all ages.**
Leaflet page 2. Status: NEW.

**Its goals include giving students, faculty members and their children, and the wider Madinah community use of the sports facilities, supporting the University's teams, and offering sports jobs to talented students that do not clash with their studies.**
Leaflet page 2. Status: NEW.

**There is only one branch, inside the Islamic University, behind the science colleges (خلف الكليات العلمية).**
Leaflet page 3. Status: NEW.

**Indoor multi-court sports hall for basketball, handball and volleyball, with spectator stands.**
Leaflet page 4. Status: NEW.

**Outdoor Olympic-size swimming pool (مسبح مكشوف أولمبي المواصفات), marked "under maintenance".**
Leaflet page 4. Status: NEW.

**Covered, air-conditioned Olympic pool (مسبح أولمبي مغطى ومكيف).**
Leaflet page 5. Status: CONFIRMS sports-and-activities: MESH says "the University gym facilities, including the CrossFit area and the pool and sauna" (the leaflet does not mention a sauna).

**Squash court (صالة اسكواش).**
Leaflet page 5. Status: NEW.

**CrossFit training hall (صالة تمارين الكروس فيت).**
Leaflet page 6. Status: CONFIRMS sports-and-activities: MESH says "including the CrossFit area".

**Cardio hall for exercise bikes and "skate" (ملعب تمارين الدراجات الهوائية والاسكيت). The photo shows rows of cross-trainers.**
Leaflet page 6. Status: NEW.

**Outdoor courts for football, volleyball, tennis and five-a-side football (ملاعب خارجية متكاملة).**
Leaflet page 7. Status: NEW.

**Bodybuilding and weights hall (صالة كمال الأجسام).**
Leaflet page 7. Status: NEW.

**IU Coffee (قهوة IU) serves hot and cold drinks and healthy meals. IU Store (متجر الجامعة الإسلامية) is a sports shop.**
Leaflet page 8. Status: NEW.

**Packages and prices, VAT included (الأسعار شاملة ضريبة القيمة المضافة):**

| Package | University students (طلاب الجامعة) | University staff (منسوبي الجامعة) | From outside the University (خارج الجامعة) |
|---|---|---|---|
| Day | 30 SAR | 30 SAR | 30 SAR |
| 1 month | 125 SAR | 175 SAR | 250 SAR |
| 3 months | 345 SAR | 450 SAR | 600 SAR |
| 6 months | 600 SAR | 800 SAR | 1,000 SAR |
| 12 months | 1,000 SAR | 1,200 SAR | 1,700 SAR |

Leaflet page 9. Status: NEW. campus-life-islamic-university only says "Students pay reduced rates ... well below the public price ... Prices change with seasonal offers, so ask at the club"; the leaflet says nothing about seasonal offers.

**Who may join: University students, University staff, and people from outside the University (the public), each at their own price.**
Leaflet page 9. Status: CONFIRMS campus-life-islamic-university: MESH says "well below the public price". The leaflet does not say whether women or families may use the club, and gives no women's hours.

**Pausing a membership (إيقاف الاشتراك): 3 months, once, for up to 15 days; 6 months, once, for up to 30 days; 12 months, twice, for up to 60 days in total.**
Leaflet page 9. Status: CONFIRMS campus-life-islamic-university: MESH says "longer memberships can be frozen for a while" (now with exact limits).

**Opening hours: Saturday to Thursday 1:00 pm to 11:00 pm; Friday 4:00 pm to 11:00 pm.**
Leaflet page 10. Status: NEW.

**The student discount equals 50% only on the one-month package (125 against 250 SAR). On 3, 6 and 12 months students pay 42.5%, 40% and about 41% less than the public price. Staff pay 30% less for one month and 20% to 29% less for longer packages.**
Leaflet page 9 against deck page 49. Status: CONFLICTS discounts.ts: MESH says "50% off for students".

**Not in the leaflet: how to sign up, which documents to bring, rules of use (dress, age limits, guests), women's or family access, and the date of the leaflet.**
Leaflet pages 1 to 10. Status: see section 5.

## 3. Conflicts with MESH

1. **Advanced Hijama Medical Centre** (discounts.ts, health). MESH says "20% off all services". The deck slide (page 12) shows 25% under the centre's own logo, then repeats the name with 20% beside the Dr. Hamid Al-Ahmadi Hospital logo. **Change:** publish "25% off all services", or ask the owner (section 5) before changing.
2. **Alpha Labs** (discounts.ts, health). MESH says "50% off individual tests, for staff, students and families" with `students: true`. The deck says staff and all family members, at all branches in the Kingdom, and does not name students. **Change:** deal to "50% off individual tests at all its branches in the Kingdom, for staff and their families", and remove `students: true`.
3. **Sidra International Hotel** (discounts.ts, travel). MESH says "15% off outside Ramadan and the Hajj months". The deck gives 15% on daily rates and 10% in Ramadan, Dhul Qa'dah and Dhul Hijjah. Note that "the Hajj months" also covers Shawwal, which the deck does not limit. **Change:** "15% off daily rates; 10% in Ramadan, Dhul Qa'dah and Dhul Hijjah".
4. **Islamic University Sports Club** (discounts.ts, sport). MESH says "50% off for students". That is exact only for the one-month package, and staff get 30%. **Change:** give the real student and staff prices (section 4.1) and put the full price table in campus-life-islamic-university (section 4.2).
5. **discounts.ts header comment** says "111 offers". The October 2026 deck counts 118. **Change:** update the comment (section 4.1).

## 4. Ready-to-publish sections

### 4.1 `src/content/discounts.ts`: the updated discounts table (ready to apply)

This replaces the whole file. It keeps the existing types and group ids, so the /discounts and /ar/discounts pages work unchanged, and the page count updates itself (102 offers). Offers are alphabetical by English name within each group. It adds every NEW offer with publishable terms and fixes the three conflicts. It leaves out the offers that have no terms (link-only hotels, Zain, Al-Muftah, Basma Taibah QR, Dhat Nakhl Museum), loans and property sales (Arab National Bank, Emirates NBD, Talad, Sumou), and Top Trip, whose terms are mostly fees. Phone numbers and contact people are left out. No offer in the deck has an end date. The two seasonal limits are stated in the deal text.

```ts
/**
 * Discounts that private companies offer to Islamic University staff and students
 * (the University's partner-offers programme: 118 offers in the October 2026 list; offers
 * with no stated terms, loans and property sales are left out). No offer has an end date;
 * seasonal limits are in the deal text. Show your University card and ask before paying:
 * some offers are for staff only, and companies change terms.
 */
export type Offer = { name: string; nameEn?: string; deal: string; students?: boolean };
export type OfferGroup = { id: string; label: string; labelAr: string; offers: Offer[] };

export const DISCOUNTS: OfferGroup[] = [
  {
    id: "health",
    label: "Hospitals, clinics and labs",
    labelAr: "العروض الصحية",
    offers: [
      { name: "مركز الحجامة المتقدمة الطبي", nameEn: "Advanced Hijama Medical Centre", deal: "25% off all services" },
      { name: "شركة الأمجاد المتحدة الطبية", nameEn: "Al-Amjad United Medical", deal: "50% off medical services" },
      { name: "مجمع العقيق الطبي (لاسوا)", nameEn: "Al-Aqeeq Medical Complex (Laswa)", deal: "Up to 20% off medical services" },
      { name: "مختبرات الدليل الصحيح", nameEn: "Al-Daleel Al-Saheeh Labs", deal: "50% off routine individual tests, 10% more off discounted packages, and a 15-test IU students package for 90 SAR. Show your work or student card", students: true },
      { name: "مجمع المدينة الطبي", nameEn: "Al-Madinah Medical Complex", deal: "20% off consultations (not visiting doctors), physiotherapy, lab tests and dental work (not prosthetics); 50% off listed X-ray services; 15% off dermatology and cosmetics; 10% off nutrition clinics. Not on marketing offers. A reception desk serves University staff and students", students: true },
      { name: "مركز المدينة التخصصي للإرشاد النفسي والأسري", nameEn: "Al-Madinah Specialist Counselling Centre", deal: "30% off psychological, family, social and children's counselling, and 30% off specialist sessions (psychological disorders, burnout, speech and language, behaviour, autism, psychological tests). Close family included" },
      { name: "مستشفى المواساة", nameEn: "Al-Mouwasat Hospital", deal: "20% off all health services" },
      { name: "مجموعة مراكز المداواة للحجامة", nameEn: "Al-Mudawah Hijama Centres", deal: "Free consultation; 36% off dry or wet cupping (6 cups); 33% off sliding cupping and acupuncture" },
      { name: "مختبرات الشامل", nameEn: "Al-Shamel Labs", deal: "50% off all in-house individual tests" },
      { name: "مجمع الشيناوي لطب الأسنان", nameEn: "Al-Shinawi Dental", deal: "50% off check-ups, panoramic X-ray and surface cleaning; 25% off scaling, prosthetics, children's dentistry, braces, root canals, fillings and cosmetic work" },
      { name: "مجمع الطب المتميز الطبي", nameEn: "Al-Tib Al-Mutamayiz Medical Complex", deal: "20% off services, 30% off dental implants and prosthetics" },
      { name: "مختبرات ألفا", nameEn: "Alpha Labs", deal: "50% off individual tests at all its branches in the Kingdom, for staff and their families" },
      { name: "مجمع عيادات عامر الطبي", nameEn: "Amer Medical Clinics", deal: "50% off all services" },
      { name: "مختبرات أنيس الخير", nameEn: "Anees Al-Khair Labs", deal: "Up to 40% off" },
      { name: "مستشفى د. حامد سليمان الأحمدي", nameEn: "Dr. Hamid Al-Ahmadi Hospital", deal: "Up to 40% off medical services" },
      { name: "مجمع الدكتور محمد الحميدي لطب وتقويم الأسنان", nameEn: "Dr. Mohammed Al-Humaidi Dental", deal: "40% off root canals, fillings, prosthetics, Hollywood smile, whitening, braces, children's dentistry, gum treatment and implants" },
      { name: "مجمع حكيم طيبة الطبي", nameEn: "Hakeem Taibah Medical Complex", deal: "35% off every department" },
      { name: "مجمع حياة الجمال الطبي", nameEn: "Hayat Al-Jamal Medical Complex", deal: "Consultation 30 SAR in every clinic; 30% off X-rays and lab tests (some tests excluded) and pregnancy follow-up without delivery; 25% off dental and braces; 10% off dermatology and cosmetics; 5% off the pharmacy" },
      { name: "المجمع الدولي الطبي العام", nameEn: "International Medical Complex", deal: "50% off consultations, 30% off other services" },
      { name: "مجمع مد كير الطبي للأسنان", nameEn: "Med Care Dental Complex", deal: "20% off, not on the consultation fee or consultants' services" },
      { name: "شركة مداواة ورعاية طبية", nameEn: "Mudawah wa Ri'ayah Medical", deal: "20% off consultations, tests and X-rays; 40% off CT scans; 50% off MRI" },
      { name: "مجمع روح الشفاء الطبية", nameEn: "Rouh Al-Shifa Medical", deal: "50% off consultations, 30% off services, for staff and families. Not on offers, packages or the pharmacy" },
      { name: "مجمع صفوة المهيدب", nameEn: "Safwat Al-Muhaidib Complex", deal: "20% to 50% off all services" },
      { name: "المستشفى السعودي الألماني", nameEn: "Saudi German Hospital", deal: "10% off consultations booked online, 15% off labs, X-rays, admission and surgery" },
      { name: "عيادات طابة دنت", nameEn: "Taba Dent", deal: "50% off X-rays and check-ups, 40% off treatment, 30% off prosthetics" },
      { name: "العيادة الذهبية", nameEn: "The Golden Clinic", deal: "20% to 50% off more than 18 services" },
      { name: "مستشفى المدينة المتحدة", nameEn: "United Madinah Hospital", deal: "40% off outpatient visits, 30% off labs and X-rays, 30% off surgery and admission" },
      { name: "عيادات واد الطبية", nameEn: "Wad Clinics", deal: "20% off consultations, procedures and surgery, for staff and close family" },
      { name: "مجمع وفاء طلبه", nameEn: "Wafaa Talbah Complex", deal: "Free consultation for fat reduction, laser and facials; 50% off dermatology, dental and obstetrics consultations; 20% off laser hair removal, facials, slimming (not courses), dental work (not whitening or prosthetics) and braces; 10% off whitening, prosthetics, dermatology, cosmetics and women's health; 5% off cosmetics in the pharmacy" },
    ],
  },
  {
    id: "schools",
    label: "Schools, nurseries and courses",
    labelAr: "العروض التعليمية",
    offers: [
      { name: "مدارس الفصحى الأهلية", nameEn: "Al-Fusha Schools", deal: "Fees after the discount, paid in full: kindergarten 12,800 SAR; girls' primary 16,500 (Qur'an track 16,850); boys' grades 1 to 3 16,850; girls' intermediate 17,000 (Qur'an track 17,500); girls' secondary 18,250" },
      { name: "مدارس الحياة الأهلية", nameEn: "Al-Hayat Schools", deal: "12% to 36% off" },
      { name: "مدارس الريان الأهلية للبنين والبنات", nameEn: "Al-Rayyan Schools", deal: "15% off" },
      { name: "بامزينو حضانة ومركز ترفيهي", nameEn: "Bamzino Nursery", deal: "20% off monthly fees; pay 2 months and get the third free, or pay 8 and get 4 free. Not on promotional offers" },
      { name: "مدارس الطفل المبدع", nameEn: "Creative Child Schools", deal: "15% off nursery; 10% off pre-school, kindergarten, Mawhiba and mental arithmetic; 8% off the English programme" },
      { name: "معهد الخليج", nameEn: "Gulf Institute", deal: "30% off diplomas (English, cybersecurity, human resources), professional certificates, business courses and training courses" },
      { name: "مدارس كون النموذجية", nameEn: "Kawn Model Schools", deal: "15% off" },
      { name: "مدارس مناهل الوفاء الأهلية", nameEn: "Manahil Al-Wafa Schools", deal: "10% off fees, 30% off school transport and enrichment books" },
      { name: "مدرسة المستقبل الواعد", nameEn: "Promising Future School (Qur'an)", deal: "4,000 instead of 6,000 SAR a semester, books and uniform included, instalments possible" },
      { name: "روضة واحة السلام", nameEn: "Wahat Al-Salam Kindergarten", deal: "15% off fees" },
    ],
  },
  {
    id: "cars",
    label: "Car rental and car care",
    labelAr: "السيارات",
    offers: [
      { name: "ثري إم للعزل الحراري", nameEn: "3M window film", deal: "50% off heat-insulation film" },
      { name: "الأفضل لتأجير السيارات", nameEn: "Al-Afdal Car Rental", deal: "25% off every car" },
      { name: "شركة الزمام لتأجير السيارات", nameEn: "Al-Zimam Car Rental", deal: "30% off, not on luxury cars" },
      { name: "بدجت السعودية", nameEn: "Budget Saudi", deal: "5% off every car" },
      { name: "سيراميك شيلد", nameEn: "Ceramic Shield", deal: "45% off heat-insulation film" },
      { name: "جولدن تاير للإطارات", nameEn: "Golden Tyre", deal: "Free fitting and balancing with new tyres and a free oil check; 50% off wheel alignment, 20% off basic mechanical work, 10% off original oils" },
      { name: "محمد يوسف ناغي (هيونداي)", nameEn: "Hyundai (Naghi)", deal: "30% off servicing, accessories, tinting and ceramic polish; 35% off parts; 20% off tyres and batteries; 10% more off 1 to 5 year service packages; alignment and balancing 199 SAR, AC gas and service 299 SAR; up to 3% off new cars" },
      { name: "جونسون القناع الشفاف", nameEn: "Johnson film", deal: "50% off insulation, front protection film and nano-ceramic" },
      { name: "شركة لومي", nameEn: "Lumi Car Rental", deal: "Discount with the code MOEDU" },
      { name: "مركز السيارة المحترفة", nameEn: "Professional Car Centre", deal: "45% off labour, 20% off a full respray, free computer diagnosis and mechanical check" },
      { name: "فقاعة صافية لغسيل السيارات", nameEn: "Safia car wash", deal: "15 SAR small car, 25 SAR large car" },
      { name: "محترف المركبات", nameEn: "Vehicle Pro maintenance", deal: "20% off all servicing" },
    ],
  },
  {
    id: "food",
    label: "Restaurants and cafes",
    labelAr: "المطاعم والمقاهي",
    offers: [
      { name: "المكنان للتمور", nameEn: "Al-Maknan Dates", deal: "20% off" },
      { name: "مطعم الوردة البخاري", nameEn: "Al-Warda Bukhari", deal: "10% off everything" },
      { name: "أنا كافيه", nameEn: "Ana Cafe", deal: "15% off everything" },
      { name: "أبل بيز", nameEn: "Applebee's", deal: "15% off for staff and students", students: true },
      { name: "مطعم أقاتي", nameEn: "Aqati Restaurant", deal: "10% off" },
      { name: "بهجة مراكش", nameEn: "Bahjat Marrakesh", deal: "15% off" },
      { name: "بن عمر كافتيريا", nameEn: "Bin Omar Cafeteria", deal: "10% off with the code USL34" },
      { name: "مطعم بينو", nameEn: "Bino Restaurant", deal: "15% off for staff and students at the Sultanah branch, not on offers", students: true },
      { name: "مطعم ناشبيرد", nameEn: "Nashbird", deal: "10% off every order, not with other offers" },
      { name: "مطعم قصر الريحان", nameEn: "Qasr Al-Rayhan", deal: "15% off" },
      { name: "مقهى ذا بالم", nameEn: "The Palm Cafe", deal: "20% off" },
      { name: "كافيه تيام", nameEn: "Tiam Cafe", deal: "10% off coffee" },
      { name: "مطاعم زيتون وتين", nameEn: "Zaitoon wa Teen", deal: "15% off" },
    ],
  },
  {
    id: "sport",
    label: "Sport and fitness",
    labelAr: "الأندية الرياضية",
    offers: [
      { name: "مربط الأمواج للفروسية", nameEn: "Al-Amwaj Equestrian", deal: "Up to 20% off riding lessons, boarding, horse hire and group trips, for staff and students", students: true },
      { name: "نادي العقيق للأطفال", nameEn: "Al-Aqeeq Kids Club", deal: "20% off" },
      { name: "نادي ألفا الرياضي", nameEn: "Alpha Sports Club", deal: "15% off" },
      { name: "نادي إيجل الرياضي (نسائي)", nameEn: "Eagle Club (women)", deal: "35% off outside promotions" },
      { name: "نادي الجامعة الإسلامية", nameEn: "Islamic University Sports Club", deal: "One month 125 SAR for students and 175 SAR for staff, against 250 SAR for others; lower prices on 3, 6 and 12 months too (as of November 2026)", students: true },
      { name: "نادي بادل جو", nameEn: "Padel Go", deal: "10% off" },
      { name: "نادي ToBE", nameEn: "ToBE Club", deal: "25% off for staff and close family" },
    ],
  },
  {
    id: "everyday",
    label: "Tailors, grooming, glasses, laundry and more",
    labelAr: "خدمات متنوعة",
    offers: [
      { name: "أبان للنظارات", nameEn: "Aban Optics", deal: "Free eye test, 40% off glasses" },
      { name: "الديرمان للخياطة", nameEn: "Al-Dairman Tailoring", deal: "20% off made-to-measure thobes, 10% with your own fabric, 10% off ready-made thobes and medical uniforms, 40% off styles and embroidery; ready-made thobe in Japanese fabric 144 SAR for students", students: true },
      { name: "مركز الأمراء للعناية بالرجل", nameEn: "Al-Umaraa Men's Care", deal: "20% off all services" },
      { name: "مغاسل أقطان المدينة", nameEn: "Aqtan Laundry", deal: "Up to 20% off for students, with pickup and delivery", students: true },
      { name: "مؤسسة أوس الثاني للاتصالات", nameEn: "Aws Al-Thani Telecom", deal: "20% off repairs, 30% off Huawei tablets" },
      { name: "مركز أزور للعناية بالرجل", nameEn: "Azure Men's Salon and Spa", deal: "20% off all services" },
      { name: "دار الموضة للخياطة", nameEn: "Dar Al-Moda Tailoring", deal: "33% off" },
      { name: "غازي شاكر للتجارة", nameEn: "Ghazi Shaker air conditioners", deal: "10% off window units, 15% off split units, 40% off cassette and concealed units" },
      { name: "مركز ID للعناية بالرجل", nameEn: "ID Men's Care", deal: "20% off all services" },
      { name: "لي رويال للخياطة", nameEn: "Le Royal Tailoring", deal: "20% off for staff, their children and students", students: true },
      { name: "مكتب مهندس لخدمات الاستقدام", nameEn: "Muhandis Recruitment Office", deal: "10% off" },
      { name: "Optimal X", nameEn: "Optimal X", deal: "10% to 45% off selected nutrition and wellness products and services; InBody test and a free consultation" },
      { name: "مؤسسة أكسجين للاتصالات", nameEn: "Oxygen Telecom", deal: "Up to 50% off Zain, Mobily, Red Bull Mobile and Virgin SIMs" },
      { name: "تسالي الخير", nameEn: "Tasali Al-Khair", deal: "Up to 15% off for students, with pickup and delivery", students: true },
      { name: "تلسكوب للبصريات", nameEn: "Telescope Optics", deal: "40% off, free eye test" },
      { name: "ثوب سار", nameEn: "Thawb Sar", deal: "20% off" },
      { name: "مجوهرات فايندرا للفضة", nameEn: "Vindra Silver", deal: "30% off" },
      { name: "يورك للمكيفات", nameEn: "York air conditioners", deal: "Discount with the code iupr on york.com.sa" },
      { name: "مركز زيار للنظارات", nameEn: "Ziyar Optics", deal: "50% off glasses, lenses and sunglasses" },
    ],
  },
  {
    id: "travel",
    label: "Hotels and travel",
    labelAr: "الفنادق والسفر",
    offers: [
      { name: "منتجع شاطئ الدولفين", nameEn: "Dolphin Beach Resort", deal: "20% off; 25% off the restaurant and coffee shop, 30% off the private family pool, 50% off the games hall" },
      { name: "منتجع درة العروس", nameEn: "Durrat Al-Arus Resort", deal: "20% off chalets at Blue Beach" },
      { name: "فندق ومنتجع حفاوة", nameEn: "Hafawa Hotel and Resort", deal: "King room 223 SAR, king suite 295 SAR; two-bedroom suite 511 SAR at the hotel, villa 952 SAR at the resort" },
      { name: "فندق جست هاوس ينبع البحر", nameEn: "Just House Yanbu Al-Bahr", deal: "Room with sitting room 290 SAR, two rooms with sitting room 350 SAR" },
      { name: "خزيمة للسفر والسياحة", nameEn: "Khuzaimah Travel", deal: "15% off" },
      { name: "ماريوت للشقق الفندقية", nameEn: "Marriott Hotel Apartments", deal: "Studio 650 SAR a day, room with sitting room 850 SAR a day" },
      { name: "فندق عمرية", nameEn: "Omariya Hotel", deal: "15% off, except in Ramadan" },
      { name: "الخطوط الجوية القطرية", nameEn: "Qatar Airways", deal: "Special fares for IU staff and students", students: true },
      { name: "منتجع رضوى الرمادة", nameEn: "Radwa Al-Ramada Resort", deal: "25% off" },
      { name: "فندق سدرة العالمي", nameEn: "Sidra International Hotel", deal: "15% off daily rates; 10% in Ramadan, Dhul Qa'dah and Dhul Hijjah" },
      { name: "الخطوط التركية", nameEn: "Turkish Airlines", deal: "Discounts on its flights for IU staff and students", students: true },
      { name: "منتجعات يونوبي الفندقية", nameEn: "Yonobi Resorts", deal: "15% off" },
    ],
  },
];
```

FAQ `student-discounts` (answer HTML, replaces the current one so the count stays right):

```html
<p>Yes. The University's partner programme has more than 100 offers at clinics, labs, opticians, schools, car rentals, restaurants, hotels and gyms. Students also pay lower prices at the University Sports Club. See <a href="/discounts">Student discounts</a>.</p>
```

### 4.2 `campus-life-islamic-university`: replace the "Sport" section

```html
<h2>Sport</h2>
<p>The Islamic University Sports Club (النادي الرياضي) has one branch, on the main campus behind the science colleges. Students, University staff and people from outside the University can all join. Students pay the lowest price.</p>
<h3>Facilities</h3>
<ul>
<li>Indoor sports hall with courts for basketball, handball and volleyball</li>
<li>Covered, air-conditioned Olympic pool. The outdoor Olympic pool is closed for maintenance.</li>
<li>Squash court</li>
<li>Weights and bodybuilding hall</li>
<li>CrossFit hall</li>
<li>Cardio hall with exercise bikes and cross-trainers</li>
<li>Outdoor pitches for football, five-a-side, volleyball and tennis</li>
<li>IU Coffee, for hot and cold drinks and healthy meals</li>
<li>IU Store, a sports shop</li>
</ul>
<h3>Opening hours (as of November 2026)</h3>
<ul>
<li>Saturday to Thursday: 1 pm to 11 pm</li>
<li>Friday: 4 pm to 11 pm</li>
</ul>
<h3>Prices (as of November 2026)</h3>
<table><thead><tr><th>Membership</th><th>University students</th><th>University staff</th><th>Everyone else</th></tr></thead><tbody>
<tr><td>One day</td><td>30 SAR</td><td>30 SAR</td><td>30 SAR</td></tr>
<tr><td>1 month</td><td>125 SAR</td><td>175 SAR</td><td>250 SAR</td></tr>
<tr><td>3 months</td><td>345 SAR</td><td>450 SAR</td><td>600 SAR</td></tr>
<tr><td>6 months</td><td>600 SAR</td><td>800 SAR</td><td>1,000 SAR</td></tr>
<tr><td>12 months</td><td>1,000 SAR</td><td>1,200 SAR</td><td>1,700 SAR</td></tr>
</tbody></table>
<p>All prices include VAT.</p>
<h3>Pausing your membership</h3>
<ul>
<li>3 months: once, for up to 15 days</li>
<li>6 months: once, for up to 30 days</li>
<li>12 months: twice, for up to 60 days in total</li>
</ul>
<p>Classes held at the club, including jiu-jitsu and fitness for children and adults, are in <a href="/guides/sports-and-activities">Sport and fitness classes</a>. Discounts at other gyms and clubs in Madinah are on <a href="/discounts">Student discounts</a>.</p>
```

### 4.3 `sports-and-activities`: add after the first paragraph

```html
<h2>The University Sports Club</h2>
<p>The classes below take place at the Islamic University Sports Club, on the main campus behind the science colleges. The club has an indoor hall for basketball, handball and volleyball, a covered and air-conditioned Olympic pool, a squash court, weights, CrossFit and cardio halls, and outdoor pitches for football, volleyball and tennis. It is open Saturday to Thursday from 1 pm to 11 pm and on Friday from 4 pm to 11 pm (as of November 2026). Students, staff and the public can take out a membership, from a 30 SAR day pass to a year. The full price list is in <a href="/guides/campus-life-islamic-university">Student life at the Islamic University</a>.</p>
```

### 4.4 `everyday-apps-and-services`, "Gyms": replace the sentence about the University club

```html
<p>All gyms are men-only or women-only. Men's gyms cost 150 to 400 SAR a month, women's (Fitness Time Ladies and others) 250 to 500. Martial arts clubs are 150 to 300 SAR. At the Islamic University Sports Club a month costs 125 SAR for students and 250 SAR for the public (as of November 2026): see <a href="/guides/campus-life-islamic-university">Student life at the Islamic University</a>. Classes and trips are listed in <a href="/guides/sports-and-activities">Sport and fitness classes</a>.</p>
```

## 5. Questions for the owner

1. **Advanced Hijama Medical Centre: 25% or 20%?** Page 12 shows the centre twice, 25% under its own logo and 20% beside the Dr. Hamid Al-Ahmadi Hospital logo. Section 4.1 uses 25%. Change it back if you know otherwise.
2. **Women and families at the Sports Club.** The leaflet does not say whether women or families may use the club, or at what hours. MESH says all gyms in Madinah are men-only or women-only. Section 4 says nothing about women's access. Can you confirm who may use it, and whether there are women's or family hours?
3. **Joining the Sports Club.** The leaflet gives no sign-up steps, documents (University card, Visitor ID or iqama), age limits or rules of use. Students on a Visitor ID and iqama holders may be treated differently. Worth one question at the reception desk.
4. **Date of the Sports Club leaflet.** It is undated. The October 2026 deck's "students 50%, staff 30%" matches its one-month prices, so section 4 labels the prices "as of November 2026". Please confirm they are current. Also confirm whether the outdoor pool is still under maintenance and whether a sauna exists: the sports-and-activities page mentions a sauna, but the leaflet does not.
5. **The leaflet does not say whether students can use the club's pool and every hall on a normal membership.** sports-and-activities says programme adults "can also use ... the pool and sauna". Is the pool included in a normal membership?
6. **Offers with no terms in the deck:** Crowne Plaza, Park Inn by Radisson Al-Naseem (Makkah), Al-Dar Al-Baidaa Grand, Le Meridien Madinah, Millennium Madinah Airport, Zain, Qatar Airways and Emirates NBD link to files on the University's internal SharePoint, which need a University login. Al-Muftah Car Rental gives no percentage. Basma Taibah shows only a QR code. Dhat Nakhl Museum is listed with no slide. If you can open the links or scan the QR, these can be added.
7. **Loans and property** (Arab National Bank finance rates, Emirates NBD finance, Talad Real Estate 50,000 SAR off plus SNB finance at 2.99%, Sumou Real Estate 1%) and **Top Trip** (mostly booking fees) are left out of section 4. Keep them out?
8. **"Wad Clinic" and "Wad Medical Clinics"** (offers 20 and 32) and **"Alpha Medical Labs" and "Alpha Labs Complex"** (offers 18 and 23) look like duplicates in the deck. Each is shown as one entry. Confirm.
9. **Tasali Al-Khair:** its offer wording ("for students, with pickup and delivery, up to 15%") repeats the laundry's wording on the same slide, and the deck does not say what the business sells. Publish as is, or leave out?
10. **Al-Mustaqbal Al-Wa'id School:** the slide says the discount is "for the school year" but prices it "per semester" (4,000 instead of 6,000). MESH already says "a semester". Confirm.
11. **Hafawa** prices do not say "per night". Section 4.1 gives the prices with no unit.
12. **Programme contact:** the last offer slide gives extension 50021 and an email cut off as "Pr@iu" (probably the University's public relations address). Should it be added to `university-offices-and-contacts`, once the full address is known?
13. **Most offers are for "منسوبي الجامعة".** The /discounts page already tells readers to show their card and ask. Do you want a clearer line that students should ask first where students are not named?
