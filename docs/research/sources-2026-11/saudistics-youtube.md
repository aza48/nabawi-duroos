# Saudistics YouTube: the five "moving to Madinah" videos (notes, 9 November 2026)

Notes in MESH's own words, in English. The videos are in Indonesian and are a five-part series ("Pindah ke Madinah", moving to Madinah) aimed at Indonesians, published 17 to 19 October 2026, with an AI presenter. Public text never names this channel (house rule 2). These are leads only: every fact below is marked with how far it was checked against an official source.

## How the material was obtained (read this before retrying)

- **Captions: not fetched for any of the five.** The watch pages return HTTP 429 (a captcha page) through the session proxy, and YouTube's player endpoint answers "Sign in to confirm you're not a bot". Getting past that would mean working around a bot check, which this session must not do. A future session can try again only if a normal fetch works; otherwise leave it.
- **Descriptions: fetched for parts 2 to 5** from the channel's public RSS feed, `https://www.youtube.com/feeds/videos.xml?channel_id=UCk7Aa7lCVUAuXeJqEufDgtA` (it carries the latest 15 videos with full descriptions). Each description has a chapter list and a bullet list of figures, so the notes below are close to what the videos say, but are not a transcript.
- **Part 1 (`A1zN-FFBwNM`): title only**, from YouTube oEmbed (`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=A1zN-FFBwNM&format=json`). It has dropped out of the RSS feed, so there is no description.
- **Official sites reachable from this session:** `saudiproperties.rega.gov.sa`, `zatca.gov.sa`, `hrsd.gov.sa`, `iu.edu.sa` (HTTP 200). **Not reachable:** `sa.gov.sa` (proxy 502, DNS fails in WebFetch), `pr.sa`/`www.pr.sa` (blocked), `my.gov.sa` and `spa.gov.sa` (403, DNS fails in WebFetch), `misa.gov.sa` and `investsaudi.sa` (403), `rega.gov.sa` (503). `pr.gov.sa` answers but is a login portal with no public text. So most checks below rest on search results restricted to the official domain (the official page's own title and text as indexed), not on a fresh page load. A session with `sa.gov.sa`, `my.gov.sa` and `misa.gov.sa` allowed in its network settings should re-check the Premium Residency figures before they go into a guide.

Check levels used below:
- **Confirmed**: the official page (or its indexed text) states it.
- **Partly**: the official source supports the rule but not the exact figure.
- **Not confirmed**: no official source reached this session; do not publish until checked.

## Part 1: `A1zN-FFBwNM`

- URL: https://www.youtube.com/watch?v=A1zN-FFBwNM
- Title in English: "A celebrity moving to Madinah? Can Indonesians buy a home in Madinah in 2026? (part 1)". The title names an Indonesian actress; MESH never names people or uses celebrity hooks.
- Captions: not fetched. Description: not available (see above). Only the topic is known.
- Topic: whether a foreign (Indonesian) Muslim can buy a home in Madinah under the 2026 rules.
- Official source: REGA's Saudi Properties portal, https://saudiproperties.rega.gov.sa/ (reachable), and the REGA ownership rules already summarised in MESH.
- MESH coverage: **fully covered** by `owning-property-as-a-non-saudi` (`src/server/seed/content/guides-lane-e-2026-11.ts`): Muslims only in Makkah and Madinah, approved zones only, how to apply on Saudi Properties, 5% transaction tax, ownership gives no residency. Nothing new to add from this video.

## Part 2: `NZb6sRh9-qU`

- URL: https://www.youtube.com/watch?v=NZb6sRh9-qU
- Title in English: "House prices in Madinah vs Jakarta 2026: is Madinah really cheaper? (part 2)"
- Captions: not fetched; worked from the description (prices as of late September 2026).

| Fact stated (our words) | Official check | MESH covers it? |
|---|---|---|
| Average flat price in Madinah is about 3,835 SAR per square metre | Not confirmed. The figure comes from a private listings site; no official price index was reached | No price per m² in MESH. Not worth adding: market averages move and the zones set prices for foreign buyers |
| Flats in Madinah start around 320,000 SAR; near the Prophet's Mosque they pass 950,000 SAR | Not confirmed (market figures) | No. Could inform a "what to expect" line in the property guide, but only with an official or clearly dated source |
| A foreign buyer pays a 5% transaction tax plus about 2% in fees | **5%: confirmed.** ZATCA: the real estate transaction tax is 5% of the sale price, under the law in force since 10 April 2025, https://zatca.gov.sa/en/RulesRegulations/Taxes/Pages/RETTRegulation.aspx and the May 2026 guideline https://zatca.gov.sa/en/HelpCenter/guidelines/Documents/Detailed-Guideline-for-RETT-In-accordance-with-provision-of-RETT-Law-and-its-Implementing-Regulations.pdf. **The "2%": partly.** REGA's Real Estate Brokerage Law sets the default broker's commission at 2.5% of the sale price (2.5% of the first year's rent on a lease) unless the parties agree otherwise in writing, https://rega.gov.sa/en/laws-and-decisions/regulations-and-by-laws/rules/real-estate-brokerage-law/ | 5% tax: yes, in `owning-property-as-a-non-saudi`. Brokerage: the property guide and `finding-an-apartment` (guides-2026.ts line 427) mention "the agent's commission" with no figure. **Gap: the 2.5% default** |
| Two-bedroom rent in parts of Madinah starts around 30,000 SAR a year | Not confirmed (market) | Yes, consistent: `cost-of-living` gives 2,000 to 3,500 SAR a month for two bedrooms |
| Foreigners can buy only in zones set for them | Confirmed by REGA's portal and the rules in the MESH guide | Yes |

## Part 3: `aVYeWGlKquU`

- URL: https://www.youtube.com/watch?v=aVYeWGlKquU
- Title in English: "Living in Saudi Arabia through a business: the MISA licence for Indonesians, 2026 (part 3)"
- Captions: not fetched; worked from the description (as of 17 October 2026).

| Fact stated (our words) | Official check | MESH covers it? |
|---|---|---|
| Under the new Investment Law (2025) the MISA licence became a registration, renewed with a yearly data update | **Confirmed.** MISA's summary of the updated Investment Law: the foreign investor licence is replaced by a simplified registration, and a foreign investor registers with the Ministry before investing, https://misa.gov.sa/app/uploads/2024/08/Executive-Summary-of-Updated-Investment-Law-En.pdf and the law text https://misa.gov.sa/app/uploads/2025/07/Investment-Law.pdf (indexed text; the site itself returned 403) | Yes: company guide (`src/features/guides/company/content.ts` lines 29 to 30: registration since February 2025, update once a year) |
| Many activities can be 100% foreign owned; some are restricted or closed | Partly. MISA's law text: restricted activities still need a request through MISA to the relevant authority | Yes, the company guide covers activity choice |
| Seven steps: pick an activity, register with MISA, set up the company and commercial registration, open a bank account and get an office, activate Qiwa, GOSI, Muqeem and ZATCA, issue the work visa and iqama, then family visas | Matches MISA's investor guide in outline, https://misa.gov.sa/app/uploads/2025/07/Investor-Guide_12-04.pdf | Yes, step by step in the company guide (lines 124 to 159) |
| Monthly costs: about 800 SAR levy per foreign worker; 400 SAR per dependant | Not confirmed this session. Official pages found (MOF 2017 statement on the dependants fee, https://www.mof.gov.sa/en/MediaCenter/news/Pages/news_06112017_2.aspx ; HRSD small-business exemption, https://www.hrsd.gov.sa/en/media-center/news/200220241 ; Cabinet cancelling the levy for licensed industrial firms, December 2025, https://www.spa.gov.sa/en/w2468197) confirm the system but not the current amounts | Yes: company guide (`levyMonthly: 800`, `dependantMonthly: 400`) and `iqama-and-exit-reentry-fees` (400 SAR per dependant a month). Worth noting in the company guide that the levy no longer applies in licensed industrial establishments, if not already there |
| A foreign-owned company pays 20% income tax on profit, and must meet Saudization | **Partly confirmed.** ZATCA: income tax applies to resident companies on the shares held by non-Saudi partners, https://zatca.gov.sa/en/Pages/IncomeTax.aspx ; the 20% rate is stated in ZATCA's FAQ, https://zatca.gov.sa/en/HelpCenter/FAQs/Pages/FAQ_148.aspx (the indexed text quotes it for permanent establishments; the Income Tax Law sets 20% for non-Saudi shares generally) | Yes: company guide line 290 (20% on the foreign-owned share), line 291 (zakat 2.5% on Saudi/GCC share), Nitaqat section |
| Never use a Saudi's name to run your business (tasattur); it is strictly banned | **Confirmed.** Ministry of Commerce: the Anti-Commercial Concealment Law allows up to 5 years in prison, fines up to 5 million SAR, confiscation of the money, closure of the business, and deportation of the foreigner with a ban on returning to work, https://mc.gov.sa/en/mediacenter/News/Pages/19-08-20-01.aspx and https://mc.gov.sa/en/mediacenter/News/Pages/08-12-25-02.aspx | **No.** grep for `tasattur`, `concealment` and `cover-up` finds nothing in `src/server/seed/content` or the company guide. **Gap** |

## Part 4: `pHEo7JwhXWI`

- URL: https://www.youtube.com/watch?v=pHEo7JwhXWI
- Title in English: "Three legal ways to live in Saudi Arabia: Premium Residency, work, and study in Madinah (part 4)"
- Captions: not fetched; worked from the description (as of 18 October 2026). The video's own source for Premium Residency is a private consultancy, not the official site.

| Fact stated (our words) | Official check | MESH covers it? |
|---|---|---|
| Limited-duration Premium Residency: about 100,000 SAR a year, renewable up to 5 years | Not confirmed. The official product exists (National Portal lists Limited and Unlimited Duration Premium Residency, https://my.gov.sa/en/services/187911 and https://my.gov.sa/en/services/182760), but no official page with the fee reached this session. Official home: https://sa.gov.sa/en/premium-residency (blocked here) | Yes, partly: `visas-for-family-and-visitors` (guides-2026.ts line 390) says about 100,000 SAR a year. It does not mention the 5-year limit |
| Unlimited-duration Premium Residency: 800,000 SAR once | Not confirmed (same as above) | Yes: same line, 800,000 SAR once |
| Other categories: property owner (property worth at least 4 million SAR), investor (at least 7 million SAR), entrepreneur, special talent | Partly. The seven products (Special Talent, Gifted, Investor, Entrepreneur, Real Estate Owner, Limited, Unlimited) are confirmed by the National Portal and by the Premium Residency Center's launch notice, https://www.spa.gov.sa/en/w2026872 . The 4 million and 7 million thresholds appear only in private sources this session; the Premium Residency Law (English) is at https://misa.gov.sa/app/uploads/2024/11/ (403 here). Third-party detail to check officially: the property must be a built home (not land), unmortgaged, valued by a Taqeem-accredited valuer; the 7 million investor route needs an investment registration and jobs created within two years | Yes, partly: line 390 names the five other products without figures. `owning-property-as-a-non-saudi` covers what a Premium Residency holder may own (in Madinah: inside the zones as a resident, outside them a right of use only). **Gap:** the property guide says "ownership gives you no residency"; that is true of ownership itself, but a home worth enough can qualify for the Real Estate Owner Premium Residency, which the guide could say in one line once checked |
| Working: a Saudi employer sponsors you; dependants cost 400 SAR a month each | Dependant fee: see part 3 (not confirmed this session) | Yes: `iqama-and-exit-reentry-fees`, `visas-for-family-and-visitors` ("Employment is the usual route to an iqama") |
| Do not travel to work on an Umrah or visit visa; use the official recruitment route | Rule confirmed in substance: visit visas do not allow work (MESH already states this from official sources). The Indonesian ministry named in the video does not apply to MESH readers | Partly: `visas-for-family-and-visitors` line 352 says a visit visa does not allow work. No FAQ on it |
| Studying: Islamic University scholarships, apply online on the official site; mostly for male students | Official site https://iu.edu.sa (reachable). The admissions portal and the women's study options were not re-checked here | Yes: `applying-to-the-islamic-university`, `other-universities-in-madinah`, `studying-online-at-the-islamic-university`. Check that the women's options are stated clearly (the video's "mostly for men" is a lead, not a fact to publish) |

## Part 5: `hm0ttTn-rC0`

- URL: https://www.youtube.com/watch?v=hm0ttTn-rC0
- Title in English: "The cost of living in Madinah in 2026, and scams Indonesians should watch for (part 5, last)"
- Captions: not fetched; worked from the description (as of 18 October 2026).

| Fact stated (our words) | Official check | MESH covers it? |
|---|---|---|
| Two-bedroom flat from about 30,000 SAR a year | Not confirmed (market) | Yes, consistent with `cost-of-living` |
| Groceries for a family 800 to 1,000 SAR a month | Not confirmed (market) | Yes: `cost-of-living` budget says 2,000 for family groceries and household, a wider line |
| Electricity 200 to 300 SAR a month; internet and phone 300 to 400 | Not confirmed (market) | Yes: `cost-of-living` Bills section (electricity 100 to 800 by season, internet 250 to 300, mobile 100 to 150) |
| Petrol 91 at 2.18 SAR a litre (October 2026) | Partly. Aramco publishes the in-Kingdom prices at https://www.aramco.com/en/what-we-do/energy-products/retail-fuels but the page did not load here | Yes: 2.18 for 91 and 2.33 for 95 (November 2026) in `cost-of-living` and the driving guides |
| Private school 3,000 to 40,000 SAR a child a year, average about 9,000 | Not confirmed (private aggregator) | Yes: schools guide, 9,000 to 25,000 on the Saudi track, international more |
| Dependant fee 400 SAR a month per person; VAT 15%; no personal income tax | Dependant fee: see part 3. VAT 15% and no tax on salaries: well established ZATCA rules (not re-fetched) | Yes: dependant fee in `iqama-and-exit-reentry-fees`; VAT in transport lines; "No personal income tax" in the company guide only. `cost-of-living` could say it in one line |
| Total: about 13,000 SAR a month for a family of four, about 7,000 for one person | Not confirmed (an estimate) | Partly: `cost-of-living` gives 6,300 to 12,800 for a family and 2,900 to 6,700 single. The video's totals are higher because they assume a working family paying dependant fees and private school. Not a correction, but MESH's family line could note that dependant fees and school fees are on top for working families |
| Scam 1: someone selling a home with a promise of a sure profit or a sure residence permit | Supported: REGA's rules (zones, eligibility certificate on Saudi Properties, electronic payment only), https://saudiproperties.rega.gov.sa/ | Partly: the property guide's closing tip warns against paying a deposit on a promise of a zone. Nothing on "buy this and get residency" |
| Scam 2: job offers on an Umrah or visit visa | Supported: a visit visa does not allow work | Partly (line 352 of guides-2026.ts), no scam framing |
| Scam 3: borrowing a Saudi's name for a business (tasattur) | Confirmed, Ministry of Commerce (see part 3) | **No** |
| Scam 4: selling Hajj quota places or promising to jump the Hajj queue | Indonesian-specific (Indonesia's queue system). For MESH readers the general point holds: Hajj for residents is booked only through the official Nusuk Hajj platform | Check: grep found no Hajj-scam content. Low priority for MESH |
| Three safe steps: check official government sites, ask your own embassy or consulate, never pay into a personal account | Sound advice consistent with REGA's electronic-payment rule | Partly, scattered. A short scams FAQ would gather it |

## Ranked proposals for MESH

Before writing any of these, grep `src/server/seed/content/` again and claim the slug on issue 13.

1. **New guide: "Ways to live in Madinah for the long term"** (stage `getting-settled` or `before-you-come`). One page that compares the routes and sends readers to the detailed guides: study (Islamic University and other universities), work with a Saudi employer, a dependant visa on a family member's iqama, starting a company (the company guide), Premium Residency (limited, unlimited, real estate owner, investor, entrepreneur, talent), and what a visit visa does not allow (no work, 180 days at most). Premium Residency is the only part MESH does not already explain, so its section needs the official fees and conditions from https://sa.gov.sa/en/premium-residency (ask the owner to allow `sa.gov.sa`, `my.gov.sa` and `misa.gov.sa` in the session's network settings, or check from a session where they load). Keep the comparison table impartial: no advisers or agencies named.
2. **New FAQ: "Can I work in Saudi Arabia on a visit or Umrah visa?"** Short answer no, with what to do instead (a work visa through an employer, or a company), and a warning that offers to "convert" a visit visa into a job are a scam. Fully supported by what MESH already says.
3. **New FAQ or short guide section: "Common scams when moving to Madinah"**: property sold with a promised residency or a promised zone, jobs on visit visas, tasattur offers, and paying deposits into personal accounts. Each point links to the official route (Saudi Properties for property, Qiwa for work contracts, the Ministry of Commerce for businesses). Impartial, no names.
4. **Company guide: add a tasattur warning** (owner: web's area, `src/features/guides/company/`). The Ministry of Commerce penalties are confirmed (prison up to 5 years, fines up to 5 million SAR, closure, deportation and a ban on returning to work). Also check the levy figures still hold and mention that the levy no longer applies to licensed industrial establishments (December 2025). Message the owning agent on issue 13 rather than editing.
5. **Property guide: two small additions** (owner: lane E, `owning-property-as-a-non-saudi`). (a) The broker's default commission is 2.5% of the sale price unless agreed otherwise in writing (REGA Brokerage Law). (b) After "Ownership gives you no residency", one line that a qualifying home can make the owner eligible for the Real Estate Owner Premium Residency, once the threshold is checked officially. Message the owning agent on issue 13.
6. **Cost of living: one line for working families** (owner of `cost-of-living`): the family budget does not include the 400 SAR monthly dependant fee per family member or private school fees, and there is no tax on salaries (VAT 15% is in prices). Low priority.

Not proposed: Madinah vs Jakarta price comparisons, the celebrity angle of part 1, Indonesian Hajj quota rules, and the market price per square metre (no official source, and it dates fast).
