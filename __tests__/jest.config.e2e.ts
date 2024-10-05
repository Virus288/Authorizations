import defaultConfig from './jest.config.default';
import { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  ...defaultConfig,
  roots: ['./e2e'],
};

export default config;
