import 'dotenv/config' // これをファイルの一番上に追加！
import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'

/**
 * Create a Drizzle ORM instance using libsql client.
 */
export function makeDb() {
  const client = createClient({
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN
  })

  return drizzle(client)
}
