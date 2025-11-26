import { eq } from "drizzle-orm";
import { db } from "../../config/db";
import { InserPost, posts } from "./post.schema";

export class PostRepository {
  async findAll() {
    return db.select().from(posts);
  }

  async findById(id: number) {
    const result = await db.select().from(posts).where(eq(posts.id, id));
    return result[0];
  }

  async create(data: InserPost) {
    const result = await db.insert(posts).values(data);
    return result;
  }

  async update(id: number, data: Partial<InserPost>) {
    const result = await db.update(posts).set(data).where(eq(posts.id, id));
    return result;
  }

  async delete(id: number) {
    const result = await db.delete(posts).where(eq(posts.id, id));
    return result;
  }
}
