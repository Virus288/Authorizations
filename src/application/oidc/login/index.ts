import type { ILoginDto } from './types.js';
import type { IUserRepository } from '../../../application/user/repository.js';
import type { IUseCase } from '../../../types/index.js';

export default class LogInUseCase implements IUseCase<ILoginDto, unknown> {
  private readonly _userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }

  private get userRepository(): IUserRepository {
    return this._userRepository;
  }

  async execute(data: ILoginDto): Promise<unknown> {
    return this.userRepository.getByName(data.login);
  }
}
