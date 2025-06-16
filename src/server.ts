import { Handler, Middleware, composeMiddleware } from "./middleware";

export interface Route {
  method: string;
  path: string;
  handler: Handler;
}

export class Server {
  private routes: Route[];
  private middleware: Middleware[] = [];

  constructor(routes: Route[]) {
    this.routes = routes;
  }

  use(mw: Middleware) {
    this.middleware.push(mw);
  }

  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const route = this.routes.find(
      (r) => r.method === req.method && r.path === url.pathname
    );

    const finalHandler: Handler = async (req) => {
      if (route) return route.handler(req);
      return new Response("Not Found", { status: 404 });
    };

    const composedHandler = composeMiddleware(this.middleware, finalHandler);
    return composedHandler(req);
  }
}
