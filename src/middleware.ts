// src/middleware.ts

import { json } from "./util";

export type Handler = (
  req: Request,
  params?: Record<string, string>,
  user?: Record<string, any>
) => Response | Promise<Response>;

/** ミドルウェア型：next() で次の処理へ */
export type Middleware = (
  req: Request,
  next: () => Promise<Response>
) => Promise<Response>;

/** Tirne 独自エラー型 */
export class TirneError extends Error {
  status: number;
  type: string;
  expose: boolean;

  constructor(message: string, options: {
    status?: number,
    type?: string,
    expose?: boolean,
    cause?: unknown
  } = {}) {
    super(message);
    this.name = "TirneError";
    this.status = options.status ?? 500;
    this.type = options.type ?? "internal_error";
    this.expose = options.expose ?? false;
    if (options.cause) this.cause = options.cause;
  }
}

/**
 * 統合型: error handler を自動注入してミドルウェア合成
 */
export function composeMiddleware(
  middleware: Middleware[],
  finalHandler: Handler
): Handler {
  const all = [errorHandler, ...middleware];

  return function composedHandler(req: Request): Promise<Response> {
    let i = -1;

    const dispatch = (index: number): Promise<Response> => {
      if (index <= i) return Promise.reject(new Error("next() called multiple times"));
      i = index;
      const fn = index < all.length ? all[index] : finalHandler;
      return Promise.resolve(fn(req, (() => dispatch(index + 1)) as unknown as Record<string, string> & (() => Promise<Response>)));
    };

    return dispatch(0);
  };
}

/** デフォルトで含まれるグローバルエラーハンドラー */
const errorHandler: Middleware = async (req, next) => {
  try {
    return await next();
  } catch (err) {
    console.error("Unhandled error:", err);

    if (err instanceof TirneError) {
      return json(
        {
          error: err.type,
          message: err.expose ? err.message : "An error occurred",
        },
        err.status
      );
    }

    return json({ error: "internal_error", message: "Something went wrong" }, 500);
  }
};
