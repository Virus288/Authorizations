import type * as enums from '../../enums/index.js';
import type * as types from '../../types/index.js';
import type express from 'express';

export default abstract class AbstractInnerController<T extends enums.EControllers, N extends enums.EControllerActions>
  implements types.IBaseInnerController
{
  private readonly _useCase: types.IInnerControllerUseCase[T][N];

  constructor(useCase: types.IInnerControllerUseCase[T][N]) {
    this._useCase = useCase;
  }
  protected get useCase(): types.IInnerControllerUseCase[T][N] {
    return this._useCase;
  }

  async handle(_req: express.Request, _res: express.Response): Promise<void> {
    return new Promise((resolve) => {
      resolve();
    });
  }
}
