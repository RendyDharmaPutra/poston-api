import { z } from "zod";

export const paginationQueryDto = z.object({
  page: z
    .string()
    .default("1")
    .transform((page) => parseInt(page)),
  limit: z
    .string()
    .default("10")
    .transform((limit) => parseInt(limit)),
});

export type PaginationQueryDto = z.infer<typeof paginationQueryDto>;
