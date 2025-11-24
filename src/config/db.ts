import { Pool } from "pg";
import { env } from "./env";
import { drizzle } from "drizzle-orm/node-postgres";

const pool = new Pool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  max: 10,
  idleTimeoutMillis: 30000,
});

export const db = drizzle(pool);
