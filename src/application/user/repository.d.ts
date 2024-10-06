import type User from '../../domain/user/index.js';
import type { IUser } from '../../domain/user/types.js';

export interface IUserRepository {
  get(id: string): Promise<IUser | null>;
  getByName(name: string): Promise<IUser | null>;
  add(user: User): Promise<string>;
}
