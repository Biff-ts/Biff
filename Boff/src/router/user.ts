import { publicProcedure, router } from '../trpc/server'
import { users } from '../db/schema'
import { getDB } from '../db/client'
import { Context } from 'hono'

export const userRouter = router({
  me: publicProcedure.query(async ({ ctx }) => {
    const db = getDB(ctx.c as Context<any, any, {}>)
    const result = await db.select().from(users).limit(1)
    return result[0] ?? null
  })
})
