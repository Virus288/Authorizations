import initUserRoutes from './modules/users/index.js';
import type { Router } from 'express';

export default class AppRouter {
  private readonly _router: Router;

  constructor(router: Router) {
    this._router = router;
  }

  private get router(): Router {
    return this._router;
  }

  initRoutes(): void {
    initUserRoutes(this.router);
  }
}
