import { initClient } from '@ts-rest/core'; // Assuming 'initClient' is the correct export
import { router } from '../typest.router';

export const api = initClient(router, { baseUrl: 'http://localhost:3000', baseHeaders: {} });