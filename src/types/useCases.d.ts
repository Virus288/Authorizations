import type AddOidcClientsUseCase from '../application/oidc/add/index.js';
import type GetOidcClientsUseCase from '../application/oidc/get/index.js';
import type GetAllOidcClientUseCase from '../application/oidc/getAll/index.js';
import type AddUserUseCase from '../application/user/add/index.js';
import type GetUserUseCase from '../application/user/get/index.js';

import type * as enums from '../enums';

export interface IUsersUseCase {
  [enums.EControllerActions.Get]: GetUserUseCase;
  [enums.EControllerActions.GetAll]: undefined;
  [enums.EControllerActions.Add]: AddUserUseCase;
}

export interface IOidcClientsUseCase {
  [enums.EControllerActions.Get]: GetOidcClientsUseCase;
  [enums.EControllerActions.Add]: AddOidcClientsUseCase;
  [enums.EControllerActions.GetAll]: GetAllOidcClientUseCase;
}

export interface IInnerControllerUseCase {
  [enums.EControllers.Users]: IUsersUseCase;
  [enums.EControllers.OidcClients]: IOidcClientsUseCase;
}

export interface IUseCase<TInput, TOutput> {
  execute(input: TInput): Promise<TOutput>;
}
