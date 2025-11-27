import { Hono } from "hono";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { PostRepository } from "./post.repository";

import { SourceAuthorization } from "../../common/middlewares/source_authorization";

const postController = new PostController(
  new PostService(new PostRepository())
);
export const postModule = new Hono();

postModule.use(SourceAuthorization);

postModule.get("/", postController.getAll);

postModule.get("/:id", postController.getOne);

postModule.post("/", postController.create);

postModule.put("/:id", postController.update);

postModule.delete("/:id", postController.delete);
