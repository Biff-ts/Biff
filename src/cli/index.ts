#!/usr/bin/env node

// ESMでも動作し、引数を正しくハンドリングし、init/generate をルーティングするCLI

const [, , cmd, ...args] = process.argv

if (cmd === 'init') {
  const { init } = await import('./init.js') as { init: (args: string[]) => Promise<void> }

  await init(args)
} else if (cmd === 'generate') {
  const { generate } = await import('./generate.js') as { generate: (args: string[]) => Promise<void> }
  await generate(args)
} else {
  console.error(`❌ Unknown command: ${cmd}`)
  console.error(`🧭 Available commands: init <project-name>, generate intent <name>`)
  process.exit(1)
}
