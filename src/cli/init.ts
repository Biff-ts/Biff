// src/cli/init.ts
import { existsSync } from 'fs'
import { mkdir, rm, writeFile } from 'fs/promises'
import { join } from 'path'
import { execSync } from 'child_process'

const [, , targetDir] = process.argv

if (!targetDir) {
console.error('❌ Please specify a project name: bevel init my-app')
  process.exit(1)
}

if (existsSync(targetDir)) {
console.error(`❌ The folder ${targetDir} already exists.`)
  process.exit(1)
}

const repo = 'Bevel-ts/Bevel.ts'
const gitUrl = `https://github.com/${repo}.git`

console.log(`📦 Fetching the template from ${gitUrl}...`)

// clone
execSync(`git clone --depth=1 ${gitUrl} ${targetDir}`, { stdio: 'inherit' })

// remove .git
await rm(join(targetDir, '.git'), { recursive: true, force: true })

console.log('✅ Successfully fetched the template')

// install
execSync(`cd ${targetDir} && bun install`, { stdio: 'inherit' })

// dev 起動
execSync(`cd ${targetDir} && bun run dev`, { stdio: 'inherit' })
