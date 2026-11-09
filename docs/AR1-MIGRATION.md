# AR1 migration: Arabic columns for guides and answers

Owner steps for the AR1 pull request (branch `aiakhee/AR1-arabic-columns`). **Apply the migration in production before you merge the PR.** The merged code reads the new columns, so a deploy without them breaks every guide and answer page.

## What the migration does

`drizzle/0008_arabic-content.sql` adds five empty, nullable text columns and nothing else:

```sql
ALTER TABLE "faqs" ADD COLUMN "question_ar" text;
ALTER TABLE "faqs" ADD COLUMN "answer_html_ar" text;
ALTER TABLE "guides" ADD COLUMN "title_ar" text;
ALTER TABLE "guides" ADD COLUMN "summary_ar" text;
ALTER TABLE "guides" ADD COLUMN "body_html_ar" text;
```

- No defaults, no drops, no renames and no data changes. Existing rows get `null`, which means "not translated": the Arabic pages keep showing the English with the "this page is in English" note.
- It is safe for the code live today. The current production code never selects these columns, so it keeps working after the migration and before the merge.
- A test (`tests/ar1-arabic-columns.test.ts`) fails if the file ever does more than add these nullable columns.

## How to apply it in production

The project's own command applies migrations first (`migrateLive` in `src/server/db/client.ts`), then syncs the seeded content. To apply only the migration, give `--only` a slug that does not exist, so nothing else is written:

1. Check out the PR branch: `git fetch origin && git checkout aiakhee/AR1-arabic-columns && npm ci`.
2. Make sure `.env.production.local` holds the live `DATABASE_URL` (as for every `content:sync`).
3. Run `npm run content:sync -- --only=none`.
4. It prints `Migrations applied`, then `Published only none { guides: 0, faqs: 0 }`.

Do not run the SQL above by hand in the Supabase editor: Drizzle records each migration in `drizzle.__drizzle_migrations`, and a hand-run change would make the next `content:sync` try to add the columns again and stop with "column already exists".

## How to check it worked

In the Supabase SQL editor:

```sql
select table_name, column_name, data_type, is_nullable
from information_schema.columns
where table_name in ('guides', 'faqs') and column_name like '%\_ar'
order by table_name, column_name;
```

Expect five rows, all `text` and `is_nullable = YES`: `faqs.answer_html_ar`, `faqs.question_ar`, `guides.body_html_ar`, `guides.summary_ar`, `guides.title_ar`.

```sql
select created_at from drizzle.__drizzle_migrations order by created_at desc limit 1;
```

Expect `1794229045103` (the `when` of `0008_arabic-content` in `drizzle/meta/_journal.json`).

## Then

1. Merge the PR. Production deploys and the admin guide and answer forms get an English | العربية tab. An editor can add Arabic there straight away; empty Arabic fields keep the English on the Arabic page.
2. Once Arabic text is in the seed files (`titleAr`, `summaryAr`, `bodyHtmlAr` on guides; `questionAr`, `answerHtmlAr` on answers), run `npm run content:sync` from `main` as usual. It writes the seeded Arabic.
   - A guide or answer with no Arabic in the seed keeps any Arabic an editor added in Admin.
   - A new or changed Arabic title, body, question or answer counts as a fresh check ("Last checked" moves to that day). Re-running the sync with the same text does not.
