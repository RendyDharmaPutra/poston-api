import { Hono } from "hono";
import { response } from "../../common/utils/response";

export const postModule = new Hono();

postModule.get("/", (c) => {
  return response.success(c, "Sukses mengakses endpoint GET /posts");
});

postModule.get("/:id", (c) => {
  return response.success(c, "Sukses mengakses endpoint GET /posts/:id");
});

postModule.post("/", (c) => {
  return response.success(c, "Sukses mengakses endpoint POST /posts");
});

postModule.put("/:id", (c) => {
  return response.success(c, "Sukses mengakses endpoint PUT /posts/:id");
});

postModule.delete("/:id", (c) => {
  return response.success(c, "Sukses mengakses endpoint DELETE /posts/:id");
});
