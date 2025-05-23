import type { AppContext } from "../types/context.ts"

export type Middleware = (ctx: AppContext) => Promise<AppContext>

export async function compose(middlewares: Middleware[]): Promise<(ctx: AppContext) => Promise<AppContext>> {
  return async (ctx) => {
    let current = ctx
    for (const mw of middlewares) {
      current = await mw(current)
    }
    return current
  }
}
