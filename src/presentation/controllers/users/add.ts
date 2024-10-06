import AddUserDto from '../outputs/add.js';
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

  async handle(req: express.Request, res: express.Response): Promise<void> {
    this.validate(req);

    const result = await this.useCase.execute({
      ...req.body,
    } as IAddUserDto);

    const response = new AddUserDto((req.body as { name: string }).name, result.id);

    res.status(201).json(response);
  }

  private validate(req: express.Request): void {
    const body = req.body as IAddUserDto;

    if (!body || Object.keys(body).length === 0) throw new Error('No data provided');
    if (!body.name) throw new Error('Missing name in add');
  }
}
