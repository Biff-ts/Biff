import { compose, Middleware } from "../src/middleware";
import { Context } from "../src/context";
import { json } from "../src/response";
import { expect, test } from "bun:test";

test("middleware runs in correct order", async () => {
  const callOrder: string[] = [];

  const mw1: Middleware = async (ctx, next) => {
    callOrder.push("mw1 start");
    const res = await next();
    callOrder.push("mw1 end");
    return res;
  };

  const mw2: Middleware = async (ctx, next) => {
    callOrder.push("mw2 start");
    const res = await next();
    callOrder.push("mw2 end");
    return res;
  };

  const handler = compose([mw1, mw2], (ctx: Context) => {
    callOrder.push("handler");
    return json({ done: true });
  });

  const ctx = {
    req: new Request("http://localhost"),
    url: new URL("http://localhost"),
    method: "GET",
    headers: new Headers(),
    params: {},
    query: new URLSearchParams(),
    signal: new AbortController().signal,
    env: {},
  };

  const res = await handler(ctx);
  expect(await res.json()).toEqual({ done: true });
  expect(callOrder).toEqual(["mw1 start", "mw2 start", "handler", "mw2 end", "mw1 end"]);
});
