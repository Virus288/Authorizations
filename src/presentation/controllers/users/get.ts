import mongoose from 'mongoose';
import AbstractInnerController from '../../../tools/abstract/innerController.js';
import type * as enums from '../../../enums/index.js';
import type express from 'express';

export default class GetUserController extends AbstractInnerController<
  enums.EControllers.Users,
  enums.EControllerActions.Get
> {
  override async handle(req: express.Request, res: express.Response): Promise<void> {
    this.validate(req);

    const result = await this.useCase.execute({
      name: req.query.name as string,
      id: req.query.id as string,
    });

    if (!result) {
      res.status(404).json({ message: 'Cannot find data' });
    }
  }

  private validate(req: express.Request): void {
    const name = req.query.name as string;
    const id = req.query.id as string;

    if (!id && !name) throw new Error('Name nor id provided');

    if (!name) {
      if (!id) throw new Error('id not provided');
      if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('Id is incorrect');
    }

    if (!id) {
      if (!name) throw new Error('Name not provided');
    }
  }
}
