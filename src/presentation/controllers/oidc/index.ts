import AbortOidcController from './abort.js';
import AddOidcClientsController from './add.js';
import ConfirmOidcController from './confirm.js';
import GetOidcClientsController from './get.js';
import GetAllOidcClientsController from './getAll.js';
import GetOidcGrantController from './getGrant.js';
import LoginOidcController from './login.js';
import AddOidcClientsUseCase from '../../../application/oidc/add/index.js';
import GetOidcClientsUseCase from '../../../application/oidc/get/index.js';
import GetAllOidcClientsUseCase from '../../../application/oidc/getAll/index.js';
import GetUserUseCase from '../../../application/user/get/index.js';
import * as enums from '../../../enums/index.js';
import OidcClientsRepository from '../../../infrastructure/repositories/oidc.js';
import UserRepository from '../../../infrastructure/repositories/users.js';
import AbstractController from '../../../tools/abstract/controller.js';
import type OidcClientModel from '../../../infrastructure/models/oidc.js';
import type UsersModel from '../../../infrastructure/models/user.js';

export default class OidcClientsController extends AbstractController<enums.EControllers.OidcClients> {
  constructor(model: typeof OidcClientModel, usersModel: typeof UsersModel) {
    super();

    this.init(model, usersModel);
  }

  private init(model: typeof OidcClientModel, usersModel: typeof UsersModel): void {
    const repo = new OidcClientsRepository(model);
    const userRepo = new UserRepository(usersModel);

    this.register(enums.EBaseControllerActions.Get, new GetOidcClientsController(new GetOidcClientsUseCase(repo)));
    this.register(
      enums.EBaseControllerActions.GetAll,
      new GetAllOidcClientsController(new GetAllOidcClientsUseCase(repo)),
    );
    this.register(enums.EBaseControllerActions.Add, new AddOidcClientsController(new AddOidcClientsUseCase(repo)));
    this.register(enums.EOidcControllerActions.Abort, new AbortOidcController(undefined));
    this.register(enums.EOidcControllerActions.Confirm, new ConfirmOidcController(undefined));
    this.register(enums.EOidcControllerActions.GetGrant, new GetOidcGrantController(undefined));
    this.register(enums.EOidcControllerActions.Login, new LoginOidcController(new GetUserUseCase(userRepo)));
  }
}
