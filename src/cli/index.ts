#!/usr/bin/env bun

const [, , cmd, ...args] = process.argv

if (cmd === 'init') {
  await import('./init.ts')
} else if (cmd === 'generate') {
  await import('./generate.ts')
} else {
  console.error(`Unknown command: ${cmd}`)
  process.exit(1)
}

