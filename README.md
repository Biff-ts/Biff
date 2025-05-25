# Biff 🐗

**Biff** is the Backend-Initiative Fullstack Framework.
Where the frontend speaks and the backend decides.

---

## 🐗 Introduction: Why Biff Was Born

In 2025, we wanted to build sites that were both **server-rendered** and **fully interactive**—without drowning in `useEffect`, JSON APIs, or duplicated state.

Biff was born from that need: to restore clarity, composability, and separation of concerns. The frontend should do **three things only**:

1. **Declare intent** via forms
2. **Render results** from the server
3. **Look beautiful**

That's it. The rest belongs to the backend.

Biff lets developers focus on what matters: **design on the frontend, logic on the backend.**

Our mascot? A wild boar. 🐗

> Like a boar, Biff charges straight through the frontend mess and gets things done—cleanly and powerfully.

---

## 🧠 Philosophy

* *UI is an intent.*
* *The server is the application.*
* *All logic lives in Context.*

---

## ✨ What Makes Biff Different?

Biff is **not** a component framework.
It is a **server-first, intent-driven logic execution** framework.

### 🧩 UI is Just a Declaration

In Biff, the React UI is **stateless**. It expresses intent via `<Form action={...}>`, and nothing more.

* No `useState`
* No `useEffect`
* No hidden flows

Example:

```tsx
<Form action={loginUser}>
  <input name="email" />
  <input name="password" />
</Form>
```

### 🔁 Actions Are Linear and Typed

Every action defines:

* ✅ **Intent** (Zod-based input type)

* ✅ **Handler** (async function with full `ctx`)

* ✅ **Result** (success, redirect, error, html, etc.)

* No GraphQL

* No REST boilerplate

* No DTO sync nightmares

### 🧬 Context Is Your Truth

All data flows through `AppContext`:

```ts
type AppContext = {
  req: Request
  res: Response
  user?: User
  db?: DB
  logger?: Logger
}
```

Injected via middleware:

* Logged in? → `ctx.user`
* Need DB? → `ctx.db`

This is not DI magic. This is just data.

---

## 🔥 Biff vs Other Frameworks

### 🆚 Next.js

| Feature              | Next.js             | Biff                           |
| -------------------- | ------------------- | ------------------------------ |
| SSR by default       | ❌ (CSR first)       | ✅ Always SSR                   |
| Middleware structure | Limited (edge only) | ✅ Full pipeline with compose() |
| Logic in UI          | ✅ useState etc.     | ❌ UI = form only               |
| File-based routing   | ✅                   | ❌ (explicit routes.ts)         |
| Isomorphic data      | ❌                   | ✅ Action + Context-based       |

### 🆚 Astro

| Feature                | Astro              | Biff                                |
| ---------------------- | ------------------ | ----------------------------------- |
| Island-based rendering | ✅                  | ❌ (Full SSR)                        |
| Interactivity          | ❌ (Opt-in islands) | ✅ React-native forms + Result logic |
| Form handling          | ❌ (manual POST)    | ✅ Fully typed server actions        |
| Application state      | ❌ (manually wired) | ✅ All in Context pipeline           |

---

## 🚀 Why Biff?

Because in 2025, the frontend is loud and unclear.
**Biff makes the backend speak clearly.**

* Better SEO (always SSR)
* Better DX (typed input, typed result)
* Better structure (no CLI magic, no file routing)

**Biff doesn't guess. It executes.**

---

## 🛠️ Quickstart

```bash
npx create-biff@latest
cd my-app
npm install
npm run dev:server
```

* `/login` → `<Form action={loginUser}>`
* `/dashboard` → SSR only, protected by `withAuth`
* No JS? It still works. That’s the point.

---

## 🧪 Summary

* No magic
* No state in UI
* No JSON APIs
* No duplication

Just: `intent → action → result`
All through **Context**.

---

## 🐗 Meet the Mascot

Biff the Boar is our champion of backend logic. When the frontend becomes a mess of client state, hydration errors, and broken APIs—he charges in, clears the path, and brings order.

> Strong, fast, and focused—just like the framework.

You’ll see him charging through our docs, our console logs, and maybe even our stickers.
