import mongoose from 'mongoose';
import type { IOidcClient } from '../../domain/oidc/types.js';

export const oidcClientSchema = new mongoose.Schema({
  client_id: {
    type: String,
    required: [true, 'Client_id not provided'],
  },
  client_secret: {
    type: String,
    required: [true, 'Client_id not provided'],
  },
  grant_types: {
    type: [String],
    required: [true, 'Client_id not provided'],
  },
  scope: {
    type: String,
    required: [true, 'Client_id not provided'],
  },
  redirect_uris: {
    type: [String],
    required: [true, 'Client_id not provided'],
  },
  post_logout_redirect_uris: {
    type: [String],
    required: [true, 'Client_id not provided'],
  },
});

const OidcClient = mongoose.model<IOidcClient>('Oidc', oidcClientSchema);
export default OidcClient;
