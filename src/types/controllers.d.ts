import type * as enums from '../enums/index.js';
import type AbortOidcController from '../presentation/controllers/oidc/abort.js';
import type AddOidcClientsController from '../presentation/controllers/oidc/add.js';
import type ConfirmOidcController from '../presentation/controllers/oidc/confirm.js';
import type GetOidcClientsController from '../presentation/controllers/oidc/get.js';
import type GetAllOidcClientController from '../presentation/controllers/oidc/getAll.js';
import type GetOidcGrantController from '../presentation/controllers/oidc/getGrant.js';
import type OidcClientsController from '../presentation/controllers/oidc/index.js';
import type LoginOidcController from '../presentation/controllers/oidc/login.js';
import type AddUserController from '../presentation/controllers/users/add.js';
import type GetUserController from '../presentation/controllers/users/get.js';
import type UsersController from '../presentation/controllers/users/index.js';
import type express from 'express';

export type IControllerAcitons = enums.EOidcControllerActions | enums.EBaseControllerActions;

export interface IController {
  [enums.EControllers.Users]: UsersController;
  [enums.EControllers.OidcClients]: OidcClientsController;
}

export interface IUsersController {
  [enums.EBaseControllerActions.Add]: AddUserController;
  [enums.EBaseControllerActions.Get]: GetUserController;
  [enums.EBaseControllerActions.GetAll]: undefined;
  [enums.EOidcControllerActions.Abort]: undefined;
  [enums.EOidcControllerActions.Confirm]: undefined;
  [enums.EOidcControllerActions.GetGrant]: undefined;
  [enums.EOidcControllerActions.Login]: undefined;
}

export interface IOidcClientsController {
  [enums.EBaseControllerActions.Add]: AddOidcClientsController;
  [enums.EBaseControllerActions.Get]: GetOidcClientsController;
  [enums.EBaseControllerActions.GetAll]: GetAllOidcClientController;
  [enums.EOidcControllerActions.GetGrant]: GetOidcGrantController;
  [enums.EOidcControllerActions.Login]: LoginOidcController;
  [enums.EOidcControllerActions.Confirm]: ConfirmOidcController;
  [enums.EOidcControllerActions.Abort]: AbortOidcController;
}

export interface IInnerController {
  [enums.EControllers.Users]: IUsersController;
  [enums.EControllers.OidcClients]: IOidcClientsController;
}

export interface IBaseInnerController<U, P = [express.Request, express.Response]> {
  handle(req: express.Request, res: express.Response): Promise<U>;
  handle(params: P): Promise<U>;
}
