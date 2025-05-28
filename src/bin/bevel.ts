#!/usr/bin/env bun

const [,, command, ...args] = process.argv

switch (command) {
  case 'dev':
    await import('../cli/dev.ts')
    break
  case 'generate':
    await import('../cli/generate.ts')
    break
  case 'init':
    await import('../cli/init.ts')
    break
  default:
    console.error(`Unknown command: ${command}`)
    process.exit(1)
}