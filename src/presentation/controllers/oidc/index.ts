import AddOidcClientsController from './add.js';
import GetOidcClientsController from './get.js';
import GetAllOidcClientsController from './getAll.js';
import AddOidcClientsUseCase from '../../../application/oidc/add/index.js';
import GetOidcClientsUseCase from '../../../application/oidc/get/index.js';
import GetAllOidcClientsUseCase from '../../../application/oidc/getAll/index.js';
import * as enums from '../../../enums/index.js';
import OidcClientsRepository from '../../../infrastructure/repositories/oidc.js';
import AbstractController from '../../../tools/abstract/controller.js';
import type OidcClientModel from '../../../infrastructure/models/oidc.js';

export default class OidcClientsController extends AbstractController<enums.EControllers.OidcClients> {
  constructor(model: typeof OidcClientModel) {
    super();

    this.init(model);
  }

  private init(model: typeof OidcClientModel): void {
    const repo = new OidcClientsRepository(model);

    this.register(enums.EControllerActions.Get, new GetOidcClientsController(new GetOidcClientsUseCase(repo)));
    this.register(enums.EControllerActions.GetAll, new GetAllOidcClientsController(new GetAllOidcClientsUseCase(repo)));
    this.register(enums.EControllerActions.Add, new AddOidcClientsController(new AddOidcClientsUseCase(repo)));
  }
}
