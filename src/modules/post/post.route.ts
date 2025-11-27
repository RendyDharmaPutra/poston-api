import { Hono } from "hono";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { PostRepository } from "./post.repository";

import { SourceAuthorization } from "../../common/middlewares/source_authorization";
import { UserService } from "../user/user.service";
import { UserRepository } from "../user/user.repository";

const postController = new PostController(
  new PostService(new PostRepository()),
  new UserService(new UserRepository())
);
export const postModule = new Hono();

postModule.use(SourceAuthorization);

postModule.get("/", postController.getAll);

postModule.get("/:id", postController.getOne);

postModule.post("/", postController.create);

postModule.put("/:id", postController.update);

postModule.delete("/:id", postController.delete);
