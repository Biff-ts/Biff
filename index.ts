import { Server, Route } from "./src/server";
import { json } from "./src/util";
import { createAuth } from "./src/middleware/auth";
import { generateToken } from "./src/auth/token";
import { setCookie } from "./src/cookie";

const SECRET = "super-secret-key";

const routes: Route[] = [
  {
    method: "POST",
    path: "/login",
    handler: async (req) => {
      const token = await generateToken({
  id: "user123",
  role: "admin",
  iat: Date.now(), 
  jti: crypto.randomUUID(),             // ✅ 追加
}, SECRET);
      const headers = new Headers();
      headers.set("Set-Cookie", setCookie("auth", token, {
        httpOnly: true,
        path: "/",
        maxAge: 3600,
      }));
      return json({ token }, 200, headers);
    },
  },
  // entry.ts

{
  method: "GET",
  path: "/me",
  handler: (req) => {
    const user = (req as any).user;
    return json({ user });
  },
  middleware: [createAuth({ secret: "super-secret-key" })],
}

];

const server = new Server(routes);

export default {
  fetch: (req: Request) => server.fetch(req),
};
