import Log from './logger/index.js';
import { getKeys as generateKeys } from '../infrastructure/oidc/utils.js';
import Redis from '../infrastructure/redis/index.js';

class RotateKeys {
  private readonly _redis: Redis;

  constructor() {
    this._redis = new Redis();
  }

  private get redis(): Redis {
    return this._redis;
  }

  init(): void {
    Log.warn('Keys rotation', process.env);
    this.rotateKeys()
      .then(() => {
        this.close();
      })
      .catch((err) => {
        Log.error('Keys rotation', 'Could not rotate keys', err);
      });
  }

  private close(): void {
    this.redis.close();
  }

  private async rotateKeys(): Promise<void> {
    await this.redis.init();

    const keys = await generateKeys(2);
    await this.redis.addPrivateKeys(keys);
    Log.debug('Keys rotation', 'Added new keys', keys);
  }
}

new RotateKeys().init();
