// src/cli/init.ts
import { existsSync } from 'fs'
import { mkdir, rm } from 'fs/promises'
import { join } from 'path'
import { execSync } from 'child_process'

export async function init(args: string[]) {
  const targetDir = args[0]

  if (!targetDir) {
    console.error('❌ Please specify a project name: bevel-ts init my-app')
    process.exit(1)
  }

  if (existsSync(targetDir)) {
    console.error(`❌ The folder "${targetDir}" already exists.`)
    process.exit(1)
  }

  const repo = 'Bevel-ts/Bevel.ts'
  const gitUrl = `https://github.com/${repo}.git`

  console.log(`📦 Fetching the template from ${gitUrl}...`)

  try {
    execSync(`git clone --depth=1 ${gitUrl} ${targetDir}`, { stdio: 'inherit' })

    // remove .git
    await rm(join(targetDir, '.git'), { recursive: true, force: true })
    console.log('✅ Template cloned and cleaned')

    execSync(`cd ${targetDir} && bun install`, { stdio: 'inherit' })
    execSync(`cd ${targetDir} && bun run dev`, { stdio: 'inherit' })
  } catch (err) {
    console.error('❌ Failed to initialize project:', err)
    process.exit(1)
  }
}
