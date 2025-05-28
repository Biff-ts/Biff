// src/cli/generate.ts
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

const [, , type, name] = process.argv

if (type !== 'intent' || !name) {
  console.error('❌ Usage: bevel generate intent user.login')
  process.exit(1)
}

// user.login → ['user', 'login']
const parts = name.split('.')
const fileName = parts.pop()!
const dirPath = join('src', 'intents', ...parts)
const filePath = join(dirPath, `${fileName}.ts`)

if (existsSync(filePath)) {
  console.error(`❌ Already exists: ${filePath}`)
  process.exit(1)
}

await mkdir(dirPath, { recursive: true })

const className = fileName.replace(/[^a-zA-Z0-9]/g, '_') // 安全な変数名
const content = `import { defineIntent } from '../../core/define-intent'
import { z } from 'zod'

export const ${className} = defineIntent("${name}", {
  input: z.object({
    // Add your input fields here
  }),
  handler: async ({ input, ctx }) => {
    return {
      ok: true
    }
  },
  description: "Describe your intent"
})
`

await writeFile(filePath, content, 'utf8')

console.log(`✅ Created: ${filePath}`)
