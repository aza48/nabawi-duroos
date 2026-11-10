# Contributing to MESH

MESH (medinahub.org) is one Next.js app for English-speaking students and families in Madinah: live duroos schedules, study programmes, guides, answers, a course-book library, discounts and key dates, with an Arabic version under `/ar`.

Most contributors work through their own Claude agents: `CLAUDE.md` is loaded automatically and points here. Start with `docs/HANDOFF.md`: it explains the stack, the map of the code, the commands and the rules below in more detail.

## Run it locally

```bash
npm install
npm run dev -- -p 3100
```

No secrets are needed to develop. Without `DATABASE_URL` the site runs on an in-memory copy of the data (PGlite). To try the admin locally, put `BETTER_AUTH_URL=http://localhost:3100` in `.env.local`, restart, and open the one-time invite link printed in the terminal. Copy `.env.example` for the full list of settings and use your **own** values, never anyone else's.

## Before every pull request

```bash
npx tsc --noEmit
npx vitest run
```

Both must pass. Merging to `main` deploys to production automatically.

## House rules (pull requests that break these are sent back)

1. **Copy:** plain, warm, professional English. No em dashes or en dashes anywhere (a test checks). No filler or AI-sounding phrasing.
2. **Speak with authority.** Public text never mentions where information came from (channels, posts, other sites) and never shows doubt ("reportedly", "not stated"). Uncertain facts are left out and raised with the admins instead.
3. **Impartial.** Never recommend or feature one markaz, institute, business or doctor over another. List alphabetically. No adverts.
4. **Rewrite, never copy** text from other sites or PDFs.
5. **Design:** light theme by default (dark is optional), MESH green `#145c3e` and gold `#e2b23a`, the diamond lattice. Mobile first, and wide screens must use the space. Check changes at 2000, 1440, 1024, 390 and 360 px.
6. **Both languages:** anything user-facing should work in English and Arabic (RTL).
7. **Shaykh photos:** only verified photos; the calligraphic name badge is the fallback.
8. **No secrets in code, comments, issues or history.** Keys live only in environment variables (`.env.local` locally, Vercel in production). Never commit `.env*` files other than `.env.example`.
9. **Live database:** only maintainers run `npm run content:sync` or scripts against production. Database schema changes need a migration (`npx drizzle-kit generate --name <x>`) that is applied before code that reads the new columns is deployed.

## Pull requests

1. **Check nobody else is on it first:** `npm run overlap -- --find <topic>` lists open PRs that touch the same thing and who claimed them. Open a draft PR as soon as you start, with a comment `Working on: <your name>, <what>`, so others see your claim. The rules are at the top of `docs/AI-LOG.md`.
2. Branch from `main` and keep each PR to one change.
3. Fill in the PR template: what, why, how you tested, and screenshots for UI changes.
4. Muhaymin reviews every PR before it is merged.

By contributing you agree your contribution is provided under the project's license.
