import fastify from "fastify"
import { routes } from "./routes.ts"
import { compose, Middleware } from "./utils/compose.ts"
import { withAuth } from "./middlewares/withAuth.ts"
import { pages } from "./ssr/entry.ts"
import { renderToHtml } from "./ssr/renderToHtml.ts"
import type { AppContext } from "./types/context.ts"
import React from "react"

const app = fastify()

app.get("*", async (req, res) => {
  const url = req.url
  const route = routes.find((r) => r.path === url && r.ssr)

  if (!route) {
    res.status(404).send("Not Found")
    return
  }

  const ctx: AppContext = { req: req.raw, res }

  try {
    const middlewares = [route.path === "/dashboard" ? withAuth : undefined].filter((mw): mw is Middleware => Boolean(mw))
    const finalCtx = await (await compose(middlewares))(ctx)

    const Component = pages[route.path as keyof typeof pages]
   if (!finalCtx.user) {
     throw new Error("User is not defined in the context");
   }
   const html = renderToHtml(React.createElement(Component, { ...finalCtx, user: finalCtx.user! }), true, finalCtx) // ✅ JSXを使わずcreateElementで


    res.type("text/html").send(html)
  } catch (e: unknown) {
    console.error(e)
    res.status(500).send("Internal Server Error")
  }
})

app.listen({ port: 3000 }, () => {
  console.log("🚀 Biff SSR server running at http://localhost:3000")
})
