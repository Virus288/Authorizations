import type { IUserEntity } from './types.js';

export default class User implements Omit<IUserEntity, '_id'> {
  readonly login: string;
  readonly email: string;
  readonly password: string;

  constructor(data: IUserEntity) {
    this.login = data.login;
    this.email = data.email;
    this.password = data.password;
  }
}
