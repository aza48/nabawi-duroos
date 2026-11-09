# MESH v2 Plan 2: Admin App & Security Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development (recommended) or executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A secure, invite-only, mobile-first admin app at `/admin` where the MESH team edits duroos, overrides, announcements, FAQs, guides and settings in seconds, with every change logged and undoable.

**Architecture:** Better Auth (email + password, TOTP two-factor required, passkeys, admin plugin for roles/bans, database rate limiting) on the existing Drizzle/Postgres layer. All admin writes go through one service layer (`src/server/admin/**`) that checks permissions (deny by default), writes an audit row with before/after snapshots, and refreshes affected public pages. UI is server components plus small client islands; mutations are server actions that call the service layer.

**Tech Stack:** better-auth 1.7.18, @better-auth/passkey 1.7.18, otpauth (tests), @tiptap/react + starter-kit + link (guide/FAQ editor), existing Next 16 / Drizzle / PGlite / Vitest.

**Spec:** `docs/superpowers/specs/2026-11-07-mesh-revamp-design.md` (§6 Admin experience, §7 Security, §13 calls)

## Global Constraints

- Admin-only accounts, invite-only. Public sign-up disabled. No visitor accounts.
- Every admin must have TOTP two-factor enabled before reaching any admin page except the 2FA setup page. Passkey sign-in is allowed once enrolled (it is phishing-resistant on its own).
- Roles (exact strings): `owner`, `editor`, `duroos_editor`, `content_editor`. Permissions: owner = everything incl. admins & settings; editor = all content + settings except admins; duroos_editor = lessons, shaykhs, overrides, announcements; content_editor = faqs, guides. Deny by default.
- Every mutation writes `audit_log` (actor, action, entity, entity id, before, after). Undo restores `before`; undo of a create deletes (or revokes) the row; undo is itself logged.
- Rate limits: sign-in and 2FA verify 5 per 60 s per IP; all auth endpoints 30 per 60 s (database storage).
- Rich text is sanitized with `sanitizeArticleHtml` on save (and already on render).
- Sessions: 7-day expiry, refreshed daily, httpOnly, SameSite=Lax, Secure in production. Banning a user revokes all their sessions.
- `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL` required in production; dev/test use fixed local values. Telemetry disabled.
- Copy style: no em dashes, plain clear English (tests/copy.test.ts covers `src/`).
- Admin UI is mobile-first: every action reachable one-handed on a 375 px screen.

## Review Focus

1. **Session without 2FA** — a signed-in admin who has not enabled TOTP must not reach any admin data or action (Task 4 test on `requireAdmin`).
2. **Role escalation** — an `editor` must not invite admins or change roles; a `content_editor` must not create overrides (Task 4 permission tests, Task 6 service test).
3. **Invite reuse / expiry** — an invite token works once and expires after 72 h (Task 3 tests).
4. **Undo of an undo / undo of a deleted row** — undo applies only once; undoing a change to a row that no longer exists returns a clear error, never throws (Task 4 tests).
5. **Banned admin with a live session** — banning revokes sessions immediately; `requireAdmin` rejects banned users (Task 4/6 tests).

---

## File Structure

```
src/server/db/schema.ts            + auth tables (user, session, account, verification, two_factor, passkey, rate_limit)
                                   + admin_invites, audit_log
src/server/auth/auth.ts            createAuth(db), getAuth()  (Better Auth instance)
src/server/auth/permissions.ts     Role, Permission, can(role, perm)
src/server/auth/session.ts         requireAdmin(perm?) for server components/actions
src/server/admin/audit.ts          record(), listActivity(), undo()
src/server/admin/invites.ts        createInvite(), acceptInvite()
src/server/admin/duroos.ts         lesson/shaykh/override/announcement mutations
src/server/admin/content.ts        faq/guide/settings mutations
src/server/admin/admins.ts         listAdmins/setRole/revokeAdmin
src/server/admin/refresh.ts        refreshPublic(paths) (safe outside a request)
src/app/api/auth/[...all]/route.ts Better Auth handler
src/app/(admin)/admin/**           admin root layout + pages
src/features/admin/**              admin UI components (client islands)
src/lib/auth-client.ts             better-auth/react client with twoFactor + passkey plugins
src/proxy.ts                       /admin gate (cookie presence) + per-request nonce CSP for /admin
scripts/admin-invite.ts            CLI: print an invite link (owner bootstrap)
```

---

### Task 1: Auth + admin tables

**Files:** Modify `src/server/db/schema.ts`; generate `drizzle/0001_*.sql`; Test `tests/db.test.ts` (extend)

Tables (TS keys camelCase, columns snake_case, ids `text` unless noted), exactly the fields Better Auth reported for this config:
- `user`: id, name, email (unique), emailVerified bool, image, createdAt, updatedAt, twoFactorEnabled bool default false, role text default `"editor"`, banned bool default false, banReason, banExpires
- `session`: id, expiresAt, token (unique), createdAt, updatedAt, ipAddress, userAgent, userId → user (cascade), impersonatedBy
- `account`: id, accountId, providerId, userId → user (cascade), accessToken, refreshToken, idToken, accessTokenExpiresAt, refreshTokenExpiresAt, scope, password, createdAt, updatedAt
- `verification`: id, identifier, value, expiresAt, createdAt, updatedAt
- `twoFactor` (table `two_factor`): id, secret, backupCodes, userId → user (cascade), verified bool default false, failedVerificationCount int default 0, lockedUntil
- `passkey`: id, name, publicKey, userId → user (cascade), credentialID, counter int, deviceType, backedUp bool, transports, createdAt, aaguid
- `rateLimit` (table `rate_limit`): id, key (unique), count int, lastRequest bigint (number mode)
- `adminInvites`: id serial, email, role, tokenHash (unique), invitedBy text → user, expiresAt, usedAt, createdAt
- `auditLog`: id serial, actorId text → user (set null), action text, entity text, entityId text, before jsonb, after jsonb, createdAt, undoneAt, undoOf int

- [ ] Test: insert a user row and a two_factor row on `resetTestDb()`, read back `twoFactorEnabled === false`, `role === "editor"`. FAIL → implement + `npm run db:generate -- --name auth_admin` → PASS. Commit.

### Task 2: Better Auth instance + route

**Files:** Create `src/server/auth/auth.ts`, `src/app/api/auth/[...all]/route.ts`, `src/lib/auth-client.ts`; Test `tests/auth.test.ts`

**Produces:** `createAuth(db: Db, opts?: { baseURL?: string }): Auth`; `getAuth(): Promise<Auth>` (memoized on `getDb()`); type `Auth`.

Config: `emailAndPassword { enabled, disableSignUp: true, minPasswordLength: 10 }`; plugins `twoFactor({ issuer: "MESH Admin" })`, `admin({ defaultRole: "editor", adminRoles: ["owner"] })`, `passkey({ rpID, rpName: "MESH Admin", origin })` (rpID/origin from `BETTER_AUTH_URL`, `localhost` in dev), `nextCookies()` last; `rateLimit { enabled: true, storage: "database", window: 60, max: 30, customRules: { "/sign-in/email": { window: 60, max: 5 }, "/two-factor/verify-totp": { window: 60, max: 5 } } }`; `session { expiresIn: 7d, updateAge: 1d }`; `telemetry { enabled: false }`; `advanced { useSecureCookies: production }`; drizzle adapter `provider: "pg"`, explicit schema map, `transaction: false` (Neon HTTP has no interactive transactions). Captcha plugin (Cloudflare Turnstile) on sign-in only when `TURNSTILE_SECRET_KEY` is set.

- [ ] Tests: (a) `auth.api.signUpEmail` rejects (sign-up disabled); (b) a user created server-side via `auth.api.createUser({ body: { email, password, name, role: "owner" } })` can `signInEmail`; (c) after enabling TOTP (`enableTwoFactor` + `verifyTOTP` with a code from `otpauth`), `signInEmail` returns `twoFactorRedirect: true` and no full session. FAIL → implement → PASS. Commit.

### Task 3: Invites + owner bootstrap

**Files:** Create `src/server/admin/invites.ts`, `scripts/admin-invite.ts` (+ npm script `admin:invite`); Test `tests/invites.test.ts`

**Produces:** `createInvite(db, actor: Actor | "system", { email, role }): Promise<{ url: string; token: string }>`; `acceptInvite(db, auth, { token, name, password }): Promise<{ userId: string }>`; `INVITE_TTL_HOURS = 72`. Token: 32 random bytes base64url; only its SHA-256 stored. Accept creates the user via `auth.api.createUser` with the invited role and marks `usedAt`.

- [ ] Tests: accept works once (second call throws `"invite_used"`); expired invite throws `"invite_expired"`; unknown token throws `"invite_invalid"`; accepted user has the invited role; non-owner actor cannot create an invite (`"forbidden"`). FAIL → implement → PASS. Commit.

### Task 4: Permissions, requireAdmin, audit + undo

**Files:** Create `src/server/auth/permissions.ts`, `src/server/auth/session.ts`, `src/server/admin/audit.ts`, `src/server/admin/refresh.ts`; Test `tests/admin-core.test.ts`

**Produces:**
- `type Role = "owner"|"editor"|"duroos_editor"|"content_editor"`; `type Permission = "duroos.write"|"announcements.write"|"content.write"|"settings.write"|"admins.manage"|"activity.undo"`; `can(role: string|null|undefined, p: Permission): boolean`
- `type Actor = { id: string; name: string; role: Role }`
- `checkAdmin(user: { role?: string|null; banned?: boolean|null; twoFactorEnabled?: boolean|null } | null, p?: Permission): "ok"|"signed_out"|"needs_2fa"|"banned"|"forbidden"` (pure); `requireAdmin(p?: Permission): Promise<Actor>` (reads session via `getAuth().api.getSession({ headers })`, redirects: signed_out → `/admin/login`, needs_2fa → `/admin/setup-2fa`, otherwise throws/`forbidden()`)
- `record(db, actor, { action, entity, entityId, before, after }): Promise<number>`; `listActivity(db, { limit }): Promise<AuditRow[]>`; `undo(db, actor, auditId): Promise<{ ok: true } | { ok: false; error: "already_undone"|"missing_row"|"not_undoable" }>` — supported entities: `lesson`, `shaykh`, `override`, `announcement`, `faq`, `guide`, `setting`.
- `refreshPublic(paths: string[]): void` — calls `revalidatePath` per path inside try/catch (no-op outside a Next request).

- [ ] Tests: permission matrix (owner all; editor no `admins.manage`; duroos_editor only duroos/announcements; content_editor only content; unknown role nothing); `checkAdmin` returns `needs_2fa` for a signed-in user without TOTP, `banned` for banned; undo of an update restores the before snapshot; undo twice → `already_undone`; undo after the row was deleted → `missing_row`; undo writes its own audit row with `undoOf`. FAIL → implement → PASS. Commit.

### Task 5: Duroos admin service

**Files:** Create `src/server/admin/duroos.ts`; Test `tests/admin-duroos.test.ts`

**Produces (all `(db, actor, input)` → result, zod-validated input, permission-checked, audited, refresh public paths):**
- `addOverride({ lessonSlug, kind, startsOn, endsOn?, noteEn?, noteAr?, sourceUrl? })` (`duroos.write`; `endsOn` defaults to `startsOn`; rejects `endsOn < startsOn`)
- `revokeOverride({ id })`
- `updateLesson({ slug, ...editable fields })`, `createLesson({...})`
- `updateShaykh({ slug, nameEn?, nameAr?, roleEn?, roleAr?, facts? })`
- `saveAnnouncement({ slug?, titleEn, titleAr, bodyEn, bodyAr, type, eventDate?, shaykhSlug?, masjidId?, sourceUrl?, status })` (`announcements.write`; publish sets `publishedAt`)
- Notes are cleaned with `cleanText`.

- [ ] Tests: content_editor cannot add an override (`"forbidden"`); duroos_editor adds a cancellation and `getToday` then reports `cancelled` with the note; revoke returns the lesson to `on`; bad dates rejected; each mutation writes one audit row; undo of `addOverride` removes the override. FAIL → implement → PASS. Commit.

### Task 6: Content, settings and admins service

**Files:** Create `src/server/admin/content.ts`, `src/server/admin/admins.ts`; Test `tests/admin-content.test.ts`

**Produces:** `saveFaq({ slug?, question, answerHtml, category, tags, status, markVerified? })`, `saveGuide({ slug?, title, summary, bodyHtml, stage, readingMinutes?, status, markVerified? })` (slug from title if absent, unique; html sanitized; readingMinutes computed at 200 wpm if absent), `deleteFaq/deleteGuide({ slug })`, `setWhatsAppUrl({ url })` (`settings.write`, must match `^https://chat\.whatsapp\.com/[A-Za-z0-9]+$`), `listAdmins()`, `setRole({ userId, role })`, `revokeAdmin({ userId })` (owner only; bans + revokes sessions; an owner cannot revoke or demote themselves).

- [ ] Tests: script tags stripped on save; published FAQ appears in `listFaqs`; invalid WhatsApp URL rejected; editor cannot `setRole`; owner cannot demote self; revoked admin's sessions deleted and `checkAdmin` → `banned`. FAIL → implement → PASS. Commit.

### Task 7: Admin shell + sign-in + 2FA + invite pages

**Files:** `src/app/(admin)/admin/layout.tsx` (own root layout, `robots: noindex`), `login/page.tsx`, `setup-2fa/page.tsx`, `invite/page.tsx`, `(app)/layout.tsx` (calls `requireAdmin()`), `src/features/admin/{AdminShell,LoginForm,TwoFactorSetup,TwoFactorVerify,InviteForm,PasskeyButton}.tsx`

Login: email + password → if `twoFactorRedirect`, show 6-digit code (or backup code) step; "Sign in with a passkey" button. Setup 2FA: shows QR (otpauth URI rendered as SVG via `qrcode` package) + manual key + backup codes, verify a code to finish. Admin shell: top bar (MESH Admin, name, sign out), bottom tab bar on mobile: Inbox · Duroos · Content · Activity · More.

- [ ] Verify in browser at 375 px: invite → accept → set up 2FA → sign out → sign in with code → reach inbox. Commit.

### Task 8: Inbox + quick actions + activity

**Files:** `src/app/(admin)/admin/(app)/page.tsx` (Inbox), `activity/page.tsx`, `src/features/admin/{QuickActions,CancelDarsSheet,ActivityList}.tsx`, server actions in `src/app/(admin)/admin/actions.ts`

Inbox: quick actions (Cancel or change a dars · Post an update · New FAQ · New guide), today's lessons with one-tap "Cancel today" per lesson, drafts awaiting publish, recent activity (10) with Undo. Placeholder card "Channel watcher arrives in the next update" is NOT shown (no placeholder UI). Activity page: full log with Undo (needs `activity.undo`).

- [ ] Verify: cancel a dars from the inbox in ≤ 3 taps, public `/duroos` shows CANCELLED, Undo restores it. Commit.

### Task 9: Duroos editors

**Files:** `src/app/(admin)/admin/(app)/duroos/**` (lesson list with search, lesson edit, override form, shaykh edit, announcements list + editor), components under `src/features/admin/duroos/`

- [ ] Verify each form saves, validates, and shows the change on the public page. Commit.

### Task 10: Content, settings and admins editors

**Files:** `src/app/(admin)/admin/(app)/content/**` (FAQ list/editor, guide list/editor with Tiptap: H2, H3, bold, italic, bullet/numbered list, link, quote), `settings/page.tsx` (WhatsApp link), `admins/page.tsx` (owner: list, invite, change role, revoke)

- [ ] Verify: write a guide with a list and a link on a phone-sized screen, publish, view it on `/guides/<slug>`. Commit.

### Task 11: Security hardening

**Files:** Create `src/proxy.ts`; Modify `next.config.ts` (headers); Test `tests/security.test.ts`

- `/admin/**`: proxy generates a per-request nonce and sets `Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-<n>' 'strict-dynamic'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'`; redirects to `/admin/login` when no session cookie (except login/invite/setup-2fa).
- Public routes (static, CDN-cached, no nonce possible): `script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com`, `frame-src https://www.youtube-nocookie.com https://challenges.cloudflare.com`, plus the same `frame-ancestors/base-uri/form-action/object-src`.
- All routes: `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, `X-Frame-Options: DENY`; `/admin` also `Cache-Control: no-store`, `X-Robots-Tag: noindex`.

- [ ] Tests: header builder returns nonce CSP for `/admin/x` and public CSP for `/duroos`; proxy redirects `/admin` without cookie to `/admin/login` and lets `/admin/login` through. FAIL → implement → PASS. Commit.

### Task 12: Verify & push

- [ ] `npm test`, `npm run typecheck`, `MESH_LOCAL_DB=1 npm run build` all green; browser run-through of Tasks 7–10 flows at 375 px light/dark; check `/admin` response headers with curl; push `revamp`.
