# MESH v2: where things stand

Last updated 7 November 2026 (27/5/1448).

## Done

**Plan 1: the new public site**
- New design: Warm Paper (light) and Madinah Night (dark), mobile first, installable on a phone home screen.
- Home: today in Madinah, WhatsApp group banner, today's duroos with live countdowns, prayer times, guides, latest updates.
- Duroos in English and Arabic: today, weekly schedule, every shaykh, every lesson, updates, livestreams.
- 45 verified lessons and 31 shuyukh moved from code into a real database.
- Ask and Guides sections, each ending with "Have a question? Post it in the MESH WhatsApp chat".
- Old links (forum questions, resources) redirect, so links already shared in WhatsApp keep working.
- One shared API for the website and the future phone app.

**Plan 2: the admin app**
- Invite-only admin accounts, required two-step sign-in, passkeys (Face ID or fingerprint).
- Roles: Owner, Editor, Duroos editor, Content editor.
- Inbox: cancel or change a dars in two taps; it shows on the site straight away.
- Editors for lessons, shuyukh, updates, answers, guides and the WhatsApp link.
- Activity feed with one-tap undo for every change.
- Security: login rate limits, strict security headers, admin hidden from search engines.

**Plan 3a: channel watcher (done, in shadow mode)**
- Reads the six Telegram channels; Gemini reads each new post and flyer. Clear cancellations from trusted channels publish themselves once a channel leaves shadow mode; everything else goes to the admin Inbox with Publish or Dismiss.
- "Live now": detects the Prophet's Mosque YouTube live stream and links to the exact broadcast.
- Watcher heartbeat warning in the Inbox; per-channel switches in Admin, More, Channels.
- 17 guides imported from the previous MESH site, plus a new "Study & university" section.
- Note: Google's free Gemini tier was overloaded (503) for most calls on 7 Nov. Failed posts are retried automatically; if it stays unreliable, move to a paid tier.

## Remaining before launch

### Plan 3b: notifications and more live signals
0. Use the channels' "live broadcast started" posts (بدأ البث المباشر) to mark each dars LIVE with its own link, without AI.

### Plan 3 (original list: items 1 to 6 are now done)
1. Channel watcher: read the public Telegram channels every few minutes.
2. AI reading of Arabic posts and flyer images, matched to the right lesson and date.
3. Hybrid publishing: trusted channels publish automatically, anything unsure goes to the admin inbox.
4. Two-week shadow mode before auto-publish is switched on.
5. Heartbeat: alert admins if the watcher stops; show "last checked" on the site.
6. "Live now" detection for YouTube and other broadcasts, with a link to the exact stream.
7. Phone push notifications (free), per shaykh or book.
8. Email alerts (Brevo) and a morning daily brief.
9. Calendar feeds that update themselves when a dars is cancelled.
10. Pages refresh the moment something changes.

### Plan 4: content, migration and launch
1. Move the live data across: email subscribers and their follows, admin announcements, any real forum questions (as draft answers).
2. Places and deals directory.
3. Events.
4. Arrival checklist for new students.
5. University (Jamiah) calendar.
6. Getting around: buses and transport.
7. Important numbers (works offline).
8. Share cards so links look good in WhatsApp.
9. Offline schedule.
10. "What students searched for but didn't find" list for admins.
11. Reminders when a guide or answer needs re-checking.
12. Monitoring, nightly backups, and a security scan.
13. Launch day: set Vercel settings, set up the live database, create the owner account, switch medinahub.org to the new site, announce in the WhatsApp group.

### Needed from people
- **Owner:** an Anthropic API key for the watcher (small monthly cost); a free Cloudflare account.
- **aza48 (Vercel):** before launch, either transfer the Vercel project to the owner or add the new settings; a read-only link to the live database for the data move; the Brevo email key.

## Feature brainstorm

Ideas for after launch, roughly in order of how much students would use them.

**Duroos and learning**
- Follow a shaykh or a book and get a push when it changes, ends or a new book starts.
- "My week": a personal schedule of only the duroos you follow.
- Progress tracker per book (which chapters have been covered), from the shaykh's channel.
- Recordings archive: link each lesson to its recordings on YouTube or Telegram, by date.
- Ramadan and Hajj modes with taraweeh, i'tikaf and seasonal lesson times.
- Map of the Haram doors and circles, so "Circle 2 between Bab Umar and Bab Uthman" is a pin.
- Arabic vocabulary sheet per book for students still learning Arabic.
- Notes: let students write private notes against a lesson (saved on their phone).

**Student life**
- Arrival checklist with progress saved on the phone.
- University calendar: exams, holidays, registration windows.
- Bus times from the university to the Haram and Quba.
- Places directory: English-speaking clinics, pharmacies, barbers, tailors, bookshops, phone shops, movers.
- Student deals with expiry dates.
- Cost-of-living guide: typical rent, groceries, transport.
- Family section: spouse visas, schools, women's classes, children's activities.
- Leaving checklist: exit visa, final paperwork, closing accounts.
- Important numbers that work offline.
- Weather and heat warnings in summer.

**Community, kept safe**
- Events calendar for MESH meet-ups and lectures.
- Volunteer board: help needed at events.
- "Ask in WhatsApp" buttons that pre-fill the question.
- Admin tool: paste a WhatsApp thread and get a draft answer.
- Monthly newsletter of new guides and answers.

**Admin power tools**
- Snap a flyer and have every field filled in.
- Scheduled publishing.
- Bulk changes: "Cancel all duroos on Eid day".
- Statistics: most-read guides, most-followed shuyukh, busiest times.
- Weekly report email to the owner.

**Reach**
- Native App Store and Play Store apps using the same API.
- Home-screen widgets for "next dars".
- Telegram bot that answers "what's on tonight?".
- Arabic version of more sections if Arabic speakers start using the site.
- Other cities later (Makkah) with the same system.
