import OidcClient from '../../infrastructure/models/oidc.js';
import { generateRandomName } from '../../utils/index.js';

export default {
  async up(): Promise<undefined | number> {
    const client = new OidcClient({
      client_id: 'oidcClient',
      client_secret: generateRandomName(),
      grant_types: ['authorization_code', 'refresh_token'],
      scope: 'openid',
      redirect_uris: ['http://127.0.0.1/login'],
      post_logout_redirect_uris: ['http://127.0.0.1'],
    });
    await client.save();

    return 1;
  },

  async down(): Promise<void> {
    await OidcClient.findOneAndDelete({ client_id: 'oidcClient' });
  },
};
