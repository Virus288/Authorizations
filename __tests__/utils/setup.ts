import { beforeAll } from '@jest/globals';
import State from '../../src/tools/state.js'
import Router from '../../src/presentation/router/index.js';
import Bootstrap from '../../src/bootstrap.js';
import FakeMongo from './fakes/mongo.js'

beforeAll(async () => {
  State.router = new Router()
  State.controllers = new Bootstrap()
  State.mongo = new FakeMongo()

  await State.router.init()
  State.controllers.init()
  await State.mongo.init()
});
