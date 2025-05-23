import type { Middleware } from "../utils/compose.ts"
import { getSession } from "../session/store.ts"
export const withAuth: Middleware = async (ctx) => {
  const cookie = ctx.req.headers["cookie"] || ""
  const match = cookie.match(/session=([^;]+)/)
  const sessionId = match?.[1]

  if (!sessionId) throw new Error("Unauthorized")

  const user = await getSession(sessionId)

  if (!user) throw new Error("Unauthorized")

  return { ...ctx, user }
}
