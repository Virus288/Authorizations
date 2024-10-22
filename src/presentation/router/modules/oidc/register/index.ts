import { EControllers, EOidcControllerActions } from '../../../../../enums/index.js';
import handleErr from '../../../../../errors/utils.js';
import AbstractRouter from '../../../../../tools/abstract/router.js';
import State from '../../../../../tools/state.js';
import Middleware from '../../../middleware.js';
import limitRate from '../../../utils.js';
import type RegisterController from '../../../..//controllers/oidc/register.js';
import type * as types from '../../../../../types/index.js';

export default class Register extends AbstractRouter {
  constructor() {
    super();
    this.init();
  }

  init(): void {
    this.router.post('/reg', Middleware.setNoCache, limitRate, async (req, res: types.IResponse) => {
      try {
        const controller = State.controllers
          .resolve(EControllers.OidcClients)!
          .resolve(EOidcControllerActions.Register) as RegisterController;

        await controller.handle(req, res);
      } catch (err) {
        handleErr(err as types.IFullError, res);
      }
    });
  }
}
