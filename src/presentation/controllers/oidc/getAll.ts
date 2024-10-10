import GetOidcClientsEntity from './outputs/get/entity.js';
import AbstractInnerController from '../../../tools/abstract/innerController.js';
import type * as enums from '../../../enums/index.js';

export default class GetOidcClientController extends AbstractInnerController<
  enums.EControllers.OidcClients,
  enums.EControllerActions.GetAll,
  GetOidcClientsEntity[]
> {
  override async handle(): Promise<GetOidcClientsEntity[]> {
    const entity = await this.useCase.execute();

    return entity.map((e) => new GetOidcClientsEntity(e));
  }
}
