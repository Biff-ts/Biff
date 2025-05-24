import { loginUserIntent } from "../../intents/user/loginIntent"
import { generateSessionId } from "../../session/crypto"
import { setSession } from "../../session/store"

interface LoginInput {
  input: {
    email: string;
    password: string;
  };
}

export async function loginUser({ input }: LoginInput) {
  // Zodでバリデーション
  const parsed = loginUserIntent.safeParse(input)
  if (!parsed.success) throw new Error("Invalid input")

  const { email, password } = parsed.data

  if (email === "admin@biff.dev" && password === "biff") {
    const id = generateSessionId()
    console.log("📦 returning session:", id)

    setSession(id, { id: "u1", name: "Admin" })
    return {
      type: "redirect",
      location: "/dashboard",
      headers: { "Set-Cookie": `session=${id}; Path=/; HttpOnly` }
    }
  }

  throw new Error("Invalid credentials")
}
