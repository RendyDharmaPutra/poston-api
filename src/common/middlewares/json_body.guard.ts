import { Context } from "hono";
import { HttpError } from "../exception/http_error";

export const requireJsonBody = async (
  c: Context,
  next: () => Promise<void>
) => {
  const contentType = c.req.header("content-type");

  if (["POST", "PUT", "PATCH"].includes(c.req.method)) {
    if (!contentType?.includes("application/json")) {
      throw new HttpError(
        "Gagal memproses permintaan",
        "Tipe media permintaan tidak didukung",
        415
      );
    }
  }

  await next();
};
