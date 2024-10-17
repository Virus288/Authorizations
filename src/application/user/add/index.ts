import User from '../../../domain/user/index.js';
import type { IAddUserDto, IAddUserEntity } from './types.js';
import type AddUserDto from '../../../presentation/controllers/users/outputs/add/dto.js';
import type { IUseCase } from '../../../types/index.js';
import type { IUserRepository } from '../repository.js';

export default class AddUserUseCase implements IUseCase<IAddUserDto, IAddUserEntity> {
  private readonly _userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }

  private get userRepository(): IUserRepository {
    return this._userRepository;
  }

  async execute(input: AddUserDto): Promise<IAddUserEntity> {
    const user = new User(input);

    const result = await this.userRepository.add(user);

    if (!result) {
      throw new Error('Could not save data.');
    }

    return {
      id: result,
    };
  }
}
