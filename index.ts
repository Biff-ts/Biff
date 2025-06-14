// index.ts
import { Tirne } from "./src/main.ts";
import { json } from "./src/utils.ts";

const app = new Tirne();

app.get("/", () => json({ msg: "Hello Tirne + Bun!" }));

app.listen(3000, () => {
  console.log("🚀 Tirne running at http://localhost:3000");
});
