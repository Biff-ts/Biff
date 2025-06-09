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

export function createContext(
  req: Request,
  params: Record<string, string>
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
    env: Object.fromEntries(
      Object.entries(process.env).filter(([_, value]) => value !== undefined) as [string, string][]
    ),
  };
}
