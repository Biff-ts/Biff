// src/utils.ts

type HeadersObject = Record<string, string>;

const withContentType = (
  type: string,
  status: number,
  headers?: HeadersObject
): Headers => {
  const h = new Headers(headers);
  h.set("Content-Type", type);
  return h;
};

export function json(data: unknown, status = 200, headers?: HeadersObject): Response {
  const body = JSON.stringify(data);
  const h = withContentType("application/json", status, headers);
  return new Response(body, { status, headers: h });
}

export function html(body: string, status = 200, headers?: HeadersObject): Response {
  const h = withContentType("text/html; charset=utf-8", status, headers);
  return new Response(body, { status, headers: h });
}

export function text(body: string, status = 200, headers?: HeadersObject): Response {
  const h = withContentType("text/plain; charset=utf-8", status, headers);
  return new Response(body, { status, headers: h });
}

export function error(
  message: string,
  status = 500,
  headers?: HeadersObject
): Response {
  const h = withContentType("text/plain; charset=utf-8", status, headers);
  return new Response(message, { status, headers: h });
}
