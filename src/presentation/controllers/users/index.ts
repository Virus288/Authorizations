import AddUserController from './add.js';
import GetUsersController from './get.js';
import AddUserUseCase from '../../../application/user/add/index.js';
import GetUserUseCase from '../../../application/user/get/index.js';
import * as enums from '../../../enums/index.js';
import UsersRepository from '../../../infrastructure/repositories/users.js';
import AbstractController from '../../../tools/abstract/controller.js';
import type UserModel from '../../../infrastructure/models/user.js';

export default class UsersController extends AbstractController<enums.EControllers.Users> {
  constructor(model: typeof UserModel) {
    super();

    this.init(model);
  }

  private init(model: typeof UserModel): void {
    const repo = new UsersRepository(model);

    this.register(enums.EControllerActions.Get, new GetUsersController(new GetUserUseCase(repo)));
    this.register(enums.EControllerActions.Add, new AddUserController(new AddUserUseCase(repo)));
  }
}
