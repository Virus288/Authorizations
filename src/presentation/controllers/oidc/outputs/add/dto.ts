import Validation from '../../../../../tools/validator.js';
import type { IAddOidcClientDto } from '../../../../../application/oidc/add/types.js';

export default class AddOidcClientDto implements IAddOidcClientDto {
  readonly _id: string | undefined;
  readonly client_id: string;
  readonly client_secret: string;
  readonly grant_types: string[];
  readonly scope: string;
  readonly redirect_uris: string[];
  readonly post_logout_redirect_uris: string[];
  readonly [key: string]: unknown;

  constructor(data: IAddOidcClientDto) {
    this.client_id = data.client_id;
    this.client_secret = data.client_secret;
    this.grant_types = data.grant_types;
    this.scope = data.scope;
    this.redirect_uris = data.redirect_uris;
    this.post_logout_redirect_uris = data.post_logout_redirect_uris;

    this.validate();
  }

  private validate(): void {
    new Validation(this.name, 'name').isDefined().isString().hasMinLength(1);
  }
}
