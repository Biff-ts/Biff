import { PostOutput } from "../schemas/post.schema";

export const postService = {
  get: async (): Promise<PostOutput[]> => {
    return [
      { id: "1", title: "サンプル" }
    ];
  }
};
export async function createPost(input: any, ctx: { user: { id: string } }) {
  return {
    ...input,
    id: 'mock-id',
  }
}
