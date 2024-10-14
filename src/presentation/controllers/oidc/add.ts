import AddOidcClientDto from './outputs/add/dto.js';
import AddOidcClientEntity from './outputs/add/entity.js';
import AbstractInnerController from '../../../tools/abstract/innerController.js';
import type { IAddOidcClientDto } from '../../../application/oidc/add/types.js';
import type * as enums from '../../../enums/index.js';
import type express from 'express';

export default class AddOidcClientController extends AbstractInnerController<
  enums.EControllers.OidcClients,
  enums.EBaseControllerActions.Add,
  void,
  express.Request<unknown, unknown, IAddOidcClientDto>
> {
  override async handle(
    req: express.Request<unknown, unknown, IAddOidcClientDto>,
    res: express.Response,
  ): Promise<void> {
    const dto = new AddOidcClientDto(req.body);

    const result = await this.useCase.execute(dto);

    const response = new AddOidcClientEntity(result);

    res.status(200).json({ data: response });
  }
}
