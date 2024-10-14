import GetUserDto from './outputs/get/dto.js';
import GetUserEntity from './outputs/get/entity.js';
import GetDetailedUserEntity from './outputs/getDetailed/entity.js';
import AbstractInnerController from '../../../tools/abstract/innerController.js';
import type { IGetDetailedUserEntity, IGetUserDto } from '../../../application/user/get/types.js';
import type * as enums from '../../../enums/index.js';
import type express from 'express';

export default class GetUserController extends AbstractInnerController<
  enums.EControllers.Users,
  enums.EBaseControllerActions.Get,
  void,
  express.Request<unknown, unknown, IGetUserDto>
> {
  async getDetailed(data: IGetUserDto): Promise<IGetDetailedUserEntity | undefined> {
    const dto = new GetUserDto(data);

    const entity = await this.useCase.execute(dto);

    return entity ? new GetDetailedUserEntity(entity) : undefined;
  }

  override async handle(req: express.Request<unknown, unknown, IGetUserDto>, res: express.Response): Promise<void> {
    const dto = new GetUserDto(req.body);

    const entity = await this.useCase.execute(dto);

    const data = entity ? new GetUserEntity(entity) : entity;

    res.status(200).send({ data });
  }
}
