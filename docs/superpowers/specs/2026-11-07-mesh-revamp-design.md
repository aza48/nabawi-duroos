# MESH v2 — Complete Revamp Design

**Date:** 2026-11-07 (27/5/1448)
**Owner:** Muhaymin (site owner) · original code by aza48
**Status:** Draft for owner approval

---

## 1. Intent — why this exists

MESH (Medina English Student Hub) is the central hub, run by students, for
English-speaking (mostly Western) students in Madinah. It should assist with
**all of Madinah and Jāmiʿah life**: the duroos of the mashāyikh and their live
schedules, settling-in guides, the common questions every new student asks,
discounts and shopping, family life, and events.

The community already lives in the **MESH WhatsApp group** — that is where
everyday conversation happens. The website is the opposite half of the pair:

> **WhatsApp is where things happen. The website is where things are kept.**

Group messages scroll away and the same questions get asked every week. The
website holds the verified answer permanently, keeps the duroos schedule
correct to the minute, and sends everyone back into the WhatsApp group.

The owner's bar: *the most powerful, most beautiful, most up-to-date resource
for Western students in Madinah* — for visitors **and** for admins — with very
strong security and excellent ease of use, **mobile-first** because almost
everyone is on a phone.

### What's wrong today (from a full read of the current code)

| Problem | Where | Effect |
|---|---|---|
| "Today" is hard-coded to Tuesday | `src/components/views.tsx:71` `TODAY = 2` | Live site shows Tuesday's lessons every day |
| Whole schedule + announcements are source code | `src/data/lessons.ts`, `src/data/announcements.ts` | Every cancellation or lecture needs a developer commit |
| Duroos is one client-side page with in-memory view state | `src/app/(duroos)/duroos/page.tsx` | No shareable links, no SEO per lesson/shaykh, skeleton flash on load |
| Forum is empty — homepage is all "Sample" posts | MESH home | Competes with WhatsApp and lost |
| Two unrelated admin systems | `/admin` (one shared password) + `/mesh/admin` (roles) | Confusing, inconsistent |
| Shared admin password; cookie = fixed hash of it, never rotates; no login rate limit | `src/lib/adminAuth.ts`, `src/middleware.ts` | Weak security; one leak = permanent access |
| Schema built by `CREATE/ALTER … IF NOT EXISTS` on every cold start | `src/lib/db.ts`, `src/lib/mesh-db.ts` | No migration history, slow cold starts, fragile |
| Images stored as base64 data URIs in Postgres | announcements `image`, article `banner` | Heavy DB, slow pages, no resizing |
| Telegram polling pipeline described but not deployed | README; no `.github/workflows/` | Nothing is actually automatic |
| Two visual languages (dark Vercel-style MESH vs cream Duroos) | `mesh.css`, `globals.css` | Feels like two different sites |

### What's worth keeping

- The **verified schedule data**: lessons, locations, books, sequences, shaykh
  profiles and portraits (`src/data/lessons.ts`, `profiles.ts`, `streams.ts`,
  `events.ts`, `public/images/*`). Evidence-based, carefully sourced.
- **Hijri/Umm al-Qura date helpers** and the bracketed absolute-date rule
  (`src/lib/dates.ts`).
- **Brevo email** sending, double opt-in, per-shaykh/per-book subscriptions,
  one-click unsubscribe.
- The **editorial rules** in `CONTRIBUTING.md` (evidence-based data, no Telegram
  accounts, يعتذر → "excused himself", absolute Hijri dates) — except rule 3,
  which this design deliberately changes (see §5.3).
- SEO groundwork: canonical `medinahub.org`, sitemap, JSON-LD, IndexNow,
  Google Search Console verification file.

---

## 2. Goals, non-goals, anti-goals

### Goals
1. **Always correct, always fresh.** Duroos changes announced on trusted
   channels appear on the site within minutes, without a human.
2. **WhatsApp is the front door.** Every screen drives people into the MESH
   group; every "I have a question" path ends there.
3. **Admins can do anything from a phone in under a minute** — post a
   cancellation, publish a lecture with flyer, turn a WhatsApp thread into a
   saved Q&A, add a deal.
4. **Mobile-first, fast, installable.** Feels like an app; works on slow data;
   schedule readable offline.
5. **Very strong security** for the admin side; nothing a visitor can break.
6. **Free to run** (beyond small AI usage) on the existing Vercel + Neon + Brevo
   setup.
7. **Nothing shared in WhatsApp breaks.** Every existing public URL redirects.

### Non-goals
- No public forum, no community answers, no visitor accounts.
- No SMS and no paid WhatsApp Business API messaging (not free → scrapped).
- No native App Store / Play Store apps (the installable web app covers it).
- No full Arabic version of guides/FAQ/deals (only Duroos is bilingual).
- Not reading X/Twitter at launch (paid API); Telegram public previews only.

### Anti-goals — failure even if it "works"
- A wrong cancellation goes live and students skip a dars that was on (or turn
  up to one that was cancelled) with no fast way to catch and undo it.
- Admins still need a developer to change content.
- Pages are slow or awkward on a mid-range Android phone on mobile data.
- Information shown without any sign of when it was last verified.
- Anything that looks like a generic template rather than *MESH*.

---

## 3. Audience & usage

- **Visitors** — English-speaking students at IUM and in Madinah (brothers and
  sisters), their families, and prospective students abroad. Arrive mostly via
  links shared in the WhatsApp group and Google search. Mostly phones.
- **Arabic-speaking visitors to Duroos** — the schedule stays fully usable in
  Arabic.
- **Admins** — a small team (owner + trusted students), posting several times a
  day, almost always from a phone.

---

## 4. Information architecture

Bottom tab bar on mobile (top nav on desktop):
**Home · Duroos · Guides · Ask · More** — plus a floating WhatsApp button on
every screen.

| Section | Contents |
|---|---|
| **Home** | Hijri + Gregorian date · WhatsApp join banner · *Today's duroos* (live status, countdown, ON/CANCELLED/MOVED tags, "updated N min ago from @channel") · Start-here guides · Latest announcements/events · Student deals |
| **Duroos** (bilingual) | Today · Weekly schedule (by masjid / by day / by prayer) · Shaykh pages (photo, verified facts, all lessons, past books) · Book pages · Announcements feed · Livestreams · Seasonal (Ramadan/Hajj) schedules · Follow a shaykh/book (alerts) · Add to calendar |
| **Guides** | Long-form articles grouped by life stage: *Getting started* (admission, visa & iqama, Nafath, Absher, registration) · *Getting settled* (housing, transport, SIM, banking, groceries) · *Family life* (spouse visas, schools, clinics, sisters' classes) · *Leaving Madinah* (exit, final paperwork, closing accounts) |
| **Ask** (FAQ) | Searchable saved Q&As by category, each with "last verified" date · Ends with **"Have a question? Post it in the MESH WhatsApp chat →"** |
| **More** | Deals & shopping · Events · Livestreams · About MESH · Group rules · Contact · Settings (theme, language for Duroos, notifications) |

### URL map (all real, shareable, SEO-indexed pages)

```
/                         Home
/duroos                   Today (default)
/duroos/schedule          Weekly schedule (?masjid=quba&day=sat filters)
/duroos/shaykh/[slug]     Shaykh page
/duroos/lesson/[slug]     Lesson page (book, time, place, status, history)
/duroos/updates           Announcements feed
/duroos/updates/[id]      Single announcement (flyer, share card)
/duroos/live              Livestreams
/duroos/seasonal          Ramadan / Hajj
/ar/duroos/...            Arabic mirror of every Duroos route (RTL)
/guides, /guides/[slug]
/ask, /ask/[slug]
/deals, /deals/[slug]
/events, /events/[slug]
/follow                   Manage alerts (token link, no account)
/admin/...                Admin app
```

Old URLs (`/question/[id]`, `/resources/[id]`, `/category/[slug]`, `/browse`,
`/mesh/*`, the single `/duroos` page) **301-redirect** to their new homes.
Migrated forum questions keep a redirect map `old id → new /ask/slug`.

---

## 5. Key features

### 5.1 Live, self-updating Duroos
- Schedule lives in the **database**, seeded once from the current verified
  `lessons.ts`/`profiles.ts`/`streams.ts`/`events.ts`.
- **Real "today"**: computed in Asia/Riyadh, never hard-coded.
- **Prayer-anchored times → clock times.** Lessons are "after Asr" etc. The site
  computes Madinah prayer times (Umm al-Qura method, offline library) to show
  "After Asr · ≈ 3:12 pm · in 2h 10m" and a live/next indicator.
- **Overrides layered on the weekly timetable**: cancelled / postponed / moved /
  guest / resumed / new book / book finished — each with a date range, source
  post link, and who/what published it.
- Status tags everywhere a lesson appears; a lesson page shows its change
  history.

### 5.2 Channel watcher (automatic updates)
1. A scheduled job reads each source's public preview page
   (`t.me/s/<channel>` — no Telegram login, ever), every ~5 minutes.
2. New posts are stored raw (text, images, link, timestamp).
3. **AI parsing** (Claude API, small/fast model) reads each Arabic post and
   returns structured output: *is this about a lesson? which shaykh/lesson?
   what change? which absolute date(s)? confidence*, plus a draft English
   translation following the house rules (يعتذر → "excused himself"; relative
   words → bracketed absolute Hijri dates).
4. Matching against known shaykhs/lessons in the DB.
5. **Publish rule (owner's decision — hybrid):**
   - **Auto-publish** when **all** hold: source is marked *trusted* (the
     shuyukh's own official channels and the big aggregator channels such as
     خزانة العلم and دروس المدينة) · change is a simple
     cancellation/postponement/resumption of a **known** lesson · AI confidence
     is high · date resolves unambiguously.
   - **Otherwise** → admin inbox + push notification to admins.
   - Every auto-publish also notifies admins with a one-tap **Undo**.
6. Lectures with flyers (one-off events) always go to the inbox as a
   ready-made draft (flyer attached, fields filled) for one-tap publish.

Initial sources (admin-editable, each with a *trusted* toggle):
`@drosalmadina`, `@khizana_62`, `@sohaymi`, `@dr_maherkhujah`,
`@Sulalruhaily`, `@twijri`.

### 5.3 Editorial rule change
`CONTRIBUTING.md` rule 3 ("announcements never auto-publish") is replaced by
the hybrid rule above. All other editorial rules carry over unchanged.

### 5.4 Ask (FAQ) — admin-curated
- Q&A pages written/approved by admins only. Each shows category, tags,
  **last verified** date, and related guides.
- **Paste-to-draft:** an admin pastes a WhatsApp thread → AI drafts a clean
  question + answer (names removed) → admin edits and publishes.
- Every page: "Something outdated? Tell us" (sends a flag to the admin inbox)
  and "Have a question? Post it in the MESH WhatsApp chat →".
- Migration: any real (non-seed) forum questions/answers in the production DB
  become **draft** FAQ entries; all seed/sample content is dropped.

### 5.5 Guides
- Rich articles (headings, images, callouts, step lists, checklists, embedded
  maps/links), reading time, last-verified date, table of contents.
- Existing real articles migrate; banner images move to file storage.

### 5.6 Deals & shopping
- Admin-entered listings: business, offer, how to redeem, area/map link,
  category (books, groceries, clothing, phones, services…), expiry date.
  Expired deals hide automatically.

### 5.7 Events
- One-off lectures, scientific days, gatherings, MESH meet-ups; may come from
  the channel watcher or be entered by admins. Add-to-calendar, share card.

### 5.8 WhatsApp everywhere
- Floating WhatsApp button on every screen; join banner on Home; CTA at the end
  of every guide, FAQ and Ask page.
- The invite link is an **admin setting** (invite links get reset).
- Admin "**Share to WhatsApp**" button on any announcement/event/guide: opens
  WhatsApp with a ready-formatted message + link (rich preview card).

### 5.9 Notifications — all free
| Channel | How | Notes |
|---|---|---|
| **Web push** | Installable web app + standard Web Push (VAPID keys) | Free. Android: any browser. iPhone: works once the site is added to the Home Screen (iOS 16.4+). Follow specific shaykhs/books or "all changes". |
| **Email** | Brevo (existing) | Free tier sends a limited number per day; alert emails are batched/digested to stay inside it. |
| **Calendar** | Subscribable `.ics` feeds per shaykh/book/masjid | Free; Google/Apple calendars update themselves when a dars is cancelled. |
| ~~SMS~~ | — | Not free → scrapped. |
| ~~WhatsApp DMs~~ | — | Paid API → scrapped; the group + share button cover it. |

No visitor account: push subscriptions are per-device; email follows use the
existing token-link manage page.

### 5.10 Additions proposed by Claude
- **Share cards**: every lesson, announcement, guide and FAQ gets an
  auto-generated preview image so links look great inside WhatsApp.
- **Instant search** across duroos, guides, FAQ and deals (typo-tolerant,
  Arabic and English names).
- **Offline schedule**: the week's duroos cached on the device.
- **"Last verified" + "Report outdated"** on every piece of content.
- **Madinah prayer times** strip on Home (needed for the duroos countdown).
- **Map links** for each masjid and door/area where lessons are held.
- **Admin activity feed + one-tap undo** on everything.

---

## 6. Admin experience

Mobile-first admin app at `/admin`, same design system.

- **Inbox** (default screen): channel-detected changes awaiting review, outdated
  reports, auto-published items (with Undo). Each card: original post (Arabic)
  · proposed change · before/after preview · Approve / Edit / Dismiss.
- **Quick actions**: Cancel tonight's dars · Post lecture (snap/upload flyer →
  AI fills fields) · New FAQ from WhatsApp paste · New deal.
- **Content editors**: lessons, shaykhs, books, masjids, announcements, events,
  guides, FAQ, deals, sources, site settings (WhatsApp link, home banner).
- **Drafts, scheduling, preview**: write now, publish later; preview exactly as
  visitors will see it.
- **Activity log** of every change (who, what, when, before/after) with undo.
- **Roles**: Owner · Editor (everything) · Duroos editor · Content editor
  (guides/FAQ/deals/events). Owner manages admins.
- **Admin push alerts** for inbox items.

---

## 7. Security

- **Admin-only accounts**, invite-only (no public sign-up). Each admin has a
  personal login with **passkey** (Face ID / fingerprint) and/or password +
  **TOTP second factor (required)**.
- Server-side sessions (hashed tokens, httpOnly/secure/SameSite cookies,
  expiry + rotation, "sign out everywhere").
- **Rate limiting** on login, 2FA, follow/subscribe and flag endpoints.
- **Role checks on every server action/route** (deny by default), plus input
  validation on every request (schema-validated).
- Rich text sanitized server-side on save **and** on render.
- Strict security headers: CSP, HSTS, frame-ancestors none, referrer policy,
  permissions policy.
- Uploads: type/size checked, re-encoded, stored outside the DB with random
  names; EXIF stripped.
- Secrets only in environment variables; `.env*` ignored; secret scanning on
  the repo.
- Cron/watcher endpoints protected by a shared secret.
- **Audit log** of all admin actions; owner can revoke any admin instantly.
- Database: least-privilege connection, backups/point-in-time restore via Neon.
- Dependency updates automated (Dependabot) and a security scan before launch.

---

## 8. Design system

- **Light mode (default): "Warm Paper"** — cream `#f6f1e7` background, deep
  green `#1e4d3b`, terracotta `#c2522f` accent, white cards with warm borders,
  serif headings (Newsreader) + clean sans body (DM Sans).
- **Dark mode: "Madinah Night"** — green-black `#0c1714`, gold `#d9b76c`
  accent, deep green cards, serif headings (Fraunces) + Inter body.
- Follows the phone's system setting by default; manual toggle overrides.
- Arabic text: an Arabic-optimized face (e.g. Alexandria/Amiri for titles) with
  full RTL layout on `/ar/duroos`.
- Status colours consistent across themes: ON (green), CANCELLED (terracotta /
  red), MOVED/POSTPONED (amber), GUEST (gold).
- WhatsApp green reserved for WhatsApp actions only.
- Mobile layout first; desktop gets a wider multi-column version, not a
  different site.
- Accessibility: AA contrast in both themes, large tap targets, reduced-motion
  respected, screen-reader labels.
- Reference mockup: `.superpowers/brainstorm/*/content/home-direction.html`
  (options A and B).

---

## 9. Approaches considered

| # | Approach | Trade-off | Decision |
|---|---|---|---|
| 1 | **Fresh rebuild** on new foundations, carrying over verified data, assets, date helpers and email; cut over once the core is ready | Nothing new ships until the core is done; afterwards everything is fast to add and the foundations fit the product | **Chosen** by owner |
| 2 | Revamp current code in place, piece by piece | Improvements ship sooner, but the hard-coded data, runtime schema, forum-shaped DB, single-page Duroos and two admin systems all need rewriting anyway | Rejected |
| 3 | Hosted CMS (e.g. Sanity) for content + custom Duroos | Great article editor, but admins work in two places and the inbox/watcher must be custom anyway; extra dependency | Rejected |

---

## 10. Technical foundation (builder's calls, stated)

- **Framework:** latest stable Next.js (App Router, server components/actions),
  TypeScript strict, Tailwind CSS.
- **Hosting:** Vercel (existing project) + Neon Postgres (existing).
- **Database access & migrations:** Drizzle ORM with versioned SQL migrations
  (no more schema-on-boot).
- **Auth:** a maintained auth library supporting passkeys, TOTP and
  rate-limiting (e.g. Better Auth), admin-only.
- **File storage:** Vercel Blob (or equivalent free tier) + Next image
  optimization.
- **Scheduler:** the watcher must run every ~5 min. Vercel's free plan limits
  cron frequency, so the trigger is a **GitHub Actions scheduled workflow**
  (free) calling a secret-protected endpoint; Vercel Cron handles daily jobs
  (digests, expiry). Upgrade path: Cloudflare Workers cron for tighter timing.
- **AI:** Anthropic Claude API, small/fast model, structured output; every
  parse logged with its input for review.
- **Push:** standard Web Push with VAPID keys + service worker.
- **Email:** Brevo.
- **Search:** Postgres full-text + trigram (Arabic + English).
- **Testing:** unit tests for date/prayer/override/parse-matching logic;
  end-to-end tests for key visitor and admin flows on a mobile viewport.
- **Data migration:** one-off scripts to import the static TS data, real
  production forum/article/subscriber/announcement rows, and images into the
  new schema; dry-run against a Neon branch first.

---

## 11. Launch & cut-over

1. Build on a branch with Vercel **preview deployments**; production stays on
   the current site until cut-over.
2. Import data into a Neon branch; admins test on the preview URL.
3. Cut-over: run migrations on production DB, deploy, verify redirects and
   alerts, announce in the WhatsApp group.
4. Keep the old code tagged (`v1-final`) for rollback.

**Minimum for cut-over** (Claude's call): Home · full Duroos (bilingual, live
today, overrides, shaykh/lesson pages, updates feed, livestreams) · channel
watcher + admin inbox + auto-publish · Ask (FAQ) · Guides · admin core
(roles, 2FA, editors, activity log/undo) · web push + email alerts · WhatsApp
everywhere · redirects · security headers. **Fast follow-ups after cut-over:**
Deals, Events, calendar feeds, Seasonal view, instant search polish, offline
cache, share-card images.

---

## 12. Decisions made with the owner

- Complete revamp; fresh rebuild (approach 1).
- One unified MESH product; Duroos becomes a section.
- WhatsApp group is the main channel; promoted on every screen.
- Ask = admin-curated FAQ (option A); questions go to the WhatsApp group.
- Channel updates: hybrid auto-publish from trusted channels; everything
  uncertain pings an admin.
- Language: English site; Duroos fully bilingual (Arabic + English).
- Visual: light = Warm Paper (default), dark = Madinah Night.
- Notifications: free channels only (web push, email, calendar).

## 13. Calls made by Claude (owner may override)

- No visitor accounts; admin-only accounts with roles and required 2FA.
- Home order: WhatsApp → today's duroos → start-here guides → announcements →
  deals.
- Forum seed/sample content deleted; real forum posts become FAQ drafts.
- Channel watcher triggered by GitHub Actions every ~5 min (the repo is
  public, so Actions minutes are free).
- Existing MESH member accounts: real posts are migrated anonymized into FAQ
  drafts; mandoob/admin members are invited as admins; all other member
  accounts and their personal data are deleted after migration (members get a
  one-time email explaining the change and pointing to the WhatsApp group).
- Existing email subscribers and their per-shaykh/per-book follows carry over
  unchanged.
- Launch scope split into "minimum for cut-over" and "fast follow-ups" (§11).
- Additions in §5.10.
- Tech stack in §10.

## 14. Open questions for the owner

1. **Accounts & access.** Who controls the Vercel project, the Neon database,
   the Brevo account and the `medinahub.org` domain? The builder needs preview
   deployments, environment variables and read access to production data for
   migration. Also: the owner's GitHub account (iumuhaymin) currently has
   read-only access to `aza48/nabawi-duroos`.
2. **AI running cost.** The channel watcher and paste-to-draft use the Claude
   API, a small pay-as-you-go cost. Whose account and card holds the API key?

## 15. Left to the builder

Exact component library, animation details, copywriting polish, database
schema details, test tooling, and file layout — within the constraints above.
