# Start here (for a fresh Claude Code session)

How to start:
1. Open Claude Code with this folder (`MESH Website`) as the project folder.
2. Allow it to run commands (npm, npx, git) when it asks, or pick a permission mode that does.
3. Paste the prompt below as your first message.
4. Ask it to call `get_usage` now and then; it should stop, commit and update `docs/HANDOFF.md` before the usage window runs out.

## Prompt to paste

```
You are continuing work on MESH (medinahub.org), a Next.js 16 and Supabase site for English-speaking students in Madinah. Work only in this folder.

First read docs/HANDOFF.md fully, especially "Owner's rules", "Waiting on a live database step" and "Next steps". Also skim docs/audit/ADMIN-AUDIT.md and docs/IDEAS-FOR-OWNER.md.

Then work down "Next steps" in order, one small change at a time. For each change:
- run npx tsc --noEmit and npx vitest run (both must pass)
- stage only the files you changed (never git add -A), commit, then push with git push mine revamp:main and git push origin revamp
- check that medinahub.org and the changed pages load live

Follow the owner's rules: no em or en dashes, no AI-sounding copy, light theme by default, mobile first, never mention the owner's name, never print or commit secrets (they are in the git-ignored .env files). Ask me before running anything that writes to the live database.

Call get_usage between steps. Before the 5-hour or weekly window reaches about 98%, stop at a safe point, commit and push, update docs/HANDOFF.md with where you stopped and what is next, push again, and tell me.
```
