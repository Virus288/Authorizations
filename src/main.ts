import Bootstrap from './bootstrap.js';
import Mongo from './infrastructure/mongo/index.js';
import Redis from './infrastructure/redis/index.js';
import Router from './presentation/router/index.js';
import Liveness from './tools/liveness.js';
import Log from './tools/logger/index.js';
import State from './tools/state.js';
import type { IFullError } from './types/index.js';

class App {
  private _liveness: Liveness | undefined;

  private get liveness(): Liveness | undefined {
    return this._liveness;
  }

  private set liveness(val: Liveness | undefined) {
    this._liveness = val;
  }

  init(): void {
    this.handleInit().catch((err) => {
      const { stack, message } = err as IFullError;
      Log.error('Server', 'Err while initializing app');
      Log.error('Server', message, stack);
      Log.error('Server', JSON.stringify(err));

      this.close();
    });
  }

  private async handleInit(): Promise<void> {
    Log.debug('Server', 'Initializing');

    const router = new Router();
    const bootstrap = new Bootstrap();
    const mongo = new Mongo();
    const redis = new Redis();

    State.router = router;
    State.controllers = bootstrap;
    State.mongo = mongo;
    State.redis = redis;

    await mongo.init();
    await redis.init();
    await State.initKeys();
    bootstrap.init();
    router.init();

    Log.log('Server', 'Server started');

    this.liveness = new Liveness();
    this.liveness.init();

    this.listenForSignals();
    State.alive = true;
  }

  private close(graceful?: boolean): void {
    if (graceful) Log.log('Server', 'Received signal to die. Gracefully closing');

    State.alive = false;
    this.liveness?.close();
    State.kill();
    this.liveness?.close();
  }

  private listenForSignals(): void {
    process.on('SIGTERM', () => this.close(true));
    process.on('SIGINT', () => this.close(true));
  }
}

const app = new App();
app.init();
