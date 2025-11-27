import { QueryResult } from "pg";
import { db } from "../../config/db";
import { SelectUser, InsertUser, users } from "./user.schema";
import { eq } from "drizzle-orm";

export class UserRepository {
  async findAll(): Promise<SelectUser[]> {
    return db.select().from(users);
  }

  async findById(id: number): Promise<SelectUser> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async findByTelegramId(telegramId: string): Promise<SelectUser> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.telegramId, telegramId));

    return result[0];
  }

  async create(data: InsertUser): Promise<SelectUser> {
    const result = await db.insert(users).values(data).returning();

    return result[0];
  }

  async update(id: number, data: Partial<InsertUser>): Promise<SelectUser> {
    const result = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    return result[0];
  }

  async delete(id: number): Promise<QueryResult> {
    return await db.delete(users).where(eq(users.id, id));
  }
}
