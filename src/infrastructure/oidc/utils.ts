import jose from 'node-jose';
import Log from '../../tools/logger/index.js';
import type { JWK } from 'jose';

export const generateKey = async (): Promise<JWK> => {
  const keystore = jose.JWK.createKeyStore();
  const key = await keystore.generate('RSA', 2048, { alg: 'RS256' });
  return key.toJSON(true) as JWK;
};

export const getKeys = async (amount: number): Promise<JWK[]> => {
  const keys: JWK[] = [];
  const actions: (() => Promise<void>)[] = [];

  for (let i = 0; i < amount; i++) {
    actions.push(async () => {
      keys.push(await generateKey());
    });
  }

  await Promise.allSettled(actions.map(async (a) => a())).catch((err) => {
    Log.error('Cannot generate private key', err);
  });

  return keys;
};
