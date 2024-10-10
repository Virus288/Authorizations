import type { IGetUserEntity } from '../../../../../application/user/get/types.js';
import type { IUser } from '../../../../../domain/user/types.js';

export default class GetUserEntity implements IGetUserEntity {
  name: string;

  constructor(data: IUser) {
    this.name = data.name;
  }
}
