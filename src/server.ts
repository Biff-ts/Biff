import fastify from "fastify"
import { routes } from "./routes.ts"
import { compose, Middleware } from "./utils/compose.ts"

import { pages } from "./ssr/entry.ts"
import { renderToHtml } from "./ssr/renderToHtml.ts"
import type { AppContext } from "./types/context.ts"
import React from "react"
import { loginUser } from "./actions/user/login"
import { withAuthOrRedirect, RedirectError } from "./middlewares/withAuthOrRedirect"

import formBody from "@fastify/formbody"

const app = fastify()

app.register(formBody)


app.post("/login", async (req, res) => {
  const body = await req.body as { email: string; password: string }
  try {
    const result = await loginUser({ input: body })

    if (result.type === "redirect") {
      res.header("Set-Cookie", result.headers["Set-Cookie"])
      res.redirect(result.location)
    } else {
      res.send(result)
    }
  } catch (e) {
    console.error(e)
    res.status(401).send("Unauthorized")
  }
})

app.get("*", async (req, res) => {
  const url = req.url
  const route = routes.find((r) => r.path === url && r.ssr)

  if (!route) {
    res.status(404).send("Not Found")
    return
  }

  const reqUrl = `http://localhost:3000${url}`
const ctx: AppContext = {
  req: new Request(reqUrl, {
    method: req.method,
    headers: new Headers(
      Object.entries(req.headers).filter(
        ([, value]) => typeof value === "string"
      ) as [string, string][]
    )
  }),
  res
}

  try {
    const middlewares: Middleware[] = []
    if (route.path === "/dashboard") {
  middlewares.push(withAuthOrRedirect)
}

    const finalCtx = await (await compose(middlewares))(ctx)
    const Component = pages[route.path as keyof typeof pages]

    const props: { user: { id: string; name: string } } | null = 
      route.path === "/dashboard" && finalCtx.user
        ? { user: finalCtx.user }
        : null

    const html = renderToHtml(
      React.createElement(Component, props),
      true,
      finalCtx
    )
    res.type("text/html").send(html)

  } catch (e) {
    if (e instanceof RedirectError) {
      res.status(302).redirect(e.location)
    } else {
      console.error("🔥 SSR error:", e)
      res.status(500).send("Internal Server Error")
    }
  }
})

app.listen({ port: 3000 }, () => {
  console.log("🚀 Biff SSR server running at http://localhost:3000")
})  