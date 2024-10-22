import Validation from '../../../../../tools/validator.js';
import type { IRegisterDto } from '../../../../../application/oidc/register/types.js';

export default class RegisterDto implements IRegisterDto {
  readonly login: string;
  readonly email: string;
  readonly password: string;

  constructor(data: IRegisterDto) {
    this.login = data.login;
    this.email = data.email;
    this.password = data.password;

    this.validate();
  }

  private validate(): void {
    new Validation(this.login, 'login')
      .isDefined()
      .isString()
      .hasLength(30, 3)
      .isRegexCompatible(
        new RegExp(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/u, 'u'),
        'Login should only contain letters, numbers and special characters',
      );

    new Validation(this.password, 'password')
      .isDefined()
      .isString()
      .hasLength(200, 6)
      .isRegexCompatible(
        new RegExp(/(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[\W_])(?!\S*\s)[a-zA-Z0-9\W_]{8,}/u, 'u'),
        'Password should contain min. 8 characters with at least 1 digit, 1 letter, 1 upper case letter and 1 lower case letter',
      );

    new Validation(this.email, 'email')
      .isDefined()
      .isString()
      .hasLength(200)
      .isRegexCompatible(
        new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/u, 'u'),
        'Email invalid',
      );
  }
}
