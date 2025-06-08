import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.text('Hello from the edge, 貴方様 ✨'))

export default app
app.get('/hello/:name', (c) => {
  const name = c.req.param('name')
  return c.text(`お会いできて光栄ですわ、${name}様！`)
})
