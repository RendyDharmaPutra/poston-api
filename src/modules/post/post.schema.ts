import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  integer,
} from "drizzle-orm/pg-core";
import z from "zod";
import { users } from "../user/user.schema";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title"),
  description: text("description"),
  platform: varchar("platform"),
  url: text("url").notNull(),
  userId: integer("user_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));

export const createPostDto = z.object({
  title: z.string().max(255).nullable().optional(),
  description: z.string().max(255).nullable().optional(),
  url: z.string().min(1).max(255),
  platform: z.string().max(255).nullable().optional(),
});

export type InserPost = InferInsertModel<typeof posts>;
export type SelectPost = InferSelectModel<typeof posts>;
export type CreatePostDto = z.infer<typeof createPostDto>;
