import type { IAddUserResult } from '../../../application/user/add/types';

export default class AddUserDto implements IAddUserResult {
  readonly id: string;
  readonly name: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}
