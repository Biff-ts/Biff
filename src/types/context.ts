
// types/context.ts
export type AppContext = {
  req: Request
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res: any // ← FastifyのresはNode型なのでanyで受けとく
  user?: { id: string; name: string }
}

