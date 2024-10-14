import mongoose from 'mongoose';
import GetOidcClientsEntity from './outputs/get/entity.js';
import AbstractInnerController from '../../../tools/abstract/innerController.js';
import type * as enums from '../../../enums/index.js';
import type { IOidcClient } from 'domain/oidc/types.js';

export default class GetAllOidcClientsController extends AbstractInnerController<
  enums.EControllers.OidcClients,
  enums.EBaseControllerActions.GetAll,
  GetOidcClientsEntity[]
> {
  override async handle(): Promise<GetOidcClientsEntity[]> {
    return new Promise((resolve) => {
      // const entity = await this.useCase.execute();

      const entity = [
        {
          _id: new mongoose.Types.ObjectId(),
          client_id: 'oidcClient',
          client_secret: '4uqMOFQ97b',
          grant_types: ['authorization_code', 'refresh_token'],
          scope: 'openid',
          redirect_uris: ['http://localhost:3005/login'],
          post_logout_redirect_uris: ['http://localhost:3005'],
        },
      ] as unknown as IOidcClient[];

      return resolve(entity.map((e) => new GetOidcClientsEntity(e)));
    });
  }
}
