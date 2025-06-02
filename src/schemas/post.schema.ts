import { z } from "zod";

export const postSchema = {
  input: z.object({
    title: z.string()
  }),
  output: z.object({
    id: z.string(),
    title: z.string()
  })
};
export const PostInput = z.object({
  title: z.string(),
  body: z.string(),
});

export type PostInput = z.infer<typeof postSchema.input>;
export type PostOutput = z.infer<typeof postSchema.output>;
