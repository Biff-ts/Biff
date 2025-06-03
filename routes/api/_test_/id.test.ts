import { expect, test } from 'bun:test';

const base = 'http://localhost:3000';

test('GET /api/user/:id - success', async () => {
  const res = await fetch(`${base}/api/user/9a81b68c-91c3-4a88-842f-8887e6f3e6e7`);
  const json = await res.json();
  expect(res.status).toBe(200);
  expect(json).toHaveProperty('id');
  expect(json).toHaveProperty('name');
});

test('GET /api/user/:id - invalid UUID', async () => {
  const res = await fetch(`${base}/api/user/invalid-id`);
  const json = await res.json();
  expect(res.status).toBe(400);
  expect(json).toHaveProperty('error');
});