import type mongoose from 'mongoose';

interface IMigrationEntity {
  _id?: string | mongoose.Types.ObjectId;
  dbName: string;
  changes: string[];
}

export interface IMigration extends IMigrationEntity, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}

export interface IMigrationFile {
  up: () => Promise<undefined> | Promise<number>;
  down: () => Promise<void>;
}
