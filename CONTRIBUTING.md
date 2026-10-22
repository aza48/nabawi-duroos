# Contributing to Medina Hub

Thanks for helping. This repo holds one Next.js app with two products:

- **MESH — Medinah English Students Hub** (`/`): a community forum for English-speaking students in Madinah.
- **Nabawi Duroos** (`/duroos`): an Arabic-first aggregator of lesson schedules (duroos) for Madinah masjids, with email alerts for schedule changes.

## Run it locally

```bash
npm install
npm run dev
```

No secrets are needed to develop: without a database the forum runs in a clearly labelled demo mode and the duroos side runs from its static data files. If you want the full backend locally, copy `.env.example` to `.env.local` and fill in your **own** Neon/Brevo values — never anyone else's.

## Ground rules (please read — PRs that break these will be sent back)

1. **Schedule data must be evidence-based.** Duroos times, books and changes come from the masjids' public announcement channels. Never invent a weekday, prayer time, book or stream link that a source does not state. If a source doesn't say, the app says so honestly.
2. **No Telegram accounts, ever.** Sources are read only via public channel previews. No logins, API keys, phone numbers or session files — in code, issues or PRs.
3. **Announcements never auto-publish.** Channel posts go to an admin approval queue first; nothing reaches users or email subscribers without the admin approving it.
4. **Translations:** a shaykh's يعتذر is rendered "he excused himself" (or plainly "cancelled/postponed") — never "apologizes". Displayed dates are absolute Hijri dates in brackets, never relative words like "today" or "tonight".
5. **Design system stays intact:** warm Starbucks-inspired palette, 50px pill buttons, 12px cards, per-masjid themes on the duroos side, dark Vercel-style theme on MESH, **no gradients** (the one exception is the duroos lecture pop-up, which is intentionally frosted glass). Arabic uses Alexandria, Latin uses Inter. Keep both languages (AR/EN) working for anything user-facing.
6. **No secrets in code or history.** Keys live in environment variables only.

## Pull requests

1. Fork the repo and branch from `main`.
2. Keep the PR focused — one change per PR.
3. Make sure `npm run build` and `npx tsc --noEmit` pass.
4. Fill in the PR template (what, why, how you tested, screenshots for UI changes).
5. The maintainer reviews every PR personally. Merging to `main` deploys to production automatically, so reviews are careful — please be patient and respond to requested changes on the same PR.

By contributing you agree your contribution is provided under the project's license.
