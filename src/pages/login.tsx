import { loginUser } from "../actions/user/login.ts"
import { Form } from "../components/Form.tsx"

export default function LoginPage() {
  return (
    <Form
      action={{
        handler: async ({ input }: { ctx: object; input: { email: string; password: string } }) => {
          const result = await loginUser({ input })
          return {
            success: result.type === "redirect",
            data: result
          }
        }
      }}
      
    >
      <input name="email" type="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </Form>
  )
}
