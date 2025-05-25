export abstract class ApplicationStoreInterface {
  abstract initialized: boolean;

  abstract setInitialize(state: boolean): void;
}
