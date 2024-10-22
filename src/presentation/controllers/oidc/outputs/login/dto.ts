import Validation from '../../../../../tools/validator.js';
import type { ILoginDto } from '../../../../../application/oidc/login/types.js';

export default class LoginDto implements ILoginDto {
  readonly password: string;
  readonly login: string;

  constructor(data: ILoginDto) {
    this.login = data.login;
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
        new RegExp(/^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d).*$/u, 'u'),
        'Password should contain min. 8 characters with at least 1 digit, 1 letter, 1 upper case letter and 1 lower case letter',
      );
  }
}
