import { generateRouterFile } from '../src/generate-router';
import config from '../typest.config';

const outFile = config.routerOutFile || './typest.router.ts';
generateRouterFile(outFile);