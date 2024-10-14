import express from 'express';
import { EControllers, EOidcControllerActions } from '../../../../../enums/index.js';
import handleErr from '../../../../../errors/utils.js';
import State from '../../../../../tools/state.js';
import Middleware from '../../../middleware.js';
import limitRate from '../../../utils.js';
import type * as types from '../../../../../types/index.js';
import type GetGrantController from '../../../../controllers/oidc/getGrant.js';

export default class GetGrant {
  private readonly _router: express.Router;

  constructor() {
    this._router = express.Router();
    this.init();
  }

  get router(): express.Router {
    return this._router;
  }

  init(): void {
    this.router.get('/:grant', Middleware.setNoCache, limitRate, async (req, res, next) => {
      try {
        const controller = State.controllers
          .resolve(EControllers.OidcClients)!
          .resolve(EOidcControllerActions.GetGrant) as GetGrantController;

        await controller.handle(req, res, next);
      } catch (err) {
        handleErr(err as types.IFullError, res);
      }
    });
  }
}
