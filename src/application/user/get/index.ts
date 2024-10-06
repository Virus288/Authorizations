import { NoDataError } from '../../../errors/index.js';
import type { IGetUserDto } from './types.js';
import type { IUser } from '../../../domain/user/types.js';
import type { IUseCase } from '../../../types/index.js';
import type { IUserRepository } from '../repository.js';

export default class GetUserUseCase implements IUseCase<IGetUserDto, IUser> {
  private readonly _userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }

  private get userRepository(): IUserRepository {
    return this._userRepository;
  }

  async execute(input: IGetUserDto): Promise<IUser> {
    const data = input.id
      ? await this.userRepository.get(input.id)
      : await this.userRepository.getByName(input.name as string);

    if (!data) {
      throw new NoDataError();
    }

    return data;
  }
}
