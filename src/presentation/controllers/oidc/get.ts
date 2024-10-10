import GetOidcClientsDto from './outputs/get/dto.js';
import GetOidcClientsEntity from './outputs/get/entity.js';
import AbstractInnerController from '../../../tools/abstract/innerController.js';
import type { IGetOidcClientDto } from '../../../application/oidc/get/types.js';
import type * as enums from '../../../enums/index.js';

export default class GetOidcClientController extends AbstractInnerController<
  enums.EControllers.OidcClients,
  enums.EControllerActions.Get,
  GetOidcClientsEntity | undefined,
  IGetOidcClientDto
> {
  override async handle(data: IGetOidcClientDto): Promise<GetOidcClientsEntity | undefined> {
    const dto = new GetOidcClientsDto(data);

    const entity = await this.useCase.execute(dto);

    return entity ? new GetOidcClientsEntity(entity) : undefined;
  }
}
