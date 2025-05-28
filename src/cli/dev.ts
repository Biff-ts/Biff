// src/cli/dev.ts
import app from '../server/router'

/**
 * Dev server for Bevel.ts using Bun native hot-reload
 */
Bun.serve({
  fetch: app.fetch,
  port: 8787
})

console.log('🚀 bevel dev running on http://localhost:8787 (with Bun hot-reload)')
