import type { Context as HonoContext } from 'hono'

export type AppContext = {
  c: Partial<HonoContext> & FetchCreateContextFnOptions
  user?: {
    id: string
  }
}
// Define FetchCreateContextFnOptions locally as it is not exported from '@hono/trpc-server'
type FetchCreateContextFnOptions = {
  req: Request
  env: unknown
  executionCtx?: ExecutionContext
}

export function createContext(c: FetchCreateContextFnOptions): AppContext {
  // 任意のユーザー認証処理などを挟むことも可能
  return {
    c: { ...c } as Partial<HonoContext> & FetchCreateContextFnOptions,
    user: undefined
  }
}
