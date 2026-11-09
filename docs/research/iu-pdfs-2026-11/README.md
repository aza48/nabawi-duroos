# Official University PDFs from the students' forum (November 2026)

On 9 November 2026 the owner downloaded these PDFs, which had been posted in the IU students' Telegram forum (see `../telegram-iu-2026-11/README.md`, "What the owner can send next"). The desktop agent took over this part of the admin agent's work at the owner's request. Each PDF is read by its own reader into one findings file here, in the same format as the Telegram findings: facts tagged NEW, CONFIRMS or CONFLICTS against MESH's guides, plus ready-to-publish sections in MESH's voice.

Public text never names these files or where they came from.

## Files
| Source (in `sources/`, text in `text/`) | What it is | Findings file |
|---|---|---|
| `bachelor-admission-guide-scholarships.pdf` | Official: bachelor's admission guide for full and partial scholarship students (posted 10 May 2026) | `bachelor-admission-guide.md` |
| `postgraduate-admission-guide-1448.pdf`, `postgraduate-1446.pdf` | Official: postgraduate admission guide 1448 (posted 28 Oct 2026), and the 1446 document | `postgraduate-admission-1448.md` |
| not in the repo (70 MB): `دليل الطالب (1).pdf`, posted 8 Nov 2026; text in `text/student-system-guide.txt` | Guide to the University's study system, distance edition, made by the course interactivity supervisors (page 2: a student effort, not an official University document). Also on the owner's Google Drive, file id `1l_wPDaN_HJTBgReRIQngREdaX-I4Mt9c`; text again in `text/distance-study-system-handbook.txt` | `student-system-guide.md`, `distance-study-handbook.md` |
| `study-plan-quran-college-1448.pdf`, `study-plan-hadith-college-1448.pdf`, `hadith-college-programme-and-course-descriptions.pdf`, `study-plans-all-colleges-1448-student-compilation.pdf` | Official study plans for two colleges, the Hadith college's course descriptions, and a student's compilation of every college's plan | `study-plans-1448.md` |
| `student-discounts-deck.pdf`, `sports-club-leaflet.pdf` (scanned, no text layer) | Student discounts deck; the University sports club leaflet | `discounts-and-sports-club.md` |

Text was extracted with `pdftotext -layout -enc UTF-8`; Arabic comes out in presentation forms and some lines reversed, so readers check tables against the PDF pages.

## Not done (the owner asked to skip it on 9 November)
The Telegram periods 2024 (`c5`) and 2019 to 2023 (`c6`) and `SYNTHESIS.md` in `../telegram-iu-2026-11/` are not written. The owner said the export was already cleaned by the admin agent and to focus on gomedine.com and these PDFs instead.
