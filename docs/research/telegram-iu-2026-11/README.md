# Research from the IU students' Telegram forum (November 2026)

On 9 November 2026 the owner sent a full export of the Arabic Telegram supergroup "الملتقى الجامعي للجامعة الإسلامية || IU", the big open forum of Islamic University students. The admin agent (the owner's own agent) is distilling it. The files here keep only durable, useful facts, written in English for MESH. They contain no private names or phone numbers. Public text never names this group.

## The export
- One `result.json` (Telegram Desktop export), 208 MB, from a LimeWire link the owner sent. It is not in the repo.
- 478,122 messages, from 2 December 2015 to 9 November 2026, 18:35 (Riyadh). It runs right up to the day it was sent, so nothing is missing at the end.
- Messages per year: 2016: 29k, 2017: 36k, 2018: 48k, 2019: 62k, 2020: 49k, 2021: 44k, 2022: 56k, 2023: 36k, 2024: 31k, 2025: 41k, 2026: 30k.
- **Files were not exported**, only their names (Telegram's export setting "files" was off). 1,335 PDFs and 21,459 photos are missing. The PDFs worth exporting are listed under "What the owner can send next".

## How it was read
1. `prep/prep.py`: flattens each message to one line (date, id, forward source, text, and the start of the message it replies to). Drops service messages, stickers and lines under 20 characters.
2. `prep/filt.py`: drops dhikr forwards, questions about individual professors' exams, "message me privately" lines, thanks and du'a replies, and exact repeats (adverts and the calendar a bot reposted 157 times).
3. `prep/filt2.py`: keeps lines of 60+ characters, and shorter answers only when they reply to a question.
4. 2024 to 2026 were read in full after filtering. 2015 to 2023 were read as long posts only (300+ characters: announcements, notices, long answers), because their short chatter is superseded by newer messages.
5. Seven reader agents, one per period. Each one reads every line of its slice and writes one findings file, tagging every fact NEW, CONFIRMS or CONFLICTS against the MESH guides.

To rebuild from scratch (if the container is gone): download the file with `prep/lwdl.js` (Playwright, the link and key are in the owner's message of 9 Nov), then run `python3 -I prep/prep.py result.json tg`, `python3 -I prep/filt.py tg tgf` and `python3 -I prep/filt2.py tgf tgf2`, and rebuild the chunks as listed below.

## Files
| File | Period | Input |
|---|---|---|
| `c1-2026-08-to-11.md` | Aug to 9 Nov 2026, the start of 1448 | every filtered line |
| `c2-2026-01-to-07.md` | Jan to Jul 2026 | every filtered line |
| `c3-2025-08-to-12.md` | Aug to Dec 2025 | every filtered line |
| `c4-2025-01-to-07.md` | Jan to Jul 2025 | every filtered line |
| `c5-2024.md` | 2024 | every filtered line |
| `c6-2019-to-2023-long.md` | 2019 to 2023 | long posts only |
| `c7-2015-to-2018-long.md` | Dec 2015 to 2018 | long posts only |
| `SYNTHESIS.md` | all periods | the merged, latest state per topic, conflicts with MESH, and the guide plan (written last) |

## What the owner can send next
Export the same group again with files switched on (Telegram Desktop, Export chat history, tick "Files"; a date range is fine), or forward just these official PDFs. Each one would let MESH state rules with authority:
- `دليل_القبول_لمرحلة_البكالوريوس_لطلاب_المنح_الدراسية_الكاملة_والمنح.pdf` (posted 10 May 2026, message 607105): the admission guide for scholarship students.
- `دليل_القبول_في_برامج_الدراسات_العليا_للعام_الجامعي_1448_هـ.pdf` (28 Oct 2026, message 630048): postgraduate admission 1448.
- `دليل الطالب (1).pdf` (8 Nov 2026, message 630898) and `دليل_الطالب_الجامعي_الإصدار_الثاني.pdf` (17 Jan 2024, message 501880): the student handbook.
- `قواعد السلوك والإنضباط الطلابي 44.pdf` (12 Sep 2025, message 574739): the student conduct rules.
- `لائحة_الدراسة_والاختبارات_وقواعدها_التنفيذية_1444.pdf` (4 Mar 2023, message 444769): the study and exams regulation.
- The four postgraduate documents posted on 12 Sep 2025 (messages 574740 to 574745): the financial regulation, the handbook, the national regulation and the appeals rules.
