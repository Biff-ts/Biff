// src/parallel.ts

export type TaskHandle<T = unknown> = {
  promise: Promise<T>;
};

export function runParallel<T>(fn: () => T | Promise<T>): TaskHandle<T> {
  return {
    promise: Promise.resolve().then(fn),
  };
}

export async function waitAll(handles: TaskHandle[]): Promise<unknown[]> {
  return Promise.all(handles.map(h => h.promise));
}
