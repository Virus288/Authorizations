import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import Mongo from '../../../src/infrastructure/mongo/index.js'

export default class FakeMongo extends Mongo {
  override async init(): Promise<void> {
    await this.startServer();
  }

  override async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }

  override async startServer(): Promise<void> {
    const server = await MongoMemoryServer.create();
    await mongoose.connect(server.getUri());
  }
}
