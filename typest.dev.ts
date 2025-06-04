import { serve } from 'bun';
import { scanRoutes } from './src/router';
import { watch } from 'fs';
import { parseInput } from './src/validate';
import { TypestError } from './src/errors';
import { validateOutput } from './src/validate';

let routes = scanRoutes();
console.log('🛠️ Debug: Scanned Routes');
for (const r of routes) {
  console.log(`[${r.method}] ${r.path} → ${r.filePath}`);
}

function reloadRoutes() {
  try {
    Object.keys(require.cache).forEach((key) => delete require.cache[key]);
    routes = scanRoutes();
    console.log('♻️ Routes reloaded');
  } catch (err) {
    console.error('❌ Failed to reload routes:', err);
  }
}

watch('./routes', { recursive: true }, (_, filename) => {
  console.log(`🔄 Change detected in ${filename}`);
  reloadRoutes();
});

// 動的ルート対応: pathのマッチとparams抽出
function matchRoute(routePath: string, reqPath: string): { matched: boolean, params: Record<string, string> } {
  const paramNames: string[] = [];
  const pattern = routePath.replace(/:([^/]+)/g, (_, name) => {
    paramNames.push(name);
    return '([^/]+)';
  });

  const regex = new RegExp(`^${pattern}$`);
  const match = reqPath.match(regex);
  if (!match) return { matched: false, params: {} };

  const params: Record<string, string> = {};
  paramNames.forEach((name, i) => {
    params[name] = match[i + 1] || '';
  });

  return { matched: true, params };
}

serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    const pathname = url.pathname;
    const method = req.method;

    for (const route of routes) {
      const { matched, params } = matchRoute(route.path, pathname);
      if (matched && method === route.method) {
         console.log('✅ Match found:', route.path, '→', pathname);
    console.log('📦 Params extracted:', params);
       const importPath = './routes' +
  route.path
    .replace('/api', '')
    .replace(/:[^/]+/g, '') // すべての :param を除去
    .replace(/\\/g, '/')
    .replace(/\/+$/, '')    // 末尾の余計なスラッシュを削除
  + '.ts';
    console.log('📁 Importing module:', importPath);

const mod = await import(`./${route.filePath}`);

        const { input, error } = await parseInput(mod, req, params);

 try {
  const result = await route.handler({ input });

  const outputError = validateOutput(mod, result);
  if (outputError) {
    return new Response(JSON.stringify(outputError.body), {
      status: outputError.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' }
  });
} catch (err) {
  if (err instanceof TypestError) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: err.status,
      headers: { 'Content-Type': 'application/json' }
    });
  } else {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
      }
    }

    return new Response('Not Found', { status: 404 });
  }
});

console.log('🚀 TypeScript dev server running on http://localhost:3000');