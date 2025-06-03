import { z } from 'zod';

export const input = {
  params: z.object({ id: z.string().uuid() }), // UUIDである必要あり
};

export const output = z.object({
  id: z.string(),
  name: z.string(),
});

type InputType = {
  params: z.infer<typeof input.params>;
};

export const GET = async ({ input }: { input: InputType }) => {
  return { id: input.params.id, name: "Alice" };
};
