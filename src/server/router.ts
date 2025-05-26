// src/server/router.ts
import { Hono } from 'hono'
import { makeCtx } from '../context/make-ctx'
import * as hello from '../intents/hello'

/**
 * Create a new Hono app instance with the latest intent registry.
 */
export function createApp() {
  const app = new Hono()

  const intents = new Map<string, any>([
    [hello.hello.name, hello.hello]
  ])

  app.post('/api/:intent', async (c) => {
    const name = c.req.param('intent')
    const intent = intents.get(name)

    if (!intent) {
      return c.json({ error: 'Intent not found' }, 404)
    }

    const input = await c.req.json()
    const parsed = intent.input.safeParse(input)
    if (!parsed.success) {
      return c.json({ error: 'Invalid input', details: parsed.error.format() }, 400)
    }

    const ctx = await makeCtx(c.req.raw)
    const result = await intent.handler({ input: parsed.data, ctx })

    return c.json(result)
  })

  return app
}
