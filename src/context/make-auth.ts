// src/context/make-auth.ts

/**
 * Stub auth context. Will be replaced by Lucia later.
 */
export async function makeAuth(req: Request) {
  return {
    user: null,
    session: null
  }
}
