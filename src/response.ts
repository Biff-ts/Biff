type HeadersObject = Record<string, string>;
type HeadersInit =
  | Headers
  | Record<string, string>
  | [string, string][];

/**
 * Converts user-provided headers into a proper HeadersInit object.
 */
function normalizeHeaders(headers: HeadersInit = {}): HeadersObject {
  if (headers instanceof Headers) {
    const result: HeadersObject = {};
    headers.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }

  if (Array.isArray(headers)) {
    return Object.fromEntries(headers) as HeadersObject;
  }

  return headers;
}

export function json(
  data: unknown,
  status = 200,
  headers: HeadersInit = {},
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...normalizeHeaders(headers),
    },
  });
}

export function html(
  htmlString: string,
  status = 200,
  headers: HeadersInit = {},
): Response {
  return new Response(htmlString, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      ...normalizeHeaders(headers),
    },
  });
}

export function text(
  message: string,
  status = 200,
  headers: HeadersInit = {},
): Response {
  return new Response(message, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      ...normalizeHeaders(headers),
    },
  });
}

export function error(
  message: string,
  status = 500,
  headers: HeadersInit = {},
): Response {
  return new Response(message, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      ...normalizeHeaders(headers),
    },
  });
}
