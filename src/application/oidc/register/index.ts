import User from '../../../domain/user/index.js';
import { UserAlreadyRegisteredError } from '../../../errors/index.js';
import type { IRegisterDto } from './types.js';
import type { IUserRepository } from '../../../application/user/repository.js';
import type { IUseCase } from '../../../types/index.js';

export default class RegisterUseCase implements IUseCase<IRegisterDto, unknown> {
  private readonly _userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }

  private get userRepository(): IUserRepository {
    return this._userRepository;
  }

  async execute(data: IRegisterDto): Promise<{ id: string }> {
    const user = new User(data);

    const result = await this.userRepository.add(user);

    if (!result) {
      throw new Error('Could not save data.');
    }

    return {
      id: result,
    };
  }

  async validate(login: string): Promise<void> {
    const alreadyExists = await this.userRepository.getByName(login);

    if (!alreadyExists) throw new UserAlreadyRegisteredError();
  }
}
