import type { IAddUserEntity } from '../../../../application/user/add/types.js';

export default class AddUserEntity implements IAddUserEntity {
  id: string;

  constructor(data: IAddUserEntity) {
    this.id = data.id.toString();
  }
}
