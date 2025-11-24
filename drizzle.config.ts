import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/modules/**/**.schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url:
      `postgresql://${Bun.env.DB_USER}:${Bun.env.DB_PASSWORD}` +
      `@${Bun.env.DB_HOST}:${Bun.env.DB_PORT}/${Bun.env.DB_NAME}`,
  },
});
