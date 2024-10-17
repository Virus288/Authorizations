import type { IGetUserEntity } from '../../../../../application/user/get/types.js';
import type { IUser } from '../../../../../domain/user/types.js';

export default class GetUserEntity implements IGetUserEntity {
  readonly login: string;
  readonly email: string;

  constructor(data: IUser) {
    this.login = data.login;
    this.email = data.email;
  }
}
