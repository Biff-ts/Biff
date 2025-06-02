#!/usr/bin/env bun
import { Project, SyntaxKind } from "ts-morph";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import chalk from "chalk";

// faker式マッピング
const fakerMap: Record<string, string> = {
  string: "faker.lorem.words(3)",
  number: "faker.number.int()",
  boolean: "faker.datatype.boolean()",
};

const project = new Project();
project.addSourceFilesAtPaths("src/schemas/**/*.ts");

const files = project.getSourceFiles();

function toFunctionName(name: string) {
  return `create${name.charAt(0).toUpperCase() + name.slice(1)}`;
}

async function createServiceStub(name: string) {
  const servicePath = `src/services/${name}.service.ts`;
  const funcName = toFunctionName(name);
  if (existsSync(servicePath)) return;

  const stub = `
export async function ${funcName}(input: any, ctx: { user: { id: string } }) {
  return {
    ...input,
    id: 'mock-id',
  };
}
`.trim();

  await mkdir(path.dirname(servicePath), { recursive: true });
  await writeFile(servicePath, stub);
  console.log(chalk.green(`🛠️ サービス関数を生成: ${servicePath}`));
}

async function main() {
  for (const file of files) {
    const exports = file.getVariableStatements().filter(stmt =>
      stmt.getText().includes("z.object(")
    );

    for (const stmt of exports) {
      const name = stmt.getDeclarations()[0]?.getName();
      if (!name || !name.endsWith("Input")) continue;

      const objLiteral = stmt.getDescendantsOfKind(SyntaxKind.PropertyAssignment);
      const fields = objLiteral.map(p => ({
        key: p.getName(),
        type: p.getInitializerOrThrow().getText().split(".")[1]?.split("(")[0] || "string"
      }));
      const force = process.argv.includes("--force");

      const baseName = name.replace("Input", "");
      const testPath = `src/tests/${baseName.toLowerCase()}.test.ts`;
      if (existsSync(testPath) && !force) {
  console.log(chalk.yellow(`⚠️ スキップ：${testPath} は既に存在します（--forceで上書き可）`));
  continue;
}


      const funcName = toFunctionName(baseName);
      await createServiceStub(baseName.toLowerCase());

      const fakerLines = fields.map(f => `  ${f.key}: ${fakerMap[f.type] || "faker.lorem.word()"},`).join("\n");
      const matchLines = fields.map(f => `    ${f.key}: fake${baseName}Input.${f.key},`).join("\n");

      const testContent = `
import { test, expect } from '@jest/globals'
import { ${funcName} } from '../services/${baseName.toLowerCase()}.service'
import { faker } from '@faker-js/faker'

const fake${baseName}Input = {
${fakerLines}
}

test('${funcName} returns expected structure', async () => {
  const result = await ${funcName}(fake${baseName}Input, { user: { id: 'test-user' } })
  expect(result).toMatchObject({
${matchLines}
  })
})
`.trim();

      await mkdir(path.dirname(testPath), { recursive: true });
      await writeFile(testPath, testContent);
      console.log(chalk.green(`✅ 生成: ${testPath}`));
    }
  }
}

main().catch(e => {
  console.error(chalk.red("❌ エラー発生:"), e);
});
