import type * as enums from '../enums/index.js';
import type AddUserController from '../presentation/controllers/users/add.js';
import type GetUserController from '../presentation/controllers/users/get.js';
import type UsersController from '../presentation/controllers/users/index.js';
import type express from 'express';

export interface IController {
  [enums.EControllers.Users]: UsersController;
}

export interface IUsersController {
  [enums.EControllerActions.Add]: AddUserController;
  [enums.EControllerActions.Get]: GetUserController;
}

export interface IInnerController {
  [enums.EControllers.Users]: IUsersController;
}

export interface IBaseInnerController {
  handle: (req: express.Request, res: express.Response) => Promise<void>;
}
