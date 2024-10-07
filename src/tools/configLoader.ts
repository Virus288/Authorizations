import type * as types from '../types/index.js';
import fs from 'fs';

/**
 * Load config from json files.
 * @returns {types.IConfigInterface} Loaded config.
 * @throws {Error} Throws error when config is incorrect, or does not exist. Application might not compile, if config is incorrect, due to importing it, rather than reading file.
 */
export default function getConfig(): types.IConfigInterface {
  switch (process.env.NODE_ENV) {
    case 'testDev':
      return JSON.parse(fs.readFileSync('./config/testConfig.json').toString()) as types.IConfigInterface;
    case 'development':
    case 'test':
      return JSON.parse(fs.readFileSync('./config/devConfig.json').toString()) as types.IConfigInterface;
    case 'production':
      return JSON.parse(fs.readFileSync('./config/prodConfig.json').toString()) as types.IConfigInterface;
    default:
      throw new Error('No config files');
  }
}
