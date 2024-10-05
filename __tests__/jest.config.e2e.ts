import defaultConfig from './jest.config.default';
import { Config } from 'jest'

const config: Config = {
  ...defaultConfig,
  roots: ['./e2e'],
};

export default config;
