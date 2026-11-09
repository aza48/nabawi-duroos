# Chat c2: "Madinah Students Business/Jobs" (extraction for MESH)

## 1. Summary

- **Date range:** 17 Nov 2025 to 9 Nov 2026 (426 lines). Most lines are system notices (security code changes, joins). There are only about 25 real posts.
- **Nature:** almost entirely one-way promotion. A handful of members post job adverts, agency and freelance service offers, referral-commission offers, app launches and testers wanted, a fundraising campaign, an off-plan property webinar, a commodity sale, a business for sale, and an event discount code. Posts are in English with some in Arabic (one job advert entirely in Arabic, one office request in both).
- **Questions and answers:** none. Nobody asks how work rules apply to students, and no post gets a reply with facts. The only replies are thanks.
- **Rules and practicalities:** never raised. No mention at all of the freelance document (وثيقة العمل الحر), Maroof, commercial registration, Ajeer, Qiwa, iqama type, visit visas, payment methods, contracts or tax.
- **Pay:** no post states a salary, rate or range.
- **Reliability:** low as a source of facts. Useful only as a weak signal of which kinds of work circulate among English-speaking students and families, and of which risky offers (property, referral, investment) reach them. Nothing here can be published as fact without official confirmation.
- **Privacy note:** all names, numbers, handles, business names and links in the chat are left out of this file on purpose.

## 2. Findings grouped by MESH target

MESH today has no guide or FAQ on working or earning as a student. The nearest content is the company guide in `src/features/guides/company/content.ts` (slug `start-a-company-in-saudi`), which already says:

> "Why not just freelance? Saudi Arabia's freelance document (freelance.sa) is for Saudi nationals. Foreign residents need a sponsor for any paid work: an employer, their own company, or Premium Residency. Working for local clients without the right status can lead to fines and losing your residency." (`NOT_FREELANCE`)

and, for students on a University scholarship:

> "While you study, the University is your sponsor, and an iqama can only have one." ... "Speak to the University before you register a company that depends on your iqama."

Nothing in the chat conflicts with either statement.

### 2a. NEW guide: "Working and earning as a student in Madinah" (does not exist yet)

| # | Finding | Date(s) | Source kind | Confidence | Status |
|---|---|---|---|---|---|
| 1 | The work that circulates in the community is mostly digital and remote: video filming and editing for short-form social media, social media marketing, web and app development, logo and poster design, online sales roles (appointment setting and closing). | Nov 2025, Dec 2025, Feb 2026, Mar 2026, May 2026, Nov 2026 | Job adverts and self-promotion posts | Medium (pattern across several posters), but small sample | NEW |
| 2 | Teaching roles for Quran, Arabic and Islamic studies are advertised by Islamic schools abroad, alongside online technical roles (web developer for learning platforms, social media, video editing) that can be done remotely. Shows that graduates' and students' skills are in demand overseas, and that remote work for foreign employers is the common route. | May 2026 | Forwarded job advert from an overseas school | Medium | NEW |
| 3 | Local, in-person roles in Madinah exist (a start-up asking for a Madinah-based, salaried videographer). The adverts never mention visa, sponsorship or iqama transfer, so readers are left to assume they can simply take the job. This is the gap MESH should fill: a salaried local job needs the employer to sponsor the worker. | Nov 2025, Feb 2026 | Job adverts | High that such adverts appear; the legal point comes from MESH's company guide, not the chat | NEW (guide), CONFIRMS the need for the `NOT_FREELANCE` warning |
| 4 | Referral commission offers (a percentage of profit for introducing clients) are posted repeatedly, with no written terms. Worth a neutral line: agree terms in writing, and know that informal commission arrangements are hard to enforce. | Dec 2025, Jun 2026 | Service promotion posts | Medium | NEW |
| 5 | Languages: adverts are posted in English and Arabic; the Arabic-only advert was for a local Madinah role, the English ones mostly for remote or overseas work. Suggests Arabic matters more for local jobs. | Nov 2025 to Nov 2026 | Pattern | Low | NEW |
| 6 | No pay ranges are given anywhere in the chat. MESH should not quote pay from this source. | Whole period | Absence | High | NEW (negative finding) |

### 2b. Scams and risky offers (fits a NEW "Avoiding scams" FAQ, or a section of the work guide)

| # | Finding | Date | Source kind | Confidence | Status |
|---|---|---|---|---|---|
| 7 | Off-plan property "investment" pitches aimed at foreign residents ("buy your dream home in Madinah", "best projects to invest in", "mechanisms to protect your investment"). Readers need the official position on whether and where a non-Saudi may own property in Madinah before acting on any such pitch. | Dec 2025 | Forwarded webinar advert | High that the pitch exists; the law needs confirming | NEW. Related MESH text: company guide line 110, "Property activity inside Makkah and Madinah is restricted for non-Saudis." (that is about company activities, not personal home ownership) |
| 8 | Unregulated sales posts: commodity bars offered for sale, and a short-term rental business offered for sale, with "PM me" and no details. A neutral warning: check licences (for example, short-term rentals need a tourism licence) and never pay before seeing paperwork. | Jun, Jul 2026 | Sale posts | Medium | NEW |
| 9 | App "tester" requests asking members for their email and to keep an app installed for 14 days. Legitimate in this case, but a common pattern to be careful with. Low value for MESH. | Jun to Jul 2026 | Promotion posts | Low | Skip |

### 2c. Minor, off-topic items (other MESH areas)

| # | Finding | Date | Target | Confidence | Status |
|---|---|---|---|---|---|
| 10 | Madinah hosts a city marathon ("second edition" on 14 February 2026, 5 km, 10 km and 21 km). Suggests a yearly event. | Feb 2026 | Possible "things to do / sport" content | Medium (one post with a discount code, so advert-like) | NEW, needs official confirmation and must not include the discount code |
| 11 | The Madinah Chamber of Commerce runs public business events (an innovation forum). Could be a neutral pointer in the company guide for networking. | Apr 2026 | `start-a-company-in-saudi` | Medium | NEW, low priority |
| 12 | A found wallet was posted in the group to return to its owner. Hints at a "lost something in Madinah" FAQ (Haram lost property, police). Nothing durable in the chat itself. | Feb 2026 | Possible NEW FAQ | Low | Skip unless MESH wants that FAQ |
| 13 | Someone asked for office space to rent in Madinah; no answers. | Mar 2026 | `start-a-company-in-saudi` | Low | Skip |

## 3. Needs official confirmation before MESH can say it

The chat gives no legal information, so all of these must come from official sources (and ideally the University) before publishing:

1. **Can a student on a University (study) iqama work at all?** Whether paid work in Saudi Arabia is allowed, whether the University's permission is needed, and what happens if a student is caught working locally (fines, losing the scholarship or residency). Ask the Islamic University's student affairs, and check Ministry of Human Resources (Qiwa) and Jawazat rules.
2. **Remote work for employers or clients outside Saudi Arabia** while living here on a study iqama: is it treated as working in the Kingdom? This is the most common situation in the chat and MESH says nothing on it yet. The company guide's line "Working for local clients without the right status" implies a distinction between local and foreign clients; that distinction needs an official source before the work guide relies on it.
3. **Family members on a dependant (family) iqama:** can a spouse or adult child work, and how (employer transfer, Ajeer, or not at all)?
4. **Visit, Umrah or tourist visa holders:** confirm that no paid work in the Kingdom is allowed on these visas.
5. **Freelance document (وثيقة العمل الحر, freelance.sa):** MESH already says it is for Saudi nationals. Re-check eligibility on freelance.sa, since this rule has changed before.
6. **Ajeer (on Qiwa):** confirm what it allows (temporary lending of an expatriate between employers) and that it does not give students or dependants a way to work on their own.
7. **Maroof:** confirm its current status (it was folded into the Saudi Business Center) before MESH mentions it at all.
8. **Premium Residency** as a route to self-employment: already in the company guide; confirm current categories and fees if the work guide links to it.
9. **Property ownership by non-Saudis in Madinah:** the new law on foreign ownership and its special conditions for Makkah and Madinah. Confirm with the Real Estate General Authority (REGA) before any FAQ.
10. **Short-term rental licensing** (homes on booking apps): confirm the Ministry of Tourism licence requirement.
11. **Madinah marathon:** confirm the organiser, that it is yearly, and the usual month.

Candidate official or neutral links to verify (not from the chat): freelance.sa, qiwa.sa (Ajeer is part of Qiwa), business.sa (Saudi Business Center), rega.gov.sa, the Ministry of Tourism licensing portal, Absher and Jawazat.

## 4. Ranked list of the most valuable additions

1. **NEW guide or FAQ: "Can I work while studying at the University?"** A short, authoritative answer once confirmed: a study iqama is sponsored by the University, local paid work needs a sponsor, and the risks of working without the right status. Link to `start-a-company-in-saudi` for those who want their own company after graduation. (Needs items 1 to 4 in section 3.)
2. **NEW section: remote work for clients abroad.** The most common kind of work in the chat (video editing, design, web development, online sales, teaching Quran and Arabic online for overseas schools). Say what is and is not allowed once confirmed, and list the kinds of skills in demand without naming any employer.
3. **NEW scam and risky-offer warnings:** property investment pitches, referral commissions without written terms, businesses and goods sold through "PM me" posts. Advise checking licences on official portals and never paying before paperwork.
4. **NEW FAQ: "Can family members work?"** (dependant iqama rules), once confirmed.
5. **CONFIRMS existing content:** keep the `NOT_FREELANCE` warning in the company guide and consider linking it from the new work page; the chat shows local adverts never mention sponsorship.
6. **Low priority:** Madinah Chamber of Commerce events as a neutral pointer in the company guide; a yearly city marathon in a things-to-do page after confirmation.

Overall: this chat is a poor source. It adds no facts, rules, pay figures or answered questions. Its value is in showing the gap: students see local and remote job adverts with no word on whether they may take them, which is exactly what a MESH work guide should answer from official sources.
