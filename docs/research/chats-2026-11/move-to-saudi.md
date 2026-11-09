# Move to Saudi Arabia group: findings for MESH

## 1. Summary

- Nature: a WhatsApp relocation group for mostly UK, European and North American Muslims moving to or visiting Saudi Arabia. It is run by people who sell relocation and consultancy services, and in recent months it has mostly carried adverts (Arabic institutes, rentals, UAE company setup, app launches).
- Date range: the group was created on 17 Apr 2025, but disappearing messages (90 days) were on, so every message before 1 Aug 2026 has expired. Lines 5 to 588 of the export are only join, number change and security notices. The surviving content runs from 1 Aug 2026 to 7 Nov 2026.
- Volume: of 1,302 lines, about 100 are real messages. Only about 61 contain text, and about 15 hold any durable fact. The other 470 or so "messages" the brief expected do not survive in the export.
- Reliability: low to medium. Most questions were answered with screenshots (omitted) or private messages, so few answers can be checked. The most solid exchange is a member correcting a viral Premium Residency post, and the correct figures match MESH.
- Net value for MESH: small. A handful of visa portal points, one scam pattern worth a warning, one transport addition, and two gaps (single parents and family law, homeschooling) that the community raised.

## 2. Findings grouped by MESH target

### visas-for-family-and-visitors (src/server/seed/content/guides-2026.ts)

1. **The tourist eVisa from visa.visitsaudi.com is issued quickly and renewed every year.** A member who applies every year said the eVisa arrives by email within about 10 minutes.
   - Posted: 28 Aug 2026. Source: member with direct experience. Confidence: medium.
   - CONFIRMS. MESH says the eVisa is "valid for one year with multiple entries" and to "apply only there", on visa.visitsaudi.com. Adding a line that approval is often within minutes would reassure readers.

2. **UK citizens also apply through the unified visa platform ksavisa.sa.** A British member said he and his wife hold what the site calls an "Electronic Travel Authorization", applied for at ksavisa.sa (path /visa/electronic-travel-authorization/apply). It worked for both adults, but his daughter's application kept failing with "error, try again later". He also asked how much a visa on arrival costs. Nobody answered in text.
   - Posted: 27 Aug 2026. Source: member with direct experience (single member). Confidence: low to medium on the exact product name and who it covers.
   - NEW. MESH names visa.mofa.gov.sa and visa.visitsaudi.com but never ksavisa.sa, and does not mention an ETA product. Before MESH adds anything, confirm whether ksavisa.sa is now the official front door for visas (visa.mofa.gov.sa appears to point there) and whether an ETA exists for UK or other passports, as distinct from the tourist eVisa. If it is official, MESH's line "apply only there" (visa.visitsaudi.com) needs wording that does not imply ksavisa.sa is an agent.

3. **ksavisa.sa payment errors.** A member applying for an eVisa got an error page at the payment step: his banking app showed the payment as approved but no money left his account. He asked whether others had the same problem; no text answer.
   - Posted: 2 Sep 2026. Source: single member claim. Confidence: low.
   - NEW (tip): if the visa site errors at payment, check the bank statement before trying again, so you do not pay twice, and try a different card or the other official portal. Low priority.

4. **A non-EU spouse who lives in a Schengen country.** A Dutch citizen asked whether his wife, an Indian citizen living in the Netherlands on a Dutch residence permit, can get the eVisa or a visa on arrival. He also asked whether an Umrah visa differs from a tourist visa when you want to visit several cities and perform Umrah. The answer was given only as screenshots.
   - Posted: 27 Aug 2026. Source: question with no text answer. Confidence: n/a.
   - NEW gap. MESH lists eligible nationalities but says nothing about the rule that people holding a US, UK or Schengen visa or residence permit can qualify for the eVisa whatever their nationality. MESH also does not compare the Umrah visa with the tourist eVisa. It says only that the tourist eVisa "covers Umrah with a Nusuk permit, but not Hajj". Both points come up often in mixed-nationality families and should be confirmed on visa.visitsaudi.com and ksavisa.sa before adding (see Open questions).

5. **Premium Residency: correct figures, and a false "USD 100,000" claim.** A member reposted an article saying Saudi Arabia launched a new USD 100,000 "donation" route to permanent residency in early 2026, with processing of 3 to 6 months. Another member corrected it:
   - The 100,000 figure is SAR (about USD 26,700), not USD. It is the yearly fee for the renewable limited-duration residency, offered since the programme began in 2019, not a permanent route.
   - Permanent (unlimited-duration) residency is a one-time SAR 800,000 (about USD 213,300).
   - The real-estate route needs property worth about SAR 4,000,000. The investor route needs about SAR 7,000,000 plus a requirement to create 10 jobs.
   - Talent and entrepreneur routes were added in 2024.
   - Real benefits: no employer sponsor, owning property and a business without a Saudi partner, sponsoring family, and leaving and returning freely.
   - Posted: 5 Sep 2026. Source: one member correcting another. The correction came from an AI chatbot, not the official site. Confidence: high for the 100,000 yearly and 800,000 permanent figures (they match MESH), medium for the property and investor thresholds.
   - CONFIRMS. MESH (guides-2026.ts) says: "Premium Residency is another: about 100,000 SAR a year, or 800,000 SAR once for permanent residency. Five other Premium Residency products, for skilled professionals, gifted people, investors, entrepreneurs and property owners, each have their own conditions." NEW detail MESH could add: the property owner product needs property of about SAR 4 million and the investor product about SAR 7 million plus job creation (confirm on the Premium Residency Center site first). Also worth a one-line warning that viral posts mix up SAR and USD for this programme.

### getting-around and haramain-train-and-city-buses (guides-2026.ts)

6. **International coach from Doha to Riyadh.** A member asked how to travel from Doha to Riyadh by bus. Another replied that SAPTCO, the national public bus company, runs direct daily international coaches. Fares start at about SAR 120, and tickets are sold on its website and app or at the departure station.
   - Posted: 23 Aug 2026. Source: single member claim with a screenshot (omitted). Confidence: medium.
   - NEW. MESH covers the intercity coach to Makkah ("6 to 7 h", "about 85 to 100" SAR) but does not say how to book coaches or mention cross-border coaches from Gulf states. Suggested addition to getting-around: "Intercity and international coaches are booked on the national bus company's website or app, or at the station." Naming SAPTCO is an impartiality question for the owner, since it is a listed company, though it is the national carrier.

7. **Coaches from Madinah to Makkah.** A member asked which coach companies run Madinah to Makkah. No text answer.
   - Posted: 27 Aug 2026. Source: question only.
   - CONFIRMS the demand. MESH already gives the coach option with time and price, but not where to book or where the coaches leave from. Worth adding the booking channel and the departure station.

### finding-an-apartment and cost-of-living (guides-2026.ts)

8. **Two-bedroom flat price in Al-Aridh.** A rental advert listed a two-bedroom, one-bathroom flat in Al-Aridh, 8 to 10 minutes' drive from Masjid an-Nabawi, at SAR 30,000 a year (about SAR 2,500 a month) in two payments. The price was lower if paid in one payment, and a service fee was charged once. The advert also gave the broker's FAL licence number.
   - Posted: 23 Oct 2026. Source: advert (single data point). Confidence: medium as a price point.
   - CONFIRMS. MESH lists two bedrooms at "2,000 to 3,500" SAR a month and says "Paying the whole year at once often brings the price down" and "most owners in Madinah want the whole period up front, or two payments a year". It also says to check the agent's FAL licence. All three match.

9. **Long villa leases with a large up-front "renovation" payment.** Two adverts offered large villas (7 bedrooms, 6 bathrooms) on contracts of 10 years or more. They asked for SAR 30,000 to 38,000 a year in rent plus an up-front payment of SAR 170,000 to 240,000 for "renovation, furniture and amenities", which then become the tenant's property. The tenant could leave at the end of any year with 15 days' notice. The adverts claimed an "average annual rent" of SAR 54,000 to 55,000 over ten years.
   - Posted: 12 Oct 2026. Source: adverts. Confidence: high that such offers circulate, no view on whether they are genuine.
   - NEW red flag for MESH. If the tenant can leave after any year, the large up-front payment is at risk, and nothing in the advert says it is refunded. Suggested addition to the "Red flags before you pay" list: "You are asked for a large one-off payment for renovation or furniture on top of the rent, especially on a multi-year lease. Make sure the Ejar contract says what happens to that money if either side ends the lease early." Do not name or link the advert.

10. **Short lets near the Haram, including all of Ramadan, are in high demand.** Several members asked for short lets of 1 to 10 days, or for "the full month of Ramadan", within a 5 to 10 minute walk of the Haram. Others asked for furnished two-bedroom, two-bathroom flats for families. All replies went to private messages or contact cards.
    - Posted: 3 Sep, 6 Sep, 20 Sep, 10 Oct and 5 Nov 2026. Source: several members asking. Confidence: high that demand exists.
    - CONFIRMS. MESH suggests "Booking, Airbnb or Gathern". A NEW line could say that flats near the Haram for Ramadan and the winter holidays go months ahead, so book early through the short-let apps and avoid paying deposits to strangers in groups.

11. **Room budgets for students on a stipend (Riyadh, for context).** A student from Germany starting at Imam Muhammad ibn Saud Islamic University in Riyadh said all university housing was full, so he had to find a room himself. He had a ceiling of SAR 12,000 a year because his monthly stipend is about SAR 870.
    - Posted: 22 Aug 2026. Source: member with direct experience. Confidence: medium, but Riyadh only.
    - Context only for MESH (IU Madinah, not Riyadh). It shows that university housing can be full on arrival, and that a stipend of under SAR 1,000 a month means shared rooms. MESH's "Bed or room in a shared flat: 300 to 1,000" a month fits this budget (SAR 1,000 a month). No change needed.

### FAQ home-internet-no-iqama (guides-2026.ts)

12. **Prepaid routers when you have no iqama.** A member asked about prepaid routers or Wi-Fi in Madinah without an iqama, having heard they are the better option. A second member needed the same because his building's Wi-Fi was too weak for online school. No text answer.
    - Posted: 29 Sep 2026. Source: two members asking. Confidence: high on the need.
    - CONFIRMS. MESH FAQ says: "Fixed home internet needs an iqama, so most people use a portable router with an unlimited-data SIM from STC, Mobily or Zain." A NEW detail would help: typical monthly price of an unlimited 5G data package and the router's cost (to be researched), since people doing online study ask about speed.

### NEW guide: Single parents, divorce and custody in Madinah (or a section in "family")

13. **Single fathers say they lack support.** A member who runs a school wrote that, after meeting brothers at basketball games at the Islamic University, he found more single fathers than he expected. They struggle with divorce, custody, the courts, child support and visitation, homeschooling and finding free schools. Similar support groups exist for sisters but not for brothers, so he started a peer group.
    - Posted: 21 Sep 2026. Source: single member with direct community experience. Confidence: medium that the need is real.
    - NEW. MESH has nothing on divorce, custody, child support or the family courts (grep for custody, divorce, Najiz and "child support" in src/server/seed found nothing). A neutral, procedural guide (the Najiz portal for family cases, where child support and visitation orders are enforced, what documents an expat parent needs, travel with children after divorce) would serve a real group. It must avoid rulings and stick to procedures.

### kindergartens-and-schools (guides-2026.ts)

14. **Homeschooling and free schooling are open questions for expat parents.** The same post names homeschooling and "free schools" as problems families face.
    - Posted: 21 Sep 2026. Source: single member. Confidence: medium on the need.
    - NEW gap. The schools guide covers private kindergartens and fees ("around 4,000 SAR a year per child") but says nothing on homeschooling, online schooling from home countries, or whether children of non-Saudi residents can attend free government schools. Homeschooling is mentioned only as a note on a YouTube channel in src/content/library.ts. Worth a short section once confirmed with the Ministry of Education.

### NEW FAQ: Where can I study Arabic in Madinah if I am not at the University?

15. **Private Arabic centres teach non-native speakers.** Repeated adverts (which MESH must not repeat or name) show private centres in Madinah running levelled Arabic courses for non-native speakers. They offer free placement classes, new beginner intakes during the year (one started 18 Oct 2026), in-person and online study, and outings and Umrah trips for practice.
    - Posted: 18 Aug to 19 Oct 2026. Source: adverts. Confidence: high that such centres exist, nothing on quality.
    - CONFIRMS. MESH says: "On a visit visa you may live here and take short courses at language centres." A neutral FAQ on how to choose a centre (placement test, class size, whether it can sponsor any visa, refund policy) could help, without naming any centre.

### NEW FAQ (low priority): Can I travel to Saudi Arabia overland from a neighbouring Gulf country?

16. Covered by finding 6. One line in getting-around is enough.

## 3. Open questions to confirm with official sources

1. Is ksavisa.sa now the official unified visa platform (and does visa.mofa.gov.sa point to it)? Should MESH name it next to visa.visitsaudi.com?
2. Does Saudi Arabia issue an "Electronic Travel Authorization" for UK or other passports that is separate from the tourist eVisa? Who qualifies, what does it cost, and does it work for children?
3. Can a non-eligible national who holds a valid Schengen, UK or US residence permit or visa get the tourist eVisa or a visa on arrival? What are the conditions (for example, a visa used at least once, or the first entry by a Saudi or partner airline)?
4. How does the Umrah visa sold through Nusuk and licensed providers differ from the tourist eVisa in price, length of stay, travel between cities and work rules? MESH covers only Umrah on the tourist eVisa.
5. Current visa-on-arrival price and how to pay at the airport. MESH says SAR 480, and a member asked in Aug 2026 with no answer.
6. Premium Residency thresholds: confirm the SAR 4 million property and SAR 7 million investor figures, the 10-job condition, and today's processing time, on the Premium Residency Center site.
7. Can children of non-Saudi residents (iqama or visit visa) attend government schools for free in Madinah, and what are the rules on homeschooling?
8. Family cases for expats: how child support and visitation are filed and enforced through Najiz, and the rules on travelling abroad with children after a divorce.
9. Typical monthly cost of an unlimited 5G data package and a portable router in Madinah (Nov 2026), for the home internet FAQ.
10. Where coaches for Makkah leave from in Madinah, and whether booking is online only.

## 4. Ranked list of the 10 most valuable additions for MESH

1. **visas-for-family-and-visitors:** add the rule (once confirmed) that holders of a Schengen, UK or US visa or residence permit can get the eVisa whatever their nationality. This is common in mixed-nationality families.
2. **visas-for-family-and-visitors:** add a short "Umrah visa or tourist eVisa?" comparison.
3. **visas-for-family-and-visitors:** name ksavisa.sa as an official portal if confirmed, and explain any ETA product, so readers do not mistake it for an agent's site.
4. **NEW guide or family section:** divorce, custody, child support and visitation for expat parents, with procedures only (Najiz, documents, travel with children).
5. **kindergartens-and-schools:** add homeschooling, online schooling and free government school eligibility.
6. **finding-an-apartment, red flags:** warn about large one-off "renovation or furniture" payments on multi-year leases that the tenant can end yearly.
7. **visas-for-family-and-visitors, Premium Residency:** add the property and investor thresholds and a one-line warning that viral posts confuse SAR and USD (there is no USD 100,000 permanent route).
8. **getting-around:** say where to book intercity coaches and where they leave from, and note the direct international coaches from Gulf capitals (Doha to Riyadh from about SAR 120, Aug 2026).
9. **finding-an-apartment:** a line that short lets near the Haram for Ramadan and the winter holidays must be booked months ahead through the short-let apps, never by paying deposits to strangers in groups.
10. **FAQ home-internet-no-iqama:** add typical prices for unlimited 5G data and a router, and that this is enough for online study.
