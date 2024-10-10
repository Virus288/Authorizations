import mongoose from 'mongoose';
import type { IOidcClient } from '../../domain/oidc/types.js';

export const oidcClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name not provided'],
  },
});

const OidcClient = mongoose.model<IOidcClient>('Oidc', oidcClientSchema);
export default OidcClient;
