import { Hono } from 'hono'
import { trpcServer } from '@hono/trpc-server'
import { createContext } from './trpc/context'
import { userRouter } from './router/user'
import { router } from './trpc/server'

const appRouter = router({
  user: userRouter
})

const app = new Hono()

app.use('/api/*', trpcServer({
  router: appRouter,
  createContext: (c) => createContext({ ...c, env: {} })
}))

export default app
