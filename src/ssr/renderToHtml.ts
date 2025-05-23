import { renderToString } from "react-dom/server"

import type { AppContext } from "../types/context"
import { JSX } from "react"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function renderToHtml(component: JSX.Element, p0: boolean, ctx?: AppContext): string {
  return "<!DOCTYPE html>" + renderToString(component)
}
