import React from "react"

type FormProps<Input, Result> = {
  action: {
    handler: (args: { ctx: object; input: Input }) => Promise<{ success: boolean; data: Result }>
  }
  onResult?: (result: { success: boolean; data: Result }) => void
  children: React.ReactNode
}

export function Form<Input extends Record<string, unknown>, Result>({
  action,
  onResult,
  children
}: FormProps<Input, Result>) {
  return (
    <form method="post"
    action="http://localhost:3000/login"
      onSubmit={async (e) => {
        e.preventDefault()
        const fd = new FormData(e.currentTarget)
        const input = Object.fromEntries(fd.entries()) as Input
        const result = await action.handler({ ctx: {}, input })
        onResult?.(result)
      }}
    >
      {children}
    </form>
  )
}
