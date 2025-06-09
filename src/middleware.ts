// src/middleware.ts

import type { Context } from "./context";
import type { Handler } from "./router";

export type Middleware = (
  ctx: Context,
  next: () => Promise<Response>
) => Response | Promise<Response>;

export function compose(
  middlewares: Middleware[],
  finalHandler: Handler
): Handler {
  return middlewares.reduceRight<Handler>(
    (next, mw) => (ctx, ...args) => mw(ctx, async () => next(ctx, ...args)),
    finalHandler
  );
}
