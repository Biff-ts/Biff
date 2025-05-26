// src/context/make-ctx.ts
import { makeDb } from './make-db'
import { makeAuth } from './make-auth'

/**
 * Construct a context object passed into all intent handlers.
 */
export async function makeCtx(req: Request) {
  const db = makeDb()
  const auth = await makeAuth(req)
  const env = process.env

  return {
    db,
    auth,
    env,
    req
  }
}
