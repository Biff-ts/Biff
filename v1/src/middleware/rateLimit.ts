// src/middleware/rateLimit.ts

import type { Middleware } from "../middleware";
import { TirneError } from "../middleware";

interface RateLimitOptions {
  windowMs?: number; // 制限ウィンドウ（ms）
  max?: number;      // 上限リクエスト数
  keyFn?: (req: Request) => string;
}

type Entry = {
  count: number;
  expires: number;
};

const store = new Map<string, Entry>();

export function rateLimit(options: RateLimitOptions = {}): Middleware {
  const windowMs = options.windowMs ?? 60_000; // default: 1分
  const max = options.max ?? 30;
  const keyFn = options.keyFn ?? getIP;

  return async (req, next) => {
    const key = keyFn(req);
    const now = Date.now();

    const entry = store.get(key);
    if (entry && entry.expires > now) {
      if (entry.count >= max) {
        throw new TirneError("Too many requests", {
          status: 429,
          type: "rate_limit",
          expose: true,
        });
      }
      entry.count += 1;
    } else {
      store.set(key, { count: 1, expires: now + windowMs });
    }

    return next();
  };
}

// Edge-safe IP取得
function getIP(req: Request): string {
  return (
    req.headers.get("cf-connecting-ip") || // Cloudflare
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || // Vercel
    "unknown"
  );
}
