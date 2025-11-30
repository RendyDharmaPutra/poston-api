import { desc, eq, sql } from "drizzle-orm";
import { db } from "../../config/db";
import { InserPost, posts } from "./post.schema";
import { PaginationQueryDto } from "../../common/dto/pagination.dto";

export class PostRepository {
  async findAll(userId: number, { page, limit }: PaginationQueryDto) {
    const offset = (page - 1) * limit;

    // 1. Total count
    const [{ count }] = await db
      .select({
        count: sql<number>`COUNT(${posts.id})`,
      })
      .from(posts)
      .where(eq(posts.userId, userId));

    const total = Number(count);

    // 2. Paginated rows
    const rows = await db
      .select()
      .from(posts)
      .where(eq(posts.userId, userId))
      .limit(limit)
      .offset(offset)
      .orderBy(desc(posts.createdAt));

    // 3. Hitung lastPage
    const lastPage = Math.ceil(total / limit);

    return {
      data: rows,
      meta: {
        page,
        limit,
        total,
        lastPage,
      },
    };
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
