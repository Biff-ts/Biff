// src/response.ts

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

export function html(
  htmlString: string,
  status = 200,
  headers: HeadersInit = {}
): Response {
  return new Response(htmlString, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      ...headers,
    },
  });
}

export function text(
  message: string,
  status = 200,
  headers: HeadersInit = {}
): Response {
  return new Response(message, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      ...headers,
    },
  });
}

export function error(
  message: string,
  status = 500,
  headers: HeadersInit = {}
): Response {
  return new Response(message, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      ...headers,
    },
  });
}
