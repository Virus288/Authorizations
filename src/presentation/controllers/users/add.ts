import AddUserDto from '../outputs/add/dto.js';
import AddUserEntity from '../outputs/add/entity.js';
import type AddUserUseCase from '../../../application/user/add/index.js';
import type { IAddUserDto } from '../../../application/user/add/types.js';
import type express from 'express';

export default class AddUserController {
  private readonly _useCase: AddUserUseCase;

  constructor(useCase: AddUserUseCase) {
    this._useCase = useCase;
  }

  private get useCase(): AddUserUseCase {
    return this._useCase;
  }

  async handle(req: express.Request<unknown, unknown, IAddUserDto>, res: express.Response): Promise<void> {
    const dto = new AddUserDto(req.body);

    const result = await this.useCase.execute(dto);

    const response = new AddUserEntity(result);

    res.status(201).json({ data: response });
  }
}
