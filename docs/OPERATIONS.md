# Running MESH in production

## Environment variables (Vercel → Settings → Environment Variables, Production only)

| Name | What it is |
|---|---|
| `DATABASE_URL` | Supabase Postgres connection string (transaction pooler) |
| `BETTER_AUTH_SECRET` | Long random string (e.g. `openssl rand -base64 32`). Never reuse the dev one. |
| `BETTER_AUTH_URL` | `https://medinahub.org` |
| `GEMINI_API_KEY` | Google AI Studio key for reading channel posts. Create a fresh one for production. |
| `GEMINI_MODEL` | Optional. Overrides the model (default tries `gemini-3.8-flash`, then `gemini-flash-latest`). |
| `CRON_SECRET` | Long random string; the scheduler sends it as `Authorization: Bearer …` |
| `TURNSTILE_SECRET_KEY` | Optional. Cloudflare Turnstile on the admin sign-in. |

Previews never use these database settings; they run on their own seeded copy.

## The channel watcher schedule

The watcher lives at `GET /api/cron/watch`. Each run reads every channel, asks the AI about new posts
(at most 8 per run, so the free tier is enough), checks the YouTube live stream, and refreshes the pages.
It should run every 2 to 5 minutes. Vercel's free plan only allows daily cron jobs. In production,
Supabase `pg_cron` calls it every 3 minutes, and calls `/api/cron/daily` at 01:30 UTC, both with the
`CRON_SECRET` header. If `pg_cron` is ever unavailable, a free Cloudflare Worker does the same:

1. Cloudflare dashboard → Workers & Pages → Create → Worker, name it `mesh-cron`.
2. Paste this code and deploy:

```js
export default {
  async scheduled(_event, env) {
    await fetch("https://medinahub.org/api/cron/watch", {
      headers: { Authorization: `Bearer ${env.CRON_SECRET}` },
    });
  },
};
```

3. Worker → Settings → Variables: add `CRON_SECRET` (same value as on Vercel, as a secret).
4. Worker → Settings → Triggers → Cron Triggers: add `*/3 * * * *` (every 3 minutes).

The admin Inbox shows a warning if the watcher hasn't run for 30 minutes.

## Trying the watcher locally

`npm run watch:once` reads the real channels with your `GEMINI_API_KEY` from `.env.local`, on a
throwaway in-memory database, and prints what it would suggest or publish. Nothing goes live.

## Shadow mode

Every channel starts with automatic publishing off. Suggestions that would have been published on their
own are marked in the Inbox. After a couple of weeks of correct suggestions, switch a channel on in
Admin → More → Channels.

## First owner account

```bash
DATABASE_URL=... BETTER_AUTH_URL=https://medinahub.org npm run admin:invite -- you@example.com owner
```

## Phone notifications (free web push)

1. Create production keys once: `npx web-push generate-vapid-keys`.
2. In Vercel add `NEXT_PUBLIC_VAPID_PUBLIC_KEY` (the public key) and `VAPID_PRIVATE_KEY` (the private key), then redeploy.
3. Students tap "Alert me…" on a shaykh or lesson page, or turn on the morning brief / all changes on the More page.
   On iPhone, alerts work after MESH is added to the Home Screen (the button explains this).
4. Every lesson change (from an admin or the watcher) notifies phones following that shaykh or "all changes".

## Morning brief

Supabase `pg_cron` runs it. With the Cloudflare fallback, add a second trigger calling
`https://medinahub.org/api/cron/daily` with the same `Authorization: Bearer <CRON_SECRET>` header,
on cron `30 1 * * *` (04:30 Riyadh, before Fajr). The same call does the daily housekeeping first: it creates the analytics tables if they are missing and deletes visits older than 180 days, so none of that runs inside a visitor's request.

## Calendar feeds

Anyone can subscribe: `webcal://medinahub.org/api/v1/calendar/all.ics`, or per shaykh
(`shaykh-<slug>.ics`), masjid (`masjid-<id>.ics`) or lesson (`lesson-<slug>.ics`). The buttons on
shaykh and lesson pages do this. Calendars refresh every few hours, show cancellations, and remind
20 minutes before each dars.

## Rebuilding the database from scratch (done once, on 8 November 2026)

1. Ask aza48 for the live `DATABASE_URL` and put it in `.env.production.local` (git-ignored).
2. `npm run go-live` (dry run, changes nothing) and read the plan.
3. `npm run go-live -- --apply --owner you@example.com` and open the printed owner invite.
4. Add all the Vercel variables above, then deploy `main`.
