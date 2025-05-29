# Bevel.ts ✫

**The Intent-Driven, LLM-Ready, All-in-One Backend Stack**

Bevel.ts is a modern, developer-first backend framework that reinvents BaaS — from a service-centric model to an intent-driven architecture. Define what your backend should *do*, and let Bevel.ts turn it into a type-safe, deployable, AI-ready backend.

With our official mascot — the unstoppable **BeasBeaver** ✫ — Bevel.ts is about building strong, structured, purposeful backend systems. Just like a beaver crafts resilient dams with precision and intent, Bevel.ts helps developers architect clean, composable APIs for the modern age.

---

## ✨ Why Bevel.ts?

### 🛡 All-in-One Backend Stack

* Built-in support for API, Auth, DB, and AI integration
* Designed for scale, DX, and Edge-native deployment
* Everything you need — nothing you don't

### 🔮 LLM-Native by Design

* Export your API as OpenAI-compatible function-calling schemas
* Zero effort integration with GPT-4o, LangChain, Claude, and more
* Automatically typed endpoints that feel like magic (but aren't)

### 🌍 Edge-Ready Out of the Box

* Deploy instantly to Cloudflare Workers or Vercel Edge
* Superfast startup, zero-cold-start infrastructure

### 🧠 Intent-Driven API Design

* Use `defineIntent("user.login", { ... })` to define the *what*, not the *how*
* No REST scaffolding. No GraphQL boilerplate. Just clean, typed APIs

### 🔐 Built-in Auth & DB

* Lucia-powered authentication (zero vendor lock-in)
* Drizzle ORM for type-safe, schema-driven SQL

### 🧪 Incredible Developer Experience

* `bevel dev` with hot reload + Playground UI
* Type-safe CLI generation: `bevel generate intent user.login`
* Built for Bun, Node 18+, and TypeScript fanatics

---

## 🔥 Feature Overview

| Feature                   | Bevel.ts                  | Supabase      | Firebase                       |
| ------------------------- | ------------------------- | ------------- | ------------------------------ |
| **Architecture**          | Intent-driven             | SQL-first     | Event-driven                   |
| **Type Safety**           | Full (Zod + TS)           | Partial       | Minimal                        |
| **Function Calling (AI)** | ✅ Built-in                | ❌             | ❌                              |
| **Edge-Ready**            | ✅ Native                  | ⚠️ Partial    | ⚠️ Limited                     |
| **Auth**                  | Lucia (modular)           | Supabase Auth | Firebase Auth (tight coupling) |
| **ORM/DB**                | Drizzle (Postgres/SQLite) | Postgres only | Firestore (NoSQL)              |
| **Dev Tools**             | CLI + Playground UI       | GUI Studio    | Firebase Console               |
| **Magic**                 | None (explicit code)      | Medium        | High (black-boxed)             |

---

## 🛡 Tech Stack

| Layer          | Technology                                |
| -------------- | ----------------------------------------- |
| Runtime        | Bun / Node.js (18+)                       |
| HTTP Server    | Hono                                      |
| API Definition | tRPC + Zod                                |
| ORM            | Drizzle ORM                               |
| Auth           | Lucia                                     |
| CLI Framework  | Custom (bevel CLI)                        |
| Edge Deploy    | Cloudflare Workers / Vercel Edge          |
| AI Integration | OpenAI Function Calling Export            |
| UI             | React + shadcn/ui + Radix + Framer Motion |

---

## 🛠️ Quick Start

```bash
npx bevel-ts init my-app
cd my-app
npm run dev
npm run ui
```

Then open `http://localhost:3333` to explore your live API in the Playground UI.

---

## 📦 Use Cases

* Headless SaaS APIs with real structure
* LLM tools that require callable endpoints
* Internal tools with strict typing
* Edge-ready microservices

---

## ✫ What Makes Bevel.ts Different?

> "Supabase is SQL. Firebase is events. \*\*Bevel.ts is *intent*."

Bevel.ts isn't just another tool — it's a **philosophy of backend clarity**.

✫ **BeasBeaver** reminds us: structure matters, intent matters, and building strong backends should be joyful.

We believe backends should be expressive, composable, and AI-friendly. Bevel.ts is here to bring clarity and purpose to modern backend development.

---

## ⭐ Star Us

If you believe in type-driven APIs, AI-native architecture, and DX-first frameworks — [star Bevel.ts on GitHub](https://github.com/Bevel-ts/Bevel.ts) and help us build the future of backends.
