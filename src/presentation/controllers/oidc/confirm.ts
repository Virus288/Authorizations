import AbstractInnerController from '../../../tools/abstract/innerController.js';
import State from '../../../tools/state.js';
import type * as enums from '../../../enums/index.js';
import type * as types from '../../../types/index.js';
import type express from 'express';
import { strict as assert } from 'node:assert';

export default class ConfirmController extends AbstractInnerController<
  enums.EControllers.OidcClients,
  enums.EOidcControllerActions.Confirm,
  void
> {
  override async handle(req: express.Request, res: express.Response): Promise<void> {
    const { provider } = State;

    try {
      const interactionDetails = await provider.interactionDetails(req, res);
      const {
        prompt: { name, details },
        params,
        session,
      } = interactionDetails;
      const accountId = session?.accountId as string;
      assert.equal(name, 'consent');

      let { grantId } = interactionDetails;
      const grant = grantId
        ? await provider.Grant.find(grantId)
        : new provider.Grant({
            accountId,
            clientId: params.client_id as string,
          });

      if (details.missingOIDCScope) {
        grant!.addOIDCScope((details.missingOIDCScope as string[]).join(' '));
      }
      if (details.missingOIDCClaims) {
        grant!.addOIDCClaims(details.missingOIDCClaims as string[]);
      }
      if (details.missingResourceScopes) {
        for (const [indicator, scopes] of Object.entries(details.missingResourceScopes)) {
          grant!.addResourceScope(indicator, (scopes as string[]).join(' '));
        }
      }

      grantId = await grant!.save();

      const consent: Record<string, unknown> = {};
      if (!interactionDetails.grantId) {
        // we don't have to pass grantId to consent, we're just modifying existing one
        consent.grantId = grantId;
      }

      const result = { consent };
      await provider.interactionFinished(req, res, result, { mergeWithLastSubmission: true });
    } catch (err) {
      res.type('html');
      res.render('error', {
        name: (err as types.IFullError).name,
        message: (err as types.IFullError).message,
      });
    }
  }
}
