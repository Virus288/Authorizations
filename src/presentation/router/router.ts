import initUserRoutes from './modules/users/index.js';
import { FourOhFour } from '../../errors/index.js';
import handleErr from '../../errors/utils.js';
import State from '../../tools/state.js';
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

    this.initFourOhFour();
  }

  initHealh(): void {
    this.router.get('/health', (_req, res) => {
      const { alive } = State;

      alive ? res.sendStatus(200) : res.sendStatus(500);
    });
  }

  initFourOhFour(): void {
    this.router.all('*', (_req, res) => {
      handleErr(new FourOhFour(), res);
    });
  }
}
