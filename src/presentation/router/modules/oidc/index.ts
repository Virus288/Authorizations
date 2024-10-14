import AbortRouter from './abort/index.js';
import ConfirmRouter from './confirm/index.js';
import GrantRouter from './grant/index.js';
import LoginRouter from './login/index.js';
import Log from '../../../../tools/logger/index.js';
import type { Router } from 'express';

const initOidcRoutes = (router: Router): void => {
  Log.debug('Oidc router', 'Starting router');

  const prefix = '/interaction';

  router
    .use(prefix, new AbortRouter().router)
    .use(prefix, new ConfirmRouter().router)
    .use(prefix, new GrantRouter().router)
    .use(prefix, new LoginRouter().router);
};

export default initOidcRoutes;
