# Local crawl, 9 November 2026 (cloud agent 2)

The live site is blocked from the cloud container, so the production build (`MESH_LOCAL_DB=1 next build`, branch `claude/stoic-curie-w1ar9c` at 7d540de, equal to `main` ec2a8d8 plus docs) was started locally and every sitemap URL (320) was loaded in Chromium at 390 x 844 and 1440 x 900.

## Clean
- 640 of 640 loads returned 200.
- No page scrolls sideways at 390 px or 1440 px.
- Every page has exactly one h1.
- Every /ar page has lang="ar" and dir="rtl"; every English page has lang="en".
- No images without alt text and no broken images.
- No script errors other than the one below.

## Found
| # | Problem | Where | Fix | Status |
|---|---|---|---|---|
| 1 | Long dashes in book titles (raw Drive file names: "الميسر في غريب القرآن – الجزء الأول", and "علم-مقاصد-الشارع-–-أ.د.-..." written with hyphens for spaces) | /library/arabic, /library/sharia and their /ar twins | `cleanTitle` turns long dashes into a comma (Arabic comma in Arabic titles) and hyphen-joined Arabic names into words, keeping a leading number such as "7-الماتريدية" | done (this branch) |
| 2 | Two lessons share one title, "Lessons in Aqeedah with al-Ghamidi, Maghrib" (and the Arabic one) | /duroos/lesson/quba-ghamidi-aqidah and quba-ghamidi-aqidah2 | Name the book or the weekday in the title so the two differ (duroos data, owner or content agent) | todo |
| 3 | /api/v1/weather returns 503 and logs a console error on /, /duroos and /ar/duroos | weather card | Expected offline (the container has no internet). Check on production that the card hides quietly when the weather source fails | check live |
