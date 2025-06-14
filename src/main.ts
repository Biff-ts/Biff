// deno-lint-ignore-file
// tirne/index.ts
type Handler = (req: Request) => Response | Promise<Response>;

interface Route {
  method: string;
  path: string;
  handler: Handler;
}

export class Tirne {
  private routes: Route[] = [];

  get(path: string, handler: Handler) {
    this.routes.push({ method: "GET", path, handler });
  }

  // fetch handler (Bun's serve uses this)
  private handle = async (req: Request): Promise<Response> => {
    const url = new URL(req.url);
    const route = this.routes.find(r =>
      r.method === req.method && r.path === url.pathname
    );

    if (!route) {
      return new Response("Not Found", { status: 404 });
    }

    try {
      return await route.handler(req);
    } catch (err: any) {
      return new Response("Internal Error", { status: 500 });
    }
  };

  listen(port: number, onStart?: () => void) {
    // Bun only: Bun.serve expects fetch handler
    Bun.serve({
      port,
      fetch: this.handle,
    });
    onStart?.();
  }
}
