export type Context = {
  req: Request;
  url: InstanceType<typeof URL>;
  method: string;
  headers: Headers;
  params: Record<string, string>;
  query: URLSearchParams;
  signal: InstanceType<typeof AbortSignal>;
  env: Record<string, string>;
};


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
    signal: req.signal ?? AbortSignal.timeout?.(10_000) ?? new AbortController().signal, // 保険でfallback
    env,
  };
}
