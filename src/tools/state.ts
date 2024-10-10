import Log from './logger/index.js';
import { getKeys as generateKeys } from '../infrastructure/oidc/utils.js';
import type Bootstrap from '../bootstrap.js';
import type Mongo from '../infrastructure/mongo/index.js';
import type Redis from '../infrastructure/redis';
import type Router from '../presentation/router/index.js';
import type { IState } from '../types/index.js';
import type { JSONWebKeySet } from 'jose';
import type Provider from 'oidc-provider';

class State implements IState {
  private _router: Router | null = null;
  private _controllers: Bootstrap | null = null;
  private _mongo: Mongo | null = null;
  private _alive: boolean = false;
  private _provider: Provider | null = null;
  private _redis: Redis | null = null;
  private _keys: JSONWebKeySet = { keys: [] };
  private _keysValidation: NodeJS.Timeout | null = null;

  get alive(): boolean {
    return this._alive;
  }

  set alive(val: boolean) {
    this._alive = val;
  }

  get router(): Router {
    return this._router!;
  }

  set router(value: Router) {
    this._router = value;
  }

  get controllers(): Bootstrap {
    return this._controllers!;
  }

  set controllers(val: Bootstrap) {
    this._controllers = val;
  }

  get mongo(): Mongo {
    return this._mongo!;
  }

  set mongo(value: Mongo) {
    this._mongo = value;
  }

  get provider(): Provider {
    return this._provider as Provider;
  }

  set provider(value: Provider) {
    this._provider = value;
  }

  get redis(): Redis {
    return this._redis as Redis;
  }

  set redis(value: Redis) {
    this._redis = value;
  }

  get keysValidation(): NodeJS.Timeout {
    return this._keysValidation as NodeJS.Timeout;
  }

  set keysValidation(value: NodeJS.Timeout) {
    this._keysValidation = value;
  }

  get keys(): JSONWebKeySet {
    return this._keys;
  }

  set keys(value: JSONWebKeySet) {
    this._keys = value;
  }

  kill(): void {
    this.router.close();
    this.controllers.close();
    this.mongo.disconnect();
    this.redis.close();

    Log.log('Server', 'Server closed');
  }

  async initKeys(): Promise<void> {
    let keys = await this.redis.getPrivateKeys();

    if (!keys || keys.length === 0) {
      keys = await generateKeys(2);
      await this.redis.addPrivateKeys(keys);
    }

    this.keys = { keys };

    this.keysValidation = setTimeout(
      async () => {
        Log.log('Keys', 'Validating private keys');
        await this.initKeys();
      },
      1000 * 60 * 60 * 24,
    );
  }
}

export default new State();
