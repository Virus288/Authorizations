import type { IUserEntity } from './types.js';

export default class User implements IUserEntity {
  readonly _id: string | undefined;
  readonly name: string;

  constructor(name: string, id?: string) {
    this.name = name;
    this._id = id;
  }
}
