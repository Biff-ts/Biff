import { router } from '../trpc/server'
import { helloRouter } from './hello'

export const appRouter = router({
  hello: helloRouter
})

export type AppRouter = typeof appRouter
