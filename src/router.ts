// src/router.ts

import type { Context } from "./context.ts";

export type Handler = (ctx: Context) => Response | Promise<Response>;

type Route = {
  method: string;
  path: string;
  handler: Handler;
};

export class Router {
  private routes: Route[] = [];

  get(path: string, handler: Handler) {
    this.routes.push({ method: "GET", path, handler });
  }

  post(path: string, handler: Handler) {
    this.routes.push({ method: "POST", path, handler });
  }

  // 最小構成のルーティングマッチ（抽象ゼロ）
  match(method: string, pathname: string): Handler | null {
    for (const route of this.routes) {
      if (route.method === method && route.path === pathname) {
        return route.handler;
      }
    }
    return null;
  }
}
