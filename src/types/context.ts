import type { IncomingMessage } from "http"
import type { FastifyReply } from "fastify"

export type AppContext = {
  req: IncomingMessage
  res: FastifyReply
  user?: { id: string; name: string }
}
