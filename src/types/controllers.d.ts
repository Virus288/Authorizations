import type * as enums from '../enums/index.js';
import type AddOidcClientsController from '../presentation/controllers/oidc/add.js';
import type GetOidcClientsController from '../presentation/controllers/oidc/get.js';
import type GetAllOidcClientController from '../presentation/controllers/oidc/getAll.js';
import type OidcClientsController from '../presentation/controllers/oidc/index.js';
import type AddUserController from '../presentation/controllers/users/add.js';
import type GetUserController from '../presentation/controllers/users/get.js';
import type UsersController from '../presentation/controllers/users/index.js';
import type express from 'express';

export interface IController {
  [enums.EControllers.Users]: UsersController;
  [enums.EControllers.OidcClients]: OidcClientsController;
}

export interface IUsersController {
  [enums.EControllerActions.Add]: AddUserController;
  [enums.EControllerActions.Get]: GetUserController;
  [enums.EControllerActions.GetAll]: undefined;
}

export interface IOidcClientsController {
  [enums.EControllerActions.Add]: AddOidcClientsController;
  [enums.EControllerActions.Get]: GetOidcClientsController;
  [enums.EControllerActions.GetAll]: GetAllOidcClientController;
}

export interface IInnerController {
  [enums.EControllers.Users]: IUsersController;
  [enums.EControllers.OidcClients]: IOidcClientsController;
}

export interface IBaseInnerController<U, P = [express.Request, express.Response]> {
  handle(req: express.Request, res: express.Response): Promise<U>;
  handle(params: P): Promise<U>;
}
