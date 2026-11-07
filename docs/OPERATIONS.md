# Running MESH in production

## Environment variables (Vercel → Settings → Environment Variables, Production only)

| Name | What it is |
|---|---|
| `DATABASE_URL` | Neon Postgres connection string |
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
It should run every 2 to 5 minutes. Vercel's free plan only allows daily cron jobs, so use a free
Cloudflare Worker:

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
