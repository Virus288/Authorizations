import type Bootstrap from '../bootstrap.js';
import type Router from '../presentation/router/index.js';

export interface IState {
  router: Router;
  controllers: Bootstrap;
}
