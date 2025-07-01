export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type Handler = (
  req: Request,
  params?: Record<string, string>,
  user?: Record<string, any>
) => Response | Promise<Response>;

export type Middleware = (
  req: Request,
  next: () => Promise<Response>
) => Promise<Response>;

export interface Route {
  method: Method;
  path: string;
  handler: Handler;
  middleware?: Middleware[];
}
