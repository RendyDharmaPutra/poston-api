import { Context } from "hono";
import { CreatePostDto } from "./post.schema";
import { PostService } from "./post.service";
import { response } from "../../common/utils/response";

export class PostController {
  constructor(private postService: PostService) {}

  getAll = async (ctx: Context) => {
    // return this.postService.findAll();
    return response.success(ctx, "Berhasil mendapatkan data post", []);
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
