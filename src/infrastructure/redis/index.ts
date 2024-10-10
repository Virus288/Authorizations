import { createClient } from 'redis';
import Repository from './repository.js';
import * as enums from '../../enums/index.js';
import getConfig from '../../tools/configLoader.js';
import Log from '../../tools/logger/index.js';
import type { IFullError } from '../../types/index.js';
import type { JWK } from 'jose';
import type { RedisClientType } from 'redis';

export default class Redis {
  private readonly _repository: Repository;
  private _client: RedisClientType | undefined;

  constructor() {
    this._repository = new Repository();
  }

  private get client(): RedisClientType | undefined {
    return this._client;
  }

  private get repository(): Repository {
    return this._repository;
  }

  async getOidcHash(target: string, id: string): Promise<string | undefined> {
    return this.repository.getFromHash({ target, value: id });
  }

  /**
   * Get private keys used to generate user keys.
   * @returns Saved private keys.
   */
  async getPrivateKeys(): Promise<JWK[]> {
    const target = `${enums.ERedisTargets.PrivateKeys}`;
    const indexes = await this.repository.getKeys(`${target}:*`);
    const keys = await Promise.all(
      indexes.map((i) => {
        return this.repository.getAllFromList(i);
      }),
    );
    return keys && keys.length > 0 ? keys.flat().map((k) => JSON.parse(k as string) as JWK) : [];
  }

  async setExpirationDate(target: enums.ERedisTargets | string, ttl: number): Promise<void> {
    await this.repository.setExpirationDate(target, ttl);
  }

  async init(): Promise<void> {
    this.initClient();
    this.repository.init(this.client!);
    this.listen();
    await this.client!.connect();
  }

  close(): void {
    if (this.client) {
      this.client.quit().catch((err) => {
        Log.error('Redis', 'Cannot close connection', (err as Error).message);
      });
    }
  }

  async removeOidcElement(target: string): Promise<void> {
    return this.repository.removeElement(target);
  }

  async addOidc(target: string, id: string, value: unknown): Promise<void> {
    await this.repository.addToHash(target, id, typeof value === 'string' ? value : JSON.stringify(value));
  }

  async addGrantId(target: string, id: string, value: string): Promise<void> {
    await this.repository.addToHash(target, id, value);
  }

  async addPrivateKeys(keys: JWK[]): Promise<void> {
    const indexes = await this.repository.getKeys(`${enums.ERedisTargets.PrivateKeys}:*`);
    const highestNumber =
      indexes.length === 0
        ? '1'
        : (
            indexes
              .map((i) => Number(i.split(':')[1]))
              .sort((a, b) => {
                if (a > b) return 1;
                if (b > 1) return -1;
                return 0;
              })[indexes.length - 1]! + 1
          ).toString();
    const liveKey = `${enums.ERedisTargets.PrivateKeys}:${highestNumber}`;

    await this.repository.addToList(
      liveKey,
      keys.map((k) => JSON.stringify(k)),
    );
    await this.repository.setExpirationDate(`${liveKey}`, 60 * 60 * 24 * 7);
  }

  private initClient(): void {
    this._client = createClient({
      url: getConfig().redisURI,
    });
  }

  private listen(): void {
    this.client!.on('error', (err) => {
      const error = err as IFullError;
      return Log.error('Redis', error.message, error.stack);
    });

    this.client!.on('ready', () => Log.log('Redis', 'Redis connected'));
    this.client!.on('end', () => Log.log('Redis', 'Redis disconnected'));
    this.client!.on('reconnecting', () => Log.log('Redis', 'Redis error. Reconnecting'));
  }
}
