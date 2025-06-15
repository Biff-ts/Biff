// src/parallel.ts

export type ParallelTask<T> = {
  id: string;
  start: () => void;
  result: Promise<T>;
  cancel?: () => void;
};

// 明示的に「後で開始できる」並列実行
export function createTask<T>(
  fn: () => T | Promise<T>,
  id: string,
  signal?: typeof AbortSignal
): ParallelTask<T> {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;

  const result = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  let started = false;

  const start = () => {
    if (started) return;
    started = true;

    Promise.resolve()
      .then(fn)
      .then(resolve)
      .catch(reject);
  };

  return { id, start, result };
}

// 正確な型推論付き waitAll
export async function waitAll<T extends readonly ParallelTask<any>[]>(
  tasks: T
): Promise<{ [K in keyof T]: T[K] extends ParallelTask<infer R> ? R : never }> {
  return Promise.all(tasks.map(t => t.result)) as any;
}
