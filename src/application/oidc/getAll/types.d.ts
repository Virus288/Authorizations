import type { IOidcClientEntity } from '../../../domain/oidc/types.js';

export interface IGetOidcClientDto {
  id: string;
}

export type IGetOidcClientEntity = Omit<IOidcClientEntity, '_id'>;
