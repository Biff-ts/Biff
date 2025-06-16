import { Server, Route } from "./src/server";
import type { Middleware } from "./src/middleware";

const logger: Middleware = async (req, next) => {
  const start = Date.now();
  const res = await next();
  console.log(`[${req.method}] ${req.url} - ${Date.now() - start}ms`);
  return res;
};

const routes: Route[] = [
  {
    method: "GET",
    path: "/",
    handler: () => new Response("Hello Tirne!"),
  },
];

const server = new Server(routes);
server.use(logger);

export default {
  fetch: (req: Request) => server.fetch(req),
};