# Duroos Aggregator — دروس المسجد النبوي

A private, Arabic-first, RTL-first live schedule aggregator for the duroos of
**Al-Masjid an-Nabawi** (primary), **Masjid Quba** and the **Islamic University's
Masjid Muhammad ibn Ibrahim** — with temporary live overrides (cancellations,
pauses, resumptions, guest lessons, seasonal schedules) layered over the
permanent weekly timetable.

Portable Next.js build. All data is static and verified from the supplied
schedules + Telegram channel previews (October 2026).

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- `lucide-react` icons, `framer-motion` (subtle only), `next/font` (Inter + Alexandria (Arabic))
- No gradients, no glassmorphism, no neumorphism

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build check
npm start        # serve the production build
```

The core site needs no environment variables. The optional backend features
(email alerts, DB announcements, password-protected admin, reminder cron) are
enabled by the variables in [Environment variables](#environment-variables) —
without them the site still builds and runs; the subscription UI shows a
"coming soon" state and admin reports itself not configured.
PWA manifest lives in `public/manifest.webmanifest`.

## Data files

- `src/data/lessons.ts` — the weekly schedule (Nabawi + Quba + Islamic University),
  including the verified corrections:
  - **Abdurrazzaq al-Badr:** تفسير السعدي after Fajr (weekdays not sourced — stated,
    never invented) + شرح كتاب التوحيد من تقريرات الشيخ محمد بن إبراهيم,
    daily except Fri/Sat after Maghrib, started Sun 7/5/1448. التنبيهات السنية = finished.
  - **Salih al-Suhaymi:** شرح المعتقد الصحيح Sun & Mon after Maghrib (بين الحصوتين).
    الداء والدواء = finished long ago, listed only as previous.
  - **Maher Khujah:** كشف الشبهات (finished) → فضل الإسلام (current, from Mon 8/5/1448)
    → الواسطية → الطحاوية.
- `src/data/announcements.ts` — the announcement feed + 6 Telegram sources + pending queue samples.
  - Every announcement carries its **absolute** posting date (Hijri + Gregorian);
    relative words (tonight/today/tomorrow) are rewritten in place as bracketed
    absolute dates, e.g. `ليلة [الأحد ٧/٥/١٤٤٨]`. Single-day notices are marked
    expired and never drive today's status.

## Themes

Per-masjid themes animate through CSS variables (~600 ms cross-fade, reduced-motion respected):

| Masjid | Palette | Dark variant |
|---|---|---|
| Al-Masjid an-Nabawi (default) | Green system (`#1E3932` / `#00754A`) | House-Green-based dark |
| Masjid Quba | Light grey ashy slate (carpet-inspired) | Slate dark |
| Masjid Muhammad ibn Ibrahim | Pastel warm brown (carpet-inspired) | Umber dark |

Gold (`#cba258`) is reserved for the Seasonal (Ramadan/Hajj) view only.

## Admin

`/admin` is protected by a password (`ADMIN_PASSWORD`) via middleware; sign in
at `/admin/login`. From there the admin can:

- Create **database announcements** (shaykh + optional book, type, bilingual
  title/body, optional lesson date). Saving creates a draft; **Publish** puts
  it on the public feed and emails every confirmed subscriber who opted into
  that shaykh or that book (bilingual Arabic + English email, lesson date
  rendered as a bracketed absolute Hijri date).
- Review the Telegram pending queue (approve/reject/verify — still stored in
  the browser's `localStorage` in this build) and add lessons manually
  (also `localStorage`, shown only in your browser).

## Email alerts & reminders

- Visitors subscribe with an email (double opt-in: a confirmation email is
  sent first), then manage per-shaykh / per-book toggles at `/manage?token=…`
  (link is in every email; one-click unsubscribe likewise).
- A daily **Vercel Cron** (`vercel.json`, 03:00 UTC = 06:00 Asia/Riyadh) calls
  `/api/cron/reminders`, which emails each confirmed subscriber one digest of
  *their* lessons happening that day — **weekly and monthly lessons only**;
  daily lessons never generate reminders (they still get announcement alerts).

## Environment variables

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Neon Postgres connection string. Enables subscribers, subscriptions, DB announcements and `email_log`. Tables are created automatically on first use (`CREATE TABLE IF NOT EXISTS`). |
| `BREVO_API_KEY` | Brevo API key used to send confirmation / alert / reminder emails. Without it, sends are skipped (logged) and publishing still succeeds. |
| `BREVO_SENDER_EMAIL` | Verified Brevo sender address (the "from" email). |
| `BREVO_SENDER_NAME` | Sender display name, e.g. `Duroos Aggregator`. |
| `ADMIN_PASSWORD` | Password for `/admin`. The session cookie stores only its salted SHA-256 hash. Without it, admin is disabled and the login page says so. |
| `CRON_SECRET` | Shared secret Vercel Cron sends as `Authorization: Bearer …` to `/api/cron/reminders`. Requests without it get 401. |
| `NEXT_PUBLIC_SITE_URL` | Public base URL of the deployment (e.g. `https://nabawi-duroos.vercel.app`). Used for the links inside emails; falls back to the request origin when unset. |

### Setup steps

1. **Database:** in Vercel → your project → **Storage** → Create **Neon**
   (Postgres, free tier) and connect it to the project — this sets
   `DATABASE_URL` automatically. (Or create the DB at neon.tech and paste the
   connection string.) No migrations to run; the app creates its tables.
2. **Email:** create a Brevo account → **Senders & IP** → verify
   `BREVO_SENDER_EMAIL` → **SMTP & API** → create an API key → set
   `BREVO_API_KEY` (and the sender variables) in Vercel → Settings →
   Environment Variables.
3. **Admin + cron:** set `ADMIN_PASSWORD` and `CRON_SECRET` (any long random
   string) the same way.
4. **Site URL:** set `NEXT_PUBLIC_SITE_URL` to the production URL.
5. **Redeploy** so the new variables take effect.

## Deploying on Vercel (free)

1. Push this repo to GitHub (private repo is fine).
2. In Vercel, **Add New Project → Import** the repo. Framework preset: Next.js.
3. Only the env vars for the features you enable (see
   [Environment variables](#environment-variables)). Deploy.

Every push to `main` auto-deploys.

## Telegram ingestion roadmap

Live updates currently come from 6 **public** channels (no account login anywhere):

- `@drosalmadina`, `@khizana_62`, `@sohaymi`, `@dr_maherkhujah`, `@Sulalruhaily`, `@twijri`

This repo ships a real polling pipeline for them:

- `scripts/poll-telegram.mjs` — fetches each channel's public `t.me/s/<channel>`
  preview page and writes newly discovered post IDs to `data/pending.json`
  (status `pending`) for admin review.
- `.github/workflows/telegram-poll.yml` — scheduled GitHub Action (every 30 min)
  that runs the script and commits queue updates back to the repo.

Next step to make this end-to-end (not yet wired): a server route /cron that
reads `data/pending.json`, applies the bracketed-date normalization, and an
admin approval that persists approvals to a real database (e.g. Vercel Postgres
via the Vercel Marketplace, free tier) instead of `localStorage`.
