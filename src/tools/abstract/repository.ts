import type * as enums from '../../enums/index.js';
import type * as types from '../../types/index.js';
import type mongoose from 'mongoose';
import type { Document, Model, FilterQuery } from 'mongoose';

export default abstract class AbstractRepository<T extends Document, U extends Model<T>, Z extends enums.EModules>
  implements types.IGenericRepository<Z>
{
  private readonly _model: U;

  constructor(model: U) {
    this._model = model;
  }

  get model(): U {
    return this._model;
  }

  async get(_id: string | mongoose.Types.ObjectId): Promise<types.IRepositoryGetData[Z] | null> {
    return this.model
      .findOne({ _id } as FilterQuery<Record<string, string | mongoose.Types.ObjectId>>)
      .select({ __v: false })
      .lean() as Promise<types.IRepositoryGetData[Z] | null>;
  }

  async add(data: types.IRepositoryAddData[Z]): Promise<string> {
    const newElement = new this.model(data);
    const callback = await newElement.save();
    return callback._id as string;
  }
}
