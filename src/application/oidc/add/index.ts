import OidcClient from '../../../domain/oidc/index.js';
import type { IAddOidcClientEntity } from './types.js';
import type AddOidcClientDto from '../../../presentation/controllers/oidc/outputs/add/dto.js';
import type { IUseCase } from '../../../types/index.js';
import type { IOidcClientRepository } from '../repository.js';

export default class AddOidcClientUseCase implements IUseCase<AddOidcClientDto, IAddOidcClientEntity> {
  private readonly _oidcClientRepository: IOidcClientRepository;

  constructor(oidcClientRepository: IOidcClientRepository) {
    this._oidcClientRepository = oidcClientRepository;
  }

  private get oidcClientRepository(): IOidcClientRepository {
    return this._oidcClientRepository;
  }

  async execute(input: AddOidcClientDto): Promise<IAddOidcClientEntity> {
    const client = new OidcClient(input);

    const result = await this.oidcClientRepository.add(client);

    if (!result) {
      throw new Error('Could not save data.');
    }

    return {
      id: result,
    };
  }
}
