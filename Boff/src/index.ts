import { Hono } from 'hono'
import { trpcServer } from '@hono/trpc-server'
import { appRouter } from './router/_app'
import { createContext } from './trpc/context'


const app = new Hono()

// CORS 対応
app.use('/api/*', async (c, next) => {
  c.header('Access-Control-Allow-Origin', '*')
  return next()
})

// trpcServer は Promise ではなく同期関数なので await 不要
app.use(
  '/api/*',
  trpcServer({
    router: appRouter,
    createContext
  })
)

export default app
