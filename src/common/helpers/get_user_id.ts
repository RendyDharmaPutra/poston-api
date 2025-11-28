import { Context } from "hono";
import { HttpError } from "../exception/http_error";
import { UserService } from "../../modules/user/user.service";

export const getUserIdFromContext = async (
  ctx: Context,
  userService: UserService
) => {
  const platform = ctx.get("platform");

  if (platform == "web") {
    // A. Extract from jwt for website
    return 1; // ? Dummy
  } else if (platform == "bot") {
    // B. Fetch user data based on telegram_id for telegram bot // ? Using UserService
    const telegramId = ctx.get("telegramId");

    return (await userService.findOrCreate(telegramId)).id;
  }

  throw new HttpError(
    "Gagal mendapatkan ID pengguna",
    "Sumber request tidak valid",
    401
  );
};
