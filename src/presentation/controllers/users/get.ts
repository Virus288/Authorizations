import AbstractInnerController from '../../../tools/abstract/innerController.js';
import GetUserDto from '../outputs/get/dto.js';
import GetUserEntity from '../outputs/get/entity.js';
import type * as enums from '../../../enums/index.js';
import type { IGetUserDto } from 'application/user/get/types.js';
import type express from 'express';

export default class GetUserController extends AbstractInnerController<
  enums.EControllers.Users,
  enums.EControllerActions.Get
> {
  override async handle(req: express.Request<unknown, unknown, IGetUserDto>, res: express.Response): Promise<void> {
    const dto = new GetUserDto(req.body);

    const entity = await this.useCase.execute(dto);

    if (!entity) {
      res.status(404).send({ data: entity });
      return;
    }

    res.status(200).send({ data: new GetUserEntity(entity) });
  }
}
