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

  async create(data: InsertUser): Promise<QueryResult> {
    return await db.insert(users).values(data);
  }

  async update(id: number, data: Partial<InsertUser>): Promise<QueryResult> {
    return await db.update(users).set(data).where(eq(users.id, id));
  }

  async delete(id: number): Promise<QueryResult> {
    return await db.delete(users).where(eq(users.id, id));
  }
}
