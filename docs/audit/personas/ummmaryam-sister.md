# Usability audit: Umm Maryam (sister, mother of two, phone only)

Tested 7 November 2026 on https://medinahub.org, headless Edge, 390x844, touch, light and dark.
Screenshots and scripts: (a local working folder, not in the repo) (called SHOTS below).

## Verdict in one paragraph

The sisters' study guide and the programme cards are the best thing here for her: she gets a real answer in 2 to 3 taps. Everything else for a mother is thin or hard to reach: schools have one fee line, there is no paediatrician or hospital list outside childbirth and the discount offers, nothing at all on how sisters attend or listen to the Haram duroos, and the live video on the Live page showed "This video is unavailable". The /ask page is visibly broken on a phone (content wider than the screen). Search is fuzzy and noisy and misses "paediatrician", "pediatrician", "childcare" and "playground".

## Goals

### 1. Sisters study (Arabic, Qur'an, Islamic sciences): SUCCESS (with gaps)
- Path A: bottom nav Study (1 tap), scroll to "For sisters" (about 3 swipes), tap Markaz Mishkat (2 taps total). Page gives: free, one-off book fee, Qur'an and Arabic, morning classes, free nursery, children badge.
- Path B: Guides, Family life chip, "Where sisters can study..." (3 taps). Gives fee table, per-markaz nursery notes, bus, uniform, entry exams, what students say. Excellent content.
- Path C: search "sisters arabic" returns Study page and the sisters guide first (2 taps). Best path.
- Gaps: no phone, WhatsApp, address or map on the programme cards (Mishkat, Taibah, Ma'rifah). Class times are only "morning". Fee is "small book fee" for two of three, no number. The guide says "dates from December 2023" while the cards say "last checked July 2026", so she cannot tell which to trust. Nursery quality is only in the long guide ("very small, children mostly watch television" at Taibah), not on the card. Mishkat location says "Al-Aridh (Rabwah)" on the card but "Hayy Rabwa" in the guide. Fusha Academy shows "Madinah" as location, no area, no contact.
- Taps to useful answer: 2 to 3. Stuck: when she wants to actually enrol (no contact route except the MESH WhatsApp).

### 2. Kindergarten and school with fees: PARTIAL
- Path: search "kindergarten" (2 taps) or Guides, Family life, "Kindergartens and schools" (3 taps).
- Got: kindergarten from age 3, about 4,000 SAR a year, hours, what to bring, two school names (Al Aqeeq International, AlKhandaq). No school fees, no area, no phone, no map. The Discounts page lists Wahat Al-Salam Kindergarten 15% off, Bamzino Nursery, Creative Child Schools, Promising Future School (Qur'an) "4,000 instead of 6,000 SAR a semester". Those are only discounts, with no address or contact, and the discount list and the guide never link to each other.
- Search "school fees" returns the kindergarten guide first, then noise (driving licence, SIM card, business setup).
- Stuck: she cannot compare schools or find where they are. "Last verified 7 November 2026" is today's date on every guide, which makes the verified stamp feel automatic, not real.

### 3. Haram duroos: sisters' section, how to attend or listen live: FAILED
- Path tried: Duroos (bottom nav), a lesson page, a shaykh page, Live, FAQ, search "sisters section haram" and "women's section".
- Result: no duroos page, lesson page, schedule or FAQ says which duroos have a sisters' section, where the women's area is, or whether sisters can ask questions. Location lines are written for men ("Western side, left of those entering from Bab Quba (5)"). The FAQ "Do I need to register" says duroos are open to everyone, with no mention of sisters. Search "sisters section haram" returns the childbirth guide and the sisters study guide, not anything about duroos.
- Live: the Live page has one YouTube embed, which showed "This video is unavailable" at test time (late evening Madinah time, so possibly not on air, but an unavailable box with no explanation or fallback is still bad), plus 6 Telegram and other channel links with no description of what each is. A sister at home cannot tell which channel carries which shaykh. Each lesson page does say "Where it's broadcast: Video on YouTube", which is good.
- Stuck: complete dead end. Only route left is the WhatsApp group.

### 4. Doctors, hospitals, paediatrician, emergency numbers: PARTIAL
- Emergency numbers: SUCCESS. Search "emergency number" (2 taps) gives the guide first. 112, 997, 998, 937 listed, with "if unsure, call 112". Good. Numbers are plain text, so no one-tap call (not checked for tel: links in the rendered page, they did not appear as links in the text scan). Not linked from the home page. It sits under "Getting settled", not "Family life".
- Doctor and hospital: weak. Search "doctor" and "hospital" return the childbirth guide, then new-student steps, emergency numbers and the kindergarten guide, then discount entries. The only real health content is the discount list (about 11 hospitals and clinics with a percent off, no address, phone, hours, or whether there is a female doctor or paediatric ward) and the childbirth guide's doctor table.
- Paediatrician: FAILED. "paediatrician" and "pediatrician" both say "Nothing found". No guide for children's doctors, vaccinations, or what to do at night with a feverish child (937 is listed but not explained).

### 5. Kids' activities and family things to do: PARTIAL
- Path: search "kids activities" (2 to 3 taps; "Play areas" is the 3rd guide result and the first result is the WhatsApp group page, which is wrong) or Guides, Family life.
- Got: soft plays with prices (Kinetic 35, Poky 20, Peekboo 60), mall crèches, a garden, map links that all return 200. Written for toddlers (a 2 and a 3 year old). Nothing for a 7-year-old: no swimming, girls' sports, library, park times, Qur'an circles for kids with times. "Snowy Forest" has a name and a map link and no description at all. "Know a good place for older children? Share it" is a plea for content, not content.
- Search "playground" finds nothing.

### 6. Family visa and bringing mother: PARTIAL
- Path: search "visit visa for mother" (2 taps), first result is the right guide.
- Got: nationality-based visa types (UK, US, Europeans and Canadians), what an iqama adds, a tip to come on a visa first. The last section "University students' families" says go to student affairs "(Wihda 22)" and ask in the WhatsApp group, so her exact question is deferred.
- Missing: nothing about a family visit visa for relatives of a resident or student, what invitation is needed, medical insurance for visitors, how long a mother can stay, whether Absher or Nafath is involved. The word "mother" or "parents" does not appear on the page.

### 7. Giving birth: SUCCESS
- Path: search "giving birth" (2 taps) lands on the guide as first result. Table of who is allowed in, cost table by hospital, doctor recommendations with ticks, Uhud free for wives (own iqama needed). Strong, specific and honest ("Check first, April 2025"). The best-written guide for a mother.
- Gaps: no phone numbers or maps for hospitals (only one map link on the page), nothing about antenatal or postnatal care, nothing about registering the baby, birth certificate and passport (the very common next question).

## Friction list

| # | Sev | URL | Expected | Actual | Screenshot | Fix |
|---|-----|-----|----------|--------|------------|-----|
| 1 | High | /ask | FAQ list fits the screen | Page is 815px wide on a 390px phone. Search box and question rows are cut off on the right ("Can I open a Saudi bank account without an iqa", arrows hidden). | SHOTS/ask.png | Find the overflowing rows (li.shrink-0 and the full-width buttons measure 824 to 997px wide), add `min-w-0` to flex children, make only the chip row scroll sideways, and clip the wrapper. |
| 2 | High | /duroos, /duroos/lesson/*, /duroos/live | Sisters' section info per dars, and how to listen | None anywhere on the site | SHOTS/pg_duroos_live.png | Add a "Sisters" line to every lesson (women's area, gate, can sisters attend, can they ask). Add a "For sisters" block on /duroos and an FAQ "Can sisters attend the duroos?". |
| 3 | High | /duroos/live | Live video plays or a clear reason | YouTube box says "This video is unavailable", no message, no fallback | SHOTS/pg_duroos_live.png | Show "Not live now, next live at X" and a link to the channel. Add a one-line description under each channel (who, language, time). |
| 4 | High | search | "paediatrician", "pediatrician", "childcare", "playground" return something | All four return "Nothing found" | SHOTS/s12.png | Add synonyms: paediatrician, pediatrician, children's doctor to health; childcare, creche, daycare to nursery; playground, park, soft play to kids activities. Add a children's health guide. |
| 5 | High | whole site | WhatsApp float button not covering content | The round green button (about 56px) sits on the right edge over body text on almost every page, hiding line ends ("Contact the school before yo...", "free n..."), over the "Full calendar" link on home, and over the "See all results" row in the search panel | SHOTS/d2.png, SHOTS/s0.png, SHOTS/home.png | Shrink it and move it clear of text and the bottom nav, or collapse it to a small tab. Never overlay the search panel. |
| 6 | Med | /guides/sisters-studying-in-madinah | No sideways wiggle | Page is 396px wide, 6px wider than the screen (the table itself fits, 364px) | SHOTS/sis900.png | Find the element wider than the viewport (likely a link row or long word) and wrap it. |
| 7 | Med | all guides | Jump links on long pages | An "On this page" nav exists in the markup but is `display:none` on a phone. The sisters guide is 7,800px tall (about 9 screens) with no way to jump to Mishkat, Taibah, Nabawi. | SHOTS/sis900.png | Show a collapsible "Jump to" row on mobile for guides taller than 3 screens. |
| 8 | Med | guide pages | Reading space | Sticky header (about 64px) plus sticky "0 of 7 steps done" bar (about 70px) take about 16 percent of the screen. On the sisters guide the "7 steps" are not obviously steps (they are admission bullets and programme list items), so the widget confuses. | SHOTS/sis900.png, SHOTS/d2.png | Make the progress bar non-sticky, and only show it on true checklists. Remove it from the sisters guide. |
| 9 | Med | guide and programme pages | Content on the first screen | The hero plus a 4-line title fills nearly the whole first screen on the sisters guide, then the progress meter. No content without scrolling. | SHOTS/d2.png | Shrink the hero on mobile (smaller title, hide pattern or description). |
| 10 | Med | /guides/sisters-studying-in-madinah vs /programs/* | One source of truth | Guide says "dates from December 2023". Cards say "Last checked by MESH: July 2026". Mishkat: "Al-Aridh (Rabwah)" vs "Hayy Rabwa". Fusha card has no area. | SHOTS/pr_programs_mishkat.png | Re-verify, show one date, use the same location text in both. |
| 11 | Med | /programs, /programs/mishkat | Nursery visible on the card | A "Children" badge only. "Free nursery" is in the body text for Mishkat but not shown for Taibah or Ma'rifah. "Children" could mean classes for children (as at Fusha) or childcare. | SHOTS/pg_programs.png | Split into "Free nursery" and "Kids' classes" badges, and show them on the list card. |
| 12 | Med | /programs/* | Contact and map | No phone, WhatsApp, address or map on Mishkat, Taibah, Ma'rifah or Fusha cards. Maps are only inside the long guide. | SHOTS/pr_programs_mishkat.png | Add a Contact block (WhatsApp or phone, map pin, registration period) to every card. |
| 13 | Med | /guides/kindergartens-and-schools | Fees per school, areas | One fee line (4,000 SAR a year), two school names, no school fees, no map, no phone | SHOTS/pg_guides_kindergartens-and-schools.png | Make a table: school, area, age, fee per year, curriculum, hours, contact, map. Link to the matching discount entries. |
| 14 | Med | /guides/kids-activities | Complete entries | "Snowy Forest" is an empty entry. Everything is for ages 1 to 5. | SHOTS/pg_guides_kids-activities.png | Fill or delete the entry. Add 6 to 12 year olds. |
| 15 | Med | /guides/visas-for-family-and-visitors | Answer for a student's wife bringing her mother | Not covered. Only a pointer to "Wihda 22" and the WhatsApp group. | SHOTS/pg_guides_visas-for-family-and-visitors.png | Add a "Bringing your parents" section: invitation visit visa steps, insurance, length of stay, who sponsors. |
| 16 | Med | search | Relevant results only | "school fees" returns driving licence, SIM card, business setup after the first. "visit visa for mother" also returns graduation FAQ and "Can I drive". "kids activities" lists the WhatsApp group page first. Looks like OR matching on any word. | SHOTS/s4.png, SHOTS/s8.png | Rank title and phrase matches first, require all words when there are 2 or more, show at most 3 per group. |
| 17 | Low | header, all pages | Tap targets of at least 44px | Search icon 43x40, theme switch 40x40, filter chips on /guides, /discounts, /library 32 to 38px high, footer and "Today / Weekly schedule" links 18px high | audit output | Make every tap target at least 44x44, footer links at least 40px high. |
| 18 | Low | header | Readable subtitle | "MEDINA ENGLISH STUDENT HUB" is 8.5px | SHOTS/home.png | Raise to at least 11px or drop. |
| 19 | Low | /discounts, /ask | One number | Discounts page says "61 offers". FAQ answer says "over 100 offers". | SHOTS/d5.png | Pick one, generate it from the data. |
| 20 | Low | footer, all pages | Real contact number | Owner help line reads "+1 234 567 9076", which looks like a placeholder. If real, ignore. | SHOTS/txt_more.txt | Confirm the number. |
| 21 | Low | /guides/sisters-studying-in-madinah | Working official links | 3 gph.edu.sa links did not load from my test machine (could be a geo or bot block, unconfirmed). Twitter/X links gave 403 to a script, which is normal. | n/a | Check the 3 gph.edu.sa links by hand. |

## One-handed mobile use

- Bottom nav is good: 5 labelled items, clear active state, thumb-reachable. Library and Ask are not on the phone bar, only under More or search.
- Search and theme buttons are top right, the hardest place to reach one-handed on a big phone. Search is 43x40 and theme 40x40, both under 44.
- The WhatsApp float sits at the right edge, exactly where the right thumb rests, and it covers text and the search panel's "See all results" row (see #5).
- Text sizes: body copy is comfortable. Too small: header tagline 8.5px, "Ctrl K" hint 11px (useless on a phone), date tags "DEC" and "JAN" 10px, "Students named" tag 11px.
- Long pages with no jump on a phone: sisters guide 7,800px, discounts 10,200px, library 8,000px, guides list 7,150px, home 6,000px. Chips exist on /guides and /library (good) but are 32 to 38px high. The "On this page" menu is hidden on phones.
- Discounts: category chips wrap to 4 rows and push the first offer below the first screen. No map, address or phone per entry.
- Home: the first screen is the prayer arc (nice), but nothing on it helps a mother of two. The first "Coming up" content is far down. There are no quick links to Sisters, Family or Emergency on the home page.

## Dark mode

The toggle works in 1 tap, the choice is remembered after reload, and the icon swaps to a sun. Pages read well: light text on near-black, cards keep contrast, the gold accent is readable, tables and callouts keep their shape. Problems found by a contrast scan and by eye:
- White text on the WhatsApp green: about 2:1 on "Join on WhatsApp" and "Join the group" buttons (both modes). Use dark text or a darker green.
- Tagline is only 8.5px (colour fine, size too small).
- The embedded YouTube box is a black block in either mode.
No page became unreadable.

## Search (typed via the search icon, one finger)

| Query | Top results | What should have come back |
|-------|-------------|----------------------------|
| sisters arabic | Study in Madinah, sisters guide, birth guide, Arabic resources, postgrad, sisters FAQ | Good. Top two are right. Birth guide and postgrad are noise. |
| women classes | Study, birth guide, sisters guide, everyday apps, postgrad, FAQ | Sisters guide should be first. |
| quran for sisters | Study, birth guide, sisters guide, kindergarten, apps, visas, FAQ | Nabawi halaqat card and sisters guide first. |
| kindergarten | Kindergarten guide, 2 discount entries | Good. |
| school fees | Kindergarten guide, driving licence, sisters guide, SIM, business, discounts FAQ | First is right, the rest is noise. |
| doctor | Birth guide, new-student steps, emergency numbers, kindergarten, semester off, hospital discounts | A health page, or the hospital discounts, first. |
| hospital | Same as doctor | Same. |
| emergency number | Emergency numbers guide first | Good. |
| kids activities | WhatsApp group page, visas, play areas, kindergarten, cost of living, sports | Play areas first. |
| visit visa for mother | Visa guide first, then kindergarten, Umrah, new-student steps | Visa guide first is right, but it does not answer the mother question. |
| giving birth | Birth guide first, then driving, Ma'had, postgrad, transport | Good first result, rest is noise. |
| نساء | Study, birth guide, sisters guide, apps, postgrad, sisters FAQ | Works in Arabic, same noise as English. |
| paediatrician | Nothing found | Children's doctors or clinics. |
| pediatrician | Nothing found | Same. |
| nursery | Sisters guide, 3 marakiz, discount entries (Bamzino, Creative Child, then two hospitals) | Good, two hospitals are noise. |
| childcare | Nothing found | Marakiz with nursery, creches, Bamzino. |
| sisters section haram | Today's duroos, birth guide, sisters study guide, Rawdah, English duroos FAQ | Nothing exists. An honest "no info yet, ask here" would be better. |
| women's section | Birth guide, apps, semester off, postgrad, graduating, sisters FAQ | Same. |
| mother visa | Visa guide, business setup, semester off, new steps, play areas | Visa guide only. |
| playground | Nothing found | Play areas guide. |

Other notes: the panel works well on touch and groups results (Pages, Guides, Answers, Study programmes, Discounts). Weak matches fill every group, so the right answer is mixed with four wrong ones. The "Ctrl K" hint is useless on a phone. "Nothing found" says "ask in the WhatsApp group" but gives no button to do it.

## Content gaps for sisters and families

1. Haram duroos for sisters: women's areas, which duroos sisters can attend, gates, whether they can ask questions, how to listen at home (which channel carries which shaykh).
2. Children's health: paediatricians, women and children clinics, vaccinations, pharmacies, what to do at night with a sick child, insurance for visa families, how to use 937.
3. Schools: a list with fees, areas, curriculum, uniform, transport, mid-year places, girls-only and Qur'an schools.
4. Kids 6 to 12: activities, swimming, girls' sports, Qur'an circles for children with times, libraries, parks, school holiday ideas.
5. Bringing parents (visit visa for mother): steps, invitation, insurance, length of stay, Umrah and Rawdah for her, wheelchair services.
6. Mother and baby: antenatal care, birth certificate and passport for the baby, vaccinations, baby shops.
7. Women's practical life: women-only gyms (Eagle Club appears only in discounts), tailors, safe rides, abayas, women's sections in malls.
8. Sisters' support: the 1919 hotline is listed, but there is no sisters' community link and no named contact for sisters.
9. Real enrolment details: markaz registration dates, uniform, bus, waiting list.
10. A "Family" landing page: Family life has 4 guides, but there is no hub with these 7 goals as buttons.

## Useless or confusing elements (blunt)

- The sticky "0 of 7 steps done" bar on the sisters guide: not a checklist, eats space on every scroll, nobody will tick it. Remove it from guides that are not step-by-step.
- "Overview" is the only tab on programme pages: a single tab that never changes is a heading dressed as a tab.
- The home hero: the arc with crowded prayer names (Maghrib and Isha overlap) and a countdown takes the whole first screen. For a mother it is decoration. Put a "For sisters and families" row above "Coming up".
- "Next adhan (tomorrow)" countdown reads 6:19:24 with no label that it is hours, minutes, seconds. Easy to misread as a clock time.
- The exam countdown shows "22 days to go" and "21d 01h 07m 24s", the same thing twice.
- The "Join the group" link appears in the header (hidden on phone), hero, footer, end of pages and the float. Many places for one link.
- The "Ctrl K" hint has no use on a phone.
- "Verified" and "Last verified 7 November 2026" equal today's date on every guide, which looks automatic. Show a real last-checked date per fact.
- Live page channel names ("Khizanat al-'Ilm", "Duroos al-Madinah an-Nabawiyyah") come with no description.
- Discounts: a "Named for students" filter, then 7 category chips, then a search box, all before the first offer, for a list of 61.
- Footer: about 17 links repeated on every page, with Duroos links duplicated from the top tabs.

## Anything broken

1. /ask is wider than the phone (815px page, text and arrows cut off). See #1.
2. /guides/sisters-studying-in-madinah has a 6px horizontal overflow.
3. /duroos/live: the video embed shows "This video is unavailable".
4. 3 gph.edu.sa links did not load from the test machine (may be a test issue).
5. Tapping an FAQ question opens a separate page, so she leaves the list and loses her scroll position each time (not a bug, but friction).
6. /guides/what-it-costs gave a 404. I guessed that URL, it is not a link from the site, so it is not a bug. The real URL of "What it costs to live in Madinah" is worth checking.

## Top fixes in priority order

1. Fix /ask horizontal overflow.
2. Add a sisters section to the duroos pages, explain live listening, and fix the broken video box.
3. Fix search synonyms (paediatrician, childcare, playground) and the noisy tail.
4. Move the WhatsApp button so it never covers text or the search panel.
5. Add contact, map and nursery info to each sisters' programme card, and a schools table with fees.
