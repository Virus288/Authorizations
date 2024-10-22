import type { ILoginDto } from './types.js';
import type { IUserRepository } from '../../../application/user/repository.js';
import type { IUser } from '../../../domain/user/types.js';
import type { IUseCase } from '../../../types/index.js';

export default class LogInUseCase implements IUseCase<ILoginDto, IUser | null> {
  private readonly _userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }

  private get userRepository(): IUserRepository {
    return this._userRepository;
  }

  async execute(data: ILoginDto): Promise<IUser | null> {
    return this.userRepository.getByName(data.login);
  }
}
