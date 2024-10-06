import mongoose from 'mongoose';
import getConfig from '../../tools/configLoader.js';
import Log from '../../tools/logger/index.js';
import type { ConnectOptions } from 'mongoose';

export default class Mongo {
  async init(): Promise<void> {
    await this.startServer();
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }

  private async startServer(): Promise<void> {
    Log.debug('Mongo', 'Connecting to mongo');

    await mongoose.connect(getConfig().mongoURI, {
      dbName: 'Authorizations',
    } as ConnectOptions);
    Log.log('Mongo', 'Started server');
  }
}
