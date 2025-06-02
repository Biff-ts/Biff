#!/usr/bin/env bun
import { mkdir, writeFile } from "fs/promises";
import { existsSync } from "fs";

import { join, resolve } from "path";
import chalk from "chalk";
import { argv } from "process";


const [,, name, ...flags] = argv;
if (!name) {
  console.log(chalk.red("❌ ルート名を指定してください"));
  process.exit(1);
}

const withCrud = flags.includes("--crud");
const withAuth = flags.includes("--auth");
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const base = resolve(__dirname, "../templates");

const toPascal = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const targets = [
  {
    file: `src/routes/${name}.route.ts`,
    template: "route.txt"
  },
  {
    file: `src/schemas/${name}.schema.ts`,
    template: "schema.txt"
  },
  {
    file: `src/services/${name}.service.ts`,
    template: "service.txt"
  },
  {
    file: `src/tests/${name}.test.ts`,
    template: "test.txt"
  }
];

const inject = (template: string, params: Record<string, string | boolean>) =>
  template.replace(/\{\{(\w+)\}\}/g, (_, key) => String(params[key]));

async function main() {
  const routeName = name;
  const pascalName = toPascal(name);

  for (const { file, template } of targets) {
    const target = resolve(process.cwd(), file);
    if (existsSync(target)) {
      console.log(chalk.yellow(`⚠️ 既に存在: ${file}`));
      continue;
    }

    const tplPath = join(base, `route.${template}`);
    const raw = await Bun.file(tplPath).text();
    const final = inject(raw, {
      name: routeName,
      Name: pascalName,
      auth: String(withAuth),
      crud: String(withCrud)
    });

    await mkdir(join(target, ".."), { recursive: true });
    await writeFile(target, final);
    console.log(chalk.green(`✅ 生成: ${file}`));
  }
}

main();
