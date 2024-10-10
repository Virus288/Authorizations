import type { IGetOidcClientDto } from './types.js';
import type { IOidcClient } from '../../../domain/oidc/types.js';
import type { IUseCase } from '../../../types/index.js';
import type { IOidcClientRepository } from '../repository.js';

export default class GetOidcClientUseCase implements IUseCase<IGetOidcClientDto, IOidcClient | null> {
  private readonly _oidcClientRepository: IOidcClientRepository;

  constructor(oidcClientRepository: IOidcClientRepository) {
    this._oidcClientRepository = oidcClientRepository;
  }

  private get oidcClientRepository(): IOidcClientRepository {
    return this._oidcClientRepository;
  }

  async execute(input: IGetOidcClientDto): Promise<IOidcClient | null> {
    const data = await this.oidcClientRepository.get(input.id);

    return data;
  }
}
