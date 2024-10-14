import AbstractInnerController from '../../../tools/abstract/innerController.js';
import State from '../../../tools/state.js';
import type * as enums from '../../../enums/index.js';
import type * as types from '../../../types/index.js';
import type express from 'express';

export default class AbortController extends AbstractInnerController<
  enums.EControllers.OidcClients,
  enums.EOidcControllerActions.Abort,
  void
> {
  override async handle(req: express.Request, res: express.Response): Promise<void> {
    const { provider } = State;

    try {
      const result = {
        error: 'access_denied',
        error_description: 'End-User aborted interaction',
      };
      await provider.interactionFinished(req, res, result, { mergeWithLastSubmission: false });
    } catch (err) {
      res.type('html');
      res.render('error', {
        name: (err as types.IFullError).name,
        message: (err as types.IFullError).message,
      });
    }
  }
}
