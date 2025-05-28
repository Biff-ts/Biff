// src/cli/init.ts
import { mkdir, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'

const files = [
  {
    path: 'tsconfig.json',
    content: `{
  "compilerOptions": {
    // Environment setup & latest features

    "target": "ESNext",
    "module": "ESNext",
    "moduleDetection": "force",
    "jsx": "react-jsxdev",
    "allowJs": true,
    "lib": ["dom", "esnext"],


    // Bundler mode
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "noEmit": true,

    // Best practices
    "strict": true,
    "skipLibCheck": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,

    // Some stricter flags (disabled by default)
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noPropertyAccessFromIndexSignature": false
  }
}`
  },
  {
    path: '.gitignore',
    content: `node_modules
dist
bun.lockb`
  },
  
  {
    path: 'src/core/define-intent.ts',
    content: `import type { ZodTypeAny, infer as Infer } from 'zod'
    
    /**
     * Minimal context shape for now. Can be extended later.
     */
    export type BevelIntent<I extends ZodTypeAny, O> = {
      name: string
      input: I
      handler: (args: {
        input: Infer<I>
        ctx: any // ← 後でちゃんと型付けされる予定！
      }) => Promise<O> | O
      description?: string
    }
    
    /**
     * Fully type-safe defineIntent implementation
     */
    export function defineIntent<I extends ZodTypeAny, O>(
      name: string,
      options: {
        input: I
        handler: (args: { input: Infer<I>; ctx: any }) => Promise<O> | O
        description?: string
      }
    ): BevelIntent<I, O> {
      return {
        name,
        input: options.input,
        handler: options.handler,
        description: options.description
      }
    }
    `
  },
  {
    path: 'src/intents/hello.ts',
    content: `import { defineIntent } from '../core/define-intent'
    import { z } from 'zod'
    
    export const hello = defineIntent("hello", {
      input: z.object({
        name: z.string().optional()
      }),
      handler: async ({ input, ctx }) => {
      
        return {
      message: \`Hello again, \${input.name ?? "world"}!\`
    }
    
      },
      description: "Returns a friendly greeting."
    })

    `
  }
]

for (const file of files) {
  if (!existsSync(file.path)) {
    const dir = join(file.path.split('/').slice(0, -1).join('/'))
    if (dir) await mkdir(dir, { recursive: true })
    await writeFile(file.path, file.content)
    console.log(`✅ Created: ${file.path}`)
  } else {
    console.log(`⚠️ Skipped (exists): ${file.path}`)
  }
}
