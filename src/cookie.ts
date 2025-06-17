// src/cookie.ts（ログ付き）
export function getCookie(req: Request, key: string): string | null {
  const cookie = req.headers.get("cookie");
  console.log("[Tirne] Incoming Cookie:", cookie); // ✅ 追加

  if (!cookie) return null;

  const pairs = cookie.split(";").map(c => c.trim().split("="));
  for (const [k, v] of pairs) {
    if (k === key) {
      console.log(`[Tirne] Matched Cookie: ${k}=${v}`); // ✅ 追加
      return decodeURIComponent(v);
    }
  }

  console.log("[Tirne] No matching cookie key:", key);
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
