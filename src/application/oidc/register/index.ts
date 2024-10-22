import User from '../../../domain/user/index.js';
import { AlreadyRegisteredError } from '../../../errors/index.js';
import type { IRegisterDto } from './types.js';
import type { IUserRepository } from '../../../application/user/repository.js';
import type { IUseCase } from '../../../types/index.js';

export default class RegisterUseCase implements IUseCase<IRegisterDto, { id: string }> {
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

  async validate(login: string, email: string): Promise<void> {
    const loginTaken = await this.userRepository.getByName(login);
    const emailTaken = await this.userRepository.getByEmail(email);

    if (loginTaken) throw new AlreadyRegisteredError('Login');
    if (emailTaken) throw new AlreadyRegisteredError('Email');
  }
}
