import mongoose from 'mongoose';
import type { IMigration } from './types.js';
import type { Connection } from 'mongoose';

const migrationSchema = new mongoose.Schema<IMigration>({
  dbName: {
    type: String,
    required: [true, 'db name not provided'],
  },
  changes: {
    type: [String],
    required: [true, 'changes not provided'],
  },
});

const getModel = (db: Connection): mongoose.Model<IMigration> => {
  return db.model('Migration', migrationSchema);
};

export default getModel;
