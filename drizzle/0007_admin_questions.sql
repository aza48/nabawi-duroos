CREATE TABLE "admin_questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"topic" text NOT NULL,
	"question" text NOT NULL,
	"context" text DEFAULT '' NOT NULL,
	"status" text DEFAULT 'open' NOT NULL,
	"answer" text,
	"answered_by" text,
	"answered_at" timestamp with time zone,
	"exported_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "admin_questions_status_idx" ON "admin_questions" USING btree ("status");