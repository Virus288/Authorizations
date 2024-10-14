import { EBaseControllerActions, EControllers } from '../../enums/controllers.js';
import { AccountDoesNotExistError } from '../../errors/index.js';
import State from '../../tools/state.js';
import type GetUserController from '../../presentation/controllers/users/get.js';
import type { Account, AccountClaims, KoaContextWithOIDC } from 'oidc-provider';

class UserAccount implements Account {
  private readonly _accountId: string;

  constructor(userId: string) {
    this._accountId = userId;
  }

  get accountId(): string {
    return this._accountId;
  }

  async claims(_use: string, _scope: string): Promise<AccountClaims> {
    // #TODO This should return client based on scope. I don't use any other scopes currently
    const getUsersController = State.controllers
      .resolve(EControllers.Users)
      ?.resolve(EBaseControllerActions.Get) as GetUserController;

    const account = await getUsersController.getDetailed({ id: this.accountId });

    if (!account) throw new AccountDoesNotExistError(this.accountId);

    return new Promise((resolve) => {
      resolve({
        ...account,
        sub: account.id,
      });
    });
  }

  // No idea why, but according to `Account` interface, account should return string
  [key: string]: unknown;
}

const findAccount = (_ctx: KoaContextWithOIDC, id: string, _token: unknown): Account => {
  return new UserAccount(id);
};

export default findAccount;
