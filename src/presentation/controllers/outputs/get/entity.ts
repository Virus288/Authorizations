import type { IGetUserEntity } from '../../../../application/user/get/types.js';

export default class GetUserDto implements IGetUserEntity {
  name: string;

  constructor(data: IGetUserEntity) {
    this.name = data.name;
  }
}
