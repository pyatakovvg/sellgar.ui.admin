export abstract class AuthStoreInterface {
  abstract isAuth: boolean;

  abstract setAuth(state: boolean): void;
}
