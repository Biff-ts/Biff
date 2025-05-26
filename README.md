# Bevel.ts ✨

**The Precision-Driven, AI-Ready Backend Framework for the Modern Web**

Bevel.ts is a sleek, type-safe, intent-based backend framework designed for developers who value elegance, clarity, and modernity. Inspired by the architectural term *bevel* — a refined edge crafted with precision — Bevel.ts helps you carve structured APIs with deliberate intent, ready for AI and edge-native deployment.

With its mascot, the sharp-minded **BevelBeaver** 🦫, this framework stands for clarity in code, strength in structure, and speed in execution.

---

## ✨ Why Bevel.ts?

### 🧠 Intent Over Implementation

Define the *what*, not the *how* — Bevel.ts centers your API architecture around intent.

```ts
defineIntent("user.login", z.object({ email: z.string(), password: z.string() }), async (ctx) => {
  // login logic here
});
```

No REST. No GraphQL. Just direct, type-safe expression of what your backend is supposed to do.

### ⚡ Blazing-Fast Developer Workflow

* 🔁 Hot-reload CLI: `bevel dev`
* 🧪 Built-in Playground UI
* 🧰 `bevel generate intent <name>` scaffolds your handlers instantly

### 🌐 Built for the Edge, Built for Scale

* Instant deploy to **Cloudflare Workers**, **Vercel Edge**, or **Bun runtime**
* Zero cold starts, near-native startup times

### 🔮 AI-Native & LLM-Ready

* Export OpenAI-compatible schemas from your endpoints
* Out-of-the-box support for GPT-4o, Claude, LangChain, and others
* Perfect for agent frameworks and function-calling APIs

### 🧱 All-in-One, Zero Lock-in

* 🧬 Auth: [Lucia](https://lucia-auth.com/)
* 🗄️ DB: [Drizzle ORM](https://orm.drizzle.team/) with native Postgres/SQLite support
* 📦 Edge deploy, Auth, ORM — everything batteries-included, nothing proprietary

---

## 🔥 Feature Comparison

| Feature                   | **Bevel.ts**               | Supabase      | Firebase          |
| ------------------------- | -------------------------- | ------------- | ----------------- |
| **Architecture**          | Intent-Driven              | SQL-first     | Event-driven      |
| **Edge Support**          | Native (Cloudflare/Vercel) | Partial       | Limited           |
| **Type Safety**           | Full (Zod + TypeScript)    | Partial       | Minimal           |
| **Auth**                  | Modular (Lucia)            | Coupled       | Coupled           |
| **Function Calling (AI)** | ✅ Built-in                 | ❌             | ❌                 |
| **ORM/DB**                | Drizzle (relational)       | Postgres      | Firestore (NoSQL) |
| **Dev Tooling**           | CLI + Playground           | GUI Studio    | Firebase Console  |
| **Open Philosophy**       | OSS + Extensible           | Mostly closed | Black-boxed       |

---

## 🧰 Tech Stack

| Layer          | Technology                                |
| -------------- | ----------------------------------------- |
| Runtime        | Bun / Node.js (18+)                       |
| Server         | Hono                                      |
| API Schema     | Zod + tRPC                                |
| Auth           | Lucia                                     |
| ORM            | Drizzle ORM                               |
| CLI            | Custom `bevel` CLI                        |
| Deployment     | Cloudflare Workers / Vercel Edge          |
| AI Integration | OpenAI Function Calling / LangChain-ready |
| UI             | React + shadcn/ui + Radix + Framer Motion |

---

## 🚀 Quick Start

```bash
npx bevel.ts init my-app
cd my-app
bevel generate intent user.register
bevel dev
```

Open `http://localhost:3333` and explore your live API.

---

## 📦 Ideal Use Cases

* LLM apps with structured, callable functions
* Internal tools with strict typings & tight DX
* Headless SaaS products at startup speed
* Microservices running at the edge

---

## 🦫 Philosophy of BevelBeaver

> "Code should be *cut* — not cluttered."

Bevel.ts believes backends should be expressive, composable, and AI-compatible from day one. Just like a bevel refines structure with intent and clarity, Bevel.ts carves strong, minimal APIs for the modern web.

Whether you're building LLM agents, edge-native platforms, or elegant backend stacks — **Bevel.ts brings design thinking to backend development.**

---

## ⭐ Star & Join the Movement

If you believe in precision-first backend design, AI-native architecture, and fast, delightful DX — [⭐ star Bevel.ts on GitHub](#) and join the movement.
