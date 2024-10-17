import type { IGetDetailedUserEntity } from '../../../../../application/user/get/types.js';
import type { IUser } from '../../../../../domain/user/types.js';

export default class GetDetailedUserEntity implements IGetDetailedUserEntity {
  readonly _id: string;
  readonly login: string;
  readonly password: string;
  readonly email: string;

  constructor(data: IUser) {
    this.login = data.login;
    this._id = data._id.toString();
    this.password = data.password;
    this.email = data.email;
  }
}
