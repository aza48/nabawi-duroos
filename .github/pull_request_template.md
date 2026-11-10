## What changed

<!-- One or two sentences. Link the issue if there is one. -->

## Why

## How I tested

- [ ] `npx tsc --noEmit` passes
- [ ] `npx vitest run` passes
- [ ] `npm run build` passes (`MESH_LOCAL_DB=1 npx next build` locally)
- [ ] Tried it in the browser (note which pages/routes)

## No duplicate work

- [ ] Ran `npm run overlap` and `npm run overlap -- --find <topic>`: no other open PR or claim on issue 13 covers this
- [ ] Claimed it: draft PR opened with a first comment `Working on: <name>, <what>`, row updated in docs/AI-LOG.md, posted on issue 13
- [ ] New guide or FAQ slugs and titles checked against `main` (tests/seed-no-duplicates.test.ts passes)
- [ ] When done: marked ready for review and commented `Ready to merge: <name>`. Overseer 1 verifies and merges; do not merge it yourself

## For UI changes

<!-- Screenshots at 390 px and 1440 px, English and Arabic. Light theme is the default. -->

## Checklist

- [ ] No secrets, tokens or personal data added anywhere (code, comments, history)
- [ ] Any schedule/duroos data change is backed by a public source (link it above): no invented times or books
- [ ] Both Arabic and English still work for anything user-facing
- [ ] No gradients or design-system changes (unless the PR is specifically about design and says so)
