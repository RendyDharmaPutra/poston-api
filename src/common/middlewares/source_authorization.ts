import { createMiddleware } from "hono/factory";
import { env } from "../../config/env";
import { response } from "../utils/response";

export const SourceAuthorization = createMiddleware(async (c, next) => {
  const botSecretReq = c.req.header("X-Bot-Secret");
  const jwtToken = c.req.header("Authorization");

  if (botSecretReq) {
    const telegramId = c.get("X-Telegram-Id");

    if (botSecretReq != env.BOT_SECRET) {
      return response.error(
        c,
        "Akses tidak diijinkan",
        "Bot Secret tidak valid",
        401
      );
    }

    if (!telegramId) {
      return response.error(
        c,
        "Akses tidak diijinkan",
        "Telegram ID tidak valid",
        401
      );
    }

    c.set("platform", "bot");
    c.set("telegramId", telegramId);
  } else if (jwtToken) {
    /* 
       Todo :
       1. Validate JWT token
       2. Extract UserId from JWT payload
       3. Set user context in c.set()
    */

    c.set("platform", "web");
  } else {
    // No valid authorization provided
    return response.error(
      c,
      "Akses tidak diijinkan",
      "Header Request tidak valid",
      401
    );
  }

  await next();
});
