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

export class NoDataError extends FullError {
  constructor() {
    super('NoDataError');
    this.message = 'Could not find element with provided params';
    this.name = 'NoDataError';
    this.status = 404;
    this.code = '004';
  }
}
