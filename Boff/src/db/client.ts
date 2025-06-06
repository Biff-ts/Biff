import { drizzle } from 'drizzle-orm/d1'
import type { Context } from 'hono'

export const getDB = (c: Context) => {
  const db = drizzle(c.env.DB) // Wrangler binding
  console.log(c.env.DB)
  return db
}
