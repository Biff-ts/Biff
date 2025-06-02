import { defineRoute } from "../lib/defineRoute.ts";
import { z } from "zod";
import { postService } from "../services/post.service";
import { postSchema } from "../schemas/post.schema";
import { auth } from "../templates/base/auth/lucia.ts";
export const postRoute = defineRoute({
  method: "get",
  path: "/post",
  auth: true,
  input: z.object({}),
  output: postSchema.output,
  handler: async ({ ctx }) => {
    {{auth === 'true' ? 'const user = ctx.user;' : '// no auth required'}}
    return postService.get();
  }
});
