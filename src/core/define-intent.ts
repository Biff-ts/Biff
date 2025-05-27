import type { ZodTypeAny, infer as Infer } from 'zod'

/**
 * Minimal context shape for now. Can be extended later.
 */
export type BevelIntent<I extends ZodTypeAny, O> = {
  name: string
  input: I
  handler: (args: {
    input: Infer<I>
    ctx: any // ← 後でちゃんと型付けされる予定！
  }) => Promise<O> | O
  description?: string
}

/**
 * Fully type-safe defineIntent implementation
 */
export function defineIntent<I extends ZodTypeAny, O>(
  name: string,
  options: {
    input: I
    handler: (args: { input: Infer<I>; ctx: any }) => Promise<O> | O
    description?: string
  }
): BevelIntent<I, O> {
  return {
    name,
    input: options.input,
    handler: options.handler,
    description: options.description
  }
}
