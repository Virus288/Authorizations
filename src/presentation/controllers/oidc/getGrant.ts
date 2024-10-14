import AbstractInnerController from '../../../tools/abstract/innerController.js';
import Log from '../../../tools/logger/index.js';
import State from '../../../tools/state.js';
import type * as enums from '../../../enums/index.js';
import type * as types from '../../../types/index.js';
import type express from 'express';

export default class GetGrantOidcClientController extends AbstractInnerController<
  enums.EControllers.OidcClients,
  enums.EOidcControllerActions.GetGrant,
  void
> {
  override async handle(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const { provider } = State;

    try {
      const interactionDetails = await provider.interactionDetails(req, res);
      const { prompt, params, uid } = interactionDetails;
      const client = await provider.Client.find(params?.client_id as string);

      switch (prompt.name) {
        case 'login':
          res.type('html');
          res.render('login', {
            client,
            uid,
            details: prompt.details,
            params,
            frontUrl: interactionDetails.params?.redirect_uri,
          });
          return;
        case 'consent':
          res.type('html');
          res.render('consent', {
            client,
            uid,
            details: prompt.details,
            params,
          });
          return;
        default:
          Log.error('Unsupported prompt', prompt.name, provider);
          next();
      }
    } catch (err) {
      Log.error('Oidc get Err', { message: (err as types.IFullError).message, stack: (err as types.IFullError).stack });
      res.type('html');
      if ((err as types.IFullError).name === 'SessionNotFound') {
        res.render('error', {
          name: (err as types.IFullError).name,
          message: (err as types.IFullError).message,
        });
      } else {
        const interactionDetails = await provider.interactionDetails(req, res);
        const { prompt, params, uid } = interactionDetails;
        const client = await provider.Client.find(params?.client_id as string);
        res.type('html');
        res.render('login', {
          error: (err as types.IFullError).message,
          client,
          uid,
          details: prompt.details,
          params,
          frontUrl: interactionDetails.params?.redirect_uri,
        });
      }
    }
  }
}
