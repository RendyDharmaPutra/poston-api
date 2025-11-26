import { PostRepository } from "./post.repository";
import { InserPost } from "./post.schema";

export class PostService {
  constructor(private postRepository: PostRepository) {}

  async findAll() {
    return this.postRepository.findAll();
  }

  async findById(id: number) {
    return this.postRepository.findById(id);
  }

  async create(data: InserPost) {
    return this.postRepository.create(data);
  }

  async update(id: number, data: Partial<InserPost>) {
    return this.postRepository.update(id, data);
  }

  async delete(id: number) {
    return this.postRepository.delete(id);
  }
}
