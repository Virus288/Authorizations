import bcrypt from 'bcrypt';
import LoginDto from './outputs/login/dto.js';
import * as errors from '../../../errors/index.js';
import AbstractInnerController from '../../../tools/abstract/innerController.js';
import Log from '../../../tools/logger/index.js';
import State from '../../../tools/state.js';
import type { ILoginDto } from '../../../application/oidc/login/types.js';
import type * as enums from '../../../enums/index.js';
import type * as types from '../../../types/index.js';
import type express from 'express';
import type { InteractionResults } from 'oidc-provider';

export default class LoginController extends AbstractInnerController<
  enums.EControllers.OidcClients,
  enums.EOidcControllerActions.Login,
  void
> {
  override async handle(req: express.Request<unknown, unknown, ILoginDto>, res: types.IResponse): Promise<void> {
    const { provider } = State;

    try {
      const data = new LoginDto(req.body as LoginDto);
      const account = await this.useCase.execute({ name: data.login });

      if (!account) {
        throw new Error('Missing account with provided id');
      }

      await this.compare(data.password, account.password);

      req.session.userId = account._id.toString();
      const details = await provider.interactionDetails(req, res);

      const result: InteractionResults = {
        login: {
          accountId: req.session.userId,
          remember: true,
        },
        consent: {
          rejectedScopes: [],
          rejectedClaims: [],
          rememberFor: 3600,
          scope: (details.params as Record<string, unknown>).scope,
        },
      };

      await provider.interactionFinished(req, res, result, { mergeWithLastSubmission: false });
    } catch (err) {
      Log.error('Oidc post Err', {
        message: (err as types.IFullError).message,
        stack: (err as types.IFullError).stack,
      });
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

  private async compare(password: string, hashed: string): Promise<void> {
    const auth = await bcrypt.compare(password, hashed);

    if (!auth) throw new errors.IncorrectCredentialsError();
  }
}
