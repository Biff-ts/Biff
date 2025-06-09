import { expect, test } from "bun:test";
import { json, html, text, error } from "../src/response";

test("json() returns correct headers", async () => {
  const res = json({ ok: true });
  expect(res.headers.get("Content-Type")).toContain("application/json");
  expect(await res.json()).toEqual({ ok: true });
});

test("html() returns HTML content", async () => {
  const res = html("<h1>Hello</h1>");
  expect(res.headers.get("Content-Type")).toContain("text/html");
  expect(await res.text()).toContain("<h1>");
});

test("text() returns plain text", async () => {
  const res = text("Hello");
  expect(res.headers.get("Content-Type")).toContain("text/plain");
  expect(await res.text()).toBe("Hello");
});

test("error() returns 500 by default", async () => {
  const res = error("fail");
  expect(res.status).toBe(500);
  expect(await res.text()).toBe("fail");
});
