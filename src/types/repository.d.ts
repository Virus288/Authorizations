import type OidcClient from '../domain/oidc/index.js';
import type { IOidcClient } from '../domain/oidc/types.js';
import type User from '../domain/user/index.js';
import type { IUser } from '../domain/user/types.js';
import type * as enums from '../enums/index.js';

export interface IRepositoryGetData {
  [enums.EModules.User]: IUser | null;
  [enums.EModules.OidcClient]: IOidcClient | null;
}

export interface IRepositoryAddData {
  [enums.EModules.User]: User;
  [enums.EModules.OidcClient]: OidcClient;
}

export interface IGenericRepository<T extends enums.EModules> {
  get(id: string): Promise<IRepositoryGetData[T]>;
  add(data: IRepositoryAddData[T]): Promise<string>;
}
