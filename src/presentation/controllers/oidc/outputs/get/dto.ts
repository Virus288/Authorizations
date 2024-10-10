import Validation from '../../../../../tools/validator.js';
import type { IGetOidcClientDto } from '../../../../../application/oidc/get/types.js';

export default class GetOidcClientsDto implements IGetOidcClientDto {
  id: string;

  constructor(data: IGetOidcClientDto) {
    this.id = data.id;

    this.validate();
  }

  private validate(): void {
    new Validation(this.id, 'id').isDefined().isString().isObjectId();
  }
}
