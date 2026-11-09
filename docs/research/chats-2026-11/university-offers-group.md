# Chat c3: "Offers and discounts: everything for the University student" (Arabic group)

## 1. Summary

- **Date range:** 31 August 2026 (group created) to 9 November 2026 (export).
- **Nature:** an Arabic WhatsApp broadcast group set up by a commercial printing company to advertise to Islamic University students. Of 976 lines, about 775 are system notices (roughly 560 "joined via invite link" lines and 217 "security code changed" lines). The remaining content is about 20 real posts from three member numbers, all of them adverts or links to other groups. No member asked a question and no one replied to anything.
- **What the posts are:** a 50% notebook sale at a stationery shop on campus (until stock runs out), a basic dual SIM phone at a promotional price from an electronics shop on campus, a series of posts from a food outlet and a specialty coffee outlet on campus (new breakfast after Fajr, a shawarma launch, a lunch menu, single day drink offers, a "10 SAR for 10 days until the end of October" menu, pizza and pastries), one survey form asking students what shop, service or product they wish existed inside the University, and two invite links to other WhatsApp groups. Several messages were deleted and many images are omitted, so their content is unknown.
- **Reliability:** low for anything beyond "these kinds of shops exist on campus". Every post is self promotion with time limited prices. No official University announcement was forwarded, and nothing touches Tawasul, the Academic System, exams, transport, the mat'am, the library, student cards or course note printing. The printing company that created the group never posted about printing.
- **Honest view of usability:** very little. Nothing here belongs on the discounts page (none of the offers come from the University's partner programme and all are short term). The only durable takeaways are general: shops inside the campus near the student housing units sell stationery and notebooks, basic phones, and food and coffee outside mat'am hours; and those shops sit around units 22 and 23, with Masjid Muhammad ibn Ibrahim at unit 23. Both need the owner to confirm before use.

## 2. Findings by MESH target

### `campus-life-islamic-university` (src/server/seed/content/guides-student-life.ts)

**F1. Shops inside the campus near the student housing units**
- Date: 3 September to 8 November 2026 (repeated across many posts).
- Source kind: business adverts posted in the group (self reported locations).
- Confidence: medium that the shops exist and sit in units 22 and 23; low on anything about prices or hours.
- Status: NEW. The guide covers the mat'am, buses, housing, the Medical Center, the library and accounts, but says nothing about shops on campus.
- Detail: a stationery shop in unit 22 sells university notebooks in 100, 150 and 200 sheet sizes; an electronics shop in unit 22, on the side toward unit 23, sells basic mobile phones; a food outlet and a specialty coffee outlet in unit 23 serve breakfast from right after Fajr, plus lunch, dinner, coffee, pizza and pastries.
- Suggested neutral wording (no names): "Small shops near the student housing units on campus sell stationery and notebooks, basic phones and accessories, and food and coffee, which helps when the mat'am is closed."

**F2. What students commonly need on campus (demand signals, general only)**
- Date: September to November 2026.
- Source kind: the services businesses chose to advertise, plus one survey by a group member asking what shop, service or product students wish existed inside the University (no replies appear in the chat).
- Confidence: low (inferred from what businesses advertise, not from student statements).
- Status: NEW, background only.
- Detail: notebooks and stationery at the start of the semester (the notebook sale ran on 3 September, the first days of term); printing (the group was created by a printing company aimed at University students, which suggests printing services for students are offered near the campus, though the chat gives no detail); cheap phones; breakfast after Fajr and food outside mat'am hours; coffee and snacks in the evening.
- Use: supports F1 only. Not enough on its own for a page.

### Masjid Muhammad ibn Ibrahim location (lessons and duroos data: src/server/seed/legacy/lessons.ts, mashayikh.ts, announcements.ts)

**F3. The mosque is at unit 23 on campus**
- Date: 8 September, 14 September, 23 September, 5 to 9 October, 8 November 2026.
- Source kind: business adverts that give their location as "unit 23, in front of / opposite Masjid al-Shaykh Muhammad ibn Ibrahim"; one post adds that the outlet is outside, facing the mosque.
- Confidence: medium (repeated consistently across many posts, but from one advertiser).
- Status: CONFIRMS that Masjid Muhammad ibn Ibrahim is at the Islamic University (already in the lessons and mashayikh data); NEW on the detail that it stands at unit 23.
- Use: a location hint for lesson entries ("Masjid Muhammad ibn Ibrahim, by unit 23 on the Islamic University campus"), after confirmation.

### Discounts page (src/content/discounts.ts)

**F4. No official partner offers**
- Date: whole chat.
- Source kind: business adverts.
- Confidence: high that none of them are partner programme offers.
- Status: no CONFIRMS and no NEW. None of the five businesses that posted (a printing company, a stationery shop, an electronics shop, a food outlet and a coffee outlet) appears in `DISCOUNTS`, and no post mentions the University's partner programme or asks for a University card. Every offer is time limited ("until stock runs out", "from Fajr Tuesday to Fajr Wednesday", "10 days only, until the end of October"). Under MESH rules none of them can be listed.

### `cost-of-living` (price reference, optional)

**F5. Notebook prices**
- Date: 3 September 2026.
- Source kind: one advert quoting "regular" prices against sale prices.
- Confidence: low (an advert's "was" price is not a reliable market price).
- Status: NEW but not recommended.
- Detail: university notebooks quoted at 10 SAR for 100 sheets, 20 SAR for 150 sheets and 25 SAR for 200 sheets before a 50% sale. A basic dual SIM phone was offered at 65 SAR on 8 September. Use only if another source agrees.

### University procedures, deadlines, recurring Q and A

- Nothing. No Tawasul, Academic System, exam, transport, mat'am, library, student card or course note content, and no questions or answers from students.

## 3. Questions to confirm

1. Are units 22 and 23 student housing buildings inside the Jamiah with shops on the ground floor, and is that the main shopping spot on campus? What kinds of shops are there (stationery, printing and photocopying, phones, groceries, food, coffee)?
2. Is there a printing, photocopying and binding service for course notes inside the campus, or do students go to print shops just outside it? Does the University itself print or sell any course books?
3. Is Masjid Muhammad ibn Ibrahim the mosque at unit 23, and is it the same as the "Jami al-Shaykh Muhammad ibn Ibrahim" named in the lesson announcements?
4. Are the campus food outlets open to all students and staff, and do they open after Fajr every day, including Friday and Saturday?

## 4. Ranked additions

1. **Campus shops line in `campus-life-islamic-university`** (F1), worded generally with no business names, once question 1 is confirmed. Small but genuinely useful for new students who only know about the mat'am.
2. **Location hint for Masjid Muhammad ibn Ibrahim** (F3) in the lessons and duroos data, once question 3 is confirmed.
3. **Printing of course notes** (F2): only if the owner can confirm where students print and bind notes (question 2); the chat itself gives nothing usable.

Nothing from this group should go on the discounts page. The group is an advertising channel and is not worth monitoring as a source.
