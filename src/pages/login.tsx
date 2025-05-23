import { loginUser } from "../actions/user/login"
import { Form } from "../components/Form"

type LoginResult = {
  type: "redirect"
  location: string
  headers: Record<string, string>
}

export default function LoginPage() {
  return (
    <Form<{ email: string; password: string }, LoginResult>
      action={{
        handler: async ({ input }) => {
            console.log("📝 submitted input:", input)

          const result = await loginUser({ input }) as LoginResult
          return {
            success: result.type === "redirect",
            data: result,
          }
        },
      }}
      onResult={(result) => {
        if (result.success && result.data.type === "redirect") {
          alert("Login success!")
          console.log("Redirecting to", result.data.location)
        }
      }}
    >
      <input name="email" type="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </Form>
  )
}
