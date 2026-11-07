CREATE TABLE "lesson_live" (
	"lesson_slug" text PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"post_url" text NOT NULL,
	"started_at" timestamp with time zone NOT NULL
);
