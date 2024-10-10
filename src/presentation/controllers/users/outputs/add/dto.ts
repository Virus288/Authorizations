import Validation from '../../../../../tools/validator.js';
import type { IAddUserDto } from '../../../../../application/user/add/types.js';

export default class AddUserDto implements IAddUserDto {
  name: string;

  constructor(data: IAddUserDto) {
    this.name = data.name;

    this.validate();
  }

  private validate(): void {
    new Validation(this.name, 'name').isDefined().isString().hasMinLength(1);
  }
}
