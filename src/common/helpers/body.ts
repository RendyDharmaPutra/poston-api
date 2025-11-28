import { Context } from "hono";
import { ValidationError } from "../exception/validation_error";
import { z } from "zod";

export const safeParseBody = async <T>(
  c: Context,
  dto: z.ZodType<T>,
  errorName: string
) => {
  const rawBody = await c.req.json();

  const parsed = dto.safeParse(rawBody);
  if (!parsed.success) {
    throw new ValidationError(errorName, parsed.error.flatten().fieldErrors);
  }

  return parsed.data;
};
