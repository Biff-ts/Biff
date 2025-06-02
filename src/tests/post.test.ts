import { test, expect } from '@jest/globals'
import { createPost } from '../services/post.service'
import { faker } from '@faker-js/faker'

const fakePostInput = {
  title: faker.lorem.words(3),
  body: faker.lorem.words(3),
}

test('createPost returns expected structure', async () => {
  const result = await createPost(fakePostInput, { user: { id: 'test-user' } })
  expect(result).toMatchObject({
    title: fakePostInput.title,
    body: fakePostInput.body,
  })
})