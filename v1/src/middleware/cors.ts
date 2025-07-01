import type { Middleware } from "../middleware";

export interface CORSOptions {
  origin?: string[] | "*";
  methods?: string[];
  headers?: string[];
  credentials?: boolean;
  maxAge?: number;
}

export function createCORS(options: CORSOptions = {}): Middleware {
  const {
    origin = [],
    methods = ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    headers = [],
    credentials = false,
    maxAge,
  } = options;

  return async (req, next) => {
    const reqOrigin = req.headers.get("Origin") || "";

    // 判定：許可された Origin か？
    const isAllowedOrigin =
      origin === "*" || origin.includes(reqOrigin);

    // プリフライト (OPTIONS) リクエスト対応
    if (req.method === "OPTIONS") {
      const resHeaders = new Headers();

      if (isAllowedOrigin) {
        resHeaders.set("Access-Control-Allow-Origin", origin === "*" ? "*" : reqOrigin);
        resHeaders.set("Access-Control-Allow-Methods", methods.join(","));
        resHeaders.set("Access-Control-Allow-Headers", headers.join(","));
        if (credentials) resHeaders.set("Access-Control-Allow-Credentials", "true");
        if (maxAge) resHeaders.set("Access-Control-Max-Age", maxAge.toString());
      }

      return new Response(null, { status: 204, headers: resHeaders });
    }

    // 通常リクエスト：next後にヘッダーを追加
    const res = await next();

    if (isAllowedOrigin) {
      res.headers.set("Access-Control-Allow-Origin", origin === "*" ? "*" : reqOrigin);
      if (credentials) res.headers.set("Access-Control-Allow-Credentials", "true");
    }

    return res;
  };
}
