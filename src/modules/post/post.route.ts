import { Hono } from "hono";
import { PostController } from "./post.controller";
import { postService } from ".";
import { userService } from "../user";
import { SourceAuthorization } from "../../common/middlewares/source_authorization";
import { requireJsonBody } from "../../common/middlewares/json_body.guard";

const postController = new PostController(postService, userService);
export const postModule = new Hono();

postModule.use(SourceAuthorization);
postModule.use(requireJsonBody);

postModule.get("/", postController.getAll);

postModule.get("/:id", postController.getOne);

postModule.post("/", postController.create);

postModule.put("/:id", postController.update);

postModule.delete("/:id", postController.delete);
