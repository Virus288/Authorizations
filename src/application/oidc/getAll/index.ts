import type { IGetOidcClientDto } from './types.js';
import type { IOidcClient } from '../../../domain/oidc/types.js';
import type { IUseCase } from '../../../types/index.js';
import type { IOidcClientRepository } from '../repository.js';

export default class GetAllOidcClientUseCase implements IUseCase<IGetOidcClientDto, IOidcClient[]> {
  private readonly _oidcClientRepository: IOidcClientRepository;

  constructor(oidcClientRepository: IOidcClientRepository) {
    this._oidcClientRepository = oidcClientRepository;
  }

  private get oidcClientRepository(): IOidcClientRepository {
    return this._oidcClientRepository;
  }

  async execute(): Promise<IOidcClient[]> {
    return this.oidcClientRepository.getAll();
  }
}
