/// <reference types="bun-types" />

import { createRouter } from "../src/router";
import { json } from "../src/response";
import { expect, test } from "bun:test";

const router = createRouter([
  {
    method: "GET",
    path: "/hello",
    handler: () => json({ ok: true }),
  },
  {
    method: "GET",
    path: "/user/:id",
    handler: ({ params }) => json({ id: params.id }),
  },
]);

test("matches static route", async () => {
  const req = new Request("http://localhost/hello", { method: "GET" });
  const res = await router(req);
  const body = await res.json();
  expect(body.ok).toBe(true);
});

test("matches dynamic route and extracts param", async () => {
  const req = new Request("http://localhost/user/42", { method: "GET" });
  const res = await router(req);
  const body = await res.json();
  expect(body.id).toBe("42");
});
