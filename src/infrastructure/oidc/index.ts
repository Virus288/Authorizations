import Provider from 'oidc-provider';
import oidcClaims from './claims.js';
import { EBaseControllerActions, EControllers } from '../../enums/controllers.js';
import getConfig from '../../tools/configLoader.js';
import Log from '../../tools/logger/index.js';
import State from '../../tools/state.js';
import type GetAllOidcClientController from '../../presentation/controllers/oidc/getAll.js';
import type { ClientMetadata, Configuration } from 'oidc-provider';

export default class Oidc {
  async init(): Promise<Provider> {
    const claims = await this.initClaims();
    return this.initProvider(claims);
  }

  private initProvider(claims: Configuration): Provider {
    const errors = [
      'authorization.error',
      'grant.error',
      'certificates.error',
      'discovery.error',
      'introspection.error',
      'revocation.error',
      'userinfo.error',
      'check_session.error',
      'backchannel.error',
      'server_error',
    ];
    const provider = new Provider(getConfig().myAddress.replace(/:\d+/u, ''), claims);
    provider.proxy = true;

    for (const e of errors) {
      provider.on(e, (...err: Record<string, unknown>[]) => {
        Log.debug(e, err);
      });
    }
    return provider;
  }

  private async initClaims(): Promise<Configuration> {
    const controller = State.controllers
      ?.resolve(EControllers.OidcClients)
      ?.resolve(EBaseControllerActions.GetAll) as GetAllOidcClientController;

    // Because we use classes as entities, we need to move data outside of them. Oidc does not like classes
    const clients = (await controller.handle()).map((c) => {
      return { ...c };
    });
    return oidcClaims(clients as ClientMetadata[]);
  }
}
