import AddUserDto from './outputs/add/dto.js';
import AddUserEntity from './outputs/add/entity.js';
import AbstractInnerController from '../../../tools/abstract/innerController.js';
import type { IAddUserDto } from '../../../application/user/add/types.js';
import type * as enums from '../../../enums/index.js';
import type express from 'express';

export default class AddUserController extends AbstractInnerController<
  enums.EControllers.Users,
  enums.EBaseControllerActions.Add,
  void,
  express.Request<unknown, unknown, IAddUserDto>
> {
  override async handle(req: express.Request<unknown, unknown, IAddUserDto>, res: express.Response): Promise<void> {
    const dto = new AddUserDto(req.body);

    const result = await this.useCase.execute(dto);

    const response = new AddUserEntity(result);

    res.status(200).json({ data: response });
  }
}
