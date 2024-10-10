import * as enums from './enums/index.js';
import OidcClientModel from './infrastructure/models/oidc.js';
import UserModel from './infrastructure/models/user.js';
import OidcClientController from './presentation/controllers/oidc/index.js';
import UsersController from './presentation/controllers/users/index.js';
import Log from './tools/logger/index.js';
import type * as types from './types';

export default class Bootstrap {
  private _controllers: Map<enums.EControllers, types.IController[enums.EControllers]> = new Map();

  private get controllers(): Map<enums.EControllers, types.IController[enums.EControllers]> {
    return this._controllers;
  }

  register<T extends enums.EControllers>(target: T, value: types.IController[T]): void {
    this.controllers.set(target, value);
  }

  resolve<T extends enums.EControllers>(target: T): types.IController[T] | undefined {
    return this.controllers.get(target) as types.IController[T] | undefined;
  }

  init(): void {
    Log.debug('Bootstrap', 'Initializing');

    this.register(enums.EControllers.Users, new UsersController(UserModel));
    this.register(enums.EControllers.OidcClients, new OidcClientController(OidcClientModel));
  }

  close(): void {
    Log.log('Bootstrap', 'Closing');
  }
}
