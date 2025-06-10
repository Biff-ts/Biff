// src/context.ts

export type Context = {
  req: Request;
  url: URL;
  method: string;
  headers: Headers;
  params: Record<string, string>;
  query: URLSearchParams;
  signal: AbortSignal;
  env: Record<string, string>;
};

/**
 * ランタイム非依存な Context を生成します。
 * `env` は Node.js なら process.env、Workers なら Binding を渡してください。
 */
export function createContext(
  req: Request,
  params: Record<string, string>,
  env: Record<string, string> = {}
): Context {
  const url = new URL(req.url);
  return {
    req,
    url,
    method: req.method,
    headers: req.headers,
    params,
    query: url.searchParams,
    signal: req.signal,
    env,
  };
}
