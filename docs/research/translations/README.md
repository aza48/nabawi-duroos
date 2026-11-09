# Arabic translations of the guides (AR3, akhiai)

Owner's top priority (9 November 2026): every guide in plain Modern Standard Arabic, checked against the English. Until AR1 (aiakhee's Arabic columns `title_ar`, `summary_ar`, `body_html_ar` and the seed fields) lands, the translations live here as `<slug>.ar.html`. Each file starts with a comment giving the slug, `title_ar`, `summary_ar` and the date of the English it was translated from, followed by the body HTML.

## Conventions (so AR2's rendering and aiakhee's glossary keep working)

- Same HTML structure as the English body: the same headings, the same number of `<ol>` steps in the same order (step ticks are counted by position), the same tables and callouts.
- Internal links point at the Arabic tree: `/ar/guides/<slug>` and `/ar/ask/<slug>`, with the Arabic title of the target as the link text. External links are unchanged.
- Callouts start with "نصيحة:" (Tip), "ملاحظة:" (Note) or "مهم:" (Important). `src/lib/guide-html.ts` detects the English words only today; aiakhee adds the Arabic ones with AR1.
- Terms are kept as the English guides spell them and as the site's Arabic UI already uses them: أبشر، نفاذ، هوية زائر، الإقامة، إيجار، اعتماد، مقيم، تواصل، المكافأة، رقم الحدود، العنوان الوطني، بطاقة مدى، الآيبان، النظام الأكاديمي، بلاك بورد، البريد السعودي، الجوازات، المطعم الجامعي، المركز الطبي الجامعي، الروضة الشريفة، نسك، قباء، حافلات المدينة، «ادرس في السعودية»، «منحتي».
- Numbers in prose use Arabic-Indic digits (٢٠٢٦، ٣٫٧٥ ريالات). Phone numbers, codes, web addresses and product names keep Western digits so they can be dialled or typed.
- House rules apply in Arabic too: no long dashes, no doubt words (قد، ربما، يُقال), no source wording, the Admin line reads "راسل الإدارة على واتساب على الرقم +1 234 567 9076".
- "Checked 9 November 2026" becomes "روجع في ٩ نوفمبر ٢٠٢٦".

## Status

| Batch | Slugs | State |
|---|---|---|
| 1, Start here | `applying-to-the-islamic-university`, `what-to-bring-to-madinah`, `first-30-days-in-madinah`, `new-student-steps`, `living-on-a-visitor-id`, `sim-internet-bank` | translated 9 Nov 2026, structure and links checked by script against the English |
| 2, most read | `cost-of-living`, `campus-life-islamic-university`, `masjid-an-nabawi-first-visit`, `umrah-rawdah-quba`, `finding-an-apartment` | translated 9 Nov 2026, checked by script |
| 3, getting around and papers | `getting-around`, `haramain-train-and-city-buses`, `doctors-hospitals-and-pharmacies`, `visas-for-family-and-visitors`, `scholarship-stipend-and-allowances` | translated 9 Nov 2026, checked by script |
| 4, University and the Haram | `women-at-masjid-an-nabawi`, `exams-results-and-attendance`, `university-offices-and-contacts`, `hajj-as-a-student`, `tajeel-and-itithaar` | translated 9 Nov 2026, checked by script |
| 5, papers and leaving | `phone-sims-and-absher`, `iqama-and-exit-reentry-fees`, `etimad-account`, `drivers-license`, `graduate-procedures` | next |
| 6 onwards | the rest, in the order of `docs/research/guides-2026-11/README.md` | |

## How to check a translation

Dump the English bodies with a small tsx script over `SEED_GUIDES` (see the AI-LOG log line of 9 Nov), then compare counts of `h2`, `h3`, `ol`, `ul`, `li`, `blockquote`, `table`, `tr` and `a`, the set of internal links (English `/guides/x` against Arabic `/ar/guides/x`), and grep for `[—–]` and "قد ".
