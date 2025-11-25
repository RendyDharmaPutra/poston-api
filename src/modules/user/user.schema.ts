import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import z from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  telegramId: varchar("telegram_id").notNull().unique(),
  username: varchar("username"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const createUserDto = z.object({
  telegramId: z.string().min(1).max(255),
  username: z.string().min(1).max(255),
});

export type CreateUserDto = z.infer<typeof createUserDto>;
