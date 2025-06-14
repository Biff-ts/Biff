/// <reference lib="dom" />


export type Context<Env = {}> = {
  req: Request;
  url: URL;
  method: string;
  headers: Headers;
  query: URLSearchParams;
  params: Record<string, string>;
  signal: AbortSignal;
  env: Env;
};

export function createContext<Env = {}>(
  req: Request,
  options: {
    params?: Record<string, string>;
    env?: Env;
  } = {}
): Context<Env> {
  const url = new URL(req.url);

  // 明示的: AbortSignal を信頼し、無理に fallback しない
  const signal = "signal" in req && req.signal
    ? req.signal
    : undefined;

  return {
    req,
    url,
    method: req.method,
    headers: req.headers,
    query: url.searchParams,
    params: options.params ?? {},
    signal: signal ?? new AbortController().signal,
    env: options.env ?? ({} as Env),
  };
}
