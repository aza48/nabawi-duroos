CREATE TABLE "announcements" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"shaykh_id" integer,
	"guest_name_en" text,
	"guest_name_ar" text,
	"lesson_id" integer,
	"masjid_id" text,
	"type" text NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"body_en" text NOT NULL,
	"body_ar" text NOT NULL,
	"event_date" date,
	"image_url" text,
	"source_handle" text,
	"source_url" text,
	"posted_at" timestamp with time zone DEFAULT now() NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"published_at" timestamp with time zone,
	CONSTRAINT "announcements_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"masjid_id" text,
	"kind" text NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"shaykh_en" text,
	"shaykh_ar" text,
	"hijri_label_en" text NOT NULL,
	"hijri_label_ar" text NOT NULL,
	"prayer_label_en" text,
	"prayer_label_ar" text,
	"starts_on" date NOT NULL,
	"ends_on" date NOT NULL,
	"source_url" text,
	CONSTRAINT "events_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "faqs" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"question" text NOT NULL,
	"answer_html" text NOT NULL,
	"category" text NOT NULL,
	"tags" text[] DEFAULT '{}' NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"last_verified_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "faqs_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "guides" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"summary" text NOT NULL,
	"body_html" text NOT NULL,
	"stage" text NOT NULL,
	"cover_url" text,
	"reading_minutes" integer DEFAULT 1 NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"last_verified_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "guides_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "lesson_overrides" (
	"id" serial PRIMARY KEY NOT NULL,
	"lesson_id" integer NOT NULL,
	"kind" text NOT NULL,
	"starts_on" date NOT NULL,
	"ends_on" date NOT NULL,
	"note_en" text,
	"note_ar" text,
	"source_url" text,
	"origin" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"revoked_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "lessons" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"shaykh_id" integer NOT NULL,
	"masjid_id" text NOT NULL,
	"book_en" text NOT NULL,
	"book_ar" text NOT NULL,
	"book_author_en" text,
	"book_author_ar" text,
	"topic" text NOT NULL,
	"prayer" text NOT NULL,
	"days" integer[] DEFAULT '{}' NOT NULL,
	"days_label_en" text,
	"days_label_ar" text,
	"frequency_en" text,
	"frequency_ar" text,
	"time_label_en" text,
	"time_label_ar" text,
	"prayer_note_en" text,
	"prayer_note_ar" text,
	"location_en" text NOT NULL,
	"location_ar" text NOT NULL,
	"note_en" text,
	"note_ar" text,
	"sequence_en" text,
	"sequence_ar" text,
	"status" text DEFAULT 'active' NOT NULL,
	"valid_from" date,
	"valid_to" date,
	"sort" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "lessons_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "masjids" (
	"id" text PRIMARY KEY NOT NULL,
	"name_en" text NOT NULL,
	"name_ar" text NOT NULL,
	"short_en" text NOT NULL,
	"short_ar" text NOT NULL,
	"map_url" text,
	"sort" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"key" text PRIMARY KEY NOT NULL,
	"value" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shaykhs" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name_en" text NOT NULL,
	"name_ar" text NOT NULL,
	"photo" text,
	"role_en" text,
	"role_ar" text,
	"facts" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "shaykhs_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "streams" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"label_en" text NOT NULL,
	"label_ar" text NOT NULL,
	"kind" text NOT NULL,
	"url" text NOT NULL,
	"check_url" text,
	"shaykh_id" integer,
	"masjid_id" text,
	"is_live" boolean DEFAULT false NOT NULL,
	"live_url" text,
	"checked_at" timestamp with time zone,
	CONSTRAINT "streams_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_shaykh_id_shaykhs_id_fk" FOREIGN KEY ("shaykh_id") REFERENCES "public"."shaykhs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_masjid_id_masjids_id_fk" FOREIGN KEY ("masjid_id") REFERENCES "public"."masjids"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_masjid_id_masjids_id_fk" FOREIGN KEY ("masjid_id") REFERENCES "public"."masjids"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson_overrides" ADD CONSTRAINT "lesson_overrides_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_shaykh_id_shaykhs_id_fk" FOREIGN KEY ("shaykh_id") REFERENCES "public"."shaykhs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_masjid_id_masjids_id_fk" FOREIGN KEY ("masjid_id") REFERENCES "public"."masjids"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "streams" ADD CONSTRAINT "streams_shaykh_id_shaykhs_id_fk" FOREIGN KEY ("shaykh_id") REFERENCES "public"."shaykhs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "streams" ADD CONSTRAINT "streams_masjid_id_masjids_id_fk" FOREIGN KEY ("masjid_id") REFERENCES "public"."masjids"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "announcements_status_idx" ON "announcements" USING btree ("status","posted_at");--> statement-breakpoint
CREATE INDEX "overrides_lesson_dates_idx" ON "lesson_overrides" USING btree ("lesson_id","starts_on","ends_on");--> statement-breakpoint
CREATE INDEX "lessons_shaykh_idx" ON "lessons" USING btree ("shaykh_id");--> statement-breakpoint
CREATE INDEX "lessons_masjid_idx" ON "lessons" USING btree ("masjid_id");