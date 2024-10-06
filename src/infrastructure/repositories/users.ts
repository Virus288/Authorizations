import AbstractRepository from '../../tools/abstract/repository.js';
import type { IUserRepository } from '../../application/user/repository.js';
import type { IUser } from '../../domain/user/types.d.ts';
import type * as enums from '../../enums/index.js';
import type User from '../models/user.js';
import type { FilterQuery } from 'mongoose';

export default class UsersRepository
  extends AbstractRepository<IUser, typeof User, enums.EModules.User>
  implements IUserRepository
{
  getByName(name: string): Promise<IUser | null> {
    return this.model.findOne({ name } as FilterQuery<Record<string, unknown>>).lean();
  }
}
