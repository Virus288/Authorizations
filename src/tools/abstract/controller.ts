import type * as enums from '../../enums/index.js';
import type * as types from '../../types/index.js';

export default abstract class AbstractController<T extends enums.EControllers> {
  private readonly _controllers: Map<
    enums.EBaseControllerActions | enums.EOidcControllerActions,
    types.IInnerController[T][enums.EBaseControllerActions | enums.EOidcControllerActions]
  > = new Map<
    enums.EBaseControllerActions | enums.EOidcControllerActions,
    types.IInnerController[T][enums.EBaseControllerActions | enums.EOidcControllerActions]
  >();

  private get controllers(): Map<
    enums.EBaseControllerActions | enums.EOidcControllerActions,
    types.IInnerController[T][enums.EBaseControllerActions | enums.EOidcControllerActions]
  > {
    return this._controllers;
  }

  register<N extends types.IControllerAcitons>(
    target: N,
    value: types.IInnerController[T][enums.EBaseControllerActions | enums.EOidcControllerActions],
  ): void {
    this.controllers.set(target, value);
  }

  resolve<N extends types.IControllerAcitons>(
    target: N,
  ): types.IInnerController[T][enums.EBaseControllerActions | enums.EOidcControllerActions] | undefined {
    return this.controllers.get(target);
  }
}
