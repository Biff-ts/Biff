# Tirne
![Deno](https://img.shields.io/badge/Runtime-Deno-000000?logo=deno&logoColor=black)
![node](https://img.shields.io/badge/Runtime-Node.js-43853d?logo=node.js&logoColor=green)
![Cloudflare Workers](https://img.shields.io/badge/Runtime-Workers-F38020?logo=cloudflare&logoColor=white)
![bun](https://img.shields.io/badge/Runtime-Bun-%23000000?logo=bun\&logoColor=white)
![version](https://img.shields.io/npm/v/tirne)
![license](https://img.shields.io/npm/l/tirne)
![stars](https://img.shields.io/github/stars/Tirne-ts/tirne?style=social)


> Tirne — from Old English “structure, strength” — a minimal web framework for Bun with Go-like control and zero boilerplate.

---
> 🚀 Tirne has been featured in [this article on DEV.to](https://dev.to/yukinisihikawa/tirne-the-explicit-go-inspired-web-framework-for-bun-nodedeno-and-workers-2igi),  
> where it received early reactions from:

- [Ben Halpern](https://dev.to/ben) (Founder of DEV.to & Forem)
- [Nathan Tarbert](https://dev.to/nathant)
- [Nevo David](https://dev.to/nevodavid)

We're grateful for the attention and using the feedback to guide the next iterations.

---

> 📣 Minimalist? Bun enthusiast? OSS fan?  
> 👉 [Star Tirne on GitHub](https://github.com/Tirne-ts/Tirne)  
We’re building a no-magic, Go-style framework for the Bun/TS world — and your star helps shape its future.


---

## 🚀 Quickstart


```bash
npx create-tirne-app
```
<p align="center"> <img src="./assets/terminal-setup.png" width="500" alt="Tirne setup terminal screenshot"> </p> 
Choose your environment:

* **Bun**
* **Deno**
* **Cloudflare Workers**
* **Netlify Edge Functions**

This command sets up a ready-to-run Tirne project in seconds.

📣 **Love minimal tools that get out of your way?**
Star the main Tirne repo: [https://github.com/Tirne-ts/Tirne](https://github.com/Tirne-ts/Tirne)

---

## 📁 What You Get

A zero-boilerplate project, tailored for your runtime:

* `index.ts` with a working router and a `/` endpoint
* Runtime config files (`bunfig.toml`, `deno.json`, `wrangler.toml`)
* `package.json` with minimal scripts and dependencies

Example output:

```bash
✔ Choose your target environment: › Bun
✔ Project folder: › my-tirne-app

✅ Tirne app created in 'my-tirne-app'

Next steps:

  cd my-tirne-app
  bun install       # or npm install
  npm run dev       # or wrangler dev / deno task dev / netlify dev
```

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

## 🔍 Tirne vs Hono vs Elysia — Key Differences

| Axis            | **Tirne ✨**                          | **Hono 🌿**                                        | **Elysia 🧠**                            |
| --------------- | ------------------------------------ | -------------------------------------------------- | ---------------------------------------- |
| Philosophy      | Structure and control (Go-inspired)  | Developer Experience and simplicity (Express-like) | Type-centric & macro-driven (type-first) |
| Routing         | Function array (explicit structure)  | `app.get("/foo")` chaining style                   | `app.get("/foo", {...})` with macros     |
| Middleware      | `compose(fn[])` explicit composition | `app.use()` global style                           | `onBeforeHandle` and plugin/macro-driven |
| Type Safety     | Lightweight, composable              | Medium (some constraints)                          | Super strong, but complex                |
| Response API    | `json()`, `error()` as return values | `c.json()`, `c.text()` methods                     | `set.response()` — implicit injection    |
| Extensibility   | Functional middleware composition    | Plugin-based                                       | Decorator & macro-based                  |
| Dependencies    | 🟢 Zero (100% custom)                | 🟡 Lightweight (just Hono)                         | 🔴 Many (valibot, macros, swc, etc.)     |
| Runtime Support | ✅ Bun / Deno / Workers/ Netlify     | ✅ Bun / Node / Workers                             | ❌ Bun-only (not Deno-compatible)         |
| Ideal Users     | Go developers / Bun engineers        | Express graduates / DX lovers                      | TypeScript-heavy / type maximalists      |

Tirne is for those who value **explicit control, minimalism, and portability** over magic or tooling complexity.

Tirne keeps things **predictable, portable, and programmable** — not magic-driven.

---

## 📦 Install

```bash
bun add tirne
```

To use in Workers :

```bash
npm install tirne
```

To use in Workers or Deno:

* All core APIs are `fetch()`-based — simply adapt routing to your runtime.

---

## 🤍 Use Cases

Tirne is ideal for:

* Bun-native HTTP APIs with zero setup
* Drop-in replacement for Express or Hono in Bun projects
* Cloudflare Worker endpoints (with fetch-compatible handlers)
* Building edge-friendly backends with structured code

---

## 💥 Ready to Write Real Code Again?

> 🚀 If you’re tired of magic, macros, and monoliths — try Tirne.
>  
> 👉 **[⭐️ Star on GitHub](https://github.com/Tirne-ts/Tirne)** to join the movement.

[![GitHub Stars](https://img.shields.io/github/stars/Tirne-ts/tirne?style=social)](https://github.com/Tirne-ts/Tirne)

---


## 📜 License

MIT

