import AddRouter from './add/index.js';
import GetRouter from './get/index.js';
import type { Router } from 'express';

const initUserRoutes = (router: Router): void => {
  const prefix = '/users';

  router.use(prefix, new GetRouter().router).use(prefix, new AddRouter().router);
};

export default initUserRoutes;
