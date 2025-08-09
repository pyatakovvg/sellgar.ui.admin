export abstract class ApplicationStoreInterface {
  abstract auth: boolean;
  abstract initialized: boolean;

  abstract setAuth(state: boolean): void;
  abstract setInitialize(state: boolean): void;
}
