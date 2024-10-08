import express from 'express';
import { EControllerActions, EControllers } from '../../../../../enums/index.js';
import handleErr from '../../../../../errors/utils.js';
import State from '../../../../../tools/state.js';
import type * as types from '../../../../../types/index.js';

export default class AddUsers {
  private readonly _router: express.Router;

  constructor() {
    this._router = express.Router();
    this.init();
  }

  get router(): express.Router {
    return this._router;
  }

  init(): void {
    this.router.get('/', async (req, res) => {
      try {
        const controller = State.controllers.resolve(EControllers.Users)!.resolve(EControllerActions.Get)!;
        await controller.handle(req, res);
      } catch (err) {
        handleErr(err as types.IFullError, res);
      }
    });
  }
}
