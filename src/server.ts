import { Handler, Middleware, composeMiddleware } from "./middleware";
import { matchPath } from "./router";

export interface Route {
  method: string;
  path: string;
  handler: Handler;
  middleware?: Middleware[];
}

export class Server {
  private routes: Route[];
  private globalMiddleware: Middleware[] = [];

  constructor(routes: Route[]) {
    this.routes = routes;
  }

  use(mw: Middleware) {
    this.globalMiddleware.push(mw);
  }

  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const path = url.pathname;
    const method = req.method;

    let matchedRoute: Route | undefined;
    let params: Record<string, string> = {};

    for (const route of this.routes) {
      if (route.method !== method) continue;
      const result = matchPath(route.path, path);
      if (result.matched) {
        matchedRoute = route;
        params = result.params;
        break;
      }
    }

    const finalHandler: Handler = async (req) => {
      if (matchedRoute) {
        return matchedRoute.handler(req, params);
      }
      return new Response("Not Found", { status: 404 });
    };

    const allMiddleware = matchedRoute?.middleware
      ? [...this.globalMiddleware, ...matchedRoute.middleware]
      : this.globalMiddleware;

    const composed = composeMiddleware(allMiddleware, finalHandler);
    return composed(req);
  }
}