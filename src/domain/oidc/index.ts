import type { IOidcClientEntity } from './types.js';

export default class OidcClient implements Omit<IOidcClientEntity, '_id'> {
  readonly _id: string | undefined;
  client_id: string;
  client_secret: string;
  grant_types: string[];
  scope: string;
  redirect_uris: string[];
  post_logout_redirect_uris: string[];
  [key: string]: unknown;

  constructor(user: IOidcClientEntity) {
    this.client_id = user.client_id;
    this.client_secret = user.client_secret;
    this.grant_types = user.grant_types;
    this.scope = user.scope;
    this.redirect_uris = user.redirect_uris;
    this.post_logout_redirect_uris = user.post_logout_redirect_uris;
  }
}
