import type { Middleware } from "../utils/compose.ts"
import { getSession } from "../session/store.ts"

export class RedirectError extends Error {
  location: string
  constructor(location: string) {
    super("Redirect")
    this.location = location
  }
}

export const withAuthOrRedirect: Middleware = async (ctx) => {
  const headers = ctx.req.headers as unknown as Headers
  const cookie = typeof headers.get === "function" ? headers.get("cookie") || "" : ""
  const match = cookie.match(/session=([^;]+)/)
  const sessionId = match?.[1]

  if (!sessionId) throw new RedirectError("/login")

  const user = await getSession(sessionId)

  if (!user) throw new RedirectError("/login")

  return { ...ctx, user }
}
