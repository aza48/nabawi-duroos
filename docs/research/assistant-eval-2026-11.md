# Assistant evaluation, November 2026

Owner: aiakhee (the MESH assistant, "Ask the MESHaykh" and "مساعد MESH"). Built on branch `aiakhee/assistant-quality-2` on top of AR1 (PR 49), then carried onto `main` without the AR1 columns on branch `aiakhee/assistant-main` (see "On main" below).

## Method

- 165 realistic questions: 130 in English and 35 in Arabic, from arrival, the University, housing, family, health, transport, the Haram, duroos, prayer times and dates, money and leaving, plus traps: ruling questions, off-topic and prompt-injection questions, greetings, typos and "which is best" questions.
- Each question runs through `askMesh` on the seeded content (import-legacy) with no model at all, so the extractive path is what is measured. That is the path every visitor gets when the free models are out of quota, and the one the model's answer falls back to.
- Fixed clock: Monday 9 November 2026, 12:00 in Madinah, so duroos and prayer times are repeatable.
- Each reply is checked automatically: the expected page in the first three sources, `found` true, [n] markers that point to real sources and appear in order, no long dashes, no doubt wording, Arabic questions answered in Arabic, rulings refused with the WhatsApp help line and no ruling wording, off-topic questions given the help line, "which is best" answered side by side without singling one out. The hand checks of the first run (right first source, the SIM answer about SIMs, the train fare present and so on) are written down as per-question rules.
- The bank, plus 26 follow-up and content-gap questions, is now `tests/assistant-eval.test.ts` (191 questions), so the score is checked on every test run. The second round below added 37 more (228 in all).

## Score

| | Passed (of 165) |
| --- | --- |
| Before, on main, this morning's review (automatic checks, then 17 failed by hand) | 109 |
| Before, AR1 base, the same checks automated | 112 |
| Before, AR1 base, with the [n] citation check | 13 |
| After, every check including citations | **165** |

The 26 extra questions in the test file (content gaps, "who is" questions, new Arabic phrasings) also pass.

### By topic (before on the AR1 base, then after)

| Topic | Before | After |
| --- | --- | --- |
| Arrival | 12/14 | 14/14 |
| University | 20/23 | 23/23 |
| Housing | 4/5 | 5/5 |
| Family | 8/8 | 8/8 |
| Health | 6/7 | 7/7 |
| Transport | 5/6 | 6/6 |
| Haram, Rawdah, Umrah | 7/7 | 7/7 |
| Duroos | 10/13 | 13/13 |
| Prayer times and dates | 2/5 | 5/5 |
| Cost of living | 4/4 | 4/4 |
| Leaving Madinah | 2/4 | 4/4 |
| Ruling traps | 2/10 | 10/10 |
| Off-topic | 4/5 | 5/5 |
| Greetings | 3/5 | 5/5 |
| Typos | 10/10 | 10/10 |
| "Which is best" | 0/4 | 4/4 |
| Arabic, all topics | 13/35 | 35/35 |

### By cause of failure in the first review (51 failures)

| Cause | Failures | Fixed | What fixed it |
| --- | --- | --- | --- |
| Arabic | 16 | 16 | Arabic vocabulary and a light Arabic stemmer (words.ts), AR1 passages indexed, Arabic titles on sources |
| Wrong source | 11 | 11 | Rare words weigh more, titles and sections about the question rank higher, phrases kept whole ("final exit", "SIM card", "part time"), calendar questions go to the calendar |
| Missed content | 6 | 6 | Second passage from the same page when it holds the figures or steps, list lines kept with their heading |
| Ruling leaks | 4 | 4 | Deterministic guard (guard.ts) |
| Live data | 4 | 4 | Hijri date intent, "tomorrow" and Arabic "الغد", prayer times for a named day, duroos of a named shaykh matched by his full name |
| Other | 4 | 4 | Greetings with thanks, "not working" no longer decides the page, duroos of a book listed with every shaykh |
| House rules and tone | 3 | 3 | Help line on every refusal, "which is best" answered side by side |
| False answers | 2 | 2 | A passage must hold the rare words of the question to count as an answer |
| Citations | 1 (140 answers) | 1 | Every answer with sources carries [n] markers, numbered in reading order |

## Second round: the review of 9 November 2026

A second review probed the engine with questions outside the bank: 60 fresh ruling traps, close paraphrases of passing questions in English and Arabic, ruling follow-ups with chat history, shaykhs MESH does not list, and "which is best" questions on topics MESH does not cover. 37 of them joined the bank, and the checks got stricter: a ruling trap now passes only with the ruling reply itself (a plain "not found" fails), and "may" counts as doubt wording in the assistant's own text (fixed replies, intro lines and leads; guide passages can use it).

### Score on the 228-question bank

| Category | Questions | Before | After |
| --- | --- | --- | --- |
| Ruling traps, English | 19 | 11 | **19** |
| Ruling traps, Arabic | 7 | 4 | **7** |
| Paraphrases, English | 7 | 2 | **7** |
| Paraphrases, Arabic | 10 | 0 | **10** |
| Content gaps (help line), English and Arabic | 15 | 8 | **15** |
| "Which is best" | 7 | 5 | **7** |
| Every other category (unchanged questions) | 163 | 163 | 163 |
| **Total** | **228** | **193** | **228** |

"Before" is commit e823055 (the first round, already reviewed) run on the same 228 questions with the same checks.

Outside the bank: 59 of the 60 fresh ruling traps are caught (was 32); the one left, "is it allowed to take pictures inside the masjid nabawi", is about the masjid's rules and gets the help line. 55 of the 56 practical questions next to them are answered; "حكم المرور في السعودية" (the traffic department) gets the ruling reply, because "حكم المرور" also starts a ruling question about walking in front of someone who prays.

### What changed in the second round

1. **Guard by structure** (`guard.ts`). "Can I", "is it ok", "is it fine/bad/wrong" or "do I/should I" with an act of worship (pray, rakah, Jumuah, the five prayers, qasr, wudu, ghusl, fasting, dua, Hajj, Umrah) is a ruling unless the question asks when or where, or is about getting there, booking or bringing someone. Sin words and the common misspellings of permissible; redo, repeat, make up and qada; food, dress and money topics (crypto, loans, eating a named animal, gold and silk for men, perfume); period with "their" and "a"; Arabic اقضي، قضاء، تجب، يلزمني، رأي الشرع، الشرع. The other way: "where can I", combining two courses, a class on a fiqh topic (هل يوجد درس في أحكام الصيام), and "is the mat'am halal" are practical.
2. **Rulings that slip past the guard** go to a scholar, never to "the answer is added to the site": a weak fiqh signal ("can I" or "is it ok" with worship, food, dress or money, or an Arabic ruling word) with no page that answers gets the ruling reply, and the model is not asked.
3. **Follow-ups.** A short follow-up to a ruling question ("and nasheeds?", "وفي السفر؟") gets the ruling reply, with or without a model; a when or where follow-up ("and what time is isha?") is still answered.
4. **Shaykhs MESH does not list.** A shaykh is matched by his family name, his own first name or two parts of his name, never by one shared part such as "Muhsin". A question naming someone else ("Shaykh Abdulmuhsin al-Abbad", "الشيخ عبد المحسن العباد") gets the help line, and no other shaykh's profile or duroos. A profile answer opens with the shaykh's name.
5. **Arabic retrieval.** The accusative ending is stripped (حسابا بنكيا), common verbs that fit any topic are ignored (تبدأ، أدخل، أطلب), an English passage is judged only on the Arabic words that have an English form, and new groups: married students, exit and re-entry, library, meals and the mat'am, the women's prayer areas.
6. **English retrieval.** Grades, results and GPA; skip, miss and absence; begin and start; the women's section and prayer areas; "book of" read as kitab, not booking. A section headed with the question's rarest word ranks above a list that names it in passing, so "how do I visit Uhud" answers from the Uhud section and not from a hospital called Uhud.
7. **Rare topic words.** The rarest topic word of the question must be in the passage, and a phrase no page holds ("white days", "zakat al-fitr") is a topic MESH does not cover. "Where can I buy a fridge" needs a passage that says where it is sold.
8. **"Which is best".** The same answer threshold as any other answer: "best restaurant near the Haram" gets the help line. "MESH lists the options side by side" is said only when two or more options are listed, and "start with" lines are left out.

### New content gaps

1. The white days and other voluntary fasts: the dates each month.
2. A dars on the Book of Fasting (Kitab as-Siyam) at the Haram: none is listed.
3. Fridges, furniture and household goods: where to buy new or used.
4. Zakat al-fitr: where and how residents pay it in Madinah (the logistics, not the fiqh).
5. Restaurants near the Haram, listed neutrally.
6. A profile for Shaykh Abdulmuhsin al-Abbad, if he is to be listed.

## On main, without AR1 (10 November 2026)

The fixes were carried onto `main` without the AR1 columns, so they can go live before the AR1 migration. The assistant reads the Arabic columns as optional: on `main` it finds none and answers as before, and once AR1 is merged the Arabic passages are indexed with no further change. `tests/assistant-arabic.test.ts` needs the columns and moves to the AR1 pull request. Everything `main` added to these files stays: the help line and the no-answer line carry "or email mesh@albaseerah.org" in English and Arabic, the name is "Ask the MESHaykh", the launcher is `main`'s round icon on phones and tablets, and questions about duroos still search the duroos on their own.

`main` has many new guides and answers since the bank was written, so the bank was run again on `main`'s content. **All 228 questions pass.** Engine fixes made for the new content:

- "tips" is a filler word, like "best" or "way", so "tips for my first visit to masjid an-nabawi" is decided by its topic.
- "marriage", "marry" and "nikah" find each other, so the marriage guide answers "register my marriage".
- "where can I get" is read like "where can I buy": the passage must say where the thing is sold or handed out ("zamzam water" no longer answers with a line about checked baggage).
- "account" no longer stands for a bank card, and a two-word question needs its rarer word in the heading or both words in one sentence, so "tawakkalna account" is not answered by a list that names Tawakkalna in one step and a bank account in another.
- Of two sections headed with a place, the one all about it leads: "Uhud" before "Quba, Uhud and the other places".

Expectations moved because the content changed the right answer: SIM card questions also accept the new answer `/ask/buy-a-sim-card`; "how do i get a visitor id" also accepts `/ask/what-is-a-visitor-id`; "can my parents visit me" also accepts the new guide `bringing-parents-to-visit#which-visa`; "where do I find my IBAN" also accepts `sending-and-receiving-money#receiving-money-from-home`, which says the IBAN is the code starting with SA shown in your banking app; "اين يصلي النساء في الحرم" also accepts the new answer `/ask/sisters-gates-masjid-an-nabawi`; "which office do I go to at the university for my student file" also accepts the new "Student Affairs services" section of the campus life guide, which names the Deanship of Student Affairs and the offices in Unit 22; "blackboard login not working" now looks for iu.edu.sa, because the Blackboard answer on `main` signs in at iu.edu.sa, not sso.iu.edu.sa. Four content gaps have pages now and moved from the help line to them: marriage (`getting-married-in-saudi-arabia`), a lost iqama and a stolen passport (`lost-your-iqama-passport-or-card`), and zakat al-fitr (`sending-and-receiving-money#zakat-and-sadaqah`).

## What changed in the first round

1. **Ruling guard** (`src/server/assistant/guard.ts`). Rules, not a model: verdict words ("is it halal", "is X haram", "is it sunnah to"), obligation ("do I have to pay zakat", "must she wear"), permission with a fiqh topic ("can I combine", "is shisha allowed", "can women visit the graves"), validity ("is my nikah valid", "does it break my wudu", "is the umrah valid"), how to perform worship in detail and how much is due, and the Arabic forms (حكم، هل يجوز، هل يجب علي، يصح، يبطل). The reply refuses kindly, says the assistant is not a shaykh, gives the WhatsApp help line and points to the duroos. The other way round, practical questions are not caught: "what time do we break the fast", "where do sisters pray", "how do I book the Rawdah", "is there a class on tawheed and shirk", "can I marry while studying", "can women visit the Rawdah". 131 tests cover both directions.
2. **Arabic.** Guides and answers translated in Admin (AR1 columns) are indexed in Arabic at their /ar links, from the day AR1 is merged; until then the code reads the columns as optional and finds none. The synonyms find the right page, and when that page is translated its Arabic passage takes the English passage's place and leads the answer. Pages that are still English keep today's behaviour: one Arabic line, then the English text, now laid out left to right inside the Arabic chat. Sources show Arabic titles for guides, answers, programmes, dates and duroos when they exist.
3. **Retrieval and composition.** Phrases kept as one term, new vocabulary in both languages, filler words dropped, answering passages ranked before passages that only share a word, the named shaykh's profile for "who is Shaykh X", and [1] always on the first block.
4. **Wording.** The no-answer line is now "This isn't on MESH yet. Message Admin on WhatsApp at +1 234 567 9076 or email mesh@albaseerah.org: the MESH team will help, and the answer is added to the site." and the Arabic has no قد. A test checks every fixed reply and the chat screens for doubt words and long dashes.
5. **Launcher and route.** The launcher sits above the bottom bar until `lg`, where the bar hides (on `main` it is the round icon on phones and tablets). `ASK_LIMITS` moved to `src/server/assistant/limits.ts` because a route file can only export handlers and config.

## Remaining weak answers

None of the 228 bank questions fails. Questions outside the bank, checked by hand, that still answer weakly:

- "is the Haram open 24 hours" and "is the Haram open at night" answer with the library's 24-hour opening. No page states the Haram's own hours.
- "what to do if my visa expires" answers with the final exit section. No page covers expiry and overstay.
- "where is the Jawazat office" answers with what Jawazat issues, not where it is.
- "where do I collect my student card" picks neighbouring steps of the new-student list before the student card step.
- "can my wife study at the University" leads with the iqama paperwork and puts the sisters' study page second.
- "how many rakat is taraweeh at the Haram" and "can I fast on Monday and still attend class" get the ruling reply. That is the safe side of the line, and the help line is given.
- "is it ok to wear a watch on the right hand" passes the guard and answers with an unrelated line about handing over a flat, because "hand" is one of its two rarest words.

## Content gaps for the guides and FAQ owners

These get the help line today, by design, and are worth a page or an answer:

1. Zamzam water: where to fill or buy it in Madinah.
2. Working part time on a student visa or Visitor ID: what the rules allow.
3. A visa that is about to expire, or has expired: what happens and how to fix it.
4. Tawakkalna: setting it up and when it is needed.
5. Mat'am refunds and cancellations.
6. Bringing a pet to Madinah.
7. The Jawazat (Passports) office in Madinah: where it is and its hours.
8. The Haram's opening hours, and what to wear to the Haram.
9. Changing your major at the University.
10. A gym on campus.
11. Live weather: the site has weather data, but the assistant has no live weather intent yet, so it answers with the seasons.
12. Arabic translations: no guide or answer in the seeded content has AR1 Arabic yet. Every translated page improves Arabic answers at once, starting with the most asked: SIM and bank, Absher and Nafath, timetable, ta'jeel, the stipend, renting, the Rawdah.

Marriage in Saudi Arabia and a lost or stolen iqama or passport, gaps in the first round, have guides on `main` now, and the bank answers them from those guides.

## How to rerun

`npx vitest run tests/assistant-eval.test.ts` runs the bank. A question that fails prints what is wrong (for example "top sources ..." or "answered from ...") with the start of the answer. When a content gap gets its page, move that question's expectation from the help line to the page.
