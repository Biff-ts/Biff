// src/middleware/auth.ts

import type { Middleware } from "../middleware";
import { TirneError } from "../middleware";
import { getCookie } from "../cookie";
import { verifyToken } from "../auth/token";

interface AuthOptions {
  secret: string;
  cookieName?: string;
  headerName?: string;
}

export function createAuth(options: AuthOptions): Middleware {
  const { secret, cookieName = "auth", headerName = "authorization" } = options;

  return async (req, next) => {
    const token =
      getCookie(req, cookieName) ||
      req.headers.get(headerName)?.replace("Bearer ", "") ||
      "";

    const user = await verifyToken(token, secret);

    if (!user) {
      throw new TirneError("Unauthorized", {
        status: 401,
        type: "unauthorized",
        expose: true,
      });
    }

    // 🪄 ここで Request オブジェクトを拡張
    (req as any).user = user;

    return next();
  };
}
