# Saudistics Substack: facts, checks and proposals

Read 9 November 2026 from the RSS feed (`https://saudistics.substack.com/feed`), which carries the full text of all 6 posts. Notes are in MESH's own words. Nothing here is copied text, and none of it may name the source in public copy (house rule 2).

How to read the tables:
- **Official** says whether a Saudi government page confirms the fact, with the URL. "Press only" means only news or law-firm reports were found (Saudi Gazette, KPMG and the like), which is a lead and not enough for a guide.
- **MESH** says whether `src/server/seed/content/` already covers it (grep run 9 November 2026). "No" means no hit for the keywords listed.

Official pages used (all fetched with curl on 9 November 2026):
- HRSD, Change expatriate Profession: https://www.hrsd.gov.sa/en/ministry-services/services/%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9-%D8%A7%D9%84%D9%85%D9%87%D9%86 (last modified 5 Oct 2026)
- HRSD, Ajeer Permit Issuance (the dependants permit conditions are on this page): https://www.hrsd.gov.sa/en/ministry-services/services/%D8%A5%D8%B5%D8%AF%D8%A7%D8%B1-%D8%AA%D8%B5%D8%A7%D8%B1%D9%8A%D8%AD-%D8%A3%D8%AC%D9%8A%D8%B1 (last modified 25 Aug 2026)
- HRSD, Transfer of services from another employer (Freedom of movement): https://www.hrsd.gov.sa/en/ministry-services/services/%D9%86%D9%82%D9%84-%D8%AE%D8%AF%D9%85%D8%A7%D8%AA-%D9%85%D9%86-%D8%B5%D8%A7%D8%AD%D8%A8-%D8%B9%D9%85%D9%84-%D8%A2%D8%AE%D8%B1-%D8%AD%D8%B1%D9%8A%D8%A9-%D8%A7%D9%84%D8%AA%D9%86%D9%82%D9%84
- HRSD, Request for transfer of expatriate workers: https://www.hrsd.gov.sa/en/ministry-services/services/%D8%B7%D9%84%D8%A8-%D9%86%D9%82%D9%84-%D8%A7%D9%84%D8%B9%D9%85%D8%A7%D9%84%D8%A9-%D8%A7%D9%84%D9%88%D8%A7%D9%81%D8%AF%D8%A9
- HRSD, Labor Relations (amended Labour Law text, Articles 53 to 88): https://www.hrsd.gov.sa/en/%D8%B9%D9%84%D8%A7%D9%82%D8%A7%D8%AA-%D8%A7%D9%84%D8%B9%D9%85%D9%84 (last modified 7 Sep 2025)
- HRSD, Procedural Guide on worker absence (Oct 2022, PDF): https://www.hrsd.gov.sa/sites/default/files/2022-10/E23102022.pdf
- HRSD news, work permit grace period extended to 31 Dec 2026 (8 Jul 2026): https://www.hrsd.gov.sa/en/media-center/news/%D8%AA%D9%85%D8%AF%D8%AF-%D9%85%D9%87%D9%84%D8%A9-%D8%AA%D8%B5%D8%AD%D9%8A%D8%AD-%D8%A3%D9%88%D8%B6%D8%A7%D8%B9-%D8%B1%D8%AE%D8%B5-%D8%A7%D9%84%D8%B9%D9%85%D9%84

Not reachable from this sandbox: `absher.sa` (empty reply), `my.gov.sa` (403), `qiwa.sa` (JS shell only, 246 bytes). The my.gov.sa service listing for profession change exists at https://my.gov.sa/en/services/18479 (seen in search, not opened).

---

## 1. How to change your profession on iqama (Qiwa)
- URL: https://saudistics.substack.com/p/how-to-change-your-profession-on
- Date: 3 October 2026

| # | Fact (our words) | Official | MESH |
|---|---|---|---|
| 1.1 | The job title (mihna) on an iqama is the one registered with HRSD; it shows in Absher, Qiwa and Muqeem and decides which government services the holder can use. | Partly: the HRSD profession page confirms the title is held in HRSD systems and follows the Unified Saudi Occupational Classification. Absher/Muqeem display not checked (sites unreachable). | No (`profession`, `mihna` give no hit on this topic) |
| 1.2 | Some family visit and family residence visas are open only to certain professions. | Not confirmed (Absher/my.gov.sa unreachable). | No. `visas-for-family-and-visitors` covers who can host but not profession limits; check that guide before writing. |
| 1.3 | Doing work that differs from the iqama title can be a violation for both worker and employer. | Not found on an official page in this pass. | No |
| 1.4 | Only the employer can request the change, through the Qiwa "Change Expatriate Profession" service; the worker cannot do it in Absher. | Yes, HRSD profession page (applicant must be the establishment's accredited representative; service runs on Qiwa). | No |
| 1.5 | The employer picks the new title from the national occupational classification; the worker usually approves in their own Qiwa account; Absher and Muqeem then update. | Partly: the classification and the Qiwa route are on the HRSD page. The worker-approval step is not stated there. | No |
| 1.6 | Since 2022 broad titles (worker, engineer, doctor and so on) can be narrowed within the same field without the worker's consent. | Press only. | No |
| 1.7 | The service is free. | Yes, HRSD profession page: "Service Fees: Free Service". | No |
| 1.8 | Regulated jobs need registration first: engineers with the Saudi Council of Engineers, accountants with the accountants' body, health workers with the health specialties commission; many trades go through skill verification. | Partly: the HRSD page requires a practice certificate from the Saudi Council of Engineers for engineering, the Ministry of Agriculture for vets and the accounting authority for accountants. Health and skill verification are not on that page. | No |
| 1.9 | A title reserved for Saudis cannot be given to an expatriate. | Yes, HRSD profession page. | No |
| 1.10 | On 29 Jan 2026 Qiwa paused changes into four titles (general manager, sales representative, marketing specialist, procurement manager); general manager was later allowed if it matches the commercial registration, contract and labour records. | Press only (Gulf News, Deloitte, Saudi Gazette, Morgan Lewis). | No |
| 1.11 | The establishment must be in good standing and the worker's iqama and permit valid. | Yes and more precise: HRSD page requires valid licences, Platinum or Green Nitaqat band, no pending transfer, no other change request in progress, and no final exit visa issued. | No |
| 1.12 | Qiwa's phone number is 920000105. | Yes, the number appears on the HRSD profession page. | No |

## 2. Huroob explained, 60 days to fix it
- URL: https://saudistics.substack.com/p/huroob-in-saudi-arabia-explained
- Date: 2 October 2026

| # | Fact (our words) | Official | MESH |
|---|---|---|---|
| 2.1 | Huroob is an employer's report that a worker has stopped turning up without a valid reason; once filed, the employer stops being responsible. | Yes, HRSD Procedural Guide (Oct 2022, PDF above): the report ends the contractual relationship and removes the worker from the establishment. | No (`huroob` and `absence report` give no hit in guides; the only `huroob` string is an unrelated word match in `mashayikh.ts`) |
| 2.2 | Since October 2022 the worker gets 60 days from the report to move to a new employer or leave on final exit. | Yes, Procedural Guide: 60 days from filing, for a worker who entered the Kingdom more than 12 months earlier (the post leaves out the 12-month condition). | No |
| 2.3 | The employer may file only if the worker holds a valid permit, has no transfer in progress and no pending report, and the establishment is in good standing; filing is on Qiwa. | Partly: the guide lists an active establishment, the worker shown as employed, and a work permit valid for at least 60 days. | No |
| 2.4 | When a contract has already ended, the system gives 60 days to find a new employer or leave, without any huroob report. | Press only (Ajel citing Qiwa; Saudi Gazette). | No |
| 2.5 | A filed report cannot be withdrawn by the employer. | Yes, Procedural Guide calls the removal "non-retractable". | No |
| 2.6 | A transfer to a new employer is made on Qiwa and should complete within 15 days of approval. | Partly: the guide gives 15 days for the related government systems to complete a transfer. Transfer service: HRSD Freedom of movement page (free, new employer offers, worker accepts on Qiwa). | No |
| 2.7 | After 60 days without action the status becomes "absent from work"; this is a serious residency breach risking arrest and deportation. | Partly: the guide says after 60 days the system refuses final exit and transfer and the status stays "absent from work" in all linked systems. Arrest and deportation are not on that page. | No |
| 2.8 | Deportation over an absence case may bring an entry ban, fixed-term or permanent, decided case by case. | Not confirmed. | No |
| 2.9 | Status can be checked in Absher (residency) and Qiwa (contract). | Not confirmed (sites unreachable). | No |
| 2.10 | A false report can be challenged with evidence through HRSD, phone 19911. | Partly: 19911 appears on an HRSD service page. Grievance steps not confirmed. | No |
| 2.11 | Fines tied to an old huroob case pass to a new employer only if it accepts them in writing. | Press only. | No |

## 3. Resigning: notice period and end of service
- URL: https://saudistics.substack.com/p/resigning-in-saudi-arabia-notice
- Date: 1 October 2026

| # | Fact (our words) | Official | MESH |
|---|---|---|---|
| 3.1 | Since the February 2025 amendments, an employee leaving an open-ended contract gives 30 days' written notice (60 before); an employer ending it gives 60. | Yes, HRSD Labor Relations page, Article 75 (monthly-paid, open-ended contract). | No (`notice period`, `resign` hits are about not resigning before final acceptance at the University) |
| 3.2 | The employer has 30 days to answer, or the resignation stands; it can defer acceptance up to 60 days for business need; the employee can withdraw within 7 days unless already accepted. | Yes, Labor Relations page (the deferral must be explained in writing; a resignation may not name a future date). | No |
| 3.3 | Probation may last up to 180 days if written in the contract; either side may end the contract during it. | Yes, Labor Relations page (180 days in total; one probation per employer unless a different job). | No |
| 3.4 | End-of-service pay is half a month's wage per year for the first five years and a full month for each later year, on the last wage. | Yes, Article 84 (also pro rata for part years). | No |
| 3.5 | Resigning: nothing before 2 years, one third at 2 to 5, two thirds at 5 to 10, all at 10 or more. Employer termination normally pays in full. | Yes, Article 85. | No |
| 3.6 | A woman gets the full award if she ends her contract within 6 months of her marriage contract or 3 months of giving birth; force majeure also pays in full. | Yes, Article 87. | No |
| 3.7 | A worker may leave without notice and keep all rights for unpaid dues, contract breach or abuse. | Yes, Article 81 (lists the cases). | No |
| 3.8 | Worked examples on 5,000 SAR: 4 years gives 10,000 of which a third (about 3,333); 7 years gives 22,500 of which two thirds (15,000); 12 years gives 47,500 in full. | Arithmetic checked against Article 84 and 85: correct. | No |
| 3.9 | Dues are paid within one week if the employer ends the contract, two weeks if the employee resigns. | Yes, Article 88. | No |
| 3.10 | "Actual wage" in Article 2 means basic wage plus allowances. | Not checked (Article 2 is not on the Labor Relations page). | No |

## 4. Can your wife or children work on a family visa?
- URL: https://saudistics.substack.com/p/can-your-wife-or-children-work-in
- Date: 1 October 2026

| # | Fact (our words) | Official | MESH |
|---|---|---|---|
| 4.1 | A dependant (family) iqama gives the right to live here, not to work; only a work iqama or a special permit allows employment. | Implied by the Ajeer page (a separate permit is needed). | Partly: the joint-account FAQ (`faqs-aiakhee-2026-11.ts`, `guides-student-life.ts` slug `joint-bank-account-spouse`) mentions "a dependant whose iqama does not allow work". No page says it directly. |
| 4.2 | Since July 2024 employers in health and education can hire a dependant through Ajeer without moving the sponsorship. | Yes, HRSD Ajeer page: establishments in Education and Health, low Green band or above. | No (`Ajeer` no hit) |
| 4.3 | The dependant must be 18 or over, with a valid iqama and the qualifications for the job; the main family member's iqama must also be valid. | Yes, Ajeer page. It also limits the relationship to husband, wife or mahram. | No |
| 4.4 | The employer needs an active CR, HRSD registration, no restrictions and must not be in the red band. | Stricter on the official page: low Green or above. | No |
| 4.5 | Documents: passport, iqama, marriage or birth certificate, certificates; health staff also register with the health specialties commission. | Partly: the Ajeer page says professional accreditation is needed where required. Document list not on the page. | No |
| 4.6 | The employer issues the contract on Ajeer, the dependant approves, the permit is issued. | Partly: the Ajeer page has the employer steps (log in, issue permit, await the beneficiary's approval). | No |
| 4.7 | Fees: free when launched, but may now vary with duration; standard permits take about five working days. | The HRSD Ajeer page shows "Free". Duration not confirmed. | No |
| 4.8 | A dependant on Ajeer stays on the family file, so the 400 SAR monthly dependant fee continues. | The 400 SAR figure is press only in this pass. | Yes: `guides-2026.ts` slug `iqama-and-exit-reentry-fees` states 400 SAR per dependant a month on a work iqama, and that student iqamas are not work iqamas. |
| 4.9 | Any sector: the employer transfers the dependant to its own sponsorship on Qiwa; the sponsor consents in Absher; the employer then pays levy, iqama and transfer fees, and the family stops paying the dependant fee. | Partly: the HRSD transfer page covers employer conditions (valid CR, wage protection, Nitaqat band, credit). Dependant-specific steps not found on an official page. | No |
| 4.10 | Common refusals: expired iqama or passport, unpaid traffic fines, a pending final exit, a title outside the employer's activity, no sponsor approval, a low Nitaqat band. | Not confirmed as a list. | Partly: MESH covers fines and pending transactions blocking renewals and exit, not transfers. |
| 4.11 | Work may start only once the permit is issued or the transfer done; working earlier is a violation for all three parties. | Not confirmed. | Partly: `visas-for-family-and-visitors` says visit visa holders may not work. |

## 5. Expired work permit: fix it before 31 December 2026
- URL: https://saudistics.substack.com/p/expired-work-permit-in-saudi-arabia
- Date: 1 October 2026

| # | Fact (our words) | Official | MESH |
|---|---|---|---|
| 5.1 | The iqama (residency) and the work permit (HRSD, via Qiwa) are separate; renewing one does not renew the other. | Implied by the HRSD news item. | No (`work permit` no hit) |
| 5.2 | HRSD extended the grace period to 31 Dec 2026 for permits expired more than 12 months and for workers more than 6 months in a job with no permit issued; after that, "statutory procedures" apply. | Yes, HRSD news, 8 July 2026 (the post says 1 July). | No |
| 5.3 | Since 1 July 2026 Qiwa removes a worker from the employer's records when the permit has been expired more than three months; the employer still owes everything up to removal. | Press only (KPMG flash alert 2026-168, Saudi Gazette). | No |
| 5.4 | Exception: not removed if the permit expired before the iqama, the iqama has at least 180 days left, and renewal was not possible. | Press only. | No |
| 5.5 | A permit can be renewed up to 180 days before expiry; fees through SADAD. | Press only (sources differ: 180 days or six months). | No |
| 5.6 | Workers should check Absher and Qiwa, raise an expired permit in writing, then contact HRSD on 19911. | Partly (19911 on an HRSD page). | No |
| 5.7 | Premium Residency holders working for a company now need a special Qiwa work permit costing 100 SAR. | Press only (Saudi Gazette, KPMG 2026-155, June 2026). | Partly: `visas-for-family-and-visitors` gives Premium Residency prices but not the permit. |

## 6. Welcome to Saudistics
- URL: https://saudistics.substack.com/p/welcome-to-saudistics
- Date: 28 September 2026

| # | Fact (our words) | Official | MESH |
|---|---|---|---|
| 6.1 | Nitaqat bands companies by the share of Saudis employed; the band decides visas, iqama renewals and transfers. | Partly: HRSD service pages require given bands for transfers, profession changes and Ajeer. | No (`nitaqat` no hit) |
| 6.2 | A Saudi on 4,000 SAR or more counts as one; 3,000 to 3,999 counts as half; below 3,000 not at all; part-time counts as half. | Not checked (business owners only). | No |
| 6.3 | A firm with 1 to 5 staff usually stays green with one Saudi. | Not checked. | No |

Nothing in this post is for MESH readers except as background for a company guide.

---

## What this means for MESH readers

- Students on a student iqama and students on a Visitor ID are sponsored by the University. None of these posts is about them; their own work rules belong with Travel Management and the Deanship of Student Affairs, and MESH should not imply a student may take a job.
- The posts matter to a smaller group: families where the husband holds a work iqama (staff, some mature students who came on a work iqama, muhajirun) and a wife or adult child wants to work, and spouses who already work.
- A student's wife on the student's file is not a work-iqama dependant. The Ajeer route requires the "main expatriate" to hold a valid residency permit and does not say whether a student iqama qualifies. MESH must not tell a student's wife she can use Ajeer until this is confirmed with HRSD (19911) or Travel Management.

## Ranked proposals

1. **FAQ: "Can my wife or grown child work in Saudi Arabia?"** (category `family`). Highest value: the question comes up often and MESH has no answer. Say: a family iqama gives residence, not work; two lawful routes exist (Ajeer for schools, universities, hospitals and clinics with the family member staying on the sponsor's file; or a Qiwa transfer to the employer's sponsorship, any sector); age 18+, valid iqamas, professional registration for health; do not start before the permit is issued. Add the open question about student iqamas as an instruction to ask Travel Management before acting, not as doubt. Official basis: HRSD Ajeer page, HRSD transfer pages. Link from `visas-for-family-and-visitors` and `iqama-and-exit-reentry-fees`. Before publishing, confirm with HRSD whether a dependant of a student iqama holder may use Ajeer.
2. **FAQ: "I work here. What do I need to know before I resign?"** (category `getting-settled` or a new `work` category). All facts are confirmed on the HRSD Labor Relations page: 30 days' notice, deemed acceptance after 30 days, 60-day deferral, 7-day withdrawal, the 2/5/10-year end-of-service steps, the marriage and birth rule for women (useful for working wives), payment within one or two weeks. Short, fully official, low risk.
3. **FAQ: "My work permit expired but my iqama is valid. What now?"** plus a row in `docs/EXPIRING.md` with the date 31 December 2026 (HRSD news item). Keep the three-month removal rule out until an official Qiwa or HRSD page confirms it. Remove or rewrite after 31 December.
4. **FAQ: "My employer filed an absence (huroob) report. What do I do?"** Confirmed by the HRSD Procedural Guide: 60 days from filing (if in the Kingdom over 12 months) to transfer or take final exit; the report cannot be withdrawn; after 60 days both routes close. Point to Absher and Qiwa to check status and to 19911. Lower priority because few MESH readers are on work iqamas, but it also helps readers who employ a driver or housemaid (domestic workers use Musaned, with different rules: say so and do not mix them).
5. **One line in an existing guide on iqama job titles** (no new page): the profession on a work iqama is changed only by the employer on Qiwa, free, and some family visas depend on it. Add only once fact 1.2 (profession limits on family visas) is confirmed on Absher or my.gov.sa.
6. **Premium Residency work permit (100 SAR):** hold until an official Qiwa or Premium Residency Center page confirms it, then add one sentence to `visas-for-family-and-visitors` where Premium Residency is described.
7. **Skip:** Nitaqat counting and the four restricted job titles (business owners only; belongs, if anywhere, in the company guide `start-a-company-in-saudi`).

Next step for whoever picks this up: claim proposals 1 and 2 on issue 13, grep again for `work`, `Ajeer`, `resign` in case another agent added them, and phone or Tawasul Travel Management about student-iqama dependants and Ajeer.
