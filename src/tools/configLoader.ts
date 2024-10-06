import Log from './logger/index.js';
import devConfig from '../../config/devConfig.json' with { type: 'json' };
import exampleConfig from '../../config/exampleConfig.json' with { type: 'json' };
import prodConfig from '../../config/prodConfig.json' with { type: 'json' };
import testDevConfig from '../../config/testConfig.json' with { type: 'json' };
import type * as types from '../types/index.js';

/**
 * Load config from json files.
 * @returns {types.IConfigInterface} Loaded config.
 * @throws {Error} Throws error when config is incorrect, or does not exist. Application might not compile, if config is incorrect, due to importing it, rather than reading file.
 */
export default function getConfig(): types.IConfigInterface {
  switch (process.env.NODE_ENV) {
    case 'testDev':
      if (testDevConfig.amqpURI) return testDevConfig;
      Log.error('Config', 'Config file is incomplete. Using example config');
      return exampleConfig;
    case 'dev':
    case 'test':
      if (devConfig.amqpURI) return devConfig;
      Log.error('Config', 'Config file is incomplete. Using example config');
      return exampleConfig;
    case 'production':
      if (prodConfig.amqpURI) return prodConfig;
      Log.error('Config', 'Config file is incomplete. Using example config');
      return exampleConfig;
    default:
      throw new Error('No config files');
  }
}
