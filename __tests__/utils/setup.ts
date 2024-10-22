import { beforeAll } from '@jest/globals';
import OidcClientsController from '../../src/presentation/controllers/oidc/index.js';
import * as enums from '../../src/enums/index.js'
import OidcClientModel from '../../src/infrastructure/models/oidc.js';
import UserModel from '../../src/infrastructure/models/user.js';
import State from '../../src/tools/state.js'
import Router from '../../src/presentation/router/index.js';
import Bootstrap from '../../src/bootstrap.js';
import FakeMongo from './fakes/mongo.js'

beforeAll(async () => {
  State.router = new Router()
  State.controllers = new Bootstrap()
  State.mongo = new FakeMongo()

  // Register controller for oidc to properly start
  State.controllers.register(enums.EControllers.OidcClients, new OidcClientsController(OidcClientModel, UserModel));

  State.controllers.init()
  await State.mongo.init()
  await State.router.init()
});
