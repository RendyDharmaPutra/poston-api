import { PostService } from "./post.service";
import { PostRepository } from "./post.repository";

export const postService = new PostService(new PostRepository());
