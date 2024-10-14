export enum EControllers {
  Users = 'users',
  OidcClients = 'oidcClients',
}

export enum EBaseControllerActions {
  Add = 'add',
  Get = 'get',
  GetAll = 'getAll',
}

export enum EOidcControllerActions {
  GetGrant = 'getGrant',
  Login = 'login',
  Confirm = 'confirm',
  Abort = 'abort',
}
