# Tirne
![Cloudflare Workers](https://img.shields.io/badge/Runtime-Workers-F38020?logo=cloudflare&logoColor=white)
![bun](https://img.shields.io/badge/Runtime-Bun-%23000000?logo=bun\&logoColor=white)
![version](https://img.shields.io/npm/v/tirne)
![license](https://img.shields.io/npm/l/tirne)
![stars](https://img.shields.io/github/stars/Tirne-ts/tirne?style=social)


> Tirne — from Old English “structure, strength” —　structure over boilerplate. A minimal, type-safe web framework for Multi Runtime, with edge-native performance and first-class control of side effects."

---
## 📚 Official Documentation

The full documentation for Tirne — the Bun & Edge-native web framework with zero boilerplate and structured composition.

👉 https://tirne.dev


---

> ⚡ Sub-millisecond APIs. First-class control of side effects.
> 👉 [Star Tirne on GitHub](https://github.com/Tirne-ts/Tirne)  
Tirne is a declarative, type-safe framework for Bun — designed to make side effects explicit and performance predictable.



---

## 🚀 Quickstart


```bash
npx create-tirne-app
```
<p align="center"> <img src="./assets/スクリーンショット 2025-06-17 21.58.05.png" width="500" alt="Tirne setup terminal screenshot"> </p> 
Choose your environment:

* **Bun**
* **Cloudflare Workers**

This command sets up a ready-to-run Tirne project in seconds.

📣 **Love minimal tools that get out of your way?**
Star the main Tirne repo: [https://github.com/Tirne-ts/Tirne](https://github.com/Tirne-ts/Tirne)

---

## 📁 What You Get

A zero-boilerplate project, tailored for your runtime:

* `index.ts` with a working router and a `/` endpoint
* Runtime config files (`bunfig.toml`, `wrangler.toml`)
* `package.json` with minimal scripts and dependencies

Example output:

```bash
✔ Choose your target environment: › Bun
✔ Project folder: › my-tirne-app

✅ Tirne app created in 'my-tirne-app'

Next steps:

  cd my-tirne-app
  bun install       # or npm install
  npm run dev (Bun)      # or wrangler dev 
```

---

## 🔧 Philosophy

Tirne is built on 5 core principles:
E
1. **Structure as code** — Routes, middleware, and logic are configuration, not behavior. Code is a manifest, not a script.
2. **Errors are values** — TirneErrors carry type, status, and intent. They are thrown, but not hidden.
3. **Composition over convention** — Middleware is composed explicitly, and order is part of the contract.
4. **Types shape behavior** — The structure and safety of your API are defined by its types, not docs.
5. **Designed for the edge** — Built for Bun, optimized for fetch, born in the millisecond age.


---

## ✨ Features

## ✨ Features

* ✅ **Structure-first routing** — Define your entire API as a single declarative structure
* ✅ **Composable middleware** — Explicit `compose()` flow, no decorators or global scope
* ✅ **Structured errors** — Throw `TirneError` with type, status, and visibility
* ✅ **Built-in response helpers** — `json()`, `html()`, `text()`, `error()`　etc...  — clean and consistent
* ✅ **Edge-native execution** — Instant cold start & sub-ms response on Bun, Workers, and Deno
* ✅ **No boilerplate** — No CLI, no config, no directory rules. Just pure code.
* ✅ **Type-safe by design** — Routes, handlers, errors, all shaped by TypeScript


---

## ⚡️ Performance Benchmarks

All tests were performed using Bun v1.1.0 on an M2 Pro chip (macOS), simulating edge runtime conditions.

| Metric             | Result             | Interpretation |
|--------------------|--------------------|----------------|
| ❄️ Cold Start       | `0.02 ms`           | 🧊 Essentially unmeasurable — perfect for edge/fetch-based runtimes |
| ⚡️ First Request    | `0.79 ms`           | 🚀 Beats the 1ms barrier. Ideal for latency-critical APIs |
| 🔁 Requests/sec     | `90,489 rps`        | 🔥 Comparable to Hono, surpasses Express by 10x+ |
| 📉 Avg Latency      | `0.96 ms`           | ⚡ Sub-millisecond under load — suitable for interactive apps |
| 📦 Throughput       | `10.9 MB/sec`       | 📈 Handles large JSON payloads with ease |
| 🎯 Total Requests   | `905,000 in 10s`    | 💪 Battle-tested for real-world load |

> ✨ Tirne was designed for edge-first, zero-warmup environments — and these numbers prove it.

---

## 🧱 Example with Cookie

```ts


import { Server,json,setCookie,requireAuth } from "tirne";
import type { Route } from "tirne";

const routes: Route[] = [
  {
    method: "GET",
    path: "/login",
    handler: () => {
      const headers = new Headers();
      headers.append("Set-Cookie", setCookie("auth", "valid-token", {
        httpOnly: true,
        path: "/",
        maxAge: 3600,
      }));
      return json({ message: "Logged in" }, 200, headers);
    },
    middleware: [], 
  },
  {
    method: "GET",
    path: "/private",
    handler: () => json({ message: "Secret data only for authenticated users" }),
    middleware: [requireAuth], 
  },
];

const server = new Server(routes);


export default {
  fetch: (req: Request) => server.fetch(req),
};


```

---

## 🔥 Tirne Philosophy – The 5 Laws of Structured Simplicity

A backend should be transparent, fast, and designed like architecture — not like magic. Tirne is built on five modern principles:

1. **Structure is the source of truth**  
   APIs are defined as code, not behavior. No decorators, no conventions — just configuration you can read.

2. **Errors are data, not chaos**  
   Exceptions carry type, status, and visibility. You don’t catch them — you design them.

3. **Composition is everything**  
   Middleware is composed explicitly. No global state, no stack traces from hell.

4. **Built for the edge, shaped by types**  
   Tirne runs instantly on Bun, Workers, and Deno. And your types shape what runs — not your docs.

5. **No bootstraps, no boilerplate, no BS**  
   One file. No CLI. No hidden magic. What you write is what you deploy.


---

## 🔍 Tirne vs Hono vs Elysia — Key Differences

## 🔍 Tirne vs Hono vs Elysia — Revisited for 2025

| Axis            | **Tirne ✨**                                      | **Hono 🌿**                                      | **Elysia 🧠**                                 |
|-----------------|--------------------------------------------------|--------------------------------------------------|----------------------------------------------|
| **Philosophy**  | Structure and Side Effect Control                | Simplicity and Familiarity                      | Type-maximalism and Decorator DSL            |
| **Routing**     | Declarative `Route[]` structure                  | Chain-style `app.get("/foo")`                   | Macro-enhanced handler declarations          |
| **Middleware**  | Explicit `compose([...])`, scoped per route      | Global `app.use()` and nested routers           | Plugin + lifecycle hooks + decorators        |
| **Error Model** | `TirneError`: structured error with metadata     | `throw` or `return c.text()`                    | `set.status()` with plugin-driven handling   |
| **Type Safety** | Type-driven config and handlers (`Route<T>`)     | Medium (context-specific typing)                | Extremely strong, but tightly coupled to tools |
| **Response API**| `json()`, `error()` as pure return values        | `c.json()`, `c.text()` methods                  | `set.response()` side-effectful injections   |
| **Extensibility**| Middleware and composition primitives           | Plugins with shared context                     | Plugins + Macros + Decorators                |
| **Dependencies**| 🟢 Zero external runtime deps                    | 🟡 Lightweight                                  | 🔴 Heavy: valibot, macros, SWC, etc.          |
| **Runtime Support** | ✅ Bun / Workers 　 　　　　　　　　　　　        | ✅ Bun / Node / Workers/ Deno                  | ❌ Bun-only, limited to SWC macro pipelines  |
| **Ideal Users** | API designers, type-aware minimalists, edge devs| Express/Deno users wanting familiar DX         | TS power users who love macros & decorators  |

> **Tirne** is not just minimal — it's architectural. It gives you full control over structure, type, and execution without opinionated tooling or hidden behaviors.

---

## 📦 Install

```bash
bun add tirne
```

To use in Workers :

```bash
npm install tirne
```

---

## 🤍 Use Cases

Tirne is ideal for:
* ⚡️ Need edge-speed APIs — Sub-millisecond response times on Bun, Workers, and Deno.

* 📦 Want type-driven reliability — APIs shaped by types, not runtime guesswork.

* 🌐 Deploy on modern runtimes — Runs fetch-first, works anywhere: Bun, Node, Workers, Deno.

* 🧪 Design with side effects in mind — Control cookies, headers, and auth with intention.



---

## 💥 Ready to Write Real Code Again?

> 🚀 If you’re tired of magic, macros, and monoliths — try Tirne.
>  
> 👉 **[⭐️ Star on GitHub](https://github.com/Tirne-ts/Tirne)** to join the movement.

[![GitHub Stars](https://img.shields.io/github/stars/Tirne-ts/tirne?style=social)](https://github.com/Tirne-ts/Tirne)

---


## 📜 License

Apache 2.0


