# typest.ts

### The Fully-Typed Backend Framework for the Next.js Era

---

**typest.ts** is a minimal, Bun-native, edge-first backend framework built to feel like *Next.js App Router* for APIs.
Just drop a `.ts` file, define your Zod types, and instantly get a fully typed, validated API with an auto-generated client SDK.

> **Zod-Powered. ts-rest Connected. Bun Fast. Edge Native.**

---

## 🚀 Why typest.ts?

Modern frontend development has evolved — with Next.js App Router, we structure our UI with files and composable types.
Yet, backend APIs are still trapped in verbose DTOs, OpenAPI schemas, and separate type definitions.

**typest.ts** eliminates the gap:

* File-based API routes like Next.js App Router
* Input/output schemas written with Zod
* Automatic type-safe SDKs via ts-rest
* Zero config, zero boilerplate
* Runs on Bun — instantly and at the edge

---

## 🔥 Features

* ✅ **Zod-first input/output schemas**
* ✅ **tRPC-like type propagation** without the complexity
* ✅ **Next.js-style file routing** (`routes/api/user.ts → GET /api/user`)
* ✅ **Bun-native runtime** with near-zero cold starts
* ✅ **Edge-first design** — deploy anywhere: Vercel Edge, Cloudflare Workers, etc
* ✅ **Auto-generated type-safe clients** with `typest build`

---

## 🧬 Example: Fully Typed API in One File

```ts
// routes/api/user.ts
import { z } from "zod";

export const input = {
  query: z.object({ id: z.string() })
};

export const output = z.object({
  id: z.string(),
  name: z.string()
});

export const GET = async ({ input }) => {
  return { id: input.query.id, name: "Alice" };
};
```

---

## 💻 Next.js App Router Integration

`typest.ts` was designed with **Next.js App Router developers in mind**.
Just run `typest build`, import the generated SDK in your React Client Component, and call your API with full type safety:

```tsx
'use client';
import { api } from '../client';

const user = await api.user.GET({ id: '123' });
```

---

## 🌐 Edge Native, Bun Fast

`typest.ts` leverages **Bun as its runtime** — fast startup, native `fetch`, built-in `.env` support, and blazing performance.
No Express, no Fastify, no polyfills. Just native speed and minimalism.

The result? **First-class support for edge deployment**:

* ✅ Vercel Edge Functions
* ✅ Cloudflare Workers
* ✅ Deno Deploy (coming soon)

---

## 🧠 Philosophy

> "Types are truth. Zod is law. Files are APIs."

`typest.ts` isn't just a framework — it's a new way of thinking about APIs:

* Write a file
* Define your types
* Get an API + SDK instantly

No codegen. No OpenAPI hell. No DTOs. Just types.

---

## 📦 Get Started

```bash
npx typest init
npx typest dev
npx typest build
```

---

## 🧪 Tech Stack

* Runtime: **Bun**
* Validation: **Zod**
* SDK Generator: **ts-rest**

---

## 🏁 Join the Typed Future

typest.ts is the backend framework for frontend minds.
Build APIs like you write React components. With types, with structure, with speed.

> **Just Bun. Just Zod. Just structure. Just typest.**
