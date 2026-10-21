import { query, queryOne, dbConfigured } from "./db";
import { meshCategories, meshSeedQuestions, meshSeedUsers, meshTags } from "@/data/mesh-seed";
import { meshSeedArticles } from "@/data/mesh-articles-seed";

export { dbConfigured };

let _init: Promise<void> | null = null;
export function initMeshDb(): Promise<void> {
  if (!_init) { _init = doInit().catch((e) => { _init = null; throw e; }); }
  return _init;
}

async function doInit(): Promise<void> {
  await query(`CREATE TABLE IF NOT EXISTS mesh_users (id serial PRIMARY KEY, email text UNIQUE NOT NULL, display_name text NOT NULL, password_hash text NOT NULL, bio text, role text DEFAULT 'member', is_seed boolean DEFAULT false, created_at timestamptz DEFAULT now())`);
  // Phase 2: email verification + cohort + recovery email + country (idempotent; existing users grandfathered as verified)
  await query(`ALTER TABLE mesh_users ADD COLUMN IF NOT EXISTS email_verified boolean NOT NULL DEFAULT true`);
  await query(`ALTER TABLE mesh_users ADD COLUMN IF NOT EXISTS entry_year_hijri int`);
  await query(`ALTER TABLE mesh_users ADD COLUMN IF NOT EXISTS personal_email text`);
  await query(`ALTER TABLE mesh_users ADD COLUMN IF NOT EXISTS country text`);
  await query(`CREATE TABLE IF NOT EXISTS mesh_email_codes (id serial PRIMARY KEY, user_id int NOT NULL REFERENCES mesh_users(id) ON DELETE CASCADE, purpose text NOT NULL CHECK (purpose IN ('signup','reset')), code_hash text NOT NULL, expires_at timestamptz NOT NULL, attempts int NOT NULL DEFAULT 0, consumed_at timestamptz, created_at timestamptz DEFAULT now())`);
  await query(`CREATE INDEX IF NOT EXISTS idx_mesh_email_codes_lookup ON mesh_email_codes (user_id, purpose, created_at DESC)`);
  await query(`CREATE TABLE IF NOT EXISTS mesh_sessions (id serial PRIMARY KEY, user_id int NOT NULL REFERENCES mesh_users(id) ON DELETE CASCADE, token_hash text UNIQUE NOT NULL, expires_at timestamptz NOT NULL, created_at timestamptz DEFAULT now())`);
  await query(`CREATE TABLE IF NOT EXISTS mesh_categories (id serial PRIMARY KEY, slug text UNIQUE NOT NULL, name text NOT NULL, description text, parent_id int REFERENCES mesh_categories(id), display_order int DEFAULT 0, is_main boolean DEFAULT false)`);
  await query(`CREATE TABLE IF NOT EXISTS mesh_answers (id serial PRIMARY KEY, question_id int, author_id int REFERENCES mesh_users(id), body text NOT NULL, is_seed boolean DEFAULT false, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now())`);
  await query(`CREATE TABLE IF NOT EXISTS mesh_questions (id serial PRIMARY KEY, author_id int REFERENCES mesh_users(id), category_id int REFERENCES mesh_categories(id), title text NOT NULL, body text NOT NULL, is_seed boolean DEFAULT false, accepted_answer_id int, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now())`);
  // Add FKs safely
  await query(`DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='fk_mesh_answers_question') THEN ALTER TABLE mesh_answers ADD CONSTRAINT fk_mesh_answers_question FOREIGN KEY (question_id) REFERENCES mesh_questions(id) ON DELETE CASCADE; END IF; END $$`);
  await query(`DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='fk_mesh_questions_accepted') THEN ALTER TABLE mesh_questions ADD CONSTRAINT fk_mesh_questions_accepted FOREIGN KEY (accepted_answer_id) REFERENCES mesh_answers(id) ON DELETE SET NULL; END IF; EXCEPTION WHEN others THEN NULL; END $$`);
  await query(`CREATE TABLE IF NOT EXISTS mesh_votes (id serial PRIMARY KEY, user_id int NOT NULL REFERENCES mesh_users(id) ON DELETE CASCADE, target_type text NOT NULL CHECK (target_type IN ('question','answer')), target_id int NOT NULL, created_at timestamptz DEFAULT now(), UNIQUE(user_id,target_type,target_id))`);
  await query(`CREATE TABLE IF NOT EXISTS mesh_tags (id serial PRIMARY KEY, name text NOT NULL, slug text UNIQUE NOT NULL)`);
  await query(`CREATE TABLE IF NOT EXISTS mesh_question_tags (question_id int NOT NULL REFERENCES mesh_questions(id) ON DELETE CASCADE, tag_id int NOT NULL REFERENCES mesh_tags(id) ON DELETE CASCADE, PRIMARY KEY(question_id,tag_id))`);
  await query(`CREATE TABLE IF NOT EXISTS mesh_reports (id serial PRIMARY KEY, reporter_id int REFERENCES mesh_users(id), target_type text NOT NULL, target_id int NOT NULL, reason text NOT NULL, status text DEFAULT 'open', created_at timestamptz DEFAULT now())`);
  // Phase 4: thread lifecycle — status, soft delete, staff updates, event history, notifications (all idempotent)
  await query(`ALTER TABLE mesh_questions ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'open'`);
  await query(`DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='ck_mesh_questions_status') THEN ALTER TABLE mesh_questions ADD CONSTRAINT ck_mesh_questions_status CHECK (status IN ('open','resolved','locked')); END IF; END $$`);
  await query(`ALTER TABLE mesh_questions ADD COLUMN IF NOT EXISTS deleted_at timestamptz`);
  await query(`ALTER TABLE mesh_questions ADD COLUMN IF NOT EXISTS deleted_by int`);
  await query(`ALTER TABLE mesh_answers ADD COLUMN IF NOT EXISTS is_staff_update boolean NOT NULL DEFAULT false`);
  await query(`ALTER TABLE mesh_answers ADD COLUMN IF NOT EXISTS deleted_at timestamptz`);
  await query(`ALTER TABLE mesh_answers ADD COLUMN IF NOT EXISTS deleted_by int`);
  await query(`CREATE TABLE IF NOT EXISTS mesh_question_events (id serial PRIMARY KEY, question_id int NOT NULL REFERENCES mesh_questions(id) ON DELETE CASCADE, actor_id int REFERENCES mesh_users(id) ON DELETE SET NULL, type text NOT NULL, detail text, created_at timestamptz DEFAULT now())`);
  await query(`CREATE INDEX IF NOT EXISTS idx_mesh_question_events_q ON mesh_question_events (question_id, created_at DESC)`);
  await query(`CREATE TABLE IF NOT EXISTS mesh_notifications (id serial PRIMARY KEY, user_id int NOT NULL REFERENCES mesh_users(id) ON DELETE CASCADE, type text NOT NULL, question_id int, answer_id int, actor_id int, read_at timestamptz, created_at timestamptz DEFAULT now())`);
  await query(`CREATE INDEX IF NOT EXISTS idx_mesh_notifications_user ON mesh_notifications (user_id, read_at)`);
  // Phase 5: admin console — suspension flag + audit log (all idempotent)
  await query(`ALTER TABLE mesh_users ADD COLUMN IF NOT EXISTS suspended_at timestamptz`);
  await query(`CREATE TABLE IF NOT EXISTS mesh_audit_log (id serial PRIMARY KEY, actor_id int, action text NOT NULL, target_type text, target_id int, detail text, created_at timestamptz DEFAULT now())`);
  await query(`CREATE INDEX IF NOT EXISTS idx_mesh_audit_created ON mesh_audit_log (created_at DESC)`);
  // One-time backfill: questions that already have an accepted solution count as resolved.
  // The NOT EXISTS guard keeps this one-time: once a lifecycle event exists (e.g. a reopen), later inits never flip it back.
  await query(`UPDATE mesh_questions SET status='resolved' WHERE accepted_answer_id IS NOT NULL AND status='open' AND NOT EXISTS (SELECT 1 FROM mesh_question_events e WHERE e.question_id = mesh_questions.id)`);
  // Resources (articles): long-form guides written by mandoobs/admins, liked by any member.
  // author_id is nullable with ON DELETE SET NULL so deleting a member account never breaks articles.
  await query(`CREATE TABLE IF NOT EXISTS mesh_articles (id serial PRIMARY KEY, author_id int REFERENCES mesh_users(id) ON DELETE SET NULL, title text NOT NULL, banner text, body_html text NOT NULL DEFAULT '', status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')), is_seed boolean DEFAULT false, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now())`);
  await query(`CREATE TABLE IF NOT EXISTS mesh_article_likes (id serial PRIMARY KEY, article_id int NOT NULL REFERENCES mesh_articles(id) ON DELETE CASCADE, user_id int NOT NULL REFERENCES mesh_users(id) ON DELETE CASCADE, created_at timestamptz DEFAULT now(), UNIQUE(article_id,user_id))`);
  await seedMeshIfEmpty();
  await seedMeshArticlesIfEmpty();
}

function slugify(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }

export async function seedMeshIfEmpty(): Promise<void> {
  const existing = await queryOne<{ c: string }>(`SELECT count(*)::text as c FROM mesh_categories`);
  if (existing && parseInt(existing.c, 10) > 0) return;
  const catId = new Map<string, number>();
  for (const c of meshCategories.filter((x) => !x.parentSlug)) {
    const r = await queryOne<{ id: number }>(`INSERT INTO mesh_categories (slug,name,description,display_order,is_main) VALUES ($1,$2,$3,$4,$5) RETURNING id`, [c.slug, c.name, c.description, c.displayOrder, c.isMain]);
    if (r) catId.set(c.slug, r.id);
  }
  for (const c of meshCategories.filter((x) => x.parentSlug)) {
    const pid = catId.get(c.parentSlug!) ?? null;
    const r = await queryOne<{ id: number }>(`INSERT INTO mesh_categories (slug,name,description,parent_id,display_order,is_main) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id`, [c.slug, c.name, c.description, pid, c.displayOrder, c.isMain]);
    if (r) catId.set(c.slug, r.id);
  }
  const tagId = new Map<string, number>();
  for (const t of meshTags) {
    const r = await queryOne<{ id: number }>(`INSERT INTO mesh_tags (name,slug) VALUES ($1,$2) ON CONFLICT (slug) DO UPDATE SET name=EXCLUDED.name RETURNING id`, [t, slugify(t)]);
    if (r) tagId.set(t, r.id);
  }
  const userIdMap = new Map<number, number>();
  for (const u of meshSeedUsers) {
    const email = `seed${u.id}@mesh.local`;
    const r = await queryOne<{ id: number }>(`INSERT INTO mesh_users (email,display_name,password_hash,bio,is_seed,created_at,role,entry_year_hijri,country) VALUES ($1,$2,'seed-no-login',$3,true,$4,$5,$6,$7) ON CONFLICT (email) DO UPDATE SET display_name=EXCLUDED.display_name RETURNING id`, [email, u.displayName, u.bio, u.createdAt, u.role ?? "member", u.entryYear ?? null, u.country ?? null]);
    if (r) userIdMap.set(u.id, r.id);
  }
  // Insert questions preserving seed id order via insertion; store mapping seedQid->dbId, seedAid->dbId
  const qMap = new Map<number, number>(); const aMap = new Map<number, number>();
  for (const qq of meshSeedQuestions) {
    const catSlug = qq.subcategorySlug ?? qq.categorySlug;
    const cid = catId.get(catSlug) ?? catId.get(qq.categorySlug);
    // Store main category as category_id per spec (questions belong to main, subcategory via tag-like? we use subcategory category if present for filtering, fallback main)
    // To keep category filtering simple, use subcategory id when available else main
    const r = await queryOne<{ id: number }>(`INSERT INTO mesh_questions (author_id,category_id,title,body,is_seed,created_at,updated_at) VALUES ($1,$2,$3,$4,true,$5,$5) RETURNING id`, [userIdMap.get(qq.authorId), cid, qq.title, qq.body, qq.createdAt]);
    if (!r) continue; qMap.set(qq.id, r.id);
    for (const t of qq.tags) { const tid = tagId.get(t); if (tid) await query(`INSERT INTO mesh_question_tags (question_id,tag_id) VALUES ($1,$2) ON CONFLICT DO NOTHING`, [r.id, tid]); }
    for (const ans of qq.answers) {
      const ar = await queryOne<{ id: number }>(`INSERT INTO mesh_answers (question_id,author_id,body,is_seed,created_at,updated_at) VALUES ($1,$2,$3,true,$4,$4) RETURNING id`, [r.id, userIdMap.get(ans.authorId), ans.body, ans.createdAt]);
      if (ar) aMap.set(ans.id, ar.id);
    }
    if (qq.acceptedAnswerId && aMap.get(qq.acceptedAnswerId)) {
      await query(`UPDATE mesh_questions SET accepted_answer_id=$1, status='resolved' WHERE id=$2`, [aMap.get(qq.acceptedAnswerId), r.id]);
    }
    // votes: distribute seed votes as rows from seed users (cycle) up to voteCount, and answer votes similarly
    const voters = Array.from(userIdMap.values());
    for (let i = 0; i < Math.min(qq.voteCount, voters.length * 3); i++) {
      const voter = voters[i % voters.length];
      // unique constraint prevents dup per user; use extra users by creating vote only once per user — cap at voters count for questions, remainder ignored (counts derived from votes table will be lower in DB seed; acceptable, demo fallback shows full counts)
      if (i < voters.length) { try { await query(`INSERT INTO mesh_votes (user_id,target_type,target_id) VALUES ($1,'question',$2) ON CONFLICT DO NOTHING`, [voter, r.id]); } catch { /* */ } }
    }
    for (const ans of qq.answers) {
      const dbAid = aMap.get(ans.id); if (!dbAid) continue;
      for (let i = 0; i < Math.min(ans.voteCount, voters.length); i++) {
        try { await query(`INSERT INTO mesh_votes (user_id,target_type,target_id) VALUES ($1,'answer',$2) ON CONFLICT DO NOTHING`, [voters[i], dbAid]); } catch { /* */ }
      }
    }
  }
}

/** Seed the two sample Resources articles, attributed to the seed mandoob. Runs whenever the
 *  articles table is empty — including on existing installs where seedMeshIfEmpty has already run. */
export async function seedMeshArticlesIfEmpty(): Promise<void> {
  const existing = await queryOne<{ c: string }>(`SELECT count(*)::text as c FROM mesh_articles`);
  if (existing && parseInt(existing.c, 10) > 0) return;
  const mandoob = meshSeedUsers.find((u) => u.role === "mandoob");
  if (!mandoob) return;
  const author = await queryOne<{ id: number }>(`SELECT id FROM mesh_users WHERE email=$1`, [`seed${mandoob.id}@mesh.local`]);
  if (!author) return;
  for (const a of meshSeedArticles) {
    await query(`INSERT INTO mesh_articles (author_id,title,body_html,status,is_seed) VALUES ($1,$2,$3,'published',true)`, [author.id, a.title, a.bodyHtml]);
  }
}

export async function ensureMesh() { if (!dbConfigured()) return false; await initMeshDb(); return true; }
