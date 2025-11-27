import { Context } from "hono";
import { PostService } from "./post.service";
import { response } from "../../common/utils/response";
import { UserService } from "../user/user.service";

export class PostController {
  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}

  getAll = async (ctx: Context) => {
    // Get UserId based on request platform
    let userId: number;

    const platform = ctx.get("platform");

    if (platform == "web") {
      // A. Extract from jwt for website
      userId = 1; // ? Dummy
    } else if (platform == "bot") {
      // B. Fetch user data based on telegram_id for telegram bot // ? Using UserService
      const telegramId = ctx.get("telegramId");

      const user = await this.userService.findOrCreate(telegramId);

      userId = user.id;
    }

    // Get all posts
    const posts = await this.postService.findAll(userId!);

    return response.success(ctx, "Berhasil mendapatkan data post", posts);
  };

  getOne = async (ctx: Context) => {
    // return this.postService.findById(id);
    return response.success(ctx, "Berhasil mendapatkan data post", []);
  };

  create = async (ctx: Context) => {
    // return this.postService.create(data);
    return response.success(ctx, "Berhasil menyimpan data post", []);
  };

  update = async (ctx: Context) => {
    // return this.postService.update(id, data);
    return response.success(ctx, "Berhasil memperbarui data post", []);
  };

  delete = async (ctx: Context) => {
    // return this.postService.delete(id);
    return response.success(ctx, "Berhasil menghapus data post", []);
  };
}
