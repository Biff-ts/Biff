import { type Context, createContext } from "./context";

export type Handler = (ctx: Context) => Response | Promise<Response>;

type Route = {
  method: string;
  path: string;
  handler: Handler;
};

function matchRoute(
  pathname: string,
  routePath: string
): Record<string, string> | null {
  const pathParts = pathname.split("/").filter(Boolean);
  const routeParts = routePath.split("/").filter(Boolean);

  if (pathParts.length !== routeParts.length) return null;

  const params: Record<string, string> = {};
  for (let i = 0; i < pathParts.length; i++) {
    if (routeParts[i]?.startsWith(":")) {
      const key = routeParts[i]!.slice(1);
      params[key] = decodeURIComponent(pathParts[i] || "");
    } else if (routeParts[i] !== pathParts[i]) {
      return null;
    }
  }

  return params;
}

export function createRouter(routes: Route[]): (req: Request) => Promise<Response> {
  return async (req: Request): Promise<Response> => {
    const url = new URL(req.url);
    const method = req.method.toUpperCase();

    for (const route of routes) {
      if (route.method !== method) continue;
      const params = matchRoute(url.pathname, route.path);
      if (params) {
        const ctx = createContext(req, params);
        return await route.handler(ctx);
      }
    }

    return new Response("Not Found", { status: 404 });
  };
}
