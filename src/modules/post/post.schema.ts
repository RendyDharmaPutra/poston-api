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
  title: z
    .string("Format title tidak valid")
    .max(255, "Panjang title maksimal 255 karakter")
    .nullable()
    .optional(),

  description: z
    .string("Format description tidak valid")
    .max(255, "Panjang description maksimal 255 karakter")
    .nullable()
    .optional(),

  url: z
    .string("Format url tidak valid")
    .url("Format url tidak valid")
    .min(11, "Panjang url minimal 11 karakter")
    .max(255, "Panjang url maksimal 255 karakter"),

  platform: z
    .string("Format platform tidak valid")
    .max(255, "Panjang platform maksimal 255 karakter")
    .nullable()
    .optional(),
});

export type InserPost = InferInsertModel<typeof posts>;
export type SelectPost = InferSelectModel<typeof posts>;
export type CreatePostDto = z.infer<typeof createPostDto>;
