import { Context } from "hono";
import { z } from "zod";
import { ValidationError } from "../exception/validation_error";

export const parseQuery = <T>(ctx: Context, schema: z.ZodType<T>) => {
  const query = ctx.req.query(); // raw object
  const parsed = schema.safeParse(query);

  if (!parsed.success) {
    throw new ValidationError(
      "Gagal memproses permintaan",
      parsed.error.flatten().fieldErrors
    );
  }

  return parsed.data;
};
