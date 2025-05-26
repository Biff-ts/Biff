// src/server/index.ts
import { serve } from '@hono/node-server'
import app from './router'

serve({ fetch: app.fetch, port: 3333 })
console.log('🚀 API Server running at http://localhost:3333')
