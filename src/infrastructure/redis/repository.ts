import type * as enums from '../../enums/index.js';
import type { RedisClientType } from 'redis';

export default class Repository {
  private _client: RedisClientType | undefined = undefined;

  private get client(): RedisClientType {
    return this._client!;
  }

  async getAllFromList(target: enums.ERedisTargets | string): Promise<string[] | undefined> {
    const amount = await this.client.lLen(target);
    return this.client.lRange(target, 0, amount);
  }

  async getFromHash(data: { target: enums.ERedisTargets | string; value: string }): Promise<string | undefined> {
    const { target, value } = data;
    const exist = await this.checkElm(target);
    if (!exist) return undefined;
    return this.client.hGet(target, value);
  }

  async getKeys(target: enums.ERedisTargets | string): Promise<string[]> {
    return this.client.keys(target);
  }

  async setExpirationDate(target: enums.ERedisTargets | string, time: number): Promise<void> {
    await this.client.expire(target, time);
  }

  init(client: RedisClientType): void {
    this._client = client;
  }

  async addToHash(target: enums.ERedisTargets | string, key: string, value: string): Promise<void> {
    await this.client.hSet(target, key, value);
  }

  async removeElement(target: string): Promise<void> {
    await this.client.del(target);
  }

  async addToList(target: enums.ERedisTargets | string, value: string[]): Promise<void> {
    await this.client.lPush(target, value);
  }

  private async checkElm(target: string): Promise<boolean> {
    if (!this.client) return false;
    const e: number = await this.client.exists(target);
    return e !== 0;
  }
}
