import AddRouter from './add/index.js';
import GetRouter from './get/index.js';
import Log from '../../../../tools/logger/index.js';
import type { Router } from 'express';

const initUserRoutes = (router: Router): void => {
  Log.debug('Users router', 'Starting router');

  const prefix = '/users';

  router.use(prefix, new GetRouter().router).use(prefix, new AddRouter().router);
};

export default initUserRoutes;
