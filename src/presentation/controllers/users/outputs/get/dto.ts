import * as errors from '../../../../../errors/index.js';
import Validation from '../../../../../tools/validator.js';
import type { IGetUserDto } from '../../../../../application/user/get/types.js';

export default class GetUserDto implements IGetUserDto {
  readonly id: string | undefined = undefined;
  readonly name: string | undefined = undefined;

  constructor(data: IGetUserDto) {
    this.id = data.id;
    this.name = data.name;

    this.validate();
  }

  private validate(): void {
    if (!this.id && !this.name) throw new errors.MissingArgError('Name, Id');

    if (!this.name) {
      new Validation(this.id, 'id').isDefined().isString().isObjectId();
    }

    if (!this.id) {
      new Validation(this.name, 'name').isDefined().isString();
    }

    if (this.name && this.id) {
      new Validation(this.name, 'name').isDefined().isString();
      new Validation(this.id, 'id').isDefined().isString().isObjectId();
    }
  }
}
