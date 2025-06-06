import { initTRPC } from '@trpc/server'
import type { AppContext } from './context'

const t = initTRPC.context<AppContext>().create()

export const router = t.router
export const publicProcedure = t.procedure
