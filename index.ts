import { Server } from "./src/server";
import type { Route } from "./src/server";

const routes = [
  {
    method: "GET",
    path: "/",
    handler: (_req: Request) => new Response("Hello Tirne + Bun!"),
  },
] satisfies Route[];

const server = new Server(routes);

Bun.serve({
  fetch: server.fetch,
  port: 3000,
});
console.log("Server running on http://localhost:3000");