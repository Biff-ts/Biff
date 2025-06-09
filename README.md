# Tirne

> A structured, minimal web framework for Bun. Go-like control, Bun-native speed, zero boilerplate.

---

## 🚀 Quickstart (Hono-style)

Tirne is the fastest way to build **typed, structured** web APIs and apps using Bun — with Go-like patterns, no magic, and full control.

```bash
bun add tirne
```

```ts
// index.ts
import { createRouter, compose, json } from "tirne";

const routes = [
  {
    method: "GET",
    path: "/",
    handler: ({ req }) => json({ message: "Hello, Tirne!" }),
  },
];

const router = createRouter(routes);

Bun.serve({ fetch: router });
```

```bash
bun run index.ts
```

You're now running a structured, typed, Bun-native web server. No scaffold, no CLI, no boilerplate.

> 💡 Works on **Bun**, **Node.js (via adapter)**, and **Cloudflare Workers (via fetch-compatible API)**.

---

## 🔧 Philosophy

Tirne is built on 5 core principles:

1. **Structure without abstraction** — Everything visible, understandable, no magic.
2. **Functions over frameworks** — Middleware, handlers, routers are just plain functions.
3. **Return errors, don’t catch them** — Like Go: errors as values, not exceptions.
4. **Composition is explicit** — No decorators or global state. Just `compose(middleware[])`.
5. **Run anywhere** — Bun-native by design, but fetch-compatible for Node, Workers, Deno.

---

## ✨ Features

* ✅ Minimal HTTP router with dynamic path support
* ✅ Go-style middleware composition with full control
* ✅ First-class context: method, query, params, signal, env
* ✅ Response helpers: `json()`, `html()`, `text()`, `error()`
* ✅ Optional `Result<T, E>` pattern for safe error handling
* ✅ Simple structured parallelism: `runParallel()`, `waitAll()`
* ✅ Fully fetch-based — runs on **Bun**, **Node**, **Cloudflare Workers**, **Deno**
* ✅ No CLI, no file structure, no default config — just code

---

## 🧱 Core Responsibilities (Go-style)

| # | Responsibility         | Description                                      | Go Equivalent               |
| - | ---------------------- | ------------------------------------------------ | --------------------------- |
| 1 | Router                 | Static/dynamic route definition, method matching | `http.ServeMux`             |
| 2 | Middleware Composition | `compose()` to separate and chain concerns       | `http.Handler`              |
| 3 | Context                | `ctx = { req, res, env, signal, params }`        | `context.Context`           |
| 4 | Error Handling         | `Result<T, E>` or `handleError()` structure      | `error`, `if err != nil`    |
| 5 | Response Utility       | `json()`, `html()`, `text()`, `error()`          | `encoding/json`, `template` |
| 6 | Parallelism            | `runParallel()`, `waitAll()` async control       | `go func()`, `WaitGroup`    |

---

## 🧱 Example with Middleware

```ts
import { createRouter, compose, json, error } from "tirne";

const logger = async (ctx, next) => {
  console.log(`[${ctx.method}] ${ctx.url.pathname}`);
  return await next();
};

const routes = [
  {
    method: "GET",
    path: "/",
    handler: compose([logger], ({ req }) => json({ hello: "Tirne" })),
  },
  {
    method: "GET",
    path: "/fail",
    handler: () => error("Something went wrong", 500),
  },
];

Bun.serve({ fetch: createRouter(routes) });
```

---

## 🔥 Tirne Philosophy – The 5 Articles of Bun-Style Backend

A web framework should be your toolbox, not your leash. Tirne follows five unapologetically minimal principles:

1. **No abstractions you can't inline**
   Don’t hide behind magic. If it can’t be written in 5 lines, it probably shouldn’t exist.

2. **Functions first. Frameworks last**
   Apps should work without frameworks. Tirne is just the helper, never the master.

3. **Handle failure like a grown-up**
   No try/catch gymnastics. Return errors like Go. Predictable. Traceable. Safe.

4. **Parallelism is a first-class citizen**
   Use your CPU like a pro. Tirne assumes your code will scale, so it doesn’t get in the way.

5. **Zero startup, zero lock-in, zero shame**
   Start small, stay small if you want. Tirne doesn't force structure or ceremony. One file is enough.

---

## 🔍 Comparison: Tirne vs Hono vs Elysia

| Feature             | **Tirne**                          | **Hono**                     | **Elysia**                              |
| ------------------- | ---------------------------------- | ---------------------------- | --------------------------------------- |
| Routing             | Minimal, explicit function array   | Chainable, expressive syntax | Decorator-friendly, pluginable          |
| Middleware          | Go-style, pure function-based      | Built-in, familiar           | Plugin/macro heavy                      |
| Type Safety         | Lightweight, inferred              | Strong with constraints      | Advanced, macro-driven                  |
| Error Handling      | `Result<T, E>` + manual control    | `throw` or middleware        | `try/catch` with `set.error()`          |
| Response Helpers    | `json()`, `error()` - minimal      | `c.json()` etc.              | `set.response()` - more magic           |
| Fetch Compatibility | ✅ Bun / Node / Workers / Deno      | ✅ Bun / Node / Workers       | ❌ Bun only (for now)                    |
| Philosophy          | Go-inspired, structure over syntax | Express-like DX              | Full-stack, type-first + tooling-heavy  |
| Dependencies        | **0 (no external deps)**           | **1 (hono)**                 | **Dozens (valibot, macros, swc, etc.)** |
| Ideal For           | Server logic, edge apps, CLI APIs  | Web APIs with good DX        | Type-centric apps with heavy tooling    |

Tirne keeps things **predictable, portable, and programmable** — not magic-driven.

---

## 📦 Install

```bash
bun add tirne
```

To use in Node.js:

```bash
npm install tirne
```

To use in Workers or Deno:

* All core APIs are `fetch()`-based — simply adapt routing to your runtime.

---

## 🧪 Use Cases

Tirne is ideal for:

* Bun-native HTTP APIs with zero setup
* Drop-in replacement for Express or Hono in Bun projects
* Cloudflare Worker endpoints (with fetch-compatible handlers)
* Building edge-friendly backends with structured code

---

## 🌐 Community & Contribution

We welcome contributions!

* Development: `bun run dev` or `bun --watch index.ts`
* Pull requests: Welcome for bug fixes, test coverage, features
* Discussions: Coming soon (via GitHub Discussions)

> See `CONTRIBUTING.md` for setup guidelines (WIP)

---

## 💼 Badges (coming soon)

---

## 📜 License

MIT
