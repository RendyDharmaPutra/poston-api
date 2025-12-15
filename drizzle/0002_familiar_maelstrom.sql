ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "caption" text;--> statement-breakpoint
ALTER TABLE "posts" DROP COLUMN IF EXISTS "title";--> statement-breakpoint
ALTER TABLE "posts" DROP COLUMN IF EXISTS "description";