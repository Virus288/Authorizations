import type * as enums from '../../enums/index.js';
import type * as types from '../../types/index.js';
import type express from 'express';

export default abstract class AbstractInnerController<
  T extends enums.EControllers,
  N extends enums.EControllerActions,
  U = void,
  P = [express.Request, express.Response],
> implements types.IBaseInnerController<U, P>
{
  private readonly _useCase: types.IInnerControllerUseCase[T][N];

  constructor(useCase: types.IInnerControllerUseCase[T][N]) {
    this._useCase = useCase;
  }

  protected get useCase(): types.IInnerControllerUseCase[T][N] {
    return this._useCase;
  }

  async handle(_arg1: express.Request | P, _res?: express.Response): Promise<U> {
    return new Promise<U>((resolve) => {
      resolve(undefined as U);
    });
  }
}
