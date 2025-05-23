import { z } from "zod"

export const loginUserIntent = z.object({
  email: z.string().email(),
  password: z.string().min(1)
})
