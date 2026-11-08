# MESH: Medina English Student Hub

The hub for English-speaking students in Madinah: live duroos schedules of the mashayikh (English and Arabic), settling-in guides, verified answers to common questions, and the way into the MESH WhatsApp group.

- **Maintainer:** Muhaymin (GitHub `iumuhaymin`)
- **Start here:** `docs/HANDOFF.md` (stack, code map, commands, house rules) and `CONTRIBUTING.md`
- **Design:** `docs/superpowers/specs/2026-11-07-mesh-revamp-design.md`
- **Status, what's left, and feature ideas:** `docs/ROADMAP.md`

## Run it on your computer

```bash
npm install
npm run dev -- -p 3100
```

Open http://localhost:3100. No accounts or keys are needed: the site starts with an in-memory copy of the verified schedule.

To try the admin, create a file `.env.local` containing `BETTER_AUTH_URL=http://localhost:3100`, restart, and open the one-time owner invite link printed in the terminal (local only).

## Useful commands

| Command | What it does |
|---|---|
| `npm test` | Runs all tests |
| `npm run typecheck` | Checks types |
| `npm run build` | Production build (add `MESH_LOCAL_DB=1` to build without a database) |
| `npm run seed` | Loads the verified schedule into the database in `DATABASE_URL` |
| `npm run admin:invite -- you@example.com owner` | Prints a one-time admin invite link |

## Environments

- **Production** needs `DATABASE_URL`, `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL`.
- **Vercel previews** never touch the live database; they run on their own seeded copy.
- Pushing to `main` deploys to medinahub.org, so all work happens on branches first.

## Stack

Next.js 16, React 19, TypeScript, Tailwind CSS 4, Drizzle ORM on Postgres (Neon), Better Auth (two-step sign-in, passkeys), Vitest.
