import AbstractRepository from '../../tools/abstract/repository.js';
import type { IOidcClientRepository } from '../../application/oidc/repository.js';
import type { IOidcClient } from '../../domain/oidc/types.d.ts';
import type * as enums from '../../enums/index.js';
import type OidcClient from '../models/oidc.js';

export default class OidcClientsRepository
  extends AbstractRepository<IOidcClient, typeof OidcClient, enums.EModules.OidcClient>
  implements IOidcClientRepository
{
  async getAll(): Promise<IOidcClient[]> {
    return this.model.find().lean() as Promise<IOidcClient[]>;
  }
}
