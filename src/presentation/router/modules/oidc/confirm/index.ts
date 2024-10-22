import { EControllers, EOidcControllerActions } from '../../../../../enums/index.js';
import AbstractRouter from '../../../../../tools/abstract/router.js';
import Log from '../../../../../tools/logger/index.js';
import State from '../../../../../tools/state.js';
import Middleware from '../../../middleware.js';
import limitRate from '../../../utils.js';
import type * as types from '../../../../../types/index.js';
import type ConfirmController from '../../../../controllers/oidc/confirm.js';

export default class Confirm extends AbstractRouter {
  constructor() {
    super();
    this.init();
  }

  init(): void {
    this.router.post('/:uid/confirm', Middleware.setNoCache, limitRate, async (req, res) => {
      try {
        const controller = State.controllers
          .resolve(EControllers.OidcClients)!
          .resolve(EOidcControllerActions.Confirm) as ConfirmController;

        await controller.handle(req, res);
      } catch (err) {
        // It is possible for provider to throw an error when session expires, but user tries to send requests.
        Log.error('Error', (err as types.IFullError).message, (err as types.IFullError).stack);

        res.type('html');
        res.render('error', {
          name: (err as types.IFullError).name ?? 'Unknown error',
          message:
            (err as types.IFullError).message ?? 'Unknown error occurred. Please access previous website and try again',
        });
      }
    });
  }
}
