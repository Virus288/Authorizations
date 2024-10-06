import User from '../../../domain/user/index.js';
import type { IAddUserDto, IAddUserResult } from './types.js';
import type { IUseCase } from '../../../types/index.js';
import type { IUserRepository } from '../repository.js';

export default class AddUserUseCase implements IUseCase<IAddUserDto, IAddUserResult> {
  private readonly _userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }

  private get userRepository(): IUserRepository {
    return this._userRepository;
  }

  async execute(input: IAddUserDto): Promise<IAddUserResult> {
    const user = new User(input.name);

    const result = await this.userRepository.add(user);

    if (!result) {
      throw new Error('Could not save data.');
    }

    return {
      id: result,
    };
  }
}
