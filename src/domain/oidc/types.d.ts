import type mongoose from 'mongoose';

export interface IOidcClientEntity {
  _id?: string | mongoose.Types.ObjectId;
  client_id: string;
  client_secret: string;
  grant_types: string[];
  scope: string;
  redirect_uris: string[];
  post_logout_redirect_uris: string[];
  [key: string]: unknown;
}

export interface IOidcClient extends IOidcClientEntity, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}
