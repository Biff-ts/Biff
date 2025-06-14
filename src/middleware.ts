// src/middleware.ts

import type { Context } from "./context.ts";
import type { Handler } from "./router.ts";

export type Middleware = (ctx: Context, next: () => Promise<Response>) => Promise<Response>;

export function compose(
  middlewares: Middleware[],
  finalHandler: Handler
): Handler {
  return async function composed(ctx: Context): Promise<Response> {
    let index = -1;

    async function dispatch(i: number): Promise<Response> {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;

      const fn = i === middlewares.length ? finalHandler : middlewares[i];
      return fn(ctx, () => dispatch(i + 1));
    }

    return dispatch(0);
  };
}
