// src/util.ts

/** JSON レスポンスを生成します */
export function json(
  data: unknown,
  status = 200,
  headers: HeadersInit = {}
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}

/** リダイレクトレスポンスを生成します */
export function redirect(
  location: string,
  status: 301 | 302 = 302
): Response {
  return new Response(null, {
    status,
    headers: {
      Location: location,
    },
  });
}

/** クエリ文字列を取得します */
export function parseQuery(req: Request): URLSearchParams {
  return new URL(req.url).searchParams;
}

/** リクエストボディをパースします（JSON / URLエンコード） */
export async function parseBody(
  req: Request
): Promise<unknown> {
  const contentType = req.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return await req.json();
  }

  if (contentType.includes("application/x-www-form-urlencoded")) {
    const text = await req.text();
    return Object.fromEntries(new URLSearchParams(text));
  }

  return await req.text(); // fallback
}
