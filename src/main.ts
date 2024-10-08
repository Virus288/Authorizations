import Bootstrap from './bootstrap.js';
import Mongo from './infrastructure/mongo/index.js';
import Router from './presentation/router/index.js';
import Log from './tools/logger/index.js';
import State from './tools/state.js';
import type { IFullError } from './types/index.js';

class App {
  init(): void {
    this.handleInit().catch((err) => {
      const { stack, message } = err as IFullError;
      Log.error('Server', 'Err while initializing app');
      Log.error('Server', message, stack);
      Log.error('Server', JSON.stringify(err));

      return State.kill().catch((error) =>
        Log.error('Server', "Couldn't kill server", (error as Error).message, (error as Error).stack),
      );
    });
  }

  private async handleInit(): Promise<void> {
    Log.debug('Server', 'Initializing');

    const router = new Router();
    const bootstrap = new Bootstrap();
    const mongo = new Mongo();

    State.router = router;
    State.controllers = bootstrap;
    State.mongo = mongo;

    await mongo.init();
    bootstrap.init();
    router.init();

    Log.log('Server', 'Server started');
  }
}

const app = new App();
app.init();
