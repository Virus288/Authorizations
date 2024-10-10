import type { IGetDetailedUserEntity } from '../../../../../application/user/get/types.js';
import type { IUser } from '../../../../../domain/user/types.js';

export default class GetDetailedUserEntity implements IGetDetailedUserEntity {
  name: string;
  id: string;

  constructor(data: IUser) {
    this.name = data.name;
    this.id = data._id.toString();
  }
}
