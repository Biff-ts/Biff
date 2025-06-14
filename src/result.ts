
// src/result.ts

import { json } from "./utils.ts";

export type Ok<T> = { ok: true; value: T };
export type Err = { ok: false; message: string; status?: number };

export type Result<T> = Ok<T> | Err;

export function ok<T>(value: T): Ok<T> {
  return { ok: true, value };
}

export function err(message: string, status = 400): Err {
  return { ok: false, message, status };
}

// 🧠 Tirne哲学 + HTTP対応
export function toResponse<T>(
  result: Result<T>,
  mapOk: (value: T) => Response = (val) => json(val)
): Response {
  if (result.ok) {
    return mapOk(result.value);
  }
  return json({ error: result.message }, result.status ?? 400);
}
