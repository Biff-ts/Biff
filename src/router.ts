import { readdirSync, statSync } from 'fs';
import { join } from 'path';

export type RouteHandler = {
  path: string;
  method: string;
  handler: Function;
};

export function scanRoutes(dir = 'routes'): RouteHandler[] {
  const routes: RouteHandler[] = [];

  function walk(current: string, base = '') {
    const full = join(dir, current);
    const stat = statSync(full);

    if (stat.isDirectory()) {
      for (const file of readdirSync(full)) {
        walk(join(current, file), join(base, file));
      }
    } else if (current.endsWith('.ts')) {
      const mod = require(join(process.cwd(), dir, current));
      const routePath = '/' + current
  .replace(/^api/, 'api')         // 先頭のapiだけ残す
  .replace(/\\/g, '/')
  .replace(/\.ts$/, '')
  .replace(/\[([^\]]+)\]/g, ':$1');


      for (const method of ['GET', 'POST', 'PUT', 'DELETE']) {
        if (typeof mod[method] === 'function') {
        routes.push({
  path: routePath,
  method,
  handler: mod[method],
  filePath: join(dir, current).replace(/\\/g, '/') // ←ここ追加
});

        }
      }
    }
  }

  walk('api');
  return routes;
}