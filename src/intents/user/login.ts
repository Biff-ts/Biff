import { defineIntent } from '../../core/define-intent'
import { z } from 'zod'

export const login = defineIntent("user.login", {
  input: z.object({
    email: z.string().email(),
    password: z.string().min(6)
  }),
  handler: async ({ input, ctx }) => {
    return {
      ok: true,
      email: input.email
    }
  },
  description: "loginform's Intent"
})