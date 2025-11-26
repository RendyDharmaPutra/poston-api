import { Context } from "hono";
import { PostService } from "./post.service";
import { response } from "../../common/utils/response";

export class PostController {
  constructor(private postService: PostService) {}

  getAll = async (ctx: Context) => {
    // Checking request platform in header through middlewware

    // Get UserId based on request platform
    // A. Extract from jwt for website
    // B. Fetch user data based on telegram_id for telegram botc // ? Using UserService
    // ? Dummy UserId
    const userId = 1;

    // Get all posts
    const posts = await this.postService.findAll(userId);

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
