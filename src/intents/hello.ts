import { defineIntent } from '../core/define-intent'
import { z } from 'zod'

export const hello = defineIntent("hello", {
  input: z.object({
    name: z.string().optional()
  }),
  handler: async ({ input, ctx }) => {
  
    return {
  message: `Hello again, ${input.name ?? "world"}!`
}

  },
  description: "Returns a friendly greeting."
})
// for local test:
import { makeCtx } from '../context/make-ctx'

if (import.meta.url === import.meta.resolve('./hello.ts')) {
  const req = new Request('http://localhost')
  const ctx = await makeCtx(req)
  const result = await hello.handler({ input: {}, ctx })
  console.log('Result:', result)
}
