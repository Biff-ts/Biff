import { z } from 'zod';
import { NotFoundError } from '../../../src/errors';

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
    if (input.params.id === '00000000-0000-0000-0000-000000000000') {
    throw new NotFoundError('User not found');
  }

 return { id: input.params.id, name: "Alice" }; 
};
