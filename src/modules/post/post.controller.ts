import { Context } from "hono";
import { PostService } from "./post.service";
import { response } from "../../common/utils/response";
import { UserService } from "../user/user.service";
import { getUserIdFromContext } from "../../common/helpers/get_user_id";
import { createPostDto } from "./post.schema";
import { safeParseBody } from "../../common/helpers/body";

export class PostController {
  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}

  getAll = async (ctx: Context) => {
    const userId = await getUserIdFromContext(ctx, this.userService);

    // Get all posts
    const posts = await this.postService.findAll(userId!);

    return response.success(ctx, "Berhasil mendapatkan data post", posts);
  };

  getOne = async (ctx: Context) => {
    // return this.postService.findById(id);
    return response.success(ctx, "Berhasil mendapatkan data post", []);
  };

  create = async (ctx: Context) => {
    const userId = await getUserIdFromContext(ctx, this.userService);

    const body = await safeParseBody(
      ctx,
      createPostDto,
      "Gagal menyimpan data post"
    );

    await this.postService.create(body, userId!);
    return response.success(ctx, "Berhasil menyimpan data post");
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
