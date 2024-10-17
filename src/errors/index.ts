// eslint-disable-next-line max-classes-per-file
export class FullError extends Error {
  code = '000';
  status = 500;
}

export class InternalError extends FullError {
  constructor() {
    super('InternalError');
    this.message = 'Internal error. Try again later';
    this.name = 'InternalError';
    this.status = 500;
    this.code = '001';
  }
}

export class IncorrectDataType extends FullError {
  constructor() {
    super('IncorrectDataType');
    this.message = 'Received request is not json type';
    this.name = 'IncorrectDataType';
    this.status = 400;
    this.code = '002';
  }
}

export class MissingProcessPlatformError extends FullError {
  constructor() {
    super('MissingProcessPlatformError');
    this.message = 'process.platform is missing';
    this.name = 'MissingProcessPlatformError';
    this.status = 500;
    this.code = '003';
  }
}

export class MissingArgError extends FullError {
  constructor(param: string) {
    super('MissingArgError');
    this.message = `Missing param: ${param}`;
    this.name = 'MissingArgError';
    this.code = '004';
    this.status = 400;
  }
}

export class IncorrectArgError extends FullError {
  constructor(err: string) {
    super('IncorrectArgError');
    this.message = err;
    this.name = 'IncorrectArgError';
    this.code = '005';
    this.status = 400;
  }
}

export class IncorrectArgTypeError extends FullError {
  constructor(err: string) {
    super('IncorrectArgTypeError');
    this.message = err;
    this.name = 'IncorrectArgTypeError';
    this.code = '006';
    this.status = 400;
  }
}

export class ElementTooShortError extends FullError {
  constructor(target: string, min: number) {
    super('ElementTooShortError');
    this.message = `Element ${target} is too short. Minimum length is ${min}`;
    this.name = 'ElementTooShortError';
    this.code = '007';
    this.status = 400;
  }
}

export class ElementTooLongError extends FullError {
  constructor(target: string, min: number) {
    super('ElementTooLongError');
    this.message = `Element ${target} is too long. Maximum length is ${min}`;
    this.name = 'ElementTooLongError';
    this.code = '008';
    this.status = 400;
  }
}

export class IncorrectArgLengthError extends FullError {
  constructor(target: string, min: number | undefined, max: number) {
    super('IncorrectArgLengthError');
    this.message =
      min === undefined
        ? `${target} should be less than ${max} characters`
        : min !== max
          ? `${target} should be more than ${min} and less than ${max} characters`
          : `${target} should be ${min} characters`;
    this.name = 'IncorrectArgLengthError';
    this.code = '009';
    this.status = 400;
  }
}

export class FourOhFour extends FullError {
  constructor() {
    super('FourOhFour');
    this.message = '';
    this.name = 'FourOhFour';
    this.code = '010';
    this.status = 404;
  }
}

export class AccountDoesNotExistError extends FullError {
  constructor(accountId: string) {
    super('AccountDoesNotExistError');
    this.message = `Provided account with id ${accountId} does not exist`;
    this.name = 'AccountDoesNotExistError';
    this.code = '011';
    this.status = 400;
  }
}

export class IncorrectCredentialsError extends FullError {
  constructor(message?: string) {
    super('IncorrectCredentialsError');
    this.message = message ?? 'Incorrect credentials';
    this.name = 'IncorrectCredentialsError';
    this.code = '012';
    this.status = 400;
  }
}

export class UserAlreadyRegisteredError extends FullError {
  constructor() {
    super('UserAlreadyRegisteredError');
    this.message = 'Email already registered';
    this.name = 'UserAlreadyRegisteredError';
    this.code = '012';
    this.status = 400;
  }
}
