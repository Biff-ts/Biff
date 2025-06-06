import { z } from 'zod'
import { publicProcedure, router } from '../trpc/server'

export const helloRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }) => {
      return {
        message: `Hello, ${input.name ?? 'World'} from BOFF-Edge!`
      }
    })
})
