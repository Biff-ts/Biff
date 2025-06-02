import { z } from "zod";
import { Context } from "hono";


type RouteDefinition = {
  method: "get" | "post" | "put" | "delete";
  path: string;
  auth?: boolean;
  input: z.ZodTypeAny;
  output: z.ZodTypeAny;
  handler: (args: { ctx: Context }) => Promise<any>;
};

export function defineRoute<T extends RouteDefinition>(route: T): T {
  return route;
}
