import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();
export const router = c.router({
  user__id: {
    path: '/api/user/:id',
    method: 'GET',
    query: z.object({  }),
    responses: {
      200: z.object({ id: z.string(), name: z.string() })
    }
  },
  user: {
    path: '/api/user',
    method: 'GET',
    query: z.object({ id: z.string() }),
    responses: {
      200: z.object({ id: z.string(), name: z.string() })
    }
  },
});