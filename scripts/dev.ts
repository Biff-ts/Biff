// scripts/dev.ts
import { serve } from '@hono/node-server'
import chokidar from 'chokidar'
import { createApp } from '../src/server/router'

let currentApp = createApp()

serve({
  fetch: (req) => currentApp.fetch(req),
  port: 3333
})

console.log('🟢 bevel dev started on http://localhost:3333')

// chokidarでintentsディレクトリを監視
chokidar.watch('../src/intents/*.ts').on('change', async (path) => {
  console.log(`🌀 Reloading due to change: ${path}`)

  try {
    // import() + cache busting によりESMでも再ロード可能に！
    const { createApp } = await import(`../src/server/router?update=${Date.now()}`)
    currentApp = createApp()
    console.log('✨ Intent registry reloaded')
  } catch (err) {
    console.error('❌ Error reloading:', err)
  }
})
