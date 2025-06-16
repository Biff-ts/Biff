// src/cookie.ts

/** クッキーを取得します */
export function getCookie(req: Request, key: string): string | null {
  const cookie = req.headers.get("cookie");
  if (!cookie) return null;

  const pairs = cookie.split(";").map(c => c.trim().split("="));
  for (const [k, v] of pairs) {
    if (k === key) return decodeURIComponent(v);
  }
  return null;
}

/** Set-Cookie ヘッダーを生成します */
export function setCookie(key: string, value: string, options: {
  path?: string;
  httpOnly?: boolean;
  maxAge?: number;
  secure?: boolean;
} = {}): string {
  let cookie = `${key}=${encodeURIComponent(value)}`;

  if (options.path) cookie += `; Path=${options.path}`;
  if (options.httpOnly) cookie += `; HttpOnly`;
  if (options.secure) cookie += `; Secure`;
  if (options.maxAge) cookie += `; Max-Age=${options.maxAge}`;

  return cookie;
}
