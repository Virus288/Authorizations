import Adapter from './adapter.js';
import findAccount from './user.js';
import { EClaimsTTL } from '../../enums/index.js';
import State from '../../tools/state.js';
import type * as oidc from 'oidc-provider';

const claims = (clients: oidc.ClientMetadata[]): oidc.Configuration => {
  return {
    adapter: Adapter,

    claims: {
      openid: ['login'],
    },

    clients,

    cookies: {
      long: {
        signed: true,
      },
      keys: ['key'],
    },

    findAccount,

    features: {
      devInteractions: {
        enabled: false,
      },

      userinfo: { enabled: true },

      clientCredentials: {
        enabled: true,
      },

      introspection: {
        enabled: true,
      },

      revocation: {
        enabled: true,
      },

      rpInitiatedLogout: {
        enabled: true,
        // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
        logoutSource: (ctx: oidc.KoaContextWithOIDC, form: string): oidc.CanBePromise<void | undefined> => {
          ctx.rend;
          ctx.body = `<!DOCTYPE html>
            <head>
              <meta content='text/html; charset=utf-8' http-equiv='Content-Type' />
              <title>Monsters - Logout</title>
              <meta content='width=device-width, initial-scale=1' name='viewport'>
            </head>
            <body>
              ${form}
            </body>
              <script>
                document.addEventListener("DOMContentLoaded", () => {
                  const form = document.querySelector('form')
                  const input = document.createElement('input')
                  input.type = 'hidden'
                  input.name = 'logout'
                  input.value = 'yes'
                  form.appendChild(input)
                  form.submit()
                });
              </script>
            </html>`;
        },
      },
    },

    issueRefreshToken: (_ctx, client): boolean => {
      return client.grantTypeAllowed('refresh_token');
    },

    expiresWithSession: (): boolean => false,

    jwks: State.keys,

    pkce: {
      methods: ['S256'],
      required: () => true,
    },

    routes: {
      jwks: '/certs',
    },

    ttl: {
      Session: EClaimsTTL.Session,
      AccessToken: EClaimsTTL.AccessToken,
      AuthorizationCode: EClaimsTTL.AuthorizationCode,
      Interaction: EClaimsTTL.Interaction,
      RefreshToken: EClaimsTTL.RefreshToken,
    },
  };
};

export default claims;
