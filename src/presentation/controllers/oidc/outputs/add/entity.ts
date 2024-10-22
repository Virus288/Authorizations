import type { IAddOidcClientEntity } from '../../../../../application/oidc/add/types.js';

export default class AddOidcClientEntity implements IAddOidcClientEntity {
  readonly id: string;

  constructor(data: IAddOidcClientEntity) {
    this.id = data.id.toString();
  }
}
