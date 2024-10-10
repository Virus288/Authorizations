import type { IAddOidcClientEntity } from '../../../../../application/oidc/add/types.js';

export default class AddOidcClientEntity implements IAddOidcClientEntity {
  id: string;

  constructor(data: IAddOidcClientEntity) {
    this.id = data.id.toString();
  }
}
