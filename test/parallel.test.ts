import { expect, test } from "bun:test";
import { runParallel, waitAll } from "../src/parallel";

function sleep(ms: number): Promise<number> {
  return new Promise(res => setTimeout(() => res(ms), ms));
}

test("runParallel and waitAll executes in parallel", async () => {
  const t1 = runParallel(() => sleep(100));
  const t2 = runParallel(() => sleep(150));
  const result = await waitAll([t1, t2]);

  expect(result).toEqual([100, 150]);
});
