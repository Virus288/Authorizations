import defaultConfig from './jest.config.default';
import { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  ...defaultConfig,
  roots: ['./e2e'],
  setupFilesAfterEnv: ['./utils/setup.ts'],
};

export default config;
