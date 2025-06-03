import { scanRoutes } from './router';
import { z } from 'zod';
import { writeFileSync } from 'fs';

// 🔧 スキーマをZodコードとして出力する関数
function printZod(schema: any): string {
  if (schema instanceof z.ZodObject) {
    const shape = schema._def.shape();
    const fields = Object.entries(shape).map(
      ([key, val]) => `${key}: ${printZod(val)}`
    );
    return `z.object({ ${fields.join(', ')} })`;
  }

  if (schema instanceof z.ZodString) return 'z.string()';
  if (schema instanceof z.ZodNumber) return 'z.number()';
  if (schema instanceof z.ZodBoolean) return 'z.boolean()';
  if (schema instanceof z.ZodOptional) return `z.optional(${printZod(schema._def.innerType)})`;
  if (schema instanceof z.ZodArray) return `z.array(${printZod(schema._def.type)})`;

  // TODO: 他の型（union, enum, literalなど）はここで追加
  return 'z.any()';
}

export function generateRouterFile(outFile: string) {
  const routes = scanRoutes();
  const lines: string[] = [];

  lines.push(`import { initContract } from '@ts-rest/core';`);
  lines.push(`import { z } from 'zod';`);
  lines.push(`\nconst c = initContract();`);
  lines.push(`export const router = c.router({`);

  for (const route of routes) {
    const mod = require(`../${route.filePath}`);
    const routeName = route.path
      .replace(/^\/api\//, '')

      .replace(/[^a-zA-Z0-9]/g, '_');

    const input = mod.input?.body || mod.input?.query || z.object({});
    const output = mod.output || z.any();

lines.push(`  ${routeName}: {`);
lines.push(`    path: '${route.path}',`);
lines.push(`    method: '${route.method}',`);
lines.push(`    query: ${printZod(input)},`);
lines.push(`    responses: {`);
lines.push(`      200: ${printZod(output)}`);
lines.push(`    }`);
lines.push(`  },`);
  }

  lines.push(`});`);
  writeFileSync(outFile, lines.join('\n'));
  console.log(`✅ Generated router to ${outFile}`);
}
