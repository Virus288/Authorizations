import bcrypt from 'bcrypt';
import RegisterDto from './outputs/register/dto.js';
import AbstractInnerController from '../../../tools/abstract/innerController.js';
import type { IRegisterDto } from '../../../application/oidc/register/types.js';
import type * as enums from '../../../enums/index.js';
import type * as types from '../../../types/index.js';
import type express from 'express';

export default class RegisterController extends AbstractInnerController<
  enums.EControllers.OidcClients,
  enums.EOidcControllerActions.Register,
  void
> {
  override async handle(req: express.Request<unknown, unknown, IRegisterDto>, res: types.IResponse): Promise<void> {
    const data = new RegisterDto(req.body);

    await this.useCase.validate(data.login);

    await this.useCase.execute({ ...data, password: this.hashPassword(data.password) });

    res.sendStatus(200);
  }

  private hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  }
}
