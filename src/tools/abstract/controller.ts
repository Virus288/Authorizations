import type * as enums from '../../enums/index.js';
import type * as types from '../../types/index.js';

export default abstract class AbstractController<T extends enums.EControllers> {
  private readonly _controllers: Map<enums.EControllerActions, types.IInnerController[T][enums.EControllerActions]> =
    new Map<enums.EControllerActions, types.IInnerController[T][enums.EControllerActions]>();

  private get controllers(): Map<enums.EControllerActions, types.IInnerController[T][enums.EControllerActions]> {
    return this._controllers;
  }

  register<N extends enums.EControllerActions>(
    target: N,
    value: types.IInnerController[T][enums.EControllerActions],
  ): void {
    this.controllers.set(target, value);
  }

  resolve<N extends enums.EControllerActions>(
    target: N,
  ): types.IInnerController[T][enums.EControllerActions] | undefined {
    return this.controllers.get(target);
  }
}
