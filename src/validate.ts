import { z } from 'zod';

interface ModuleInput {
    params?: z.ZodTypeAny;
    query?: z.ZodTypeAny;
    body?: z.ZodTypeAny;
}

interface Module {
    input?: ModuleInput;
}

interface ParseInputResult {
    input: Record<string, any> | null;
    error: { status: number; body: { error: string; details?: { field: string; message: string }[] } } | null;
}

export async function parseInput(
    mod: Module,
    req: Request,
    routeParams: Record<string, string>
): Promise<ParseInputResult> {
    const result: Record<string, any> = {};

    if (!mod.input) return { input: {}, error: null };

    try {
        if (mod.input.params) {
            result.params = mod.input.params.parse(routeParams);
        }
        if (mod.input.query) {
            const queryObj = Object.fromEntries(new URL(req.url).searchParams);
            result.query = mod.input.query.parse(queryObj);
        }
        if (mod.input.body) {
            const json = await req.json();
            result.body = mod.input.body.parse(json);
        }
        return { input: result, error: null };
    } catch (err) {
        return { input: null, error: formatZodError(err) };
    }
}

function formatZodError(err: any) {
  if (err instanceof z.ZodError) {
    return {
      status: 400,
      body: {
        error: 'Invalid request',
        details: err.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      },
    };
  }
  return {
    status: 500,
    body: { error: 'Unknown validation error' },
  };
}
export function validateOutput(mod: any, data: any): null | { status: number; body: any } {
  if (!mod.output) return null;

  try {
    mod.output.parse(data);
    return null;
  } catch (err) {
    if (err instanceof z.ZodError) {
      return {
        status: 500,
        body: {
          error: 'Output schema validation failed',
          details: err.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
      };
    }
    return {
      status: 500,
      body: { error: 'Unknown output validation error' },
    };
  }
}