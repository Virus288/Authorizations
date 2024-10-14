import express from 'express';
import { EControllers, EOidcControllerActions } from '../../../../../enums/index.js';
import Log from '../../../../../tools/logger/index.js';
import State from '../../../../../tools/state.js';
import Middleware from '../../../middleware.js';
import limitRate from '../../../utils.js';
import type * as types from '../../../../../types/index.js';
import type LoginController from '../../../../controllers/oidc/login.js';

export default class Login {
  private readonly _router: express.Router;

  constructor() {
    this._router = express.Router();
    this.init();
  }

  get router(): express.Router {
    return this._router;
  }

  init(): void {
    this.router.post(
      '/:grant/login',
      Middleware.setNoCache,
      limitRate,
      async (req, res: express.Response<unknown, types.IUserLocals>) => {
        try {
          const controller = State.controllers
            .resolve(EControllers.OidcClients)!
            .resolve(EOidcControllerActions.Login) as LoginController;

          await controller.handle(req, res);
        } catch (err) {
          // It is possible for provider to throw an error when session expires, but user tries to send requests.
          Log.error('Error', (err as types.IFullError).message, (err as types.IFullError).stack);

          res.type('html');
          res.render('error', {
            name: (err as types.IFullError).name ?? 'Unknown error',
            message:
              (err as types.IFullError).message ??
              'Unknown error occurred. Please access previous website and try again',
          });
        }
      },
    );
  }
}
