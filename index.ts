import { Server, Route } from "./src/server";
import { TirneError } from "./src/middleware";

const routes: Route[] = [
  {
    method: "GET",
    path: "/",
    handler: (req) => {
      const name = new URL(req.url).searchParams.get("name");
      if (!name) {
        throw new TirneError("Missing name", {
          status: 400,
          type: "bad_request",
          expose: true,
        });
      }
      return new Response(`Hello, ${name}`);
    },
  },
];

const server = new Server(routes);
// エラーハンドリングは composeMiddleware に自動挿入されるので、use() しなくてOK

export default {
  fetch: (req: Request) => server.fetch(req),
};
