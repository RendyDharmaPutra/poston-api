import { HttpError } from "../../common/exception/http_error";
import { extractMetadata } from "../../common/utils/metadata/metadata_extractor";
import { PostRepository } from "./post.repository";
import { CreatePostDto } from "./post.schema";

export class PostService {
  constructor(private postRepository: PostRepository) {}

  async findAll(userId: number) {
    try {
      const result = await this.postRepository.findAll(userId);
      return result;
    } catch (error) {
      // ? Error Logging
      console.log("Post Service: findAll error", JSON.stringify(error));

      throw new HttpError("Gagal mendapatkan data Post");
    }
  }

  async findById(id: number) {
    return this.postRepository.findById(id);
  }

  async create(data: CreatePostDto, userId: number) {
    const metadata = await extractMetadata(data.url);

    console.log(metadata);

    return this.postRepository.create({ ...data, userId });
  }

  async update(id: number, data: Partial<CreatePostDto>) {
    return this.postRepository.update(id, data);
  }

  async delete(id: number) {
    return this.postRepository.delete(id);
  }
}
