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
- `lucide-react` icons, `framer-motion` (subtle only), `next/font` (Inter + Noto Sans Arabic)
- No gradients, no glassmorphism, no neumorphism

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build check
npm start        # serve the production build
```

No environment variables are needed. PWA manifest lives in `public/manifest.webmanifest`.

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

## Admin (portable v1 trade-off)

The Admin dashboard (review queue approve/reject/verify, manual announcement and
lesson forms) stores decisions and additions in the browser's `localStorage`.
Nothing is published or synced to a server. This is the deliberate trade-off of
the free-tier portable build — see below for the upgrade path.

## Deploying on Vercel (free)

1. Push this repo to GitHub (private repo is fine).
2. In Vercel, **Add New Project → Import** the repo. Framework preset: Next.js.
3. No build settings or env vars needed. Deploy.

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
