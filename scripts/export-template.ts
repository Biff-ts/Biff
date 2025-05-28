import { copyFile, mkdir, readdir, stat } from 'fs/promises'
import { join, dirname } from 'path'
import { existsSync } from 'fs'

const EXCLUDE = ['node_modules', '.git', 'bun.lockb', 'dist', '.next', '.DS_Store']

// 📁 コピー対象のルートファイル（必要なものだけ）
const ROOT_FILES = [
  '.gitignore',
  'Readme.md',
  'tsconfig.json',
  'package.json',
  'index.html',
  'bun.lock',
  'env'
]

async function copyDir(src: string, dest: string) {
  const entries = await readdir(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = join(src, entry.name)
    const destPath = join(dest, entry.name)

    if (EXCLUDE.includes(entry.name)) continue

    if (entry.isDirectory()) {
      await mkdir(destPath, { recursive: true })
      await copyDir(srcPath, destPath)
    } else {
      const parent = dirname(destPath)
      if (!existsSync(parent)) await mkdir(parent, { recursive: true })
      await copyFile(srcPath, destPath)
      console.log(`✅ Copied: ${destPath}`)
    }
  }
}

async function copyRootFiles() {
  for (const file of ROOT_FILES) {
    if (existsSync(file)) {
      const destPath = join('templates/project', file)
      await copyFile(file, destPath)
      console.log(`✅ Copied root file: ${destPath}`)
    } else {
      console.warn(`⚠️ Missing: ${file}`)
    }
  }
}

await copyDir('src', 'templates/project/src')
await copyDir('bin', 'templates/project/bin')
await copyRootFiles()