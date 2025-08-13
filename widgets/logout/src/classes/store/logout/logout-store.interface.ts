export abstract class LogoutStoreInterface {
  abstract inProcess: boolean;

  abstract setProcess(state: boolean): void;
}
