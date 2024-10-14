import type AddOidcClientsUseCase from '../application/oidc/add/index.js';
import type GetOidcClientsUseCase from '../application/oidc/get/index.js';
import type GetAllOidcClientUseCase from '../application/oidc/getAll/index.js';
import type AddUserUseCase from '../application/user/add/index.js';
import type GetUserUseCase from '../application/user/get/index.js';

import type * as enums from '../enums';

export interface IUsersUseCase {
  [enums.EBaseControllerActions.Get]: GetUserUseCase;
  [enums.EBaseControllerActions.GetAll]: undefined;
  [enums.EBaseControllerActions.Add]: AddUserUseCase;
  [enums.EOidcControllerActions.Login]: undefined;
  [enums.EOidcControllerActions.GetGrant]: undefined;
  [enums.EOidcControllerActions.Abort]: undefined;
  [enums.EOidcControllerActions.Confirm]: undefined;
}

export interface IOidcClientsUseCase {
  [enums.EBaseControllerActions.Get]: GetOidcClientsUseCase;
  [enums.EBaseControllerActions.Add]: AddOidcClientsUseCase;
  [enums.EBaseControllerActions.GetAll]: GetAllOidcClientUseCase;
  [enums.EOidcControllerActions.Login]: GetUserUseCase;
  [enums.EOidcControllerActions.GetGrant]: undefined;
  [enums.EOidcControllerActions.Abort]: undefined;
  [enums.EOidcControllerActions.Confirm]: undefined;
}

export interface IInnerControllerUseCase {
  [enums.EControllers.Users]: IUsersUseCase;
  [enums.EControllers.OidcClients]: IOidcClientsUseCase;
}

export interface IUseCase<TInput, TOutput> {
  execute(input: TInput): Promise<TOutput>;
}
