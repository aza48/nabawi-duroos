CREATE TABLE "channel_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"source_handle" text NOT NULL,
	"post_id" text NOT NULL,
	"url" text NOT NULL,
	"text" text NOT NULL,
	"image_url" text,
	"posted_at" timestamp with time zone NOT NULL,
	"text_hash" text NOT NULL,
	"status" text DEFAULT 'new' NOT NULL,
	"parse" jsonb,
	"would_auto" boolean DEFAULT false NOT NULL,
	"reason" text,
	"override_id" integer,
	"decided_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "channel_posts_post_id_unique" UNIQUE("post_id")
);
--> statement-breakpoint
CREATE TABLE "sources" (
	"handle" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"trusted" boolean DEFAULT true NOT NULL,
	"auto_publish" boolean DEFAULT false NOT NULL,
	"last_checked_at" timestamp with time zone,
	"last_error" text
);
--> statement-breakpoint
ALTER TABLE "channel_posts" ADD CONSTRAINT "channel_posts_source_handle_sources_handle_fk" FOREIGN KEY ("source_handle") REFERENCES "public"."sources"("handle") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "channel_posts_status_idx" ON "channel_posts" USING btree ("status","posted_at");