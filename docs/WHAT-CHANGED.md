# What changed on MESH, in plain words (8 November 2026)

Two Claude sessions worked from a full review of the site. Everything below is live on medinahub.org.

## Things students will notice

1. **Wrong "LIVE NOW" badges are gone.** A dars only shows as live from the iqamah until the next adhan. Before, two Maghrib duroos still said LIVE more than an hour after Isha.
2. **Cancellations stick.** If a dars is cancelled for a week and a note or new book is added in that week, the card no longer flips back to "ON".
3. **Isha in Ramadan is right.** Isha is Maghrib plus 120 minutes in Ramadan, 90 minutes otherwise. Every after-Isha time, countdown and calendar entry follows.
4. **Duroos with no confirmed time say so.** Three lessons (two at al-Balawi, one at Dar al-Hijrah) used to show a precise adhan time, a countdown and a calendar event that were guesses. They now say "Evening, time not confirmed" and have no countdown, badge or calendar event.
5. **Lesson pages show more.** The book sequence of a rotating dars (for example Zad al-Mustaqni, then Bulugh al-Maram), the "continuing after Isha" notes and any short note are now on the page.
6. **Paused and finished duroos look paused and finished**, with a banner, instead of looking like they run today.
7. **The home page no longer jumps** while loading, and dates refresh after midnight even if the page was cached.
8. **Arabic works properly.** Arabic 404 pages, Arabic search at /ar/search, search results open the Arabic page, Arabic text on the library page and in the guide progress bar, and headings have proper line spacing.
9. **Search is easier to use**, with the keyboard and with a screen reader: Escape closes it, focus returns where you were, results are announced. The results page uses the full width on a laptop.
10. **Guides fit on a phone** (no sideways scrolling) and the "Alert me" button tells you when notifications are blocked instead of failing silently. Calendar buttons offer a link that works on Android too.
11. **Library book titles are clean**, not raw file names like "merged" or "Emailing".
12. **Colours and tap targets** pass accessibility checks: visible focus ring on green bands, readable small text, 40 pixel buttons.

## Things that protect the site

13. **The Telegram watcher is stricter before it publishes on its own.** It now checks the date written in the post against the AI's reading, checks the weekday, makes sure the shaykh is clearly named (several shuyukh share a family name), and never publishes a picture-only post. Anything unclear goes to your admin inbox with the reason.
14. **Live-stream buttons only come from trusted channels** and only point at YouTube, Mixlr or a Telegram live stream.
15. **No AI wording reaches the public.** When the watcher auto-publishes, the card shows only the status and date, not the AI's sentence.
16. **The public data feed (the API) hides internal fields** such as source links and research notes, and is now ready for a future phone app (documented in docs/API.md).
17. **Re-running the seed can no longer overwrite your edits** in the live database.
18. **Passkey admins must use their passkey**; a password alone no longer signs them in.
19. **Push alerts**: junk subscriptions are rejected and cleaned up, sends go out in batches, and one address can only subscribe ten times in ten minutes.
20. **Visitor statistics**: one address can send at most 120 events a minute, and the housekeeping (table creation, deleting data older than six months) runs in the nightly job, not while a visitor is browsing.
21. **Undo in Admin can't run twice** and web address fields refuse unsafe links.
22. **The watcher never overruns its time limit** and backs off for 30 minutes when the AI quota is used up.

## Admin improvements

23. **Publishing a cancellation, postponement or resumption also updates the schedule.** The update form has a "Dars" field. Pick the dars and the date, and the dars card, the calendar feed and the Updates page all change together.
24. **Source switches are recorded** in the activity log.

## Search engines

25. Reciprocal English and Arabic links on every page, a cleaner sitemap (310 pages instead of about 2,000), structured data that Google still supports, and brand colours in the app icons.

## What is still open (for the next session)

- A real privacy page at /privacy.
- New guides: living on a Visitor ID, campus practicals (buses, mat'am, clinic), women's gates and sections at the Haram.
- Arabic versions of the guides and FAQs, an Arabic Ma'had page and an Arabic home page.

## What only you can do (needs the live database or Vercel)

1. Fix al-Qasim's book-change note (English says 22 November, Arabic says 8 November) in Admin.
2. Edit or archive the two placeholder updates ("~24/4/1448", "a day in early 5/1448 AH") in Admin > Updates.
3. Run `npm run content:sync -- --only=finding-an-apartment` to publish the corrected Ejar sentence.
4. Answer the open questions in Admin > More > Questions for you (al-Badr's Tafsir days, "Wihda 22" or "Maktab 22", the footer line about Western students).
5. Add the Supabase certificate to Vercel as `DATABASE_CA` so the database connection can verify it.
6. If you edit the time label of the three "time not confirmed" lessons, keep the word "Evening" or "time not confirmed", or the guessed adhan time comes back.
7. Optional: a Vercel Firewall rate limit on /api/v1/track and /api/v1/push/subscribe for a hard ceiling.
