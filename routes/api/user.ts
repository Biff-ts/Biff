// routes/api/user.ts
import { z } from 'zod';

export const input = {
  query: z.object({ id: z.string() })
};

export const output = z.object({
  id: z.string(),
  name: z.string(),
});

type InputType = {
  query: z.infer<typeof input.query>;
};

export const GET = async ({ input }: { input: InputType }) => {
  return { id: input.query.id, name: "AleX" };
};
