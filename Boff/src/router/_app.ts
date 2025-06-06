import { ProcedureCallOptions } from '@trpc/server/dist/unstable-core-do-not-import';
import { router } from '../trpc/server'
import { helloRouter } from './hello'
import { userRouter } from './user'

export const appRouter = router({
  hello: helloRouter,
  user: userRouter
});

export const createContext = (c: ProcedureCallOptions<unknown>) => {
  // Implement your context creation logic here
  return {};
};

export type AppRouter = typeof appRouter
