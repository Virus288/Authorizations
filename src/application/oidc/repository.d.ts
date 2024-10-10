import type OidcClient from '../../domain/oidc/index.js';
import type { IOidcClient } from '../../domain/oidc/types.js';

export interface IOidcClientRepository {
  get(id: string): Promise<IOidcClient | null>;
  getAll(): Promise<IOidcClient[]>;
  add(user: OidcClient): Promise<string>;
}
